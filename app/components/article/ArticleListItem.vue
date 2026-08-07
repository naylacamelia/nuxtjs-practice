<template>
  <NuxtLink
     :to="`/posts/${post.id}`"
class="group flex flex-col gap-5 border-b border-gray-200 py-8 md:flex-row"
  >
 <div class="order-2 min-w-0 flex-1 md:order-1">

      <div class="mb-3 flex items-center gap-2 text-sm text-gray-500">

<UAvatar
  :src="`https://i.pravatar.cc/100?img=${post.author.name}`"
  :alt="`User ${post.author.name}`"
  size="xs"
/>

        <span>User {{ post.author.name }}</span>

        <span>·</span>

        <span>5 min read</span>

      </div>

      <h2
        class="mb-3 text-2xl font-bold leading-tight transition group-hover:text-gray-600 dark:group-hover:text-gray-300"
      >
        {{ post.title }}
      </h2>

 <p
  class="line-clamp-2 text-sm leading-6 text-gray-500 md:text-base"
>
        {{ post.body }}
      </p>

<div
  class="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
>
  <UBadge
    color="neutral"
    variant="soft"
  >
    Development
  </UBadge>

  <div
    class="flex items-center gap-1 transition-colors"
  >
    <UIcon
      name="i-lucide-star"
      class="size-4"
    />
    <span>234</span>
  </div>

  <div
    class="flex items-center gap-1 transition-colors"
  >
    <UIcon
      name="i-lucide-message-circle"
      class="size-4"
    />
    <span>18</span>
  </div>
</div>

    </div>

   <div class="order-1 overflow-hidden rounded-xl md:order-2 md:shrink-0">
  <NuxtImg
    :src="`https://picsum.photos/seed/${post.id}/320/220`"
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

const isLiked = ref(props.post.likes.some(l => l.userId === 1)) // 1 = CURRENT_USER_ID sementara
const likeCount = ref(props.post.likes.length)

async function handleLike() {
  if (pending.value) return

  // Optimistic update — UI berubah duluan, gak nunggu server
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1

  const liked = await toggle()

  // Sinkronkan ke hasil asli dari server, jaga-jaga kalau beda
  isLiked.value = liked
}
</script>