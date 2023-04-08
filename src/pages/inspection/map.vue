<template>
  <view class="normalLocationMapCon">
    <view class="head-handle">
      <view class="displayCurrent">{{ this.current.address }}</view>
      <view class="confirm" @click="confirmArea">确定</view>
    </view>
    <view id="container" class="map-container"></view>
  </view>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader';
const littleIcon = {
  icon: 'https://img.hzanchu.com/acimg/57f48460638ed6e537fc419be36a2c50.png',
  ancher: 'center',
  zIndex: 199,
};
export default {
  data() {
    return {
      mapInstance: null,
      geolocationInstance: null,
      dragMarker: null,
      current: {
        address: '当前位置',
        lng: 0,
        lat: 0,
      },
      t0: 0,
      t2: 0,
      ISForOld: false,
    };
  },
  onShow() {
    this.t0 = Date.now();
    this.checkMode();
  },
  onHide() {
    this.buryPoints();
  },
  onLoad(opt) {
    this.newInit(opt);
  },
  methods: {
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
      } else {
        this.ISForOld = false;
      }
    },
    buryPoints() {
      this.t2 = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'inspectionMap',
          pageName: '地图页面',
          t2: this.t2,
          t0: this.t0,
          log_status: '02',
        });
      });
    },
    confirmArea() {
      uni.navigateBack();
    },
    onComplete(data) {
      uni.showToast({
        title: '定位成功',
        icon: 'success',
      });
      uni.setStorageSync('InspectionMapData', {
        lng: data.position.R,
        lat: data.position.Q,
        address: data.formattedAddress,
      });
      this.current = {
        lng: data.position.R,
        lat: data.position.Q,
        address: data.formattedAddress,
      };
    },
    onFail(data) {
      uni.showToast({
        title: '定位失败' + data.message,
        icon: 'error',
      });
    },
    dragMarkInit(lng, lat) {
      var marker = new AMap.Marker({
        map: this.mapInstance,
        offset: new AMap.Pixel(-19, -40),
        position: [lng, lat],
        ...littleIcon,
      });
      this.dragMarker = marker;
      this.mapInstance.add(marker);
      //   geoCode(lng, lat);
      //   this.dragMarker.on('dragend', (e) => {
      //     geoCode(e.lnglat.lng, e.lnglat.lat);
      //   });
    },
    newInit() {
      let that = this;
      AMapLoader.load({
        key: 'b32f01b63e665cbb6bc272c0c1353fbe',
        plugins: ['AMap.Geolocation', 'AMap.Marker', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'],
        AMapUI: {
          version: '1.1',
          plugins: ['misc/PositionPicker', 'control/BasicControl'],
        },
      })
        .then((AMap) => {
          this.mapInstance = new AMap.Map('container', {
            zoom: 11,
            resizeEnable: true,
            animateEnable: false,
          });
          //   positionPickerAction()
          AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
            var zoomCtrl1 = new BasicControl.Zoom({
              position: 'br',
            });
            // this.mapInstance.addControl(zoomCtrl1)
          });
          var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: false,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量
            offset: [10, 20],
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            position: 'RB',
          });
          this.mapInstance.addControl(geolocation);
          this.geolocationInstance = geolocation;
          geolocation.getCurrentPosition((status, result) => {
            console.log(result);
            if (status == 'complete') {
              this.onComplete(result);
              //   that.dragMarkInit(result.position.R, result.position.R);
            } else {
              this.onFail(result);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.head-handle {
  height: 120rpx;
  position: fixed;
  background-color: #fff;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 800;
  padding-left: 40rpx;
  padding-right: 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .confirm {
    width: 126rpx;
    height: 56rpx;
    background-color: #1677ff;
    font-size: 28rpx;
    line-height: 56rpx;
    text-align: center;
    color: #fff;
    border-radius: 10rpx;
    margin-left: 20rpx;
  }
  .displayCurrent {
    font-size: 24rpx;
    width: 80%;
    margin-bottom: 10rpx;
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      height: 10rpx;
      width: 10rpx;
      left: -14rpx;
      top: 10rpx;
      border-radius: 5rpx;
      background-color: #1677ff;
    }
  }
}
.normalLocationMapCon {
  box-sizing: border-box;
}
.map-container {
  height: 100vh;
}
::-webkit-input-placeholder {
  font-size: 30px;
}
</style>
