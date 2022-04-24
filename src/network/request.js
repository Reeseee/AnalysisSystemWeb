import axios from "axios";
export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: "http://127.0.0.1:9001/",
    timeout: 5000
    //headers:{ 'Content-Type':'application/x-www-form-urlencoded'},
    //withCredentials: true,
  });
  //axios拦截器
  instance.interceptors.request.use(
    config => {
      let token = sessionStorage.getItem("accessToken");
      if (token) {
        //config.headers.accessToken=sessionStorage.getItem('accessToken');
        config.headers["authorization"] = "Bearer " + token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  instance.interceptors.response.use(
    res => {
      //console.log(res);
      return res.data;
    }, //只返回response中的data
    //todo:无效 未访问到error的状态码
    error => {
      //处理状态码返回401:token过期的情况
      console.log(error);
      if (error.status) {
        switch (error.status) {
          case 401:{
            sessionStorage.clear();
            sessionStorage.removeItem("accessToken");
            this.$router.push("/login");
          }
          case 302:{
            sessionStorage.clear();
            sessionStorage.removeItem("accessToken");
            this.$router.push("/login");
          }
            
        
        }
      }
      return Promise.reject(error.data); // 返回接口返回的错误信息
    }
  );

  //发送网络请求
  return instance(config);
}
