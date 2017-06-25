<template>
  <div class="login">
    <div class="grid-container" style="max-width: 500px">
      <div class="_flex-column _cross-center _full-width">
        <img class="lunar-block-bigger" src="~@/assets/logo.png" width="100%" style="max-width: 250px;" alt="logo">
        <div class="_full-width">
          <div class="col-xs-12">
            <button class="lunar-button2 _bg-color-accent _full-width" @click="login">
              <h3 class="_no-margin">Login with Facebook</h3>
            </button>
          </div>
          <div class="col-xs-12" style="padding-top: 20px;">
            <button class="lunar-button2 _full-width" @click="goHowtoplay">
              <h3 class="_no-margin" style="color: #2e363e;">How to play?</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay loop></audio>
  </div>
</template>

<script>
import { Auth, SFX } from '@/services'
export default {
  name: 'Login',
  methods: {
    login () {
      SFX.playClick()
      Auth.login()
    },
    goHowtoplay () {
      console.log('go how to play?')
    }
  }
}
</script>

<style lang="scss">
.login {
  background-image: url('~@/assets/bg/bg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (min-width: 970px) {
    background-image: url('~@/assets/bg/bg2.jpg');
  }
  > div {
    padding-top: 64px;
  }
}
</style>
