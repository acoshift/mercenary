<template>
  <div>
    Login
    <button @click="login">Login</button>
    <audio src="https://storage.googleapis.com/mercenary-714ba.appspot.com/bgm/login.mp3" type="audio/mp3" autoplay></audio>
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

<style>
</style>
