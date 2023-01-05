<template>
  <div class="post-page">
    <simple-header>Пост</simple-header>
    <item-skeleton v-if="isLoading" picture/>
    <div class="post-page__post" v-else>
      <item :value="postInfo"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Item from "@/components/common/feed/item";
import ItemSkeleton from "@/components/common/feed/itemSkeleton";
import SimpleHeader from "@/components/common/headers/simpleHeader";
export default {
  name: "index",
  components: {SimpleHeader, ItemSkeleton, Item},
  computed: {
    ...mapGetters({
      postInfo: "post/getPostInfo",
    }),

    // Пост кода
    postCode() {
      return this.$route.params.code;
    }
  },
  data: () => ({
    isLoading: true,
  }),
  methods: {
    ...mapActions({
      _fetchPostByCode: "post/fetchPostByCode",
    }),

    // Запросить пост
    async fetchPostByCode() {
      this.isLoading = true;
      await this._fetchPostByCode({post_code: this.postCode});
      this.isLoading = false;
    },
  },
  async fetch() {
    if (this.postInfo) this.isLoading = false;
    else await this.fetchPostByCode();
  }
}
</script>

<style lang="scss" scoped>
.post-page {
  padding-top: var(--header-height);
}
</style>
