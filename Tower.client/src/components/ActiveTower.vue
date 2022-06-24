<template>
  <div class="col-12 p-3">
    <div class="row bg-grey rounded elevation-4 ">
      <div class="col-4 p-3">
        <img class="img-fluid" :src="events.coverImg" alt="" />
        <div class="row">
            <div class="col-12 pt-4 text-center" v-if="account.id == events.creatorId">
                <button class="col-6 btn-danger" @click.prevent="cancelTower">Cancel Event</button>
            </div>
        </div>
      </div>
      <div class="col-8 p-3">
        <div class="row">
            <div class="col-12 d-flex justify-content-between"> 
                {{events.name}} <span>{{new Date(events.startDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</span>
            </div>
            <div class="col-12 pt-5">
                {{events.location}}
            </div>
            <div class="col-12 pt-5">
                {{events.description}}
            </div>
            <div class="col-6 pt-5">
                {{events.capacity}} Spots left!
            </div>
            <div class="col-6 pt-5 text-end" v-if="account.id">
                <div v-if="events.isCanceled == false">
                <button v-if="events.capacity >= 1" @click="createTicket" class="btn btn-warning">Attend</button>
                </div>
            </div>
            <div v-if="events.isCanceled == true" class="col-12 text-center mt-5 bg-danger">
                This event is now cancelled
            </div>
        </div>
      </div>
    </div>
    <div class="row">
        <div class="col-12">

        </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12"></div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { towerService } from '../services/TowerService'
import { attendeeService } from '../services/AttendeeService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
 
  setup(props) {
      const route = useRoute()
    return {
         async createTicket(){
                try {
                    if (!AppState.account.id) {
                        Pop.toast('You need to login in to be able to attend an even', 'info')
                        return
                    }
                    if (AppState.activeTower.capacity == 0 || AppState.activeTower.isCanceled == true) {
                        Pop.toast('This even is no longer Available')
                        return
                    }
                    if (AppState.myTickets.find(t => AppState.activeTower.id == AppState.activeTower.id)) {
                        Pop.toast('You already have this ticket')
                        return
                    }
                    const ticket = AppState.activeTower.id
                    await attendeeService.createTicket({eventId: ticket})
                    AppState.activeTower.capacity --
                } catch (error) {
                    Pop.toast(error.message, error)
                    logger.log(error)
                }
             },
        async cancelTower(){
            try {
                await towerService.cancelTower(route.params.id)
                Pop.toast('Event is now cancelled')
            } catch (error) {
                logger.log(error)
                Pop.toast(error.message, 'error')
            }
        },

      events: computed(() => AppState.activeTower),
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  background-position: center;
  background-size: cover;
  height: 350px;
  width: 100%;
  filter: blur(6px);
  
}
</style>