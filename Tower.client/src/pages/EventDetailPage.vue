<template>
  <div class="container-fluid bg-dark">
    <div class="row">
      <ActiveTower />
    </div>
    <div
      v-if="attendees.length > 0"
      class="row border border-light border-2 mx-4 p-4"
    >
      <EventTickets v-for="a in attendees" :key="a.id" :attendee="a" />
    </div>
    <div class="row mx-4 pt-5">
      <Comments />
    </div>
    <div class="row mx-4 pb-4">
      <EventComment v-for="c in comments" :key="c.id" :comments="c" />
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { towerService } from '../services/TowerService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { attendeeService } from '../services/AttendeeService'
import { commentService } from '../services/CommentService'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.name == 'Tower') {
          await attendeeService.getPeopleAttending(route.params.id)
          await towerService.getTower(route.params.id)
          await commentService.getCommentsByTower(route.params.id)

        }

      } catch (error) {

        Pop.error(error)
      }
    })
    return {
      route,
      tower: computed(() => AppState.activeTower),
      comments: computed(() => AppState.eventComments),
      attendees: computed(() => AppState.tickets)
    }
  }
}
</script>



<style lang="scss" scoped>
.small-img {
  height: 350px;
  width: 350px;
}
</style>