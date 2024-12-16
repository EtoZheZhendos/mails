import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { MailType } from './enum';
import { AddMailDto } from './dto/add-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Put(':id')
  async updateMail(@Param('id') id: string, @Body() mail: UpdateMailDto) {
    return this.mailService.updateMail(+id, mail);
  }

  @Get('byId/:id')
  getMailById(@Param('id') id: string) {
    return this.mailService.getMailById(+id);
  }

  @Get('incoming')
  async getAllIncomingMail() {
    return this.mailService.getAllMails(MailType.INCOMING);
  }

  @Get('outgoing')
  async getAllOutgoingMail() {
    return this.mailService.getAllMails(MailType.OUTGOING);
  }

  @Delete(':id')
  deleteMail(@Param('id') id: string) {
    return this.mailService.deleteMail(+id);
  }

  @Post('add_mail')
  addMail(@Body() body: AddMailDto) {
    return this.mailService.addMail(body);
  }
}
//
