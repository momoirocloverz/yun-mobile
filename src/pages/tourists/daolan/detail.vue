<!-- 文保详情 -->
<template>
  <view class="container" :class="show == 'block' ? '' : 'oldcontainer'">
    <view class="content">
      <view class="tit"> 文物基本情况 </view>
      <view class="jiben">
        <view class="" style="text-align: center">
          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/76bda0d1-3ed0-49f1-9606-be107600cbc3.jpg" mode="aspectFill" v-if="detailInfo.publishName == '茅湾里窑址'">
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/0139e06d-0064-4141-8522-3d28c993c8ef.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '朱凤标故居'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/8d88a7a8-7ed6-4fdd-99cd-26f947020518.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '城隍山窑址'"
          >
          </image>

          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1e5b7bdc-1b87-4648-bb81-ba9ee5ed9b90.jpg" mode="aspectFill" v-else-if="detailInfo.publishName == '二桥书屋'">
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/c38d5930-c229-4ebc-8531-fa5069687f0c.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '葛云飞故居'"
          >
          </image>

          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/9b7e2370-f39e-4a4b-b48a-45dd33d66c96.jpg" mode="aspectFill" v-else-if="detailInfo.publishName == '华家祠堂'">
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/6555da92-c5fe-472c-b4af-5d21f115bff9.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '欢潭老洋房'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a85f351e-24bd-4acd-b7ad-d96158241e7e.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '清葛壮节公故里表'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ba0c132a-ca07-4c7d-ab14-445df838f441.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '裘家坞裘氏宗祠'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a92cfee0-eeb7-4760-bb1e-fcafd2cec1b0.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '纱帽山窑遗址'"
          >
          </image>

          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/40a60581-018c-44f1-9c57-70f5d019dae3.jpg" mode="aspectFill" v-else-if="detailInfo.publishName == '汤氏宗祠'">
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/f9f52bc2-006a-4031-ba43-10ed4af79480.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '汤寿潜故居'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/25c3afdc-f821-4951-abf1-9c9be164bce4.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '汤寿潜纪念碑'"
          >
          </image>

          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69c169ae-0ae0-40ef-b881-7c8453ddae6a.jpg" mode="aspectFill" v-else-if="detailInfo.publishName == '务本堂'">
          </image>

          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ca6d61d1-5e8e-40f7-a322-9043b37fdd33.jpg" mode="aspectFill" v-else-if="detailInfo.publishName == '萧绍海塘'">
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69bd5d99-333b-4a38-bbe8-77874e6e8daa.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '佳山坞62号民居'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1616087c-a723-4f2b-b204-5757e0d6f412.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '田村缪家祠堂'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a5d1fb53-6b5c-4971-95f9-ff619a8fe6d0.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '毋岭252～258号民居'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1583b9b8-da7a-48ca-9666-d85580c6366c.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '沈佩兰故居'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a23c710e-02c1-45f3-bd57-395733fa4cb8.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '山阴古道（萧山段）'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/c247aebf-5d73-4ec1-a95e-934dac319062.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '凤坞315号民居'"
          >
          </image>
          <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/914dfd20-cb28-4e73-8b17-dd3523f46b19.jpg" mode="aspectFill" v-else-if="detailInfo.publishName == '葛云飞墓'">
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/5d107e04-e281-46e1-9176-e2a70bb843fb.jpg"
            mode="aspectFill"
            v-else-if="detailInfo.publishName == '许家南大房'"
          >
          </image>

          <image src="/static/wbimg/zdyh.png" mode="aspectFill" v-else-if="detailInfo.publishName == '浙东运河'"> </image>
          <image src="/static/wbimg/base.png" mode="aspectFill" v-else></image>
        </view>
        <view class="jies"> <text class="tex">文物名称:</text>{{ format_text(detailInfo.publishName) }} </view>
        <view class="jies"> <text class="tex">文物分类:</text>{{ format_text(detailInfo.category) }} </view>
        <view class="jies">
          <text class="tex">文物级别:</text>{{ format_rank(detailInfo.rank) }}
        </view>
        <view class="jies" v-if="detailInfo.specificDistribution != null && detailInfo.specificDistribution.length > 0">
          <text class="tex">分布情况:</text>{{ format_text(detailInfo.specificDistribution) }}
        </view>
        <view class="jies"> <text class="tex">文物地址:</text>{{ format_text(detailInfo.address) }} </view>
        <view class="protectionArea" v-if="detailInfo.protectionArea != null && detailInfo.protectionArea.length > 0">
          <view class="area"> 保护范围面积: </view>
          <view class="jieshao">{{ format_text(detailInfo.protectionArea) }}</view>
        </view>
        <view class="protectionArea protectionArea1" v-if="detailInfo.introduce != null && detailInfo.introduce.length > 0">
          <view class="area"> 文物介绍: </view>
          <view class="jieshao">{{ format_text(detailInfo.introduce ? detailInfo.introduce : '暂无') }}</view>
        </view>
      </view>
    </view>
    <view class="dengji">
      <view class="tit"> 风险防护等级 </view>
      <view class="lis">
        <view class="">
          <view class="">
            <image src="/static/icon/disk-icon1.png" mode=""></image>
          </view>
          <view class="listit"> 火灾隐患 </view>
          <view class="lisi">
            <text v-if="detailInfo.fireMaxLevel == '低风险'" class="dicolor">{{ detailInfo.fireMaxLevel }}</text>
            <text v-if="detailInfo.fireMaxLevel == '中风险'" class="zhcolor">{{ detailInfo.fireMaxLevel }}</text>
            <text v-if="detailInfo.fireMaxLevel == '高风险'" class="gcolor">{{ detailInfo.fireMaxLevel }}</text>
          </view>
        </view>
        <view class="">
          <view class="">
            <image src="/static/icon/disk-icon2.png" mode=""></image>
          </view>
          <view class="listit"> 自然灾害 </view>
          <view class="lisi">
            <text v-if="detailInfo.actMaxLevel == '低风险'" class="dicolor">{{ detailInfo.actMaxLevel }}</text>
            <text v-if="detailInfo.actMaxLevel == '中风险'" class="zhcolor">{{ detailInfo.actMaxLevel }}</text>
            <text v-if="detailInfo.actMaxLevel == '高风险'" class="gcolor">{{ detailInfo.actMaxLevel }}</text>
          </view>
        </view>
        <view class="">
          <view class="">
            <image src="/static/icon/disk-icon3.png" mode=""></image>
          </view>
          <view class="listit"> 法人违法 </view>
          <view class="lisi">
            <text v-if="detailInfo.legalMaxLevel == '低风险'" class="dicolor">{{ detailInfo.legalMaxLevel }}</text>
            <text v-if="detailInfo.legalMaxLevel == '中风险'" class="zhcolor">{{ detailInfo.legalMaxLevel }}</text>
            <text v-if="detailInfo.legalMaxLevel == '高风险'" class="gcolor">{{ detailInfo.legalMaxLevel }}</text>
          </view>
        </view>
        <view class="">
          <view class="">
            <image src="/static/icon/disk-icon4.png" mode=""></image>
          </view>
          <view class="listit"> 盗挖盗掘 </view>
          <view class="lisi">
            <text v-if="detailInfo.poachingMaxLevel == '低风险'" class="dicolor">{{ detailInfo.poachingMaxLevel }}</text>
            <text v-if="detailInfo.poachingMaxLevel == '中风险'" class="zhcolor">{{ detailInfo.poachingMaxLevel }}</text>
            <text v-if="detailInfo.poachingMaxLevel == '高风险'" class="gcolor">{{ detailInfo.poachingMaxLevel }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="" v-if="role">
      <view class="tit"> 设备设施信息 </view>
      <view class="sbitem">
        <view class="ntit"> 智能感知 </view>
        <view class="waisbss">
          <view class="nei" v-for="item in sbssInfo.zngz">
            <view class="">
              <image src="/static/index/sbss/sp.png" mode="aspectFill" v-if="item.name == '视频监控'"> </image>
              <image src="/static/index/sbss/gy.png" mode="aspectFill" v-if="item.name == '感烟监测'"> </image>
              <image src="/static/index/sbss/sy.png" mode="aspectFill" v-if="item.name == '水压监测'"> </image>
              <image src="/static/index/sbss/qw.png" mode="aspectFill" v-if="item.name == '气象监测'"> </image>
              <image src="/static/index/sbss/dl.png" mode="aspectFill" v-if="item.name == '电流监测'"> </image>
              <image src="/static/index/sbss/gw.png" mode="aspectFill" v-if="item.name == '感温监测'"> </image>
              <view class="">
                {{ item.name }}
              </view>
              <view class="">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="sbitem">
        <view class="ntit"> 消防设施 </view>
        <view class="waisbss">
          <view class="nei" v-for="item in sbssInfo.xfss">
            <view class="">
              <image src="/static/index/sbss/mhq.png" mode="aspectFill" v-if="item.name == '灭火器'"></image>
              <image src="/static/index/sbss/men.png" mode="aspectFill" v-if="item.name == '消防门'"></image>
              <image src="/static/index/sbss/sfsg.png" mode="aspectFill" v-if="item.name == '消防水缸'"> </image>
              <image src="/static/index/sbss/xf.png" mode="aspectFill" v-if="item.name == '消防栓'"></image>
              <view class="">
                {{ item.name }}
              </view>
              <view class="">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="sbitem">
        <view class="ntit"> 火灾危险源 </view>
        <view class="waisbss">
          <view class="nei" v-for="item in sbssInfo.hzwxy">
            <view class="">
              <image src="/static/index/sbss/dq.png" mode="aspectFill" v-if="item.name == '大家用电器'"> </image>
              <image src="/static/index/sbss/mqg.png" mode="aspectFill" v-if="item.name == '燃气罐'"></image>
              <image src="/static/index/sbss/pdx.png" mode="aspectFill" v-if="item.name == '配电箱'"></image>
              <image src="/static/index/sbss/fl.png" mode="aspectFill" v-if="item.name == '防雷装置'"></image>
              <view class="">
                {{ item.name }}
              </view>
              <view class="">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getwbdDetail } from '@/api/api.js';
export default {
  data() {
    return {
      ranklist: [
        {
          text: '国保单位',
          value: '14da5819da904c4ab1d9d94a961ca27a',
        },
        {
          text: '省保单位',
          value: 'cef2a80fbea6df89578ad5599b67b71f',
        },
        {
          text: '市保单位',
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
      role: null,
      id: null,
      detailInfo: {},
      sbssInfo: {},
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
  created() {
    this.setTime();
  },
  //埋点02
  onLoad(opt) {
    if (uni.getStorageSync('version') == 'new') {
      this.show = 'block';
    } else if (uni.getStorageSync('version') == 'old') {
      this.show = 'none';
    }
    this.role = uni.getStorageSync('role');
    this.detailInfo = JSON.parse(opt.item);
    console.log('detailInfo', this.detailInfo);
    this.getwbdDetail(this.detailInfo.id);
    // this.isScrollTop = opt.scrollTop
    if (opt.scrollTop > 0) {
      uni.pageScrollTo({
        duration: 100,
        scrollTop: 0,
      });
    }
    //埋点04
    this.t2 = (Date.now() - this.browseTime) / 1000.0;
    var that = this;
    clearInterval(that.clearTimeSet); // 离开页面后清除定时器
    zwlog.onReady(function () {
      //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
      zwlog.sendPV({
        miniAppId: '2002282040',
        miniAppName: '永兴护保',
        pageId: 'guid-detail',
        pageName: '文物导览详情',
        t2: that.t2,
        t0: that.t0,
        log_status: '02',
      });
    });
    //埋点04
  },
  mounted() {
    //埋点03
    this.t0 = (Date.now() - this.browseTime) / 1000.0;
    //埋点03
  },
  methods: {
    //埋点05
    setTime() {
      //设置定时器
      this.browseTime = Date.now();
    },
    //埋点05
    format_text(val) {
      if (val == null || val == '') return '暂无数据';
      else return val;
    },
    format_rank(val) {
      let track = this.ranklist.find((ele) => {
        return ele.value == val;
      });
      console.log( 'track',track )
      if (track) {
        return track.text;
      }
    },
    async getwbdDetail(id) {
      let params = {
        id: id,
      };
      const res = await getwbdDetail(params);
      this.sbssInfo = res.data;
    },
    leftClick() {
      uni.navigateBack({
        delta: 1,
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
.tit {
  font-size: 40rpx;
  color: #203152;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.jiben {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  image {
    box-sizing: border-box;
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
    width: 100%;
    height: 260rpx;
  }
  .jies {
    // background-color: #ddd;
    margin-bottom: 5px;
    line-height: 60rpx;
    border-bottom: 1rpx solid #d6d6d6;
    // text-indent: 40rpx;
    overflow: auto;
    font-size: 32rpx;
    color: #7c8698;
    width: 90%;
    margin: 0 auto;
    .tex {
      margin-right: 15rpx;
      display: inline-block;
      font-size: 32rpx;
      color: #203152;
    }
  }
  .protectionArea {
    border-bottom: 1rpx solid #d6d6d6;
    padding-top: 20rpx;
    font-size: 34rpx;
    color: #7c8698;
    width: 90%;
    margin: 0 auto;
    padding-bottom: 15rpx;
    .area {
      margin-bottom: 10px;
      font-size: 34rpx;
      color: #203152;
    }
  }
  .protectionArea1 {
    border: none;
    padding-bottom: 30rpx;
  }
}
.dengji {
  margin-top: 30rpx;
  .lis {
    margin: 40rpx auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 30rpx;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    .listit {
      font-size: 34rpx;
      color: #000000;
    }
    .lisi {
      font-size: 30rpx;
      .dicolor {
        color: #38d5ad;
      }
      .zhcolor {
        color: #e8bb35;
      }
      .gcolor {
        color: #f85e4e;
      }
    }
    image {
      width: 88rpx;
      height: 88rpx;
    }
  }
}
.sbitem {
  border: 1rpx solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 20rpx;
  padding: 25rpx;
  margin-bottom: 30rpx;
  .ntit {
    font-size: 34rpx;
  }
}
.waisbss {
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  // justify-content: space-around;
  .nei {
    width: 25%;
    font-size: 30rpx;
    align-items: center;
    text-align: center;
    margin-top: 20rpx;
    image {
      width: 88rpx;
      height: 88rpx;
    }
  }
}
.oldcontainer {
  .content {
    .tit {
      font-size: 68rpx;
      padding: 20rpx 0;
    }
    .jies {
      // background-color: #ddd;
      margin-bottom: 5px;

      line-height: 60rpx;
      border-bottom: 1rpx solid #d6d6d6;
      // text-indent: 40rpx;

      overflow: auto;
      text-overflow: ellipsis;
      font-size: 42rpx;
      color: #7c8698;
      width: 90%;
      margin: 0 auto;

      .tex {
        font-size: 42rpx;
      }
    }
    .protectionArea {
      font-size: 42rpx;
      .area {
        font-size: 42rpx;
      }
    }

    .protectionArea1 {
      border: none;
      padding-bottom: 30rpx;
    }
  }
  .dengji {
    margin-top: 30rpx;
    .tit {
      font-size: 68rpx;
      padding: 20rpx 0;
    }
    .lis {
      margin: 40rpx auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: center;
      border: 1px solid #ccc;
      box-sizing: border-box;
      padding: 30rpx;
      background: #ffffff;
      border: 0.5px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;

      .listit {
        font-size: 60rpx;
        font-weight: 500;
        color: #000000;
        // margin-top: 15rpx;
        margin-bottom: 30rpx;
      }

      .lisi {
        margin-bottom: 40rpx;
        font-size: 60rpx;
        font-weight: 400;
        .dicolor {
          color: #38d5ad;
        }

        .zhcolor {
          color: #e8bb35;
        }

        .gcolor {
          color: #f85e4e;
        }
      }

      image {
        width: 160rpx;
        height: 160rpx;
      }
    }
  }
  .shebei {
    .tit {
      font-size: 68rpx;
      padding: 20rpx 0;
    }
    .sbitem {
      border: 1rpx solid rgba(0, 0, 0, 0.05);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 20rpx;
      padding: 25rpx;
      margin-bottom: 30rpx;
      .ntit {
        font-size: 64rpx;
        margin-bottom: 30rpx;
      }
    }

    .waisbss {
      display: flex;
      flex-wrap: wrap;
      .nei {
        width: 50%;
        font-size: 60rpx;
        align-items: center;
        text-align: center;
        margin-top: 20rpx;
        view {
          view:nth-child(2) {
            margin-bottom: 20rpx;
            margin-top: 20rpx;
          }
          view:nth-child(3) {
            margin-bottom: 40rpx;
          }
        }
        image {
          width: 160rpx;
          height: 160rpx;
        }
      }
    }
  }
}
</style>
