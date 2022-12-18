<template>
  <window-list
    type="following"
    :username="username"
    @goBack="$router.push('/profile')"
    @goFollowers="$router.push('/profile/subscribes/followers')"
    @goFollowing="$router.push('/profile/subscribes/following')"
  />
</template>

<script>
import WindowList from "@/components/common/subcribers/windowList";
import {mapGetters} from "vuex";
export default {
  name: "following",
  components: {WindowList},
  computed: {
    ...mapGetters({
      username: "user/getUsername",
    })
  }
}
</script>

<style scoped>

</style>
