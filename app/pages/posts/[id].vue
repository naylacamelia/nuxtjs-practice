
<template>
  <article class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- State Loading -->
    <div
      v-if="status === 'pending'"
      class="py-20 text-center text-gray-500"
    >
      Loading article...
    </div>

    <!-- State Error -->
    <div
      v-else-if="error || !post"
      class="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600"
    >
      Failed to load article or article not found.
    </div>

    <!-- State Berhasil Memuat Data -->
    <template v-else>
      <!-- Category -->
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <UBadge v-if="post.category?.name">
          {{ post.category.name }}
        </UBadge>

        <span class="text-sm text-gray-500">
          5 min read
        </span>
      </div>

      <!-- Title -->
      <h1 class="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white lg:text-5xl">
        {{ post.title }}
      </h1>

      <!-- Author & Stats -->
      <div class="mt-8 flex items-center justify-between border-y border-gray-200 py-6 dark:border-gray-800">
        <div class="flex items-center gap-4">
          <UAvatar
            :src="post.author?.avatarUrl ?? undefined"
            :alt="post.author?.name ?? 'Author'"
            size="lg"
          />

          <div>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ post.author?.name ?? 'User' }}
            </p>

            <p class="text-sm text-gray-500">
              Published today
            </p>
          </div>
        </div>

        <div class="hidden items-center gap-4 text-gray-500 md:flex">
          <div class="flex items-center gap-1 cursor-pointer select-none">
            <UIcon
              name="i-lucide-star"
              :class="isLiked && 'fill-current text-yellow-400'"
              @click.stop.prevent="handleLike"
            />
            <span>{{ likeCount }}</span>
          </div>

          <div class="flex items-center gap-1">
            <UIcon name="i-lucide-message-circle" />
            <span>{{ post.comments?.length ?? 0 }}</span>
          </div>

          <UIcon name="i-lucide-bookmark" />
        </div>
      </div>

      <!-- Hero Image -->
      <div class="mt-10 overflow-hidden rounded-3xl">
        <NuxtImg
          :src="post.imageUrl ?? `https://picsum.photos/seed/${post.id}/1200/700`"
          :alt="post.title"
          width="1200"
          height="700"
          class="w-full object-cover"
        />
      </div>

      <!-- Article Body -->
      <div class="prose prose-lg mt-12 max-w-none dark:prose-invert">
        <p>{{ post.body }}</p>
      </div>

      <!-- Comments Section -->
      <section class="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
        <h2 class="mb-4 text-lg font-semibold">
          Komentar ({{ post.comments?.length ?? 0 }})
        </h2>

        <!-- Form Komentar Baru -->
        <div class="mb-8 flex gap-3">
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

        <!-- Daftar Komentar -->
        <div class="space-y-6">
          <div
            v-for="comment in post.comments"
            :key="comment.id"
            class="flex gap-3"
          >
            <UAvatar
              :src="comment.author?.avatarUrl ?? undefined"
              :alt="comment.author?.name ?? 'User'"
              size="xs"
            />

            <div class="flex-1">
              <p class="text-sm font-medium">
                {{ comment.author?.name ?? 'User' }}
              </p>

              <!-- Mode edit -->
              <div v-if="editingCommentId === comment.id" class="mt-1 flex gap-2">
                <UTextarea v-model="editText" class="flex-1" :rows="2" />
                <div class="flex flex-col gap-1">
                  <UButton size="xs" :loading="editPending" @click="handleSaveEdit(comment.id)">
                    Simpan
                  </UButton>
                  <UButton size="xs" variant="ghost" @click="cancelEdit">
                    Batal
                  </UButton>
                </div>
              </div>
              <p
                v-if="editErrorMessage && editingCommentId === comment.id"
                class="mt-1 text-xs text-red-500"
              >
                {{ editErrorMessage }}
              </p>

              <!-- Mode tampil biasa -->
              <template v-else>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ comment.body }}
                </p>

                <!-- Tombol edit/hapus -->
            <!-- Tombol edit/hapus -->
<div
  v-if="comment.author.id === CURRENT_USER_ID"
  class="mt-1 flex gap-3 text-xs text-gray-400"
>
  <button class="hover:text-gray-700" @click="startEdit(comment)">
    Edit
  </button>
  <button
    class="hover:text-red-500"
    :disabled="deletePending"
    @click="askDeleteComment(comment.id)"
  >
    Hapus
  </button>
</div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Navigation -->
      <div class="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 font-medium transition hover:text-primary"
        >
          <UIcon name="i-lucide-arrow-left" />
          Explore more articles
        </NuxtLink>
      </div>
    </template>

    <UiConfirmDialog
      v-model="showDeleteConfirm"
      title="Hapus komentar?"
      description="Komentar yang dihapus tidak bisa dikembalikan."
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

const { data: post, refresh, error, status } = await useFetchPost(paramId)

// --- Komentar: tambah ---
const { submit, pending: submittingComment } = useAddComment(postId)
const commentText = ref('')

async function handleSubmitComment() {
  if (!commentText.value.trim()) return

  await submit(commentText.value)
  commentText.value = ''
  await refresh()
}

// --- Komentar ---
const { edit, pending: editPending } = useEditComment(postId)
const editingCommentId = ref<number | null>(null)
const editText = ref('')
const editErrorMessage = ref('')

function startEdit(comment: { id: number, body: string }) {
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
    editErrorMessage.value = 'Gagal menyimpan perubahan. Pastikan ini komentar milikmu sendiri.'
    return
  }

  editingCommentId.value = null
  await refresh()
}

// --- Komentar: hapus (Sertakan postId) ---
const { remove, pending: deletePending } = useDeleteComment(postId)
const showDeleteConfirm = ref(false)
const commentToDelete = ref<number | null>(null)

function askDeleteComment(commentId: number) {
  commentToDelete.value = commentId
  showDeleteConfirm.value = true
}

async function confirmDeleteComment() {
  if (!commentToDelete.value) return

  const success = await remove(commentToDelete.value)

  if (success) {
    await refresh()
  }

  showDeleteConfirm.value = false
  commentToDelete.value = null
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