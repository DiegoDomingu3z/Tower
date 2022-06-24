import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentService{
    
    
    async createComment(commentData) {
       const comment = await dbContext.Comment.create(commentData)
       await comment.populate('creator', 'name picture')
       return comment
    }

    async getComments(id) {
        const comment = await dbContext.Comment.find({eventId: id}).populate('creator', 'name picture')
        return comment
    }

    async removeComment(id, userId ) {
        const comment = await dbContext.Comment.findById(id).populate('creator', 'name picture')
        if (comment.creatorId != userId) {
            throw new Forbidden('This is not your comment')
        }
        comment.remove()
    }

}

export const commentService = new CommentService()