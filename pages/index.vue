<template>
  <div style="float: left;">
    <section>
      <div>
        <h2>AV/BV互转小工具</h2>
        <p>AV/BV互转小工具，可以实现相互转换。</p>
        <p>输入av+数字或纯数字不影响查询结果。</p>
        <p>每个IP每日可查询的次数有限，请适度使用。</p>
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
export default {
  data() {
    return {
      input: '',
      result: ''
    }
  },
  methods: {
    async convert() {
      if (isNaN(Number(this.input))) {
        if (this.input.toLowerCase().startsWith('av')) {
          await this.doAvConvert(this.input.toLowerCase())
        } else {
          await this.doBvConvert(this.input)
        }
      } else {
        await this.doAvConvert('av' + this.input)
      }
    },
    async doAvConvert(value) {
      const result = await this.$axios
        .get('/api/convert?av=' + value)
        .catch(() => {})
      if (!result) return
      this.result = result.data
    },
    async doBvConvert(value) {
      const result = await this.$axios
        .get('/api/convert?bv=' + value)
        .catch(() => {})
      if (!result) return
      this.result = result.data
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
