// import {
//   loadStorage,
//   loadReading,
//   loadReadStyle,
//   loadSearchHistory
// } from "../common/js/storage";

const state = {
  dataLocalizing: false,
  channels: {},
  theme: {
    colors: ["#f6f6f6", "#e1d4b2", "#bed8ab", "#efc1c1", "#dcc49e", "#d9e8ff"],
    index: 0,
    fontSize: 14
  },
  gender: "male",
  cachedBooks: [], // 所有缓存的书籍
  currentBookId: "", // 当前书籍的ID
  recommend: {
    banners: [
      "../common/image/banner/0.jpg",
      "../common/image/banner/1.jpg",
      "../common/image/banner/2.jpg",
      "../common/image/banner/3.jpg"
    ],

    rankList: null,
    chosenList: [
      { name: "最热榜", type: 0 },
      { name: "好评榜", type: 1 },
      { name: "完结榜", type: 1 }
    ]
  },
  search: {
    hotWords: [],
    history: []
  }
};

export default state;
