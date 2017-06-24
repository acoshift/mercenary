let click = new Audio(require('@/assets/sfx/ui-click.mp3'))
let click2 = new Audio(require('@/assets/sfx/ui-click2.mp3'))
let bossAttack = new Audio(require('@/assets/sfx/boss-attack.mp3'))

function playClick () {
  click.play()
}

function playClick2 () {
  click2.play()
}

function playBossAttack () {
  playBossAttack.play()
}

export {
  playClick,
  playClick2,
  playBossAttack
}
