import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SlipData } from '../interfaces/messing.interface';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);
  private readonly geminiWorker: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    this.geminiWorker = new GoogleGenerativeAI(
      this.configService.get<string>('GOOGLE_API_KEY') || '',
    );
  }

  // ใน GeminiService.ts
  async textToSpeech(text: string): Promise<string> {
    try {
      const model = this.geminiWorker.getGenerativeModel({
        model: 'gemini-2.5-flash',
        // เพิ่มส่วนนี้เข้าไปครับ
        systemInstruction: {
          role: 'system',
          parts: [
            {
              text:
                'คุณคือผู้เชี่ยวชาญทางด้านบัญชีและเป็นคนภาคเหนือของไทย ที่อู้กำเมืองเก่งมากๆ ' +
                'คุณชื่อเกียร์ เป็นหมีนิสัย aggressive ชอบพูดประมาณว่า คิงจะทักหาเฮามายะหยัง, อะหยังก็อู้มา อะไรประมาณนี้ ',
            },
          ],
        },
      });

      // ส่งเฉพาะ text เข้าไปได้เลย เพราะ Instruction ถูกฝังไว้ใน model แล้ว
      const result = await model.generateContent(text);
      return result.response.text();
    } catch (error) {
      this.logger.error(
        'Error in textToSpeech:',
        error instanceof Error ? error.stack : error,
      );
      throw error;
    }
  }

  async scanBankSlip(fileBuffer: Buffer, mimeType: string) {
    const model = this.geminiWorker.getGenerativeModel({
      model: 'gemini-2.5-flash', // แนะนำตัวนี้ เพราะฉลาดพอจะแยกแยะฟิลด์ไทย-อังกฤษ
      generationConfig: {
        responseMimeType: 'application/json',
        // กำหนด Schema ให้ AI ตอบกลับมาเฉพาะที่ต้องการ
        responseSchema: {
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
        },
      },
    });
    const prompt = `
      คุณคือผู้เชี่ยวชาญทางด้านบัญชีและเป็นคนภาคเหนือของไทย ที่อู้กำเมืองเก่งมากๆ คิงจะทักหาเฮามายะหยัง, อะหยังก็อู้มา อะไรประมาณนี้
      ทำหน้าที่เป็นผู้เชี่ยวชาญด้านการอ่านสลิปธนาคารของไทย
      สกัดข้อมูลจากรูปภาพนี้ให้แม่นยำที่สุด หากเป็นภาษาไทยให้คงไว้ตามนั้น
      หากข้อมูลส่วนไหนไม่มีให้ใส่เป็น null
    `;

    const result = await model.generateContent([
      { inlineData: { data: fileBuffer.toString('base64'), mimeType } },
      prompt,
    ]);
    const responseText = result.response.text();
    this.logger.debug(`Gemini response: ${responseText}`);
    return JSON.parse(responseText) as SlipData;
    // return JSON.parse(responseText);
    // const attempt = 0;
    // const maxRetries = 3;
    // while (attempt < maxRetries) {
    //   try {
    //     const result = await model.generateContent([
    //       { inlineData: { data: fileBuffer.toString('base64'), mimeType } },
    //       prompt,
    //     ]);
    //     const responseText = result.response.text();
    //     this.logger.debug(`Gemini response: ${responseText}`);
    //     // return JSON.parse(responseText);
    //   } catch (error) {
    //     throw new InternalServerErrorException(
    //       'ขีดจำกัดการใช้งาน AI รายวันหมดแล้ว กรุณาลองใหม่พรุ่งนี้',
    //     );
    //     // if (error?.status === 429) {
    //     //   // ตรวจสอบว่าเป็น daily quota หมด หรือแค่ rate limit ต่อนาที
    //     //   const violations: Array<{ quotaId?: string }> =
    //     //     error?.errorDetails?.find(
    //     //       (d: any) =>
    //     //         d['@type'] === 'type.googleapis.com/google.rpc.QuotaFailure',
    //     //     )?.violations ?? [];
    //     //   const isDailyQuotaExhausted = violations.some((v) =>
    //     //     v.quotaId?.includes('PerDay'),
    //     //   );
    //     //   if (isDailyQuotaExhausted) {
    //     //     // daily quota หมดแล้ว ไม่มีประโยชน์ retry — ต้องรอวันถัดไป
    //     //     this.logger.error(
    //     //       'Gemini daily quota exhausted. Cannot retry until quota resets (usually midnight Pacific Time).',
    //     //     );
    //     //     throw new InternalServerErrorException(
    //     //       'ขีดจำกัดการใช้งาน AI รายวันหมดแล้ว กรุณาลองใหม่พรุ่งนี้',
    //     //     );
    //     //   }
    //     //   if (attempt < maxRetries - 1) {
    //     //     attempt++;
    //     //     // อ่าน retry delay จาก API response ถ้ามี ไม่งั้นใช้ exponential backoff
    //     //     const retryInfoDelay = error?.errorDetails?.find(
    //     //       (d: any) =>
    //     //         d['@type'] === 'type.googleapis.com/google.rpc.RetryInfo',
    //     //     )?.retryDelay;
    //     //     const retrySeconds = retryInfoDelay
    //     //       ? parseInt(retryInfoDelay.replace('s', ''), 10)
    //     //       : Math.pow(2, attempt) * 5; // 10s, 20s, ...
    //     //     const retryMs = retrySeconds * 1000;
    //     //     this.logger.warn(
    //     //       `Gemini rate limit (429). Retrying in ${retrySeconds}s... (Attempt ${attempt}/${maxRetries - 1})`,
    //     //     );
    //     //     await new Promise((resolve) => setTimeout(resolve, retryMs));
    //     //     continue;
    //     //   }
    //     // }
    //     // this.logger.error('Error scanning bank slip with Gemini:', error);
    //     // throw new InternalServerErrorException(
    //     //   'เกิดข้อผิดพลาดในการประมวลผลสลิปด้วย AI',
    //     // );
    //   }
    // }
  }
}
