import game from '../game'
import King from './king'

import Build from './build'
import Unit from './unit'
import Item from './item'

export default class Player extends King {
  getLevelLimits() {
    return game.resources.levels[this.level]
  }

  add(type, item) {
    switch(type) {
      case 'builds':
        this.builds.push(new Build(item))
        break
      case 'units':
        this.units.push(new Unit(item))
        break
      case 'items':
        this.items.push(new Item(item))
        break
      default:
        throw Error('Unknown item type')
    }
  }

  buy(type, id) {
    const good = game.shop.getGood(type, id);

    if (this.getGold() < good.cost) {
      console.log('no money bitch')
      return
    }

    this.removeGold(good.cost)

    this.add(type, good)
  }

  upgrade(id) {
    console.log('upgrade')
    //...
  }

  tick(ts) {
    this.builds.forEach(build => {
      build.setProgress(ts)

      if (ts >= build.getNextHarvestTs()) {
        switch(build.type) {
          case 'mine':
            this.addGold(build.gold)
            build.setNextHarvestTs()
            break
          case 'farm':
            this.addFood(build.food)
            build.setNextHarvestTs()
            break
          case 'house':
            if (this.resources.food < build.food) {
              build.setStatus('paused')
              return
            }

            this.addGold(build.gold)
            this.removeFood(build.food)
            build.setNextHarvestTs()
            build.setStatus('working')
            break
        }
      }
    })
  }
}
