<template>
  <scrollbar
    style="height: 100vh; width: 100vw;"
    wrap-style="display: flex; flex-direction: column; align-items: center;"
  >
    <div class="container" style="margin: 24px;">
      <div class="container">
        <img src="@/assets/logo.png" style="width: 100px;" />
        <h2>AV/BV互转小工具</h2>
        <section>
          <el-input
            v-model="input"
            style="float: left;"
            placeholder="在此输入av或bv号"
            @keyup.enter.native="convert"
          ></el-input>
        </section>
        <section>
          <el-button type="plain" @click="convert">转换</el-button>
          <el-button type="plain" @click="openWatch">观看</el-button>
        </section>
        <div style="margin: 10px;">
          <a href="https://github.com/dd-center/bili-av" target="_blank">
            <img
              src="https://img.shields.io/github/stars/dd-center/bili-av?color=brightgreen&style=flat-square"
            />
          </a>
        </div>
        <p>AV/BV互转小工具，可以实现相互转换。</p>
        <p>输入av+数字或纯数字不影响查询结果。</p>
        <p>程序是在本地运行算法，可以无限次使用。</p>
        <p>如果结果为空请查看输入是否有误。</p>
        <p>遇到问题请私信@Il-Harper或加QQ1302744182或加群1053354128。</p>
      </div>
    </div>
  </scrollbar>
</template>
<!--<template>
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
</template>-->

<script>
import SiderScrollbar from '@/components/scrollbar'
import { enc, dec } from '@/utils/converter'
export default {
  components: {
    scrollbar: SiderScrollbar
  },
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
      // const result = await this.$axios
      //   .get('https://av.bilisc.com/api/convert?av=' + value)
      //   .catch(() => {})
      // if (!result) return
      // this.result = result.data
      this.input = enc(value.replace('av', ''))
    },
    doBvConvert(value) {
      // const result = await this.$axios
      //   .get('https://av.bilisc.com/api/convert?bv=' + value)
      //   .catch(() => {})
      // if (!result) return
      // this.result = result.data
      this.input = 'av' + dec(value)
    },
    openWatch() {
      if (this.input === '') return
      if (!isNaN(Number(this.input))) this.input = 'av' + this.input
      window.open('https://bilibili.com/video/' + this.input, '_blank')
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
