import axios from "axios";

export function getSearchList(query) {
  return axios.get(`/api/book/fuzzy-search?query=${query}`);
}

export function getSearchHot() {
  return axios.get(`/api/book/search-hotwords`);
}

// 获取各类排行榜
export function getRankType() {
  return axios.get("/api/ranking/gender");
}

// 获取排行榜数据
export function getRankList(id) {
  return axios.get("/api/ranking/" + id);
}

// 获取书本信息
export function getBookInfo(id) {
  return axios.get("/api/book/" + id);
}

// 获取同类作品推荐
export function getRecommendBook(id) {
  return axios.get(`/api/book/${id}/recommend`);
}

// 获取小说评论列表
export function getReviewsList(id, count) {
  return axios.get(
    `/api/post/review/best-by-book?book=${id}&&sort=comment-count&start=0&limit=${count}`
  );
}

// 获取小说源
export function getMixinSource(id) {
  return axios.get("/api/btoc?view=summary&book=" + id);
}

// 获取章节信息
export function getChapters(id) {
  return axios.get(`/api/btoc/${id}?view=chapters&channel=mweb`);
}

// 获取小说章节内容
export function getChapterText(id) {
  return axios.get(`/api/chapterapi/chapter/${id}/cv=1495097622174`);
}

export function getCategories() {
  return axios.get("/api/cats/lv2/statistics");
}

export function getCategory() {
  return axios.get("/api/cats/lv2");
}

export function getBookList(
  gender,
  type,
  major,
  minor = "",
  start = 0,
  limit = 20
) {
  return axios.get(
    `/api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`
  );
}
