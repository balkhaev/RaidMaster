import Build from './build'

export default class Mine extends Build {
  constructor({ consumption, profit, ...opts }) {
    super(opts)
    this.type = 'mine'
    this.goldProfit = profit
    this.peopleConsumption = consumption
  }

  getProfit() {
    return this.goldProfit * this.level
  }

  getConsumption() {
    return {
      people: this.peopleConsumption
    }
  }

  complete(game) {
    game.player.addGold(this.getProfit())

    this.setNextTs()
  }
}
