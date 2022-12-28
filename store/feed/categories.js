export const actions = {

  // Поиск категорий
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
