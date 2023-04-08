<!-- 宣传列表页 -->
<template>
  <view :style="{ '--baseFontTitle': baseFontTitle, '--baseFontContent': baseFontContent, '--baseFontTime': baseFontTime }" class="container" :class="show == 'block' ? 'showblock' : 'shownone'">
    <view class="publicityList oldcontainer" v-for="(item, index) in publicityList" @click="clickDetail(item.id)">
      <view class="xia">
        <view class="left">
          <view class="biaoti">
            {{ item.title }}
          </view>
          <view class="content">
            {{ item.content }}
          </view>
          <view class="time">
            {{ item.createTime.substring(0, 10) }}
          </view>
        </view>
        <view class="right">
          <image :src="'http://223.65.209.139:18180/admin/cmd/v1/storage/view/' + item.stfjlj" mode="aspectFill"></image>
        </view>
      </view>
    </view>
  </view>
  <view class="container oldcontainer" :class="show != 'block' ? 'showblock' : 'shownone'">
    <view class="publicityList" v-for="(item, index) in publicityList" @click="clickDetail(item.id)">
      <view class="xia">
        <view class="left">
          <view class="biaoti"> {{ item.title }} 2132121321 </view>
          <view class="content">
            {{ item.content }}
          </view>
          <view class="time">
            {{ item.createTime.substring(0, 10) }}
          </view>
        </view>
        <view class="right">
          <image :src="'http://223.65.209.139:18180/admin/cmd/v1/storage/view/' + item.stfjlj" mode="aspectFill"></image>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getNews } from '@/api/api.js';
export default {
  data() {
    return {
      //字体本地存储
      baseFontTitle: '',
      baseFontContent: '',
      baseFontTime: '',
      pageSize: 10,
      currentPage: 1,
      publicityList: [],
      show: null,
      browseTime: 0, // 增长时长
      clearTimeSet: null, //定时器
      t0: 0,
      t2: 0,
    };
  },
  created() {
    this.setTime();
  },
  mounted() {
    this.t0 = (Date.now() - this.browseTime) / 1000.0;
    this.getNews();
    this.t2 = (Date.now() - this.browseTime) / 1000.0;
    var that = this;
    clearInterval(that.clearTimeSet); // 离开页面后清除定时器
    zwlog.onReady(function () {
      //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
      zwlog.sendPV({
        miniAppId: '2002282040',
        miniAppName: '永兴护保',
        pageId: 'notice-list',
        pageName: '文保宣传列表',
        t2: that.t2,
        t0: that.t0,
        log_status: '02',
      });
    });
    //埋点04
  },
  onLoad() {
    //字体本地存储
    this.baseFontTitle = uni.getStorageSync('baseFontTitle');
    this.baseFontContent = uni.getStorageSync('baseFontContent');
    this.baseFontTime = uni.getStorageSync('baseFontTime');
    if (uni.getStorageSync('version') == 'new') {
      this.show = 'block';
    } else if (uni.getStorageSync('version') == 'old') {
      this.show = 'none';
    }
  },
  onShow() {},
  methods: {
    setTime() {
      this.browseTime = Date.now();
    },
    async getNews() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      const res = await getNews(params);
      this.publicityList = res.data.list;
    },
    clickDetail(id) {
      uni.navigateTo({
        url: './detail?id=' + id,
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

.oldcontainer {
  .xia {
    .left {
      .biaoti {
        font-size: var(--baseFontTitle);
        // font-size: $base-font-title;
      }
      .content {
        font-size: var(--baseFontContent);
        // font-size: $base-font-content;
      }
      .time {
        font-size: var(--baseFontTime);
        // font-size: $base-font-time;
      }
    }
  }
}

.container {
  padding: 40rpx !important;
}
.xia {
  display: flex;
  margin-bottom: 40rpx;
  padding-bottom: 30rpx;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .left {
    width: 70%;
    color: #000;
    box-sizing: border-box;
    padding-right: 20rpx;
    .biaoti {
      font-size: 36rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-bottom: 20rpx;
    }
    .content {
      font-size: 28rpx;
      overflow: hidden;
      margin-bottom: 6rpx;
      text-align: justify;
      /*文字超出用省略号*/

      text-overflow: ellipsis;

      /*盒子模型*/

      display: -webkit-box;

      /*显示的文本行数,3行*/

      -webkit-line-clamp: 2;

      /*子元素的垂直排列方式*/

      -webkit-box-orient: vertical;
    }
    .time {
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .right {
    flex: 1;
    image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx;
    }
  }
}
</style>
