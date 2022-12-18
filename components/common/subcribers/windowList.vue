<template>
  <div class="window-list">
    <subscribes-header :title="title" :count="list.length" @goBack="$emit('goBack')"/>
    <div class="window-list__list">
      <account-item
        v-for="item in list" :key="item.username"
        :value="item"
        @subscribeToggle="subscribeToggle(item)"
      />
    </div>
  </div>
</template>

<script>
import SubscribesHeader from "@/components/common/subcribers/subscribesHeader";
import {mapActions, mapGetters} from "vuex";
import AccountItem from "@/components/common/subcribers/accountItem";
export default {
  name: "windowList",
  components: {AccountItem, SubscribesHeader},
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

    // Подписка/отписка
    subscribeToggle(item) {
      this.setSubscribe(item);
      clearTimeout(this.subscribeTimeout);
      this.subscribeTimeout = setTimeout(async () => {
        if (item.subscribed === this.getListSyncValue(item).subscribed) return;
        let isSubscribed = null;
        if (item.subscribed) isSubscribed = await this._subscribe(item.username);
        else isSubscribed = await this._unsubscribe(item.username);
        this.setSubscribeSync(item, isSubscribed);
        this.list = JSON.parse(JSON.stringify(this.listSync));
      }, 500);
    },

    // Вставить подписание
    setSubscribe(item) {
      item.subscribed = !item.subscribed;
    },

    // Получить значение из синхронизированного списка
    getListSyncValue(item) {
      return this.listSync.find(listItem => listItem.username === item.username);
    },

    // Вставить подписание синхронизированное с бэком
    setSubscribeSync(item, value) {
      this.listSync.find(listItem => listItem.username === item.username).subscribed = value;
    },

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
