import { successResponse } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
  const db = useDrizzle(event)
const allPosts = await db.query.posts.findMany({
  with: {
    author: true,
    category: true,
    likes: true,
    comments: true,
    postTags: { with: { tag: true } }   // ← pastikan ada ini juga
  },
  orderBy: (posts, { desc }) => [desc(posts.createdAt)]
})
  return successResponse(allPosts)
  
})