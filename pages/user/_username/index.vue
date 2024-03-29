<template>
  <div class="profile">
    <profile-header :value="userInfo"/>
    <profile-info
      :value="userInfo"
      :editable="isSelfAccount"
      @editInfo="openEditInfo()"
      @editAvatar="openEditAvatar($event)"
      @editWallpaper="openEditWallpaper($event)"
      @subscribeToggle="subscribeToggle()"
      @goFollowers="goFollowers()"
      @goFollowing="goFollowing()"
    />
<!--    <profile-tabs v-model="activeTab" :tabs="tabs"/>-->
    <profile-tabs-content :value="activeTab" :tabs="tabs">
      <template v-slot:posts>
        <nuxt-link v-if="isSelfAccount" class="profile__create-post" to="/post/create?redirect=/user">
          создать пост
          <base-icon>mdi-pencil-box-outline</base-icon>
        </nuxt-link>
        <profile-feed :username="username"/>
      </template>
    </profile-tabs-content>

    <!-- Модалки -->
    <profile-info-edit-modal/>
    <profile-avatar-modal/>
    <profile-wallpaper-modal/>
  </div>
</template>

<script>
import ProfileHeader from "@/components/common/profile/profileHeader";
import ProfileInfo from "@/components/common/profile/profileInfo";
import ProfileTabs from "@/components/common/profile/profileTabs";
import {mapActions, mapGetters} from "vuex";
import ProfileInfoEditModal from "@/components/common/profile/editModals/profileInfoEditModal";
import ProfileAvatarModal from "@/components/common/profile/editModals/profileAvatarModal";
import ProfileWallpaperModal from "@/components/common/profile/editModals/profileWallpaperModal";
import ProfileTabsContent from "@/components/common/profile/profileTabsContent";
import ProfileFeed from "@/components/common/profile/profileFeed";
import BaseIcon from "@/components/base/BaseIcon";

export default {
  components: {
    BaseIcon,
    ProfileFeed,
    ProfileTabsContent,
    ProfileWallpaperModal, ProfileAvatarModal, ProfileInfoEditModal, ProfileTabs, ProfileHeader, ProfileInfo},
  data: () => ({
    // Информация пользователя
    userInfo: {},

    // Синхронизированный с бэком (нужен для подписок)
    userInfoSync: {},

    activeTab: "posts",

    subscribeTimeout: null,
  }),
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
      selfUsername: "user/getUsername",
      selfUserInfo: "user/getUserInfo",
    }),
    isSelfAccount() {
      return this.isAuth && this.selfUsername === this.username;
    },
    username() {
      return this.$route.params?.username;
    },
    tabs() {
      if (this.isSelfAccount) return [
        {id: "posts", name: "Посты"},
        {id: "media", name: "Медиа"},
        {id: "likes", name: "Лайки"},
        {id: "answers", name: "Ответы"}
      ]
      return [
        {id: "posts", name: "Посты"},
        {id: "media", name: "Медиа"},
      ]
    },
  },
  watch: {
    selfUserInfo(val) {
      if (this.isSelfAccount) {
        this.userInfo = val;
        this.userInfoSync = val;
      }
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
      this.$router.push({path: `/user/${this.username}/subscribes/followers`});
    },

    // Перейти в подписки
    goFollowing() {
      this.$router.push({path: `/user/${this.username}/subscribes/following`});
    },

    openEditInfo() {
      this.$modal.show("profile-info-edit");
    },
    openEditAvatar(file) {
      this.$modal.show("profile-avatar", {file});
    },
    openEditWallpaper(file) {
      this.$modal.show("profile-wallpaper", {file});
    },
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

  &__create-post {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    padding: 8px 8px;
    border-radius: 5px;
    background: var(--background-color-secondary);
    color: var(--text-color-secondary);
    font-size: var(--font-size-subtext);
    line-height: var(--font-size-text);
    text-decoration: none;
    text-align: center;
  }
}
</style>
