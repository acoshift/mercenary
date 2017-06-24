<template>
  <div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay></audio>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer"
            @click="back">
             <i class="material-icons">arrow_back</i>
          </div>
          <div class="_font-size-big"><strong>Join Room</strong></div>
          <div style="width: 50px;"></div>
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
                <div class="col-xs-6 col-xs-offset-3">
                  <img
                  v-if="room && room.boss"
                  :src="room.boss.photo" alt="boss" width="100%"
                  class="enemy">
                </div>
              </div>
              <div class="lunar-block"><h3>Select Your Job</h3></div>
              <div class="lunar-block-big row">
                <div class="col-xs-12">
                  <div v-for="j in jobs" :key="j.$key" class="job _flex-row lunar-block" :class="{selected: selectedJob === j.$key}" @click="selectedJob = j.$key">
                    <img :src="j.photo" :alt="j.name" width="150px" height="150px" style="min-width: 150px;">
                    <div class="lunar-segment">
                      <h4>{{j.name}}</h4>
                      <div class="lunar-block"><strong>HP</strong>{{j.hp}} &nbsp; &nbsp;<strong>ATK</strong>{{j.atk}}</div>
                      <div><strong>Skill:</strong></div>
                      <div class="_full-width">
                        <p>{{j.skill | skillDetail}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lunar-button2 -negative" @click="join">
                Join
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Boss, Job, Room, SFX } from '@/services'

export default {
  name: 'Join',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  subscriptions () {
    return {
      jobs: Job.list()
        .do((list) => {
          this.selectedJob = list[0].$key
        }),
      room: Room.get(this.id)
        .flatMap((r) => Boss.get(r.boss), (r, boss) => ({ ...r, boss }))
    }
  },
  data () {
    return {
      selectedJob: 0
    }
  },
  methods: {
    join () {
      SFX.playClick()
      this.$router.push('/lobby')
    },
    back () {
      SFX.playClick()
      this.$router.push('/home')
    }
  },
  watch: {
    selectedJob () {
      SFX.playClick2()
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
    box-shadow: 0px 0px 0px 4px #03A9F4;
    background: rgb(255, 255, 255);
    border-radius: 5px;
  }
}

.job {
  &.selected {
    box-shadow: 0px 0px 0px 4px #03A9F4;
    background: rgb(255, 255, 255);
    border-radius: 5px;
  }
}
.foot-button {
  height: 50px;
}
</style>
