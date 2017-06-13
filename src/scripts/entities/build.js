export default class Build {
  constructor({ id, title, hp, type, interval, gold, food, cost, level = 1 } = {}) {
    this.id = id
    this.hp = hp
    this.gold = gold
    this.food = food
    this.type = type
    this.cost = cost
    this.title = title
    this.level = level
    this.status = 'working'
    this.interval = interval
    this.progress = 0

    this.setNextHarvestTs()
  }

  upgrade(count = 1) {
    this.level += count
  }

  setStatus(status) {
    this.status = status
  }

  getNextHarvestTs() {
    return this.nextHarvestTs
  }

  setNextHarvestTs(date = new Date()) {
    date.setSeconds(date.getSeconds() + this.interval)

    this.nextHarvestTs = date.getTime()
  }

  setProgress(ts) {
    const progress = Math.floor(100 - ((this.nextHarvestTs - ts) / (this.interval * 1000) * 100))
    this.progress = progress > 100 ? 100 : progress
  }

  getProfit() {
    return this.gold * this.level
  }

  getUpgradeCost() {
    return this.cost * this.level / 2
  }
}
