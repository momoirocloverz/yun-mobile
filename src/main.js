//import Vconsole from 'vconsole';
  //const vConsole = new Vconsole();

// #ifndef VUE3
import Vue from 'vue';
import App from './App';
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
  ...App,
});

import baseFont from '@/utils/baseFont.js';
Vue.prototype.$baseFontTitle = baseFont.$baseFontTitle;

 //app.use(vConsole);

app.$mount();
// #endif

// #ifdef VUE3

import { createSSRApp } from 'vue';
import App from './App.vue';
import nav from '@/utils/navRoute.js';

var change = false;

var final_url = window.location.href;

console.log(final_url);

// console.log("indexof",window.location.href.indexOf("#/pages/login/auth"));

if (window.location.href.indexOf('#/pages/login/auth') > -1) {
  var without_path = window.location.href.replace('1=1&', '').replace('#/pages/login/auth', '');
  //   console.log("without_path",without_path)

  var ticket = without_path.split('?')[1];
  //   console.log("ticket",ticket)

  final_url = 'https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html#/pages/login/auth?' + ticket;
  console.log('final_url', final_url);
  change = true;
}

if (change) {
  window.onpageshow = (event) => {
    if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
      ZWJSBridge.close();
    }
  };
  window.location.href = final_url;
}

export function createApp() {
  const app = createSSRApp(App);

   //app.use(vConsole)

  app.config.globalProperties.$navTo = nav;
  return {
    app,
  };
}
// #endif
