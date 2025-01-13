import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from 'src/mail/mail.module';
import { databaseProviders } from './db/provider';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [MailModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
