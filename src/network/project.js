import { request } from "./request";
import qs from "qs";
export function getProjectList(id,offset,limit) {
  return request({
    url: 'project/limit',//获取项目接口
    params:{
        userId:id,
        offset:offset,
        limit:limit,
    }
  });
}
export function deleteProject(id) {
  var data = {
    projectId: id,
  };
  return request({
    url: "project/delete1", //删除项目接口
    data: qs.stringify(data),
    method: "post",
  });
}
export function isProjectExist(name) {
  return request({
    url: "/project/name/exist", //项目名称重复接口
    params: {
      projectName: name,
    },
  });
}
export function createProject(pro) {
  return request({
    url: "/project/new", //上传项目接口
    headers: { "Content-Type": "application/json" },
    data: pro,
    method: "post",
  });
}
export function downloadProjects(n) {
  return request({
    url: "/download/sample", //下载样例接口
    params:{
      fileNum:n,
    },
    responseType: 'blob'
  });
}
