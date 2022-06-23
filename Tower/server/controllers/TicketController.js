import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService";
import BaseController from "../utils/BaseController";





export class TicketController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .delete('/:id', this.removeTicket)

    }
    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const tickets = await ticketService.create(req.body)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
   
    async removeTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketService.removeTicket(req.params.id, req.userInfo.id)
            return res.send('Ticket has been deleted')
        } catch (error) {
            next(error)
        }
    }
}