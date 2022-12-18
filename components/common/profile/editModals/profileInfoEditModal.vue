<template>
  <base-modal-wrapper name="profile-info-edit" title="Редактирование профиля" close-button @onShow="getInfo()">
    <div class="profile-info-edit">

      <div class="profile-info-edit__form">
        <base-input
          title="Имя"
          v-model="form.name"
        />
        <base-textarea
          title="Описание"
          v-model="form.bio"
        />
      </div>

      <div class="profile-info-edit__actions">
        <base-button min-content @click="closeSelf">Отмена</base-button>
        <base-button type="primary" :loading="isLoading" min-content @click="saveHandle">Сохранить</base-button>
      </div>
    </div>
  </base-modal-wrapper>
</template>

<script>
import BaseModalWrapper from "@/components/base/BaseModalWrapper";
import BaseInput from "@/components/base/BaseInput";
import {mapActions, mapGetters} from "vuex";
import BaseTextarea from "@/components/base/BaseTextarea";
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "profileInfoEditModal",
  components: {BaseButton, BaseTextarea, BaseInput, BaseModalWrapper},
  data: () => ({
    // Форма сохранения профиля
    form: {
      name: null,
      bio: null,
    },

    isLoading: false
  }),
  computed: {
    ...mapGetters({
      userInfo: "user/getUserInfo",
    })
  },
  methods: {
    ...mapActions({
      _saveInfo: "user/saveProfileInfo",
    }),

    // Получить информацию для
    getInfo() {
      this.form = JSON.parse(JSON.stringify(this.userInfo));
    },

    // Отменить (кнопка)
    closeSelf() {
      this.$modal.hide("profile-info-edit");
    },

    // Сохранить кнопка
    async saveHandle() {
      this.isLoading = true;
      if (this.validate()) {
        const isSuccess = await this._saveInfo({
          name: this.form.name,
          bio: this.form.bio,
        })
        if (isSuccess) this.closeSelf();
      }
      this.isLoading = false;
    },

    validate() {
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info-edit {
  color: var(--text-color-primary);

  &__form {
    margin-top: 30px;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: right;
    & > :first-child {
      margin-right: 10px;
    }
  }
}
</style>
