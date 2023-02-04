import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";
import { ticketService } from "../services/TicketService";
import { towerService } from "../services/TowerService";
import BaseController from "../utils/BaseController";





export class TowersController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/comments', this.getComments)
            .get('/:id/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.update)
            .delete('/:id', this.changeCancelled)
    }


    async getAll(req, res, next) {
        try {
            const tower = await towerService.getAll()
            return res.send(tower)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const tower = await towerService.getById(req.params.id)
            return res.send(tower)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {

            const tickets = await ticketService.getEventTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next) {
        try {
            const comments = await commentService.getComments(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }


    // Create
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const tower = await towerService.create(req.body)
            return res.send(tower)
        } catch (error) {
            next(error)

        }
    }

    // PUT
    async update(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const tower = await towerService.update(req.params.id, req.body)
            return res.send(tower)
        } catch (error) {
            next(error)
        }
    }

    // DELETE
    async changeCancelled(req, res, next) {
        try {
            await towerService.changeCancelled(req.params.id, req.userInfo.id)
            return res.send('Event is now cancelled')
        } catch (error) {
            next(error)
        }
    }
}