import game from '../main'
import King from './king'

import Build from './build'
import Unit from './unit'
import Item from './item'

export default class Player extends King {
  count(invType, itemType) {
    return this.inventory[invType].filter(item => item.type === itemType).length
  }

  getLevelLimits(invType, itemType) {
    let levelLimits = game.levels[this.level]

    if (invType !== undefined) {
      levelLimits = levelLimits[invType]

      if (itemType !== undefined) {
        levelLimits = levelLimits[itemType]
      }
    }

    return levelLimits
  }

  add(type, item) {
    switch(type) {
      case 'builds':
        this.inventory.builds.push(new Build(item))
        break
      case 'units':
        this.inventory.units.push(new Unit(item))
        break
      case 'items':
        this.inventory.items.push(new Item(item))
        break
      default:
        throw Error('Unknown item type')
    }
  }

  buyAvailable(type, id) {
    const item = game.shop.getGood(type, id)
    const itemTypeLimit = this.getLevelLimits(type, item.type).buy
    const itemTypeCount = this.count(type, item.type)

    return itemTypeCount < itemTypeLimit
  }

  upgradeAvailable(type, id) {
    const item = game.shop.getGood(type, id)
    const itemTypeLimit = this.getLevelLimits(type, item.type).upgrade
    const itemTypeCount = this.count(type, item.type)

    return true
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

  upgrade(type, id) {
    const item = game.player.getItem(type, id)

    this.removeGold(item.getUpgradeCost())
    item.upgrade()
  }

  tick(ts) {
    this.inventory.builds.forEach(build => {
      build.setProgress(ts)

      if (build.getProgress() === 100) {
        switch(build.type) {
          case 'mine':
            this.addGold(build.getProfit())

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

            this.addGold(build.getProfit())
            this.removeFood(build.food)

            build.setNextHarvestTs()
            build.setStatus('working')

            break
        }
      }
    })
  }
}
