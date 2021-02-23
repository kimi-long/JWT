
<template>
  <div  style="padding:24px;" >
   <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="top">
                    <el-form-item label="门店：" prop="StoresID">
                        <el-radio-group v-model="ruleForm.StoresID" @change="changeStoreRule">
                            <el-radio v-for="item in storeList" :label="item.ID" :key="item.index">
                                {{item.StoresName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色：" prop="Role">
                        <el-checkbox-group v-model="checkedRoles" @change="changeOptions">
                            <el-checkbox v-for="item in checkRoleList" :label="item.RType" :key="item.index" name="Role">
                                {{item.RoleName}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="员工姓名：" prop="Name">
                        <el-input v-model="ruleForm.Name" placeholder="请输入员工姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="员工头像：" prop="HeadUrl">
                        <el-upload
                            ref="avatar"
                            class="avatar-uploader"
                            action=""
                            list-type="picture-card"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="getFile"
                            :limit="1">
                            <img v-if="currentBaseImg" :src="currentBaseImg" class="avatar" width="145" height="145">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- <el-button size="small" icon="el-icon-upload2" type="primary" v-if="currentBaseImg != ruleForm.HeadUrl" @click="uploadImage">上传图片</el-button> -->
                    </el-form-item>
                    <el-form-item label="老师头衔/职称：" prop="Title" v-if="showTeacherItems == true">
                        <el-input v-model="ruleForm.Title" placeholder="请输入老师头衔或职称"></el-input>
                    </el-form-item>
                    <el-form-item label="老师简介：" prop="Introduce" v-if="showTeacherItems == true">
                        <el-input type="textarea" v-model="ruleForm.Introduce"></el-input>
                    </el-form-item>
                    <el-form-item label="员工手机号：" prop="Phone">
                        <el-input v-model="ruleForm.Phone" placeholder="请输入员工手机号"></el-input>
                        <div class="inputSubLabel">手机号是员工的登录账号，默认密码为123456</div>
                    </el-form-item>
                    <el-form-item label="住址(可选)：" prop="Address">
                        <el-input v-model="ruleForm.Address" placeholder="请输入员工住址"></el-input>
                    </el-form-item>
                </el-form>

                 <div class="login-content">
                  <span class="login-btn" @click="submitForm('ruleForm')">确认提交</span>
                 </div>
        <message ref="messageChild"></message>

  </div>
</template>
<style>
  .login-content{
    font-size: 16px;
    width: 70%;
    margin: 40px 15%;
    float: left;
  }
.login-btn{
    background-color: rgb(72, 175, 249);
    color: #fff;
    text-align: center;
    float: left;
    padding: 10px 0;
    border-radius: 14px;
    margin: 20px 0;
    width: 100%
  }
 .drawerForm{
    width:100%;
    padding:24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
}
.drawerForm .el-form-item{
    margin:0 0 24px !important;
}
.el-button--primary {
    color: #FFF;
    height: 40px;
    background-color: rgb(72, 175, 249);
    border-color: rgb(72, 175, 249);
}
</style>
<script>
  import { WXUploadimg,stuGetListStoresName,getwxListRole,getwxTeacherInfo,addTeacher } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        ruleForm:{
                    StoresID: localStorage.getItem("storesid"),
                    LoginName: "",
                    Phone: "",
                    Name: "",
                    Address: "",
                    Email: "",
                    HeadUrl: "",
                    Title: "",
                    Introduce: "",
                    Role: "1",
                },
                rules:{
                    Name: [{required:true, message:'请输入员工姓名', trigger:'blur'}],
                    Phone: [{required:true, message:'请输入员工手机号', trigger:'blur'}],
                    Introduce: [{required: true, message:'请输入老师简介', trigger: 'blur' }],
                },
                storeList:[],
                checkRoleList:[],
                currentBaseImg:"",
                selectedStore:"",
                checkedRoles:["1"],
                showTeacherItems:false,


      };
    },
    inject:['reload'],
    created() {
        this.stuGetListStoresNames();
     },
    computed: {
    },
    components:{
        message
     },
    mounted() {

    },
    methods: {
        async stuGetListStoresNames(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await stuGetListStoresName({
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
          this.storeList = crs.data;
         this.getwxListRole();
         }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },async getwxListRole(){
            const crs = await getwxListRole({
                    StoresID:localStorage.getItem("storesid")
                })
                // debugger
                console.log(crs)
                if(crs.orsuccess == '1'){
                     this.checkRoleList = crs.data;
                               this.$store.commit('fullLoadingFun',false);

                }
      },async addTeacher(){

            this.ruleForm.LoginName = this.ruleForm.Phone;
                const crs = await addTeacher(this.ruleForm)
                // debugger
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
      }, changeStoreRule (val){
                this.selectedStore = val;
               this.checkedRoles = ["1"];

            },
            // 表单角色切换
            changeOptions(val){
                var index = val.indexOf("1");
                if(index != -1){
                    this.showTeacherItems = true;
                }else{
                    this.showTeacherItems = false;
                    this.ruleForm.Title = "";
                    this.ruleForm.Introduce ="";
                }
                this.ruleForm.Role = this.checkedRoles.join();
            },
       submitForm(formName){
             this.$refs[formName].validate(async valid => {
                        if (valid) {
                            this.addTeacher();
                        } else {
                            return false;
                        }
                    });

       },getFile(file, fileList) {
                this.getBase64(file.raw).then(res => {
                    this.currentBaseImg = res;
                    this.uploadImage();
                });
            }, getBase64(file) {
                return new Promise(function(resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        imgResult = reader.result;
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                    reader.onloadend = function() {
                        resolve(imgResult);
                    };
                });
            },
            // 上传图片
            async uploadImage(){
                const crs = await WXUploadimg({
                     TeacherID:localStorage.getItem("teacherID"),
                     StudentID:localStorage.getItem("studentID"),
                     StoresID:localStorage.getItem("storesid"),
                    imgdate:this.currentBaseImg
                })
                // debugger
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.ruleForm.HeadUrl = crs.imgFile;
                    this.$refs.avatar.clearFiles();
                }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            }

    }
  };
</script>
