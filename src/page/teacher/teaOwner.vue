<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-06 17:54:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    <!-- <p style="color:red;font-size:30px">哈哈</p> -->
    <div class="owner-list">
      <div class="owner-list-box">
        <div class="touxiang">
          <img :src="ruleFrom.HeadUrl" class="touxiang"/>
        </div>
        <span class="weixin-name">{{ruleFrom.Name}}</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" @click="toMyMsg">
        <i class="iconfont icon-xiaoxixinfengnews2 message"></i>
        <span>消息</span>
        <span class="num">{{ruleFrom.unreadCount}}</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" @click="toMyHome">
        <i class="iconfont icon-wode myHome"></i>
        <span>我的主页</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" v-if="isCourse =='1'" @click="toCourse">
        <i class="iconfont icon-kecheng myHome"></i>
        <span>课程管理</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" v-if="isRowClass =='1'" @click="toRowClass">
        <i class="iconfont icon-keshi_m myHome"></i>
        <span>课表管理</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" v-if="isTeacher =='1'" @click="toTeacher">
        <i class="iconfont icon-laoshi myHome"></i>
        <span>员工管理</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box"  v-if="isMembers =='1'" @click="toMembers">
        <i class="iconfont icon-wodedangxuan myHome"></i>
        <span>会员管理</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box"  v-if="isMemberCard =='1'"  @click="toMemberCard">
        <i class="iconfont icon-huiyuanqia myHome"></i>
        <span>会员卡管理</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
       <div class="owner-list-box" v-if="isMemberYJ=='1'" @click="toxuqi">
        <i class="iconfont icon-time_icon myHome"></i>
        <span>续期提醒</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
      <div class="owner-list-box" @click="toxeditPwd">
        <i class="iconfont icon-xiepinglun myHome"></i>
        <span>修改密码</span>
        <i class="iconfont icon-iconfontjiantou6"></i>
      </div>
    <div class="login-content">
         <span class="login-btn" @click="loginOut">退出登陆</span>
    </div>
    </div>

  <el-dialog class="changePW"
    title="修改密码"
    :visible.sync="dialogVisible"
    width="80%">
    <el-form label-width="100px"  :model="ruleForm" ref="ruleForm" :rules="rules">
       <el-form-item label="旧密码" prop="Pwd">
          <el-input clearable type="password" v-model="ruleForm.Pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd" style="margin-top:25px;">
          <el-input clearable type="password" v-model="ruleForm.newPwd"></el-input>
      </el-form-item>
     </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button size="medium" type="primary" @click="modifyPwd">修 改</el-button>
      </span>
  </el-dialog>
    <teacher-bottom></teacher-bottom>
    <message ref="messageChild"></message>
  </div>
</template>
<style scoped>
  .login-content{
    font-size: 16px;
    width: 70%;
    margin: 40px 15%;
    float: left;
  }
.login-btn{
    background-color: rgb(72, 175, 249);
    color: #fff;
    text-align: center;
    float: left;
    padding: 10px 0;
    border-radius: 14px;
    margin: 20px 0;
    width: 100%
  }
</style>

<script>
  import teacherBottom from "@/components/teacherBottom";
  import message from "@/components/message";
  import { getMyinfo,TerChangePassword } from "@/api/getData";

  // 深拷贝
  // function copyArray(arr){
  //   return JSON.parse(JSON.stringify(arr));
  // }
  export default {
    data() {
      return {
        ruleFrom:"",
        dialogVisible:false,
        isRowClass:"",
        isCourse:"",
        isTeacher:"",
        isMembers:"",
        isMemberCard:"" ,
        isMemberYJ:"" ,
       ruleForm:{
        Pwd:"",
        newPwd:""
      },
      rules:{
        Pwd:[{required: true, message:"请输入旧密码", trigger: "blur"}],
        newPwd:[{required: true, message:"请输入新密码", trigger: "blur"}]

      }
      };
    },
    // inject:['reload'],
    created() {
      this.getMyinfos()
    },
    computed: {
    },
    components:{
      teacherBottom,
      message
    },
    mounted() {

    },
    methods: {
      toMyHome(){
        this.$router.push('/teaMyHome')
      },
      toMyMsg(){

        this.$router.push('/teaMsg')
      },
      async getMyinfos(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getMyinfo({
          TeacherID:localStorage.getItem("teacherID"),
        })
      //  debugger
        if(crs.orsuccess==1){
          this.ruleFrom = crs.data;
          this.isRowClass = crs.data.isRowClass;
          this.isCourse = crs.data.isCourse;
          this.isTeacher = crs.data.isTeacher;
          this.isMembers = crs.data.isMembers;
          this.isMemberCard = crs.data.isMemberCard;
          this.isMemberYJ= crs.data.isMemberYJ;
          localStorage.setItem("teacherName", crs.data.Name);
          localStorage.setItem("Limits", crs.data.Limits);
          localStorage.setItem("khIson", crs.data.khIson);
          localStorage.setItem("isgoumaijine", crs.data.isgoumaijine);
          localStorage.setItem("iscolor", crs.iscolor);
          localStorage.setItem("isjifen", crs.data.isjifen);

          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },loginOut(){
                this.$router.push('/login')
      },toRowClass(){

         this.$router.push('/curriculum')

      }, toCourse(){
         this.$router.push('/courseList')

      }, toTeacher(){
         this.$router.push('/teaList')

      }, toMembers(){
        this.$router.push('/memberList')
      }, toMemberCard(){
      this.$router.push('/kabao')
         //this.$router.push('/addkabao')


      },toxuqi(){
       this.$router.push('/activeList')
      },toxeditPwd(){
        this.dialogVisible=true;

      },modifyPwd(){
         this.changePassword();


      }, async changePassword(){
                const res = await TerChangePassword({
                    TeacherID:localStorage.getItem("teacherID"),
                    Pwd:this.ruleForm.Pwd,
                    newPwd:this.ruleForm.newPwd
                })
                if(res.orsuccess == "1"){
                    this.dialogVisible=false;
                    this.ruleForm.Pwd="";
                    this.ruleForm.newPwd="";
                    this.$refs.messageChild.toast(crs.Msg)

                }else{
                    this.$refs.messageChild.toast(crs.Msg)

                }

            }
    }
  };
</script>
