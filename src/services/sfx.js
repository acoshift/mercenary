let click = new Audio(require('@/assets/sfx/ui-click.mp3'))
let click2 = new Audio(require('@/assets/sfx/ui-click2.mp3'))
let bossAttack = new Audio(require('@/assets/sfx/boss-attack.mp3'))
let attack = new Audio(require('@/assets/sfx/attack-swing.mp3'))
let defend = new Audio(require('@/assets/sfx/ui-click2.mp3'))

let skillKnight = new Audio(require('@/assets/sfx/skill_knight.mp3'))
let skillAssassin = new Audio(require('@/assets/sfx/skill_assassin.mp3'))
let skillMage = new Audio(require('@/assets/sfx/skill_mage.mp3'))
let skillPriest = new Audio(require('@/assets/sfx/skill_priest.mp3'))

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
