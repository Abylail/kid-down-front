<template>
  <header class="main-header">

    <!-- LEFT -->
    <div class="main-header__left">
      TOXY
    </div>

    <!-- RIGHT -->
    <div class="main-header__right">

      <!-- Tools (переход) -->
      <div class="main-header__tools">
        <base-icon class="main-header__tool-item" size="24" @click="goSearch()">mdi-magnify</base-icon>
        <notification-tool class="main-header__tool-item" v-if="isAuth"/>
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
import NotificationTool from "@/components/common/mainFeed/notificationTool";
export default {
  name: "mainHeader",
  components: {NotificationTool, BaseIcon},
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
    },
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
  left: 0;
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
    display:-webkit-flex;
    align-items: center;
    justify-content: right;
    -webkit-justify-content: flex-end;
    text-align: right;
  }

  &__avatar {
    height: 30px;
    width: 30px;
    background-size: cover;
    background-position: center;
    border-radius: 30px;
  }

  &__tools {
    margin-right: 10px;
  }

  &__tool-item {
    margin-right: 10px;
  }
}
</style>
