/**
 * Created by Administrator on 2018/5/27.
 */
$.fn.accordion = function (){
  // 当前的要求是,无论是三。五，八个的li标签，都可以实现一个手风琴的效果

  // 背景颜色要动态的生成
  // 1.获得对象
  var boxWidth = this.width()
  // var lis = $('.box ul li')
  var lis = this.find('li')
  var liAvgWidth = boxWidth/lis.length
  var liMinWidth = (boxWidth-liAvgWidth*3)/(lis.length-1)
  // 2.设置每个li标签的背景颜色和位置
  lis.each(function(index,ele){
    $(ele).css({
      width:liAvgWidth*3,  // 自己约定，让每个盒子的宽度是平均值的3倍
      left:index*liAvgWidth, // 确定自身的位置
      backgroundColor:getColor()   // 随机生成自己的颜色
    })
  })

  // 3.鼠标移入 当前的标签的时候，要让当前的盒子最宽,其余的要变窄
  lis.hover(function(){
    var num = $(this).index()  // 获取当前鼠标移入的那个标签的索引
    lis.each(function(index,ele){
      // 鼠标移入 当前的盒子的时候，要让当前的标签变成最大，也就是之前平均值的3位,其它盒子的宽度应该是
      // (总宽度-平均值的3位)/(lis.length-1)
      if(index<=num){
        $(ele).stop().animate({
          left: index*liMinWidth
        },300)
      }else {
        $(ele).stop().animate({
          left: (index-1)*liMinWidth + liAvgWidth*3
        })
      }

    })
  },function(){
    lis.each(function(index,ele){
      $(ele).stop().animate({
        left:index*liAvgWidth
      })
    })
  })


  /**
   * 封装了一个获取颜色的16进制的函数
   * @returns {string}
   */
  function getColor(){
    var arr = ['a','b','c','d','e','f',0,1,2,3,4,5,6,7,8,9]
    var str = '#'
    for(var i=0;i<6;i++){
      var index = Math.floor(Math.random()*arr.length)
      str += arr[index]    // 0--1   索引只能取0--15    0.99999  16  15.99999
    }

    return str
  }

  console.log(getColor());
}