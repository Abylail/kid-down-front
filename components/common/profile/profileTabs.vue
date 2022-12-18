<template>
  <div class="profile-tabs">
    <div class="profile-tabs__list">
      <div
        class="profile-tabs__item"
        :class="{active: tab.id === value}"
        v-for="tab in tabs" :key="tab.id"
        @click="selectHandle(tab)"
      >{{ tab.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileTabs",
  props: {
    value: {

    },
    tabs: {
      type: Array,
      default: () => [{id: "posts", }]
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
.profile-tabs {
  margin-top: 10px;

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
