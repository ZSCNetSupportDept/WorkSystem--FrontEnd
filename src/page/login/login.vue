<template>
  <div class="login">
    <header>
      <h1>WORK SYSTEM</h1>
    </header>

    <div class="form">
      <div class="input">
        <cv-text-input class="login-input" type="text" placeholder="UserName" v-model="username"></cv-text-input>
        <cv-text-input class="login-input" type="password" placeholder="PassWord" v-model="password"
                       :haserror="hasError"
                       :errormsg="errorMsg"></cv-text-input>
      </div><!-- / input -->

      <cv-check-box v-model="time" label="记住登录"></cv-check-box>

      <a @click="submit" href="javascript:void(0);">LogIn</a>
    </div><!-- / form -->

    <loading :loading="loading"></loading>
  </div><!-- / login -->
</template>

<script>
  import cvTextInput from '@/components/cv-textInput.vue'
  import cvCheckBox from '@/components/cv-checkBox.vue'
  import loading from '@/components/loading.vue'
  import {mapState} from 'vuex'

  export default {
    components: {
      cvTextInput,
      loading,
      cvCheckBox
    },
    mounted () {
      if (this.isLog) {
        this.$router.push({name: 'creatework'})
        return
      }

      this.$store.dispatch('FETCH_IS_LOGIN').then((token) => {
        if (this.isLog) {
          this.$router.push({name: 'creatework'})
          return
        }

        this.token = token
      })
    },
    data () {
      return {
        username: '',
        password: '',
        hasError: false,
        errorMsg: '',
        time: true,
        token: ''
      }
    },
    computed: {
      ...mapState({
        loading: state => state.base.loading,
        isLog: state => state.base.isLog
      })
    },
    methods: {
      submit () {
        let postData = {
          token: this.token,
          data: JSON.stringify({
            username: this.username,
            password: this.password,
            time: this.time
          })
        }
        this.$store.dispatch('POST_LOGIN', postData).then(data => {
          this.$store.dispatch('endLoading')
          if (data.error === '账号或密码错误') {
            this.hasError = true
            this.errorMsg = '账号或密码错误'
            return
          }

          if (data.error === '未知错误，请刷新网页，若依然无法登录，请联系管理员') {
            this.hasError = true
            this.errorMsg = '未知错误，请刷新网页，若依然无法登录，请联系管理员'
            return
          }

          this.$router.push({name: 'creatework'})
        }).catch(() => {
          this.hasError = true
          this.errorMsg = '未知错误，请刷新网页，若依然无法登录，请联系管理员'
          this.$store.dispatch('endLoading')
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 100%;
    background-color: #ececec;
  }

  .login header {
    height: 40%;
    background-color: #3091fb;
    color: #fff;
  }

  .login header h1 {
    position: relative;
    top: 50%;
    margin-top: -.5rem;
    font-size: 1.5rem;
  }

  .login .form {
    position: relative;
    top: -2.5rem;
    width: 80%;
    margin: auto auto;
    text-align: left;
  }

  .login .form .input {
    padding: .5rem;
    margin-bottom: 1rem;
    background-color: #fbfbfb;
    box-shadow: 0px 0px 25px -5px #5e5e5e;
  }

  .login a {
    display: block;
    width: 100%;
    margin-top: 1rem;
    padding: .8rem;
    color: #fff;
    background-color: #207ab8;
    text-align: center;
  }

  .login-input {
    margin: 6px auto;
  }

</style>
