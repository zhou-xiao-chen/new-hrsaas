<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <div style="height:60px">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole">新增角色</el-button>
            </div>
            <el-table
              border
              style="width: 100%"
              :data="list"
            >
              <el-table-column type="index" align="center" label="序号" width="120" />
              <el-table-column prop="name" align="center" label="名称" width="240" />
              <el-table-column prop="description" align="center" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button type="primary" size="small" @click="setRole(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination layout="prev, pager, next" :page-size="roleList.pagesize" :total="roleList.total" :current-page="roleList.page" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" style="width:400px" type="text" disabled />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" type="text" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" type="text" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-dialog :title="showTitle" :visible="dialogFormVisible" @close="btnCancel">
          <el-form ref="roleForm" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="formData.description" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="btnCancel">取 消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, delRoleList, getRoleInfo, setRoleInfo, addRoleInfo } from '@/api/setting'
export default {
  data () {
    return {
      roleList: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      list: [],
      companyInfo: {},
      dialogFormVisible: false,
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showTitle () {
      return this.formData.id ? '编辑角色' : '新增角色'
    }
  },
  created () {
    this.renderRoleList()
    this.renderCompanyInfo()
  },
  methods: {
    async renderRoleList () {
      const res = await getRoleList(this.roleList)
      // console.log(res)
      this.roleList.total = res.total
      this.list = res.rows
    },
    changePage (newPage) {
      this.roleList.page = newPage
      this.renderRoleList()
    },
    async renderCompanyInfo () {
      this.companyInfo = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
      // console.log(res)
    },
    async delRole (id) {
      try {
        await this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRoleList(id)
        this.renderRoleList()
        this.$message.success('删除成功')
      } catch (err) {
        this.$message.error('删除失败')
      }
    },
    async setRole (id) {
      const res = await getRoleInfo(id)
      // console.log(res)
      this.formData = res
      this.dialogFormVisible = true
    },
    async addRole () {
      this.dialogFormVisible = true
      // await addRoleInfo(this.formData)
      // this.$message.success('添加成功')
      // this.renderRoleList()
    },
    async btnOK () {
      try {
        // 手动校验
        await this.$refs.roleForm.validate()
        if (this.formData.id) {
          // 执行修改业务
          await setRoleInfo(this.formData)
        } else {
          // 新增业务
          await addRoleInfo(this.formData)
        }
        // 重新拉取数据
        this.renderRoleList()
        this.$message.success('操作成功')
        this.dialogFormVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel () {
      this.formData = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>

</style>
