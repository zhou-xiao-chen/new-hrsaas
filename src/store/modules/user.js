import { getToken, setToken, removeToken, setTimeKey } from '@/utils/auth'
import { login, getUserInfo, getStaffInfo } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {},
  staffInfo: {}
}
const mutations = {
  // 设置token
  setToken (state, token) {
    state.token = token // 设置token
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken (state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  setUserInfo (state, result) {
    state.userInfo = result
  },
  removeUserInfo (state) {
    state.userInfo = {}
  },
  setStaffInfo (state, result) {
    state.staffInfo = result
  }
}
const actions = {
  async login (context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    context.commit('setToken', result)
    setTimeKey()
  },
  async getUserInfo (context) {
    const result = await getUserInfo()
    const res = await getStaffInfo(result.userId)
    context.commit('setUserInfo', result)
    context.commit('setStaffInfo', res)
    return result
  },
  logout (context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

