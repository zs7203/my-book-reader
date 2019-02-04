export default class Review {
  constructor({ author, avatar, comments, content, praise, title, updated }) {
    this.author = author;
    this.avatar = avatar;
    this.comments = comments;
    this.content = content;
    this.praise = praise;
    this.title = title;
    this.updated = updated;
  }
}

export function createReview(review) {
  return new Review({
    author: review.author.nickname,
    avatar: `http://statics.zhuishushenqi.com${review.author.avatar}`,
    comments: review.commentCount,
    content: review.content,
    praise: review.likeCount,
    title: review.title,
    updated: review.updated
  });
}
