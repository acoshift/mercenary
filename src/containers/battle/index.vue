<template>
  <div id="battle-screen" class="">
    <audio src="https://storage.googleapis.com/mercenary-714ba.appspot.com/bgm/bossB64.mp3" type="audio/mp3" autoplay></audio>
    <div class="_flex-column _full-height">

      <div class="content _flex-span _bg-color-base _full-height">
        <div class="grid-container _full-height" style="max-width: 500px">
          <div class="_flex-column">
            <div class="boss-hp">
              <div class="bar" :style="{width: `${bossHpPercent}%`}"></div>
            </div>

            <div id="boss" class="boss-avatar move" v-if="room">
              <img :src="`/static/enemy/${room.boss.photo}`" alt="boss" width="60%">
            </div>

            <div class="player _flex-column _main-end _flex-span">
              <div class="party lunar-block-big" v-if="room">

                <div v-for="(m, i) in members" :key="i" v-if="m" class="member _flex-row lunar-block">
                  <img src="~@/assets/skill/heal.png" width="30" height="30">
                  <div class="_flex-column _flex-span">
                    <div class="_color-light"><strong>{{m.name}}</strong></div>
                    <div class="member-hp">
                      <div class="bar" :style="{width: `${hpPercent(m.hp, m.maxHp)}%`}"></div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="control row lunar-block" v-if="me">
                <div class="col-xs-4">
                   <div class="skill">
                    <img
                      :src="`/static/skill/${me.skill}.png`" alt="skill" width="100%"
                      :class="{disabled: true}"
                      @click="playBossIsStunned">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: {{me.skillCt}}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="skill">
                    <img src="/static/skill/def.png" alt="defend" width="100%"
                    :class="{disabled: false}"
                     @click="playBossIsAttacked">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: 2</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="skill">
                    <img
                      src="/static/skill/atk.png" alt="skill" width="100%"
                      @click="playBossAttack">
                  </div>
                </div>
              </div>
              <div class="player-hp">
                <div class="bar _align-center _color-light" :style="{width: `${selfHpPercent}%`}"></div>
                <div class="hp _align-center _color-light">
                  <strong v-if="room">{{me.hp}}</strong>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { SFX, Room } from '@/services'
import firebase from 'firebase'

export default {
  name: 'Battle',
  subscriptions () {
    return {
      room: Room.getBattleRoom().do(console.log)
    }
  },
  methods: {
    playBossAttack () {
      let boss = document.getElementById('boss')
      SFX.playBossAttack()
      this.resetAnimateClass()
      setTimeout(() => {
        boss.className += ' attacking'
      }, 160)
      setTimeout(() => {
        this.playShakeScreen()
      }, 300)
      setTimeout(() => {
        boss.classList.remove('attacking')
        boss.className += ' move'
      }, 1300)
    },
    playBossIsAttacked () {
      let boss = document.getElementById('boss')
      SFX.playAttack()
      this.resetAnimateClass()
      setTimeout(() => {
        boss.className += ' attacked'
      }, 160)
      setTimeout(() => {
        boss.classList.remove('attacked')
        boss.className += ' move'
      }, 1300)
    },
    playBossIsStunned () {
      let boss = document.getElementById('boss')
      SFX.playSkillMage()
      this.resetAnimateClass()
      setTimeout(() => {
        boss.className += ' stunned'
      }, 160)
    },
    playShakeScreen () {
      let screen = document.getElementById('battle-screen')
      screen.classList.remove('shake')
      setTimeout(() => {
        screen.className += ' shake'
      }, 160)
      setTimeout(() => {
        screen.classList.remove('shake')
      }, 700)
    },
    resetAnimateClass () {
      let boss = document.getElementById('boss')
      boss.classList.remove('attacked')
      boss.classList.remove('attacking')
      boss.classList.remove('stunned')
      boss.classList.remove('move')
    },
    hpPercent (current, max) {
      return current / max * 100
    },
    attack () {
      firebase.database()
        .ref(this.room.$key)
        .transaction((hp) => {
          return hp - 10
        })
    }
  },
  computed: {
    bossHpPercent () {
      if (!this.room) return 0
      return this.hpPercent(this.room.boss.hp, this.room.boss.maxHp)
    },
    selfHpPercent () {
      if (!this.room) return 0
      return this.hpPercent(this.room.member[0].hp, this.room.member[0].maxHp)
    },
    members () {
      if (!this.room) return []
      return this.room.member.filter((x, k) => (k !== 0) && !!x)
    },
    me () {
      if (!this.room) return null
      return this.room.member[0]
    }
  }
}
</script>

<style lang='scss' scoped>

.content {
  overflow: auto;
  background-color: black;
  background-image: url('~@/assets/bg/bg1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.boss-hp {
  width: 100%;
  background-color: #484848;
  height: 20px;
  border: 2px solid white;
  box-sizing: border-box;
  .bar {
    background-color: red;
    height: 100%;
  }
}

.player-hp {
  position: relative;
  width: 100%;
  background-color: #484848;
  height: 20px;
  border: 2px solid white;
  box-sizing: border-box;
  .bar {
    background-color: #3ad03a;
    height: 100%;
  }
  .hp {
    width: 100%;
    top: 0;
    position: absolute;
    z-index: 2;
  }
}
.member {
  width: 200px;
  img {
    margin-right: 4px;
  }
}
.member-hp {
  width: 100%;
  background-color: #484848;
  height: 8px;
  box-sizing: border-box;
  .bar {
    background-color: #3ad03a;
    height: 100%;
  }
}
.skill {
  img {
    &.disabled {
      opacity: 0.5;
    }
  }
}
#boss {
  position: relative;
  >img {
    margin: auto;
    left: 0;
    right: 0;
    position: absolute;
  }
  &.move {
    img {
      animation-name: bossMove;
      animation-iteration-count: infinite;
      animation-duration: 2s;
    }
  }
  &.attacking {
    img {
      animation-name: bossAttack;
      animation-duration: .6s;
    }
  }
  &.attacked {
    img {
      animation-name: bossBlink;
      animation-duration: .2s;
      animation-iteration-count: 4;
    }
  }
  &.stunned {
    img {
      animation-name: bossStunned;
      animation-iteration-count: infinite;
      animation-duration: .5s;
    }
  }
}

#battle-screen {
  &.shake {
    animation-name: shakeScreen;
    animation-duration: 0.8s;
    transform-origin:50% 50%;
    animation-iteration-count: .6s;
    animation-timing-function: linear;
  }
}
@keyframes bossAttack {
  0% {top: 0}
  20% {top: -30px}
  80% {top: 100px}
  100% {top: 0px}
}

@keyframes bossBlink {
  to {opacity: 0}
}

@keyframes bossMove {
  0% {top: 0px}
  50% {top: -20px}
  100% {top: 0px}
}

@keyframes bossStunned {
  0% {transform: rotate(0deg)}
  35% {transform: rotate(7deg)}
  65% {transform: rotate(0deg)}
  100% {transform: rotate(-7deg)}
}

@keyframes shakeScreen {
  0% { -webkit-transform: translate(2px, 1px) rotate(0deg); }
  10% { -webkit-transform: translate(-1px, -2px) rotate(-1deg); }
  20% { -webkit-transform: translate(-3px, 0px) rotate(1deg); }
  30% { -webkit-transform: translate(0px, 2px) rotate(0deg); }
  40% { -webkit-transform: translate(1px, -1px) rotate(1deg); }
  50% { -webkit-transform: translate(-1px, 2px) rotate(-1deg); }
  60% { -webkit-transform: translate(-3px, 1px) rotate(0deg); }
  70% { -webkit-transform: translate(2px, 1px) rotate(-1deg); }
  80% { -webkit-transform: translate(-1px, -1px) rotate(1deg); }
  90% { -webkit-transform: translate(2px, 2px) rotate(0deg); }
  100% { -webkit-transform: translate(1px, -2px) rotate(-1deg); }
}
</style>
