<template>
  <transition name="reviews">
    <div class="reviews-wrapper" v-show="showFlag">
      <div class="reviews-title">
        <div class="back" @click="hide">
          <i class="icon-back"></i>
          <h1 class="title">书评区</h1>
        </div>
      </div>
      <div class="reviews-content">
        <review :data="data" ref="review"></review>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Review from "../Review/Review.vue";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    dev: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  mounted() {
    this.showFlag = this.dev;
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  },
  watch: {
    showFlag(to) {
      if (to) {
        this.$nextTick(() => {
          this.$refs.review && this.$refs.review.refresh();
        });
      }
    }
  },
  components: {
    Review
  }
};
</script>
<style lang="scss" scoped>
.reviews-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #f0eff5;

  .reviews-title {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2.75rem;
    line-height: 2.75rem;
    background: #43bb57;
    color: #bfbfbfl;

    .back {
      height: 100%;
      width: 2rem;
      text-align: center;
      font-size: 1.25rem;
    }

    .title {
      position: absolute;
      top: 0;
      left: 15%;
      width: 70%;
      text-align: center;
    }
  }

  .reviews-content {
    position: fixed;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
  }
}

.reviews-enter-active,
.reviews-leave-active {
  transition: all 0.3s;
}

.reviews-enter,
.reviews-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
