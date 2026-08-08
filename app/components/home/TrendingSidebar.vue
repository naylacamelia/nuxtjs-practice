<template>
  <aside class="sticky top-6 space-y-10 self-start">
    <!-- Trending Section -->
    <section>
      <div class="mb-5 flex items-center justify-between">
        <h2 class="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
          Trending Articles
        </h2>
        <UIcon name="i-lucide-trending-up" class="size-4 text-gray-400" />
      </div>

      <!-- Skeleton Loading State -->
      <div v-if="status === 'pending'" class="space-y-5">
        <div v-for="n in 4" :key="n" class="flex gap-4 animate-pulse">
          <div class="h-8 w-6 rounded bg-gray-200 dark:bg-gray-800" />
          <div class="flex-1 space-y-2">
            <div class="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
            <div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>

      <!-- Trending List -->
      <div v-else class="space-y-5">
        <NuxtLink
          v-for="(article, index) in trendingArticles"
          :key="article.id"
          :to="`/posts/${article.id}`"
          class="group flex items-start gap-3.5 transition-colors"
        >
          <!-- Ranking Number -->
          <span
            class="text-2xl font-black leading-none text-gray-300 dark:text-gray-700 transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-white"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <div class="min-w-0 flex-1">
            <!-- Author & Stats -->
            <div class="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span class="truncate font-medium text-gray-700 dark:text-gray-300">
                {{ article.author }}
              </span>
             
            </div>

            <!-- Title -->
            <h3
              class="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-gray-500 dark:group-hover:text-gray-400"
            >
              {{ article.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <div class="h-px w-full bg-gray-100 dark:bg-gray-800/80" />

    <!-- Topics Section -->
    <section>
      <h2 class="mb-4 text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
        Popular Topics
      </h2>

      <!-- Skeleton Tag Loading -->
      <div v-if="status === 'pending'" class="flex flex-wrap gap-2">
        <div v-for="n in 6" :key="n" class="h-7 w-16 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>

      <!-- Tag Pills -->
      <div v-else class="flex flex-wrap gap-2">
        <UBadge
          v-for="topic in topics"
          :key="topic"
          color="neutral"
          variant="soft"
          class="cursor-pointer rounded-full px-3 py-1 text-xs font-normal text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/80 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:scale-105"
        >
          #{{ topic }}
        </UBadge>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
const { data: posts, status } = await useFetchPosts()

const trendingArticles = computed(() => {
  return [...(posts.value ?? [])]
    .sort((a, b) => (b.likes?.length ?? 0) - (a.likes?.length ?? 0))
    .slice(0, 4)
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