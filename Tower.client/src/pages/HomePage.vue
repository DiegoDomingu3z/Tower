<template>
  <div class=" container-fluid ">
      <div class="row bg-dark">

      <Tower v-for="t in tower" :key="t.id" :tower="t" class="col-3"/>
      </div>
    
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import {towerService} from '../services/TowerService'
import { AppState } from '../AppState'

export default {
  setup(){
    onMounted(async() =>{
      try {
        await towerService.getAll()
      } catch (error) {
        Pop.toast(error.message)
        logger.log(error)
      }
    })
    return {
      tower: computed(() => AppState.Towers)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>