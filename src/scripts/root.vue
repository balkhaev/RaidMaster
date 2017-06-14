<template>
    <div id="wrapper">
        <sidebar></sidebar>
        <div id="content">
            <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">Processing Center</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">Workspace</template>
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                    <el-menu-item index="2-3">item three</el-menu-item>
                </el-submenu>
                <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
                <el-menu-item index="4" @click="game.processClick">Золото</el-menu-item>
            </el-menu>
            <div id="game">
                <gamemap></gamemap>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from './components/sidebar.vue'
import map from './components/map.vue'

export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  components: {
    sidebar,
    gamemap: map
  }
}
</script>

<style scope lang="sass">
    #wrapper
        display: flex
        height: 100%

    #content
        flex: 1

    #game
        padding: 5px
</style>
