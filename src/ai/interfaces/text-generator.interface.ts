export interface TextGenerator {
  generateReply(text: string): Promise<string>;
}
