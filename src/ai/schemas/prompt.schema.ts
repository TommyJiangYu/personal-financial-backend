import { z } from 'zod';

export const promptSchema = z
  .string()
  .min(1, { message: 'ข้อความต้องไม่ว่างเปล่า' })
  .max(1000, { message: 'ข้อความยาวเกินไป (สูงสุด 1,000 ตัวอักษร)' })
  .transform((val) => val.trim())
  .transform((val) => val.replace(/\n{3,}/g, '\n\n'));

export type SanitizedPrompt = z.infer<typeof promptSchema>;
