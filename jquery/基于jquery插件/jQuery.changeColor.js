/**
 * Created by Administrator on 2018/5/27.
 */
$.fn.changeColor = function (color){
  // 写功能实现
  // 需要注意的是:在插件中的函数里面, this指向 当前的jQuery对象,而不再是DOM对象
  this.css({
    backgroundColor:color
  })
}