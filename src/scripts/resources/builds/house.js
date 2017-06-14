import Build from './build'

export default class House extends Build {
  constructor({ consumption, profit, capacity, ...opts }) {
    super(opts)
    this.type = 'house'
    this.foodConsumption = consumption
    this.peopleCapacity = capacity
    this.goldProfit = profit
  }
}
