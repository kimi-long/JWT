<!--
 * @Author: your name
 * @Date: 2020-02-02 14:03:31
 * @LastEditTime: 2020-02-20 20:38:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\student\stuOrderDetails.vue
 -->

<template>
  <div>
    <div class="studetails-content myCourseDetails-content">
      <!-- {{ruleFrom}} -->
      <!-- toStuOrder -->
      <div class="studetails-content-li" @click="toStuOrderDetails">
        <span class="time">预约</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
        <span class="dataTime">
           <!-- @click.stop="toStuOrderDetails" -->
          <i class="className">{{ruleFrom.CourseName}}</i>
          <i class="round">{{ruleFrom.LevelName}}</i>
        </span>
      </div>
      <div class="studetails-content-li">
        <span class="time">时间</span>
        <span class="dataTime">{{ruleFrom.times}}</span>
      </div>
      <div class="studetails-content-li">
        <span class="time">地址</span>
        <span class="dataTime">{{ruleFrom.Address}}</span>
      </div>
      <div class="studetails-content-li" @click="toStuTeacherDetails">
        <span class="time">老师</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
        <span class="dataTime">
          <i>{{ruleFrom.Name}}</i>
          <img class="touxiang" :src="ruleFrom.TeacherHeadUrl"/>
        </span>
      </div>
    </div>
    <div class="studetails-content myCourseDetails-content">
      <div class="studetails-content-li">
        <span class="time">完成课时</span>
        <span class="dataTime">{{ruleFrom.ConsumptionOfClass}}</span>
      </div>
      <div class="studetails-content-li" v-if="ruleFrom.state=='0' || ruleFrom.state=='3'|| ruleFrom.state=='4'|| ruleFrom.state=='5'">
        <span class="time">上课状态</span>
        <span class="dataTime" v-if="ruleFrom.state=='0'">取消预约</span>
        <span class="dataTime" v-if="ruleFrom.state=='3'">未到</span>
        <span class="dataTime" v-if="ruleFrom.state=='4'">机构取消</span>
        <span class="dataTime" v-if="ruleFrom.state=='5'">请假</span>
      </div>
    </div>
    <div class="btn" v-if="ruleFrom.state=='1'" @click="cancelOrderFun()">取消预约</div>
    <div class="btn" v-if="ruleFrom.state=='0'||ruleFrom.state=='4'" @click="nowOrderFun()">立即预约</div>
    <div class="order-details myCourseDetails-details" v-if="ruleFrom.state=='2'">
      <div class="dianping">
        <div class="title">点评
          <div class="noEvaluate" v-if="list.length==0">
            <p>
              <i class="iconfont icon-zanwu"></i>
              暂时没有评论
            </p>
          </div>
          <div class="haveEvaluate" v-if="list.length>0">
            <div v-for="(items,index) in list">
              <div class="haveEvaluate-top">
                <img :src="items.WxHeadUrl"/>
                <span>{{items.Name}}</span>
                <span>{{items.UpdTime}}</span>
                <i class="iconfont icon-icon_reply" v-if="index==(list.length-1)" @click="jiaolianDianpingEdit(items)">
                  <span style="font-size:14px">回复</span>
                </i>
              </div>
              <div class="haveEvaluate-content">
                {{items.ReviewInfo}}
              </div>
            </div>
            <div class="dianpingPhoneOwner">
              <div class="title">
                点评图片
              </div>
              <div class="img">
                <img v-preview="items.ImgUrl" v-for="items in listimge" preview-nav-enable="false" :src="items.ImgUrl"/>
                <!-- <img :src="items.ImgUrl" v-for="items in listimge"/> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ketangPhone">
        <div class="title">
          课堂实拍
        </div>
        <div class="uoloadImg">
          <div class="addImg" v-for="(items,index) in listCourseimge">
            <!-- <img :src="items.ImgUrl" @click="imgEnlarge(items)"/> -->
            <img v-preview="items.ImgUrl" preview-nav-enable="false" :src="items.ImgUrl"/>
          </div>
        </div>
      </div>
    </div>
    <div class="editWord myCourseDetails-editWord" v-if="editWord">
      <i class="iconfont icon-guanbi" @click="closeWord"></i>
      <textarea rows="5" v-model="ReviewInfo" placeholder="输入评论，最多140个字" maxlength="140"></textarea>
      <span class="btn" @click="stuAddReviews">提交</span>
    </div>
    <!-- <div class="studetails-content2 studetails-content3">
      <p class="title">课程介绍</p>
      <div class="studetails-content-classContont">
        舞蹈课程
      </div>
      <p class="title">课程详情</p>
      <div class="studetails-content-classContont">
        321
      </div>
    </div> -->
    <div class="tishiBox" v-if="isPopUpShow">
    </div>
    <div class="tishiContent" v-if="isPopUpShow">
      提示
      <i class="iconfont icon-guanbi" @click="cancelPopUp"></i>
      <div class="tishiContent-word">
        {{titlePopup}}
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
        <span @click="okOrder1">确定</span>
      </div>
     </div>
    <message ref="messageChild"></message>
  </div>
</template>
<style scoped>

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
</style>>
<script>
  import { stuGePreAboutInfo,stuAddPreAbout,stuUpdPreAboutState,stuAddReview,getstuListRowClassTime } from "@/api/getData";
  import message from "@/components/message";
  export default {
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    components:{
      message
    },
    data () {
      return {
        editWord:false,
        ruleFrom:{},
        list:[],
        listCourseimge:[],
        listRowClassTime:[],
        isPopUpShownew:false,
        listimge:[],
        TeacherID:"",
        ReviewInfo:"",
        titlePopup:"",
        isPopUpShow:false,
        type:""
      }
    },
    created () {
      this.stuGePreAboutInfos()
    },
    methods: {
      async stuGePreAboutInfos(){
        const crs = await stuGePreAboutInfo({
          RowClassID:localStorage.getItem("rowClassID"),
          PreAboutID:localStorage.getItem("preAboutID"),
          StudentID:localStorage.getItem("studentID")
        })
      //  debugger
        if(crs.orsuccess=='1'){
        //  debugger
          this.ruleFrom = crs.data.htRowClass;
          this.list = crs.data.list;
          this.listimge = crs.data.listimge;
          this.listCourseimge = crs.data.listCourseimge;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      async cancelOrderFuns(){
        const crs = await stuUpdPreAboutState({
          StoresID:localStorage.getItem("storesid"),
          PreAboutID:localStorage.getItem("preAboutID") ,
          RowClassTimeID:this.ruleFrom.RowClassTimeID

        })
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast('取消预约成功！')
          this.$store.commit('fullLoadingFun',false);
          this.stuGePreAboutInfos()
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      // 取消
      cancelOrderFun(){
        this.isPopUpShow = true;
        this.titlePopup='是否确定要取消此课程?'
        this.type='cancel';
      },
      cancelPopUp(){
        this.isPopUpShow = false
      },
      okOrder1(){
        this.isPopUpShownew = false;
          this.nowOrderFuns();

      },
      // 点击确认
      okOrder(){
        this.isPopUpShow = false;

        if(this.type=='order'){

          this.nowOrderFuns();

        }else if(this.type=='cancel'){
          this.cancelOrderFuns()
        }
      },async getstuListRowClassTime(){

                const crs = await getstuListRowClassTime({
                    RowClassID:localStorage.getItem("rowClassID")
                })
                //debugger
                if(crs.orsuccess == '1'){
                    // alert(crs.Msg);
                    this.listRowClassTime = crs.data;

                     if(this.listRowClassTime.length>0){
                        this.ruleFrom.RowClassTimeID = this.listRowClassTime[0].ID; //获取option对应的value值
                        }
                    this.isPopUpShownew = true;

                }else{
                    alert(crs.Msg);
                }
            },changeAddress(event){
           this.ruleFrom.RowClassTimeID = event.target.value;

      },
      // 预约
      nowOrderFun(){

          if(this.ruleFrom.RowClassType=='1'){
             this.getstuListRowClassTime();
          }else{
         this.isPopUpShow = true;
        this.titlePopup='是否确定要预约此课程?';
        this.type='order';

        }

      },
      async nowOrderFuns(){
        const crs = await stuAddPreAbout({
          StoresID:this.ruleFrom.StoresID,
          RowClassID:localStorage.getItem("rowClassID"),
          StudentID:localStorage.getItem("studentID"),
          limitCount:this.ruleFrom.limitCount,
          RowClassType:this.ruleFrom.RowClassType,
          RowClassTimeID:this.ruleFrom.RowClassTimeID
        })
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast('预约成功！')
          this.$store.commit('fullLoadingFun',false);
          this.stuGePreAboutInfos()
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      seeTeacherDetails(){
        this.$router.push('/stuTeacherDetails')
      },
      closeWord(){
        this.editWord=false
      },
      jiaolianDianping(){
        this.editWord=true;
        this.ReviewInfo = ""
      },
      jiaolianDianpingEdit(items){
        this.TeacherID = items.TeacherID
        this.editWord=true;
      },
      async stuAddReviews(){
        const crs = await stuAddReview({
          StoresID:localStorage.getItem("storesid"),
          RowClassID:localStorage.getItem("rowClassID"),
          StudentID:localStorage.getItem("studentID"),
          TeacherID:this.TeacherID,
          ReviewInfo:this.ReviewInfo
        })
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast('回复成功！')
          this.$store.commit('fullLoadingFun',false);
          this.editWord=false;
          this.stuGePreAboutInfos()
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      toStuOrder(){
        this.$router.push('/stuOrder')
      },
      toStuOrderDetails(){
        localStorage.setItem("storesID", this.ruleFrom.StoresID);
        localStorage.setItem("rowClassID",this.ruleFrom.ID)
        localStorage.setItem("limitCount", this.ruleFrom.limitCount);
        this.$router.push('/stuOrderDetails')
      },
      toStuTeacherDetails(){
       // debugger
        localStorage.setItem("teacherID",this.ruleFrom.TeacherID)
        this.$router.push('/stuTeacherDetails')
      }
    },
    mounted(){
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    }
  }
</script>
