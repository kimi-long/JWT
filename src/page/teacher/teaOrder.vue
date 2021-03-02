<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-06 20:28:04
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <ul class="swiper-slide" v-for="(item,i) in currentList" ref="ul">
          <li v-for="(k,j) in item" @click="setCurrent(j,k.sendDate)">
            <p>{{k.week}}</p>
            <span v-if="k.now">今</span>
            <span v-else-if="k.tomorrow">明</span>
            <span v-else :class="{active:currentClassStatus(i,j)}">{{k.showDate}}</span>
          </li>
        </ul>
      </div>
      <div class="cateory" :style="{left:cateLeft+'px'}"><i class="iconfont icon-shangsanjiaoxing"></i></div>
    </div>
    <div class="date">
      <span class="now">{{nowDate}}</span>
      <!-- <span @click="getNow">回到今天</span> -->
    </div>
        <div style="margin-bottom:10px;margin-left:10px;">
          <el-select v-model="RowClassType" style="width:150px;" @change="handleRowClassType">
                                    <el-option label="团课" value="0"></el-option>
                                    <el-option label="私教" value="1"></el-option>
             </el-select> &nbsp;
         <el-select  clearable v-model="ClassTeacher" style="width:150px;" v-if="isTeacher =='0' "  @change="changeOptions"  placeholder="请选择老师" >
            <el-option v-for="item in Teacherlist" :value="item.ID" :label="item.Name" :key="item.index">
               </el-option>
           </el-select>
        </div>
    <div class="order-list">
      <!-- {{orderList}} -->

      <div class="list-box" v-for="(items,index) in orderList" @click="toTeaOrderDetails(items)">
        <div class="list-box-top">
          <span class="time">{{items.startTime}}</span>
          <span class="className">{{items.CourseName}}</span>
          <!-- <span class="type">团</span> -->
          <span class="address">{{items.StoresName}}</span>
        </div>
        <div class="list-box-bottom">
          <span class="numNow">{{items.PreAboutCount}}人</span>
          <span v-if="items.RowClassType == '0'" class="numCount">/{{items.limitCount}}席</span>
          <span class="difficulty">{{items.LevelName}}</span>
          <span class="timeLength">{{items.Timelength}}分钟</span>
           <span v-if="items.RowClassType == '1'" class="numNow1">私教</span>

          <span class="details">签到</span>
        </div>
      </div>
    </div>
    <message ref="messageChild"></message>
    <teacher-bottom></teacher-bottom>
  </div>
</template>
<style scoped>

/* .order-list{
  min-height: 100%;
  background-color: #d9d9d9;
} */
.swiper-wrapper {
    height: 68px;
  }

  .swiper-container {
    position: relative;
    overflow: hidden;


  }
.swiper-container .cateory {
      width: 20px;
      height: 16px;
      position: absolute;
      left: 0;
      bottom: 1px;
      z-index: 10;
      text-align: center;
      transition: all 0.2s ease-in;


    }
    .swiper-container .cateory i {
        font-size: 12px;
        color: #ffffff;
        display: inline-block;
        vertical-align: bottom;
      }
  .swiper-slide {
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: #444;

  }
    .swiper-slide li {
      color: #fff;
      font-size: 18px;
      text-align: center;
      width: 25px;
    }

      .swiper-slide li p {
        font-size: 16px;
        opacity: 0.7;
        padding:2px 0;
      }

      .swiper-slide li span {
        margin-top: 5px;
        display: inline-block;
      }

      .swiper-slide li .active {
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          background: #ffffff;
          color: #444;
          border-radius: 50%;
          font-size: 16px;
      }

      .swiper-slide li i {
        font-size: 20px;
        display: inline-block;
        margin-top: 2px;
      }
  .date{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: start;
    padding: 20px 10px;
  }
    .date span{
      font-size: 18px;
    }
      .date span:last-of-type{
        display: inline-block;
        padding: 5px 10px;
        color: #ffffff;
        background: #444;
        border-radius: 5px;
      }
</style>
<script>
  import Swiper from 'swiper'
  import teacherBottom from "@/components/teacherBottom";
  import message from "@/components/message";
  import { baseUrl,loginUrl } from "@/config/env.js";
  import { teacherLogin,getTodayCourse,getListTeacher } from "@/api/getData";

  const cathWidth = +2;
  export default {
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#bfbfbf;padding-top:0')
      this.init();
      window.onresize=()=>{
        this.init();
      }
    },
    watch: {
      currentIndex(val) {
        console.log(val)
        this.cateLeft = Math.abs(this.$refs.ul[1].children[val].getBoundingClientRect().left + cathWidth);
      }
    },
    data() {
      return {
        currentList: [],
        currentFirstDate: null,
        // currentIndex: new Date().getDay(),
        currentIndex: 0,
        cateLeft: 0,
        RowClassType:"0",
        isTeacher: "",
        nowDate:this.setNowDate(new Date()),
        orderList:[],
        ClassTeacher:"",
        Teacherlist:[]
      }
    },
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    components:{
      teacherBottom,
      message
    },
    created() {
      this.now();
      // 登录教师端
      //debugger
      this.getTodayCourses()
      // if(sessionStorage.getItem('token')!=''&&sessionStorage.getItem('token')!=null){
      // }else{
      //   this.teacherLogins()
      // }
    },
    methods: {
      // 获取列表
      async getTodayCourses(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTodayCourse({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID"),
          dateTime:this.nowDate,
          ClassTeacher:this.ClassTeacher,
          RowClassType:this.RowClassType
        })
        if(crs.orsuccess=='1'){
        //  debugger
          this.orderList = crs.data;
          this.isTeacher = crs.isTeacher;
          this.getListTeacher();
         }else{
          this.$store.commit('fullLoadingFun',false);
        }
      },handleRowClassType(){
        this.getTodayCourses();
      },async getListTeacher(){
        const crs = await getListTeacher({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.Teacherlist = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },changeOptions(){
          this.getTodayCourses();
       },
      toTeaOrderDetails(items){
        localStorage.setItem("teaOrderId", items.ID);
        this.$router.push('/teaOrderDetails')
      },
      formatDate(nowDate) {
        let year = nowDate.getFullYear();
        let month = (nowDate.getMonth() + 1);
        let date = nowDate.getDate();
        let week = ['日', '一', '二', '三', '四', '五', '六'][nowDate.getDay()];
        let _list = {
          week,
          showDate: date,
          listDate: `${month}月${date}日 ${week}`,
          sendDate: `${year}-${month}-${date}`,
          now: nowDate.toLocaleDateString() === new Date().toLocaleDateString(),
          tomorrow:false
        }
        // if(_list.now == true){

        // }
        return _list
      },
      addDate(date, n) {
        date.setDate(date.getDate() + n);
        return date;
      },
      setDate(date) {
        // let week = date.getDay();
        // date = this.addDate(date, week * 1);
        this.currentFirstDate = new Date(date);
        let list = []
        for (let i = 0; i < 7; i++) {
          list.push(this.formatDate(i === 0 ? this.addDate(date, 0) : this.addDate(date, 1)));
        }
        for(let i=0;i<list.length;i++){
          if(list[i].now == true){
            list[i+1].tomorrow = true;
            break
          }
        }
        return list
      },
      currentClassStatus(i, j) {
        return i === 1 && j === this.currentIndex
      },
      setCurrent(j,sendDate) {
        this.currentIndex = j;
        //debugger
        this.nowDate=sendDate;
        this.getTodayCourses()
      },
      setNowDate(nowDate){
        let year = nowDate.getFullYear();
        let month = (nowDate.getMonth() + 1);
        let date = nowDate.getDate();
        return `${year}-${month}-${date}`;
      },
      init(){
        var mySwiper = new Swiper('.swiper-container', {
          on: {
            slidePrevTransitionStart: () => {

            },
            slidePrevTransitionEnd: () => {
              mySwiper.slideTo(1, 0, false);
              let pre = this.setDate(this.addDate(this.currentFirstDate, -21)) //11
              let now = this.setDate(this.addDate(this.currentFirstDate, 7)); //18
              let next = this.setDate(this.addDate(this.currentFirstDate, 7)) //25
              this.currentList = [pre, now, next]
              setTimeout(() => {
                this.currentIndex = 0;
                this.nowDate=this.currentList[1][0].sendDate;
                this.getTodayCourses()

              }, 20)

            },
            slideNextTransitionStart: () => {

            },
            slideNextTransitionEnd: () => {
              mySwiper.slideTo(1, 0, false);
              let pre = this.setDate(this.addDate(this.currentFirstDate, -7)) //18
              let now = this.setDate(this.addDate(this.currentFirstDate, 7)); //25
              let next = this.setDate(this.addDate(this.currentFirstDate, 7)) //32
              this.currentList = [pre, now, next]
              setTimeout(() => {
                this.currentIndex = 0;
                // this.currentIndex = 6;
                this.nowDate=this.currentList[1][0].sendDate;
                this.getTodayCourses()
              }, 20)

            },
          },
        })
        mySwiper.slideTo(1, 0, false);
        this.$nextTick(() => {
          this.cateLeft = Math.abs(this.$refs.ul[1].children[this.currentIndex].getBoundingClientRect().left + cathWidth)
        })

      },
      // getNow(){
      //   this.now()
      //   this.nowDate=this.setNowDate(new Date())
      //   debugger
      //   this.currentIndex=new Date().getDay()
      // },
      now(){
        let now = this.setDate(new Date());
        let pre = this.setDate(this.addDate(this.currentFirstDate, -7))
        let next = this.setDate(this.addDate(this.currentFirstDate, 14))
        this.currentList = [pre, now, next]
      }
    },
  }
</script>
