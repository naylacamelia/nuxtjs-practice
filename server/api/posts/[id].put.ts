import { eq } from 'drizzle-orm'
import { posts } from '~~/server/database/schema'
import { z } from 'zod'

const updatePostSchema = z.object({
  title: z.string().trim().min(3).max(200).optional(),
  body: z.string().trim().min(10).optional(),
  categoryId: z.number().int().positive().optional(),
  imageUrl: z.string().url().optional()
})

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const body = await readBody(event)
  const parsed = updatePostSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validasi gagal',
      data: parsed.error.flatten().fieldErrors
    })
  }

  const db = useDrizzle(event)

  const [updated] = await db
    .update(posts)
    .set(parsed.data)
    .where(eq(posts.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Post tidak ditemukan' })
  }

  return successResponse(updated)
})