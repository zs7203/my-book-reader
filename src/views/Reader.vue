<template>
  <transition name="book-text">
    <div>
      <div class="book-text-wrapper" ref="wrapper" :style="style">
        <h1 class="title">{{ currentChapterTitle }}</h1>
        <scroll
          :data="currentChapterContent"
          class="group"
          ref="scroll"
          :scrollbar="true"
        >
          <div class="text-content" ref="textGroup" @click="toggleSettings">
            <div class="text-item" ref="textWrapper">
              <!-- <h1 class="text-title" :class="{'isNight': isNight}" ref="textTitle">{{currentChapter.title}}</h1> -->
              <p
                class="text"
                v-for="(text, index) in currentChapterContent"
                :key="index"
              >
                {{ text }}。
              </p>
            </div>
          </div>
        </scroll>
        <div class="loading-wrapper" v-if="isLoading">
          <loading></loading>
        </div>
        <setting-panel
          :showFlag="setting"
          :title="currentChapterTitle"
          :colors="theme.colors"
          :isNight="isNight"
          :selected="theme.index"
          @openChapters="openChapters"
          @changeMode="toggleMode"
          @changeColor="changeColor"
          @minusFontSize="smallerFont"
          @addFontSize="biggerFont"
          @back="back"
          @preChapter="onPreChapter"
          @nextChapter="onNextChapter"
          @
          ref="settingPanel"
        />
        <div class="book-chapters-wrapper">
          <book-chapter
            :title="currentBookTitle"
            :author="currentBookAuthor"
            :chapters="currentBookChapters"
            ref="chapters"
            @select="onChapterSelected"
          />
        </div>
      </div>
      <confirmation
        ref="confirmBox"
        @selectConfirm="ConfirmationYes"
        @selectCancel="confirmationNo"
      />
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from "../components/Scroll/Scroll.vue";
import Loading from "../components/Loading/Loading.vue";
import SettingPanel from "../components/SettingPanel/SettingPanel.vue";
import BookChapter from "../components/BookChapter/BookChapter.vue";
import Confirmation from "../components/Confirmation/Confirmation.vue";

import {mapGetters, mapMutations, mapActions} from "vuex";

const COMPONENT_NAME = "Reader";

export default {
  name: COMPONENT_NAME,
  props: {
    bookId: {
      type: String,
      default: "",
      required: true
    },
    chapterIndex: {
      type: [Number, String],
      default: 0,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      setting: false,
      isNight: false
    };
  },
  computed: {
    isCurrentBookAvailable() {
      return !!this.currentBook;
    },
    isLoading() {
      return (
        this.isCurrentBookAvailable &&
        parseInt(this.chapterIndex) !== this.currentBook.chapterIndex
      );
    },
    isCollected() {
      return this.isCurrentBookAvailable && this.currentBook.isCollected;
    },
    currentBookTitle() {
      return this.isCurrentBookAvailable
        ? this.currentBook.bookInfo.title
        : "title";
    },
    currentBookAuthor() {
      return this.isCurrentBookAvailable
        ? this.currentBook.bookInfo.author
        : "author";
    },
    currentBookChapters() {
      return this.isCurrentBookAvailable ? this.currentBook.chapters : [];
    },
    currentChapter() {
      if (
        !this.isCurrentBookAvailable ||
        !this.currentBook.chapterText[this.currentBook.chapterIndex]
      ) {
        return {title: "loading..", textContent: []};
      }
      return this.currentBook.chapterText[this.currentBook.chapterIndex];
    },
    currentChapterTitle() {
      return this.currentChapter.title;
    },
    currentChapterContent() {
      return this.currentChapter.textContent;
    },
    style() {
      return {
        backgroundColor: this.theme.colors[this.theme.index],
        fontSize: this.theme.fontSize + "px",
        lineHeight: this.theme.fontSize * 2 - 4 + "px"
      };
    },
    ...mapGetters(["theme", "currentBook", "currentBookId"])
  },
  async created() {
    await this.getBookById(this.bookId);
    await this.getChapterByIndex(this.chapterIndex);
  },
  beforeRouteUpdate(to, from, next) {
    this.getChapterByIndex(to.params.chapterIndex);
    this.$refs.scroll.scrollTo(0, 0);
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isCollected) {
      this.next = next;
      this.$refs.confirmBox.show();
      return;
    }
    next();
  },
  // updated() {
  //   this.$refs.scroll &&
  //     (this.$refs.scroll.refresh(), this.$refs.scroll.scrollTo(0, 0))
  // },
  methods: {
    back() {
      this.$router.go(-1);
      // this.$router.push({
      //   name: 'book_detail',
      //   params: {
      //     id: this.currentBook.bookInfo.id,
      //   },
      // })
    },
    backWithConfirmation() {
      if (this.isCollected) {
        this._updateStorageBeforeLeave();
        this.back();
      } else {
        this.$refs.confirmBox.show();
      }
    },
    // handlers for [Confirmation]
    ConfirmationYes() {
      this.addToBookShelf(this.currentBookId);
      this.next();
    },
    confirmationNo() {
      this.next();
    },
    // ------handlers for [SettingPanel] start------
    onChapterSelected(_, index) {
      if (index === this.currentBook.chapterIndex) return;
      this.$refs.chapters.hide();
      this.switchChapter(index);
    },
    openChapters() {
      this.setting = false;
      this.$refs.chapters.show();
    },
    toggleMode() {
      this.isNight = !this.isNight;
    },
    toggleSettings() {
      this.setting = !this.setting;
    },
    changeColor(index) {
      this.setTheme({
        theme: {
          ...this.theme,
          index
        }
      });
    },
    smallerFont() {
      let fontSize = this.theme.fontSize;
      if (fontSize <= 14) return;
      fontSize--;
      this.setTheme({
        theme: {
          ...this.theme,
          fontSize
        }
      });
    },
    biggerFont() {
      let fontSize = this.theme.fontSize;
      if (fontSize >= 28) return;
      fontSize++;
      this.setTheme({
        theme: {
          ...this.theme,
          fontSize
        }
      });
    },
    onPreChapter() {
      this.switchChapter(this.currentBook.chapterIndex - 1);
    },
    onNextChapter() {
      this.switchChapter(this.currentBook.chapterIndex + 1);
    },
    switchChapter(index) {
      if (index < 0 || index > this.currentBook.chapters.length - 1) return;
      // this.setCurrentBook({ chapterIndex: index })
      console.log("jump to " + index);
      this.$router.replace({
        name: "reader",
        params: {
          bookId: this.currentBookId,
          chapterIndex: index
        }
      });
    },
    // ------handlers for [SettingPanel] end------

    // _updateStorageBeforeLeave() {
    //   if (!this.collected) return
    //   // 更新当前书籍的阅读进度
    //   let updatedBook = {
    //     ...this.collectList[this.currentBook.id], //bookInfo
    //     index: this.currentChapter,
    //     lastChapter: this.title,
    //   }
    //   // 同步到local storage
    //   this.saveStorageList(updatedBook)
    //   // this.saveLastReading(updatedBook)
    // },
    // ...mapMutations({
    //   setCurrentBook: SET_CURRENT_BOOK,
    //   setChapterText: SET_CHAPTER_TEXT,
    // }),
    ...mapMutations({
      setTheme: "SET_THEME",
      addToBookShelf: "ADD_TO_BOOK_SHELF"
    }),
    ...mapActions([
      // "saveTheme",
      "getBookById",
      "getChapterByIndex"
    ])
  },
  components: {
    Scroll,
    Loading,
    SettingPanel,
    BookChapter,
    Confirmation
  }
};
</script>
<style lang="scss" scoped>
.book-text-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: #c6ebc9;
  color: #101010;

  .title {
    font-size: 14px;
    color: #9d9d9b;
    line-height: 32px;
    margin-left: 1rem;
  }

  .group {
    width: 100%;
    height: 100%;
    padding: 0 1rem 0 1rem;
    box-sizing: border-box;
    overflow: hidden;

    .text-content {
      .text-item {
        padding-top: 1rem;
        padding-bottom: 5rem;

        .text-title {
          width: 100%;
          font-size: 24px;
          line-height: 48px;
          color: #101010;
          padding-top: 32px;
          font-weight: 600;

          &.isNight {
            color: #6e6e6e;
          }
        }

        .text {
          margin-top: 8px;
          width: 100%;
          text-indent: 32px;
        }
      }

      .loading-chapter {
        position: absolute;
        // bottom: 40px;
        top: 40px;
        left: 40%;
        width: 6rem;
        height: 2rem;
        line-height: 2rem;
        margin-left: -7.5rem;
        text-align: center;
        font-size: 1rem;
        background: #43bb57;
        border-radius: 1rem;
        color: #fff;
        z-index: 100;
        &.next {
          left: auto;
          right: 10%;
        }
      }
    }
  }

  .more {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10rem;
    padding: 1.25rem 0;
    background: #4a4a4a;
    margin-top: 0.375rem;
    text-align: center;
    font-size: 0.875rem;
    color: #fff;
    border-radius: 0.5rem;

    img {
      margin-bottom: 0.5rem;
    }
  }

  .loading-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
  }
}

.book-text-enter-active,
.book-text-leave-active {
  transition: all 0.4s;
}

.book-text-enter,
.book-text-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
</style>
