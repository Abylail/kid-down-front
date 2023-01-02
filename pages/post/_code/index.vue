<template>
  <div class="post-page">
    <post-page-header/>
    <item :value="postInfo"/>
  </div>
</template>

<script>
import PostPageHeader from "@/components/common/postPage/postPageHeader";
import {mapGetters} from "vuex";
import Item from "@/components/common/feed/item";
export default {
  name: "index",
  components: {Item, PostPageHeader},
  computed: {
    ...mapGetters({
      postInfo: "post/getPostInfo",
    })
  }
}
</script>

<style lang="scss" scoped>
.post-page {
  padding-top: var(--header-height);
}
</style>
