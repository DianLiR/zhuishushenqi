import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // component: (resolve) => require(["../views/Home.vue"], resolve),
    // children: [  ],
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/Category"),
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: () => import("../views/Ranking"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
