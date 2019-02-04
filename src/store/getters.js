export const channels = state => state.channels;

export const category = state => state.category;

export const theme = state => state.theme;

export const currentBookId = state => state.currentBookId;

export const currentBook = state =>
  state.cachedBooks.filter(book => book.bookInfo.id === state.currentBookId)[0];

export const readingBook = (state, getter) => getter.collectedBooks[0];

export const lastReadingChapter = state =>
  state.cachedBooks.length
    ? state.cachedBooks[0].chapters[state.cachedBooks[0].chapterIndex].title
    : "";

export const collectedBooks = state =>
  state.cachedBooks.filter(book => book.isCollected);

export const banners = state => state.recommend.banners;

export const getRankByName = state => name =>
  state.recommend.rankList ? state.recommend.rankList[state.gender][name] : {};

export const chosenList = state => state.recommend.chosenList;

export const hotWords = state => state.search.hotWords;

export const history = state => state.search.history;
