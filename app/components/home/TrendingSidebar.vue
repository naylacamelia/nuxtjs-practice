<template>
  <aside class="sticky top-6 space-y-10 self-start">
    <!-- Trending -->
    <section>
      <h2 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Trending Articles
      </h2>

      <div v-if="status === 'pending'" class="text-sm text-gray-400">
        Loading...
      </div>

      <div v-else class="space-y-6">
        <NuxtLink
          v-for="(article, index) in trendingArticles"
          :key="article.id"
          :to="`/posts/${article.id}`"
          class="group flex gap-4"
        >
          <span class="text-3xl font-bold text-gray-200 dark:text-gray-700">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <div>
            <p class="mb-1 text-xs text-gray-500">
              {{ article.author }}
            </p>

            <h3
              class="line-clamp-2 font-semibold leading-snug transition group-hover:text-primary"
            >
              {{ article.title }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Topics -->
    <section>
      <h2 class="mb-5 text-lg font-semibold">
        Topics
      </h2>

      <div class="flex flex-wrap gap-3">
        <UBadge
          v-for="topic in topics"
          :key="topic"
          color="neutral"
          variant="soft"
          class="cursor-pointer"
        >
          {{ topic }}
        </UBadge>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
const { data: posts, status } = await useFetchPosts()

const trendingArticles = computed(() => {
  return [...(posts.value ?? [])]
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 4)
    .map(post => ({
      id: post.id,
      title: post.title,
      author: post.author.name
    }))
})

const topics = computed(() => {
  const tagNames = new Set<string>()
  posts.value?.forEach((post) => {
    post.postTags?.forEach((pt) => {
      tagNames.add(pt.tag.name)
    })
  })
  return Array.from(tagNames)
})
</script>