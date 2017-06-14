import mitt from './utils/mitt'

import Shop from './resources/shop'
import Player from './resources/player'
import Resources from './resources/resources'

export class Game {
  constructor({ resources = {}, levels = {}, tickInterval = 100, player = {}, shop = {} } = {}) {
    const emitter = mitt()

    this.ts = null

    this.tickInterval = tickInterval
    this.levels = levels

    this.resources = new Resources(resources)
    this.player = new Player(player)
    this.shop = new Shop(shop)

    this.on = emitter.on
    this.off = emitter.off
    this.emit = emitter.emit
  }

  processClick() {
    this.player.addGold(1)
    this.emit('update', this)
  }

  tick(ts) {
    this.ts = ts

    this.player.tick(ts)
    this.resources.processInventory(ts, this.player.inventory)

    this.emit('tick', this)
  }

  getMap() {
    return [
      [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    ];
  }

  start() {
    setInterval(() => {
      this.tick(Date.now())
    }, this.tickInterval);
  }
}

export default Game
