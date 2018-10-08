
//主要网址
const BASEURL = "https://www.easy-mock.com/mock/5b723e74f22b3d63d2d67cc4/SmileVue/";
const LOCALURL = "http://localhost:3000/"
const URL ={
    getShoppingMall: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register'

}

//暴露接口
module.exports = URL;