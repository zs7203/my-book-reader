import storage from "localforage";

const BOOK_KEY = "__BOOK__";
const READ_KEY = "__READ__";
const THEME_KEY = "__THEME__";
const SEARCH_HISTORY_KEY = "__SEARCH__";

// 在本地存储中读取已添加书本
export const loadStorage = async function() {
  return (await storage.getItem(BOOK_KEY)) || {};
};

// 将收藏的书籍添加到本地存储
export const saveStorage = async function(book) {
  let books = await loadStorage();
  if (!books[book.bookInfo.id]) {
    books[book.bookInfo.id] = book;
  }
  storage.setItem(BOOK_KEY, books);
  return books;
};

// 在本地存储中删除某书本
export const deleteStorage = async function(book) {
  let books = await loadStorage();
  if (books[book.bookInfo.id]) {
    delete books[book.bookInfo.id];
  }
  return await storage.setItem(books);
};

// 从本地存储中获取正在阅读的书
export const loadReading = async function() {
  return await storage.getItem(READ_KEY);
};

// 把正在阅读的书添加到本地存储
export const saveReading = async function(book) {
  return await storage.setItem(READ_KEY, book);
};

export const loadThemeFromStorage = async function() {
  return (await storage.getItem(THEME_KEY)) || {};
};
export const saveThemeToStorage = async function(theme) {
  return await storage.setItem(THEME_KEY, theme);
};

export const loadCollectedBookFromStorage = async function() {
  return (await storage.getItem(BOOK_KEY)) || [];
};
export const saveCollectedBookToStorage = async function(books) {
  return await storage.setItem(BOOK_KEY, books);
};

export const setSearchHistory = async function(query) {
  let storages = (await storage.getItem(SEARCH_HISTORY_KEY)) || [];
  let index = storages.findIndex(item => item === query);
  index < -1 ? null : storages.splice(index, 1);
  storages.unshift(query);
  storages.length > 10 ? storages.pop() : null;
  storage.setItem(SEARCH_HISTORY_KEY, storages);
  return storages;
};

export const deleteOneSearch = async function(query) {
  let storages = (await storage.getItem(SEARCH_HISTORY_KEY)) || [];
  let index = storages.findIndex(item => item === query);
  index < -1 ? null : storages.splice(index, 1);
  await storage.setItem(SEARCH_HISTORY_KEY, storages);

  return storages;
};

export const deleteAllSearch = async function() {
  await storage.setItem(SEARCH_HISTORY_KEY, []);
  return [];
};

export const loadSearchHistory = async function() {
  return (await storage.getItem(SEARCH_HISTORY_KEY)) || [];
};
