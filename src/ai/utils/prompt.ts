import { generalPrompt } from '../constants/prompt';
import { PROMPT_TYPE } from '../enums/prompt.enum';

export function promptGenerator(type: PROMPT_TYPE) {
  switch (type) {
    case PROMPT_TYPE.GENERAL:
      return generalPrompt;
    case PROMPT_TYPE.SLIP_READER:
      return `${generalPrompt} ทำหน้าที่เป็นผู้เชี่ยวชาญด้านการอ่านสลิปธนาคารของไทย
      สกัดข้อมูลจากรูปภาพนี้ให้แม่นยำที่สุด หากเป็นภาษาไทยให้คงไว้ตามนั้น
      หากข้อมูลส่วนไหนไม่มีให้ใส่เป็น null
      
      IMPORTANT: ตอบกลับเป็น plain text เท่านั้น ห้ามใช้ formatting ใดๆ`;
    default:
      return '';
  }
}
