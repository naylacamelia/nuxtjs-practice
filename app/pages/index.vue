<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
    <!-- Cinematic Hero Section -->
    <header class="hero-section flex flex-col items-center text-center py-24 md:py-32">
      <div class="hero-eyebrow mb-6 rounded-full bg-gray-100 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        The Tech Dispatch
      </div>
      
      <h1 class="hero-title font-sans text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white max-w-4xl leading-[1.1]">
        Articles & Insights on Engineering, AI, and Product Design
      </h1>
      
      <p class="hero-subtitle mt-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
        We bring ideas to life by combining years of experience with deep technical insight. Explore the latest trends in software architecture and design.
      </p>

      <div class="hero-ctas mt-10 flex flex-wrap justify-center gap-4 w-full">
        <NuxtLink to="/explore" class="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:scale-105 active:scale-[0.98]">
          Explore Topics <UIcon name="i-lucide-arrow-up-right" class="size-4" />
        </NuxtLink>
        <div class="relative w-full max-w-xs sm:w-auto">
          <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search dispatches..."
            class="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition focus:border-gray-900 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
        </div>
      </div>
    </header>

    <!-- Featured Lead Article -->
    <section v-if="!searchQuery && featuredPost" class="bento-reveal mb-20">
      <HomeFeaturedArticle :post="featuredPost" />
    </section>

    <!-- Navigation Filter Tabs -->
    <section class="bento-reveal mb-12 flex justify-center">
      <HomeHomeTabs v-model="activeCategory" />
    </section>

    <!-- Loading State -->
    <div
      v-if="status === 'pending' && !posts"
      class="py-32 text-center"
    >
      <div class="inline-flex items-center gap-3 font-sans text-sm text-gray-500">
        <UIcon name="i-lucide-loader-2" class="size-5 animate-spin text-gray-900 dark:text-white" />
        <span>Loading latest stories...</span>
      </div>
    </div>

    <!-- Server Error -->
    <ErrorServerError
      v-else-if="error"
      :error="error"
    />

    <!-- Empty Search / No Data -->
    <ErrorEmptyState
      v-else-if="filteredPosts.length === 0"
      title="No dispatches found"
      description="We couldn't find any articles matching your search query. Try another term or explore trending topics."
    />

    <!-- Main Content Stream (Feed + Sidebar) -->
    <div
      v-else
      class="bento-reveal grid grid-cols-1 gap-12 lg:grid-cols-12 pb-24"
    >
      <!-- Feed Articles Stream (Left Column) -->
      <section class="min-w-0 lg:col-span-8">
        <div class="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
          <span class="font-sans text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">
            {{ searchQuery ? `Search Results (${filteredPosts.length})` : 'Latest Dispatches' }}
          </span>
          <span class="font-sans text-xs font-medium text-gray-500">
            Showing {{ filteredPosts.length }} articles
          </span>
        </div>

        <div class="divide-y divide-gray-100 dark:divide-gray-800">
          <ArticleListItem
            v-for="post in streamPosts"
            :key="post.id"
            :post="post"
            class="article-item py-8 transition hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-3xl px-4 -mx-4"
          />
        </div>
      </section>

      <!-- Right Editorial Sidebar -->
      <aside class="lg:col-span-4">
        <div class="lg:sticky lg:top-24">
          <HomeTrendingSidebar />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const searchQuery = ref('')
const activeCategory = ref('For You')

const { data: posts, status, error } = useFetchPosts()

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  let list = posts.value ?? []

  if (activeCategory.value === 'Featured') {
    list = [...list].sort((a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0))
  } else if (activeCategory.value === 'Trending') {
    list = [...list].sort((a, b) => ((b.likes?.length ?? 0) + (b.comments?.length ?? 0)) - ((a.likes?.length ?? 0) + (a.comments?.length ?? 0)))
  } else if (activeCategory.value === 'Latest') {
    list = [...list].sort((a, b) => b.id - a.id)
  }

  if (!query) {
    return list
  }

  return list.filter((post: any) =>
    post.title?.toLowerCase().includes(query) ||
    post.body?.toLowerCase().includes(query) ||
    post.category?.name?.toLowerCase().includes(query) ||
    post.postTags?.some((pt: any) => pt.tag?.name?.toLowerCase().includes(query))
  )
})

// Top lead article
const featuredPost = computed(() => {
  if (!posts.value || posts.value.length === 0) return null
  return posts.value[0]
})

// Remaining stream posts (exclude lead post on default view)
const streamPosts = computed(() => {
  if (searchQuery.value || activeCategory.value !== 'For You') {
    return filteredPosts.value
  }
  // When on default view, skip the lead article from the feed to avoid repetition
  return filteredPosts.value.length > 1 ? filteredPosts.value.slice(1) : filteredPosts.value
})

useSeoMeta({
  title: 'Tech Blog · The Tech Dispatch',
  description: 'Articles, tutorials, and insights on engineering, AI, and modern web architecture.',
  ogTitle: 'Tech Blog · The Tech Dispatch',
  ogDescription: 'Articles, tutorials, and insights on engineering, AI, and modern web architecture.',
  ogType: 'website'
})

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    // Hero Entry Animation
    const heroTl = gsap.timeline()
    heroTl.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')

    // Scroll Reveal for sections
    gsap.utils.toArray('.bento-reveal').forEach((element: any) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          }
        }
      )
    })
  }
})

// Add watch to re-trigger article stagger if feed changes
watch(streamPosts, () => {
  nextTick(() => {
    if (import.meta.client) {
      gsap.fromTo('.article-item', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      )
    }
  })
}, { immediate: true })
</script>