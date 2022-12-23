<template>
  <div class="picture-upload">

    <!-- heat box for upload -->
    <div class="picture-upload__heat-box" v-if="!value" @click="uploadImageHandle()">
      <base-icon>mdi-camera</base-icon>
    </div>

    <div class="picture-upload__picture-preview-wrapper" v-else>
      <img
        class="picture-upload__picture-preview"
        :src="fileBuffer"
        :alt="fileName"
      />
      <div class="picture-upload__picture-remove" @click.stop="removeImage()"><base-icon size="16">mdi-close</base-icon></div>
    </div>

    <input ref="input" type="file" v-show="false" accept=".png,.jpg,.jpeg,.svg" @input="uploadImage($event.target.files?.[0])"/>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import {fileToBase64} from "@/helpers/fileHelper";

export default {
  name: "pictureUpload",
  components: {BaseIcon},
  props: {
    value: {
      type: Object, // {name, buffer}
    }
  },
  computed: {
    // Файл base64
    fileBuffer() {
      return this.value?.buffer;
    },

    // Название файла
    fileName() {
      return this.value?.name;
    },
  },
  methods: {

    // Загрузить файл (кнопка)
    uploadImageHandle() {
      this.$refs.input.click();
    },

    // Загрузитьб файл
    async uploadImage(file) {
      if (!file) return;
      const base64 = await fileToBase64(file);
      if (!base64) return;
      this.$emit("input", {
        name: file.name,
        buffer: base64
      });
    },

    // Удалить картинку
    removeImage() {
      this.$emit("input", null);
      this.$refs.input.value = null;
    },
  }
}
</script>

<style lang="scss" scoped>
.picture-upload {
  position: relative;
  margin: 15px 0;

  &__heat-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-color-secondary);
    border-radius: 5px;
    height: 44px;
  }

  &__picture-preview-wrapper {
    position: relative;
  }

  &__picture-preview {
    width: 100%;
    border-radius: 5px;
    max-height: var(--picture-post-max-height);
  }

  &__picture-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    left: 10px;
    height: 20px;
    width: 20px;
    padding: 5px;
    border-radius: 50%;
    background: var(--background-transparent);
  }
}
</style>
