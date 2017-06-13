import game from '../main'

export default class Player {
  constructor({ username = 'Guest', level = 1, items = [], units = [], builds = [], resources: { gold = 0, food = 100 } = {} } = {}) {
    this.username = username
    this.level = level
    this.inventory = {
      items,
      units,
      builds
    }
    this.resources = {
      gold,
      food
    }
  }

  changeUsername(username) {
    this.username = username
  }

  levelUp() {
    this.level += 1
  }

  getLevel() {
    return this.level
  }

  getGold() {
    return this.resources.gold
  }

  getFood() {
    return this.resources.food
  }

  getItems() {
    return this.inventory.items
  }

  getUnits() {
    return this.inventory.units
  }

  getBuilds() {
    return this.inventory.builds
  }

  exists(type, id) {
    return this.inventory[type].map(item => item.id).indexOf(id) > -1
  }

  getItem(type, id) {
    return this.inventory[type].find(item => item.id === id)
  }

  getItemsByType(type) {
    return this.inventory[type]
  }

  addGold(gold) {
    this.resources.gold += gold
  }

  removeGold(gold) {
    this.resources.gold -= gold
  }

  addFood(food) {
    this.resources.food += food
  }

  removeFood(food) {
    this.resources.food -= food
  }

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

  add(type, data) {
    this.inventory[type].push(game.resources.create(type, data))
  }

  upgradeAvailable(type, id) {
    const item = game.shop.getGood(type, id)
    const itemTypeLimit = this.getLevelLimits(type, item.type).upgrade
    const itemTypeCount = this.count(type, item.type)

    return true
  }

  upgrade(type, id) {
    const item = this.getItem(type, id)

    this.removeGold(item.getUpgradeCost())
    item.upgrade()
  }

  tick(ts) {
    //..
  }
}