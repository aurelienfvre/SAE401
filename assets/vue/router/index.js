import { createRouter, createWebHistory } from "vue-router";
const BASE_URL = process.env.BASE_URL || '/';

const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/about",
            name: "About",
            component: () => import("../views/About.vue"),
        },
        {
            path: "/education",
            name: "Education",
            component: () => import("../views/Education.vue"),
        },
        {
            path: "/contact",
            name: "Contact",
            component: () => import("../views/Contact.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../views/Login.vue"),
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("../views/Register.vue"),
        },
        {
            path: "/legal",
            name: "Legal",
            component: () => import("../views/Legal.vue"),
        },
        {
            path: "/ocean",
            name: "Ocean",
            component: () => import("../views/Ocean.vue"),
        },
        {
            path: "/jungle",
            name: "Jungle",
            component: () => import("../views/Jungle.vue"),
        },
        {
            path: "/desert",
            name: "Desert",
            component: () => import("../views/Desert.vue"),
        },
        {
            path: "/arctic",
            name: "Arctic",
            component: () => import("../views/Arctic.vue"),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: "smooth" };
    },
});

export default router;