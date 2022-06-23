import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService";
import BaseController from "../utils/BaseController";





export class TicketController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .get('/:id', this.getMyTickets)
        .get('/:id/tickets', this.getTicketsByEvent)
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
    async getMyTickets(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id 
            const tickets = await ticketService.getMyTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    getTicketsByEvent(arg0, getTicketsByEvent) {
        throw new Error("Method not implemented.");
    }
    removeTicket(arg0, removeTicket) {
        throw new Error("Method not implemented.");
    }
}