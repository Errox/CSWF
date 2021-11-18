import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //Routes for sports
    {
      path: "/sports",
      name: "sports",
      component: () => import("../components/Sport/SportList")
    },
    {
      path: "/sports/:id",
      name: "sports-details",
      component: () => import("../components/Sport/Sport")
    },
    {
      path: "/sports/add",
      name: "sports-add",
      component: () => import("../components/Sport/AddSport")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../components/about")
    }
  ]
});
