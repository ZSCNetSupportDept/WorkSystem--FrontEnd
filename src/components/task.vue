<template>
  <div class="task detail" @click="dosth(task.id)">
    <div class="detail__title"
         v-bind:class="{
         ok: task.repairStatus==1,
         no: task.repairStatus==0,
         commited: task.repairStatus==3,
         lasted: task.repairStatus==2
         }">
      <h2>
        #{{ task.id + ' ' + (task.repairStatus === 0 ? '未解决' : task.repairStatus === 1 ? '已解决'
        : task.repairStatus === 2 ? '推迟' : '已上报')
        }}</h2>
    </div><!-- / detail__title -->
    <div class="detail__content">
      <p>
        任务性质：{{ task.taskProperty === 0 ? '普通任务' : task.taskProperty === 1 ? '工单任务' : task.taskProperty === 2 ? '新装任务' : '投诉任务'
        }}</p>
      <p>添加时间：{{ task.addTime.slice(0, 10) + ' ' + task.addTime.slice(11, 16) }}</p>
      <p>最后修改时间：{{ task.lastChangeTime.slice(0, 10) + ' ' + task.lastChangeTime.slice(11, 16) }}</p>
      <p>宿舍：{{ task.userPlace + ' ' + task.userHouse }}</p>
      <p>联系方式：{{ task.userPhone }}</p>
      <p>运营商信息：{{ task.netInfo + (task.netAccount ? ('(' + task.netAccount + ')') : '') }}</p>
      <p>维修简介：{{ task.repairIntro }}</p>
    </div><!-- / detail__content -->
  </div><!-- / task -->
</template>

<script>
  export default {
    name: 'task',
    props: ['task'],
    methods: {
      dosth (value) {
        this.$emit('dosth', value)
      }
    }
  }
</script>

<style scoped>
  .task .detail-title {
    padding-left: .8rem;
  }

  .task .detail-content {
    padding-top: .2rem;
    padding-bottom: .2rem;
  }

  .ok {
    border-left: .2rem solid #79e857;
  }

  .no {
    border-left: .2rem solid #e85f00;
  }

  .commited {
    border-left: .2rem solid #e8e53a;
  }

  .lasted {
    border-left: .2rem solid #377ee8;
  }

  .task p {
    margin: .5rem auto;
  }
</style>
