<template>
  <article v-if="post" class="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-6 transition-all duration-500 hover:bg-gray-100 hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800 sm:p-8 lg:p-10">
    <NuxtLink :to="`/posts/${post.id}`" class="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:items-center">
      <!-- Feature Visual -->
      <div class="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 lg:col-span-7">
        <NuxtImg
          :src="post.imageUrl ?? `https://picsum.photos/seed/feature-${post.id}/1200/750`"
          :alt="post.title"
          width="800"
          height="500"
          loading="eager"
          format="webp"
          class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <!-- Category Badge Tag -->
        <div class="absolute left-4 top-4">
          <span class="inline-flex items-center rounded-full bg-white/90 px-3.5 py-1 font-sans text-xs font-semibold text-gray-900 shadow-sm backdrop-blur-md dark:bg-gray-900/90 dark:text-white">
            Featured Story
          </span>
        </div>
      </div>

      <!-- Feature Metadata & Story -->
      <div class="flex flex-col justify-center lg:col-span-5">
        <!-- Topic & Read time -->
        <div class="mb-4 flex items-center gap-3">
          <span class="rounded-full bg-gray-200 px-3 py-1 font-sans text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {{ post.category?.name ?? 'Engineering' }}
          </span>
          <span class="font-sans text-xs text-gray-400">6 min read</span>
        </div>

        <!-- Headline -->
        <h2 class="font-sans text-2xl font-bold tracking-tight text-gray-900 transition-colors dark:text-white sm:text-3xl lg:text-3xl xl:text-4xl lg:leading-[1.15]">
          {{ post.title }}
        </h2>

        <!-- Excerpt -->
        <p class="mt-4 line-clamp-3 text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {{ post.body }}
        </p>

        <!-- Author / Footer Byline -->
        <div class="mt-8 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="post.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${post.author?.id ?? 1}`"
              :alt="post.author?.name ?? 'Author'"
              size="sm"
              class="ring-2 ring-white dark:ring-gray-800"
            />
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ post.author?.name ?? 'Editorial Staff' }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Principal Contributor
              </p>
            </div>
          </div>

          <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-4 py-2 font-sans text-xs font-semibold text-white transition-all group-hover:scale-105 dark:bg-white dark:text-gray-900">
            Read story
            <UIcon name="i-lucide-arrow-right" class="size-3.5" />
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '~/composables/usePost'

defineProps<{
  post: Post
}>()
</script>
