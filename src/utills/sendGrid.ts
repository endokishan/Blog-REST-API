import * as sendGrid from '@sendgrid/mail';
require('dotenv').config()
export class SendGrid {
    private static sendGridAPI() {
        const API = process.env.sendGrid_API;
        return API;
    };

    static sendEmail(data: { to: [string], subject: string, text: string, html: string }) {
        sendGrid.setApiKey(SendGrid.sendGridAPI());

        const msg = {
            to: data.to,
            from: {
                name: 'SendGrid',
                email: 'kishankumar335@gmail.com'
            },
            subject: data.subject,
            text: data.text,
            html: data.html,
        };

        return sendGrid.send(msg);
    };
};
