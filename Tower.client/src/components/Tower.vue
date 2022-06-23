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
                {{tower.startDate}}
            </div>
            <div>
                Remaining Capacity: {{tower.capacity}}
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
                    params: {id: props.tower.creatorId}
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