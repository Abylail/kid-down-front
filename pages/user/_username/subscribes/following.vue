<template>
  <window-list
    type="following"
    :username="username"
    @goBack="goBack()"
  />
</template>

<script>
import WindowList from "@/components/common/subcribers/windowList";
import {mapGetters} from "vuex";
export default {
  name: "following",
  components: {WindowList},
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  methods: {
    goBack() {
      const from = this.$route.query?.from && Buffer.from(this.$route.query.from, 'base64').toString('ascii')
      this.$router.push(from || `/user/${this.username}`);
    }
  }
}
</script>

<style scoped>

</style>
