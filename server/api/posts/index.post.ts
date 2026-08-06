import { posts } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title || !body.body || !body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'title, body, dan userId wajib diisi'
    })
  }

  const db = useDrizzle(event)

  const [newPost] = await db.insert(posts).values({
    title: body.title,
    body: body.body,
    userId: body.userId,
    categoryId: body.categoryId ?? null,
    imageUrl: body.imageUrl ?? null
  }).returning()

  return newPost
})