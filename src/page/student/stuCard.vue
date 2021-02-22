<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-04-25 21:47:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    <div class="topCad">
      <p>我的会员卡</p>
      <p>若无会员卡，请咨询教务老师帮忙添加</p>
    </div>
    <div class="card-box">
      <div class="box" v-for="items in list" :style="{backgroundImage:'url('+HeadUrl+')'}">
        <p>{{items.CardName}}</p>
        <p v-if="items.CardType=='1'">卡类型：次卡（有期限）</p>
        <p v-if="items.CardType=='2'">卡类型：次卡（无限期）</p>
        <p v-if="items.CardType=='3'">卡类型：期限卡（不限次数）</p>
        <p v-if="items.CardType=='4'">卡类型：储蓄卡（无限期）</p>
        <p v-if="items.CardType=='1'">到期日：{{items.OverdueTime}}</p>
        <p v-if="items.CardType=='2'">到期日：无限期</p>
        <p v-if="items.CardType=='3'">到期日：{{items.OverdueTime}}</p>
        <p v-if="items.CardType=='4'">到期日：无限期</p>
        <p  v-if="items.CardType =='1'">剩余次数：{{items.CardNumber}}</p>  
        <p  v-if="items.CardType =='2'">剩余次数：{{items.CardNumber}}</p>  
        <p  v-if="items.CardType =='3'">剩余次数：不限次数</p>  
        <p  v-if="items.CardType =='4'">剩余金额：{{items.Amount}}</p>  
        <p v-if="items.Isdisable=='0'">卡状态：正常</p>
        <p v-if="items.Isdisable=='1'">卡状态：禁用</p>
      </div>
    </div>
    <student-bottom></student-bottom>
  </div>
</template>
<style scoped>
.padding-bottom{
}
.topCad{
  background-color: #fff;
  padding:10px 5%;
  width: 100%;
  box-sizing: border-box;
}
.topCad p{
  padding:6px 0;
}
.topCad p:first-child{
  font-size: 18px;
  color:#000;
}
.topCad p:last-child{
  font-size: 14px;
}
</style>
<script>

  import { getListStuvip } from "@/api/getData";
  import studentBottom from "@/components/studentBottom";
  export default {
     data () {
      return {
        list:[],
        HeadUrl:require('../../assets/img/bgCard.png')
      }
    },
    computed:{
      
    },
    components:{
      studentBottom,
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    created(){
      this.getListStuvips()
    },
    methods:{
      async getListStuvips(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListStuvip({
          StudentID:localStorage.getItem("studentID"),
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
         // debugger
          this.list = crs.data;
          // this.listImg = crs.data.listImg;//轮播图
          // this.StoresDetails = crs.data.StoresDetails;//商户详情
          // this.listNotice = crs.data.listNotice;//即使通告
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      }
    }
  }
</script>
