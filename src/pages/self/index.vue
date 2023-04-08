<template>
  <view class="container" :class="show == 'block' ? 'showblock' : 'shownone'">
    <view class="" v-if="!role">
      <view class="topImg">
        <image src="/static/index/hbhww.png" mode="scaleToFill"></image>
        <view class="" style="display: flex; margin-bottom: 20rpx">
          <button type="primary" @click="clickLogin">使用当前浙里办账号登录</button>

          <!-- <button type="primary" @click="clickRegister">未有账号请申请</button> -->
        </view>

        <view style="font-size: 18px"> 如果您尚未申请成为党员志愿者，登录后跳转至党员志愿者申请页面</view>
        <view class="version">
          <switch :checked="checked" @change="switchChange" />
          <view class="uni-list-cell-db">{{ version }}</view>
        </view>

        <view class="fontView">
          <uni-list>
            <uni-list-item title="字体设置" clickable thumb="/static/icon/setting.png" thumb-size="base" @click="clickChangeFont" />
          </uni-list>
          <!-- :class="['tan',{hidden:ishid}]" @tap="fontModal = false"-->
          <view class="cu-modal" :class="{ show: fontModal }">
            <view class="cu-dialog">
              <view class="cu-bar justify-end solid-bottom">
                <view class="content">设置字体</view>
                <view class="action">
                  <uni-section title="设置标题字体(rpx)" subTitle="" type="line" padding>
                    <uni-number-box @change="changeBaseFontTitle" :value="storageBaseFontTitle" :step="1" :min="5" :max="200" />
                  </uni-section>
                  <uni-section title="设置内容字体(rpx)" subTitle="" type="line" padding>
                    <uni-number-box @change="changeBaseFontContent" :value="storageBaseFontContent" :step="1" :min="5" :max="200" />
                  </uni-section>
                  <uni-section title="设置日期字体(rpx)" subTitle="" type="line" padding>
                    <uni-number-box @change="changeBaseFontTime" :value="storageBaseFontTime" :step="1" :min="5" :max="200" />
                  </uni-section>

                  <button class="button" type="primary" @click="changeFontSize">保存</button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <tabbar :current="1"></tabbar>
    </view>
    <view class="header" v-else>
      <view class="top">
        <image src="../../static/icon/touxiang.png" mode="aspectFit"></image>
        <view class="right">
          <view class="name">
            {{ format_name(name) }}
          </view>
          <view class="id"> ID:{{ id.substring(0, 14) }} </view>
          <view class="role">
            <uni-tag :text="user" class="tag" />
          </view>
        </view>
      </view>
      <uni-card title="我的累计指标" :isFull="true">
        <view class="zhibiao">
          <view class="zitem" v-for="(item, index) in list" :key="index" @click="clickApp(item.path)">
            <view class="num">
              {{ item.num }}
            </view>
            <view class="title">
              {{ item.title }}
            </view>
          </view>
        </view>
      </uni-card>
      <!-- <uni-card :isFull="true">
        <uni-list>
          <uni-list-item title="我的通讯录" showArrow clickable thumb="/static/icon/contact.png" thumb-size="base"
            @click="clickContact" />
          <uni-list-item title="我的消息" showArrow clickable thumb="/static/icon/message.png" thumb-size="base" />
          <uni-list-item title="账号设置" showArrow clickable thumb="/static/icon/setting.png" thumb-size="base"
            @click="clickUpdateUser" />
        </uni-list>	
      </uni-card> -->
      <button type="primary" @click="goOut" class="but">退出登录</button>
      <tabbars :current="2"></tabbars>
    </view>
  </view>

  <view class="container oldcontainer" :class="show != 'block' ? 'showblock' : 'shownone'">
    <view class="" v-if="!role">
      <view class="topImg">
        <image src="/static/index/hbhww3.png" mode="scaleToFill"></image>
        <view class="" style="display: flex; margin-bottom: 20rpx">
          <button type="primary" @click="clickLogin">使用当前浙里办账号登录</button>

          <!-- <button type="primary" @click="clickRegister">未有账号请申请</button> -->
        </view>
        <view style="font-size: 24px"> 如果您尚未申请成为党员志愿者，登录后跳转至党员志愿者申请页面</view>

        <view class="version">
          <switch :checked="checked" @change="switchChange" />
          <view class="uni-list-cell-db">{{ version }}</view>
        </view>

        <uni-list>
          <uni-list-item title="字体设置" clickable thumb="/static/icon/setting.png" thumb-size="base" @click="clickChangeFont" />
        </uni-list>

        <view class="cu-modal" :class="{ show: fontModal }">
          <view class="cu-dialog">
            <view class="cu-bar justify-end solid-bottom">
              <view class="content">设置字体</view>
              <view class="action">
                <uni-section title="设置标题字体(rpx)" subTitle="" type="line" padding>
                  <uni-number-box @change="changeBaseFontTitle" :value="storageBaseFontTitle" :step="1" :min="5" :max="200" />
                </uni-section>
                <uni-section title="设置内容字体(rpx)" subTitle="" type="line" padding>
                  <uni-number-box @change="changeBaseFontContent" :value="storageBaseFontContent" :step="1" :min="5" :max="200" />
                </uni-section>
                <uni-section title="设置日期字体(rpx)" subTitle="" type="line" padding>
                  <uni-number-box @change="changeBaseFontTime" :value="storageBaseFontTime" :step="1" :min="5" :max="200" />
                </uni-section>

                <button class="button" type="primary" @click="changeFontSize">保存</button>
              </view>
            </view>
          </view>
        </view>
      </view>
      <tabbarold :current="1"></tabbarold>
    </view>
    <view class="header" v-else>
      <view class="top">
        <image src="../../static/icon/touxiang.png" mode="aspectFit"></image>
        <view class="right">
          <view class="name">
            {{ format_name(name) }}
          </view>
          <view class="id"> ID:{{ id.substring(0, 14) }} </view>
          <view class="role">
            <uni-tag :text="user" class="tag" />
          </view>
        </view>
      </view>
      <uni-card title="我的累计指标" :isFull="true">
        <view class="zhibiao">
          <view class="zitem" v-for="(item, index) in list" :key="index" @click="clickApp(item.path)">
            <view class="num">
              {{ item.num }}
            </view>
            <view class="title">
              {{ item.title }}
            </view>
          </view>
        </view>
      </uni-card>
      <!-- <uni-card :isFull="true">
        <uni-list>
          <uni-list-item title="我的通讯录" showArrow clickable thumb="/static/icon/contact.png" thumb-size="base"
            @click="clickContact" />
          <uni-list-item title="我的消息" showArrow clickable thumb="/static/icon/message.png" thumb-size="base" />
          <uni-list-item title="账号设置" showArrow clickable thumb="/static/icon/setting.png" thumb-size="base"
            @click="clickUpdateUser" />
        </uni-list>
      </uni-card> -->
      <button type="primary" @click="goOut" class="but">退出登录</button>
      <tabbarsold :current="2"></tabbarsold>
    </view>
  </view>
</template>

<script>
import tabbar from '@/components/tabbar/touriststabbar.vue';
import tabbarold from '@/components/tabbar/touriststabbarold.vue';
import tabbars from '@/components/tabbar/tabbar.vue';
import tabbarsold from '@/components/tabbar/tabbarold.vue';
import { queryMyProgressIndicators, postLocaltion, getrealTimePosition } from '@/api/api.js';

import { authx, valid_token } from '@/api/api.js';

export default {
  components: {
    tabbar,
    tabbarold,
    tabbars,
    tabbarsold,
  },
  data() {
    return {
      //本地存储内的动态字体值
      storageBaseFontTitle: 5,
      storageBaseFontContent: 5,
      storageBaseFontTime: 5,

      themeList: [
        {
          title: '官方',
          name: 'rf',
          color: '#fa436a',
          tabList: ['/static/tab-home-rf.png', '/static/tab-notify-rf.png', '/static/tab-cate-rf.png', '/static/tab-my-rf.png'],
        },
      ],

      fontModal: false,

      role: null,
      user: null,
      name: null,
      id: null,
      list: [],
      show: 'block',
      version: '关怀模式已关闭',
      checked: null,
      timer: null,
    };
  },

  onLoad() {
    window.ZWJSBridge.monitorTrace({
      monitorType: 'pageIn',
      module: 'self-index',
      bizInfo: {},
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    this.role = uni.getStorageSync('role');
    this.name = uni.getStorageSync('name');
    this.id = uni.getStorageSync('id');

    if (this.role == '党员') {
      this.user = '党员-文物巡查员';
      this.list = [
        {
          num: 5,
          title: '隐患上报',
          path: '/pages/hiddentroublereport/index?type=all',
        },
        {
          num: 3,
          title: '例行检查',
          path: '/pages/routinecheck/index?type=all',
        },
        // {
        //   num: 5,
        //   title: "电器事项",
        //   path: "/pages/equipment/index",
        // },
        // {
        //   num: 4,
        //   title: "消防事项",
        //   path: "/pages/extinguishment/index",
        // },
      ];
    }
    if (this.role == '志愿者') {
      this.user = '志愿者-文物巡查员';
      this.list = [
        {
          num: 5,
          title: '隐患上报',
          path: '/pages/hiddentroublereport/index?type=all',
        },
        {
          num: 3,
          title: '例行检查',
          path: '/pages/routinecheck/index?type=all',
        },
        // {
        //   num: 5,
        //   title: "电器事项",
        //   path: "/pages/equipment/index",
        // },
        // {
        //   num: 0,
        //   title: "消防事项",
        //   path: "/pages/extinguishment/index",
        // },
      ];
    }
    if (this.role == '第三方公司' || this.role == '专家小组') {
      if (this.role == '第三方公司') {
        this.user = '第三方公司';
      } else {
        this.user = '专家小组';
      }
      this.list = [
        {
          num: 5,
          title: '文物定级',
          path: '/pages/grading/index?type=all',
        },
        {
          num: 4,
          title: '文物体检',
          path: '/pages/culturalcheck/index?type=all',
        },
      ];
    }
    if (this.role == '文物护保员') {
      this.user = '文物护保员';
      this.list = [
        {
          num: 0,
          title: '安全整改',
          path: '/pages/safe/index?type=all',
        },
        {
          num: 0,
          title: '电器事项',
          path: '/pages/equipment/index',
        },
        {
          num: 5,
          title: '例行检查',
          path: '/pages/routinecheck/index?type=all',
        },
        {
          num: 4,
          title: '消防事项',
          path: '/pages/extinguishment/index',
        },
        {
          num: 5,
          title: '专项检查',
          path: `/pages/speciallettersupervise/index?title=${'zxjc'}&type=${'all'}`,
        },
        {
          num: 3,
          title: '信访事件',
          path: `/pages/speciallettersupervise/xinfangindex?title=${'xfsj'}&type=${'all'}`,
        },
        {
          num: 0,
          title: '隐患上报',
          path: '/pages/hiddentroublereport/index?type=all',
        },
        {
          num: 5,
          title: '上级督查',
          path: `/pages/speciallettersupervise/shangjiindex?title=${'sjdc'}&type=${'all'}`,
        },
      ];
    }

    if (this.role == '镇街') {
      this.user = '镇街负责人';
      this.list = [
        {
          num: 0,
          title: '安全整改',
          path: '/pages/safe/index?type=all',
        },
        {
          num: 3,
          title: '文物定级',
          path: '/pages/grading/index?type=all',
        },
        {
          num: 5,
          title: '文物体检',
          path: '/pages/culturalcheck/index?type=all',
        },
        {
          num: 4,
          title: '隐患处理',
          path: '/pages/hiddendanger/index?type=all',
        },
        {
          num: 0,
          title: '专项检查',
          path: `/pages/speciallettersupervise/index?title=${'zxjc'}&type=${'all'}`,
        },
        {
          num: 3,
          title: '信访事件',
          path: `/pages/speciallettersupervise/xinfangindex?title=${'xfsj'}&type=${'all'}`,
        },
        {
          num: 4,
          title: '上级督查',
          path: `/pages/speciallettersupervise/shangjiindex?title=${'sjdc'}&type=${'all'}`,
        },
        {
          num: 1,
          title: '一网统管',
          path: '/pages/allmessage/allmessage',
        },
      ];
    }
  },
  onShow() {
    if (uni.getStorageSync('version')) {
      if (uni.getStorageSync('version') == 'new') {
        this.show = 'block';
        this.checked = false;
        this.version = '关怀模式已关闭';
      } else if (uni.getStorageSync('version') == 'old') {
        this.show = 'none';
        this.checked = true;
        this.version = '关怀模式已开启';
      }
    } else {
      if (this.show == 'block') {
        uni.setStorageSync('version', 'new');
      } else {
        uni.setStorageSync('version', 'old');
      }
    }

    if (uni.getStorageSync('role')) {
      this.queryMyProgressIndicators();
    }
  },
  mounted() {
    if (uni.getStorageSync('role')) {
      this.queryMyProgressIndicators();
    }
    if (uni.getStorageSync('role') == '党员') {
      this.timer = setInterval(() => {
        console.log('login');

        window.ZWJSBridge.getLocation()
          .then((result) => {
            console.log('获取经纬度情况', result);
            console.log('经度', result.data.latitude);
            console.log('纬度', result.data.longitude);

            postLocaltion({
              latitude: result.data.latitude,
              longitude: result.data.longitude,
            }).then((resp) => {
              console.log(resp);
            });
          })
          .catch((error) => {
            console.log(error);
          });

        // getrealTimePosition().then((res) => {
        //   console.log(res);
        //   if (res.code == 200 && res.data.latitude) {

        //   }
        // });
      }, 5000); //每秒请求一次接口
    }
  },
  methods: {
    format_name(val) {
      if (val != null && val.length > 0) {
        return '*' + val.substring(1);
      } else {
        return '*';
      }
    },

    // 版本切换
    switchChange(e) {
      if (!this.checked) {
        console.log(2);
        uni.removeStorageSync('version');
        uni.setStorageSync('version', 'old');
        this.checked = true;
        this.version = '关怀模式已开启';
        if (uni.getStorageSync('version') == 'new') {
          this.show = 'block';
        } else if (uni.getStorageSync('version') == 'old') {
          this.show = 'none';
        }
      } else {
        console.log(1);
        uni.removeStorageSync('version');
        uni.setStorageSync('version', 'new');
        this.checked = false;

        this.version = '关怀模式已关闭';
        if (uni.getStorageSync('version') == 'new') {
          this.show = 'block';
        } else if (uni.getStorageSync('version') == 'old') {
          this.show = 'none';
        }
      }
    },

    // 累计指标
    async queryMyProgressIndicators() {
      const res = await queryMyProgressIndicators();
      for (let i in this.list) {
        for (let j in Object.keys(res.data)) {
          if (this.list[i].title == Object.keys(res.data)[j]) {
            this.list[i].num = res.data[Object.keys(res.data)[j]];
          }
        }
      }
    },

    clickUpdateUser() {
      uni.navigateTo({
        url: 'updateUser?userId=' + this.id,
      });
    },

    changeBaseFontTitle(value) {
      this.storageBaseFontTitle = value;
    },

    changeBaseFontContent(value) {
      this.storageBaseFontContent = value;
    },

    changeBaseFontTime(value) {
      this.storageBaseFontTime = value;
    },

    changeFontSize() {
      uni.setStorageSync('baseFontTitle', this.storageBaseFontTitle + 'rpx');
      uni.setStorageSync('baseFontContent', this.storageBaseFontContent + 'rpx');
      uni.setStorageSync('baseFontTime', this.storageBaseFontTime + 'rpx');
      this.fontModal = false;
    },

    clickChangeFont() {
      this.fontModal = true;
      //设置本地存储值
      this.baseFontTitle = uni.getStorageSync('baseFontTitle');
      if (this.baseFontTitle == undefined || this.baseFontTitle == '') {
        uni.setStorageSync('baseFontTitle', '36rpx');
        this.baseFontTitle = '36rpx';
      }
      this.baseFontContent = uni.getStorageSync('baseFontContent');
      if (this.baseFontContent == undefined || this.baseFontContent == '') {
        uni.setStorageSync('baseFontContent', '28rpx');
        this.baseFontContent = '28rpx';
      }
      this.baseFontTime = uni.getStorageSync('baseFontTime');
      if (this.baseFontTime == undefined || this.baseFontTime == '') {
        uni.setStorageSync('baseFontTime', '20rpx');
        this.baseFontTime = '20rpx';
      }

      this.storageBaseFontTitle = Number(this.baseFontTitle.replace('rpx', ''));
      this.storageBaseFontContent = Number(this.baseFontContent.replace('rpx', ''));
      this.storageBaseFontTime = Number(this.baseFontTime.replace('rpx', ''));
    },

    goOut() {
      uni.removeStorageSync('role');
      uni.removeStorageSync('token');
      uni.removeStorageSync('name');
      uni.removeStorageSync('id');
      clearInterval(this.timer);
      uni.reLaunch({
        url: '../tourists/index',
      });
    },
    clickContact() {
      uni.navigateTo({
        url: '/pages/contact/index',
      });
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

    clickLogin() {
      var that = this;
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      window.onpageshow = (event) => {
        if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
          ZWJSBridge.close();
        }
      };
      window.location.replace =
        'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth';

      return;
      var sysinfo = uni.getSystemInfoSync();

      if (sysinfo.ua.indexOf('WeChat') > -1 || sysinfo.ua.indexOf('Weixin') > -1) {
        var ticket_id = that.getParam('ticketId', '');

        authx({ ticket: ticket_id }).then((res) => {
          console.log('authx', res);

          console.log(res.data.token);
          uni.setStorageSync('token', res.data.token);
          uni.setStorageSync('authx', res);
          uni.setStorageSync('ding_token', res.data.ding_token);

          if (res.data.code == 0) {
            valid_token({ token: res.data.token }).then((resx) => {
              uni.setStorageSync('role', '志愿者');
              uni.setStorageSync('name', resx.data.nickName);
              uni.setStorageSync('id', resx.data.id);
              console.log('validate ticket', resx);
              uni.showToast({
                title: '登录成功！',
                icon: 'none',
              });

              // 跳转首页
              // uni.switchTab({
              //   url: '../self/index',
              // });
              uni.navigateTo({
                url:'../newIndex/index'
              })
            });
          } else if (res.data.code == 1) {
            console.log('ding_id', res.data);
            uni.setStorageSync('ding_id', res.data.openid);

            uni.reLaunch({
              url: '/pages/register/index',
            });
            // uni.navigateTo({
            //   url: "../register/index",
            // });
          }

          //
        });
      } else {
        window.location.href =
          'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth';
      }

      // uni.reLaunch({
      //   url: "../login/index",
      // });
    },
    clickRegister() {
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      window.onpageshow = (event) => {
        if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
          ZWJSBridge.close();
        }
      };
      window.location.replace =
        'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth';

      // uni.reLaunch({
      //   url: "/pages/register/index",
      // });
    },
    clickApp(path) {
      uni.navigateTo({
        url: path,
      });
    },
  },
};
</script>

<style lang="scss">
.showblock {
  display: block;
}
.shownone {
  display: none;
}

.container {
  background: url('/static/index/user-bg.png') top no-repeat;
  background-size: 100%;
}
.topImg {
  image {
    width: 100%;
    height: 320rpx;
  }
}
.header {
}
.top {
  display: flex;
  justify-content: center;
  height: 300rpx;

  image {
    width: 200rpx;
    height: 200rpx;
    margin-right: 50rpx;
    box-sizing: border-box;
    padding: 30rpx;
    border-radius: 50%;
    border: 3.95px solid rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 20px 6px rgba(0, 0, 0, 0.08);
  }

  .right {
    text-align: left;

    .name {
      font-size: 40rpx;
      color: #203152;
      margin-top: 30rpx;
    }

    .id,
    .role {
      font-size: 28rpx;
      color: #7c8698;
      margin-top: 15rpx;

      .tag {
        background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
        box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
        border-radius: 36rpx;
        border: none !important;
        padding: 10rpx 30rpx;
        font-size: 28rpx !important;
      }
    }
  }
}
::v-deep .uni-list--border-top {
  height: 0px !important;
}
::v-deep .uni-list--border-bottom {
  height: 0px !important;
}
::v-deep .uni-card {
  border: 1rpx solid rgba(0, 0, 0, 0.1);
  box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(0, 0, 0, 0.05) !important;
  border-radius: 20rpx !important;
  margin-bottom: 30rpx !important;
}

.zhibiao {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  .zitem {
    box-sizing: border-box;
    width: 25%;
    height: 100rpx;
    line-height: 50rpx;
    // border-right: 1px solid #ccc;
    margin-bottom: 45rpx;
    text-align: center;

    .num {
      font-size: 40rpx;
      // font-weight: bold;
      color: #203152;
      margin-bottom: 20rpx;
    }

    .title {
      font-size: 28rpx;
      color: #7c8698;
    }
  }

  .zitem:nth-child(4n) {
    border-right: none;
  }
}

.uni-list-item {
  background: #f1f1f1;
}

.but {
  margin-top: 30px;
  margin-bottom: 80px;
  border: 1px solid rgba(0, 129, 255, 1);
  border-radius: 27.5px;
  background: none;
  color: #0086ff;
  width: 295px;
}

::v-deep .uni-list-item {
  background: none !important;
}

::v-deep .uni-card__header {
  border: none !important;
}

::v-deep .uni-card__header-content-title {
  font-size: 36rpx !important;

  color: #203152 !important;
  font-family: PingFangSC-Medium !important;
}
.oldcontainer {
  .topImg {
    button {
      font-size: 42rpx;
      padding: 4px 8px;
    }
  }
  .header {
    .top {
      .right {
        .name {
          font-size: 42rpx;
        }
        .id {
          font-size: 36rpx;
        }
        .role {
          .tag {
            font-size: 36rpx !important;
          }
        }
      }
    }
  }
  ::v-deep .uni-card__header-content-title {
    font-size: 68rpx !important;
    color: #203152 !important;
    font-family: PingFangSC-Medium !important;
  }
  .zhibiao {
    .zitem {
      width: 50%;
      margin-bottom: 100rpx;
      .num {
        font-size: 72rpx;
        font-weight: bold;
        margin-bottom: 30rpx;
      }
      .title {
        font-size: 60rpx;
      }
    }
  }
  ::v-deep .uni-list--base {
    width: 80rpx;
    height: 80rpx;
  }
  ::v-deep .uni-list-item__content-title {
    font-size: 60rpx;
  }
  ::v-deep .uni-card__content {
    line-height: normal;
  }
  .but {
    font-size: 64rpx;
    color: #333333;
    width: 295px;
    height: 66px;
    line-height: 66px;
    border: 1px solid rgba(66, 144, 245, 1);
    border-radius: 33px;
  }
}
.version {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 30px;
}
.fontView {
  margin-top: 30px;
}

.cu-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1110;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  transform: scale(1.185);
  // backface-visibility: hidden;
  perspective: 2000upx;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;
}

.cu-modal::before {
  content: '\200B';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.cu-modal.show {
  opacity: 1;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
}

.cu-dialog {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  width: 680upx;
  max-width: 100%;
  background-color: #f8f8f8;
  border-radius: 10upx;
  overflow: hidden;
}

.cu-modal.bottom-modal::before {
  vertical-align: bottom;
}

.cu-modal.bottom-modal .cu-dialog {
  width: 100%;
  border-radius: 0;
}

.cu-modal.bottom-modal {
  margin-bottom: -1000upx;
}

.cu-modal.bottom-modal.show {
  margin-bottom: 0;
}

.cu-modal.drawer-modal {
  transform: scale(1);
  display: flex;
}

.cu-modal.drawer-modal .cu-dialog {
  height: 100%;
  min-width: 200rpx;
  border-radius: 0;
  margin: initial;
  transition-duration: 0.3s;
}

.cu-modal.drawer-modal.justify-start .cu-dialog {
  transform: translateX(-100%);
}

.cu-modal.drawer-modal.justify-end .cu-dialog {
  transform: translateX(100%);
}

.cu-modal.drawer-modal.show .cu-dialog {
  transform: translateX(0%);
}
.cu-modal .cu-dialog > .cu-bar:first-child .action {
  min-width: 100rpx;
  margin-right: 0;
  min-height: 100rpx;
}
</style>
