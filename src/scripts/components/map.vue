<template>
    <div id="map" v-game-map></div>
</template>

<script>
import tileMapService from '../services/tilemap'
import 'pixi.js'

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

export default {
    data() {
      return {
        activeIndex: '1'
      }
    },
    directives: {
      gameMap(mapElement, binding) {
        var app = new PIXI.Application();

        mapElement.appendChild(app.view);

        PIXI.loader
          .add('grass', 'sprites/newgrass.png')
          .on("progress", loadProgressHandler)
          .load((loader, resources) => {
              var bunny = new PIXI.Sprite(resources.grass.texture);

              bunny.x = app.renderer.width / 2;
              bunny.y = app.renderer.height / 2;

              bunny.anchor.x = 0.5;
              bunny.anchor.y = 0.5;

              app.stage.addChild(bunny);

              app.ticker.add(function() {
                bunny.rotation += 0.01;
              });
            });
      }
    }
}
</script>

<style scope lang="sass">
#map
    position: relative
.layer
    position: absolute
    left: 0
    top: 0
</style>
