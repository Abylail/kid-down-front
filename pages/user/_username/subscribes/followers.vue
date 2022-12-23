<template>
  <window-list
    type="followers"
    :username="username"
    @goBack="goBack()"
  />
</template>

<script>
import WindowList from "@/components/common/subcribers/windowList";
import {mapGetters} from "vuex";
export default {
  name: "followers",
  components: {WindowList},
  computed: {
    username() {
      return this.$route.params?.username;
    }
  },
  methods: {
    goBack() {
      this.$goBack(`/user/${this.username}`);
    }
  }
}
</script>

<style scoped>

</style>
