/*
 * @Author: your name
 * @Date: 2020-01-31 20:57:39
 * @LastEditTime: 2020-04-25 10:08:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

import initialPage from '@/page/initialPage'
import login from '@/page/login'
import dianPingPage from '@/page/dianPingPage'

import teaOrder from '@/page/teacher/teaOrder'
import teaOwner from '@/page/teacher/teaOwner'
import teaMyHome from '@/page/teacher/teaMyHome'
import teaMsg from '@/page/teacher/teaMsg'
import teaOrderDetails from '@/page/teacher/teaOrderDetails'
import addkabao from '@/page/teacher/addkabao'
import kabao from '@/page/teacher/kabao'
import teaList from '@/page/teacher/teaList'
import addTeach from '@/page/teacher/addTeach'
import editTeach from '@/page/teacher/editTeach'
import editkabao from '@/page/teacher/editkabao'
import courseList from '@/page/teacher/courseList'
import addcourse from '@/page/teacher/addcourse'
import editcourse from '@/page/teacher/editcourse'
import curriculum from '@/page/teacher/curriculum'
import addcurriculum from '@/page/teacher/addcurriculum'
import editcurriculum from '@/page/teacher/editcurriculum'
import activeList from '@/page/teacher/activeList'
import memberList from '@/page/teacher/memberList'
import addmember from '@/page/teacher/addmember'
import editmember from '@/page/teacher/editmember'
import CardVipList from '@/page/teacher/CardVipList'
import gzt from '@/page/teacher/gzt'



import stuIndex from '@/page/student/stuIndex'
import stuCard from '@/page/student/stuCard'

import stuOrder from '@/page/student/stuOrder'
import stuPrivateOrder from '@/page/student/stuPrivateOrder'
import stuOwner from '@/page/student/stuOwner'
import stuTeacher from '@/page/student/stuTeacher'
import stuTeacherDetails from '@/page/student/stuTeacherDetails'
import stuEvaluateTea from '@/page/student/stuEvaluateTea'
import stuOrderDetails from '@/page/student/stuOrderDetails'
import stuFeedback from '@/page/student/stuFeedback'
import stuMsg from '@/page/student/stuMsg'
import myCourse from '@/page/student/myCourse'
import myCourseDetails from '@/page/student/myCourseDetails'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'initialPage',
      component: initialPage
    },
    {
      path: '/initialPage',
      name: 'initialPage',
      component: initialPage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/dianPingPage',
      name: 'dianPingPage',
      component: dianPingPage
    },
    {
      path: '/teaOrder',
      name: 'teaOrder',
      component: teaOrder
    },
    {
      path: '/gzt',
      name: 'gzt',
      component: gzt
    },
    {
      path: '/teaOrderDetails',
      name: 'teaOrderDetails',
      component: teaOrderDetails
    },
    {
      path: '/teaOwner',
      name: 'teaOwner',
      component: teaOwner
    },

    {
      path: '/kabao',
      name: 'kabao',
      component: kabao
    },
    {
      path: '/addkabao',
      name: 'addkabao',
      component: addkabao
    },
    {
      path: '/addmember',
      name: 'addmember',
      component: addmember
    },
    {
      path: '/editmember',
      name: 'editmember',
      component: editmember
    },

    {
      path: '/editcourse',
      name: 'editcourse',
      component: editcourse
    },
    {
      path: '/curriculum',
      name: 'curriculum',
      component: curriculum
    },
    {
      path: '/addcurriculum',
      name: 'addcurriculum',
      component: addcurriculum
    },
    {
      path: '/editcurriculum',
      name: 'editcurriculum',
      component: editcurriculum
    }
    ,{
      path: '/editkabao',
      name: 'editkabao',
      component: editkabao
    },
    {
      path: '/teaList',
      name: 'teaList',
      component: teaList
    },
    {
      path: '/activeList',
      name: 'activeList',
      component: activeList
    },
    {
      path: '/memberList',
      name: 'memberList',
      component: memberList
    },
    {
      path: '/CardVipList',
      name: 'CardVipList',
      component: CardVipList
    },
    {
      path: '/courseList',
      name: 'courseList',
      component: courseList
    },
    {
      path: '/addcourse',
      name: 'addcourse',
      component: addcourse
    }


    ,{
      path: '/addTeach',
      name: 'addTeach',
      component: addTeach
    },{
      path: '/editTeach',
      name: 'editTeach',
      component: editTeach
    },
    {
      path: '/teaMyHome',
      name: 'teaMyHome',
      component: teaMyHome
    },
    {
      path: '/teaMsg',
      name: 'teaMsg',
      component: teaMsg
    },
    {
      path: '/stuIndex',
      name: 'stuIndex',
      component: stuIndex
    },
    {
      path: '/stuCard',
      name: 'stuCard',
      component: stuCard
    },
    {
      path: '/stuOrder',
      name: 'stuOrder',
      component: stuOrder
    },{
      path: '/stuPrivateOrder',
      name: 'stuPrivateOrder',
      component: stuPrivateOrder
    },
    {
      path: '/stuOwner',
      name: 'stuOwner',
      component: stuOwner
    },
    {
      path: '/stuTeacher',
      name: 'stuTeacher',
      component: stuTeacher
    },
    {
      path: '/stuTeacherDetails',
      name: 'stuTeacherDetails',
      component: stuTeacherDetails
    },
    {
      path: '/stuEvaluateTea',
      name: 'stuEvaluateTea',
      component: stuEvaluateTea
    },
    {
      path: '/stuOrderDetails',
      name: 'stuOrderDetails',
      component: stuOrderDetails
    },
    {
      path: '/stuFeedback',
      name: 'stuFeedback',
      component: stuFeedback
    },
    {
      path: '/stuMsg',
      name: 'stuMsg',
      component: stuMsg
    },
    {
      path: '/myCourse',
      name: 'myCourse',
      component: myCourse
    },
    {
      path: '/myCourseDetails',
      name: 'myCourseDetails',
      component: myCourseDetails
    },

  ]
})
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

// const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');

// // 手机端页面路由配置
// const order = r => require.ensure([], () => r(require('@/page/teacher/order')), 'order');
// // const miuBargain = r => require.ensure([], () => r(require('@/page/mPhonePage/miuBargain')), 'miuBargain');
// // const miuEnrolment = r => require.ensure([], () => r(require('@/page/mPhonePage/miuEnrolment')), 'miuEnrolment');
// // const miuScratchCard = r => require.ensure([], () => r(require('@/page/mPhonePage/miuScratchCard')), 'miuScratchCard');
// // const miuSingleGroup = r => require.ensure([], () => r(require('@/page/mPhonePage/miuSingleGroup')), 'miuSingleGroup');
// // const miuLadderGroup = r => require.ensure([], () => r(require('@/page/mPhonePage/miuLadderGroup')), 'miuLadderGroup');

// const routes = [
//     {
//       path: '/',
//       name: '/',
//       component: order
//     },
//     {
//         path: '/manage',
//         name: '/manage',
//         component: manage,
//         name: '',
//         children: [
//           {
//             path: '',
//             name: '',
//             meta: [],
//           },
//           {
//               path: '/order',
//               name: '/order',
//               component: order,
//               meta: ['预约'],
//           }
//         ]
//     }
//   ]

// export default new Router({
//     routes,
//     strict: process.env.NODE_ENV !== 'production',
// })
