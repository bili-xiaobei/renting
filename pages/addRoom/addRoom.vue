<template>
  <view class="add_room">
    <!-- #ifdef MP-WEIXIN -->
    <view
      class="header"
      :style="{padding:capsule_data.top + 'px', 'line-height': capsule_data.height+'px'}"
      @touchmove="handleTouch"
      @touchstart="handleTouch"
    >发布房源</view>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <view
      class="header"
      @touchmove="handleTouch"
      @touchstart="handleTouch"
    >发布房源</view>
    <!-- #endif -->
    <view
      class="content"
      :style="{padding}"
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
            v-model="roomInfo.detail_addr"
            @input="(e) => {detailAddrChange(e,'detail_addr')}"
          />
        </view>
      </view>
      <view class="item size">
        <view class="left">面积</view>
        <view class="right">
          <input
            maxlength="6"
            type="number"
            placeholder="点击输入"
            v-model="roomInfo.size"
            @input="(e) => {detailAddrChange(e,'size')}"
          >m<view class="sup">2</view>
        </view>
      </view>
      <view class="item price">
        <view class="left">租金</view>
        <view class="right">
          <input
            maxlength="6"
            type="number"
            placeholder="点击输入"
            v-model="roomInfo.price"
            @input="(e) => {detailAddrChange(e,'price')}"
          />/月
        </view>
      </view>
      <view class="item room_dispose">
        <view class="left">配置</view>
        <view
          class="right"
          @click="choose('room_dispose')"
        >
          {{roomInfo.room_dispose ? roomInfo.room_dispose : '选择'}}<u-icon
            v-if="!roomInfo.room_dispose"
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
        <view
          class="right"
          @click="imgUpload"
        >
          请上传
        </view>
      </view>
      <view class="item img_upload">
        <view
          class="images_add"
          @click="imgUpload"
        > +</view>
        <view class="img_list">
          <!-- <image
            src="../../static/add_.png"
            mode="aspectFill"
          ></image> -->
          <view
            class="img"
            v-for="(item, index) in testImg"
            :key="index"
          >
            <image
              :src="item"
              mode="aspectFill"
            ></image>
            <view
              class="delete_img"
              @click="deleteImg(index)"
            >
              <u-icon name="close"></u-icon>
            </view>
          </view>

        </view>
      </view>
    </view>
    <button
      @click="submit"
      class="submit_btn"
    >发布</button>
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
        v-if="choose_type == 'room_dispose'"
        v-for="(item, index) in popup_data"
        :key="item.value"
        :class="isSelect(item.value) ? 'value select' : 'value'"
        @click="clickDisposeValue(item.value, index)"
      >
        {{item.value}}
      </view>
      <view
        v-if="choose_type != 'room_dispose'"
        v-for="(item, index) in popup_data"
        :key="item.value"
        class="value"
        @click="clickValue(item.value, index)"
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
          room_dispose: '',
          payment: '',
          start_sent: '',
          room_num: '',
          direction: '',
          images: [],
        },
        param_list: {},
        popup_data: [],
        isShow: false,
        choose_type: '',
        room_dispose_data: [],
        testImg: [],
        capsule_data: {}
      };
    },
    components: {},
    computed: {
      isSelect() {
        return (val) => {
          let res = this.room_dispose_data.findIndex(item => item == val)
          if (res != -1) {
            return true
          }
          return false
        }
      }
    },
    watch: {},
    methods: {
      imgUpload() {
        uni.chooseImage({
          count: 9, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          // sourceType: ['album'], //从相册选择
          success: res => {
            res.tempFilePaths.forEach(item => {
              let filePath = item
              this.testImg.push(filePath)
            });
          }
        });
      },
      submit() {
        for (const key in this.roomInfo) {
          if (this.roomInfo[key].length == 0 && [key] != 'images') {
            return uni.showToast({ icon: 'none', title: '请完善信息' })
          }
          if (this.testImg.length == 0) {
            return uni.showToast({ icon: 'none', title: '请完善信息' })
          }
        }
        uni.showLoading({
          title: '正在发布'
        });
        let promiseList = this.testImg.map(async item => {
          // promise方式
          return new Promise((resolve, reject) => {
            uniCloud.uploadFile({
              filePath: item,
              cloudPath: parseInt(Math.random() * 10000000000) + '.jpg',
              success: (res) => {
                this.roomInfo.images.push(res.fileID)
                resolve()
              },
              fail: (err) => {
                reject()
              }
            });
          })
        })
        Promise.all(promiseList).then(async res => {
          uniCloud.callFunction({
            name: 'updateUserDetailRoom',
            data: { db: 'list', data: { ...this.roomInfo, id: new Date().getTime() } },
            success: res => {
              uni.hideLoading();
              uni.showToast({ title: '发布成功' })
              this.roomInfo = {
                type: '',
                address: '',
                detail_addr: '',
                size: '',
                price: '',
                room_dispose: '',
                payment: '',
                start_sent: '',
                room_num: '',
                direction: '',
                images: [],
              },
                this.testImg = []
            },
            fail: err => {
              uni.hideLoading();
              uni.showToast('发布成失败')
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      deleteImg(index) {
        this.testImg.splice(index, 1)
      },
      choose(type) {
        this.popup_data = this.param_list[type + '_arr']
        this.isShow = true;
        this.choose_type = type
      },
      clickValue(val, inx) {
        if (this.choose_type == 'type') {
          this.roomInfo.type = val
        }
        if (this.choose_type == 'address') {
          this.roomInfo.address = val
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
        this.defaultValue()
      },
      // 房间配置多选
      clickDisposeValue(val, inx) {
        if (this.room_dispose_data.findIndex(item => item == val) == '-1') {
          this.room_dispose_data.push(val)
        } else {
          this.room_dispose_data.splice(this.room_dispose_data.findIndex(item => item == val), 1)
        }
        this.roomInfo.room_dispose = this.room_dispose_data.toString()
      },
      // 地址详情输入框Change
      detailAddrChange(e, type) {
        if (type == 'detail_addr') {
          this.roomInfo.detail_addr = e.target.value
        }
        if (type == 'size') {
          this.roomInfo.size = e.target.value
        }
        if (type == 'price') {
          this.roomInfo.price = e.target.value
        }
      },
      handleTouch() {
        this.isShow = false
        this.defaultValue()
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
      // 回复默认值
      defaultValue() {
        this.popup_data = []
      },
      // 获取胶囊信息
      getCapsuleData() {
        this.capsule_data = uni.getMenuButtonBoundingClientRect()
        console.log(this.capsule_data)
      }
    },
    created() {
      this.getUserData()
      this.getCapsuleData()
    },
  }
</script>
<style lang='scss' scoped>
  .add_room {
    position: relative;
    .header {
      width: 100%;
      height: 110rpx;
      display: flex;
      justify-content: center;
      background-color: $bgColor;
      padding-bottom: 30rpx;
      font-size: 34rpx;
      // #ifdef H5
      align-items: flex-end;
      // #endif
      font-weight: bold;
      position: fixed;
      z-index: 99;
      box-sizing: border-box;
    }
    .content {
      padding: 140rpx 40rpx 30rpx;
      .item:not(:last-child) {
        height: 70rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10rpx;
        border-bottom: 1px solid rgb(243, 243, 243);
        .left {
          font-size: 32rpx;
        }
        .right {
          display: flex;
          align-items: center;
          font-size: 26rpx;
          color: #666;
          max-width: 500rpx;
          input {
            font-size: 26rpx;
            text-align: right;
            color: $color;
            margin-right: 10rpx;
          }
          .sup {
            vertical-align: super !important;
          }
        }
      }
      .img_upload {
        display: flex;
        width: 100%;
        height: 200rpx;
        align-items: center;
        overflow-x: scroll;
        .images_add {
          flex: 0 0 150rpx;
          height: 150rpx;
          background-color: rgb(230, 230, 230);
          border-radius: 10rpx;
          font-size: 50rpx;
          line-height: 150rpx;
          text-align: center;
          border: 2px solid rgb(167, 166, 166);
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(167, 166, 166);
          box-sizing: border-box;
          margin-right: 20rpx;
        }
        .img_list {
          flex-grow: 0;
          flex-shrink: 0;
          // width: calc(100% - 170rpx);
          height: 150rpx;
          display: flex;
          image {
            width: 150rpx;
            height: 150rpx;
            margin-right: 20rpx;
          }
          .img {
            position: relative;
            .delete_img {
              position: absolute;
              top: -10rpx;
              right: 10rpx;
              width: 25rpx;
              height: 25rpx;
              border-radius: 50%;
              background-color: rgb(129, 129, 129);
              font-size: 15rpx;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
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
      z-index: 999;
      overflow-y: scroll;
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
      .select {
        box-sizing: border-box;
        border-right: 10rpx solid rgb(37, 157, 173);
      }
    }
    .submit_btn {
      margin: 0 30rpx;
    }
  }
</style>