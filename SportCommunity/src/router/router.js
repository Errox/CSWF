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

    //Routes for registrations
    {// List all registrations
      path: "/registrations",
      name: "registrations",
      component: () => import("../components/Registration/RegistrationList.vue")
    },
    {// Detailed version of a registration which can be edited
      path: "/registrations/:id",
      name: "registrations-details",
      component: () => import("../components/Registration/Registration.vue")
    },
    {// Add new registration TODO: fix going towards add registration and not detailed
      path: "/registrations/add",
      name: "registrations-add",
      component: () => import("../components/Registration/AddRegistration.vue")
    },
    //Misc
    {// About page on home URL. Must be changed in future 
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
