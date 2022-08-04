<template>
  <form @submit.prevent="createEvents">
    <div class="row text-white">
      <div class="col-md-6 pt-3">
        <label for="">Name of Event</label>
        <input
          required
          class="form-control"
          type="text"
          placeholder="Name..."
          v-model="create.name"
        />
      </div>
      <div class="col-md-6 pt-3">
        <label for="">Location</label>
        <input
          required
          class="form-control"
          type="text"
          placeholder="Location"
          v-model="create.location"
        />
      </div>
      <div class="col-md-6 pt-3">
        <label for="">type</label>
        <input
          required
          class="form-control"
          type="text"
          placeholder="concert, digital..."
          v-model="create.type"
        />
      </div>
      <div class="col-md-6 pt-3">
        <label for="">Capacity</label>
        <input
          required
          class="form-control"
          type="text"
          placeholder="Capacity"
          v-model="create.capacity"
        />
      </div>
      <div class="col-md-6 pt-3">
        <label for="">Date</label>
        <input
          required
          class="form-control"
          type="Date"
          placeholder="Date"
          v-model="create.startDate"
        />
      </div>
      <div class="col-md-6 pt-3">
        <label for="">Image</label>
        <input
          required
          class="form-control"
          type="text"
          placeholder="Image Url"
          v-model="create.coverImg"
        />
      </div>

      <div class="col-md-12 pt-4">
        <textarea
          required
          placeholder="Description"
          class="form-control w-100"
          rows="3"
          v-model="create.description"
        ></textarea>
      </div>
      <div class="col-md-12 text-end pt-5">
        <button
          class="btn btn-info border-white me-3"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          Cancel
        </button>
        <button class="btn btn-dark border-white selectable">Submit</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { towerService } from '../services/TowerService'
import Pop from '../utils/Pop'
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
import { Modal } from 'bootstrap'
import { AppState } from '../AppState'
export default {

  setup() {
    const route = useRouter()
    const create = ref({})
    return {
      create,
      async createEvents() {
        try {
          const event = await towerService.createEvents(create.value)
          create.value = {},
            Modal.getOrCreateInstance(document.getElementById('create-event')).toggle()
          route.push({ name: 'Tower', params: { id: event.id } })

          Pop.toast('Event Created!')
        } catch (error) {
          logger.log(error)
          Pop.toast(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>