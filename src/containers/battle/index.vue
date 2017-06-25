<template>
  <div id="battle-screen" class="">
    <audio src="/static/bgm/bossB64.mp3" type="audio/mp3" autoplay loop></audio>
    <div class="_flex-column _full-height">

      <div class="content _flex-span _bg-color-base _full-height">
        <div class="grid-container _full-height" style="max-width: 500px">
          <div class="_flex-column">
            <div class="boss-hp">
              <div class="bar" :style="{width: `${bossHpPercent}%`}"></div>
            </div>
            <div id="boss" class="boss-avatar move" v-if="room">
              <img :src="`/static/enemy/${room.boss.photo}`" alt="boss" width="60%" v-show="room.boss.hp > 0">
            </div>
            <div class="exit" v-if="gameOver">
              <button class="lunar-button2 _bg-color-accent _full-width" @click="leave">
                <h3 class="_no-margin">Leave</h3>
              </button>
            </div>
            <div class="player _flex-column _main-end _flex-span">
              <div class="party lunar-block-big" v-if="room">

                <div v-for="(m, i) in members" :key="i" v-if="m" class="member _flex-row lunar-block">
                  <img :src="`/static/skill/${m.skill}.png`" width="30" height="30">
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
                      :class="{disabled: skillCt < me.skillCt || disableControl}"
                      @click="skill">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: {{me.skillCt}}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="skill">
                    <img
                      src="/static/skill/def.png" alt="defend" width="100%"
                      :class="{disabled: defCt < 2 || disableControl}"
                      @click="defend">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: 2</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="skill">
                    <img
                      src="/static/skill/atk.png" alt="skill" width="100%"
                      :class="{disabled: disableControl}"
                      @click="attack">
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
    const $room = Room.getBattleRoom()
    return {
      room: $room
        .do((room) => {
          this.$nextTick(() => {
            if (this.me.hp <= 0 && room.member.filter(Boolean).length <= 1) {
              Room.endBattle(room.$key).subscribe()
            }
          })
        }),
      roomEvent: $room
        .switchMap(() => Room.getBattleRoomEvent())
        .do((ev) => {
          if (ev.skill === 'stun') {
            SFX.playSkillKnight()
            this.bossStuned = true
            this.playBossIsStunned()
            return
          }
          if (ev.skill === 'heal' && this.me.hp > 0) {
            SFX.playSkillPriest()
            firebase.database()
              .ref(`room/${this.room.$key}/member/${this.me.id}/hp`)
              .transaction((hp) => {
                if (hp <= 0) return
                let h = hp + ev.value
                if (h > this.me.maxHp) h = this.me.maxHp
                return h
              })
            return
          }
        })
    }
  },
  data () {
    return {
      bossTurn: false,
      isDef: false,
      defCt: 0,
      skillCt: 0,
      bossStuned: false
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
    randRange (current, rangePercent) {
      const rand = Math.random() * rangePercent
      return Math.floor(current * (100 + rand) / 100)
    },
    attack () {
      if (this.disableControl) return
      this.bossTurn = true
      this.playBossIsAttacked()
      let dmg = this.randRange(this.me.atk, 30) - this.randRange(this.room.boss.def, 10)
      firebase.database()
        .ref(`room/${this.room.$key}/boss/hp`)
        .transaction((hp) => {
          if (dmg <= 0) return
          let rdmg = dmg <= hp ? dmg : hp
          return hp - rdmg
        })
        .then(() => {
          setTimeout(() => {
            this.bossAttack()
          }, 1000)
        })
    },
    defend () {
      if (this.disableControl) return
      if (this.defCt < 2) return
      this.bossTurn = true
      this.defCt -= 2
      this.isDef = true
      SFX.playDefend()
      setTimeout(() => {
        this.bossAttack()
      }, 500)
    },
    skill () {
      if (this.disableControl) return
      if (this.skillCt < 2) return
      this.bossTurn = true
      this.skillCt -= this.me.skillCt
      switch (this.me.skill) {
        case 'stun':
          Room.sendBattleRoomEvent(this.room.$key, { skill: 'stun' })
          setTimeout(() => { this.bossAttack() }, 2000)
          break
        case 'heal':
          const v = this.randRange(this.me.skillAtk, 50)
          Room.sendBattleRoomEvent(this.room.$key, { skill: 'heal', value: v })
          setTimeout(() => { this.bossAttack() }, 2000)
          break
        case 'matk':
          const m = Math.floor(Math.random() * 6) + 1
          const dmg = m * this.randRange(this.me.skillAtk, 20)
          SFX.playSkillAssassin()
          firebase.database()
            .ref(`room/${this.room.$key}/boss/hp`)
            .transaction((hp) => {
              if (dmg <= 0) return
              let rdmg = dmg <= hp ? dmg : hp
              return hp - rdmg
            })
            .then(() => {
              setTimeout(() => {
                this.bossAttack()
              }, 1000)
            })
          break
        case 'fireball':
          const mdmg = this.randRange(this.me.skillAtk, 200)
          SFX.playSkillMage()
          setTimeout(() => {
            this.playShakeScreen()
            firebase.database()
              .ref(`room/${this.room.$key}/boss/hp`)
              .transaction((hp) => {
                if (mdmg <= 0) return
                let rdmg = mdmg <= hp ? mdmg : hp
                return hp - rdmg
              })
              .then(() => {
                this.bossAttack()
              })

            // atk one ppl in party
            if (this.members.length > 0) {
              const frand = Math.floor(Math.random() * this.members.length)
              const fdmg = this.randRange(10, 20)
              if (fdmg > 0) {
                firebase.database()
                  .ref(`room/${this.room.$key}/member/${this.members[frand].id}/hp`)
                  .transaction((hp) => {
                    let h = hp - fdmg
                    if (h < 0) h = 1 // don't die :P
                    return h
                  })
              }
            }
          }, 1600)
          break
      }
    },
    bossAttack () {
      if (this.gameOver) return
      if (this.bossStuned) {
        this.bossStuned = false
        this.bossTurn = false
        this.resetAnimateClass()
        return
      }
      this.playBossAttack()
      let dmg = this.randRange(this.room.boss.atk, 20) - this.randRange(this.me.def, this.isDef ? 80 : 10)
      this.isDef = false
      firebase.database()
        .ref(`room/${this.room.$key}/member/${this.me.id}/hp`)
        .transaction((hp) => {
          if (dmg <= 0) return
          let rdmg = dmg <= hp ? dmg : hp
          return hp - rdmg
        })
        .then(() => {
          setTimeout(() => {
            this.bossTurn = false
            if (this.defCt < 2) this.defCt++
            if (this.skillCt < this.me.skillCt) this.skillCt++
          }, 1000)
        })
    },
    leave () {
      if (!this.room) return
      SFX.playClick2()
      Room.leaveBattle(this.room.$key)
        .subscribe(
          () => {
            this.$router.push({ name: 'Home' })
          }
        )
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
    },
    disableControl () {
      if (!this.room) return false
      return this.bossTurn || this.gameOver
    },
    gameOver () {
      if (!this.room) return false
      return this.room.boss.hp <= 0 || this.me.hp <= 0
    }
  }
}
</script>

<style lang='scss' scoped>

.exit {
  position: relative;
  top: 38vh;
}

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
