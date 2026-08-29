export interface LineMessaging {
  replyText(replyToken: string, text: string): Promise<void>;
  getMessageContentStream(
    messageId?: string,
  ): Promise<AsyncIterable<Uint8Array>>;
}
