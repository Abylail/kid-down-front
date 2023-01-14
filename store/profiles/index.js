
export const state = () => ({
  userInfo: {},
})

export const mutations = {
  // Вставить значение
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
}

export const actions = {
  fetchUser({ commit, state }, username) {
    return new Promise(resolve => {
      if (username === state.userInfo.username) return resolve(state.userInfo);
      this.$api.$get(`/api/user/info/${username}`)
        .then(({err, body}) => {
          let userInfo = {};
          if (!err) userInfo = {...body, username};
          commit("set", ["userInfo", userInfo]);
          resolve(userInfo);
        })
    })
  }
}
