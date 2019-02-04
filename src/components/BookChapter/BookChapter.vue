<template>
  <transition name="fade">
    <div class="chapters" v-show="showFlag">
      <div class="chapters-title">
        <i class="icon-back" @click="hide"></i>
        <div class="book-title-info">
          <h1 class="book-name">{{ title }}</h1>
          <p class="book-author">{{ author }}</p>
        </div>
        <p class="reverse" @click="reverseChapters">倒序</p>
      </div>
      <div class="chapters-group">
        <scroll class="chapters-content" :data="chapters" ref="chapterList">
          <div class="chapters-list">
            <p
              class="item"
              v-for="(item, index) in chaptersList"
              @click.stop.prevent="selectChapter(item, index)"
              :class="{ isVip: item.isVip }"
              :key="index"
            >
              <span class="item-text">{{ item.title }}</span>
              <svg
                v-show="item.isVip"
                slot="icon"
                class="icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-lock"></use>
              </svg>
            </p>
          </div>
          <div
            class="loading-wrapper"
            v-show="!chaptersList || !chaptersList.length"
          >
            <loading></loading>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from "../Scroll/Scroll.vue";
import Loading from "../Loading/Loading.vue";

export default {
  props: {
    chapters: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    dev: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFlag: false,
      // chaptersList: [],
      isReverse: false
    };
  },
  computed: {
    chaptersList() {
      return this.chapters;
    }
  },
  updated() {
    this.refresh();
  },
  mounted() {
    this.showFlag = this.dev;
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    selectChapter(item, index) {
      if (item.isVip) {
        return;
      }
      let currentIndex = this.isReverse
        ? this.chaptersList.length - 1 - index
        : index;
      this.$emit("select", item, currentIndex);
    },
    refresh() {
      this.$refs.chapterList && this.$refs.chapterList.refresh();
    },
    reverseChapters() {
      this.chaptersList.reverse();
      this.isReverse = !this.isReverse;
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>
<style lang="scss">
.chapters {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  // width: 100%;
  // height: 100%;
  background: #fff;
  color: #9d9d9b;

  .chapters-title {
    height: 2.75rem;
    position: relative;
    display: flex;
    flex-direction: row;
    background: #f0eff5;

    .icon-back {
      display: inline-block;
      width: 2rem;
      line-height: 2.75rem;
      text-align: center;
      font-size: 1.25rem;
      color: #43bb57;
    }

    .reverse {
      padding-right: 1rem;
      line-height: 2.75rem;
      font-size: 0.875rem;
    }

    .book-title-info {
      height: 2.75rem;
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;

      .book-name {
        line-height: 1.5rem;
        font-size: 1rem;
        color: #2b2b2b;
      }

      .book-author {
        flex: 1;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }

  .chapters-group {
    position: fixed;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fafbfd;

    .chapters-content {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .chapters-list {
        .item {
          margin: 0;
          line-height: 3.125rem;
          box-sizing: border-box;
          border-top: 1px solid #fff;
          border-bottom: 1px solid #f5f5f5;
          font-size: 0.875rem;
          padding: 0 1rem;
          box-sizing: border-box;
          display: flex;

          &.isVip {
            color: #bfbfbf;
          }

          .item-text {
            flex: 1;
          }

          .icon {
            margin: auto 0;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
</style>
