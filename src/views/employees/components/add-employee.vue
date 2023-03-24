<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="employeeForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option
            v-for="item in EmployeeEnums.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="showTrees" />
        <el-tree v-if="isTreeShow" :data="treeNode" :props="{label: 'name'}" :default-expand-all="true" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="checkForm">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnums from '@/api/constant/employees'
import { getCompanyList } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import { addEmployeeList } from '@/api/employees'
export default {
  // 组件名称
  name: 'AddEmployee',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  // 组件状态值
  data () {
    return {
      EmployeeEnums,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 2, max: 4, message: '用户姓名为2-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }]
      },
      treeNode: [],
      isTreeShow: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，el属性还不存在
  */
  created () {},
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    async showTrees () {
      const res = await getCompanyList()
      this.isTreeShow = true
      // console.log(res)
      this.treeNode = tranListToTreeData(res.depts, '')
    },
    selectNode (node) {
      // console.log(node)
      this.formData.departmentName = node.name
      this.isTreeShow = false
    },
    checkForm () {
      this.$refs.employeeForm.validate(async isOK => {
        if (isOK) {
          await addEmployeeList(this.formData)
          this.$message.success('添加成功')
          this.$emit('update:showDialog', false)
          this.$parent.renderEmployeeList()
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    btnCancel () {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.employeeForm.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang="less">

</style>
