import Build from './build'

export default class Farm extends Build {
  constructor({ consumption, profit, ...opts }) {
    super(opts)
    this.type = 'farm'
  }
}
