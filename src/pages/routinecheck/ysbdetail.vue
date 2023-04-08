<!-- 已上报详情 -->
<template>
	<view class="container" :class="show=='block' ? 'showblock' : 'shownone'">
		<view class="tit">
			已上报
		</view>
		<view class="">
			<view class="li">
				<text>检查名称：</text>{{info.checkName}}
			</view>
			<view class="li">
				<text>关联文保单位：</text>{{info.pointName}}
			</view>
			<view class="li">
				<text>限期时间：</text>{{info.deadLine.substring(0,10)}}
			</view>
			<view class="li">
				<text>发布时间：</text>{{info.createTime.substring(0,10)}}
			</view>
			<view class="li">
				<text>分类类别：</text>可用电器
			</view>
			<view class="li">
				<text>发布人：</text>{{format_name(info.jcry)}}
			</view>
			<view class="li">
				检查事项：
			</view>
			<view class="li gong">
				<view class="num">
					共<text>{{list.length}}</text>项
				</view>
				<view class="">
					已上报<text>{{list.length}}</text>
				</view>
			</view>
			<uni-card class="card"  v-for="(item,index) in list">
				<view class="num">
					0{{index+1}}
				</view>
				<view class="text">
					<view class="t1">
						检查类别：{{item.jclb}}
					</view>
					<view class="">
						具体检查事项：{{item.dicDetailName}}
					</view>
				</view>
				<view class="btn" v-if="item.checkType==null">
					<view class="bt1" @click="clickNewAdd('xc',item)">
						<view class="">
							检查结果上报
						</view>
						<text>（已现场处理）</text>
					</view>
					<view class="bt2" @click="clickNewAdd('zj',item)">
						<view class="">
							检查结果上报
						</view>
						<text>（需镇街协助）</text>
					</view>
					
				</view>
				<view class="btn1" v-else>
					<button type="primary" v-if="item.checkType==0"> 已上报<text>（已现场处理）</text></button> 
					<button type="primary" v-if="item.checkType==1">已上报<text>（需镇街协助）</text> </button> 
				</view>
				
				<view class="shangbaoInfo" v-if="item.checkType==1">
					<view class="sbtit">
						上报详情
					</view>
					<view class="">
						<text>处理描述:</text>
						<view class="">
							{{item.checkOpinion}}
						</view>
					</view>
					
					<view class="li lifj">
						<text>附件：</text>
						<view class="img" v-if="item.storageFile">
							<image :src="'http://223.65.209.139:18180/admin/cmd/v1/storage/view/'+img.path" mode="" v-for="img in item.storageFile"></image>
						</view>
						<view class="" v-else>
							暂无附件
						</view>
					</view>
				</view>
			</uni-card>
		</view>
	</view>
	<view class="container oldcontainer" :class="show!='block' ? 'showblock' : 'shownone'">
		<view class="tit">
			已上报
		</view>
		<view class="">
			<view class="li">
				<text>检查名称：</text>{{info.checkName}}
			</view>
			<view class="li">
				<text>关联文保单位：</text>{{info.pointName}}
			</view>
			<view class="li">
				<text>限期时间：</text>{{info.deadLine.substring(0,10)}}
			</view>
			<view class="li">
				<text>发布时间：</text>{{info.createTime.substring(0,10)}}
			</view>
			<view class="li">
				<text>分类类别：</text>可用电器
			</view>
			<view class="li">
				<text>发布人：</text>{{format_name(info.jcry)}}
			</view>
			<view class="li">
				检查事项：
			</view>
			<view class="li gong">
				<view class="num">
					共<text>{{list.length}}</text>项
				</view>
				<view class="">
					已上报<text>{{list.length}}</text>
				</view>
			</view>
			<uni-card class="card"  v-for="(item,index) in list">
				<view class="num">
					0{{index+1}}
				</view>
				<view class="text">
					<view class="t1">
						检查类别：{{item.jclb}}
					</view>
					<view class="">
						具体检查事项：{{item.dicDetailName}}
					</view>
				</view>
				<view class="btn" v-if="item.checkType==null">
					<view class="bt1" @click="clickNewAdd('xc',item)">
						<view class="">
							检查结果上报
						</view>
						<text>（已现场处理）</text>
					</view>
					<view class="bt2" @click="clickNewAdd('zj',item)">
						<view class="">
							检查结果上报
						</view>
						<text>（需镇街协助）</text>
					</view>
					
				</view>
				<view class="btn1" v-else>
					<button type="primary" v-if="item.checkType==0"> 已上报<text>（已现场处理）</text></button> 
					<button type="primary" v-if="item.checkType==1">已上报<text>（需镇街协助）</text> </button> 
				</view>
				
				<view class="shangbaoInfo" v-if="item.checkType==1">
					<view class="sbtit">
						上报详情
					</view>
					<view class="desc">
						<text>处理描述:</text>
						<view class="">
							{{item.checkOpinion}}
						</view>
					</view>
					
					<view class="li lifj">
						<text>附件：</text>
						<view class="img" v-if="item.storageFile">
							<image :src="'http://223.65.209.139:18180/admin/cmd/v1/storage/view/'+img.path" mode="" v-for="img in item.storageFile"></image>
						</view>
						<view class="" v-else>
							暂无附件
						</view>
					</view>
				</view>
			</uni-card>
		</view>
	</view>

</template>

<script>
		import {routineCheckInfo} from '@/api/api.js'
	export default {
		data() {
			return {
				info: {},
				list: [],
				show:null,
			}
		},
		onShow() {
			if(uni.getStorageSync('version') == 'new'){
				this.show = 'block'
			}
			else if(uni.getStorageSync('version') == 'old'){
				this.show = 'none'
			}
		},
		onLoad(opt) {
			

			window.ZWJSBridge.monitorTrace({
      monitorType: "pageIn",
      module: "routinecheck-ysbdetail",
      bizInfo: {},
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

			this.info = JSON.parse(opt.obj) 
			this.routineCheckInfo(this.info.id)
		},
		methods: {
			format_name(val) {
      if (val != null && val.length > 0) {
        return "*" + val.substring(1);
      } else {
        return "*";
      }
    },
			async routineCheckInfo(id){
				let params = {
					base_check_id:id
				}
				const res = await routineCheckInfo(params)
				this.list = res.data
			},
			
			clickNewAdd(type) {
				if (type == 'xc') {
					uni.navigateTo({
						url: 'xcsend'
					})
				} else {
					uni.navigateTo({
						url: 'zjsend'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.tit{
		font-size: 40rpx;
		color: #203152;
		font-weight: bold;
	}
	.tags {
		margin-right: 20rpx;
	}

	.li{
		margin-top: 25rpx;
		border-bottom: 1rpx solid #D6D6D6;
		font-size: 28rpx;
		color: #7C8698;
		text{
			font-size: 32rpx;
			color: #203152;
			display: inline-block;
			min-width: 240rpx;
		}
		.img{
			image{
				width: 180rpx;
				height: 130rpx;
			}
		}
	}
	.lifj{
		border: none;
	}
	.gong{
		display: flex;
		font-size: 30rpx;
		color: #7C8698;
		align-items: center;
		border: 0.5px solid rgba(0,0,0,0.1);
		box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.05);
		border-radius: 10px;
		height: 44px;
		view{
			width: 50%;
			text-align: center;
		}
		text{
			font-size: 44rpx;
			color: #203152;
			display: inline;
			min-width: auto;
		}
		.num{
			
			border-right: 1rpx solid #ccc;
		}
	}
	

	.lis {
		border: 1px solid #ccc;
		padding: 30rpx;
		border-radius: 15rpx;

		.up {
			display: flex;
			// justify-content: space-between;

			.index {
				width: 60rpx;
				height: 60rpx;
				background: #ccc;
				line-height: 60rpx;
				text-align: center;
				border-radius: 50%;
				margin-right: 30rpx;
			}
		}

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
				font-size: 30rpx;
				border-radius: 20rpx;
			}
		}
	}
	
	.card {
		position: relative;
		background: #FFFFFF;
		border: 0.5px solid rgba(0,0,0,0.1);
		box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.05) !important;
		border-radius: 10px !important;
		margin: 0 !important;
		padding: 0 !important;
		margin-top: 20rpx !important;
		.btn{
			text-align: center;
			display: flex;
			margin-top: 15rpx;
			font-size: 34rpx;
			color: #203152;
			justify-content: space-around;
			.bt1{
				background: rgba(0,176,255,0.05);
				border-radius: 44rpx;
				border: 1rpx solid #0080FF ;
				width: 300rpx;
				view{
					height:30rpx;
					margin-top: 5px;
				}
				text{
					font-size: 24rpx;
					color: #203152;
				}
			}
			.bt2{
				background-image: linear-gradient(137deg, #00B2FF 0%, #007AFF 100%);
				border-radius: 44rpx;
				border: 1rpx solid #0080FF ;
				width: 300rpx;
				color: #FFFFFF;
				view{
					height:30rpx;
					margin-top: 5px;
				}
				text{
					font-size: 24rpx;
					color: #FFFFFF;
				}
			}
			
		}
		.btn1{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			padding-left: 30rpx;
			button{
				// width: 300rpx;
				height: 40px;
				line-height: 40px;
				margin-left: 0px !important;
				font-size: 34rpx;
				color: #203152;
				background: rgba(0,176,255,0.05);
				border-radius: 44rpx;
				border: 1rpx solid #0080FF ;
				text{
					font-size: 14px;
					color: #203152;
				}
			}
		}
		.num {
			text-align: center;
			line-height: 56rpx;
			font-family: DINAlternate-Bold;
			font-size: 34rpx;
			color: #FFFFFF;
			letter-spacing: 0;
			font-weight: 700;
			position: absolute;
			left: 0;
			top: 0;
			width: 56rpx;
			height: 56rpx;
			background-image: linear-gradient(180deg, #00B2FF 0%, #007DFF 100%);
			border-radius: 10px 0px 10px 0px;
		}
	
		.text {
			font-size: 30rpx;
			margin-top: 60rpx;
			padding-left: 30rpx;
	
			.t1 {
				margin-bottom: 15rpx;
			}
		}
		.shangbaoInfo{
			width: 95%;
			padding: 10px;
			margin: 30rpx auto;
			border: 0.5px solid rgba(0,0,0,0.1);
			box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.05);
			border-radius: 10px;
			.sbtit{
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			
		}
	}
	.oldcontainer{
		.tit{
			font-size: 60rpx;
			font-weight: normal;
		}
		.li{
			font-size: 42rpx;
			font-family: PingFang-Regular;
			font-weight: 500;
			text{
				font-size: 42rpx;
				// font-weight: bold;
				font-family: PingFangSC-Medium;
			}
			
		}
		.gong{
			text{
				font-size: 60rpx;
			}
		}
		.card {
			position: relative;
			background: #FFFFFF;
			border: 0.5px solid rgba(0,0,0,0.1);
			box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.05) !important;
			border-radius: 33rpx !important;
			margin: 0 !important;
			padding: 0 !important;
			margin-top: 20rpx !important;
			
			.btn{
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
				.bt1{
					background: rgba(0,176,255,0.05);
					border-radius: 44rpx;
					border: 1rpx solid #0080FF ;
					width: 100%;
					height: 88rpx;
					line-height: 88rpx;
					margin-bottom: 20rpx;
					view{
						height:30rpx;
						margin-top: 0px;
					}
					text{
						font-size: 36rpx;
						color: #203152;
					}
				}
				.bt2{
					background-image: linear-gradient(137deg, #00B2FF 0%, #007AFF 100%);
					border-radius: 44rpx;
					border: 1rpx solid #0080FF ;
					width: 100%;
					height: 88rpx;
					line-height: 88rpx;
					color: #FFFFFF;
					view{
						height:30rpx;
						margin-top: 0px;
					}
					text{
						font-size: 36rpx;
						color: #FFFFFF;
					}
				}
				
			}
			.btn1{
				display: flex;
				justify-content: space-between;
				align-items: center;
				button{
					height: 40px;
					line-height: 40px;
					margin-left: 0px !important;
					font-size: 42rpx;
					color: #203152;
					background: rgba(0,176,255,0.05);
					border-radius: 44rpx;
					border: 1rpx solid #0080FF ;
					text{
						font-size: 36rpx;
						color: #203152;
					}
				}
			}
			.num {
				font-family: DINAlternate-Bold;
				width: 66rpx;
				height: 66rpx;
				background-image: linear-gradient(180deg, #00B2FF 0%, #007DFF 100%);
				border-radius: 33rpx 0px 33rpx 0px;
				font-size: 42rpx;
			}
		
			.text {
				font-family: PingFang-Regular;
				font-size:42rpx;
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
		.shangbaoInfo{
			width: 95%;
			padding: 10px;
			margin: 30rpx auto;
			border: 0.5px solid rgba(0,0,0,0.1);
			box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.05);
			border-radius: 10px;
			font-size: 42rpx;
			.sbtit{
				font-size: 48rpx;
				font-weight: bold;
				margin-bottom: 30rpx;
			}
			.desc{
				view{
					// margin-top: 20rpx;
					padding: 20rpx;
				}
				
			}
			
		}
	}
</style>
