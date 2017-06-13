import Build from './build'

export default class House extends Build {
  constructor({ consumption, profit, capacity, ...opts }) {
    super(opts)
    this.type = 'house'
    this.foodConsumption = consumption
    this.peopleCapacity = capacity
    this.goldProfit = profit
  }

  getProfit() {
    return this.goldProfit * this.level
  }

  getConsumption() {
    return {
      food: this.foodConsumption
    }
  }

  complete(game) {
    if (game.player.resources.food < this.food) {
      this.setStatus('paused')
      return
    }

    game.player.addGold(this.getProfit())
    game.player.removeFood(this.foodConsumption)

    this.setNextTs()
    this.setStatus('working')
  }
}
