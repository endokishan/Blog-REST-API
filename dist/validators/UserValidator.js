"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signup() {
        return [express_validator_1.body('username', 'Username is required').isString(),
            express_validator_1.body('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password Should be Alphanumeric and between 8 to 20 Characters')];
    }
    ;
    static verifyUser() {
        return [express_validator_1.body('verification_token', 'Enter OTP to verify').isNumeric()];
    }
    ;
    static updatePassword() {
        return [express_validator_1.body('password', 'Old Password is Required').isAlphanumeric(), express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password Should be Alphanumeric and between 8 to 20 Characters'), express_validator_1.body('confirm_password', 'Confirm Password is Required').isAlphanumeric().custom((confirm_password, { req }) => {
                if (confirm_password === req.body.new_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error("Password does not Match");
                }
                ;
            })];
    }
    ;
    static login() {
        return [express_validator_1.query('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User does not Exist');
                    }
                    ;
                });
            }), express_validator_1.query('password', 'Password is required').isAlphanumeric()];
    }
    static sendResetPasswordEmail() {
        return [express_validator_1.query('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                    ;
                });
            })];
    }
    ;
    static verifyResetPasswordToken() {
        return [express_validator_1.query('reset_password_token', 'OTP is Required').isNumeric().custom((token, { req }) => {
                return User_1.default.findOne({
                    reset_password_token: token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('Invalid OTP, Please Request For New One');
                    }
                    ;
                });
            }), express_validator_1.query('new_password', 'New Password is Required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password Should be Alphanumeric and between 8 to 20 Characters'), express_validator_1.query('confirm_password', 'Confirm Password is Required').isAlphanumeric().custom((confirm_password, { req }) => {
                if (confirm_password === req.query.new_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error("Password does not Match");
                }
                ;
            })];
    }
    ;
    static updateProfilePic() {
        return [express_validator_1.body('profile_pic', 'Upload your Profile Picture').custom((profile_pic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File Not Uploaded');
                }
                ;
            })];
    }
    ;
}
exports.UserValidators = UserValidators;
;
