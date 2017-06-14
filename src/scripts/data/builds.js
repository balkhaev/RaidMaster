export default [
  {
    id: 0,
    title: 'Лачуга',
    type: 'house',
    consumption: {
      food: 5
    },
    profit: {
      gold: 5
    },
    cost: {
      gold: 10
    },
    capacity: {
      civilians: 2
    },
    interval: 5
  },
  {
    id: 1,
    title: 'Ферма риса',
    type: 'farm',
    workers: 1,
    interval: 15,
    profit: {
      food: 10
    },
    cost: {
      gold: 10
    },
  },
  {
    id: 2,
    title: 'Рудник золота',
    type: 'mine',
    worker: 1,
    profit: {
      gold: 10
    },
    cost: {
      gold: 20
    },
    interval: 20,
  },
  {
    id: 3,
    title: 'Рынок',
    type: 'general',
    profit: 100,
    cost: {
      gold: 30
    },
    interval: 30,
  }
]
