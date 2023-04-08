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
            <!-- <view class="itemTitleimage">{{ typeFormat(item) }}</view> -->
            <view class="firstLine">
              <view class="firstName">
                {{ item.baseCheck && item.baseCheck.checkName }}
              </view>
              <view class="firstRight" v-if="item.baseCheck.jdIsRunState">
                <!-- 镇街审完，文物局也审了 -->
                <view class="rightStatus" v-if="current && pType === '镇街审核人员' && item.baseCheck.isRun != -1"
                  :class="[item.baseCheck.isRun == 99 ? 'colorRed' : 'colorYellow']">
                    {{ item.baseCheck && isRunMap[item.baseCheck.isRun] }}
                </view>
                <!-- 镇街审完，文物局还没审 -->
                <view class="rightStatus" v-if="current && pType === '镇街审核人员' && item.baseCheck.isRun == -1"
                  :class="[item.baseCheck.jdIsRunState == 99 ? 'colorYellow' : item.baseCheck.jdIsRunState == 1 ? 'colorRed' : 'colorGreen']">
                    {{ item.baseCheck && jdIsRunStateMap[item.baseCheck.jdIsRunState] }}
                </view>

                <view class="rightStatus" v-else-if="!current && pType === '区文物局'"
                  :class="[item.baseCheck.jdIsRunState == 99 ? 'colorYellow' : item.baseCheck.jdIsRunState == 1 ? 'colorRed' : 'colorGreen']">
                    {{ item.baseCheck && jdIsRunStateMap[item.baseCheck.jdIsRunState] }}
                </view>
                <view class="rightStatus" v-else-if="current && pType === '区文物局'"
                  :class="[item.baseCheck.isRun == 99 ? 'colorRed' : 'colorYellow']">
                    {{ item.baseCheck && isRunMap[item.baseCheck.isRun] }}
                </view>
              </view>
            </view>
            <view class="secondLine">
              <view class="secondTitle">检查单位：</view>
              <view class="secondContent">
                {{ item.publishName }}
              </view>
            </view>
            <view class="secondLine">
              <view class="secondTitle">检查人员：</view>
              <view class="secondContent">
                {{ format_name(item.userName) }}
              </view>
            </view>
            <view class="fifthLine" v-if="current">
              <view class="secondTitle">设备状态：</view>
              <view class="secondContent" :class="[item.ztArray[4] === '异常' ? 'alert' : 'normal']">{{ item.ztArray[4] }}</view>
            </view>
            <view class="fifthLine">
              <view class="secondTitle">本体状态：</view>
              <view class="secondContent" :class="[item.ztArray[0] === '异常' ? 'alert' : 'normal']">{{ item.ztArray[0] }}</view>
            </view>
            <view class="fifthLine">
              <view class="secondTitle">环境状态：</view>
              <view class="secondContent" :class="[item.ztArray[1] === '异常' ? 'alert' : 'normal']">{{ item.ztArray[1] }}</view>
            </view>
            <view class="fifthLine">
              <view class="secondTitle">火灾隐患：</view>
              <view class="secondContent" :class="[item.ztArray[2] === '有隐患' ? 'alert' : 'normal']">{{ item.ztArray[2] }}</view>
            </view>
            <view class="thirdLine">
              <view class="secondTitle">检查时间：</view>
              <view class="secondContent">{{ (item.baseCheck && item.baseCheck.bodyTime) || '-' }}</view>
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
        1: '专项检查',
        2: '专项整改',
        4: '设备报警',
        5: '安全检查',
        6: '信访案件',
        7: '上级督查',
        8: '问题上报',
        10: '一网统管',
        11: '设备上报',
        12: '自定义任务',
      },
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
      pType: '',
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
      checkStatusMap: {
        '0': '处理中',
        '1': '任务结束',
        '-1': '待处理'
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
    this.pType = uni.getStorageSync('role')
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
        return this.typeMap[val.baseCheck.checkType];
      } else {
        return '';
      }
    },
    getList() {
      let params = {}
      if(this.pType === '区文物局') {
        params = {
          isRun: this.current == 0 ? -1 : '',
          isRuns: this.current == 0 ? [] : ['1', '99', '4'],
          jdIsRuns: this.current == 0 ? ['1', '99', '4'] : [],
          checkStatus: '1'   // 0：处理中  1：任务结束      -1  待处理  如果是立即处理的数据要等处理完再审核
        }
      }else{
        params = {
          jdIsRun: this.current == 0 ? 0 : '',
          jdIsRuns: this.current == 0 ? [] : ['1', '99', '4']
        }
      }
      getMyBaseCheckList({
        selectByMyAndAll: 'all',
        checkType: '3',
        page: this.currentPage,
        pageSize: this.pageSize,
        ...params
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            if (shorter) {
              shorter.list.forEach((ele) => {
                ele.subArray = [];
                ele.ztArray = [];
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
                  let track1 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == '灭火器';
                  });
                  let track2 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == '消防栓';
                  });
                  let track3 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == '消防水缸';
                  });
                  if ((track1 && track1.dicDetailName != '正确') || (track2 && track2.dicDetailName != '正确') || (track3 && track3.dicDetailName != '正确')) {
                    ele.ztArray[4] = '异常';
                  } else {
                    ele.ztArray[4] = '正常';
                  }
                  let track4 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[0].name && sub.isCheck == 10;
                  });
                  let track5 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[1].name && sub.isCheck == 10;
                  });
                  let track6 = ele.baseCheckDetailList.find((sub) => {
                    return sub.checkNameType == this.matchList[2].name && sub.isCheck == 10;
                  });
                  if (track4 || track5 || track6) {
                    ele.ztArray[0] = '异常';
                  } else {
                    ele.ztArray[0] = '正常';
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
                    ele.ztArray[1] = '异常';
                  } else {
                    ele.ztArray[1] = '正常';
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
                    ele.ztArray[2] = '有隐患';
                  } else {
                    ele.ztArray[2] = '无隐患';
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
          url: `/pages/inspectionCheck/detail?id=${item.baseCheck.id}&type=已审核`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/inspectionCheck/detail?id=${item.baseCheck.id}&type=未审核`,
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

  .firstRight {}
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
}</style>
