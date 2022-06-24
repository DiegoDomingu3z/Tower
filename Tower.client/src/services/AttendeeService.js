import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class AttendeeService{

    async getPeopleAttending(id){
        const res = await api.get('api/events/'+ id + '/tickets')
        logger.log("[PEOPLE ATTENDING]",res.data)
        AppState.tickets = res.data
    }

    async createTicket(ticketData){

        const res = await api.post('api/tickets', ticketData)
        logger.log(res.data,'Created ticket')
        AppState.myTickets = [...AppState.myTickets, res.data]
        logger.log(AppState.myTickets, '[APPSTATE myTICKETS]')

    }

}


export const attendeeService = new AttendeeService()