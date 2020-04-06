<template>
  <view :scroll-y="true" style="margin: 12px; background-color: #409eff; color: white;">
    <view class="container">
      <image src="../assets/logo.png" style="width: 100px;"></image>
      <text style="font-size: 20px; margin: 6px;">AV/BV互转小工具</text>
      <view class="section">
        <input
          v-model="input"
          placeholder="在此输入av或bv号"
          @confirm="convert"
        >
        <!--eslint-disable-next-line-->
        </input>
      </view>
      <view class="section">
        <button @click="convert">转换</button>
      </view>
      <text class="text" :decode="true">AV/BV互转小工具，可以实现相互转换。\n输入av+数字或纯数字不影响查询结果。\n如果结果为空请查看输入是否有误。</text>
    </view>
  </view>
</template>

<script>
import { enc, dec } from '../converter'
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    convert() {
      if (!this.input || this.input === '') return
      if (isNaN(Number(this.input))) {
        if (this.input.toLowerCase().startsWith('av')) {
          this.doAvConvert(this.input.toLowerCase())
        } else {
          this.doBvConvert(this.input)
        }
      } else {
        this.doAvConvert('av' + this.input)
      }
    },
    doAvConvert(value) {
      this.input = enc(value.replace('av', ''))
    },
    doBvConvert(value) {
      this.input = 'av' + dec(value)
    }
  },
  head() {
    return {
      title: 'AV/BV互转小工具'
    }
  }
}
</script>

<style>
.text {
  margin: 2px;
}

.section {
  margin: 8px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
</style>
