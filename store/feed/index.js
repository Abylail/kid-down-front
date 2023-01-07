export const state = () => ({
  // Свой профильный список постов
  myProfileList: [],
})

export const getters = {

  // Свой профильный список постов
  getMyProfileList: state => state.myProfileList,
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

  // Получить лист по username
  async fetchUserList({ dispatch, rootGetters }, username) {
    if (rootGetters["user/isAuth"] && rootGetters["user/getUsername"] === username) return await dispatch("fetchMyProfileFeed");
    else return await dispatch("fetchOthersProfileFeed", username);
  },

  // Получить ленту личного профиля
  fetchMyProfileFeed({ state, commit, rootGetters }) {
    return new Promise(resolve => {
      if (state.myProfileList.length) resolve(state.myProfileList);
      else this.$api.$get(`/api/v1/feed/user/${rootGetters["user/getUsername"]}`)
        .then(({err, body}) => {
          if (!err) {
            commit("set", ["myProfileList", body]);
            resolve(body);
          }
          resolve([]);
        })
    })
  },

  // Получить ленту другого профиля
  fetchOthersProfileFeed({}, username) {
    return new Promise(resolve => {
      this.$api.$get(`/api/v1/feed/user/${username}`)
        .then(({body, err}) => {
          if (!err) resolve(body);
          else resolve([]);
        })
    })
  },

  // Поиск категорий (возвращает список)
  fetchCategories({}, searchQuery = null) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/search/category", {query: searchQuery})
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve([]);
        })
    })
  }
}
