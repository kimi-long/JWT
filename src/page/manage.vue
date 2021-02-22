<!--
 * @Author: your name
 * @Date: 2019-12-19 18:20:02
 * @LastEditTime : 2020-02-06 20:57:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \haohaohao\src\page\miuManage.vue
 -->
<template>		  
  <div>
	  <router-view></router-view>
  </div>
</template>
<script>
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
    WeixinJSBridge.call('hideOptionMenu');
  });
import {baseUrl,loginUrl}from'../config/env.js';

import Vue from 'vue';
import $ from 'jquery';
import { ajax } from "../config/fetch.js";

export default {
	data() {
	
	},
	computed: {
	},
	created () {
		test()
	},
	methods: {
	},
	components:{
		
	}
}
</script>
