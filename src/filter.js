import Vue from 'vue'

Vue.filter('action', (act) => ({
  atk: 'Attack',
  ratk: 'Receive Attack',
  stun: 'Stun',
  matk: 'Multiple Attacks',
  heal: 'Heal',
  fireball: 'Fireball'
}[act] || ''))

Vue.filter('skillDetail', (sk) => ({
  stun: 'Stun boss for 1 turn',
  matk: 'Inflict damage multiple hits randomly from 1 - 4 hits',
  heal: 'Heal your party randomly from 20 - 40 hp',
  fireball: 'Inflict massive damage to boss and 1 of your party member'
}[sk] || ''))
