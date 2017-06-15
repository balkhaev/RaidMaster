<template>
    <div id="map" v-game-map="game.app.view"></div>
</template>

<script>
import tileMapService from '../services/tilemap'
import 'pixi.js'

export default {
    data() {
      return {
        activeIndex: '1'
      }
    },
    directives: {
      gameMap(mapElement, binding) {
        mapElement.appendChild(binding.value);
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
