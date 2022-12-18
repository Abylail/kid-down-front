<template>
  <div class="profile-info">

    <!-- WALLPAPER -->
    <div class="profile-info__wallpaper" :style="wallpaperStyles">
      <div class="profile-info__edit-wallpaper" v-if="editable" @click="editWallpaperHandle()"><base-icon size="18">mdi-camera</base-icon></div>
    </div>

    <!-- AVATAR + SUBSCRIBERS -->
    <div class="profile-info__header">
      <div class="profile-info__avatar" :style="avatarStyles">
        <div class="profile-info__edit-avatar" v-if="editable" @click="editAvatarHandle()"><base-icon size="16">mdi-camera</base-icon></div>
      </div>
      <div class="profile-info__subscribers" @click="$emit('goFollowers')">{{ subscriptions.subscriber_count }} подписчиков</div>
      <div class="profile-info__subscribers" @click="$emit('goFollowing')">{{ subscriptions.subscription_count }} подписок</div>
    </div>

    <!-- NAME + USERNAME -->
    <div class="profile-info__name-block">
      <div class="profile-info__name-info">
        <div class="profile-info__name">{{ value.name }}</div>
        <div class="profile-info__username">@{{ value.username }}</div>
      </div>

      <!-- Правая часть -->
      <div class="profile-info__name-edit" v-if="editable" @click="editInfoHandle()">Редактировать</div>
      <div class="profile-info__name-follow" v-else>
        <base-button size="mini" :type="subscribeButtonType" @click="subscribeToggleHandle()">{{ subscribeButtonText }}</base-button>
      </div>
    </div>

    <!-- DESCRIPTION -->
    <div class="profile-info__description-block">
      <div class="profile-info__description">{{ value.bio }}</div>
    </div>

    <!-- Инпут для фоток -->
    <input
      class="profile-info__avatar-photo-input"
      v-if="editable"
      v-show="false"
      type="file"
      ref="avatarUpload"
      accept=".png,.jpg,.jpeg,.svg"
      @input="editAvatar"
    />
    <input
      class="profile-info__wallpaper-photo-input"
      v-if="editable"
      v-show="false"
      type="file"
      ref="wallpaperUpload"
      accept=".png,.jpg,.jpeg,.svg"
      @input="editWallpaper"
    />

  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import BaseButton from "@/components/base/BaseButton";
import {mapGetters} from "vuex";
export default {
  name: "info",
  components: {BaseButton, BaseIcon},
  props: {
    value: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
    avatarStyles() {
      if (this.value.avatar) {
        return {backgroundImage: `url(${process.env.CDN_URL + this.value.avatar})`}
      }
      return {}
    },
    wallpaperStyles() {
      if (this.value.wallpaper) {
        return {backgroundImage: `url(${process.env.CDN_URL + this.value.wallpaper})`}
      }
      return {}
    },
    subscriptions() {
      return this.value.subscriptions || {};
    },
    subscribeButtonType() {
      if (this.value.my_subscription) return "default";
      return "primary"
    },
    subscribeButtonText() {
      if (this.value.my_subscription) return "Вы подписаны";
      return "Подписаться"
    }
  },
  methods: {
    // Редактивать информацию кнопка (имя + описание)
    editInfoHandle() {
      this.$emit("editInfo");
    },

    // Редактивать аватар кнопка
    editAvatarHandle() {
      this.$refs.avatarUpload.click();
    },
    // Редактировать аватар инпут
    editAvatar(event) {
      this.$emit("editAvatar", event.target.files[0])
    },

    // Редактивать обои кнопка
    editWallpaperHandle() {
      this.$refs.wallpaperUpload.click();
    },
    // Редактивать обои инпут
    editWallpaper(event) {
      this.$emit("editWallpaper", event.target.files[0])
    },

    // Подписаться/отписаться
    subscribeToggleHandle() {
      if (this.isAuth) this.$emit("subscribeToggle");
      else this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  }
}
</script>

<style lang="scss" scoped>
$side-padding-size: 20px;
.profile-info {

  &__wallpaper {
    position: relative;
    min-height: 125px;
    width: 100%;
    background: var(--background-color-secondary);
    background-size: cover;
    background-position: center;
  }

  &__edit-wallpaper {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: var(--background-color-extra);
    border-radius: 50%;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 $side-padding-size;
  }

  &__avatar {
    background: var(--background-color-secondary);
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-top: -50px;
    border: 4px solid var(--background-color-primary);
    position: relative;
    z-index: 1;
    background-size: cover;
    background-position: center;
  }

  &__edit-avatar {
    position: absolute;
    bottom: 5px;
    left: -5px;
    background: var(--background-color-extra);
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__subscribers {
    font-size: var(--font-size-subtext);
    color: var(--text-color-secondary)
  }

  &__name-block {
    margin-top: 10px;
    padding: 0 $side-padding-size;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__name {
    font-size: var(--font-size-subtitle);
  }

  &__name-edit {
    font-size: var(--font-size-mini);
    color: var(--text-color-secondary);
    background: var(--background-color-secondary);
    height: min-content;
    padding: 4px 8px;
    border-radius: 4px;
  }

  &__name-follow {
    height: min-content;
  }

  &__username {
    color: var(--text-color-secondary);
  }

  &__description-block {
    margin-top: 10px;
    padding: 0 $side-padding-size;
  }

  &__description {
    color: var(--text-color-extra);
    font-size: var(--font-size-subtext);
    line-height: 22px;
  }

}
</style>
