<template>
  <div :style="{ paddingTop: '46px' }">
    <!--<van-nav-bar title="精选" />-->
    <gender-popup :showPopup="showPopup" @click="onPopupClick" />
    <div class="container">
      <div class="tag-wrapper">
        <van-tag mark :type="gender === 'male' ? 'primary' : 'danger'"
          >{{ gender === "male" ? "男生" : "女生 " }}频道</van-tag
        >
      </div>
      <div class="group " v-if="gender === 'male'">
        <van-row>
          <van-col
            span="12 "
            v-for="(item, index) in channels.male"
            :key="index"
          >
            <div @click="selectCategory(item)">
              <category-item
                :is-dark="isDark(index)"
                :src="imgPrefix + item.bookCover[0]"
                :name="item.name"
                :count="item.bookCount"
              />
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="group " v-else>
        <van-row>
          <van-col
            span="12 "
            v-for="(item, index) in channels.female"
            :key="index"
          >
            <div @click="selectCategory(item)">
              <category-item
                :is-dark="isDark(index)"
                :src="imgPrefix + item.bookCover[0]"
                :name="item.name"
                :count="item.bookCount"
              />
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import GenderPopup from "../components/GenderPopup/GenderPopup.vue";
import CategoryItem from "../components/Categories/CategoryItem.vue";

import { getCategories } from "../api/search";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "my-categories",
  components: {
    CategoryItem,
    GenderPopup
  },
  data() {
    return {
      showPopup: false,
      imgPrefix: "http://statics.zhuishushenqi.com"
    };
  },
  computed: {
    ...mapState(["gender"]),
    ...mapGetters(["channels"])
  },
  async created() {
    await this.init();
  },
  methods: {
    isDark(index) {
      return index % 4 < 2;
    },
    onPopupClick() {
      this.showPopup = false;
    },
    selectCategory(category) {
      this.$router.push({
        path: `/category/${this.gender}/${category.name}`
      });
    },
    // 获取各频道的分类
    async init() {
      if (this.channels.male || this.channels.female) return;
      try {
        let res = await getCategories();
        if (res.data.ok) {
          this.setChannels({
            male: res.data.male,
            female: res.data.female
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    ...mapMutations({
      setChannels: "SET_CHANNELS"
    })
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 1rem 3.125rem;
  .tag-wrapper {
    margin: 0.5rem 0;
  }
}
</style>
