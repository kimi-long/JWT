<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-04-25 22:12:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="weui-tab padding-bottom">
    <div class="weui-tab__panel">

      <div class="swiper-box" style="z-index:9999;background-color:#fff">
        <swiper class="box-container" :options="swiperOption" ref="swiperOption" v-if='listImg.length>0'>
          <swiper-slide class="slide" v-for="(item, index) in listImg" :key="index" @touchmove.native="stopPlay" @touchend.native="play">
            <img class="swiper-image" :src="item" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
      <!-- {{StoresDetails}} -->
			<div style="margin-top:-15px; background-color: #FFFFFF;padding: 0px 15px 5px 15px;" class="weui-media-box weui-media-box_appmsg">
			    <div class="weui-media-box__hd" style="z-index: 99;">
					<div id="logo" class="store_logo" :style="{backgroundImage: 'url('+StoresDetails.HeadUrl+')'}"></div>
			    </div>
			    <div class="weui-media-box__bd">
			        <h4 class="weui-media-box__title" id="storeName">{{StoresDetails.StoresName}}</h4>
			        <p style="margin-top: 5px; font-size: 10px;" class="weui-media-box__desc"></p>
			    </div>
			</div>
			<!-- 原来的样式模块，不要删 -->
            <!-- <div class="home_float">
			</div> -->
			<div style="background-color: #FFFFFF;padding: 10px 15px 20px 15px;height:80px;">
           <a @click="goStuMsg" class="home_tool">
                    <div style="text-align: center;">
                        <svg t="1580827742795" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1727" width="48" height="48"><path d="M512.001 936.103c-48.203 0-94.983-9.449-139.043-28.084-42.537-17.991-80.732-43.74-113.523-76.531-32.792-32.791-58.541-70.985-76.533-113.522-18.636-44.059-28.085-90.84-28.085-139.043s9.449-94.984 28.085-139.043c17.992-42.538 43.741-80.732 76.533-113.524 32.791-32.791 70.986-58.54 113.523-76.532 44.06-18.636 90.84-28.084 139.043-28.084s94.984 9.449 139.044 28.084c42.537 17.992 80.731 43.741 113.522 76.533 32.791 32.791 58.54 70.986 76.532 113.523 18.635 44.06 28.084 90.84 28.084 139.043s-9.449 94.984-28.084 139.042c-17.992 42.537-43.741 80.732-76.532 113.522s-70.985 58.54-113.523 76.531c-44.059 18.636-90.84 28.085-139.043 28.085z m0-640.364c-156.148 0-283.185 127.036-283.185 283.184 0 156.146 127.036 283.18 283.185 283.18 156.147 0 283.183-127.034 283.183-283.18 0-156.148-127.036-283.184-283.183-283.184z" p-id="1728" fill="#368BFF"></path><path d="M512.66 616.727c-20.435 0-37-16.565-37-37v-144.3c0-20.435 16.565-37 37-37s37 16.565 37 37v144.3c0 20.435-16.565 37-37 37z" p-id="1729" fill="#368BFF"></path><path d="M643.735 683.087a36.845 36.845 0 0 1-16.679-3.995L495.952 612.74c-18.232-9.228-25.532-31.488-16.305-49.721 9.228-18.233 31.486-25.534 49.721-16.305l131.104 66.353c18.232 9.228 25.532 31.488 16.305 49.721-6.516 12.875-19.535 20.299-33.042 20.299z" p-id="1730" fill="#368BFF"></path><path d="M158.828 345.732c-10.86 0-21.619-4.758-28.927-13.901-12.758-15.963-10.159-39.246 5.804-52.003L282.096 162.83c15.96-12.757 39.245-10.16 52.003 5.803s10.159 39.246-5.804 52.003L181.904 337.634a36.843 36.843 0 0 1-23.076 8.098zM865.172 345.732a36.837 36.837 0 0 1-23.076-8.098L695.705 220.636c-15.963-12.758-18.562-36.041-5.804-52.003 12.759-15.962 36.042-18.561 52.003-5.803l146.391 116.998c15.963 12.758 18.562 36.041 5.804 52.003-7.308 9.143-18.068 13.901-28.927 13.901z" p-id="1731" fill="#368BFF"></path></svg>
                    </div>
                    <p class="weui-grid__label">一对一</p>
                </a>
				<a @click="goStuOrder" class="home_tool">
					<div style="text-align: center;">
						<svg t="1580826968231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7677" width="48" height="48"><path d="M234.666667 213.333333h57.706666v63.978667L234.666667 277.333333v106.666667h554.666666v-106.666667h-55.232v-64H789.333333a64 64 0 0 1 64 64v512a64 64 0 0 1-64 64H234.666667a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64z m554.666666 234.666667H234.666667v341.333333h554.666666V448z m-384 192v64h-106.666666v-64h106.666666z m160 0v64h-106.666666v-64h106.666666z m160 0v64h-106.666666v-64h106.666666z m-320-128v64h-106.666666v-64h106.666666z m160 0v64h-106.666666v-64h106.666666z m160 0v64h-106.666666v-64h106.666666zM697.728 170.666667v106.666666h-64.021333V170.666667h64z m-104.170667 42.666666v64l-160.618666-0.021333V213.333333h160.618666z m-197.013333-42.666666v106.666666h-64V170.666667h64z" p-id="7678" fill="#19be6b"></path></svg>
					</div>
					<p class="weui-grid__label">课程预约</p>
				</a>
				<a @click="goMyCourse" class="home_tool">
					<div style="text-align: center;">
						<svg t="1580796025990" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7161" width="48" height="48"><path d="M512 160c194.410667 0 352 157.589333 352 352S706.410667 864 512 864l-2.538667-0.106667c-91.477333-7.274667-165.738667-38.08-221.44-91.989333L288 842.666667h-64V640H405.333333v64h-92.842666c46.250667 56.917333 112.490667 88.725333 200.768 96l6.677333-0.106667C675.328 795.690667 800 668.394667 800 512c0-159.061333-128.938667-288-288-288S224 352.938667 224 512h-64c0-194.410667 157.589333-352 352-352zM469.333333 320h64v160h160v64H469.333333V320z" p-id="7162" fill="#ff9900"></path></svg>
					</div>
					<p class="weui-grid__label">我的预约</p>
				</a>
				<a @click="goStuCard" class="home_tool">
					<div style="text-align: center;">
						<svg t="1584078525439" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10247" width="48" height="48"><path d="M888.832 163.84H135.168C74.752 163.84 25.6 212.992 25.6 273.408v477.184c0 60.416 49.152 109.568 109.568 109.568h754.176c60.416 0 109.568-49.152 109.568-109.568v-302.08c0-14.848-12.288-26.624-27.136-26.624s-26.624 11.776-27.136 26.624v304.64c0 30.72-25.088 55.296-55.296 55.296H135.168c-30.72 0-55.296-25.088-55.296-55.296V270.336c0-30.72 25.088-55.296 55.296-55.296h753.664c30.72 0 55.296 25.088 55.296 55.296V281.6c0 14.848 12.288 27.136 27.136 27.136s27.136-12.288 27.136-27.136v-8.192c0-60.416-49.152-109.568-109.568-109.568z" p-id="10248" fill="#ed4014"></path><path d="M397.312 376.32h58.88l-92.16 271.36H309.76l-91.648-271.36h60.928l58.368 205.312 59.904-205.312zM544.256 376.32v271.36H487.424v-271.36h56.832zM653.824 549.376v97.792h-56.832v-271.36h123.904c26.112 0 46.592 7.68 61.952 23.04 14.848 15.36 22.528 36.864 22.528 63.488 0 18.944-5.12 36.864-15.872 52.224-15.36 22.528-38.912 33.792-70.656 33.792h-65.024z m0-46.592H706.56c17.92 0 30.72-5.632 36.864-16.384 3.584-6.144 5.12-14.336 5.12-25.6 0-13.312-4.096-23.04-11.776-28.672-7.68-5.632-20.48-8.704-38.4-8.704h-45.056v79.36z" p-id="10249" fill="#ed4014"></path></svg>
					</div>
					<p class="weui-grid__label">我的会员卡</p>
				</a>
                
			</div>
      <div class="weui-panel card">
          <div style="text-align: center; padding-top:15px;">
              <img src="../../assets/img/notice20200319.png" style="width: 80px ;"/>
          </div>
          <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_text">
                  <p class="box-line" @click="goDetails(items)" v-for="items in listNotice">
                    {{items.SContent}}
                  </p>
              </div>
          </div>
      </div>
			<!-- {{StoresDetails}} -->
      <div class="weui-panel card">
          <!-- <div class="weui-panel__hd">公告</div> -->
          <div class="card_title">
              <div class="card_title_color card_text_line"></div>
              <div class="card_title_text">联系机构</div>
          </div>

          <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_text">
                  <p id="contact" style="padding:5px 0">联系人：{{StoresDetails.Name}}</p>
                  <p id="mobile" style="padding:5px 0">联系电话：{{StoresDetails.StoresPhone}}</p>
                  <p id="address" style="padding:5px 0">地址：{{StoresDetails.Address}}</p>
              </div>
          </div>
      </div>

      <div class="weui-panel card">
          <!-- <div class="weui-panel__hd">公告</div> -->
          <div class="card_title">
              <div class="card_title_color card_text_line"></div>
              <div class="card_title_text">门店介绍</div>
          </div>

          <div class="weui-panel__bd">
              <div class="weui-media-box weui-media-box_text">

                  <p id="address" v-html="StoresDetails.StoresInfo"></p>
              </div>
          </div>
      </div>
			
			
			<!-- 底部标签 -->
			<div class="weui-footer" style="padding: 10px 0 20px 0;">
				<a>
					<p class="weui-footer__links">
						<img style="width: 70px;" src="../../assets/img/icon_footer_haoyueke.png">
					</p>
					<p class="weui-footer__text" style="color:#bfbfbf;">由「智火约课」提供技术支持</p>
				</a>
			</div>
    </div>
    <div class="msgContent" v-if="msgDetails">
      {{msgDetailsList.Title}}
      <i class="iconfont icon-guanbi" @click="cancelPopUp"></i>
      <div class="msgContent-word">
        {{msgDetailsList.SContent}}
        <p>{{msgDetailsList.addTime}}</p>
      </div>
    </div>
    <student-bottom></student-bottom>
  </div>
</template>
<style scoped>
.box-line{
  padding:5px 0
}
 .swiper-image{
   width: 100%;
   height: 200px;
 }
  .slide {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .slideshow {
    width: 100%;
    height: 200px;
  }
  .slideshow ul{
    width:100%;
    height: 200px;
  }
  .slideshow li {
    width:100%;
    position: absolute;
  }
  .slideshow ul a{
    display: inline-block;
    width:100%;
  }
  .slideshow img {
    width: 100%;
    height: 200px;
  }
  .bar {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 0 auto;
    z-index: 10;
    text-align: center;
  }
  .bar span {
    width: 10px;
    height: 10px;
    border-radius:50%;
    background: white;
    display: inline-block;
    margin-right: 10px;
  }
  .active {
    background: red !important;
  }
  .image-enter-active {
    transform: translateX(0);
    transition: all 1.5s ease;
  }
  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
  }
  .image-enter {
    transform: translateX(100%);
  }
  .image-leave {
    transform: translateX(0);
  }
.weui-media-box_appmsg {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    margin-top: -15px;
    background-color: #FFFFFF;
    padding: 0px 15px 5px 15px;
    position: relative;
}
.weui-media-box_appmsg .weui-media-box__hd {
    margin-right: .8em;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.weui-panel {
    background-color: #FFFFFF;
    margin-top: 10px;
    position: relative;
    overflow: hidden;
}
.weui-media-box {
    padding: 15px;
    position: relative;
}
.weui-footer {
    color: #999999;
    font-size: 14px;
    text-align: center;
}
.weui-footer__text {
    padding: 0 .34em;
    font-size: 12px;
}
.weui-grid__label {
    display: block;
    text-align: center;
    color: #000000;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
/*!
 * by liangting 2020/1/3
 */

.inline{
  display:inline-block;
}

.left{
  float:left;
}

.right{
  float:right;
}


.card{
	margin: 15px;
	background-color: #FFFFFF;
	/*position: relative;*/
	box-shadow: 0px 0px 10px #e8eaec;
	border-radius: 3px;
}

.card_title_color{
	background-color: #368BFF;
	margin-top: 4px;
	height: 18px;
	width: 3px;
}

.card_title{
	padding-top: 10px;
	font-weight:800;
}

.card_title_text{
	font-size: 16px;
}

.card_content{
	padding: 8px 16px 16px 16px;
}

.card_text{
	font-size: 20px;
}

.card_text_small{
	font-size: 12px;
	color: #999999;
}


.card_text_line{
	float:left;
	margin-right: 10px; 
}

.card_text_line_right{
	float:right;
	padding-left: 10px; 
}

.store_logo{
	border-radius: 3px; 
	background-color: #FFFFFF; 
	width: 60px; 
	height: 60px;
	background:no-repeat center center;
	background-size:cover;
	margin-top: -20px;
}
.bgImg{
  background-image: url('../../assets/img/default_logo.png');
}
.weui-media-box_appmsg .weui-media-box__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
}
.weui-media-box__title {
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
}

.store_name{
	padding: 10px 10px 10px 60px;
	
}


.home_float{
	margin: 15px;
	background-color: #FFFFFF;
	height:60px;
	border-radius: 3px;
    box-shadow: 0px 0px 20px 10px rgba(255, 255, 255, 0.28);
    padding: 20px 20px 40px 20px;
    top: -60px;
    z-index:1;
    position: relative;
}

.home_icon{
    font-size: 28px;
    color: #F9CA3D;

    /*阴影*/
    /*filter: drop-shadow(0 0 2px #F9CA3D) drop-shadow(0 0 15px #c0c) drop-shadow(0 0 5px #f0f);*/
    -webkit-filter: drop-shadow(4px 4px 2px #dcdee2);
}

.home_tool{
	float:left;
	width:25%;
}

.home_yuyue{
	z-index:2;
	position: relative;
	top: -140px;
	width:76%;
	border-radius: 30px;
}

.home_banner{
  display: inline-block;
  /*width: 533px;
  height: 300px;*/
  background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));
}
.home_banner img{
  mix-blend-mode: overlay;
}


.teacher_info_img{
	float: left;
	width: 60px; 
	height: 60px;
	border-radius:60px; 
	border:1px solid #dcdee2;
}

.touxiang{
  width:79px;
  height:79px;
  background:no-repeat center center;
  background-size:cover;
  border-radius:50px;
}

.star_teacher_img{
  width:60px;
  height:100px;
  background:no-repeat center center;
  background-size:cover;
  border-radius:5px;
}

/* 隐藏下方的滚动条 */
.slide-box::-webkit-scrollbar {
	background-color: transparent;
}

.slide-box {
	display: -webkit-box;
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
	
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}

.slide-box-item {
	width: 100px;
	text-align: center;
	position: relative;
	display:block;
}

.course_img{
  /* float:left; */
  /* margin-right:9px;
  margin-bottom:9px; */
  width:220px;
  height:120px;
  background:no-repeat center center;
  background-size:cover;
  border-radius:5px;
  /* margin: 10px 10px 10px 10px; */
}

.img-mask{
    height:100%;
    width:100%;
    background: rgba(255,255,255,.9);
	border-radius:5px;
}

.card_img{
  margin-left: 5%;
  width:90%;
  height:130px;
  background:no-repeat center center;
  background-size:cover;
  border-radius:5px;
  box-shadow: 3px 3px 5px #C9C9C9;
  /* margin-top: 20px; */
}


.card-mask-1{
    height:100%;
    width:100%;
    background: rgba(0,136,255,0.8);
	border-radius:5px;
}

.card-mask-2{
    height:100%;
    width:100%;
    background: rgba(25,190,107,0.8);
	border-radius:5px;
}


.day_css{
	background-color:#FFFFFF; 
	margin: 5px;
	padding: 5px;
	border-radius:4px; 
}

.calendar_day{
	font-size: 18px;
	font-weight: 600;
}

.calendar_month{
	color: #999999;
}



/*顶部分类*/

.card-fouth{
	background-color: #FFFFFF;
}

.card-fouth .industry {
    font-size: 18px;
    color: #bfbfbf;
    padding: 15px 10px 5px 10px;
    display: inline-block;
    /* border-bottom: 1px solid hsla(0,0%,85%,.4); */
    /* width: 140px; */
	text-align: center;
}
.card-fouth .industry.first {
    padding-left: 30px
}
.card-fouth .industry.last {
    padding-right: 0
}
.card-fouth .industry.active {
    padding-bottom: 9px
}
.card-fouth .industry span {
    font-family: PingFang SC;
    font-weight: 700;
}
.card-fouth .industry.active span {
    font-size: 24px;
    font-weight: 800;
    color: #000000;
    border-bottom: 5px solid #FFFFFF;
    padding-bottom: 5px;
}


.course_card{
	background-color: #FFFFFF; 
	margin: 10px; 
	border-radius: 5px;
	box-shadow: 3px 3px 5px #C9C9C9;
}

.yue_btn{
	background-color: #368BFF;
	color: #FFFFFF;
	border-radius: 5px; 
	padding: 10px;
	margin-left: 5px;
}

.yue_btn_disable{
	background-color: #F7F7F7;
	color: rgba(0, 0, 0, 0.3);
	border-radius: 5px; 
	padding: 10px;
	margin-left: 5px;
}

.weui-badge-haoyueke{
  display:inline-block;
  padding:.4em .6em;
  min-width:8px;
  border-radius:3px;
  background-color:#dcedff;
  color:#2372c5;
  line-height:1.2;
  text-align:center;
  font-size:12px;
  vertical-align:middle;
  margin-right: 5px;
}

.teacher-bg-blur{
	
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	z-index:1;
	width: 100%;
	height: 180px;
	text-align: center;
	position: relative;
	box-sizing:border-box;
}

.teacher-bg-blur:after{
    content: "";
    width:100%;
    height:220px;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(10px);
	/* filter: brightness(200%); */
    z-index: 2;
}

.drag{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:100%;
    height:180px;
    text-align: center;
    z-index:11;
}

@media screen and (max-width: 321px) {
    .time-choose-table .time-table:nth-child(4n), .time-choose-table .time-table:nth-child(4n+1), .time-choose-table .time-table:nth-child(4n+2), .time-choose-table .time-table:nth-child(4n+3) {
        height: 70px;
        line-height: 23px
    }

    .time-choose-table .choosed {
        border: 2px solid #368BFF;
        line-height: 40px
    }

    .time-choose-table .disabled:nth-child(4n), .time-choose-table .disabled:nth-child(4n+1), .time-choose-table .disabled:nth-child(4n+2), .time-choose-table .disabled:nth-child(4n+3) {
        line-height: 1.3em;
    }
}
.banner15 img{width:100%}
.swiper-slide{position:relative}
.img-mask{background: rgba(0,0,0,0.1);border-radius:0px;position:absolute;left:0;top:0;width:100%;height:100%;z-index:9}
.swiper-pagination{z-index:99}
</style>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import studentBottom from "@/components/studentBottom";
  // import Swiper from 'swiper'
  // // import vueSwiper from 'vue-awesome-swiper'
  // // import 'swiper/dist/css/swiper.css'
  import { getStuStoresDetails } from "@/api/getData";
  // import message from "@/components/message";
  
  export default {
     data () {
      return {
        msgDetailsList:{},
        msgDetails:false,
        isPopUpShow:false,
        timer: null, //定时器
        mark: 0, //比对图片索引的变量
        htRowClass:{},  //课时详情
        htCourse:{},   //课程详情
        listImg:[],  //轮播图
        isState:"",
        swiperOption: {
          notNextTick: true,
          autoplay: {    // 自动播放
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          loop: true,   // 循环
          directionType: "horizontal", // 方向
          pagination: {               // 分页器
            el: '.swiper-pagination',
            type: "bullets",
            clickable :true
          },
          navigation: {   // 左右按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          observer:true,  // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
          observeParents: true,  // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
          setWrapperSize :true  // Swiper使用flexbox布局(display: flex)，
          // 开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        },
        StoresDetails:{},
        listNotice:[]
      }
    },
    computed:{
      mySwiper() {
       return this.$refs.mySwiper.swiper;
     }
    },
    created(){
      this.getStuStoresDetailss()
    },
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    components:{
      studentBottom,
      swiper,swiperSlide
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6;padding-top:0')
    },
    methods:{
      async getStuStoresDetailss(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getStuStoresDetails({
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
          //debugger
          this.listImg = crs.data.listImg;//轮播图
          this.StoresDetails = crs.data.StoresDetails;//商户详情
          if(this.StoresDetails.HeadUrl==''||this.StoresDetails.HeadUrl==null){
            this.StoresDetails.HeadUrl = require('../../assets/img/default_logo.png')
          }
          this.listNotice = crs.data.listNotice;//即使通告
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      goStuOrder(){
        this.$router.push('/stuOrder')
      },
      goMyCourse(){
        this.$router.push('/myCourse')
      },
      goStuCard(){
        this.$router.push('/stuCard')
      },
      goStuMsg(){
        this.$router.push('/stuPrivateOrder')
      },
      goDetails(items){
        this.msgDetails = true;
        this.msgDetailsList = items
      },
      cancelPopUp(){
        this.msgDetails = false;
      },
    },
  }
</script>
