export interface Post {
  id: number
  title: string
  body: string
  imageUrl: string | null
  createdAt: string
  author: {
    id: number
    name: string
    avatarUrl: string | null
  }
  category: {
    id: number
    name: string
  } | null
  likes: { userId: number }[]
  comments: {
    id: number
    body: string
    author: { id: number; name: string; avatarUrl: string | null }
  }[]
  postTags: {
    tag: { id: number; name: string }
  }[]
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export function useFetchPosts() {
  return useFetch('/api/posts', {
    server: false,
    lazy: true,
    transform: (res: ApiResponse<Post[]> | null): Post[] => res?.data ?? []
  })
}

export function useFetchPost(id: string) {
  return useFetch(`/api/posts/${id}`, {
    server: false,
    lazy: true,
    transform: (res: ApiResponse<Post> | null): Post | null => res?.data ?? null
  })
}