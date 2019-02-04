<template>
  <div class="book-shelf-wrapper">
    <div class="top-bar"></div>
    <scroll class="book-shelf-content" :data="collectedBooks" ref="scroll">
      <div>
        <div class="recent-box">
          <div class="recent-book-wrapper" v-if="currentBook">
            <div class="image">
              <img :src="currentBook.bookInfo.image" />
            </div>
            <div class="book-info">
              <h1 class="book-name">{{ currentBook.bookInfo.title }}</h1>
              <h2 class="book-author">{{ currentBook.bookInfo.author }}</h2>
              <p class="recent-read">{{ currentBook.lastChapter }}</p>
              <div class="continue-read" @click="continueReading">继续阅读</div>
            </div>
          </div>
          <h1 class="recent-title" v-else>空空空空如也</h1>
        </div>
        <div class="library">
          <div
            class="library-item"
            v-for="(item, index) in collectedBooks"
            @click="selectBook(item)"
            @touchstart="onTouchstart(item)"
            @touchmove="onTouchmove"
            @touchend="onTouchend"
            :key="index"
          >
            <div class="library-item-wrapper">
              <div class="library-image">
                <img :src="item.bookInfo.image" alt="" />
              </div>
              <div class="library-name">
                <p class="name">{{ item.bookInfo.title }}</p>
              </div>
            </div>
          </div>
          <div class="library-item" @click="gotoAddBook">
            <div class="library-item-wrapper add-wrapper">
              <van-icon name="add-o" />
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <confirmation
      ref="confirm"
      maxTitle="删除书籍"
      minTitle="你确定要删除该书籍吗？"
      @selectConfirm="selectConfirm"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from "../components/Scroll/Scroll.vue";
import Confirmation from "../components/Confirmation/Confirmation.vue";

import { mapGetters, mapActions, mapMutations } from "vuex";
import { SET_CURRENT_BOOKID, REMOVE_FROM_BOOK_SHELF } from "../store/types.js";
import { getChapters } from "../api/search.js";

export default {
  computed: {
    ...mapGetters(["currentBook", "collectedBooks"])
  },
  methods: {
    gotoAddBook() {
      this.$router.push({
        name: "recommend"
      });
    },
    onTouchstart(book) {
      this.toBeDeleted = book;
      this.timer = setTimeout(() => {
        this.$refs.confirm.show();
      }, 800);
    },
    onTouchmove() {
      clearTimeout(this.timer);
    },
    onTouchend() {
      clearTimeout(this.timer);
    },
    selectConfirm() {
      this.removeBook(this.toBeDeleted.bookInfo.id);
    },
    continueReading() {
      this.$router.push({
        name: "reader",
        params: {
          bookId: this.currentBook.bookInfo.id,
          chapterIndex: this.currentBook.chapterIndex
        }
      });
    },
    selectBook(book) {
      this.$router.push({
        name: "reader",
        params: {
          bookId: book.bookInfo.id,
          chapterIndex: book.chapterIndex
        }
      });
    },
    refreshRead(item) {
      this.setCurrentBook(item.bookInfo);
      getChapters(item.id).then(res => {
        if (res.statusText === "OK") {
          this.selectRead({
            id: item.id,
            list: res.data.chapters,
            index: item.index
          });
        }
        this.$router.push({
          path: `/booktext/${item.id}`
        });
      });
    },
    ...mapActions(["selectRead", "deleteBook"]),
    ...mapMutations({
      removeBook: REMOVE_FROM_BOOK_SHELF,
      setCurrentBookId: SET_CURRENT_BOOKID
    })
  },
  components: {
    Scroll,
    Confirmation
  }
};
</script>
<style lang="scss" scoped>
.book-shelf-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 3.125rem;
  overflow: hidden;

  .top-bar {
    width: 100%;
    height: 2.75rem;
    background: #43bb57;
    position: fixed;
    top: 0;
    z-index: 998;
  }

  .book-shelf-content {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .recent-box {
      width: 100%;
      height: 16.125rem;
      position: relative;
      background: #43bb57;

      .recent-title {
        position: absolute;
        top: 50%;
        width: 70%;
        left: 15%;
        text-align: center;
        font-size: 1.25rem;
        transform: translate(0, -50%);
        color: #fff;
      }

      .recent-book-wrapper {
        width: 70%;
        margin: 0 auto;
        padding-top: 5.25rem;
        display: flex;

        .image {
          width: 6.375rem;
          height: 8.75rem;

          img {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
          }
        }

        .book-info {
          flex: 1;
          text-align: left;
          width: 152px;
          margin-left: 0.5rem;
          color: #fff;
          line-height: 1.75rem;
          font-size: 0.875rem;

          .book-name {
            font-size: 1rem;
            overflow: hidden;
          }

          .recent-read,
          .book-name {
            overflow: hidden;
          }

          .continue-read {
            width: 5.0625rem;
            height: 1.75rem;
            margin-top: 0.25rem;
            border: 1px solid #fff;
            border-radius: 0.25rem;
            text-align: center;
          }
        }
      }
    }

    .library {
      background: #fff;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      padding: 1.25rem 1rem;

      .library-item {
        height: 10.4375rem;
        width: 5.6875rem;
        margin-bottom: 0.625rem;

        .library-item-wrapper {
          width: 100%;
          height: 100%;
          margin: 0 auto;

          .library-image {
            width: 100%;
            height: 7.8125rem;
            background: #ccc;
            border: 1px solid #f5f5f5;
            border-radius: 0.25rem;

            img {
              width: 100%;
              height: 100%;
              border: 1px solid #f5f5f5;
              border-radius: 0.25rem;
            }
          }

          .library-name {
            vertical-align: bottom;
            width: 100%;
            height: 2.625rem;
            box-sizing: border-box;
            padding-top: 0.625rem;
            font-size: 0.75rem;
            color: #5b5b59;
            text-align: left;
            overflow: hidden;

            .name {
              line-height: 1rem;
            }
          }

          &.add-wrapper {
            height: 7.8125rem;
            line-height: 7.8125rem;
            font-size: 2rem;
            color: #bfbfbf;
            background: #f0eff5;
            border: 1px solid #f5f5f5;
            border-radius: 0.25rem;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
