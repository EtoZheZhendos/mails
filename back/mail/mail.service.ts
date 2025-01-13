import { Inject, Injectable } from '@nestjs/common';
import { MailType } from './enum';
import { AddMailDto } from './dto/add-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
@Injectable()
export class MailService {
  constructor(
    @Inject('INCOMING_MAILS_REPOSITORY')
    private mailTable,
  ) {}

  async updateMail(id: number, mail: UpdateMailDto) {
    const existingMail = await this.mailTable.findOne({
      where: { id: id },
    });

    const isDraft = Boolean(mail.draft);

    const updatedMailData = {
      ...mail,
      draft: isDraft,
      type: MailType.OUTGOING,
    };

    await existingMail.update(updatedMailData);

    return existingMail;
  }

  async addMail(mail: AddMailDto) {
    const isDraft = Boolean(mail.draft);

    return await this.mailTable.create({
      ...mail,
      draft: isDraft,
      type: MailType.OUTGOING,
    });
  }

  async deleteMail(id: number[]) {
    const deletePromises = id.map(async (id) => {
      return await this.mailTable.destroy({
        where: {
          id: id,
        },
      });
    });
  
    await Promise.all(deletePromises);
  
    return { message: 'Письма успешно удалены' };
  }

  async getAllIncomingMails() {
    return await this.mailTable.findAll({
      where: { type: MailType.INCOMING },
    });
  }

  async getAllOutgoingMails() {
    return await this.mailTable.findAll({
      where: { type: MailType.OUTGOING },
    });
  }
  async getMailById(id: number) {
    return await this.mailTable.findOne({
      where: { id: id },
    });
  }
  async getAllMails(type: MailType) {
    console.log('TYPE = ', type);

    return await this.mailTable.findAll({
      where: { type: type },
    });
  }
}
