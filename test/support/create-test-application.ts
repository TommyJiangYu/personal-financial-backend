import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { SlipReader } from '../../src/ai/services/slip-reader.service';
import { TextGenerator } from '../../src/ai/services/text-generator.service';
import { LineService } from '../../src/messaging/services/line.service';
import { PrismaService } from '../../src/prisma/prisma.service';

export type LineMessagingAdapter = Pick<
  LineService,
  'replyText' | 'getMessageContentStream'
>;
export type TextGeneratorAdapter = Pick<TextGenerator, 'generateReply'>;
export type SlipReaderAdapter = Pick<SlipReader, 'scanBankSlip'>;

interface TestPersistence {
  readonly client: object;
  onModuleInit(): Promise<void> | void;
  onModuleDestroy(): Promise<void> | void;
}

interface TestApplicationAdapters {
  lineMessaging: LineMessagingAdapter;
  textGenerator: TextGeneratorAdapter;
  slipReader: SlipReaderAdapter;
  persistence?: TestPersistence;
}

const disconnectedPersistence: TestPersistence = {
  client: {},
  onModuleInit: () => undefined,
  onModuleDestroy: () => undefined,
};

export async function createTestApplication(
  adapters: TestApplicationAdapters,
): Promise<INestApplication<App>> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(LineService)
    .useValue(adapters.lineMessaging)
    .overrideProvider(TextGenerator)
    .useValue(adapters.textGenerator)
    .overrideProvider(SlipReader)
    .useValue(adapters.slipReader)
    .overrideProvider(PrismaService)
    .useValue(adapters.persistence ?? disconnectedPersistence)
    .compile();

  const app = moduleFixture.createNestApplication({ rawBody: true });
  app.useLogger(false);
  await app.init();

  return app;
}
