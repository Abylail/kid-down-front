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
        class="create-post__category-input"
      />

      <!-- Список категорий -->
      <div class="create-post__category-list">
        <div
          class="create-post__category-item create-post__category-custom"
          v-if="canCreateCustom"
          @click="selectCustomCategory()"
        >Запостить с категорией "{{ form.custom_category }}"</div>
        <div
          class="create-post__category-item"
          v-for="category in categoryList" :key="category.code"
          @click="selectCategory(category)"
        >{{ category.name }}</div>
      </div>

<!--      <fade>-->
<!--        <base-button-->
<!--          class="create-post__submit"-->
<!--          size="big"-->
<!--          type="primary"-->
<!--          v-if="canCreatePost"-->
<!--          @click="submitPostHandle()"-->
<!--        >Закинуть</base-button>-->
<!--      </fade>-->
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

    // Шаг создания
    step: 1,

    // Список категорий
    categoryList: [],

    // Таймаут для поиска категорий
    categorySearchTimout: null,

    // Лоудер для поста
    isLoading: false,

    // Лоудер поиска категорий
    isCategoryLoading: false,
  }),
  computed: {
    // Может ли перейти к след шагу
    canSecondStep() {
      return !!this.form.text;
    },

    // Можно ли создать кастомную категорию
    canCreateCustom() {
      return this.form.custom_category && this.form.custom_category.length > 2 && !this.categoryList.some(({name}) => name === this.form.custom_category);
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
    fetchCategories() {
      this.isCategoryLoading = true;
      clearTimeout(this.categorySearchTimout);
      this.categorySearchTimout = setTimeout(async () => {
        this.categoryList = await this._fetchCategories(this.form.custom_category);
        this.isCategoryLoading = false;
      }, 200);
    },

    // Перейти на след шаг
    goSecondStep() {
      this.step = 2;
      this.$nextTick(() => {
        this.$refs.categoryInput.$focus();
      })
    },

    // Выбрать кастомную
    selectCustomCategory() {
      this.submitPost();
    },

    // Выбрать категорию
    selectCategory(category) {
      this.form.custom_category = null;
      this.form.category_code = category.code;
      this.submitPost();
    },

    // Закинуть пост
    async submitPost() {
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
  padding: var(--header-height) 0 100px;

  &__submit {
    position: fixed;
    bottom: 30px;
    margin: 0 15px;
    left: 0;
    width: calc(100% - 30px);
  }

  &__step-1 {
    padding: 0 15px;
  }

  &__step-loader {
    padding-top: 100px;
    text-align: center;
  }

  &__category-input {
    margin-right: 15px;
    margin-left: 15px;
  }

  &__category-item {
    padding: 10px;
    color: var(--color-blue);
    border-bottom: 1px solid var(--text-color-primary);
    &:first-child {
      border-top: 1px solid var(--text-color-primary);
    }
  }

  &__category-custom {

  }
}
</style>
