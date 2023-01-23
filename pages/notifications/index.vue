<template>
  <div class="notifications">
    <simple-header>Уведомления</simple-header>

    <div class="notifications__list">
      <div class="notifications__item" v-for="(notify, index) in list" :key="index">
        <div class="notifications__avatar" v-if="notify.action_author" :style="{backgroundImage: `url(${CDN_URL+notify.user.avatar})`}" @click="goAuthor(notify)"/>
        <div class="notifications__info-wrapper">
          <span class="notifications__username" @click="goAuthor(notify)">{{ notify.action_author }}</span>

          <!-- post_like -->
          <span v-if="notify.action_code === 'post_like'">
            нравится ваш
            <nuxt-link class="notifications__link" :to="`/post/${notify.action_body.post.code}`">пост</nuxt-link>
          </span>

          <span class="notifications__date">{{ notify.created_at | timeAgoMini }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/common/headers/simpleHeader";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "index",
  components: {SimpleHeader},
  middleware: "auth",
  data: () => ({
    CDN_URL: process.env.CDN_URL,

    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      list: "user/notifications/getList",
    })
  },
  methods: {
    ...mapActions({
      _fetchList: "user/notifications/fetchList",
    }),

    // Запросить список уведомлений
    async fetchList() {
      this.isLoading = true;
      await this._fetchList();
      this.isLoading = false;
    },

    // Перейти в аккаунт автора
    goAuthor(notify) {
      this.$router.push(`/user/${notify.action_author}`)
    },
  },
  mounted() {
    this.fetchList();
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  padding-top: var(--header-height);

  &__item {
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-top: 20px;
  }

  &__avatar {
    display: inline-block;
    height: 30px;
    width: 30px;
    background-size: cover;
    background-position: center;
    border-radius: 100%;
    margin-right: 10px;
  }

  &__info-wrapper {
    display: inline-block;
    height: 100%;
    font-size: var(--font-size-subtext);
  }

  &__username {
    font-weight: bold;
  }

  &__date {
    color: var(--text-color-extra);
    font-size: var(--font-size-nano);
  }

  &__link {
    color: var(--color-blue);
    text-decoration: none;
  }
}
</style>
