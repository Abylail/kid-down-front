<template>
  <header class="main-header">

    <!-- LEFT -->
    <div class="main-header__left">
      TOXY
    </div>

    <!-- RIGHT -->
    <div class="main-header__right">

      <!-- Поиск (переход) -->
      <div class="main-header__search-wrapper">
        <base-icon size="27" @click="goSearch()">mdi-text-search-variant</base-icon>
      </div>

      <!-- Аватарка -->
      <div class="main-header__avatar-wrapper">
        <div class="main-header__avatar" v-if="isAuth && userInfo.avatar" :style="{backgroundImage: `url(${avatarUrl})`}" @click="goProfile()"></div>
        <base-icon size="20" v-else @click="goProfile()">mdi-account-circle</base-icon>
      </div>
    </div>
  </header>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapGetters} from "vuex";
export default {
  name: "mainHeader",
  components: {BaseIcon},
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
      userInfo: "user/getUserInfo",
      selfUsername: "user/getUsername",
    }),

    // Урл авы
    avatarUrl() {
      return process.env.CDN_URL + this.userInfo.avatar;
    }
  },
  methods: {
    // Перейти в профиль
    goProfile() {
      this.$goLogin("/user");
    },

    // Перейти в поиск
    goSearch() {
      this.$router.push("/search");
    }
  },
}
</script>

<style lang="scss" scoped>
$side-padding-size: 16px;
.main-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: fixed;
  top: 0;
  width: calc(100% - 2*#{$side-padding-size});
  z-index: 2;
  height: calc(var(--header-height) - 2*8px);
  padding: 8px $side-padding-size;
  border-bottom: 1px solid var(--background-color-secondary);
  background: var(--background-transparent);
  backdrop-filter: blur(3px);

  &__left {
    display: flex;
    align-items: center;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: right;
    text-align: right;
  }

  &__avatar {
    height: 30px;
    width: 30px;
    background-size: cover;
    background-position: center;
    border-radius: 30px;
  }

  &__search-wrapper {
    margin-right: 10px;
  }
}
</style>
