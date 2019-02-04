<template>
  <div class="book-content" v-show="bookInfo.id">
    <h1 class="short-title">简介</h1>
    <p class="short-info">{{ bookInfo.longInfo }}</p>
    <div class="catalog-wrapper" @click="onExpand">
      <span class="catalog-info">最近更新： {{ bookInfo.lastChapter }}</span>
      <span class="updated">{{ latestUpdate }} 前</span>
      <!-- <span class="updated">{{bookInfo.update}}</span> -->
      <span class="catalog-title"> <i class="icon-directory"></i>目录</span>
    </div>
  </div>
</template>

<script>
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/esm/locale";

const COMPONENT_NAME = "BookSummary";

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
    latestUpdate() {
      return formatDistance(new Date(this.bookInfo.update), new Date(), {
        locale: zhCN
      });
    }
  },
  methods: {
    onExpand() {
      this.$emit("expand");
    }
  }
};
</script>

<style lang="scss" scoped>
.book-content {
  padding: 0 1rem;
  background: #fff;
  margin-bottom: 0.875rem;

  .short-title {
    font-size: 1rem;
    color: #101010;
    line-height: 2.5rem;
  }

  .short-info {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-bottom: 1.25rem;
    color: #5b5b59;
  }

  .catalog-wrapper {
    border-top: 1px solid #f5f5f5;
    height: 2.5rem;
    line-height: 2.5rem;
    display: flex;

    .catalog-title {
      font-size: 0.875rem;
      color: #101010;

      .icon-directory {
        color: #9d9d9b;
        margin-right: 0.25rem;
      }
    }

    .catalog-info {
      flex: 1;
      font-size: 0.875rem;
      color: #101010;
      overflow: hidden;
    }

    .updated {
      font-size: 0.75rem;
      padding: 0 1rem;
    }
  }
}
</style>
