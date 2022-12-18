<template>
  <div class="profile">
    <profile-header
      :value="userInfo"
    />
    <profile-info
      :value="userInfo"
      editable
      @editInfo="openEditInfo()"
      @editAvatar="openEditAvatar($event)"
      @editWallpaper="openEditWallpaper($event)"
      @goFollowers="$router.push('/profile/subscribes/followers')"
      @goFollowing="$router.push('/profile/subscribes/following')"
    />
    <profile-tabs v-model="activeTab" :tabs="tabs"/>

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
import {mapGetters} from "vuex";
import ProfileInfoEditModal from "@/components/common/profile/editModals/profileInfoEditModal";
import ProfileAvatarModal from "@/components/common/profile/editModals/profileAvatarModal";
import ProfileWallpaperModal from "@/components/common/profile/editModals/profileWallpaperModal";

export default {
  name: "index",
  components: {ProfileWallpaperModal, ProfileAvatarModal, ProfileInfoEditModal, ProfileTabs, ProfileInfo, ProfileHeader},
  middleware: "auth",
  computed: {
    ...mapGetters({
      userInfo: "user/getUserInfo",
    }),
  },
  data: () => ({
    activeTab: "posts",
    tabs: [
      {id: "posts", name: "Посты"},
      {id: "media", name: "Медиа"},
      {id: "likes", name: "Лайки"},
      {id: "answers", name: "Ответы"},
    ]
  }),
  methods: {
    openEditInfo() {
      this.$modal.show("profile-info-edit");
    },
    openEditAvatar(file) {
      this.$modal.show("profile-avatar", {file});
    },
    openEditWallpaper(file) {
      this.$modal.show("profile-wallpaper", {file});
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding-top: var(--header-height);
}
</style>
