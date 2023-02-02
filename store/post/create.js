export const state = () => ({

})

export const getters = {

}

export const mutations = {
  // Вставить значение
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
}

export const actions = {

  // Создать пост
  async createPost({ commit }, {text, picture, custom_category, category_code}) {
    let myPicture = picture && {...picture};
    if (myPicture) myPicture.buffer = myPicture.buffer.split(",")[1];
    await this.$api.$post("/api/post/add", {text, picture: myPicture, custom_category, category_code})
      .then(({err, body}) => {
        if (!err) {
          // Очищаю свой профиль что бы он заново запросился
          commit("profiles/feed/clearMyProfileFeed", null, {root: true})
        }
      })
  },

  // Поиск категорий (возвращает список)
  fetchCategories({}, searchQuery = null) {
    return new Promise(resolve => {
      this.$api.$post("/api/search/category", {query: searchQuery})
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve([]);
        })
    })
  }
}
