<template>
  <view class="inspectionContainer" :class="[ISForOld ? 'oldinspectionContainer' : '']">
    <view class="switchCon">
      <view class="headTag">巡检记录</view>
    </view>
    <view class="contentCon">
      <view class="" v-if="dataList && dataList.length">
        <template v-for="(item, index) in dataList" :key="index">
          <view class="itemCon" @click="toDetail(item)">
            <view class="firstLine">
              <view class="firstName ellip">
                {{ item.baseCheck && item.baseCheck.checkName }}
              </view>
              <view class="firstRight">
                <!-- 文物局和镇街都没有审核呢 -->
                <view class="rightStatus colorYellow" v-if="item.baseCheck.isRun == -1 && item.baseCheck.jdIsRunState == 0"
                  >待审核</view>
                <!-- 镇街审了 文物局还没审 -->
                <view class="rightStatus colorYellow" v-else-if="item.baseCheck.isRun == -1 && item.baseCheck.jdIsRunState != 0"
                :class="[item.baseCheck.jdIsRunState == 99 ? 'colorYellow' : item.baseCheck.jdIsRunState == 1 ? 'colorRed' : 'colorGreen']"
                  >{{jdIsRunStateMap[item.baseCheck.jdIsRunState]}}</view>
                <!-- 文物局审了 -->
                <view class="rightStatus colorYellow" v-else-if="item.baseCheck.isRun != -1"
                :class="[item.baseCheck.isRun == 99 ? 'colorRed' : 'colorYellow']"
                  >{{isRunMap[item.baseCheck.isRun]}}</view>
              </view>
            </view>
            <view class="secondLine">
              <view class="secondTitle">被查单位：</view>
              <view class="secondContent">{{ item.publishName }}</view>
            </view>
            <view class="thirdLine">
              <view class="thirdLeft">
                <view class="secondTitle">填表人员：</view>
                <view class="secondContent">{{ format_name(item.userName) }}</view>
              </view>
              <view class="thirdRight">
                <view class="secondTitle">填表时间：</view>
                <view class="secondContent">{{ timeFormat(item.baseCheck && item.baseCheck.checkCreateTime) }}</view>
              </view>
            </view>
            <view class="fourthLine">
              <template v-for="(sub, subIndex) in item.subArray" :key="subIndex">
                <view class="innerCon flexStart" :class="[subIndex == 0 || subIndex == 2 ? '' : '']">
                  <view class="innerTitle">{{ sub.title }}</view>：
                  <view class="innerContent" :class="[sub.content == '异常' || sub.content == '有隐患' ? 'unUsual' : '']">
                    {{ sub.content }}</view>
                </view>
              </template>
            </view>
          </view>
        </template>
      </view>
      <view class="emptyCon" v-else>
        <view class="emptyInner">
          <image :src="emptyImage" mode="widthFix" class="emptyImg" />
          <view class="emptyText">暂无记录</view>
        </view>
      </view>
    </view>
    <view class="fixBottom fixPaddingBottom">
      <view class="addBtn" @click="addAction">巡检上报</view>
    </view>
  </view>
</template>
<script>
import { getMyBaseCheckListByCheckType } from '@/api/api.js';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      emptyImage: '/static/images/img3@2x.png',
      currentPage: 1,
      pageSize: 10,
      current: 0,
      total: 0,
      needRefresh: false,
      items: ['未处理', '已处理'],
      show: null,
      ISForOld: false,
      globalStart: null,
      globalEnd: null,
      dataList: [],
      matchList: [
        {
          name: '文物本体存在损坏、坍塌、灭失等情况。',
          type: '本体',
        },
        {
          name: '文物本体存在植物侵害、病虫害等情况。',
          type: '本体',
        },
        {
          name: '文物本体及周边存在建设、钻探、爆破等行为。',
          type: '本体',
        },
        {
          name: '生活、宗教用火未采取有效防护措施。',
          type: '环境',
        },
        {
          name: '在文物建筑内及周边堆存柴草、木料、纸箱、液化石油气钢瓶、烟花爆竹等可燃易燃易爆物品。',
          type: '环境',
        },
        {
          name: '未在明显位置张贴禁烟禁火等警示性标识。',
          type: '环境',
        },
        {
          name: '电线存在未穿管保护、私拉乱接等问题。',
          type: '火灾隐患',
        },
        {
          name: '电动自行车、电瓶车在文物建筑内违规停放、充电。',
          type: '火灾隐患',
        },
        {
          name: '消火栓无供水，灭火器压力不正常或者使用超期。',
          type: '火灾隐患',
        },
      ],
      // 129是本体  458是环境 367是火灾隐患


      jdIsRunStateMap: {
        4: '无需处置',
        1: '立即处置',
        99: '无法处置'
      },
      isRunMap:{
        1: '完结',
        99: '一网统管',
        2: '无需审核'
      },
    };
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
    this.currentPage = 1;
    this.total = 0;
    this.dataList = [];
    this.fetchList();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom() {
    console.log('onReachBottom');
    if (this.currentPage * this.pageSize < this.total) {
      this.currentPage += 1;
      this.fetchList();
    } else {
      uni.showToast({
        title: '没有更多了！',
        icon: 'error',
      });
    }
  },
  onLoad(opt) {
    this.fetchList();
  },
  onShow() {
    this.globalStart = Date.now();
    this.checkMode();
    if (this.needRefresh) {
      this.dataList = [];
      this.currentPage = 1;
      this.fetchList();
      this.needRefresh = false;
    }
  },
  onHide() {
    this.buryPoint();
  },
  methods: {
    format_name(val) {
      const newVal = val ? JSON.parse(val) : ''
      if (newVal && newVal.length > 0) {
        return '*' + newVal.join()?.substring(1)
      } else {
        return '*';
      }
    },
    timeFormat(val) {
      if (val) {
        return dayjs(val).format('YYYY-MM-DD');
      }
    },
    fetchList() {
      getMyBaseCheckListByCheckType({
        selectByMyAndAll: 'my',
        checkType: '3',
        page: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            console.log('res', shorter);
            if (shorter) {
              this.total = shorter.total;
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
                if (ele.baseCheckDetailList) {
                  //   let track1 = ele.baseCheckDetailList.find((sub) => {
                  //     return sub.checkNameType == '灭火器';
                  //   });
                  //   let track2 = ele.baseCheckDetailList.find((sub) => {
                  //     return sub.checkNameType == '消防栓';
                  //   });
                  //   let track3 = ele.baseCheckDetailList.find((sub) => {
                  //     return sub.checkNameType == '消防水缸';
                  //   });
                  //   if ((track1 && track1.dicDetailName != '正确') || (track2 && track2.dicDetailName != '正确') || (track3 && track3.dicDetailName != '正确')) {
                  //     ele.subArray[0] = { title: '设备状态', content: '异常' };
                  //   } else {
                  //     ele.subArray[0] = { title: '设备状态', content: '正常' };
                  //   }
                  let track4 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[0].name && sub.isCheck == 10;
                  });
                  let track5 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[1].name && sub.isCheck == 10;
                  });
                  let track6 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[2].name && sub.isCheck == 10;
                  });
                  //   if (track4 || track5 || track6) {
                  //     ele.subArray[1] = { title: '本体状态', content: '异常' };
                  //   } else {
                  //     ele.subArray[1] = { title: '本体状态', content: '正常' };
                  //   }

                  if (track4 || track5 || track6) {
                    ele.subArray[0] = { title: '本体状态', content: '异常' };
                  } else {
                    ele.subArray[0] = { title: '本体状态', content: '正常' };
                  }

                  let track7 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[3].name && sub.isCheck == 10;
                  });
                  let track8 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[4].name && sub.isCheck == 10;
                  });
                  let track9 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[5].name && sub.isCheck == 10;
                  });
                  if (track7 || track8 || track9) {
                    ele.subArray[1] = { title: '环境状态', content: '异常' };
                  } else {
                    ele.subArray[1] = { title: '环境状态', content: '正常' };
                  }
                  let track10 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[6].name && sub.isCheck == 10;
                  });
                  let track11 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[7].name && sub.isCheck == 10;
                  });
                  let track12 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[8].name && sub.isCheck == 10;
                  });
                  if (track10 || track11 || track12) {
                    ele.subArray[2] = { title: '火灾隐患', content: '有隐患' };
                  } else {
                    ele.subArray[2] = { title: '火灾隐患', content: '无隐患' };
                  }
                }
              });
              this.total = shorter.total;
              this.dataList = this.dataList.concat(shorter.list);
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    addAction() {
      uni.removeStorageSync('InspectionMapData');
      uni.removeStorageSync('addInspectionStoreData');
      uni.navigateTo({
        url: '/pages/inspection/new',
      });
    },
    toDetail(item) {
      uni.navigateTo({
        url: '/pages/inspection/detail' + '?id=' + item.baseCheck.id,
      });
    },
    buryPoint() {
      this.globalEnd = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'inspectionIndex',
          pageName: '巡检记录列表',
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
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inspectionContainer {
  position: relative;
  box-sizing: border-box;
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
.switchCon {
  position: fixed;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
}
.fixBottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #fff;
  height: 130rpx;
  box-sizing: border-box;
}
.addBtn {
  width: 670rpx;
  height: 90rpx;
  line-height: 90rpx;
  color: #fff;
  background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
  box-shadow: 0px 20px 30px 0px rgba(86, 128, 250, 0.25);
  border-radius: 55rpx;
  text-align: center;
  font-family: PingFang-SC-Bold;
  font-size: 36rpx;
  font-weight: 700;
}
.headTag {
  height: 84rpx;
  border: 1rpx solid rgba(238, 238, 238, 1);
  box-sizing: border-box;
  padding-left: 68rpx;
  padding-top: 16rpx;
  font-family: SourceHanSansCN-Medium;
  font-size: 34rpx;
  color: #333;
  font-weight: 500;
}
.contentCon {
  margin-top: 42px;
  padding: 32rpx;
  padding-bottom: 140rpx;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: scroll;
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
  padding: 30rpx 32rpx 35rpx 32rpx;
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
    width: 440rpx;
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
  margin-bottom: 4rpx;
}
.ellip {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.thirdLine {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thirdLeft {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.thirdRight {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.fourthLine {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 25rpx;
}
.innerCon {
  width: 50%;
  &:first-child {
    margin-bottom: 4rpx;
  }
  &:nth-child(2) {
    margin-bottom: 4rpx;
  }
}
.padLeftInner {
  box-sizing: border-box;
  padding-left: 30rpx;
}
.innerTitle {
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #8c8c8c;
  letter-spacing: 0;
  font-weight: 500;
}
.innerContent {
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #00bc6e;
  letter-spacing: 0;
  font-weight: 500;
}
.unUsual {
  color: #e24c4c;
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
}
.flexStart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
::v-deep {
}
.oldinspectionContainer {
  .headTag {
    font-size: 40rpx !important;
  }
  .firstName {
    font-size: 38rpx !important;
  }
  .rightStatus {
    font-size: 34rpx !important;
  }
  .secondContent {
    font-size: 30rpx !important;
  }
  .secondContent {
    width: 50% !important;
  }
  .secondTitle {
    font-size: 30rpx !important;
  }
  .innerTitle {
    font-size: 32rpx !important;
  }
  .innerContent {
    font-size: 32rpx !important;
  }
  .addBtn {
    font-size: 42rpx !important;
  }
}
</style>
