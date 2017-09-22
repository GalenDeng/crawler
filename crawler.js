
//可以得到该页面的每一大章以及大章下面的每一个小节 （2017.09.22）
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

  var chapters = $('.chapter') //类名，寻找每一大章的内容
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
      var chapterTitle = chapter.find('strong').text() //把strong这个标签里面的内容拿出来
      var videos = chapter.find('.video').children('li')
      var chapterData = {
        chaptersTitle:chapterTitle,
        videos:[]
      }
      videos.each(function(item) {
        var video = $(this).find('.J-media-item')
        var  videoTitle = video.text()
        var id = video.attr('href').split('/video/')[1] //这里是不要video/这个东西，只要video/的6687这个内容  6687为第二段，所以用[1]的内容 ；video/为[0]的内容

        chapterData.videos.push({
          title : videoTitle,
          id : id
        })
      })

      courseDate.push(chapterData)
  })
  return courseDate
}

function printCourseInfo(courseDate) {
  courseDate.forEach(function(item) {  //foreach为数组里面的遍历
    var chaptersTitle = item.chaptersTitle
    console.log(chaptersTitle + '\n')
    item.videos.forEach(function(video){
        console.log(' 【'+ video.id+'】'+video.title + '\n')
    })
  })
}

http.get(url,function(res) {
  var html = ''

  res.on('data',function(data){   //当res有数据触发的时候，进行函数回调
    html += data        //数据累加
  })

  res.on('end',function() {     //数据累加完成
//    console.log(html);
     var courseDate = filterCharters(html)    //过滤不相关的内容

     printCourseInfo(courseDate)

  })
}).on('error',function() {
  console.log('获取课程数据出错')
})