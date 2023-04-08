<template>
  <view class="container" :class="[ISForOld ? 'oldcontainer' : '']">
    <view class="" style="text-align: center; font-size: 36rpx; color: #fff; margin-top: 40px; padding-bottom: 10px"> </view>
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
          @click="banner_redirect"
          lazy-load
          :style="dontFirstAnimation ? 'animation: none;' : ''"
        >
          <view class="item" :class="currentIndex == index ? 'item-img' : 'item-img-side'">
            <image class="image" :src="item.image || errorImage" mode=""></image>
          </view>
        </swiper-item>
      </swiper>
      <view class="top">
        <image src="../../static/icon/touxiang.png" mode="aspectFit"></image>
        <view class="right">
          <view class="name">
            {{ format_name(name) }}
          </view>
          <view class="id"> ID:{{ id && id.substring(0, 14) }} </view>
          <view class="role">
            <uni-tag :text="user" class="tag" />
          </view>
        </view>
      </view>
      <view class="daiban" @click="clickTodo">
        <view class="left">
          <text>待办事项</text>
        </view>
        <view class="right rnum">
          <text>{{ todoNum }}</text>
          <uni-icons type="right" color="#8E8E93" size="20" class="icon"></uni-icons>
        </view>
      </view>
      <view class="yingyong">
        <view class="section" v-if="!ISForOld">
          <uni-grid :column="4" :show-border="false" :square="false">
            <uni-grid-item v-for="(item, index) in appMenu" :index="index" :key="index" @click="redirect(item.to)" style="width: calc(100% / 4)">
              <view class="grid-item-box">
                <image class="image" :src="item.url" mode="aspectFill" />
                <text class="text">{{ item.text.substring(0, 4) }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </view>
        <view class="section" v-else>
          <uni-grid :column="2" :show-border="false" :square="false">
            <uni-grid-item v-for="(item, index) in appMenu" :index="index" :key="index" @click="redirect(item.to)" style="width: calc(100% / 2)">
              <view class="grid-item-box">
                <image class="image" :src="item.url" mode="aspectFill" />
                <text class="text">{{ item.text.substring(0, 4) }}</text>
              </view>
            </uni-grid-item>
          </uni-grid>
        </view>
      </view>
      <!-- 巡查员 -->
      <view class="qita" v-if="role == '文物护保员'">
        <view class="daiban1">
          <view class="left">
            <text>我关联的文物</text>
          </view>
        </view>
        <view class="daolan" v-for="(item, index) in publicityList" :key="index" @click="daolanDetail(item)">
          <image src="/static/wbimg/mwl.png" v-if="item.publishName == '茅湾里窑址'"></image>
          <image src="/static/wbimg/zdyh.png" v-else-if="item.publishName == '浙东运河'"></image>
          <image src="/static/wbimg/base.png" v-else></image>
          <view class="title">
            <view class="tit"> <image src="../../static/icon/wwicon.png" mode="aspectFill"></image> {{ item.publishName }} </view>
            <view class="tit1"> <image src="../../static/icon/dzicon.png" mode="aspectFill"></image> 地址:{{ item.address }} </view>
          </view>
        </view>
      </view>
      <!-- 其他 -->
      <view class="qita" v-else>
        <view class="daiban1" @click="clickDaoLan">
          <view class="left">
            <text>文物导览</text>
          </view>
          <view class="right">
            <text>全部</text>
            <uni-icons type="right" size="20" class="icon" color="#8E8E93"></uni-icons>
          </view>
        </view>
        <view class="daolan" v-for="(item, index) in guideList" :key="index" @click="daolanDetail(item)">
          <image src="/static/wbimg/mwl.png" v-if="item.publishName == '茅湾里窑址'" mode="aspectFill"></image>
          <image src="/static/wbimg/zdyh.png" v-else-if="item.publishName == '浙东运河'" mode="aspectFill"></image>
          <image src="/static/wbimg/base.png" v-else mode="aspectFill"></image>
          <view class="title">
            <view class="tit"> <image src="../../static/icon/wwicon.png" mode="aspectFill"></image> {{ item.publishName }} </view>
            <view class="tit1"> <image src="../../static/icon/dzicon.png" mode="aspectFill"></image> 地址:{{ item.address }} </view>
          </view>
        </view>
        <view style="text-align: center">本服务由浙江政务服务网、萧山区文旅局提供</view>
        <view style="text-align: center"> 服务咨询热线：<a class="removeCommonA" @click="tel">0571-82898468</a></view>
      </view>
    </view>
  </view>
</template>
<script>
import tabbar from '@/components/tabbar/tabbar.vue';
import tabbarold from '@/components/tabbar/tabbarold.vue';
import { getWenbaodianList, getGuanLianWemwu, queryMyNeedCountByToken, myUserData } from '@/api/api.js';
export default {
  components: {
    tabbar,
    tabbarold,
  },
  data() {
    return {
      ISForOld: false,
      browseTime: 0, // 增长时长
      clearTimeSet: null, //定时器
      t0: 0,
      t2: 0,
      imgList: [
        {
          image: '/static/slide/2.png',
        },
      ],
      currentIndex: 0,
      dontFirstAnimation: true,
      scrollTop: 0,
      ranklist: [
        {
          text: '全国重点文保单位',
          value: '14da5819da904c4ab1d9d94a961ca27a',
        },
        {
          text: '省级文保单位',
          value: 'cef2a80fbea6df89578ad5599b67b71f',
        },
        {
          text: '市级文保单位',
          value: '2bf3be523de944ec3ee1ad832a7a2587',
        },
      ],
      bumpPointId: null,
      appMenu: [],
      role: null,
      user: null,
      name: null,
      id: null,
      guideList: [],
      publicityList: [],
      wenwuList: [],
      todoNum: null,
      show: null,
      direct_item: {
        id: '11',
        rank: 'cef2a80fbea6df89578ad5599b67b71f',
        rankId: null,
        publishName: '务本堂',
        publishBatch: null,
        publishTime: null,
        equityNatureId: null,
        useCondition: null,
        isOpen: null,
        floorSpace: null,
        coveredArea: null,
        specificDistribution: '务本堂一处',
        category: '古建筑',
        address: '进化镇欢潭村',
        poi: '120.305,29.9544',
        polygon:
          '120.30024720737993,29.952327427729784,120.29759828669853,29.951638435777582,120.29463793585785,29.955972285701407,120.29351504415962,29.96048282681643,120.30076279966744,29.966231259022535,120.31015425750763,29.96357817778069,120.31536039174694,29.95880245306701,120.30678558241283,29.953938053139808,120.30024720737993,29.952327427729784',
        centerPoi: '120.30443771795328,29.95893484740006',
        protectionArea: '包含重要的历史环境，四至相近道路的近建筑侧路缘石线，详见图则，总面积6022平方米。',
        controlRequirement: null,
        controlPolygon:
          '120.30114667009138,29.958281565516458,120.29977450625915,29.959311540143233,120.30075351945095,29.961538474773732,120.30265437586894,29.960850068247467,120.30347241638532,29.959208355252656,120.30237436213662,29.958601617095525,120.30114667009138,29.958281565516458',
        firstLevelConstruction: '-',
        firstLevelControlRequire: null,
        firstLevelPolygon: null,
        secordLevelConstruction: '东至东侧村道，南至欢潭南侧田间道路，西至河道东侧，北至北侧村道，详见图则，总面积为53333平方米。',
        secordLevelControlRequire: null,
        secordLevelPolygon:
          '120.29967564421241,29.962838019706666,120.30346239493997,29.963700746314302,120.30517376855965,29.959863276021878,120.30218206408728,29.95645646525736,120.29898668441399,29.95730962778289,120.29830966034672,29.959997176886205,120.29844390714283,29.961567713726836,120.29967564421241,29.962838019706666',
        planningName: null,
        planApprovalTime: null,
        ainRiskId: null,
        responsibilityUnitId: null,
        riskLevel: null,
        directlyLiableUnitId: '31871df508369d349043d05612e04de1',
        directlyLiableUnit: '区公安分局',
        directlyLiableUser: '李晓文',
        directlyLiableUserPhone: '13912345698',
        safetyManager: '郭如你',
        safetyManagerPhone: '15382349877',
        civilSecurityInspector: '张攀',
        civilSecurityInspectorPhone: '17215632495',
        extinguisherNum: null,
        fireHydrantNum: null,
        fightingUser: null,
        fightingUserPhone: null,
        monitorNum: null,
        cableAccordingPoling: null,
        createTime: '2022-05-28+09:12:19',
        updateTime: '2022-07-19+09:56:12',
        isGraden: 0,
        introduce: '坐北朝南，前后三进两院落，东厢房北侧一小天井及附房。系官至镇江知府的田祚故居。',
        years: '清、民国',
        recordNumber: '20220725164829',
        levelInfo: null,
        firstTrial: null,
        finalTrial: '火灾隐患风险定级:一级,盗挖盗掘风险定级:二级',
        securityDutyCheckVOList: null,
        gradingTime: null,
        fireSafetyList: null,
        bumpPointFileList: null,
        maxLevel: '三级',
        fireMaxLevel: '高风险',
        fireMaxScore: null,
        actMaxLevel: '低风险',
        actMaxScore: null,
        legalMaxLevel: '低风险',
        legalMaxScore: null,
        poachingMaxLevel: '中风险',
        poachingMaxScore: null,
        jd: '进化镇',
        spjk: 10,
        gyjc: 3,
        syjc: 6,
        qxjc: 2,
        dljc: 1,
        gwjc: 4,
        pointImgPath: '0f06dd27-80e9-4a46-a415-65c7f0e07906.jpg',
        remark: null,
        bumpPointActivationUtilizationList: null,
      },
    };
  },
  created() {
    this.setTime();
  },
  onShow() {
    this.checkMode();
  },
  onLoad() {
    console.log('onLoad');
    this.fetchRole();
  },
  onPageScroll(e) {
    //根据距离顶部距离是否显示回到顶部按钮
    this.scrollTop = e.scrollTop;
  },
  mounted() {
    this.getWenbaodianList();
    this.queryMyNeedCountByToken();
    this.buryPoints();
  },
  methods: {
    buryPoints() {
      this.t0 = (Date.now() - this.browseTime) / 1000.0;
      this.t2 = (Date.now() - this.browseTime) / 1000.0;
      var that = this;
      clearInterval(that.clearTimeSet);
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'index-index',
          pageName: '审核后首页',
          t2: this.t2,
          t0: this.t0,
          log_status: '02',
        });
      });
    },
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
      } else {
        this.ISForOld = false;
      }
    },
    fetchRole() {
      myUserData()
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            console.log('res', shorter);
            let final = shorter.sort((a, b) => {
              return a.userType - b.userType;
            });
            // this.role = uni.getStorageSync('role');
            if (final && final.length) {
              let trackFlag = final[0].userType;
              if (trackFlag) {
                switch (trackFlag) {
                  case '1':
                    uni.setStorageSync('role', '文保员');
                    this.role = '文物护保员';
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
        });
    },
    analyseRole() {
      // uni.hideTabBar({});
      uni.removeStorageSync('hiddenSelectObject');
      uni.removeStorageSync('hiddenTroubleForm');
      this.name = uni.getStorageSync('name');
      this.id = uni.getStorageSync('id');
      //   this.role = '志愿者';
      //   this.name = '姜寒';
      //   this.id = '8a118a50787458aa01790f442f1a1960';
      this.getGuanLianWemwu();
      if (this.role == '党员') {
        this.appMenu = [
          {
            url: '/static/index/lix.png',
            text: '例行检查',
            to: '/pages/routinecheck/index',
          },
          {
            url: '/static/index/yinhuan.png',
            text: '隐患上报',
            to: '/pages/hiddentroublereport/index',
          },
          // {
          //   url: "/static/index/dianqi.png",
          //   text: "电器事项",
          //   to: "/pages/equipment/index",
          // },
          // {
          //   url: "/static/index/xiaofang.png",
          //   text: "消防事项",
          //   to: "/pages/extinguishment/index",
          // },
          {
            url: '/static/index/xuanc.png',
            text: '文保宣传',
            to: '/pages/tourists/publicity/index',
          },
          {
            url: '/static/index/mission.png',
            text: '任务中心',
            to: '/pages/mission/index',
          },
        ];
      }
      if (this.role == '志愿者') {
        this.appMenu = [
          {
            url: '/static/index/lix.png',
            text: '例行检查',
            to: '/pages/inspection/index',
          },
          {
            url: '/static/index/yinhuan.png',
            text: '隐患上报',
            to: '/pages/hiddentroublereport/index',
          },
          // {
          //   url: "/static/index/dianqi.png",
          //   text: "电器事项",
          //   to: "/pages/equipment/index",
          // },
          // {
          //   url: "/static/index/xiaofang.png",
          //   text: "消防事项",
          //   to: "/pages/extinguishment/index",
          // },
          {
            url: '/static/index/xuanc.png',
            text: '文保宣传',
            to: '/pages/tourists/publicity/index',
          },
          {
            url: '/static/index/mission.png',
            text: '任务中心',
            to: '/pages/mission/index',
          },
        ];
      }
      if (this.role == '第三方公司' || this.role == '专家小组') {
        this.appMenu = [
          {
            url: '/static/index/dingji.png',
            text: '文物定级',
            to: '/pages/grading/index',
          },
          {
            url: '/static/index/tijian.png',
            text: '文物体检',
            to: '/pages/culturalcheck/index',
          },
          {
            url: '/static/index/xuanc.png',
            text: '文保宣传',
            to: '/pages/tourists/publicity/index',
          },
        ];
      }
      if (this.role == '文保员') {
        this.appMenu = [
          //   {
          //     url: '/static/index/dingji.png',
          //     text: '文物导览',
          //     to: '/pages/tourists/daolan/index',
          //   },
          //   {
          //     url: '/static/index/anquan.png',
          //     text: '安全整改',
          //     to: '/pages/safe/index',
          //   },
          //   {
          //     url: '/static/index/lix.png',
          //     text: '例行检查',
          //     to: '/pages/routinecheck/index',
          //   },
          //   {
          //     url: '/static/index/zhuanxiang.png',
          //     text: '专项检查',
          //     to: '/pages/speciallettersupervise/index?title=' + 'zxjc',
          //   },
          //   {
          //     url: '/static/index/yinhuan.png',
          //     text: '隐患上报',
          //     to: '/pages/hiddentroublereport/index',
          //   },
          //   {
          //     url: '/static/index/dianqi.png',
          //     text: '电器事项',
          //     to: '/pages/equipment/index',
          //   },
          //   {
          //     url: '/static/index/xiaofang.png',
          //     text: '消防事项',
          //     to: '/pages/extinguishment/index',
          //   },
          //   {
          //     url: '/static/index/xinfang.png',
          //     text: '信访事件',
          //     to: '/pages/speciallettersupervise/xinfangindex?title=' + 'xfsj',
          //   },
          //   {
          //     url: '/static/index/shangji.png',
          //     text: '上级督查',
          //     to: '/pages/speciallettersupervise/shangjiindex?title=' + 'sjdc',
          //   },
          //   {
          //     url: '/static/index/tongguan.png',
          //     text: '一网统管',
          //     to: '/pages/allmessage/allmessage',
          //   },
          //   {
          //     url: '/static/index/xuanc.png',
          //     text: '文保宣传',
          //     to: '/pages/tourists/publicity/index',
          //   },
          {
            url: '/static/index/lix.png',
            text: '例行检查',
            to: '/pages/inspection/index',
          },
          {
            url: '/static/index/yinhuan.png',
            text: '隐患上报',
            to: '/pages/hiddentroublereport/index',
          },
          {
            url: '/static/index/xuanc.png',
            text: '文保宣传',
            to: '/pages/tourists/publicity/index',
          },
          {
            url: '/static/index/mission.png',
            text: '任务中心',
            to: '/pages/mission/index',
          },
        ];
      }
      if (this.role == '镇街') {
        this.appMenu = [
          {
            url: '/static/index/dingji.png',
            text: '文物定级',
            to: '/pages/grading/index',
          },
          {
            url: '/static/index/anquan.png',
            text: '安全整改',
            to: '/pages/safe/index',
          },
          {
            url: '/static/index/zhuanxiang.png',
            text: '专项检查',
            to: '/pages/speciallettersupervise/index?title=' + 'zxjc',
          },
          {
            url: '/static/index/tijian.png',
            text: '文物体检',
            to: '/pages/culturalcheck/index',
          },
          {
            url: '/static/index/yinhuan.png',
            text: '隐患处理',
            to: '/pages/hiddendanger/index',
          },
          {
            url: '/static/index/xinfang.png',
            text: '信访事件',
            to: '/pages/speciallettersupervise/xinfangindex?title=' + 'xfsj',
          },
          {
            url: '/static/index/shangji.png',
            text: '上级督查',
            to: '/pages/speciallettersupervise/shangjiindex?title=' + 'sjdc',
          },
          {
            url: '/static/index/tongguan.png',
            text: '一网统管',
            to: '/pages/allmessage/allmessage',
          },
          {
            url: '/static/index/xuanc.png',
            text: '文保宣传',
            to: '/pages/tourists/publicity/index',
          },
          {
            url: '/static/index/zijin.png',
            text: '文保资金',
            to: '/pages/applymoney/index',
          },
        ];
      }
    },
    setTime() {
      this.browseTime = Date.now();
    },
    format_name(val) {
      if (val != null && val.length > 0) {
        return '*' + val.substring(1);
      } else {
        return '*';
      }
    },
    banner_redirect() {
      uni.navigateTo({
        url: '/pages/tourists/daolan/detail?item=' + JSON.stringify(this.direct_item),
      });
    },
    async tel() {
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      console.log('bIsDtDreamApp浙里办app', bIsDtDreamApp);
      const ssoFlag = await ZWJSBridge.ssoTicket({});
      if (ssoFlag && ssoFlag.result && !bIsAlipayMini && !bIsDtDreamApp) {
        uni.makePhoneCall({
          phoneNumber: '057182898468', //仅为示例
        });
      } else {
        window.ZWJSBridge.phoneCall({
          corpId: '057182898468',
        })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async queryMyNeedCountByToken() {
      const res = await queryMyNeedCountByToken();
      this.todoNum = res.data;
    },
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
    },
    async getGuanLianWemwu() {
      let id = uni.getStorageSync('id');
      console.log(id);
      if (id) {
        let params = {
          id: id,
        };
        const res = await getGuanLianWemwu(params);
        if (res.data) {
          this.publicityList.push(res.data);
        }
      }
    },
    async getWenbaodianList() {
      let params = {
        currentPage: 1,
        pageSize: 2,
      };
      const res = await getWenbaodianList(params);
      this.guideList = res.data.list;
    },
    // 导览列表
    clickDaoLan() {
      uni.navigateTo({
        url: '/pages/tourists/daolan/index',
      });
    },
    // 导览详情
    daolanDetail(item) {
      uni.navigateTo({
        url: `/pages/tourists/daolan/detail?item=${JSON.stringify(item)}&scrollTop=${this.scrollTop}`,
      });
    },
    clickTodo() {
      uni.switchTab({
        url: '../todo/index',
      });
      // uni.navigateTo({
      //   url: '../todo/index',
      // })
    },
    redirect(e) {
      uni.navigateTo({
        url: e,
      });
    },
  },
};
</script>
<style lang="scss">
page {
  background: url('../../static/index/bg.png') no-repeat top center;
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

::v-deep uni-page-body {
  background: none !important;
}
.showblock {
  display: block;
}
.shownone {
  display: none !important;
}
.container {
  padding: 0;
  z-index: 1;
}

.content {
  padding-bottom: 10px;
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

.content {
  .daiban {
    width: 95%;
    display: flex;
    justify-content: space-between;
    font-size: 38rpx;
    height: 100rpx;
    line-height: 100rpx;
    margin: 0 auto;
    align-items: center;
    .icon {
      vertical-align: middle;
    }
    .left {
      .icon {
        margin-left: 25rpx;
        margin-right: 20rpx;
      }
    }
    .right {
      display: flex;
      align-items: center;
      font-size: 36rpx;
      .icon {
        margin-left: 20rpx;
        margin-right: 25rpx;
      }
    }
    .rnum {
      color: #203152;
    }
  }
  .yingyong {
    .section {
      background: #fff;
      margin-top: 0.5rem;
      .title {
        font-size: 32rpx;
        padding: 0.75rem 1rem;
        border-bottom: 2px solid #efefef;
      }
      .sectionTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #efefef;
        .title {
          border-bottom: none;
        }
        .titRight {
          font-size: 14px;
          padding: 0.75rem 1rem;
          color: deepskyblue;
        }
      }
    }

    .grid-item-box {
      flex: 1;
      position: relative;
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30rpx 0;

      .image {
        width: 102rpx;
        height: 102rpx;
      }

      .text {
        font-size: 30rpx;
        margin-top: 10rpx;
      }
    }
  }
}

.daiban1 {
  width: 95%;
  display: flex;
  justify-content: space-between;
  font-size: 38rpx;
  height: 100rpx;
  line-height: 100rpx;
  margin: 0 auto;
  margin-top: 30rpx;
  align-items: center;

  .icon {
    vertical-align: middle;
  }

  .left {
    .icon {
      margin-left: 20rpx;
      margin-right: 10rpx;
    }
  }

  .right {
    font-size: 26rpx;
    color: #a9b6cf;
    .icon {
      margin-left: 10rpx;
      margin-right: 20rpx;
    }
  }
}

.daolan {
  position: relative;
  height: 260rpx;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40rpx;
  width: 95%;
  margin: 30rpx auto;

  image {
    width: 100%;
    height: 260rpx;
  }

  .title {
    color: #fff;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    bottom: 0px;
    box-sizing: border-box;
    padding-left: 10rpx;

    .tit {
      font-size: 32rpx;
    }

    .tit1 {
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 24rpx;
    }

    image {
      width: 30rpx;
      height: 30rpx;
      vertical-align: middle;
    }
  }
}

.biaoti {
  font-size: 36rpx;
  padding: 20rpx;
}

.address {
  padding: 20rpx;
  padding-top: 0;
  border-bottom: 1px dashed #999;
}

.xia {
  display: flex;

  padding: 20rpx;

  .left {
    flex: 1;
    box-sizing: border-box;
    padding-right: 20rpx;

    .ss {
      line-height: 2;
      overflow: hidden;

      /*文字超出用省略号*/

      text-overflow: ellipsis;

      /*盒子模型*/

      display: -webkit-box;

      /*显示的文本行数,3行*/

      -webkit-line-clamp: 3;

      /*子元素的垂直排列方式*/

      -webkit-box-orient: vertical;
    }
  }

  .right {
    flex: 1;

    image {
      width: 100%;
      height: 200rpx;
      border-radius: 10px;
    }
  }
}

.qita {
  margin-bottom: 40px;
}

.top {
  display: flex;
  justify-content: center;

  margin-top: 40rpx;

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

.oldcontainer {
  .top {
    margin-top: 10rpx;
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

  .content {
    .daiban {
      font-size: 68rpx;
      .icon {
        vertical-align: middle;
      }

      .left {
        .icon {
          margin-left: 25rpx;
          margin-right: 20rpx;
        }
      }

      .right {
        display: flex;
        align-items: center;
        font-size: 48rpx;

        .icon {
          margin-left: 20rpx;
          margin-right: 25rpx;
        }
      }
      .rnum {
        color: #203152;
        .text {
          font-weight: bold;
        }
      }
    }

    .yingyong {
      .section {
        background: #fff;
        margin-top: 0.5rem;

        .title {
          font-size: 32rpx;
          padding: 0.75rem 1rem;
          border-bottom: 2px solid #efefef;
        }

        .sectionTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #efefef;

          .title {
            border-bottom: none;
          }

          .titRight {
            font-size: 14px;
            padding: 0.75rem 1rem;
            color: deepskyblue;
          }
        }
      }

      .grid-item-box {
        flex: 1;
        position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 30rpx 0;

        .image {
          width: 150rpx;
          height: 150rpx;
        }

        .text {
          font-size: 64rpx;
          margin-top: 10rpx;
        }
      }
    }
  }
  .daiban1 {
    font-size: 68rpx;
    .icon {
      vertical-align: middle;
    }

    .left {
      .icon {
        margin-left: 20rpx;
        margin-right: 10rpx;
      }
    }

    .right {
      font-size: 42rpx;
      color: #a9b6cf;
      .icon {
        margin-left: 10rpx;
        margin-right: 20rpx;
      }
    }
  }

  .daolan {
    position: relative;
    height: 260rpx;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 40rpx;
    width: 95%;
    margin: 30rpx auto;

    image {
      width: 100%;
      height: 260rpx;
    }

    .title {
      color: #fff;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: absolute;
      bottom: 0px;
      box-sizing: border-box;
      padding-left: 10rpx;

      .tit {
        font-size: 48rpx;
      }

      .tit1 {
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 36rpx;
      }

      image {
        width: 45rpx;
        height: 45rpx;
        vertical-align: middle;
      }
    }
  }

  .biaoti {
    font-size: 36rpx;
    padding: 20rpx;
  }

  .address {
    padding: 20rpx;
    padding-top: 0;
    border-bottom: 1px dashed #999;
  }

  .xia {
    display: flex;

    padding: 20rpx;

    .left {
      flex: 1;
      box-sizing: border-box;
      padding-right: 20rpx;

      .ss {
        line-height: 2;
        overflow: hidden;

        /*文字超出用省略号*/

        text-overflow: ellipsis;

        /*盒子模型*/

        display: -webkit-box;

        /*显示的文本行数,3行*/

        -webkit-line-clamp: 3;

        /*子元素的垂直排列方式*/

        -webkit-box-orient: vertical;
      }
    }

    .right {
      flex: 1;

      image {
        width: 100%;
        height: 200rpx;
        border-radius: 10px;
      }
    }
  }
}
.removeCommonA {
  text-decoration: none;
  color: #000;
}
</style>
