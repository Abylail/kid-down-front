export const actions = {

  // Получить список подписок
  fetchFollowing({}, username) {
    return new Promise(resolve => {
      this.$api.$get(`/api/user/subscriptions/${username}`)
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve([]);
        })
    })
  },

  // Получить список подписчиков
  fetchFollowers({}, username) {
    return new Promise(resolve => {
      this.$api.$get(`/api/user/subscribers/${username}`)
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve([]);
        })
    })
  },
}
