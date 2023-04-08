<template>
  <view class="missionContainer" :class="[ISForOld ? 'oldMissionContainer' : '']">
    <view class="switchCon">
      <uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem"
        :activeColor="'#1677FF'" />
    </view>
    <view class="contentCon">
      <view class="" v-if="dataList && dataList.length">
        <template v-for="(item, index) in dataList" :key="index">
          <view class="itemCon" @click="toDetail(item)">
            <view class="firstLine">
              <view class="firstName">
                {{ item.baseCheck && item.baseCheck.checkName }}
              </view>
              <view class="firstRight">
                <uni-icons type="forward" size="24" color="#8E8E93"></uni-icons>
                <view class="rightStatus colorYellow" v-if="current">
                  {{ jdIsRunStateMap[item.baseCheck.jdIsRunState] }}</view>
              </view>
            </view>
            <view class="secondLine">
              <view class="secondTitle">文物单位：</view>
              <view class="secondContent">
                {{ item.baseCheck && item.baseCheck.organization }}
              </view>
            </view>
            <view class="thirdLine">
              <view class="secondTitle">上报人员：</view>
              <view class="secondContent">{{ format_name(item.userName) || '-' }}</view>
            </view>
            <view class="fourthLine">
              <view class="secondTitle">上报类型：</view>
              <view class="secondContent">{{ item.baseCheckDetailList[0].checkNameType || '-' }}</view>
            </view>
            <view class="fifthLine">
              <view class="secondTitle">上报事件：</view>
              <view v-for="(sub, subIndex) in item.subArray" class="secondContent">{{ sub.content }}</view>
            </view>
            <view class="fifthLine">
              <view class="secondTitle">上报时间：</view>
              <view class="secondContent">{{ (item.baseCheck &&
                item.baseCheck.checkCreateTime) || '-' }}</view>
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
      items: ['未审核', '已审核'],
      show: null,
      ISForOld: false,
      globalStart: null,
      globalEnd: null,
      dataList: [],
      typeMap: {
        '0': '处理中',
        '1': '任务结束',
        '-1': '待处理'
      },
      jdIsRunStateMap: {
        1: '有隐患',
        99: '非问题'
      }
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
    // this.buryPoint();
  },
  methods: {
    format_name(val) {
      const newVal = val ? JSON.parse(val) : ''
      let newArr = []
      if (newVal && newVal.length > 0) {
        newArr = newVal.map(item => {
          return item = '*' + item.substring(1); 
        })
        return newArr.join()
      } else {
        return '*';
      }
    },
    typeFormat(val) {
      if (val) {
        return this.typeMap[val];
      } else {
        return '';
      }
    },
    getList() {
      getMyBaseCheckList({
        selectByMyAndAll: 'all',
        checkType: '8',
        page: this.currentPage,
        pageSize: this.pageSize,
        jdIsRun: this.current == 0 ? 0 : '',
        jdIsRuns: this.current == 0 ? [] : ['1', '99']
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            if (shorter) {
              shorter.list.forEach((ele) => {
                ele.subArray = [];
                if (ele && ele.baseCheck) {
                  switch (ele.baseCheck.isRun) {
                    // 有隐患 非问题tab
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
                        sub.content = sub.dicDetailName;
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
          url: `/pages/troubleReportReview/check?id=${item.baseCheck.id}&type=已审核`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/troubleReportReview/check?id=${item.baseCheck.id}&type=未审核`,
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

  .emptyInner {}

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
  // justify-content: space-between;
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
    display: flex;
    justify-content: space-between;
    flex: 1;
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
  padding: 24rpx 32rpx;
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
  