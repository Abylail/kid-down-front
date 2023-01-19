
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

  // Отправить коментарий
  sendComment({rootGetters}, {post_code, comment_text, first_comment, parent_comment_code}) {
    return new Promise(resolve => {
      this.$api.$post("/api/post/comment/add", {post_code, post_author: rootGetters["user/getUsername"], comment_text, first_comment, parent_comment_code})
        .then(({err, body}) => {
          if (err) resolve(null);
          else resolve({
            comment_text: comment_text,
            created_at: new Date(),
            likes_count: 0,
            my_like: false,
            comment_code: body,
            comment_author: rootGetters["user/getUserInfo"]
          });
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
