<template>
  <div class="likes-page">
    <simple-header :back-path="`/post/${postCode}`">Отметки "нравится"</simple-header>
    <div class="likes-page__list">
      <user-item
        v-for="user in userList" :key="user.username"
        :value="user"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SimpleHeader from "@/components/common/headers/simpleHeader";
import UserItem from "@/components/common/userList/userItem";
export default {
  name: "likes",
  components: {UserItem, SimpleHeader},
  computed: {
    ...mapGetters({
      userList: "post/likes/getLikes",
    }),
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
