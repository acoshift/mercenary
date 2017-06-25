<template>
  <div>
    <audio src="/static/bgm/login.mp3" type="audio/mp3" autoplay loop></audio>
    <div class="_flex-column _full-height">

      <div class="navbar _bg-color-main">
        <div class="_full-height _flex-row _cross-center _main-space-between">
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer"
            @click="back">
             <i class="material-icons">arrow_back</i>
          </div>
          <div class="_font-size-big"><strong>How to play?</strong></div>
          <div
            class="_full-height _flex-row _main-center _cross-center"
            style="width: 50px; cursor: pointer">
          </div>
        </div>
      </div>

      <div class="navbar-dummy">
      </div>

      <div class="content _flex-span _bg-color-base">
        <div class="grid-container" style="max-width: 500px">
          <div class="row">
            <div class="col-xs-12">
              <h2>Game Info</h2>
              <p>
                Mercenary is an online turn based game that you can fight the boss with your party.<br><br>
                Player can create a room and wait for other to join, player will start the game even though party member not full.<br><br>
                Each turn player can attack or defense or use mercenary skill and boss will also counter attack one time.
                For each actions, there is some cool down for the next use.
              </p>
            </div>
            <div class="col-xs-12" style="margin-top: 30px;">
              <h2>Jobs</h2>
              <p>
                There are 4 jobs that player can choose
              </p>

              <div class="lunar-block-big row _pointer">
                <div class="col-xs-12">
                  <div class="job _flex-row lunar-block">
                    <img src="/static/job/knight.png" width="100px" height="100px" style="min-width: 100px;">
                    <div class="lunar-segment">
                      <h4>Knight</h4>
                      <div class="detail"><strong>Skill</strong> Stun boss for 1 turn</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lunar-block-big row _pointer">
                <div class="col-xs-12">
                  <div class="job _flex-row lunar-block">
                    <img src="/static/job/mage.png" width="100px" height="100px" style="min-width: 100px;">
                    <div class="lunar-segment">
                      <h4>Magician</h4>
                      <div class="detail"><strong>Skill</strong> Inflict massive damage to boss and 1 of your party member</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lunar-block-big row _pointer">
                <div class="col-xs-12">
                  <div class="job _flex-row lunar-block">
                    <img src="/static/job/assassin.png" width="100px" height="100px" style="min-width: 100px;">
                    <div class="lunar-segment">
                      <h4>Assassin</h4>
                      <div class="detail"><strong>Skill</strong> Inflict multiple hits damage randomly from 1 - 6 hits</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lunar-block-big row _pointer">
                <div class="col-xs-12">
                  <div class="job _flex-row lunar-block">
                    <img src="/static/job/priest.png" width="100px" height="100px" style="min-width: 100px;">
                    <div class="lunar-segment">
                      <h4>Priest</h4>
                      <div class="detail"><strong>Skill</strong> Heal your party</div>
                    </div>
                  </div>
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
import { SFX } from '@/services'
export default {
  name: 'Tutorial',
  methods: {
    back () {
      SFX.playClick()
      this.$router.push({name: 'Login'})
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
  background-image: url('~@/assets/bg/bg2.jpg');
  padding-top: 32px;
  background-color: black;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
}

.job {
  margin-top: 10px;
  background: rgba(3, 7, 26, 0.54);
  border-radius: 10px;
  box-shadow: 0px 0px 0px 4px #ffffff;
}

.detail {
  color: #bbbbbb;
}
</style>
