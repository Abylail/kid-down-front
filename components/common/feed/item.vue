<template>
  <div class="feed-item">

    <!-- Аватарка (Левая) -->
    <div class="feed-item__avatar-wrapper">
      <div
        class="feed-item__avatar"
        v-if="avatarUrl"
        :lazy-background="avatarUrl"
        @click.prevent="goAuthorProfile()"
      />
    </div>

    <!-- Основное (правая) -->
    <div class="feed-item__main">

      <!-- Верхняя часть (Имя автора, юзернейм, темв) -->
      <div class="feed-item__head">
        <div @click.prevent="goAuthorProfile()">
          <span class="feed-item__name">{{ value.author_name  }}</span>
          <span class="feed-item__username">@{{ value.author_username  }}</span>
        </div>
        <div>
          <!-- Тема (категория) -->
          <span class="feed-item__category" v-if="value.category_name">{{ value.category_name }}</span>
        </div>
      </div>

      <!-- Контент (текст и фото) -->
      <div class="feed-item__content">
        <div class="feed-item_text">{{ value.text }}</div>
        <img
          class="feed-item__picture skeleton"
          v-if="pictureUrl"
          :data-src="pictureUrl"
          :alt="value.author_username"
          :style="{aspectRatio: pictureRatio}"
          v-lazy-load
        >
      </div>

      <!-- Когда выложенно -->
      <div class="feed-item__time">{{ timeAgo }}</div>


      <!-- Взаимодействия (Лайк, коменты) -->
      <div class="feed-item__tools">

        <!-- Коммент -->
        <button class="feed-item__tool">
          <base-icon size="22">mdi-comment-outline</base-icon>
        </button>

        <!-- Лайк -->
        <button class="feed-item__tool like" @click="toggleLikeHandle()">
          <base-icon class="like--liked" v-if="isLiked" key="liked">mdi-heart</base-icon>
          <base-icon class="like--default" v-else key="default">mdi-heart-outline</base-icon>
        </button>
      </div>

      <!-- Колличество лайков -->
      <div class="feed-item__liked-count">Нравится: {{ likesCount }}</div>

    </div>

  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapActions} from "vuex";
export default {
  name: "item",
  components: {BaseIcon},
  data: () => ({
    // Лайкнуто ли (только с изменениями)
    liked: null,
    // Синхронизируется с бэком
    likedSync: null,
    // Колличество лайков (только с изменениями)
    innerLikesCount: null,
    // Таймаут для лайка
    likeTimeout: null,
  }),
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
      if (!this.value.picture.path) return null;
      return process.env.CDN_URL + this.value.picture.path;
    },

    // Времени
    timeAgo() {
      const minutesAgo = (new Date().getTime() - new Date(this.value.created_at).getTime()) / 60000;
      if (minutesAgo < 1) return "прям только что";
      if (minutesAgo < 60) return `${Math.ceil(minutesAgo)} минут назад`
      if (minutesAgo < 24 * 60) return `${Math.ceil(minutesAgo/60)} часов назад`;
      return "больше дня назад";
    },

    // Пропорция картинки
    pictureRatio() {
      return null;
      // if (!this.value.picture.height || !this.value.picture.width) return null;
      // console.log(this.value.text, this.value.picture.height/this.value.picture.width)
      // return this.value.picture.height/this.value.picture.width;
    },

    // Лайкнуто ли
    isLiked() {
      if (this.liked === null) return this.value.my_like;
      return this.liked;
    },

    // Колличество лайков
    likesCount() {
      console.log("_likesCount", this.innerLikesCount);
      if (this.innerLikesCount === null) return this.value.like_count;
      return this.innerLikesCount;
    },
  },
  methods: {
    ...mapActions({
      _like: "feed/liking/like",
      _unlike: "feed/liking/unlike",
    }),
    // Перейти в профиль автора
    goAuthorProfile() {
      this.$router.push(`/user/${this.value.author_username}`)
    },

    // Нажатие на лайк
    toggleLikeHandle() {
      if (this.likedSync === null) this.likedSync = !!this.value.my_like;
      this.liked = !this.isLiked;
      clearTimeout(this.likeTimeout);
      this.likeTimeout = setTimeout(() => {
        this.toggleLike();
      }, 500);
    },

    // Отправка лайка
    async toggleLike() {
      if (this.likedSync === this.liked) return;

      if (this.liked) this.likedSync = await this._like(this.value.code);
      else this.likedSync = await this._unlike(this.value.code);

      // Изменения колличества лайков
      if (this.likedSync) this.innerLikesCount = this.likesCount + 1;
      else this.innerLikesCount = this.likesCount - 1;

      this.liked = this.likedSync;
    },
  },
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

  &__main {
    width: 100%;
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
    display: block;
    margin-top: 5px;
    min-width: 100%;
    width: 100%;
    border-radius: 5px;
    background: var(--background-color-secondary);
    color:transparent;
    //max-height: var(--picture-post-max-height);
  }

  &__tools {
    display: flex;
    flex-direction: row;
    justify-content: right;
  }

  &__tool {
    color: var(--text-color-primary);
    background: none;
    border: none;
    padding-left: 8px;
    padding-right: 0;
  }

  &__liked-count {
    text-align: right;
    font-size: var(--font-size-mini);
  }
}

// Стиль для лайка
.like {
  &--default {
    color: var(--text-color-primary);
  }
  &--liked {
    color: var(--color-red);
  }

  &:active {
    .like--default {
      color: var(--color-red);
    }
    .like--liked {
      color: var(--text-color-primary);
    }
  }
}

// Стиль для загрузкчика картинки
.skeleton {
  background: linear-gradient(90deg, var(--background-color-secondary) 10%, #2d2d2d 18%, var(--background-color-secondary) 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}
@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
