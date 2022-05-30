import Vue from "vue";
import VueRouter from "vue-router";

/**
 * 用于url输入后的组件切换
 */

//懒加载
const HelloWorld = () => import("@/components/HelloWorld");
const Login = () => import("@/views/Login");
const Project = () => import("@/views/Project");
const Record = () => import("@/views/Record");
const Register = () => import("@/views/Register");

//const BasicAnalyze = () => import("@/views/StructureAnalyze/BasicAnalyze");

const ReengineeringIndex = () =>
  import("@/views/ReverseEngineering/ReengineeringIndex");
const ClassDiagram = () => import("@/views/ReverseEngineering/ClassDiagram");
const ControlFlow = () => import("@/views/ReverseEngineering/ControlFlow");

import ProjectAnalyze from "@/views/StructureAnalyze/ProjectAnalyze";
import FileAnalyze from "@/views/StructureAnalyze/FileAnalyze";
import chooseProject from "@/views/StructureAnalyze/chooseProject";
import astGraph from "@/views/StructureAnalyze/astGraph";
import dependencyGraph from "@/views/StructureAnalyze/dependencyGraph";
import callGraph from "@/views/StructureAnalyze/callGraph";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/projects",
    name: "Project",
    component: Project,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/reengineering",
    name: "ReengineeringIndex",
    component: ReengineeringIndex,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/records",
    name: "Records",
    component: Record,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/classDiagram",
    name: "ClassDiagram",
    component: ClassDiagram,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/controlFlow",
    name: "ControlFlow",
    component: ControlFlow,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/chooseProject",
    name: "ChooseProject",
    component: chooseProject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/projectAnalyze",
    name: "ProjectAnalyze",
    component: ProjectAnalyze,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/file",
    name: "FileAnalyze",
    component: FileAnalyze,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/dependency",
    name: "dependencyGraph",
    component: dependencyGraph,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ast",
    name: "astGraph",
    component: astGraph,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/call",
    name: "callGraph",
    component: callGraph,
    meta: {
      requiresAuth: true
    }
  }
];
const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  if (to.fullPath == from.fullPath) {
    return;
  }
  /* 如果已登录,则不允许直接跳转到登录页面 */
  if (to.fullPath == "/login") {
    if (sessionStorage.isLogin) {
      next({
        path: from.fullPath,
      });
      return;
    } else {
      next();
      return;
    }
  }
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // 访问需要登录的页面
  if (requiresAuth) {
    if (sessionStorage.accessToken && sessionStorage.isLogin) {
      //已登录
          next();
    }
    //未登录
    else {
      next({ path: "/login" });
      console.log("尚未登录！");
    }
  } else {
    //访问不需要登录的页面
    next();
  }
});
//3.将router对象传到vue实例中
export default router;

