import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';
import { PostValidators } from '../validators/PostValidators';

class PostRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes();

        this.postRoutes();

        this.patchRoutes();

        this.deleteRoutes();
    };

    getRoutes() {
        this.router.get('/me', GlobalMiddleWare.authenticate, PostController.getPostByUser);
        this.router.get('/all', GlobalMiddleWare.authenticate, PostController.getAllPost);
        this.router.get('/:id', GlobalMiddleWare.authenticate, PostValidators.getPostByID(), GlobalMiddleWare.checkError, PostController.getPostByID);
    };

    postRoutes() {
        this.router.post('/add', GlobalMiddleWare.authenticate, PostValidators.addPost(), GlobalMiddleWare.checkError, PostController.addPost);
    };

    patchRoutes() {
        this.router.patch('/edit/:id', GlobalMiddleWare.authenticate, PostValidators.editPost(), GlobalMiddleWare.checkError, PostController.editPost);
    };

    deleteRoutes() {
        this.router.delete('/delete/:id', GlobalMiddleWare.authenticate, PostValidators.deletePost(), GlobalMiddleWare.checkError, PostController.deletePost)
    };


};

export default new PostRouter().router;