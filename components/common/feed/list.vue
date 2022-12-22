<template>
  <div class="feed-list">
    <item
      v-for="item in value" :key="item.code"
      :value="item"
    />
  </div>
</template>

<script>
import Item from "@/components/common/feed/item";
export default {
  name: "list",
  components: {Item},
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-list {


}
</style>
