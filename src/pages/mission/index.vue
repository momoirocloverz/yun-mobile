<template>
  <view class="missionContainer" :class="[ISForOld ? 'oldMissionContainer' : '']">
    <view class="switchCon">
      <uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" :activeColor="'#1677FF'" />
    </view>
    <view class="contentCon">
      <view class="" v-if="dataList && dataList.length">
        <template v-for="(item, index) in dataList" :key="index">
          <view class="itemCon" @click="toDetail(item)">
            <view class="itemTitleimage">{{ typeFormat(item) }}</view>
            <view class="firstLine">
              <view class="firstName">
                {{ item.baseCheck && item.baseCheck.checkName }}
              </view>
              <view class="firstRight">
                <uni-icons v-if="!current" type="forward" size="24" color="#8E8E93"></uni-icons>
                <!-- <view class="rightStatus" :class="[item.subStatus == '待审核' ? 'colorYellow' : item.subStatus == '合格' ? 'colorGreen' : 'colorRed']" v-else>{{ item.subStatus }}</view> -->
                <!-- 文物局和镇街都没有审核呢 -->
                <view class="rightStatus colorYellow" v-else-if="(item.baseCheck.isRun == -1 || item.baseCheck.isRun == 2) && item.baseCheck.jdIsRunState == 0">待审核</view>
                <!-- 镇街审了 文物局还没审或者不需要审核 -->
                <view
                  class="rightStatus colorYellow"
                  v-else-if="(item.baseCheck.isRun == -1 || item.baseCheck.isRun == 2) && item.baseCheck.jdIsRunState != 0"
                  :class="[item.baseCheck.jdIsRunState == 1 ? 'colorGreen' : 'colorRed']"
                  >{{ jdIsRunStateMap[item.baseCheck.jdIsRunState] }}</view
                >
                <!-- 文物局审了 -->
                <view class="rightStatus colorYellow" v-else-if="item.baseCheck.isRun != -1" :class="[item.baseCheck.isRun == 99 ? 'colorRed' : 'colorYellow']">{{
                  isRunMap[item.baseCheck.isRun]
                }}</view>
              </view>
            </view>
            <view class="secondLine">
              <view class="secondTitle">任务事项：</view>
              <view class="secondContent" v-if="item.subArray && item.subArray.length">
                <template v-for="(sub, subIndex) in item.subArray" :key="subIndex">
                  <view class="innerCon flexStart">
                    <view class="innerTitle">事项{{ subIndex + 1 }}</view
                    >：
                    <view class="innerContent elli">{{ sub.content }}</view>
                  </view>
                </template>
              </view>
              <view class="secondContent" v-else>-</view>
            </view>
            <view class="thirdLine">
              <view class="secondTitle">上报时间：</view>
              <view class="secondContent">{{ (item.baseCheck && item.baseCheck.checkCreateTime) || '-' }}</view>
            </view>
            <view class="thirdLine">
              <view class="secondTitle">截止时间：</view>
              <view class="secondContent">{{ (item.baseCheck && item.baseCheck.checkDeadLine) || '-' }}</view>
            </view>
            <view class="fourthLine" v-if="current">
              <view class="secondTitle">处理时间：</view>
              <view class="secondContent">{{ (item.baseCheck && item.baseCheck.checkCreateTime) || '-' }}</view>
            </view>
            <view class="fifthLine">
              <view class="secondTitle">处理状态：</view>
              <!-- <view class="secondContent" :class="[current ? 'normal' : 'alert']">{{ current ? '已处理' : '未处理' }}</view> -->
              <view class="color-666">{{ item.baseCheck.checkStatus == '0' ? '处理中' : item.baseCheck.checkStatus == '1' ? '正常' : item.baseCheck.checkStatus == '-1' ? '异常' : '暂无' }}</view>
            </view>
          </view>
        </template>
      </view>
      <view class="emptyCon" v-else>
        <view class="emptyInner">
          <image :src="emptyImage" mode="widthFix" class="emptyImg" />
          <view class="emptyText">暂无任务</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getMyBaseCheckList } from '@/api/api.js';
export default {
  data() {
    return {
      emptyImage: '/static/images/img2@2x.png',
      currentPage: 1,
      pageSize: 10,
      current: 0,
      needRefresh: false,
      total: 0,
      items: ['未处理', '已处理'],
      show: null,
      ISForOld: false,
      globalStart: null,
      globalEnd: null,
      dataList: [],
      typeMap: {
        1: '专项检查',
        2: '专项整改',
        4: '设备报警',
        5: '安全检查',
        6: '信访案件',
        7: '上级督查',
        8: '问题上报',
        10: '一网统管',
        // 11: '设备上报',
        // 12: '自定义任务',
        11: '视频预警',
        12: '视频预警',
        13: '用电监测',
        14: '水压监测',
        15: '烟感监测',
        17: '智慧空开',
        18: '行为监测',
        31: '设备检查',
      },
      jdIsRunStateMap: {
        1: '已处置',
        99: '无法处置',
      },
      isRunMap: {
        1: '完结',
        99: '一网统管',
        2: '无需审核',
      },
    };
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
    this.dataList = [];
    this.currentPage = 1;
    this.getList();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom() {
    console.log('onReachBottom');
    if (this.currentPage * this.pageSize < this.total) {
      this.currentPage += 1;
      this.getList();
    } else {
      uni.showToast({
        title: '没有更多了！',
        icon: 'error',
      });
    }
  },
  onLoad(opt) {
    this.getList();
  },
  onShow() {
    this.globalStart = Date.now();
    this.checkMode();
    if (this.needRefresh) {
      this.dataList = [];
      this.currentPage = 1;
      this.getList();
      this.needRefresh = false;
    }
  },
  onHide() {
    this.buryPoint();
  },
  methods: {
    typeFormat(val) {
      if (val) {
        return this.typeMap[val.baseCheck.checkType];
      } else {
        return '';
      }
    },
    getList() {
      getMyBaseCheckList({
        selectByMyAndAll: 'my',
        checkType: '',
        page: this.currentPage,
        pageSize: this.pageSize,
        checkStatus: this.current,
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            if (shorter) {
              shorter.list.forEach((ele) => {
                ele.subArray = [];
                if (ele && ele.baseCheck) {
                  switch (ele.baseCheck.isRun) {
                    case 1:
                      ele.subStatus = '合格';
                      break;
                    case -1:
                      ele.subStatus = '待审核';
                      break;
                    case 99:
                      ele.subStatus = '不合格';
                      break;
                  }
                }
                switch (ele.baseCheck.checkType) {
                  default:
                    if (ele.baseCheckDetailList) {
                      ele.baseCheckDetailList.forEach((sub) => {
                        sub.content = sub.checkNameType;
                      });
                      ele.subArray = ele.baseCheckDetailList;
                    }
                    break;
                }
              });
              this.total = shorter.total;
              this.dataList = this.dataList.concat(shorter.list);
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
          uni.hideLoading();
        });
    },
    toDetail(item) {
      if (this.current) {
        uni.navigateTo({
          url: '/pages/mission/detail' + '?id=' + item.baseCheck.id,
        });
      } else {
        uni.navigateTo({
          url: '/pages/mission/new' + '?id=' + item.baseCheck.id,
        });
      }
    },
    buryPoint() {
      this.globalEnd = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'missionIndex',
          pageName: '任务列表',
          t2: this.globalEnd,
          t0: this.globalStart,
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
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        this.currentPage = 1;
        this.dataList = [];
        this.total = 0;
        this.getList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .segmented-control {
    height: 42px !important;
    box-sizing: border-box;
    border-bottom: 1rpx solid #eee;
  }
  .segmented-control__text {
    font-size: 17px;
  }
}
.emptyCon {
  display: flex;
  justify-content: center;
  padding-top: 200rpx;
  box-sizing: border-box;
  .emptyImg {
    width: 600rpx;
  }
  .emptyInner {
  }
  .emptyText {
    font-family: PingFang-SC-Medium;
    font-size: 28rpx;
    color: #c2c2c2;
    text-align: center;
    font-weight: 500;
    margin-top: -100rpx;
  }
}
.firstLine {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20rpx;
  .firstName {
    font-size: 32rpx;
    color: #333;
    line-height: 44rpx;
  }
  .firstRight {
  }
}
.rightStatus {
  color: #fff;
  width: 116rpx;
  height: 48rpx;
  line-height: 48rpx;
  text-align: center;
  font-size: 28rpx;
  border-radius: 4rpx;
}
.colorYellow {
  background-color: #ffb600;
}
.colorGreen {
  background-color: #00bc6e;
}
.colorRed {
  background-color: #e24c4c;
}
.secondLine {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.thirdLine {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.fourthLine {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.fifthLine {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.secondTitle {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #b0b0b0;
  font-weight: 500;
}
.secondContent {
  color: #333;
  font-size: 28rpx;
  line-height: 40rpx;
  width: 430rpx;
}
.innerContent {
  width: 320rpx;
}
.elli {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.itemTitleimage {
  position: absolute;
  top: 0;
  left: 0;
  width: 130rpx;
  height: 44rpx;
  background-image: linear-gradient(127deg, #007aff 0%, #00b2ff 100%);
  box-shadow: 0px 10px 20px 0px rgba(86, 128, 250, 0.25);
  border-bottom-right-radius: 16rpx;
  text-align: center;
  color: #fff;
  font-size: 24rpx;
  line-height: 44rpx;
}
.itemCon {
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 32rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 3rpx 8rpx 0 rgba(0, 0, 0, 0.05);
  border-radius: 16rpx;
  overflow: hidden;
  padding: 47rpx 32rpx 24rpx 32rpx;
}
.missionContainer {
  position: relative;
}
.switchCon {
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
}
.contentCon {
  margin-top: 42px;
  padding: 32rpx;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: scroll;
}
.alert {
  color: #e24c4c;
}
.normal {
  color: #1677ff;
}
.oldMissionContainer {
  .firstName {
    font-size: 37rpx !important;
  }
  .rightStatus {
    font-size: 34rpx !important;
  }
  .secondTitle {
    font-size: 34rpx !important;
  }
  .innerTitle {
    font-size: 30rpx !important;
  }
  .innerContent {
    font-size: 30rpx !important;
  }
  .secondContent {
    font-size: 32rpx !important;
  }
}
</style>
