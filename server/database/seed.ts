import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export async function seed(db: ReturnType<typeof drizzle>) {
  // 1. USERS
  const insertedUsers = await db.insert(schema.users).values([
    { name: 'Nayla', email: 'nayla@example.com', avatarUrl: 'https://i.pravatar.cc/100?img=1' },
    { name: 'Budi Santoso', email: 'budi@example.com', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
    { name: 'Sarah Putri', email: 'sarah@example.com', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
    { name: 'Rizky Ramadhan', email: 'rizky@example.com', avatarUrl: 'https://i.pravatar.cc/100?img=33' },
    { name: 'Dewi Lestari', email: 'dewi@example.com', avatarUrl: 'https://i.pravatar.cc/100?img=9' }
  ]).returning()

  // 2. CATEGORIES
  const insertedCategories = await db.insert(schema.categories).values([
    { name: 'Development' },
    { name: 'Design' },
    { name: 'Career' },
    { name: 'Tutorial' }
  ]).returning()

  // 3. TAGS
  const insertedTags = await db.insert(schema.tags).values([
    { name: 'Vue' },
    { name: 'Nuxt' },
    { name: 'TypeScript' },
    { name: 'TailwindCSS' },
    { name: 'Cloudflare' },
    { name: 'Database' }
  ]).returning()

  const [dev, design, career, tutorial] = insertedCategories
  const [vue, nuxt, ts, tailwind, cf, db_] = insertedTags

  // 4. POSTS
  const postsData = [
    { title: 'Belajar Nuxt 3 dari Nol', body: 'Nuxt 3 adalah framework full-stack berbasis Vue yang menawarkan SSR, routing otomatis, dan banyak fitur bawaan lainnya. Di artikel ini kita akan bahas dasar-dasarnya.', categoryId: dev.id, tagIds: [vue.id, nuxt.id], userId: insertedUsers[0].id },
    { title: 'Kenapa TypeScript Wajib Dipelajari Frontend Developer', body: 'TypeScript membantu menangkap error lebih awal sebelum kode dijalankan. Ini penting terutama untuk project yang tumbuh besar dan dikerjakan banyak orang.', categoryId: dev.id, tagIds: [ts.id], userId: insertedUsers[1].id },
    { title: 'Desain UI Minimalis ala Medium', body: 'Desain minimalis bukan berarti membosankan. Artikel ini membahas prinsip whitespace, tipografi, dan hierarki visual yang bikin konten mudah dibaca.', categoryId: design.id, tagIds: [tailwind.id], userId: insertedUsers[2].id },
    { title: 'Deploy Aplikasi Nuxt ke Cloudflare Pages', body: 'Cloudflare Pages menawarkan hosting gratis dengan performa edge network global. Simak cara deploy project Nuxt kamu step by step.', categoryId: tutorial.id, tagIds: [nuxt.id, cf.id], userId: insertedUsers[0].id },
    { title: 'Mengenal Cloudflare D1: Database Serverless', body: 'D1 adalah database SQLite yang berjalan di edge Cloudflare. Cocok untuk aplikasi skala kecil-menengah tanpa perlu mengelola server database sendiri.', categoryId: dev.id, tagIds: [cf.id, db_.id], userId: insertedUsers[3].id },
    { title: 'Tips Wawancara Kerja untuk Junior Developer', body: 'Wawancara teknis sering bikin gugup. Berikut beberapa tips praktis untuk persiapan, mulai dari riset perusahaan sampai latihan live coding.', categoryId: career.id, tagIds: [], userId: insertedUsers[4].id },
    { title: 'Drizzle ORM vs Prisma, Mana yang Lebih Cocok?', body: 'Keduanya adalah ORM populer di ekosistem TypeScript. Artikel ini membandingkan performa, developer experience, dan use case masing-masing.', categoryId: dev.id, tagIds: [ts.id, db_.id], userId: insertedUsers[1].id },
    { title: 'Membangun Portofolio yang Dilirik Recruiter', body: 'Portofolio yang baik bukan soal banyaknya project, tapi seberapa jelas kamu menceritakan proses dan dampaknya.', categoryId: career.id, tagIds: [], userId: insertedUsers[2].id },
    { title: 'State Management di Vue 3: Pinia vs Composables', body: 'Tidak semua project butuh Pinia. Kadang composable sederhana sudah cukup untuk mengelola state antar komponen.', categoryId: dev.id, tagIds: [vue.id], userId: insertedUsers[3].id },
    { title: 'Prinsip Dasar Desain Responsif', body: 'Responsif bukan cuma soal breakpoint. Ada prinsip mobile-first, fluid grid, dan flexible images yang perlu dipahami.', categoryId: design.id, tagIds: [tailwind.id], userId: insertedUsers[4].id }
  ]

  const insertedPosts = []
  for (const p of postsData) {
    const [post] = await db.insert(schema.posts).values({
      userId: p.userId,
      categoryId: p.categoryId,
      title: p.title,
      body: p.body,
      imageUrl: `https://picsum.photos/seed/${p.title.length}${p.userId}/600/400`
    }).returning()

    if (p.tagIds.length > 0) {
      await db.insert(schema.postTags).values(
        p.tagIds.map(tagId => ({ postId: post.id, tagId }))
      )
    }

    insertedPosts.push(post)
  }

  // 5. COMMENTS (nyebar, gak semua post dapat komentar sama banyak)
  const commentTexts = [
    'Artikel yang sangat membantu, terima kasih!',
    'Ada rekomendasi bacaan lanjutan gak untuk topik ini?',
    'Setuju banget sama poin nomor 2.',
    'Kok bagian ini agak membingungkan ya, bisa dijelasin lagi?',
    'Udah aku coba dan works, mantap!'
  ]

  for (let i = 0; i < insertedPosts.length; i++) {
    const commentCount = i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 0
    for (let c = 0; c < commentCount; c++) {
      await db.insert(schema.comments).values({
        postId: insertedPosts[i].id,
        userId: insertedUsers[(i + c + 1) % insertedUsers.length].id,
        body: commentTexts[(i + c) % commentTexts.length]
      })
    }
  }

  // 6. LIKES (nyebar juga, biar ada post yang lebih populer)
  for (let i = 0; i < insertedPosts.length; i++) {
    const likeCount = (i % insertedUsers.length) + 1
    for (let u = 0; u < likeCount; u++) {
      await db.insert(schema.likes).values({
        postId: insertedPosts[i].id,
        userId: insertedUsers[u].id
      }).onConflictDoNothing()
    }
  }

  return { users: insertedUsers.length, posts: insertedPosts.length }
}