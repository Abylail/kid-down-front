<template>
  <div class="create-post">

    <div class="create-post__step-loader" v-if="isLoading">Представьте загрузку...</div>

    <!-- ПЕРВЫЙ ШАГ (Создание поста) -->
    <div class="create-post__step-1" v-else-if="step === 1">
      <create-post-header title="Создание поста" @goBack="$goBack('/')"/>

      <base-textarea
        title="Ваш пост"
        v-model="form.text"
        ref="text"
        rows="5"
        background no-border
      />

      <picture-upload v-model="form.picture"/>

      <fade>
        <base-button
          class="create-post__submit"
          size="big"
          type="primary"
          v-if="canSecondStep"
          @click="goSecondStep()"
        >Далее</base-button>
      </fade>
    </div>

    <!-- ВТОРОЙ ШАГ (выбор категории поста) -->
    <div class="create-post__step-2" v-else-if="step === 2">
      <create-post-header title="Выбор категории поста" @goBack="step = 1"/>

      <base-input
        title="Введите название категории или выберите"
        v-model="form.custom_category"
        ref="categoryInput"
      />

      <fade>
        <base-button
          class="create-post__submit"
          size="big"
          type="primary"
          v-if="canCreatePost"
          @click="submitPostHandle()"
        >Закинуть</base-button>
      </fade>
    </div>
  </div>
</template>

<script>
import CreatePostHeader from "@/components/common/createPost/createPostHeader";
import BaseTextarea from "@/components/base/BaseTextarea";
import BaseButton from "@/components/base/BaseButton";
import PictureUpload from "@/components/common/createPost/pictureUpload";
import Fade from "@/components/transitions/fade";
import {mapActions} from "vuex";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "create",
  components: {BaseInput, PictureUpload, BaseButton, BaseTextarea, CreatePostHeader, Fade},
  middleware: "auth",
  data: () => ({

    // Форма для создания поста
    form: {
      text: null,
      picture: null, // {name, buffer}
      custom_category: null,
      category_code: "memy",
    },

    step: 1,

    categoryList: [],

    isLoading: false,

    isCategoryLoading: false,
  }),
  computed: {
    // Может ли перейти к след шагу
    canSecondStep() {
      return !!this.form.text;
    },

    // Можно ли создать пост
    canCreatePost() {
      return true;
    },
  },
  watch: {
    "form.custom_category"(val) {
      this.fetchCategories();
    }
  },
  methods: {
    ...mapActions({
      _createPost: "feed/createPost",
      _fetchCategories: "feed/categories/fetchCategories",
    }),

    // Получить список категорий
    async fetchCategories() {
      this.isCategoryLoading = true;
      this.categoryList = await this._fetchCategories(this.custom_category);
      this.isCategoryLoading = false;
    },

    // Перейти на след шаг
    goSecondStep() {
      this.step = 2;
      this.$nextTick(() => {
        this.$refs.categoryInput.$focus();
      })
    },

    // Закинуть пост
    async submitPostHandle() {
      this.isLoading = true;
      await this._createPost(this.form);
      this.$router.push("/");
      this.isLoading = false;
    }
  },
  mounted() {
    this.$refs.text.$focus();
    this.fetchCategories();
  }
}
</script>

<style lang="scss" scoped>
.create-post {
  padding: var(--header-height) 15px 100px;

  &__submit {
    position: fixed;
    bottom: 30px;
    margin: 0 15px;
    left: 0;
    width: calc(100% - 30px);
  }

  &__step-loader {
    padding-top: 100px;
    text-align: center;
  }
}
</style>
