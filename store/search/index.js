
// Типы поиска
export const searchTypes = [
  {id: 'all', name: 'Все'},
  {id: 'users', name: 'Пользователи'},
  {id: 'categories', name: 'Темы'},
]

// Типы поиска (enum)
export const searchTypesEnum = Object.freeze({
  all: "all",
  users: "users",
  categories: "categories",
})

export const state = () => ({

  // Последней текст поиска
  lastSearchTextAll: null,
  lastSearchTextUsers: null,
  lastSearchTextCategories: null,

  // Последней тип поиска
  activeSearchType: "all",

  // Загружается ли лента
  isLoading: true,

  // Список
  resultListAll: [],
  resultListUsers: [],
  resultListCategories: [],
})

export const getters = {
  // Загружается ли лента
  isLoading: state => state.isLoading,

  // Последний текст поиска (по типу)
  getLastSearchText: state => {
    if (searchTypesEnum.all === state.activeSearchType) return state.lastSearchTextAll;
    else if (searchTypesEnum.users === state.activeSearchType) return state.lastSearchTextUsers;
    else if (searchTypesEnum.categories === state.activeSearchType) return state.lastSearchTextCategories;
    return "all";
  },

  // Список результата
  getResultList: state => {
    if (searchTypesEnum.all === state.activeSearchType) return state.resultListAll;
    else if (searchTypesEnum.users === state.activeSearchType) return state.resultListUsers;
    else if (searchTypesEnum.categories === state.activeSearchType) return state.resultListCategories;
    return [];
  },
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Общий поиск
  async searchUniversal({ dispatch, state, commit, getters }, {searchType = state.activeSearchType, searchText = getters.getLastSearchText}) {
    commit("set", ["isLoading", true]);
    commit("set", ["activeSearchType", searchType]);
    if (searchTypesEnum.all === searchType) await dispatch("searchAll", {searchText});
    else if (searchTypesEnum.users === searchType) await dispatch("searchUsers", {searchText});
    else if (searchTypesEnum.categories === searchType) await dispatch("searchCategories", {searchText});
    commit("set", ["isLoading", false]);
  },

  // Искать по всему
  async searchAll({commit, state}, {searchText}) {
    if (searchText && searchText === state.lastSearchTextAll) return;
    commit("set", ["lastSearchTextAll", searchText]);
    if (!searchText) return commit("set", ["resultListAll", []]);
    await this.$api.$post("/api/search/smart", {query: searchText})
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["resultListAll", body]);
        }
      })
  },

  // Искать по пользователям
  async searchUsers({commit, state}, {searchText}) {
    if (searchText && searchText === state.lastSearchTextUsers) return;
    commit("set", ["lastSearchTextUsers", searchText]);
    if (!searchText) return commit("set", ["resultListUsers", []]);
    await this.$api.$post("/api/search/user", {query: searchText})
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["resultListUsers", body]);
        }
      })
  },

  // Искать по темам
  async searchCategories({commit, state}, {searchText}) {
    if (searchText && searchText === state.lastSearchTextCategories) return;
    commit("set", ["lastSearchTextCategories", searchText]);
    if (!searchText) return commit("set", ["resultListCategories", []]);
    await this.$api.$post("/api/search/category", {query: searchText})
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["resultListCategories", body]);
        }
      })
  },

}
