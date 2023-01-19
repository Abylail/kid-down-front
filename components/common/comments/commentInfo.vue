<template>
  <div class="comment-info">

    <div class="comment-info__left">
      <div
        class="comment-info__avatar"
        :style="{backgroundImage: authorAvatarStyle}"
      />
    </div>

    <div class="comment-info__center">

      <div class="comment-info__author-info">
        <span class="comment-info__author-name">{{ authorInfo.name }}</span>
        <span class="comment-info__author-username">@{{ authorInfo.username }}</span>
      </div>

      <div class="comment-info__content">
        {{ value.comment_text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentInfo",
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // Информация автора
    authorInfo() {
      return this.value?.comment_author || {};
    },

    // Ава автора
    authorAvatarStyle() {
      return this.authorInfo.avatar && `url('${process.env.CDN_URL}${this.authorInfo.avatar}')` || null;
    },
  }
}
</script>

<style lang="scss" scoped>
$avatar-size: 35px;
.comment-info {
  display: grid;
  grid-template-columns: $avatar-size 1fr;
  grid-column-gap: 10px;

  &__avatar {
    height: $avatar-size;
    width: $avatar-size;
    border-radius: 50px;
    background: var(--background-color-secondary);
    background-position: center;
    background-size: cover;
  }

  &__author-name {
    font-size: var(--font-size-mini);
  }

  &__author-username {
    font-size: var(--font-size-mini);
    color: var(--text-color-extra);
  }

  &__content {
    color: var(--text-color-secondary);
    margin-top: 2px;
    font-size: var(--font-size-subtext);
  }

  &__tools {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }

  &__tool {
    color: var(--text-color-extra);
    font-size: var(--font-size-mini);
    margin-right: 10px;
  }
}
</style>
