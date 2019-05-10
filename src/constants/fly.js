import Taro from '@tarojs/taro'
import Fly from 'flyio/dist/npm/wx'

const fly = new Fly;

fly.interceptors.request.use((request) => {
  const token = Taro.getStorageSync('jwt');
  //给所有请求添加自定义header
  request.headers["authorization"] = token;
  return request;
})


if (process.env.NODE_ENV === 'development') {
  fly.config.baseURL = 'http://localhost:3003'
} else {
  fly.config.baseURL = 'https://lmovie.xyz'
}


export default fly