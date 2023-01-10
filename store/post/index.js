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
  async fetchPostByCode({state, commit}, {post_code, optimize = true}) {
    if (optimize && state.postInfo && state.postInfo.code === post_code) return;
    await this.$api.$get(`/api/feed/single/${post_code}`)
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["postInfo", body]);
        }
      })
  },

  // Передача информации о посте до перехода
  bridgeInfo({commit, state}, postInfo) {
    commit("set", ["postInfo", postInfo]);
  }
}
