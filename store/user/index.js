export const state = () => ({
  // Информация пользователя
  userInfo: null,
})

export const getters  = {
  // Токен пользователя
  getUserToken: state => state.userInfo?.token,

  // username пользователя
  getUsername: state => state.userInfo?.username,

  // Информация пользователя
  getUserInfo: state => state.userInfo,

  // Авторизован ли пользователь
  isAuth: state => !!state.userInfo,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
  mergeObject(state, [namespace, obj]) {
    state[namespace] = {...state[namespace], ...obj};
  }
}

export const actions = {

  // Войти через логин и пароль
  login({ commit, dispatch }, {username, password}) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/auth/login/credentials", {username, password})
        .then(async ({err, body}) => {
          if (!err) {
            this.$cookies.set("userToken", body.token);
            commit("set", ["userInfo", body]);
          }
          resolve(!err);
        })
    })
  },

  // Авторизация по токену + информация пользователя
  async tokenAuth({ commit, state, getters, dispatch }, outerToken = state.userInfo?.token) {
    let token = outerToken || this.$cookies.get("userToken");
    if (!token) return;
    await this.$api.$post("/api/v1/auth/login/token", {token})
      .then(({err, body}) => {
        if (!err) {
          this.$cookies.set("userToken", body.token);
          commit("set", ["userInfo", body]);
        }
        else {
          dispatch("logout");
        }
      })
  },

  // Регистрация
  registration({ commit, dispatch }, {username, password, re_password}) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/auth/signup", {username, password, re_password})
        .then(async ({err, body}) => {
          if (!err) {
            await dispatch("tokenAuth", body);
          }
          resolve(!err);
        })
    })
  },

  // Выйти из аккаунта
  logout({ commit }) {
    commit("set", ["userInfo", null]);
    this.$cookies.remove("userToken");
  },

  // Сохранения информации профиля (имя + описание)
  saveProfileInfo({ commit }, {name, bio}) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/profile/update", {name, bio})
        .then(({err, body}) => {
          if (!err) {
            commit("mergeObject", ["userInfo", {name, bio}])
          }
          resolve(!err);
        })
    })
  },

  // Сохранить аватара
  saveProfileAvatar({ commit, getters }, {name, buffer}) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/profile/avatar", {name, buffer})
        .then(({err, body}) => {
          if (!err) {
            commit("mergeObject", ["userInfo", {avatar: body}]);
          }
          resolve(!err);
        })
    })
  },

  // Сохранить обои
  saveProfileWallpaper({ commit, getters }, {name, buffer}) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/profile/wallpaper", {name, buffer})
        .then(({err, body}) => {
          if (!err) {
            commit("mergeObject", ["userInfo", {wallpaper: body}]);
          }
          resolve(!err);
        })
    })
  },

  // Подписаться -> значение подписан или нет
  subscribe({}, username) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/profile/subscribe", {username})
        .then(({err}) => {
          if (err) resolve(false);
          else resolve(true);
        })
    })
  },

  // Отписаться -> значение подписан или нет
  unsubscribe({}, username) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/profile/unsubscribe", {username})
        .then(({err}) => {
          if (err) resolve(true);
          else resolve(false);
        })
    })
  },
}
