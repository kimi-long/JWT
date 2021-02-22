<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-12 18:40:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div class="padding-bottom">
    
    <div class="stuSearch">
      <select @change="changeAddress($event)">
        <option v-for="items in addressList" :value='items.ID'>{{items.StoresName}}</option>
      </select>
    </div>
    <div class="stu-order-list stu-order-list2" v-for="items in teacherList" @click="toStuTeacherDetails(items)">
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">
          <div class="stu-order-list-right-img" v-if="items.HeadUrl != '' && items.HeadUrl!=undefined">
            <img :src="items.HeadUrl"  />
          </div>
          <div class="stu-order-list-right-img"  v-if="items.HeadUrl == '' || items.HeadUrl==undefined">

            <img src="../../assets/img/userAvatar.png">

          </div>


          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.Name}}</span>
            </p>
            <p>{{items.Introduce}}</p>
          </div>
          <div class="stu-order-list-right-btn isActive">
            <span>详情</span>
          </div>
        </div>
      </div>
    </div>
    <student-bottom></student-bottom>
    <message ref="messageChild"></message>
  </div>
</template>
<script>

  import { stuGetListTeacher,stuGetListStoresName } from "@/api/getData";
  import message from "@/components/message";
  import studentBottom from "@/components/studentBottom";
  export default {
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    data() {
      return {
        addressList:[],
        addressActive:"",
        teacherList:[]
      }
    },
    components:{
      studentBottom,
      message
    },
    created() {
      this.stuGetListStoresNames()
    },
    methods: {
      // 获取门店
      async stuGetListStoresNames(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await stuGetListStoresName({
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
          this.addressList = crs.data;
          if(this.addressList.length>0){
            this.addressActive = this.addressList[0].ID; //获取option对应的value值
          }
          this.stuGetListTeachers();
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      async stuGetListTeachers(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await stuGetListTeacher({
          StoresID:this.addressActive
        })
        if(crs.orsuccess=='1'){
          this.teacherList = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      changeAddress(event){
       // debugger
        this.addressActive = event.target.value; //获取option对应的value值
        this.stuGetListTeachers();
      },
      toStuTeacherDetails(items){
        localStorage.setItem("teacherID",items.ID)
        this.$router.push('/stuTeacherDetails')
      },
    },
  }
</script>
