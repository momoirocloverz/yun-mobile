<template>
    <view>
        <view class="header-box"></view>
        <view class="content-wrapper" v-for="(item, index) in list" :key="index" v-show="indx == index">
            <view class="wrapper-line">
                <view class="line-title">
                    {{ item.ismultiple ? '多选题' : '单选题' }}
                </view>
                <view class="line-num">
                    <span class="line-num-index">{{ indx + 1 }}</span>/{{ list.length }}
                </view>
            </view>
            <view class="content-radio">
                <view>
                    <view class="item-title">
                        {{ item.title }}
                    </view>
                    <view>
                        <view class="item-answer" v-for="(item1, index1) in item.radio" :key="index1"
                            :class="item1.checked ? 'bg-check' : ''" @click="handleClick(item1)">
                            {{ item1.q }}
                        </view>
                    </view>
                </view>

            </view>
        </view>

        <view class="bottom-wrapper">
            <view>
                共
                <span class="total-num">{{ list.length }}</span>
                道提纲, 已答
                <span class="finish-num">{{ indx }}</span>
                题
            </view>
            <view class="btnsCon">
                <button type="default" class="cancelBtn" @click="last" v-if="indx !== 0">上一题</button>
                <button class="confirmBtn" @click="next" type="primary">{{indx == list.length - 1 ? '提交' : '下一题'}}</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            indx: 0,
            chooseId: '',
            list: [
                {
                    title: '111',
                    ismultiple: false,
                    radio: [
                        {
                            q: '111'
                        },
                        {
                            q: '22'
                        },
                        {
                            q: '33'
                        },
                        {
                            q: '44'
                        }
                    ]
                },
                {
                    title: '22',
                    ismultiple: true,
                    radio: [
                        {
                            q: '2'
                        },
                        {
                            q: '22'
                        },
                        {
                            q: '33'
                        },
                        {
                            q: '44'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        handleClick(val) {
            let question = this.list[this.indx];
            let option = this.list[this.indx].radio;
            option.forEach((item) => {
                if (item.q == val.q) {
                    item.checked = !item.checked;
                } else if (!question.ismultiple) {
                    item.checked = false;
                }
            })
            this.chooseId = val.q
        },
        last() {
            this.indx--
        },
        next() {
            if (this.chooseId) {
                this.indx++
            } else {
                uni.showToast({
                    title: '请选择选项！',
                    icon: 'none'
                });
            }
        },
    }
}
</script>

<style lang = "scss" scoped>
.header-box {
    width: 100%;
    height: 400rpx;
    background: url('/static/images/exam-bg.png') no-repeat;
    background-size: 100% 100%;
}

.content-wrapper {
    background-color: #fff;
    padding: 20rpx 0;
    margin: -250rpx 50rpx 0;
    border-radius: 10rpx;

    .wrapper-line {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding: 0 20rpx;

        .line-title {
            font-weight: 600;
            position: relative;
            padding-left: 16rpx;
            margin: 10rpx 0;
            font-size: 24rpx;

            &::before {
                content: "";
                position: absolute;
                width: 4px;
                height: 10px;
                background: #39f;
                border-radius: 1px;
                top: 50%;
                left: 0;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
            }
        }

        .line-num {
            font-size: 20rpx;
            color: #999;

            .line-num-index {
                font-size: 38rpx;
                color: #000;
                font-weight: 600;
            }
        }
    }

    .content-radio {
        .item-title {
            margin: 20rpx;
        }

        .item-answer {
            background-color: #f5f5f5;
            padding: 28rpx 36rpx;
            margin: 15rpx 20rpx;
            border-radius: 10rpx;
            font-size: 26rpx;
        }

        .bg-check {
            color: #198cff;
            background: rgba(51, 153, 255, .25);
            border: 1px solid #198cff;
        }
    }
}

.bottom-wrapper {
    position: fixed;
    bottom: 0;
    height: 88rpx;
    line-height: 88rpx;
    width: 100%;
    background-color: #fff;
    color: #999;
    font-size: 22rpx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20rpx;

    .total-num {
        color: #333;
        margin: 0 5rpx;
        font-weight: 600;
    }

    .finish-num {
        color: #3186f6;
        margin: 0 5rpx;
        font-weight: 600;
    }

    .btnsCon {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .cancelBtn {
            width: 170rpx;
            height: 64rpx;
            line-height: 64rpx;
            border-radius: 55rpx;
            border: 2rpx solid #198cff;
            color: #198cff;
            font-size: 26rpx;
        }

        .confirmBtn {
            width: 170rpx;
            height: 64rpx;
            line-height: 64rpx;
            background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
            border-radius: 55rpx;
            font-size: 26rpx;
            margin-left: 20rpx;
        }
    }
}
</style>