<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-04-25 21:16:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    <!-- <p style="color:red;font-size:30px">哈哈</p> -->
    <div class="owner-list">
      <div class="owner-list-box">
        <div class="touxiang">
          <img :src="list.WxHeadUrl" class="touxiang"/>
        </div>
        <span class="weixin-name">{{list.Name}}</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" @click="toMyCourse">
        <i class="iconfont icon-kecheng message"></i>
        <span>我的课程</span>
        <!-- <span class="right">2323</span> -->
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" @click="goStuCard">
        <i class="iconfont icon-huiyuanqia myHome"></i>
        <span>我的会员卡</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
       <!-- <div class="owner-list-box">
        <i class="iconfont icon-keshi_m yellow"></i>
        <span>剩余课时</span>
        <span class="right">{{list.RestOfClass}}</span>
      </div>-->
      <div class="owner-list-box" @click="toMyMsg">
        <i class="iconfont icon-xiaoxixinfengnews2 myHome"></i>
        <span>消息</span>
        <span class="right msgNum">{{list.unreadCount}}</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
     <!--  <div class="owner-list-box" @click="toFeedback">
        <i class="iconfont icon-Opinion yellow"></i>
        <span>意见反馈</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>-->
    </div>
    <student-bottom></student-bottom>
    <message ref="messageChild"></message>
  </div>
</template>
<script>
  import { stuGetStudentInfo } from "@/api/getData";
  import message from "@/components/message";
  import studentBottom from "@/components/studentBottom";
  // 深拷贝
  // function copyArray(arr){
  //   return JSON.parse(JSON.stringify(arr));      
  // }
  export default {
    data() {
      return {
        list:{}
      };
    },
    // inject:['reload'],
    created() {
      this.stuGetStudentInfos()
    },
    computed: {
    },
    components:{
      studentBottom,
      message
    },
    mounted() {
      
    },
    methods: {
      async stuGetStudentInfos(){
        const crs = await stuGetStudentInfo({
          StudentID:localStorage.getItem("studentID") 
        })
        if(crs.orsuccess=='1'){
          this.list = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      toMyCourse(){
        this.$router.push('/myCourse')
      },
      goStuCard(){
        this.$router.push('/stuCard')
      },
      toMyMsg(){
        this.$router.push('/stuMsg')
      },
      toFeedback(){
        this.$router.push('/stuFeedback')
      }
    }
  };
</script>
