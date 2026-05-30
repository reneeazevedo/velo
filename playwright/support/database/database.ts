import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

const isSupabase = process.env.DATABASE_URL?.includes('supabase.com')

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
})

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: pool as ConstructorParameters<typeof PostgresDialect>[0]['pool'],
  }),
})
