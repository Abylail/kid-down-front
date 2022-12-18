
export const actions = {
  fetchUser({}, username) {
    return new Promise(resolve => {
      this.$api.$get(`/api/v1/user/info/${username}`)
        .then(({err, body}) => {
          if (!err) resolve({...body, username});
          else resolve({});
        })
    })
  }
}
