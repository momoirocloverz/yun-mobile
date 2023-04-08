<template>
  <view style="box-sizing: border-box; padding-bottom: 0px">
    <view class="container" :class="show == 'block' ? '' : 'oldcontainer'">
      <view class="top-box" v-if="false">
        <view class="search-box" v-if="isSearch">
          <input class="uni-input" @input="onKeyInput" :value="searchName" placeholder="输入文保单位" />
          <view class="btn" @click="search_ZS">
            <image src="../../static/img2/Search.png" mode="scaleToFill" />
          </view>
        </view>
        <uni-data-select v-else v-model="searchName" :localdata="pointList" @change="selectChange"></uni-data-select>
        <view class="total">
          <text>永兴指数</text>
          <text>{{ totalNum }}</text>
        </view>
        <view class="process">
          <view class="tap" :style="{ left: `calc(${totalNum}% - 50rpx)` }">
            <view class="text">
              <text :style="{ color: totalNum * 1 < 50 ? '#20CF77' : totalNum * 1 < 70 ? '#FFDD37' : totalNum * 1 < 90 ? '#F47828' : '#EA1B1B' }">
                {{ formatZS(totalNum) }}
              </text>
            </view>
            <view class="sign" :style="{ background: totalNum * 1 < 50 ? '#20CF77' : totalNum * 1 < 70 ? '#FFDD37' : totalNum * 1 < 90 ? '#F47828' : '#EA1B1B' }"></view>
          </view>
        </view>
        <view class="zs">
          <view class="item" v-for="(item, index) in zsList" :key="index">
            <text>{{ item.num }}</text>
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>

      <view class="content">
        <swiper
          class="image-container"
          previous-margin="45rpx"
          next-margin="45rpx"
          circular
          autoplay
          :indicator-dots="true"
          indicator-active-color="#5680FA"
          indicator-color="#ffffff"
          @change="swiperChange"
        >
          <swiper-item
            :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'"
            v-for="(item, index) in imgList"
            :key="index"
            lazy-load
            @click="banner_redirect"
            :style="dontFirstAnimation ? 'animation: none;' : ''"
          >
            <view class="item" :class="currentIndex == index ? 'item-img' : 'item-img-side'">
              <image class="image" :src="item.image || errorImage" mode="" />
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view class="entrance">
        <view class="item" v-for="(item, index) in entranceList" :key="index" @click="jumpTo(item.to)" :style="{ background: `url(${item.imgSrc}) no-repeat center`, 'background-size': '100% 100%' }">
          <text class="text1">
            {{ item.name }}
          </text>
          <text class="text2">
            {{ item.enName }}
          </text>
        </view>
      </view>

      <view class="daiban" @click="clickDaoLan">
        <view class="left">
          <text>文物精选</text>
        </view>
        <view class="right">
          <text>全部</text>
        </view>
      </view>
      <view class="qita">
        <view class="daolan" v-for="item in guideList" :key="item.id" @click="daolanDetail(item)">
          <image :src="item.img" mode="aspectFill" />
          <!-- <image src="/static/wbimg/mwl.png" mode="aspectFill" v-if="item.publishName == '茅湾里窑址'" />
          <image src="/static/wbimg/zdyh.png" mode="aspectFill" v-else-if="item.publishName == '浙东运河'" />
          <image src="/static/wbimg/base.png" mode="aspectFill" v-else /> -->
          <view class="name">
            {{ item.publishName }}
          </view>
        </view>
      </view>
      <!-- <tabbar /> -->

      <view
        class="mask"
        @click="
          () => {
            this.isShowTip = false;
          }
        "
        v-if="isShowTip"
      >
        <view class="tip-list">
          <text v-for="item in tipPointList" :key="item.id" @click="selectPointName($event, item.publishName)">{{ item.publishName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import tabbar from '@/components/tabbar/touriststabbar.vue';
import tabbarold from '@/components/tabbar/touriststabbarold.vue';
import Mgop from '@/mgopService';
import { getNews, getWenbaodianAppList, authx_wechat, wechat_userinfo, myUserData, getWenwuList } from '@/api/api.js';

import Img1 from '../../static/img2/model3.png';
import Img2 from '../../static/img2/model4.png';
import Img3 from '../../static/img2/model5.png';
import Img4 from '../../static/img2/model6.png';
import Img5 from '../../static/img2/model7.png';
import Img6 from '../../static/img2/model8.png';

export default {
  components: {
    tabbar,
    tabbarold,
  },
  data() {
    return {
      show: 'block',
      imgList: [
        // {
        //   image: '/static/slide/1.png',
        // },
        {
          image: '/static/slide/2.png',
        },
        {
          image: '/static/slide/img1.png',
        },
        {
          image: '/static/slide/1.png',
        },
      ],
      //埋点01 相关数据
      browseTime: 0, // 增长时长
      clearTimeSet: null, //定时器
      t0: 0,
      t2: 0,
      //埋点01结束 相关数据
      currentIndex: 0,
      dontFirstAnimation: true,
      currentPage: 1,
      pageSize: 10,

      searchName: '',
      isShowTip: false,
      tipPointList: [],
      pointList: [],
      totalNum: '50',
      zsList: [
        {
          name: '人防指数',
          num: '10',
        },
        {
          name: '物防指数',
          num: '10',
        },
        {
          name: '智防指数',
          num: '10',
        },
        {
          name: '本体指数',
          num: '10',
        },
        {
          name: '环境指数',
          num: '10',
        },
      ],
      entranceList: [
        {
          name: '问题上报',
          enName: 'Problem reporting',
          imgSrc: Img1,
          to: '/pages/hiddentroublereport/index',
        },
        {
          name: '日常巡查',
          enName: 'Routine inspection',
          imgSrc: Img2,
          to: '/pages/inspection/index',
        },
        // {
        //   name: '培训考核',
        //   enName: 'Training and check',
        //   imgSrc: Img4,
        // },
        {
          name: '事件处置',
          enName: 'Event handling',
          imgSrc: Img3,
          to: '/pages/mission/index',
        },
        {
          name: '文保档案',
          enName: 'Document protection file',
          imgSrc: Img5,
          to: '/pages/tourists/daolan/index',
        },
        // {
        //   name: '通知公告',
        //   enName: 'My notice',
        //   imgSrc: Img6,
        // },
      ],
      isSearch: false,
      guideList: [],
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {},
    });
  },
  onShow() {
    console.log('onShow');
    if (uni.getStorageSync('version') == 'new') {
      this.show = 'block';
    } else if (uni.getStorageSync('version') == 'old') {
      this.show = 'none';
    }
    // 获取角色
    this.fetchRole();
    // 获取文物精选
    this.getWenbaodianList();
  },
  //埋点02  埋点相关代码开始
  created() {
    this.setTime();
    uni.removeStorageSync('hiddenSelectObject');
    uni.removeStorageSync('hiddenTroubleForm');
  },
  // //埋点02
  // async mounted() {
  //   // console.log('mounted');
  //   //埋点03
  //   this.t0 = (Date.now() - this.browseTime) / 1000.0;
  //   //埋点03
  //   let params = {
  //     pageSize: this.pageSize,
  //     currentPage: this.currentPage,
  //   };
  //   var current_ui = uni.getStorageSync('version');
  //   // console.log('current_ui', current_ui);
  //   var sysinfo = uni.getSystemInfoSync();
  //   // console.log('system info ', sysinfo);
  //   const sUserAgent = window.navigator.userAgent.toLowerCase();
  //   const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
  //   const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
  //   console.log('bIsDtDreamApp浙里办app', bIsDtDreamApp);
  //   const ssoFlag = await ZWJSBridge.ssoTicket({});
  //   console.log('ssoFlag', ssoFlag);
  //   //如果这是微信端
  //   if (ssoFlag && ssoFlag.result && !bIsAlipayMini && !bIsDtDreamApp) {
  //     console.log('weixin');
  //     var uiStyle = this.getParam('_uiStyle', 'normal');
  //     if (uiStyle == 'elder') {
  //       uni.setStorageSync('version', 'old');
  //       if (current_ui == null || current_ui == '' || current_ui == 'new') {
  //         this.clickLogin();
  //         uni.reLaunch({
  //           url: '/pages/tourists/index',
  //         });
  //       } else {
  //         this.clickLogin();
  //       }
  //     } else {
  //       uni.setStorageSync('version', 'new');
  //       if (current_ui == null || current_ui == '' || current_ui == 'old') {
  //         this.clickLogin();
  //         uni.reLaunch({
  //           url: '/pages/tourists/index',
  //         });
  //         //window.location.reload();
  //       } else {
  //         this.clickLogin();
  //       }
  //     }
  //   } else {
  //     //   console.log('ding path ', 'ding path ');
  //     console.log('不是weixin ');
  //     window.ZWJSBridge.getUiStyle()
  //       .then((result) => {
  //         //   console.log('ZWJSBridge uiStyle ', result);
  //         if (result.uiStyle == 'normal') {
  //           uni.setStorageSync('version', 'new');
  //           if (current_ui == null || current_ui == '' || current_ui == 'old') {
  //             this.clickLogin();
  //             uni.reLaunch({
  //               url: '/pages/tourists/index',
  //             });
  //           } else {
  //             this.clickLogin();
  //           }
  //         } else {
  //           uni.setStorageSync('version', 'old');
  //           if (current_ui == null || current_ui == '' || current_ui == 'new') {
  //             this.clickLogin();
  //             uni.reLaunch({
  //               url: '/pages/tourists/index',
  //             });
  //           } else {
  //             this.clickLogin();
  //           }
  //         }
  //         //   console.log(result);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   // window.ZWJSBridge.monitorTrace({
  //   //   monitorType: "pageIn",
  //   //   module: "home",
  //   //   bizInfo: {},
  //   // })
  //   //   .then((result) => {
  //   //     console.log("home-success", result);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  //   // Mgop["mgop.ztemaps.cultural.loginx"](params).then((data) => {
  //   // 	// 业务响应参数
  //   // 	console.log(data);
  //   // }).catch(error => {
  //   // 	// 异常信息
  //   // 	console.log(error);
  //   // })
  //   // this.getNews()
  //   this.getWenbaodianList();
  //   // console.log('browseTime', this.browseTime);
  //   this.t2 = (Date.now() - this.browseTime) / 1000.0;
  //   var that = this;
  //   clearInterval(that.clearTimeSet); // 离开页面后清除定时器
  //   zwlog.onReady(function () {
  //     //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
  //     zwlog.sendPV({
  //       miniAppId: '2002282040',
  //       miniAppName: '永兴护保',
  //       pageId: 'guid-index',
  //       pageName: '导览首页',
  //       t2: that.t2,
  //       t0: that.t0,
  //       log_status: '02',
  //     });
  //   });
  // },
  methods: {
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
    },
    setTime() {
      //设置定时器
      this.browseTime = Date.now();
      // this.clearTimeSet = setInterval(() => {
      //   this.browseTime++;
      //   //console.log(this.browseTime/10.0, "时长累计");
      // }, 100);
    },
    async clickLogin() {
      var that = this;
      if (uni.getStorageSync('ding_id') == null || uni.getStorageSync('ding_id') == '') {
        var sysinfo = uni.getSystemInfoSync();
        const sUserAgent = window.navigator.userAgent.toLowerCase();
        const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
        const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
        console.log('bIsDtDreamApp浙里办app1', bIsDtDreamApp);
        const ssoFlag = await ZWJSBridge.ssoTicket({});
        if (ssoFlag && ssoFlag.result && !bIsAlipayMini && !bIsDtDreamApp) {
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
                  // url: '../index/index',
                  url: '../newIndex/index',
                });
              });
            } else if (res.data.code == 1) {
              //   console.log('ding_id', res.data);
              uni.setStorageSync('ding_id', res.data.openid);
              uni.reLaunch({
                url: '/pages/tourists/index',
              });
              // uni.navigateTo({
              //   url: "../register/index",
              // });
            }
            //
          });
        } else {
          const sUserAgent = window.navigator.userAgent.toLowerCase();
          const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
          const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
          window.onpageshow = (event) => {
            if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
              ZWJSBridge.close();
            }
          };
          window.location.replace(
            'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth',
          );
        }
      } else {
        const sUserAgent = window.navigator.userAgent.toLowerCase();
        const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
        const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
        console.log('bIsDtDreamApp浙里办app2', bIsDtDreamApp);
        const ssoFlag = await ZWJSBridge.ssoTicket({});
        if (ssoFlag && ssoFlag.result && !bIsAlipayMini && !bIsDtDreamApp) {
        } else {
          window.onpageshow = (event) => {
            if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
              ZWJSBridge.close();
            }
          };
          window.location.replace(
            'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth',
          );
        }
      }
      // uni.reLaunch({
      //   url: "../login/index",
      // });
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

    // 同步获取input框的输入值
    onKeyInput(e) {
      this.searchName = e.detail.value;
      this.getPointsList(e.detail.value);
    },
    getPointsList(name) {
      let params = {
        currentPage: 1,
        pageSize: 10,
        publishName: name,
      };
      getWenwuList(params).then((res) => {
        console.log('模糊查询', res.data.list);
        this.tipPointList = res.data.list;
        this.isShowTip = true;
      });
    },
    selectPointName(e, name) {
      console.log(e);
      e.stopPropagation();
      this.searchName = name;
      this.isShowTip = false;
    },
    // 搜索指数数据
    search_ZS() {
      console.log(this.searchName);
      this.isShowTip = false;
    },
    selectChange(e) {
      console.log(e);
    },
    formatZS(val) {
      if (val * 1 < 60) {
        return '低风险';
      } else if (val * 1 < 80) {
        return '中风险';
      } else {
        return '高风险';
      }
    },
    // 获取文保点
    async getWenbaodianList() {
      let params = {
        currentPage: 1,
        pageSize: 6,
      };
      const res = await getWenbaodianAppList(params);
      if (res.data.list[0]) {
        res.data.list[0].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a23c710e-02c1-45f3-bd57-395733fa4cb8.jpg';
      }
      if (res.data.list[1]) {
        res.data.list[1].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1583b9b8-da7a-48ca-9666-d85580c6366c.jpg';
      }
      if (res.data.list[2]) {
        res.data.list[2].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69bd5d99-333b-4a38-bbe8-77874e6e8daa.jpg';
      }
      if (res.data.list[3]) {
        res.data.list[3].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a5d1fb53-6b5c-4971-95f9-ff619a8fe6d0.jpg';
      }
      if (res.data.list[4]) {
        res.data.list[4].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1616087c-a723-4f2b-b204-5757e0d6f412.jpg';
      }
      if (res.data.list[5]) {
        res.data.list[5].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/6a8394c4-6469-45f3-9d48-ea914202a37c.jpg';
      }
      this.guideList = res.data.list;
    },

    // 获取角色
    fetchRole() {
      myUserData()
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            console.log('res', shorter);
            if (!shorter || shorter.length <= 0) {
              uni.navigateTo({
                url: '/pages/tourists/index',
              });
            }
            let final = shorter.sort((a, b) => {
              return a.userType - b.userType;
            });
            if (final && final.length) {
              let trackFlag = final[0].userType;
              if (trackFlag) {
                switch (trackFlag) {
                  case '1':
                    uni.setStorageSync('role', '文保员');
                    this.role = '文保员';
                    setTimeout(() => {
                      this.analyseRole();
                    }, 0);
                    break;
                  case '2':
                    uni.setStorageSync('role', '党员');
                    this.role = '党员';
                    setTimeout(() => {
                      this.analyseRole();
                    }, 0);
                    break;
                  case '3':
                    uni.setStorageSync('role', '志愿者');
                    this.role = '志愿者';
                    setTimeout(() => {
                      this.analyseRole();
                    }, 0);
                    break;
                }
              }
            } else {
              this.analyseRole();
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
          // window.onpageshow = (event) => {
          //   if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
          //     ZWJSBridge.close();
          //   }
          // };
          // window.location.replace(
          //   'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth',
          // );
        });
    },

    analyseRole() {
      if (this.role == '文保员') {
        this.entranceList = [
          {
            name: '问题上报',
            enName: 'Problem reporting',
            imgSrc: Img1,
            to: '/pages/hiddentroublereport/index',
          },
          {
            name: '日常巡查',
            enName: 'Routine inspection',
            imgSrc: Img2,
            to: '/pages/inspection/index',
          },
          // {
          //   name: '培训考核',
          //   enName: 'Training and check',
          //   imgSrc: Img4,
          //   to: '',
          // },
          {
            name: '事件处置',
            enName: 'Event handling',
            imgSrc: Img3,
            to: '/pages/mission/index',
          },
          {
            name: '文保档案',
            enName: 'Document protection file',
            imgSrc: Img5,
            to: '/pages/tourists/daolan/index',
          },
          // {
          //   name: '通知公告',
          //   enName: 'My notice',
          //   imgSrc: Img6,
          //   to: '',
          // },
        ];
        this.isSearch = false;
      } else if (this.role == '党员' || this.role == '志愿者') {
        this.entranceList = [
          {
            name: '问题上报',
            enName: 'Problem reporting',
            imgSrc: Img1,
            to: '/pages/hiddentroublereport/index',
          },
          //   {
          //     name: '日常巡查',
          //     enName: 'Routine inspection',
          //     imgSrc: Img2,
          //     to: '/pages/inspection/index',
          //   },
          // {
          //   name: '培训考核',
          //   enName: 'Training and check',
          //   imgSrc: Img4,
          //   to: '',
          // },
          {
            name: '事件处置',
            enName: 'Event handling',
            imgSrc: Img3,
            to: '/pages/mission/index',
          },
        ];
        this.isSearch = true;
      } else {
        this.entranceList = [];
        this.isSearch = true;
      }
    },

    // 入口跳转路由=============================================

    jumpTo(path) {
      if (path) {
        uni.navigateTo({
          url: path,
        });
      } else {
        uni.showToast({
          icon: 'none',
          title: '页面维护中...',
          duration: 2000,
        });
      }
    },

    // 导览列表
    clickDaoLan() {
      console.log('00005555');
      uni.navigateTo({
        url: '/pages/tourists/daolan/index',
      });
    },
    // 导览详情
    daolanDetail(item) {
      uni.navigateTo({
        // url:'./daolan/detail'
        url: '/pages/tourists/daolan/detail?item=' + JSON.stringify(item),
      });
    },
  },
};
</script>
<style lang="scss">
page {
  background: url('../../static/img2/top-bg.png') no-repeat top center;
  position: relative;
  box-sizing: border-box;
  height: 302rpx;
  background-size: 100%;
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
}
::v-deep .uni-page-head {
  background: none !important;
  color: #fff !important;
  z-index: 0 !important;
}
.uni-page-head {
  background: none !important;
  color: #fff !important;
}
::v-deep uni-page-body {
  background: none !important;
}
uni-page-body {
  background: none !important;
}
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item_H {
  position: relative;
  display: inline-block;
  width: 240rpx;
  height: 135rpx;
  font-size: 10px;
  color: #ffffff;
  margin: 0px 5px;
  border-radius: 8px;
  overflow: hidden;

  .title {
    position: absolute;
    bottom: 0px;
    color: #fff;
    text-indent: 10px;
    width: 240rpx;
    background: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  image {
    width: 240rpx;
    height: 135rpx;
  }
}

.container {
  padding: 0;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 0 40rpx;
    .tip-list {
      position: absolute;
      top: 235rpx;
      left: 70rpx;
      width: 80%;
      min-height: 60rpx;
      box-sizing: border-box;
      padding-left: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 15rpx;
      border: 1px solid rgba(175, 174, 174, 0.562);
      background: #fff;
      text {
        display: block;
        width: 100%;
        height: 60rpx;
        line-height: 60rpx;
        &:hover {
          background: rgb(211, 211, 211);
        }
      }
    }
  }
}
// 指数
.top-box {
  width: 90%;
  height: 650rpx;
  background: #fff;
  border-radius: 20rpx;
  margin: 0 40rpx;
  box-shadow: 0px 5px 20px#a0a0a0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20rpx;
  margin-bottom: 60rpx;
  position: relative;
  .search-box {
    width: 90%;
    height: 80rpx;
    box-shadow: 0px 5px 10px#d6d6d6;
    border-radius: 15rpx;
    border: 1rpx solid rgb(219, 219, 219);
    display: flex;
    margin-top: 20rpx;
    z-index: 2;
    .uni-input {
      width: 78%;
      height: 100%;
      margin-left: 2%;
    }
    .btn {
      width: 20%;
      height: 100%;
      background: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
      border-top-right-radius: 15rpx;
      border-bottom-right-radius: 15rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 35rpx;
        height: 35rpx;
      }
    }
  }
  .uni-data-select {
    width: 90%;
    height: 80rpx;
    box-shadow: 0px 5px 10px#d6d6d6;
    border-radius: 15rpx;
    border: 1rpx solid rgb(219, 219, 219);
    margin-top: 20rpx;
  }
  .total {
    width: 100%;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30rpx 0;
    margin-bottom: 50rpx;
    text {
      // margin-bottom: 10rpx;
      &:nth-child(1) {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9696a0;
        text-align: center;
        font-weight: 400;
      }
      &:nth-child(2) {
        font-family: SourceHanSansCN-Medium;
        font-size: 38.88px;
        color: #333333;
        letter-spacing: -1.94px;
        text-align: center;
        font-weight: 500;
      }
    }
  }
  .process {
    width: 90%;
    height: 60rpx;
    background: red;
    background: url('../../static/img2/loading.png') no-repeat center;
    background-size: 100% auto;
    position: relative;
    .tap {
      position: absolute;
      top: -50rpx;
      left: calc(0% - 50rpx);
      display: flex;
      flex-direction: column;
      align-items: center;
      .text {
        width: 100rpx;
        height: 50rpx;
        text-align: center;
        line-height: 50rpx;
        background: #f5f5f5;
        border-radius: 25rpx;
        text {
          font-size: 14px;
        }
      }
      .sign {
        width: 8rpx;
        height: 40rpx;
        border: 2rpx solid #fff;
        border-radius: 4px;
        margin-top: 5rpx;
      }
    }
  }
  .zs {
    width: 100%;
    height: 250rpx;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 10rpx;
    .item {
      width: 33%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text {
        margin-bottom: 10rpx;
        &:nth-child(1) {
          font-family: PingFang-SC-Bold;
          font-size: 18px;
          color: #3b4664;
          letter-spacing: 0;
          line-height: 15px;
          font-weight: 700;
        }
        &:nth-child(2) {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #aeb3c0;
          letter-spacing: 0;
          font-weight: 400;
        }
      }
    }
  }
}
// 轮播图
.content {
  .image-container {
    width: 100%;
    height: 320rpx;
    margin-top: 30rpx;
  }

  .item {
    position: relative;
  }

  .image {
    width: 100%;
    height: 320rpx;
  }

  .item-img {
    width: 100%;
    height: 320rpx;
    border-radius: 14rpx;
    animation: to-big 0.3s;
    overflow: hidden;
    box-shadow: 5rpx 10rpx 10rpx rgba($color: #ffab5e, $alpha: 0.4);
  }

  .swiper-item {
    width: 100%;
    height: 320rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .item-img-side {
    width: 95%;
    height: 288rpx;
    border-radius: 14rpx;
    animation: to-mini 0.3s;
    overflow: hidden;
  }

  .swiper-item-side {
    width: 95%;
    height: 288rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @keyframes to-mini {
    from {
      height: 320rpx;
    }

    to {
      height: 288rpx;
    }
  }

  @keyframes to-big {
    from {
      height: 288rpx;
    }

    to {
      height: 320rpx;
    }
  }
}
// 入口
.entrance {
  width: 90%;
  margin: 0 40rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
  .item {
    width: 48%;
    height: 120rpx;
    background: url('../../static/img2/model1.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 15rpx;
    box-sizing: border-box;
    padding-left: 20rpx;
    .text1 {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #ffffff;
      font-weight: 500;
    }
    .text2 {
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 8px;
      color: #ffffff;
      font-weight: 400;
    }
  }
  .model2 {
    height: 105%;
    width: 250rpx;
    background: url('../../static/img2/model2.png') no-repeat center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-size: 100% 100%;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #ffffff;
    font-weight: 500;
  }
}
// 文物精选
.qita {
  width: 90%;
  margin: 0 40rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .daolan {
    width: 49%;
    &:nth-child(2n-1) {
      margin-right: 2%;
    }
  }
}
.daiban {
  width: 90%;
  display: flex;
  justify-content: space-between;
  height: 100rpx;
  line-height: 100rpx;
  margin: 0 40rpx;
  align-items: center;

  .left {
    text {
      font-size: 36rpx;
      color: #203152;
      letter-spacing: 0;
    }
  }

  .right {
    display: flex;
    align-items: center;

    text {
      font-size: 26rpx;
      color: #a9b6cf;
    }

    .icon {
      margin-right: 20rpx;
    }
  }
}

.daolan {
  position: relative;
  height: 300rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
  width: 49%;
  &:nth-child(2n-1) {
    margin-right: 2%;
  }

  image {
    width: 100%;
    height: 240rpx;
  }
  .name {
    color: #333333;
  }
}

// 适老版
.oldcontainer {
  .scroll-view_H {
    .scroll-view-item_H {
      font-size: 36rpx;
    }
  }
  .top-box {
    width: 90%;
    height: 650rpx;
    background: #fff;
    border-radius: 20rpx;
    margin: 0 40rpx;
    box-shadow: 0px 5px 20px#a0a0a0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 20rpx;
    margin-bottom: 60rpx;
    .search-box {
      width: 90%;
      height: 80rpx;
      box-shadow: 0px 5px 10px#d6d6d6;
      border-radius: 15rpx;
      border: 1rpx solid rgb(219, 219, 219);
      display: flex;
      margin-top: 20rpx;
      .uni-input {
        width: 78%;
        height: 100%;
        margin-left: 2%;
      }
      .btn {
        width: 20%;
        height: 100%;
        background: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
        border-top-right-radius: 15rpx;
        border-bottom-right-radius: 15rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 35rpx;
          height: 35rpx;
        }
      }
    }
    .uni-data-select {
      width: 90%;
      height: 80rpx;
      box-shadow: 0px 5px 10px#d6d6d6;
      border-radius: 15rpx;
      border: 1rpx solid rgb(219, 219, 219);
      margin-top: 20rpx;
    }
    .total {
      width: 100%;
      height: 80rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 30rpx 0;
      margin-bottom: 50rpx;
      text {
        &:nth-child(1) {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #9696a0;
          text-align: center;
          font-weight: 400;
          margin-right: 50rpx;
        }
        &:nth-child(2) {
          font-family: SourceHanSansCN-Medium;
          font-size: 38px;
          color: #333333;
          letter-spacing: -1.94px;
          text-align: center;
          font-weight: 500;
        }
      }
    }
    .process {
      width: 90%;
      height: 60rpx;
      background: red;
      background: url('../../static/img2/loading.png') no-repeat center;
      background-size: 100% auto;
      position: relative;
      .tap {
        position: absolute;
        top: -50rpx;
        left: calc(0% - 50rpx);
        display: flex;
        flex-direction: column;
        align-items: center;
        .text {
          width: 150rpx;
          height: 50rpx;
          text-align: center;
          line-height: 50rpx;
          background: #f5f5f5;
          border-radius: 25rpx;
          text {
            font-size: 20px;
          }
        }
        .sign {
          width: 8rpx;
          height: 40rpx;
          border: 2rpx solid #fff;
          border-radius: 4px;
          margin-top: 5rpx;
        }
      }
    }
    .zs {
      width: 100%;
      height: 250rpx;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 10rpx;
      .item {
        width: 33%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text {
          margin-bottom: 10rpx;
          &:nth-child(1) {
            font-family: PingFang-SC-Bold;
            font-size: 24px;
            color: #3b4664;
            letter-spacing: 0;
            line-height: 15px;
            font-weight: 700;
          }
          &:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 22px;
            color: #aeb3c0;
            letter-spacing: 0;
            font-weight: 400;
          }
        }
      }
    }
  }
  .entrance {
    width: 90%;
    margin: 0 40rpx;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 40rpx;
    margin-bottom: 40rpx;
    .item {
      width: 100%;
      height: 200rpx;
      background: url('../../static/img2/model1.png') no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: 15rpx;
      box-sizing: border-box;
      padding-left: 20rpx;
      .text1 {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #ffffff;
        font-weight: 500;
      }
      .text2 {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        font-weight: 400;
      }
    }
    .model2 {
      height: 105%;
      width: 250rpx;
      background: url('../../static/img2/model2.png') no-repeat center;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      background-size: 100% 100%;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #ffffff;
      font-weight: 500;
    }
  }

  .daiban {
    .left {
      text {
        font-size: 54rpx;
      }
    }
    .right {
      text {
        font-size: 40rpx;
      }
    }
  }
  // 文物精选
  .qita {
    width: 90%;
    margin: 0 40rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .daolan {
      width: 100%;
      .name {
        font-size: 40rpx;
      }
    }
  }
}
</style>
