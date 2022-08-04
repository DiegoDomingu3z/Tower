<template>
  <div class="container-fluid bg-dark">
    <div class="row p-3">
      <div
        class="col-md-12 bg border border-primary"
        style="
          background-image: url(https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80);
        "
      >
        <div class="p-5 text">
          <p class="fs-5">Get ahead of the scalpers.</p>
          <p class="fs-5">Reserve your seat now with</p>
          <p class="fs-5">real event for real people.</p>
        </div>
      </div>
    </div>

    <div class="row bg-dark">
      <div class="col-md-12 d-flex justify-content-around bg-black p-3">
        <span>
          <button
            title="All"
            class="btn text-light tabs"
            @click="filterEvents = ''"
          >
            All
          </button>
        </span>
        <button
          title="filter concerts"
          class="btn text-light tabs"
          @click="filterEvents = 'concert'"
        >
          Concert
        </button>
        <button
          title="filter digitals"
          class="btn text-light tabs"
          @click="filterEvents = 'digital'"
        >
          Digital
        </button>
        <button
          title="filter sports"
          class="btn text-light tabs"
          @click="filterEvents = 'sport'"
        >
          Sports
        </button>
        <button
          title="filter convention"
          class="btn text-light tabs"
          @click="filterEvents = 'convention'"
        >
          Conventions
        </button>
      </div>

      <Tower v-for="t in tower" :key="t.id" :tower="t" class="col-md-3" />
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { towerService } from '../services/TowerService'
import { AppState } from '../AppState'

export default {
  setup() {
    const filterEvents = ref('')
    watchEffect(async () => {
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
.bg {
  height: 230px;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.text {
  color: #ccf3fd;
}

.tabs:focus {
  border: 2px solid green;
}
</style>