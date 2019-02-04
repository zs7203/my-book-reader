import { getChapterText } from "../../api/search";

export default class Chapter {
  constructor({ title, textContent, isVip, id }) {
    this.title = title;
    this.textContent = textContent;
    this.isVip = isVip;
    this.id = id;
  }
}

function trimStr(text) {
  return (
    typeof text === "string" && text.split(/\u3002+\s+/).map(str => str.trim())
  );
}

export function createChapter(chapter) {
  return new Chapter({
    title: chapter.title,
    textContent: chapter.cpContent
      ? trimStr(chapter.cpContent)
      : chapter.body
      ? trimStr(chapter.body)
      : [],
    isVip: chapter.isVip,
    id: chapter.id
  });
}

// 获取章节文本
// export async function fetchChapterText() {
//   // 如果已缓存 则可以不用请求
//   if (!this.currentBook.chapterText[this.currentBook.readingChapterIndex]) {
//     let text = await this._getChapterText(
//       this.currentBook.readingChapterIndex
//     )
//     // 在currentBook的chapterText上保存文本
//     this.setChapterText({
//       text,
//       index: parseInt(this.currentBook.readingChapterIndex),
//     })
//   }
// }

export async function fetchChapterById(id) {
  let res = await getChapterText(id);
  return await createChapter(res.data.chapter);
}
