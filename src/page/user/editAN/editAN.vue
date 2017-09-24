<!-- / 编辑公告页面 -->

<template>
  <div class="editan">
    <div class="detail">
      <div class="detail__title">
        <h2>编辑公告</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <text-input v-model="newAN" type="text"></text-input>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <buttons value="提交修改" :click="submit"></buttons>
  </div><!-- / editan -->
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
        newAN: ''
      }
    },
    methods: {
      submit () {
        if (this.newAN.length === 0) {
          this.$store.dispatch('openMsg', '未填信息')
          return
        }

        let postData = JSON.stringify({
          content: this.newAN
        })
        this.$store.dispatch('POST_EDIT_AN', postData).then(data => {
          if (data.error) {
            this.$store.dispatch('openMsg', '服务器好像出了点问题，请重试，若依然这样，请联系管理员')
          } else if (data.success) {
            this.newAN = ''
            this.$store.dispatch('openMsg', '提交成功')
          } else {
            this.$store.dispatch('openMsg', '未知错误，请刷新页面重试，若未解决，请联系管理员')
          }

          this.$store.dispatch('endLoading')
        })
      }

    }
  }
</script>

<style scoped>

</style>
