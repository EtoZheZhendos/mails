import { MailEntity } from '../src/mail/entities/mails.entity';

export const incomingMailsProviders = [
  {
    provide: 'INCOMING_MAILS_REPOSITORY',
    useValue: MailEntity,
  },
];
