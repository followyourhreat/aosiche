export const state = {
  isLoading: false,
  routerD: {},
  accountInfo: {},
  testStroea: '',
  disC: '',

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

}

export const actions = {
  showLoading: ({ commit }, show) => { commit('showLoading', show) },
  routerChange: ({ commit }, route) => { commit('routerChange', route) },
  storeAcconutInfo: ({ commit }, info) => { commit("storeAcconutInfo", info) },
  storeTest(context, data) {
    console.log(context, data);
    context.commit('sTest', data)
  }
}

export const getters = {
  isLoading: () => state.isLoading,
  routerL: () => state.routerD,
  accountInfo: () => state.accountInfo,
  testStroea: () => state.testStroea,
  dCommtValue: () => state.disC,
  // isActive:()=> state.isActive
}
