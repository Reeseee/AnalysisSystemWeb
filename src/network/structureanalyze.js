import { StructureRequest } from "./StructureRequest";
import { request } from "./request";

export function getProjectAnalyze(id,userId) {
    return request({
      url: '/projectAnalyze/initial/' + id ,
      params:{
          userId:userId,
      }
    });
}

export function getProjectDependency(id,userId) {
    return request({
      url: '/projectAnalyze/dependency/' + id ,
      params:{
          userId:userId,
      }
    });
}

export function getProjectCall(id,userId) {
    return request({
      url: '/projectAnalyze/call/' + id ,
      params:{
          userId:userId,
      }
    });
}

export function exportProjectDependency(id,userId) {
    return request({
      url: '/projectAnalyze/dependency/export/' + id ,
      params:{
          userId:userId,
      },
      responseType: "blob"
    });
}

export function exportProjectCall(id,userId) {
    return request({
      url: '/projectAnalyze/call/export/' + id ,
      params:{
          userId:userId,
      },
      responseType: "blob"
    });
}

export function getFileAnalyze(id,filepath,userId) {
    return request({
      url: '/fileAnalyze/initial/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      }
    });
}

export function getFileDependency(id,filepath,userId) {
    return request({
      url: '/fileAnalyze/dependency/' + id ,
      params:{
          fileName: filepath,
          userId:userId
      }
    });
}

export function getFileCall(id,filepath,userId) {
    return request({
      url: '/fileAnalyze/call/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      }
    });
}

export function getFileAst(id,filepath,userId) {
    return request({
      url: '/fileAnalyze/ast/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      }
    });
}

export function exportFileAst(id,filepath,userId) {
    return request({
      url: '/fileAnalyze/ast/export/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      },
      responseType: "blob"
    });
}
