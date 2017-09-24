<template>
  <div class="detail add-exp">
    <div class="detail__content">
      <text-input v-model="ExpTitle" type="text" placeholder="标题"></text-input>
      <text-input v-model="Exp" type="text" placeholder="内容"></text-input>

      <buttons value="提交" :click="submit"></buttons>
    </div><!-- / detail__content -->
  </div><!-- / detail -->
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
        Exp: '',
        ExpTitle: ''
      }
    },
    methods: {
      submit () {
        if (this.Exp.length === 0) {
          this.$store.dispatch('openMsg', '请填写经验内容')
          return
        }

        let postData = JSON.stringify({
          title: this.ExpTitle,
          experience: this.Exp
        })
        this.$store.dispatch('POST_ADD_EXP', postData).then(data => {
          if (data.success) {
            this.Exp = ''
            this.ExpTitle = ''
            this.$store.dispatch('openMsg', '提交成功')
          } else {
            this.$store.dispatch('openMsg', '提交失败')
          }

          this.$store.dispatch('endLoading')
        })
      }
    }
  }
</script>

<style scoped>

</style>
