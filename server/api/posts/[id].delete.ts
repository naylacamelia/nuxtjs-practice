import { eq } from 'drizzle-orm'
import { posts } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })
  }

  const db = useDrizzle(event)

  const [deleted] = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning()

  if (!deleted) {
    throw createError({ statusCode: 404, statusMessage: 'Post tidak ditemukan' })
  }

  return successResponse({ message: 'Post berhasil dihapus', id: deleted.id })
})