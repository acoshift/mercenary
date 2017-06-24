<template>
  <div>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div class="_font-size-big" @click="back">Home</div>
          <router-link to="/collection" class="_color-accent">
            <div class="_font-size-big">Collectible</div>
          </router-link>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container row" style="max-width: 500px">
          <div class="lunar-card col-xs-12">
            <div class="lunar-segment">
              <div class="lunar-block">Select Boss</div>
              <div class="lunar-block-big row">
                <div class="col-xs-4">
                  <img
                  src="~@/assets/enemy/enemy1-s.png" alt="boss1" width="100%"
                  :class="{selected: selectedBoss === 0}"
                  @click="selectedBoss = 0">
                </div>
                <div class="col-xs-4">
                  <img src="~@/assets/enemy/enemy2-s.png" alt="boss1" width="100%">
                </div>
                <div class="col-xs-4">
                  <img src="~@/assets/enemy/enemy3-s.png" alt="boss1" width="100%">
                </div>
                <div class="col-xs-4">
                  <img src="~@/assets/enemy/enemy4-s.png" alt="boss1" width="100%">
                </div>
                <div class="col-xs-4">
                  <img src="~@/assets/enemy/enemy5-s.png" alt="boss1" width="100%">
                </div>
                <div class="col-xs-4">
                  <img src="~@/assets/enemy/enemy6-s.png" alt="boss1" width="100%">
                </div>
              </div>
               <div class="lunar-block">Select Your Job</div>
            </div>
          </div>
        </div>
      </div>

      <div class="foot-button _bg-color-accent _color-light _flex-row _main-center _cross-center">
        <h3 class="_no-margin">Go</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      selectedBoss: 0,
      selectedJob: '',
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
$navbar-height: 50px;

.navbar {
  position: fixed;
  width: 100%;
  color: white;
  height: $navbar-height;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.03), 0 5px 15px rgba(0, 0, 0, 0.06);
  > div {
    padding: 0 16px;
  }
}

.navbar-dummy {
  height: $navbar-height;
}

.content {
  overflow: auto;
  padding-top: 16px;
  background-color: black;
  background-image: url('~@/assets/bg/bg1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.foot-button {
  height: 50px;
}
</style>
