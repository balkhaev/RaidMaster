import Build from './build'

export default class Mine extends Build {
  constructor({ consumption, profit, ...opts }) {
    super(opts)
    this.type = 'mine'
    this.goldProfit = profit
    this.peopleConsumption = consumption
  }
}
