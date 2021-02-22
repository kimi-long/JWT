<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-06 20:05:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="noMsg" v-if="msgList.length==0">
      <img src="../../assets/img/noMsg.png"/>
      <p>没有消息记录</p>
    </div>
    <div class="haveMsg" v-if="msgList.length>0">
      <div v-for="items in msgList" class="msgList" :class="{'isRead':items.IsRead==1}" @click="msgDetailsFun(items)">
        <span class="title">
          <i class="state" v-if="items.IsRead==1">已读</i>
          <i class="state" v-if="items.IsRead==0">未读</i>
          {{items.Title}}
        </span>
        <span class="time">{{items.addTime}}</span>
        <span class="details iconfont icon-iconfontjiantou6"></span>
      </div>
    </div>
    <div class="tishiBox" v-if="msgDetails">
    </div>
    <div class="msgContent" v-if="msgDetails">
      {{msgDetailsList.Title}}
      <i class="iconfont icon-guanbi" @click="cancelPopUp"></i>
      <div class="msgContent-word">
        {{msgDetailsList.SContent}}
        <p>{{msgDetailsList.addTime}}</p>
      </div>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>
<script>
  import { getListTeacherNotice,updTeacherNoticeRead } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        msgList:[],
        msgDetails:false,
        msgDetailsList:{}
      };
    },
    created() {
      this.getListTeacherNotices()
    },
    computed: {
    },
    components:{
      message
    },
    mounted() {
    },
    methods: {
      async getListTeacherNotices(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListTeacherNotice({
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.msgList = crs.data;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      async updTeacherNoticeReads(items){
        const crs = await updTeacherNoticeRead({
          TeacherID:localStorage.getItem("teacherID"),
          NoticeID:items.NoticeID
        })
        debugger
        if(crs.orsuccess=='1'){
          this.msgDetails = true;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      msgDetailsFun(items){
        this.updTeacherNoticeReads(items)
        this.msgDetailsList = items;
      },
      cancelPopUp(){
        this.msgDetails = false;
        this.getListTeacherNotices()
      },
    }
  };
</script>
