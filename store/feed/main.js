export const state = () => ({
  // Основной список постов
  mainList: [],

  // Страница основной лента
  mainListPage: 1,

  // Есть ли еще
  isHaveMore: true,
})

export const getters = {
  // Список постов
  getMainList: state => state.mainList,

  // Есть ли еще в пагинации
  isHaveMore: state => state.isHaveMore,
}

export const mutations = {
  // Вставить значение
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
  // Дополнить список
  supplement(state, [namespace, value]) {
    state[namespace] = [...state[namespace], ...value];
  },
}

export const actions = {

  // Получить основную ленту (возвращает есть ли еще в пагинации)
  async fetchMainFeed({ commit, state }) {
      await this.$api.$get("/api/v1/feed/main", {params: {page: state.mainListPage}})
        .then(({err, body}) => {
          if (!err) {
            if (state.mainListPage === 1) commit("set", ["mainList", body]);
            else commit("supplement", ["mainList", body]);
            commit("set", ["mainListPage", state.mainListPage+1]);
            commit("set", ["isHaveMore", !!body.length]);
          }
        })
  },
}
