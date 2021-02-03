import User from "../models/User";
import { SendGrid } from "../utills/sendGrid";
import { Utils } from "../utills/Utills";
import * as Jwt from 'jsonwebtoken';
require('dotenv').config()

export class UserController {
    static async signup(req, res, next) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const verificationToken = Utils.generateVerificationToken();


        try {
            const hash = await Utils.encryptPassword(password);
            const data = {
                username: username,
                email: email,
                password: hash,
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                created_at: new Date(),
                updated_at: new Date()
            };

            let user = await new User(data).save();
            res.send(user);
            await SendGrid.sendEmail({
                to: [data.email],
                subject: 'Email Verification',
                text: 'Nodejs',
                html: `
                <h1>Email Verificaton</h1>
                <h1>OTP : ${verificationToken}</h1>
                <p>valid for only 5 minutes.</p>
                `
            });

        } catch (error) {
            next(error);
        };
    };


    static async verify(req, res, next) {
        const verification_token = req.body.verification_token;
        const email = req.user.email;

        try {
            const user = await User.findOneAndUpdate(
                {
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: { $gt: Date.now() },
                },
                { verified: true },
                { new: true }
            );

            if (user) {
                res.send(user);
            } else {
                throw new Error("Verification Token Expired. Please request new one.");
            }
        } catch (e) {
            next(e);
        }
    }

    static async resendVerificationEmail(req, res, next) {
        const email = req.user.email;
        const verificationToken = Utils.generateVerificationToken();

        try {
            const user = await User.findOneAndUpdate({ email: email }, { verification_token: verificationToken, verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME });

            if (user) {
                const mailer = await SendGrid.sendEmail({
                    to: [user.email],
                    subject: 'Resend Email Verification',
                    text: 'Nodejs',
                    html: `
                    <h1>Resend Email Verificaton</h1>
                    <h1>OTP : ${verificationToken}</h1>
                    <p>valid for only 5 minutes.</p>
                    `
                });
                res.json({ Verification_Email_Sent: true });
            } else {
                throw new Error("User Does not exist");
            };
        } catch (error) {
            next(error);
        };
    };

    static async login(req, res, next) {
        const password = req.query.password;
        const user = req.user;

        try {
            await Utils.comparePassword({ plainPassword: password, encryptedPassword: user.password });
            const token = Jwt.sign({ email: user.email, user_id: user._id }, process.env.jwt_secret, { expiresIn: '120d' });
            const data = {
                token: token,
                user: user
            };
            res.json(data);
        } catch (e) {
            next(e);
        };
    };

    static async updatePassword(req, res, next) {
        const user_id = req.user.user_id;
        const password = req.body.password;
        const newPassword = req.body.confirm_password;
        try {
            const user = await User.findOne({ _id: user_id });
            await Utils.comparePassword({ plainPassword: password, encryptedPassword: user.password });
            const encryptedPassword = await Utils.encryptPassword(newPassword);
            const newUser = await User.findOneAndUpdate({ _id: user_id }, { updated_at: new Date(), password: encryptedPassword }, { new: true });
            res.send(newUser);
        } catch (e) {
            next(e);
        };
    };

    static async sendResetPasswordEmail(req, res, next) {
        const email = req.query.email;
        const resetPasswordToken = Utils.generateVerificationToken();
        try {
            const updatedUser = await User.findOneAndUpdate({ email: email }, {
                updated_at: new Date(), reset_password_token: resetPasswordToken,
                reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            }, { new: true });
            res.send(updatedUser);
            await SendGrid.sendEmail({
                to: [email],
                subject: 'Reset Password',
                text: 'Nodejs',
                html: `
                <h1>Reset Password</h1>
                <h1>OTP : ${resetPasswordToken}</h1>
                <p>valid for only 5 minutes.</p>
                `
            });
        } catch (e) {
            next(e);
        };
    };

    static async verifyResetPasswordToken(req, res, next) {
        const user = req.user;
        const new_password = req.query.confirm_password;
        try {
            const encryptedPassword = await Utils.encryptPassword(new_password);
            await User.findOneAndUpdate({ _id: user._id }, { updated_at: new Date(), password: encryptedPassword }, { new: true });
            const data = {
                Password_Reset_Done: true
            };
            res.json(data);
        } catch (e) {
            next(e);
        };
    };

    static async updateProfilePic(req, res, next) {
        const userId = req.user.user_id;
        const file_url = `https://blogging-rest-api.herokuapp.com/${req.file.path}`;

        try {
            const user = await User.findOneAndUpdate({ _id: userId }, { updated_at: new Date(), profile_pic_url: file_url }, { new: true });
            res.send(user);
        } catch (e) {
            next(e);
        };
    };
};
