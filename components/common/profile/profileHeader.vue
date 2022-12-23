<template>
  <header class="profile-header">
    <div class="profile-header__left">
      <base-icon @click="goBackHandle()">mdi-arrow-left</base-icon>
    </div>
    <div class="profile-header__center">
      <div class="profile-header__title">{{ value.name || `@${value.username}` }}</div>
      <div class="profile-header__subtitle">24 поста</div>
    </div>
    <div class="profile-header__right"></div>
  </header>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapGetters} from "vuex";
export default {
  name: "profileHeader",
  components: {BaseIcon},
  props: {
    value: {
      type: Object,
    }
  },
  methods: {
    // Кнопка назад
    goBackHandle() {
      this.$goBack("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-header {
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
  background: var(--background-transparent);
  backdrop-filter: blur(3px);

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

  &__right {

  }

  &__subtitle {
    color: var(--text-color-extra);
    font-size: var(--font-size-mini);
  }
}
</style>
