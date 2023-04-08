<template>
	<view class="TabBar">
		<!-- {{current}} -->
		<view
		 class="tab"
		 v-for="(item,index) in TabBarList"
		 :key="index"
		 @click="change(item.url,index)"
		>
			<image
			 class="imgsize"
			 :src="current == index ? item.selectIcon : item.icon"
			 mode="widthFix"
			/>
			<view :class="current == index ?'active':'text'">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0, //默认第一个页面tabbar激活
    },
  },
  data() {
    return {
      TabBarList: [
        {
          icon: '/static/tabbarimg/icon_workspace.png',
          selectIcon: '/static/tabbarimg/icon_workspace_active.png',
          name: '首页',
          url: '/pages/tourists/index',
        },
        {
          icon: '/static/tabbarimg/icon_self.png',
          selectIcon: '/static/tabbarimg/icon_self_active.png',
          name: '我的',
          url: '/pages/self/index',
        },
      ],
    }
  },
  methods: {
    change(url, index) {
      uni.navigateTo({
        url: url,
      })
    },
  },
}
</script>



<style scoped>
.TabBar {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  background-size: 750rpx 88rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  height: 70px;
  border-top: 1px solid #ccc;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.imgsize {
  width: 42rpx;
  height: 42rpx;
}

.addimgsize {
  width: 98rpx;
  height: 98rpx;
  margin-top: -30rpx;
}

.text {
  margin-top: 10rpx;
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bfc4c8ff;
  line-height: 20rpx;
}

.active {
  margin-top: 10rpx;
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #609eff;
  line-height: 20rpx;
}
</style>
