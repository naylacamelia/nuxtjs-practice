import { and, eq } from 'drizzle-orm'
import { likes } from '~~/server/database/schema'
import { z } from 'zod'

const toggleLikeSchema = z.object({
  userId: z.number().int().positive()
})

export default defineEventHandler(async (event) => {
  const postId = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const parsed = toggleLikeSchema.safeParse(body)

  if (!postId || !parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'postId/userId tidak valid' })
  }

  const { userId } = parsed.data
  const db = useDrizzle(event)

  const existing = await db.query.likes.findFirst({
    where: (likes, { and, eq }) => and(eq(likes.postId, postId), eq(likes.userId, userId))
  })

  if (existing) {
    await db
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)))

    return successResponse({ liked: false })
  }

  await db.insert(likes).values({ postId, userId })
  return successResponse({ liked: true })
})