<template>
  <div class="setpassword">
    <div class="detail">
      <div class="detail__title">
        <h2>修改密码</h2>
      </div><!-- / detail-title -->
      <div class="detail__content">
        <p>旧密码</p>
        <cv-text-input v-model="oldPassword" type="password"></cv-text-input>

        <p>新密码</p>
        <cv-text-input v-model="newPassword" type="password"></cv-text-input>

        <p>确认密码</p>
        <cv-text-input v-model="confirm" type="password"></cv-text-input>
      </div><!-- / detail-content -->
    </div><!-- / detail -->

    <cv-button label="提交修改" :click="submit"></cv-button>
  </div><!-- / setpassword -->
</template>

<script>
  import cvTextInput from '@/components/cv-textInput.vue'
  import cvButton from '@/components/cv-button.vue'

  export default {
    components: {
      cvTextInput,
      cvButton
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
  .cv-button {
    width: 100%;
  }
</style>
