<template>
    <div class="col-md-12 p-5">
        <div class="row  elevation-5 bg-grey border border-dark border-3 p-2">
            <div class="col-md-4">
                <img class="img-fluid" :src="ticket.event.coverImg" alt="">
            </div>

        <div class="col-md-8">

            <div class="text-base">
                {{ticket.event.name}}
            </div>
            <div>
               {{ticket.event.location}}
            </div>
            <div>
                {{new Date(ticket.event.startDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}}
            </div>
            <div v-if="ticket.event.capacity >= 1">
                Remaining Capacity: {{ticket.event.capacity}}
            </div>
            <div v-if="ticket.event.isCanceled == true" class="text-danger text-center bg-dark">
                <h4>Cancelled</h4>
            </div>
            <div v-else-if="ticket.event.capacity == 0" class="text-danger text-center bg-dark">
                <h4>Sold Out</h4>
            </div>
        </div>
        <div class="col-md-12 text-end">
            <button @click="deleteTicket" class="btn btn-danger">Delete Ticket</button>
        </div>

        </div>

        </div>


</template>


<script>
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
export default {
    props: {ticket: {type: Object ,required: true }},
    setup(props){

        return {
            async deleteTicket(){
                try {
                    if (await Pop.confirm()) {
                        await accountService.deleteTicket(props.ticket.id)
                        Pop.toast('Ticket has been deleted')
                    }
                } catch (error) {
                    next(error)
                }
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