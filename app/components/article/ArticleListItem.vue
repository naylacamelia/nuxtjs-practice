<template>
  <NuxtLink :to="`/posts/${post.id}`"
    class="group flex flex-col md:flex-row gap-5 md:gap-8 py-8 border-b border-gray-100 dark:border-gray-800 items-start transition-colors">

    <div class="flex flex-col flex-1 min-w-0 order-2 md:order-1 w-full">

      <div class="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <UAvatar :src="post.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${post.author?.id ?? 1}`"
          :alt="post.author?.name ?? 'User'" size="sm" class="ring-1 ring-gray-200 dark:ring-gray-800" />
        <div class="flex items-center gap-1.5">
          <span class="font-medium text-gray-900 dark:text-gray-100">{{ post.author?.name ?? 'User' }}</span>
          <span class="text-gray-400 text-xs">•</span>
          <span>5 min read</span>
        </div>
      </div>

      <h2
        class="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 tracking-tight transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
        {{ post.title }}
      </h2>

      <p class="line-clamp-2 text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-5">
        {{ post.body }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        <span v-if="post.category?.name"
          class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-normal text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
          {{ post.category.name }}
        </span>
        <div v-else></div>
        <div class="flex items-center gap-5 text-gray-500 dark:text-gray-400">

          <button
            class="flex items-center gap-1.5 transition-colors group/like hover:text-amber-500 dark:hover:text-amber-400"
            @click.stop.prevent="handleLike" aria-label="Like post">
            <UIcon name="i-lucide-star" class="size-5 transition-transform active:scale-110" :class="isLiked
              ? 'fill-amber-400 text-amber-400 dark:fill-amber-400 dark:text-amber-400'
              : 'text-gray-500'" />
            <span class="text-sm font-medium" :class="isLiked && 'text-amber-500 dark:text-amber-400'">
              {{ likeCount }}
            </span>
          </button>

          <div class="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-gray-200">
            <UIcon name="i-lucide-message-circle" class="size-5" />
            <span class="text-sm font-medium">{{ post.comments?.length ?? 0 }}</span>
          </div>

        </div>
      </div>
    </div>

    <div class="order-1 md:order-2 w-full md:w-[200px] lg:w-[240px] shrink-0 mb-4 md:mb-0">
      <NuxtImg :src="post.imageUrl ?? `https://picsum.photos/seed/${post.id}/320/220`" :alt="post.title"
        class="w-full aspect-[16/9] md:aspect-[4/3] object-cover rounded-md border border-gray-100 dark:border-gray-800 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]" />
    </div>

  </NuxtLink>
</template>

<script setup lang="ts">
import type { Post } from '~/composables/usePost'

const props = defineProps<{ post: Post }>()

const { toggle, pending } = useToggleLike(props.post.id)

const CURRENT_USER_ID = 2

const isLiked = ref(props.post.likes?.some(l => l.userId === CURRENT_USER_ID) ?? false)
const likeCount = ref(props.post.likes?.length ?? 0)

watch(() => props.post, (newPost) => {
  if (newPost) {
    isLiked.value = newPost.likes?.some(l => l.userId === CURRENT_USER_ID) ?? false
    likeCount.value = newPost.likes?.length ?? 0
  }
}, { deep: true })

async function handleLike() {
  if (pending.value) return

  const wasLiked = isLiked.value
  isLiked.value = !wasLiked
  likeCount.value += isLiked.value ? 1 : -1

  const result = await toggle()

  if (result === null) {
    isLiked.value = wasLiked
    likeCount.value += wasLiked ? 1 : -1
    return
  }

  isLiked.value = result
}
</script>