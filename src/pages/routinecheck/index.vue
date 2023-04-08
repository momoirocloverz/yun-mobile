<template>
  <view class="container" :class="[ISForOld ? 'oldcontainer' : '']">
    <view class="">
      <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" />
    </view>
    <view class="content">
      <view v-if="current == 0">
        <!-- <view class="zhibaio">
					<view class="left">
						本月完成指标：
						<view class="num">
							<text>10</text>个
						</view>
					</view>
					<view class="right">
						已完成： <view class="num">
							<text>0</text>个
						</view>
					</view>
				</view> -->
        <view class="list" v-if="list1.length > 0">
          <uni-card v-for="(item, index) in list1" @click="clickdjcdetail('djc', item)" :key="index">
            <view class="card1">
              <text class="title">检查名称：{{ item.checkName }}</text>
              <text class="link">
                <uni-icons type="right" size="22" class="icon" color="#8E8E93"></uni-icons>
              </text>
            </view>
            <view class="card2"> 检查文保单位：{{ item.pointName }} </view>
            <view class="card3">
              <view class=""> 限期时间:{{ item.deadLine.substring(0, 10) }} </view>
              <view class="">
                <uni-tag text="待检查" class="tags" />
              </view>
            </view>
          </uni-card>
        </view>
        <view class="" style="text-align: center; padding-top: 60px" v-else> 暂无任务 </view>
      </view>
      <view v-if="current == 1">
        <!-- <view class="zhibaio">
					<view class="left">
						本月完成指标：
						<view class="num">
							<text>10</text>个
						</view>
					</view>
					<view class="right">
						已完成： <view class="num">
							<text>0</text>个
						</view>
					</view>
				</view> -->
        <view class="list" v-if="list2.length > 0">
          <uni-card v-for="(item, index) in list2" @click="clickdjcdetail('ysb', item)" :key="index">
            <view class="card1">
              <text class="title">检查名称：{{ item.checkName }}</text>
              <text class="link">
                <uni-icons type="right" color="#8E8E93" size="22" class="icon"></uni-icons>
              </text>
            </view>
            <view class="card2"> 检查文保单位：{{ item.pointName }} </view>
            <view class="card3">
              <view class=""> 限期时间:{{ item.deadLine.substring(0, 10) }} </view>
              <view class="dian">
                <!-- <view class="dian1" v-if="item.state">
								</view> -->
                <uni-tag text="已上报" class="tags ysbtag" />
              </view>
            </view>
          </uni-card>
        </view>
        <view class="" style="text-align: center; padding-top: 60px" v-else> 暂无任务 </view>
      </view>
      <view v-if="current == 2">
        <!-- <view class="zhibaio">
					<view class="left">
						本月完成指标：
						<view class="num">
							<text>10</text>个
						</view>
					</view>
					<view class="right">
						已完成： <view class="num">
							<text>0</text>个
						</view>
					</view>
				</view> -->
        <view class="list" v-if="list3.length > 0">
          <uni-card v-for="(item, index) in list3" @click="clickdjcdetail('ygq', item)" :key="index">
            <view class="card1">
              <text class="title">检查名称：{{ item.checkName }}</text>
              <text class="link">
                <uni-icons type="right" color="#8E8E93" size="22" class="icon"></uni-icons>
              </text>
            </view>
            <view class="card2"> 检查文保单位：{{ item.pointName }} </view>
            <view class="card3">
              <view class=""> 限期时间:{{ item.deadLine.substring(0, 10) }} </view>
              <view class="">
                <uni-tag text="已过期" class="ygqtag tags" />
              </view>
            </view>
          </uni-card>
        </view>
        <view class="" style="text-align: center; padding-top: 60px" v-else> 暂无任务 </view>
      </view>
      <view v-if="current == 3">
        <!-- <view class="zhibaio">
					<view class="left">
						本月完成指标：
						<view class="num">
							<text>10</text>个
						</view>
					</view>
					<view class="right">
						已完成： <view class="num">
							<text>0</text>个
						</view>
					</view>
				</view> -->
        <view class="list" v-if="list4.length > 0">
          <uni-card v-for="(item, index) in list4" @click="clickdjcdetail(item.checkStatus, item)" :key="index">
            <view class="card1">
              <text class="title">检查名称：{{ item.checkName }}</text>
              <text class="link">
                <uni-icons type="right" size="22" color="#8E8E93" class="icon"></uni-icons>
              </text>
            </view>
            <view class="card2"> 检查文保单位：{{ item.pointName }} </view>
            <view class="card3">
              <view class=""> 限期时间:{{ item.deadLine.substring(0, 10) }} </view>
              <view class="">
                <uni-tag :text="item.checkStatus == '待检查' ? '待检查' : '已上报'" class="tags" :class="item.checkStatus == '待检查' ? '' : 'ysbtag'" />
              </view>
            </view>
          </uni-card>
        </view>
        <view class="" style="text-align: center; padding-top: 60px" v-else> 暂无任务 </view>
      </view>
    </view>
  </view>
</template>
<script>
import util from '@/utils/util.js';
import { routinechecklist, routineCheckAllList } from '@/api/api.js';
export default {
  data() {
    return {
      type: null,
      needRefresh: false,
      currentPage: 1,
      pageSize: 20,
      current: 0,
      items: ['待检查', '已上报', '已过期', '全部'],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      show: null,
      ISForOld: false,
      globalStart: null,
      globalEnd: null,
    };
  },
  created() {},
  mounted() {
    // console.log('mounted');
    this.routineCheckAllList();
    this.getRoutineCheckList();
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
  },
  onReachBottom() {
    // console.log('onReachBottom');
    // if (this.currentPage * this.pageSize < this.total) {
    //   this.currentPage += 1;
    //   console.log('we need more');
    //   // request list
    // } else {
    //   uni.showToast({
    //     title: '没有更多了！',
    //     icon: 'error',
    //   });
    // }
  },
  onLoad(opt) {
    if (opt.type) {
      this.type = opt.type;
      this.current = 3;
    }
  },
  onShow() {
    // console.log('onShow');
    this.globalStart = Date.now();
    this.checkMode();
    if (this.needRefresh) {
      this.getRoutineCheckList();
      this.routineCheckAllList();
    }
  },
  onHide() {
    this.buryPoint();
  },
  methods: {
    buryPoint() {
      this.globalEnd = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'dailycheck-index',
          pageName: '常规检查',
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
    async routineCheckAllList() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        businessKeyList: [],
        isDev: true,
      };
      const res = await routineCheckAllList(params);
      this.list4 = res.data.list;
    },
    async getRoutineCheckList() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        businessKeyList: [],
        isDev: true,
      };
      const res = await routinechecklist(params);
      this.list1 = res.data.list.filter((item) => {
        return item.checkStatus == '待检查';
      });
      this.list2 = res.data.list.filter((item) => {
        return item.checkStatus == '已通过';
      });
      this.list3 = res.data.list
        .filter((item) => {
          return item.checkStatus == '待检查';
        })
        .filter((ite) => {
          return ite.deadLine < util.getTime();
        });
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    clickdjcdetail(type, item) {
      if (type == '待检查') {
        uni.navigateTo({
          url: 'djcdetail?obj=' + JSON.stringify(item),
        });
      }
      if (type == '已通过') {
        uni.navigateTo({
          url: 'ysbdetail?obj=' + JSON.stringify(item),
        });
      }
      if (type == 'djc') {
        uni.navigateTo({
          url: 'djcdetail?obj=' + JSON.stringify(item),
        });
      }
      if (type == 'ysb') {
        uni.navigateTo({
          url: 'ysbdetail?obj=' + JSON.stringify(item),
        });
      }
      if (type == 'ygq') {
        uni.navigateTo({
          url: 'ygqdetail?obj=' + JSON.stringify(item),
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .uni-card {
  border: 0.5px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px !important;
  margin-top: 60rpx !important;
}
.zhibaio {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30rpx;
  .left,
  .right {
    width: 162px;
    height: 90px;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    text-align: center;
    padding-top: 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    color: #7c8698;
    .num {
      font-size: 34rpx;
      color: #203152;
      text {
        font-size: 48rpx;
        color: #203152;
      }
    }
  }
}
.list {
  .card1 {
    display: flex;
    justify-content: space-between;
    font-size: 36rpx;
    color: #203152;
  }
  .card2 {
    height: 60rpx;
    line-height: 60rpx;
    font-size: 30rpx;
    color: #203152;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20rpx;
  }
  .card3 {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #7c8698;
    // align-items: center;
    .tags {
      margin-left: 20rpx;
      background: #d9a572;
      border-radius: 30rpx;
      border: none;
    }
    .ysbtag {
      background: #17be6b !important;
    }
    .ygqtag {
      background: #cccccc;
    }
    .dian {
      display: flex;
      align-items: center;
      .dian1 {
        width: 5px;
        height: 5px;
        background-color: #000;
        border-radius: 50%;
      }
    }
  }
}
.oldcontainer {
  .list {
    .card1 {
      font-size: 48rpx;
    }
    .card2 {
      font-size: 42rpx;
    }
    .card3 {
      font-size: 36rpx;
      .tags {
        font-size: 42rpx !important;
      }
    }
  }
}
</style>
