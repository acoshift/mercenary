<template>
  <div>
    <audio src="https://storage.googleapis.com/mercenary-714ba.appspot.com/bgm/bossB64.mp3" type="audio/mp3" autoplay></audio>
    <div class="_flex-column _full-height">

      <div class="content _flex-span _bg-color-base _full-height">
        <div class="grid-container _full-height" style="max-width: 500px">
          <div class="_flex-column">
            <div class="boss-hp">
              <div class="bar" :style="{width: `${bossHpPercent}%`}"></div>
            </div>

            <div id="boss" class="boss-avatar move">
              <img src="~@/assets/enemy/enemy3-s.png" alt="boss" width="60%">
            </div>

            <div class="player _flex-column _main-end _flex-span">
              <div class="party lunar-block-big">

                <div class="member _flex-row lunar-block">
                  <img src="~@/assets/skill/heal.png" width="30" height="30">
                  <div class="_flex-column _flex-span">
                    <div class="_color-light"><strong>สมชาย</strong></div>
                    <div class="member-hp">
                      <div class="bar" :style="{width: `${memberHpPercent}%`}"></div>
                    </div>
                  </div>
                </div>

                <div class="member _flex-row lunar-block">
                  <img src="~@/assets/skill/heal.png" width="30" height="30">
                  <div class="_flex-column _flex-span">
                    <div class="_color-light"><strong>สมชาย</strong></div>
                    <div class="member-hp">
                      <div class="bar" :style="{width: `${memberHpPercent}%`}"></div>
                    </div>
                  </div>
                </div>

                <div class="member _flex-row lunar-block">
                  <img src="~@/assets/skill/heal.png" width="30" height="30">
                  <div class="_flex-column _flex-span">
                    <div class="_color-light"><strong>สมชาย</strong></div>
                    <div class="member-hp">
                      <div class="bar" :style="{width: `${memberHpPercent}%`}"></div>
                    </div>
                  </div>
                </div>

                <div class="member _flex-row lunar-block">
                  <img src="~@/assets/skill/heal.png" width="30" height="30">
                  <div class="_flex-column _flex-span">
                    <div class="_color-light"><strong>สมชาย</strong></div>
                    <div class="member-hp">
                      <div class="bar" :style="{width: `${memberHpPercent}%`}"></div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="control row lunar-block">
                <div class="col-xs-4">
                   <div class="skill">
                    <img
                      src="~@/assets/skill/fireball.png" alt="attack" width="100%"
                      :class="{disabled: true}"
                      @click="playBossIsStunned">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: 3</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="skill">
                    <img src="~@/assets/skill/defend.png" alt="attack" width="100%"
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
                      src="~@/assets/skill/attack.png" alt="attack" width="100%"
                      @click="playBossAttack">
                  </div>
                </div>
              </div>
              <div class="player-hp">
                <div class="bar" :style="{width: `${selfHpPercent}%`}"></div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { SFX } from '@/services'
export default {
  name: 'Battle',
  methods: {
    playBossAttack () {
      SFX.playBossAttack()
      let boss = document.getElementById('boss')
      boss.classList.remove('attacked')
      boss.classList.remove('attacking')
      boss.classList.remove('stunned')
      boss.classList.remove('move')
      setTimeout(() => {
        boss.className += ' attacking'
      }, 160)
      setTimeout(() => {
        boss.classList.remove('attacking')
        boss.className += ' move'
      }, 1300)
    },
    playBossIsAttacked () {
      SFX.playAttack()
      let boss = document.getElementById('boss')
      boss.classList.remove('attacked')
      boss.classList.remove('attacking')
      boss.classList.remove('stunned')
      boss.classList.remove('move')
      setTimeout(() => {
        boss.className += ' attacked'
      }, 160)
      setTimeout(() => {
        boss.classList.remove('attacked')
        boss.className += ' move'
      }, 1300)
    },
    playBossIsStunned () {
      SFX.playSkillMage()
      let boss = document.getElementById('boss')
      boss.classList.remove('attacked')
      boss.classList.remove('attacking')
      boss.classList.remove('stunned')
      boss.classList.remove('move')
      setTimeout(() => {
        boss.className += ' stunned'
      }, 160)
    }
  },
  computed: {
    bossHpPercent () {
      return 75
    },
    selfHpPercent () {
      return 90
    },
    memberHpPercent () {
      return 30
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
  width: 100%;
  background-color: #484848;
  height: 20px;
  border: 2px solid white;
  box-sizing: border-box;
  .bar {
    background-color: #3ad03a;
    height: 100%;
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
</style>
