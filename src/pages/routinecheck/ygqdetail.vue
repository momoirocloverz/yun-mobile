<!-- 例行检查已过期详情 -->
<template>
  <view class="container" :class="show=='block' ? 'showblock' : 'shownone'">
    <view class="tit">
      已过期
    </view>
    <view class="">
      <view class="li">
        <text>检查名称：</text>{{info.checkName}}
      </view>
      <view class="li">
        <text>文保单位：</text>{{info.pointName}}
      </view>
      <view class="li">
        <text>限期时间：</text>{{info.deadLine}}
      </view>
      <view class="li">
        <text>发布时间：</text>{{info.createTime}}
      </view>
      <view class="li">
        <text>发布人：</text>{{format_name(info.jcry)}}
      </view>
      <view class="li lilast">
        <text>检查事项：</text>
      </view>
      <view class="li gong">
        <view class="num">
          共<text>{{list.length}}</text>项
        </view>
        <view class="">
          已上报<text>0</text>
        </view>
      </view>
      <uni-card class="card" v-for="(item,index) in list">
        <view class="num">
          0{{index+1}}
        </view>
        <view class="text">
          <view class="t1">
            检查类别：{{item.dicDetailName}}
          </view>
          <view class="">
            具体检查事项：{{item.guide}}
          </view>
        </view>

      </uni-card>

    </view>
  </view>
  <view class="container oldcontainer" :class="show!='block' ? 'showblock' : 'shownone'">
    <view class="tit">
      已过期
    </view>
    <view class="">
      <view class="li">
        <text>检查名称：</text>{{info.checkName}}
      </view>
      <view class="li">
        <text>文保单位：</text>{{info.pointName}}
      </view>
      <view class="li">
        <text>限期时间：</text>{{info.deadLine}}
      </view>
      <view class="li">
        <text>发布时间：</text>{{info.createTime}}
      </view>
      <view class="li">
        <text>发布人：</text>{{format_name(info.jcry)}}
      </view>
      <view class="li lilast">
        <text>检查事项：</text>
      </view>
      <view class="li gong">
        <view class="num">
          共<text>{{list.length}}</text>项
        </view>
        <view class="">
          已上报<text>0</text>
        </view>
      </view>
      <uni-card class="card" v-for="(item,index) in list">
        <view class="num">
          0{{index+1}}
        </view>
        <view class="text">
          <view class="t1">
            检查类别：{{item.dicDetailName}}
          </view>
          <view class="">
            具体检查事项：{{item.guide}}
          </view>
        </view>

      </uni-card>

    </view>
  </view>

</template>

<script>
import { routineCheckInfo } from "@/api/api.js";
export default {
  data() {
    return {
      info: {},
      list: [],
      show: null,
    };
  },
  onLoad(opt) {
    window.ZWJSBridge.monitorTrace({
      monitorType: "pageIn",
      module: "routinecheck-ygqdetail",
      bizInfo: {},
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    //
    if (uni.getStorageSync("version") == "new") {
      this.show = "block";
    } else if (uni.getStorageSync("version") == "old") {
      this.show = "none";
    }
    this.info = JSON.parse(opt.obj);

    this.routineCheckInfo(this.info.id);
  },
  methods: {
    format_name(val) {
      if (val != null && val.length > 0) {
        return "*" + val.substring(1);
      } else {
        return "*";
      }
    },
    async routineCheckInfo(id) {
      let params = {
        base_check_id: id,
      };
      const res = await routineCheckInfo(params);
      this.list = res.data;
    },
  },
};
</script>

<style lang="scss">
.container {
  padding: 30rpx;
}
.tit {
  font-size: 40rpx;
  color: #203152;
  font-weight: bold;
}
.li {
  margin-top: 25rpx;
  border-bottom: 1rpx solid #d6d6d6;
  font-size: 34rpx;
  color: #7c8698;
  text {
    font-size: 34rpx;
    color: #203152;
  }
}
.lilast {
  border: none;
  font-weight: bold;
}
.gong {
  display: flex;
  font-size: 30rpx;
  color: #7c8698;
  align-items: center;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 44px;
  view {
    width: 50%;
    text-align: center;
  }
  text {
    font-size: 44rpx;
    color: #203152;
    display: inline;
    min-width: auto;
  }
  .num {
    border-right: 1rpx solid #ccc;
  }
}

.card {
  position: relative;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px !important;
  margin: 0 !important;
  padding: 0 !important;
  margin-top: 20rpx !important;
  .btn {
    text-align: center;
    display: flex;
    margin-top: 15rpx;
    button {
      width: 48%;
      line-height: 100%;
      padding: 10rpx 40rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 34rpx;
      color: #203152;
      background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
      border-radius: 44rpx;
    }
  }

  .num {
    text-align: center;
    line-height: 56rpx;
    font-family: DINAlternate-Bold;
    font-size: 34rpx;
    color: #ffffff;
    letter-spacing: 0;
    font-weight: 700;
    position: absolute;
    left: 0;
    top: 0;
    width: 56rpx;
    height: 56rpx;
    background-image: linear-gradient(180deg, #00b2ff 0%, #007dff 100%);
    border-radius: 10px 0px 10px 0px;
  }

  .text {
    font-size: 30rpx;
    margin-top: 60rpx;
    padding-left: 30rpx;

    .t1 {
      margin-bottom: 15rpx;
      border-bottom: 1px dashed #ccc;
      padding-bottom: 15rpx;
    }
  }
}
.oldcontainer {
  .tit {
    font-size: 60rpx;
    font-weight: normal;
  }
  .li {
    font-size: 42rpx;
    font-family: PingFang-Regular;
    font-weight: 500;
    text {
      font-size: 42rpx;
      // font-weight: bold;
      font-family: PingFangSC-Medium;
    }
  }
  .gong {
    text {
      font-size: 60rpx;
    }
  }
  .card {
    position: relative;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
    border-radius: 33rpx !important;
    margin: 0 !important;
    padding: 0 !important;
    margin-top: 20rpx !important;

    .btn {
      text-align: center;
      margin-top: 15rpx;
      font-size: 42rpx;
      color: #203152;
      display: block;
      padding-top: 30rpx;
      border-top: 1px solid #ccc;
      width: 90%;
      margin: 0 auto;
      margin-top: 40rpx;
      .bt1 {
        background: rgba(0, 176, 255, 0.05);
        border-radius: 44rpx;
        border: 1rpx solid #0080ff;
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        margin-bottom: 20rpx;
        view {
          height: 30rpx;
          margin-top: 0px;
        }
        text {
          font-size: 36rpx;
          color: #203152;
        }
      }
      .bt2 {
        background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
        border-radius: 44rpx;
        border: 1rpx solid #0080ff;
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        color: #ffffff;
        view {
          height: 30rpx;
          margin-top: 0px;
        }
        text {
          font-size: 36rpx;
          color: #ffffff;
        }
      }
    }
    .btn1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        width: 300rpx;
        height: 40px;
        line-height: 40px;
        margin-left: 0px !important;
        font-size: 34rpx;
        color: #203152;
        background: rgba(0, 176, 255, 0.05);
        border-radius: 44rpx;
        border: 1rpx solid #0080ff;
        text {
          font-size: 14px;
          color: #203152;
        }
      }
    }
    .num {
      font-family: DINAlternate-Bold;
      width: 66rpx;
      height: 66rpx;
      background-image: linear-gradient(180deg, #00b2ff 0%, #007dff 100%);
      border-radius: 33rpx 0px 33rpx 0px;
      font-size: 42rpx;
    }

    .text {
      font-family: PingFang-Regular;
      font-size: 42rpx;
      margin-top: 60rpx;
      padding-left: 30rpx;
      font-weight: 400;
      color: #333;
      opacity: 0.8;
      .t1 {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        margin-bottom: 15rpx;
        opacity: 1;
      }
    }
  }
}
</style>
