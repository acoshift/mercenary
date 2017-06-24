<template>
  <div class="login">
    <div class="grid-container" style="max-width: 500px">
      <div class="_flex-column _cross-center _full-width">
        <img class="lunar-block-bigger" src="~@/assets/logo.png" width="100%" style="max-width: 400px;">
        <div class="_full-width">
          <div class="col-xs-12">
            <button class="lunar-button _bg-color-accent _full-width" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay></audio>
  </div>
</template>

<script>
import { Auth } from '@/services'

export default {
  name: 'Login',
  methods: {
    login () {
      Auth.login()
    }
  }
}
</script>

<style lang="scss">
.login {
  background-image: url('~@/assets/bg/bg3.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (min-width: 970px) {
    background-image: url('~@/assets/bg/bg3d.jpg');
  }
  > div {
    padding-top: 64px;
  }
}
</style>
