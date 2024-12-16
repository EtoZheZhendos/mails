import { Sequelize } from 'sequelize-typescript';
import { MailEntity } from '../mail/entities/mails.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite',
      });
      sequelize.addModels([MailEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
//
