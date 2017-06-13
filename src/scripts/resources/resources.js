import game from '../main'

import buildManager from './builds/manager'
import itemManager from './items/manager'
import unitManager from './units/manager'

export default class Resources {
  constructor(resources = {}) {
    this.items = resources
    this.types = Object.keys(resources)
    this.builds = buildManager
    this.items = itemManager
    this.units = unitManager
  }

  create(type, data) {
    switch (type) {
      case 'builds':
        return this.builds.create(data)
      break
      case 'units':
        return this.units.create(data)
      break
      case 'items':
        return this.items.create(data)
      break
    }
  }

  tick(ts, items = game.player.inventory) {
    this.types.forEach(type => {
      this[type].tick(ts, items[type])
    })
  }
}
