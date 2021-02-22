<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-03 13:24:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="toast" v-show="toastShow">
      {{toastText}}
    </div>
  </div>
</template>
<style scoped>
  .toast {
    position: fixed;
    z-index: 2000;
    left: 50%;
    top:20%;
    transition:all .5s;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    border-radius: 5px;
    color:#FFF;
    background: rgba(17, 17, 17, 0.7);
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
  }
</style>
<script>
  export default {
    name: 'messageTip',
    data() {
      return {
        toastShow: false,
        toastText: ''
      };
    },
    created() {
    },
    methods: {
      toast (str) {
        let v = this
        v.toastText = str
        v.toastShow = true
        setTimeout(function(){
          v.toastShow = false
        }, 1500)
      },
    }
  };
</script>
