<template>
  <el-dialog title="新增部门" :visible="dialogFormVisible">
    <el-form :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入1-50字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" placeholder="请输入1-50字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager" placeholder="请选择负责人">
        <el-select v-model="form.manager" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" placeholder="请输入1-300字符" :rows="3" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCompanyList } from '@/api/departments'
export default {
  // 组件名称
  name: 'AddDialog',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  // 组件状态值
  data () {
    const checkName = async (rule, value, callback) => {
      const res = await getCompanyList()
      const havename = res.depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      havename ? callback(new Error('该名称部门已存在')) : callback()
    }
    const checkCode = async (rule, value, callback) => {
      const res = await getCompanyList()
      const havecode = res.depts.some(item => item.code === value)
      havecode ? callback(new Error('部门编码已存在')) : callback()
    }
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
        ]
      }
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
  methods: {}
}
</script>

<style scoped lang="less">

</style>
