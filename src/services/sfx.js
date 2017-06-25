let click = new window.Audio(require('@/assets/sfx/ui-click.mp3'))
let click2 = new window.Audio(require('@/assets/sfx/ui-click2.mp3'))
let bossAttack = new window.Audio(require('@/assets/sfx/boss-attack.mp3'))
let attack = new window.Audio(require('@/assets/sfx/attack-swing.mp3'))
let defend = new window.Audio(require('@/assets/sfx/ui-click2.mp3'))

let skillKnight = new window.Audio(require('@/assets/sfx/skill_knight.mp3'))
let skillAssassin = new window.Audio(require('@/assets/sfx/skill_assassin.mp3'))
let skillMage = new window.Audio(require('@/assets/sfx/skill_mage.mp3'))
let skillPriest = new window.Audio(require('@/assets/sfx/skill_priest.mp3'))

function playClick () {
  click.play()
}

function playClick2 () {
  click2.play()
}

function playBossAttack () {
  bossAttack.play()
}

function playAttack () {
  attack.play()
}

function playDefend () {
  defend.play()
}

function playSkillKnight () {
  skillKnight.play()
}

function playSkillMage () {
  skillMage.play()
}

function playSkillPriest () {
  skillPriest.play()
}

function playSkillAssassin () {
  skillAssassin.play()
}

export {
  playClick,
  playClick2,
  playBossAttack,
  playAttack,
  playDefend,
  playSkillAssassin,
  playSkillPriest,
  playSkillMage,
  playSkillKnight
}
