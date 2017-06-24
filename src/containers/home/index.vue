<template>
  <div>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div class="_font-size-big">Home</div>
          <router-link to="/collection" class="_color-accent">
            <div class="_font-size-big">Collectible</div>
          </router-link>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container row">

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

          <div class="col-xs-12">
            <LobbyCard>
            </LobbyCard>
          </div>

        </div>
      </div>

      <div class="foot-button _bg-color-accent _color-light _flex-row _main-center _cross-center">
        <h3 class="_no-margin" @click="create">Create Room</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from '@/services'
import LobbyCard from './LobbyCard'

export default {
  name: 'Home',
  components: {
    LobbyCard
  },
  methods: {
    logout () {
      Auth.logout()
        .subscribe(
          () => {
            this.$router.push('/')
          }
        )
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
