"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController_1 = require("../controllers/CommentController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const CommentValidators_1 = require("../validators/CommentValidators");
class CommentRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    ;
    getRoutes() {
    }
    ;
    postRoutes() {
        this.router.post('/add/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, CommentValidators_1.CommentValidators.addComment(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CommentController_1.CommentController.addComment);
    }
    ;
    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, CommentValidators_1.CommentValidators.editComment(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CommentController_1.CommentController.editComment);
    }
    ;
    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare_1.GlobalMiddleWare.authenticate, CommentValidators_1.CommentValidators.deleteComment(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, CommentController_1.CommentController.deleteComment);
    }
    ;
}
;
exports.default = new CommentRouter().router;
