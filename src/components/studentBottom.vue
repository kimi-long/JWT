<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime: 2020-04-25 19:31:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="fix-bottom">
      <div class="fix-stu-btn" :class="{'active':(isActive=='stuIndex')}" @click="order">
        <i class="iconfont icon-yuyuehuodong"></i>
        <p>主页</p>
      </div>
      <div class="fix-stu-btn" :class="{'active':isActive=='stuTeacher'}" @click="toTeacher">
        <i class="iconfont icon-laoshi"></i>
        <p>老师</p>
      </div>
      <div class="fix-stu-btn" :class="{'active':isActive=='stuOwner'}" @click="owner">
        <i class="iconfont icon-wodedangxuan"></i>
        <p>我的</p>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  // 深拷贝
  // function copyArray(arr){
  //   return JSON.parse(JSON.stringify(arr));      
  // }
  export default {
    data() {
      return {
      };
    },
    created() {
    },
    computed: {
      isActive(){
        return this.$route.name
      }
    },
    components:{
    },
    mounted() {
      
    },
    methods: {
      order(){
        this.$router.push('/stuIndex')
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
