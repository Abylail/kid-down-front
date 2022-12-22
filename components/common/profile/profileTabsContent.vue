<template>
  <div class="profile-tabs-content">
    <div class="profile-tabs-content__tab" v-for="tab in tabs" :key="tab.id" v-show="tab.id === value">
      <slot :name="tab.id"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileTabsContent",
  props: {
    value: { // Выбранный таб (код)
      type: String,
    },
    tabs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-tabs-content {
  margin-top: 10px;
}
</style>
