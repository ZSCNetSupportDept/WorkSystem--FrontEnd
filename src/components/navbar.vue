<template>
  <nav>
    <div class="info">
      <h1>{{ info.name }} <span>ID: {{ info.ID }}</span></h1>
      <p>
        工作职位: {{ info.job === 'intern' ? '实习成员' : info.job === 'worker' ? '正式成员' : info.job === 'leader' ? '组长' : '科长'}}</p>
      <p>
        工作日期: {{ info.workDay === 0 ? '周一' : info.workDay === 1 ? '周二' : info.workDay === 2 ? '周三' :
        info.workDay === 3 ? '周四' : info.workDay === 4 ? '周五' : info.workDay === 5 ? '周六' : info.workDay === 6 ? '周日' : '每天'
        }}</p>
      <p>值班片区: {{ info.workPlace }}</p>
    </div><!-- / info -->
  </nav>
</template>

<script>
  import {mapState} from 'vuex'
  import NavsConfig from '../nav.conf.json'

  //  init the NavsConfig, let it can do more thing
  NavsConfig.map(item => {
    item.visible = true

    if (item.title === '权限') {
      item.limitMinGroup = 'leader'
    }

    return item
  })

  export default {
    name: 'navbar',
    data () {
      return {
        week
      }
    },
    computed: {
      info: state => state.base.info,
      isWorked: state => state.base.isWorked
    }
  }
</script>

<style scoped>

</style>
