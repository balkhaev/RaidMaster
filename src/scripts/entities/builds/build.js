export default class Build {
  constructor({ id, title, hp, interval, cost, level = 1 } = {}) {
    this.id = id
    this.hp = hp
    this.cost = cost
    this.title = title
    this.level = level
    this.status = 'working'
    this.interval = interval
    this.progress = 0
    this.nextTs = null

    this.setNextTs()
  }

  upgrade(count = 1) {
    this.level += count
  }

  setNextTs(date = new Date()) {
    date.setSeconds(date.getSeconds() + this.interval)

    this.nextTs = date.getTime()
  }

  setStatus(status) {
    this.status = status
  }

  setProgress(ts = Date.now()) {
    const progress = Math.floor(100 - ((this.nextTs - ts) / (this.interval * 1000) * 100))

    this.progress = progress > 100 ? 100 : progress
  }

  getProfit() {
    return this.gold * this.level
  }

  getUpgradeCost() {
    return this.cost * this.level / 2
  }
}
