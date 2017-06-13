import Vue from 'vue'
import ElementUI from 'element-ui'
import Game from './lib/game'
import Root from './root.vue'
import config from './config.json'

import items from './data/items'
import units from './data/units'
import builds from './data/builds'
import levels from './data/levels'

Vue.use(ElementUI)

const resources = {
  builds,
  units,
  items
}

const game = new Game({
  resources,
  levels,
  shop: {
    goods: resources
  },
  player: JSON.parse(localStorage.getItem('player')) || { resources: { gold: 10 } },
  tickInterval: config.tickInterval
})

Vue.mixin({
  data() {
    return {
      game
    }
  }
})

new Vue({
  el: '#root',
  render: (h) => h(Root)
})

game.start()

export default game
