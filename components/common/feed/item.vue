<template>
  <div class="feed-item">

    <!-- avatar-wrapper -->
    <div class="feed-item__avatar-wrapper" @click.prevent="goAuthorProfile()">
      <div
        class="feed-item__avatar"
        v-if="avatarUrl"
        :style="{backgroundImage: `url(${avatarUrl})`}"
      />
    </div>

    <!-- MAIN -->
    <div class="feed-item__main">

      <!-- HEAD -->
      <div class="feed-item__head" @click.prevent="goAuthorProfile()">
        <div>
          <span class="feed-item__name">{{ value.author_name  }}</span>
          <span class="feed-item__username">@{{ value.author_username  }}</span>
        </div>
        <div>
          <span class="feed-item__category" v-if="value.category_name">{{ value.category_name }}</span>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="feed-item__content">
        <div class="feed-item_text">{{ value.text }}</div>
        <img
          class="feed-item__picture"
          v-if="pictureUrl"
          :src="pictureUrl"
          :alt="value.author_username"
        />
      </div>

      <div class="feed-item__time">{{ timeAgo }}</div>

    </div>

  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // Ссылка на картинку пользователя
    avatarUrl() {
      if (!this.value.author_avatar) return null;
      return process.env.CDN_URL + this.value.author_avatar;
    },

    // Ссылка на картинку контента
    pictureUrl() {
      if (!this.value.picture) return null;
      return process.env.CDN_URL + this.value.picture;
    },

    // Времени
    timeAgo() {
      const minutesAgo = (new Date().getTime() - new Date(this.value.created_at).getTime()) / 60000;
      if (minutesAgo < 60) return `${Math.ceil(minutesAgo)} минут назад`
      if (minutesAgo < 24 * 60) return `${Math.abs(minutesAgo/60)} часов назад`;
      return "больше дня назад";
    }
  },
  methods: {
    // Перейти в профиль автора
    goAuthorProfile() {
      this.$router.push(`/user/${this.value.author_username}`)
    }
  }
}
</script>

<style lang="scss" scoped>
$avatar-size: 40px;
.feed-item {
  display: flex;
  padding: 15px;
  border-top: 1px solid var(--background-color-secondary);

  &__avatar {
    height: $avatar-size;
    width: $avatar-size;
    margin-right: 15px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
  }

  &__name {
    font-weight: bold;
  }

  &__username {
    color: var(--text-color-secondary);
    font-size: var(--font-size-subtext);
  }

  &__content {
    margin-top: 10px;
  }

  &__category {
    color: var(--color-blue);
  }

  &__time {
    margin-top: 10px;
    color: var(--text-color-extra);
    font-size: var(--font-size-mini);
  }

  &__picture {
    margin-top: 5px;
    width: 100%;
    border-radius: 5px;
    max-height: 400px;
  }
}
</style>
