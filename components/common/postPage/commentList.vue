<template>
  <div class="comments">
    Комменты
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "commentList",
  props: {
    postCode: {
      type: String,
    }
  },
  data: () => ({
    isLoading: true,
  }),
  methods: {
    ...mapActions({
      _fetchList: "post/comments/fetchList",
    }),

    // Запросить список коментов
    async fetchList(isInitial = false) {
      this.isLoading = true;
      await this._fetchList({postCode: this.postCode, isInitial})
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
