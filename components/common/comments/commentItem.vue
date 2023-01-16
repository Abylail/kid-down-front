<template>
  <div class="comment-item">

    <div class="comment-item__left">
      <div
        class="comment-item__avatar"
        :style="{backgroundImage: authorAvatarStyle}"
      />
    </div>

    <div class="comment-item__center">

      <div class="comment-item__author-info">
        <span class="comment-item__author-name">{{ authorInfo.name }}</span>
        <span class="comment-item__author-username">@{{ authorInfo.username }}</span>
      </div>

      <div class="comment-item__content">
        {{ value.comment_text }}
      </div>

      <div class="comment-item__tools">
        <div class="comment-item__tool">Нравится: {{ likeCount }}</div>
        <comment-input>
          <template v-slot:activator="{activator}">
            <div class="comment-item__tool" @click="activator()">Ответить</div>
          </template>
        </comment-input>
      </div>
    </div>

    <div class="comment-item__right">
      <!-- Лайк -->
      <button class="feed-item__tool like" @click.stop="toggleLikeHandle()">
        <base-icon class="like--liked" size="15" v-if="isLiked" key="liked">mdi-heart</base-icon>
        <base-icon class="like--default" size="15" v-else key="default">mdi-heart-outline</base-icon>
      </button>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {mapActions} from "vuex";
import CommentInput from "@/components/common/comments/commentInput";
export default {
  name: "commentItem",
  components: {CommentInput, BaseIcon},
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    postCode: {
      type: String,
    }
  },
  data: () => ({
    // Лайкнул ли я
    liked: null,

    // Синхронизируется с бэком
    likedSync: null,

    // Колличества лайков после изменения
    innerLikeCount: null,

    likeTimeout: null,
  }),
  computed: {
    // Информация автора
    authorInfo() {
      return this.value.comment_author || {};
    },

    // Ава автора
    authorAvatarStyle() {
      return this.authorInfo.avatar && `url('${process.env.CDN_URL}${this.authorInfo.avatar}')` || null;
    },

    // Лайнул ли я
    isLiked() {
      if (this.liked === null) return this.value.my_like;
      return this.liked;
    },

    // Колличество лайков
    likeCount() {
      if (this.innerLikeCount === null) return this.value.likes_count;
      return this.innerLikeCount;
    },
  },
  methods: {
    ...mapActions({
      _like: "post/comments/like",
      _unlike: "post/comments/unlike",
    }),

    // Блокировать если не авторизован
    blockUnauthorized() {
      if (!this.isAuth) {
        this.$goLogin();
        return true;
      }
      return false;
    },

    // Кнопка лайк
    toggleLikeHandle() {
      this.liked = !this.liked;
      if (this.likedSync === null) this.likedSync = !!this.value.my_like;

      // Изменения колличества лайков
      if (this.liked) this.innerLikeCount = this.likeCount + 1;
      else this.innerLikeCount = this.likeCount - 1;

      clearTimeout(this.likeTimeout);
      this.likeTimeout = setTimeout(() => {
        this.toggleLike();
      }, 500);
    },

    // Отправка лайка
    async toggleLike() {
      if (this.likedSync === this.liked) return;

      if (this.liked) this.likedSync = await this._like({post_code: this.postCode, comment_code: this.value.comment_code});
      else this.likedSync = await this._unlike({post_code: this.postCode, comment_code: this.value.comment_code});

      if (this.liked !== this.likedSync) {
        this.liked = this.likedSync;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$avatar-size: 35px;
$like-size: 15px;
.comment-item {
  display: grid;
  grid-template-columns: $avatar-size 1fr $like-size;
  grid-column-gap: 10px;
  margin-bottom: 15px;

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
