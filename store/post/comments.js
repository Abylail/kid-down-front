
export const actions = {
  // Получить список коментов
  fetchList({}, {postCode, page = 1}) {
    return new Promise(resolve => {
      this.$api.$get(`/api/post/comment/get/${postCode}`, {params: {page}})
        .then(({err, body}) => {
          if (!err) return resolve(body?.comments || []);
          resolve([]);
        })
    })
  },

  // Лайк
  like({}, {post_code, comment_code}) {
    return new Promise(resolve => {
      this.$api.$post("/api/post/comment/like", {post_code, comment_code})
        .then(({err}) => {
          if (err) resolve(false);
          else resolve(true);
        })
    })
  },

  // Дизлайк
  unlike({}, {post_code, comment_code}) {
    return new Promise(resolve => {
      this.$api.$post("/api/post/comment/unlike", {post_code, comment_code})
        .then(({err}) => {
          if (err) resolve(true);
          else resolve(false);
        })
    })
  },
}
