<template>
  <div class="lunar-card _flex-row">
    <img
      :src="boss.photo"
      width="100"
      height="100">

    <div class="lunar-segment">
      <div class="lunar-block">Host: {{host.name}}</div>
      <div class="lunar-block">Member: {{member}}/5</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LobbyCard',
  props: {
    host: {
      type: Object,
      required: true
    },
    boss: {
      type: Object,
      required: true
    },
    member: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.enemy3 {
  background: #dacab4;
}
</style>
