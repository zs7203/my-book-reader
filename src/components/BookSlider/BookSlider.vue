<template>
  <div class="book-class-content">
    <h1 class="class-title"><span class="title-solid"></span>{{ title }}</h1>
    <div class="class-book-list" ref="slider">
      <ul class="list-wrapper" ref="sliderGroup">
        <li
          class="item"
          v-for="(book, index) in data"
          @click="selectBook(book)"
          :key="index"
        >
          <img class="image" :src="book.image" />
          <p class="book-name">{{ book.title }}</p>
          <p class="reader">{{ book.star }}人读过</p>
        </li>
      </ul>
    </div>
    <div class="book-item"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import Bscroll from "better-scroll";
export default {
  props: {
    title: {
      type: String,
      default: "标题文本"
    },
    data: {
      type: Array,
      default: () => []
    },
    refreshDelay: {
      type: Number,
      default: 2000
    }
  },
  mounted() {
    this._setScrollWidth();
    this._initScroll();
    this.refresh();
  },
  methods: {
    selectBook(item) {
      this.$emit("selectBook", item);
    },
    _setScrollWidth() {
      if (typeof this.$refs.sliderGroup === "undefined") {
        return;
      }
      let children = this.$refs.sliderGroup.children;
      if (!children || !children.length) {
        this.$refs.sliderGroup.style.width = "100%";
        return;
      }
      let width = 0;
      let itemWidth = children[0].clientWidth;

      for (let i = 0; i < children.length; i++) {
        width += itemWidth;
      }

      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initScroll() {
      if (!this.data.length) {
        return;
      }
      this.scroll = new Bscroll(this.$refs.slider, {
        scrollY: false,
        scrollX: true,
        click: true
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._setScrollWidth();
        this._initScroll();
        this.refresh();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.book-class-content {
  width: 100%;
  background: #fff;
  padding: 0 1rem;
  box-sizing: border-box;

  .class-title {
    padding: 1rem 0;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    color: #101010;

    .title-solid {
      display: inline-block;
      width: 3px;
      height: 1.125rem;
      vertical-align: middle;
      margin-right: 0.5rem;
      background: #43bb57;
    }
  }

  .class-book-list {
    width: 100%;
    overflow: hidden;

    .list-wrapper {
      padding: 0;
      padding-bottom: 0.75rem;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      list-style: none;
      .item {
        height: 100%;
        box-sizing: border-box;
        padding-right: 1.6rem;
        & > p {
          margin: 0;
        }
        .image {
          width: 5.625rem;
          height: 7.3125rem;
        }

        .book-name {
          font-size: 0.875rem;
          color: #101010;
          line-height: 2rem;
          width: 5.625rem;
          // no-wrap(1);
        }

        .reader {
          font-size: 0.75rem;
          width: 5.625rem;
          line-height: 1rem;
          // no-wrap(1);
        }
      }
    }
  }
}
</style>
