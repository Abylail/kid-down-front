import user from "@/pages/user";

export const state = () => ({
  // Чужой профиль
  profileUsername: null,
  profileFeed: [],
  profilePage: 1,
  profileFeedHaveMore: true,

  // Свой профиль
  myProfileFeed: [],
  myProfilePage: 1,
  myProfileFeedHaveMore: true,
})

export const getters = {

  // Свой профильный список постов
  getMyProfileFeed: state => state.myProfileFeed,

  // Чужой список постов
  getOtherProfileFeed: state => state.profileFeed,
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


  // Удалить пост по коду
  deletePost(state, postCode) {
    const postIndex = state.myProfileFeed.findIndex(({code}) => code === postCode);
    if (postIndex < 0) return;
    state.myProfileFeed.splice(postIndex, 1);
  },

  // Очистить чужой профиль
  clearOthersProfileFeed(state, username) {
    state.profileUsername = username;
    state.profileFeed = [];
    state.profilePage = 1;
    state.profileFeedHaveMore = true;
  },
  // Очистить мой профиль
  clearMyProfileFeed(state) {
    state.myProfileFeed = [];
    state.myProfilePage = 1;
    state.myProfileFeedHaveMore = true;
  }
}

export const actions = {
  // Получить лист по username
  async fetchUserFeed({ dispatch, rootGetters }, {username, isInitial}) {
    if (rootGetters["user/isAuth"] && rootGetters["user/getUsername"] === username) await dispatch("fetchMyProfileFeed", {username, isInitial});
    else await dispatch("fetchOthersProfileFeed", {username, isInitial});
  },

  // Получить ленту личного профиля
  async fetchMyProfileFeed({ state, commit, rootGetters }, {username, isInitial}) {
    if (state.myProfileFeed.length > 10 && isInitial) return;
    else if (!state.myProfileFeedHaveMore) return;
    await this.$api.$get(`/api/feed/user/${username}`, {params: {page: state.myProfilePage}})
      .then(({err, body}) => {
        if (!err) {
          commit("supplement", ["myProfileFeed", body]);
          commit("increment", "myProfilePage");
          commit("set", ["myProfileFeedHaveMore", !!body.length])
        }
      })
  },

  // Получить ленту чужого профиля
  async fetchOthersProfileFeed({ state, commit, rootGetters }, {username, isInitial}) {
    if (state.profileUsername !== username) commit("clearOthersProfileFeed", username);
    else if (state.profileFeed.length && isInitial) return;
    else if (!state.profileFeedHaveMore) return;
    await this.$api.$get(`/api/feed/user/${username}`, {params: {page: state.profilePage}})
      .then(({body, err}) => {
        if (!err) {
          commit("supplement", ["profileFeed", body]);
          commit("increment", "profilePage");
          commit("set", ["profileFeedHaveMore", !!body.length])
        }
      })
  },
}
