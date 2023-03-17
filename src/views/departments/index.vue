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
            <TreeTools slot-scope="{ data }" :tree-data="data" @deldepart="getCompanyLists" />
          </el-tree>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './compoents/tree-tools'
import { getCompanyList } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools
  },
  data () {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: { name: '提瓦特大陆-璃月', manager: '负责人' }
    }
  },
  created () {
    this.getCompanyLists()
  },
  methods: {
    async getCompanyLists () {
      const res = await getCompanyList()
      this.departs = tranListToTreeData(res.depts, '')
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
