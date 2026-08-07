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

