export default class Unit {
  constructor({ id, title, description, interval, gold, cost } = {}) {
    this.id = id
    this.title = title
    this.description = description
    this.interval = interval
    this.gold = gold
    this.cost = cost
  }

  levelup() {

  }
}
