<template>
  <div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay loop></audio>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer"
            @click="leave">
             Leave
          </div>
          <div class="_font-size-big"><strong>Lobby <span v-if="room && room.host">{{room.host.name | shortName}}</span></strong></div>
         <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer">
          </div>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container row" style="max-width: 500px">
          <div class="lunar-card col-xs-12">
            <div class="lunar-segment" style="padding-left: 0; padding-right: 0">
              <div class="lunar-block"><h3>Room Boss</h3></div>
              <div class="lunar-block-big row">
                <div class="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                  <img
                  v-if="room && room.boss"
                  :src="`/static/enemy/${room.boss.photo}`" alt="boss" width="100%"
                  class="enemy _pointer _no-drag">
                </div>
              </div>
              <div class="lunar-block"><h3>Your Team</h3></div>
              <div class="slot-list lunar-block-big row" v-if="room">

                <div v-for="m in room.member" class="col-xs-4">
                  <div :class="{ job: !!m }" class="_flex-column lunar-block _no-select _no-drag _cross-center">
                    <img v-if="m" :src="`/static/job/${m.job.photo}`" alt="knight" width="150px" height="150px">
                    <div :class="{ 'empty-slot _flex-row _main-center _cross-center': !m }">
                      <span v-if="m">{{m.name | shortName}}</span>
                      <h4 v-else>Waiting</h4>
                    </div>
                  </div>
                </div>

              </div>

              <div v-if="isHost" class="lunar-button2 -negative" @click="startGame">
                Start Game
              </div>
              <div v-else class="lunar-button2 -negative -disable">
                Waiting host to start
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Room, SFX, Loader, User } from '@/services'
import firebase from 'firebase'

export default {
  name: 'Lobby',
  subscriptions () {
    return {
      room: Room.getMemberRoom().do(console.log),
      battleRoom: Room.getBattleRoom()
        .do(() => { this.$router.push('/battle') }),
      currentRoom: User.watchCurrentRoom()
        .do((roomId) => {
          if (!roomId) {
            User.setCurrentRoom(null)
              .subscribe(
                () => {
                  this.$router.push({ name: 'Home' })
                }
              )
          }
        })
    }
  },
  computed: {
    isHost () {
      if (!this.room) return false
      return this.room.host.id === firebase.auth().currentUser.uid
    }
  },
  methods: {
    leave () {
      SFX.playClick()
      Room.leave()
        .subscribe(
          () => {
            this.$router.push({ name: 'Home' })
          }
        )
    },
    startGame () {
      Loader.start()
      SFX.playClick()
      Room.start().subscribe()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/config.scss';
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

.lunar-card {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.03), 0 5px 15px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  overflow: hidden;
  border: 2px solid white;
  color: #363636;
}

.content {
  overflow: auto;
  padding-top: 16px;
  background-color: black;
  background-image: url('~@/assets/bg/bg1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.enemy {
  &.selected {
    box-shadow: 0px 0px 2px 4px $color-accent;
  }
}

.job {
  &.selected {
    box-shadow: 0px 0px 2px 4px $color-accent;
  }
}

.empty-slot {
  border-radius: 5px;
  background-color: #e8e8e8;
  border: 2px dashed #b9b9b9;
  width: 100%;
  height: 150px;
}
.foot-button {
  height: 50px;
}

.slot-list {
  >div:first-child {
    margin-left: 16.66666667%;
  }
}

</style>
