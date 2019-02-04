import * as types from "./types";

const mutations = {
  [types.SET_CHANNELS](state, channels) {
    state.channels = channels;
  },
  [types.SET_CATEGORY](state, category) {
    state.category = category;
  },
  [types.SET_THEME](state, { theme }) {
    state.theme = theme;
  },
  [types.RESTORE_THEME](state, { theme }) {
    state.theme = theme;
  },
  [types.ADD_CACHED_BOOKS](state, book) {
    state.cachedBooks = [book, ...state.cachedBooks];
  },
  [types.SET_CURRENT_BOOKID](state, bookId) {
    state.currentBookId = bookId;
  },
  [types.RESTORE_COLLECTED_BOOKS](state, { books }) {
    state.cachedBooks = books;
  },
  [types.ADD_TO_BOOK_SHELF](state, bookId) {
    let book = state.cachedBooks.filter(book => book.bookInfo.id === bookId)[0];
    book.isCollected = true;
  },
  [types.REMOVE_FROM_BOOK_SHELF](state, bookId) {
    let book = state.cachedBooks.filter(book => book.bookInfo.id === bookId)[0];
    book.isCollected = false;
  },
  [types.SORT_BOOK_ORDER](state, { book }) {
    let restBooks = state.cachedBooks.filter(
      item => item.bookInfo.id !== book.bookInfo.id
    );
    state.cachedBooks = [book, ...restBooks];
  },
  [types.APPEND_NEW_CHAPTER](state, { index, text }) {
    let book = state.cachedBooks.filter(
      book => book.bookInfo.id === state.currentBookId
    )[0];
    let oldChapterText = book.chapterText;
    oldChapterText[index] = text;
    book.chapterText = Array.from(oldChapterText);
    // oldChapterText.splice(index, 1, text)
  },
  [types.SET_CHAPTER_INDEX](state, index) {
    let book = state.cachedBooks.filter(
      book => book.bookInfo.id === state.currentBookId
    )[0];
    book.chapterIndex = parseInt(index);
  },
  [types.SET_RANK_LIST](state, { payload }) {
    state.recommend.rankList = payload;
  },
  [types.ADD_RANK_BOOKS](state, { name, books }) {
    state.recommend.rankList[state.gender][name] = {
      ...state.recommend.rankList[state.gender][name],
      books
    };
  },
  [types.SET_HOT_WORDS](state, { hotWords }) {
    state.search.hotWords = hotWords;
  },
  [types.ADD_SEARCH_HISTORY](state, { book }) {
    state.search.history = [book, ...state.search.history].slice(0, 9);
  },
  [types.TOGGLE_GENDER](state) {
    state.gender = state.gender === "male" ? "female" : "male";
  },
  [types.LOCALIZE_DATA](state) {
    state.dataLocalizing = true;
  },
  [types.LOCALIZE_DATA_SUCCESS](state) {
    state.dataLocalizing = false;
  }
};

export default mutations;
