<template>
  <div class="user-item" @click="goAccount()">
    <div class="user-item__avatar" :style="avatarStyle"></div>
    <div class="user-item__info">
      <div class="user-item__name">{{ value.name || value.username }}</div>
      <div class="user-item__username">@{{ value.username }}</div>
    </div>
    <div class="user-item__subscribe">
      <base-button v-if="selfUsername !== value.username" size="mini" :type="subscribeType" min-content @click.stop="subscribeToggleHandle()">{{ subscribeTitle }}</base-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BaseButton from "@/components/base/BaseButton";

export default {
  name: "userItem",
  components: {BaseButton},
  props: {
    value: {
      type: Object
    }
  },
  data: () => ({
    // Таймаут подписания
    subscribeTimeout: null,

    // Моя подписка после поля подписан
    mySubscribe: null,

    // Моя подписка синхронизированная с бэком
    mySubscribeSync: null,
  }),
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
      selfUsername: "user/getUsername",
    }),

    // Уже подписан
    isSubscribed() {
      if (!this.isAuth) return false;
      if (this.mySubscribe !== null) return this.mySubscribe;
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

    // Стиль аватарки (фото)
    avatarStyle() {
      if (this.value.avatar) return {backgroundImage: `url(${process.env.CDN_URL}${this.value.avatar})`}
      return {};
    }
  },
  methods: {
    ...mapActions({
      _subscribe: "user/subscribe",
      _unsubscribe: "user/unsubscribe",
    }),

    // Перейти в аккаунт
    goAccount() {
      this.$router.push(`/user/${this.value.username}`)
    },

    // Подписаться/отписаться кнопка
    subscribeToggleHandle() {
      if (this.isAuth) this.subscribeToggle();
      else this.$goLogin(`/user/${this.value.username}`);
    },

    // Подписаться/отписаться
    subscribeToggle() {
      if (this.mySubscribeSync === null) this.mySubscribeSync = !!this.isSubscribed;
      this.mySubscribe = !this.isSubscribed;
      clearTimeout(this.subscribeTimeout);
      this.subscribeTimeout = setTimeout(async () => {
        if (this.mySubscribeSync === this.mySubscribe) return;
        let isSubscribed = null;
        if (!this.mySubscribeSync) isSubscribed = await this._subscribe(this.value.username);
        else isSubscribed = await this._unsubscribe(this.value.username);
        this.mySubscribeSync = isSubscribed;
        this.mySubscribe = !!this.mySubscribeSync;
      }, 500)
    },
  }
}
</script>

<style lang="scss" scoped>
$height: 35px;
.user-item {
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
    -webkit-justify-content: flex-end;
  }
}
</style>
