export declare class SendGrid {
    private static sendGridAPI;
    static sendEmail(data: {
        to: [string];
        subject: string;
        text: string;
        html: string;
    }): Promise<[import("@sendgrid/client/src/response").ClientResponse, {}]>;
}
