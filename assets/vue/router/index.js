import { createRouter, createWebHistory } from "vue-router";
const BASE_URL = process.env.BASE_URL || '/';

function requireAuth(to, from, next) {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (!isAuthenticated) {
    next('/login');
  } else {
    next();
  }
}

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
      beforeEnter: requireAuth,
    },
    {
      path: "/jungle",
      name: "Jungle",
      component: () => import("../views/Jungle.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/desert",
      name: "Desert",
      component: () => import("../views/Desert.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/arctic",
      name: "Arctic",
      component: () => import("../views/Arctic.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/Profile.vue"),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !!localStorage.getItem('authToken');
        if (!isAuthenticated) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("../views/admin/Admin.vue"), // Le composant principal de l'administration
      children: [
        {
          path: "users",
          name: "AdminUsers",
          component: () => import("../views/admin/Users.vue"), // Gestion des utilisateurs
        },
        {
          path: "quizzes",
          name: "AdminQuizzes",
          component: () => import("../views/admin/Quizzes.vue"), // Gestion des quizzes
        },
        {
          path: "answers",
          name: "AdminAnswers",
          component: () => import("../views/admin/Answers.vue"), // Gestion des réponses
        },
        {
          path: "progress",
          name: "AdminProgress",
          component: () => import("../views/admin/UserProgress.vue"), // Gestion de la progression des utilisateurs
        },
        {
          path: "questions",
          name: "AdminQuestions",
          component: () => import("../views/admin/Questions.vue"), // Gestion des questions
        }
      ],
      beforeEnter: (to, from, next) => {
        const rolesStr = localStorage.getItem('userRoles');
        if (rolesStr) {
          const roles = JSON.parse(rolesStr);
          if (roles.includes('ROLE_ADMIN')) {
            next(); // Permet l'accès à l'admin
            return;
          }
        }
        next('/login'); // Redirige les autres vers la page de connexion
      }

    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});


export default router;
