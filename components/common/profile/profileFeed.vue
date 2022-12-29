<template>
  <div class="profile-feed">
    <list :value="list"/>
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
    // Список постов
    list: [],
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      _myList: "feed/getMyProfileList",
      isAuth: "user/isAuth",
      selfUsername: "user/getUsername",
    }),

    isSelfUsername() {
      return this.isAuth && this.username === this.selfUsername
    },
  },
  methods: {
    ...mapActions({
      _fetchUserList: "feed/fetchUserList",
    }),

    // Запросить список
    async fetchUserList() {
      this.isLoading = true;
      this.list = await this._fetchUserList(this.username);
      this.isLoading = false;
    }
  },
  mounted() {
    this.fetchUserList();
  }
}
</script>

<style scoped>

</style>
