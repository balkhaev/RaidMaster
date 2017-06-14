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

  buy(buyer, type, id) {
    const good = this.getGood(type, id);

    if (buyer.getGold() < good.cost) {
      console.log('no money bitch')
      return
    }

    buyer.removeGold(good.cost)

    buyer.addToInventory(type, good)
  }

  buyAvailable(buyer, type, id) {
    const item = this.getGood(type, id)
    const itemTypeLimit = buyer.getLevelLimits(type, item.type).buy
    const itemTypeCount = buyer.count(type, item.type)

    return itemTypeCount < itemTypeLimit
  }
}
