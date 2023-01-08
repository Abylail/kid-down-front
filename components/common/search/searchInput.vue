<template>
  <div class="search-input">
    <input
      class="search-input__input"
      placeholder="Поиск"
      :value="searchText"
      ref="input"
      @keyup.enter="blurInput()"
      @input="inputHandle($event.target.value)"
    />
    <div class="search-input__icon-wrapper">
      <base-icon v-if="searchText" @click="clearHandle()">mdi-close-circle</base-icon>
    </div>
    <div class="search-input__icon-wrapper">
      <base-icon>mdi-magnify</base-icon>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "searchInput",
  components: {BaseIcon},
  data: () => ({
    searchText: null,
    searchTimeout: null,
  }),
  computed: {
    ...mapGetters({
      lastSearchText: "search/getLastSearchText",
    }),
  },
  watch: {
    "$route.query.searchType"() {
      this.search();
    }
  },
  methods: {
    ...mapActions({
      _search: "search/searchUniversal",
    }),

    // Кнопка очистить
    clearHandle() {
      this.searchText = null;
      clearTimeout(this.searchTimeout);
      this.search();
      this.focusInput();
    },

    // Ввод текста
    inputHandle(value) {
      this.searchText = value;
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {this.search()}, 500)
    },

    // Поиск
    search() {
      this._search({searchText: this.searchText, searchType: this.$route.query.searchType || "all"});
      this.$router.replace({query: {...this.$route.query, searchText: this.searchText}})
    },

    // Сфокусироваться на инпуте (если не было поисков)
    focusInput() {
      this.$nextTick(() => {
        if (!this.$refs.input.autofocus) this.$refs.input.setAttribute("autofocus", "autofocus");
        this.$refs.input.focus();
      });
    },

    // Разфокусироваться от инпута
    blurInput() {
      this.$refs.input.blur();
    }
  },
  created() {
    this.searchText = this.$route.query.searchText;
  },
  mounted() {
    this.$nextTick(() => {this.searchText = this.lastSearchText;});
    if (!Object.keys(this.$route.query).length) this.focusInput();
  }
}
</script>

<style lang="scss" scoped>
$height: calc(var(--header-height) - 2*8px);
.search-input {
  display: grid;
  grid-template-columns: 1fr $height $height;
  height: $height;
  background: var(--background-color-secondary);
  border-radius: 5px;
  padding-left: 5px;

  &__input {
    font-size: var(--font-size-text);
    background: none;
    border: none;
    color: var(--text-color-primary)
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-extra);
  }
}
</style>
