<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-04-25 21:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
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
    <div class="stuSearch">
      <select @change="changeAddress($event)">
        <option v-for="items in addressList" :value='items.ID'>{{items.StoresName}}</option>
      </select>
    </div>
    <div class="stu-order-list" v-for="items in orderList" v-if="isshow==1" @click="items.showstate=='0'&&orderClass(items)">
      <div class="stu-order-list-left">
        <span class="round-half"></span>
        <span class="inline"></span>
        <span class="time">{{items.startTime}}</span>
      </div>
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">
          <div class="stu-order-list-right-img">
            <img :src="items.CourseHeadUrl"/>
          </div>
          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.Name}}</span>
              <span>{{items.LevelName}}</span>
            </p>
            <p class="className">{{items.CourseName}}</p>
            <p>{{items.PreAboutCount}}人/{{items.limitCount}}席</p>
          </div>
          <div class="stu-order-list-right-btn" :class="{'isActive':items.showstate=='0'}">
            <span>预约</span>
          </div>
        </div>
      </div>
    </div>
    <div class="noClass" v-if="isshow==2">
      <img src="../../assets/img/noMsg2.png"/>
      <p class="title">当日暂无课程安排</p>
      <div class="noClass-bottom-line">
        <span>以下日期有课，约吗？</span>
      </div>
      <!-- {{orderList}} -->
      <div class="noClass-bottom" v-for="items in orderList" @click="orderDetails(items)">
        <div class="round">
          <p>{{items.times}}</p>
          <p class="data">{{items.timeddd}}</p>
          <p>{{items.TitleDay}}</p>
        </div>
      </div>
    </div>
    <message ref="messageChild"></message>
  </div>
  <!-- <div>
    <p style="color:red;font-size:30px">2321321</p>
  </div> -->
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
    background: #389d0f;

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
          color: #389d0f;
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
        background: #389d0f;
        border-radius: 5px;
      }
</style>
<script>
  import Swiper from 'swiper'
  // import vueSwiper from 'vue-awesome-swiper'
  // import 'swiper/dist/css/swiper.css'
  import studentBottom from "@/components/studentBottom";
  import { stuGetListStoresName,stuGetTodayCourse } from "@/api/getData";
  import message from "@/components/message";
  
  const cathWidth = +2;
  export default {
    // destroyed () {
    //   document.querySelector('body').removeAttribute('style')
    // },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
      this.init();
      window.onresize=()=>{
        this.init();
      }
    },
    watch: {
      currentIndex(val) {
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
        nowDate:this.setNowDate(new Date()),
        addressList:[],
        addressActive:"",
        orderList:[],
        isshow:""
      }
    },
    components:{
      studentBottom,
      message
    },
    created() {
      this.now();
      this.stuGetListStoresNames()
    },
    methods: {
      // 获取门店
      async stuGetListStoresNames(){
        this.$store.commit('fullLoadingFun',true);
          //debugger
        const crs = await stuGetListStoresName({
          StoresID:localStorage.getItem("storesid")
        })
          //debugger
        if(crs.orsuccess=='1'){
         // debugger
          this.addressList = crs.data;
          if(this.addressList.length>0){
            this.addressActive = this.addressList[0].ID; //获取option对应的value值
          }
          this.stuGetTodayCourses();
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      changeAddress(event){
       // debugger
        this.addressActive = event.target.value; //获取option对应的value值
        this.stuGetTodayCourses();
      },
      async stuGetTodayCourses(){
        this.$store.commit('fullLoadingFun',true);
                //debugger

        const crs = await stuGetTodayCourse({
          StoresID:this.addressActive,
          dateTime:this.nowDate,
          RowClassType:'0'
        })
       // debugger
        if(crs.orsuccess=='1'){
         // debugger
          this.isshow = crs.data.isshow
          this.orderList = crs.data.list
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      orderDetails(items){
        this.getDataNow(items)
      },
      getDataNow(items){
        this.datanow(items)
        // this.nowDate = items.SKtime
        this.nowDate=this.setNowDate(new Date(items.SKtime))
       // debugger
        this.currentIndex = 0
        this.stuGetTodayCourses()
      },
      datanow(items){
        let now = this.setDate(new Date(items.SKtime));
        let pre = this.setDate(this.addDate(this.currentFirstDate, -7))
        let next = this.setDate(this.addDate(this.currentFirstDate, 14))
        this.currentList = [pre, now, next]
      },
      // getNow(){
      //   this.now()
      //   this.nowDate=this.setNowDate(new Date())
      //   debugger
      //   this.currentIndex=new Date().getDay()-1
      // },
      orderClass(items){
       // debugger
        localStorage.setItem("storesID", items.StoresID);
        localStorage.setItem("rowClassID",items.ID)
        localStorage.setItem("limitCount", items.limitCount);
        this.$router.push('/stuOrderDetails')
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
        //debugger
        this.currentIndex = j;
        this.nowDate=sendDate;
        this.stuGetTodayCourses()
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
                this.stuGetTodayCourses()

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
                this.stuGetTodayCourses()
              }, 20)
  
            },
          },
        })
        mySwiper.slideTo(1, 0, false);
        this.$nextTick(() => {
          this.cateLeft = Math.abs(this.$refs.ul[1].children[this.currentIndex].getBoundingClientRect().left + cathWidth)
        })

      },
      now(){
        let now = this.setDate(new Date());
        let pre = this.setDate(this.addDate(this.currentFirstDate, -7))
        let next = this.setDate(this.addDate(this.currentFirstDate, 14))
        this.currentList = [pre, now, next]
      }
    },
  }
</script>
