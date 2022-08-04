<template>
  <div class="container-fluid bg-dark">
    <h3 class="pt-5 ps-5 text">Upcoming Events</h3>
    <div class="row">
      <MyTickets v-for="t in tickets" :key="t.id" :ticket="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.text {
  color: #79e7ab;
}
</style>
