// import * as nodeMailer from 'nodemailer';
// import * as SendGrid from 'nodemailer-sendgrid-transport';

// export class NodeMailer {
//     private static initializeTransport() {
//         return nodeMailer.createTransport(SendGrid({
//             service: 'SendGrid',
//             auth: {
//                 // api_user: 'apikey',
//                 api_key: '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'
//             }
//         }));
//     };

//     static sendEmail(data: { to: [string], subject: string, text: string, html: string }){
//         return NodeMailer.initializeTransport().sendMail({
//             from: {
//                 name : 'GamerzPool',
//                 address : 'kishankumar335@gmail.com'
//             },
//             to: data.to,
//             subject: data.subject,
//             text: data.text,
//             html: data.html
//         });
//     };
// };
