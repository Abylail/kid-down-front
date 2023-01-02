export const actions = {
  // Лайкнуть пост (возвращает то что сохранилось в базе)
  like({}, post_code) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/post/like/do", {post_code})
        .then(({err}) => {
          if (err) resolve(false);
          else resolve(true);
        })
    })
  },
  // Лайкнуть пост (возвращает то что сохранилось в базе)
  unlike({}, post_code) {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/post/like/undo", {post_code})
        .then(({err}) => {
          if (err) resolve(true);
          else resolve(false);
        })
    })
  },
}
