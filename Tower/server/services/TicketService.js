

import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"





class TicketService {




    async create(ticketData) {
        const tickets = await dbContext.Ticket.create(ticketData)
        await tickets.populate('event')
        await tickets.populate('account')
        const event = await dbContext.Tower.findById(tickets.eventId)
        if (event.capacity == 0) {
            throw new BadRequest('Sorry, there are no more available tickets for this event')
        }
        if (event.isCancelled == true) {
            throw new BadRequest('Sorry, this event was Cancelled')
        }
        event.capacity--
        await event.save()
        return tickets
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Ticket.find({ accountId })
            .populate('event')
            .populate('account', 'name picture')
        return tickets

    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId })
            .populate('event')
            .populate('account')
        return tickets
    }

    async removeTicket(id, userId) {
        const ticket = await dbContext.Ticket.findById(id).populate('event')
        const event = await dbContext.Tower.findById(ticket.eventId)
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('You cannot remove because this is not your ticket')
        }
        event.capacity++
        await event.save()
        ticket.remove()
    }




}


export const ticketService = new TicketService()