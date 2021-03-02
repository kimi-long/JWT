<template>
  <div class="navbarWrapper">
    <div class="topStore">
      <div class="topImg" :style="{backgroundImage: 'url(' + topInfo.HeadUrl + ')'}" v-if="topInfo.HeadUrl">
      </div>
      <div class="topImg" style="background-image: url('../../../static/gztmoren.png')" v-else>
      </div>
      <div class="topInfo">
        <div class="name">{{topInfo.StoresName}}</div>
        <div class="other">有效期至：{{topInfo.DueToTime}}</div>
        <div class="other">{{topInfo.Address}}</div>
      </div>
    </div>
    <div class="numberBox" v-if="isgzt == 1">
      <div class="numList">
        <div class="numItem">
          <div class="numNumber">{{numOb.num}}</div>
          <div class="numTitle">今日新增会员</div>
        </div>
        <div class="numItem">
          <div class="numNumber">{{numOb.num2}}</div>
          <div class="numTitle">今日需上课人数</div>
        </div>
        <div class="numItem">
          <div class="numNumber">{{numOb.num3}}</div>
          <div class="numTitle">待续期人数</div>
        </div>


      </div>
    </div>
    <div class="gongBox">
      <div class="gongtitle">教务中心</div>
      <van-grid :column-num="3">
        <van-grid-item @click="toteaOrder">
          <div class="gongItem">
            <div>
              <i class="green iconfont icon-yuyuehuodong"></i>
            </div>
            <div>约课情况</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toRowClass">
          <div class="gongItem">
            <div>
              <i class="blue iconfont icon-keshi_m"></i>
            </div>
            <div>课程表</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toCourse">
          <div class="gongItem">
            <div>
              <i class="orange iconfont icon-kecheng"></i>
            </div>
            <div>课程管理</div>
          </div>
        </van-grid-item>

        <van-grid-item  @click="toTeacher">
          <div class="gongItem">
            <div>
              <i class="pink iconfont icon-laoshi"></i>
            </div>
            <div>员工管理</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toMembers">
          <div class="gongItem">
            <div>
              <i class="black iconfont icon-wodedangxuan"></i>
            </div>
            <div>会员管理</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toMemberCard">
          <div class="gongItem">
            <div>
              <i class="purple iconfont icon-huiyuanqia"></i>
            </div>
            <div>会员卡管理</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toxuqi">
          <div class="gongItem">
            <div>
              <i class="orange iconfont icon-time_icon"></i>
            </div>
            <div>续费预警</div>
          </div>
        </van-grid-item>
        <van-grid-item @click="toMyMsg">
          <div class="gongItem">
            <div>
              <i class="blue iconfont icon-xiaoxixinfengnews2"></i>
            </div>
            <div>消息中心</div>
          </div>
        </van-grid-item>
<!--        <van-grid-item @click="toshangpingxiaoshou">-->
<!--          <div class="gongItem" v-if="shangpintj == 1">-->
<!--            <div>-->
<!--              <i class="blue iconfont icon-shangpingtongji"></i>-->
<!--            </div>-->
<!--            <div>商品销售统计</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item @click="togongzimingxi">-->
<!--          <div class="gongItem">-->
<!--            <div>-->
<!--              <i class="red iconfont icon-gongzi"></i>-->
<!--            </div>-->
<!--            <div>工资明细</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
      </van-grid>
    </div>
    <!--    <div class="gongBox">-->
    <!--      <div class="gongtitle">财务统计</div>-->
    <!--      <van-grid :column-num="3">-->
    <!--        <van-grid-item v-if="xiaoketj == 1" @click="toxiaoke">-->
    <!--          <div class="gongItem">-->
    <!--            <div>-->
    <!--              <i class="green iconfont icon-kechengtongji"></i>-->
    <!--            </div>-->
    <!--            <div>消课统计</div>-->
    <!--          </div>-->
    <!--        </van-grid-item>-->
    <!--        <van-grid-item v-if="xufeitj == 1" @click="toxufeitongji">-->
    <!--          <div class="gongItem">-->
    <!--            <div>-->
    <!--              <i class="orange iconfont icon-xufei"></i>-->
    <!--            </div>-->
    <!--            <div>续费统计</div>-->
    <!--          </div>-->
    <!--        </van-grid-item>-->
    <!--        <van-grid-item @click="toshangpingxiaoshou">-->
    <!--          <div class="gongItem" v-if="shangpintj == 1">-->
    <!--            <div>-->
    <!--              <i class="blue iconfont icon-shangpingtongji"></i>-->
    <!--            </div>-->
    <!--            <div>商品销售统计</div>-->
    <!--          </div>-->
    <!--        </van-grid-item>-->
    <!--        <van-grid-item @click="togongzimingxi">-->
    <!--          <div class="gongItem">-->
    <!--            <div>-->
    <!--              <i class="red iconfont icon-gongzi"></i>-->
    <!--            </div>-->
    <!--            <div>工资明细</div>-->
    <!--          </div>-->
    <!--        </van-grid-item>-->

    <!--      </van-grid>-->
    <!--    </div>-->
    <div style="height: 70px;"></div>
    <teacher-bottom></teacher-bottom>
  </div>
</template>

<script>
  import teacherBottom from "@/components/teacherBottom";
  import { getTerHomeInfo } from "@/api/getData";

  export default {
    components: {teacherBottom},
    data() {
      return {

        indexNum: 1,
        topInfo: {
          StoresName:'',
          DueToTime:'',
          Address:'',
          HeadUrl:'',
        },
        kebiao:0,
        xueyuan:0,
        banji:0,
        xiaoketj:0,
        xufeitj:0,
        shangpintj:0,
        isadmin:0,
        isTeacher:0,

        isgzt:false,
        numOb:{
          num:99,
          num2:6,
          num3:233,
        }
      }
    },

    created() {
      this.getTerHomeInfo();
    },

    destroyed() {

    },

    mounted() {

    },
    computed: {},
    methods: {
      toxuqi(){
        this.$router.push('/activeList')
      },
      toMemberCard(){
        this.$router.push('/kabao')
      },
      toMembers(){
        this.$router.push('/memberList')
      },
      toTeacher(){
        this.$router.push('/teaList')
      },
      toRowClass(){
        this.$router.push('/curriculum')
      },
      toteaOrder(){
        this.$router.push('/teaOrder')
      },
      toMyMsg(){
        this.$router.push('/teaMsg')
      },
      toCourse(){
        this.$router.push('/courseList')
      },
      async getTerHomeInfo(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getTerHomeInfo({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.topInfo ={
            StoresName:crs.StoresName,
            DueToTime:crs.DueToTime,
            Address:crs.Address,
            HeadUrl:crs.HeadUrl,
          };
          this.isgzt = crs.isgzt;
          this.kebiao = crs.kebiao;
          this.xueyuan = crs.xueyuan;
          this.banji = crs.banji;
          this.xiaoketj = crs.xiaoketj;
          this.xufeitj = crs.xufeitj;
          this.xufeitj = crs.xufeitj;
          this.shangpintj = crs.shangpintj;
          this.isadmin = crs.isadmin;
          this.isTeacher = crs.isTeacher;
          localStorage.setItem("isadmin",crs.isadmin);
          localStorage.setItem("isTeacher",crs.isTeacher);
          this.numOb = {
            num:crs.jiricount,
            num2:crs.yuyuecount,
            num3:crs.yuyuecount,
          };
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },

    }
  }

</script>

<style lang="less" scoped>
  .navbarWrapper {
    margin-top: -50px;
    overflow-x: hidden;
    background: #f4f5f6;
    .topStore {
      height: 100px;
      padding: 20px;
      background-color: #fff;
      display: flex;

      .topImg {
        border-radius: 5px;
        background-position: 50%;
        background-size: cover;
        overflow: hidden;
        height: 100px;
        width: 100px;
      }

      .topInfo {
        padding: 5px 0;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          font-size: 18px;
          font-weight: bold;
        }

        .other {
          font-size: 14px;
          color: rgb(120, 120, 120);
        }
      }
    }

    .gongBox {
      background-color: #fff;
      margin-top: 20px;

      .gongtitle {
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
      }

      .gongItem {
        padding: 5px 0;
        text-align: center;

        .iconfont {
          font-size: 32px;
        }

        .red {
          color: red;
        }

        .pink {
          color: rgb(237, 121, 121);
        }

        .blue {
          color: rgb(72, 175, 249);
        }
        .black {
          color: rgb(28 ,28, 28);
        }
        .yellow {
          color: #f4ea2a;
        }

        .green {
          color: #0bb20c;
        }

        .orange {
          color: #FF8C00;
        }
        .purple{
          color: 	#D15FEE;
        }
      }
    }
    .numberBox{
      height: 80px;
      margin-top: 20px;
      background-color: #fff;
      .numList{

        width: auto;
        white-space:nowrap;
        .numItem{
          margin: 13px 0 15px;
          text-align: center;
          display: inline-block;
          width: 33.3VW;
          .numNumber{
            color: rgb(72, 175, 249);
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }


</style>
