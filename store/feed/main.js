export const state = () => ({
  // Основной список постов
  mainList: [],

  // Страница основной лента
  mainListPage: 1,

  // Есть ли еще
  isHaveMore: true,

  // Лента для авторизованных
  isAuthFeed: true,
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

  // Удалить пост по коду
  deletePost(state, postCode) {
    const postIndex = state.mainList.findIndex(({code}) => code === postCode);
    if (postIndex < 0) return;
    let newFeed = state.mainList.slice();
    newFeed.splice(postIndex, 1);
    state.mainList = newFeed;
  },

  // Очистить
  clear(state, isAuth = false) {
    state.mainList = [];
    state.mainListPage = 1;
    state.isHaveMore = true;
    state.isAuthFeed = isAuth;
  },
}

export const actions = {

  // Получить основную ленту
  async fetchMainFeed({ commit, state, rootGetters, dispatch }) {
    if (state.isAuthFeed !== rootGetters["user/isAuth"]) commit("clear", rootGetters["user/isAuth"]);
    if (rootGetters["user/isAuth"]) await dispatch("fetchMainFeedAuth")
    else await dispatch("fetchMainFeedNotAuth")
  },

  // Получить основную ленту для авторизованных (возвращает есть ли еще в пагинации)
  async fetchMainFeedAuth({ commit, state }) {
      await this.$api.$get("/api/feed/main", {params: {page: state.mainListPage}})
        .then(({err, body}) => {
          if (!err) {
            if (state.mainListPage === 1) commit("set", ["mainList", body]);
            else commit("supplement", ["mainList", body]);
            commit("set", ["mainListPage", state.mainListPage+1]);
            commit("set", ["isHaveMore", !!body.length]);
          }
        })
  },

  // Получить основную ленту для авторизованных (возвращает есть ли еще в пагинации)
  async fetchMainFeedNotAuth({ commit, state }) {
      await this.$api.$get("/api/feed/general", {params: {page: state.mainListPage}})
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
