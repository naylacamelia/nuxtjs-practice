<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <header class="mb-10 flex flex-col justify-between gap-6 border-b border-[#CBD5E1]/80 pb-6 dark:border-[#334155]/80 md:flex-row md:items-end">
      <div>
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5B8C9C] dark:text-[#7BAAB9]">
          <span>Personal Workspace</span>
        </div>
        <h1 class="mt-2 font-sans text-3xl font-bold tracking-tight text-[#334155] dark:text-[#F1F5F9] sm:text-4xl">
          Reading Library & Collections
        </h1>
        <p class="mt-2 text-sm text-[#64748B] dark:text-[#94A3B8]">
          Organize saved technical guides, architectural blueprints, and bookmarks.
        </p>
      </div>

      <div>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-[#5B8C9C] px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-2xs transition hover:bg-[#4A7685] active:scale-[0.98]"
          @click="showComingSoon = true"
        >
          <UIcon name="i-lucide-folder-plus" class="size-4" />
          <span>New Collection</span>
        </button>
      </div>

      <UiSoonDialog
        v-model:open="showComingSoon"
        title="Custom Collections"
        description="Custom collection creation, tagging, and export to markdown are currently under development."
        icon="i-lucide-folder-plus"
      />
    </header>

    <!-- Tabs Navigation -->
    <LibraryLibraryTabs v-model="activeTab" />

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="py-20 text-center">
      <div class="inline-flex items-center gap-2 font-mono text-xs text-[#64748B]">
        <UIcon name="i-lucide-loader-2" class="size-4 animate-spin text-[#5B8C9C]" />
        <span>Loading library items...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
      Failed to load library dispatches.
    </div>

    <!-- ALL SAVED DISPATCHES -->
    <section v-else-if="activeTab === 'All Dispatches'">
      <div class="divide-y divide-[#CBD5E1]/70 dark:divide-[#334155]/70">
        <ArticleListItem
          v-for="post in savedPosts"
          :key="post.id"
          :post="post"
        />
      </div>
    </section>

    <!-- CURATED COLLECTIONS / BOARDS -->
    <section v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <LibraryBoardCard
        v-for="board in boards"
        :key="board.slug"
        :board="board"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const showComingSoon = ref(false)
const activeTab = ref('Curated Collections')

const { data: savedPosts, status, error } = await useFetchPosts()

const boards = [
  {
    name: 'Frontend Architecture',
    slug: 'frontend',
    cover: 'https://picsum.photos/seed/frontend/600/400',
    articles: 12
  },
  {
    name: 'Nuxt & Nitro Mastery',
    slug: 'nuxt',
    cover: 'https://picsum.photos/seed/nuxt/600/400',
    articles: 8
  },
  {
    name: 'AI & Autonomous Systems',
    slug: 'ai',
    cover: 'https://picsum.photos/seed/ai/600/400',
    articles: 16
  },
  {
    name: 'Career & Staff Engineering',
    slug: 'career',
    cover: 'https://picsum.photos/seed/career/600/400',
    articles: 5
  }
]

useSeoMeta({
  title: 'Library · Tech Blog',
  description: 'Your saved tech dispatches and curated collections.'
})
</script>