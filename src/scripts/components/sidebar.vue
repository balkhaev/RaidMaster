<template>
    <div id="sidebar">
        <div id="player">
            <div>{{ game.player.username }}</div>
            <span>{{ game.player.resources.gold }} gold</span>
            <span>{{ game.player.resources.food }} food</span>
        </div>

        <shop></shop>
    </div>
</template>

<script>
import shop from './shop.vue'

export default {
  components: {
    shop
  }
}
</script>
