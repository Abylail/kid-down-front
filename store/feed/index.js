export const state = () => ({
  // Основной список постов
  mainList: [],

  // Свой профильный список постов
  myProfileList: [],
})

export const getters = {
  // Список постов
  getMainList: state => state.mainList,

  // Свой профильный список постов
  getMyProfileList: state => state.myProfileList,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Создать пост
  async createPost({}, {text, picture, custom_category, category_code}) {
    let myPicture = picture && {...picture};
    if (myPicture) myPicture.buffer = myPicture.buffer.split(",")[1];
    await this.$api.$post("/api/v1/post/add", {text, picture: myPicture, custom_category, category_code})
      .then(({err, body}) => {
        if (!err) {
          console.log(body);
        }
      })
  },

  // Получить основную ленту
  async fetchMainFeed({ commit }) {
    await this.$api.$get("/api/v1/feed/main")
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["mainList", body]);
        }
      })
  },

  // Получить лист по username
  async fetchUserList({ dispatch, rootGetters }, username) {
    if (rootGetters["user/isAuth"] && rootGetters["user/getUsername"] === username) await dispatch("fetchMyProfileFeed");
  },

  // Получить ленту профиля
  async fetchMyProfileFeed({ commit, rootGetters }) {
    await this.$api.$get(`/api/v1/feed/user/${rootGetters["user/getUsername"]}`)
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["myProfileList", body]);
        }
      })
  },
}
