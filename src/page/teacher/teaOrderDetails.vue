<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-02-20 20:03:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    <div class="order-list">
      <div class="list-box">
        <!-- {{ruleFrom}} -->
        <div class="list-box-top">
          <span class="time">{{ruleFrom.startTime}}</span>
          <span class="className">{{ruleFrom.CourseName}}</span>
          <span class="address">{{ruleFrom.StoresName}}</span>
        </div>
        <div class="list-box-bottom">
          <span class="numNow">{{ruleFrom.PreAboutCount}}人</span>
          <span class="numCount" v-if="ruleFrom.RowClassType=='0'">/{{ruleFrom.limitCount}}席</span>
          <span class="difficulty">{{ruleFrom.LevelName}}</span>
          <span class="timeLength">{{ruleFrom.Timelength}}分钟</span>
        </div>
        <div class="order-details" v-if="listStudent.length>0" v-for="stu in listStudent">
          <div class="order-details-top">
            <div class="table-cell table-cellLeft">
              <img class="touxiang" :src="stu.WxHeadUrl"/>
              <span class="name">{{stu.Name}}</span>
              <span class="order" v-if="stu.state==1">预约</span>
              <span class="order" v-if="stu.state==2">已签到</span>
              <br>
              <span class="name" v-if="ruleFrom.RowClassType=='1'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上课时间：{{stu.startTimenew}}</span>

               <!-- @click="yuyueFun(stu)" -->
            </div>
            <div class="table-cell table-cellRight">
              <a class="btn-phone" :href="stu.Phone">拨打</a>
             <!-- <span class="btn-cancel" v-if="Ispush==1" @click="pushFun(stu)">推送</span>-->
              <span class="btn-pinglun" @click="dianpingFun(stu)">点评</span>
              <span class="btn-qiandao"  v-if="!(stu.showstate=='0')" @click="(stu.showstate=='1')&&qiandaoFun(stu)">签到</span>
              <span class="btn-cancel" v-if="!(stu.showstate=='0')" @click="(stu.showstate=='1')&&quxiaoFun(stu)">取消</span>
              <span class="btn-cancel" v-if="!(stu.showstate=='0')" @click="(stu.showstate=='1')&&weidaoFun(stu)">未到</span>
              <span class="btn-cancel" v-if="!(stu.showstate=='0')" @click="(stu.showstate=='1')&&qingjiaFun(stu)">请假</span>

            </div>
          </div>
          <div class="dianping" v-if="stu.dianpingIsShow">
            <!-- {{dianpingList}} -->
            <div class="title">老师点评
              <div class="btn-writeDianping" @click="jiaolianDianping(stu)">
                <i class="iconfont icon-xiepinglun" v-if="stu.dianpingList.length==0"></i>
                <span v-if="stu.dianpingList.length==0">写点评</span>
                <i v-if="stu.dianpingList.length>0" class="iconfont icon-icon_reply"></i>
                <span v-if="stu.dianpingList.length>0">回复</span>
              </div>
              <div class="noEvaluate" v-if="stu.dianpingList.length==0">
                <p>
                  <i class="iconfont icon-zanwu"></i>
                  暂时没有评论
                </p>
              </div>
              <div class="haveEvaluate" v-if="stu.dianpingList.length>0">
                <div v-for="items in stu.dianpingList">
                  <div class="haveEvaluate-top">
                    <img :src="items.WxHeadUrl"/>
                    <span>{{items.Name}}</span>
                    <span>{{items.UpdTime}}</span>
                    <i class="iconfont icon-xiepinglun" v-if="items.isTeacher=='1'" @click="jiaolianDianpingEdit(items,stu)"></i>
                  </div>
                  <div class="haveEvaluate-content">
                   {{items.ReviewInfo}}
                  </div>
                </div>
                <div class="dianpingPhoneOwner" v-if="stu.dianpingList.length>0">
                  <div class="title">
                    点评图片(仅当前学员可见)
                    <button class="edit" style="float:right" v-if="isEditdianpingPhoneOwner" @click="editdianpingPhoneOwner">添加</button>
                    <button class="save" style="float:right" v-if="!isEditdianpingPhoneOwner" @click="savedianpingPhoneOwner(stu)">保存</button>
                  </div>
                  <div class="uoloadImg">
                    <div class="addImg" v-for="(items,index) in stu.dianpingImgList">
                      <!-- <img :src="items.ImgUrl" @click="imgEnlarge(items)"/> -->
                      <img v-preview="items.ImgUrl" preview-nav-enable="false" :src="items.ImgUrl"/>
                      <i class="iconfont icon-shanchu" @click="deleteImg(index,stu.dianpingImgList)" v-if="!isEditdianpingPhoneOwner"></i>
                    </div>
                    <label for="uploadEleImg" class="addImg" v-if="!isEditdianpingPhoneOwner">
                      <input type="file" multiple="multiple" id="uploadEleImg" accept="image/*" class="uploadInput" @change="upLoadFile($event, 'dianpingImg',stu)">
                      <i class="iconfont icon-jia"></i>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ketangPhone">
          <div class="title">
            课堂实拍(对所有学员可见)
            <button class="edit" v-if="isEditketangPhone" @click="editKetangPhone">添加</button>
            <button class="save" v-if="!isEditketangPhone" @click="saveKetangPhone">保存</button>
          </div>
          <div class="uoloadImg">
            <div class="addImg" v-for="(items,index) in listimg">
              <!-- <img :src="items.ImgUrl" @click="imgEnlarge(items)"/> -->
              <img v-preview="items.ImgUrl" preview-nav-enable="false" :src="items.ImgUrl"/>
              <i class="iconfont icon-shanchu" @click="deleteImg(index,listimg)" v-if="!isEditketangPhone"></i>
            </div>
            <label for="uploadEleImg" class="addImg" v-if="!isEditketangPhone">
              <input type="file" multiple="multiple" id="uploadEleImg" accept="image/*" class="uploadInput" @change="upLoadFile($event, 'ketangImg',this)">
              <i class="iconfont icon-jia"></i>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="editWord" v-if="editWord">
      <i class="iconfont icon-guanbi" @click="closeWord"></i>
      <textarea rows="5" v-model="reviewWord" placeholder="输入评论，最多500个字" maxlength="500"></textarea>
      <span class="btn" @click="addReviewOk">提交</span>
    </div>

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

 <div class="tishiBox" v-if="isPopUpqiaodaoShow">
      </div>
      <div class="tishiContent1" v-if="isPopUpqiaodaoShow">
      {{titlePopupqd}}
      <div class="tishiContent1-word" v-if="ishuiyuan=='2'||ishuiyuan=='1'">
         <div class="stuSearch1" >
            <label>选择会员卡：</label>
             <label  v-if="ishuiyuan=='2'" >无可用会员卡</label>
              <select  v-if="ishuiyuan=='1'"  @change="changeAddress($event)">
              <option v-for="items in listvip" :value="items.ID+','+items.CardType">{{items.CardName}}</option>
              </select>
          </div>

      </div>
       <div class="tishiContent1-word"  v-if="showbx" >
             <div class="stuSearch1" >
              <label>消耗次数：</label>
              <label>不限次数</label>
              </div>
      </div>
       <div class="tishiContent1-word"  v-if="showKynumber"  >
             <div class="stuSearch1" >
              <label>消耗次数：</label>
              <input placeholder="消耗次数" v-model="ConsumptionOfClass"/>
              </div>
      </div>
       <div class="tishiContent1-word" v-if="ishuiyuan=='0' || showAmount" >
             <div class="stuSearch1" >
              <label>消耗金额：</label>
              <input placeholder="消耗金额" v-model="singlePrice"/>
              </div>
      </div>
      <br>
      <div class="isSure-btn">
        <span @click="cancelPopUp">取消</span>
        <span @click="okOrdernew">确定</span>
      </div>
    </div>


    <teacher-bottom></teacher-bottom>
    <message ref="messageChild"></message>
  </div>
</template>
<style scoped>
.disable{
  background-color: #dedede!important;
  border-color: #e4e4e4!important;
  color: #aaa!important
}
</style>
<script>
  import teacherBottom from "@/components/teacherBottom";
  import message from "@/components/message";
  import { editStudentState,getRowClassinfo,WXUploadimg,addReviewCourseImg,getReviewinfo,
  addReview,addReviewImg,editReview,sendPush,getTeaPreAbout,editStudentStateNew } from "@/api/getData";
  export default {
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#e8e8e8')
    },
    data() {
      return {
        editWord:false,
        ruleFrom:{},
        listStudent:[],//已预约学员
        listimg:[],//课堂实拍
        reviewCourse:[],//课堂评价
        isEditketangPhone:true,
        isEditdianpingPhoneOwner:true,
        // dianpingIsShow:false,
        // dianpingList:[],
        // dianpingImgList:[],
        reviewWord:"",
        StudentID:"",
        CardName:"",
        ruleFormWDClass:{},
        rulestuClass:{},
        dianpingCopyList:{},
        isEdit:false,
        showKynumber:false,
        showAmount:false,
        showbx:false,
        ReviewID:"",
        imgLargeData:"",
        isPopUpShow:false,
        isPopUpqiaodaoShow:false,
        titlePopup:"",
        titlePopupqd:"",
        preAboutID:'',
        preAboutType:"",
        ConsumptionOfClass:"",
        singlePrice:"",
        listvip:[],
        vipID:"",
        LoginName:"",
        ishuiyuan:"",
        Ispush:""
      }
    },
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    components:{
      teacherBottom,
      message,
    },
    inject:['reload'],
    created() {
      this.getRowClassinfos()
    },
    methods: {
      async getRowClassinfos(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getRowClassinfo({
          // ID:'1'
          ID:localStorage.getItem('teaOrderId')
        })
        if(crs.orsuccess=='1'){
          debugger
          this.ruleFrom = crs.data.info;
          this.listStudent = crs.data.listStudent;//已预约学员
          this.listimg = crs.data.listimg;//课堂实拍
          this.Ispush = crs.data.Ispush
           //this.reviewCourse = crs.data.ReviewCourse;//课堂评价
          // 处理电话
          if(this.listStudent.length>0){
            for(let i=0;i<this.listStudent.length;i++){
              this.listStudent[i].Phone='tel:'+this.listStudent[i].Phone
            }
          }
          // 处理isshow
          if(this.listStudent.length>0){
            for(let l=0;l<this.listStudent.length;l++){
              this.listStudent[l].dianpingIsShow=false
              this.listStudent[l].dianpingList = [];
              this.listStudent[l].dianpingImgList = [];
            }
          }
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      // 推送
      pushFun(items){
        this.isPopUpShow = true;
        this.titlePopup='确定要向该学员推送消息吗？';
        this.StudentID = items.ID;
        this.preAboutType = 8;
      },
      async sendPushFun(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await sendPush({
          StoresID:localStorage.getItem("storesid"),
          RowClassID:localStorage.getItem('teaOrderId'),
          StudentID:this.StudentID,
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },changeAddress(event){
       // debugger

                  let arr1 = event.target.value.split(",");


              if(arr1.length > 1){

                    this.vipID = arr1[0];
                  let CardType = arr1[1];
                if(CardType  ==1){
                this.showKynumber= true;
                this.showAmount=false;
                this.showbx =false;

                }else if(CardType  ==2){
                this.showKynumber= true;
                this.showAmount= false;
                this.showbx =false;

                }else if(CardType  ==3){
                this.showKynumber= false;
                this.showAmount=false;
                this.showbx =true;
                }else if(CardType ==4){

                this.showKynumber= false;
                this.showAmount= true;
                this.showbx =false;

                }

                  }


      },
      // 点评
      dianpingFun(items){
       // debugger
        if(items.dianpingIsShow){
          items.dianpingIsShow = !items.dianpingIsShow;
          this.$forceUpdate()
        }else{
       //   debugger
          this.getReviewinfos(items)
        }
      },
      async getReviewinfos(items){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getReviewinfo({
          RowClassID:localStorage.getItem('teaOrderId'),
          StudentID:items.ID
        })
        if(crs.orsuccess=='1'){
          //debugger
          items.dianpingList = crs.data.list;
          items.dianpingImgList = crs.data.listimge;
          items.dianpingIsShow = true;
          this.$store.commit('fullLoadingFun',false);
          this.$forceUpdate()
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      // 签到
      qiandaoFun(items){
          this.vipID='';
                this.showbx =false;
                 this.showKynumber= false;
                this.showAmount=false;
        this.titlePopupqd='签到';
        this.preAboutID = items.PreAboutID;
        this.preAboutType = 2;
        this.getTeaPreAbout(items);
      },weidaoFun(items){
          this.vipID='';
                this.showbx =false;
                this.showKynumber= false;
                this.showAmount=false;
        this.titlePopupqd='未到';
        this.preAboutID = items.PreAboutID;
        this.preAboutType = 3;
       this.getTeaPreAbout(items);

      }, qingjiaFun(items){
          this.vipID='';
                this.showbx =false;
                 this.showKynumber= false;
                this.showAmount=false;
        this.titlePopupqd='请假';
        this.preAboutID = items.PreAboutID;
        this.preAboutType = 5;
        this.getTeaPreAbout(items);
      },async getTeaPreAbout(item){
          this.rulestuClass =item;
                const crs = await getTeaPreAbout({
                    MembersID: item.ID,
                    RowClassID: item.RowClassID,
                })
                 console.log(crs)
                if(crs.orsuccess == '1'){
                    this.listvip = crs.data;
                    this.ishuiyuan = crs.ishuiyuan;
                    this.ConsumptionOfClass =crs.ConsumptionOfClass;
                    this.singlePrice =crs.singlePrice;
                    this.LoginName=crs.LoginName;
                   this.isPopUpqiaodaoShow = true;
                  if(this.listvip.length>0){
                     this.vipID = this.listvip[0].ID; //获取option对应的value值
                        let CardType = this.listvip[0].CardType;
                  if(CardType  ==1){
                this.showKynumber= true;
                this.showAmount=false;
                this.showbx =false;

                }else if(CardType  ==2){
                this.showKynumber= true;
                this.showAmount= false;
                this.showbx =false;

                }else if(CardType  ==3){
                this.showKynumber= false;
                this.showAmount=false;
                this.showbx =true;
                }else if(CardType ==4){

                this.showKynumber= false;
                this.showAmount= true;
                this.showbx =false;

                }
                  }
                }else{
                    alert(crs.Msg);
                }
            },
      // 取消
      quxiaoFun(items){
        this.isPopUpShow = true;
        this.titlePopup='确定要取消该学员的预约？'
        this.preAboutID = items.PreAboutID;
        this.preAboutType = 4;
      },
      cancelPopUp(){
        this.isPopUpqiaodaoShow =false;
        this.isPopUpShow = false
      },
      okOrdernew(){
        this.isPopUpqiaodaoShow = false;
        this.editStudentStateNew();
      },
      async editStudentStateNew(){
        this.$store.commit('fullLoadingFun',true);
                var startTime = "";
                    if(this.ruleFrom.RowClassType =='1'){
                        startTime =this.rulestuClass.startTimenew;
                    }else{
                        startTime = this.ruleFrom.startTime

                    }

        const crs = await editStudentStateNew({
           PreAboutID: this.preAboutID,
           state: this.preAboutType,
           ishuiyuan: this.ishuiyuan,
           loginID: localStorage.getItem("teacherID"),
           loginName:this.LoginName,
           Note: '',
           ConsumptionOfClass:  this.ConsumptionOfClass,
           singlePrice: this.singlePrice,
           vipID: this.vipID,
           CourseName: this.ruleFrom.CourseName,
           TeacherName: this.ruleFrom.TeacherName,
           startTime: startTime,
           SKtime: this.ruleFrom.SKtime,

        })
        //debugger
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast(crs.Msg);
          this.getRowClassinfos();
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      okOrder(){
        this.isPopUpShow = false;
        if(this.preAboutType==8){
          this.sendPushFun()
        }else{
          this.editStudentStates(this.preAboutID,this.preAboutType)
        }
      },
      // 预约
      // yuyueFun(items){
      //   this.editStudentStates(items.PreAboutID,1)
      // },
      // 签到或取消
      async editStudentStates(preAboutID,state){
        this.$store.commit('fullLoadingFun',true);
        const crs = await editStudentState({
          StoresID:localStorage.getItem("storesid"),
          PreAboutID:preAboutID,
          state:state,//0 学员取消  1 预约 2 签到  3 未签到 4老师取消
          Note:""//备注
        })
        //debugger
        if(crs.orsuccess=='1'){
          this.$refs.messageChild.toast(crs.Msg);
          this.getRowClassinfos();
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      closeWord(){
        this.editWord=false
      },
      jiaolianDianping(stu){
        this.editWord=true;
        this.reviewWord = ""
        this.dianpingCopyList = stu;
        this.StudentID = stu.ID
        this.isEdit = false
      },
      jiaolianDianpingEdit(items,stu){
        this.editWord=true;
        this.reviewWord = items.ReviewInfo;
        this.dianpingCopyList = stu;
        this.StudentID = stu.ID;
        this.ReviewID = items.ID;
        this.isEdit = true
      },
      // banner选择图片
      upLoadFile(e,type,items){
      //  debugger
        for(let i=0;i<e.target.files.length;i++){
          var file = e.target.files[i];
          var reader = new FileReader();
          reader.onload =(e) => {
            let data;
            if (typeof e.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL([e.target.result])
            }
            else {
              data = e.target.result
            }
           // debugger
            // 上传服务器
            this.Uploadimgs(data,type,items)
          }
          reader.readAsDataURL(file)
        }
      },
      // 把base64图片转换
      async Uploadimgs(data,type,items){
        this.$store.commit('fullLoadingFun',true);
        const crs = await WXUploadimg({
           TeacherID:localStorage.getItem("teacherID"),
           StudentID:localStorage.getItem("studentID"),
            StoresID:localStorage.getItem("storesid"),
           imgdate:data
        })
        //debugger
        if(crs.orsuccess==1){
          if(type == 'dianpingImg'){
            items.dianpingImgList.push({
              ImgUrl: crs.imgFile
            })
          }else if(type == 'ketangImg'){
            this.listimg.push({
              ImgUrl: crs.imgFile
            })
          }
          this.$forceUpdate();
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      editKetangPhone(){
        if(this.isEditdianpingPhoneOwner){
          this.isEditketangPhone = !this.isEditketangPhone
        }else{
          this.$refs.messageChild.toast('请保存完再操作！')
        }
      },
      editdianpingPhoneOwner(){
        if(this.isEditketangPhone){
          this.isEditdianpingPhoneOwner = !this.isEditdianpingPhoneOwner
        }else{
          this.$refs.messageChild.toast('请保存完再操作！')
        }
      },
      async savedianpingPhoneOwner(stu){
        //debugger
        if(stu.dianpingImgList.length == 0){
          this.$refs.messageChild.toast('请选择图片！')
        }else{
          this.$store.commit('fullLoadingFun',true);
          let _listTeacherImg = [];
          for(let i=0;i<stu.dianpingImgList.length;i++){
            _listTeacherImg.push(stu.dianpingImgList[i].ImgUrl)
          }
          _listTeacherImg = _listTeacherImg.toString()
          const crs = await addReviewImg({
            StoresID:localStorage.getItem("storesid"),
            TeacherID:localStorage.getItem("teacherID"),
            RowClassID:localStorage.getItem('teaOrderId'),//课程id
            StudentID:stu.ID,//老师id
            listimgs:_listTeacherImg
          })
         // debugger
          if(crs.orsuccess==1){
           // debugger
            this.$store.commit('fullLoadingFun',false);
            this.$refs.messageChild.toast(crs.Msg)
            this.isEditdianpingPhoneOwner = !this.isEditdianpingPhoneOwner
            this.getReviewinfos(stu)
            // this.reload()
          }else{
            this.$refs.messageChild.toast(crs.Msg)
            this.$store.commit('fullLoadingFun',false);
          }
        }
      },
      async saveKetangPhone(){
        if(this.listimg.length == 0){
          this.$refs.messageChild.toast('请选择图片！')
        }else{
          this.$store.commit('fullLoadingFun',true);
          let _listTeacherImg = [];
          for(let i=0;i<this.listimg.length;i++){
            _listTeacherImg.push(this.listimg[i].ImgUrl)
          }
          _listTeacherImg = _listTeacherImg.toString()
         // debugger
          const crs = await addReviewCourseImg({
            StoresID:localStorage.getItem("storesid"),
            TeacherID:localStorage.getItem("teacherID"),
            RowClassID:localStorage.getItem('teaOrderId'),
            listimgs:_listTeacherImg
          })
          if(crs.orsuccess==1){
            this.$store.commit('fullLoadingFun',false);
            this.$refs.messageChild.toast(crs.Msg)
            this.isEditketangPhone = !this.isEditketangPhone
            this.getRowClassinfos()
          }else{
            this.$refs.messageChild.toast(crs.Msg)
            this.$store.commit('fullLoadingFun',false);
          }
        }

      },
      addReviewOk(){
        if(this.isEdit){
          this.editSave()
        }else{
          this.addSave()
        }
      },
      async editSave(){
        if(this.reviewWord == ''){
          this.$refs.messageChild.toast('请输入评论')
        }else{
          this.$store.commit('fullLoadingFun',true);
          const crs = await editReview({
            ReviewID:this.ReviewID,
            ReviewInfo:this.reviewWord //评价内容
          })
      //    debugger
          if(crs.orsuccess==1){
            this.$store.commit('fullLoadingFun',false);
            this.$refs.messageChild.toast(crs.Msg)
            this.editWord=false;
            this.getReviewinfos(this.dianpingCopyList)
          }else{
            this.$refs.messageChild.toast(crs.Msg)
            this.$store.commit('fullLoadingFun',false);
          }
        }
      },
      async addSave(){
        if(this.reviewWord == ''){
          this.$refs.messageChild.toast('请输入评论')
        }else{
          this.$store.commit('fullLoadingFun',true);
          const crs = await addReview({
            StoresID:localStorage.getItem("storesid"),
            RowClassID:localStorage.getItem('teaOrderId'), //课程id
            StudentID:this.StudentID, //老师id
            TeacherID:localStorage.getItem("teacherID"), // 学员id
            ReviewInfo:this.reviewWord //评价内容
          })
          //debugger
          if(crs.orsuccess==1){
            this.$store.commit('fullLoadingFun',false);
            this.$refs.messageChild.toast(crs.Msg)
            this.editWord=false;
            this.getReviewinfos(this.dianpingCopyList)
          }else{
            this.$refs.messageChild.toast(crs.Msg)
            this.$store.commit('fullLoadingFun',false);
          }
        }
      },
      deleteImg(index,items){
      // debugger
        items.splice(index,1);
        this.$forceUpdate()
      },
      imgEnlarge(items){
        let _img = [];
        _img.push(items.ImgUrl)
        this.$imagePreview({
          images: _img,
          index: 0,
          defaultOpt: {
            closeEl:true,
            fullscreenEl: true,
            shareEl: false,
            arrowEl: true,
            preloaderEl: true,
            loop: false,
            bgOpacity: 0.85,
            showHideOpacity: true,
            errorMsg: '<div class="pswp__error-msg">图片加载失败</div>',
          }
        })
      },
    },
  }
</script>
