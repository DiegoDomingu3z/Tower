<template>
  <div class="col-md-12 bg">
    <div class="text-end p-4">Join the Conversation</div>
    <div class="row text-center p-4">
      <form @submit.prevent="createComment" id="comment-form">
        <textarea
          placeholder="Tell the people..."
          class="w-100"
          rows="8"
          v-model="create.body"
        ></textarea>
        <div class="text-end pt-2">
          <button type="button" @click="createComment" class="btn btn-success">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
import { watchEffect } from '@vue/runtime-core'
export default {
  setup() {
    const route = useRoute()
    const create = ref({})
    watchEffect(async () => {
      try {

      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      create,
      async createComment() {
        try {
          create.value.eventId = route.params.id
          await commentService.createComment(create.value)
          document.getElementById("comment-form").reset()
          Pop.toast('Comment Posted')
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, error)
        }
      },
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
.bg {
  background-color: #474c61;
}
</style>