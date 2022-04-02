import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store=new Vuex.Store({
    state:{
        //个人信息
        id:''||sessionStorage.getItem('id'),
        isLogin:false||sessionStorage.getItem('isLogin'),
        username:""||sessionStorage.getItem('username'),
        email:"test@qq.com"||sessionStorage.getItem('email'),
        accessToken: sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : '',//token

        //正在分析的项目
        project:sessionStorage.getItem('project')? JSON.parse(sessionStorage.getItem('project')):{},
        
    },
    mutations:{//同步操作
        SET_ID:(state,id)=>{
            state.id=id;
            sessionStorage.setItem('id', id)
        },
        SET_ISLOGIN:(state,isLogin)=>{
            state.isLogin=isLogin;
            sessionStorage.setItem("isLogin",isLogin)//保存登录状态防止刷新失效 与mainjs里面对应
        },
       
        LOG_OUT:(state)=>{
            sessionStorage.clear();
            state.isLogin=false;
            state.id='';
            state.accessToken='';
            state.username='';
            state.project={};
          

        },
        SET_TOKEN:(state,auth)=>{
            state.accessToken=auth;
            sessionStorage.setItem('accessToken',auth)
        },
        SET_USERNAME:(state,username)=>{
            state.username=username;
            sessionStorage.setItem('username',username)
        },
        SET_PROJECT(state, proinfo) {
            sessionStorage.setItem('project',JSON.stringify(proinfo));
            state.project = proinfo;
          },
    },
    actions:{//异步操作

    },
    getters:{
        isLogin:state=>state.isLogin,
        id:state=>state.id,
        username:state=>state.username,
        email:state=>state.email,
        accessToken:state=>state.accessToken,
        project:state=>state.project,
    },
    modules:{
        
    }
})

export default store
