<template>
  <div class="col-md-1 bg">
    <div class="pb-3">
      <img
        title=""
        class="img-fluid bg-img"
        :src="comments.creator?.picture"
        alt=""
      />
    </div>
  </div>
  <div class="col-md-11 bg pb-3 text-black">
    <div class="comment pt-3 pb-3 rounded ps-2">
      <span>{{ comments.creator?.name }}</span>
      <span v-if="comments.isAttending == true" class=""
        ><i class="mdi mdi-check"></i
      ></span>
      <span
        class="p-3"
        title="Delete Comment"
        v-if="comments.creatorId == account.id"
      >
        <i class="mdi mdi-trash-can selectable" @click="deleteComment"></i
      ></span>
      <div class="pt-3">{{ comments.body }}</div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentService } from '../services/CommentService'
export default {
  props: { comments: { type: Object, required: true } },
  setup(props) {
    return {
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await commentService.deleteComment(props.comments.id)
            Pop.toast('Comment has been deleted!')
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },

      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-img {
  border-radius: 50%;
}

.bg {
  background-color: #474c61;
}

.comment {
  background-color: #e2f9ff;
}
</style>