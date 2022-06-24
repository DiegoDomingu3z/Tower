<template>
    <div class="p-3 ">
        <div class="events-img elevation-5 border border-dark border-3 selectable" :style="`background-image: url(${tower.coverImg})`" @click="goToTower">
            <div class="text-base">
                {{tower.name}}
            </div>
            <div>
               {{tower.location}}
            </div>
            <div>
                {{new Date(tower.startDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}}
            </div>
            <div v-if="tower.capacity >= 1">
                Remaining Capacity: {{tower.capacity}}
            </div>
            <div v-if="tower.isCanceled == true" class="text-danger text-center bg-dark">
                <h4>Cancelled</h4>
            </div>
            <div v-else-if="tower.capacity == 0" class="text-danger text-center bg-dark">
                <h4>Sold Out</h4>
            </div>


        </div>
    </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
    props: {tower: {type: Object, required: true}},
    setup(props){
        const router = useRouter()
        return {
            goToTower(){
                router.push({
                    name: "Tower",
                    params: { id: props.tower.id }
                })
            }
            
        }
    }
}
</script>


<style lang="scss" scoped>

.events-img{
    height: 300px;
    width: 100%;
    background-position: center;
  background-size: cover;
}

</style>