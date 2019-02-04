<template>
  <transition name="bookDetail">
    <div class="book-detail">
      <!-- Loading组件 -->
      <div class="loadding-wrapper" v-if="isLoading">
        <loading></loading>
      </div>
      <div class="top-title">
        <van-icon class="van-icon-arrow-left" @click="back" />
        <p class="top-book-name" v-show="showTopTitle">
          {{ currentBookTitle }}
        </p>
        <div class="top-title-layer" v-show="upMove" ref="topTitle"></div>
      </div>
      <div class="bg-layer" ref="bgLayer"></div>
      <div class="book-detail-content" ref="detailContent">
        <scroll
          class="content"
          :data="[
            ...currentBookReviews,
            ...currentBookAuthorBooks,
            ...currentBookRecommendBooks
          ]"
          :probe-type="probeType"
          :listen-scroll="listenScroll"
          @scroll="scroll"
          ref="content"
        >
          <div>
            <!-- BookInfo 封面信息 -->
            <book-info :bookInfo="currentBookInfo" ref="bookInfo" />
            <book-summary
              :bookInfo="Object.assign({}, currentBookInfo, { lastChapter })"
              @expand="showChapters"
            />
            <div class="book-reviews">
              <div class="book-reviews-title">
                <h1 class="title">书评</h1>
              </div>
              <div class="book-reviews-content">
                <review :data="currentBookReviews.slice(0, 3)"></review>
              </div>
              <div class="book-reviews-more" @click="showReviewsList">
                <h1 class="title">查看更多</h1>
              </div>
            </div>
            <div class="book-slider-wrapper">
              <book-slider
                title="作者其他作品"
                @selectBook="selectBook"
                :data="currentBookAuthorBooks"
              ></book-slider>
            </div>
            <div class="book-slider-wrapper">
              <book-slider
                title="同类作品推荐"
                @selectBook="selectBook"
                :data="currentBookRecommendBooks"
              ></book-slider>
            </div>
          </div>
        </scroll>
      </div>
      <!-- BookTab组件 -->
      <action-tab
        :collected="isCollected"
        @add="addToShelf"
        @read="startReading"
      />
      <!-- BookChapter组件 -->
      <div class="book-chapter-wrapper">
        <book-chapter
          :chapters="currentBookChapters"
          ref="chapters"
          :title="currentBookTitle"
          :author="currentBookAuthor"
          @select="selectChapter"
        />
      </div>
      <!-- ReviewList组件 -->
      <div class="book-review-wrapper">
        <review-list :data="currentBookReviews" ref="reviews" />
      </div>
      <!-- 2s悬浮提示 -->
      <p class="add-text" :class="{ active: showAdd }">加入书架成功</p>
    </div>
  </transition>
</template>

<script>
import Loading from "../components/Loading/Loading.vue";
import Scroll from "../components/Scroll/Scroll.vue";
import BookInfo from "../components/BookInfo/BookInfo.vue";
import BookSlider from "../components/BookSlider/BookSlider.vue";
import BookChapter from "../components/BookChapter/BookChapter.vue";
import Review from "../components/Review/Review.vue";
import ReviewList from "../components/ReviewList/ReviewList.vue";
import BookSummary from "../components/BookSummary/BookSummary.vue";
import ActionTab from "../components/ActionTab/ActionTab.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "BookDetail",
  props: {
    id: {
      type: String,
      default: "5816b415b06d1d32157790b1",
      required: true
    }
  },
  data() {
    return {
      boodId: "",
      sameAuthor: [], //同一作者的其他作品
      sameGenre: [], //基于当前书的相关推荐
      bookInfo: {}, //当前书
      reviewsList: [], //评论列表
      source: [], //当前书籍来源
      chapters: [], //章节列表
      // topTitle: '',
      showTopTitle: true, //是否显示 标题栏书籍名称
      scrollY: 0, //纵向滚动位置
      listenScroll: false, //scroll 设置
      probeType: 0, //scroll 设置
      upMove: true,
      // starClass: [],
      showAdd: false //加入书架动作成功 提示悬浮框
    };
  },
  computed: {
    isLoading() {
      return this.id !== this.currentBookId;
    },
    isCurrentBookAvailable() {
      return !!this.currentBook;
    },
    currentBookInfo() {
      return this.isCurrentBookAvailable ? this.currentBook.bookInfo : {};
    },
    currentBookTitle() {
      return this.isCurrentBookAvailable
        ? this.currentBook.bookInfo.title
        : "title";
    },
    currentBookAuthor() {
      return this.isCurrentBookAvailable
        ? this.currentBook.bookInfo.author
        : "author";
    },
    currentBookReviews() {
      return this.isCurrentBookAvailable ? this.currentBook.reviews : [];
    },
    currentBookChapters() {
      return this.isCurrentBookAvailable ? this.currentBook.chapters : [];
    },
    currentBookAuthorBooks() {
      return this.isCurrentBookAvailable ? this.currentBook.authorBooks : [];
    },
    currentBookRecommendBooks() {
      return this.isCurrentBookAvailable ? this.currentBook.recommendBooks : [];
    },
    isCollected() {
      return !!this.currentBook && this.currentBook.isCollected;
    },
    // 最新章节名称
    lastChapter() {
      return this.isCurrentBookAvailable &&
        this.currentBookChapters[this.currentBookChapters.length - 1].title
        ? this.currentBookChapters[this.currentBookChapters.length - 1].title
        : "";
    },
    ...mapGetters([
      "currentBook",
      "collectedBooks",
      "currentBookId",
      "category"
    ])
  },
  created() {
    this.getBookById(this.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getBookById(to.params.id);
    next();
  },

  methods: {
    back() {
      // this.$router.push({
      //   name: "category",
      //   params: this.category
      // });
      this.$router.go(-1);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    scrollToTop() {
      this.$refs.content.scrollTo(0, 0, 1000, {
        style: "cubic-bezier(0.19, 1, 0.22, 1)"
      });
    },
    showReviewsList() {
      this.$refs.reviews.show();
    },
    showChapters() {
      this.$refs.chapters.show();
    },
    // 跳转到阅读
    startReading() {
      this.$router.push({
        name: "reader",
        params: {
          bookId: this.currentBookInfo.id,
          chapterIndex: this.currentBook.chapterIndex
        }
      });
    },
    // 添加到收藏
    addToShelf() {
      if (this.collected) {
        return;
      }
      this.addToBookShelf(this.id);
      this.showAddSuccess();
    },
    showAddSuccess() {
      this.showAdd = true;
      setTimeout(() => {
        this.showAdd = false;
      }, 1000);
    },
    // // 是否已在收藏夹中？
    // filterStorage() {
    //   if (
    //     this.collectedBooks.some(
    //       book => book.bookInfo.id === this.currentBookId
    //     )
    //   ) {
    //     this.collected = true
    //     return
    //   }
    //   this.collected = false
    // },
    // BookSlider中选中某书
    selectBook(book) {
      this.scrollToTop();
      this.$router.push({
        name: "book_detail",
        params: {
          id: book.id
        }
      });
    },
    // BookChapter中选中某章节
    selectChapter(item, index) {
      // this.setCurrentBook({ index })
      this.$refs.chapters.hide();
      this.$router.push({
        // path: `/booktext/${this.currentBook.bookInfo.id}`,
        name: "reader",
        params: {
          bookId: this.currentBookInfo.id,
          chapterIndex: index
        }
      });
    },
    ...mapMutations({
      setCurrentBook: "SET_CURRENT_BOOK",
      setCurrentId: "SET_CURRENT_ID",
      addToBookShelf: "ADD_TO_BOOK_SHELF"
      // bookUpdate: 'BOOK_UPDATE'
      // setReadingChapter: 'SET_READING_CHAPTER',
    }),
    ...mapActions(["loadStorageList", "saveStorageList", "getBookById"])
  },
  // watch: {
  //   isCollected(to, from) {
  //     if (to === true) {
  //       this.showAddSuccess()
  //     }
  //   },
  // },
  components: {
    Scroll,
    Loading,
    BookInfo,
    BookSlider,
    BookChapter,
    ReviewList,
    Review,
    BookSummary,
    ActionTab
  }
};
</script>
<style lang="scss" scoped>
.book-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: #f0eff5;

  .add-text {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3rem;
    width: 12rem;
    margin: -1.5rem 0 0 -6rem;
    text-align: center;
    line-height: 3rem;
    border-radius: 0.25rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.9);
    transition: all 0.3s;
    opacity: 0;

    &.active {
      transition: all 0.3s;
      opacity: 1;
    }
  }

  .top-title {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 2.75rem;
    line-height: 2.75rem;
    margin-left: 0.5rem;
    color: #fff;

    .top-title-layer {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: url("../common/image/loading/book-image2.jpg") no-repeat;
      background-size: cover;
      transform-origin: top;
      z-index: -1;
    }

    .icon-back {
      display: inline-block;
      width: 2rem;
      height: 100%;
      font-size: 1.25rem;
      text-align: center;
    }

    .top-book-name {
      position: absolute;
      top: 0;
      left: 15%;
      width: 70%;
      text-align: center;
      overflow: hidden;
    }
  }

  .bg-layer {
    position: absolute;
    top: 0;
    width: 100%;
    height: 11.5rem;
    left: 0;
    background: url("../common/image/loading/book-image2.jpg") no-repeat;
    background-size: cover;
    transform-origin: top;
    z-index: -998;
  }

  .book-detail-content {
    position: absolute;
    top: 2.75rem;
    bottom: 3.25rem;
    width: 100%;

    .content {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .book-reviews {
        background: #fff;
        margin-bottom: 0.875rem;

        .book-reviews-title {
          padding: 0 1rem;
          color: #101010;

          .title {
            line-height: 2.5rem;
            border-bottom: 1px solid #f5f5f5;
          }
        }

        .book-reviews-more {
          padding: 0 1rem;
          color: #43bb57;

          .title {
            width: 100%;
            font-size: 0.875rem;
            line-height: 2.5rem;
            border-top: 1px solid #f5f5f5;
            text-align: center;
          }
        }
      }

      .book-slider-wrapper {
        margin-bottom: 0.875rem;
      }
    }
  }

  .loadding-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.8);
  }

  .book-chapter-wrapper {
    width: 100%;
    height: 100%;
  }
}

.bookDetail-enter-active,
.bookDetail-leave-active {
  transition: all 0.3s;
}

.bookDetail-enter,
.bookDetail-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
