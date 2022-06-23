import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";
import BaseController from "../utils/BaseController";






export class CommentsController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:id', this.removeComment)
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentService.createComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async removeComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentService.removeComment(req.params.id, req.userInfo.id)
            return res.send('Comment was deleted')
        } catch (error) {
            next(error)
        }
    }
}