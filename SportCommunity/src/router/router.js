import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		// Routes for sports
		{ // List all sports
			path: "/sports",
			name: "sports",
			component: () => import("../components/Sport/SportList.vue"),
		},
		{ // Detailed version of a sport which can be edited
			path: "/sports/:id/:clubId",
			name: "sports-details",
			component: () => import("../components/Sport/Sport.vue"),
		},
		{ // Add new sport TODO: fix going towards add sport and not detailed
			path: "/sports/add/:clubId",
			name: "sports-add",
			component: () => import("../components/Sport/AddSport.vue"),
		},

		// Routes for registrations
		{ // List all registrations
			path: "/registrations",
			name: "registrations",
			component: () => import("../components/Registration/RegistrationList.vue"),
		},
		{ // Detailed version of a registration which can be edited
			path: "/registrations/:id",
			name: "registrations-details",
			component: () => import("../components/Registration/Registration.vue"),
		},
		{ // Add new registration TODO: fix going towards add registration and not detailed
			path: "/registrations/add",
			name: "registrations-add",
			component: () => import("../components/Registration/AddRegistration.vue"),
		},

		// Routes for Clubs
		{ // List all Clubs
			path: "/clubs",
			name: "clubs",
			component: () => import("../components/Club/ClubList.vue"),
		},
		{ // Detailed version of a Clubs which can be edited
			path: "/clubs/:id",
			name: "clubs-details",
			component: () => import("../components/Club/Club.vue"),
		},
		{ // Add new Clubs TODO: fix going towards add Clubs and not detailed
			path: "/clubs/add",
			name: "clubs-add",
			component: () => import("../components/Club/AddClub.vue"),
		},

		// Routes for FanProducts
		{ // List all FanProducts
			path: "/fanProducts",
			name: "fanProducts",
			component: () => import("../components/FanProduct/FanProductList.vue"),
		},
		{ // Detailed version of a FanProducts which can be edited
			path: "/fanProducts/:id/:clubId",
			name: "fanProducts-details",
			component: () => import("../components/FanProduct/FanProduct.vue"),
		},
		{ // Add new fanproduct with the club Id (since it needs a clubID to be linked at)
			path: "/fanProducts/add/:clubId",
			name: "fanProducts-add",
			component: () => import("../components/FanProduct/AddFanProduct.vue"),
		},

		// Routes for users
		{ // List all users
			path: "/users",
			name: "users",
			component: () => import("../components/User/UserList.vue"),
		},
		{ // Detailed version of a users which can be edited
			path: "/users/:id",
			name: "users-details",
			component: () => import("../components/User/User.vue"),
		},
		{ // Add new users TODO: fix going towards add users and not detailed
			path: "/users/add",
			name: "users-add",
			component: () => import("../components/User/AddUser.vue"),
		},

		// Misc
		{ // About page on home URL. Must be changed in future
			path: "/",
			name: "FrontPage",
			component: () => import("../components/FrontPage.vue"),
		},
		{ // About page
			path: "/about",
			name: "AboutUrl",
			component: () => import("../components/About.vue"),
		},

		// Auth
		{// Login Page
			path: "/login",
			name: "login",
			component: () => import("../components/Auth/Login.vue"),
		},
		{// register page
			path: "/register",
			name: "register",
			component: () => import("../components/Auth/Register.vue"),
		},
		{// Profile page (just a detailed view on your user)
			path: "/profile",
			name: "profile",
			component: () => import("../components/Auth/Profile.vue"),
		},
	],
});


router.beforeEach((to, from, next) => {
	const publicPages = ["/login", "/register", "/about", "/"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("user");

	// trying to access a restricted page + not logged in
	// redirect to login page
	if (authRequired && !loggedIn) {
		next("/login");
	} else {
		next();
	}
});


export default router;
