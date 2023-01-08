<template>
  <div class="search-item">

    <!-- user -->
    <user-item v-if="isUser" :value="myValue"/>

    <!-- category -->
    <div class="search-item__category" v-else-if="isCategory" @click="goCategory(myValue)">
      <span>{{ myValue.name }}</span>
      <span class="search-item__category-type">Категория</span>
    </div>

  </div>
</template>

<script>
import UserItem from "@/components/common/userList/userItem";
export default {
  name: "searchItem",
  components: {UserItem},
  props: {
    value: {
      type: Object,
    },
    userOnly: {
      type: Boolean,
      default: false
    },
    categoryOnly: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    isUser() {
      return this.userOnly || this.value.user;
    },
    isCategory() {
      return this.categoryOnly || this.value.category;
    },
    myValue() {
      if (this.userOnly || this.categoryOnly) return this.value;
      else if (this.isUser) return this.value.user;
      else if (this.isCategory) return this.value.category;
    }
  },
  methods: {
    goCategory({code}) {
      this.$router.push({path: "/", query: {category: code}});
    },
  }
}
</script>

<style lang="scss" scoped>
.search-item {

  &__category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid var(--background-color-secondary);
    color: var(--color-blue);
  }

  &__category-type {
    font-size: var(--font-size-mini);
    color: var(--text-color-extra);
  }

}
</style>
