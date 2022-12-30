<template>
  <div class="feed-item-skeleton">

    <!-- avatar-wrapper -->
    <div class="feed-item-skeleton__avatar-wrapper">
      <div class="feed-item-skeleton__avatar skeleton"/>
    </div>

    <!-- MAIN -->
    <div class="feed-item-skeleton__main">

      <!-- HEAD -->
      <div class="feed-item-skeleton__head">
        <div class="feed-item-skeleton__name skeleton"/>
        <div class="feed-item-skeleton__category skeleton--blue"/>
      </div>

      <!-- CONTENT -->
      <div class="feed-item-skeleton__content">
        <div class="feed-item-skeleton__text skeleton"></div>
        <div class="feed-item-skeleton__picture skeleton" v-if="picture"/>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: "itemSkeleton",
  props: {
    picture: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$avatar-size: 40px;
.feed-item-skeleton {
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
    background: var(--background-color-secondary);
  }

  &__main {
    width: 100%;
  }

  &__name {
    display: block;
    height: var(--font-size-text);
    background: var(--background-color-secondary);
    width: 200px;
  }

  &__category {
    display: block;
    height: var(--font-size-text);
    background: rgba(29, 155, 240, 0.2);
    width: 150px;
    margin-top: 3px;
  }

  &__content {
    margin-top: 10px;
  }

  &__text {
    height: 40px;
    background: var(--background-color-secondary);
  }

  &__picture {
    height: 150px;
    width: 100%;
    background: var(--background-color-secondary);
    border-radius: 5px;
    margin-top: 5px;
  }

}

.skeleton {
  background: linear-gradient(110deg, var(--background-color-secondary) 8%, #2d2d2d 18%, var(--background-color-secondary) 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  &--blue {
    background: linear-gradient(110deg, rgba(29, 155, 240, 0.2) 8%, rgba(29, 155, 240, 0.3) 18%, rgba(29, 155, 240, 0.2) 33%);
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }
  &--light {
    background: linear-gradient(110deg, var(--background-color-extra) 8%, #363636 18%, var(--background-color-extra) 33%);
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
