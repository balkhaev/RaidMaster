export default class Build {
  constructor({ id, title, hp, type, interval, gold, food } = {}) {
    this.id = id
    this.hp = hp
    this.gold = gold
    this.food = food
    this.type = type
    this.title = title
    this.interval = interval
    this.progress = 0
    this.status = 'working'

    this.setNextHarvestTs()
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
}
