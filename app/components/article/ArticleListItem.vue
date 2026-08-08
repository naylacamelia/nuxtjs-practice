<template>
  <NuxtLink :to="`/posts/${post.id}`" class="group flex flex-col gap-5 border-b border-gray-200 py-8 md:flex-row">
    <div class="order-2 min-w-0 flex-1 md:order-1">

      <div class="mb-3 flex items-center gap-2 text-sm text-gray-500">
        <UAvatar
          :src="post.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${post.author?.id ?? 1}`"
          :alt="post.author?.name ?? 'User'"
          size="xs"
        />

        <span>{{ post.author?.name ?? 'User' }}</span>

        <span>·</span>

        <span>5 min read</span>
      </div>

      <h2 class="mb-3 text-2xl font-bold leading-tight transition group-hover:text-gray-600 dark:group-hover:text-gray-300">
        {{ post.title }}
      </h2>

      <p class="line-clamp-2 text-sm leading-6 text-gray-500 md:text-base">
        {{ post.body }}
      </p>

      <div class="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <UBadge v-if="post.category?.name">{{ post.category.name }}</UBadge>
 <div
          class="flex items-center gap-1 cursor-pointer transition-colors hover:text-yellow-500"
          @click.stop.prevent="handleLike"
        >
          <UIcon
            name="i-lucide-star"
            class="cursor-pointer"
            :class="isLiked && 'fill-current text-yellow-400'"
            @click.stop.prevent="handleLike"
          />
          <span>{{ likeCount }}</span>
        </div>

        <div class="flex items-center gap-1 transition-colors">
          <UIcon name="i-lucide-message-circle" class="size-4" />
          <span>{{ post.comments?.length ?? 0 }}</span>
        </div>
      </div>

    </div>

    <div class="order-1 overflow-hidden rounded-xl md:order-2 md:shrink-0">
      <NuxtImg
        :src="post.imageUrl ?? `https://picsum.photos/seed/${post.id}/320/220`"
        :alt="post.title"
        class="h-52 w-full object-cover transition duration-500 group-hover:scale-105 md:h-36 md:w-52"
      />
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