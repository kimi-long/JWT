<!--
 * @Author: your name
 * @Date: 2020-01-31 22:01:39
 * @LastEditTime : 2020-02-13 17:35:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\page\teacher\order.vue
 -->
<template>
  <div>
    <div class="homeTouxiang">
      <img :src="ruleForm.HeadUrl"/>
    </div>
    <p class="teacher-name">{{ruleForm.Name}}</p>
    <p class="teacher-des">{{ruleForm.Title}}</p>
    <div class="content-box">
      <p class="title">学员评价</p>
      <div class="noEvaluate" v-if="listReviewTeacher.length==0">
        <i class="iconfont icon-hua"></i>
        <p>
          <i class="iconfont icon-zanwu"></i>
          暂时没有评论
        </p>
      </div>
      <div class="haveMsg" v-if="listReviewTeacher.length>0">
        <p>我是测试小数据我是测试小数据我是测试小数据我是测试小数据</p>
        <p>456</p>
      </div>
    </div>
    <div class="content-box">
      <p class="title">图集
        <button class="edit" v-if="isEdit" @click="edit">编辑</button>
        <button class="save" v-if="!isEdit" @click="save">保存</button>
      </p>
      <div class="uoloadImg">
        <div class="addImg" v-for="(items,index) in listTeacherImg">
          <!-- <img :src="items.ImgUrl" @click="imgEnlarge(items)"/> -->
          <img v-preview="items.ImgUrl" preview-nav-enable="false" :src="items.ImgUrl"/>
          <i class="iconfont icon-shanchu" @click="deleteImg(index)" v-if="!isEdit"></i>
        </div>
        <label for="uploadEleImg" class="addImg" v-if="!isEdit">
          <input type="file" multiple="multiple" id="uploadEleImg" accept="image/*" class="uploadInput" @change="upLoadFile($event, 'shareIcon')">
          <i class="iconfont icon-jia"></i>
        </label>
      </div>
    </div>
    <message ref="messageChild"></message>
  </div>
</template>
<script>
  import { getTeacherInfo,WXUploadimg,editTeacherInfo,WXUploadlistimg } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        isEdit:true,
        ruleForm:{},
        listReviewTeacher:[],
        listTeacherImg:[],
        imgLargeData:"",
      };
    },
    inject:['reload'],
    created() {
      this.getTeacherInfos()
    },
    computed: {
    },
    components:{
      message,
    },
    mounted() {
      
    },
    methods: {
      async getTeacherInfos(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTeacherInfo({
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess==1){
         //
          this.ruleForm = crs.data.info;
          this.listReviewTeacher = crs.data.listReviewTeacher;
          this.listTeacherImg = crs.data.listTeacherImg;
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      edit(){
        this.isEdit = !this.isEdit
      },
      async save(){
        this.$store.commit('fullLoadingFun',true);
        let _listTeacherImg = [];
        if(this.listTeacherImg.length>0){
          for(let i=0;i<this.listTeacherImg.length;i++){
            _listTeacherImg.push(this.listTeacherImg[i].ImgUrl)
          }
        }
        _listTeacherImg = _listTeacherImg.toString()
        const crs = await editTeacherInfo({
          TeacherID:localStorage.getItem("teacherID"),
          Name:this.ruleForm.Name,
          Title:this.ruleForm.Title,
          listimgs:_listTeacherImg
        })
        if(crs.orsuccess==1){
          this.$store.commit('fullLoadingFun',false);
          this.$refs.messageChild.toast(crs.Msg)
          this.isEdit = !this.isEdit
          this.reload()
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      async WXUploadlistimgs(file){
       // debugger
        const crs = await WXUploadlistimg({
          file
        })
       // debugger
      },
      // banner选择图片
      upLoadFile(e,type){
        //debugger
        for(let i=0;i<e.target.files.length;i++){
          var file = e.target.files[i];
          var reader = new FileReader(); 
          reader.onload =(e) => { 
            let data; 
            if (typeof e.target.result === 'object') { 
              // 把Array Buffer转化为blob 如果是base64不需要 
              data = window.URL.createObjectURL([e.target.result]) 
            } 
            else { 
              data = e.target.result 
            }
            // 上传服务器
            this.Uploadimgs(data,type)
          } 
          reader.readAsDataURL(file) 
        }
        
      },
      // 把base64图片转换
      async Uploadimgs(data,type){
        this.$store.commit('fullLoadingFun',true);
        const crs = await WXUploadimg({
           TeacherID:localStorage.getItem("teacherID"),
           StudentID:localStorage.getItem("studentID"),
            StoresID:localStorage.getItem("storesid"),
          imgdate:data
        })
        if(crs.orsuccess==1){
          this.listTeacherImg.push({
            ImgUrl: crs.imgFile 
          })
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },
      deleteImg(index){
        this.listTeacherImg.splice(index,1);
      },
      imgEnlarge(items){
      //  debugger
        let _img = [];
        _img.push(items.ImgUrl)
      //  debugger
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
      },
    }
  };
</script>
