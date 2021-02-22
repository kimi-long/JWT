/*
 * @Author: your name
 * @Date: 2020-01-31 20:57:39
 * @LastEditTime: 2020-02-19 18:36:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \课程\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
Vue.use(ElementUI)

import router from './router'
import Promise from "promise-polyfill";
import store from './store'
// import 'swiper/css/swiper.css'

import 'swiper/css/swiper.css' //注意这里

import VueImageSwipe from 'vue-image-swipe'
import 'vue-image-swipe/dist/vue-image-swipe.css'
Vue.use(VueImageSwipe)

import vuePicturePreview from 'vue-picture-preview'

Vue.use(vuePicturePreview)
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)

import Vant from 'vant';
import 'vant/lib/index.css';

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, {
  placeholder: '请输入内容',
  modules:{
    toolbar:[
      ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
      ['blockquote', 'code-block'],     //引用，代码块
      [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
      [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
      [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
      [{ 'direction': 'rtl' }],             // 文本方向
      [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
      [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
      [{ 'font': [] }],     //字体
      [{ 'align': [] }],    //对齐方式
    ]
  }
});

Vue.use(Vant);
import './style/common.css'
import './style/iconfont/iconfont.css' /*引入字体图标*/
import less from 'less'
Vue.use(less)
if(!window.Promise){
    window.Promise = Promise;
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
