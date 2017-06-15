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
    const cost = {}

    Object.keys(this.cost).forEach(costType => {
      cost[costType] = Math.floor(this.cost[costType] * this.level / 1.5)
    })

    return cost
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

  getProfit(profitType = false) {
    if (profitType) {
      return this.profit[profitType]
    }

    const profit = {}

    Object.keys(this.profit).forEach(profitType => {
      profit[profitType] = this.profit[profitType] * this.level
    })

    return profit
  }

  complete(player) {
    if (this.workers && player.countFreeCivilians() < this.workers) {
      this.setStatus('paused')
    }

    if (this.consumption) {
      if (!player.checkResources(this.consumption)) {
        this.setStatus('paused')
      } else {
        player.removeResources(this.consumption)
      }
    }

    if (this.status === 'working' && this.profit) {
      player.addResources(this.getProfit())

      this.setNextTs()
    }
  }
}
