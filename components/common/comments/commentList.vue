<template>
  <div class="comments">
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
  }),
  methods: {
    ...mapActions({
      _fetchList: "post/comments/fetchList",
    }),

    // Запросить список коментов
    async fetchList() {
      if (!this.haveMore) return;
      this.isLoading = true;
      const list = await this._fetchList({postCode: this.postCode})
      if (list.length) this.list = [...list];
      else this.haveMore = false;
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
}
</style>
