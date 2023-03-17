<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>组织架构</span>
        </div>
        <div class="tree-card">
          <TreeTools :tree-data="company" :is-dropdown-show="true" />
          <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <TreeTools slot-scope="{ data }" :tree-data="data" />
          </el-tree>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './compoents/tree-tools'
export default {
  components: {
    TreeTools
  },
  data () {
    return {
      departs: [{
        name: '玉衡星',
        children: [{
          name: '指挥部'
        }]
      }, {
        name: '天权星',
        manager: '凝光'
      }, {
        name: '天枢星'
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: { name: '提瓦特大陆-璃月', manager: '负责人' }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}

</style>
