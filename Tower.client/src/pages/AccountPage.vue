<template>
<div class="container-fluid bg-dark">

  <div class="row">
    <MyTickets v-for="t in tickets" :key="t.id" :ticket="t"/>
    
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
    watchEffect(async() => {
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
</style>
