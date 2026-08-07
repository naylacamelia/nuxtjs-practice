export function useFetchPosts() {
  return useFetch('/api/posts', {
    transform: (res: any) => res.data
  })
}

export function useFetchPost(id: string) {
  return useFetch(`/api/posts/${id}`, {
    transform: (res: any) => res.data
  })
}

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
  comments: { id: number; body: string }[]
}