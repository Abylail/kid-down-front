<template>
  <div class="main-feed">
    <main-header/>
    <main-feed/>
  </div>
</template>

<script>
import MainHeader from "@/components/common/mainFeed/mainHeader";
import BaseIcon from "@/components/base/BaseIcon";
import MainFeed from "@/components/common/mainFeed/mainFeed";
export default {
  name: 'IndexPage',
  components: {MainFeed, BaseIcon, MainHeader}
}
</script>

<style lang="scss" scoped>
.main-feed {
  padding-top: var(--header-height);
}
</style>
