import { request } from './request';
import qs from 'qs'

//测试
export function getVSResultClassjson() {
    return request({
        url: '/static/testJsonData/classDiagram.json',
        method:'get',
      
    })
}
export function getVSResultControlFlowjson() {
    return request({
        url: '/static/testJsonData/controlFlow.json',
        method:'get',
    })
}