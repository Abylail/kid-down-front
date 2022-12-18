<template>
  <div class="main-feed">
    <main-header/>
    <nuxt-link class="main-feed__create" to="/post/create">
      создать пост
      <base-icon>mdi-pencil-box-outline</base-icon>
    </nuxt-link>
  </div>
</template>

<script>
import MainHeader from "@/components/common/mainFeed/mainHeader";
import BaseIcon from "@/components/base/BaseIcon";
export default {
  name: 'IndexPage',
  components: {BaseIcon, MainHeader}
}
</script>

<style lang="scss" scoped>
.main-feed {
  padding-top: var(--header-height);

  &__create {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    padding: 8px 8px;
    border-radius: 5px;
    background: var(--background-color-secondary);
    color: var(--text-color-secondary);
    font-size: var(--font-size-subtext);
    text-decoration: none;
    text-align: center;
  }
}
</style>
