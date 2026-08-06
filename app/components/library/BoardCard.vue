<template>
  <NuxtLink
    :to="`/library/boards/${board.slug}`"
    class="group block"
  >
    <UCard
      :ui="{
        root: 'overflow-hidden rounded-2xl ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:ring-primary dark:ring-gray-800',
        body: 'p-0'
      }"
    >
      <!-- Cover -->

      <div class="relative h-44 overflow-hidden">
        <NuxtImg
          :src="board.cover"
          :alt="board.name"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          width="600"
          height="400"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />

        <div
          class="absolute bottom-4 left-4"
        >
          <UBadge
            color="neutral"
            variant="soft"
          >
            {{ board.articles }} Articles
          </UBadge>
        </div>
      </div>

      <!-- Body -->

      <div class="p-5">

        <div
          class="flex items-center justify-between"
        >
          <div>

            <h2
              class="text-xl font-semibold group-hover:text-primary"
            >
              {{ board.name }}
            </h2>

            <p
              class="mt-2 text-sm text-gray-500"
            >
              Personal collection
            </p>

          </div>

          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-5 transition group-hover:translate-x-1 group-hover:-translate-y-1"
          />

        </div>

      </div>

    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Board{
  name:string
  slug:string
  cover:string
  articles:number
}

defineProps<{
  board:Board
}>()
</script>