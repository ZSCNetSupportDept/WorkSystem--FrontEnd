<template>
  <div class="search-exp">
    <template v-for="exp in experience">
      <div class="detail">
        <div class="detail__title">
          <h2>{{ exp.title }}</h2>
        </div><!-- / detail__title -->
        <div class="detail__content">
          <p>添加人员：{{ exp.name + ' ' + exp.number }}</p>
          <p>添加时间：{{ exp.time.slice(0, 10) + ' ' + exp.time.slice(11, 16) }}</p>
          <p>经验内容：{{ exp.record }}</p>
        </div><!-- / detail__content -->
      </div><!-- / detail -->
    </template>
  </div><!-- / search-exp -->
</template>

<script>
  export default {
    mounted () {
      this.$store.dispatch('FETCH_EXP').then(data => {
        if (data.success) {
          this.experience = data.experience
        } else {
          this.$store.dispatch('openMsg', '服务器出问题了')
        }

        this.$store.dispatch('endLoading')
      })
    },
    data () {
      return {
        experience: []
      }
    }
  }
</script>

<style scoped>
  .search-exp {
    word-break: break-all;
  }
</style>
