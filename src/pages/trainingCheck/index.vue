<template>
    <view>
        <view v-for="(item, index) in list" @click="jumpTo(item.to)">{{ item.name }}</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            queryParams: {
                page: 1,
                size: 10
            },
            list: [{
                name: '考试',
                to: '/pages/trainingCheck/exam/index'
            }, {
                name: '培训',
                to: '/pages/trainingCheck/train/index'
            }, {
                name: '学习',
                to: '/pages/trainingCheck/learn/index'
            }]
        }
    },
    onLoad() {
    },
    methods: {
        jumpTo(path) {
            uni.navigateTo({
                url: path,
            });
        },
    }
}
</script>

<style lang="scss" scoped></style>
