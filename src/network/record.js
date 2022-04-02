import { request } from "./request";
import qs from "qs";
export function getRecordList(id,pageNo) {
  return request({
    url: '/record/list',//获取记录接口
    params:{
        userId:id,
        pageNo:pageNo
    }
  });
}
export function getRecordCount(uid) {
  return request({
    url: '/record/pageCount',//获取记录页数接口
    params:{
        userId:uid,   
    }
  });
}