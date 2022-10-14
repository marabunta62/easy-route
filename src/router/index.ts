import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { isAllowedToAccess } from "@/config/guard";
import { store } from "@/store";

const isAuthenticated = store.getters['UserMd/isUserAuthenticated'];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
        import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    props: false,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/profile",
    name: "userProfile",
    component: () =>
        import(/* webpackChunkName: "profile" */ "../views/UserProfile.vue"),
    beforeEnter: async (to, from, next) => {
      const canAccess = await isAuthenticated
      if (canAccess) {
        console.log("guard", canAccess)
        return next()
      } else {
        return next({ name: 'home'})
      }
    }
  },
  {
    path: "/driver",
    name: "userDriver",
    component: () =>
        import(/* webpackChunkName: "profile" */ "../views/DriverView.vue"),
    beforeEnter: async (to, from, next) => {
      const canAccess = await isAuthenticated
      if (canAccess) {
        console.log("guard", canAccess)
        return next()
      } else {
        next({ name: 'home'})
      }
    }
  },
  {
    path: "/passenger",
    name: "userPassengers",
    component: () =>
        import(/* webpackChunkName: "profile" */ "../views/PassengersView.vue"),
    beforeEnter: async (to, from, next) => {
      const canAccess = await isAuthenticated
      if (canAccess) {
        console.log("guard", isAuthenticated)
        return next()
      } else {
        next({ name: 'home'})
      }
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
