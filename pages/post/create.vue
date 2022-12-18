<template>
  <div class="create-post">
    <create-post-header/>
  </div>
</template>

<script>
import CreatePostHeader from "@/components/common/createPost/createPostHeader";
export default {
  name: "create",
  components: {CreatePostHeader},
  middleware: "auth",
}
</script>

<style lang="scss" scoped>
.create-post {
  padding-top: var(--header-height);
}
</style>
