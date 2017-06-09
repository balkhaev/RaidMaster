<template>
    <div>
        <div v-for="(goodsByType, type) in game.shop.goods">
            <h3>{{ translations[type] }}</h3>
            <ul>
                <li v-for="(good, i) in goodsByType" @click="goodClick(type, good.id)">{{ good.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  data: () => {
    return {
      translations: {
        builds: 'Здания',
        units: 'Войны',
        items: 'Вещи'
      }
    }
  },
  methods: {
    goodClick(type, id) {
      if (this.game.player.exists(type, id)) {
        this.game.player.upgrade(type, id)
      } else {
        this.game.player.buy(type, id)
      }
    }
  }
}
</script>
