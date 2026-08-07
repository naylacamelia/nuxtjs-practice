<template>
  <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-4xl font-bold">
          Your Library
        </h1>

        <p class="mt-2 text-gray-500">
          Organize your saved articles into boards.
        </p>
      </div>

      <UButton icon="i-lucide-plus" size="lg">
        New Board
      </UButton>
    </div>

    <!-- Tabs -->
    <LibraryTabs v-model="activeTab" />

    <!-- Loading -->
    <div v-if="status === 'pending'" class="py-20 text-center text-gray-500">
      Loading articles...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
      Failed to load articles.
    </div>

    <!-- ALL -->
    <section v-else-if="activeTab === 'All'">
      <ArticleListItem
        v-for="post in savedPosts"
        :key="post.id"
        :post="post"
      />
    </section>

    <!-- BOARDS -->
    <section v-else class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <LibraryBoardCard
        v-for="board in boards"
        :key="board.slug"
        :board="board"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
const activeTab = ref('All')

const { data: savedPosts, status, error } = await useFetchPosts()

const boards = [
  {
    name: 'Frontend',
    slug: 'frontend',
    cover: 'https://picsum.photos/seed/frontend/600/400',
    articles: 12
  },
  {
    name: 'Nuxt',
    slug: 'nuxt',
    cover: 'https://picsum.photos/seed/nuxt/600/400',
    articles: 8
  },
  {
    name: 'AI',
    slug: 'ai',
    cover: 'https://picsum.photos/seed/ai/600/400',
    articles: 16
  },
  {
    name: 'Career',
    slug: 'career',
    cover: 'https://picsum.photos/seed/career/600/400',
    articles: 5
  }
]
</script>