<template>
  <div class="likes-page">
    <simple-header :back-path="`/post/${postCode}`">Отметки "нравится"</simple-header>
    <div class="likes-page__list">

    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import SimpleHeader from "@/components/common/headers/simpleHeader";
export default {
  name: "likes",
  components: {SimpleHeader},
  computed: {
    // Код поста
    postCode() {
      return this.$route.params.code;
    }
  },
  methods: {
    ...mapActions({
      fetchLikes: "post/likes/fetchLikes",
    })
  },
  async fetch() {
    await this.fetchLikes({post_code: this.postCode});
  }
}
</script>

<style lang="scss" scoped>
.likes-page {
  padding-top: var(--header-height);
}
</style>
