import { config } from 'dotenv';
import { join } from 'path';
import { defineConfig } from 'prisma/config';

config({ path: join(process.cwd(), '.env') });

export default defineConfig({
  schema: join(process.cwd(), 'prisma/schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL as string,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL as string,
  },
});
