import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import { getItemFromLocalStorage } from "../utils/localStorage";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,

      beforeEnter(to, from, next) {
        const userDetails = getItemFromLocalStorage("userDetails");

        if (!userDetails) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/view/:id",
      name: "ViewProduct",
      // route level code-splitting
      // this generates a separate chunk (ViewProduct.vue) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ViewProduct.vue"),
      props: true,
      meta: { requireAuth: true },
    },
    {
      path: "/addnewproduct/:productId?",
      name: "addNewProduct",
      // route level code-splitting
      // this generates a separate chunk (AddNewProduct.vue) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AddNewProduct.vue"),
      props: true,

      beforeEnter(to, from, next) {
        const userDetails = getItemFromLocalStorage("userDetails");

        if (!userDetails) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/allcarts",
      name: "AllCarts",
      // route level code-splitting
      // this generates a separate chunk (AllCarts.vue) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AllCarts.vue"),

      beforeEnter(to, from, next) {
        const userDetails = getItemFromLocalStorage("userDetails");

        if (!userDetails) {
          next({ name: "login" });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
