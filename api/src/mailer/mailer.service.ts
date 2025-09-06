import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private readonly logger = new Logger(MailerService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // true pour 465
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const from = process.env.SMTP_FROM || 'no-reply@pulsar360.dev';
    try {
      const info = await this.transporter.sendMail({ from, to, subject, html });
      this.logger.log(`Mail envoyé -> ${to} (id: ${info.messageId})`);
    } catch (e) {
      this.logger.error(`Mail non envoyé -> ${to}`, e as any);
      // En prod: remonter dans un système d’alerte/queue (BullMQ, etc.)
    }
  }
}
