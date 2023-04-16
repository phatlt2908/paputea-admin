import screenConst from "./constants/screenConst";
import $store from "./store";

import MainLayout from "@/views/layouts/MainLayout";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: screenConst.DASHBOARD.path,
    content:
      "Chia sẻ phần mềm, ứng dụng, games, thủ thuật,... Giúp làm chủ được thiết bị của bạn!",
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: screenConst.DASHBOARD.path,
        component: () => import("@/views/screens/Dashboard"),
        name: "dashboard",
        meta: {
          title: "",
          content: "",
          active: "dashboard",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.CLASS_LIST.path,
        component: () => import("@/views/screens/ClassList"),
        name: "classList",
        meta: {
          title: "Danh sách lớp",
          content: "Danh sách lớp",
          active: "classList",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.CLASS_DETAIL.path,
        component: () => import("@/views/screens/ClassDetail"),
        name: "classDetail",
        meta: {
          title: "Chi tiết lớp",
          content: "Chi tiết lớp",
          active: "classList",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.CENTER_CLASS_LIST.path,
        component: () => import("@/views/screens/CenterClassList"),
        name: "centerClassList",
        meta: {
          title: "Danh sách lớp trung tâm",
          content: "Danh sách lớp trung tâm",
          active: "centerClassList",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.ONLINE_CLASS_LIST.path,
        component: () => import("@/views/screens/OnlineClassList"),
        name: "onlineClassList",
        meta: {
          title: "Danh sách lớp trực tuyến",
          content: "Danh sách lớp trực tuyến",
          active: "onlineClassList",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.TUTOR_LIST.path,
        component: () => import("@/views/screens/TutorList"),
        name: "tutorList",
        meta: {
          title: "Danh sách gia sư",
          content: "Danh sách gia sư",
          active: "tutorList",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.FEEDBACK.path,
        component: () => import("@/views/screens/Feedback"),
        name: "feedback",
        meta: {
          title: "Phản hồi",
          content: "Phản hồi",
          active: "feedback",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.USER_INFO.path,
        component: () => import("@/views/screens/UserInfo"),
        name: "userInfo",
        meta: {
          title: "Thông tin tài khoản",
          content: "Thông tin tài khoản",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.CHANGE_PASSWORD.path,
        component: () => import("@/views/screens/ChangePassword"),
        name: "changePassword",
        meta: {
          title: "Đổi mật khẩu",
          content: "Đổi mật khẩu",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.REGISTER.path,
        component: () => import("@/views/screens/Register"),
        name: "register",
        meta: {
          title: "Tạo account",
          content: "Tạo account",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
    ],
  },
  {
    path: screenConst.LOGIN.path,
    component: () => import("@/views/screens/Login"),
    name: "login",
    meta: {
      title: "Đăng nhập",
      content: "Đăng nhập",
      requireLogged: false,
      requireNotLogged: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: screenConst.DASHBOARD.path,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if ($store.state.user.isLogged && to.meta.requireNotLogged) {
    next({
      path: screenConst.DASHBOARD.path,
    });
    return;
  }

  if (!$store.state.user.isLogged && to.meta.requireLogged) {
    next({
      path: screenConst.LOGIN.path,
    });
    return;
  }

  document.title = to.meta.title
    ? to.meta.title + " | Paputea Admin"
    : "Paputea | Admin";
  next();
});

export default router;
