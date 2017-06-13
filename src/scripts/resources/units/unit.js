export default class Unit {
  constructor({ level = 1, title = 'NoName', hp } = {}) {
    this.title = title
    this.level = level
    this.maxHp = hp
    this.hp = hp
  }
}
