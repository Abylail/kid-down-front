export const state = () => ({
  // Список коментов
  list: [],
  postCode: null,
  page: 1,
})

export const getters = {
  // Список коментов
  getList: state => state.list,
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
  // Увеличить число на 1
  increment(state, namespace) {
    state[namespace]++;
  },

  // Сбросить коменты
  clear(state, postCode) {
    state.list = [];
    state.postCode = postCode;
    state.page = 1;
  }
}

export const actions = {
  // Получить список коментов
  async fetchList({ state, commit }, {postCode, isInitial}) {
    await this.$api.$get(`/api/post/comment/get/${postCode}`, {params: {page: state.page}})
      .then(({err, body}) => {
        if (!err) commit("supplement", ["list", body.comments])
      })
  }
}
