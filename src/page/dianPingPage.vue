<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-02-20 20:43:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="order-list">
      <div class="list-box">
        <div class="order-details">
          <p class="title2">{{dianPingList.RTitle}}</p>
          <!-- {{dianPingList}} -->
          <div class="dianping">
            <div class="title">老师点评
              <div class="haveEvaluate">
                <div v-for="items in dianPingList.list">
                  <div class="haveEvaluate-top">
                    <img :src="items.WxHeadUrl"/>
                    <span>{{items.Name}}</span>
                    <span>{{items.UpdTime}}</span>
                  </div>
                  <div class="haveEvaluate-content">
                   {{items.ReviewInfo}}
                  </div>
                </div>
                <div class="dianpingPhoneOwner">
                  <div class="title">
                    点评图片
                  </div>
                  <div class="uoloadImg">
                    <div class="addImg" v-for="(items,index) in dianPingList.listimge">
                      <!-- <img :src="items.ImgUrl" @click="imgEnlarge(items)"/> -->
                      <img v-preview="items.ImgUrl" preview-nav-enable="false" :src="items.ImgUrl"/>
                    </div>
                  </div>
                </div>
                <p class="replay" @click="replayFun()">回复>></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>
<style scoped>
.replay{
  text-align: right;
  color: #333;
  font-size: 14px
}
.haveEvaluate{
  padding-bottom: 0
}
.order-details .title2{
  text-align: center;
  padding:10px 30px;
  box-sizing: border-box;
  font-weight: bold;
}
.list-box{
  margin-top:0!important;
  padding:0!important
}
.order-details{
  width: 100%;
  margin: 0;
  padding:0;
  background-color: #fff;
}
.order-details .dianping{
  border: none;
  padding:0;
}
.addImg{
  width: 100%;
  height: auto!important;
  border:none;
  margin-left: 0
}
.addImg img{
  width: 100%;
  margin: 0;
  height: auto!important;

}
</style>
<script>
  import message from "@/components/message";
  import { GZHgetReviewinfo} from "@/api/getData";
  export default {
    mounted() {
      document.querySelector('body').setAttribute('style', 'padding-top:0')
    },
    data() {
      return {
        dianPingList:{},
        url:""
      }
    },
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    components:{
      message,
    },
    inject:['reload'],
    created() {
      this.GZHgetReviewinfos()
      // this.getRowClassinfos()
    },
    methods: {
      async GZHgetReviewinfos(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await GZHgetReviewinfo({
          RowClassID:this.$route.query.rowclassid,
          StudentID:this.$route.query.studentid,
          TeacherID:this.$route.query.teacherid
        })
        if(crs.orsuccess){
          this.dianPingList = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      replayFun(){
        this.$router.push({
          path:'/',
          query:{
            openid:this.dianPingList.Openid,
            code:this.dianPingList.code,
            storesid:this.dianPingList.StoresID,
            rowclassid:this.dianPingList.RowClassID,
            studentid:this.dianPingList.StudentID,
            preaboutid:this.dianPingList.PreAboutID
          }
        })
      },
    },
  }
</script>
