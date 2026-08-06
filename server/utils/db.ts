import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'
import type { H3Event } from 'h3'

export function useDrizzle(event: H3Event) {
  // Ambil binding D1 dari event context Cloudflare
  const cloudflareEnv = event.context.cloudflare?.env

  if (!cloudflareEnv || !cloudflareEnv.DB) {
    throw new Error('Database binding "DB" tidak ditemukan. Pastikan Nitro preset diset ke cloudflare-pages / cloudflare-module.')
  }

  return drizzle(cloudflareEnv.DB, { schema })
}