<template>
  <div class="profile-feed">
    <list :isSelfProfile="isSelfUsername" :value="list" :loading="isLoading" @paginate="fetchUserFeed()"/>
  </div>
</template>

<script>
import List from "@/components/common/feed/list";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "profileFeed",
  components: {List},
  props: {
    username: {
      type: String,
    }
  },
  data: () => ({
    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      _myFeed: "profiles/feed/getMyProfileFeed",
      _otherFeed: "profiles/feed/getOtherProfileFeed",
      isAuth: "user/isAuth",
      selfUsername: "user/getUsername",
    }),

    // Список постов
    list() {
      if (this.isSelfUsername) return this._myFeed;
      return this._otherFeed;
    },

    // Свой ли аккаунт
    isSelfUsername() {
      return this.isAuth && this.username === this.selfUsername
    },
  },
  methods: {
    ...mapActions({
      _fetchUserFeed: "profiles/feed/fetchUserFeed",
    }),

    // Запросить список постов
    async fetchUserFeed(isInitial = false) {
      this.isLoading = true;
      await this._fetchUserFeed({username: this.username, isInitial});
      this.isLoading = false;
    }
  },
  created() {
    this.fetchUserFeed(true);
  }
}
</script>

<style scoped>

</style>
