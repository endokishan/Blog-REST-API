import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utills/Utills";
import { UserValidators } from "../validators/UserValidator";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();

        this.postRoutes();

        this.patchRoutes();

        this.deleteRoutes();
    };

    getRoutes() {
        this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);

        this.router.get('/reset/password', UserValidators.sendResetPasswordEmail(), GlobalMiddleWare.checkError, UserController.sendResetPasswordEmail);

        this.router.get('/resend/verification/email', GlobalMiddleWare.authenticate, UserController.resendVerificationEmail);
    };

    postRoutes() {
        this.router.post('/signup', UserValidators.signup(), GlobalMiddleWare.checkError, UserController.signup);
    };

    patchRoutes() {
        this.router.patch('/verify', GlobalMiddleWare.authenticate, UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.verify);

        this.router.patch('/update/password', GlobalMiddleWare.authenticate, UserValidators.updatePassword(), GlobalMiddleWare.checkError, UserController.updatePassword);

        this.router.patch('/reset/password', UserValidators.verifyResetPasswordToken(), GlobalMiddleWare.checkError, UserController.verifyResetPasswordToken);

        this.router.patch('/update/profilePic', GlobalMiddleWare.authenticate, new Utils().multer.single('profile_pic'), UserValidators.updateProfilePic(), GlobalMiddleWare.checkError, UserController.updateProfilePic);
    };

    deleteRoutes() {

    };

};

export default new UserRouter().router;