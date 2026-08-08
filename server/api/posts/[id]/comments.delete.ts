import { eq, and } from 'drizzle-orm'
import { comments } from '~~/server/database/schema'
import { z } from 'zod'

const deleteCommentSchema = z.object({
  commentId: z.coerce.number().int().positive('commentId wajib diisi'),
  userId: z.coerce.number().int().positive('userId wajib diisi')
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const body = await readBody(event).catch(() => ({}))

  const rawData = {
    commentId: query.commentId || body?.commentId,
    userId: query.userId || body?.userId
  }

  const parsed = deleteCommentSchema.safeParse(rawData)

  if (!parsed.success) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Validasi gagal', 
      data: parsed.error.flatten().fieldErrors 
    })
  }

  const { commentId, userId } = parsed.data
  const db = useDrizzle(event)

  const existing = await db.query.comments.findFirst({
    where: (comments, { eq }) => eq(comments.id, commentId)
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Komentar tidak ditemukan' })
  }

  if (existing.userId !== userId) {
    throw createError({ 
      statusCode: 403, 
      statusMessage: `Gagal menghapus: Komentar ini milik userId ${existing.userId}, bukan userId ${userId}` 
    })
  }

  await db.delete(comments).where(eq(comments.id, commentId))

  return successResponse({ message: 'Komentar berhasil dihapus', id: commentId })
})