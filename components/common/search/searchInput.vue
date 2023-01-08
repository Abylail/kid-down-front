<template>
  <div class="search-input">
    <input
      class="search-input__input"
      placeholder="Поиск"
      :value="searchText"
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
export default {
  name: "searchInput",
  components: {BaseIcon},
  data: () => ({
    searchText: null,
  }),
  methods: {

    // Кнопка очистить
    clearHandle() {
      this.searchText = null;
    },

    // Ввод текста
    inputHandle(value) {
      this.searchText = value;
    },
  },
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
