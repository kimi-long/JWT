<!--
 * @Author: your name
 * @Date: 2020-02-02 14:03:31
 * @LastEditTime: 2020-04-25 22:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\student\stuOrderDetails.vue
 -->

<template>
  <div class="padding-bottom">
    <div class="swiper-box">
      <swiper class="box-container" :options="swiperOption" ref="swiperOption" v-if="listImg.length>0">
        <swiper-slide class="slide" v-for="(item, index) in listImg" :key="index" @touchmove.native="stopPlay" @touchend.native="play">
            <!-- // 自定义组件要加上.native -->
          <img class="swiper-image" :src="item.ImgUrl" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div> -->
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>
    <div class="studetails-title">
      <span class="title">{{htRowClass.CourseName}}</span>
      <!-- <span class="type">团</span> -->
      <span class="keshiTimes">{{htRowClass.ConsumptionOfClass}}课时</span>
    </div>
    <div class="studetails-xiwei">
       <div class="touxiang">
          <img :src="item.WxHeadUrl"  v-for="(item, index) in listMUrl" :key="index" class="touxiang"/>
  
        </div>
      <span v-if="htRowClass.RowClassType== '0'">{{htRowClass.PreAboutCount}}人/{{htRowClass.limitCount}}席</span>
    </div>
    <div class="studetails-content">
      <div class="studetails-content-li">
        <i class="iconfont icon-keshi_m"></i>
        <span class="time">时间</span>
        <span class="dataTime">{{htRowClass.times}}</span>
      </div>
      <div class="studetails-content-li">
        <i class="iconfont icon-dizhi"></i>
        <span class="time">{{htRowClass.Address}}</span>
        <span class="dataTime">{{htRowClass.StoresName}}</span>
      </div>
    </div>
    <div class="studetails-content2">
      <p class="title">老师</p>
    </div>
    <div class="studetails-content-teacher">
      <img :src="htRowClass.HeadUrl"/>
      <span class="teacherName">{{htRowClass.Name}}</span>
      <span class="chakanbtn" @click="seeTeacherDetails">查看</span>
    </div>
    <div class="studetails-content2 studetails-content3">
      <p class="title">课程介绍</p>
      <div class="studetails-content-classContont">
        {{htCourse.CourseIntroduction}}
      </div>
      <p class="title">课程详情</p>
      <div class="studetails-content-classContont" v-html="htCourse.GraphicDetails">
        <!-- <vue-wangeditor id="editor" v-model="htCourse.GraphicDetails"></vue-wangeditor> -->
      </div>
    </div>
    <div class="bottom-order-btn" @click="orderNow" v-if="isState==0">
      立即预约
    </div>
    <div class="bottom-order-btn bottom-order-btn2" v-if="isState==1">
      已预约
    </div>
    <div class="tishiBox" v-if="isPopUpShow">
    </div>
    <div class="tishiContent" v-if="isPopUpShow">
      提示
      <i class="iconfont icon-guanbi" @click="cancelPopUp"></i>
      <div class="tishiContent-word">
        是否确定要预约此课程?
      </div>
      <div class="isSure-btn">
        <span @click="cancelPopUp">取消</span>
        <span @click="okOrder">确定</span>
      </div>
     </div>
   <div class="tishiBox" v-if="isPopUpShownew">
    </div>
    <div class="tishiContent1" v-if="isPopUpShownew">
         选择预约时间
       <div class="tishiContent1-word">
         <div class="stuSearch2" >
             <br>
             <label  v-if="listRowClassTime.length==0" >暂无可约时间</label>
              <select  v-if="listRowClassTime.length>0"  @change="changeAddress($event)">
              <option v-for="items in listRowClassTime" :value="items.ID">{{items.startTime}} ~  {{items.endTime}}</option>
              </select>
          </div>
       
      </div>
      <div class="isSure-btn mybot">
        <span @click="cancelPopUp">取消</span>
        <span @click="okOrder">确定</span>
      </div>
     </div>
     
    <message ref="messageChild"></message>
  </div>
</template>

<script>

  import { stuCourseInfo,stuAddPreAbout,getstuListRowClassTime } from "@/api/getData";
  import message from "@/components/message";
  import vueWangeditor from 'vue-wangeditor'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  // import Swiper from "swiper";
  export default {
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    data () {
      return {
        isPopUpShow:false,
        isPopUpShownew:false,
        timer: null, //定时器
        mark: 0, //比对图片索引的变量
        htRowClass:{},  //课时详情
        htCourse:{},   //课程详情
        listImg:[],  //轮播图
        listRowClassTime:[], 
        listMUrl:[], 
        isState:"",
        RowClassTimeID:"0",
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
        }
      }
    },
    computed:{
      mySwiper() {
       return this.$refs.mySwiper.swiper;
     }
    },
    created () {
      this.stuCourseInfos()
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    components:{
      message,swiper,swiperSlide,vueWangeditor
    },
    methods: {
      stopPlay() {
        this.mySwiper.autoplay.stop();    // 当手指触摸时停止自动播放
      },
      play() {
        this.mySwiper.autoplay.start();   // 当手指离开时开始自动播放
      },
      async stuCourseInfos(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await stuCourseInfo({
          RowClassID:localStorage.getItem("rowClassID"),
          StudentID:localStorage.getItem("studentID")
        })
        if(crs.orsuccess=='1'){
       //   debugger
          this.htRowClass = crs.data.htRowClass;
          this.htCourse = crs.data.htCourse;
          this.listImg = crs.data.listImg;
          this.isState = crs.data.isState;
          this.listMUrl = crs.data.listMUrl;
          this.$store.commit('fullLoadingFun',false);
          // this.play();
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      orderNow(){
        if(this.htRowClass.RowClassType=='1'){
        this.getstuListRowClassTime();

        }else{
         this.isPopUpShow = true;

        }
   
      },changeAddress(event){
           this.RowClassTimeID  = event.target.value;

      },async getstuListRowClassTime(){
       // debugger
                const crs = await getstuListRowClassTime({
                    RowClassID:localStorage.getItem("rowClassID")
                })
            //    debugger
                if(crs.orsuccess == '1'){
                    // this.$message({ type: "success", message: crs.Msg });
                    this.listRowClassTime = crs.data;

                     if(this.listRowClassTime.length>0){
                        this.RowClassTimeID = this.listRowClassTime[0].ID; //获取option对应的value值
                        }
                    this.isPopUpShownew = true;

                }else{
                    this.$message({ type: "error", message: crs.Msg });
                }
            },
      cancelPopUp(){
        this.isPopUpShow = false;
        this.isPopUpShownew = false;

      },
      okOrder(){
        this.isPopUpShow = false;
        this.isPopUpShownew = false;
        this.stuAddPreAbouts();
      },
      async stuAddPreAbouts(){
        this.$store.commit('fullLoadingFun',true);
        //debugger
        const crs = await stuAddPreAbout({
          StoresID:localStorage.getItem("storesID"),
          RowClassID:localStorage.getItem("rowClassID"),
          StudentID:localStorage.getItem("studentID"),
          limitCount:localStorage.getItem("limitCount"),
          RowClassType:this.htRowClass.RowClassType,
          RowClassTimeID:this.RowClassTimeID

        })
        //debugger
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast('预约成功！')
          this.$store.commit('fullLoadingFun',false);
          this.stuCourseInfos()

        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      seeTeacherDetails(){
        localStorage.setItem("teacherID",this.htRowClass.TeacherID)
        this.$router.push('/stuTeacherDetails')
      },
      autoPlay () {
        this.mark++;
        if (this.mark === this.listImg.length) {
          this.mark = 0
        }
      },
      play () {
        this.timer = setInterval(this.autoPlay, 2500)
      },
      change (i) {
        this.mark = i
      },
      stop () {
        clearInterval(this.timer)
      },
      move () {
        this.timer = setInterval(this.autoPlay, 2500)
      }
    },
  }
</script>
 
<style scoped>
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

  .mybot{margin-top: 20px;}
  
.stuSearch2 select{
    font-size: 14px;
    background-color: transparent;
    color: #979797;
    text-align: center;
    text-align-last: center;
    margin-top: 5px; 
    height: 25px;
    width: 100%;
    background: none;
    border:1px solid #cccccc;
}

</style>
