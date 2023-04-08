<template>
  <view class="container">
    <view class="list">
      <view class="user" style="margin-bottom: 30rpx">
        <uni-icons type="person-filled" color="#000000" size="18"></uni-icons><text>账号</text>
        <input class="sl-input" type="number" maxlength="11" v-model="form.phone" placeholder="请输入账号" />
      </view>
      <view class="user">
        <uni-icons type="locked-filled" color="#000000" size="18"></uni-icons><text>密码</text>
        <input class="sl-input" type="text" maxlength="32" v-model="form.password" placeholder="请输入密码" password="true" />
      </view>
    </view>
    <view class="btnlogin">
      <button @click="inputlogin" hover-class="button-hover">登录</button>
    </view>
    <!-- <view class="kuaijie1">
			快捷登录
		</view> -->
    <!-- <view class="kuaijie">
			<view class="button-login" hover-class="button-hover" @click="bindLogin">
				镇街登录
			</view>
			<view class="button-login" hover-class="button-hover" @click="xlogin">
				巡查员登录
			</view>
			<view class="button-login" hover-class="button-hover" @click="dlogin">
				第三方登录
			</view>
			<view class="button-login" hover-class="button-hover" @click="zjogin">
				专家小组登录
			</view>
			<view class="button-login" hover-class="button-hover" @click="zlogin">
				志愿者登录
			</view>
			<view class="button-login" hover-class="button-hover" @click="dlogin">
				党员登录
			</view>
		</view> -->
  </view>
</template>
<script>
import { postLogin } from '../../api/api.js';
export default {
  data() {
    return {
      show: 'block',
      form: {
        phone: null,
        password: null,
      },
      zjlogin: {
        phone: '18232265589',
        password: '123456',
      },
      xcylogin: {
        phone: '13967141828',
        password: '123456',
      },
      dsflogin: {
        phone: '13365146664',
        password: '123456',
      },
      zjxzlogin: {
        phone: '18023659999',
        password: '123456',
      },
      zyzlogin: {
        phone: '18021316555',
        password: '123456',
      },
      dylogin: {
        phone: '18021315555',
        password: '123456',
      },
    };
  },
  onLoad() {
    window.ZWJSBridge.monitorTrace({
      monitorType: 'pageIn',
      module: 'login-index',
      bizInfo: {},
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    if (uni.getStorageSync('version') == 'new') {
      this.show = 'block';
    } else if (uni.getStorageSync('version') == 'old') {
      this.show = 'none';
    }
  },
  methods: {
    // 输入登录
    // 13506719567
    // 18858192551
    async inputlogin() {
      if (this.form.phone.length != 11) {
        uni.showToast({
          icon: 'none',
          title: '手机号不正确',
        });
        return;
      } else if (this.form.password.length < 6) {
        uni.showToast({
          icon: 'none',
          title: '密码不正确',
        });
        return;
      } else {
        let res = await postLogin(this.form);
        uni.setStorageSync('token', res.data.token);
        uni.setStorageSync('role', '党员');
        uni.setStorageSync('name', res.data.user.nickName);
        uni.setStorageSync('id', res.data.user.id);

        uni.showToast({
          title: '登录成功！',
          icon: 'none',
        });

        // 跳转首页
        uni.navigateTo({
          // url: '/pages/index/index'
          url: '/pages/newIndex/index',
        });

        uni.showToast({
          title: '登录成功！',
          icon: 'none',
        });
      }
    },

    // 巡查员登录
    async xlogin() {
      let res = await postLogin(this.xcylogin);
      console.log(res);
      if (res.code == 200) {
        uni.setStorageSync('token', res.data.token);
        uni.setStorageSync('role', res.data.roleName);
        uni.setStorageSync('name', res.data.user.nickName);
        uni.setStorageSync('id', res.data.user.id);

        // 跳转首页

        uni.switchTab({
          url: '../self/index',
        });

        uni.showToast({
          title: '登录成功！',
          icon: 'success',
        });
      }
    },
    async dlogin() {
      let res = await postLogin(this.dsflogin);
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('role', res.data.roleName);
      uni.setStorageSync('name', res.data.user.nickName);
      uni.setStorageSync('id', res.data.user.id);
      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });

      // 跳转首页
      uni.switchTab({
        url: '../self/index',
      });

      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });
    },
    async zjogin() {
      let res = await postLogin(this.zjxzlogin);
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('role', res.data.roleName);
      uni.setStorageSync('name', res.data.user.nickName);
      uni.setStorageSync('id', res.data.user.id);
      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });

      // 跳转首页
      uni.switchTab({
        url: '../self/index',
      });

      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });
    },
    async zlogin() {
      let res = await postLogin(this.zyzlogin);
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('role', res.data.roleName);
      uni.setStorageSync('name', res.data.user.nickName);
      uni.setStorageSync('id', res.data.user.id);
      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });

      // 跳转首页
      uni.switchTab({
        url: '../self/index',
      });

      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });
    },
    async dogin() {
      let res = await postLogin(this.dylogin);
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('role', res.data.roleName);
      uni.setStorageSync('name', res.data.user.nickName);
      uni.setStorageSync('id', res.data.user.id);
      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });

      // 跳转首页
      uni.switchTab({
        url: '../self/index',
      });

      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });
    },
    async bindLogin() {
      let res = await postLogin(this.zjlogin);
      uni.setStorageSync('token', res.data.token);
      uni.setStorageSync('role', res.data.roleName);
      uni.setStorageSync('name', res.data.user.nickName);
      uni.setStorageSync('id', res.data.user.id);
      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });

      // 跳转首页
      uni.switchTab({
        url: '../self/index',
      });

      uni.showToast({
        title: '登录成功！',
        icon: 'none',
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: none;
}
::v-deep .uni-input-input {
  border-bottom: 1rpx solid #d6d6d6;
  height: 88rpx;
}
::v-deep uni-input {
  height: 88rpx;
}
.container {
  padding: 0;
  background: url('@/static/index/BG_illustratioon3.png') no-repeat top -130rpx center, linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fafafa 84%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 120rpx;
  height: 100%;
  background-size: 100%;
  .header {
    margin-top: 50%;
    margin-left: auto;
    margin-right: auto;
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 80rpx;
      color: #203152;
      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
    }
    .xia {
      text-align: center;
      font-size: 30rpx;
      color: #7c8698;
      margin-top: 30rpx;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    width: 77%;
    margin: 0 auto;
    box-shadow: 0px 40rpx 40rpx 0px rgba(0, 0, 0, 0.05);
    border-radius: 20rpx;
    padding: 30rpx;
    background: rgba(255, 255, 255, 0.9);
    margin-top: 600rpx;
    padding-bottom: 120rpx;
    .user {
      text {
        margin-left: 6rpx;
      }
      font-size: 28rpx;
      color: #203152;
    }
  }
  .kuaijie1 {
    font-size: 30rpx;
    font-weight: bold;
    width: 85%;
    margin: 0 auto;
  }
  .kuaijie {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    width: 85%;
    margin: 0 auto;
    .button-login {
      color: #000;
      width: 25%;
      font-size: 24rpx;
      background: #ccc;
      border-radius: 40rpx;
      text-align: center;
      margin: 10rpx 4rpx;
      padding: 4rpx 20rpx;
    }
  }

  .btnlogin {
    // border-bottom: 2px dashed #ccc;
    padding-bottom: 40rpx;
    margin-top: -90rpx;
    button {
      width: 70%;
      height: 90rpx;
      line-height: 90rpx;
      background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
      box-shadow: 0px 20px 30px 0px rgba(86, 128, 250, 0.25);
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 27.5px;
      color: #ffffff;
      font-size: 34rpx;
      margin-top: 50rpx;
    }
    // .button-hover {
    // 	background: linear-gradient(-90deg, rgba(193, 25, 32, 0.8), rgba(238, 38, 38, 0.8));
    // }
  }
}

.oldcontainer {
  background: url('@/static/index/BG_illustratioon3.png') no-repeat top -130rpx center, linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fafafa 84%);
  background-size: 100%;
  .user {
    text {
      font-size: 60rpx;
    }
    ::v-deep uni-input {
      font-size: 60rpx;
    }
  }
  .list {
    margin-top: 750rpx;
  }
  .btnlogin {
    button {
      font-size: 64rpx;
      height: 132rpx;
      line-height: 132rpx;
      border-radius: 33px;
      margin-top: 10rpx;
    }
  }
  .kuaijie1 {
    font-size: 52rpx;
    font-weight: bold;
    width: 85%;
    margin: 0 auto;
  }
  .kuaijie {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    width: 85%;
    margin: 0 auto;
    .button-login {
      color: #000;
      width: 42%;
      font-size: 42rpx;
      background: #ccc;
      border-radius: 40rpx;
      text-align: center;
      margin: 10rpx 4rpx;
      padding: 4rpx 20rpx;
    }
  }
}
</style>
