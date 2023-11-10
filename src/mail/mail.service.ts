import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendStuffConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/admin/activate/${admin.activation_link}`;
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to our Ashyo Shop , Please confirm you email 😊',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }
}
