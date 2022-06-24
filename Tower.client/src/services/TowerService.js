import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerService{

    async getAll(){
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.towers = res.data
    }

    async getTower(id){
        const res = await api.get('api/events/' + id)
        logger.log(res.data)
        AppState.activeTower = res.data
    }


    async createEvents(body){
        const res = await api.post('api/events', body)
        logger.log(res.data)
        AppState.towers.unshift(res.data)
    }

    async cancelTower(eventId){
        const res = await api.delete('api/events/' + eventId)
        AppState.activeTower = res.data
        logger.log(AppState.activeTower, '[CANCELLING EVENT!]')
    }

   



}



export const towerService = new TowerService()