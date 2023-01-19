<template>
  <div class="comments">
    <base-loader class="comments__loader" v-if="isLoadingNewComment" color-reverse/>
    <comment-item
      v-for="comment in list" :key="comment.comment_code"
      :value="comment"
      :post-code="postCode"
    />
  </div>
</template>

<script>
import {mapActions} from "vuex";
import BaseLoader from "@/components/base/BaseLoader";
import CommentItem from "@/components/common/comments/commentItem";

export default {
  name: "commentList",
  components: {CommentItem, BaseLoader},
  props: {
    postCode: {
      type: String,
    }
  },
  data: () => ({
    // Список коментов
    list: [],

    page: 1,

    haveMore: true,

    isLoading: true,

    isLoadingNewComment: false,
  }),
  methods: {
    ...mapActions({
      _fetchList: "post/comments/fetchList",
      _sendComment: "post/comments/sendComment",
    }),

    // Запросить список коментов
    async fetchList() {
      if (!this.haveMore) return;
      this.isLoading = true;
      const list = await this._fetchList({postCode: this.postCode})
      if (list.length) this.list = [...list];
      else this.haveMore = false;
      this.isLoading = false;
    },

    // Оставить коммент
    // commentInfo - {text}
    async $sendComment({commentInfo, parentInfo = null}) {
      this.isLoading = true;
      const newComment = await this._sendComment({
        post_code: this.postCode,
        comment_text: commentInfo.text,
        first_comment: !!this.list.length,
      });
      if (newComment) this.list.unshift(newComment);
      this.isLoading = false;
    }
  },
  mounted() {
    this.fetchList(true);
  }
}
</script>

<style lang="scss" scoped>
.comments {
  padding: 0 15px;

  &__loader {
    display: block;
    margin: 0 auto;
  }
}
</style>
