import { eq } from 'drizzle-orm'
import { comments } from '~~/server/database/schema'
import { z } from 'zod'

const updateCommentSchema = z.object({
  commentId: z.number().int().positive('commentId wajib diisi'),
  userId: z.number().int().positive('userId wajib diisi'),
  body: z.string().trim().min(1, 'Komentar tidak boleh kosong').max(1000)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = updateCommentSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validasi gagal',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const { commentId, userId, body: commentBody } = parsed.data
  const db = useDrizzle(event)

  // Cari berdasarkan commentId
  const existing = await db.query.comments.findFirst({
    where: (comments, { eq }) => eq(comments.id, commentId)
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Komentar tidak ditemukan' })
  }

  if (existing.userId !== userId) {
    throw createError({ statusCode: 403, statusMessage: 'Kamu tidak bisa mengedit komentar orang lain' })
  }

  const [updated] = await db
    .update(comments)
    .set({ body: commentBody })
    .where(eq(comments.id, commentId))
    .returning()

  return successResponse(updated)
})