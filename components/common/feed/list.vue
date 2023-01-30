<template>
  <div class="feed-list">

    <!-- Посты -->
    <item
      v-for="(item, index) in value" :key="index"
      :value="item"
    />

    <!-- Лоудер инициализации -->
    <div v-show="loading">
      <item-skeleton picture/>
      <item-skeleton/>
      <item-skeleton picture/>
    </div>
  </div>
</template>

<script>
import Item from "@/components/common/feed/item";
import BaseLoader from "@/components/base/BaseLoader";
import ItemSkeleton from "@/components/common/feed/itemSkeleton";

export default {
  name: "list",
  components: {ItemSkeleton, BaseLoader, Item},
  props: {
    value: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: [Number, String],
      default: null
    },
  },
  data: () => ({
    // Точка для пагинации
    paginatePoint: null,
  }),
  watch: {
    value: {
      handler(val) {
        // Установка линии пагиниции
        if (!val.length || val.length < 5) return;
        this.$nextTick(() => {
          const pointCount = val.length - 3;
          this.paginatePoint = this.$el.children[pointCount].offsetTop;
        });
      },
      immediate: true
    }
  },
  methods: {
    // Во время скрола
    scroll(event) {
      if (!this.paginatePoint || this.loading) return null;
      if (event.srcElement.documentElement.scrollTop > (this.paginatePoint - window.innerHeight)) {
        this.paginatePoint = null;
        this.$emit("paginate");
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }
}
</script>

<style lang="scss" scoped>
.feed-list {

  &__pagination-loader {
    display: block;
    margin: 40px auto;
  }

}
</style>
