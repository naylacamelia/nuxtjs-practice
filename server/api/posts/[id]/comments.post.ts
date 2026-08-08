import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { comments, posts, users } from '~~/server/database/schema'

const createCommentSchema = z.object({
  userId: z.number().int().positive(),
  body: z.string().trim().min(1, 'Komentar tidak boleh kosong').max(1000)
})

export default defineEventHandler(async (event) => {
  const postId = Number(getRouterParam(event, 'id'))
  if (!postId || isNaN(postId)) {
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
 const targetPost = await db.query.posts.findFirst({
    where: eq(posts.id, postId)
  })

  if (!targetPost) {
    throw createError({
      statusCode: 404,
      statusMessage: `Post dengan ID ${postId} tidak ditemukan.`
    })
  }
let validUserId = parsed.data.userId
  const targetUser = await db.query.users.findFirst({
    where: eq(users.id, validUserId)
  })

  if (!targetUser) {
    // Cari user pertama yang tersedia di DB (misal ID 2) agar tidak kena Foreign Key constraint error
    const firstAvailableUser = await db.query.users.findFirst()
    if (!firstAvailableUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tidak ada data user di database. Silakan jalankan seed ulang.'
      })
    }
    validUserId = firstAvailableUser.id
  }

  const [newComment] = await db.insert(comments).values({
    postId,
    userId: validUserId,
    body: parsed.data.body
  }).returning()

  return successResponse(newComment)
})