<template>
  <article class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">


    <div
      v-if="status === 'pending'"
      class="py-20 text-center text-gray-500"
    >
      Loading article...
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600"
    >
      Failed to load article.
    </div>

    <template v-else-if="post">
      <!-- Category -->
      <div
        class="mt-8 flex flex-wrap items-center gap-3"
      >
        <UBadge
          color="neutral"
          variant="soft"
        >
          Development
        </UBadge>

        <span class="text-sm text-gray-500">
          5 min read
        </span>
      </div>

      <!-- Title -->
      <h1
        class="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white lg:text-5xl"
      >
        {{ post.title }}
      </h1>

      <!-- Subtitle -->
      <p
        class="mt-5 text-lg leading-8 text-gray-500 dark:text-gray-400"
      >
        Learn modern web development with Vue, Nuxt and TypeScript through practical examples and best practices.
      </p>

      <!-- Author -->
      <div
        class="mt-8 flex items-center justify-between border-y border-gray-200 py-6 dark:border-gray-800"
      >
        <div class="flex items-center gap-4">
          <UAvatar
            :src="`https://i.pravatar.cc/100?img=${post.userId}`"
            :alt="`User ${post.userId}`"
            size="lg"
          />

          <div>
            <p
              class="font-semibold text-gray-900 dark:text-white"
            >
              User {{ post.userId }}
            </p>

            <p
              class="text-sm text-gray-500"
            >
              Published today
            </p>
          </div>
        </div>

        <div
          class="hidden items-center gap-4 text-gray-500 md:flex"
        >
          <UIcon name="i-lucide-heart" />
          <span>234</span>

          <UIcon name="i-lucide-message-circle" />
          <span>18</span>

          <UIcon name="i-lucide-bookmark" />
        </div>
      </div>

      <!-- Hero -->
      <div
        class="mt-10 overflow-hidden rounded-3xl"
      >
        <NuxtImg
          :src="`https://picsum.photos/seed/${post.id}/1200/700`"
          :alt="post.title"
          width="1200"
          height="700"
          class="w-full object-cover"
        />
      </div>

      <!-- Content -->
      <div
        class="prose prose-lg mt-12 max-w-none dark:prose-invert"
      >
        <p>
          {{ post.body }}
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
          dignissimos doloremque reprehenderit, deleniti minima neque expedita
          repellat architecto modi sequi.
        </p>

        <h2>Why it matters</h2>

        <p>
          Modern frontend development focuses not only on building interfaces,
          but also on delivering excellent developer experience, performance,
          accessibility and maintainability.
        </p>

        <blockquote>
          Great software is built by solving problems, not by writing more code.
        </blockquote>

        <p>
          Nuxt provides a complete solution for creating production-ready
          applications with server-side rendering, routing and data fetching
          already integrated.
        </p>
      </div>

      <!-- Tags -->
      <div
        class="mt-14 flex flex-wrap gap-3"
      >
        <UBadge
          color="neutral"
          variant="soft"
        >
          Vue
        </UBadge>

        <UBadge
          color="neutral"
          variant="soft"
        >
          Nuxt
        </UBadge>

        <UBadge
          color="neutral"
          variant="soft"
        >
          TypeScript
        </UBadge>

        <UBadge
          color="neutral"
          variant="soft"
        >
          Tailwind
        </UBadge>
      </div>
<section class="mt-12 border-t border-gray-100 pt-8">
  <h2 class="text-lg font-semibold mb-4">
    Komentar ({{ post.comments.length }})
  </h2>

  <!-- Form komentar baru -->
  <div class="flex gap-3 mb-8">
    <UTextarea
      v-model="commentText"
      placeholder="Tulis komentar..."
      class="flex-1"
      :rows="2"
    />
    <UButton
      :loading="submittingComment"
      :disabled="!commentText.trim()"
      @click="handleSubmitComment"
    >
      Kirim
    </UButton>
  </div>

  <!-- Daftar komentar -->
  <div class="space-y-6">
    <div v-for="comment in post.comments" :key="comment.id" class="flex gap-3">
      <img
        :src="comment.author.avatarUrl ?? undefined"
        class="size-8 rounded-full"
      />
      <div>
        <p class="text-sm font-medium">{{ comment.author.name }}</p>
        <p class="text-sm text-gray-600">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</section>
      <!-- Footer -->
      <div
        class="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800"
      >
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 font-medium transition hover:text-primary"
        >
          <UIcon
            name="i-lucide-arrow-left"
          />

          Explore more articles
        </NuxtLink>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const postId = Number(route.params.id)
const { data: post, refresh, error, status } = await useFetchPost(route.params.id as string)

const { submit, pending: submittingComment } = useAddComment(postId)
const commentText = ref('')

async function handleSubmitComment() {
  if (!commentText.value.trim()) return

  await submit(commentText.value)
  commentText.value = ''
  await refresh() // ambil ulang data post, biar komentar baru langsung muncul
}
</script>