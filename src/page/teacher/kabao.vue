<template>
  <div class="padding-bottom">

    <div style="margin-bottom:10px;margin-top:10px;;margin-left:10px;">
      <el-button size="medium" type="primary" v-if="canAdd" @click="addMemberCradClick">添加会员卡</el-button>

    </div>
    <div class="stu-order-list stu-order-list2" v-for="items in MemberCardList">
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">

          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.CardName}}</span>&nbsp;&nbsp;
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
          <!--<div class="stu-order-list-right-btn isActive" v-if="canEdit" @click="toStuTeacherDetails(items)">-->
            <!--<span>编辑</span>-->
          <!--</div>-->
          <!--<div class="stu-order-list-right-btn isActive" v-if="canDelete" @click="deleteMemberClick(items.ID)">-->
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

  import {getListwxMemberCard, delwxMemberCard, stuGetListStoresName} from "@/api/getData";
  import message from "@/components/message";
  import {Dialog} from "vant";
  export default {
    data() {
      return {
        actionLine: {},
        actions: [{name: '编辑'}, {name: '删除'}],
        actionshow: false,
        MemberCardList: [],
        dialogdelVisible: false,
        canDelete: false,
        canAdd: false,
        canEdit: false,
        seleCradID: "",
        selectedStore: localStorage.getItem("storesid")

      }
    },
    computed: {},
    components: {
      message,Dialog
    },
    mounted() {
    },
    created() {
      this.getAllMemberCard();
      this.getButtonPermissions();

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
          this.deleteMemberClick(this.actionLine);
        }
      },
      async getAllMemberCard() {
        const crs = await getListwxMemberCard({StoresID: this.selectedStore})
        if (crs.orsuccess == '1') {
          this.MemberCardList = crs.data;

        } else {

          this.$message({type: "error", message: crs.Msg});

        }

      }, getButtonPermissions() {
        let PagePermission = [];
        let allPermission = localStorage.getItem('Limits').split(',');
        allPermission.forEach(element => {
          switch (element) {
            case '67':
              this.canAdd = true;
              break;
            case '68':
              this.canEdit = true;
              break;
            case '69':
              this.canDelete = true;
              break;
          }
        })
      }, editMemberClick(id) {

      }, deleteMemberClick(items) {
        this.seleCradID= items.ID;
        Dialog.confirm({
          title: '删除提醒',
          message: '是否确定将会员卡删除？',
        })
          .then(() => {
            this.dodel();
            // on confirm
          })
          .catch(() => {
            // on cancel
          });

      }, dodel() {
        this.delMemberCard(this.seleCradID);

      }, async delMemberCard(id) {
        const crs = await delwxMemberCard({
          MemberCardID: id
        })
        if (crs.orsuccess == '1') {
          this.$refs.messageChild.toast(crs.Msg)

          this.dialogdelVisible = false;

          this.getAllMemberCard();
        } else {
          this.$refs.messageChild.toast(crs.Msg)
        }
      }, addMemberCradClick() {
        this.$router.push('/addkabao')
      },
      toStuTeacherDetails(items) {
        localStorage.setItem("CardID", items.ID)
        this.$router.push('/editkabao')
      }
    }
  }
</script>
