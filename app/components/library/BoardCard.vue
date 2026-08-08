<template>
  <NuxtLink
    :to="`/library/boards/${board.slug}`"
    class="group block"
  >
    <UCard
      :ui="{
        root: 'overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:ring-gray-400 dark:hover:ring-gray-600 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none',
        body: 'p-0'
      }"
    >
      <!-- Cover Container -->
      <div class="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <NuxtImg
          :src="board.cover"
          :alt="board.name"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          width="600"
          height="400"
        />

        <!-- Soft Dark Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"
        />

        <!-- Minimalist Glassmorphism Badge -->
        <div class="absolute bottom-3 left-3">
          <UBadge
            color="neutral"
            variant="soft"
            class="backdrop-blur-md bg-black/40 text-gray-100 dark:bg-white/10 dark:text-gray-200 border border-white/15 px-2.5 py-1 text-xs font-normal tracking-wide"
          >
            {{ board.articles }} Articles
          </UBadge>
        </div>
      </div>

      <!-- Content Body -->
      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <h2
              class="truncate text-lg font-bold text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            >
              {{ board.name }}
            </h2>

            <p class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400 tracking-wide">
              Personal collection
            </p>
          </div>

          <!-- Subtle Arrow Icon -->
          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-5 shrink-0 text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gray-900 dark:group-hover:text-white"
          />
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Board {
  name: string
  slug: string
  cover: string
  articles: number
}

defineProps<{
  board: Board
}>()
</script>