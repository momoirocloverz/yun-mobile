<template>
  <view class="">
    {{ msg }}
  </view>
</template>

<script>
import { authx, valid_token } from '@/api/api.js';

export default {
  data() {
    return {};
  },
  onLoad(opt) {},
  created() {
    var ticket = this.$route.query.ticket;
    console.log('ticket', ticket);
    authx({ ticket: ticket }).then((res) => {
      console.log('authx', res);

      console.log(res.data.token);
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('authx', res);
      uni.setStorageSync('ding_token', res.data.ding_token);

      if (res.data.code == 0) {
        uni.setStorageSync('auth_type', '0');
        // 获取用户信息
        valid_token({ token: res.data.token }).then((resx) => {
          // uni.setStorageSync('role', '志愿者');
          uni.setStorageSync('name', resx.data.nickName);
          uni.setStorageSync('id', resx.data.id);
          console.log('validate ticket', resx);
          uni.showToast({
            title: '登录成功！',
            icon: 'none',
          });


          window.onpageshow = (event) => {
            if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
              ZWJSBridge.close()
            }
          }
          // 跳转首页
          uni.reLaunch({
            url: '/pages/newIndex/index',
          });
        });
      } else if (res.data.code == 1) {
        console.log('ding_id', res.data);
        uni.setStorageSync('ding_id', res.data.openid);
        uni.setStorageSync('auth_type', '1');

        // uni.reLaunch({
        //   url: '/pages/tourists/index',
        // })

        window.onpageshow = (event) => {
            if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
              ZWJSBridge.close()
            }
          }

        uni.reLaunch({
          url: '../tourists/index',
        });
      }

      //
    });
  },
  mounted() {
    window.ZWJSBridge.monitorTrace({
      monitorType: 'pageIn',
      module: 'login-auth',
      bizInfo: {},
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //var code = this.$route.query.code;

    /*
    
    请注意，需要修改
    
    */

    // console.log("code", code);

    //console.log("ticket", ticket);

    // if (code == -1) {

    // } else if (code == 1) {

    // } else {
    //   var token = this.$route.query.token;
    //   uni.setStorageSync("token", token);

    //   console.log("received token", token);

    //   valid_token().then((res) => {
    //     console.log("valid_token",res);
    //   });
    // }
  },
  methods: {},
};
</script>

<style lang="scss"></style>
