import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentService{
 async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    logger.log(res.data, '[COMMENTS GOING OUT]')
    AppState.eventComments.push(res.data)
 }

 async getCommentsByTower(id){
    const res = await api.get('api/events/'+ id +'/comments')
    logger.log('[Comment Data]',res.data)
    AppState.eventComments = res.data
    logger.log(AppState.eventComments, '[AppState comments]')
 }

 async deleteComment(id){
    const res = await api.delete('api/comments/' + id )
    logger.log(res.data)
    AppState.eventComments.filter(c => c.id != id)
 }


}


export const commentService = new CommentService()