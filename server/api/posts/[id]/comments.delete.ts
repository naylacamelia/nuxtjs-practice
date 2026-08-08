import { eq } from 'drizzle-orm'
import { comments } from '~~/server/database/schema'
import { z } from 'zod'

const deleteCommentSchema = z.object({
  commentId: z.number().int().positive('commentId is required'),
  userId: z.number().int().positive('userId is required')
})

export default defineEventHandler(async (event) => {
  assertMethod(event, ['DELETE'])

  const body = await readBody(event).catch(() => ({}))
  const parsed = deleteCommentSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { commentId, userId } = parsed.data
  const db = useDrizzle(event)

  const existing = await db.query.comments.findFirst({
    where: (comments, { eq }) => eq(comments.id, commentId)
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Comment not found'
    })
  }

  if (existing.userId !== userId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to delete this comment'
    })
  }

  await db.delete(comments).where(eq(comments.id, commentId))

  return {
    success: true,
    message: 'Comment deleted successfully',
    id: commentId
  }
})