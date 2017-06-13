import game from '../main'

export default class Shop {
  constructor({ goods = {} } = {}) {
    this.goods = goods
  }

  getGoods() {
    return this.goods
  }

  getGood(type, id) {
    return this.goods[type].find(good => good.id === id)
  }

  getGoodsByType(type) {
    return this.goods[type]
  }

  buy(type, id) {
    const good = this.getGood(type, id);

    if (game.player.getGold() < good.cost) {
      console.log('no money bitch')
      return
    }

    game.player.removeGold(good.cost)

    game.player.add(type, good)
  }

  buyAvailable(type, id) {
    const item = this.getGood(type, id)
    const itemTypeLimit = game.player.getLevelLimits(type, item.type).buy
    const itemTypeCount = game.player.count(type, item.type)

    return itemTypeCount < itemTypeLimit
  }
}
