<template>
  <div class="search-page">
    <search-header/>
    <base-tabs
      v-model="searchType"
      :tabs="[
        {id: null, name: 'Все'},
        {id: 'users', name: 'Пользователи'},
        {id: 'themes', name: 'Темы'},
       ]"
    />
  </div>
</template>

<script>
import SearchHeader from "@/components/common/search/searchHeader";
import BaseTabs from "@/components/base/BaseTabs";
export default {
  name: "index",
  components: {BaseTabs, SearchHeader},
  computed: {
    searchType: {
      get() {
        return this.$route.query.searchType || null;
      },
      set(val) {
        this.$router.replace({query: {...this.$route.query, searchType: val || undefined}})
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  padding-top: var(--header-height);
}
</style>
