import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'

// 1. USERS
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatarUrl: text('avatar_url'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})

// 2. CATEGORIES (buat badge "Development", tabs topics)
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique()
})

// 3. POSTS
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  categoryId: integer('category_id').references(() => categories.id),
  title: text('title').notNull(),
  body: text('body').notNull(),
  imageUrl: text('image_url'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})

// 4. COMMENTS
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id').notNull().references(() => posts.id),
  userId: integer('user_id').notNull().references(() => users.id),
  body: text('body').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})

// 5. LIKES (siapa nge-like post apa)
export const likes = sqliteTable('likes', {
  postId: integer('post_id').notNull().references(() => posts.id),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
}, table => ({
  pk: primaryKey({ columns: [table.postId, table.userId] })
}))

// 6. TAGS (Vue, Nuxt, TypeScript, dst — beda dari category, bisa banyak per post)
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique()
})

// 7. POST_TAGS (tabel penghubung many-to-many antara posts & tags)
export const postTags = sqliteTable('post_tags', {
  postId: integer('post_id').notNull().references(() => posts.id),
  tagId: integer('tag_id').notNull().references(() => tags.id)
}, table => ({
  pk: primaryKey({ columns: [table.postId, table.tagId] })
}))

// ── RELATIONS (buat query gabungan nanti, misal "ambil post + user + comments sekaligus") ──
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes)
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.userId], references: [users.id] }),
  category: one(categories, { fields: [posts.categoryId], references: [categories.id] }),
  comments: many(comments),
  likes: many(likes),
  postTags: many(postTags)
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  author: one(users, { fields: [comments.userId], references: [users.id] })
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags)
}))

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, { fields: [postTags.postId], references: [posts.id] }),
  tag: one(tags, { fields: [postTags.tagId], references: [tags.id] })
}))