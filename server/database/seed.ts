import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export async function seed(db: ReturnType<typeof drizzle>) {
  const [user] = await db.insert(schema.users).values({
    name: 'Nayla',
    email: 'nayla@example.com',
    avatarUrl: 'https://i.pravatar.cc/100?img=1'
  }).returning()

  const [category] = await db.insert(schema.categories).values({
    name: 'Development'
  }).returning()

  await db.insert(schema.posts).values({
    userId: user.id,
    categoryId: category.id,
    title: 'Belajar Nuxt 3 dari Nol',
    body: 'Ini artikel dummy pertama buat ngetest koneksi database D1...',
    imageUrl: 'https://picsum.photos/seed/1/400/300'
  })
}