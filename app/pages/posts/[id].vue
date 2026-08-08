<template>
  <article class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- State Loading -->
    <div
      v-if="status === 'pending' && !post"
      class="flex flex-col items-center justify-center py-24 text-gray-500 dark:text-gray-400"
    >
      <UIcon name="i-lucide-loader-2" class="mb-3 size-8 animate-spin text-amber-500" />
      <p class="text-sm font-medium">Memuat artikel...</p>
    </div>

    <!-- State Error -->
    <div
      v-else-if="error || !post"
      class="rounded-2xl border border-red-200 bg-red-50/50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400"
    >
      <UIcon name="i-lucide-alert-triangle" class="mx-auto mb-2 size-8" />
      <p class="font-semibold">Gagal memuat artikel atau artikel tidak ditemukan.</p>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Meta Atas & Kategori -->
      <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
        <span
          v-if="post.category?.name"
          class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
        >
          {{ post.category.name }}
        </span>
        <span v-if="post.category?.name" class="text-xs text-gray-400">•</span>
        <span>5 min read</span>
      </div>

      <!-- Judul Artikel -->
      <h1
        class="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl lg:leading-tight"
      >
        {{ post.title }}
      </h1>

      <!-- Info Author & Toolbar Interaksi -->
      <div
        class="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4 dark:border-gray-800"
      >
        <div class="flex items-center gap-3">
          <UAvatar
            :src="post.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${post.author?.id ?? 1}`"
            :alt="post.author?.name ?? 'User'"
            size="md"
            class="ring-1 ring-gray-200 dark:ring-gray-800"
          />
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {{ post.author?.name ?? 'User' }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Published today
            </p>
          </div>
        </div>

        <!--  (Like & Komentar Counter) -->
        <ClientOnly>
          <div class="flex items-center gap-5 text-gray-500 dark:text-gray-400">
            <button
              class="flex items-center gap-1.5 transition-colors hover:text-amber-500 dark:hover:text-amber-400"
              aria-label="Like post"
              @click="handleLike"
            >
              <UIcon
                name="i-lucide-star"
                class="size-5 transition-transform active:scale-110"
                :class="
                  isLiked
                    ? 'fill-amber-400 text-amber-400 dark:fill-amber-400 dark:text-amber-400'
                    : 'text-gray-500'
                "
              />
              <span class="text-sm font-medium" :class="isLiked && 'text-amber-500 dark:text-amber-400'">
                {{ likeCount }}
              </span>
            </button>

            <a
              href="#comments"
              class="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
            >
              <UIcon name="i-lucide-message-circle" class="size-5" />
              <span class="text-sm font-medium">{{ post.comments?.length ?? 0 }}</span>
            </a>
          </div>
        </ClientOnly>
      </div>

      <!-- Hero Image -->
      <div class="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-sm dark:border-gray-800">
        <NuxtImg
          :src="post.imageUrl ?? `https://picsum.photos/seed/${post.id}/1200/700`"
          :alt="post.title"
          width="1200"
          height="700"
          class="aspect-[16/9] w-full object-cover"
        />
      </div>

      <!-- Isi Artikel -->
      <div
        class="prose prose-gray mt-10 max-w-none text-base leading-relaxed text-gray-700 dark:prose-invert dark:text-gray-300 sm:text-lg"
      >
        <p class="whitespace-pre-line">{{ post.body }}</p>
      </div>

      <!-- Section Komentar -->
      <section id="comments" class="mt-16 border-t border-gray-100 pt-10 dark:border-gray-800">
        <h2 class="mb-6 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Comments ({{ post.comments?.length ?? 0 }})
        </h2>

        <ClientOnly>
          <!-- Input Komentar Baru -->
          <div class="mb-10 flex gap-3">
            <UAvatar
              src="https://i.pravatar.cc/100?img=2"
              alt="Current User"
              size="sm"
              class="ring-1 ring-gray-200 dark:ring-gray-800"
            />
            <div class="flex-1 space-y-3">
              <UTextarea
                v-model="commentText"
                placeholder="Write a comment..."
                :rows="3"
                class="w-full rounded-xl"
              />
              <div class="flex justify-end">
                <UButton
                  :loading="submittingComment"
                  :disabled="!commentText.trim()"
                  class="rounded-full bg-amber-500 px-5 font-medium text-white hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600"
                  @click="handleSubmitComment"
                >
                  Send
                </UButton>
              </div>
            </div>
          </div>

          <!-- Daftar Komentar -->
          <div class="space-y-6">
            <div v-for="comment in post.comments" :key="comment.id" class="flex gap-3.5 text-sm">
              <UAvatar
                :src="comment.author?.avatarUrl ?? `https://i.pravatar.cc/100?img=${comment.author?.id ?? 1}`"
                :alt="comment.author?.name ?? 'User'"
                size="sm"
                class="ring-1 ring-gray-200 dark:ring-gray-800"
              />

              <div class="flex-1">
                <div class="mb-1 flex items-center gap-2">
                  <span class="font-semibold text-gray-900 dark:text-gray-100">
                    {{ comment.author?.name ?? 'User' }}
                  </span>
                </div>

                <!-- Mode Edit Komentar -->
                <div v-if="editingCommentId === comment.id" class="mt-2 space-y-2">
                  <UTextarea v-model="editText" :rows="2" class="w-full" />
                  <div class="flex items-center gap-2">
                    <UButton
                      size="xs"
                      :loading="editPending"
                      class="bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600"
                      @click="handleSaveEdit(comment.id)"
                    >
                      Simpan
                    </UButton>
                    <UButton size="xs" variant="ghost" color="neutral" @click="cancelEdit">
                      Batal
                    </UButton>
                  </div>
                  <p v-if="editErrorMessage" class="text-xs text-red-500">
                    {{ editErrorMessage }}
                  </p>
                </div>

                <template v-else>
                  <p class="leading-relaxed text-gray-600 dark:text-gray-300">
                    {{ comment.body }}
                  </p>

                  <div v-if="comment.author?.id === CURRENT_USER_ID" class="mt-2 flex gap-3 text-xs text-gray-400">
                    <button
                      class="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                      @click="startEdit(comment)"
                    >
                      Edit
                    </button>
                    <button
                      class="transition-colors hover:text-red-500"
                      :disabled="deletePending"
                      @click="askDeleteComment(comment.id)"
                    >
                      Delete
                    </button>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </ClientOnly>
      </section>
    </template>

    <!-- Modal Konfirmasi Hapus -->
    <UiConfirmDialog
      v-model="showDeleteConfirm"
      title="Delete Comment?"
      description="The comment you are about to delete cannot be recovered."
      :loading="deletePending"
      @confirm="confirmDeleteComment"
    />
  </article>
</template>

<script setup lang="ts">
const CURRENT_USER_ID = 2

const route = useRoute()
const paramId = route.params.id as string
const postId = Number(paramId)

const { data: post, refresh, error, status } = useFetchPost(paramId)

// --- Komentar: Tambah ---
const { submit, pending: submittingComment } = useAddComment(postId)
const commentText = ref('')

async function handleSubmitComment() {
  if (!commentText.value.trim()) return

  await submit(commentText.value)
  commentText.value = ''
  await refresh()
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
    editErrorMessage.value = 'Failed to update comment. Make sure this comment belongs to you.'
    return
  }

  editingCommentId.value = null
  await refresh()
}

// --- Komentar: Hapus ---
const { remove, pending: deletePending } = useDeleteComment(postId)
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
</script>