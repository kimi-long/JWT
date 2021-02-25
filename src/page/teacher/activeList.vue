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

      <span style="font-size:12.5px">预警值： 剩余次数{{YJCardNumber}}次 或 剩余天数{{YJCardDays}}天 或 剩余金额{{YJAmount}}元</span>

    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="stu-order-list stu-order-list2" v-for="items in MemberYJList">
        <div class="stu-order-list-right">
          <div class="stu-order-list-right-table">
            <div class="stu-order-list-right-img" v-if="items.WxHeadUrl != '' && items.WxHeadUrl!=undefined">
              <img :src="items.WxHeadUrl"/>
            </div>
            <div class="stu-order-list-right-img" v-if="items.WxHeadUrl == '' || items.WxHeadUrl==undefined">

              <img src="../../assets/img/userAvatar.png">

            </div>


            <div class="stu-order-list-right-content">
              <p>
                <span>{{items.Name}}</span>
              </p>

              <p>{{items.Phone}}</p>
              <p>{{items.CardName}}</p>
              <p>
                <span v-if="items.CardType =='1'">次卡（有期限）</span>
                <span v-if="items.CardType =='2'">次卡（无限期） </span>
                <span v-if="items.CardType =='3'">期限卡（不限次数） </span>
                <span v-if="items.CardType =='4'">储蓄卡（无限期） </span>
              </p>
              <p><span style="color: red;" v-if="items.CardType =='1'">{{items.CardNumber}}次 （{{items.CardDays}} 天）</span>
                <span style="color: red;" v-if="items.CardType =='2'">{{items.CardNumber}}次 </span>
                <span style="color: red;" v-if="items.CardType =='3'">{{items.CardDays}} 天  </span>
                <span style="color: red;" v-if="items.CardType =='4'">{{items.Amount}}元 </span></p>

            </div>
            <div class="stu-order-list-right-btn isActive" @click="openAction(items)">
              <span>操作</span>
            </div>
            <!--<div class="stu-order-list-right-btn isActive" v-if="canEdit" @click="toStuTeacherDetails(items)">-->
            <!--<span>续费</span>-->
            <!--</div>-->
            <!--<div class="stu-order-list-right-btn isActive" v-if="canAdd" @click="todel(items)">-->
            <!--<span>预警</span>-->
            <!--</div>-->

          </div>
        </div>
      </div>
    </van-list>

<!--    <div class="Pagination userPagination">-->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange1"-->
<!--        @current-change="handleCurrentChange1"-->
<!--        :current-page.sync="currentPage1"-->
<!--        :page-sizes="[10,20,30,40]"-->
<!--        :page-size="limit1"-->
<!--        layout="total,prev,pager,next,sizes "-->
<!--        :total="count1">-->
<!--      </el-pagination>-->
<!--    </div>-->
    <el-dialog
      title="提示"
      :visible.sync="dialogdelVisible"
      width="80%"
      center
    >
      <div class="ant-modal-body1">
        <div class="warning-block">续费提醒将通过微信推送的形式发送给会员</div>
        <div class="form-item">
          <label class="form-item-title">接收人：</label>
          <span class="form-item-content">{{Remindinfo.Name}}</span>
        </div>
        <div>
          推送内容
          <div class="form-item">
                           <span class="form-item-content">您好，您的会员卡即将到期  <br>会员卡类型：{{Remindinfo.CardName}} <br><span>会员卡号：{{Remindinfo.CardNum}} </span> <br><span>卡内余额：{{Remindinfo.allcount}} </span> <br><span>有效期至：{{Remindinfo.OverdueTime}} </span>
                           </span>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer1">
        <el-button size="medium" @click="dialogdelVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="dosaverxf">发 送</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="修改会员卡"
      :visible.sync="dialohykVisible"
      width="80%"
      center
    >
      <el-form :model="ruleFormfakaClass" ref="ruleFormfakaClass" :rules="rulesfakaClass" label-width="100px"
               label-position="right">
        <el-form-item label="会员卡名称：" prop="CardNum">
          <span>{{ruleFormfakaClass.CardName}}</span>
        </el-form-item>
        <el-form-item label="可用次数：" v-if="showKynumber">
          <el-input v-model="ruleFormfakaClass.CardNumber" placeholder="可用次数" style="width:100px;"></el-input>
          次
        </el-form-item>
        <el-form-item label="到期时间：" v-if="showyxdays">

          <el-input type="date" v-model="ruleFormfakaClass.OverdueTime"></el-input>
        </el-form-item>
        <el-form-item label="充值金额：" v-if="showAmount">
          <el-input v-model="ruleFormfakaClass.Amount" placeholder="充值金额" style="width:100px;"></el-input>
          元
        </el-form-item>
        <el-form-item label="备注信息：">
          <el-input type="textarea" v-model="ruleFormfakaClass.Note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialohykVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submithyk">确 认</el-button>
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

  import {getListYJStu, WxContractToRemind, editWXCardNumber} from "@/api/getData";
  import message from "@/components/message";

  export default {
    destroyed() {
      document.querySelector('body').removeAttribute('style')
    },
    mounted() {
      document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    data() {
      return {
        actionLine: {},
        actionshow: false,
        loading: false,
        finished: false,
        actions: [],
        MemberID: "",
        dialohykVisible: false,
        showKynumber: false,
        showyxdays: false,
        showAmount: false,
        canEdit: false,
        canAdd: false,
        Remindinfo: {},
        ListRemindinfo: [],
        limit1: 10,
        count1: 0,
        currentPage1: 1,
        offset1: 0,
        YJCardNumber: "",
        YJCardDays: "",
        YJAmount: "",
        MemberYJList: [],
        dialogdelVisible: false,
        selectedStore: localStorage.getItem("storesid"),
        ruleFormfakaClass: {
          CardName: "",
          MembersvipID: "",
          CardNumber: "",
          Amount: "",
          OverdueTime: "",
          CardType: "",
          Note: "",
          oldCardNumber: "",
          sourceID: localStorage.getItem("teacherID"),
          sourceName: localStorage.getItem("teacherName"),
          oldAmount: "",
          oldOverdueTime: ""
        },
        rulesfakaClass: {}

      }
    },
    components: {
      message
    },
    created() {
      // this.getListYJStu()
      this.getButtonPermissions()
    },
    methods: {
      onLoad(){
        this.getListYJStu();
      },
      openAction(item) {
        this.actionshow = true;
        this.actionLine = item;
      },
      operation(item) {
        if(item.name == '续费'){
          this.toStuTeacherDetails(this.actionLine);
        }else if(item.name == '预警'){
          this.todel(this.actionLine);
        }
      },
      async getListYJStu() {
        this.offset1 = this.offset1 + 1;
        this.$store.commit('fullLoadingFun', true);
        const crs = await getListYJStu({
          StoresID: this.selectedStore,
          pages: this.offset1,
          psize: this.limit1
        })
        if (crs.orsuccess == '1') {
          this.loading = false;
          crs.data.forEach((item,index)=>{
            this.MemberYJList.push(item);
          })
          if(crs.data.length < 10){
            this.finished = true;
          }
          this.count1 = crs.allcount;
          this.YJCardNumber = crs.CardNumber;
          this.YJCardDays = crs.CardDays;
          this.YJAmount = crs.Amount;
          this.$store.commit('fullLoadingFun', false);
        } else {
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun', false);
        }
      }, handleSizeChange1(val) {
        this.limit1 = val;
        this.currentPage1 = 1;
        this.offset1 = 1;
        this.getListYJStu();
      },
      // 当前页变动时候触发的事件
      handleCurrentChange1(val) {
        this.currentPage1 = val;
        this.offset1 = val;
        this.getListYJStu()
      }, getButtonPermissions() {
        let PagePermission = [];
        let allPermission = localStorage.getItem('Limits').split(',');
        allPermission.forEach(element => {
          switch (element) {

            case '602':
              this.canEdit = true;

              break;
            case '603':
              this.canAdd = true;
              ;
              break;

          }
        })
        let aaa ={name:'续费'};
        let bbb ={name:'预警'};
        if(this.canEdit){
          this.actions.push(aaa);
        }
        if(this.canAdd){
          this.actions.push(bbb);
        }
      },
      toStuTeacherDetails(items) {
        this.ruleFormfakaClass = {
          CardName: items.CardName,
          MembersvipID: items.vid,
          CardNumber: items.CardNumber,
          Amount: items.Amount,
          OverdueTime: items.OverdueTime,
          CardType: items.CardType,
          Note: "",
          oldCardNumber: items.CardNumber,
          sourceID: localStorage.getItem("teacherID"),
          sourceName: localStorage.getItem("teacherName"),
          oldAmount: items.Amount,
          oldOverdueTime: items.OverdueTime
        }

        if (items.CardType == 1) {
          this.showKynumber = true;
          this.showyxdays = true;
          this.showAmount = false;


        } else if (items.CardType == 2) {
          this.showKynumber = true;
          this.showyxdays = false;
          this.showAmount = false;

        } else if (items.CardType == 3) {
          this.showKynumber = false;
          this.showyxdays = true;
          this.showAmount = false;

        } else if (items.CardType == 4) {

          this.showKynumber = false;
          this.showyxdays = false;
          this.showAmount = true;

        }

        this.dialohykVisible = true;


      }, addMemberCradClick() {

      }, todel(val) {
        this.Remindinfo = val;
        this.ListRemindinfo = [];
        var allcount = "";
        if (val.CardType == '1') {
          allcount = val.CardNumber + '次' + ' （' + val.CardDays + ')' + '天';
        } else if (val.CardType == '2') {
          allcount = val.CardNumber + '次';
        } else if (val.CardType == '3') {
          allcount = val.CardDays + '天';
        } else if (val.CardType == '4') {
          allcount = val.Amount + '元';
        }
        this.Remindinfo.allcount = allcount;

        var OverdueTime = "";
        if (val.CardType === '1') {
          OverdueTime = val.OverdueTime;
        }
        if (val.CardType === '2') {
          OverdueTime = "";
        }
        if (val.CardType === '3') {
          OverdueTime = val.OverdueTime
        } else {
          OverdueTime = "";
        }


        this.ListRemindinfo.push({
          MembersID: val.ID,
          MembersName: val.Name,
          CardNum: val.CardNum,
          CardName: val.CardName,
          allcount: allcount,
          OverdueTime: OverdueTime
        })
        this.dialogdelVisible = true;

      }, dosaverxf() {
        this.ContractToRemind();
      }, async ContractToRemind() {
        let ListRemindInfo = JSON.stringify(this.ListRemindinfo);

        const crs = await WxContractToRemind({
          StoresID: this.selectedStore,
          ListRemindInfo: ListRemindInfo
        })
        // console.log(crs)
        if (crs.orsuccess == '1') {
          this.dialogdelVisible = false;
        } else {
          this.$refs.messageChild.toast(crs.Msg)
        }
      }, submithyk() {
        this.editWXCardNumber();

      }, async editWXCardNumber() {

        const crs = await editWXCardNumber(this.ruleFormfakaClass)
        // console.log(crs)
        if (crs.orsuccess == '1') {
          this.getListYJStu();
          this.dialohykVisible = false;
        } else {
          this.$refs.messageChild.toast(crs.Msg)
        }
      }
    },
  }
</script>
