<!-- 文保详情 -->
<template>
  <view :style="{'--baseFontTitle':baseFontTitle,
	'--baseFontContent':baseFontContent,
	'--baseFontTime':baseFontTime}" class="container" :class="show=='block' ? 'showblock' : 'shownone'">
    <view class="biaoti">
      {{detailInfo.title}}
    </view>
    <view class="pub">
      <text>发布：文物局</text>
      <text>发布时间：{{detailInfo.createTime}}</text>
    </view>
    <view class="img" style="text-align: center;">
      <image :src="'http://223.65.209.139:18180/admin/cmd/v1/storage/view/'+detailInfo.stfjlj"></image>
    </view>

    <view class="jins">
      {{detailInfo.content}}
    </view>
  </view>
  <view class="container oldcontainer" :class="show!='block' ? 'showblock' : 'shownone'">
    <view class="biaoti">
      {{detailInfo.title}}
    </view>
    <view class="pub">
      <text>发布：文物局</text>
      <text>发布时间：{{detailInfo.createTime}}</text>
    </view>
    <view class="img" style="text-align: center;">
      <image :src="'http://223.65.209.139:18180/admin/cmd/v1/storage/view/'+detailInfo.stfjlj"></image>
    </view>

    <view class="jins">
      {{detailInfo.content}}
    </view>
  </view>

</template>

<script>
import { newsInfo } from "@/api/api.js";
export default {
  data() {
    return {
      //字体本地存储
      baseFontTitle: "",
      baseFontContent: "",
      baseFontTime: "",

      roleName: null,
      detailInfo: {},
      show: null,

      //埋点01 相关数据
      browseTime: 0, // 增长时长
      clearTimeSet: null, //定时器
      t0: 0,
      t2: 0,
      //埋点01结束 相关数据
    };
  },
  //埋点02  埋点相关代码开始
  created(){
    this.setTime();
   
  },
  //埋点02
 
  onLoad(opt) {
    this.getNewsInfo(opt.id);
    if (uni.getStorageSync("version") == "new") {
      this.show = "block";
    } else if (uni.getStorageSync("version") == "old") {
      this.show = "none";
    }

    //埋点04

    console.log("browseTime",this.browseTime);
    this.t2=(Date.now()-this.browseTime)/1000.0;
    var that=this;
    console.log("t0",that.t0);
    console.log("t2",that.t2);
    clearInterval(that.clearTimeSet); // 离开页面后清除定时器
    zwlog.onReady(function () {
      //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
      zwlog.sendPV({
        miniAppId: "2002282040",
        miniAppName:"永兴护保",
        pageId:"notice-detail",
        pageName:"文保点列表",
        t2: that.t2,
        t0: that.t0,
        log_status: "02",
      });
    });
    //埋点04
  },
  mounted() {

 //埋点03
 this.t0=(Date.now() - this.browseTime)/1000.0;
    //埋点03

    //字体本地存储
    this.baseFontTitle = uni.getStorageSync("baseFontTitle");
    this.baseFontContent = uni.getStorageSync("baseFontContent");
    this.baseFontTime = uni.getStorageSync("baseFontTime");

   
  },

  methods: {
    //埋点05
    setTime() {
      //设置定时器
      this.browseTime=Date.now()
      // this.clearTimeSet = setInterval(() => {
      //   this.browseTime++;
      //   //console.log(this.browseTime/10.0, "时长累计");
      // }, 100);
    },
    //埋点05
    async getNewsInfo(id) {
      let params = {
        id: id,
      };
      const res = await newsInfo(params);

      this.detailInfo = res.data;
      this.detailInfo.createTime = this.detailInfo.createTime.substring(0, 10);
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
.container {
  .biaoti {
    font-size: var(--baseFontTitle);
    // font-weight: bold;
    text-align: left;
  }

  .pub {
    font-size: var(--baseFontTime);
    display: flex;
    justify-content: space-between;
    margin: 20rpx 0rpx;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 40rpx;
  }
  .jins {
    font-size: var(--baseFontContent);
    color: #000000;
    text-align: justify;
    line-height: 1.5;
  }
  .img {
    margin: 30rpx 0rpx;
    image {
      width: 100%;
      height: 320rpx;
      border-radius: 16rpx;
    }
  }
}

.oldcontainer {
  .biaoti {
    font-size: 56rpx;
    text-align: left;
    line-height: 1.3;
  }

  .pub {
    display: flex;
    justify-content: space-between;
    margin: 20rpx 0rpx;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 40rpx;
    font-size: 36rpx;
  }
  .jins {
    font-size: 42rpx;
    color: #000000;
    text-align: justify;
    line-height: 1.5;
  }
  .img {
    margin: 30rpx 0rpx;
    image {
      width: 100%;
      height: 320rpx;
      border-radius: 16rpx;
    }
  }
}
</style>
