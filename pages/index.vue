<template>
  <div style="float: left;">
    <section>
      <div>
        <h2>AV/BV互转小工具</h2>
        <p>AV/BV互转小工具，可以实现相互转换。</p>
        <p>输入av+数字或纯数字不影响查询结果。</p>
        <p>程序是在本地运行算法，可以无限次使用。</p>
        <p>如果结果为空请查看输入是否有误。</p>
        <p>遇到问题请私信@Il-Harper或加QQ1302744182或加群1053354128。</p>
      </div>
    </section>
    <section>
      <el-input
        v-model="input"
        style="float: left;"
        @keyup.enter.native="convert"
      ></el-input>
    </section>
    <section>
      <el-button type="primary" @click="convert">查询</el-button>
    </section>
    <section>
      <p>结果：{{ result }}</p>
    </section>
  </div>
</template>

<script>
import { enc, dec } from '@/utils/converter'
export default {
  data() {
    return {
      input: '',
      result: ''
    }
  },
  methods: {
    convert() {
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
      // const result = await this.$axios
      //   .get('https://av.bilisc.com/api/convert?av=' + value)
      //   .catch(() => {})
      // if (!result) return
      // this.result = result.data
      this.result = enc(value.replace('av', ''))
    },
    doBvConvert(value) {
      // const result = await this.$axios
      //   .get('https://av.bilisc.com/api/convert?bv=' + value)
      //   .catch(() => {})
      // if (!result) return
      // this.result = result.data
      this.result = dec(value)
    }
  },
  head() {
    return {
      title: 'AV/BV互转小工具'
    }
  }
}
</script>

<style></style>
