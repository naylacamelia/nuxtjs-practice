<template>
  <aside ref="sidebarRef" class="space-y-6">
    <!-- Trending Articles Section -->
    <div class="sidebar-card rounded-3xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
      <div class="mb-5 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-trending-up" class="size-4 text-gray-900 dark:text-white" />
          <h2 class="font-sans text-base font-bold tracking-tight text-gray-900 dark:text-white">
            Trending Dispatches
          </h2>
        </div>
        <span class="rounded-full bg-gray-200 px-2.5 py-0.5 font-sans text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">Top Rated</span>
      </div>

      <!-- Skeleton Loading -->
      <div v-if="status === 'pending'" class="space-y-4">
        <div v-for="n in 4" :key="n" class="flex gap-3 animate-pulse">
          <div class="size-7 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div class="flex-1 space-y-2">
            <div class="h-3.5 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
            <div class="h-3 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      <!-- Trending List -->
      <div v-else class="space-y-5">
        <NuxtLink
          v-for="(article, index) in trendingArticles"
          :key="article.id"
          :to="`/posts/${article.id}`"
          class="group flex items-start gap-3.5 transition-all"
        >
          <!-- Ranking Number -->
          <span
            class="font-sans text-lg font-bold leading-none text-gray-200 transition-colors group-hover:text-gray-900 dark:text-gray-700 dark:group-hover:text-white"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <div class="min-w-0 flex-1">
            <!-- Author & Category -->
            <div class="mb-1.5 flex items-center gap-2 text-xs text-gray-400">
              <span class="truncate font-semibold text-gray-700 dark:text-gray-300">
                {{ article.author }}
              </span>
              <span>·</span>
              <span class="flex items-center gap-0.5 font-medium text-gray-600 dark:text-gray-400">
                <UIcon name="i-lucide-star" class="size-3 fill-gray-600 text-gray-600 dark:fill-gray-400 dark:text-gray-400" />
                {{ article.likeCount }}
              </span>
            </div>

            <!-- Title -->
            <h3
              class="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300"
            >
              {{ article.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Popular Topics Cloud -->
    <div class="sidebar-card rounded-3xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
      <div class="mb-4 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <h2 class="font-sans text-base font-bold tracking-tight text-gray-900 dark:text-white">
          Curated Topics
        </h2>
        <UIcon name="i-lucide-compass" class="size-4 text-gray-400" />
      </div>

      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="topic in (topics.length ? topics : defaultTopics)"
          :key="topic"
          :to="`/explore?q=${encodeURIComponent(topic)}`"
          class="inline-flex items-center rounded-full border border-gray-200 bg-white px-3.5 py-1.5 font-sans text-xs font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-gray-900"
        >
          #{{ topic }}
        </NuxtLink>
      </div>
    </div>

    <!-- Newsletter Subscription Card -->
    <div class="sidebar-card relative overflow-hidden rounded-3xl bg-gray-900 p-6 dark:bg-white">
      <div class="mb-3 flex items-center gap-2">
        <UIcon name="i-lucide-mail" class="size-4 text-gray-400 dark:text-gray-600" />
        <span class="font-sans text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
          The Weekly Dispatch
        </span>
      </div>

      <h3 class="font-sans text-xl font-bold text-white dark:text-gray-900">
        Delivered to your inbox
      </h3>
      <p class="mt-2 text-sm text-gray-400 dark:text-gray-600 leading-relaxed">
        Deep dives on engineering, architecture, and technology insights every Thursday.
      </p>

      <form class="mt-5 space-y-3" @submit.prevent="handleSubscribe">
        <input
          v-model="newsletterEmail"
          type="email"
          required
          placeholder="your.email@company.com"
          class="w-full rounded-full border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-gray-500 focus:outline-hidden dark:border-gray-300 dark:bg-gray-100 dark:text-gray-900 dark:placeholder:text-gray-500"
        >
        <button
          type="submit"
          class="w-full rounded-full bg-white px-4 py-2.5 font-sans text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100 hover:scale-105 active:scale-[0.98] dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
        >
          {{ subscribed ? 'Subscribed!' : 'Join 14,000+ Readers' }}
        </button>
      </form>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useGsap } from '~/composables/useGsap'

const { data: posts, status } = await useFetchPosts()

const defaultTopics = ['Architecture', 'Vue3', 'Nuxt4', 'Tailwind', 'AI', 'Cloudflare', 'TypeScript', 'Career']
const newsletterEmail = ref('')
const subscribed = ref(false)
const sidebarRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap } = useGsap()
  
  if (sidebarRef.value) {
    const cards = sidebarRef.value.querySelectorAll('.sidebar-card')
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all' // prevents conflict with hover states
    })
  }
})

function handleSubscribe() {
  if (!newsletterEmail.value) return
  subscribed.value = true
  setTimeout(() => {
    newsletterEmail.value = ''
    subscribed.value = false
  }, 3000)
}

const trendingArticles = computed(() => {
  return [...(posts.value ?? [])]
    .sort((a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0))
    .slice(0, 5)
    .map(post => ({
      id: post.id,
      title: post.title,
      author: post.author?.name ?? 'User',
      likeCount: post.likes?.length ?? 0
    }))
})

const topics = computed(() => {
  const tagNames = new Set<string>()
  posts.value?.forEach((post) => {
    post.postTags?.forEach((pt) => {
      if (pt.tag?.name) {
        tagNames.add(pt.tag.name)
      }
    })
  })
  return Array.from(tagNames)
})
</script>