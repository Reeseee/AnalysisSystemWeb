import { reengineerRequest } from './reengineerRequest';
import { request } from './request';


//获取类图
export function getClassDiagram(pid,uid) {
    return request({
        url: '/classStructure/analysis/'+pid,
        method:'get',
        params:{
            userId:uid,
        }
      
    })
}
//导出类图
export function exportClassDiagram(pid,uid) {
    return request({
        url: '/classStructure/export/'+pid,
        method:'get',
        params:{
            userId:uid,
        },
        responseType: 'arraybuffer',
      
    })
}

//获取目录结构
export function getDirectory(pid,uid) {
    return request({
        url: '/projectDir/'+pid,
        method:'get',
      
    })
}
//获取控制流图(测试)
export function getVSResultControlFlowjson(filename,uid) {
    return request({
        url: '/static/testJsonData/controlFlow.json',
        method:'get',
        // params:{
        //     userId:uid,
        // }
    })
}
//获取控制流图
export function getControlFlow(pid,filename,uid) {
    return request({
        url: '/controlFlow/analysis/'+ pid,
        method:'get',
        params:{
            fileName:filename,
            userId:uid,
        }
    })
}
//导出控制流图
export function exportControlFlow(pid,filename,uid) {
    return request({
        url: '/controlFlow/export/'+pid,
        method:'get',
        params:{
            fileName:filename,
            userId:uid,
        },
        responseType: 'arraybuffer',
      
    })
}
//获取数据依赖
export function getDataDependence(pid,filename,uid,ctrl) {
    return request({
        url: '/dataDependence/analysis/'+ pid,
        method:'get',
        params:{
            fileName:filename,
            userId:uid,
            withCtrl:ctrl,
        }
    })
}
//导出数据依赖
export function exportDataDependence(pid,filename,uid,ctrl) {
    return request({
        url: '/dataDependence/export/'+pid,
        method:'get',
        params:{
            fileName:filename,
            userId:uid,
            withCtrl:ctrl,
        },
        responseType: 'arraybuffer',
      
    })
}
