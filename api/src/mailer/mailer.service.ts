import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;
  private readonly logger = new Logger(MailerService.name);
  private readonly isProd = process.env.NODE_ENV === 'production';

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // true for 465
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });

    // In development, verify SMTP connection for immediate feedback
    if (!this.isProd) {
      this.transporter
        .verify()
        .then(() => this.logger.log('SMTP transporter verified (dev)'))
        .catch((err) => this.logger.error(`SMTP verify failed (dev): ${err?.message ?? err}`));
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    const from = process.env.SMTP_FROM || 'no-reply@pulsar360.dev';
    try {
      const info = await this.transporter.sendMail({ from, to, subject, html });
      this.logger.log(`Mail sent -> ${to} (id: ${info.messageId})`);
    } catch (e: any) {
      const msg = `Mail not sent -> ${to} | ${subject} | from=${from}`;
      this.logger.error(`${msg}: ${e?.message ?? e}`);
      // In development, rethrow to expose the failure to the client
      if (!this.isProd) {
        throw e;
      }
      // In production, keep it logged (optionally push to a queue)
    }
  }
}

