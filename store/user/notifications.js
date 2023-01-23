
export const state = () => ({
  // Колличетво новых уведомлений
  newCount: 0,

  // Пуш показан
  pushShowed: false,

  // Список уведомлений
  list: [],

  // Страница пагинации
  page: 1,
})

export const getters = {
  // Колличетво новых уведомлений
  getNewCount: state => state.newCount,

  // Пуш показан
  getIsPushShowed: state => state.pushShowed,

  // Список уведомлений
  getList: state => state.list,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Получить колличество новых уведомлений
  fetchNewCount({ commit }) {
    this.$api.$get("/api/notify/get/count")
      .then(({err, body}) => {
        if (!err) commit("set", ["newCount", body]);
      })
  },

  // Запросить список уведомлений
  async fetchList({ state, commit }) {
    await this.$api.$get("/api/notify/get/info", {params: {page: state.page}})
      .then(({err, body}) => {
        if (!err) commit("set", ["list", body]);
      })
  },

  // Пуш показан (надо его больше не показывать)
  pushShowed({ commit }) {
    commit("set", ["pushShowed", true])
  },
}
