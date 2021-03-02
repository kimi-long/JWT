
<template>
  <div  style="padding:24px;" >
   <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="right">
                    <el-form-item label="门店：" prop="StoresID">
                        <el-radio-group v-model="ruleForm.StoresID">
                            <el-radio v-for="item in storeList" :label="item.ID" :key="item.index">
                                {{item.StoresName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                  <el-form-item label="姓名：" prop="Name">
                        <el-input v-model="ruleForm.Name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="Phone">
                        <el-input v-model="ruleForm.Phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>


                    <el-form-item label="登记日期：" prop="OpenTime">
                           <el-input  type="date" v-model="ruleForm.OpenTime" > </el-input>

                    </el-form-item>
                   <el-form-item label="性别：" prop="Sex">
                        <el-radio-group v-model="ruleForm.Sex"  >
                            <el-radio v-for="item in SexList" :label="item.ID" :key="item.index">
                                {{item.TypeName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生日期：" prop="Birthday">
                         <el-input  type="date" v-model="ruleForm.Birthday" > </el-input>

                    </el-form-item>
                    <el-form-item label="地址：" prop="Address">
                        <el-input v-model="ruleForm.Address" placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="Note">
                        <el-input v-model="ruleForm.Note"></el-input>
                    </el-form-item>

                </el-form>

                 <div class="login-content">
                  <span class="login-btn" @click="submitForm">确认提交</span>
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
  import { stuGetListStoresName,editwxMembers,getwxMembersInfo } from "@/api/getData";
  import message from "@/components/message";
  export default {
    data() {
      return {
        showCardNum:false,
        showKynumber:false,

                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    },

                    ]
                },
        showyxdays:false,
        showAmount:false,
        showPurchaseAmount:false,
        showCardID:true,
        storeList:[],
        SexList:[
                    {
                        ID:"1",
                        TypeName:"男"
                    },
                    {
                        ID:"2",
                        TypeName:"女"
                    },

                ],
        BankaList:[
                    {
                        ID:"1",
                        TypeName:"是"
                    },
                    {
                        ID:"2",
                        TypeName:"否"
                    },

                ],
        MemberCardList:[],
        ruleForm:{
                    StoresID: "",
                    Name: "",
                    Phone:"",
                    OpenTime:"",
                    Birthday:"",
                    Address: "",
                    Note: "",
                    isSource:"1",
                    Sex: "1",
                    Isbangka: "1",
                    CardNum:"",
                    CardNumber:"",
                    CardDays:"",
                    Amount:"",
                    sourceID:localStorage.getItem("teacherID"),
                    sourceName:localStorage.getItem("teacherName"),
                    CardID:"",
                    CardName:"",
                    CardType:"",
                    PurchaseAmount:""


                },
                rules:{
                    Name: [{required: true, message:'请输入姓名', trigger: 'blur' }],
                    Phone: [{required: true, message:'请输入手机号', trigger: 'blur' }],
                    CardNum: [{required: true, message:'请输入会员卡号', trigger: 'blur' }],


                },
                MembersID:localStorage.getItem("MembersID"),


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
          this.getwxMembersInfo();
           }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },async getwxMembersInfo(){
           const crs = await getwxMembersInfo({MembersID:this.MembersID})
                              if(crs.orsuccess == '1'){
                                this.ruleForm = crs.data.info;
                                this.$store.commit('fullLoadingFun',false);

                              }else
                              {

                     this.$refs.messageChild.toast(crs.Msg)
                    this.$store.commit('fullLoadingFun',false);

                              }
      },changeCardID1(val){
                console.log(val)
                  let arr1 = val.split(",");
                  if(arr1.length > 6){
                  this.ruleForm.CardID = arr1[0];
                  this.ruleForm.CardType = arr1[1];
                  this.ruleForm.CardName = arr1[2];
                  this.ruleForm.CardNumber = arr1[3];
                  this.ruleForm.CardDays = arr1[4];
                  this.ruleForm.Amount = arr1[5];
                  this.ruleForm.PurchaseAmount = arr1[6];

                this.showCardNum=true;
                this.showPurchaseAmount=true;

                let CardType = arr1[1];

                if(CardType  ==1){
                this.showKynumber= true;
                this.showyxdays=true;
                this.showAmount=false;


                }else if(CardType  ==2){
                this.showKynumber= true;
                this.showyxdays=false;
                this.showAmount= false;

                }else if(CardType  ==3){
                this.showKynumber= false;
                this.showyxdays= true;
                this.showAmount=false;

                }else if(CardType  ==4){

                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount= true;

                }

                 }


            },changebangka(val){
               if(val=='1'){
                    this.showCardID=true;
               }else{
                this.showCardNum=false;
                this.showPurchaseAmount=false;
                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount=false;
                this.isEdit = false;
                    this.showCardID=false;

               }
            },
       submitForm(){

            this.editwxMembers();
       },async editwxMembers(){
             this.ruleForm.MembersID = this.MembersID;
                const crs = await editwxMembers(this.ruleForm)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            }

    }
  };
</script>
