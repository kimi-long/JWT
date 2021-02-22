<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-03 13:24:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="fix-bottom">
      <div class="fix-tea-btn" :class="{'active':(isActive=='gzt')}" @click="order">
        <i class="iconfont icon-yuyuehuodong"></i>
        <p>工作台</p>
      </div>
      <div class="fix-tea-btn" :class="{'active':isActive=='teaOwner'}" @click="owner">
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
    // inject:['reload'],
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
        this.$router.push('/gzt')
      },
      owner(){
        this.$router.push('/teaOwner')
      },
    }
  };
</script>
