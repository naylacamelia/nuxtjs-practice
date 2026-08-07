export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID artikel tidak valid'
    })
  }

  const db = useDrizzle(event)

  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      author: true,
      category: true,
      comments: {
        with: { author: true }
      },
      postTags: { with: { tag: true } }
    }
  })

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artikel tidak ditemukan'
    })
  }

  return successResponse(post)   // ← ini yang kurang
})