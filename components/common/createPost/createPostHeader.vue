<template>
  <header class="create-post-header">
    <div class="create-post-header__left">
      <base-icon @click="goBackHandle()">mdi-arrow-left</base-icon>
    </div>
    <div class="create-post-header__center">
      <div class="create-post-header__title">Создание поста</div>
      <div class="create-post-header__subtitle">@{{ selfUsername }}</div>
    </div>
  </header>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapGetters} from "vuex";
export default {
  name: "createPostHeader",
  components: {BaseIcon},
  computed: {
    ...mapGetters({
      selfUsername: "user/getUsername",
    })
  },
  methods: {
    // Кнопка назад
    goBackHandle() {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.create-post-header {
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
