"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const sendGrid_1 = require("../utills/sendGrid");
const Utills_1 = require("../utills/Utills");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const __1 = require("..");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const verificationToken = Utills_1.Utils.generateVerificationToken();
            try {
                const hash = yield Utills_1.Utils.encryptPassword(password);
                const data = {
                    username: username,
                    email: email,
                    password: hash,
                    verification_token: verificationToken,
                    verification_token_time: Date.now() + new Utills_1.Utils().MAX_TOKEN_TIME,
                    created_at: new Date(),
                    updated_at: new Date()
                };
                let user = yield new User_1.default(data).save();
                res.send(user);
                yield sendGrid_1.SendGrid.sendEmail({
                    to: [data.email],
                    subject: 'Email Verification',
                    text: 'Nodejs',
                    html: `
                <h1>Email Verificaton</h1>
                <h1>OTP : ${verificationToken}</h1>
                <p>valid for only 5 minutes.</p>
                `
                });
            }
            catch (error) {
                next(error);
            }
            ;
        });
    }
    ;
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification_token = req.body.verification_token;
            const email = req.user.email;
            try {
                const user = yield User_1.default.findOneAndUpdate({
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: { $gt: Date.now() },
                }, { verified: true }, { new: true });
                if (user) {
                    res.send(user);
                }
                else {
                    throw new Error("Verification Token Expired. Please request new one.");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendVerificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const verificationToken = Utills_1.Utils.generateVerificationToken();
            try {
                const user = yield User_1.default.findOneAndUpdate({ email: email }, { verification_token: verificationToken, verification_token_time: Date.now() + new Utills_1.Utils().MAX_TOKEN_TIME });
                if (user) {
                    const mailer = yield sendGrid_1.SendGrid.sendEmail({
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
                }
                else {
                    throw new Error("User Does not exist");
                }
                ;
            }
            catch (error) {
                next(error);
            }
            ;
        });
    }
    ;
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.query.password;
            const user = req.user;
            try {
                yield Utills_1.Utils.comparePassword({ plainPassword: password, encryptedPassword: user.password });
                const token = Jwt.sign({ email: user.email, user_id: user._id }, env_1.getEnvironmentVariables().jwt_secret, { expiresIn: '120d' });
                const data = {
                    token: token,
                    user: user
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user.user_id;
            const password = req.body.password;
            const newPassword = req.body.confirm_password;
            try {
                const user = yield User_1.default.findOne({ _id: user_id });
                yield Utills_1.Utils.comparePassword({ plainPassword: password, encryptedPassword: user.password });
                const encryptedPassword = yield Utills_1.Utils.encryptPassword(newPassword);
                const newUser = yield User_1.default.findOneAndUpdate({ _id: user_id }, { updated_at: new Date(), password: encryptedPassword }, { new: true });
                res.send(newUser);
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static sendResetPasswordEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            const resetPasswordToken = Utills_1.Utils.generateVerificationToken();
            try {
                const updatedUser = yield User_1.default.findOneAndUpdate({ email: email }, {
                    updated_at: new Date(), reset_password_token: resetPasswordToken,
                    reset_password_token_time: Date.now() + new Utills_1.Utils().MAX_TOKEN_TIME
                }, { new: true });
                res.send(updatedUser);
                yield sendGrid_1.SendGrid.sendEmail({
                    to: [email],
                    subject: 'Reset Password',
                    text: 'Nodejs',
                    html: `
                <h1>Reset Password</h1>
                <h1>OTP : ${resetPasswordToken}</h1>
                <p>valid for only 5 minutes.</p>
                `
                });
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static verifyResetPasswordToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const new_password = req.query.confirm_password;
            try {
                const encryptedPassword = yield Utills_1.Utils.encryptPassword(new_password);
                yield User_1.default.findOneAndUpdate({ _id: user._id }, { updated_at: new Date(), password: encryptedPassword }, { new: true });
                const data = {
                    Password_Reset_Done: true
                };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
    static updateProfilePic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const file_url = `http://localhost:${__1.port}/${req.file.path}`;
            try {
                const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { updated_at: new Date(), profile_pic_url: file_url }, { new: true });
                res.send(user);
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    ;
}
exports.UserController = UserController;
;
