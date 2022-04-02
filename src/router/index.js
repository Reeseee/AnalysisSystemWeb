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
//const BasicAnalyze = () => import("@/views/StructureAnalyze/BasicAnalyze");

const ReengineeringIndex = () => import("@/views/ReverseEngineering/ReengineeringIndex");
const ReengineeringVS = () => import("@/views/ReverseEngineering/ReengineeringVS");
const ClassDiagram = () => import("@/views/ReverseEngineering/ClassDiagram");
const ControlFlow = () => import("@/views/ReverseEngineering/ControlFlow");

const ProjectAnalyze = () => import("@/views/StructureAnalyze/ProjectAnalyze");
import chooseProject from "@/views/StructureAnalyze/chooseProject"


Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/reengineering',
      name: 'ReengineeringIndex',
      component: ReengineeringIndex
    },
    {
      path: '/records',
      name: 'Records',
      component: Record
    },
    {
      path: '/classDiagram',
      name: 'ClassDiagram',
      component: ClassDiagram
    },
    {
      path: '/controlFlow',
      name: 'ControlFlow',
      component: ControlFlow
    },
    {
      path: '/chooseProject',
      name: 'chooseProject',
      component: chooseProject
    },
    {
      path: '/projectAnalyze',
      name: 'ProjectAnalyze',
      component: ProjectAnalyze
    },
    
  ]
})
