<template>
  <div style="padding:24px;">
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px" label-position="top">
      <el-form-item label="时间范围：" prop="startTimes">

        <el-input type="date" v-model="staTime"></el-input>

      </el-form-item>
      <el-form-item label="老师：" prop="LoginID">
        <el-select v-model="ruleForm.LoginID" placeholder="搜索老师名">
          <el-option v-for="item in teacherList" :value="item.ID" :label="item.Name" :key="item.index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程：" prop="CourseID">
        <el-select filter v-model="ruleForm.CourseName" placeholder="搜索课程名" @change="changeCourse">
          <el-option v-for="item in courseList" :value="item" :label="item.CourseName" :key="item.index">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程时长：" prop="Timelength">
        <el-input v-model="ruleForm.Timelength" placeholder="课程时长" style="width:150px;"></el-input>
        分钟
      </el-form-item>

      <el-form-item label="排课方式：" v-if="RowClassType=='1'" prop="RowClassType">
        <el-radio-group v-model="RowClassType">
          <el-radio label="1">时间表</el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="预约时间表：" v-if="RowClassType=='1' && parseInt(ruleForm.Timelength)>0" prop="RowClassType">
        <el-button type="default" size="mini" @click="RowClassTimeClick">添加时间表</el-button>
        <div class="g-items-wrap f-mt-10">
          <div class="itemWrap___33SF3" v-for="item in listRowClassTime" :key="item.index" :id="item.ID">
            <span v-if="item.state !='3'">{{item.startTime}} ~ {{item.endTime}}</span>
          </div>
        </div>

      </el-form-item>


      <el-form-item v-if="RowClassType=='0'" label="开始时间：" prop="startTime">
        <span style="padding:2px 10px;border-radius:15px;background:#409EFF;color:#fff;margin-right:15px;">{{ruleForm.startTime}}</span>
        <el-radio-group v-model="ruleForm.PeriodOfTime" size="mini" @change="changeTimePeriod">
          <el-radio-button label="1">上午</el-radio-button>
          <el-radio-button label="2">下午</el-radio-button>
          <el-radio-button label="3">晚上</el-radio-button>
        </el-radio-group>
        <el-select filter v-model="MorningTime" @change="changeSlider" v-if="ruleForm.PeriodOfTime=='1'">
          <el-option v-for="item in courseMarkstime1" :value="item.Label" :label="item.Label" :key="item.index">
          </el-option>
        </el-select>
        <el-select filter v-model="AfternoonTime" @change="changeSlider" v-if="ruleForm.PeriodOfTime=='2'">
          <el-option v-for="item in courseMarkstime2" :value="item.Label" :label="item.Label" :key="item.index">
          </el-option>
        </el-select>
        <el-select filter v-model="EveningTime" @change="changeSlider" v-if="ruleForm.PeriodOfTime=='3'">
          <el-option v-for="item in courseMarkstime3" :value="item.Label" :label="item.Label" :key="item.index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="RowClassType=='0'" label="人数限制：" prop="limitCount">
        <el-input v-model="ruleForm.limitCount" placeholder="请输入限制人数" style="width:150px;"></el-input>
        人
      </el-form-item>
      <el-form-item label="预约方式：" prop="preAboutType">
        <el-select filter v-model="ruleForm.preAboutType" @change="changeOptions">
          <el-option v-for="item in userlist" :value="item.Id" :label="item.Label" :key="item.index">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选定会员卡：" v-if="showAmemberCard" prop="AmemberCard">
        <el-select style="width: 100%;" v-model="AmemberCards" multiple @change="changeCardID" placeholder="请选择会员卡">
          <el-option v-for="item in MemberCardList" :key="item.index" :label="item.CardName" :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消耗次数：" v-if="showConsumptionOfClass" prop="ConsumptionOfClass">
        <el-input v-model="ruleForm.ConsumptionOfClass" placeholder="消耗次数" style="width:100px;"></el-input>
        次
      </el-form-item>
      <el-form-item label="消耗金额：" v-if="showsinglePrice" prop="singlePrice">
        <el-input v-model="ruleForm.singlePrice" placeholder="消耗金额" style="width:100px;"></el-input>
        元
      </el-form-item>



      <el-form-item label="级别：">
        <el-select filter v-model="ruleForm.LevelID">
          <el-option v-for="item in Level" :value="item.ID" :label="item.LevelName" :key="item.index">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度：">

        <i class="iconfont icon-pingjia" :class="ruleForm.difficulty > 0?'yellow':''" style="font-size: 32px" @click="changedifficulty(1)"></i>
        <i class="iconfont icon-pingjia"  :class="ruleForm.difficulty > 1?'yellow':''" style="font-size: 32px" @click="changedifficulty(2)"></i>
        <i class="iconfont icon-pingjia"  :class="ruleForm.difficulty > 2?'yellow':''" style="font-size: 32px" @click="changedifficulty(3)"></i>
        <i class="iconfont icon-pingjia"  :class="ruleForm.difficulty > 3?'yellow':''" style="font-size: 32px" @click="changedifficulty(4)"></i>
        <i class="iconfont icon-pingjia"  :class="ruleForm.difficulty > 4?'yellow':''" style="font-size: 32px" @click="changedifficulty(5)"></i>


      </el-form-item>

      <el-form-item v-if="RowClassType=='0'" label="最低开课人数：" prop="MinCount">
        <el-input v-model="ruleForm.MinCount" placeholder="可选" style="width:150px;"></el-input>
        人
      </el-form-item>

    </el-form>

    <div class="login-content">
      <span class="login-btn" @click="submitForm">确认提交</span>
    </div>
    <el-dialog
      title="添加时间表"
      :visible.sync="RowClassTimeShow"
      width="90%"
      center
    >
      <div>
        <el-alert
          title="安排一个或多个时间段，让学员选择预约"
          type="warning" :closable="false"
          show-icon>
        </el-alert>

        <div class="g-items-wrap f-mt-10">
          <div class="itemWrap___33SF3" v-for="item in listRowClassTime" :key="item.index" :id="item.ID">
            <span v-if="item.state !='3'">{{item.startTime}} ~ {{item.endTime}}</span>
            <i class="el-icon-delete" v-if="item.state !='3'" @click="deleteRowClassTime(item,item.index)"></i>
          </div>
        </div>
        <br>
        <span style="padding:2px 10px;border-radius:15px;background:#409EFF;color:#fff;margin-right:15px;">{{startTimenew}}</span>
        <el-radio-group v-model="PeriodOfTime" size="mini" @change="changeTimePeriod1">
          <el-radio-button label="1">上午</el-radio-button>
          <el-radio-button label="2">下午</el-radio-button>
          <el-radio-button label="3">晚上</el-radio-button>
        </el-radio-group>
        <div style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;">
          <el-select filter v-model="MorningTime" @change="changeSlider1" v-if="PeriodOfTime=='1'">
            <el-option v-for="item in courseMarkstime1" :value="item.Label" :label="item.Label" :key="item.index">
            </el-option>
          </el-select>
          <el-select filter v-model="AfternoonTime" @change="changeSlider1" v-if="PeriodOfTime=='2'">
            <el-option v-for="item in courseMarkstime2" :value="item.Label" :label="item.Label" :key="item.index">
            </el-option>
          </el-select>
          <el-select filter v-model="EveningTime" @change="changeSlider1" v-if="PeriodOfTime=='3'">
            <el-option v-for="item in courseMarkstime3" :value="item.Label" :label="item.Label" :key="item.index">
            </el-option>
          </el-select>
        </div>


        <el-button icon="el-icon-plus" type="primary" @click="addRowClassTimeClick">添加</el-button>

      </div>

    </el-dialog>
    <message ref="messageChild"></message>

  </div>

</template>
<style>
  .icon-pingjia {
    color: #8a8c8e;
  }

  .yellow {
    color: #f58220 !important;
  }

  .g-items-wrap {
    padding: 10px 15px;
    border: 1px dashed #40a9ff;
  }

  .f-mt-10 {
    margin-top: 10px;
  }

  .itemWrap___33SF3 {
    text-align: left;
    margin-bottom: 8px;
    padding: 0 12px;
    line-height: 40px;
    background: #e6f7ff;
    border-radius: 8px;
  }

  .optionsContent /deep/ .el-select-dropdown__wrap {
    max-height: 471px;
  }

  .login-content {
    font-size: 16px;
    width: 70%;
    margin: 40px 15%;
    float: left;
  }

  .login-btn {
    background-color: rgb(72, 175, 249);
    color: #fff;
    text-align: center;
    float: left;
    padding: 10px 0;
    border-radius: 14px;
    margin: 20px 0;
    width: 100%
  }

  .drawerForm {
    width: 100%;
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .drawerForm .el-form-item {
    margin: 0 0 24px !important;
  }

  .el-button--primary {
    color: #FFF;
    height: 40px;
    background-color: rgb(72, 175, 249);
    border-color: rgb(72, 175, 249);
  }
</style>
<script>
  import {
    stuGetListStoresName,
    getwxlistCourse,
    getListwxMemberCard,
    getListTeacher,
    editwxRowClass,
    getwxListLevel,
    getwxRowClassInfo
  } from "@/api/getData";
  import message from "@/components/message";

  export default {
    data() {
      return {
        isEdit: true,
        PeriodOfTime: "1",
        showsinglePrice: true,
        MorningTime: "",
        staTime: "",
        AfternoonTime: "",
        EveningTime: "",
        startTimenew: "",
        RowClassTimeShow: false,
        listRowClassTime: [],
        levelValue: 0,
        Level: [],
        levelMin: 0,
        levelMax: 0,
        levelMarks: {},
        courseMarks: {
          1: "入门级",
          2: "初级",
          3: "中级",
          4: "高级",
          5: '专业级'
        },
        storeList: [],
        teacherList: [],
        courseList: [],
        MemberCardList: [],
        courseMarkstime1: [
          {Id: "1", Label: "0:00"},
          {Id: "2", Label: "0:10"},
          {Id: "3", Label: "0:20"},
          {Id: "4", Label: "0:30"},
          {Id: "5", Label: "0:40"},
          {Id: "6", Label: "0:50"},
          {Id: "7", Label: "1:00"},
          {Id: "8", Label: "1:10"},
          {Id: "9", Label: "1:20"},
          {Id: "10", Label: "1:30"},
          {Id: "11", Label: "1:40"},
          {Id: "12", Label: "1:50"},
          {Id: "13", Label: "2:00"},
          {Id: "14", Label: "2:10"},
          {Id: "15", Label: "2:20"},
          {Id: "16", Label: "2:30"},
          {Id: "17", Label: "2:40"},
          {Id: "18", Label: "2:50"},
          {Id: "19", Label: "3:00"},
          {Id: "19", Label: "3:10"},
          {Id: "19", Label: "3:20"},
          {Id: "19", Label: "3:30"},
          {Id: "19", Label: "3:40"},
          {Id: "19", Label: "3:50"},
          {Id: "19", Label: "4:00"},
          {Id: "19", Label: "4:10"},
          {Id: "19", Label: "4:20"},
          {Id: "19", Label: "4:30"},
          {Id: "19", Label: "4:40"},
          {Id: "19", Label: "4:50"},
          {Id: "19", Label: "5:00"},
          {Id: "19", Label: "5:10"},
          {Id: "19", Label: "5:20"},
          {Id: "19", Label: "5:30"},
          {Id: "19", Label: "5:40"},
          {Id: "19", Label: "5:50"},
          {Id: "19", Label: "6:00"},
          {Id: "19", Label: "6:10"},
          {Id: "19", Label: "6:20"},
          {Id: "19", Label: "6:30"},
          {Id: "19", Label: "6:40"},
          {Id: "19", Label: "6:50"},
          {Id: "19", Label: "7:00"},
          {Id: "19", Label: "7:10"},
          {Id: "19", Label: "7:20"},
          {Id: "19", Label: "7:30"},
          {Id: "19", Label: "7:40"},
          {Id: "19", Label: "7:50"},
          {Id: "19", Label: "8:00"},
          {Id: "19", Label: "8:10"},
          {Id: "19", Label: "8:20"},
          {Id: "19", Label: "8:30"},
          {Id: "19", Label: "8:40"},
          {Id: "19", Label: "8:50"},
          {Id: "19", Label: "9:00"},
          {Id: "19", Label: "9:10"},
          {Id: "19", Label: "9:20"},
          {Id: "19", Label: "9:30"},
          {Id: "19", Label: "9:40"},
          {Id: "19", Label: "9:50"},
          {Id: "19", Label: "10:00"},
          {Id: "19", Label: "10:10"},
          {Id: "19", Label: "10:20"},
          {Id: "19", Label: "10:30"},
          {Id: "19", Label: "10:40"},
          {Id: "19", Label: "10:50"},
          {Id: "19", Label: "11:00"},
          {Id: "19", Label: "11:10"},
          {Id: "19", Label: "11:20"},
          {Id: "19", Label: "11:30"},
          {Id: "19", Label: "11:40"},
          {Id: "19", Label: "11:50"}
        ], courseMarkstime2: [
          {Id: "1", Label: "12:00"},
          {Id: "2", Label: "12:10"},
          {Id: "3", Label: "12:20"},
          {Id: "4", Label: "12:30"},
          {Id: "5", Label: "12:40"},
          {Id: "6", Label: "12:50"},
          {Id: "7", Label: "13:00"},
          {Id: "8", Label: "13:10"},
          {Id: "9", Label: "13:20"},
          {Id: "10", Label: "13:30"},
          {Id: "11", Label: "13:40"},
          {Id: "12", Label: "13:50"},
          {Id: "13", Label: "14:00"},
          {Id: "14", Label: "14:10"},
          {Id: "15", Label: "14:20"},
          {Id: "16", Label: "14:30"},
          {Id: "17", Label: "14:40"},
          {Id: "18", Label: "14:50"},
          {Id: "19", Label: "15:00"},
          {Id: "19", Label: "15:10"},
          {Id: "19", Label: "15:20"},
          {Id: "19", Label: "15:30"},
          {Id: "19", Label: "15:40"},
          {Id: "19", Label: "15:50"},
          {Id: "19", Label: "16:00"},
          {Id: "19", Label: "16:10"},
          {Id: "19", Label: "16:20"},
          {Id: "19", Label: "16:30"},
          {Id: "19", Label: "16:40"},
          {Id: "19", Label: "16:50"},
          {Id: "19", Label: "17:00"},
          {Id: "19", Label: "17:10"},
          {Id: "19", Label: "17:20"},
          {Id: "19", Label: "17:30"},
          {Id: "19", Label: "17:40"},
          {Id: "19", Label: "17:50"},
          {Id: "19", Label: "18:00"},
          {Id: "19", Label: "18:10"},
          {Id: "19", Label: "18:20"},
          {Id: "19", Label: "18:30"},
          {Id: "19", Label: "18:40"},
          {Id: "19", Label: "18:50"}

        ], courseMarkstime3: [
          {Id: "1", Label: "19:00"},
          {Id: "2", Label: "19:10"},
          {Id: "3", Label: "19:20"},
          {Id: "4", Label: "19:30"},
          {Id: "5", Label: "19:40"},
          {Id: "6", Label: "19:50"},
          {Id: "7", Label: "20:00"},
          {Id: "8", Label: "20:10"},
          {Id: "9", Label: "20:20"},
          {Id: "10", Label: "20:30"},
          {Id: "11", Label: "20:40"},
          {Id: "12", Label: "20:50"},
          {Id: "13", Label: "21:00"},
          {Id: "14", Label: "21:10"},
          {Id: "15", Label: "21:20"},
          {Id: "16", Label: "21:30"},
          {Id: "17", Label: "21:40"},
          {Id: "18", Label: "21:50"},
          {Id: "19", Label: "22:00"},
          {Id: "19", Label: "22:10"},
          {Id: "19", Label: "22:20"},
          {Id: "19", Label: "22:30"},
          {Id: "19", Label: "22:40"},
          {Id: "19", Label: "22:50"},
          {Id: "19", Label: "23:00"},
          {Id: "19", Label: "23:10"},
          {Id: "19", Label: "23:20"},
          {Id: "19", Label: "23:30"},
          {Id: "19", Label: "23:40"},
          {Id: "19", Label: "23:50"}
        ],
        courseMarks1: {
          0: "0",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: '12'
        },
        courseMarks2: {
          12: "12",
          13: "13",
          14: "14",
          15: "15",
          16: "16",
          17: "17",
          18: "18",
          19: '19'
        },
        courseMarks3: {
          19: "19",
          20: "20",
          21: "21",
          22: "22",
          23: "23",
          24: '24'
        },
        userlist: [{Id: "1", Label: "会员/非会员"},
          {Id: "2", Label: "会员"},
          {Id: "3", Label: "非会员"}],
        showAmemberCard: true,
        showConsumptionOfClass: true,
        RowClassType: "0",
        CycleList: [
          {Id: "1", Label: "周一"},
          {Id: "2", Label: "周二"},
          {Id: "3", Label: "周三"},
          {Id: "4", Label: "周四"},
          {Id: "5", Label: "周五"},
          {Id: "6", Label: "周六"},
          {Id: "7", Label: "周日"}
        ],
        checkedCycles: [],
        AmemberCards: [],
        RowClassID: localStorage.getItem("RowClassID"),
        ruleForm: {
          integral:0,
          difficulty:0,
          Cycle: "",
          StoresID: "",
          LoginID: "",
          CourseID: "",
          Timelength: "",
          startTimes: "",
          endTimes: "",
          preAboutType: "1",
          limitCount: "",
          MinCount: "",
          ConsumptionOfClass: "",
          startTime: "",
          PeriodOfTime: "1",
          LevelID: "1",
          AmemberCard: "",
          singlePrice: "",
          RowClassType: "0",
          ListRowClassTime: ""

        }, rules: {},

      };
    },
    inject: ['reload'],
    created() {
      this.stuGetListStoresNames();
    },
    computed: {},
    components: {
      message
    },
    mounted() {

    },
    methods: {
      changedifficulty(num){
        this.ruleForm.difficulty = num;
      },
      changeCourse(val){
        this.ruleForm.CourseID = val.ID;
        this.ruleForm.CourseName = val.CourseName;
        this.ruleForm.AmemberCard = val.SelectCardIDs;
        this.ruleForm.difficulty = val.difficulty;
        this.ruleForm.integral = val.integral;

        var str1 = this.ruleForm.AmemberCard;
        if(str1.length>0){
          var arr1 = str1.split(',');
          // alert(arr1);
          if(arr1.length>0){
            this.$set( this,'AmemberCards',arr1);
          }
        }
      },
      async stuGetListStoresNames() {
        this.$store.commit('fullLoadingFun', true);
        const crs = await stuGetListStoresName({
          StoresID: localStorage.getItem("storesid")
        })
        if (crs.orsuccess == '1') {
          this.storeList = crs.data;
          this.getwxlistCourse();
        } else {
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun', false);
        }
      }, async getwxlistCourse() {

        const crs = await getwxlistCourse({
          StoresID: localStorage.getItem("storesid")
        })
        if (crs.orsuccess == '1') {
          this.courseList = crs.data;
          this.getListTeacher();
        } else {
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun', false);
        }
      }, async getListTeacher() {

        const crs = await getListTeacher({
          StoresID: localStorage.getItem("storesid")
        })
        if (crs.orsuccess == '1') {
          this.teacherList = crs.data;
          this.getListwxMemberCard();
        } else {
          this.$store.commit('fullLoadingFun', false);
          this.$refs.messageChild.toast(crs.Msg)
        }
      }, async getListwxMemberCard() {

        const crs = await getListwxMemberCard({
          StoresID: localStorage.getItem("storesid")
        })
        if (crs.orsuccess == '1') {
          this.MemberCardList = crs.data;
          this.getwxListLevel();
        } else {
          this.$store.commit('fullLoadingFun', false);

          this.$refs.messageChild.toast(crs.Msg)
        }
      }, async getwxListLevel() {

        const crs = await getwxListLevel()
        if (crs.orsuccess == '1') {
          this.Level = crs.data;
          this.getwxRowClassInfo();

        } else {
          this.$store.commit('fullLoadingFun', false);
          this.$refs.messageChild.toast(crs.Msg)
        }
      }, async getwxRowClassInfo() {

        const crs = await getwxRowClassInfo({
          RowClassID: this.RowClassID
        })
        if (crs.orsuccess == '1') {
          this.$store.commit('fullLoadingFun', false);

          this.ruleForm = crs.data;

          this.staTime = crs.data.SKtime;
          this.listRowClassTime = crs.listRowClassTime;
          var str = this.ruleForm.Cycle;
          var arr = str.split(',');
          if (arr.length > 0) {
            this.checkedCycles = arr;
          }
          var str1 = crs.data.AmemberCard;
          var arr1 = str1.split(',');
          if (arr1.length > 0) {
            this.$set(this, 'AmemberCards', arr1);
          }
          let sTime = crs.data.startTime;
          let period = crs.data.PeriodOfTime;
          this.RowClassType = crs.data.RowClassType;


          this.setTimeSlider(sTime, period);

        } else {
          this.$store.commit('fullLoadingFun', false);
          this.$refs.messageChild.toast(crs.Msg)

        }
      }, setTimeSlider(time, stage) {
        if (stage == "1") {
          this.MorningTime = time;
          this.AfternoonTime = "";
          this.EveningTime = "";
        } else if (stage == "2") {
          this.MorningTime = "";
          this.AfternoonTime = time;
          this.EveningTime = "";

        } else if (stage == "3") {
          this.MorningTime = "";
          this.AfternoonTime = "";
          this.EveningTime = time;
        }
      }, RowClassTimeClick() {
        this.startTimenew = "0:00";
        this.PeriodOfTime = "1";
        this.RowClassTimeShow = true;
      }, changeCardID(val) {
        console.log(this.AmemberCards)


      },
      handleChange(val, item) {
        // console.log(val)
        this.ruleForm.Cycle = val.join();
        // console.log(this.ruleForm.Cycle)
      },
      changeTimePeriod(val) {
        if (val == "1") {
          this.MorningTime = "0:00";
          this.ruleForm.startTime = "0:00"
        } else if (val == "2") {
          this.AfternoonTime = "12:00";
          this.ruleForm.startTime = "12:00"
        } else if (val == "3") {
          this.EveningTime = "19:00";
          this.ruleForm.startTime = "19:00"
        }
      },
      changeSlider(val) {

        this.ruleForm.startTime = val;
      }, changeOptions(val) {
        if (val == 1) {
          this.showAmemberCard = true;
          this.ruleForm.AmemberCard = "";
          this.showConsumptionOfClass = true;
          // this.showsinglePrice=false;

        } else if (val == 2) {
          this.showAmemberCard = true;
          this.ruleForm.AmemberCard = "";

          this.showConsumptionOfClass = true;
          //this.showsinglePrice=false;
        } else if (val == 3) {
          this.showAmemberCard = false;
          this.showConsumptionOfClass = false;
          this.ruleForm.AmemberCard = "";

          //this.showConsumptionOfClass=true;
          //this.showsinglePrice=true;
        }
      },
      changeSliderLevel(val) {
        // console.log(val)
        this.Level.forEach((item, index) => {
          if (index == val) {
            this.ruleForm.LevelID = item.ID
            return;
          }
        })
        // console.log(this.ruleForm.LevelID)
      },
      submitForm() {

        this.editwxRowClass();
      }, async editwxRowClass() {
        if (this.showAmemberCard) {
          this.ruleForm.AmemberCard = this.AmemberCards.join();
        }
        this.ruleForm.RowClassType = this.RowClassType;
        let levels = JSON.stringify(this.listRowClassTime);
        this.ruleForm.ListRowClassTime = levels;
        this.ruleForm.startTimes = this.staTime;
        this.ruleForm.RowClassID = this.RowClassID;
        const crs = await editwxRowClass(this.ruleForm)
        // console.log(crs)
        if (crs.orsuccess == '1') {
          this.$router.go(-1);//返回上一层
        } else {
          this.$refs.messageChild.toast(crs.Msg)
        }
      }, addRowClassTimeClick() {
        var startTime = this.startTimenew;
        var endTime = "";

        let arr1 = this.startTimenew.split(":");
        if (arr1.length > 1) {
          var hour = parseInt(arr1[0]);
          var min = parseInt(arr1[1]);
          var Timelength = parseInt(this.ruleForm.Timelength)
          var times = min + Timelength;
          if (times >= 60) {
            hour = hour + 1;
            times = times - 60;
          }

          if (times == 0) {
            times = '00';
          } else if (times < 10) {
            times = '0' + times;
          }

          endTime = hour + ":" + times;

          this.listRowClassTime.push({
            ID: "0",
            RowClassID: this.CurriculumnID,
            startTime: startTime,
            endTime: endTime,
            timeTpey: "1",
            MembersID: "0",
            state: "1",
          })


        }
      },
      changeTimePeriod1(val) {
        if (val == "1") {
          this.MorningTime = "0:00";
          this.startTimenew = "0:00"
        } else if (val == "2") {
          this.AfternoonTime = "12:00";
          this.startTimenew = "12:00"
        } else if (val == "3") {
          this.EveningTime = "19:00";
          this.startTimenew = "19:00"
        }
      }, changeSlider1(val) {

        this.startTimenew = val;
      }, doqren() {

      }, deleteRowClassTime(row, index) {
        row.state = "3";//删除
        this.$set(this.listRowClassTime, index, row)
        // this.LevelData.splice(index,1)
      }

    }
  };
</script>
