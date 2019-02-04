import Vue from "vue";
import Router from "vue-router";

import Channel from "./views/Channel.vue";
import Category from "./views/Category.vue";
import BookDetail from "./views/BookDetail.vue";
import Reader from "./views/Reader.vue";
import Recommend from "./views/Recommend.vue";
import BookList from "./components/BookList/BookList.vue";
// import Shelf from "./views/Shelf.vue";
import BookShelf from "./views/BookShelf.vue";
import Search from "./views/Search.vue";
import Me from "./views/Me.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/shelf",
      name: "shelf",
      component: BookShelf
    },
    {
      path: "/recommend",
      name: "recommend",
      alias: "/",
      component: Recommend,
      children: [
        {
          path: "list/:name",
          name: "list",
          props: true,
          component: BookList
        }
      ]
    },
    {
      path: "/channel",
      name: "channel",
      component: Channel
    },
    {
      path: "/category/:gender/:name",
      name: "category",
      component: Category,
      props: true
    },
    {
      path: "/book/:id",
      name: "book_detail",
      component: BookDetail,
      props: true,
      meta: { keepAlive: true }
    },
    {
      path: "/reader/:bookId/:chapterIndex",
      name: "reader",
      component: Reader,
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        } else {
          return { x: 0, y: 0 };
        }
      },
      props: true,
      meta: { keepAlive: true }
    },
    {
      path: "/search",
      name: "search",
      props: true,
      component: Search
    },
    {
      path: "/me",
      name: "me",
      component: Me
    }
  ]
});
