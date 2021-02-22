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
    <div style="margin-bottom:10px;margin-top:10px;margin-left:10px;">
     <el-button  size="medium" type="primary" v-if="canAdd" @click="addMemberCradClick">排课</el-button>

      <span  style="margin-left:10px;">{{Stime}}~{{Etime}}</span>

    </div>
 <div class="flexB" style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;">
            <div class="flexS">
           <el-button  size="medium"  type="default" @click="preWeek">上一周</el-button>
          <el-button  size="medium"  type="default" @click="nextWeek">下一周</el-button>
         </div>
        <div class="flexS">
           <el-button size="medium"  type="primary" @click="refreshTable">返回本周</el-button>
         </div>
   </div>
    <van-dropdown-menu active-color="#4aa1ec">
      <van-dropdown-item v-model="RowClassType" :options="option1"  @change="handleRowClassType"/>
      <van-dropdown-item v-model="CourseID" :options="courseList"  @change="handleSearchCourse"/>
      <van-dropdown-item v-model="ClassTeacher" :options="teacherList"  @change="handleSearchCourse"/>
    </van-dropdown-menu>
<!--    <div class="flexB" style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;">-->

<!--               <el-select v-model="RowClassType" style="width:150px;" @change="handleRowClassType">-->
<!--                                    <el-option label="一对多" value="0"></el-option>-->
<!--                                    <el-option label="一对一" value="1"></el-option>-->
<!--             </el-select>&nbsp;-->
<!--             <el-select v-model="CourseID" clearable   style="width:150px;" @change="handleSearchCourse "  placeholder="请选择课程">-->
<!--                   <el-option v-for="item in courseList" :value="item.ID" :label="item.CourseName" :key="item.index">-->
<!--                 </el-option>-->
<!--              </el-select>-->

<!--   </div>-->
<!--   <div class="flexB" v-if="isTeacher=='0'" style="margin-top:10px;margin-left:10px;margin-right:10px;margin-bottom:10px;">-->
<!--            <el-select v-model="ClassTeacher"  style="width:150px;"  clearable @change="handleSearchCourse "   placeholder="请选择老师" >-->
<!--                 <el-option v-for="item in teacherList" :value="item.ID" :label="item.Name" :key="item.index">-->
<!--                  </el-option>-->
<!--              </el-select>-->
<!--   </div>-->


    <div class="stu-order-list stu-order-list2" v-for="items in ListRowClass" >
      <div class="stu-order-list-right">
        <div class="stu-order-list-right-table">
          <div class="stu-order-list-right-img" v-if="items.HeadUrl != '' && items.HeadUrl!=undefined">
            <img :src="items.HeadUrl"  />
          </div>
          <div class="stu-order-list-right-img"  v-if="items.HeadUrl == '' || items.HeadUrl==undefined">

            <img src="../../assets/img/userAvatar.png">

          </div>


          <div class="stu-order-list-right-content">
            <p>
              <span>{{items.Name}}</span>
              <span>{{items.LevelName}}</span>
            </p>
            <p class="className">{{items.CourseName}}</p>
            <p>
                <span>{{items.SKtime}}</span>
                <span>{{items.startTime}}</span>
                <span v-if="items.RowClassType =='1'">私教</span>
            </p>
          </div>
          <div class="stu-order-list-right-btn isActive"  @click="openAction(items)">
            <span>操作</span>
          </div>
<!--          <div class="stu-order-list-right-btn isActive" v-if="canEdit" @click="toStuTeacherDetails(items)">-->
<!--            <span>编辑</span>-->
<!--          </div>-->
<!--           <div class="stu-order-list-right-btn isActive" v-if="canDelete" @click="todel(items)">-->
<!--            <span>删除</span>-->
<!--          </div>-->

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
            是否确定将课表删除？
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
.flexC{
    display: flex;
    justify-content: center;
}
 .flexB{
    display: flex;
    justify-content: space-between;
}
.flexS{
    display: flex;
    justify-content: flex-start;
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

  import { getallListRowClass, delwxRowClass,getListTeacher,getwxlistCourse } from "@/api/getData";
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
        option1: [
          { text: '一对多', value: '0' },
          { text: '一对一', value: '1' },
        ],
        actionLine:{},
        actionshow:false,
        RowClassID:"",
        CourseID:"",
        ClassTeacher:"",
        courseList:[],
        teacherList:[],
        isTeacher:"",
        Stime:"",
        Etime:"",
        today:"",
        isweek:"0",
        RowClassType:"0",
        ListRowClass:[],
        dialogdelVisible:false,
        actions: [{name: '编辑'}, {name: '删除'}],
        selectedStore:localStorage.getItem("storesid"),
                canAdd: false,
                canEdit: false,
                canDelete: false,
                canShow:false,

      }
    },
    components:{
       message
    },
    created() {
      this.getallListRowClass()
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
        }
      },
      async getallListRowClass(){
        this.$store.commit('fullLoadingFun',true);
        const crs = await getallListRowClass({
          StoresID:this.selectedStore ,
          TeacherID:localStorage.getItem("teacherID"),
          today:this.today,
          isweek:this.isweek,
          CourseID:this.CourseID,
          ClassTeacher:this.ClassTeacher,
          RowClassType:this.RowClassType

        })
        if(crs.orsuccess=='1'){
          this.ListRowClass = crs.data;
          this.Stime= crs.Stime;
          this.Etime= crs.Etime;
          this.isTeacher = crs.isTeacher;
          this.getListTeacher();
         }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }
      },async getListTeacher(){
        const crs = await getListTeacher({
          StoresID:localStorage.getItem("storesid"),
          TeacherID:localStorage.getItem("teacherID")
        })
        if(crs.orsuccess=='1'){
          this.teacherList = crs.data;
          this.teacherList.forEach((item,index)=>{
            item.text = item.Name;
            item.value = item.ID;
          });
          let aaa = {
            text : '全部老师',
            value : '',
          };
          this.teacherList.unshift(aaa);
          this.getwxlistCourse();
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },async getwxlistCourse(){
        const crs = await getwxlistCourse({
          StoresID:localStorage.getItem("storesid")
        })
        if(crs.orsuccess=='1'){
          this.courseList = crs.data
          this.courseList.forEach((item,index)=>{
            item.text = item.CourseName;
            item.value = item.ID;
          });
          let aaa = {
            text : '全部课程',
            value : '',
          };
          this.courseList.unshift(aaa);
          this.$store.commit('fullLoadingFun',false);
        }else{
          this.$refs.messageChild.toast(crs.Msg)
          this.$store.commit('fullLoadingFun',false);
        }

      },handleRowClassType(){
        this.getallListRowClass();
      },handleSearchCourse(){
                this.getallListRowClass();
            }, getButtonPermissions(){
                let PagePermission = [];
                let allPermission = localStorage.getItem('Limits').split(',');
                allPermission.forEach(element =>{
                     switch(element){
                        case '41':
                        this.canAdd = true;
                        break;
                        case '42':
                        this.canEdit = true;
                        break;
                        case '43':
                        this.canDelete = true;
                        break;
                        case '44':
                        this.canShow = true;
                        break;
                    }
                })
            },
      preWeek(){
        this.today=this.Stime;
        this.isweek='1';
        this.getallListRowClass();

      }, nextWeek(){
        this.today=this.Etime;
        this.isweek='2';
        this.getallListRowClass();

      }, refreshTable(){
        this.today="";
        this.isweek='0';
        this.getallListRowClass();
      },
      toStuTeacherDetails(items){
        localStorage.setItem("RowClassID",items.ID)
        this.$router.push('/editcurriculum')
      },addMemberCradClick(){
           this.$router.push('/addcurriculum')
      },todel(items){
        this.RowClassID= items.ID;
        Dialog.confirm({
          title: '删除提醒',
          message: '是否确定将课表删除？',
        })
          .then(() => {
            this.dodel();
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        // this.dialogdelVisible = true;

      },dodel(){
         this.delwxRowClass();
      },async delwxRowClass(){
             const crs = await delwxRowClass({
                     RowClassID:this.RowClassID
                })
                // console.log(crs)
                if(crs.orsuccess == '1'){
                    this.dialogdelVisible = false;
                     this.getallListRowClass();
                }else{
                  this.$refs.messageChild.toast(crs.Msg)
                }
      }
    },
  }
</script>
