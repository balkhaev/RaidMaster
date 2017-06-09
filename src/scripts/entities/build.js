export default class Build {
  constructor({ id, title, hp, type, interval, gold, food } = {}) {
    this.id = id
    this.hp = hp
    this.gold = gold
    this.food = food
    this.type = type
    this.title = title
    this.interval = interval
    this.setNextHarvestTs()
  }

  getNextHarvestTs() {
    return this.nextHarvestTs
  }

  setNextHarvestTs(date = new Date()) {
    date.setSeconds(date.getSeconds() + this.interval)

    this.nextHarvestTs = date.getTime()
  }

  getPercentage(ts) {
    return ts / this.nextHarvestTs * 100
  }
}
