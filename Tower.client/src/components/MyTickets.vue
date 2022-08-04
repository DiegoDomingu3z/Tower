<template>
  <div class="col-md-12 p-5 pb-2">
    <div class="row elevation-5 bg border border-dark border-3">
      <div class="col-md-4 ps-0 pe-0">
        <img class="img-fluid" :src="ticket.event.coverImg" alt="" />
      </div>

      <div class="col-md-8">
        <div class="text-base pb-4 pt-4">
          <h4>{{ ticket.event.name }}</h4>
        </div>
        <div class="pb-4 text">
          <h5>{{ ticket.event.location }}</h5>
        </div>
        <div class="pb-5 text">
          <h5>
            {{
              new Date(ticket.event.startDate).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }}
          </h5>
        </div>
        <div
          v-if="ticket.event.isCanceled == true"
          class="text-danger text-center bg-dark"
        >
          <h4>Cancelled</h4>
        </div>
        <div
          v-else-if="ticket.event.capacity == 0"
          class="text-danger text-center bg-dark"
        >
          <h4>Sold Out</h4>
        </div>
        <div class="text-end delete">
          <button @click="deleteTicket" class="btn btn-danger px-4">
            not going
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {

    return {
      async deleteTicket() {
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
.events-img {
  height: 300px;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.delete {
  padding-top: 11em;
}

@media (max-width: 780px) {
  .delete {
    padding-top: 3em;
    padding-bottom: 1em;
  }
}

.bg {
  background-color: #474c61;
}

.text {
  color: #ccf3fd;
}
</style>