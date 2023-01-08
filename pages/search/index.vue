<template>
  <div class="search-page">
    <search-header/>
    <base-tabs
      class="search-page__tabs"
      v-model="searchType"
      :tabs="[
        {id: 'all', name: 'Все'},
        {id: 'users', name: 'Пользователи'},
        {id: 'categories', name: 'Темы'},
       ]"
      background
    />

    <!-- Список результатов -->
    <div class="search-page__list" v-show="!isLoading">
      <search-item
        class="search-page__item"
        v-for="(item, index) in resultList" :key="index"
        :value="item"
        :user-only="searchType === searchTypesEnum.users"
        :category-only="searchType === searchTypesEnum.categories"
      />
    </div>

    <!-- Загрузка -->
    <search-loader class="search-page__loading" :search-type="searchType" v-show="isLoading"/>

  </div>
</template>

<script>
import SearchHeader from "@/components/common/search/searchHeader";
import BaseTabs from "@/components/base/BaseTabs";
import {mapActions, mapGetters} from "vuex";
import BaseLoader from "@/components/base/BaseLoader";
import SearchItem from "@/components/common/search/searchItem";
import {searchTypesEnum} from "@/store/search";
import SearchLoader from "@/components/common/search/searchLoader";

export default {
  name: "index",
  components: {SearchLoader, SearchItem, BaseLoader, BaseTabs, SearchHeader},
  data: () => ({
    searchTypesEnum,
  }),
  computed: {
    ...mapGetters({
      isLoading: "search/isLoading",
      resultList: "search/getResultList",
    }),
    searchType: {
      get() {
        return this.$route.query.searchType || "all";
      },
      set(val) {
        if (this.$route.query?.searchType !== val) this.$router.replace({query: {...this.$route.query, searchType: val || undefined}});
      }
    }
  },
  methods: {
    ...mapActions({
      _search: "search/searchUniversal",
    }),

    // Запустить поиск
    async search(searchText = null) {
      await this._search({searchType: this.searchType, searchText});
    },
  },
  mounted() {
    this.search(this.$route.query?.searchText);
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  padding-top: calc(var(--header-height) + 50px);

  &__tabs {
    position: fixed;
    top: var(--header-height);
    width: 100%;
  }
}
</style>
