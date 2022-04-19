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

import ProjectAnalyze from "@/views/StructureAnalyze/ProjectAnalyze";
import FileAnalyze from '@/views/StructureAnalyze/FileAnalyze'
import chooseProject from "@/views/StructureAnalyze/chooseProject";
import astGraph from "@/views/StructureAnalyze/astGraph";
import dependencyGraph from '@/views/StructureAnalyze/dependencyGraph';
import callGraph from '@/views/StructureAnalyze/callGraph';


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
      name: 'ChooseProject',
      component: chooseProject
    },
    {
      path: '/projectAnalyze',
      name: 'ProjectAnalyze',
      component: ProjectAnalyze
    },
    {
      path: '/file',
      name: 'FileAnalyze',
      component: FileAnalyze
    },
    {
      path: '/dependency',
      name: 'dependencyGraph',
      component: dependencyGraph
    },
    {
      path: '/ast',
      name: 'astGraph',
      component: astGraph
    },
    {
      path: '/call',
      name: 'callGraph',
      component: callGraph
    }
  ]
})
