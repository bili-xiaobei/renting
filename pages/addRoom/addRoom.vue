<template>
  <view class="add_room">
    <view
      class="header"
      @touchmove="handleTouch"
      @touchstart="handleTouch"
    >发布房源</view>
    <view
      class="content"
      @touchmove="handleTouch"
      @touchstart="handleTouch"
    >
      <view class="item type">
        <view class="left">房源类型</view>
        <view
          class="right"
          @click="choose('type')"
        >
          {{roomInfo.type ? roomInfo.type : '选择'}}<u-icon
            v-if="!roomInfo.type"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item address">
        <view class="left">位置</view>
        <view
          class="right"
          @click="choose('address')"
        >
          {{roomInfo.address ? roomInfo.address : '选择'}}<u-icon
            v-if="!roomInfo.address"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item detail_addr">
        <view class="left">详细地址</view>
        <view class="right">
          <input
            type="text"
            placeholder="点击输入"
          />
        </view>
      </view>
      <view class="item size">
        <view class="left">面积</view>
        <view class="right">
          <input
            maxlength="6"
            type="text"
            placeholder="点击输入"
          >m<view class="sup">2</view>
        </view>
      </view>
      <view class="item price">
        <view class="left">租金</view>
        <view class="right">
          <input
            maxlength="6"
            type="text"
            placeholder="点击输入"
          />/月
        </view>
      </view>
      <view class="item dispose">
        <view class="left">配置</view>
        <view
          class="right"
          @click="choose('dispose')"
        >
          {{roomInfo.dispose ? roomInfo.dispose : '选择'}}<u-icon
            v-if="!roomInfo.dispose"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item payment">
        <view class="left">付款方式</view>
        <view
          class="right"
          @click="choose('payment')"
        >
          {{roomInfo.payment ? roomInfo.payment : '选择'}}<u-icon
            v-if="!roomInfo.payment"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item start_sent">
        <view class="left">起租时长</view>
        <view
          class="right"
          @click="choose('start_sent')"
        >
          {{roomInfo.start_sent ? roomInfo.start_sent : '选择'}}<u-icon
            v-if="!roomInfo.start_sent"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item room_num">
        <view class="left">居室</view>
        <view
          class="right"
          @click="choose('room_num')"
        >
          {{roomInfo.room_num ? roomInfo.room_num : '选择'}}<u-icon
            v-if="!roomInfo.room_num"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item direction">
        <view class="left">朝向</view>
        <view
          class="right"
          @click="choose('direction')"
        >
          {{roomInfo.direction ? roomInfo.direction : '选择'}}<u-icon
            v-if="!roomInfo.direction"
            name="arrow-right-double"
          ></u-icon>
        </view>
      </view>
      <view class="item images">
        <view class="left">图片上传</view>
        <view class="right">
          请上传
        </view>
      </view>
      <view class="item images_upload">
        +
      </view>
    </view>
    <view
      class="popup"
      v-if="isShow"
    >
      <input
        maxlength="8"
        type="text"
        placeholder="点击输入"
      />
      <view
        v-for="item in popup_data"
        class="value"
        @click="clickValue(item.value)"
      >
        {{item.value}}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        roomInfo: {
          type: '',
          address: '',
          detail_addr: '',
          size: '',
          price: '',
          dispose: '',
          payment: '',
          start_sent: '',
          room_num: '',
          direction: '',
          images: '',
        },
        param_list: {},
        popup_data: [],
        isShow: false,
        choose_type: ''
      };
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      choose(type) {
        // console.log(type)
        this.popup_data = this.param_list[type + '_arr']
        this.isShow = true;
        // console.log(this.param_list)
        // console.log(this.popup_data)
        this.choose_type = type
      },
      clickValue(val) {
        // console.log(val)
        if (this.choose_type == 'type') {
          this.roomInfo.type = val
        }
        if (this.choose_type == 'address') {
          this.roomInfo.address = val
        }
        if (this.choose_type == 'dispose') {
          this.roomInfo.dispose = val
        }
        if (this.choose_type == 'payment') {
          this.roomInfo.payment = val
        }
        if (this.choose_type == 'start_sent') {
          this.roomInfo.start_sent = val
        }
        if (this.choose_type == 'room_num') {
          this.roomInfo.room_num = val
        }
        if (this.choose_type == 'direction') {
          this.roomInfo.direction = val
        }
        this.isShow = false
      },
      handleTouch() {
        this.isShow = false
      },
      // 通过云函数获取所有信息
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
    },
    created() {
      this.getUserData()
    },
    mounted() { },
    beforeCreate() { },
    beforeMount() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
  }
</script>
<style lang='scss' scoped>
  .add_room {
    position: relative;
    .header {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: center;
      background-color: $bgColor;
      align-items: flex-end;
      padding-bottom: 20rpx;
      font-size: 34rpx;
      font-weight: bold;
    }
    .content {
      padding: 30rpx 40rpx;
      .item:not(:last-child) {
        height: 70rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10rpx;
        border-bottom: 1px solid rgb(243, 243, 243);
        .left {
          font-size: 28rpx;
        }
        .right {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #666;
          input {
            font-size: 24rpx;
            text-align: right;
            color: $color;
            margin-right: 10rpx;
          }
          .sup {
            vertical-align: super !important;
          }
        }
      }
    }
    .popup {
      width: 220rpx;
      // height: 200rpx;
      max-height: 800rpx;
      background-color: rgb(226, 226, 226);
      position: absolute;
      top: 55%;
      right: 0;
      transform: translateY(-50%);
      border-radius: 20rpx 0 0 20rpx;
      padding: 25rpx 0;
      input {
        width: 100%;
        text-align: center;
        font-size: 24rpx;
        height: 70rpx;
        line-height: 70rpx;
        background-color: rgb(240, 240, 240);
      }
      .value {
        width: 100%;
        text-align: center;
        font-size: 24rpx;
        height: 70rpx;
        line-height: 70rpx;
        font-weight: bold;
        border-bottom: 1px double rgb(231, 231, 231);
      }
    }
  }
</style>