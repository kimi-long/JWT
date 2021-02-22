/*
 * @Author: your name
 * @Date: 2019-12-09 19:25:11
 * @LastEditTime: 2020-04-25 20:52:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \好学通\src\api\getData.js
 */
import fetch from '@/config/fetch'
// export const signout = () => fetch('/admin/singout');
// export const getHomeInfo = data => fetch('/WebApi/getHomeInfo.aspx',data, 'POST','true');



// export const dianPingPage = data => fetch('/dianPingPage.aspx',data, 'POST');

export const GZHgetReviewinfo = data => fetch('/GZHgetReviewinfo.aspx',data, 'POST','true');

//教师登陆
export const teacherLogin = data => fetch('/TeacherLogin.aspx',data, 'POST','true');
export const WXUploadlistimg = data => fetch('/WXUploadlistimg.aspx',data, 'POST','true');

// 获取消息详情
export const getListTeacherNotice = data => fetch('/getListTeacherNotice.aspx',data, 'POST','true');

// 上传图片
export const WXUploadimg = data => fetch('/WXUploadimg.aspx',data, 'POST','true');

// 老师详情
export const getTeacherInfo = data => fetch('/getTeacherInfo.aspx',data, 'POST','true');

// 修改老师信息
export const editTeacherInfo = data => fetch('/editTeacherInfo.aspx',data, 'POST','true');

// 获取当天课程
export const getTodayCourse = data => fetch('/getTodayCourse.aspx',data, 'POST','true');

// 签到或者取消
export const editStudentState = data => fetch('/editStudentState.aspx',data, 'POST','true');

// 课程详情
export const getRowClassinfo = data => fetch('/getRowClassinfo.aspx',data, 'POST','true');

// 添加课堂实拍
export const addReviewCourseImg = data => fetch('/addReviewCourseImg.aspx',data, 'POST','true');

// 点击点评按钮获取点评内容
export const getReviewinfo = data => fetch('/getReviewinfo.aspx',data, 'POST','true');
export const getListwxMemberCard = data => fetch('/getListwxMemberCard.aspx',data, 'POST','true');
export const delwxMemberCard = data => fetch('/delwxMemberCard.aspx',data, 'POST','true');
export const getListTeacher = data => fetch('/getListTeacher.aspx',data, 'POST','true');
export const delTeacher = data => fetch('/delTeacher.aspx',data, 'POST','true');
export const getwxListRole = data => fetch('/getwxListRole.aspx',data, 'POST','true');
export const addTeacher = data => fetch('/addTeacher.aspx',data, 'POST','true');
export const editTeacher = data => fetch('/editTeacher.aspx',data, 'POST','true');
export const getwxTeacherInfo = data => fetch('/getwxTeacherInfo.aspx',data, 'POST','true');
export const editTeacherBinDing = data => fetch('/editTeacherBinDing.aspx',data, 'POST','true');
export const addwxMemberCard = data => fetch('/addwxMemberCard.aspx',data, 'POST','true');
export const getwxMemberCard = data => fetch('/getwxMemberCard.aspx',data, 'POST','true');
export const editwxMemberCard = data => fetch('/editwxMemberCard.aspx',data, 'POST','true');
export const TerChangePassword = data => fetch('/TerChangePassword.aspx',data, 'POST','true');

export const getwxlistCourse = data => fetch('/getwxlistCourse.aspx',data, 'POST','true');
export const editwxCourse = data => fetch('/editwxCourse.aspx',data, 'POST','true');
export const AddwxCourse = data => fetch('/AddwxCourse.aspx',data, 'POST','true');
export const delwxCourse = data => fetch('/delwxCourse.aspx',data, 'POST','true');
export const getwxListLevel = data => fetch('/getwxListLevel.aspx',data, 'POST','true');
export const getwxCourseInfo = data => fetch('/getwxCourseInfo.aspx',data, 'POST','true');
export const getallListRowClass = data => fetch('/getallListRowClass.aspx',data, 'POST','true');
export const delwxRowClass = data => fetch('/delwxRowClass.aspx',data, 'POST','true');
export const addwxRowClass = data => fetch('/addwxRowClass.aspx',data, 'POST','true');
export const editwxRowClass = data => fetch('/editwxRowClass.aspx',data, 'POST','true');

export const getListYJStu = data => fetch('/getListYJStu.aspx',data, 'POST','true');
export const WxContractToRemind = data => fetch('/WxContractToRemind.aspx',data, 'POST','true');

export const getListwxMembers = data => fetch('/getListwxMembers.aspx',data, 'POST','true');
export const addwxMembers = data => fetch('/addwxMembers.aspx',data, 'POST','true');
export const editwxMembers = data => fetch('/editwxMembers.aspx',data, 'POST','true');
export const delwxMembers = data => fetch('/delwxMembers.aspx',data, 'POST','true');
export const getwxMembersInfo = data => fetch('/getwxMembersInfo.aspx',data, 'POST','true');
export const addwxMembersvip = data => fetch('/addwxMembersvip.aspx',data, 'POST','true');
export const editWXCardNumber = data => fetch('/editWXCardNumber.aspx',data, 'POST','true');
export const getwxListMembersvip = data => fetch('/getwxListMembersvip.aspx',data, 'POST','true');
export const delwxMembersvip = data => fetch('/delwxMembersvip.aspx',data, 'POST','true');
export const getwxRowClassInfo = data => fetch('/getwxRowClassInfo.aspx',data, 'POST','true');
export const addwxMembersvipXK = data => fetch('/addwxMembersvipXK.aspx',data, 'POST','true');

export const getListCradImg = data => fetch('/getListCradImg.aspx',data, 'POST','true');

// 获取用户是否绑定公众号
export const getLoginInfo = data => fetch('/getLoginInfo.aspx',data, 'POST','true');

export const getLoginInfoweb = data => fetch('/getLoginInfoweb.aspx',data, 'POST','true');

// 老师绑定
export const teacherbinding = data => fetch('/Teacherbinding.aspx',data, 'POST','true');

// 添加评论
export const addReview = data => fetch('/addReview.aspx',data, 'POST','true');

// 添加评论图片
export const addReviewImg = data => fetch('/addReviewImg.aspx',data, 'POST','true');

// 老师修改点评
export const editReview = data => fetch('/editReview.aspx',data, 'POST','true');

export const getTeaPreAbout = data => fetch('/getTeaPreAbout.aspx',data, 'POST','true');

export const editStudentStateNew = data => fetch('/editStudentStateNew.aspx',data, 'POST','true');

export const getstuListRowClassTime = data => fetch('/getstuListRowClassTime.aspx',data, 'POST','true');



// 修改消息为已读状态
export const updTeacherNoticeRead = data => fetch('/updTeacherNoticeRead.aspx',data, 'POST','true');

// 我的页面 数据
export const getMyinfo = data => fetch('/getMyinfo.aspx',data, 'POST','true');


export const sendPush = data => fetch('/sendPush.aspx',data, 'POST','true');


// 学生端登录接口
export const studentLogin = data => fetch('/StudentLogin.aspx',data, 'POST','true');

export const StudentLoginNew = data => fetch('/StudentLoginNew.aspx',data, 'POST','true');



// 获取店铺名称列表
export const stuGetListStoresName = data => fetch('/StuGetListStoresName.aspx',data, 'POST','true');

// 获取当天课程
export const stuGetTodayCourse = data => fetch('/StuGetTodayCourse.aspx',data, 'POST','true');

// 获取消息详情
export const stuGetListNotice = data => fetch('/StuGetListNotice.aspx',data, 'POST','true');

// 修改消息为已读状态
export const stueditNoticeRead = data => fetch('/StueditNoticeRead.aspx',data, 'POST','true');

// 添加反馈
export const stuAddFeedback = data => fetch('/StuAddFeedback.aspx',data, 'POST','true');

// 预约列表
export const stuGetListPreAbout = data => fetch('/StuGetListPreAbout.aspx',data, 'POST','true');

// 约课详情
export const stuGePreAboutInfo = data => fetch('/StuGePreAboutInfo.aspx',data, 'POST','true');

// 立即预约
export const stuAddPreAbout = data => fetch('/StuAddPreAbout.aspx',data, 'POST','true');

// 课程详情
export const stuCourseInfo = data => fetch('/StuCourseInfo.aspx',data, 'POST','true');

// 老师列表
export const stuGetListTeacher = data => fetch('/StuGetListTeacher.aspx',data, 'POST','true');

// 老师详情
export const stuGetTeacherInfo = data => fetch('/StuGetTeacherInfo.aspx',data, 'POST','true');

// 学员评价老师
export const stuAddReviewTeacher = data => fetch('/StuAddReviewTeacher.aspx',data, 'POST','true');

// 学员取消预约
export const stuUpdPreAboutState = data => fetch('/StuUpdPreAboutState.aspx',data, 'POST','true');

// 回复评论
export const stuAddReview = data => fetch('/StuAddReview.aspx',data, 'POST','true');

// 获取学员详情
export const stuGetStudentInfo = data => fetch('/StuGetStudentInfo.aspx',data, 'POST','true');


export const getStuStoresDetails = data => fetch('/getStuStoresDetails.aspx',data, 'POST','true');

// 我的会员卡
export const getListStuvip = data => fetch('/getListStuvip.aspx',data, 'POST','true');

export const getTerHomeInfo = data => fetch('/getTerHomeInfo.aspx',data, 'POST','true');
