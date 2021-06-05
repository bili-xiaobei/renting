<template>
	<view class="collapse">
		<u-form :model="ajax_params" ref="u_ajax_params">
			<u-form-item label="地址" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-radio-group v-model="ajax_params.address">
					<u-radio v-for="(item, index) in param_list.type_arr" :key="item.type_arr" :name="item.type">
						{{ item.type }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="详细地址" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-input v-model="ajax_params.detail_addr" />
			</u-form-item>
			<u-form-item label="租金 元/月" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}"
				border-bottom>
				<u-input v-model="ajax_params.price" />
			</u-form-item>
			<u-form-item label="面积 /m2" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}"
				border-bottom>
				<u-input v-model="ajax_params.size" />
			</u-form-item>
			<u-form-item label="居室" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-radio-group v-model="ajax_params.room_num">
					<u-radio v-for="(item, index) in param_list.room_num_arr" :key="item.room_num_arr"
						:name="item.room_num">
						{{ item.room_num }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="付款方式" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-radio-group v-model="ajax_params.payment">
					<u-radio v-for="(item, index) in param_list.payment_arr" :key="item.payment_arr"
						:name="item.payment">
						{{ item.payment }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="起租时长" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-radio-group v-model="ajax_params.start_sent">
					<u-radio v-for="(item, index) in param_list.start_sent_arr" :key="item.start_sent_arr"
						:name="item.start_sent">
						{{ item.start_sent }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="配置" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-checkbox-group>
					<u-checkbox v-model="item.checked" v-for="(item, index) in param_list.room_dispose_arr"
						:key="item.room_dispose_arr" :name="item.dispose" @change="change('dispose')">
						{{ item.dispose }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="朝向" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">
				<u-radio-group v-model="ajax_params.direction">
					<u-radio v-for="(item, index) in param_list.direction_arr" :key="item.direction_arr"
						:name="item.direction">
						{{ item.direction }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="上传图片" label-position="top" :label-style="{'font-size': '32rpx','font-weight':'bold'}">

			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param_list: {},
				ajax_params: {
					address: '',
					type: '',
					detail_addr: '',
					price: '',
					size: '',
					room_num: '',
					payment: '',
					start_sent: '',
					room_dispose: [],
					direction: '',
					images: []
				},
			}
		},
		onLoad() {
			this.getUserData()
		},
		methods: {
			getUserData() {
				uniCloud.callFunction({
					name: 'getUserData',
					data: {
						name: '小北'
					},
					success: (res) => {
						if (res.result.res.data.length == 0) {
							return uni.showToast({
								icon: "none",
								title: "暂无数据"
							})
						}
						this.param_list = res.result.res.data[0].publish_parameters
					},
					fail(err) {
						uni.showToast("请求失败")
					}
				})
			},
			popupOpen() {
				console.log('open')
			},
			setting() {
				console.log('setting')
			},
			change(e) {
				console.log(this.ajax_params)
			}
		}
	}
	/*
		发布房源的参数
		"address": "",  房源位置
		"detail_addr": "",  房源楼层及房间号
		"type": "",		房源的类型
		"price": "",  租金
		"size": "",   面积
		"payment": "", 付款方式
		"start_sent": "", 起租
		"dispose": "",[]  房间配置
		"room_num": "",   居室
		"direction": "",  房间朝向
		"images": "",   房屋图片
	
	publish_parameters
	*/
</script>

<style lang="scss">
	.collapse {
		padding: 40rpx;

		&>view {
			.top {
				font-size: 36rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
			}

			.bottom {
				display: flex;

				.item {
					display: flex;
					align-items: center;

					._circle {
						width: 15rpx;
						height: 15rpx;
						border-radius: 50%;
						background-color: #2B85E4;
					}
				}
			}
		}
	}
</style>
