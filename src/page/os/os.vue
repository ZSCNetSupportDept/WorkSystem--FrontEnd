<template>
  <div class="index">
    <div>
      <header>
        <h1>Dashboad</h1>
      </header>
      <main>
        <article class="sys">
          <p>
            System Info:&nbsp;&nbsp;{{ system.system + '&nbsp;&nbsp;&nbsp;' + system.architecture + '&nbsp;&nbsp;&nbsp;' + system.kernel
            }}</p>
        </article>
        <article class="block cpu">
          <header>
            <h1>CPU</h1>
          </header>
          <main>
            <chart :options="cpuPie"></chart>
          </main>
          <footer>
            <p>CPU Counts: {{ now.cpu }}</p>
          </footer>
        </article>
        <article class="block swap">
          <header>
            <h1>SWAP</h1>
          </header>
          <main>
            <chart :options="swapPie"></chart>
          </main>
          <footer>
            <p>SWAP Total: {{ now.swap_total }}m</p>
          </footer>
        </article>
        <article class="block memory">
          <header>
            <h1>MEMORY</h1>
          </header>
          <main>
            <chart :options="memoryPie"></chart>
          </main>
          <footer>
            <p>MEMORY Total: {{ now.memory_total }}m</p>
          </footer>
        </article>
        <article class="block disk">
          <header>
            <h1>DISK</h1>
          </header>
          <main>
            <chart :options="diskPie"></chart>
          </main>
          <footer>
            <p>DISK Total: {{ now.disk[0].disk_total }}m</p>
          </footer>
        </article>
        <article class="block net">
          <header>
            <h1>NET</h1>
          </header>
          <main>
            <chart :options="netPie"></chart>
          </main>
          <footer>
            <p>NET: {{ now.net_recv > now.net_sent ? now.net_recv + 'm ↓' : now.net_sent + 'm ↑' }}</p>
          </footer>
        </article>
        <article class="block pid">
          <header>PID</header>
          <main>
            <table>
              <thead>
              <tr>
                <th>pid</th>
                <th>name</th>
                <th>status</th>
                <th>memory</th>
                <th>handle</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="pid in now.pid">
                <td>{{ pid.pid }}</td>
                <td>{{ pid.name }}</td>
                <td>{{ pid.status }}</td>
                <td>{{ pid.memory }}</td>
                <td><a @click="deleted(pid.pid)">X</a></td>
              </tr>
              </tbody>
            </table>
          </main>
        </article>
      </main>
      <div class="block confirm1" :class="{ active: isConfirm }">
        <header>
          <h1>Confirm</h1>
        </header>
        <main>
          <p>你确认要结束pid为{{ nowPid }}的进程或者进程树吗？</p>
        </main>
        <footer>
          <a @click="kill(false)" href="javascript:void(0)">结束进程</a>
          <a @click="kill(true)" href="javascript:void(0)">结束进程树</a>
          <a @click="cancle" href="javascript:void(0)">取消</a>
        </footer>
      </div>
    </div>
    <div class="shadow1" :class="{ active: isShadow }" @click="cancle"></div>
    <div :class="{ loading: isLoading }" class="load">
      <div>
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ5NiA0OTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5NiA0OTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM5QjlCOUI7IiBkPSJNMjU2LDQ3OC4zYzAsNC44LTMuMiw4LjgtOCw4LjhsMCwwYy00LjgsMC04LTQtOC04LjhWMzQxLjVjMC00LjgsMy4yLTguOCw4LTguOGwwLDBjNC44LDAsOCw0LDgsOC44DQoJVjQ3OC4zeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0Q2RDZENjsiIGQ9Ik00OTYsMjM5LjljMCw0LjgtMy4yLDgtOCw4SDM1MmMtNC44LDAtOC0zLjItOC04bDAsMGMwLTQuOCwzLjItOCw4LThoMTM2DQoJQzQ5Mi44LDIzMS45LDQ5NiwyMzUuMSw0OTYsMjM5LjlMNDk2LDIzOS45eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzUxNTE1MTsiIGQ9Ik0xNTIsMjM5LjljMCw0LjgtMy4yLDgtOCw4SDhjLTQuOCwwLTgtMy4yLTgtOGwwLDBjMC00LjgsMy4yLTgsOC04aDEzNg0KCUMxNDguOCwyMzEuOSwxNTIsMjM1LjEsMTUyLDIzOS45TDE1MiwyMzkuOXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNFREVERUQ7IiBkPSJNMzI2LjQsMTcyLjdjLTMuMiwzLjItOC44LDMuMi0xMiwwbDAsMGMtMy4yLTMuMi0zLjItOC44LDAtMTJsOTYuOC05Ni44YzMuMi0zLjIsOC44LTMuMiwxMiwwbDAsMA0KCWMzLjIsMy4yLDMuMiw4LjgsMCwxMkwzMjYuNCwxNzIuN3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM3QTdBN0E7IiBkPSJNODQuOCw0MTQuM2MtMy4yLDMuMi04LjgsMy4yLTEyLDBsMCwwYy0zLjItMy4yLTMuMi04LjgsMC0xMmw5Ni44LTk2LjhjMy4yLTMuMiw4LjgtMy4yLDEyLDBsMCwwDQoJYzMuMiwzLjIsMy4yLDguOCwwLDEyTDg0LjgsNDE0LjN6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQkZCRkJGOyIgZD0iTTMxNC40LDMxNy41Yy0zLjItMy4yLTMuMi04LjgsMC0xMmwwLDBjMy4yLTMuMiw4LjgtMy4yLDEyLDBsOTYuOCw5Ni44YzMuMiwzLjIsMy4yLDguOCwwLDEybDAsMA0KCWMtMy4yLDMuMi04LjgsMy4yLTEyLDBMMzE0LjQsMzE3LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMkIyQjJCOyIgZD0iTTcyLjgsNzUuMWMtMy4yLTMuMi0zLjItOCwwLTExLjJsMCwwYzMuMi0zLjIsOC44LTMuMiwxMiwwbDk2LjgsOTYuOGMzLjIsMy4yLDMuMiw4LjgsMCwxMmwwLDANCgljLTMuMiwzLjItOC44LDMuMi0xMiwwTDcyLjgsNzUuMXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGNEY0RjQ7IiBkPSJNMjk1LjIsMTQ3LjFjLTIuNCw0LjgtNy4yLDYuNC0xMS4yLDQuOGwwLDBjLTQtMS42LTYuNC02LjQtNC44LTExLjJsNTItMTI2LjQNCgljMS42LTQsNi40LTYuNCwxMS4yLTQuOGwwLDBjNCwxLjYsNi40LDYuNCw0LjgsMTEuMkwyOTUuMiwxNDcuMXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiM4OTg5ODk7IiBkPSJNMTY0LjgsNDYzLjljLTEuNiw0LTYuNCw2LjQtMTEuMiw0LjhsMCwwYy00LTEuNi02LjQtNi40LTQuOC0xMS4ybDUyLTEyNi40YzEuNi00LDYuNC02LjQsMTEuMi00LjgNCglsMCwwYzQsMS42LDYuNCw2LjQsNC44LDExLjJMMTY0LjgsNDYzLjl6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQ0NDQ0NDOyIgZD0iTTM0MCwyODUuNWMtNC0xLjYtNi40LTYuNC00LjgtMTEuMmwwLDBjMS42LTQsNi40LTYuNCwxMS4yLTQuOGwxMjYuNCw1MmM0LDEuNiw2LjQsNi40LDQuOCwxMS4ybDAsMA0KCWMtMS42LDQtNi40LDYuNC0xMS4yLDQuOEwzNDAsMjg1LjV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0YzRjNGOyIgZD0iTTIzLjIsMTU1LjFjLTQtMS42LTYuNC02LjQtNC44LTExLjJsMCwwYzEuNi00LDYuNC02LjQsMTEuMi00LjhMMTU2LDE5MS45YzQsMS42LDYuNCw2LjQsNC44LDExLjINCglsMCwwYy0xLjYsNC02LjQsNi40LTExLjIsNC44TDIzLjIsMTU1LjF6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRTJFMkUyOyIgZD0iTTM0NS42LDIwNy4xYy00LDEuNi04LjgsMC0xMS4yLTQuOGwwLDBjLTEuNi00LDAtOS42LDQuOC0xMS4ybDEyNi40LTUyLjhjNC0xLjYsOS42LDAsMTEuMiw0LjhsMCwwDQoJYzEuNiw0LDAsOS42LTQuOCwxMS4yTDM0NS42LDIwNy4xeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzZENkQ2RDsiIGQ9Ik0zMC40LDMzOS4xYy00LDEuNi05LjYsMC0xMS4yLTQuOGwwLDBjLTEuNi00LDAtOS42LDQuOC0xMS4ybDEyNi40LTUyLjhjNC0xLjYsOC44LDAsMTEuMiw0LjhsMCwwDQoJYzEuNiw0LDAsOS42LTQuOCwxMS4yTDMwLjQsMzM5LjF6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojQURBREFEOyIgZD0iTTI4MCwzMzYuN2MtMS42LTQsMC04LjgsNC44LTExLjJsMCwwYzQtMS42LDkuNiwwLDExLjIsNC44bDUyLjgsMTI2LjRjMS42LDQsMCw5LjYtNC44LDExLjJsMCwwDQoJYy00LDEuNi05LjYsMC0xMS4yLTQuOEwyODAsMzM2Ljd6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMEMwQzBDOyIgZD0iTTE0OCwyMC43Yy0xLjYtNCwwLTkuNiw0LjgtMTEuMmwwLDBjNC0xLjYsOS42LDAsMTEuMiw0LjhsNTIsMTI2LjRjMS42LDQsMCw5LjYtNC44LDExLjJsMCwwDQoJYy00LDEuNi05LjYsMC0xMS4yLTQuOEwxNDgsMjAuN3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K">
      </div>
    </div><!-- / load -->
    <div class="tip1" :class="{ active:isTip }">
      <p>{{ tip }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    mounted () {
      document.title = '监控'

      this.isLoading = true
      fetch('os/is_login', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(json => {
        this.token = json.csrf_token
      })

      fetch('/os/system/', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(json => {
        if (json.error) {
          this.tip = json.error
          this.isLoading = false
          this.isShadow = false
          this.isConfirm = false
          this.isTip = true
          setTimeout(() => {
            this.isTip = false
          }, 3000)
          return
        }
        this.system = json.system
      })

      fetch('/os/now/', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(json => {
        if (json.error) {
          this.tip = json.error
          this.isLoading = false
          this.isShadow = false
          this.isConfirm = false
          this.isTip = true
          setTimeout(() => {
            this.isTip = false
          }, 3000)
          return
        }
        this.now = json.now
        isSend = false
        this.isLoading = false
      }).catch(() => {
        isSend = false
        this.isLoading = false
      })
      let isSend = false
      setInterval(() => {
        if (!isSend) {
          isSend = true
          fetch('/os/now/', {
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(response => {
            return response.json()
          }).then(json => {
            if (json.error) {
              this.tip = json.error
              this.isLoading = false
              this.isShadow = false
              this.isConfirm = false
              this.isTip = true
              setTimeout(() => {
                this.isTip = false
              }, 3000)
              return
            }
            this.now = json.now
            isSend = false
          }).catch(() => {
            isSend = false
          })
        }
      }, 3000)
    },
    data () {
      return {
        system: {
          architecture: 'x86_64',
          system: 'Linux',
          kernel: '4.4.0-63-generic'
        },
        now: {
          cpu: 0,
          cpu_use: 0,
          disk: [{
            disk_percent: 0,
            disk_total: 0,
            disk_used: 0
          }],
          memory_percent: 0,
          memory_total: 0,
          memory_used: 0,
          net_recv: 0,
          net_sent: 0,
          pid: [],
          swap_free: 0,
          swap_percent: 0,
          swap_total: 0
        },
        nowPid: 0,
        isConfirm: false,
        isShadow: false,
        isLoading: false,
        token: '',
        tip: '',
        isTip: false
      }
    },
    computed: {
      swapPie () {
        return {
          color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: '{b}<br/>{c}m ({d}%)',
            padding: [10, 30]
          },
          series: [
            {
              name: 'swap',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: this.now.swap_total - this.now.swap_free, name: '已使用'},
                {value: this.now.swap_free, name: '未使用'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          animationDuration: 1000
        }
      },
      memoryPie () {
        return {
          color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: '{b}<br/>{c}m ({d}%)',
            padding: [10, 30]
          },
          series: [
            {
              name: 'memory',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: this.now.memory_used, name: '已使用'},
                {value: this.now.memory_total - this.now.memory_used, name: '未使用'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          animationDuration: 1000
        }
      },
      diskPie () {
        return {
          color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: '{b}<br/>{c}m ({d}%)',
            padding: [10, 30]
          },
          series: [
            {
              name: 'disk',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: this.now.disk[0].disk_used, name: '已使用'},
                {value: this.now.disk[0].disk_total - this.now.disk[0].disk_used, name: '未使用'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          animationDuration: 1000
        }
      },
      netPie () {
        return {
          color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: '{b}<br/>{c}m ({d}%)',
            padding: [10, 30]
          },
          series: [
            {
              name: 'net',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: this.now.net_recv, name: '已接收'},
                {value: this.now.net_sent, name: '已发送'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          animationDuration: 1000
        }
      },
      cpuPie () {
        return {
          color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: '{b}<br/>{d}%',
            padding: [10, 30]
          },
          series: [
            {
              name: 'cpu',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: this.now.cpu_use, name: '已使用'},
                {value: 100 - this.now.cpu_use, name: '未使用'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          animationDuration: 1000
        }
      }
    },
    methods: {
      deleted (pid) {
        this.nowPid = pid
        this.isShadow = true
        this.isConfirm = true
      },
      cancle () {
        if (this.isLoading) {
          return
        }
        this.isConfirm = false
        this.isShadow = false
      },
      kill (select) {
        this.isLoading = true
        let token = this.getCookie('csrftoken')
        fetch('os/kill/', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': this.token || token
          },
          body: JSON.stringify({
            pid: this.nowPid,
            select: select
          })
        }).then(response => {
          return response.json()
        }).then(json => {
          if (json.error) {
            this.tip = json.error
            this.isLoading = false
            this.isShadow = false
            this.isConfirm = false
            this.isTip = true
            setTimeout(() => {
              this.isTip = false
            }, 3000)
            return
          }
          this.tip = '操作成功'
          this.isTip = true
          this.isShadow = false
          this.isConfirm = false
          setTimeout(() => {
            this.isTip = false
          }, 3000)
          this.now = json.now
          this.token = ''
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      }
    }
  }
</script>

<style scoped>
  /*html, body {*/
  /*height: auto;*/
  /*}*/

  /*#app {*/
  /*width: auto;*/
  /*height: auto;*/
  /*}*/

  /*::-webkit-scrollbar {*/
  /*display: block;*/
  /*}*/

  /*body {*/
  /*background-color: #54364a;*/
  /*background-size: cover;*/
  /*background-image: url("../assets/images/a.jpg");*/
  /*}*/

  .index {
    position: absolute;
    width: 100%;
    background-color: #54364a;
    /*background-image: url("../assets/images/a.jpg");*/
    background-size: cover;
  }

  .index > div {
    width: 1100px;
    margin: 0 auto;
    padding-top: 20px;
    color: #fff;
  }

  .index > div > header h1 {
    font-size: 30px;
    font-weight: 500;
    text-align: center;
  }

  .index > div > main {
    padding-top: 10px;
  }

  .block header {
    background-color: rgba(0, 0, 0, 0.3);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    padding: 10px 10px;
  }

  .block main {
    background-color: rgba(0, 0, 0, 0.4);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    font-weight: 300;
    padding: 10px;
  }

  .block footer {
    background: rgba(0, 0, 0, 0.3);
    display: inline-block;
    font-weight: normal;
    padding: 15px;
    width: 100%;
  }

  .sys {
    margin-bottom: 20px;
  }

  .cpu, .swap, .memory {
    display: inline-block;
    width: 33%;
    margin-bottom: 20px;
  }

  .disk, .net {
    display: inline-block;
    width: 49%;
    margin-bottom: 20px;
  }

  .pid {
    margin-bottom: 20px;
  }

  .pid table {
    width: 100%;
    background-color: transparent;
    border-collapse: collapse;
  }

  td, th {
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .pid a {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.428571429;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid #d43f3a;
    border-radius: 4px;
    user-select: none;
    color: #ffffff;
    background-color: rgba(217, 83, 79, 0.55);
  }

  .confirm1 {
    position: fixed;
    top: 50%;
    left: 50%;
    display: none;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .confirm1.active {
    display: block;
  }

  .confirm1 header {
    background-color: #61a0a8;
  }

  .confirm1 main {
    padding: 30px;
    background-color: #d48265;
  }

  .confirm1 footer {
    padding: 0;
    background-color: #6e7074;
  }

  .confirm1 footer a {
    display: inline-block;
    padding: 10px;
    width: 32%;
    color: #fff;
  }

  .confirm1 footer a:first-child {
    border-right: 1px solid #7e8c8d;
  }

  .confirm1 footer a:last-child {
    border-left: 1px solid #7e8c8d;
  }

  .shadow1 {
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1;
  }

  .tip1 {
    position: fixed;
    top: 50%;
    left: 50%;
    display: none;
    padding: 30px;
    transform: translate(-50%, -50%);
    background-color: #61a0a8;
    z-index: 2;
  }

  .tip1.active {
    display: block;
  }

  .shadow1.active {
    display: block;
  }

  .echarts {
    width: 100% !important;
    height: 300px !important;
  }

  .echarts div:first-child {
    width: 100% !important;
  }

  /*.echarts canvas {*/
  /*width: 100%!important;*/
  /*}*/

</style>
