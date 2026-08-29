import type { SlipData } from '../../messaging/interfaces/messing.interface';

export interface SlipReader {
  scanBankSlip(fileBuffer: Buffer, mimeType: string): Promise<SlipData>;
}
