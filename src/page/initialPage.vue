 <!--
 * @Author: your name
 * @Date: 2020-02-04 11:53:48
 * @LastEditTime: 2020-04-25 20:37:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\initialPage.vue ?openid=oAxbjwP7DKfxqYl0RT78jdOJqc3k&code=2&storesid=31
 -->
<template>
  <div>
    <!-- 222 -->
    <message ref="messageChild"></message>
  </div>
</template>
<script>
  import { getLoginInfo,teacherLogin,StudentLoginNew,getLoginInfoweb } from "@/api/getData";
  import message from "@/components/message";
  import { setStore } from "@/config/mUtils";
  export default {
    data() {
      return {
        msgList:[],
        openid:"",
        code:"",
        storesid:""
      };
    },
    created() {
      this.$store.commit('fullLoadingFun',true);
      // var test = window.location.href;
      // alert(test);
		  this.openid = this.$route.query.openid;
      this.code = this.$route.query.code;
      this.storesid = this.$route.query.storesid;
      //debugger
      localStorage.setItem("storesid", this.storesid);
      localStorage.setItem("Code", this.code);
      this.getLoginInfos()
    },
    computed: {
    },
    components:{
      message
    },
    mounted() {
    },
    methods: {
      async getLoginInfos(){
        //debugger
        const crs = await getLoginInfo({
          openid:this.openid,
          StoresID:this.storesid
        })
        if(crs.orsuccess=='1'){
          // Isbinding  1为绑定 0 为未绑定
          if(crs.data.isbinding == '0'){
            // 未绑定，跳转到登录页
            // localStorage.setItem("Openid", 'oNuFCxIT-NA-CGJzKQwVP5PPeJ7c')
            // 15261656762
            localStorage.setItem("wx_name", crs.data.wx_name);
            localStorage.setItem("wx_topimg", crs.data.wx_topimg);
            localStorage.setItem("Openid", crs.data.openid);
            this.$router.push('/login')
          }else if(crs.data.isbinding == '1'){
            // 已绑定，直接登录跳转到首页
            // 判断是学生端还是老师端
            if(this.code == '1'){
              this.teacherLogins(crs.data.openid)
            }else if(this.code == '2'||this.code=='3'){
              this.studentLogins(crs.data.openid)
            }
          }
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          // this.$store.commit('fullLoadingFun',false);
        }
      },
      // 登录教师端
      async teacherLogins(openid){
        this.$store.commit('fullLoadingFun',true);
          //debugger
        const crs = await teacherLogin({
          openid:openid
          // oNuFCxIT-NA-CGJzKQwVP5PPeJ7c
        })
        if(crs.orsuccess=='1'){
         // debugger
          this.$refs.messageChild.toast(crs.Msg)
          setStore("token", crs.token);
          localStorage.setItem("teacherID", crs.TeacherID);
          this.$router.push('/gzt')
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      // 登录学生端
      async studentLogins(openid){
        this.$store.commit('fullLoadingFun',true);
        const crs = await StudentLoginNew({
          openid:openid,
          StoresID:this.storesid
         })
        if(crs.orsuccess=='1'){
          //debugger
          setStore("token", crs.token);
          localStorage.setItem("studentID", crs.StudentID);
          if(this.code=='3'){
            localStorage.setItem("preAboutID",this.$route.query.preaboutid),
            localStorage.setItem("rowClassID",this.$route.query.rowclassid),
            localStorage.setItem("studentID",this.$route.query.studentid),
            this.$router.push('/myCourseDetails')
          }else{
            this.$router.push('/stuIndex')
          }
          this.$refs.messageChild.toast(crs.Msg)
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
    }
  };
</script>
