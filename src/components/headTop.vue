<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-04-25 19:51:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="fix-top">
      <i class="iconfont icon-zuojiantou" @click="goback" v-if="isActive!=='gzt'&&isActive!=='teaOwner'&&isActive!=='stuOwner'&&isActive!=='stuTeacher'"></i>
      {{title}}
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  export default {
    data() {
      return {
        title:""
      };
    },
    created() {
    },
    computed: {
      isActive(){
        if(this.$route.name == 'teaOrder'){
          this.title = '预约'
        }else if(this.$route.name == 'teaOwner'||this.$route.name == 'stuOwner'){
          this.title = '我的'
        }else if(this.$route.name == 'teaMsg'||this.$route.name == 'stuMsg'){
          this.title = '消息'
        }else if(this.$route.name == 'gzt'){
          this.title = '工作台'
        }else if(this.$route.name == 'teaMyHome'){
          this.title = '我的主页'
        }else if(this.$route.name == 'addkabao'){
          this.title = '添加会员卡'
        }else if(this.$route.name == 'editkabao'){
          this.title = '编辑会员卡'
        }else if(this.$route.name == 'courseList'){
          this.title = '课程列表'
        }else if(this.$route.name == 'addcourse'){
          this.title = '添加课程'
        }else if(this.$route.name == 'editcourse'){
          this.title = '编辑课程'
        }else if(this.$route.name == 'curriculum'){
          this.title = '课表'
        }else if(this.$route.name == 'addcurriculum'){
          this.title = '排课'
        }else if(this.$route.name == 'editcurriculum'){
          this.title = '编辑课表'
        }
         else if(this.$route.name == 'kabao'){
          this.title = '会员卡'
        }else if(this.$route.name == 'teaList'){
          this.title = '员工管理'
        }else if(this.$route.name == 'addTeach'){
          this.title = '添加员工'
        }else if(this.$route.name == 'editTeach'){
          this.title = '编辑员工'
        }else if(this.$route.name == 'activeList'){
          this.title = '续期预警'
        }else if(this.$route.name == 'memberList'){
          this.title = '会员列表'
        }else if(this.$route.name == 'addmember'){
          this.title = '添加会员'
        }else if(this.$route.name == 'editmember'){
          this.title = '编辑会员'
        }else if(this.$route.name == 'CardVipList'){
          this.title = '会员卡列表'
        }
        else if(this.$route.name == 'teaOrderDetails'){
          this.title = '课程详情'
        }else if(this.$route.name == 'stuFeedback'){
          this.title = '意见反馈'
        }else if(this.$route.name == 'myCourse'){
          this.title = '我的课程'
        }else if(this.$route.name == 'myCourseDetails'){
          this.title = '课程详情'
        }else if(this.$route.name == 'stuOrderDetails'){
          this.title = '预约详情'
        }else if(this.$route.name == 'stuTeacher'){
          this.title = '老师列表'
        }else if(this.$route.name == 'stuTeacherDetails'){
          this.title = '老师详情'
        }else if(this.$route.name == 'stuEvaluateTea'){
          this.title = '点评老师'
        }else if(this.$route.name == 'stuOrder'){
          this.title = '课程预约'
        }else if(this.$route.name == 'stuPrivateOrder'){
          this.title = '一对一'
        }else if(this.$route.name == 'stuCard'){
          this.title = '我的会员卡'
        }

        return this.$route.name
      }
    },
    components:{
    },
    mounted() {

    },
    methods: {
      goback(){
       // debugger
        if(this.$route.name == 'myCourseDetails' &&localStorage.getItem("Code")=='3'){
          this.$router.push('/stuOrder')
        }else{
          this.$router.go(-1)
        }
      },
      order(){
        this.$router.push('/stuOrder')
      },
      toTeacher(){
        this.$router.push('/stuTeacher')
      },
      owner(){
        this.$router.push('/stuOwner')
      },
    }
  };
</script>
