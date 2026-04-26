import {
  Schema as PromptResponseSchema,
  SchemaType,
} from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OcrFormatService {
  formatResponseSchema() {
    const responseSchema: PromptResponseSchema = {
      type: SchemaType.OBJECT,
      properties: {
        sender: { type: SchemaType.STRING, description: 'ชื่อผู้โอน' },
        receiver: { type: SchemaType.STRING, description: 'ชื่อผู้รับโอน' },
        amount: {
          type: SchemaType.NUMBER,
          description: 'จำนวนเงิน (เฉพาะตัวเลข)',
        },
        date: {
          type: SchemaType.STRING,
          description: 'วันที่โอน (ISO format ถ้าเป็นไปได้)',
        },
        refNo: {
          type: SchemaType.STRING,
          description: 'เลขที่อ้างอิง หรือ Transaction ID',
        },
        note: {
          type: SchemaType.STRING,
          description: 'บันทึกช่วยจำ (ถ้ามี)',
        },
        bankName: { type: SchemaType.STRING, description: 'ธนาคารต้นทาง' },
      },
      required: ['sender', 'receiver', 'amount', 'refNo'],
    };

    return responseSchema;
  }
}
