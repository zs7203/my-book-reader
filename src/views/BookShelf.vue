<template>
  <div class="container">
    <div class="header">
      <div class="reading-book" v-if="readingBook">
        <img
          :src="readingBook.bookInfo.image"
          :alt="readingBook.bookInfo.title"
        />
        <div class="title van-ellipsis">{{ readingBook.bookInfo.title }}</div>
        <div class="progress van-ellipsis">{{ lastReadingChapter }}</div>
        <van-button
          class="resume"
          type="primary"
          size="small"
          @click="continueReading"
          >继续阅读</van-button
        >
      </div>
      <div class="placeholder" v-else>
        <svg class="icon my-icon" aria-hidden="true">
          <use xlink:href="#icon-star-empty"></use>
        </svg>
        <h1>空空如也</h1>
      </div>
    </div>
    <div class="book-shelf">
      <div
        class="book"
        v-for="(book, index) of collectedBooks"
        :key="index"
        @click="selectBook(book)"
      >
        <img
          class="book-cover"
          :src="book.bookInfo.image"
          :alt="book.bookInfo.title"
        />
        <!--<p class="book-title">{{book.bookInfo.title}}</p>-->
      </div>
      <div class="book icon-add" @click="addBook">
        <van-icon name="add-o" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions, mapMutations} from "vuex";
import {SORT_BOOK_ORDER, REMOVE_FROM_BOOK_SHELF} from "../store/types.js";

const COMPONENT_NAME = "BOOK_SHELF";
export default {
  name: COMPONENT_NAME,
  computed: {
    ...mapGetters(["lastReadingChapter", "readingBook", "collectedBooks"])
  },
  methods: {
    addBook() {
      this.$router.push({
        name: "recommend"
      });
    },
    continueReading() {
      this.$router.push({
        name: "reader",
        params: {
          bookId: this.readingBook.bookInfo.id,
          chapterIndex: this.readingBook.chapterIndex
        }
      });
    },
    selectBook(book) {
      this.sortBookOrder({book})
      this.$router.push({
        name: "reader",
        params: {
          bookId: book.bookInfo.id,
          chapterIndex: book.chapterIndex
        }
      });
    },
    ...mapActions(["selectRead", "deleteBook"]),
    ...mapMutations({
      removeBook: REMOVE_FROM_BOOK_SHELF,
      sortBookOrder: SORT_BOOK_ORDER,
    })
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 50px;
  display: flex;
  flex-flow: column nowrap;
  /*background: url("../common/image/shelf.jpg");*/
  /*background-size: contain;*/
  background-color: #21d4fd;
  background-image: linear-gradient(26deg, #21d4fd 0%, #24062f 100%);
  .header {
    width: 100%;
    flex-basis: 16.125rem;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    .placeholder {
      text-align: center;
      color: #f8f8f8;

      .my-icon {
        margin: 0.5rem;
        font-size: 24px;
      }
    }
  }
  .book-shelf {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    padding: 0.5rem;
    background-color: rgba(256, 256, 256, 0.6);
    .book {
      width: 5.6875rem;
      height: 7.8125rem;
      border-radius: 0.5rem;
      margin: 0.5rem 0;

      .book-cover {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
      .book-title {
        font-size: 12px;
        color: #444;
      }
      &.icon-add {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #e5e5e5;
        font-size: 32px;
        border: 1px solid #f5f5f5;
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.reading-book {
  display: inline-grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: auto 8rem;
  grid-column-gap: 1rem;
  font-size: 12px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  color: #f0eff5;
  max-width: 80%;
  height: 7.8125rem;

  img {
    grid-row: 1/6;
    grid-column: 1/2;
    width: 5.6875rem;
    height: 7.8125rem;
    object-fit: contain;
    border-radius: 0.5rem;
  }
  .title {
    grid-row: 3/4;
    grid-column: 2/3;
    font-size: 16px;
    font-weight: 600;
  }
  .progress {
    grid-row: 4/5;
    grid-column: 2/3;
  }
  .resume {
    grid-row: 5/6;
    grid-column: 2/3;
  }
}
</style>
