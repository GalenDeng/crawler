
//可以得到该页面的所有数据 （2017.09.21）
//需要安装npm install cheerio模块
/*Node.Js cheerio 模块可以在服务器段想使用Jquery的方式操作Dom结构，
许多用法和jquery 的语法基本相同。
为服务器特别定制的，快速、灵活、实施的jQuery核心实现.
*/
var http = require('http')
var cheerio = require('cheerio')  //引入cheerio的模块
var url = 'http://www.imooc.com/learn/348'
function filterCharters(html) {
  var $ = cheerio.load(html)               // $ ： dollar 美元 把html的东西装载进来

  var chapters = $('.learnchapter') //类名，寻找每一大章的内容
/*   [{
      chaptersTitle : '',
      video : [
        title : '',
        id : ''
      ]
  }] */
  var courseDate = []

  chapters.each(function(item) {    //遍历
      var chapter = $(this)         //取得单独的某一张
      var chapterTitle = chapter.find('strong')
  })
}

http.get(url,function(res) {
  var html = ''

  res.on('data',function(data){   //当res有数据触发的时候，进行函数回调
    html += data        //数据累加
  })

  res.on('end',function() {     //数据累加完成
//    console.log(html);
      filterCharters(html)
  })
}).on('error',function() {
  console.log('获取课程数据出错')
})