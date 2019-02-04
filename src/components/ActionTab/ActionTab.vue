<template>
  <div class="book-detail-btn">
    <div class="item addbook" :class="{ collected }" @click="onAdd">
      <svg class=" my-icon icon" aria-hidden="true" v-if="this.collected">
        <use xlink:href="#icon-ic_favorite"></use>
      </svg>
      <svg class=" my-icon icon" aria-hidden="true" v-else>
        <use xlink:href="#icon-ic_favorite_border"></use>
      </svg>
      {{ collectText }}
    </div>
    <div class="item reading" @click="onRead">
      <svg class="icon my-icon icon-large" aria-hidden="true">
        <use xlink:href="#icon-reading"></use>
      </svg>
      <!--立即阅读-->
    </div>
    <div class="item download">
      <svg class="icon my-icon" aria-hidden="true">
        <use xlink:href="#icon-download"></use>
      </svg>
      下载
    </div>
  </div>
</template>
<script>
const COMPONENT_NAME = "ActionTab";

export default {
  name: COMPONENT_NAME,
  props: {
    collected: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    collectText() {
      return this.collected ? "已在书架" : "加入书架";
    }
  },
  methods: {
    onAdd() {
      this.$emit("add");
    },
    onRead() {
      this.$emit("read");
    }
  }
};
</script>

<style lang="scss" scoped>
.book-detail-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3.25rem;
  display: flex;
  box-sizing: border-box;
  background: #f0eff5;
  border-top: 1px solid #ddd;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.625rem;
    color: #43bb57;

    &.collected {
      color: #bfbfbf;
      background: #fff;
      .my-icon {
        color: #bfbfbf;
      }
    }

    i {
      font-size: 1.375rem;
      margin-bottom: 0.25rem;
    }

    &.reading {
      width: 48%;
      background: #43bb57;
      color: #fff;
    }

    &.download,
    &.addbook {
      width: 26%;
    }
  }
}
.my-icon {
  font-size: 24px;
  line-height: 100px;
  color: #43bb57;
  &.icon-large {
    font-size: 32px;
  }
}
</style>
