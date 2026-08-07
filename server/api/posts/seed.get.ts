import { seed } from '~~/server/database/seed'

export default defineEventHandler(async (event) => {
  const db = useDrizzle(event)
  await seed(db)
  return { success: true, message: 'Seed berhasil' }
})