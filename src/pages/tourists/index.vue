<template>
  <view style="box-sizing: border-box; padding-bottom: 0px">
    <view class="container" :class="show == 'block' ? '' : 'oldcontainer'">
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
        <view class="model1" @click="toReport">
          <text class="text1"> 问题上报 </text>
          <text class="text2"> Problem reporting </text>
        </view>
        <view class="model2" @click="clickRegister"> 申请成为<br />志愿者 </view>
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

      <view class="rank-title" v-if="false"> 护保排行 </view>
      <view class="rank-table" v-if="false">
        <view class="table-head">
          <text>排名</text>
          <text>文保名称</text>
          <text>永兴指数</text>
        </view>
        <view class="table-body">
          <view class="row" v-for="(item, index) in rankList" :key="index">
            <view class="col">
              <image
                class="img1"
                :src="index == 0 ? '/static/img2/Crown_gold.png' : index == 1 ? '/static/img2/Crown_silver.png' : index == 2 ? '/static/img2/Crown_copper.png' : '/static/img2/Crown_copper.png'"
                mode="scaleToFill"
              />
            </view>
            <text class="col">{{ item.name }}</text>
            <view class="col">
              <image class="img2" src="/static/img2/lever.png" mode="scaleToFill" />
            </view>
          </view>
        </view>
      </view>
      <!-- <tabbar /> -->
    </view>
  </view>
</template>
<script>
import tabbar from '@/components/tabbar/touriststabbar.vue';
import tabbarold from '@/components/tabbar/touriststabbarold.vue';
import Mgop from '@/mgopService';
import { getNews, getWenbaodianAppList, authx_wechat, wechat_userinfo, myUserData } from '@/api/api.js';
export default {
  components: {
    tabbar,
    tabbarold,
  },
  data() {
    return {
      show: 'block',
      imgList: [
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
      // 宣传列表
      publicityList: [],
      guideList: [],
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
      // 护保排行
      rankList: [
        {
          name: '务本堂',
        },
        {
          name: '许家南大房',
        },
        {
          name: '茅湾里',
        },
      ],
    };
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        // console.log(res);
      },
    });
    // uni.hideTabBar({});
  },
  onShow() {
    // console.log("onShow");
    if (uni.getStorageSync('version') == 'new') {
      this.show = 'block';
    } else if (uni.getStorageSync('version') == 'old') {
      this.show = 'none';
    }
    this.getNews();
  },
  //埋点02  埋点相关代码开始
  created() {
    uni.removeStorageSync('hiddenSelectObject');
    uni.removeStorageSync('hiddenTroubleForm');
    this.setTime();
  },
  //埋点02
  async mounted() {
    

    //现在，我已经不想再关心登录的逻辑了，所有的逻辑都在landing里面处理完了

    //start 埋点03
    this.t0 = (Date.now() - this.browseTime) / 1000.0;
    //end 埋点03 
    
  

  
   
    this.getNews();
    this.getWenbaodianList();
    // console.log('browseTime', this.browseTime);
    this.t2 = (Date.now() - this.browseTime) / 1000.0;
    var that = this;
    clearInterval(that.clearTimeSet); // 离开页面后清除定时器
    zwlog.onReady(function () {
      //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
      zwlog.sendPV({
        miniAppId: '2002282040',
        miniAppName: '永兴护保',
        pageId: 'guid-index',
        pageName: '导览首页',
        t2: that.t2,
        t0: that.t0,
        log_status: '02',
      });
    });
  },
  methods: {
    toReport() {
      uni.navigateTo({
        url: '/pages/hiddentroublereport/index',
      });
    },
    setTime() {
      //设置定时器
      this.browseTime = Date.now();
      // this.clearTimeSet = setInterval(() => {
      //   this.browseTime++;
      //   //console.log(this.browseTime/10.0, "时长累计");
      // }, 100);
    },
   
    banner_redirect() {
      uni.navigateTo({
        // url:'./daolan/detail'
        url: '/pages/tourists/daolan/detail?item=' + JSON.stringify(this.direct_item),
      });
    },
    format_name(val) {
      if (val != null && val.length > 0) {
        return '*' + val.substring(1);
      } else {
        return '*';
      }
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
    changebanben() {
      uni.removeStorageSync('version');
      uni.setStorageSync('version', 'old');
      this.show = 'none';
    },
    changebanben1() {
      uni.removeStorageSync('version');
      uni.setStorageSync('version', 'new');
      this.show = 'block';
    },
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
    },
    async tel() {
      var sysinfo = uni.getSystemInfoSync();
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
    // 获取文保宣传列表
    async getNews() {
      //  getNews.then((data)=>{
      // 	  // 业务响应参数
      // 	  console.log("mgop.ztemaps.cultural.loginx",data);
      // 	}).catct(error=>{
      // 	  // 异常信息
      // 	  console.log(error);
      // 	})
      // params
      //const res = await getNews();
      //this.publicityList = res.data.list.slice(0, 5);
      // 		console.log(this.publicityList,546546);
    },
    // 获取文保点
    async getWenbaodianList() {
      let params = {
        currentPage: 1,
        pageSize: 50,
        jd:"进化镇"
      };
      const res = await getWenbaodianAppList(params);

      //在后台接口不能变的情况下，屏蔽掉第一次培训以外的文保点
      var offset_res = [];
      console.log(res.data.list);
      var allow_ids = [10, 11, 12, 2, 21, 22, 26, 4, 43, 45, 5, 8, 38, 55];
      for (var i = 0; i < res.data.list.length; i++) {
        if (allow_ids.indexOf(parseInt(res.data.list[i].id))>-1) {
          offset_res.push(res.data.list[i]);
        }

      }
      console.log("offset_res1",offset_res);

      for(var i=0;i<offset_res.length;i++){
        if(offset_res[i].id=="10"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1e5b7bdc-1b87-4648-bb81-ba9ee5ed9b90.jpg';
        }else  if(offset_res[i].id=="11"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69c169ae-0ae0-40ef-b881-7c8453ddae6a.jpg';

        }else  if(offset_res[i].id=="12"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/6555da92-c5fe-472c-b4af-5d21f115bff9.jpg';
        }else  if(offset_res[i].id=="2"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/76bda0d1-3ed0-49f1-9606-be107600cbc3.jpg';
        }else  if(offset_res[i].id=="21"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/40a60581-018c-44f1-9c57-70f5d019dae3.jpg';

        }else  if(offset_res[i].id=="22"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/9b7e2370-f39e-4a4b-b48a-45dd33d66c96.jpg';
        }else  if(offset_res[i].id=="26"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/8d88a7a8-7ed6-4fdd-99cd-26f947020518.jpg';
        }else  if(offset_res[i].id=="4"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ca6d61d1-5e8e-40f7-a322-9043b37fdd33.jpg';
        }else  if(offset_res[i].id=="43"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/25c3afdc-f821-4951-abf1-9c9be164bce4.jpg';
        }else  if(offset_res[i].id=="45"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/f9f52bc2-006a-4031-ba43-10ed4af79480.jpg';
        }else  if(offset_res[i].id=="5"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/c38d5930-c229-4ebc-8531-fa5069687f0c.jpg';
        }else  if(offset_res[i].id=="8"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a92cfee0-eeb7-4760-bb1e-fcafd2cec1b0.jpg';
        }else  if(offset_res[i].id=="38"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a85f351e-24bd-4acd-b7ad-d96158241e7e.jpg';
        }else  if(offset_res[i].id=="55"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ba0c132a-ca07-4c7d-ab14-445df838f441.jpg';
        }
      }

      this.guideList = offset_res;
    },
    // 申请巡查员
    clickRegister() {
      uni.navigateTo({
        url: '/pages/register/index',
      });
    },
    // 宣传详情
    clickDetail(id) {
      // uni.navigateTo({
      // 	url: './publicity/detail?id=' + id
      // })
      this.$navTo.navigateTo({
        url: './publicity/detail?id=' + id,
      });
    },
    // 宣传列表
    clickPublicity() {
      uni.navigateTo({
        url: './publicity/index',
      });
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
// ::v-deep .uni-page-head {
//   background: none !important;
//   color: #fff !important;
//   z-index: 0 !important;
// }

// .uni-page-head {
//   background: none !important;
//   color: #fff !important;
// }

// ::v-deep uni-page-body {
//   background: none !important;
// }

// uni-page-body {
//   background: none !important;
// }

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
.entrance {
  width: 90%;
  margin: 0 40rpx;
  height: 150rpx;
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
  view {
    height: 100%;
    box-sizing: border-box;
    padding-left: 20rpx;
  }
  .model1 {
    width: 400rpx;
    background: url('../../static/img2/model1.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
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
// 适老版
.oldcontainer {
  //   .scroll-view_H {
  //     .scroll-view-item_H {
  //       font-size: 36rpx;
  //     }
  //   }
  .entrance {
    width: 90%;
    margin: 0 40rpx;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    margin-top: 40rpx;
    view {
      height: 100%;
      box-sizing: border-box;
      padding-left: 20rpx;
    }
    .model1 {
      width: 400rpx;
      background: url('../../static/img2/model1.png') no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .text1 {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #ffffff;
        font-weight: 500;
      }
      .text2 {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        font-weight: 400;
      }
    }
    .model2 {
      height: 105%;
      width: 270rpx;
      background: url('../../static/img2/model2.png') no-repeat center;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      background-size: 100% 100%;
      font-family: PingFangSC-Medium;
      font-size: 18px;
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

.container {
  padding: 0;
  z-index: 1;
}

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

// .scroll-view_H {
//   white-space: nowrap;
//   width: 100%;
// }

// .scroll-view-item_H {
//   position: relative;
//   display: inline-block;
//   width: 240rpx;
//   height: 135rpx;
//   font-size: 10px;
//   color: #ffffff;
//   margin: 0px 5px;
//   border-radius: 8px;
//   overflow: hidden;

//   .title {
//     position: absolute;
//     bottom: 0px;
//     color: #fff;
//     text-indent: 10px;
//     width: 240rpx;
//     background: rgba(0, 0, 0, 0.6);
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   image {
//     width: 240rpx;
//     height: 135rpx;
//   }
// }

.register {
  width: 90%;
  margin: 0 auto;
  margin-top: 60rpx;

  image {
    width: 100%;
    height: 150rpx;
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

.rank-title {
  width: 90%;
  height: 100rpx;
  line-height: 100rpx;
  margin: 0 40rpx;
  margin-top: 30rpx;
  color: #333333;
}
.rank-table {
  width: 90%;
  margin: 0 40rpx;
  margin-top: 10rpx;
  .table-head {
    width: 100%;
    height: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .table-body {
    width: 100%;
    height: auto;
    .row {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20rpx 0;
      .col {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .img1 {
          width: 50rpx;
          height: 30rpx;
        }
        .img2 {
          width: 100rpx;
          height: 46rpx;
        }
      }
    }
  }
}
</style>
