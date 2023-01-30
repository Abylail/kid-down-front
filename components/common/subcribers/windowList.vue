<template>
  <div class="window-list">
    <subscribes-header :title="title" :count="list.length" @goBack="$emit('goBack')"/>
    <div class="window-list__list">
      <user-item
        v-for="item in list" :key="item.username"
        :value="item"
      />
    </div>
  </div>
</template>

<script>
import SubscribesHeader from "@/components/common/subcribers/subscribesHeader";
import {mapActions, mapGetters} from "vuex";
import UserItem from "@/components/common/userList/userItem";
export default {
  name: "windowList",
  components: {UserItem, SubscribesHeader},
  props: {
    type: {
      type: String,
      required: true,
      validator: t => ["followers", "following"].includes(t),
    },
    username: {
      type: String
    }
  },
  data: () => ({
    // Список
    list: [],

    // Список синхронизированный с бэком
    listSync: [],

    subscribeTimeout: null,

    isLoading: false
  }),
  computed: {
    ...mapGetters({
      selfUsername: "user/getUsername",
    }),
    isFollowersList() {
      return this.type === "followers";
    },
    isFollowingList() {
      return this.type === "following";
    },
    title() {
      if (this.isFollowingList) return "Подписки";
      if (this.isFollowersList) return "Подписчики";
      return "";
    }
  },
  methods: {
    ...mapActions({
      _fetchFollowing: "profiles/subscribers/fetchFollowing",
      _fetchFollowers: "profiles/subscribers/fetchFollowers",
      _subscribe: "user/subscribe",
      _unsubscribe: "user/unsubscribe",
    }),

    // Получить список
    async fetchList() {
      this.isLoading = true;
      if (this.isFollowersList) this.list = await this._fetchFollowers(this.username);
      else if (this.isFollowingList) this.list = await this._fetchFollowing(this.username);
      this.listSync = JSON.parse(JSON.stringify(this.list));
      this.isLoading = false;
    }
  },
  async created() {
    await this.fetchList();
  },
}
</script>

<style lang="scss" scoped>
.window-list {
  padding-top: var(--header-height);
}
</style>
