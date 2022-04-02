import { request } from "./request";
import qs from "qs";
export function getProjectList(id, pageNo) {
  return request({
    url: "/myProject/list", //获取项目接口
    params: {
      userId: id,
      pageNo: pageNo
    }
  });
}
export function getProjectCount(uid) {
  return request({
    url: "/myProject/listCount", //获取项目页数接口
    params: {
      userId: uid
    }
  });
}
export function uploadProject(formdata) {
  return request({
    url: "/myProject/upload", //上传项目接口
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    data: formdata,
    method: "post"
  });
}
// export function deleteProject(id) {
//   var data = {
//     projectId: id,
//   };
//   return request({
//     url: "project/delete1", //删除项目接口
//     data: qs.stringify(data),
//     method: "post",
//   });
// }
export function isProjectExist(name) {
  return request({
    url: "/project/name/exist", //项目名称重复接口
    params: {
      projectName: name
    }
  });
}
