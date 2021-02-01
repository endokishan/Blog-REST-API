import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
    static signup() {
        return [body('username', 'Username is required').isString(),
        body('email', 'Email is required').isEmail().custom((email, { req }) => {
            return User.findOne({ email: email }).then(user => {
                if (user) {
                    throw new Error('User Already Exist');
                } else {
                    return true;
                }
            });
        }),
        body('password', 'Password is required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password Should be Alphanumeric and between 8 to 20 Characters')];
    };

    static verifyUser() {
        return [body('verification_token', 'Enter OTP to verify').isNumeric()];
    };

    static updatePassword() {
        return [body('password', 'Old Password is Required').isAlphanumeric(), body('new_password', 'New Password is Required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password Should be Alphanumeric and between 8 to 20 Characters'), body('confirm_password', 'Confirm Password is Required').isAlphanumeric().custom((confirm_password, { req }) => {
            if (confirm_password === req.body.new_password) {
                return true;
            } else {
                req.errorStatus = 422;
                throw new Error("Password does not Match");
            };
        })];
    };

    static login() {
        return [query('email', 'Email is Required').isEmail().custom((email, { req }) => {
            return User.findOne({ email: email }).then(user => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User does not Exist');
                };
            });
        }), query('password', 'Password is required').isAlphanumeric()]
    }

    static sendResetPasswordEmail() {
        return [query('email', 'Email is Required').isEmail().custom((email, { req }) => {
            return User.findOne({ email: email }).then((user) => {
                if (user) {
                    return true;
                } else {
                    throw new Error('User Does Not Exist');
                };
            });
        })];
    };

    static verifyResetPasswordToken() {
        return [query('reset_password_token', 'OTP is Required').isNumeric().custom((token, { req }) => {
            return User.findOne({
                reset_password_token: token,
                reset_password_token_time: { $gt: Date.now() }
            }).then((user) => {
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('Invalid OTP, Please Request For New One');
                };
            });
        }), query('new_password', 'New Password is Required').isAlphanumeric().isLength({ min: 8, max: 20 }).withMessage('Password Should be Alphanumeric and between 8 to 20 Characters'), query('confirm_password', 'Confirm Password is Required').isAlphanumeric().custom((confirm_password, { req }) => {
            if (confirm_password === req.query.new_password) {
                return true;
            } else {
                req.errorStatus = 422;
                throw new Error("Password does not Match");
            };
        })];
    };

    static updateProfilePic() {
        return [body('profile_pic', 'Upload your Profile Picture').custom((profile_pic, { req }) => {
            if (req.file) {
                return true;
            } else {
                throw new Error('File Not Uploaded');
            };
        })];
    };
};