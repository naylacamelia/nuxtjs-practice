<template>
  <article ref="cardRef" class="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gray-100 hover:-translate-y-2 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800">
    <NuxtLink
      :to="`/posts/${post.id}`"
      class="flex h-full flex-col focus-visible:outline-hidden"
      :aria-label="`Read: ${post.title}`"
    >
      <!-- Image Thumbnail -->
      <div class="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
        <NuxtImg
          :src="imageUrl"
          :alt="post.title"
          width="600"
          height="375"
          loading="lazy"
          format="webp"
          class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <!-- Category Tag Badge -->
        <div class="absolute left-3 top-3">
          <span class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-gray-900 shadow-sm backdrop-blur-xs dark:bg-gray-900/90 dark:text-white">
            {{ post.category?.name ?? 'Article' }}
          </span>
        </div>
      </div>

      <!-- Content Container -->
      <div class="mt-5 flex flex-1 flex-col">
        <!-- Metadata -->
        <div class="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ post.author?.name ?? 'Staff' }}
          </span>
          <span>·</span>
          <span class="font-sans text-gray-400">4 min read</span>
        </div>

        <!-- Headline -->
        <h3 class="font-sans text-lg font-bold leading-snug tracking-tight text-gray-900 transition-colors dark:text-white sm:text-xl">
          {{ post.title }}
        </h3>

        <!-- Excerpt -->
        <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {{ post.body }}
        </p>

        <!-- Card Footer -->
        <div class="mt-auto flex items-center justify-between border-t border-gray-200 pt-5 dark:border-gray-700">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-1.5 font-sans text-xs font-semibold text-white transition-all group-hover:scale-105 dark:bg-white dark:text-gray-900">
            Read story
            <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
          </span>

          <div class="flex items-center gap-3 text-xs text-gray-400">
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-star" class="size-3.5" />
              {{ post.likes?.length ?? 0 }}
            </span>
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-message-square" class="size-3.5" />
              {{ post.comments?.length ?? 0 }}
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '~/composables/usePost'
import { useGsap } from '~/composables/useGsap'

const props = defineProps<{
  post: Post
}>()

const imageUrl = computed(() => {
  return props.post.imageUrl ?? `https://picsum.photos/seed/tech-${props.post.id}/600/400`
})

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const { gsap, ScrollTrigger } = useGsap()
  
  if (cardRef.value) {
    gsap.fromTo(cardRef.value, 
      {
        opacity: 0,
        scale: 0.9,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        clearProps: 'all' // prevents conflict with tailwind hover states
      }
    )
  }
})
</script>