<template>
  <div class="book-info-wrapper" ref="bookInfo">
    <div class="book-image">
      <img :src="bookInfo.image" />
    </div>
    <div class="book-info">
      <h1 class="book-name">{{ bookInfo.title }}</h1>
      <p class="book-author">{{ bookInfo.author }}</p>
      <div class="rating-wrapper">
        <div class="rating-star">
          <span v-for="(item, index) in starClass" :key="index">
            <i :class="item"></i>
          </span>
        </div>
        <p class="rating-info">
          {{ bookInfo.ratingScore }}分 ({{ bookInfo.ratingCount }}人评)
        </p>
      </div>
      <p class="category">{{ bookInfo.classifi }} | {{ bookInfo.minClass }}</p>
      <p class="words">{{ bookInfo.words }}字 | {{ bookInfo.isSerial }}</p>
    </div>
  </div>
</template>

<script>
import { getStarScore } from "../../common/js/util";

const COMPONENT_NAME = "BookInfo";
export default {
  name: COMPONENT_NAME,
  props: {
    bookInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    starClass() {
      return getStarScore(this.bookInfo.ratingScore);
    }
  }
};
</script>

<style lang="scss" scoped>
.book-info-wrapper {
  height: 8.75rem;
  box-sizing: border-box;
  padding: 0.875rem 1rem;
  display: flex;

  .book-image {
    height: 100%;
    width: 5.3125rem;
    margin-right: 1.625rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .book-info {
    color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;

    .book-name {
      font-size: 1rem;
      width: 100%;
      height: 1.625rem;
      overflow: hidden;
    }

    .book-author {
      height: 1.5rem;
    }

    .rating-wrapper {
      width: 100%;
      height: 1.5rem;
      height: 1.5rem;
      display: flex;

      .rating-star {
        color: #ebc44d;
        margin-right: 0.25rem;
      }
    }

    .category {
      height: 1.5rem;
      width: 100%;
    }
  }
}
</style>
