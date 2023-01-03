<template>
  <div class="login-page" @keyup.enter="submitForm()">
    <div class="login-page__go-back" @click="goMain()"><base-icon>mdi-chevron-left</base-icon>Главная</div>
    <div class="login-page__form">
      <h1 class="login-page__title">Вход в tok</h1>
      <base-input title="Логин" ref="login" v-model="form.login"/>
      <base-input title="Пароль" v-model="form.password" type="password"/>
      <base-button class="login-page__submit" :loading="isLoading" type="primary" @click="submitForm()">Войти</base-button>
      <div class="login-page__extra">Если нет учетки, можно и <nuxt-link to="/registration">зарегестрироваться</nuxt-link></div>
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
  data: () => ({
    // Форма для входа
    form: {
      login: null,
      password: null,
    },

     isLoading: false,
  }),
  methods: {
    ...mapActions({
      _login: "user/login",
    }),
    // Перейти на главую
    goMain() {
      this.$router.push("/");
    },

    // Валидация (true -> okay)
    validate() {
      if (!this.form.login || !this.form.password) return false;
      return true;
    },

    // Очистить (на неудаче)
    clear() {
      this.form.password = null;
    },

    // Отправить форму
    async submitForm() {
      this.isLoading = true;
      if (this.validate()) {
        const isSuccess = await this._login({
          username: this.form.login,
          password: this.form.password
        })
        if (isSuccess) this.$router.push(this.$route.query?.redirect || "/");
        this.clear();
      }
      this.isLoading = false;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.login.$focus();
    }, 400);
  }
}
</script>

<style lang="scss" scoped>
.login-page {
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
