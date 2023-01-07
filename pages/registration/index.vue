<template>
  <div class="registration-page">
    <div class="registration-page__go-back" @click="goMain()"><base-icon>mdi-chevron-left</base-icon>Главная</div>
    <div class="registration-page__form">
      <h1 class="registration-page__title">Регистрация в tok</h1>
      <base-input title="Логин" v-model="form.login"/>
      <base-input title="Пароль" v-model="form.password" type="password"/>
      <base-input title="Повторите пароль" v-model="form.passwordRepeat" type="password"/>
      <base-button class="registration-page__submit" :loading="isLoading" type="primary" @click="submitForm()">Зарегестрироваться</base-button>
      <div class="registration-page__extra">Если есть учетка <nuxt-link to="/login">войдите</nuxt-link></div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import BaseIcon from "@/components/base/BaseIcon";
import {mapActions} from "vuex";
export default {
  name: "index",
  components: {BaseIcon, BaseButton, BaseInput},
  middleware: "antiAuth",
  data: () => ({
    // Форма для регсистрации
    form: {
      login: null,
      password: null,
      passwordRepeat: null,
    },

    isLoading: false,
  }),
  methods: {
    ...mapActions({
      _registration: "user/registration",
    }),
    // Перейти на главую
    goMain() {
      this.$router.push("/");
    },

    // Валидация (true -> okay)
    validate() {
      return true;
    },

    // Очистить (на неудаче)
    clear() {
      this.form.password = null;
      this.form.passwordRepeat = null;
    },

    // Отправить форму
    async submitForm() {
      this.isLoading = true;
      if (this.validate()) {
        const isSuccess = await this._registration({
          username: this.form.login,
          password: this.form.password,
          re_password: this.form.passwordRepeat,
        })
        if (isSuccess) this.$router.push(this.$route.query?.redirect || "/");
        this.clear();
      }
      this.isLoading = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.registration-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;

  &__form {
    padding: 0 40px;
    width: 100%;
  }

  &__title {
    font-size: var(--font-size-title);
    margin-bottom: 25px;
  }

  &__submit {
    margin-top: 15px;
  }

  &__extra {
    margin-top: 20px;
    text-align: center;
    color: var(--text-color-secondary);
    font-size: var(--font-size-mini);
  }

  &__go-back {
    position: absolute;
    top: 20px;
    left: 40px;
    display: flex;
    align-items: center;
    font-size: var(--font-size-mini);
  }
}
</style>
