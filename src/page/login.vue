<!--
 * @Author: your name
 * @Date: 2020-02-04 11:53:48
 * @LastEditTime: 2020-04-25 19:33:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\initialPage.vue
 -->
<template>
  <div>
    <div class="login-content" v-if="isCode=='2'|| isCode == '3'">
          <span class="login-title" >绑定账号</span>
      <div class="line">
        <input placeholder="请输入手机号" v-model="phone"/>
      </div>
      <div class="line">
        <input placeholder="请输入验证码" v-model="code"/>
        <span class="login-span" v-if="isClick" @click="isClick&&getVerifyCode()">{{times}}</span>
        <span class="login-span-on" v-if="!isClick" @click="isClick&&getVerifyCode()">{{times}}</span>

      </div>
      <span class="login-btn" @click="loginFun">登录</span>
    </div>
      <div class="login-content" v-if="isCode=='1'">
          <span class="login-title" v-if="!isLongin" >账号密码登录</span>
          <span class="login-title" v-if="isLongin" >验证码登录</span>
      <div class="line">
        <input v-if="!isLongin" placeholder="请输入登录账户" v-model="phone"/>
        <input v-if="isLongin" placeholder="请输入手机号" v-model="phone"/>

      </div>
       <div class="line"  v-if="!isLongin">
        <input type="password" placeholder="请输入密码" v-model="password"/>
      </div>
      <div class="line" v-if="isLongin">
        <input placeholder="请输入验证码" v-model="code"/>
        <span class="login-span" v-if="isClick" @click="isClick&&getVerifyCode()">{{times}}</span>
        <span class="login-span-on" v-if="!isClick" @click="isClick&&getVerifyCode()">{{times}}</span>
      </div>
      <span class="login-btn" @click="loginFun">登录</span>
      <span class="login-btn" v-if="!isLongin" @click="loginyzm">验证码登录</span>
      <span class="login-btn"  v-if="isLongin" @click="loginzh">账号密码登录</span>

    </div>
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
  .login-content .line{
    border:1px solid #e4e4e4;
    border-radius: 10px;
    height: 45px;
    line-height: 45px;
    width: 100%;
    margin: 10px 0;
    display: table
  }

   .login-span{
    display: table-cell;
    background-color: #15b64b;
    color: #e9f0e9;
    width: 90px;
    font-size: 14px;
    border-radius:0 10px 10px 0;
    text-align: center
  }
  .login-span-on{
    display: table-cell;
    background-color: #8d8d8d;
    color: #e9f0e9;
    width: 90px;
    font-size: 14px;
    border-radius:0 10px 10px 0;
    text-align: center
  }
  .login-content .line input{
    width: 100%;
    box-sizing: border-box;
    display: table-cell;
    padding: 0 12px;
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
    .login-title{
    background-color: #fff;
    color: rgb(72, 175, 249);
    text-align: center;
    float: left;
    padding: 10px 0;
    border-radius: 14px;
    margin: 20px 0;
    width: 100%
  }
</style>
<script>
  import { teacherbinding,teacherLogin,StudentLoginNew } from "@/api/getData";
  import message from "@/components/message";
  import { setStore } from "@/config/mUtils";
  import $ from "jquery";

  function sendCode(phone,code,that){
    let _list = {
      Phone:phone,
      code:code,
      StoresID:localStorage.getItem("storesid")
    }
   // debugger
    var _list2 = JSON.stringify(_list)
    $.ajax({
      url: "http://yuekeapi.xingxingzhihuo.com.cn/WebApi/send_verify.aspx",
      type: "POST",
      cache: false,
      data: _list2,
      processData: false,
      contentType: false,
      headers: {
        Accept: "application/json",
      },
      success: function(res) {
        let _res = JSON.parse(res)
        //debugger
        if(_res.orsuccess=='1'){
          that.$refs.messageChild.toast(_res.Msg)
          that.$store.commit('fullLoadingFun',false);
        }else{
          that.$store.commit('fullLoadingFun',false);
          that.$refs.messageChild.toast(_res.Msg)
        }

      },
      error: function(res) {
        //debugger
        that.$message({
          message: '请填写正确的用户名密码',
          type: "error"
        });
      }
    });
  }

  export default {
    data() {
      return {
        phone:"",
        code:"",
        isLogin:"1",
        password:"",
        isLongin:false,
        isCode:localStorage.getItem("Code"),
        times:"获取验证码",
        countdown:60,
        isClick:true
      };
    },
    created() {
      this.$store.commit('fullLoadingFun',false);
      // this.getLoginInfos()
    },
    computed: {
    },
    components:{
      message
    },
    mounted() {
    },
    methods: {
      getVerifyCode(){
        if (this.countdown == 0) {
          this.isClick = true;
          this.times = "获取验证码"
          this.countdown = 60;
          return;
        } else {
          if(this.countdown=='60'){
            if(this.phone==''){
             this.$refs.messageChild.toast('手机号不能为空');
             return;
            }
            sendCode(this.phone,localStorage.getItem("Code"),this)
          }
          this.times = "重新发送(" + this.countdown + ")";
          this.isClick = false;
          this.countdown--;
        }
        setTimeout(this.getVerifyCode,1000);//设置定时任务，1000毫秒为1秒
      },
      async loginFun(){

          if(this.phone==''){
             this.$refs.messageChild.toast('手机号不能为空');
             return;
            }
          if(this.code=='' && this.isLongin){
              this.$refs.messageChild.toast('验证码不能为空');
              return;
              }
          if(this.password=='' && !this.isLongin && this.isCode =='1'){
              this.$refs.messageChild.toast('密码不能为空');
              return;
              }

        this.$store.commit('fullLoadingFun',true);
        const crs = await teacherbinding({
          openid:localStorage.getItem('Openid'),
          wx_name:localStorage.getItem('wx_name'),
          wx_topimg:localStorage.getItem('wx_topimg'),
          Phone:this.phone,
          Code:this.code,
          password:this.password,
          isCode:localStorage.getItem("Code"),
          StoresID:localStorage.getItem("storesid"),
          isLogin:this.isLogin
        })
         // debugger
        if(crs.orsuccess=='1'){
         // debugger
          if(localStorage.getItem("Code")=='1'){
            //this.teacherLogins()
          setStore("token", crs.token);
          localStorage.setItem("teacherID", crs.teacherID);
          this.$router.push('/gzt')
          }else if(localStorage.getItem("Code")=='2'){
            this.studentLogins()
          }
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      // 登录教师端
      async teacherLogins(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await teacherLogin({
          openid:localStorage.getItem('Openid')
        })
        if(crs.orsuccess=='1'){
         // debugger
          this.$refs.messageChild.toast(crs.Msg)
          setStore("token", crs.token);
          localStorage.setItem("teacherID", crs.TeacherID);
          this.$router.push('/teaOrder')
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      // 登录学生端
      async studentLogins(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await StudentLoginNew({
          openid:localStorage.getItem('Openid'),
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
         // debugger
          this.$refs.messageChild.toast(crs.Msg)
          setStore("token", crs.token);
          localStorage.setItem("studentID", crs.StudentID);
          this.$router.push('/stuIndex')
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },loginyzm(){
        this.isLongin = true;
        this.code = '';
        this.password = '';
        this.isLogin='0'
      },loginzh(){
        this.isLongin = false;
        this.code = '';
        this.password = '';
        this.isLogin='1'
      }
    }
  };
</script>
