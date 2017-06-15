import 'pixi.js'
import mitt from './utils/mitt'

import Shop from './resources/shop'
import Player from './resources/player'
import Resources from './resources/resources'

export class Game {
  constructor({ resources = {}, levels = {}, tickInterval = 100, player = {}, shop = {} } = {}) {
    const emitter = mitt()

    this.app = new PIXI.Application();
    this.ts = null

    this.tickInterval = tickInterval
    this.levels = levels

    this.resources = new Resources(resources)
    this.player = new Player(player)
    this.shop = new Shop(shop)

    this.on = emitter.on
    this.off = emitter.off
    this.emit = emitter.emit
  }

  processClick() {
    this.player.addGold(1)
    this.emit('update', this)
  }

  tick(ts) {
    this.ts = ts

    this.player.tick(ts)
    this.resources.processInventory(ts, this.player.inventory)

    this.emit('tick', this)
  }

  getMap() {
    return [
      [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    ];
  }

  loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the precentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    //If you gave your files names as the first argument
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
  }

  start() {
    PIXI.loader
      .add('grass', 'sprites/newgrass.png')
      .on("progress", this.loadProgressHandler)
      .load((loader, resources) => {
        var bunny = new PIXI.Sprite(resources.grass.texture);

        bunny.x = this.app.renderer.width / 2;
        bunny.y = this.app.renderer.height / 2;

        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        this.app.stage.addChild(bunny);

        this.app.ticker.add(() => {
          this.tick(Date.now())
        });
      });
  }
}

export default Game
