<template>
  <div class="notification-tool">
    <base-icon class="notification-tool__icon" size="24" @click="goNotifications()">mdi-bell-outline</base-icon>
    <div class="notification-tool__marker" v-if="count"/>

    <fade>
      <div class="notification-tool__push-wrapper" v-if="showPush" @click="showPush = false">
        <div class="notification-tool__push">{{ count }}</div>
      </div>
    </fade>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import Fade from "@/components/transitions/fade";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "notificationTool",
  components: {BaseIcon, Fade},
  data: () => ({
    // Показывать ли пуш
    showPush: false
  }),
  computed: {
    ...mapGetters({
      count: "user/notifications/getNewCount",
      isPushShowed: "user/notifications/getIsPushShowed",
    })
  },
  watch: {
    count: {
      handler(val) {
        if (val && !this.isPushShowed) setTimeout(() => this.showPushHandle(), 1000);
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      _fetchCount: "user/notifications/fetchNewCount",
      _pushShowed: "user/notifications/pushShowed",
    }),

    // Перейти в нотификации
    goNotifications() {
      this.$router.push("/notifications");
    },

    // Показать пуш
    showPushHandle() {
      this._pushShowed();
      this.showPush = true;
      setTimeout(() => {
        this.showPush = false;
      }, 5000)
    }
  },
  mounted() {
    if (!this.count) this._fetchCount();
  }
}
</script>

<style lang="scss" scoped>
$push-color: var(--color-red);
$push-width: 40px;
.notification-tool {
  display: inline-block;
  position: relative;

  &__marker {
    position: absolute;
    height: 10px;
    width: 10px;
    bottom: 14px;
    right: -1px;
    border-radius: 10px;
    background: var(--color-red);
    color: var(--text-color-primary);
    font-size: var(--font-size-mini);
  }

  &__push-wrapper {
    position: absolute;
    width: $push-width;
    left: -7px;
    bottom: -130%;
  }

  &__push {
    position: relative;
    margin: 0 auto 0;
    text-align: center;
    font-size: var(--font-size-subtext);
    background: $push-color;
    z-index: 1;
    border-radius: 3px;
    padding: 5px 0;

    &::before {
      z-index: 0;
      display: block;
      content: "";
      position: absolute;
      top: -7px;
      left: 11px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid $push-color;
    }
  }
}
</style>
