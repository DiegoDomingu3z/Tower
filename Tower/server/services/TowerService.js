import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class TowerService{
   
   
   async getAll(query = {}) {
        const towers = await dbContext.Tower.find(query).populate('creator', 'name picture')
        return towers
        
    }

    async getById(id) {
       const tower = await dbContext.Tower.findById(id).populate('creator', 'name picture')
       return tower
    }

    async create(towerData) {
        const tower = await dbContext.Tower.create(towerData)
        await tower.populate('creator')
        return tower
    }

    async update(id, update) {
        const original = await dbContext.Tower.findById(id).populate('creator')
        if (original.creatorId.toString() != update.creatorId) {
            throw new BadRequest('This is not your Event')
        }
        // FIXME
        if (update.isCancelled == true) {
            throw new BadRequest('This event is already cancelled')
        }

        original.name = update.name || original.name
        original.description = update.description || original.description
        original.coverImg = update.coverImg || original.coverImg
        original.location = update.location || original.location
        original.capacity = update.capacity || original.capacity
        original.startDate = update.startDate || original.startDate
        original.type = update.type || original.type
        original.save()
        return original
    }

    async changeCancelled(id, userId) {
        const tower = await dbContext.Tower.findById(id)
        if (tower.creatorId.toString() != userId) {
            throw new BadRequest('You do not have permission to delete this event')
        }
        tower.isCanceled = true
        await tower.save()

    }

    

}



export const towerService = new TowerService()