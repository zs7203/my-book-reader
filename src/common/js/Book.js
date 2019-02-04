import {
  getBookInfo,
  getSearchList,
  getRecommendBook,
  getMixinSource,
  getReviewsList,
  getChapters
} from "../../api/search";
import { createReview } from "./Review.js";

// BookInfo对象
export default class Book {
  constructor({
    id,
    title,
    author,
    shortInfo,
    longInfo,
    star,
    classifi,
    minClass,
    image,
    ratingCount,
    ratingScore,
    words,
    update,
    lastChapter,
    isSerial,
    chaptersCount
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.shortInfo = shortInfo;
    this.longInfo = longInfo;
    this.star = star;
    this.classifi = classifi;
    this.minClass = minClass;
    this.image = image;
    this.ratingCount = ratingCount;
    this.ratingScore = ratingScore;
    this.words = words;
    this.update = update;
    this.lastChapter = lastChapter;
    this.chaptersCount = chaptersCount;
    this.isSerial = isSerial;
  }
}

function formatCount(num) {
  if (typeof num !== "number") return;
  return num.toString().length > 4 ? (num / 10000).toFixed(1) + "万" : num;
}

export function createBook(bookItem) {
  return new Book({
    id: bookItem._id, // 书本id
    title: bookItem.title, // 书名
    author: bookItem.author, // 作者
    shortInfo: bookItem.shortIntro, // 短介
    longInfo: bookItem.longIntro, // 详介
    star: formatCount(bookItem.latelyFollower), // 读者
    classifi: bookItem.cat || bookItem.majorCate, // 书类（大分类）
    minClass: bookItem.minorCate, // 书类（小分类）
    image: `http://statics.zhuishushenqi.com${bookItem.cover}`, // 书本图片
    ratingCount: bookItem.rating && formatCount(bookItem.rating.count), // 评分人数
    ratingScore:
      bookItem.rating &&
      typeof bookItem.rating.score === "number" &&
      bookItem.rating.score.toFixed(1), // 评分
    words: formatCount(bookItem.wordCount), // 总字数
    update: bookItem.updated, // 最近更新时间
    lastChapter: parseInt(bookItem.lastChapter), // 最新章节
    chaptersCount: bookItem.chaptersCount, // 总章节数
    isSerial: bookItem.isSerial ? "连载中" : "已完结"
  });
}

// 主要用在BookDetail页面组件中
export async function fetchBookById(id) {
  // book 即cachedBooks中的储存的实体
  let book = {};
  //页头 - 通过书籍id 获取书籍详情数据
  let rawBookInfo = await getBookInfo(id);
  book.bookInfo = createBook(rawBookInfo.data || {});

  //ReviewList - 获取同一书籍作者的其他作品
  let rawReviews = await getReviewsList(id, 100);
  book.reviews = (rawReviews.data || []).reviews.map(item =>
    createReview(item)
  );

  // BookSlider1 - 获取同一书籍作者的其他作品
  let rawSameAuthor = await getSearchList(book.bookInfo.author);
  book.authorBooks = (rawSameAuthor.data || []).books
    .filter(item => item.author === book.bookInfo.author)
    .map(item => createBook(item));

  //BookSlider2 - 基于当前书籍 获取其他类似书籍的推荐
  let rawRecommendBooks = await getRecommendBook(id);
  book.recommendBooks = (rawRecommendBooks.data || []).books.map(item =>
    createBook(item)
  );

  // 书籍内容查询需要转换一次ID 使用sourceId
  let rawSouce = await getMixinSource(id);
  book.sourceId = rawSouce.data[0]._id;

  //ChapterList - 获取评论数据 注意id
  let rawChapters = await getChapters(book.sourceId);
  book.chapters = rawChapters.data.chapters;

  return book;
}
