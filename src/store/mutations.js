export const state = {
  isLoading: false,
  routerD: {},
  accountInfo: {},
  testStroea: '',
  disC: '',
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : { real_name: '管理员' },
  menuInfo: localStorage.getItem("menuInfo") ? JSON.parse(localStorage.getItem("menuInfo")) : []
}

export const mutations = {
  showLoading: (state, show) => {
    state.isLoading = show
  },
  routerChange: (state, route) => {
    state.routerD = route
  },
  storeAcconutInfo: (state, info) => {
    state.accountInfo = Object.assign({}, info);
  },
  sTest: (state, info) => {
    state.testStroea = info;
  },
  dCommit: (state, info) => {
    console.log(info);
    state.disC = info;
  },
  setUserInfoMutation(state, data) {
    state.userInfo = Object.assign({}, state.userInfo, data);
  },
  setMenuInfoMutation(state, data) {
    state.menuInfo = Object.assign({}, state.menuInfo, data);
  }
}

export const actions = {
  showLoading: ({ commit }, show) => { commit('showLoading', show) },
  routerChange: ({ commit }, route) => { commit('routerChange', route) },
  storeAcconutInfo: ({ commit }, info) => { commit("storeAcconutInfo", info) },
  storeTest(context, data) {
    console.log(context, data);
    context.commit('sTest', data)
  },
  setUserInfoAction({ commit }, data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
    commit('setUserInfoMutation', data);
  },
  setMenuInfoAction({ commit }, data) {
    localStorage.setItem('menuInfo', JSON.stringify(data));
    commit('setMenuInfoMutation', data);
  }
}

export const getters = {
  isLoading: () => state.isLoading,
  routerL: () => state.routerD,
  accountInfo: () => state.accountInfo,
  testStroea: () => state.testStroea,
  dCommtValue: () => state.disC,
  // isActive:()=> state.isActive
  userInfo: state => state.userInfo,
  menuInfo: state => state.menuInfo,
}
