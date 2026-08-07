<template>
  <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

    <!-- Search -->
    <section class="mb-8">
      <div class="w-full max-w-xl">
        <UInput
          v-model="searchQuery"
          class="w-full"
          icon="i-lucide-search"
          size="lg"
          placeholder="Search articles..."
          :ui="{
            base: 'rounded-full'
          }"
        />
      </div>
    </section>

    <!-- Tabs -->
    <HomeHomeTabs
      v-model="activeCategory"
      class="mb-8"
    />

    <!-- Loading -->
    <div
      v-if="status === 'pending'"
      class="py-20 text-center text-gray-500"
    >
      Loading articles...
    </div>

    <!-- Error -->
    <ErrorServerError
      v-else-if="error"
      :error="error"
    />

    <!-- Empty -->
    <ErrorEmptyState
      v-else-if="filteredPosts.length === 0"
      title="No articles found"
      description="Try another keyword or come back later."
    />

    <!-- Content -->
    <div
      v-else
      class="flex flex-col gap-10 lg:flex-row"
    >
      <!-- Feed -->
      <section class="min-w-0 flex-1">
        <ArticleListItem
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </section>

      <!-- Sidebar -->
      <aside class="w-full lg:w-80 lg:shrink-0">
        <!-- Mobile -->
        <div class="lg:hidden">
          <HomeTrendingSidebar />
        </div>

        <!-- Desktop -->
        <div class="hidden lg:block">
          <div class="fixed top-6 w-80">
            <HomeTrendingSidebar />
          </div>
        </div>
      </aside>
    </div>

  </main>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const activeCategory = ref('For You')

const { data: posts, status, error } = await useFetchPosts()

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return posts.value ?? []
  }

return (posts.value ?? []).filter((post: any) =>
  post.title.toLowerCase().includes(query) ||
  post.body.toLowerCase().includes(query)
)
})

useSeoMeta({
  title: 'Tech Blog',
  description: 'Tech articles and tutorials.',
  ogTitle: 'Tech Blog',
  ogDescription: 'Tech articles and tutorials.',
  ogType: 'website'
})
</script>