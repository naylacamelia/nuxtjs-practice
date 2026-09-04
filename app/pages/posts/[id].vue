<template>
  <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Breadcrumb & Back Navigation -->
    <div class="mb-8 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 font-mono text-xs text-[#64748B] transition-colors hover:text-[#5B8C9C] dark:text-[#94A3B8] dark:hover:text-[#7BAAB9]"
      >
        <UIcon name="i-lucide-arrow-left" class="size-4" />
        <span>Back to Dispatches</span>
      </NuxtLink>

      <span class="font-mono text-xs text-[#94A3B8]">Published Article</span>
    </div>

    <!-- Loading State -->
    <div
      v-if="status === 'pending' && !post"
      class="flex flex-col items-center justify-center py-24 text-[#64748B]"
    >
      <UIcon name="i-lucide-loader-2" class="mb-3 size-8 animate-spin text-[#5B8C9C]" />
      <p class="font-mono text-xs">Retrieving dispatch...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error || !post"
      class="rounded-2xl border border-red-200/80 bg-red-50/60 p-8 text-center text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400"
    >
      <UIcon name="i-lucide-alert-triangle" class="mx-auto mb-3 size-8 text-red-500" />
      <h2 class="font-sans text-lg font-bold">Article not found or failed to load</h2>
      <p class="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">The requested article could not be loaded. Please return to the homepage.</p>
      <NuxtLink to="/" class="mt-4 inline-block rounded-lg bg-[#5B8C9C] px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-[#4A7685]">
        Return Home
      </NuxtLink>
    </div>

    <!-- Main Article Wrapper -->
    <article v-else class="space-y-8">
      <!-- Article Header -->
      <header class="space-y-4">
        <!-- Category & Tags -->
        <div class="flex flex-wrap items-center gap-2">
          <span
            v-if="post.category?.name"
            class="inline-flex items-center rounded-full bg-[#E2E8F0] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#5B8C9C] dark:bg-[#1E293B] dark:text-[#7BAAB9]"
          >
            {{ post.category.name }}
          </span>
          <span
            v-for="tagObj in post.postTags"
            :key="tagObj.tag.id"
            class="inline-flex items-center rounded-full border border-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-0.5 font-mono text-xs text-[#64748B] dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#94A3B8]"
          >
            #{{ tagObj.tag.name }}
          </span>
          <span class="font-mono text-xs text-[#94A3B8]">•</span>
          <span class="font-mono text-xs text-[#64748B] dark:text-[#94A3B8]">5 min read</span>
        </div>

        <!-- Headline -->
        <h1 class="font-sans text-3xl font-bold tracking-tight text-[#334155] dark:text-[#F1F5F9] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
          {{ post.title }}
        </h1>

        <!-- Author Byline & Social Interaction Bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-y border-[#CBD5E1]/80 py-4 dark:border-[#334155]/80">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="post.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${post.author?.id ?? 1}`"
              :alt="post.author?.name ?? 'Author'"
              size="md"
              class="ring-1 ring-[#CBD5E1] dark:ring-[#334155]"
            />
            <div>
              <p class="font-semibold text-sm text-[#334155] dark:text-[#F1F5F9]">
                {{ post.author?.name ?? 'Editorial Author' }}
              </p>
              <p class="text-xs text-[#64748B] dark:text-[#94A3B8]">
                Published in <span class="font-medium text-[#334155] dark:text-[#F1F5F9]">{{ post.category?.name ?? 'Technology' }}</span> • Today
              </p>
            </div>
          </div>

          <!-- Interaction Toolbar -->
          <ClientOnly>
            <div class="flex items-center gap-3">
              <!-- Like Button -->
              <button
                type="button"
                class="flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#334155] transition hover:border-[#5B8C9C] hover:text-[#5B8C9C] dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#F1F5F9] dark:hover:border-[#7BAAB9] dark:hover:text-[#7BAAB9]"
                :class="isLiked ? 'border-[#5B8C9C] text-[#5B8C9C] dark:border-[#7BAAB9] dark:text-[#7BAAB9] bg-[#E2E8F0]/40 dark:bg-[#1E293B]' : ''"
                aria-label="Like this article"
                @click="handleLike"
              >
                <UIcon
                  name="i-lucide-star"
                  class="size-4 transition-transform active:scale-125"
                  :class="isLiked ? 'fill-[#5B8C9C] text-[#5B8C9C]' : 'text-[#94A3B8]'"
                />
                <span class="font-mono">{{ likeCount }}</span>
              </button>

              <!-- Jump to Comments -->
              <a
                href="#comments"
                class="flex items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#334155] transition hover:bg-[#E2E8F0] dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#F1F5F9] dark:hover:bg-[#334155]"
              >
                <UIcon name="i-lucide-message-square" class="size-4 text-[#94A3B8]" />
                <span class="font-mono">{{ post.comments?.length ?? 0 }}</span>
              </a>

              <!-- Share Button -->
              <button
                type="button"
                class="flex size-8 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#64748B] transition hover:bg-[#E2E8F0] hover:text-[#334155] dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#94A3B8] dark:hover:bg-[#334155] dark:hover:text-[#F1F5F9]"
                title="Copy article link"
                @click="handleShare"
              >
                <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-share-2'" class="size-4" />
              </button>
            </div>
          </ClientOnly>
        </div>
      </header>

      <!-- Hero Visual Presentation -->
      <div class="relative overflow-hidden rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] shadow-soft dark:border-[#334155] dark:bg-[#0F172A]">
        <NuxtImg
          :src="post.imageUrl ?? `https://picsum.photos/seed/${post.id}/1200/700`"
          :alt="post.title"
          width="1200"
          height="700"
          loading="eager"
          format="webp"
          class="aspect-[16/9] w-full object-cover"
        />
        <div class="absolute inset-0 bg-[#334155]/10 mix-blend-multiply opacity-20" />
      </div>

      <!-- Article Content Body -->
      <div class="article-content border-b border-[#CBD5E1]/80 pb-12 dark:border-[#334155]/80">
        <p class="whitespace-pre-line text-lg leading-relaxed text-[#334155] dark:text-[#F1F5F9]">
          {{ post.body }}
        </p>

        <blockquote v-if="post.title">
          "Great software engineering is not merely about writing lines of code, but about communicating complex ideas clearly through thoughtful architecture."
        </blockquote>

        <p class="text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
          As platforms evolve, maintaining clear code structure, minimal abstraction overhead, and responsive user feedback ensures the product remains delightful to build and use.
        </p>
      </div>

      <!-- Comments Section -->
      <section id="comments" class="pt-6">
        <div class="mb-8 flex items-center justify-between border-b border-[#CBD5E1]/80 pb-4 dark:border-[#334155]/80">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-messages-square" class="size-5 text-[#5B8C9C] dark:text-[#7BAAB9]" />
            <h2 class="font-sans text-2xl font-bold text-[#334155] dark:text-[#F1F5F9]">
              Discussion ({{ post.comments?.length ?? 0 }})
            </h2>
          </div>
          <span class="font-mono text-xs text-[#94A3B8]">Join the conversation</span>
        </div>

        <ClientOnly>
          <!-- Comment Submission Form -->
          <div class="mb-10 rounded-2xl border border-[#CBD5E1] bg-white p-5 shadow-soft dark:border-[#334155] dark:bg-[#1E293B]">
            <div class="flex items-start gap-3">
              <UAvatar
                src="https://i.pravatar.cc/100?img=2"
                alt="Current User"
                size="sm"
                class="ring-1 ring-[#CBD5E1] dark:ring-[#334155] shrink-0"
              />
              <div class="flex-1 space-y-3">
                <textarea
                  v-model="commentText"
                  rows="3"
                  placeholder="Share your perspective or ask a technical question..."
                  class="w-full resize-y rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 text-sm text-[#334155] placeholder:text-[#94A3B8] focus:border-[#5B8C9C] focus:bg-white focus:outline-hidden dark:border-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9] dark:focus:bg-[#1E293B]"
                />

                <p v-if="commentErrorMessage" class="font-mono text-xs text-red-500">
                  {{ commentErrorMessage }}
                </p>

                <div class="flex items-center justify-between">
                  <span class="font-mono text-[11px] text-[#94A3B8]">Markdown supported</span>
                  <button
                    type="button"
                    :disabled="!commentText.trim() || submittingComment"
                    class="inline-flex items-center gap-1.5 rounded-lg bg-[#5B8C9C] px-4 py-2 font-mono text-xs font-semibold text-white transition hover:bg-[#4A7685] disabled:opacity-50"
                    @click="handleSubmitComment"
                  >
                    <UIcon v-if="submittingComment" name="i-lucide-loader-2" class="size-3.5 animate-spin" />
                    <span>{{ submittingComment ? 'Posting...' : 'Post Comment' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Comments State -->
          <div
            v-if="!post.comments || post.comments.length === 0"
            class="py-12 text-center text-[#94A3B8]"
          >
            <UIcon name="i-lucide-message-circle" class="mx-auto mb-2 size-8 text-[#CBD5E1] dark:text-[#334155]" />
            <p class="font-sans text-base font-semibold text-[#334155] dark:text-[#F1F5F9]">No responses yet</p>
            <p class="text-xs text-[#94A3B8]">Be the first to share your thoughts on this dispatch.</p>
          </div>

          <!-- Comment List -->
          <div v-else class="space-y-4">
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="rounded-2xl border border-[#CBD5E1]/70 bg-white p-5 shadow-2xs dark:border-[#334155]/70 dark:bg-[#1E293B]"
            >
              <div class="flex items-start gap-3">
                <UAvatar
                  :src="comment.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${comment.author?.id ?? 1}`"
                  :alt="comment.author?.name ?? 'Commenter'"
                  size="sm"
                  class="ring-1 ring-[#CBD5E1] dark:ring-[#334155] shrink-0"
                />

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-[#334155] dark:text-[#F1F5F9]">
                        {{ comment.author?.name ?? 'Reader' }}
                      </span>
                      <span
                        v-if="comment.author?.id === post.author?.id"
                        class="rounded-full bg-[#E2E8F0] px-2 py-0.2 text-[10px] font-mono text-[#5B8C9C] dark:bg-[#0F172A] dark:text-[#7BAAB9]"
                      >
                        Author
                      </span>
                    </div>

                    <span class="font-mono text-[11px] text-[#94A3B8]">Recently</span>
                  </div>

                  <!-- Edit Mode -->
                  <div v-if="editingCommentId === comment.id" class="mt-3 space-y-2">
                    <textarea
                      v-model="editText"
                      rows="2"
                      class="w-full rounded-lg border border-[#CBD5E1] bg-white p-2.5 text-sm text-[#334155] focus:border-[#5B8C9C] focus:outline-hidden dark:border-[#334155] dark:bg-[#0F172A] dark:text-white"
                    />
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        :disabled="editPending"
                        class="rounded-md bg-[#5B8C9C] px-3 py-1.5 font-mono text-xs font-semibold text-white hover:bg-[#4A7685]"
                        @click="handleSaveEdit(comment.id)"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="rounded-md border border-[#CBD5E1] px-3 py-1.5 font-mono text-xs text-[#334155] hover:bg-[#E2E8F0] dark:border-[#334155] dark:text-[#F1F5F9] dark:hover:bg-[#0F172A]"
                        @click="cancelEdit"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <!-- Display Mode -->
                  <template v-else>
                    <p class="mt-2 text-sm leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
                      {{ comment.body }}
                    </p>

                    <!-- Author Action Controls -->
                    <div v-if="comment.author?.id === CURRENT_USER_ID" class="mt-3 flex items-center gap-3 font-mono text-xs text-[#94A3B8]">
                      <button
                        type="button"
                        class="hover:text-[#5B8C9C] dark:hover:text-[#7BAAB9]"
                        @click="startEdit(comment)"
                      >
                        Edit
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        class="text-red-500 hover:text-red-600"
                        @click="askDeleteComment(comment.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </section>
    </article>

    <!-- Delete Confirmation Modal -->
    <UiConfirmDialog
      v-model="showDeleteConfirm"
      title="Delete response?"
      description="This comment will be permanently removed from this dispatch."
      :loading="deletePending"
      @confirm="confirmDeleteComment"
    />
  </div>
</template>

<script setup lang="ts">
const CURRENT_USER_ID = 2

const route = useRoute()
const paramId = route.params.id as string
const postId = Number(paramId)

const { data: post, refresh, error, status } = useFetchPost(paramId)

const copied = ref(false)

function handleShare() {
  if (import.meta.client) {
    navigator.clipboard?.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}

// --- Komentar: Tambah ---
const { submit, pending: submittingComment } = useAddComment(postId)
const commentText = ref('')
const commentErrorMessage = ref('')

async function handleSubmitComment() {
  if (!commentText.value.trim()) return

  commentErrorMessage.value = ''
  const result = await submit(commentText.value)
  if (result) {
    commentText.value = ''
    await refresh()
  } else {
    commentErrorMessage.value = 'Failed to submit comment. Please try again.'
  }
}

// --- Komentar: Edit ---
const { edit, pending: editPending } = useEditComment(postId)
const editingCommentId = ref<number | null>(null)
const editText = ref('')
const editErrorMessage = ref('')

function startEdit(comment: { id: number; body: string }) {
  editErrorMessage.value = ''
  editingCommentId.value = comment.id
  editText.value = comment.body
}

function cancelEdit() {
  editingCommentId.value = null
  editText.value = ''
  editErrorMessage.value = ''
}

async function handleSaveEdit(commentId: number) {
  if (!editText.value.trim()) return

  const result = await edit(commentId, editText.value)

  if (!result) {
    editErrorMessage.value = 'Failed to update comment.'
    return
  }

  editingCommentId.value = null
  await refresh()
}

// --- Komentar: Hapus ---
const { pending: deletePending } = useDeleteComment(postId)
const showDeleteConfirm = ref(false)
const commentToDelete = ref<number | null>(null)

function askDeleteComment(commentId: number) {
  commentToDelete.value = commentId
  showDeleteConfirm.value = true
}

async function confirmDeleteComment() {
  if (!commentToDelete.value) return

  deletePending.value = true

  try {
    await $fetch<{ success: boolean; message: string }>(`/api/posts/${postId}/comments`, {
      method: 'DELETE',
      query: {
        commentId: commentToDelete.value,
        userId: CURRENT_USER_ID
      }
    })

    await refresh()
  } catch (err) {
    console.error('Failed to delete comment:', err)
  } finally {
    deletePending.value = false
    showDeleteConfirm.value = false
    commentToDelete.value = null
  }
}

// --- Like ---
const { toggle, pending: likePending } = useToggleLike(postId)

const isLiked = ref(false)
const likeCount = ref(0)

watchEffect(() => {
  if (post.value) {
    const userLikes = post.value.likes ?? []
    isLiked.value = userLikes.some((l: any) => Number(l.userId) === CURRENT_USER_ID)
    likeCount.value = userLikes.length
  }
})

async function handleLike() {
  if (likePending.value) return
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
  await refresh()
}

useSeoMeta({
  title: computed(() => post.value ? `${post.value.title} · Tech Blog` : 'Article · Tech Blog'),
  description: computed(() => post.value?.body?.slice(0, 160) ?? 'Tech Blog dispatch')
})
</script>