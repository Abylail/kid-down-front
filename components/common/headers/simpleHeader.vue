<template>
  <header class="simple-header">
    <div class="simple-header__left">
      <base-icon @click="goBackHandle()">mdi-arrow-left</base-icon>
    </div>
    <div class="simple-header__center">
      <h2 class="simple-header__title"><slot/></h2>
    </div>
    <div class="simple-header__right"></div>
  </header>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
export default {
  name: "simpleHeader",
  components: {BaseIcon},
  props: {
    backPath: {
      type: String,
      default: "/"
    }
  },
  methods: {
    // Кнопка назад
    goBackHandle() {
      this.$goBack(this.backPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
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

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: var(--font-size-text);
  }
}
</style>
