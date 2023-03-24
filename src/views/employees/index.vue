<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template #after>
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="isShowDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable="" :formatter="formatEmployment" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <AddEmployee :show-dialog.sync="isShowDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployees } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
export default {
  components: {
    AddEmployee
  },
  data () {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      isShowDialog: false
    }
  },
  created () {
    this.renderEmployeeList()
  },
  methods: {
    async renderEmployeeList () {
      this.loading = true
      const res = await getEmployeeList(this.page)
      // console.log(res)
      this.page.total = res.total
      this.list = res.rows
      this.loading = false
    },
    changePage (newPage) {
      this.page.page = newPage
      this.renderEmployeeList()
    },
    formatEmployment (row, column, cellValue, index) {
      const res = EmployeeEnum.hireType.find(item => item.id === +cellValue)
      return res ? res.value : '未知'
    },
    async delEmployee (id) {
      try {
        await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delEmployees(id)
        this.renderEmployeeList()
        this.$message.success('删除成功')
      } catch (err) {
        this.$message.error('删除失败')
        // console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
