// Sementara — nanti diganti dari session/auth beneran
const CURRENT_USER_ID = 1

export function useToggleLike(postId: number) {
  const pending = ref(false)

  async function toggle() {
    pending.value = true
    try {
      const res = await $fetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        body: { userId: CURRENT_USER_ID }
      })
      return res.data.liked as boolean
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