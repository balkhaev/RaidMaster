<template>
    <div id="wrapper">
        <sidebar></sidebar>
        <div id="content">
            <button @click="buttonClick">Click</button>
        </div>
    </div>
</template>

<script>
import sidebar from './components/sidebar.vue'

export default {
  methods: {
    buttonClick() {
      this.game.processClick()
    }
  },
  components: {
    sidebar
  }
}
</script>
