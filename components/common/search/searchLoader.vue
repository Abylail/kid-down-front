<template>
  <div class="search-loader">

    <div v-for="(item, index) in orderList" :key="index">

    <div class="search-loader__user" v-if="item === 'user'">
      <div class="search-loader__user-avatar skeleton"/>
      <div class="search-loader__user-info">
        <div class="search-loader__user-name skeleton"/>
        <div class="search-loader__user-username skeleton"/>
      </div>
    </div>

    <div class="search-loader__category" v-else-if="item === 'category'">
      <div class="search-loader__category-text skeleton--blue"></div>
    </div>

    </div>

  </div>
</template>

<script>
import {searchTypesEnum} from "@/store/search";

export default {
  name: "searchLoader",
  props: {
    searchType: {
      type: String,
      default: "all"
    }
  },
  computed: {
    orderList() {
      if (this.searchType === searchTypesEnum.users) return ["user", "user", "user"];
      else if (this.searchType === searchTypesEnum.categories) return ["category", "category", "category"];
      return ["user", "user", "category", "category"];
    }
  }
}
</script>

<style lang="scss" scoped>
$user-height: 35px;
.search-loader {

  &__user {
    display: grid;
    grid-template-columns: $user-height 1fr 120px;
    grid-column-gap: 12px;
    padding: 12px;
    border-bottom: 1px solid var(--background-color-secondary);
    height: $user-height;
  }

  &__user-avatar {
    background: var(--background-color-secondary);
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &__user-info {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  &__user-name {
    height: 19px;
    width: 100px;
  }

  &__user-username {
    height: 14px;
    width: 50px;
  }

  &__category {
    padding: 12px;
    border-bottom: 1px solid var(--background-color-secondary);
  }

  &__category-text {
    height: 19px;
    width: 100px;
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
