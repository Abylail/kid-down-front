export const state = () => ({
  activePostCode: null,
  likes: {},
  haveMore: true,
  page: 1,
})

export const getters = {
  // Список пользователей
  getLikes: state => state.likes.like_authors || [],
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
}

export const actions = {

  // Запросить лайки
  async fetchLikes({ commit, state }, {post_code}) {
    // Если тот же пост
    if (post_code === state.activePostCode && state.page > 1) return;

    // Если сменился пост
    if (post_code !== state.activePostCode) {
      commit("set", ["page", 1]);
      commit("set", ["haveMore", true]);
      commit("set", ["likes", {}]);
      commit("set", ["activePostCode", post_code]);
    }
    await this.$api.$get(`/api/post/like/get/${post_code}`, {page: state.page})
      .then(({err, body}) => {
        if (!err) commit("set", ["likes", body]);
      })
  },

  // Лайкнуть пост (возвращает то что сохранилось в базе)
  like({}, {post_code, post_category}) {
    return new Promise(resolve => {
      this.$api.$post("/api/post/like/do", {post_code, post_category})
        .then(({err}) => {
          if (err) resolve(false);
          else resolve(true);
        })
    })
  },

  // Лайкнуть пост (возвращает то что сохранилось в базе)
  unlike({}, {post_code, post_category}) {
    return new Promise(resolve => {
      this.$api.$post("/api/post/like/undo", {post_code, post_category})
        .then(({err}) => {
          if (err) resolve(true);
          else resolve(false);
        })
    })
  },
}
