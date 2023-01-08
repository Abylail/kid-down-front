<template>
  <div class="base-tabs" :class="{'base-tabs--background': background}">
    <div class="base-tabs__list">
      <div
        class="base-tabs__item"
        :class="{active: tab.id === value}"
        v-for="tab in tabs" :key="tab.id"
        @click="selectHandle(tab)"
      >{{ tab.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTabs",
  props: {
    value: {

    },
    tabs: {
      type: Array,
      default: () => [{id: "posts", name: "Посты"}]
    },
    background: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // Выбрать (кнопка)
    selectHandle(tab) {
      this.$emit("input", tab.id);
    }
  }
}
</script>

<style lang="scss" scoped>
$side-padding-size: 20px;
.base-tabs {

  &--background {
    background: var(--background-color-primary);
  }

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  &__item {
    flex: 1;
    text-align: center;
    color: var(--text-color-secondary);
    padding: 5px 0;
    transition: .2s;
    &.active {
      color: var(--color-blue);
      border-bottom: 2px solid var(--color-blue);
    }
  }

}
</style>
