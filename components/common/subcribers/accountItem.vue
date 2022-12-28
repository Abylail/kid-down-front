<template>
  <div class="account-item" @click="goAccount">
    <div class="account-item__avatar" :style="avatarStyle"></div>
    <div class="account-item__info">
      <div class="account-item__name">{{ value.name || value.username }}</div>
      <div class="account-item__username">@{{ value.username }}</div>
    </div>
    <div class="account-item__subscribe">
      <base-button v-if="selfUsername !== value.username" size="mini" :type="subscribeType" min-content @click.stop="subscribeToggleHandle()">{{ subscribeTitle }}</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "accountItem",
  components: {BaseButton},
  props: {
    value: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
      selfUsername: "user/getUsername",
    }),
    // Уже подписан
    isSubscribed() {
      if (!this.isAuth) return false;
      return this.value.subscribed;
    },
    // Текст кнопки подписки
    subscribeTitle() {
      if (this.isSubscribed) return "Вы подписаны";
      return "Подписаться"
    },
    // Тип кнопки подписки
    subscribeType() {
      if (this.isSubscribed) return "default";
      return "primary"
    },
    avatarStyle() {
      if (this.value.avatar) return {backgroundImage: `url(${process.env.CDN_URL}${this.value.avatar})`}
      return {};
    }
  },
  methods: {
    // Перейти в аккаунт
    goAccount() {
      this.$router.push(`/user/${this.value.username}`)
    },

    // Подписаться/отписаться кнопка
    subscribeToggleHandle() {
      if (this.isAuth) this.$emit("subscribeToggle");
      else this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  }
}
</script>

<style lang="scss" scoped>
$height: 35px;
.account-item {
  padding: 12px;
  display: grid;
  grid-template-columns: $height 1fr 120px;
  grid-column-gap: 12px;
  border-bottom: 1px solid var(--background-color-secondary);
  height: $height;

  &__avatar {
    background: var(--background-color-secondary);
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  &__username {
    font-size: var(--font-size-mini);
    color: var(--text-color-secondary);
  }

  &__subscribe {
    display: flex;
    align-items: center;
    justify-content: right;
  }
}
</style>
