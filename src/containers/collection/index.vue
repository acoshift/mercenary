<template>
  <div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay loop></audio>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer"
            @click="back">
             <i class="material-icons">arrow_back</i>
          </div>
          <div class="_font-size-big"><strong>Your Collection</strong></div>
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer">
          </div>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container" style="max-width: 500px">
          <div class="row">
            <div class="col-xs-3">
              <img src="~@/assets/items/i1.png" width="100%" class="item" :class="{got: true}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i2.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i3.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i4.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i5.png" width="100%" class="item" :class="{got: true}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i6.png" width="100%" class="item" :class="{got: true}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i7.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i8.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i9.png" width="100%" class="item" :class="{got: true}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i10.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i11.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i12.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i13.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i14.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i15.png" width="100%" class="item" :class="{got: false}">
            </div>
            <div class="col-xs-3">
              <img src="~@/assets/items/i16.png" width="100%" class="item" :class="{got: false}">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { SFX } from '@/services'
export default {
  name: 'Collection',
  methods: {
    back () {
      SFX.playClick()
      this.$router.push('/home')
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
  }
}

.navbar-dummy {
  min-height: $navbar-height;
  height: $navbar-height;
}

.content {
  overflow: auto;
  background-image: url('~@/assets/bg/bg2.jpg');
  padding-top: 32px;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
}

.item {
  opacity: 0.6;
  filter: grayscale(100%);
  &.got {
    filter: grayscale(0%);
    opacity: 1;
  }
}
</style>
