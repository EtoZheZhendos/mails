import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { DatabaseModule } from '../db/database.module';
import { incomingMailsProviders } from '../db/repository.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MailController],
  providers: [MailService, ...incomingMailsProviders],
})
export class MailModule {}
//
