<template>
  <div>
    <div class="_flex-column _full-height">

      <div class="content _flex-span _bg-color-base _full-height">
        <div class="grid-container _full-height" style="max-width: 500px">
          <div class="_flex-column">
            <div class="boss-hp">
              <div class="bar" :style="{width: `${bossHpPercent}%`}"></div>
            </div>

            <div class="boss-avatar _align-center">
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
                      :class="{disabled: true}">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: 3</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="skill">
                    <img src="~@/assets/skill/defend.png" alt="attack" width="100%"
                    :class="{disabled: false}">
                    <div class="cooltime _align-center">
                      <h4 class="no-margin" style="color: white">CT: 2</h4>
                    </div>
                  </div>
                </div>
                <div class="col-xs-4">
                   <div class="skill">
                    <img src="~@/assets/skill/attack.png" alt="attack" width="100%">
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
export default {
  name: 'Battle',
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
</style>
