<template>
  <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <!-- Search Bar -->
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

    <!-- Navigation Tabs -->
    <HomeHomeTabs
      v-model="activeCategory"
      class="mb-8"
    />

    <!-- Coming Soon Tab -->
    <UiSoonDialog
      v-if="activeCategory === 'Explore' || activeCategory === 'Coming Soon Tab'"
      mode="page"
      title="Kategori Segera Hadir"
      description="Konten untuk kategori ini masih disiapkan oleh tim penulis kami."
      icon="i-lucide-layers"
    />

    <!-- Loading (hanya tampil jika pending DAN data posts belum ada) -->
    <div
      v-else-if="status === 'pending' && !posts"
      class="py-20 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      Loading articles...
    </div>

    <!-- Server Error -->
    <ErrorServerError
      v-else-if="error"
      :error="error"
    />

    <!-- Empty Search / No Data -->
    <ErrorEmptyState
      v-else-if="filteredPosts.length === 0"
      title="No articles found"
      description="Try another keyword or come back later."
    />

    <!-- Main Content (Feed + Sidebar) -->
    <div
      v-else
      class="flex flex-col gap-10 lg:flex-row"
    >
      <!-- Feed Articles -->
      <section class="min-w-0 flex-1 space-y-6">
        <ArticleListItem
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </section>

      <!-- Right Sidebar -->
      <aside class="w-full lg:w-80 lg:shrink-0">
        <!-- Mobile Sidebar -->
        <div class="lg:hidden">
          <HomeTrendingSidebar />
        </div>

        <!-- Desktop Sidebar -->
        <div class="hidden lg:block">
          <div class="sticky top-6 w-80">
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

// Tanpa await agar fitur lazy dari composable berjalan sempurna
const { data: posts, status, error } = useFetchPosts()

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return posts.value ?? []
  }

  return (posts.value ?? []).filter((post: any) =>
    post.title?.toLowerCase().includes(query) ||
    post.body?.toLowerCase().includes(query)
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