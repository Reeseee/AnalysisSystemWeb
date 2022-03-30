import Vue from 'vue'
import Router from 'vue-router'

/**
 * 用于url输入后的组件切换
 */


//懒加载
const HelloWorld = () => import("@/components/HelloWorld");
const Login = () => import("@/views/Login");
const Project = () => import("@/views/Project");
const Record = () => import("@/views/Record");
const BasicAnalyze = () => import("@/views/StructureAnalyze/BasicAnalyze");
const ReengineeringIndex = () => import("@/views/ReverseEngineering/ReengineeringIndex");


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/projects',
      name: 'Project',
      component: Project
    },
    {
      path: '/analysis',
      name: 'BasicAnalyze',
      component: BasicAnalyze 
    },
    {
      path: '/reengineering',
      name: 'ReengineeringIndex',
      component: ReengineeringIndex
    },
    {
      path: '/records',
      name: 'Records',
      component: Record
    },
    
  ]
})
