<!--
 * @Author: your name
 * @Date: 2020-02-01 21:45:26
 * @LastEditTime : 2020-02-08 18:27:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\student\stuTeacherDetails.vue
 -->

<template>
  <div>
    <div class="stuEvaluateTea-word stuEvaluateTea-word2">
        <textarea rows="5" v-model="reviewInfo" placeholder="意见反馈" maxlength="500"></textarea>
        <span class="btn" @click="save()">提交</span>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>
<script>
  import { stuAddFeedback } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        reviewInfo:""
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
        const crs = await stuAddFeedback({
          StoresID:localStorage.getItem("storesid"),
          StudentID:localStorage.getItem("studentID"),
          ReviewInfo:this.reviewInfo
        })
        if(crs.orsuccess=='1'){
          //debugger
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
          this.$router.push('/stuOwner')
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      }
    }
  };
</script>
