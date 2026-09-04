<template>
  <article class="group relative border-b border-gray-100 py-8 transition-colors dark:border-gray-800">
    <NuxtLink
      :to="`/posts/${post.id}`"
      class="flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-start"
    >
      <!-- Left Content -->
      <div class="flex min-w-0 flex-1 flex-col">
        <!-- Author Byline & Timestamp -->
        <div class="mb-3 flex items-center gap-2.5 text-xs text-gray-500 dark:text-gray-400">
          <UAvatar
            :src="post.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${post.author?.id ?? 1}`"
            :alt="post.author?.name ?? 'User'"
            size="xs"
            class="ring-2 ring-white dark:ring-gray-800"
          />
          <span class="font-semibold text-gray-900 dark:text-white">
            {{ post.author?.name ?? 'Author' }}
          </span>
          <span>·</span>
          <span>5 min read</span>
        </div>

        <!-- Headline -->
        <h2 class="font-sans text-xl font-bold tracking-tight text-gray-900 transition-colors dark:text-white sm:text-2xl">
          {{ post.title }}
        </h2>

        <!-- Body Snippet -->
        <p class="mt-3 line-clamp-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {{ post.body }}
        </p>

        <!-- Meta Footer: Tags + Interactive Counters -->
        <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <span
              v-if="post.category?.name"
              class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 font-sans text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {{ post.category.name }}
            </span>
            <span
              v-for="tagObj in (post.postTags || []).slice(0, 2)"
              :key="tagObj.tag.id"
              class="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 font-sans text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              #{{ tagObj.tag.name }}
            </span>
          </div>

          <!-- Actions & Stats -->
          <div class="flex items-center gap-4 text-xs text-gray-400">
            <!-- Like Action -->
            <button
              type="button"
              class="flex items-center gap-1.5 transition-all hover:text-gray-900 hover:scale-105 dark:hover:text-white"
              :class="isLiked && 'text-gray-900 dark:text-white font-semibold'"
              aria-label="Like post"
              @click.stop.prevent="handleLike"
            >
              <UIcon
                :name="isLiked ? 'i-lucide-star' : 'i-lucide-star'"
                class="size-4 transition-transform active:scale-125"
                :class="isLiked ? 'fill-gray-900 text-gray-900 dark:fill-white dark:text-white' : 'text-gray-400'"
              />
              <span>{{ likeCount }}</span>
            </button>

            <!-- Comments Count -->
            <div class="flex items-center gap-1.5">
              <UIcon name="i-lucide-message-square" class="size-4" />
              <span>{{ post.comments?.length ?? 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Thumbnail Image -->
      <div class="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 sm:w-44 sm:aspect-[4/3] lg:w-52">
        <NuxtImg
          :src="post.imageUrl ?? `https://picsum.photos/seed/${post.id}/500/350`"
          :alt="post.title"
          width="400"
          height="280"
          loading="lazy"
          format="webp"
          class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
    </NuxtLink>
  </article>
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