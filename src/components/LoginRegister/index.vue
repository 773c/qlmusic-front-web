<template>
  <el-dialog
    ref="logRegDialogRef"
    class="log-reg-dialog"
    :visible.sync="innerVisible"
    :width="'440px'"
    :fullscreen="device === 'mobile'?true:false"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :close-on-press-escape="false"
    @closed="setDialogVisible">
    <div slot="title" class="lr-title-icon-wrapper">
      <slot name="title">
        <svg-icon icon-class="dialog-user"></svg-icon>
      </slot>
    </div>
    <!--登录-->
    <div
      v-if="isShowLogin"
      class="log-tabs-wrapper"
      :style="device === 'mobile'?{paddingLeft:'10px'}:''"
      element-loading-background="rgba(100, 100, 100, 0.6)">
      <!--登录方式-->
      <div class="log-tabs-title" @click="AccountLogHandler">
        <slot name="log-way-one">账号登录</slot>
      </div>
      <div class="log-tabs-title" @click="VerifyLogHandler" align="center">
        <slot name="log-way-two">手机验证码</slot>
      </div>
      <!--登录内容-->
      <div class="lr-tabs-content-wrapper">
        <slot name="log-content"></slot>
      </div>
    </div>
    <!--注册-->
    <div v-else class="reg-tabs-wrapper" :style="device === 'mobile'?{paddingLeft:'10px'}:''">
      <!--注册标题-->
      <div class="reg-tabs-title">
        <slot name="reg-title">新用户注册</slot>
      </div>
      <!--注册内容-->
      <div class="lr-tabs-content-wrapper">
        <slot name="reg-content"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "loginRegister",
    props: {
      dialogVisible: {
        type: Boolean
      },
      isShowLogin: {
        type: Boolean,
        default: true
      },
      loading:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        closeDialog:true,
        title: '登录',
        isLogin: true,
      };
    },
    computed: {
      device() {
        return this.$store.state.app.device
      },
      //窗口可见
      innerVisible:{
        get(){
          if(this.closeDialog)
            return this.dialogVisible
          else
            return false
        },
        set(show){
          this.closeDialog = show
        }
      },
      //验证码样式
      verifyBtonStyle() {
        return {
          backgroundColor: '#fe0000',
          color: '#ffffff'
        }
      },
      isPassing: {
        set(value) {
          return value
        },
        get() {
          return false
        }
      },
      CountDown() {
        if (this.second === 0) {
          return "发送验证码"
        } else if (this.isSendSuccess) {
          return this.second + "s 后重新发送"
        } else {
          return "发送验证码"
        }
      },
      isShowStyle() {
        if (this.regTelephone === '')
          return ''
        else if (this.isSendSuccess === true)
          return ''
        else
          return this.verifyBtonStyle
      },
      isDisabled() {
        if (this.regTelephone === '')
          return true
        else if (this.isSendSuccess === true)
          return true
        else
          return false
      },
      logDiaLogWidth(){
        if(this.$store.state.app.device === 'mobile'){
          return '100%'
        }else {
          return '445px'
        }
      }
    },
    methods: {
      //切换账号密码登录
      AccountLogHandler() {
        this.$emit("AccountLogHandler")
      },
      //切换验证码登录
      VerifyLogHandler() {
        this.$emit("VerifyLogHandler")
      },
      //设置窗口可见（有BUG，父组件也需要设置一下）
      setDialogVisible(){
        this.closeDialog = true
        this.$emit("setDialogVisible")
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
