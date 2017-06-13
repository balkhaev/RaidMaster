export default class King {
  constructor({ username = 'Guest', items = [], units = [], builds = [], resources: { gold = 0, food = 100 } = {} } = {}) {
    this.username = username
    this.level = 1
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
}
