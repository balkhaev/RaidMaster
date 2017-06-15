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
    this.capacity = {
      civilians: 0,
      food: 1000,
      gold: 100
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

  existsInventoryItem(type, id) {
    return this.inventory[type].map(item => item.id).indexOf(id) > -1
  }

  getInventoryItem(type, id) {
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

  addResource(type, count) {
    switch(type) {
      case 'gold':
        this.addGold(count)
        break
      case 'food':
        this.addFood(count)
        break
    }
  }

  addResources(resources) {
    Object.keys(resources).forEach(resourceType => {
      this.addResource(resourceType, resources[resourceType])
    })
  }

  removeResource(type, count) {
    switch(type) {
      case 'gold':
        this.removeGold(count)
        break
      case 'food':
        this.removeFood(count)
        break
    }
  }

  removeResources(resources) {
    if (!this.checkResources(resources)) {
      throw Error('Insufficient resources')
    }

    Object.keys(resources).forEach(resourceType => {
      this.removeResource(resourceType, resources[resourceType])
    })
  }

  checkResources(resources) {
    return Object.keys(resources).some(resourceType => resources[resourceType] <= this.resources[resourceType])
  }

  addToInventory(type, data) {
    this.inventory[type].push(game.resources.create(type, data))
  }

  upgradeAvailable(type, id) {
    const item = game.shop.getGood(type, id)
    const itemTypeLimit = this.getLevelLimits(type, item.type).upgrade
    const itemTypeCount = this.count(type, item.type)

    return true
  }

  upgrade(type, id) {
    const item = this.getInventoryItem(type, id)

    if (!this.checkResources(item.getUpgradeCost())) {
      throw Error('Insufficient resources')
    }

    this.removeResources(item.getUpgradeCost())
    item.upgrade()
  }

  countFreeCivilians() {
    return 1
  }

  tick(ts) {
    //..
  }
}
