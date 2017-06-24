<template>
  <div>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div class="_font-size-big" @click="logout">Logout</div>
          <div>สมชาย</div>
          <router-link to="/collection" class="_color-accent">
            <div class="_font-size-big">Collectible</div>
          </router-link>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container row" style="max-width: 500px">
          <router-link v-for="(r, i) in rooms" :key="i" class="col-xs-12" :to="{ name: 'Join', params: { id: i } }">
            <LobbyCard>
            </LobbyCard>
          </router-link>
        </div>
      </div>

      <div class="foot-button _bg-color-accent _color-light _flex-row _main-center _cross-center">
        <router-link tag="h3" class="_no-margin" :to="{ name: 'Create' }">Create Room</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Room } from '@/services'
import LobbyCard from './LobbyCard'

export default {
  name: 'Home',
  components: {
    LobbyCard
  },
  subscriptions () {
    return {
      rooms: Room.list()
    }
  },
  methods: {
    logout () {
      Auth.logout()
        .subscribe(() => {
          this.$router.push('/')
        })
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

.foot-button {
  height: 50px;
}
</style>
