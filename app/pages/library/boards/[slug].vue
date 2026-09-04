<template>
  <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Breadcrumbs -->
    <div class="mb-6">
      <NuxtLink
        to="/library"
        class="inline-flex items-center gap-1.5 font-mono text-xs text-[#64748B] transition hover:text-[#5B8C9C] dark:text-[#94A3B8] dark:hover:text-[#7BAAB9]"
      >
        <UIcon name="i-lucide-arrow-left" class="size-4" />
        <span>Back to Library</span>
      </NuxtLink>
    </div>

    <!-- Collection Header Banner -->
    <header class="mb-10 overflow-hidden rounded-2xl border border-[#CBD5E1] bg-white p-6 shadow-soft dark:border-[#334155] dark:bg-[#1E293B] sm:p-8">
      <div class="flex flex-col gap-6 md:flex-row md:items-center">
        <div class="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] md:w-72">
          <NuxtImg
            :src="board.cover"
            :alt="board.name"
            class="size-full object-cover"
          />
          <div class="absolute inset-0 bg-[#334155]/10 mix-blend-multiply opacity-20" />
        </div>

        <div class="flex-1 min-w-0">
          <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5B8C9C] dark:text-[#7BAAB9]">
            <span>Curated Collection</span>
          </div>

          <h1 class="mt-2 font-sans text-3xl font-bold tracking-tight text-[#334155] dark:text-[#F1F5F9] sm:text-4xl">
            {{ board.name }}
          </h1>

          <p class="mt-3 text-sm leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
            {{ board.description }}
          </p>

          <div class="mt-6 flex items-center gap-3 border-t border-[#CBD5E1]/60 pt-4 dark:border-[#334155]/60">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-[#E2E8F0] px-3 py-1 font-mono text-xs font-semibold text-[#5B8C9C] dark:bg-[#0F172A] dark:text-[#7BAAB9]">
              <UIcon name="i-lucide-layers" class="size-3.5 text-[#5B8C9C]" />
              {{ board.articles.length }} Dispatches
            </span>
            <span class="font-mono text-xs text-[#94A3B8]">Updated today</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Articles List in Board -->
    <section>
      <div class="mb-4 flex items-center justify-between border-b border-[#CBD5E1]/80 pb-2 dark:border-[#334155]/80">
        <h2 class="font-sans text-xl font-bold text-[#334155] dark:text-[#F1F5F9]">
          Collection Dispatches
        </h2>
        <span class="font-mono text-xs text-[#94A3B8]">Showing all</span>
      </div>

      <div class="divide-y divide-[#CBD5E1]/70 dark:divide-[#334155]/70">
        <ArticleListItem
          v-for="post in board.articles"
          :key="post.id"
          :post="post"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data } = await useFetchPosts()

const boards = {
  frontend: {
    name: 'Frontend Architecture',
    cover: 'https://picsum.photos/seed/frontend/1200/600',
    description: 'Articles covering modern Vue 3, Nuxt 4, React patterns, CSS design systems, and UI engineering.'
  },
  nuxt: {
    name: 'Nuxt & Nitro Mastery',
    cover: 'https://picsum.photos/seed/nuxt/1200/600',
    description: 'Deep dives into Nuxt 4, server engine Nitro, edge workers, and full-stack Vue applications.'
  },
  ai: {
    name: 'AI & Autonomous Systems',
    cover: 'https://picsum.photos/seed/ai/1200/600',
    description: 'Practical guides on generative AI, autonomous agent design, and LLM integrations in production.'
  },
  career: {
    name: 'Career & Staff Engineering',
    cover: 'https://picsum.photos/seed/career/1200/600',
    description: 'Strategies for senior & staff engineering leadership, systems design interviews, and developer growth.'
  }
}

const current = boards[route.params.slug as keyof typeof boards]

if (!current) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Collection not found.'
  })
}

const board = {
  ...current,
  articles: data.value ?? []
}

useSeoMeta({
  title: `${board.name} · Collection · Tech Blog`,
  description: board.description
})
</script>