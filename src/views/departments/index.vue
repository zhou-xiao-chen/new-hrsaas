<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>组织架构</span>
        </div>
        <div class="tree-card">
          <TreeTools :tree-data="company" :is-dropdown-show="true" @addDialog="addDepartment" />
          <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <TreeTools slot-scope="{ data }" :tree-data="data" @deldepart="getCompanyLists" @addDialog="addDepartment" />
          </el-tree>
        </div>
      </el-card>
    </div>
    <AddDialog :dialog-form-visible="isAddDialogShow" :tree-node="node" />
  </div>
</template>

<script>
import TreeTools from './compoents/tree-tools'
import AddDialog from './compoents/dialog'
import { getCompanyList } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools,
    AddDialog
  },
  data () {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: {},
      isAddDialogShow: false,
      node: null
    }
  },
  created () {
    this.getCompanyLists()
  },
  methods: {
    async getCompanyLists () {
      const res = await getCompanyList()
      this.departs = tranListToTreeData(res.depts, '')
      this.company = { name: res.companyName, manager: '负责人' }
    },
    addDepartment (treenode) {
      this.isAddDialogShow = true
      this.node = treenode
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
