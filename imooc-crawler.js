
//可以得到该页面的所有数据 （2017.09.21）
var http = require('http')
var url = 'http://www.imooc.com/learn/348'

http.get(url,function(res) {
  var html = ''

  res.on('data',function(data){   //当res有数据触发的时候，进行函数回调
    html += data        //数据累加
  })

  res.on('end',function() {     //数据累加完成
    console.log(html);
  })
}).on('error',function() {
  console.log('获取课程数据出错')
})