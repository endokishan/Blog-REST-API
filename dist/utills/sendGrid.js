"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendGrid = void 0;
const sendGrid = require("@sendgrid/mail");
const env_1 = require("../environments/env");
class SendGrid {
    static sendGridAPI() {
        const API = env_1.getEnvironmentVariables().sendGrid_API;
        return API;
    }
    ;
    static sendEmail(data) {
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
    }
    ;
}
exports.SendGrid = SendGrid;
;
