<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-08 18:16:42
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
    <!-- <div>
      {{msgList}}
    </div> -->
    <message ref="messageChild"></message>
  </div>
</template>
<script>
  import { stuGetListNotice,stueditNoticeRead } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        msgList:[],
        msgDetails:false,
        msgDetailsList:{}
      };
    },
    // inject:['reload'],
    created() {
      this.stuGetListNotices()
    },
    computed: {
    },
    components:{
      message
    },
    mounted() {
      
    },
    methods: {
      async stuGetListNotices(){
        const crs = await stuGetListNotice({

           StudentID:localStorage.getItem("studentID")
        })
        if(crs.orsuccess=='1'){
          //debugger
          this.msgList = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      async stueditNoticeReads(items){
        const crs = await stueditNoticeRead({
          NoticeID:items.NoticeID
        })
       // debugger
        if(crs.orsuccess=='1'){
          this.msgDetails = true;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      msgDetailsFun(items){
        this.stueditNoticeReads(items)
        this.msgDetailsList = items;
      },
      cancelPopUp(){
        this.msgDetails = false;
        this.stuGetListNotices()
      },
    }
  };
</script>
