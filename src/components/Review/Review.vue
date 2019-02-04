<template>
  <scroll class="reviews-list" :data="data" ref="scroll">
    <ul>
      <li class="reviews-item" v-for="(item, index) in data" :key="index">
        <div class="avatar-content">
          <img class="avatar-image" :src="item.avatar" />
        </div>
        <div class="reviews-content">
          <h1 class="author-name">{{ item.author }}</h1>
          <p class="updated">{{ parseDate(item.updated) }}</p>
          <h2 class="text-title">{{ item.title }}</h2>
          <p class="text-content">{{ item.content }}</p>
          <div class="comment-content">
            <span class="comments-num">回复 {{ item.comments }}</span>
            <span class="praise-num">赞 {{ item.praise }}</span>
          </div>
        </div>
      </li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
import Scroll from "../Scroll/Scroll.vue";
import { format } from "date-fns";
import { zhCN } from "date-fns/esm/locale";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Scroll
  },
  methods: {
    parseDate(date) {
      return format(new Date(date), "PPP", {
        locale: zhCN
      });
    },
    refresh() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    }
  }
  // watch: {
  //   data() {
  //     this.$nextTick(() => {
  //       this.$refs.scroll.refresh()
  //     })
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.reviews-list {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  background: #bfbfbfl;

  .reviews-item {
    background: #bfbfbfl;
    display: flex;
    flex-direction: row;
    padding: 0.625rem 0.5rem;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
      border-bottom: none;
    }

    .avatar-content {
      width: 2rem;
      height: 100%;
      margin-right: 0.5rem;

      .avatar-image {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }

    .reviews-content {
      flex: 1;

      .author-name {
        height: 1.125rem;
        font-size: 0.875rem;
        color: #43bb57;
      }

      .updated {
        height: 1.125rem;
        font-size: 0.75rem;
        color: #9d9d9b;
      }

      .text-title {
        line-height: 1.875rem;
        color: #101010;
        font-size: 0.875rem;
      }

      .text-content {
        font-size: 0.75rem;
        line-height: 1.25rem;
        color: #5b5b59;
        height: 3.6875rem;
        overflow: hidden;
      }

      .comment-content {
        margin-top: 0.375rem;
        font-size: 0.625rem;

        .comments-num {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
