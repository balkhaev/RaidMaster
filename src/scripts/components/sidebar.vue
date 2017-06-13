<template>
    <div id="sidebar">
        <div id="player">
            <div>{{ game.player.username }}</div>
            <span>{{ game.player.resources.gold }} gold</span>
            <span>{{ game.player.resources.food }} food</span>
        </div>

        <el-tabs type="border-card">
            <el-tab-pane v-for="resourceType in Object.keys(game.resources)" :label="translations[resourceType]" :key="resourceType">
                <h3>Куплено</h3>
                <div v-for="item in game.player.getItemsByType(resourceType)">
                    {{ item.title }}
                    {{ item.getProfit() }}
                    <el-button @click="game.player.upgrade(resourceType, item.id)" :disabled="!game.player.upgradeAvailable(resourceType, item.id)">Улучшить</el-button>
                    <el-progress :percentage="item.progress" :status="item.status === 'paused' ? 'exception' : 'success'"></el-progress>
                </div>
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
                            <el-button @click="game.player.buy(resourceType, scope.row.id)" :disabled="!game.player.buyAvailable(resourceType, scope.row.id)">Купить</el-button>
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
