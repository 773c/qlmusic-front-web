import {getToken, setToken, removeToken} from "@/utils/auth";
import {login, getInfo, logout} from "@/api/login";
import {qqLoginAuthSuccess} from "@/api/oauth";
import {getUserByComment} from "@/api/comment";

const user = {
  state: {
    token: getToken(),
    avatar: '',
    userInfo: {},
    userCommentInfo: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      state.avatar = userInfo.avatar
    },
    SET_USERCOMMENTINFO: (state, userCommentInfo) => {
      state.userCommentInfo = userCommentInfo
    }
  },
  actions: {
    Login({commit}, userLogin) {
      console.log(userLogin);
      return new Promise((resolve, reject) => {
        login(userLogin).then(response => {
          //获取后台数据
          const data = response.data
          //保存到cookies中
          setToken(data)
          //提交到mutations
          commit('SET_TOKEN', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QQLoginAuthSuccess({commit},codeAndState){
      return new Promise((resolve, reject) => {
        qqLoginAuthSuccess(codeAndState).then(response => {
          //获取后台数据
          const data = response.data
          //保存到cookies中
          setToken(data)
          //提交到mutations
          commit('SET_TOKEN', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({commit}, isLoadingNprogress) {
      return new Promise((resolve, reject) => {
        getInfo(isLoadingNprogress).then(response => {
          //获取后台数据data
          const data = response.data
          //提交到mutations
          commit('SET_USERINFO', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserByComment({commit}, data,musicId) {
      return new Promise((resolve, reject) => {
        getUserByComment(data, false).then(response => {
          const data = response.data
          let musicIds = []
          musicIds.push(musicId)
          data.append("musicId",)
          //提交到mutations
          commit('SET_USERCOMMENTINFO', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user

