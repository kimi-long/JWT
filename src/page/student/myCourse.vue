<!--
 * @Author: your name
 * @Date: 2020-02-02 17:38:58
 * @LastEditTime: 2020-02-20 20:12:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\student\myCourse.vue
 -->
<template>
  <div>
    <!-- <div class="stuSearch">
      <select>
        <option>梁溪区门店</option>
        <option selected="selected">梁溪区门店2</option>
        <option>梁溪区门店3</option>
        <option>梁溪区门店4</option>
      </select>
    </div> -->
    <div class="tabs-top">
        <span :class="{active:isAactive=='1'}" @click="tabsFun('1')">已预约</span>
        <span :class="{active:isAactive=='2'}" @click="tabsFun('2')">已完成</span>
        <span :class="{active:isAactive=='3'}" @click="tabsFun('3')">其他</span>
    </div>
    <div v-if="isAactive==1">
      <!-- {{stuList}} -->
      <!-- 已预约 -->
      <div class="stu-order-list" v-if="stuList.length>0" @click="toCourseDetails(items)" v-for="items in stuList">
        <div class="stu-order-list-left myCourse-left">
          <span class="round-half"></span>
          <span class="inline"></span>
          <span class="data">{{items.TitleDay}}</span>
          <span class="inline"></span>
          <span class="time" v-if="items.RowClassType =='0'">{{items.startTime}}</span>
          <span class="time" v-if="items.RowClassType =='1'">{{items.startTimenew}}</span>
        </div>
        <div class="stu-order-list-right">
            <div class="stu-order-list-right-table">
            <div class="stu-order-list-right-img">
              <img :src="items.HeadUrl"/>
            </div>
            <div class="stu-order-list-right-content">
                <p>
                <span>{{items.Name}}</span>
                </p>
                <p class="className">{{items.CourseName}}</p>
                <p v-if="items.RowClassType =='0'">{{items.LevelName}}</p>
                <p v-if="items.RowClassType =='1'">私教</p>

            </div>
            </div>
        </div>
      </div>
      <div class="noEvaluate" v-if="stuList.length==0">
        <p>
          <i class="iconfont icon-zanwu"></i>
          暂无数据
        </p>
      </div>
    </div>
    <div v-if="isAactive==2">
      <!-- 已完成 -->
      <div class="stu-order-list" v-if="stuList.length>0" @click="toCourseDetails(items)" v-for="items in stuList">
        <div class="stu-order-list-left myCourse-left">
          <span class="round-half"></span>
          <span class="inline"></span>
          <span class="data">{{items.TitleDay}}</span>
          <span class="inline"></span>
          <span class="time" v-if="items.RowClassType =='0'">{{items.startTime}}</span>
          <span class="time" v-if="items.RowClassType =='1'">{{items.startTimenew}}</span>

        </div>
        <div class="stu-order-list-right">
            <div class="stu-order-list-right-table">
            <div class="stu-order-list-right-img">
                <img :src="items.HeadUrl"/>
            </div>
            <div class="stu-order-list-right-content">
                <p>
                <span>{{items.Name}}</span>
                </p>
                <p class="className">{{items.CourseName}}</p>
                <p v-if="items.RowClassType =='0'">{{items.LevelName}}</p>
                <p v-if="items.RowClassType =='1'">私教</p>
                            </div>
            </div>
        </div>
      </div>
      <div class="noEvaluate" v-if="stuList.length==0">
        <p>
          <i class="iconfont icon-zanwu"></i>
          暂无数据
        </p>
      </div>
    </div>
    <div v-if="isAactive==3">
      <!-- 已完成 -->
      <div class="stu-order-list" v-if="stuList.length>0" @click="toCourseDetails(items)" v-for="items in stuList">
        <div class="stu-order-list-left myCourse-left">
          <span class="round-half"></span>
          <span class="inline"></span>
          <span class="data">{{items.TitleDay}}</span>
          <span class="inline"></span>
          <span class="time" v-if="items.RowClassType =='0'">{{items.startTime}}</span>
          <span class="time" v-if="items.RowClassType =='1'">{{items.startTimenew}}</span>
        </div>
        <div class="stu-order-list-right">
            <div class="stu-order-list-right-table">
            <div class="stu-order-list-right-img">
                <img :src="items.HeadUrl"/>
            </div>
            <div class="stu-order-list-right-content">
                <p>
                <span>{{items.Name}}</span>
                </p>
                <p class="className">{{items.CourseName}}</p>
                <p v-if="items.RowClassType =='0'">{{items.LevelName}}</p>
                <p v-if="items.RowClassType =='1'">私教</p>
                <p v-if="items.state =='0'">取消预约</p>
                <p v-if="items.state =='3'">未到</p>
                <p v-if="items.state =='4'">机构取消</p>
                <p v-if="items.state =='5'">请假</p>
            </div>
            </div>
        </div>
      </div>
      <div class="noEvaluate" v-if="stuList.length==0">
        <p>
          <i class="iconfont icon-zanwu"></i>
          暂无数据
        </p>
      </div>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>
<script>

  import { stuGetListPreAbout } from "@/api/getData";
  import message from "@/components/message";
  export default {
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    data() {
      return {
        isAactive:'1',
        stuList:[]
        
      }
    },
    components:{
      message
    },
    created() {
      this.stuGetListPreAbouts()
    },
    methods: {
      async stuGetListPreAbouts(){
        const crs = await stuGetListPreAbout({
          StudentID:localStorage.getItem("studentID"),
          Type:this.isAactive,//  1 已预约  2 已完成  3 已取消
        })
        if(crs.orsuccess=='1'){
         // debugger
          this.stuList = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      orderClass(){
        this.$router.push('/stuOrderDetails')
      },
      tabsFun(type){
        this.isAactive = type
        this.stuGetListPreAbouts()
      },
      toCourseDetails(items){
        localStorage.setItem("rowClassID", items.RowClassID);
        localStorage.setItem("preAboutID", items.PreAboutID);
        // localStorage.setItem("storesID", items.StoresID);
        // localStorage.setItem("limitCount", items.limitCount);
        
        this.$router.push('/myCourseDetails')
      }
    },
  }
</script>
