
export const CURRENT_USER_ID = 2

interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface Comment {
  id: number
  body: string
  postId?: number
  userId?: number
  user_id?: number
  author?: {
    id: number
    name: string
    avatarUrl: string | null
  }
}

export function useToggleLike(postId: number) {
  const pending = ref(false)

  async function toggle() {
    if (pending.value) return null

    pending.value = true
    try {
      const res = await $fetch<ApiResponse<{ liked: boolean }>>(`/api/posts/${postId}/likes`, {
        method: 'POST',
        body: { userId: CURRENT_USER_ID }
      })
      return res.data.liked
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
      const res = await $fetch<ApiResponse<Comment>>(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: { userId: CURRENT_USER_ID, body }
      })
      return res.data
    } catch (err) {
      console.error('Gagal menambah komentar:', err)
      return null
    } finally {
      pending.value = false
    }
  }

  return { submit, pending }
}

export function useEditComment(postId?: number) {
  const pending = ref(false)

  async function edit(commentId: number, body: string) {
    pending.value = true
    try {
      const res = await $fetch<ApiResponse<Comment>>(`/api/posts/${postId ?? 0}/comments`, {
        method: 'PUT',
        body: { 
          commentId, 
          userId: CURRENT_USER_ID, 
          body 
        }
      })
      return res.data
    } catch (err) {
      console.error('Gagal edit komentar:', err)
      return null
    } finally {
      pending.value = false
    }
  }

  return { edit, pending }
}
export function useDeleteComment(postId?: number) {
  const pending = ref(false)

  async function remove(commentId: number) {
    pending.value = true
    try {
      await $fetch<ApiResponse<{ message: string, id: number }>>(`/api/posts/${postId ?? 0}/comments`, {
        method: 'DELETE',
        body: { 
          commentId, 
          userId: CURRENT_USER_ID 
        }
      })
      return true
    } catch (err) {
      console.error('Gagal hapus komentar:', err)
      return false
    } finally {
      pending.value = false
    }
  }

  return { remove, pending }
}