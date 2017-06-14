export default class Build {
  constructor({ id, title, profit, workers, consumption, interval, cost, capacity, level = 1 } = {}) {
    this.id = id
    this.cost = cost
    this.title = title
    this.level = level
    this.profit = profit
    this.status = 'working'
    this.workers = workers
    this.interval = interval
    this.capacity = capacity
    this.consumption = consumption
    this.progress = 0
    this.nextTs = null

    this.setNextTs()
  }

  getProgress() {
    return this.progress
  }

  getUpgradeCost() {
    return this.cost * this.level / 2
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

  getProfit(profitType) {
    return this.profit[profitType] * this.level
  }

  complete(game) {
    if (this.consumption) {
      Object.keys(this.consumption).forEach(consumptionType => {
        if (game.player.resources[consumptionType] < this.consumption[consumptionType]) {
          this.setStatus('paused')
        } else {
          game.player.removeResources(consumptionType, this.consumption[consumptionType])
        }
      })
    }

    if (this.workers && game.player.countFreeCivilians() < this.workers) {
      this.setStatus('paused')
    }

    if (this.status === 'working' && this.profit) {
      Object.keys(this.profit).forEach(profitType => {
          game.player.addResources(profitType, this.getProfit(profitType))
      })

      this.setNextTs()
    }
  }
}
