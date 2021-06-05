<template>
	<view class="left-capsule"
		:style="{height:title ? height+top+5+'px' : 0, 'background-color': title ? '#fff' : 'transpatent'}">
		<!-- #ifdef MP-WEIXIN -->
		<view class="capsule"
			:style="{'width':width+'px','height': height+'px',position:'fixed', top:top+'px', right: left+'px', 'background-color': bgc}">
			<view>
				<u-icon name="arrow-left" @click="back"></u-icon>
			</view>
			<view class="capsule_line"></view>
			<view>
				<u-icon name="home-fill" @click="gohome"></u-icon>
			</view>
		</view>
		<view class="title" v-if="title" :style="{height: height+'px',position: 'fixed', top: top+'px'}">
			{{title}}
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="header">
			<u-icon class="back" name="arrow-left" @click="back"></u-icon>
			<view class="title">{{title}}</view>
			<view></view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: "left-capsule",
		props: ['title'],
		data() {
			return {
				width: 0,
				height: 0,
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				bgc: 'rgba(255,255,255,0.6)'
			};
		},
		created() {
			console.log('aaaaa')
			// #ifdef MP-WEIXIN
			this.capsuleBtnData()
			// #endif
		},
		methods: {
			capsuleBtnData(options) {
				var data = wx.getMenuButtonBoundingClientRect();
				this.width = data.width;
				this.height = data.height;
				this.top = data.top;
				this.right = data.right;
				this.bottom = data.bottom;
				this.left = data.left;
			},
			back() {
				uni.navigateBack(-1)
			},
			gohome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			}
		},
	}
</script>

<style lang="scss">
	.left-capsule {
		width: 100%;
		position: fixed;
		z-index: 999;

		// #ifdef MP-WEIXIN
		.capsule {
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid rgba(0, 0, 0, 0.05);
			border-radius: 50rpx;
			z-index: 1000;
			.capsule_line {
				width: 1px;
				height: 60%;
				background-color: rgba(0, 0, 0, 0.3);
				margin: 0 20rpx;
				transform: scaleX(0.2);
			}
		}

		.title {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: center;
			z-index: 999;
		}

		// #endif
		// #ifndef MP-WEIXIN
		.header {
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			position: fixed;
			z-index: 999;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;

			.back {
				position: absolute;
				top: 50%;
				left: 30rpx;
				transform: translate(-50%, -50%);
			}
		}

		// #endif
	}
</style>
