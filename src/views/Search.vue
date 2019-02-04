<template>
  <div>
    <!-- top search header -->
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <div v-if="!this.suggestions.length">
      <!-- hot words list -->
      <van-panel title="热门搜索" desc="热门">
        <div slot="header" class="van-cell van-hairline van-panel__header">
          <div class="van-cell__title">
            <span>热门搜索</span>
            <van-button
              size="mini"
              :style="{ float: 'right' }"
              @click="onTaggleHotWords"
              >换一换</van-button
            >
          </div>
        </div>
        <div slot="footer">
          <div
            class="tag-wrapper"
            v-for="(item, index) of groupWords[index % groupWords.length]"
            :key="index"
            @click="onHotWordClick(item)"
          >
            <van-tag plain type="success">{{ item.word }}</van-tag>
          </div>
        </div>
      </van-panel>
      <!-- search history -->
      <van-cell-group>
        <van-cell
          v-for="(book, index) of history"
          :title="book.title"
          :key="index"
          @click="onHistoryClick(book)"
        >
          <van-icon
            slot="right-icon"
            name="search"
            class="van-cell__right-icon"
          />
        </van-cell>
      </van-cell-group>
    </div>
    <Scroll :data="this.suggestions" v-else>
      <van-cell-group>
        <van-cell
          v-for="(book, index) of suggestions"
          :key="index"
          icon="search"
          clickable
          @click="onSuggestionClick(book)"
        >
          <template>
            <span class="van-cell-text">{{ book.title }}</span>
            <van-tag
              type="primary"
              size="mini"
              slot="right-icon"
              plain
              class="search-tag"
              >{{ book.author }}</van-tag
            >
            <van-tag
              type="success"
              size="mini"
              slot="right-icon"
              plain
              mark
              class="search-tag"
              >{{ book.classifi }}</van-tag
            >
          </template>
        </van-cell>
      </van-cell-group>
    </Scroll>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import chunk from "lodash.chunk";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getSearchList } from "../api/search.js";
import { createBook } from "../common/js/Book.js";
import Scroll from "../components/Scroll/Scroll.vue";

export default {
  data() {
    return {
      index: 0,
      keyword: "",
      suggestions: []
      // showQuery: false,
    };
  },
  computed: {
    groupWords() {
      // let i = 0,
      //   arr = []
      // let temp = this.hotWords.slice(20 * i, 20 * ++i)
      // while (temp.length) {
      //   arr.push(temp)
      //   temp = this.hotWords.slice(20 * i, 20 * ++i)
      // }
      // return arr
      return chunk(this.hotWords, 20);
    },
    ...mapGetters(["hotWords", "history"])
  },
  created() {
    this.getHotWords();
    this.debouncedGetSuggestions = debounce(this.getSuggestions, 500);
  },
  methods: {
    onSearch() {
      this.debouncedGetSuggestions();
    },
    onCancel() {
      debugger;
      this.suggestions = [];
    },
    onTaggleHotWords() {
      this.index++;
    },
    onHotWordClick(tag) {
      this.keyword = tag.word;
    },
    onSuggestionClick(book) {
      this.addSearchHistory({ book });
      this.$router.push({
        name: "book_detail",
        params: {
          id: book.id
        }
      });
      this.suggestions = [];
    },
    onHistoryClick(book) {
      this.$router.push({
        name: "book_detail",
        params: {
          id: book.id
        }
      });
      this.suggestions = [];
    },
    async getSuggestions() {
      if (this.keyword.length < 1) {
        return;
      }
      let rawSuggestions = await getSearchList(this.keyword);
      this.suggestions = rawSuggestions.data.books.map(item =>
        createBook(item)
      );
    },
    ...mapMutations({
      addSearchHistory: "ADD_SEARCH_HISTORY"
    }),
    ...mapActions(["getHotWords"])
  },
  watch: {
    keyword() {
      if (this.keyword === "") {
        this.suggestions = [];
      }
      this.debouncedGetSuggestions();
    }
    // suggestions() {
    //   this.suggestions.length
    //     ? (this.showQuery = true)
    //     : (this.showQuery = false)
    // },
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.tag-wrapper {
  display: inline-block;
  margin: 0.4rem;
}

.search-tag {
  width: fit-content;
  height: fit-content;
  max-width: 4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  overflow: hidden;
}
</style>
