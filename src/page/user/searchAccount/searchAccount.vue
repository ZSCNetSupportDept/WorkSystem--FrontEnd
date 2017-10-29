<template>
  <div class="search-account">
    <div class="detail">
      <div class="detail__title">
        <h2>查询条件</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <text-input v-model="account" type="text" label="账号" placeholder="账号"></text-input>

        <buttons value="查询" :click="submit"></buttons>
      </div><!-- / detail__content -->
    </div><!-- / detail -->

    <div class="detail" :class="{ active: isActive }">
      <div class="detail__title">
        <h2>查询结果</h2>
      </div><!-- / detail__title -->
      <div class="detail__content">
        <p>{{ searchedAccount }}的余额为{{ balance }}元</p>
      </div><!-- / detail__content -->
    </div><!-- / detail -->
  </div><!-- / search-work -->
</template>

<script>
  import textInput from '../../../components/textInput.vue'
  import buttons from '../../../components/button.vue'

  export default {
    name: 'search-account',
    components: {
      'textInput': textInput,
      'buttons': buttons
    },
    data () {
      return {
        account: '',
        searchedAccount: '',
        balance: '0',
        isActive: false
      }
    },
    methods: {
      submit () {
        console.log('http://util.sola.love/yue?id=' + this.account + '@zsdzkd')
        fetch('http://util.sola.love/yue?id=' + this.account + '@zsdzkd', {
          method: 'GET',
          //          header: {
          //            'Access-Control-Allow-Origin': '*'
          //            'Content-Type': 'application/json;charset=utf-8'
          //            'Content-Type': 'text/plain'
          //          },
          mode: 'cors'
        }).then(data => {
          console.log(data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
