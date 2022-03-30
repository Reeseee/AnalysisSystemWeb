import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store=new Vuex.Store({
    state:{
        //个人信息
        id:1||sessionStorage.getItem('id'),
        isLogin:true||sessionStorage.getItem('isLogin'),
        username:"test"||sessionStorage.getItem('usernanme'),
        email:"test@qq.com"||sessionStorage.getItem('email'),
        accessToken: sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : '',//token
        // role:''||sessionStorage.getItem('role'),
        
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
            state.role='';
            state.avatar={};

        },
        SET_TOKEN:(state,auth)=>{
            state.accessToken=auth;
            sessionStorage.setItem('accessToken',auth)
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
    },
    modules:{
        
    }
})

export default store
