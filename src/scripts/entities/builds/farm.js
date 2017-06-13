import Build from './build'

export default class Farm extends Build {
  constructor({ consumption, profit, ...opts }) {
    super(opts)
    this.type = 'farm'
    this.foodProfit = profit
    this.peopleConsumption = consumption
  }

  getProfit() {
    return this.foodProfit * this.level
  }

  getConsumption() {
    return {
      people: this.peopleConsumption
    }
  }
}
