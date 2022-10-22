import nodemailer from 'nodemailer';
import * as pino from 'pino';

const logger = pino.default();

class EmailSender {
    public static sendEmail(to: string, subject: string, text: string) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return logger.error(error);
            }
            logger.info(`Email sent: ${info.response}`);
        });
    }
}

export default EmailSender;