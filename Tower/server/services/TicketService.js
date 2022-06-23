import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"





class TicketService{
    
    

    async create(ticketData) {
        const tickets = await dbContext.Ticket.create(ticketData)
        await tickets.populate('events', 'name')
        await tickets.populate('account', 'name, picture')
        const event = await dbContext.Tower.findById(tickets.eventId)
        if (event.capacity == 0) {
            throw new BadRequest('Sorry, there are no more available tickets for this event')
        }
        if (event.isCancelled == true) {
            throw new BadRequest('Sorry, this event was Cancelled')
        }
        event.capacity --
        await event.save()
        return tickets
    }

    async getMyTickets(accountTickets) {
        const tickets = await dbContext.Ticket.find({accountTickets})
        return tickets
    }



}


export const ticketService = new TicketService()