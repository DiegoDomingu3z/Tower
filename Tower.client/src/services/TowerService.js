import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerService{

    async getAll(){
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.Towers = res.data
    }

    async getTower(id){
        const res = await api.get('api/events/' + id)
        logger.log(res.data)
    }



}



export const towerService = new TowerService()