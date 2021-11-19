import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    //Routes for sports
    {// List all sports
      path: "/sports",
      name: "sports",
      component: () => import("../components/Sport/SportList.vue")
    },
    {// Detailed version of a sport which can be edited
      path: "/sports/:id",
      name: "sports-details",
      component: () => import("../components/Sport/Sport.vue")
    },
    {// Add new sport TODO: fix going towards add sport and not detailed
      path: "/sports/add",
      name: "sports-add",
      component: () => import("../components/Sport/AddSport.vue")
    },
    {// About page 
      path: "/",
      name: "About",
      component: () => import("../components/About.vue")
    },
    {// About page 
      path: "/about",
      name: "AboutUrl",
      component: () => import("../components/About.vue")
    }
  ]
});
