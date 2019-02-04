<template>
  <div style="marginBottom: 4rem; marginTop: 46px">
    <van-nav-bar title="精选" left-arrow fixed @click-left="back" />
    <div class="tab-wrapper">
      <div class="tab">
        <div
          class="tab-item"
          v-for="(item, index) in types"
          :class="{ selected: index === typeIndex }"
          @click="typeIndex = index"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="tab">
        <div
          class="tab-item"
          v-for="(item, index) in category.slice(0, 5)"
          :class="{ selected: index === minorIndex }"
          @click="minorIndex = index"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <List
      :offset="0"
      v-model="loading"
      :immediate-check="false"
      loading-text="努力加载中..."
      @load="onLoad"
    >
      <book-item
        v-for="(book, index) of bookList"
        :book="book"
        @selectBook="selectBook(book)"
        :key="index"
      />
    </List>
  </div>
</template>

<script>
import { List } from "vant";
import BookItem from "../components/BookItem/BookItem.vue";
import { getCategory, getBookList } from "../api/search.js";
import { createBook } from "../common/js/Book";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "category",
  components: {
    List,
    BookItem
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      types: [
        { key: "hot", name: "最热" },
        { key: "new", name: "最新" },
        { key: "reputation", name: "口碑" },
        { key: "over", name: "完结" },
        { key: "monthly", name: "包月" }
      ],
      typeIndex: 0,
      category: [],
      bookList: [],
      minorIndex: 0,
      start: 0,
      limit: 20,
      pullup: true,
      probeType: 3,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["channels"])
  },
  created() {
    setTimeout(() => {
      this._getCategory();
      this._getBookList(this.gender, this.types[this.typeIndex].key, this.name);
    }, 60);
    this.setCategory({ gender: this.gender, name: this.name });
  },
  methods: {
    back() {
      this.$router.back();
    },
    onLoad() {
      this.start += this.limit;
      let category = this.minorIndex ? this.category[this.minorIndex] : ""; //“全部”返回''

      this._getBookList(
        this.gender,
        this.types[this.typeIndex].key,
        this.name,
        category,
        this.start,
        this.limit
      ).then(() => (this.loading = false));
    },
    selectBook(book) {
      this.$router.push({
        path: `/book/${book.id}`
      });
    },
    async _getCategory() {
      let mainCats = await getCategory();
      let category = mainCats.data[this.gender].filter(
        cat => cat.major === this.name
      )[0];
      this.category = category.mins;
      this.category.unshift("全部");
    },
    _getBookList(gender, type, major, minor, start, limit) {
      return getBookList(gender, type, major, minor, start, limit).then(res => {
        if (res.data.books && res.data.books.length) {
          let data = res.data.books.map(item => createBook(item));
          this.bookList = [...this.bookList, ...data];
        }
      });
    },
    ...mapMutations({
      setCategory: "SET_CATEGORY"
    })
  },
  watch: {
    typeIndex(newI) {
      this.start = 0;
      this.bookList = [];
      let category = this.minorIndex ? this.category[this.minorIndex] : ""; //“全部”返回''
      this._getBookList(
        this.gender,
        this.types[newI].key,
        this.name,
        category,
        this.start,
        this.limit
      );
    },
    minorIndex(newI) {
      this.start = 0;
      this.bookList = [];
      let category = newI ? this.category[newI] : "";
      this._getBookList(
        this.gender,
        this.types[this.typeIndex].key,
        this.name,
        category,
        this.start,
        this.limit
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-wrapper {
  display: flex;
  flex-flow: column nowrap;
  color: #757575;
  .tab {
    display: flex;
    padding: 0.25rem 0.625rem;
    border-bottom: 1px solid #f5f5f5;
    .tab-item {
      font-size: 0.75rem;
      margin: 0.125rem;
      padding: 0.25rem 0.25rem;
      &.selected {
        border: 1px solid #43bb57;
        border-radius: 0.8125rem;
        color: #43bb57;
      }
    }
  }
}
</style>
