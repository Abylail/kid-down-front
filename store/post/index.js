export const state = () => ({
  postInfo: null,
})

export const getters = {
  getPostInfo: state => state.postInfo,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Запросить пост по коду
  fetchPostByCode({state, commit}, {post_code}) {
    if (state.postInfo && state.postInfo.code === post_code) return;
  },

  // Передача информации о посте до перехода
  bridgeInfo({commit, state}, postInfo) {
    commit("set", ["postInfo", postInfo]);
  }
}
