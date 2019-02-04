<template>
  <div id="app">
    <!-- <van-button loading />
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> -->
    <router-view />
    <!-- <my-tabs></my-tabs> -->
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(tab, index) in tabs" :key="index">
        <router-link tag="div" :to="tab.to">
          {{ tab.display }}
        </router-link>
        <svg slot="icon" class="icon" aria-hidden="true">
          <use :xlink:href="tab.icon"></use>
        </svg>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      active: 1,
      tabs: [
        {
          display: "书架",
          name: "shelf",
          icon: "#icon-bookshelf",
          to: "/shelf"
        },
        {
          display: "精选",
          name: "recommend",
          icon: "#icon-jingxuan",
          to: "/recommend"
        },
        {
          display: "分类",
          name: "categories",
          icon: "#icon-pindao1",
          to: "/channel"
        },
        {
          display: "搜索",
          name: "search",
          icon: "#icon-search",
          to: "/search"
        },
        {
          display: "我的",
          name: "me",
          icon: "#icon-human-analyse",
          to: "/me"
        }
      ]
    };
  },
  async created() {
    await this.restoreTheme();
    await this.restoreCollectedBook();
  },
  methods: {
    ...mapActions(["restoreTheme", "restoreCollectedBook"])
  },
  watch: {
    $route(to) {
      this.active = this.tabs.findIndex(tab => to.name === tab.name);
    }
  }
};
</script>
