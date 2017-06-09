export default class King {
  constructor({ username = 'Guest', items = [], units = [], builds = [], resources: { gold = 0, food = 100 } = {} } = {}) {
    this.username = username
    this.items = items
    this.units = units
    this.builds = builds
    this.level = 1
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
    return this.items
  }

  getUnits() {
    return this.units
  }

  getBuilds() {
    return this.builds
  }

  getUnitIndex(unitId) {
    return this.units.indexOf(unitId)
  }

  getItemIndex(itemId) {
    return this.items.indexOf(itemId)
  }

  getBuildIndex(buildId) {
    return this.builds.indexOf(buildId)
  }

  exists(type, id) {
    return this[type].indexOf(id) > -1
  }

  addUnit(unitId) {
    this.units.push(unitId)
  }

  removeUnit(unitId) {
    this.units.splice(this.getUnitIndex(unitId), 1)
  }

  addItem(itemId) {
    this.items.push(itemId)
  }

  removeItem(itemId) {
    this.items.splice(this.getItemIndex(itemId), 1)
  }

  addBuild(buildId) {
    this.builds.push(buildId)
  }

  removeBuild(buildId) {
    this.builds.splice(this.getBuildIndex(buildId), 1)
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
