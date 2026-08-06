export default defineEventHandler(async (event) => {
  const db = useDrizzle(event)

  const allPosts = await db.query.posts.findMany({
    with: {
      author: true,
      category: true
    },
    orderBy: (posts, { desc }) => [desc(posts.createdAt)]
  })

  return allPosts
})