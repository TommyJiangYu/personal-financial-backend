import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

export const DEFAULT_SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const INJECTION_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  {
    pattern: /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/i,
    label: 'ignore_instructions',
  },
  {
    pattern: /forget\s+(everything|what|all)/i,
    label: 'forget_everything',
  },
  {
    pattern: /you\s+are\s+now\s+/i,
    label: 'role_change',
  },
  {
    pattern: /act\s+as\s+(an?\s+)?(ai|bot|assistant)\s+(without|with\s+no)/i,
    label: 'act_as_unrestricted',
  },
  {
    pattern: /do\s+anything\s+now/i,
    label: 'dan_mode',
  },
  {
    pattern: /jailbreak/i,
    label: 'jailbreak_keyword',
  },
  {
    pattern: /system\s+(prompt|instruction)/i,
    label: 'system_prompt_fishing',
  },
  {
    pattern: /disregard\s+(all\s+)?(previous|prior)/i,
    label: 'disregard',
  },
  {
    pattern: /new\s+persona/i,
    label: 'new_persona',
  },
  {
    pattern: /without\s+(any\s+)?restrictions?/i,
    label: 'no_restrictions',
  },
  {
    pattern: /ลืมคำสั่ง/,
    label: 'th_forget_instructions',
  },
  {
    pattern: /เปลี่ยนบทบาท/,
    label: 'th_change_role',
  },
  {
    pattern: /บอก\s*system/,
    label: 'th_reveal_system',
  },
  {
    pattern: /ไม่มีข้อจำกัด/,
    label: 'th_no_restrictions',
  },
  {
    pattern: /สวมบทบาท/,
    label: 'th_roleplay',
  },
];

export const OUTPUT_SENSITIVE_PATTERNS: Array<{
  pattern: RegExp;
  label: string;
}> = [
  {
    pattern: /security_rules/gi,
    label: 'security_rules_section_leak',
  },
  {
    pattern: /system\s+(prompt|instruction)/gi,
    label: 'system_prompt_mention',
  },
  {
    pattern: /AIzaSy[A-Za-z0-9_-]{35}/g,
    label: 'google_api_key_format',
  },
  {
    pattern: /api_?key\s*[:=]\s*\S+/gi,
    label: 'api_key_assignment',
  },
];
