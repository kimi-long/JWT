
<template>
  <div  style="padding:24px;" >
   <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="top">
                    <el-form-item label="门店：" prop="StoresID">
                        <el-radio-group v-model="ruleForm.StoresID">
                            <el-radio v-for="item in storeList" :label="item.ID" :key="item.index">
                                {{item.StoresName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="会员卡名称：" prop="CardName">
                        <el-input v-model="ruleForm.CardName" placeholder="请输入会员卡名称" style="width:200px;"></el-input>
                    </el-form-item>
                     <el-form-item label="售卖价格：" prop="SellingPrice" >
                        <el-input v-model="ruleForm.SellingPrice" placeholder="售卖价格" style="width:100px;"></el-input> 元
                    </el-form-item>
                    <el-form-item label="备注信息：" prop="Note">
                       <el-input type="textarea" style="width:200px;" v-model="ruleForm.Note"></el-input>
                    </el-form-item>
                    <el-form-item label="会员卡类型：" prop="CardType" >
                         <el-select   v-model="ruleForm.CardType"   @change="changeOptions" >
                            <el-option v-for="item in CardTypeList" :value="item.ID" :label="item.TypeName" :key="item.index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="会员卡背景：" prop="CardImg">
                      <div class="circle">
                        <ul class="circle-ul">
                          <li v-for="(item) of ListCradImg" :key="item.ID" class="circle-li" style="margin-right: 5px">
                            <el-radio v-model="radio" :label="item.ID">
                              <div style="display: inline-block" v-on:click="changeList(item.ID)" v-bind:class="{changeBorder:item.ID==ruleForm.CardImg}" value="change!">
                                <img :src="item.CradImg" style="width: 32VW;padding-top: 5px;margin-left: 20px;cursor:pointer" alt />
                              </div>
                            </el-radio>
                          </li>
                        </ul>
                      </div>
                    </el-form-item>
                    <el-form-item label="可用次数："  v-if="showKynumber" prop="Kynumber" >
                        <el-input v-model="ruleForm.Kynumber" placeholder="可用次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="有效天数："  v-if="showyxdays"  prop="yxdays" >
                        <el-input v-model="ruleForm.yxdays" placeholder="有效天数" style="width:100px;"></el-input> 天
                    </el-form-item>
                    <el-form-item label="充值金额："  v-if="showAmount" prop="Amount" >
                        <el-input v-model="ruleForm.Amount" placeholder="充值金额" style="width:100px;"></el-input> 元
                    </el-form-item>
                    <el-form-item label="该卡支持所上课程：" prop="CourseIDs">
                              <span @click="addCourseIDs" class="set-link">选择课程</span>
                              <br>
                          <span >{{ruleForm.CourseName}}</span>
                   </el-form-item>
                </el-form>

                 <div class="login-content">
                  <span class="login-btn" @click="submitForm">确认提交</span>
                 </div>
 <el-dialog
      title="选择课程"
      :visible.sync="dialoglaoshiVisible"
      width="100%"
        >
            <el-table max-height="280" :data="courseList" ref="docTable" :row-key="(row) => {return row.ID}" :header-cell-style="{'background-color':'#f8f8f8'}" style="width:100%;margin-top:10px;" @selection-change="handleSelectionChange" >
              <el-table-column type="selection" width="55" > </el-table-column>
                <el-table-column label="课程姓名" prop="CourseName" ></el-table-column>
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
  .el-button--default {
    height: 40px;

  }
.set-link {
    display: inline-block;
    margin-left: 8px;
    color: #409EFF;
    cursor: pointer;
}
     .circle{
  position: relative;
  left: 1px;
}
.circle-ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
 }
.circle-li {
  margin-right: 20px;
  list-style: none;
  margin-bottom: 20px;
  display: contents;
}
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
  import { stuGetListStoresName,addwxMemberCard,getListCradImg,getwxlistCourse } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        radio:'',
        isEdit:true,
        showKynumber:true,
        showyxdays:true,
        showAmount:false,
        dialoglaoshiVisible:false,
        storeList:[],
        ListCradImg:[],
        CardTypeList:[],
        multipleSelection:[],
        courseList:[],
        a:"",
        CourseIDs:"",
                CardTypeList:[
                    {
                        ID:"1",
                        TypeName:"次卡（有期限）"
                    },
                    {
                        ID:"2",
                        TypeName:"次卡（无限期）"
                    },
                    {
                        ID:"3",
                        TypeName:"期限卡（不限次数）"
                    },
                    {
                        ID:"4",
                        TypeName:"储蓄卡（无限期）"
                    },
                ],
        ruleForm:{
                    MemberCardID: "",
                    StoresID: localStorage.getItem("storesid"),
                    CardName: "",
                    SellingPrice: "0",
                    Note: "",
                    CardType: "1",
                    Kynumber: "0",
                    yxdays: "0",
                    Amount: "0",
                    CourseName: "",
                    CourseIDs:"",
                    CardImg:"",
                    isBuy:"0",
                    preferentialType:"0",
                    preferentialvalue:"",
                    preferentialAmount:"",
                    Info:"",
                },
                rules:{
                    CardName: [{required: true, message:'请输入会员卡名称', trigger: 'blur' }],


                }

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
          this.$store.commit('fullLoadingFun',false);
          this.getListCradImg();
          }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },changeOptions(val){
                console.log(val)
                if(val ==1){
                this.showKynumber= true;
                this.showyxdays=true;
                this.showAmount=false;

                }else if(val ==2){
                this.showKynumber= true;
                this.showyxdays=false;
                this.showAmount= false;

                }else if(val ==3){
                this.showKynumber= false;
                this.showyxdays= true;
                this.showAmount=false;

                }else if(val ==4){

                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount= true;
                }

            },
       submitForm(){

            this.addwxMembers();
       },async addwxMembers(){
                if(this.ruleForm.CardType  =='1'){

                this.ruleForm.Amount='0';

                }else if(this.ruleForm.CardType  =='2'){
                this.ruleForm.yxdays='0';
                this.ruleForm.Amount='0';

                }else if(this.ruleForm.CardType  =='3'){
                this.ruleForm.Kynumber='0';
                this.ruleForm.Amount='0';

                }else if(this.ruleForm.CardType  =='4'){

                this.ruleForm.Kynumber='0';
                this.ruleForm.yxdays='0';
                }
                const crs = await addwxMemberCard(this.ruleForm)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            },changeList(id){
             if(this.a == id){
                 this.ruleForm.CardImg =! this.ruleForm.CardImg;
             }else{
                this.ruleForm.CardImg =id;
            }
            },
             async getListCradImg (){
                const crs = await getListCradImg()
                // console.log(crs)
                if(crs.orsuccess == '1'){
                    this.ListCradImg = crs.data;
                    this.radio = this.ListCradImg[0].ID;
                  this.ruleForm.CardImg = this.ListCradImg[0].ID;
                    if(!this.isEdit){
                        for (let i = 0; i < crs.data.length; i++) {
                        if(i==0){

                            this.ruleForm.CardImg =crs.data[0].ID;
                        }
                      }
                    }

                 }
            },addCourseIDs(){
                 this.CourseIDs =  this.ruleForm.CourseIDs;

                 this.getwxlistCourse();
            }, async getwxlistCourse(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getwxlistCourse({
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
          this.courseList = crs.data
         this.dialoglaoshiVisible =true;
             this.toggleSelection(this.courseList);

          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },handleSelectionChange(val){
                this.multipleSelection = val;
            },doxuanhao(){
                let arr = [];
                let arrname = [];
                this.multipleSelection.forEach(element => {
                    arr.push(element.ID);
                    arrname.push(element.CourseName);
                });
                 if(arr.length>0){

                         this.ruleForm.CourseIDs = arr.join();
                         this.ruleForm.CourseName= arrname.join();

                }else{

                         this.ruleForm.CourseIDs="";
                         this.ruleForm.CourseName= "";

                }

                        this.dialoglaoshiVisible =false;



            },toggleSelection (rows) {
                 let arr = []
                 let allPermission = this.CourseIDs.split(',');

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
                 this.$refs.docTable.toggleRowSelection(row,true);
              });
              })
                } else {
                 this.$refs.docTable.clearSelection()
                }
                }

    }
  };
</script>
