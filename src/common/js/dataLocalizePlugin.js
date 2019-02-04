import * as types from "../../store/types.js";
import { saveCollectedBookToStorage, saveThemeToStorage } from "./storage";

export default function createDataLocalizePlugin(store) {
  store.subscribe(async mutation => {
    switch (mutation.type) {
      // mutations need to sync with local storage
      case types.ADD_TO_BOOK_SHELF:
      case types.REMOVE_FROM_BOOK_SHELF:
      case types.SORT_BOOK_ORDER:
      case types.APPEND_NEW_CHAPTER:
      case types.SET_CHAPTER_INDEX:
        store.commit(types.LOCALIZE_DATA);
        await saveCollectedBookToStorage(store.getters.collectedBooks);
        store.commit(types.LOCALIZE_DATA_SUCCESS);
        break;
      case types.SET_THEME:
        store.commit(types.LOCALIZE_DATA);
        await saveThemeToStorage(mutation.payload.theme);
        store.commit(types.LOCALIZE_DATA_SUCCESS);
    }
  });
}
