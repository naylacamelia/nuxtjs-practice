<template>
  <NuxtLink
    :to="`/library/boards/${board.slug}`"
    class="group block h-full focus-visible:outline-hidden"
  >
    <div class="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#CBD5E1] bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-[#5B8C9C]/40 hover:shadow-soft-hover dark:border-[#334155] dark:bg-[#1E293B] dark:hover:border-[#5B8C9C]/60">
      <!-- Cover Visual Container -->
      <div class="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A]">
        <NuxtImg
          :src="board.cover"
          :alt="board.name"
          width="600"
          height="375"
          loading="lazy"
          format="webp"
          class="size-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />

        <!-- Soft Vignette Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

        <!-- Count Badge -->
        <div class="absolute bottom-3 left-3">
          <span class="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-md">
            <UIcon name="i-lucide-layers" class="size-3 text-[#5B8C9C]" />
            {{ board.articles }} Articles
          </span>
        </div>
      </div>

      <!-- Info Area -->
      <div class="flex flex-1 items-start justify-between gap-3 p-3">
        <div class="min-w-0 flex-1">
          <h2 class="font-sans text-base font-bold tracking-tight text-[#334155] transition-colors group-hover:text-[#5B8C9C] dark:text-[#F1F5F9] dark:group-hover:text-[#7BAAB9]">
            {{ board.name }}
          </h2>
          <p class="mt-0.5 font-mono text-[11px] text-[#64748B] dark:text-[#94A3B8]">
            Curated Collection
          </p>
        </div>

        <div class="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#CBD5E1] bg-[#F8FAFC] text-[#64748B] transition-all group-hover:border-[#5B8C9C] group-hover:bg-[#5B8C9C] group-hover:text-white dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#94A3B8] dark:group-hover:bg-[#5B8C9C] dark:group-hover:text-white">
          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>
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