<template>
  <div>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div class="_font-size-big" @click="back">Back</div>
          <div class="_font-size-big">Select Class</div>
          <router-link to="/collection" class="_color-accent">
            <div class="_font-size-big">Collectible</div>
          </router-link>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container row" style="max-width: 500px">
          <div class="lunar-card col-xs-12">
            <div class="lunar-segment">
              <div class="lunar-block"><h3>Room Boss</h3></div>
              <div class="lunar-block-big row">
                <div class="col-xs-4 col-xs-offset-4">
                  <img
                  src="~@/assets/enemy/enemy1-s.png" alt="boss1" width="100%"
                  class="enemy">
                </div>
              </div>
              <div class="lunar-block"><h3>Select Your Job</h3></div>
              <div class="lunar-block-big row">
                <div class="col-xs-12">
                  <div class="job _flex-row lunar-block" :class="{selected: selectedJob === 0}" @click="selectedJob = 0">
                    <img src="~@/assets/job/knight.png" alt="knight" width="150px" height="150px">
                    <div class="_flex-span lunar-segment">
                      <h4>Knight</h4>
                      <div class="lunar-block"><strong>HP</strong>100 &nbsp; &nbsp;<strong>ATK</strong>10</div>
                      <div><strong>Skill</strong> Stun emeny for 1 turn</div>
                    </div>
                  </div>

                  <div class="job _flex-row lunar-block" :class="{selected: selectedJob === 1}" @click="selectedJob = 1">
                    <img src="~@/assets/job/mage.png" alt="knight" width="150px" height="150px">
                    <div class="_flex-span lunar-segment">
                      <h4>Magician</h4>
                      <div class="lunar-block"><strong>HP</strong>100 &nbsp; &nbsp;<strong>ATK</strong>10</div>
                      <div><strong>Skill</strong> Stun emeny for 1 turn</div>
                    </div>
                  </div>

                  <div class="job _flex-row lunar-block" :class="{selected: selectedJob === 2}" @click="selectedJob = 2">
                    <img src="~@/assets/job/assasin.png" alt="knight" width="150px" height="150px">
                    <div class="_flex-span lunar-segment">
                      <h4>Assasin</h4>
                      <div class="lunar-block"><strong>HP</strong>100 &nbsp; &nbsp;<strong>ATK</strong>10</div>
                      <div><strong>Skill</strong> Stun emeny for 1 turn</div>
                    </div>
                  </div>

                  <div class="job _flex-row lunar-block" :class="{selected: selectedJob === 3}" @click="selectedJob = 3">
                    <img src="~@/assets/job/priest.png" alt="knight" width="150px" height="150px">
                    <div class="_flex-span lunar-segment">
                      <h4>Priest</h4>
                      <div class="lunar-block"><strong>HP</strong>100 &nbsp; &nbsp;<strong>ATK</strong>10</div>
                      <div><strong>Skill</strong> Stun emeny for 1 turn</div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="lunar-button -negative">
                Create Room
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
  name: 'Join',
  data () {
    return {
      selectedBoss: 0,
      selectedJob: 0
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
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
.foot-button {
  height: 50px;
}
</style>
