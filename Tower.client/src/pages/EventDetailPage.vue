<template>
    <div class="component">


    </div>
</template>


<script>
import { onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { towerService } from '../services/TowerService'
import Pop from '../utils/Pop'
export default {
    setup(){
        const route = useRoute()
        watchEffect(async () => {
            try {
                await towerService.getTower(route.params.id)
            } catch (error) {
                Pop.error(error)
            }
        })
        return {

        }
    }
}
</script>


<style lang="scss" scoped>

</style>