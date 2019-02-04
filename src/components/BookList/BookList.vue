<template>
  <transition name="bookList">
    <div class="book-list" :style="{ paddingTop: '46px' }">
      <div class="wrapper">
        <van-nav-bar
          :title="this.name"
          left-text="返回"
          left-arrow
          @click-left="onBackClick"
          fixed
        />
        <van-list
          :offset="300"
          v-model="loading"
          :immediate-check="true"
          @load="onLoad"
          :finished="finished"
          ref="list"
        >
          <book-item
            v-for="book of displayBooks"
            :book="book"
            @selectBook="onSelectBook(book)"
            :key="book.id"
          />
        </van-list>
      </div>
    </div>
  </transition>
</template>

<script>
import BookItem from "../BookItem/BookItem.vue";

import chunk from "lodash.chunk";
import { mapGetters } from "vuex";

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      step: 20,
      groupIndex: 1
    };
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
    displayBooks() {
      return this.currentRankBooks.slice(0, this.groupIndex * this.step - 1);
    },
    rankGroups() {
      return chunk(this.currentRankBooks, 20);
    },
    ...mapGetters(["getRankByName"])
  },
  methods: {
    onBackClick() {
      this.$router.go(-1);
    },
    onSelectBook(book) {
      this.$router.push({
        name: "book_detail",
        params: { id: book.id }
      });
    },
    onLoad() {
      this.groupIndex++;
      this.loading = false;
      this.$nextTick(() => {
        this.$refs.list.check();
      });
      if (this.groupIndex * this.step >= this.currentRankBooks.length) {
        this.finished = true;
      }
    }
  },
  components: {
    BookItem
  }
};
</script>

<style lang="scss" scoped>
.book-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // width: 100%;
  // height: 100%;
  // overflow-y: scroll;
  z-index: 100;
  background-color: #fff;

  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    .van-list {
      padding-bottom: 50px;
    }
  }
}

.bookList-enter-active,
.bookList-leave-active {
  transition: all 0.3s;
}

.bookList-enter,
.bookList-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
