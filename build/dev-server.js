require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

app.use(bodyParser.json())

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

let isLogin = false
app.get('/work/is_login', function (req, res) {
  if (isLogin) {
    res.json({
      'success': 'success',
      'check': true,
      'work_orders': {'unicom': 0, 'complaints': 0, 'mobile': 0, 'telecom': 0},
      'announcement': '2017\u5e746\u670816\u65e5\uff08\u5468\u4e94\uff09\u5f00\u59cb\u505c\u503c.',
      'is_login': true,
      'csrf_token': 'EnnrEwRSkBLt170tuwPRBlzBxrPJjUpmVJSNYhG0EtSnmctq2N2fEo1HqWPQn2g4',
      'place': '\u5c90\u5934',
      'user': {
        'ID': '1547',
        'work_phone': '00000000000',
        'workDay': 0,
        'workPlace': '\u5c90\u5934',
        'name': '\u6587\u6653\u65b0',
        'job': 'leader'
      },
      'works': [{
        'work_number': '1547',
        'name': '\u6587\u6653\u65b0',
        'person_phone': '13727918566',
        'area': '\u5c90\u5934',
        'work_phone': '00000000000'
      }, {
        'work_number': '1407',
        'name': '\u5f90\u96c6\u6db5',
        'person_phone': '13005521372',
        'area': '\u51e4\u7fd4',
        'work_phone': '18928187452'
      }, {
        'work_number': '1620',
        'name': '\u9ec4\u81f4\u6770',
        'person_phone': '18688270411',
        'area': '\u9999\u6656\u82d1',
        'work_phone': '0'
      }, {
        'work_number': '1420',
        'name': '\u7f57\u661f\u534e',
        'person_phone': '13420348155',
        'area': '\u4e1c\u95e8',
        'work_phone': '18928187467'
      }, {
        'work_number': '1512',
        'name': '\u90ed\u5609\u6167',
        'person_phone': '13424504268',
        'area': '\u9999\u6656\u82d1',
        'work_phone': '18928187479'
      }, {
        'work_number': '1525',
        'name': '\u674e\u6c85\u9716',
        'person_phone': '15819375739',
        'area': '\u5317\u95e8',
        'work_phone': '0'
      }, {
        'work_number': '1638',
        'name': '\u6f58\u6d69\u6e90',
        'person_phone': '13715669852',
        'area': '\u51e4\u7fd4',
        'work_phone': '0'
      }, {
        'work_number': '1539',
        'name': '\u5168\u7cbe\u7cbe',
        'person_phone': '13415339350',
        'area': '\u9999\u6656\u82d1',
        'work_phone': '18928187453'
      }, {
        'work_number': '1646',
        'name': '\u738b\u62d3',
        'person_phone': '15362142660',
        'area': '\u4e1c\u95e8',
        'work_phone': '0'
      }, {
        'work_number': '1653',
        'name': '\u53f6\u79c0\u884d',
        'person_phone': '15362140742',
        'area': '\u671d\u6656\u82d1',
        'work_phone': '0'
      }, {
        'work_number': '1503',
        'name': '\u66f9\u5f81\u6656',
        'person_phone': '0',
        'area': '\u671d\u6656\u82d1',
        'work_phone': '0'
      }, {
        'work_number': '1547',
        'name': '\u6587\u6653\u65b0',
        'person_phone': '13727918566',
        'area': '\u9999\u6656\u82d1',
        'work_phone': '1547'
      }, {
        'work_number': '1613',
        'name': '\u90ed\u9a8f\u6770',
        'person_phone': '13423617801',
        'area': '\u9999\u6656\u82d1',
        'work_phone': '1613'
      }]
    })
  } else {
    res.json({
      'error': 'failure',
      'csrf_token': 'xKOhhCwvNe3iBTw7Ej8zMy6irJbj967cEHAqjzDuVkgC19SBInQcKKdm5l6PtOUK',
      'is_login': false
    })
  }
})
app.post('/work/try_login/', function (req, res) {
  res.json({
    'success': 'success',
    'announcement': '2017年6月16日（周五）开始停值',
    'work_orders': {
      'mobile': 0,
      'telecom': 0,
      'unicom': 0,
      'complaints': 0
    },
    'works': [
      {
        'work_number': '1403',
        'work_phone': '18928187482',
        'name': '李传德',
        'area': '东门',
        'person_phone': '18924937676'
      },
      {
        'work_number': '1602',
        'work_phone': '0',
        'name': '陈昊',
        'area': '北门',
        'person_phone': '13046331170'
      },
      {
        'work_number': '1609',
        'work_phone': '0',
        'name': '陈彦彬',
        'area': '东门',
        'person_phone': '13202245625'
      },
      {
        'work_number': '1620',
        'work_phone': '0',
        'name': '黄致杰',
        'area': '香晖苑',
        'person_phone': '18688270411'
      },
      {
        'work_number': '1613',
        'work_phone': '0',
        'name': '郭骏杰',
        'area': '东门',
        'person_phone': '13423617801'
      },
      {
        'work_number': '1512',
        'work_phone': '18928187479',
        'name': '郭嘉慧',
        'area': '香晖苑',
        'person_phone': '13424504268'
      },
      {
        'work_number': '1629',
        'work_phone': '0',
        'name': '林泽坤',
        'area': '朝晖苑',
        'person_phone': '13318423511'
      },
      {
        'work_number': '1529',
        'work_phone': '0',
        'name': '刘伯奇',
        'area': '岐头',
        'person_phone': '13050060432'
      },
      {
        'work_number': '1639',
        'work_phone': '00000000000',
        'name': '戚宏成',
        'area': '朝晖苑',
        'person_phone': '13250498582'
      },
      {
        'work_number': '1545',
        'work_phone': '0',
        'name': '王震',
        'area': '凤翔',
        'person_phone': '13420409206'
      },
      {
        'work_number': '1659',
        'work_phone': '0',
        'name': '钟健聪',
        'area': '凤翔',
        'person_phone': '15118299899'
      }
    ],
    'user': {
      'workPlace': '北门',
      'ID': '1547',
      'workDay': 7,
      'job': 'leader',
      'work_phone': '00000000000',
      'name': '文晓新'
    },
    'place': '',
    'check': false
  })
  isLogin = true
})
app.get('/work/try_logout/', function (req, res) {
  res.json({
    'success': 'success'
  })
  isLogin = false
})

app.get('/work/person_today/', function (req, res) {
  res.json({
    'persons': [
      {
        'userHouse': 'a-0000',
        'taskProperty': 1,
        'repairStatus': 0,
        'addTime': '2017-08-11T19:04:18.836',
        'userPhone': '12345678901',
        'netAccount': 'test',
        'netInfo': '中国电信',
        'id': 476,
        'userPlace': '香晖苑',
        'history': [
          {
            'time': '2017-08-11T19:04:18.843',
            'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-0000 status=0 introduction=test operator=中国电信',
            'who_do': '1547',
            'id': 721,
            'name': '文晓新'
          }
        ],
        'lastChangeTime': '2017-08-11T19:04:18.854',
        'repairIntro': 'test'
      }
    ],
    'success': 'success'
  })
})

app.post('/work/view_today/', function (req, res) {
  res.json({
    'success': 'success',
    'today': [
      {
        'netAccount': '',
        'userHouse': 'b-1013',
        'netInfo': '中国移动',
        'repairStatus': 2,
        'id': 442,
        'userPlace': '香晖苑',
        'taskProperty': 0,
        'lastChangeTime': '2017-06-15T18:09:15.550',
        'repairIntro': '14号报修的 15号依然无人',
        'userPhone': '15119144543',
        'addTime': '2017-06-12T17:17:05.061'
      },
      {
        'netAccount': 'test',
        'userHouse': 'a-0000',
        'netInfo': '中国电信',
        'repairStatus': 0,
        'id': 476,
        'userPlace': '香晖苑',
        'taskProperty': 1,
        'lastChangeTime': '2017-08-11T19:04:18.854',
        'repairIntro': 'test',
        'userPhone': '12345678901',
        'addTime': '2017-08-11T19:04:18.836'
      }
    ]
  })
})

app.post('/work/check_in/', function (req, res) {
  res.json({'success': 'success', 'place': '\u5317\u95e8', 'check': true})
})
app.post('/work/check_out/', function (req, res) {
  res.json({'success': 'success', 'place': '', 'check': false})
})

app.post('/work/work_situation_add/', function (req, res) {
  res.json({'success': 'success'})
})
app.post('/work/work_order_add/', function (req, res) {
  res.json({
    'situation_order': 1,
    'area': '香晖苑',
    'account_number': 'test',
    'telephone_number': '12345678901',
    'dormitory_number': 'a-0000',
    'status': 0,
    'introduction': 'test',
    'operator': '中国电信'
  })
})
app.get('/work/work_situation_view/:place/', function (req, res) {
  res.json({
    'success': 'success',
    'works': [{
      'work_number': '1645',
      'phone': '15878645579',
      'work_phone': '0',
      'name': '\u738b\u8d35\u6609',
      'area': '\u5317\u95e8'
    }, {
      'work_number': '1547',
      'phone': '13727918566',
      'work_phone': '00000000000',
      'name': '\u6587\u6653\u65b0',
      'area': '\u5317\u95e8'
    }],
    'work_situation': [{
      'userHouse': '8-421',
      'taskProperty': 0,
      'repairStatus': 3,
      'addTime': '2017-05-24T17:14:34.742',
      'userPhone': '13425576018',
      'netAccount': '',
      'netInfo': '\u4e2d\u56fd\u7535\u4fe1',
      'id': 193,
      'userPlace': '\u5317\u95e8',
      'works': [],
      'lastChangeTime': '2017-06-01T16:57:08.056',
      'repairIntro': '\u4e3b\u7ebf\u7aef\u53e3\u574f\u4e86\uff0c2\u7ebf\u4e0d\u4eae(\u8bef\u64cd\u4f5c)'
    }, {
      'userHouse': '9-420',
      'taskProperty': 0,
      'repairStatus': 3,
      'addTime': '2017-06-01T16:35:45.381',
      'userPhone': '17076603396',
      'netAccount': '',
      'netInfo': '\u4e2d\u56fd\u7535\u4fe1',
      'id': 310,
      'userPlace': '\u5317\u95e8',
      'works': [],
      'lastChangeTime': '2017-06-02T17:19:10.859',
      'repairIntro': '\u4e3b\u7ebf\u7aef\u53e3\u574f\u4e86'
    }, {
      'userHouse': '9-414',
      'taskProperty': 0,
      'repairStatus': 3,
      'addTime': '2017-06-04T16:40:26.073',
      'userPhone': '15362145321',
      'netAccount': '',
      'netInfo': '\u4e2d\u56fd\u7535\u4fe1',
      'id': 351,
      'userPlace': '\u5317\u95e8',
      'works': [],
      'lastChangeTime': '2017-06-04T16:40:26.100',
      'repairIntro': '\u7aef\u53e3\u635f\u574f'
    }]
  })
})
app.get('/work/work_order_view/:place/:which/', function (req, res) {
  res.json({
    'success': 'success',
    'works': [{
      'work_number': '1547',
      'phone': '13727918566',
      'work_phone': '00000000000',
      'name': '\u6587\u6653\u65b0',
      'area': '\u9999\u6656\u82d1'
    }],
    'work_order': [{
      'userHouse': 'a-0000',
      'taskProperty': 1,
      'repairStatus': 0,
      'addTime': '2017-08-11T19:04:18.836',
      'userPhone': '12345678901',
      'netAccount': 'test',
      'netInfo': '\u4e2d\u56fd\u7535\u4fe1',
      'id': 476,
      'userPlace': '\u9999\u6656\u82d1',
      'lastChangeTime': '2017-08-11T19:04:18.854',
      'repairIntro': 'test'
    }, {
      'userHouse': 'a-000',
      'taskProperty': 1,
      'repairStatus': 0,
      'addTime': '2017-08-14T03:18:56.216',
      'userPhone': '12345678901',
      'netAccount': '',
      'netInfo': '\u4e2d\u56fd\u7535\u4fe1',
      'id': 477,
      'userPlace': '\u9999\u6656\u82d1',
      'lastChangeTime': '2017-08-14T03:18:56.235',
      'repairIntro': 'test'
    }]
  })
})
app.post('/work/inquire/', function (req, res) {
  if (req.body.model === 1) {
    res.json({
      'success': 'success',
      'inquire': [
        {
          'check_area': '北门',
          'check_out_time': '2017-08-11T19:03:18.748',
          'name': '文晓新',
          'id': '1547',
          'toolkit': {
            'measuring_line': false,
            'crystal_Head': false,
            'detailed_description': '',
            'port_module': false,
            'switch': false,
            'cable': false,
            'crimping_Tool': false,
            'key': false
          },
          'check_in_time': '2017-08-11T19:02:41.206',
          'taken_toolkit': false,
          'check': 1
        },
        {
          'check_area': '北门',
          'check_out_time': '2017-08-11T19:09:14.245',
          'name': '文晓新',
          'id': '1547',
          'toolkit': {
            'measuring_line': false,
            'crystal_Head': false,
            'detailed_description': '',
            'port_module': false,
            'switch': false,
            'cable': false,
            'crimping_Tool': false,
            'key': false
          },
          'check_in_time': '2017-08-11T19:09:14.242',
          'taken_toolkit': false,
          'check': 0
        }
      ]
    })
  } else if (req.body.model === 2) {
    res.json({
      'reported': 0,
      'success': 'success',
      'tomorrow': 0,
      'undone': 1,
      'done': 0
    })
  } else if (req.body.model === 3) {
    res.json({
      'success': 'success',
      'return': [
        {
          'userHouse': '1-111',
          'taskProperty': 0,
          'repairStatus': 1,
          'person': [
            {
              'name': '谢理成',
              'id': '1404'
            },
            {
              'name': '陈明哲',
              'id': '1607'
            }
          ],
          'addTime': '2017-05-16T16:54:59.756',
          'userPhone': '12345678901',
          'netAccount': '222',
          'netInfo': '中国电信',
          'id': 30,
          'userPlace': '北门',
          'history': [],
          'lastChangeTime': '2017-05-16T16:54:59.789',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-1111',
          'taskProperty': 1,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T20:48:53.861',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 60,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T20:48:53.873',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-1111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 76
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:12:58.095',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 77
            }
          ],
          'lastChangeTime': '2017-05-17T21:12:58.107',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 0,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            },
            {
              'name': '程楚婷芮',
              'id': '1508'
            }
          ],
          'addTime': '2017-05-17T21:22:43.230',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 61,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:22:43.244',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=1 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 78
            }
          ],
          'lastChangeTime': '2017-05-17T21:22:43.257',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 0,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            },
            {
              'name': '程楚婷芮',
              'id': '1508'
            }
          ],
          'addTime': '2017-05-17T21:23:24.608',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 62,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:23:24.622',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 79
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:24:01.426',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 80
            }
          ],
          'lastChangeTime': '2017-05-17T21:24:01.441',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 3,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:24:28.117',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 63,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:24:28.124',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 81
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:25:23.203',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 85
            }
          ],
          'lastChangeTime': '2017-05-17T21:25:23.216',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 2,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:24:48.078',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国移动',
          'id': 64,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:24:48.085',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=tset operator=中国移动',
              'name': '文晓新',
              'id': 82
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:26:00.870',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 87
            }
          ],
          'lastChangeTime': '2017-05-17T21:26:00.883',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 2,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:25:00.770',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国联通',
          'id': 65,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:25:00.777',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国联通',
              'name': '文晓新',
              'id': 83
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:26:19.022',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 88
            }
          ],
          'lastChangeTime': '2017-05-17T21:26:19.033',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 2,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:25:14.017',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 66,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:25:14.026',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 84
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:25:42.797',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 86
            }
          ],
          'lastChangeTime': '2017-05-17T21:25:42.808',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 0,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:31:58.298',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 67,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:31:58.306',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 89
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:35:24.025',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 96
            }
          ],
          'lastChangeTime': '2017-05-17T21:35:24.037',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 1,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:32:34.655',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 68,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:32:34.665',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 90
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:35:44.136',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 97
            }
          ],
          'lastChangeTime': '2017-05-17T21:35:44.147',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 1,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            },
            {
              'name': '程楚婷芮',
              'id': '1508'
            }
          ],
          'addTime': '2017-05-17T21:32:49.264',
          'userPhone': '12345678901',
          'netAccount': 'tets',
          'netInfo': '中国电信',
          'id': 69,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:32:49.270',
              'record': 'add:work_area=香晖苑 account_number=tets telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 91
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:35:52.773',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 98
            }
          ],
          'lastChangeTime': '2017-05-17T21:35:52.787',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 1,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:33:04.954',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国移动',
          'id': 70,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:33:04.966',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国移动',
              'name': '文晓新',
              'id': 92
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:36:10.156',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 99
            }
          ],
          'lastChangeTime': '2017-05-17T21:36:10.168',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 1,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-17T21:33:20.353',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国联通',
          'id': 71,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:33:20.363',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国联通',
              'name': '文晓新',
              'id': 93
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:36:24.933',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 100
            }
          ],
          'lastChangeTime': '2017-05-17T21:36:24.946',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-111',
          'taskProperty': 3,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            },
            {
              'name': '程楚婷芮',
              'id': '1508'
            }
          ],
          'addTime': '2017-05-17T21:33:49.271',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国联通',
          'id': 72,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-17T21:33:49.278',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-111 status=0 introduction=test operator=中国联通',
              'name': '文晓新',
              'id': 94
            },
            {
              'work_number': '1547',
              'time': '2017-05-17T21:34:30.516',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 95
            }
          ],
          'lastChangeTime': '2017-05-17T21:34:30.531',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'A-326',
          'taskProperty': 1,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-19T10:51:34.820',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 88,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-19T10:51:34.829',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=A-326 status=1 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 123
            }
          ],
          'lastChangeTime': '2017-05-19T10:51:34.840',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-0000',
          'taskProperty': 0,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-05-26T15:11:20.232',
          'userPhone': '12345678901',
          'netAccount': '',
          'netInfo': '中国电信',
          'id': 241,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-05-26T15:11:20.242',
              'record': 'add:work_area=香晖苑 account_number= telephone_number=12345678901 dormitory_number=a-0000 status=1 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 331
            }
          ],
          'lastChangeTime': '2017-05-26T15:11:20.251',
          'repairIntro': 'test'
        },
        {
          'userHouse': '11-0000',
          'taskProperty': 0,
          'repairStatus': 1,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            },
            {
              'name': '郭骏杰',
              'id': '1613'
            },
            {
              'name': '姜贺',
              'id': '1622'
            }
          ],
          'addTime': '2017-06-01T17:35:38.313',
          'userPhone': '12345678901',
          'netAccount': '',
          'netInfo': '中国电信',
          'id': 320,
          'userPlace': '北门',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-06-01T17:35:38.321',
              'record': 'add:work_area=北门 account_number= telephone_number=12345678901 dormitory_number=11-0000 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 462
            },
            {
              'work_number': '1547',
              'time': '2017-06-01T17:35:54.008',
              'record': 'change:status=1 introduction=test',
              'name': '文晓新',
              'id': 463
            }
          ],
          'lastChangeTime': '2017-06-01T17:35:54.027',
          'repairIntro': 'test'
        },
        {
          'userHouse': 'a-0000',
          'taskProperty': 1,
          'repairStatus': 0,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-08-11T19:04:18.836',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 476,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-08-11T19:04:18.843',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-0000 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 721
            }
          ],
          'lastChangeTime': '2017-08-11T19:04:18.854',
          'repairIntro': 'test'
        }
      ]
    })
  } else if (req.body.model === 4) {
    res.json({
      'success': 'success',
      'return': [
        {
          'userHouse': 'a-0000',
          'taskProperty': 1,
          'repairStatus': 0,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-08-11T19:04:18.836',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 476,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-08-11T19:04:18.843',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-0000 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 721
            }
          ],
          'lastChangeTime': '2017-08-11T19:04:18.854',
          'repairIntro': 'test'
        }
      ]
    })
  } else if (req.body.model === 5) {
    res.json({
      'success': 'success',
      'return': [
        {
          'userHouse': 'a-0000',
          'taskProperty': 1,
          'repairStatus': 0,
          'person': [
            {
              'name': '文晓新',
              'id': '1547'
            }
          ],
          'addTime': '2017-08-11T19:04:18.836',
          'userPhone': '12345678901',
          'netAccount': 'test',
          'netInfo': '中国电信',
          'id': 476,
          'userPlace': '香晖苑',
          'history': [
            {
              'work_number': '1547',
              'time': '2017-08-11T19:04:18.843',
              'record': 'add:work_area=香晖苑 account_number=test telephone_number=12345678901 dormitory_number=a-0000 status=0 introduction=test operator=中国电信',
              'name': '文晓新',
              'id': 721
            }
          ],
          'lastChangeTime': '2017-08-11T19:04:18.854',
          'repairIntro': 'test'
        }
      ]
    })
  }
})

app.get('/work/extra_work_view/', function (req, res) {
  res.json({'states': 0, 'success': 'success', 'registerDay': '2017-08-15:16.30'})
})
app.get('/work/personal_extra_work_view/', function (req, res) {
  res.json({
    'success': 'success',
    'states': 2,
    'whyReject': '\u4e0d\u662f\u8e6d\u672c\u5929\u73ed',
    'registerDay': '2017-08-15:16.30'
  })
})
app.post('/work/extra_work_add/', function (req, res) {
  res.json({'success': 'success', 'states': 0, 'registerDay': '2017-09-04:16.30'})
})

app.post('/work/experience_add/', function (req, res) {
  res.json({
    'experience': {
      'time': '2017-08-11T19:05:52.384',
      'record': 'test',
      'name': '文晓新',
      'id': 17,
      'number': '1547',
      'title': 'test'
    },
    'success': 'success'
  })
})
app.get('/work/experience_view/', function (req, res) {
  res.json({
    'experience': [
      {
        'time': '2017-08-11T19:05:52.384',
        'record': 'test',
        'name': '文晓新',
        'id': 17,
        'number': 1547,
        'title': 'test'
      },
      {
        'time': '2017-06-15T16:56:01.686',
        'record': '使用netsh winsock reset即可',
        'name': '文晓新',
        'id': 16,
        'number': 1547,
        'title': 'windows端口初始化失败'
      },
      {
        'time': '2017-06-09T19:16:58.613',
        'record': '机架上1130宿舍的端口实际是1126的，朝晖寻线器干扰比较严重，把香灰的借过来才寻得到',
        'name': '吴李根',
        'id': 15,
        'number': 1648,
        'title': '朝晖11楼墙线端口与表不太对应'
      },
      {
        'time': '2017-06-06T18:44:17.631',
        'record': '4.把排好的线捋直，剪剩适合的长度（网线里面的八根线芯不用剥皮了，压线的时候水晶头里面的金属片会把皮弄破的），捅进水晶头再检查一遍线序（有水晶头金属触点那一面），捅进压线钳，压线\n5.测线记得要把网线插稳，不然接触不良会有部分灯不亮\n\n6.保证测线器两边的灯是从1-8依次点亮，有灯不亮的或者是灯倒着亮的，检查两边线序，剪掉线序错了的水晶头，重做\n7.做网线是不能发家致富的o(╯□╰)o\n',
        'name': '吴李根',
        'id': 14,
        'number': 1648,
        'title': 't568b做线技巧2'
      },
      {
        'time': '2017-06-06T18:42:59.474',
        'record': '近来开展的做网线活动，不少小伙伴想来发家致富，但发现做不快。。。\n在这里说一下做网线的小技巧\n1.工具:信息中心有三种压线钳，功能一样，设计逻辑不同，可以先看看熟悉一下\n2.剥皮:新款钳注意网线转动方向不然难剥;老款注意不要太用力压，容易弄断线芯\n3.排线:先让各色双绞线缠一起先，橙橙白拨到左边，棕棕白拨右边，蓝蓝白放中间，绿绿白放下面或上面，然后先分开绿，绿白线放蓝蓝白两边，把其他的线分开，按t568序排好两根线位置\n3.把排好的线捋直，剪剩适合的长度（网线里面的八根线芯不用剥皮了，压线的时候水晶头里面的金属片会把皮弄破的），捅进水晶头再检查一遍线序（有水晶头金属触点那一面），捅进压线钳，压线\n',
        'name': '吴李根',
        'id': 13,
        'number': 1648,
        'title': 't568b线序做网线线技巧'
      },
      {
        'time': '2017-05-27T00:36:36.595',
        'record': '这往往是由于安装了未签名的驱动造成的，重启狂按F8，进入高级启动模式，在里面有个关于 忽略驱动签名 的启动方式，使用这种模式启动系统就能找到网卡，之后再安装官方驱动就行啦～',
        'name': '刘伯奇',
        'id': 12,
        'number': 1529,
        'title': 'win7硬件管理器找不到网卡'
      },
      {
        'time': '2017-05-26T22:04:14.563',
        'record': '不要单是跑完神器无效就告知用户重装，若用户没有使用猎豹，并且设备管理器中没有任何网卡带感叹号时，应尝试将所有的WAN微型端口选择卸载，然后尝试拨号，如果出现PPPOE813错误，恭喜你已经成功一半了，请按照Wiki中的PPPOE813页面尝试解决。\n其中Wiki中关键命令为：\nrasdial /DISCONNECT\n\n注意DISCONNECT一定为大写。\n然后必须重启电脑再尝试建立拨号连接',
        'name': '黄致杰',
        'id': 11,
        'number': 1620,
        'title': '关于PPPOE 720问题'
      },
      {
        'time': '2017-05-21T23:39:39.570',
        'record': '如果线路是通的，端口没问题，用户电脑不能上网，用维基上的方法也没用的时候，可以试试用以下方法\n①win+x   命令提示符(管理员)\n②依次输入 netsh int ip reset\n         netsh winsock reset\n然后重启就可以了',
        'name': '马姗姗',
        'id': 10,
        'number': 1635,
        'title': '天翼 101'
      },
      {
        'time': '2017-05-19T18:30:24.425',
        'record': '补充。。\n\n\n开始菜单-运行-regedt32，打开注册表定位到“HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\RasMan\\DependOnService ” ，然后\n左键点中“ DependOnService ”，在右边窗口里显示的项目中找到“ DependOnService ” ，双击会弹出一个 “编辑多字符串”窗口，删除此窗口里数值数据中的“ SstpSvc ”，再点击“确定”。 关闭注册表后重启电脑。 \n',
        'name': '戚宏成',
        'id': 9,
        'number': 1639,
        'title': '/*711*/'
      },
      {
        'time': '2017-05-19T18:28:25.807',
        'record': '1:如果根据网维百科无法解决请使用以下的办法\n2:取得『%SystemRoot%\\LogFiles』文件夹和『%SystemRoot%\\ System32\\wbem』文件夹的权限（包括这两个文件夹的所有子文件夹的权限），简单点说，就是使你当前的帐户拥有这两个文件夹以及它们的子文件夹的绝对控制权限。\nc:\\windows\\system32\\\n这个路径下找到：logfile 和 wbem 这两个文件夹\n这个文件添加 管理员使用权限\n重启应该就OK了',
        'name': '戚宏成',
        'id': 8,
        'number': 1639,
        'title': '/*711*/关于移动711的补充'
      },
      {
        'time': '2017-05-18T23:42:29.154',
        'record': '1.朝晖有些楼层的墙线被移动插满了，新装找对应的网线时可先找对应墙线端口的网线，接上寻线器发射端，用接收端找要插交换机的那条网线（少数网线插错了，如4L-629-1插到了下一排）。\n2.交换机有信号干扰，插在交换机上的线用寻器很难找到。\n3.移动有一些网线放到了机架顶，发现自己找不到对应的网线时看看是不是有一部分你没看到。\n3.一些机房的墙线端口表印的比较奇葩，但是相信机智的各位可以理解并找到正确的端口 = W =.\n4.寻线器不会自动关机，请务必记得关机！！！！接受器最好朝上放，不然塞回袋子的时候容易打开手电筒。',
        'name': '吴李根',
        'id': 7,
        'number': 1648,
        'title': '朝晖苑的寻线小技巧'
      },
      {
        'time': '2017-05-18T21:30:44.660',
        'record': '删除原有宽带连接，新建就好了',
        'name': '郭骏杰',
        'id': 6,
        'number': 1613,
        'title': '移动/联通拨号错误代码628'
      },
      {
        'time': '2017-05-18T21:20:50.403',
        'record': '首先先打开一次，然后打开设置=》安全性与隐私=》通用，然后你会看到系统提示说阻止了xxx的运行什么的，然后点仍要运行，然后再打开一次客户端即可',
        'name': '文晓新',
        'id': 5,
        'number': 1547,
        'title': 'OS X系统安装客户端被系统阻止'
      },
      {
        'time': '2017-05-16T16:26:24.121',
        'record': '电信客户端遇到这个问题，先重置LSP，再禁用启用网卡即可解决，无需重装客户端！！',
        'name': '佘佳殷',
        'id': 4,
        'number': 1542,
        'title': 'windows通信端口初始化失败'
      },
      {
        'time': '2017-05-14T11:30:59.609',
        'record': '某些线不够长需要特定的走线姿势(งᵒ̌皿ᵒ̌)ง⁼³₌₃',
        'name': '戚宏成',
        'id': 3,
        'number': 1639,
        'title': '朝晖插线'
      }
    ],
    'success': 'success'
  })
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }


  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
