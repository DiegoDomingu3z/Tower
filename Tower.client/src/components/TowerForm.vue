<template>
<form @submit.prevent="createEvents">
  <div class="row">
    <div class="col-4">
        <label for="">Name of Event</label>
        <input  class="form-control" type="text" placeholder="Name..." v-model="create.name" />
        </div>
    <div class="col-4">
        <label for="">Location</label>
        <input  class="form-control" type="text" placeholder="Location" v-model="create.location" />
    </div>
    <div class="col-4">
        <label for="">type</label>
        <input class="form-control" type="text" placeholder="type"  v-model="create.type"/>
    </div>
    <div class="row"></div>
    <div class="col-4">
        <label for="">Capacity</label>
        <input class="form-control" type="text" placeholder="Capacity" v-model="create.capacity" />
    </div>
    <div class="col-4">
        <label for="">Date</label>
        <input class="form-control" type="Date" placeholder="Date" v-model="create.startDate" />
    </div>
    <div class="col-4">
        <label for="">Image</label>
        <input class="form-control" type="text" placeholder="Image Url" v-model="create.coverImg" />
    </div>
    
        <div class="col-10">
            <label for="">Description</label>
            <textarea placeholder="Description" name="" id="" cols="20" rows="3" v-model="create.description"></textarea>
        </div>
        <div class="col-12 text-end">
        
       <button class="btn btn-info border-white me-3"  data-bs-dismiss="modal"
            aria-label="Close">Cancel</button>
           <button type="submit" class="btn btn-dark border-white">Submit</button>
            </div>
        </div>
    
</form>
  
</template>


<script>
import { ref } from '@vue/reactivity'
import { towerService } from '../services/TowerService'
import Pop from '../utils/Pop'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { Modal } from 'bootstrap'
import { AppState } from '../AppState'
export default {

  setup() {
    const create = ref({})
            return {
        create,
      async createEvents() {
        try {
          const newTower = await towerService.createEvents(create.value)
          create.value = {},
          Modal.getOrCreateInstance(document.getElementById('create-event')).toggle()
          
          Pop.toast('Event Created!')
        } catch (error) {
            logger.log(error)
          Pop.toast("You can't create an event with a past date")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>