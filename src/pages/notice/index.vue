<template>
    <view class="contentCon">
        <view v-if="dataList && dataList.length">
            <!-- <uni-badge class="uni-badge-left-margin" v-for="(item, index) in dataList" :key="item.id" :is-dot="true"
                :text="0" absolute="rightTop" size="small">
                <view class="itemCon" @click="jumpTo(item)">
                    {{ item.title }}
                </view>
            </uni-badge> -->
            <uni-list>
                <uni-list-item v-for="item in dataList" :key="item.id" :title="item.title" link @click="jumpTo(item)">
                    <template v-slot:footer>
						<view v-if="!item.readFlag" class="badge"></view>
					</template>
                </uni-list-item>
            </uni-list>

        </view>
        <view class="emptyCon" v-else>
            <view class="emptyInner">
                <image :src="emptyImage" mode="widthFix" class="emptyImg" />
                <view class="emptyText">暂无数据</view>
            </view>
        </view>
    </view>
</template>
<script>
import { getculturalMsgList } from '@/api/api.js';
export default {
    data() {
        return {
            emptyImage: '/static/images/img2@2x.png',
            total: 0,
            dataList: [],
            queryParams: {
                currentPage: 1,
                pageSize: 10
            }
        }
    },
    onLoad() {
        this.initData();
    },
    onPullDownRefresh() {
        this.dataList = [];
        this.queryParams.currentPage = 1;
        this.initData()
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
    },
    onReachBottom() {
        if (this.queryParams.currentPage * this.queryParams.pageSize < this.total) {
            this.queryParams.currentPage += 1;
            this.initData()
        } else {
            uni.showToast({
                title: '没有更多了！',
                icon: 'error',
            });
        }
    },
    methods: {
        initData() {
            getculturalMsgList(this.queryParams).then(res => {
                const data = res.data
                this.dataList = this.dataList.concat(data.records);
                this.total = data.total
            })
        },
        jumpTo(item) {
            uni.navigateTo({
                url: `/pages/notice/detail?title=${item.title}&content=${item.content}&id=${item.id}`,
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.contentCon {
    .badge{
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background-color: red;
        margin-top: 10rpx;
    }
    padding: 32rpx;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    width: 100%;
    overflow-y: scroll;

    .itemCon {
        background-color: #fff;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 32rpx;
        border: 1rpx solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 3rpx 8rpx 0 rgba(0, 0, 0, 0.05);
        border-radius: 16rpx;
        overflow: hidden;
        padding: 32rpx;
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

    .emptyText {
        font-family: PingFang-SC-Medium;
        font-size: 28rpx;
        color: #c2c2c2;
        text-align: center;
        font-weight: 500;
        margin-top: -100rpx;
    }
}
</style>
