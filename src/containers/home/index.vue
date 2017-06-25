<template>
  <div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay loop></audio>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer"
            @click="logout">
            <i class="material-icons">power_settings_new</i>
          </div>
          <div v-if="currentUser"><strong>{{currentUser.name | shortName}} &nbsp;</strong></div>
          <!--<div @click="clickCollection" class="_full-height _color-warning">
            <div
              class="_full-height _flex-row _cross-center _main-center"
              style="width: 50px; cursor: pointer">
              <i class="material-icons">stars</i>
            </div>
          </div>-->
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container row" style="max-width: 500px">
          <div @click="clickRoom(r)" v-for="r in rooms" :key="r.$key" class="col-xs-12">
            <LobbyCard :host="r.host" :boss="r.boss" :member="r.memberCount"></LobbyCard>
          </div>
        </div>
      </div>

      <div class="foot-button _bg-color-accent _color-light _flex-row _main-center _cross-center" @click="clickCreate" >
        <div tag="h3" class="_no-margin _font-size-bigger"><strong>Create Room</strong></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, Room, User, Boss, SFX } from '@/services'
import { Observable } from 'rxjs'
import LobbyCard from './LobbyCard'

export default {
  name: 'Home',
  components: {
    LobbyCard
  },
  subscriptions () {
    return {
      currentUser: Auth.currentUser
        .filter(Boolean)
        .flatMap((user) => User.get(user.uid)),
      rooms: Room.list()
        .flatMap((list) => Observable
          .from(list)
          .flatMap((r) => Observable.forkJoin(
            User.get(r.host),
            Boss.get(r.boss)
          ), (r, [ host, boss ]) => ({ ...r, host, boss }))
          .map((r) => ({ ...r, memberCount: Object.keys(r.member).length }))
          .toArray()
        )
    }
  },
  methods: {
    logout () {
      SFX.playClick()
      Auth.logout()
        .subscribe(() => {
          this.$router.push('/')
        })
    },
    clickRoom (r) {
      SFX.playClick()
      this.$router.push({ name: 'Join', params: { id: r.$key } })
    },
    clickCollection () {
      SFX.playClick()
      this.$router.push('/collection')
    },
    clickCreate () {
      SFX.playClick()
      this.$router.push({ name: 'Create' })
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
