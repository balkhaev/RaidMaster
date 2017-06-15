import game from '../../main'

import Farm from './farm'
import Mine from './mine'
import House from './house'
import Build from './build'
import General from './general'

export default {
  create(data) {
    return new Build(data)

    switch (data.type) {
      case 'farm':
        return new Farm(data)
        break
      case 'mine':
        return new Mine(data)
        break
      case 'house':
        return new House(data)
        break
      case 'general':
        return new General(data)
        break
    }
  },
  tick(ts, builds) {
    builds.forEach(build => {
      build.setProgress(ts)

      if (build.getProgress() === 100) {
        build.complete(game.player)
      }
    })
  }
}
