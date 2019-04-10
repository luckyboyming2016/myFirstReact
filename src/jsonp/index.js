import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
export default class Axios{
  static JSONP(options){
    return new Promise((resolve,reject)=>{
      Jsonp(options.url,{
        param: 'callback'
      },function(err,response){
        if(response.status === 'success'){
          resolve(response)
        }else{
          reject(response.error)
        }
      })
    })
  }
  static ajax(options){
    let baseUrl = 'https://easy-mock.com/mock/5cac0f6c16514c2a43442aa9/mockapi'
    return new Promise((resolve,reject)=>{
      axios({
        url: options.url,
        method: 'get',
        params: options.params || '',
        timeout: 5000,
        baseURL: baseUrl
      }).then(res=>{
        if(res.status === 200){
          if(res.data.code === 0){
            resolve(res.data)
          }else{
            Modal.error({
              title: '提示',
              content: res.data.msg,
              okText: '确定'
            })
          }
        }else{
          reject(res.data)
        }
      })
    })
  }
}