<template>
  <div class="comment-input">
    <slot name="activator" :activator="showBackdropHandle">
      <div class="comment-input__fake-input" @click="showBackdropHandle()">Добавить комментарий</div>
    </slot>

    <base-backdrop :active.sync="showBackdrop" full-page>
      <div class="comment-input__backdrop">
        <div class="comment-input__backdrop-head" v-if="isCommentOnComment">
          <comment-info :value="commentInfo"/>
        </div>
        <div class="comment-input__main">
          <base-textarea title="Ваш ответ" v-model="commentText" ref="commentInput" rows="3" background no-border/>
          <base-button type="primary" @click="sendCommentHandle()">Отправить</base-button>
        </div>
      </div>
    </base-backdrop>
  </div>
</template>

<script>
import BaseBackdrop from "@/components/base/BaseBackdrop";
import BaseTextarea from "@/components/base/BaseTextarea";
import BaseButton from "@/components/base/BaseButton";
import CommentInfo from "@/components/common/comments/commentInfo";

export default {
  name: "commentInput",
  components: {CommentInfo, BaseButton, BaseTextarea, BaseBackdrop},
  props: {
    commentInfo: { // Информация о коменте на который отвечают
      type: Object,
      default: null
    },
    postInfo: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    // Показать бэкдроп ?
    showBackdrop: false,

    // Текст комента
    commentText: null,
  }),
  computed: {
    // Ответ на коммент ?
    isCommentOnComment() {
      return !!this.commentInfo;
    },

    // Ответ на пост ?
    isPostComment() {
      return !!this.postInfo;
    }
  },
  watch: {
    showBackdrop(val) {
      this.commentText = null;
      if (val) this.$nextTick(() => this.$refs.commentInput.$focus());
    }
  },
  methods: {
    showBackdropHandle() {
      this.showBackdrop = true;
    },

    // Валидация
    validate() {
      if (!this.commentText) {
        // Алерт
        return false;
      }
      return true;
    },

    // Отправить кнопка
    sendCommentHandle() {
      if (this.isCommentOnComment) {
        this.$toast("Еще в разработке)");
        return;
      }
      if (!this.validate()) return;
      this.$emit("send", this.commentText);
      this.$nextTick(() => {this.showBackdrop = false});
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-input {

  &__fake-input {
    height: 30px;
    line-height: 30px;
    font-size: var(--font-size-mini);
    color: var(--text-color-extra);
    margin: 0 15px 15px;
    padding: 0 15px;
    border: 1px solid var(--text-color-extra);
    border-radius: 30px;
    background: var(--background-color-primary);
  }

  &__backdrop {
    position: relative;
  }

  &__backdrop-head {
    padding: 15px 15px 0;
  }

  &__backdrop-title {
    font-size: var(--font-size-subtitle);
    padding: 0 15px;
  }

  &__main {
    padding: 0 15px;
  }

}
</style>
