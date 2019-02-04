<template>
  <!-- <div class="handpick-wrapper" @click="hideSwitch"> -->
  <div class="container">
    <div :style="{ paddingTop: '46px', paddingBottom: '50px' }">
      <gender-popup :showPopup="showPopup" @click="onPopupClick" />
      <van-list>
        <div>
          <swipe :touchable="true" :show-indicators="true">
            <swipe-item>
              <img src="../common/image/banner/0.jpg" alt="" class="banner" />
            </swipe-item>
            <swipe-item>
              <img src="../common/image/banner/1.jpg" alt="" class="banner" />
            </swipe-item>
            <swipe-item>
              <img src="../common/image/banner/2.jpg" alt="" class="banner" />
            </swipe-item>
            <swipe-item>
              <img src="../common/image/banner/3.jpg" alt="" class="banner" />
            </swipe-item>
          </swipe>
          <div
            class="book-list-wrapper"
            v-for="list of this.chosenList"
            :key="list.id"
          >
            <book-section
              :name="list.name"
              :type="list.type"
              @moreClick="onExpandRankList"
            />
          </div>
        </div>
      </van-list>
    </div>
    <router-view />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import BookSection from "../components/BookSection/BookSection.vue";
import GenderPopup from "../components/GenderPopup/GenderPopup.vue";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showPopup: false
    };
  },
  computed: {
    ...mapState(["gender"]),
    ...mapGetters(["banners", "chosenList"])
  },
  created() {
    this.fetchBooksOfChosenRanks();
  },
  methods: {
    onClickRight() {
      this.showPopup = true;
    },
    onPopupClick() {
      this.showPopup = false;
    },
    fetchBooksOfChosenRanks() {
      this.chosenList.reduce(
        (acc, cur) =>
          acc.then(() => this.getCurrentRankBooks({ name: cur.name })),
        Promise.resolve()
      );
    },
    onExpandRankList(name) {
      this.$router.push({
        name: "list",
        params: { name }
      });
    },
    ...mapActions(["getCurrentRankBooks"])
  },
  watch: {
    gender() {
      this.fetchBooksOfChosenRanks();
    }
  },
  components: {
    Swipe,
    SwipeItem,
    BookSection,
    GenderPopup
  }
};
</script>

<style lang="scss" scoped>
.gender-toggler {
  span {
    margin: 0 0.4rem;
  }
}

.banner {
  width: 100%;
  height: 100%;
}

.book-list-wrapper {
  margin-top: 0.625rem;
  padding: 0 1rem;
  background: #fff;
}

.handpick-wrapper {
  position: fixed;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 3.125rem;
  z-index: 1;
  background: #f0eff5;

  .top-title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 2.75rem;
    background: #43bb57;
    color: #fff;
    line-height: 2.75rem;

    .switch-wrapper {
      line-height: 2.75rem;
      padding-left: 1rem;
      font-size: 0.875rem;
      width: 3.75rem;

      .arrow-btn {
        position: absolute;
        margin-left: 0.625rem;
        font-size: 0.875rem;
        transform: rotate(-90deg);
        transition: all 0.3s;

        &.active {
          transform: rotate(90deg);
        }
      }
    }

    .title {
      position: absolute;
      width: 70%;
      left: 15%;
      top: 0;
      text-align: center;
      font-size: 1.125rem;
    }
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .upload-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      left: 0;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
