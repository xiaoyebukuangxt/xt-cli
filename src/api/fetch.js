import Qs from 'qs';
import axios from 'axios';
import Vue from 'vue';

const debug = process.env.NODE_ENV !== 'production';

function aipUrlDealer(url){  
    if(!debug){//生产环境
      url = window.gloabl.baseUrl+ '/' + url
    }else{//开发环境

    }   
  return url;
}


export default function fetch(options,requireStringify = true) {
    return new Promise((resolve, reject) => {
      const instance = axios.create({
          // baseURL: process.env.BASE_API,
          timeout: 60000,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin':'*'
          },
          withCredentials:true,
          paramsSerializer: requireStringify ? function(params) {
            return Qs.stringify(params);
          } : () => {},
          transformRequest: requireStringify ? [function (data) {
            return Qs.stringify(data);
          }] : [],
      });
      options.url=aipUrlDealer(options.url);

      instance.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          if(error.response){
            switch(error.response.status){             
              case 401:
                window.location.href =  window.loginUrl + "/login?service=" + encodeURIComponent(window.location.href)
              }            
          }
          return Promise.reject(error.response)
        }
      )
      instance(options).then((res) => {
          if(res.data.code && res.data.code != "200"){
              let errmessage = res.data.err || '后台客户端调用eureka服务端发生异常';
              Vue.prototype.messageAlert('error',errmessage)
          }
        
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    
    });
  }


  

//文件上传
const uploadFile = function(options){
  let config = {
		// headers:{'Content-Type': 'application/x-www-form-urlencoded'}
		headers:{'Content-Type': 'multipart/form-data'}
  };
  
  let newUrl=aipUrlDealer(options.url);
  axios.defaults.withCredentials = true;
  //axios拦截401
  axios.interceptors.response.use(
    response  => {
      return response
    },
    error => {
      if(error.response){
        switch(error.response.status){
          case 401:
          window.location.href = "http://192.168.40.223:8081/InfoShareSystem/login?service=" + encodeURIComponent(window.location.href);
        }
      }
    }
  );

  return new Promise((resolve, reject) => {
      axios.post(newUrl,options.data,config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
	})
}

export {uploadFile}
