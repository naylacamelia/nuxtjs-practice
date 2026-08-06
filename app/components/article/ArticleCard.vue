<template>
  <article class="group">
    <NuxtLink
      :to="`/posts/${post.id}`"
      class="block focus-visible:outline-none"
      :aria-label="`Baca artikel: ${post.title}`"
    >
      <UCard
        class="overflow-hidden bg-transparent transition-transform duration-300 group-hover:-translate-y-1"
        :ui="{
          root: 'ring-0 shadow-none divide-y-0',
          body: 'p-0 sm:p-0'
        }"
      >
        <!-- Article image -->
        <div
          class="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
        >
          <NuxtImg
            :src="imageUrl"
            :alt="post.title"
            width="600"
            height="450"
            loading="lazy"
            format="webp"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          <div
            class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5"
          />

          <div
            v-if="$slots.badge"
            class="absolute left-4 top-4"
          >
            <slot name="badge" />
          </div>
        </div>

        <!-- Article information -->
        <div>
          <div
            v-if="$slots.meta"
            class="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
          >
            <slot name="meta" />
          </div>

          <h2
            class="line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-gray-950 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300"
          >
            {{ post.title }}
          </h2>

          <p
            class="mt-3 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400"
          >
            {{ post.body }}
          </p>

          <div
            class="mt-5 flex items-center justify-between gap-4"
          >
            <span
              class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 transition-all duration-300 group-hover:gap-2.5 dark:text-white"
            >
              Read article

              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4"
              />
            </span>

            <slot name="footer" />
          </div>
        </div>
      </UCard>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
interface Post {
  id: number
  userId: number
  title: string
  body: string
}

const props = defineProps<{
  post: Post
}>()

const imageUrl = computed(() => {
  return `https://picsum.photos/seed/tech-${props.post.id}/600/450`
})
</script>