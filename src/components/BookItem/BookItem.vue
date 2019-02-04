<template>
  <div class="container" @click="selectBook(book)">
    <div class="img-wrapper">
      <img :src="book.image" alt="" />
    </div>
    <div class="content-wrapper">
      <div class="title">{{ book.title }}</div>
      <div class="prompt line-clamp">{{ book.shortInfo }}</div>
      <div class="info">
        <div class="author">
          <Icon name="contact"></Icon>
          <span class="name">{{ book.author }}</span>
        </div>
        <div class="tags">
          <Tag
            plain
            type="success"
            v-for="(tag, index) of [book.classifi, book.minClass, book.star]"
            :key="index"
            >{{ tag }}</Tag
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Tag } from "vant";

export default {
  name: "CategoryListItem",
  props: ["book"],
  components: {
    Icon,
    Tag
  },
  methods: {
    selectBook(book) {
      this.$emit("selectBook", book);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 7.4375rem;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: flex;
  .img-wrapper {
    width: 4rem;
    height: 100%;
    margin-right: 0.75rem;
    img {
      width: 4rem;
      height: 100%;
    }
  }
  .content-wrapper {
    flex: 1;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title {
      height: 1.375rem;
      line-height: 1.375rem;
      width: 100%;
      font-size: 1rem;
      color: #101010;
    }
    .prompt {
      font-size: 0.875rem;
      text-indent: 1.5em;
      color: #9d9d9b;
      line-height: 1.25rem;
      overflow: hidden;
    }
    .info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .author {
        font-size: 0.75rem;
        font-weight: normal;
        color: #9d9d9b;
        .name {
          margin-left: 0.125rem;
        }
      }
      .tags > * {
        margin-left: 0.125rem;
      }
    }
  }
}
.line-clamp {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
