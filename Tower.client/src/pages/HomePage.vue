<template>
  <div class=" container-fluid ">
    
      <div class="row bg-dark">
        <div class="col-md-12 d-flex justify-content-around bg-black p-3">
          <button title="All"  class="btn text-light" @click="filterEvents = '' " >All</button> 
          <button title="filter concerts" class="btn text-light" @click="filterEvents = 'concert' ">Concert</button> 
          <button title="filter digitals" class="btn text-light" @click="filterEvents = 'digital' ">Digital</button> 
          <button title="filter sports" class="btn text-light" @click="filterEvents = 'sport' ">Sports</button> 
          <button title="filter convention" class="btn text-light" @click="filterEvents = 'convention' ">Conventions</button> 

          
        </div>
        

      <Tower v-for="t in tower" :key="t.id" :tower="t" class="col-md-3"/>
      </div>
    
  </div>


</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import {towerService} from '../services/TowerService'
import { AppState } from '../AppState'

export default {
  setup(){
    const filterEvents = ref('')
    watchEffect(async() =>{
      try {
        await towerService.getAll()
      } catch (error) {
        Pop.toast(error.message)
        logger.log(error)
      }
    })
    return {
      filterEvents,
      tower: computed(() => AppState.towers.filter(t => filterEvents.value ? t.type == filterEvents.value : true))
    }
  }
}
</script>


<style lang="scss" scoped>

</style>