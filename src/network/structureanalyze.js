import { StructureRequest } from "./StructureRequest";

export function getProjectAnalyze(id,userId) {
    return StructureRequest({
      url: '/projectAnalyze/initial/' + id ,
      params:{
          userId:userId,
      }
    });
}

export function getProjectDependency(id,userId) {
    return StructureRequest({
      url: '/projectAnalyze/dependency/' + id ,
      params:{
          userId:userId,
      }
    });
}

export function getProjectCall(id,userId) {
    return StructureRequest({
      url: '/projectAnalyze/call/' + id ,
      params:{
          userId:userId,
      }
    });
}

export function exportProjectDependency(id,userId) {
    return StructureRequest({
      url: '/projectAnalyze/dependency/export/' + id ,
      params:{
          userId:userId,
      },
      responseType: "blob"
    });
}

export function exportProjectCall(id,userId) {
    return StructureRequest({
      url: '/projectAnalyze/call/export/' + id ,
      params:{
          userId:userId,
      },
      responseType: "blob"
    });
}

export function getFileAnalyze(id,filepath,userId) {
    return StructureRequest({
      url: '/fileAnalyze/initial/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      }
    });
}

export function getFileDependency(id,filepath,userId) {
    return StructureRequest({
      url: '/fileAnalyze/dependency/' + id ,
      params:{
          fileName: filepath,
          userId:userId
      }
    });
}

export function getFileCall(id,filepath,userId) {
    return StructureRequest({
      url: '/fileAnalyze/call/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      }
    });
}

export function getFileAst(id,filepath,userId) {
    return StructureRequest({
      url: '/fileAnalyze/ast/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      }
    });
}

export function exportFileAst(id,filepath,userId) {
    return StructureRequest({
      url: '/fileAnalyze/ast/' + id ,
      params:{
        fileName: filepath,
        userId:userId
      },
      responseType: "blob"
    });
}
