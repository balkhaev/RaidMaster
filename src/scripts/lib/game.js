import mitt from '../utils/mitt'

import Shop from '../entities/shop'
import Player from '../entities/player'

export class Game {
  constructor({ resources = {}, levels = {}, tickInterval = 100, player = {} } = {}) {
    const emitter = mitt()

    this.tickInterval = tickInterval
    this.resources = resources
    this.levels = levels

    this.player = new Player(player)
    this.shop = new Shop({ goods: this.resources })

    this.on = emitter.on
    this.off = emitter.off
    this.emit = emitter.emit
  }

  processClick() {
    this.player.addGold(1)
    this.emit('update', this)
  }

  tick(ts) {
    this.player.tick(ts)

    this.emit('tick', this)
  }

  start() {
    setInterval(() => {
      this.tick(Date.now())
    }, this.tickInterval);
  }
}

export default Game
