<template>
  <div class="profile">
    <profile-header :value="userInfo"/>
    <profile-info
      :value="userInfo"
      @subscribeToggle="subscribeToggle()"
      @goFollowers="goFollowers()"
      @goFollowing="goFollowing()"
    />
    <profile-tabs v-model="activeTab" :tabs="tabs"/>
  </div>
</template>

<script>
import ProfileHeader from "@/components/common/profile/profileHeader";
import ProfileInfo from "@/components/common/profile/profileInfo";
import ProfileTabs from "@/components/common/profile/profileTabs";
import {mapActions} from "vuex";

export default {
  components: {ProfileTabs, ProfileHeader, ProfileInfo},
  middleware({ store, route, redirect }) {
    // Если он переходит на страницу к юзеру к себе
    if (route.params.username === store.getters["user/getUsername"]) redirect("/profile");
  },
  data: () => ({
    // Информация пользователя
    userInfo: {},

    // Синхронизированный с бэком (нужен для подписок)
    userInfoSync: {},

    activeTab: "posts",

    tabs: [
      {id: "posts", name: "Посты"},
      {id: "media", name: "Медиа"},
    ],

    subscribeTimeout: null,
  }),
  computed: {
    username() {
      return this.$route.params?.username;
    }
  },
  methods: {
    ...mapActions({
      _subscribe: "user/subscribe",
      _unsubscribe: "user/unsubscribe",
    }),
    // Подписка/отписка
    subscribeToggle() {
      this.userInfo.my_subscription = !this.userInfo.my_subscription;

      clearTimeout(this.subscribeTimeout);
      this.subscribeTimeout = setTimeout(async () => {
        if (this.userInfoSync.my_subscription === this.userInfo.my_subscription) return;
        let isSubscribed = null;
        if (this.userInfo.my_subscription) isSubscribed = await this._subscribe(this.userInfo.username);
        else isSubscribed = await this._unsubscribe(this.userInfo.username);
        this.userInfoSync.my_subscription = isSubscribed;
        this.userInfo.my_subscription = isSubscribed;

        // Коллво подписчиков
        if (this.userInfoSync.my_subscription) this.userInfoSync.subscriptions.subscriber_count++;
        else this.userInfoSync.subscriptions.subscriber_count--;
        this.userInfo.subscriptions.subscriber_count = this.userInfoSync.subscriptions.subscriber_count;

      }, 500);
    },

    // Перейти в подписчики
    goFollowers() {
      const fromQuery = {from: Buffer.from(this.$route.fullPath).toString("base64")};
      this.$router.push({path: `/user/${this.username}/subscribes/followers`, query: {...fromQuery}});
    },

    // Перейти в подписки
    goFollowing() {
      const fromQuery = {from: Buffer.from(this.$route.fullPath).toString("base64")};
      this.$router.push({path: `/user/${this.username}/subscribes/following`, query: {...fromQuery}});
    }
  },
  async asyncData({ store, route }) {
    const userInfo = await store.dispatch("profiles/fetchUser", route.params.username);
    return {userInfo: {...userInfo}, userInfoSync: {...userInfo}};
  },
}
</script>

<style lang="scss" scoped>
.profile {
  padding-top: var(--header-height);
}
</style>
