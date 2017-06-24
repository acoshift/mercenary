<template>
  <div>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div class="_flex-row">
            <div @click="back">Back</div>
            &nbsp;<div class="_font-size-big">Collection</div>
          </div>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container" style="max-width: 500px">
          <div class="row">
            <div v-for="n in 18" class="col-xs-3" :key="n">
              <img src="~@/assets/item1.png" width="100%" class="item" :class="{got: (n > 10 && n < 15)}">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Collection',
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
  min-height: $navbar-height;
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

.item {
  opacity: 0.2;
  &.got {
    opacity: 1;
  }
}
</style>
