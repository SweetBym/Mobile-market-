<template>
  <div>
      <div class="search-bar">
        <van-row  class="test-row">
           <van-col span= "3">
               <img :src="loactionIcon" width="80%" class="location-logo">
           </van-col>
           <van-col span= "16">
               <input  type="text" class="search-input"   />
            </van-col>
           <van-col span= "5">
               <van-button  size='mini' >查找</van-button>
               
           </van-col>
        </van-row>
      </div>

      <!--轮播图区域-->
      <div class="swiper-area">
          <van-swipe :autoplay="2000">
              <van-swipe-item v-for="(banner,index) in bannerPicArray"  :key="index">
                  <img v-lazy="banner.image"  width="100%" />                
              </van-swipe-item>
          </van-swipe>
      </div>

      <!--type bar-->
      <div  class="type-bar">
          <div  v-for="(cate,index) in category" :key="index">
              <img v-lazy="cate.image"  width="90%"/>
              <span>{{cate.mallCategoryName}}</span>
          </div>
      </div>

      <div>
          <img   v-lazy="addBanner"  width="100%" />
      </div>

      <!--Recommend goods area-->
      <div class="recommend-area">
          <div class="recommend-title">
              商品推荐
          </div>
          <div class="recommend-body">
              <swiper  :options="swiperOption">
                  <swiper-slide  v-for="(item,index) in recommendGoods"  :key="index">
                      <div  class="recommend-item">
                          <img  :src="item.image"  width="80%" />
                          <div>{{item.goodsName}}</div>
                          <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                      </div>
                  </swiper-slide>                  
              </swiper>
          </div>
      </div>

          
    <floor-component :floorData="floor1"  :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

      <!--Hot Area-->
   <div class="hot-area">
      <div class="hot-title">热卖商品</div> 
      <div class="hot-goods">
      <!--这里需要一个list组件-->
        <van-list>
            <van-row gutter="20">
                <van-col  span="12" v-for="(item,index) in hotGoods" :key="index"  >
                   <goods-info :goodsImage = "item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                </van-col>
            </van-row>
        </van-list>
      </div>
  </div>
 
    
  </div>
</template>

<script >
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfo";
import { toMoney } from "@/filter/moneyFilter.js";
import Url from '@/serviceAPI.config.js'

export default {
  data() {
    return {
      loactionIcon: require("../../assets/iamges/location.png"),
      bannerPicArray: [],
      category: [],
      addBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },

  //获取数据，然后渲染到页面中
  created() {
    axios({
      url: Url.getShoppingMall,        
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.bannerPicArray = response.data.data.slides;
          this.addBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped >
.search-bar {
  height: 2.5rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}

.search-input {
  width: 100%;
  height: 1.3rem;
  background-color: #e5017d;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid#fff !important;
  color: #fff;
}

.location-logo {
  padding-top: 0.3rem;
  padding-left: 0.3rem;
}

.swiper-area {
  clear: both;
  max-height: 12rem;
  overflow: hidden;
}
.search-bar {
  overflow: hidden;
}

.type-bar {
  background-color: red;
  border-radius: 0.3rem;
  margin: 0 0.3rem 0.3rem 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  font-size: 14px;
  border-bottom: 1px solid #eee;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid#eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
}



</style>
