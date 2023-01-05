export const state = () => ({
  likes: [],
})

export const getters = {
  getLikes: state => state.likes,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
}

export const actions = {

  // Запросить лайки
  async fetchLikes({ commit }, {post_code}) {
    await this.$api.$get(`/api/v1/post/like/get/${post_code}`)
      .then(({err, body}) => {
        console.log(body);
        if (!err) commit("set", ["likes", body])
      })
  },
}
