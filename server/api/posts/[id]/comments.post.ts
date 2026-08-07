import { z } from 'zod'
import { comments } from '~~/server/database/schema'


const createCommentSchema = z.object({
  userId: z.number().int().positive(),
  body: z.string().trim().min(1, 'Komentar tidak boleh kosong').max(1000)
})

export default defineEventHandler(async (event) => {
  const postId = Number(getRouterParam(event, 'id'))
  if (!postId) {
    throw createError({ statusCode: 400, statusMessage: 'postId tidak valid' })
  }

  const body = await readBody(event)
  const parsed = createCommentSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validasi gagal',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const db = useDrizzle(event)

  const [newComment] = await db.insert(comments).values({
    postId,
    userId: parsed.data.userId,
    body: parsed.data.body
  }).returning()

  return successResponse(newComment)
})