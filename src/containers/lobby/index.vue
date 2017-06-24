<template>
  <div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay></audio>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer"
            @click="leave">
             Leave
          </div>
          <div class="_font-size-big"><strong>Lobby</strong></div>
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
                  src="~@/assets/enemy/enemy1-s.png" alt="boss1" width="100%"
                  class="enemy _no-select">
                </div>
              </div>
              <div class="lunar-block"><h3>Your Team</h3></div>
              <div class="slot-list lunar-block-big row">

                <div class="col-xs-4">
                  <div class="job _flex-column lunar-block _no-select _cross-center">
                    <img src="~@/assets/job/knight.png" alt="knight" width="150px" height="150px">
                    <div>สมชาย</div>
                  </div>
                </div>

                <div class="col-xs-4">
                  <div class="job _flex-column lunar-block _no-select _cross-center">
                    <img src="~@/assets/job/knight.png" alt="knight" width="150px" height="150px">
                    <div>สมหญิง</div>
                  </div>
                </div>

                <div class="col-xs-4">
                  <div class="_flex-column lunar-block _no-select _cross-center">
                    <div class="empty-slot _flex-row _main-center _cross-center">
                      <h4>Waiting</h4>
                    </div>
                  </div>
                </div>

                <div class="col-xs-4">
                  <div class="_flex-column lunar-block _no-select _cross-center">
                    <div class="empty-slot _flex-row _main-center _cross-center">
                      <h4>Waiting</h4>
                    </div>
                  </div>
                </div>

                <div class="col-xs-4">
                  <div class="_flex-column lunar-block _no-select _cross-center">
                    <div class="empty-slot _flex-row _main-center _cross-center">
                      <h4>Waiting</h4>
                    </div>
                  </div>
                </div>

              </div>

              <div class="lunar-button2 -negative" @click="startGame">
                Start Game
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Room, SFX } from '@/services'

export default {
  name: 'Lobby',
  props: {
    id: {
      type: String,
      required: true
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
      SFX.playClick()
      this.$router.push('/battle')
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
