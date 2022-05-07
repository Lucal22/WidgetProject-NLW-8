import {MailAdapter, sendMailData} from '../mail-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "542e45918c8335",
        pass: "98d75a12c3869b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({subject, body}: sendMailData) {
    await transport.sendMail({
        from: 'Equipe Feedget <lucal@feedget.com>',
        to: 'Luis Carlos <lucaldev@gmail.com>',
        subject,
        html: body,
    })
   }
}