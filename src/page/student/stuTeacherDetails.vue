<!--
 * @Author: your name
 * @Date: 2020-02-01 21:45:26
 * @LastEditTime : 2020-02-13 17:35:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \智火约课\src\page\student\stuTeacherDetails.vue
 -->

<template>
  <div>
    <!-- {{teacherList}} -->
    <div class="bgfff">
      <div class="homeTouxiang" v-if="teacherList.HeadUrl != '' && teacherList.HeadUrl!=undefined">
        <img :src="teacherList.HeadUrl"/>
      </div>
       <div class="homeTouxiang"  v-if="teacherList.HeadUrl == '' || teacherList.HeadUrl==undefined">
        <img src="../../assets/img/userAvatar.png">
      </div>
                  

      <p class="teacher-name">{{teacherList.Name}}</p>
      <p class="teacher-des teacher-plNum2">{{teacherList.Introduce}}</p>
      <span class="btn" @click="dianpingTea">点评</span>
    </div>
    <div class="content-box content-box2">
      <div class="content-box2-title">
        <p class="title">TA的课程安排</p>
      </div>
      <!-- <div class="noEvaluate">
        <i class="iconfont icon-hua"></i>
        <p>
          <i class="iconfont icon-zanwu"></i>
          暂时没有评论
        </p>
      </div> -->
      <div class="stuTeacherDetails-s">
        <div class="stu-order-list stuTeacherDetails" v-for="items in teacherList.listRorClass" @click="toMyCourseDetails(items)">
          <div class="stu-order-list-right">
            <div class="stu-order-list-right-table">
              <div class="stu-order-list-right-img">
                <!-- <img :src="items.CourseHeadUrl" @click="imgEnlarge(items)"/> -->
                <img v-preview="items.CourseHeadUrl" preview-nav-enable="false" :src="items.CourseHeadUrl"/>
              </div>
              <div class="stu-order-list-right-content">
                <p>
                  <span>{{items.SKtime}}</span>
                  <span>{{items.timeddd}}</span>
                </p>
                <p class="className">{{items.CourseName}}</p>
                <p>
                  <span>{{items.startTime}}</span>
                  <span>{{items.LevelName}}</span>
                  <span v-if="items.RowClassType == '1'" class="numNow1">私</span>

                </p>
              </div>
              <div class="stu-order-list-right-btn">
                <i class="iconfont icon-iconfontjiantou6"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>

<style>
.numNow1{
    background-color: #54c31d;
    color: #fff;
    border-radius: 10px;
    padding: 0 8px;
}
</style>
<script>
  // 深拷贝
  // function copyArray(arr){
  //   return JSON.parse(JSON.stringify(arr));      
  // }
  import { stuGetTeacherInfo } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        isEdit:true,
        teacherList:{}
      };
    },
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    created() {
      this.stuGetTeacherInfos()
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
      async stuGetTeacherInfos(){
      //  debugger
        const crs = await stuGetTeacherInfo({
          TeacherID:localStorage.getItem("teacherID")
        })
       // debugger
        if(crs.orsuccess=='1'){
       //   debugger
          this.teacherList = crs.data
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      dianpingTea(){
        localStorage.setItem('teaHeadUrl',this.teacherList.HeadUrl)
        localStorage.setItem('teaName',this.teacherList.Name)
        this.$router.push('/stuEvaluateTea')
      },
      toMyCourseDetails(items){
        localStorage.setItem("rowClassID", items.ID);
        // localStorage.setItem("preAboutID", items.PreAboutID);
        this.$router.push('/stuOrderDetails')
      },
      
      imgEnlarge(items){
        let _img = [];
        _img.push(items.CourseHeadUrl)
        this.$imagePreview({
          images: _img,
          index: 0,
          defaultOpt: {
            fullscreenEl: true,
            shareEl: false,
            arrowEl: true,
            preloaderEl: true,
            loop: false,
            bgOpacity: 0.85,
            showHideOpacity: true,
            errorMsg: '<div class="pswp__error-msg">图片加载失败</div>',
          }
        })
        // mui.previewImage().close()
      },
    }
  };
</script>
