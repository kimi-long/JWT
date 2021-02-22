
<template>
  <div  style="padding:24px;" >
   <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="right">
                     <!-- {{ruleForm}} -->

                        <el-form-item label="课程名称：" prop="CourseName">
                            <el-input v-model="ruleForm.CourseName" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item v-if="iscolor==1" label="课程颜色：" prop="color">
                            <el-color-picker
                             v-model="ruleForm.color"
                             show-alpha
                            :predefine="predefineColors">
                            </el-color-picker>
                        </el-form-item>
                        <el-form-item label="课程头像：" prop="HeadUrl">
                            <el-upload
                                ref="avatar"
                                class="avatar-uploader"
                                list-type="picture-card"
                                action=""
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="getFile"
                                :limit="1">
                               <img v-if="currentBaseImg" :src="currentBaseImg" class="avatar" width="145" height="145" >
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <!-- <el-button size="small" icon="el-icon-upload2" type="primary" v-if="currentBaseImg != ruleForm.HeadUrl" @click="uploadImage">上传图片</el-button> -->
                        </el-form-item>
                        <!-- {{formData.img}} -->
                        <el-form-item label="轮播主图：" prop="lbimgs">
                            <!-- :before-upload="beforeUpload"  -->
                            <el-upload
                                ref="lbt"
                                class="avatar-uploader lbtAvatar"
                                action=""
                                list-type="picture-card"
                                :auto-upload="false"
                                :on-remove="handleRemove"
                                :on-change="getFileList"
                                :file-list="formData.img"
                                :limit="3">
                                <img v-if="currentBaseImg1" :src="currentBaseImg1" class="avatar" width="145" height="145">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                             </el-upload>
                             <div>最多可上传5张图片</div>
                        </el-form-item>

                        <el-form-item label="课程简介：" prop="CourseIntroduction">
                            <el-input type="textarea" v-model="ruleForm.CourseIntroduction"></el-input>
                        </el-form-item>
                        <el-form-item label="图文详情(可选)：" prop="GraphicDetails">
                        <el-input type="textarea" v-model="ruleForm.GraphicDetails"></el-input>
                         </el-form-item>
                        <el-form-item label="训练效果(可选)：" prop="TrainingEffect">
                            <el-input type="textarea" v-model="ruleForm.TrainingEffect"></el-input>
                        </el-form-item>
                        <el-form-item label="适合人群(可选)：" prop="SuitsTheCrowd">
                            <el-input type="textarea" v-model="ruleForm.SuitsTheCrowd"></el-input>
                        </el-form-item>
                        <el-form-item label="注意事项(可选)：" prop="MattersNeedingAttention">
                            <el-input type="textarea" v-model="ruleForm.MattersNeedingAttention"></el-input>
                        </el-form-item>



                        <el-form-item label="难度/级别：">
                          <el-select filter v-model="ruleForm.LevelID"    >
                            <el-option v-for="item in Level" :value="item.ID" :label="item.LevelName" :key="item.index">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="难度：" prop="difficulty">
                             <el-rate style="margin-top:10px;" v-model="ruleForm.difficulty"></el-rate>
                          </el-form-item>
                        <el-form-item label="关联授课老师：" prop="TeacherName">
                              <span @click="addeacherIDs" class="set-link">选择授课老师</span>
                              <br>
                          <span >{{ruleForm.TeacherName}}</span>
                          </el-form-item>
                        <el-form-item  label="是否是精品课程：" prop="isJP">
                        <el-radio-group v-model="ruleForm.isJP">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        </el-form-item>



                </el-form>

                 <div class="login-content">
                  <span class="login-btn" @click="submitForm">确认提交</span>
                 </div>

 <el-dialog
      title="选择老师"
      :visible.sync="dialoglaoshiVisible"
      width="80%"
        >
            <el-table :data="teacherList" ref="tableData" :row-key="(row) => {return row.ID}" :header-cell-style="{'background-color':'#f8f8f8'}" style="width:300px" @selection-change="handleSelectionChange" >
              <el-table-column type="selection" width="55" > </el-table-column>
                 <el-table-column label="老师姓名" prop="Name" ></el-table-column>
                <el-table-column label="手机号" prop="Phone" ></el-table-column>
             </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialoglaoshiVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="doxuanhao">确 认</el-button>
      </span>
    </el-dialog>
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
  .set-link {
    display: inline-block;
    margin-left: 8px;
    color: #409EFF;
    cursor: pointer;
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
  import { AddwxCourse,WXUploadimg,getwxListLevel,getListTeacher } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
       ruleForm:{
                    StoresID:localStorage.getItem("storesid"),
                    iscolor:localStorage.getItem("iscolor"),
                     color:"rgba(255, 69, 0, 0.68)",
                    CourseName:"",
                    HeadUrl:"",
                    lbimgs:"",
                    CourseIntroduction:"",
                    GraphicDetails:"",
                    TrainingEffect:"",
                    SuitsTheCrowd:"",
                    MattersNeedingAttention:"",
                    // ListLevel:1,
                    LevelID:"",
                    TeacherName:"",
                    TeacherIDs:"",
                    difficulty:3,
                    isJP:"1",
                    integral:"0"
                },
                rules:{
                    CourseName: [{required:true, message:'请输入课程名称', trigger:'blur'}],
                    HeadUrl:[{required:true}],
                    // CourseBanner:[{required:true}],
                    CourseIntroduction: [{required:true, message:'请输入课程简介', trigger:'blur'}]
                },
                  predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
                currentBaseImg:"",
                currentBaseImg2:"",
                currentBaseImg1:"",
                lbtList:[],
                formData: {
                    img: []  // 这里的必须是一个数组，才能正确回显，并且对象中要有name，url，uid
                },
                levelMin:0,
                levelMax:0,
                levelMarks:{},
                Level:[],
                levelValue:0,
                TeacherIDs:"",
                isTeacherID:false,
                teacherList:[],
                dialoglaoshiVisible:false,
                multipleSelection:[],


      };
    },
    inject:['reload'],
    created() {
        this.getLevel();
      },
    computed: {
    },
    components:{
        message
     },
    mounted() {

    },
    methods: {
        async getLevel (){
                const crs = await getwxListLevel()
                // debugger
                // console.log(crs)
                if(crs.orsuccess == '1'){
                    this.Level = crs.data;
                    this.levelMin = 0;
                    this.levelMax = this.Level.length-1;
                    // this.levelMarks;
                    this.Level.forEach((item,index) =>{
                        item.isEdit = false;
                        this.levelMarks[index] = item.LevelName
                    })
                 }
            },
       submitForm(){

            this.AddwxCourse();
       },async AddwxCourse(){
              let list =[]
                this.formData.img.forEach((item,index) =>{
                    list.push(item.url)
                })
                this.ruleForm.lbimgs= list.join()
                const crs = await AddwxCourse(this.ruleForm)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
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
            },
            // 顺序上传单张图片
            async uploadImage2(){
                const crs = await WXUploadimg({
                     TeacherID:localStorage.getItem("teacherID"),
                     StudentID:localStorage.getItem("studentID"),
                     StoresID:localStorage.getItem("storesid"),
                    imgdate:this.currentBaseImg2
                })
                if(crs.orsuccess == '1'){
                    this.$message({ type: "success", message: crs.Msg });
                    this.formData.img.push({url:crs.imgFile})
                }else{
                    this.$message({ type: "error", message: crs.Msg });
                }
            },
            handleRemove(file, fileList) {
                this.formData.img = fileList;
                // console.log(file, fileList);
            },
            getFileList(file) {
                this.getBase64(file.raw).then(res => {
                    this.currentBaseImg2 = res;
                    this.uploadImage2();
                });
            },
            changeSlider(val){
                this.Level.forEach((item,index) =>{
                    if(index == val){
                        this.ruleForm.LevelID = item.ID
                        return;
                    }
                })
            },addeacherIDs(){
                this.TeacherIDs = this.ruleForm.TeacherIDs;
                 this.getListTeacher();
            } ,async getListTeacher(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListTeacher({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.teacherList = crs.data
          this.dialoglaoshiVisible=true;

           this.toggleSelection(this.teacherList);

          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },doxuanhao(){
                let arr = [];
                let arrname = [];
                this.multipleSelection.forEach(element => {
                    arr.push(element.ID);
                    arrname.push(element.Name);
                });
                 if(arr.length>0){

                         this.ruleForm.TeacherIDs = arr.join();
                         this.ruleForm.TeacherName= arrname.join();



                }else{


                         this.ruleForm.TeacherIDs="";
                         this.ruleForm.TeacherName= "";


                }


                    this.dialoglaoshiVisible =false;


            },toggleSelection (rows) {
                 let arr = []
                 let allPermission = this.TeacherIDs.split(',');

                 rows.forEach(item => {
                    allPermission.forEach(element =>{


                 if (element === item.ID) {
                       arr.push(item)
                    }
                   })
                })

             if (arr) {
                   this.$nextTick(() => {
               arr.forEach(row => {
                 this.$refs.tableData.toggleRowSelection(row,true);
              });
              })
                } else {
                 this.$refs.tableData.clearSelection()
                }
            },handleSelectionChange(val){
                this.multipleSelection = val;

            }

    }
  };
</script>
