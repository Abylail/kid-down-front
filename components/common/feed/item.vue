<template>
  <div class="feed-item" @click="contentClickHandle">

    <!-- Аватарка (Левая) -->
    <div class="feed-item__avatar-wrapper">
      <div
        class="feed-item__avatar"
        v-if="avatarUrl"
        :lazy-background="avatarUrl"
        @click.stop="goAuthorProfile()"
      />
    </div>

    <!-- Основное (правая) -->
    <div class="feed-item__main">

      <!-- Верхняя часть (Имя автора, юзернейм, темв) -->
      <div class="feed-item__head">
          <div>
            <span class="feed-item__name" @click.stop="goAuthorProfile()">{{ value.author_name  }}</span>
            <span class="feed-item__username" @click.stop="goAuthorProfile()">@{{ value.author_username  }}</span>
          </div>
        <div>
          <!-- Тема (категория) -->
          <span class="feed-item__category" v-if="value.category_name" @click.stop>{{ value.category_name }}</span>
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


      <div class="feed-item__tools">

        <!-- Взаимодействия (Лайк, коменты) -->
        <div class="feed-item__tools-left">
          <!-- Лайк -->
          <button class="feed-item__tool like" @click.stop="toggleLikeHandle()">
            <base-icon class="like--liked" v-if="isLiked" key="liked">mdi-heart</base-icon>
            <base-icon class="like--default" v-else key="default">mdi-heart-outline</base-icon>
          </button>

          <!-- Коммент -->
          <button class="feed-item__tool" @click.stop="goPostPage()">
            <base-icon size="22">mdi-comment-outline</base-icon>
          </button>
        </div>

        <!-- Взаимодействия (Поделиться) -->
        <div class="feed-item__tools-left">
          <!-- Коммент -->
          <button class="feed-item__tool share-button" v-if="isCanShare" @click.stop="shareHandle()">
            <base-icon size="18">mdi-share</base-icon>
          </button>
        </div>

      </div>

      <!-- Колличество лайков -->
      <div class="feed-item__liked-count"><span @click.stop="goLikes">Нравится: {{ likesCount }}</span></div>

      <!-- Когда выложенно -->
      <div class="feed-item__time">{{ timeAgo }}</div>

    </div>

    <fade>
      <div class="feed-item__big-like" v-if="showBigLikeAnimation">
        <base-icon class="feed-item__big-like-heart" size="40">mdi-heart</base-icon>
      </div>
    </fade>

  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import Fade from "@/components/transitions/fade";
import {mapActions} from "vuex";
export default {
  name: "item",
  components: {BaseIcon, Fade},
  data: () => ({
    // Лайкнуто ли (только с изменениями)
    liked: null,
    // Синхронизируется с бэком
    likedSync: null,
    // Колличество лайков (только с изменениями)
    innerLikesCount: null,
    // Таймаут для лайка
    likeTimeout: null,

    // Колличество кликов
    contentClickCount: 0,
    // Таймаут для контент
    contentClickTimer: null,

    // Показать анимацию большого лайка
    showBigLikeAnimation: false,
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
      if (!this.value.picture.height || !this.value.picture.width) return null;
      // console.log(this.value.text, this.value.picture.height/this.value.picture.width)
      return `${this.value.picture.width}/${this.value.picture.height}`;
    },

    // Лайкнуто ли
    isLiked() {
      if (this.liked === null) return this.value.my_like;
      return this.liked;
    },

    // Колличество лайков
    likesCount() {
      if (this.innerLikesCount === null) return this.value.like_count;
      return this.innerLikesCount;
    },

    // Данные для поделиться
    shareData() {
      return {
        title: `${this.value.author_name} ${this.value.author_username} - TOXY`,
        text: this.value.text,
        url: `${window.location.origin}/post/${this.value.code}`
      }
    },

    // Показывать ли кнопку поделиться
    isCanShare() {
      return process.client && !!window.navigator.canShare;
    },
  },
  methods: {
    ...mapActions({
      _like: "post/likes/like",
      _unlike: "post/likes/unlike",
      _bridgeInfo: "post/bridgeInfo",
    }),

    // Клик по контенту
    contentClickHandle() {
      this.contentClickCount++;
      clearTimeout(this.contentClickTimer);
      if (this.contentClickCount % 2 === 0) this.contentLike();
      this.contentClickTimer = setTimeout(() => {
        if (this.contentClickCount === 1) this.goPostPage();
        this.contentClickCount = 0;
      }, 300);
    },

    // Большой лайк
    contentLike() {
      if (!this.isLiked) this.toggleLikeHandle();
      this.showBigLikeAnimation = true;

      setTimeout(() => {
        this.showBigLikeAnimation = false;
      }, 500);
    },

    // Передача информации о посте до перехода
    bridgeInfo() {
      this._bridgeInfo({
        ...this.value,
        like_count: this.likesCount,
        my_like: this.isLiked,
      })
    },

    // Перейти в страницу поста
    goPostPage() {
      // Закидываю информацию о посте для перехода на страницу
      this.bridgeInfo();
      this.$router.push(`/post/${this.value.code}`);
    },

    // Перейти в профиль автора
    goAuthorProfile() {
      this.$router.push(`/user/${this.value.author_username}`)
    },

    // Нажатие на лайк
    toggleLikeHandle() {
      if (this.likedSync === null) this.likedSync = !!this.value.my_like;
      this.liked = !this.isLiked;

      // Изменения колличества лайков
      if (this.liked) this.innerLikesCount = this.likesCount + 1;
      else this.innerLikesCount = this.likesCount - 1;

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

      if (this.liked !== this.likedSync) {
        this.liked = this.likedSync;
      }
    },

    // Перейти к лайкам
    goLikes() {
      // Закидываю информацию о посте для перехода на страницу
      this.bridgeInfo();
      this.$router.push(`/post/${this.value.code}/likes`);
    },

    // Кнопка поделиться
    shareHandle() {
      if (window.navigator?.canShare(this.shareData)) {
        window.navigator.share(this.shareData);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$avatar-size: 40px;
.feed-item {
  position: relative;
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
    margin-top: 4px;
    color: var(--text-color-extra);
    font-size: var(--font-size-mini);
  }

  &__picture {
    display: block;
    object-fit: cover;
    margin-top: 5px;
    max-width: 100%;
    width: 100%;
    border-radius: 5px;
    background: var(--background-color-secondary);
    color:transparent;
    max-height: var(--picture-post-max-height);
  }

  &__tools {
    margin-top: 8px;
    margin-bottom: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > * {
      display: flex;
      justify-content: center;
    }
  }

  &__tool {
    color: var(--text-color-primary);
    background: none;
    border: none;
    padding: 0;
    &:not(:last-child) {
      padding-right: 12px;
    }
  }

  &__liked-count {
    text-align: left;
    font-size: var(--font-size-mini);
  }

  &__big-like {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-transparent);
  }

  &__big-like-heart {
    animation: animateHeart 1.2s;
    animation-delay: .1s;
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

// Стиль для поделиться
.share-button {
  //color: var(--color-blue);
  //transform: rotate(340deg);
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

@keyframes animateHeart {
  0% {
    transform: scale(0.8);
  }
  5% {
    transform: scale(0.9);
  }
  10% {
    transform: scale(0.8);
  }
  15% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.8);
  }
}

</style>
