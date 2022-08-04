<template>
  <div class="col-md-1">
    <img
      :title="attendee.account?.name"
      class="img-fluid bg-img"
      :src="attendee.account?.picture"
      alt=""
    />
  </div>
</template>

<script>
export default {
  props: { attendee: { type: Object, required: true } },
  setup() {
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
.bg-img {
  border-radius: 50%;
  width: 50px;
}
</style>