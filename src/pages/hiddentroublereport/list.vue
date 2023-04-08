<template>
  <view class="hiddenTroubleBump" :class="[ISForOld ? 'oldhiddenTroubleBump' : '']">
    <view class="switchCon">
      <uni-search-bar
        @confirm="search"
        :focus="true"
        v-model="searchValue"
        @blur="blur"
        @focus="focus"
        placeholder="请输入搜索文物"
        @input="input"
        @cancel="cancel"
        @clear="clear"
        cancelButton="none"
      ></uni-search-bar>
      <view class="dropDownCon">
        <fui-dropdown-menu :size="28" selectedColor="#007aff" checkboxColor="#007aff" :options="option2s" @click="rangeItemClick" @close="rangeClose" ref="ddmRange">
          <view class="fui-filter__item" @tap="filterTap">
            <text class="ellipsis limitText">{{ range }}</text>
            <view class="fui-filter__icon" :class="{ 'fui-icon__ani': rangeShow }">
              <uni-icons type="bottom" size="15"></uni-icons>
            </view>
          </view>
        </fui-dropdown-menu>
        <fui-dropdown-menu :size="28" class="secondDrop" selectedColor="#007aff" checkboxColor="#007aff" :options="rankArray" @click="range2ItemClick" @close="range2Close" ref="ddm2Range">
          <view class="fui-filter__item" @tap="filter2Tap">
            <text class="ellipsis limitText">{{ ran2ge }}</text>
            <view class="fui-filter__icon" :class="{ 'fui-icon__ani': range2Show }">
              <uni-icons type="bottom" size="15"></uni-icons>
            </view>
          </view>
        </fui-dropdown-menu>
      </view>
    </view>
    <view class="contentCon">
      <view class="" v-if="dataList && dataList.length">
        <radio-group @change="(event) => radioChange(event)">
          <template v-for="(item, index) in dataList" :key="index">
            <label class="uni-list-cell uni-list-cell-pd cusLabel">
              <view class="radioCon">
                <view>
                  <view class="itemName">{{ item.publishName }}</view>
                  <view class="itemRank">级别：{{ rankFilter(item.rank) }}</view>
                  <view class="itemCategory">类型：{{ item.category }}</view>
                </view>
                <radio :value="item.id" :checked="index === selectCurrent" />
              </view>
            </label>
          </template>
        </radio-group>
      </view>
      <view class="emptyCon" v-else>
        <view class="emptyInner">
          <image :src="emptyImage" mode="widthFix" class="emptyImg" />
          <view class="emptyText">暂无文物</view>
        </view>
      </view>
    </view>
    <view class="fixBottom fixPaddingBottom">
      <view class="addBtn" @click="addAction">确定</view>
    </view>
  </view>
</template>
<script>
import { getWenbaodianList } from '@/api/api.js';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      selectCurrent: -1,
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
      option2s: [
        {
          text: '全部',
          value: '',
          checked: true,
        },
        {
          text: '古墓葬',
          value: '古墓葬',
        },
        {
          text: '古建筑',
          value: '古建筑',
        },
        {
          text: '古遗址',
          value: '古遗址',
        },
        {
          text: '碑刻',
          value: '碑刻',
        },
        {
          text: '近现代重要史迹及代表性建筑',
          value: '近现代重要史迹及代表性建筑',
        },
      ],
      range: '文物类型',
      ran2ge: '文物级别',
      rangeShow: false,
      currentPage: 1,
      pageSize: 10,
      searchValue: '',
      rankArray: [
        { text: '全部', value: '', checked: true },
        { text: '全国重点文物保护单位', value: '14da5819da904c4ab1d9d94a961ca27a' },
        {
          text: '省级文物保护单位',
          value: 'cef2a80fbea6df89578ad5599b67b71f',
        },
        {
          text: '市级文物保护单位',
          value: '2bf3be523de944ec3ee1ad832a7a2587',
        },
        {
          text: '市级文保点',
          value: 'b16db07f34112b9b0fc6d2b54214e0aa',
        },
        {
          text: '一般文物',
          value: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
        },
      ],
      beSelected: {},
      rank: '',
      category: '',
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
    radioChange(event) {
      let track = this.dataList.find((ele) => {
        return ele.id == event.detail.value;
      });
      console.log('track', track);
      if (track) {
        this.beSelected = track;
      }
    },
    rankFilter(val) {
      if (val) {
        let track = this.rankArray.find((ele) => {
          return ele.value == val;
        });
        if (track) {
          return track.text;
        }
      }
    },
    search(res) {
      //   uni.showToast({
      //     title: '搜索：' + res.value,
      //     icon: 'none',
      //   });

      this.searchValue = res.value;
      this.currentPage = 1;
      this.total = 0;
      this.dataList = [];
      this.fetchList();
    },
    input(res) {
      //   console.log('----input:', res);
    },
    clear(res) {
      this.searchValue = '';
      this.currentPage = 1;
      this.total = 0;
      this.dataList = [];
      this.fetchList();
      //   uni.showToast({
      //     title: 'clear事件，清除值为：' + res.value,
      //     icon: 'none',
      //   });
    },
    blur(res) {
      //   uni.showToast({
      //     title: 'blur事件，输入值为：' + res.value,
      //     icon: 'none',
      //   });
    },
    focus(e) {
      //   uni.showToast({
      //     title: 'focus事件，输出值为：' + e.value,
      //     icon: 'none',
      //   });
    },
    cancel(res) {
      //   uni.showToast({
      //     title: '点击取消，输入值为：' + res.value,
      //     icon: 'none',
      //   });
    },
    range2ItemClick(e) {
      this.ran2ge = e.text;
      if (e.text == '全部') {
        this.rank = '';
      } else {
        let track = this.rankArray.find((ele) => {
          return ele.text == e.text;
        });
        if (track) {
          this.rank = track.value;
        }
      }
      this.range2Close();
      this.currentPage = 1;
      this.total = 0;
      this.dataList = [];
      this.fetchList();
    },
    range2Close() {
      this.range2Show = false;
    },
    filter2Tap() {
      this.$refs.ddm2Range.show();
      this.range2Show = true;
    },
    filterTap() {
      this.$refs.ddmRange.show();
      this.rangeShow = true;
    },
    rangeItemClick(e) {
      this.range = e.text;
      this.category = e.text == '全部' ? '' : e.text;
      this.rangeClose();
      this.currentPage = 1;
      this.total = 0;
      this.dataList = [];
      this.fetchList();
    },
    rangeClose() {
      this.rangeShow = false;
    },
    format_name(val) {
      if (val != null && val.length > 0) {
        return '*' + val.substring(1);
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
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        publishName: this.searchValue,
        jd: '',
        rank: this.rank,
        category: this.category,
      };
      getWenbaodianList(params)
        .then((res) => {
          console.log('res', res);
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            if (shorter) {
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
      console.log(this.beSelected);
      if (this.beSelected.id) {
        uni.setStorageSync('hiddenSelectObject', this.beSelected);
        uni.navigateBack();
      } else {
        uni.showToast({
          title: '请选择文物单位',
          icon: 'none',
        });
      }
    },
    toDetail(item) {},
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
  },
};
</script>
<style lang="scss" scoped>
.fui-filter__item {
  width: 50vw;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  cursor: pointer;
  background-color: #fff;
}
.fui-filter__icon {
  transition: all 0.15s linear;
}
.fui-icon__ani {
  transform: rotate(180deg);
}
.hiddenTroubleBump {
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
.dropDownCon {
  display: flex;
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
.contentCon {
  margin-top: 100px;
  padding: 32rpx;
  padding-bottom: 140rpx;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: scroll;
  background-color: #f0f4fa;
}
.radioCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20rpx;
}
.itemName {
  font-size: 32rpx;
  margin-bottom: 17rpx;
  font-weight: 500;
}
.itemRank {
  font-size: 28rpx;
  color: #3186f6 !important;
  font-weight: 400;
}
.itemCategory {
  font-size: 28rpx;
  font-weight: 400;
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
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
.limitText {
  max-width: 250rpx;
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
.flexStart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
::v-deep {
  .fui-dropdown__menu-item {
    flex-direction: row-reverse !important;
  }
  .fui-ddm__mask {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .fui-ddm__down {
    width: 100vw !important;
  }
  .secondDrop {
    .fui-ddm__down {
      left: -50vw !important;
    }
  }
}
.cusLabel {
  margin-bottom: 30rpx;
  display: block;
}
.oldhiddenTroubleBump {
  .firstName {
    font-size: 38rpx !important;
  }
  .addBtn {
    font-size: 42rpx !important;
  }
}
</style>
