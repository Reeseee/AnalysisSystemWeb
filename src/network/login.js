import { request } from './request';
import qs from 'qs'
export function login(loginForm) {
    return request({ 
        url: '/login',//登录接口
        method:'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        data: qs.stringify(loginForm), 
    })
}

// export function modifyPassByPhone(newpass) {
//     return request({
//         url: '/user/pwd/modify/forget',//修改密码接口
//         data:qs.stringify(newpass),
//         method:'post',
//     })
// }

// export function logout(){
//     return request({
//         url:'/user/logout',//用户登出
//         method:'get',
//     })
// }

// export function sendCode(phone){
//     var data={
//         phone:phone,
//     }
//     return request({
//         url:'/user/sms',//发送短信
//         method:'post',
//         data:qs.stringify(data)
//     })
// }
// export function validate(code){
//     return request({
//         url:'/user/active/'+code,//激活邮件
//     })
// }