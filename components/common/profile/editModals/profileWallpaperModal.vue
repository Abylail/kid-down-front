<template>
  <base-modal-wrapper name="profile-wallpaper" title="Обои" close-button @onShow="initCropper()">
    <div class="profile-wallpaper">
      <div class="profile-wallpaper__image-wrapper" ref="wrapper">
        <img class="profile-wallpaper__image" alt="wallpaper" ref="image">
      </div>
      <div class="profile-wallpaper__actions">
        <base-button min-content @click="closeSelf">Отмена</base-button>
        <base-button type="primary" :loading="isLoading" min-content @click="saveHandle">Сохранить</base-button>
      </div>
    </div>
  </base-modal-wrapper>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import BaseModalWrapper from "@/components/base/BaseModalWrapper";
import BaseButton from "@/components/base/BaseButton";
import {mapActions} from "vuex";
export default {
  name: "profileWallpaperModal",
  components: {BaseButton, BaseModalWrapper},
  data: () => ({
    // Вложения
    payload: null,

    // Cropper.js
    cropper: null,

    isLoading: false,
  }),
  methods: {
    ...mapActions({
      _saveProfileWallpaper: "user/saveProfileWallpaper",
    }),

    // Закрыться
    closeSelf() {
      this.$modal.hide("profile-wallpaper");
    },

    // Сохранить
    async saveHandle() {
      this.isLoading = true;
      const isSuccess = await this._saveProfileWallpaper({
        name: this.$modal.$payload?.file?.name || "",
        buffer: this.cropper.getCroppedCanvas().toDataURL().split(",")[1]
      });
      if (isSuccess) this.closeSelf();
      this.isLoading = false;
    },

    // Инициализировать кроппер
    initCropper() {
      this.$refs.image.src = URL.createObjectURL(this.$modal.$payload.file);
      this.cropper = new Cropper(this.$refs.image, {
        aspectRatio: 3,
        zoomable: false,
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.profile-wallpaper {

  &__image-wrapper {
    margin-top: 30px;
  }

  &__image {
    display: block;
    max-width: 100%;
    max-height: 60vh;
  }

  &__actions {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    & > :first-child {
      margin-right: 10px;
    }
  }

}
</style>
