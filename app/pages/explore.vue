<template>
  <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full overflow-x-hidden">
    <!-- Hero / Discovery Header -->
    <section class="explore-hero mb-20 text-center">
      <div class="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <span>Knowledge Discovery</span>
      </div>

      <h1 class="mt-6 font-sans text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
        Stay updated with trending topics
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
        Browse curated technical articles, architecture teardowns, and engineering insights across key disciplines.
      </p>

      <!-- Search Input Container -->
      <div class="mx-auto mt-10 max-w-xl">
        <div class="relative">
          <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search by topic, keyword, or author..."
            class="w-full rounded-full border border-gray-200 bg-white py-4 pl-12 pr-12 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-gray-900 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white transition-all"
          >
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            @click="searchQuery = ''"
          >
            <UIcon name="i-lucide-x" class="size-5" />
          </button>
        </div>
      </div>
    </section>

    <!-- Explore Categories Bento Grid -->
    <section class="explore-section mb-24">
      <div class="mb-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <h2 class="font-sans text-2xl font-bold text-gray-900 dark:text-white">
          Explore Categories
        </h2>
        <span class="font-sans text-sm text-gray-500">Click to filter</span>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="cat in categoryList"
          :key="cat.name"
          type="button"
          class="bento-cat group flex items-center justify-between rounded-3xl border border-gray-100 bg-gray-50 p-8 text-left transition-all hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800"
          :class="searchQuery.toLowerCase() === cat.name.toLowerCase() ? 'ring-2 ring-gray-900 border-transparent bg-gray-100 dark:bg-gray-800 dark:ring-white' : ''"
          @click="selectCategory(cat.name)"
        >
          <div>
            <h3 class="font-sans text-lg font-bold text-gray-900 transition-colors dark:text-white">
              {{ cat.name }}
            </h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {{ cat.description }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span class="rounded-full bg-white px-3 py-1 font-sans text-xs font-semibold text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white">
              {{ cat.count }}
            </span>
            <UIcon
              name="i-lucide-arrow-up-right"
              class="size-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </div>
        </button>
      </div>
    </section>

    <!-- Popular Tag Pills -->
    <section class="explore-section mb-16">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="font-sans text-xl font-bold text-gray-900 dark:text-white">
          Popular Tags
        </h2>
        <button
          v-if="searchQuery"
          type="button"
          class="font-sans text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:hover:text-white"
          @click="searchQuery = ''"
        >
          Clear filters
        </button>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="topic in (topics.length ? topics : defaultTopics)"
          :key="topic"
          type="button"
          class="inline-flex items-center rounded-full border px-4 py-2 font-sans text-sm font-medium transition-all"
          :class="
            searchQuery.toLowerCase() === topic.toLowerCase()
              ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900 shadow-sm'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900'
          "
          @click="selectTopic(topic)"
        >
          #{{ topic }}
        </button>
      </div>
    </section>

    <!-- Articles Grid Section -->
    <section class="explore-section">
      <div class="mb-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <h2 class="font-sans text-3xl font-bold text-gray-900 dark:text-white">
          {{ searchQuery ? `Results for "${searchQuery}"` : 'Featured Dispatches' }}
        </h2>
        <span class="font-sans text-sm font-medium text-gray-500">
          {{ filteredPosts.length }} articles
        </span>
      </div>

      <!-- Skeletons -->
      <div v-if="status === 'pending' && !posts" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="h-96 rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>

      <!-- Empty State -->
      <ErrorEmptyState
        v-else-if="filteredPosts.length === 0"
        title="No articles found"
        description="We couldn't find any articles matching your search criteria. Try a different keyword or category."
      >
        <button
          type="button"
          class="mt-6 rounded-full bg-gray-900 px-6 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          @click="searchQuery = ''"
        >
          Reset Filters
        </button>
      </ErrorEmptyState>

      <!-- 3-Column Grid -->
      <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ArticleCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          class="explore-article"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const route = useRoute()
const searchQuery = ref((route.query.q as string) || '')

const { data: posts, status } = useFetchPosts()

const defaultTopics = ['Architecture', 'Vue3', 'Nuxt4', 'Tailwind', 'AI', 'Cloudflare', 'TypeScript', 'Career', 'Performance']

const categoryList = [
  { name: 'Artificial Intelligence', description: 'LLMs, autonomous agents, and ML pipelines', count: '16' },
  { name: 'Frontend Engineering', description: 'Vue 3, Nuxt, component design & animations', count: '12' },
  { name: 'Cloud & Systems', description: 'Serverless, edge computing, and Cloudflare D1', count: '08' },
  { name: 'Software Architecture', description: 'Patterns, clean code, and API engineering', count: '07' },
  { name: 'Career & Engineering Leadership', description: 'Team building, mentorship, and growth', count: '05' },
  { name: 'Product & Design', description: 'Design systems, UI/UX, and typography', count: '04' }
]

function selectCategory(catName: string) {
  if (searchQuery.value.toLowerCase() === catName.toLowerCase()) {
    searchQuery.value = ''
  } else {
    searchQuery.value = catName
  }
}

function selectTopic(topicName: string) {
  if (searchQuery.value.toLowerCase() === topicName.toLowerCase()) {
    searchQuery.value = ''
  } else {
    searchQuery.value = topicName
  }
}

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return posts.value ?? []

  return (posts.value ?? []).filter((post: any) =>
    post.title?.toLowerCase().includes(query) ||
    post.body?.toLowerCase().includes(query) ||
    post.category?.name?.toLowerCase().includes(query) ||
    post.postTags?.some((pt: any) => pt.tag?.name?.toLowerCase().includes(query))
  )
})

const topics = computed(() => {
  const tagNames = new Set<string>()
  posts.value?.forEach((post: any) => {
    post.postTags?.forEach((pt: any) => {
      if (pt.tag?.name) tagNames.add(pt.tag.name)
    })
  })
  return Array.from(tagNames)
})

useSeoMeta({
  title: 'Explore Topics · Tech Blog',
  description: 'Discover curated engineering articles, tutorials, and technology insights.'
})

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    // Hero Entry Animation
    gsap.fromTo('.explore-hero', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Scroll Reveal for sections
    gsap.utils.toArray('.explore-section').forEach((element: any) => {
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

// Stagger for categories and articles
watch(filteredPosts, () => {
  nextTick(() => {
    if (import.meta.client) {
      gsap.fromTo('.bento-cat', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      )
      gsap.fromTo('.explore-article', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      )
    }
  })
}, { immediate: true })
</script>