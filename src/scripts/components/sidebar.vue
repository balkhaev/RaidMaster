<template>
    <div id="sidebar">
        <div id="player">
            <div>{{ game.player.username }}</div>
            <span>{{ game.player.resources.gold }} gold</span>
            <span>{{ game.player.resources.food }} food</span>
        </div>

        <el-tabs type="border-card">
            <el-tab-pane v-for="resourceType in Object.keys(game.resources)" :label="translations[resourceType]">
                <h3>Куплено</h3>
                <el-table
                        :data="game.player.getItemsByType(resourceType)"
                        style="width: 100%">
                    <el-table-column
                            prop="title"
                            label="Название">
                    </el-table-column>
                    <el-table-column
                            label="Прогресс"
                            width="200">
                        <template scope="scope">
                            <el-progress :show-text="false" :stroke-width="18" :percentage="scope.row.progress" :status="scope.row.status === 'paused' ? 'exception' : 'success'"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Действия"
                            width="130">
                        <template scope="scope">
                            <el-button @click="goodClick(resourceType, scope.$index)">Улучшить</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <h3>Магазин</h3>
                <el-table
                        :data="game.shop.getGoodsByType(resourceType)"
                        style="width: 100%">
                    <el-table-column
                            prop="title"
                            label="Название">
                    </el-table-column>
                    <el-table-column
                            prop="cost"
                            label="Цена"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="Действия"
                            width="130">
                        <template scope="scope">
                            <el-button @click="goodClick(resourceType, scope.$index)">Купить</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        builds: 'Здания',
        units: 'Войны',
        items: 'Вещи'
      }
    }
  },
  methods: {
    goodClick(type, index) {
      const goodId = this.game.shop.goods[type][index].id

      if (this.game.player.exists(type, goodId)) {
        this.game.player.upgrade(type, goodId)
      } else {
        this.game.player.buy(type, goodId)
      }
    }
  },
  created() {
    setTimeout(() => {

    })
  }
}
</script>

<style scope lang="sass">
    #sidebar
        width: 500px
        height: 100%
        background: #c55454
        color: #fff

        .el-tabs
            color: #333

    #player
        padding: 12px

    .cell > .el-button
            margin: 5px 0
</style>
