
export const actions = {
  fetchUser({}, username) {
    return new Promise(resolve => {
      this.$api.$get(`/api/user/info/${username}`)
        .then(({err, body}) => {
          if (!err) resolve({...body, username});
          else resolve({});
        })
    })
  }
}
