<template>
    <view>
        <view class="header-bg"></view>
        <view class="list-box">
            <radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in list" :key="index">
                    <view class="radio-wrapper">
                        <radio :value="item.name" class="radio" />
                    </view>
                    <view class="item">
                        <view class="item-top">
                            <image src="/static/images/img2@2x.png"></image>
                            <view class="item-top-title">{{ item.name }}</view>
                        </view>
                        <view class="item-bottom">
                            <view>
                                题目数量：{{ item.num }}
                            </view>
                            <view>
                                试卷总分：{{ item.score }}
                            </view>
                            <view>
                                考试时长：{{ item.time }}分钟
                            </view>
                        </view>
                    </view>
                </label>
            </radio-group>
        </view>
        <view class="fixBottom fixPaddingBottom">
            <view class="addBtn" @click="startExam">开始考试</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    name: '111',
                    num: '4',
                    score: '99',
                    time: '16'
                },
                {
                    name: '22',
                    num: '4',
                    score: '99',
                    time: '16'
                }
            ]
        }
    },
    methods: {
        radioChange(e) {
            console.log(e);
        },
        startExam() {
            // 接口

            uni.navigateTo({
                url: `/pages/trainingCheck/exam/detail`,
            });
        }
    }
}

</script>

<style lang = "scss" scoped >
.header-bg {
    background-color: #177ee6;
    height: 220rpx;
    border-bottom-left-radius: 164rpx 57rpx;
    border-bottom-right-radius: 164rpx 57rpx;
}

.list-box {
    background-color: #fff;
    margin: -160rpx 60rpx 20rpx;
    border-radius: 16rpx;
    padding: 20rpx 20rpx;


    .uni-list-cell {
        display: flex;
        width: 100% !important;

        .radio-wrapper {
            position: relative;

            .radio {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .item {
            width: 100%;
            border-bottom: 1px solid #eee;
            padding: 30rpx 0;
            margin-left: 60rpx;

            .item-top {
                display: flex;

                image {
                    width: 50rpx;
                    height: 50rpx;
                    margin-right: 20rpx;
                }

                .item-top-title {
                    font-size: 28rpx;
                    font-weight: 600;
                }
            }

            .item-bottom {
                display: flex;
                justify-content: space-between;
                font-size: 22rpx;
                color: #888;
                margin-top: 10rpx;
            }
        }

        &:last-child {
            .item {
                border: none;
            }
        }
    }


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
}
</style>