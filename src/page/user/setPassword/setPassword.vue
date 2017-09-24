<template>
  <div class="setpassword">
    <div class="detail">
      <div class="detail-title">
        <h2>修改密码</h2>
      </div><!-- / detail-title -->
      <div class="detail-content">
        <text-input v-model="oldPassword" label="旧密码" type="password"></text-input>

        <text-input v-model="newPassword" label="新密码" type="password"></text-input>

        <text-input v-model="confirm" label="确认密码" type="password"></text-input>
      </div><!-- / detail-content -->
    </div><!-- / detail -->

    <buttons value="提交修改" :click="submit"></buttons>
  </div><!-- / setpassword -->
</template>

<script>
  import textInput from '../../../components/textInput.vue'
  import buttons from '../../../components/button.vue'

  export default {
    components: {
      'textInput': textInput,
      'buttons': buttons
    },
    data () {
      return {
        oldPassword: '',
        newPassword: '',
        confirm: ''
      }
    },
    methods: {
      submit () {
        if (this.oldPassword.length === 0 || this.newPassword.length === 0) {
          this.$store.dispatch('openMsg', '密码为空')
          return
        }
        if (this.oldPassword === this.newPassword) {
          this.$store.dispatch('openMsg', '新旧密码一致')
          return
        }
        if (this.confirm !== this.newPassword) {
          this.$store.dispatch('openMsg', '两次密码不一致')
          return
        }

        let postData = JSON.stringify({
          old_password: this.oldPassword,
          new_password: this.newPassword
        })
        this.$store.dispatch('POST_SET_PASSWORD', postData)
      }
    }
  }
</script>

<style scoped>

</style>
