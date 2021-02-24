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

    <div style="margin-bottom:10px;margin-top:10px;;margin-left:10px;">

     <el-button  size="medium" type="primary" v-if="canAdd" @click="addMemberClick">添加会员</el-button>

    </div>
    <van-dropdown-menu active-color="#4aa1ec">
      <van-dropdown-item v-model="SelectIsvip" :options="option1"  @change="handleSelectIsvip"/>
      <van-dropdown-item v-model="SelectVipType" :options="MemberCardList"  @change="handleSelectIsvip"/>
      <van-dropdown-item v-model="SelectType" :options="option2"  @change="handleSearchType"/>
    </van-dropdown-menu>
     <!--<div class="flexB" style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;">-->

         <!--<div class="flexS">-->
             <!--<el-select v-model="SelectIsvip" style="width:150px;" @change="handleSelectIsvip">-->
                                    <!--<el-option label="全部" value="1"></el-option>-->
                                    <!--<el-option label="会员" value="2"></el-option>-->
                                    <!--<el-option label="非会员" value="3"></el-option>-->
                                <!--</el-select> &nbsp;-->
              <!--<el-select v-model="SelectVipType" style="width:150px;" clearable @change="handleSelectIsvip"  placeholder="会员卡类型"  >-->
                      <!--<el-option v-for="item in MemberCardList" :key="item.index" :label="item.CardName " :value="item.ID">-->
                      <!--</el-option>-->
               <!--</el-select>-->
         <!--</div>-->
   <!--</div>-->
    <div class="flexB" style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;">
         <div class="flexS">
              <!--<el-select v-model="SelectType" style="width:110px;" @change="handleSearchType">-->
                                    <!--<el-option label="会员信息" value="1"></el-option>-->
                                    <!--<el-option label="分类标签" value="2"></el-option>-->
                                <!--</el-select>&nbsp;-->
              <el-input :placeholder="searchPlaceholder" style="width:250px;" v-model="searchContent"  ></el-input>&nbsp;&nbsp;
              <el-button type="primary" size="medium" @click="searchClick">搜索</el-button>
         </div>
   </div>
    <div class="stu-order-list stu-order-list2" v-for="items in MemberList" >
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">
          <div class="stu-order-list-right-img" v-if="items.WxHeadUrl != '' && items.WxHeadUrl!=undefined">
            <img :src="items.WxHeadUrl"  />
          </div>
          <div class="stu-order-list-right-img"  v-if="items.WxHeadUrl == '' || items.WxHeadUrl==undefined">

            <img src="../../assets/img/userAvatar.png">

          </div>


          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.Name}}</span>
            </p>

              <p>{{items.Phone}}</p>
              <p>{{items.TypeLabel}}</p>
              <p>{{items.Note}}</p>
              <p>
                  <span style="font-weight:700;font-size:15px;color:#389d0f;" v-if="items.listVip.length>0"  @click="Cardvip(items)">已绑卡</span>
                  <span v-if="items.listVip.length==0">未绑卡</span>
              </p>

          </div>
          <div class="stu-order-list-right-btn isActive"  @click="openAction(items)">
            <span>操作</span>
          </div>
            <div class="stu-order-list-right-btn1 isActive" v-if="canEdit" @click="toStuTeacherDetails(items)">
            <span>编辑</span>
            </div>
           <div   class="stu-order-list-right-btn1 isActive" v-if="canDelete" @click="todel(items)">
            <span>删除</span>
          </div>
            <div  class="stu-order-list-right-btn1 isActive" v-if="canEdit" @click="faka(items)">
            <span>发卡</span>
           </div>
           </div>



      </div>
    </div>
    <div class="Pagination userPagination">
                    <el-pagination
                     @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                     :current-page.sync="currentPage1"
                     :page-sizes="[10,20,30,40]"
                     :page-size="limit1"
                    layout="total,prev,pager,next,sizes "
                    :total="count1">
                    </el-pagination>
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
            是否确定将会员删除？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogdelVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="dodel">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="发卡"
      :visible.sync="dialogfkVisible"
      width="80%"
      center
      >
           <el-form :model="ruleFormfakaClass" ref="ruleFormfakaClass" :rules="rulesfakaClass" label-width="100px" label-position="right">
                    <el-form-item label="门店：" prop="StoresID">
                        <el-radio-group v-model="ruleFormfakaClass.StoresID">
                            <el-radio v-for="item in storeList" :label="item.ID" :key="item.index">
                                {{item.StoresName}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="会员卡号：" v-if="khIson=='1'" prop="CardNum">
                        <el-input v-model="ruleFormfakaClass.CardNum" placeholder="请输入会员卡号"></el-input>
                    </el-form-item>
                     <el-form-item label="选择会员卡："  prop="CardID">
                        <el-select v-model="ruleFormfakaClass.CardName" filterable  @change="changeCardID"  placeholder="请选择会员卡">
                            <el-option v-for="item in MemberCardList" :key="item.index" :label="item.CardName +'/￥'+item.SellingPrice " :value="item.ID+','+item.CardType+','+item.CardName+','+item.Kynumber+','+item.yxdays +','+item.Amount+','+item.SellingPrice">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="是否开卡：" v-if="ruleFormfakaClass.CardID>0" >
                             <el-radio-group v-model="ruleFormfakaClass.iskaika" >
                                <el-radio label="1">立即开卡</el-radio>
                                <el-radio label="0">暂不开卡</el-radio>
                            </el-radio-group>
                    </el-form-item>
                    <el-form-item label="开卡日期：" v-if="ruleFormfakaClass.CardID>0 &&ruleFormfakaClass.iskaika=='1'"  prop="KaiKaTime">
                       <el-input  type="date" v-model="ruleFormfakaClass.KaiKaTime" @change='selectData2(ruleFormfakaClass)' > </el-input>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="购买次数：" v-if="ruleFormfakaClass.CardID>0 &&showKynumber" prop="buyCount" >
                        <el-input v-model="ruleFormfakaClass.buyCount" placeholder="购买次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="可用次数："  v-if="ruleFormfakaClass.CardID>0 &&showKynumber" prop="CardNumber" >
                        <el-input v-model="ruleFormfakaClass.CardNumber" placeholder="可用次数" style="width:100px;"></el-input> 次
                    </el-form-item>
                    <el-form-item label="有效天数："  v-if="ruleFormfakaClass.CardID>0 &&showyxdays"  prop="CardDays" >
                        <el-input v-model="ruleFormfakaClass.CardDays" v-on:input="inputSubtotal1(ruleFormfakaClass)" placeholder="有效天数" style="width:100px;"></el-input> 天
                    </el-form-item>
                    <el-form-item label="到期时间："  v-if="ruleFormfakaClass.CardID>0 &&ruleFormfakaClass.iskaika=='1' && (ruleFormfakaClass.CardType==1 || ruleFormfakaClass.CardType==3)" prop="EndTime">
                         <span>{{ruleFormfakaClass.EndTime}}</span>
                    </el-form-item>
                    <el-form-item label="充值金额："  v-if="ruleFormfakaClass.CardID>0 &&showAmount" prop="Amount" >
                        <el-input v-model="ruleFormfakaClass.Amount" placeholder="充值金额" style="width:100px;"></el-input> 元
                    </el-form-item>
                    <el-form-item label="应收金额："  v-if="ruleFormfakaClass.CardID>0 &&showPurchaseAmount" prop="YSAmount" >
                        <el-input  v-if="isgoumaijine==1" v-model="ruleFormfakaClass.YSAmount" placeholder="应收金额" style="width:100px;"></el-input>
                        <span v-if="isgoumaijine==1">元</span>
                         <span  v-if="isgoumaijine==0">{{ruleFormfakaClass.YSAmount}}元</span>
                    </el-form-item>
                    <el-form-item label="实收金额："  v-if="ruleFormfakaClass.CardID>0 &&showPurchaseAmount" prop="PurchaseAmount" >
                        <el-input v-if="isgoumaijine==1" v-model="ruleFormfakaClass.PurchaseAmount" placeholder="实收金额" style="width:100px;"></el-input>
                            <span v-if="isgoumaijine==1">元</span>
                         <span  v-if="isgoumaijine==0">{{ruleFormfakaClass.PurchaseAmount}}元</span>
                    </el-form-item>
                      <el-form-item label="备注信息：" prop="Note">
                       <el-input type="textarea" v-model="ruleFormfakaClass.Note"></el-input>
                    </el-form-item>
                </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogfkVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitfaka">确 认</el-button>
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
.stu-order-list-right-btn1{
    width: 70px;
    height: 40px;
    float: left;
    ;margin-left:80px

}
.stu-order-list-right-btn1 span{
    border: 1px solid #e4e4e4;
    padding: 0 14px;
    height: 30px;
    line-height: 30px;
    float: left;
    color: #e4e4e4;
}
.stu-order-list-right-btn1.isActive span{
    color: #389d0f;
    border-color: #389d0f;
}
.ant-modal-body1 {
    max-height: 70vh;
    overflow-y: auto;
    padding: 24px;
}
 .form-item {
    margin-bottom: 15px;
    display: -ms-flexbox;
    display: flex;
     font-size: 12px;
}
 .warning-block {
    background: #fff0e7;
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 12px;
}
.form-item-title {
    display: inline-block;
    width: 90px;
    text-align: right;
}
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

  import { getListwxMembers,delwxMembers,getListwxMemberCard,stuGetListStoresName,addwxMembersvip } from "@/api/getData";
  import message from "@/components/message";
  import {Dialog} from "vant";
   export default {
    destroyed () {
      document.querySelector('body').removeAttribute('style')
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    data() {
      return {
        actionLine:{},
        actions: [{name: '编辑'}, {name: '删除'},{name:'发卡'}],
        actionshow:false,
        option1: [
          { text: '全部', value: '1' },
          { text: '会员', value: '2' },
          { text: '非会员', value: '3' },
        ],
        option2: [
          { text: '会员信息', value: '1' },
          { text: '分类标签', value: '2' },
        ],
         MemberID:"",
         SelectIsvip:"1",
         SelectVipType:"",
         SelectType:"1",
         searchContent:"",
         khIson:localStorage.getItem("khIson"),
         isgoumaijine:localStorage.getItem("isgoumaijine"),
         searchPlaceholder:"搜索姓名/昵称/手机号",
         limit1: 10,
         count1:0,
         currentPage1:1,
         offset1:1,
         MemberList:[],
         MemberCardList:[],
         storeList:[],
         dialogdelVisible:false,
         dialogfkVisible:false,
         canExport: false,
                canAdd: false,
                canEdit: false,
                canDelete: false,
                canChangeClass: false,
         selectedStore:localStorage.getItem("storesid")
         ,
         ruleFormfakaClass:{
                    MembersID:"",
                    StoresID:localStorage.getItem("storesid"),
                    CardNum:"",
                    CardNumber:"",
                    CardDays:"",
                    OverdueTime:"",
                    Note:"",
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
                    YSAmount:""
        },
         rulesfakaClass:{
             CardNum: [{required: true, message:'请输入会员卡号', trigger: 'blur' }]
        },
        showKynumber:false,
        showyxdays:false,
        showAmount:false,
        showPurchaseAmount:false,

      }
    },
    components:{
       message
    },
    created() {
      this.getListwxMembers()
      this.getButtonPermissions()
    },
    methods: {
      openAction(item) {
        this.actionshow = true;
        this.actionLine = item;
      },
      operation(item) {

        if(item.name == '编辑'){
          this.toStuTeacherDetails(this.actionLine);
        }else if(item.name == '删除'){
          this.todel(this.actionLine);
        }else if(item.name == '发卡'){
          this.faka(this.actionLine);
        }
      },
      async getListwxMembers(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getListwxMembers({
          StoresID:this.selectedStore,
          LabelID:"0",
          SelectIsvip:this.SelectIsvip,
          SelectVipType:this.SelectVipType,
          SelectName:this.searchContent,
          SelectType:this.SelectType,
          pages:this.offset1,
          psize:this.limit1
        })
        if(crs.orsuccess=='1'){
           this.MemberList = crs.data;
           this.count1 = crs.allcount;
          this.getListwxMemberCard1();
         }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },async getListwxMemberCard1(){

           const crs = await getListwxMemberCard({StoresID:localStorage.getItem("storesid")})
                              if(crs.orsuccess == '1'){
                                this.MemberCardList = crs.data;
                                this.MemberCardList.forEach((item,index)=>{
                                  item.text = item.CardName;
                                  item.value = item.ID;
                                });
                                let aaa = {
                                  text : '全部',
                                  value : '',
                                };
                                this.MemberCardList.unshift(aaa);
                                 this.$store.commit('fullLoadingFun',false);

                              }else
                              {

                                 this.$refs.messageChild.toast(crs.Msg)
                                 this.$store.commit('fullLoadingFun',false);

                              }
      },handleSizeChange1(val){
        this.limit1 = val;
        this.currentPage1 = 1;
        this.offset1 = 1;
        this.getListwxMembers();
      },
      // 当前页变动时候触发的事件
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.offset1 =val;
        this.getListwxMembers()
      },handleSelectIsvip(){
        this.currentPage1 = 1;
        this.offset1 = 1;
        this.getListwxMembers()
      },handleSearchType(){
        this.currentPage1 = 1;
        this.offset1 = 1;
        this.getListwxMembers()
      }, searchClick(){
                this.getListwxMembers()
            },getButtonPermissions(){
                let PagePermission = [];
                let allPermission = localStorage.getItem('Limits').split(',');
                allPermission.forEach(element =>{
                      switch(element){
                        case '61':
                        this.canExport = true;
                        break;
                        case '62':
                        this.canAdd = true;
                        break;
                        case '63':
                        this.canEdit = true;
                        break;
                        case '64':
                        this.canDelete = true;
                        break;
                        case '65':
                        this.canChangeClass = true;
                        break;
                    }
                })
            },
      toStuTeacherDetails(items){
        localStorage.setItem("MembersID",items.ID)
        this.$router.push('/editmember')
      },addMemberClick(){
          this.$router.push('/addmember')
       },todel(items){
        this.MembersID= items.ID;
        Dialog.confirm({
          title: '删除提醒',
          message: '是否确定将会员删除？',
        })
          .then(() => {
            this.dodel();
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      },dodel(){
         this.delwxMembers();
      },async delwxMembers(){
            const crs = await delwxMembers({
                    StoresID:this.selectedStore,
                    MembersID:this.MembersID
                })
                // console.log(crs)
                if(crs.orsuccess == '1'){
                    this.dialogdelVisible = false;
                     this.getListwxMembers();
                }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
      },faka(items){
      this.ruleFormfakaClass={
                    MembersID:"",
                    StoresID:localStorage.getItem("storesid"),
                    CardNum:"",
                    CardNumber:"",
                    CardDays:"",
                    OverdueTime:"",
                    Note:"",
                    Amount:"",
                    sourceID:localStorage.getItem("teacherID"),
                    sourceName:localStorage.getItem("teacherName"),
                    CardID:"",
                    CardName:"",
                    CardType:"",
                    PurchaseAmount:"",
                    iskaika:"1",
                    KaiKaTime:"",
                    EndTime:""
        };
        this.ruleFormfakaClass.MembersID =items.ID;
          this.stuGetListStoresNames();
      },async getListwxMemberCard(){

           const crs = await getListwxMemberCard({StoresID:localStorage.getItem("storesid")})
                              if(crs.orsuccess == '1'){
                                this.MemberCardList = crs.data;
                                this.dialogfkVisible=true;
                                this.$store.commit('fullLoadingFun',false);

                              }else
                              {

                                 this.$refs.messageChild.toast(crs.Msg)
                                 this.$store.commit('fullLoadingFun',false);

                              }
      },async stuGetListStoresNames(){
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
      },changeCardID(val){
                console.log(val)
                  let arr1 = val.split(",");
                  if(arr1.length > 6){
                  this.ruleFormfakaClass.CardID = arr1[0];
                  this.ruleFormfakaClass.CardType = arr1[1];
                  this.ruleFormfakaClass.CardName = arr1[2];
                  this.ruleFormfakaClass.CardNumber = arr1[3];
                  this.ruleFormfakaClass.buyCount = arr1[3];
                  this.ruleFormfakaClass.CardDays = arr1[4];
                  this.ruleFormfakaClass.Amount = arr1[5];
                  this.ruleFormfakaClass.PurchaseAmount = arr1[6];
                  this.ruleFormfakaClass.YSAmount = arr1[6];


                let CardType = arr1[1];

                if(CardType  ==1){
                this.showKynumber= true;
                this.showyxdays=true;
                this.showAmount=false;
                this.showPurchaseAmount=true;


                }else if(CardType  ==2){
                this.showKynumber= true;
                this.showyxdays=false;
                this.showAmount= false;
                this.showPurchaseAmount=true;

                }else if(CardType  ==3){
                this.showKynumber= false;
                this.showyxdays= true;
                this.showAmount=false;
                this.showPurchaseAmount=true;

                }else if(CardType  ==4){

                this.showKynumber= false;
                this.showyxdays=false;
                this.showAmount= true;
                this.showPurchaseAmount=true;

                }

                 }


            },submitfaka(){

                this.addwxMembersvip();

      },async addwxMembersvip(){

            const crs = await addwxMembersvip(this.ruleFormfakaClass)
                 // console.log(crs)
                if(crs.orsuccess == '1'){
                     this.getListwxMembers();
                    this.dialogfkVisible=false;

                }else{
                    this.$message({ type: "error", message: crs.Msg });
                }
      },Cardvip(items){
        if(this.canEdit){
        localStorage.setItem("MembersID",items.ID)
        this.$router.push('/CardVipList')
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

                }
    },
  }
</script>
