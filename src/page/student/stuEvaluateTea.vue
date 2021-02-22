<!--
 * @Author: your name
 * @Date: 2020-02-01 21:45:26
 * @LastEditTime : 2020-02-09 16:55:29
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\student\stuTeacherDetails.vue
 -->

<template>
  <div>
    <div class="bgfff">
      <div class="stuEvaluateTea">
        <img :src="teaHeadUrl"/>
      </div>
      <p class="stuEvaluateTea-teacher-name">{{teaName}}</p>
    </div>
    <div class="stuEvaluateTea-word">
        <textarea rows="5" placeholder="说点啥" maxlength="500" v-model="reviewInfo"></textarea>
        <span class="btn" @click="save">提交</span>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>
<script>

  import { stuAddReviewTeacher } from "@/api/getData";
  import message from "@/components/message";
  // 深拷贝
  // function copyArray(arr){
  //   return JSON.parse(JSON.stringify(arr));      
  // }
  export default {
    data() {
      return {
        isEdit:true,
        reviewInfo:'',
        teaHeadUrl:localStorage.getItem('teaHeadUrl'),
        teaName:localStorage.getItem('teaName')
      };
    },
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    // inject:['reload'],
    created() {
    },
    computed: {
    },
    components:{
      message
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    methods: {
      async save(){
        if(this.reviewInfo==''){
          this.$refs.messageChild.toast('请输入评价！')
        }else{
          const crs = await stuAddReviewTeacher({
            StoresID:localStorage.getItem("storesid"),
            StudentID:localStorage.getItem("studentID"),
            TeacherID:localStorage.getItem("teacherID"),
            ReviewInfo:this.reviewInfo
          })
          if(crs.orsuccess=='1'){
           // debugger
            this.$store.commit('fullLoadingFun',false);
            this.$router.push('/stuTeacherDetails')
          }else{
            this.$refs.messageChild.toast(crs.Msg)
            this.$store.commit('fullLoadingFun',false);
          }
        }
        
      }
    }
  };
</script>
