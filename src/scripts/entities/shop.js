export default class Shop {
  constructor({ goods: { builds = [], units = [], items = [] } = {} } = {}) {
    this.goods = {
      builds,
      units,
      items
    }
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
}
