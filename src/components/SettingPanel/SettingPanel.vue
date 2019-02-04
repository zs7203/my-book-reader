<template>
  <transition name="setting">
    <div v-show="showFlag">
      <div class="back-group">
        <div class="back-title">
          {{ title }}
        </div>
        <div class="back-content" @click.stop="back">
          <van-icon class="van-icon-arrow-left"></van-icon>
        </div>
      </div>
      <div class="setting-wrapper" v-show="showFlag && setting">
        <div class="setting-color">
          <div class="color-item" v-for="(color, index) of colors" :key="color">
            <span
              class="item"
              :style="{ background: color }"
              :class="{ active: index === selected }"
              @click="changeColor(index)"
            >
              <!--<i class="icon-tick" v-show="index === selected"></i>-->
              <van-icon class="van-icon-success" v-show="index === selected" />
            </span>
          </div>
        </div>
        <div class="setting-font">
          <div class="font-item" @click="minusFontSize">
            <span class="font-btn">A-</span>
          </div>
          <div class="font-item" @click="addFontSize">
            <span class="font-btn">A+</span>
          </div>
        </div>
      </div>
      <div class="setting-btn">
        <div class="setting-item" @click="openChapters">
          <!--<i class="icon-directory"></i>-->
          <svg class=" my-icon icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
          <span class="title">章节</span>
        </div>
        <div class="setting-item" @click="changeMode">
          <svg class=" my-icon icon" aria-hidden="true">
            <use xlink:href="#icon-sun1"></use>
          </svg>
          <span class="title" v-text="modeText"></span>
        </div>
        <div class="setting-item" @click="openSetting">
          <svg class=" my-icon icon" aria-hidden="true">
            <use xlink:href="#icon-quanjushezhi"></use>
          </svg>
          <span class="title">设置</span>
        </div>
        <div class="setting-item" @click="preChapter">
          <svg class=" my-icon icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou_shangyiye"></use>
          </svg>
          <span class="title">上一章</span>
        </div>
        <div class="setting-item" @click="nextChapter">
          <svg class=" my-icon icon" aria-hidden="true">
            <use xlink:href="#icon-jiantou_xiayiye"></use>
          </svg>
          <span class="title">下一章</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    showFlag: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    colors: {
      type: Array,
      default: () => []
    },
    isNight: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Number,
      default: 0
    },
    _dev: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this._dev) {
      this.showFlag = true;
    }
  },
  data() {
    return {
      setting: false
    };
  },
  computed: {
    modeCls() {
      return this.isNight ? "icon-brightness" : "icon-night";
    },
    modeText() {
      return this.isNight ? "白天" : "夜间";
    }
  },
  methods: {
    back() {
      this.$emit("back");
    },
    openChapters() {
      this.$emit("openChapters");
    },
    changeMode() {
      this.$emit("changeMode");
    },
    openSetting() {
      this.setting = !this.setting;
      this.$emit("openSetting");
    },
    changeColor(item, index) {
      this.$emit("changeColor", item, index);
    },
    minusFontSize() {
      this.$emit("minusFontSize");
    },
    addFontSize() {
      this.$emit("addFontSize");
    },
    preChapter() {
      this.$emit("preChapter");
    },
    nextChapter() {
      this.$emit("nextChapter");
    }
  },
  watch: {
    showFlag(newS) {
      if (newS === false) {
        this.setting = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.setting-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.125rem;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  color: #bfbfbf;

  .setting-item {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.875rem;

    .icon-arrow.left {
      transform: rotate(180deg);
    }

    .icon-wrapper {
      font-size: 0.875rem;
    }

    .title {
      font-size: 0.625rem;
      line-height: 22px;
    }
  }
}

.back-group {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 2.75rem;
  background: rgba(0, 0, 0, 0.85);
  font-size: 0.875rem;
  line-height: 2.75rem;
  color: #fff;

  .back-title {
    width: 100%;
    text-align: center;
    font-size: 1rem;
  }

  .back-content {
    position: fixed;
    top: 0;
    left: 0;
    padding-left: 1rem;
    width: 3.75rem;
    z-index: 10;

    .icon-arrow {
      display: inline-block;
      transform: rotate(180deg);
      margin-right: 0.25rem;
    }
  }
}

.setting-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 3.125rem;
  background: rgba(0, 0, 0, 0.85);

  .setting-color,
  .setting-font {
    padding: 0.875rem;
    box-sizing: border-box;
    border-bottom: 1px solid #2b2b2b;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .item {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      border-radius: 50%;
      box-sizing: border-box;
      background: #ccc;

      &.active {
        color: #ff4444;
        border: 1px solid #ff4444;

        &.icon-tick {
          font-size: 0.875rem;
          color: #ff4444;
        }
      }
    }

    .font-btn {
      display: inline-block;
      width: 9rem;
      height: 2.4rem;
      text-align: center;
      line-height: 2.4rem;
      border: 1px solid #7f7f81;
      border-radius: 1.2rem;
      color: #bfbfbf;
      font-size: 1.25rem;
      box-sizing: border-box;
    }
  }
}

.setting-enter-active,
.setting-leave-active {
  transition: all 0.4s;

  .back-group,
  .setting-btn {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}

.setting-enter,
.setting-leave-to {
  opacity: 0;

  .back-group {
    transform: translate3d(0, -100%, 0);
  }

  .setting-btn {
    transform: translate3d(0, 100%, 0);
  }
}

.my-icon {
  font-size: 16px;
  margin: 0 auto;
  line-height: 100px;
  color: #bfbfbf;
}
</style>
