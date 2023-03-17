<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>{{ treeData.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeData.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isDropdownShow">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isDropdownShow">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // 组件名称
  name: 'TreeTools',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    treeData: {
      required: true,
      type: Object
    },
    isDropdownShow: {
      type: Boolean,
      default: false
    }
  },
  // 组件状态值
  data () {
    return {

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

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
