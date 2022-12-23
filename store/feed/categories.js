export const actions = {

  // Поиск категорий
  searchCategory({}, searchQuery = "") {
    return new Promise(resolve => {
      this.$api.$post("/api/v1/search/category", {query: searchQuery})
        .then(({err, body}) => {
          if (!err) {
            console.log(body);
          }
        })
    })
  }
}
