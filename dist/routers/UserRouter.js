"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utills_1 = require("../utills/Utills");
const UserValidator_1 = require("../validators/UserValidator");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    ;
    getRoutes() {
        this.router.get('/login', UserValidator_1.UserValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.login);
        this.router.get('/reset/password', UserValidator_1.UserValidators.sendResetPasswordEmail(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.sendResetPasswordEmail);
        this.router.get('/resend/verification/email', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserController_1.UserController.resendVerificationEmail);
    }
    ;
    postRoutes() {
        this.router.post('/signup', UserValidator_1.UserValidators.signup(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.signup);
    }
    ;
    patchRoutes() {
        this.router.patch('/verify', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidator_1.UserValidators.verifyUser(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.verify);
        this.router.patch('/update/password', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserValidator_1.UserValidators.updatePassword(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.updatePassword);
        this.router.patch('/reset/password', UserValidator_1.UserValidators.verifyResetPasswordToken(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.verifyResetPasswordToken);
        this.router.patch('/update/profilePic', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, new Utills_1.Utils().multer.single('profile_pic'), UserValidator_1.UserValidators.updateProfilePic(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.updateProfilePic);
    }
    ;
    deleteRoutes() {
    }
    ;
}
;
exports.default = new UserRouter().router;
