import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets(){
    const res = await api.get('account/tickets')
    logger.log(res.data)
    AppState.myTickets = res.data
    logger.log(AppState.myTickets, '[MY tickets IN APPSTATE]')
    
  }
  async deleteTicket(id){
    const res = await api.delete('api/tickets/' + id)
    logger.log(res.data)
    AppState.myTickets = AppState.myTickets.filter(t => t.id != id)
  }
}

export const accountService = new AccountService()
