
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
                    </el-form-item>
                     <el-form-item label="出生日期：" prop="Birthday">
                     <el-input  type="date" v-model="ruleForm.Birthday" > </el-input>
                     </el-form-item>

                    <el-form-item label="地址：" prop="Address">
                        <el-input v-model="ruleForm.Address" placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item label="是否绑卡："   prop="Isbangka">
                        <el-radio-group v-model="ruleForm.Isbangka" @change="changebangka">
                            <el-radio v-for="item in BankaList" :label="item.ID" :key="item.index">
                                {{item.TypeName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选择会员卡：" v-if="showCardID"  prop="CardID1">
                        <el-select v-model="ruleForm.CardName" filterable  @change="changeCardID1"  placeholder="请选择会员卡">
                            <el-option v-for="item in MemberCardList" :key="item.index" :label="item.CardName +'/￥'+item.SellingPrice "  :value="item.ID+','+item.CardType+','+item.CardName+','+item.Kynumber+','+item.yxdays +','+item.Amount+','+item.SellingPrice">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="是否开卡：" v-if="showCardNum " >
                             <el-radio-group v-model="ruleForm.iskaika" >
                                <el-radio label="1">立即开卡</el-radio>
                                <el-radio label="0">暂不开卡</el-radio>
                            </el-radio-group>
                    </el-form-item>
                    <el-form-item label="开卡日期："  v-if="showCardNum && ruleForm.iskaika =='1'" prop="KaiKaTime">
                        <el-date-picker
                            <el-input  type="date" v-model="ruleForm.KaiKaTime" @change='selectData1(ruleForm)' > </el-input>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="会员卡号："  v-if="showCardNum && khIson=='1'" prop="CardNum">
                        <el-input v-model="ruleForm.CardNum" placeholder="请输入会员卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="购买次数："  v-if="showKynumber  " prop="buyCount" >
                        <el-input v-model="ruleForm.buyCount" placeholder="购买次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="可用次数："  v-if="showKynumber  " prop="CardNumber" >
                        <el-input v-model="ruleForm.CardNumber" placeholder="可用次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="有效天数："  v-if="showyxdays  "  prop="CardDays" >
                        <el-input v-model="ruleForm.CardDays" placeholder="有效天数"  v-on:input="inputSubtotal(ruleForm)" style="width:100px;"></el-input> 天
                    </el-form-item>
                    <el-form-item label="到期时间："  v-if="showCardNum && ruleForm.iskaika =='1' && (ruleForm.CardType==1 || ruleForm.CardType==3)" prop="EndTime">
                         <span>{{ruleForm.EndTime}}</span>
                    </el-form-item>
                    <el-form-item label="充值金额："  v-if="showAmount  " prop="Amount" >
                        <el-input v-model="ruleForm.Amount" placeholder="充值金额" style="width:100px;"></el-input> 元
                    </el-form-item>
                    <el-form-item label="应收金额："  v-if="showPurchaseAmount  " prop="YSAmount" >
                        <el-input v-if="isgoumaijine==1" v-model="ruleForm.YSAmount" placeholder="应收金额：" style="width:100px;"></el-input>
                        <span v-if="isgoumaijine==1">元</span>
                         <span  v-if="isgoumaijine==0">{{ruleForm.YSAmount}}元</span>
                    </el-form-item>
                    <el-form-item label="实收金额："  v-if="showPurchaseAmount  " prop="PurchaseAmount" >
                        <el-input v-if="isgoumaijine==1"  v-model="ruleForm.PurchaseAmount" placeholder="实收金额" style="width:100px;"></el-input> 元
                       <span v-if="isgoumaijine==1">元</span>
                         <span  v-if="isgoumaijine==0">{{ruleForm.PurchaseAmount}}元</span>
                    </el-form-item>
                    <el-form-item label="备注：" prop="Note">
                        <el-input   type="textarea"v-model="ruleForm.Note"></el-input>
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
  import { stuGetListStoresName,addwxMembers,getListwxMemberCard } from "@/api/getData";
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
        khIson:localStorage.getItem("khIson"),
        isgoumaijine:localStorage.getItem("isgoumaijine"),
        ruleForm:{
                    StoresID: localStorage.getItem("storesid"),
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
                    PurchaseAmount:"",
                    iskaika:"1",
                    KaiKaTime:"",
                    EndTime:"",
                    buyCount:"" ,
                    YSAmount:"" ,
                    LoginID:"",


                },
                rules:{
                    Name: [{required: true, message:'请输入姓名', trigger: 'blur' }],
                    Phone: [{required: true, message:'请输入手机号', trigger: 'blur' }],
                    CardNum: [{required: true, message:'请输入会员卡号', trigger: 'blur' }],


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
          this.getListwxMemberCard();
           }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      } ,async getListwxMemberCard(){
           const crs = await getListwxMemberCard({StoresID:localStorage.getItem("storesid")})
                              if(crs.orsuccess == '1'){
                                this.MemberCardList = crs.data;
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
                  this.ruleForm.buyCount = arr1[3];
                  this.ruleForm.CardDays = arr1[4];
                  this.ruleForm.Amount = arr1[5];
                  this.ruleForm.PurchaseAmount = arr1[6];
                  this.ruleForm.YSAmount = arr1[6];

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
       submitForm(formName){
            this.$refs[formName].validate(async valid => {
                        if (valid) {
                            this.addwxMembers();
                        } else {
                            return false;
                        }
                    });
        },async addwxMembers(){

                const crs = await addwxMembers(this.ruleForm)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.$router.go(-1);//返回上一层
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            },selectData1(val){
                //alert(val.KaiKaTime)
                if(val.CardType==1 || val.CardType==3){
                    var date = new Date(val.KaiKaTime);//比如sourceDate传参“2019-03-31”
                    var buycount = parseInt(val.CardDays);
                    date.setDate(date.getDate() + buycount);
                    var year=date.getFullYear();
	     	        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	    	        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();

                    val.EndTime = year+"-"+month+"-"+day;
                }

            },inputSubtotal(val){

                    if(val !=''){
                           if(val.CardType==1 || val.CardType==3){
                    var date = new Date(val.KaiKaTime);//比如sourceDate传参“2019-03-31”
                     var buycount = parseInt(val.CardDays);

                     date.setDate(date.getDate() + buycount);
                    var year=date.getFullYear();
	     	        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	    	        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                    val.EndTime = year+"-"+month+"-"+day;
                    }
                    }

                }

    }
  };
</script>
