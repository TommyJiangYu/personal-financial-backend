import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { App } from 'supertest/types';
import { SLIP_READER, TEXT_GENERATOR } from '../../src/ai/ai.tokens';
import type { SlipReader } from '../../src/ai/interfaces/slip-reader.interface';
import type { TextGenerator } from '../../src/ai/interfaces/text-generator.interface';
import { AppModule } from '../../src/app.module';
import type { LineMessaging } from '../../src/messaging/interfaces/line-messaging.interface';
import { LINE_MESSAGING } from '../../src/messaging/messaging.tokens';
import { PrismaService } from '../../src/prisma/prisma.service';

interface TestPersistence {
  readonly client: object;
  onModuleInit(): Promise<void> | void;
  onModuleDestroy(): Promise<void> | void;
}

interface TestApplicationAdapters {
  lineMessaging: LineMessaging;
  textGenerator: TextGenerator;
  slipReader: SlipReader;
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
    .overrideProvider(LINE_MESSAGING)
    .useValue(adapters.lineMessaging)
    .overrideProvider(TEXT_GENERATOR)
    .useValue(adapters.textGenerator)
    .overrideProvider(SLIP_READER)
    .useValue(adapters.slipReader)
    .overrideProvider(PrismaService)
    .useValue(adapters.persistence ?? disconnectedPersistence)
    .compile();

  const app = moduleFixture.createNestApplication({ rawBody: true });
  app.useLogger(false);
  await app.init();

  return app;
}
