<template>
  <div class="feed">

    <nuxt-link class="feed__create" to="/post/create">
      создать пост
      <base-icon>mdi-pencil-box-outline</base-icon>
    </nuxt-link>

    <list :value="list"/>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapActions, mapGetters} from "vuex";
import List from "@/components/common/feed/list";
export default {
  name: "feed",
  components: {List, BaseIcon},
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      list: "feed/getMainList",
    }),
  },
  methods: {
    ...mapActions({
      _fetchMainFeed: "feed/fetchMainFeed",
    }),

    // Получить ленту
    async fetchMainFeed() {
      this.isLoading = true;
      await this._fetchMainFeed();
      this.isLoading = false;
    }
  },
  mounted() {
    this.fetchMainFeed();
  }
}
</script>

<style lang="scss" scoped>
.feed {

  &__create {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    padding: 8px 8px;
    border-radius: 5px;
    background: var(--background-color-secondary);
    color: var(--text-color-secondary);
    font-size: var(--font-size-subtext);
    text-decoration: none;
    text-align: center;
  }

}
</style>
