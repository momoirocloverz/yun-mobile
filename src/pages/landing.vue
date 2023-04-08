<template>
  <view style="box-sizing: border-box; padding-bottom: 0px"> </view>
</template>
<script>
import Mgop from '@/mgopService';
import { authx_wechat, wechat_userinfo } from '@/api/api.js';
export default {
  data() {
    return {};
  },
  onLoad() {},
  onShow() {},

  async mounted() {
    //来这个页面只做2件事，跳转和获取是否是适老版本！

    //如果这是微信端
    var isWehat = await this.isWechat();

    if (isWehat) {
      this.wechatHandle();
    } else {
      this.dtDreamHandle();
    }
  },
  methods: {
    // 重写登录逻辑

    async isWechat() {
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
      //console.log('bIsAlipayMini', bIsAlipayMini);

      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      //console.log('bIsDtDreamApp浙里办app', bIsDtDreamApp);
      const ssoFlag = await ZWJSBridge.ssoTicket({});
      //console.log('ssoFlag', ssoFlag);

      //console.log('complex', ssoFlag && ssoFlag.result != false && !bIsAlipayMini && !bIsDtDreamApp);
      return ssoFlag && ssoFlag.result != false && !bIsAlipayMini && !bIsDtDreamApp;
    },

    wechatHandle() {
      console.log('weixin');
      var that = this;
      var uiStyle = this.getParam('_uiStyle', 'normal');
      if (uiStyle == 'elder') {
        uni.setStorageSync('version', 'old');
      } else {
        uni.setStorageSync('version', 'new');
      }

      var ticket_id = that.getParam('ticketId', '');
      console.log('wx ticket_id', ticket_id);
      authx_wechat({ ticket: ticket_id }).then((res) => {
        console.log('authx', res);
        console.log(res.data.token);
        uni.setStorageSync('token', res.data.token);
        uni.setStorageSync('authx', res);
        uni.setStorageSync('ding_token', res.data.ding_token);
        if (res.data.code == 0) {
          wechat_userinfo({ ding_token: res.data.ding_token }).then((resx) => {
            console.log(resx);
            var user_info = JSON.parse(resx.data);
            console.log('user_info', user_info);
            uni.setStorageSync('role', '志愿者');
            uni.setStorageSync('name', user_info.data.personInfo.userNameEnc);
            uni.setStorageSync('id', user_info.data.personInfo.userId);
            // console.log('validate ticket', resx);
            uni.showToast({
              title: '登录成功！',
              icon: 'none',
            });
            // 跳转首页
            uni.reLaunch({
              url: '/pages/newIndex/index',
            });
          });
        } else if (res.data.code == 1) {
          //   console.log('ding_id', res.data);
          uni.setStorageSync('ding_id', res.data.openid);
          uni.reLaunch({
            url: '/pages/tourists/index',
          });
        }
      });
    },

    dtDreamHandle() {
      window.ZWJSBridge.getUiStyle()
        .then((result) => {
          console.log('ZWJSBridge uiStyle ', result);
          if (result.uiStyle == 'normal') {
            uni.setStorageSync('version', 'new');
          } else {
            uni.setStorageSync('version', 'old');
          }
          //   console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      window.onpageshow = (event) => {
        if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
          ZWJSBridge.close();
        }
      };
      window.location.replace(
        'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth',
      );
        //   window.location.replace(
        //   'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/v124/index.html?debug=true%23/pages/login/auth',
        // );
    },

    getParam(name, defaultValue) {
      const query = window.location.search.substring(1);
      const vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] == name) {
          return pair[1];
        }
      }
      return defaultValue == undefined ? null : defaultValue;
    },
  },
};
</script>
