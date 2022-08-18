import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { isAllowedToAccess } from "@/config/guard";

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
    beforeEnter: (to, from, next) => {
      if (isAllowedToAccess()) {
        console.log("guard", isAllowedToAccess())
        return next()
      } else {
        next({ name: 'home'})
      }
    }
  },
  {
    path: "/driver",
    name: "userDriver",
    component: () =>
        import(/* webpackChunkName: "profile" */ "../views/DriverView.vue"),
    beforeEnter: (to, from, next) => {
      if (isAllowedToAccess()) {
        console.log("guard", isAllowedToAccess())
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
    beforeEnter: (to, from, next) => {
      if (isAllowedToAccess()) {
        console.log("guard", isAllowedToAccess())
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
