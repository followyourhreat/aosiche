<template>
  <div id="fileUpload">
    <label>
      <div class="btn_default">add image</div>
      <input type="file" hidden @change="onFileChange" :multiple="this.multiple">
    </label>
    <ul class="image_group">
      <li class="image_item" v-for="(x, i) in fileSrcs" :key="i" @click="remove(i)" title="点击删除"><img :src="x" alt=""></li>
    </ul>
  </div>
</template>

<script>
let fileArr = []
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    fileSrcs: []
  }),
  methods: {
    onFileChange(e) {
      let files = Array.from(e.target.files || e.dataTransfer.files)
      files = this.filterImage(files)
      if (!files.length) return false
      fileArr = this.multiple ? this.multipleUpload(files) : this.singleUpload(files)
      this.$emit('filechange', fileArr)
      e.srcElement.value = ''
    },
    multipleUpload(files) {
      let _oFReader = null
      files.forEach(v => {
        if (!fileArr.map(v => v.name).includes(v.name)) {
          fileArr.push(v)
          _oFReader = new FileReader()
          _oFReader.readAsDataURL(v)
          _oFReader.onload = ev => {
            this.fileSrcs.push(ev.target.result)
          }
        }
      })
      return fileArr
    },
    singleUpload(files) {
      let _oFReader = new FileReader()
      _oFReader.readAsDataURL(files[0])
      _oFReader.onload = ev => {
        this.fileSrcs = [ev.target.result]
      }
      return files
    },
    filterImage(files) {
      let isImage = files.every(v => v.type.includes('image'))
      isImage || this.$message({
        message: `只允许上传图片类型文件`,
        type: 'error'
      })
      return files.filter(v => v.type.includes('image'))
    },
    remove(i) {
      this.fileSrcs.splice(i, 1)
      fileArr.splice(i, 1)
      this.$emit('filechange', fileArr)
    }
  }
}

</script>

<style lang="scss">
@import '../scss/mixin';
.image_group {
  @include flexWrap;
  margin-top: 10px;
  .image_item {
    @include wh(100, 100);
    position: relative;
    border: 1px solid #399;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: opacity .2s;
    &:hover {
      opacity: .5;
    }
  }
}
</style>
