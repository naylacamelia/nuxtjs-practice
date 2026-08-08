// Sementara — nanti diganti dari session/auth beneran
// Sementara — nanti diganti dari session/auth beneran
// app/composables/useInteractions.ts
export const CURRENT_USER_ID = 2

export function useToggleLike(postId: number) {
  const pending = ref(false)

  async function toggle() {
    if (pending.value) return null

    pending.value = true
    try {
      const res = await $fetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        body: { userId: CURRENT_USER_ID }
      })
      return res.data.liked as boolean
    } catch (err) {
      console.error('Gagal toggle like:', err)
      return null
    } finally {
      pending.value = false
    }
  }

  return { toggle, pending }
}
export function useAddComment(postId: number) {
  const pending = ref(false)

  async function submit(body: string) {
    pending.value = true
    try {
      const res = await $fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: { userId: CURRENT_USER_ID, body }
      })
      return res.data
    } finally {
      pending.value = false
    }
  }

  return { submit, pending }
}

