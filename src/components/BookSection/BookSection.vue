<template>
  <div class="recommend" v-if="this.currentRank && currentRankBooks.length">
    <div class="recommend-title-wrapper">
      <div class="recommend-title">
        <span class="line-icon"></span>
        <span class="recommend-name">{{ currentRankTitle }}</span>
      </div>
      <div class="recommend-more" @click="selectMore">
        <span class="more-text">查看更多</span>
        <i class="icon-arrow"></i>
      </div>
    </div>
    <!-- layout A -->
    <div class="recommend-book-list" v-if="!this.type">
      <div class="recommend-top-book" @click="selectBook(currentRankBooks[0])">
        <div class="top-book-left">
          <img class="book-image" :src="currentRankBooks[0].image" />
        </div>
        <div class="top-book-right">
          <h1 class="top-book-name">{{ currentRankBooks[0].title }}</h1>
          <p class="top-book-short">{{ currentRankBooks[0].shortInfo }}</p>
          <div class="top-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">{{ currentRankBooks[0].author }}</span>
            </div>
            <div class="book-info">
              <span class="book-genre">{{ currentRankBooks[0].classifi }}</span>
              <span class="book-genre">{{
                currentRankBooks[0].minClass.substr(0, 2)
              }}</span>
              <span class="book-pop">{{ currentRankBooks[0].star }}人气</span>
            </div>
          </div>
        </div>
      </div>
      <div class="book-list">
        <div class="book-item" @click="selectBook(currentRankBooks[1])">
          <img class="book-item-image" :src="currentRankBooks[1].image" />
          <p class="book-item-name">{{ currentRankBooks[1].title }}</p>
          <p class="book-item-author">{{ currentRankBooks[1].author }}</p>
        </div>
        <div class="book-item" @click="selectBook(currentRankBooks[2])">
          <img class="book-item-image" :src="currentRankBooks[2].image" />
          <p class="book-item-name">{{ currentRankBooks[2].title }}</p>
          <p class="book-item-author">{{ currentRankBooks[2].author }}</p>
        </div>
        <div class="book-item" @click="selectBook(currentRankBooks[3])">
          <img class="book-item-image" :src="currentRankBooks[3].image" />
          <p class="book-item-name">{{ currentRankBooks[3].title }}</p>
          <p class="book-item-author">{{ currentRankBooks[3].author }}</p>
        </div>
      </div>
    </div>
    <!-- layout B -->
    <div class="hot-book-list" v-for="index in 3" :key="index" v-else>
      <div class="hot-top-book" @click="selectBook(currentRankBooks[index])">
        <div class="top-book-left">
          <img class="book-image" :src="currentRankBooks[index].image" />
        </div>
        <div class="top-book-right">
          <h1 class="top-book-name">{{ currentRankBooks[index].title }}</h1>
          <p class="top-book-short">{{ currentRankBooks[index].shortInfo }}</p>
          <div class="top-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">{{
                currentRankBooks[index].author
              }}</span>
            </div>
            <div class="book-info">
              <span class="book-genre">{{
                currentRankBooks[index].classifi
              }}</span>
              <span class="book-genre">{{
                currentRankBooks[index].minClass.substr(0, 2)
              }}</span>
              <span class="book-pop">{{ currentRankBooks[index].star }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-wrapper" v-else>
    <loading></loading>
  </div>
</template>
<script type="text/ecmascript-6">
import Loading from "../Loading/Loading.vue";

import { mapGetters } from "vuex";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      default: 0
    }
  },
  updated() {
    this.$emit("updated");
  },
  computed: {
    currentRank() {
      return this.getRankByName(this.name);
    },
    currentRankTitle() {
      return this.currentRank ? this.currentRank.title : "loading";
    },
    currentRankBooks() {
      return this.currentRank && this.currentRank.books
        ? this.currentRank.books
        : [];
    },
    ...mapGetters(["getRankByName"])
  },
  methods: {
    selectMore() {
      this.$emit("moreClick", this.name);
    },
    selectBook(book) {
      this.$router.push({
        name: "book_detail",
        params: {
          id: book.id
        }
      });
    }
  },
  components: {
    Loading
  }
};
</script>
<style scoped lang="scss">
.recommend-title-wrapper {
  width: 100%;
  height: 3.125rem;
  line-height: 3.125rem;
  vertical-align: middle;
  color: #5b5b59;

  .recommend-title {
    float: left;

    .line-icon {
      display: inline-block;
      height: 1.125rem;
      width: 0.1875rem;
      background: #43bb57;
      vertical-align: middle;
    }

    .recommend-name {
      font-size: 1rem;
    }
  }

  .recommend-more {
    float: right;
    font-size: 0.875rem;
  }
}

.recommend-book-list {
  .recommend-top-book {
    width: 100%;
    height: 7.8125rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f5f5f5;
    display: flex;

    .top-book-left {
      width: 5.625rem;
      margin-right: 1rem;
      height: 100%;

      .book-image {
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        border: 1px solid #f5f5f5;
      }
    }

    .top-book-right {
      flex: 1;
      display: flex;
      height: 100%;
      flex-direction: column;

      .top-book-name {
        font-size: 1rem;
        color: #101010;
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
      }

      .top-book-short {
        font-size: 0.875rem;
        text-indent: 1.5em;
        color: #9d9b9b;
        line-height: 1.25rem;
        height: 3.6875rem;
        overflow: hidden;
      }

      .top-book-info {
        flex: 1;
        position: relative;
        width: 100%;
        vertical-align: bottom;

        .book-author {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 0.75rem;
          color: #9d9d9b;
        }

        .book-info {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 0.625rem;
          color: #9d9d9b;

          span {
            display: inline-block;
            height: 0.75rem;
            line-height: 0.75rem;
            padding: 0 0.125rem;
            border: 1px solid #9d9d9b;
            margin-right: 2px;
          }
        }
      }
    }
  }

  .book-list {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    height: 11.875rem;
    width: 100%;

    .book-item {
      width: 5.625rem;
      height: 100%;
      display: flex;
      flex-direction: column;

      .book-item-image {
        width: 100%;
        height: 7.8125rem;
        border-radius: 0.25rem;
      }

      .book-item-name {
        font-size: 0.875rem;
        color: #5b5b59;
        margin: 0.625rem 0;
        overflow: hidden;
      }

      .book-item-author {
        height: 1rem;
        font-size: 0.75rem;
        color: #9d9d9b;
      }
    }
  }
}

.loading-wrapper {
  position: fixed;
  width: 100%;
  top: 200%;
  z-index: 998;
  margin-left: -4%;
}

.hot-book-list {
  border-bottom: 1px solid #f5f5f5;

  .hot-top-book {
    width: 100%;
    height: 7.8125rem;
    padding: 0.75rem 0;
    display: flex;

    &.middle,
    .top-book-left {
      width: 5.625rem;
      margin-right: 1rem;
      height: 100%;

      .book-image {
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        border: 1px solid #f5f5f5;
      }
    }

    .top-book-right {
      flex: 1;
      display: flex;
      height: 100%;
      flex-direction: column;

      .top-book-name {
        font-size: 1rem;
        color: #101010;
        height: 2rem;
        line-height: 2rem;
        overflow: hidden;
      }

      .top-book-short {
        font-size: 0.875rem;
        text-indent: 1.5em;
        color: #9d9d9b;
        line-height: 1.25rem;
        height: 3.6875rem;
        overflow: hidden;
      }

      .top-book-info {
        flex: 1;
        position: relative;
        width: 100%;
        vertical-align: bottom;

        .book-author {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 0.75rem;
          color: #9d9d9b;
        }

        .book-info {
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 0.625rem;
          color: #9d9d9b;

          span {
            display: inline-block;
            height: 0.75rem;
            line-height: 0.75rem;
            padding: 0 0.125rem;
            border: 1px solid #9d9d9b;
            margin-right: 2px;
          }
        }
      }
    }
  }
}
</style>
