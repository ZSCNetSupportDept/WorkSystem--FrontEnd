<template>
  <div class="detail add-exp">
    <div class="detail__content">
      <cv-text-input v-model="ExpTitle" type="text" placeholder="标题"></cv-text-input>
      <cv-text-input v-model="Exp" type="text" placeholder="内容"></cv-text-input>

      <cv-button label="提交" :click="submit"></cv-button>
    </div><!-- / detail__content -->
  </div><!-- / detail -->
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
