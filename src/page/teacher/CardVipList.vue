<template>
  <div class="padding-bottom">

    <div class="stu-order-list stu-order-list2" v-for="items in MemberCardList" >
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">

          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.CardName}}</span>&nbsp;
              <span v-if="items.iskaika === '0'">未开卡</span>&nbsp;
              <span v-if="items.iskaika === '1'">已开卡</span>&nbsp;
              <span v-if="items.CardType === '1'">次卡（有期限）</span>
              <span v-if="items.CardType === '2'">次卡（无限期）</span>
              <span v-if="items.CardType === '3'">期限卡（不限次数）</span>
              <span v-if="items.CardType === '4'">储蓄卡（无限期）</span>
            </p>
            <p>{{items.SellingPrice}}</p>
          </div>
          <div class="stu-order-list-right-btn isActive" @click="openAction(items)">
            <span>操作</span>
          </div>
          <!--<div class="stu-order-list-right-btn isActive" @click="toStuTeacherDetails(items)">-->
            <!--<span>编辑</span>-->
          <!--</div>-->
        <!--<div class="stu-order-list-right-btn isActive" @click="xukaClick(items)">-->
            <!--<span>续卡</span>-->
          <!--</div>-->
           <!--<div class="stu-order-list-right-btn isActive" @click="deleteMemberClick(items.ID)">-->
            <!--<span>删除</span>-->
          <!--</div>-->

         </div>
      </div>
    </div>
     <el-dialog
      title="提示"
      :visible.sync="dialogdelVisible"
      width="80%"
      center
      >
       <span slot="title">
        <p>
          删除提醒
        </p>
      </span>
      <div>
            是否确定将会员卡删除？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogdelVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="dodel">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改会员卡"
      :visible.sync="dialohykVisible"
      width="100%"
      center
      >
      <div style="height: 280px;overflow-y: auto">
        <el-form :model="ruleFormfakaClass" ref="ruleFormfakaClass" :rules="rulesfakaClass" label-width="100px" label-position="top">
          <el-form-item label="会员卡名称：" prop="CardNum">
            <span>{{ruleFormfakaClass.CardName}}</span>
          </el-form-item>
          <el-form-item label="是否开卡：" v-if="iskaika=='0'" >
            <el-radio-group v-model="ruleFormfakaClass.iskaika" >
              <el-radio label="1">立即开卡</el-radio>
              <el-radio label="0">暂不开卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开卡日期：" v-if="ruleFormfakaClass.iskaika=='1'"  prop="KaiKaTime">
            <el-input  type="date" v-model="ruleFormfakaClass.KaiKaTime" @change='selectData2(ruleFormfakaClass)' > </el-input>
          </el-form-item>
          <el-form-item label="可用次数："  v-if="showKynumber" >
            <el-input v-model="ruleFormfakaClass.CardNumber" placeholder="可用次数" style="width:100px;"></el-input> 次
          </el-form-item>
          <el-form-item label="到期时间："  v-if="showyxdays"  >
            <span>{{ruleFormfakaClass.EndTime}}</span>
          </el-form-item>
          <el-form-item label="有效天数："  v-if="showyxdays"  prop="CardDays" >
            <el-input v-model="ruleFormfakaClass.CardDays" v-on:input="inputSubtotal1(ruleFormfakaClass)" placeholder="有效天数" style="width:100px;"></el-input> 天
          </el-form-item>
          <el-form-item label="充值金额："  v-if="showAmount">
            <el-input v-model="ruleFormfakaClass.Amount" placeholder="充值金额" style="width:100px;"></el-input> 元
          </el-form-item>
          <el-form-item label="备注信息：" >
            <el-input type="textarea" v-model="ruleFormfakaClass.Note"></el-input>
          </el-form-item>
        </el-form>
      </div>

       <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialohykVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submithyk">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="续卡"
      :visible.sync="dialohxkVisible"
      width="100%"
      center
      >
           <el-form :model="ruleFormxukaClass" ref="ruleFormxukaClass" :rules="rulesxukaClass" label-width="100px" label-position="top">
                    <el-form-item label="会员卡：" >
                       <span>{{ruleFormxukaClass.CardName}}</span>
                    </el-form-item>
                    <el-form-item label="可用次数：" v-if=" ruleFormxukaClass.CardType==1 || ruleFormxukaClass.CardType==2 "  prop="CardNumber" >
                        <el-input v-model="ruleFormxukaClass.CardNumber" placeholder="可用次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="有效天数："  v-if=" ruleFormxukaClass.CardType==1 || ruleFormxukaClass.CardType==3 "  prop="CardDays" >
                        <el-input v-model="ruleFormxukaClass.CardDays" v-on:input="inputSubtotal4(ruleFormxukaClass)" placeholder="有效天数" style="width:100px;"></el-input> 天
                    </el-form-item>
                    <el-form-item label="到期时间："  v-if=" ruleFormxukaClass.CardType==1 || ruleFormxukaClass.CardType==3 " prop="EndTime">
                         <span>{{ruleFormxukaClass.EndTime}}</span>
                    </el-form-item>
                    <el-form-item label="充值金额："   v-if=" ruleFormxukaClass.CardType==4  " prop="Amount" >
                        <el-input v-model="ruleFormxukaClass.Amount" placeholder="充值金额" style="width:100px;"></el-input> 元
                    </el-form-item>
                    <el-form-item label="应收金额：" prop="YSAmount" >
                        <el-input v-model="ruleFormxukaClass.YSAmount" v-if="isgoumaijine==1" placeholder="应收金额" style="width:100px;"></el-input>
                        <span v-if="isgoumaijine==1">元</span>
                         <span  v-if="isgoumaijine==0">{{ruleFormxukaClass.YSAmount}}元</span>
                    </el-form-item>
                    <el-form-item label="实收金额：" prop="PurchaseAmount" >
                        <el-input v-model="ruleFormxukaClass.PurchaseAmount"  v-if="isgoumaijine==1" placeholder="实收金额" style="width:100px;"></el-input>
                          <span v-if="isgoumaijine==1">元</span>
                         <span  v-if="isgoumaijine==0">{{ruleFormxukaClass.YSAmount}}元</span>
                    </el-form-item>
                      <el-form-item label="备注信息：" prop="Note">
                       <el-input type="textarea" v-model="ruleFormxukaClass.Note"></el-input>
                    </el-form-item>

                </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialohxkVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submithxk('ruleFormxukaClass')">确 认</el-button>
      </span>
    </el-dialog>
            <message ref="messageChild"></message>
    <van-action-sheet
      v-model="actionshow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="operation"
    />
   </div>
</template>
<style scoped>
.el-button--medium {
    padding: 5px 20px;
    font-size: 12px;
    border-radius: 4px;
}
.el-button--primary {
    color: #FFF;
    background-color: rgb(72, 175, 249);
    border-color: rgb(72, 175, 249);
}

</style>
<script>

   import { getwxListMembersvip,delwxMembersvip,editWXCardNumber,getwxMemberCard,addwxMembersvipXK } from "@/api/getData";
  import message from "@/components/message";
  export default {
     data () {
      return {
          actionLine: {},
          actionshow: false,
          actions: [{name: '编辑'},{name:'续卡'}, {name: '删除'}],
          MemberCardList:[],
          dialogdelVisible:false,
          dialohykVisible:false,
          dialohxkVisible:false,
          MembersID:localStorage.getItem("MembersID"),
          selectedStore:localStorage.getItem("storesid"),
          isgoumaijine:localStorage.getItem("isgoumaijine"),
          showKynumber:false,
          showyxdays:false,
          showAmount:false,
          iskaika:"0",
          ruleFormfakaClass:{
                    CardName:"",
                    MembersvipID:"",
                    CardNumber:"",
                    Amount:"",
                    OverdueTime:"",
                    CardType:"",
                    CardDays:"",
                    Note:"",
                    oldCardNumber:"",
                    sourceID:localStorage.getItem("teacherID"),
                    sourceName:localStorage.getItem("teacherName"),
                    oldAmount:"",
                    oldOverdueTime:"" ,
                    iskaika:"0",
                    KaiKaTime:"",
                    EndTime:""
                },
                rulesfakaClass:{
                 },
                 ruleFormxukaClass:{
                    StoresID:"",
                    CardType:"",
                    CardNumber:"",
                    CardDays:"",
                    CardName:"",
                    Amount:"",
                    PurchaseAmount:"",
                    MembersvipID:"",
                    OverdueTime:"",
                    EndTime:"",
                    sourceID:localStorage.getItem("teacherID"),
                    sourceName:localStorage.getItem("teacherName"),
                    Note:"" ,
                    LoginID:""
                },
                rulesxukaClass:{
                     CardNumber: [{required: true, message:'请输入数量', trigger: 'blur' }],
                     CardDays: [{required: true, message:'请输入天数', trigger: 'blur' }],
                     Amount: [{required: true, message:'请输入金额', trigger: 'blur' }],
                     PurchaseAmount: [{required: true, message:'请输入购买价格', trigger: 'blur' }],
                }

        }
    },
    computed:{

    },
    components:{
      message
     },
    mounted(){
     },
    created(){
        this.getwxListMembersvip();
   },
    methods:{
      operation(item) {

        if(item.name == '编辑'){
          this.toStuTeacherDetails(this.actionLine);
        }else if(item.name == '删除'){
          this.deleteMemberClick(this.actionLine.ID);
        }else if(item.name == '续卡'){
          this.xukaClick(this.actionLine);
        }
      },
      openAction(item) {
        this.actionshow = true;
        this.actionLine = item;
      },
      async getwxListMembersvip(){
              const crs = await getwxListMembersvip(
                  {
                   StoresID:this.selectedStore,
                   MembersID:this.MembersID
                  })
                  if(crs.orsuccess == '1'){
                       this.MemberCardList = crs.data;

                  }else
                     {

                    alert(crs.Msg);

                     }

            },editMemberClick(id){

            },deleteMemberClick(id){
                this.seleCradID = id;
                this.dialogdelVisible=true;

            },dodel(){
                  this.delwxMembersvip(this.seleCradID);

            }, async delwxMembersvip(id){
                  const crs = await delwxMembersvip({
                       MembersvipID:id,
                       sourceID:localStorage.getItem("teacherID"),
                       sourceName:localStorage.getItem("teacherName"),
                       Note:''
                    })
                 if(crs.orsuccess == '1'){

                    this.dialogdelVisible=false;
                    this.getwxListMembersvip();

                  this.$refs.messageChild.toast(crs.Msg)

                }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
            },
      toStuTeacherDetails(items){
        this.iskaika = items.iskaika;
         this.ruleFormfakaClass={
                    CardName:items.CardName,
                    MembersvipID:items.ID,
                    CardNumber:items.CardNumber,
                    Amount:items.Amount,
                    OverdueTime:items.OverdueTime,
                    CardType:items.CardType,
                    CardDays:items.CardDays,
                    Note:"",
                    oldCardNumber:items.CardNumber,
                    sourceID:localStorage.getItem("teacherID"),
                    sourceName:localStorage.getItem("teacherName"),
                    oldAmount:items.Amount,
                    oldOverdueTime:items.OverdueTime ,
                    iskaika:items.iskaika,
                    KaiKaTime:items.KaiKaTime,
                    EndTime:items.OverdueTime
                }

                if(items.CardType  ==1){
                this.showKynumber= true;
                this.showyxdays=true;
                this.showAmount=false;


                }else if(items.CardType  ==2){
                this.showKynumber= true;
                this.showyxdays=false;
                this.showAmount= false;

                }else if(items.CardType  ==3){
                this.showKynumber= false;
                this.showyxdays= true;
                this.showAmount=false;

                }else if(items.CardType  ==4){

                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount= true;

                }

                this.dialohykVisible = true;
      },submithyk(){
        this.editWXCardNumber();

      },async editWXCardNumber(){

             const crs = await editWXCardNumber(this.ruleFormfakaClass)
                // console.log(crs)
                if(crs.orsuccess == '1'){
                  this.getwxListMembersvip();
                     this.dialohykVisible = false;
                 }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
      },selectData2(val){


                if(val.CardType==1 || val.CardType==3){
                    var date = new Date(val.KaiKaTime);//比如sourceDate传参“2019-03-31”
                    var buycount = parseInt(val.CardDays);
                    date.setDate(date.getDate() + buycount);
                    var year=date.getFullYear();
	     	        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	    	        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();

                    val.EndTime = year+"-"+month+"-"+day;
                }
            },inputSubtotal1(val){
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

                },xukaClick(vipitem){
                this.ruleFormxukaClass={
                    StoresID:this.selectedStore,
                    CardType:vipitem.CardType,
                    CardNumber:"",
                    CardDays:"",
                    CardName:vipitem.CardName,
                    Amount:"",
                    PurchaseAmount:"",
                    MembersvipID:vipitem.ID,
                    OverdueTime:vipitem.OverdueTime,
                    EndTime:"",
                    sourceID:localStorage.getItem("teacherID"),
                    sourceName:localStorage.getItem("teacherName"),
                    Note:"" ,
                    LoginID:""
                }
                this.getwxMemberCard(vipitem.CardID);
            }, async getwxMemberCard(id){
                const crs = await getwxMemberCard({
                    MemberCardID:id
                })

                if(crs.orsuccess == '1'){

                     this.ruleFormxukaClass.CardNumber=crs.data.Kynumber;
                     this.ruleFormxukaClass.buyCount=crs.data.Kynumber;
                     this.ruleFormxukaClass.CardDays=crs.data.yxdays;
                     this.ruleFormxukaClass.Amount=crs.data.Amount;
                     this.ruleFormxukaClass.PurchaseAmount=crs.data.SellingPrice;
                     this.ruleFormxukaClass.YSAmount=crs.data.SellingPrice;


                     this.inputSubtotal4(this.ruleFormxukaClass);
                     this.dialohxkVisible = true;

                 }else{
                    alert(crs.Msg);
                }
            },inputSubtotal4(val){

                    if(val !=''){
                    if(val.CardType==1 || val.CardType==3){
                    var date = new Date(val.OverdueTime);//比如sourceDate传参“2019-03-31”
                     var buycount = parseInt(val.CardDays);

                     date.setDate(date.getDate() + buycount);
                    var year=date.getFullYear();
	     	        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	    	        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
                    val.EndTime = year+"-"+month+"-"+day;
                    }
                    }

                } ,submithxk(formName){
                this.$refs[formName].validate(async valid => {
                        if (valid) {
                            this.addwxMembersvipXK();
                        } else {
                            return false;
                        }
                    });
            },async addwxMembersvipXK(){

                const crs = await addwxMembersvipXK(this.ruleFormxukaClass)
                 if(crs.orsuccess == '1'){
                     this.dialohxkVisible = false;

                     this.getwxListMembersvip();

                }else{
                    this.$refs.messageChild.toast(crs.Msg)

                 }
            }
    }
  }
</script>
