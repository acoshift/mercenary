<template>
  <div class="lunar-card _flex-row">
    <img
      :src="boss.photo"
      width="100"
      height="100">

    <div class="lunar-segment">
      <div class="lunar-block"><strong>Host:</strong> {{host.name}}</div>
      <div class="lunar-block"><strong>Member:</strong> {{member}}/5</div>
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
.lunar-card {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.03), 0 5px 15px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  overflow: hidden;
  border: 2px solid white;
  color: #363636;
}
</style>
