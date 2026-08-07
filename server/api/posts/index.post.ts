import { posts } from '~~/server/database/schema'
import { createPostSchema } from '~~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = createPostSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validasi gagal',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const db = useDrizzle(event)

  const [newPost] = await db.insert(posts).values(parsed.data).returning()

  return { success: true, data: newPost }
})