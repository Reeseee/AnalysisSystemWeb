import axios from 'axios'
export function request(config) {
    //创建axios实例
    const instance =axios.create({
        baseURL:'/api',
        timeout:5000,
        headers:{ 'Content-Type':'application/x-www-form-urlencoded'},
        withCredentials: true,
    })
    // //axios拦截器
    // instance.interceptors.request.use(
    //     config=>{
    //         if(sessionStorage.getItem('accessToken')){
    //             config.headers.accessToken=sessionStorage.getItem('accessToken');
    //         }
    //         return config;
    //     },err=>{
    //         return Promise.reject(err);
    //     });
    // instance.interceptors.response.use(
    //     res=>{return res.data},
    //     error=>{//处理状态码返回401:token过期的情况
    //         if(error.status){
    //             switch(error.status){
    //                 case 401:
    //                     sessionStorage.clear();
    //                     sessionStorage.removeItem('Authorization');
                        
    //                     this.$router.push('/login');
    //             }
                
    //         }
    //         return Promise.reject(error.data)   // 返回接口返回的错误信息
    //     }
    // );

    //发送网络请求
    return instance(config)
}