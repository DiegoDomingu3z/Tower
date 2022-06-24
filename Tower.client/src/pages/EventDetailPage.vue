<template>
<div class="container-fluid bg-dark">
    <div class="row">

    <ActiveTower />
    </div>
    <div class="row">
        <Comments/>
    </div>
    <div class="row">
        <EventComment v-for="c in comments" :key="c.id" :comments="c"/>
    </div>
    
</div>
</template>


<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { towerService } from '../services/TowerService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import {attendeeService} from '../services/AttendeeService'
import { commentService } from '../services/CommentService'
export default {
    setup(){
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
            comments: computed(() => AppState.eventComments)
        }
    }
}
</script>



<style lang="scss" scoped>

.small-img{
    height: 350px;
    width: 350px;
}

</style>