<script>
import { postLocaltion, getrealTimePosition } from './api/api.js';
export default {
  data() {
    return {
      timer: null,
    };
  },
  onLaunch: function () {
    // uni.setStorageSync('version','new')
    // let token = uni.getStorageSync('token');
    // if (token) {
    // 	// uni.switchTab({
    // 	// 	url:'/pages/index/index'
    // 	// })
    // 	this.$navTo.switchTab({
    // 		url: '/pages/self/index'
    // 	})
    // } else {
    // 	console.log(1);
    // 	this.$navTo.switchTab({
    // 		url: "/pages/tourists/index",
    // 	})
    // 	//    uni.switchTab({
    // 	//        url: "/pages/tourists/index",
    // 	// })
    // }
    // uni.hideTabBar({})
    if (!uni.getStorageSync('entryTime')) {
      uni.setStorageSync('entryTime', new Date().getTime());
    }
    uni.setStorageSync('baseFontTitle', '36rpx');
    uni.setStorageSync('baseFontContent', '28rpx');
    uni.setStorageSync('baseFontTime', '20rpx');
  },
  // mounted() {
  // 	if(uni.getStorageSync('role') == '文物护保员'){
  // 		this.timer = setInterval(() => {
  // 			console.log("app");
  // 			// 获取实时定位 需要替换
  // 			getrealTimePosition().then(res => {
  // 				if(res.code == 200 && res.data.latitude){
  // 					postLocaltion({latitude:res.data.latitude,latitude:res.data.longitude})
  // 				}
  // 			})
  // 		}, 5000) //每秒请求一次接口
  // 	}
  // },
  onLoad() {
    uni.hideTabBar({});
  },
  onShow: function () {
    // uni.hideTabBar({})
  },
  onHide: function () {
    // console.log('App Hide')
  },
};
</script>
<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色
// @font-face {
// 	font-family: PingFangSC-Medium;
// 	src: url('https://cultural-app.xiaoshan.gov.cn:8888/static/PingFang_Medium.ttf');
// }
// @font-face {
// 	font-family: PingFangSC-Semibold;
// 	src: url('https://cultural-app.xiaoshan.gov.cn:8888/static/PingFangSC-Semibold.ttf');
// }
// @font-face {
// 	font-family: PingFang-Regular;
// 	src: url('https://cultural-app.xiaoshan.gov.cn:8888/static/PingFang-Regular.ttf');
// }
page {
  background-color: #fafafa;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  margin: 0 auto;
  height: 100%;
}
/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
.showblock {
  display: block;
}
.shownone {
  display: none !important;
}
.container {
  padding: 30rpx;
  font-family: PingFangSC-Medium;
  ::v-deep .segmented-control__item--text {
    height: 36px !important;
    line-height: 36px !important;
    display: inline-block !important;
    border-bottom: 5px solid rgb(41, 121, 255) !important;
    padding: 0 !important;
  }
  ::v-deep .segmented-control__text {
    font-size: 36rpx !important;
  }
  ::v-deep .segmented-control__item {
    border: 2rpx solid #ddd !important;
    border-right: 0rpx !important;
  }
  ::v-deep .segmented-control__item:nth-last-child(1) {
    border-right: 2rpx solid #ddd !important;
  }
}
.oldcontainer {
  ::v-deep .segmented-control__item--text {
    height: 36px !important;
    line-height: 36px !important;
    display: inline-block !important;
    border-bottom: 5px solid rgb(41, 121, 255) !important;
    padding: 0 !important;
  }
  ::v-deep .segmented-control__text {
    font-size: 42rpx !important;
  }
  ::v-deep .segmented-control__item {
    border: 2rpx solid #ddd !important;
    border-right: 0rpx !important;
  }
  ::v-deep .segmented-control__item:nth-last-child(1) {
    border-right: 2rpx solid #ddd !important;
  }
}
.tags {
  margin-left: 20rpx !important;
  background: #d9a572 !important;
  border-radius: 15px !important;
}
.tags1 {
  background: #17be6b !important;
  border-radius: 15px;
}
.tagc {
  background: #17be6b !important;
  border-radius: 15px;
}
.card4 {
  text-align: right;
  ::v-deep .uni-tag {
    padding: 11rpx 23rpx !important;
    border: none !important;
  }
}
.card3 {
  ::v-deep .uni-tag {
    padding: 10rpx 22rpx !important;
    border: none !important;
  }
}
::v-deep .uni-tag {
  padding: 10rpx 22rpx !important;
  font-size: 28rpx !important;
  border: none !important;
}
::v-deep .uni-card {
  border: 0.5px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px !important;
  font-family: PingFangSC-Medium !important;
  margin: 0 !important;
  padding: 0 !important;
}
.fixPaddingBottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
