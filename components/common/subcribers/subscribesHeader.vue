<template>
  <header class="subscribes-header">
    <div class="subscribes-header__left">
      <base-icon @click="goBackHandle()">mdi-arrow-left</base-icon>
    </div>
    <div class="subscribes-header__center">
      <div class="subscribes-header__title">{{ title }}</div>
      <div class="subscribes-header__subtitle">{{ count }} аккаунтов</div>
    </div>
    <div class="subscribes-header__right"></div>
  </header>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
export default {
  name: "subscribesHeader",
  components: {BaseIcon},
  props: {
    title: {
      type: String,
      default: "Подписчиков"
    },
    countLabel: {

    },
    count: {
      type: [String, Number],
      default: 0
    }
  },
  methods: {
    // Кнопка назад
    goBackHandle() {
      this.$emit("goBack");
    }
  }
}
</script>

<style lang="scss" scoped>
.subscribes-header {
  position: fixed;
  top: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: var(--header-height) 1fr var(--header-height);
  grid-column-gap: 20px;
  width: 100%;
  height: calc(var(--header-height) - 2*8px);
  padding: 8px 0;
  border-bottom: 1px solid var(--background-color-secondary);
  background: var(--background-color-primary);

  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__center {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  &__subtitle {
    color: var(--text-color-extra);
    font-size: var(--font-size-mini);
  }
}
</style>
