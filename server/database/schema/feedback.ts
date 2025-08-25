import { nanoid } from 'nanoid'
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const feedback = sqliteTable('feedback', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  rating: text('rating').notNull(),
  feedback: text('feedback'),
  path: text('path').notNull(),
  title: text('title').notNull(),
  country: text('country').notNull(),
  fingerprint: text('fingerprint').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(
    () => new Date(),
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
}, table => [uniqueIndex('path_fingerprint_idx').on(table.path, table.fingerprint)])