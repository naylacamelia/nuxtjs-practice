import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().trim().min(3, 'Judul minimal 3 karakter').max(200),
  body: z.string().trim().min(10, 'Isi artikel minimal 10 karakter'),
  userId: z.number().int().positive(),
  categoryId: z.number().int().positive().optional(),
  imageUrl: z.string().url().optional()
})