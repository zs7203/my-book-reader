import * as types from "./types";
import {
  loadThemeFromStorage,
  // setThemeToStorage,
  loadCollectedBookFromStorage
} from "../common/js/storage";
import { fetchBookById, createBook } from "../common/js/Book";
import { fetchChapterById } from "../common/js/Chapter";
import { getRankType, getRankList, getSearchHot } from "../api/search.js";

export const restoreTheme = async function({ commit, state }) {
  let theme = { ...state.theme, ...(await loadThemeFromStorage()) };
  commit(types.RESTORE_THEME, { theme });
};

export const restoreCollectedBook = async function({ commit }) {
  let books = await loadCollectedBookFromStorage();
  commit(types.RESTORE_COLLECTED_BOOKS, { books });
};

export const getBookById = async function({ commit, state }, bookId) {
  if (bookId === state.currentBookId) return;
  let exists = state.cachedBooks.some(book => book.bookInfo.id === bookId);
  if (!exists) {
    let newBook = await fetchBookById(bookId);
    // 确保book每个属性都有合理的初始值
    let newShimmedBook = {
      ...newBook,
      isCollected: false,
      chapterIndex: 0,
      chapterText: []
    };
    // check again. For during async [fetchBookById],
    // local storage restore process may mutate [cachedBooks]
    exists = state.cachedBooks.some(book => book.bookInfo.id === bookId);
    if (!exists) {
      commit(types.ADD_CACHED_BOOKS, newShimmedBook);
    }
  }
  commit(types.SET_CURRENT_BOOKID, bookId);
};

export const getChapterByIndex = async function({ commit, state }, index) {
  let book = state.cachedBooks.filter(
    book => book.bookInfo.id === state.currentBookId
  )[0];
  //请求章节超出范围
  if (!book.chapters[index]) return;
  let chapter = book.chapterText[index];
  if (!chapter) {
    // 没有缓存
    let chapterId = book.chapters[index].id;
    let text = await fetchChapterById(chapterId);
    commit(types.APPEND_NEW_CHAPTER, { index, text });
  }
  commit(types.SET_CHAPTER_INDEX, index);
};

//榜单的书籍添加到榜单对象的books属性上
export const getCurrentRankBooks = async function({ commit, state }, { name }) {
  if (!state.recommend.rankList) {
    let payload = {};
    let rawRankType = await getRankType();
    payload.male = rawRankType.data.male.reduce(
      (acc, cur) => ((acc[cur.shortTitle] = cur), acc),
      {}
    );
    payload.female = rawRankType.data.female.reduce(
      (acc, cur) => ((acc[cur.shortTitle] = cur), acc),
      {}
    );
    commit({ type: types.SET_RANK_LIST, payload });
  }
  let targetList = state.recommend.rankList[state.gender][name];
  if (!targetList.books) {
    let rawBooks = await getRankList(targetList._id);
    let books = rawBooks.data.ranking.books.map(book => createBook(book));
    commit({ type: types.ADD_RANK_BOOKS, name, books });
  }
};

export const getHotWords = async function({ commit, state }) {
  if (state.search.hotWords.length) return;
  let rawHotWords = await getSearchHot();
  commit("SET_HOT_WORDS", { hotWords: rawHotWords.data.searchHotWords });
};
