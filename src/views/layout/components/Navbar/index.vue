<template>
  <common-navbar :isUserFormat="isUserFormat">
    <template #logo>
      <a id="nav-logo" href="/"><img class="img-logo" src="@/assets/images/flogo2.png" width="75"></a>
    </template>
    <template #one>
      <router-link class="nav-router-link" to="/home">
        <el-menu-item index="/home">
          <span>黑怕空间</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #two>
      <router-link class="nav-router-link" to="/expectation">
        <el-menu-item index="/expectation"><!--/nav/download-->
          <span>下载</span>
        </el-menu-item>
      </router-link>
    </template>
    <template #three>
      <router-link class="nav-router-link" to="/expectation">
        <el-menu-item index="/expectation"> <!--/nav/question-->
          <span>论坛</span>
        </el-menu-item>
      </router-link>
    </template>
    <!--发布中心按钮-->
    <template #after-one>
      <div v-if="!isMobile" class="home-release-button-wrapper" @click="clickForward('/manage/home',false)">
        <el-button class="home-release-button" type="danger">
          <i class="el-icon-thumb"></i> 发布歌曲
        </el-button>
      </div>
    </template>
    <!--收藏-->
    <template #after-two>
      <el-tooltip v-if="!isMobile" class="item" effect="light" content="我的收藏" placement="bottom-start">
        <div class="collect-container">
          <!--<router-link target="_blank" to="/usr/collect">-->
          <div class="collect-wrapper" @click="clickForward('/usr/collect',false)">
            <svg-icon class="svg-collect" icon-class="nav-collect" style="width: 24px"></svg-icon>
          </div>
          <!--</router-link>-->
        </div>
      </el-tooltip>
    </template>
    <!--消息-->
    <template #after-three>
      <el-dropdown class="info-container" placement="top">
        <div class="info-wrapper">
          <el-badge :value="msgCount" :hidden="!isNewMsg" class="item">
            <div class="svg-info-wrapper">
              <svg-icon class="svg-info" icon-class="nav-info" style="width: 18px"></svg-icon>
            </div>
          </el-badge>
        </div>
        <el-dropdown-menu class="info-dropdown" slot="dropdown" style="width: 110px;text-align: center">
          <router-link to="/">
            <el-dropdown-item>
              点赞
            </el-dropdown-item>
          </router-link>
          <!--<div @click="clickForward('/msg/comment',false)">-->
          <router-link :to="{path:'/msg/comment',query:{noSeeMsgIdStr:noSeeMsgIdStr}}">
            <el-dropdown-item>
              评论 <span v-show="isNewMsg" class="info-route" style="color: #fe0000;">+{{msgCount}}</span>
            </el-dropdown-item>
          </router-link>
          <!--</div>-->
          <router-link to="/">
            <el-dropdown-item>
              关注
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              私信
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              问答
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              系统通知
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              消息设置
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <!--用户信息-->
    <template #user>
      <div v-if="!isLogin" id="no-login-btn" class="login-container" @click="dialogVisible = true">
        登录
      </div>
      <login-register
        :dialogVisible="dialogVisible"
        :isShowLogin="isShowLogin"
        @resetAll="resetAll"
        @setDialogVisible="setDialogVisible"
        @AccountLogHandler="isShowAccPwdLogin = true"
        @VerifyLogHandler="isShowAccPwdLogin = false">
        <template #log-content>
          <!--账号密码登录页面-->
          <log-telephone-password
            v-if="isShowAccPwdLogin"
            ref="logTelephonePasswordRef"
            @setDialogVisible="setDialogVisible"
            @regClickHandler="isShowLogin = false">
          </log-telephone-password>
          <!--手机号验证码登录页面-->
          <log-telephone
            v-else
            ref="logTelephoneRef"
            @setDialogVisible="setDialogVisible"
            @regClickHandler="isShowLogin = false">
          </log-telephone>
        </template>
        <template #reg-content>
          <reg-telephone
            ref="regTelephoneRef"
            @returnLogClick="isShowLogin = true"
            @setDialogVisible="setDialogVisible">
          </reg-telephone>
        </template>
      </login-register>
      <div v-if="isLogin">
        <el-dropdown class="avatar-container">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="userInfo.avatar">
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown" style="width: 126px">
            <div @click="clickForward('/usr/personal',false)">
              <el-dropdown-item>
                <i class="el-icon-user"></i>个人中心
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/usr/collect',false)">
              <el-dropdown-item>
                <i class="el-icon-star-off"></i>我的收藏
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/',false)">
              <el-dropdown-item>
                <i class="el-icon-circle-plus-outline"></i>我的关注
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/usr/set',false)">
              <el-dropdown-item>
                <i class="el-icon-setting"></i>账号设置
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/'+userInfo.uniqueId,true)">
              <el-dropdown-item divided>
                <i class="el-icon-service"></i>我的空间
              </el-dropdown-item>
            </div>
            <div @click="clickForward('/manage/home',false)">
              <el-dropdown-item>
                <i class="el-icon-aim"></i>管理空间
              </el-dropdown-item>
            </div>
            <div @click="clickForward('',false)">
              <el-dropdown-item>
                <i class="el-icon-download"></i>我的下载
              </el-dropdown-item>
            </div>
            <el-dropdown-item divided>
              <div @click="logoutHandler"><i class="el-icon-switch-button"></i>退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </template>
  </common-navbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoginRegister from '@/components/LoginRegister'
  import LogTelephonePassword from './components/LogTelephonePassword'
  import LogTelephone from './components/LogTelephone'
  import RegTelephone from './components/RegTelephone'
  import SetPassword from './components/RegTelephone/SetPassword'
  import CommonNavbar from '@/components/Navbar'
  import {getToken} from "@/utils/auth";
  import {getAddr} from "@/api/addr";
  import {noSeeMsgCommentCount} from "@/api/comment";

  export default {
    name: "navbar",
    components: {
      LoginRegister,
      LogTelephonePassword,
      LogTelephone,
      RegTelephone,
      SetPassword,
      CommonNavbar
    },
    props: {
      isUserFormat: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        title: '登录',
        dialogVisible: false,
        isShowAccPwdLogin: true,
        isShowLogin: true,
        addrInfo: '',
        isNewMsg:false,
        noSeeMsgIdStr:'',
        msgLikeCount:0,
        msgCommentCount:0,
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ]),
      isLogin() {
        if (this.$store.state.user.token) return true;
        else return false;
      },
      device() {
        return this.$store.state.app.device
      },
      isMobile() {
        if (this.device === 'mobile') return true
        else return false
      },
      msgCount(){
        return this.msgLikeCount + this.msgCommentCount
      }
    },
    watch:{
    },
    methods: {
      setDialogVisible() {
        this.dialogVisible = false
        this.resetAll()
      },
      logoutHandler() {
        const load = this.$loading({
          lock: true,
          background: 'rgba(0, 0, 0, 0.1)'
        });
        this.$store.dispatch('Logout').then(() => {
          this.closeWebSocket()
          location.reload()
        }).catch(() => {
          load.close()
        })
      },
      clickForward(path, flag) {
        if (this.userInfo.id === undefined || this.userInfo.id === '' || this.userInfo.id === null) {
          document.getElementById("no-login-btn").click()
        } else {
          let routeUrl = null
          if (flag) {
            routeUrl = this.$router.resolve({
              path: path,
              query: {uid: this.userInfo.id}
            })
          } else {
            routeUrl = this.$router.resolve({
              path: path
            })
          }
          if (this.$route.meta.isLevel === routeUrl.resolved.meta.isLevel) {
            window.open(routeUrl.href, '_self');
          } else {
            window.open(routeUrl.href, '_blank');
          }
        }
      },
      //重置所有文本框内容和其他判断
      resetAll() {
        if (this.isShowLogin && this.isShowAccPwdLogin) {
          //账号密码登录重置
          this.$refs.logTelephonePasswordRef.logTelPwdReset()
        } else {
          this.isShowLogin = true
        }
      },
      //获取用户未查看的消息
      getNoSeeMsgCommentCount(){
        noSeeMsgCommentCount(this.userInfo.id,false).then(response => {
          let data = response.data
          if(data.length !== 0){
            data.forEach((item,index) => {
              this.noSeeMsgIdStr += item +':'
            })
            this.msgCommentCount = data.length
            this.isNewMsg = true
          }
        })
      },
      initWebSocket() {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage
        // 连接成功
        this.websocket.onopen = this.setOnopenMessage
        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage
        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage
        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      //连接失败状态
      setErrorMessage() {
        // console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      //连接成功状态
      setOnopenMessage() {
        // console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      //服务端返回消息
      setOnmessageMessage(response) {
        // 根据服务器推送的消息做自己的业务处理
        this.$notify({
          title: '提示',
          message: response.data
        });
        this.getNoSeeMsgCommentCount()
      },
      //连接关闭状态
      setOncloseMessage() {
        // console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      //关闭websocket
      onbeforeunload() {
        this.closeWebSocket()
      },
      //关闭websocket
      closeWebSocket() {
        this.websocket.close()
      }
    },
    created(){
      //获取用户未查看的消息
      if(this.userInfo !== undefined || this.userInfo !== '' || this.userInfo !== null){
        this.getNoSeeMsgCommentCount()
      }
    },
    mounted(){
      if(this.isLogin){
        if ('WebSocket' in window) {
          this.websocket = new WebSocket('ws://localhost:8001/connectWebSocket/' + this.userInfo.id)
          this.initWebSocket()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
