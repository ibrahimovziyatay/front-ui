import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import PublicLayout from "@/layouts/PublicLayout.vue";
import { validateRequest } from "@/libs/auth";
import DeptPage from "@/pages/depts/dept-detail/DeptPage.vue";
import DeptsPage from "@/pages/depts/DeptsPage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import ChartsPage from "@/pages/monthly-analysis/ChartsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ProductsPage from "@/pages/products/ProductsPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { toast } from "vue-sonner";

const pageTitle = process.env.VUE_APP_TITLE || "Vue-Test";

const routes = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: HomePage,
        meta: { title: `${pageTitle} | Home` },
      },
      {
        path: "/depts",
        name: "Depts",
        component: DeptsPage,
        meta: { title: `${pageTitle} | Depts`, needAccount: true },
      },
      {
        path: "/dept/:id",
        name: "Dept",
        component: DeptPage,
        meta: { title: `${pageTitle} | Dept`, needAccount: true },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: LoginPage,
        meta: { title: `${pageTitle} | Login`, guestOnly: true },
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true, roles: ["admin", "meneger"] },
    children: [
      {
        path: "products",
        name: "Products",
        component: ProductsPage,
        meta: { title: `${pageTitle} | Dashboard | Products` },
      },
      {
        path: "monthly-analysis",
        name: "Monthly analysis",
        component: ChartsPage,
        meta: { title: `${pageTitle} | Dashboard | Analysis` },
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
    meta: { title: `${pageTitle} | 404 Not Found` },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || pageTitle;
  const user = validateRequest();

  // guestOnly pages (login/register)
  if (to.meta.guestOnly && user) {
    if (["admin", "meneger"].includes(user.role.toLowerCase())) {
      return next("/dashboard/products");
    } else {
      return next("/");
    }
  }

  // requiresAuth
  if (to.meta.requiresAuth && !user) {
    toast.warning("You need to login to access this page.");
    return next("/auth/login");
  }

  // needAccount
  if (to.meta.needAccount && !user) {
    toast.warning("Please login to view this section.");
    return next("/auth/login");
  }

  // role-based check
  if (to.meta.roles && user) {
    if (
      !to.meta.roles
        .map((r) => r.toLowerCase())
        .includes(user.role.toLowerCase())
    ) {
      toast.error("Unauthorized: You don’t have permission to view this page.");
      return next("/");
    }
  }

  next();
});

export default router;
