# H5音乐播放器
> * 原生javascript 
> * less
> * Zepto
> * H5/CSS3
> * 模块化编程思想
> * gulp打包工具
> * ajax
## 实现功能
- [x] 播放、暂停、上一首、下一首
- [x] 拖拽快进
- [x] 歌词同步
- [x] 播放列表切换歌曲
## 项目总结
一个移动端的播放器，打包工具用的是gulp，使用zepto框架，结合ajax进行的模块化开发
模块化开发思想：高内聚，一个模块是一个类似功能的集合，不同模块负责不同的功能，易于开发和维护；低耦合：形容模块之间的相互依赖关系，模块彼此单独维护和开发以及使用和不适用不影响其他模块
模块形式：(function ($, root) {
             function constructor () {             
             }
             constructor.prototype = { 
              fn1 : function () {},
              fn2 : function () {}...
             }
             root.constructor = constructor;
         })(window.Zepto, window.player || (window.player = {}))
#### index.js：统领全局
> * bindClick()：控制上下一曲、歌曲暂停播放、菜单的弹出和消失
> * bindTouch()：控制拖拽改变歌曲进度
> * getData(url)：获取歌曲数据，成功时，初始化播放器
> * getLrc(url)：获取歌词
#### audioManager.js：音乐控制
> * audioManager.prototype.bindEvent：播放完成时，自动播放下一曲
> * audioManager.prototype.play：控制播放
> * audioManager.prototype.pause：控制暂停
> * audioManager.prototype.setAudioSource：设置歌曲的src
> * audioManager.prototype.jumpToplay：快进控制
#### controlManager.js：播放控制
> * controlManager.prototype.prev：切换上一曲
> * controlManager.prototype.next：切换下一曲
> * controlManager.prototype.getIndex：设置当前播放歌曲序号
#### playlist.js：播放列表
> * renderList(songList)：初始化列表，渲染列表
> * show(controlmanager)：通过controlManager的当前播放序号渲染当前播放歌曲样式
> * bindEvent()：绑定列表点击事件，点击歌曲进行播放，点击关闭按钮，关闭列表
> * signSong(index)：控制播放歌曲和不播放歌曲的样式
#### processor.js：播放进度控制
> * formatTime(duration)：分秒转换
> * renderAllTime(duration)：总时间渲染
> * updata(precent)：更新当前播放时间
> * uplrc(lrc)：更新歌词
> * start( lrcObj , precentage)：音乐播放，更新播放时间和歌词
> * stop()：音乐暂停
#### render.js：视图渲染
> * renderInfo(info)：渲染歌曲信息，歌曲名字、专辑名字和歌手名字
> * renderImg(src)：调用gaussBlur函数渲染背景图片
> * renderIsLike(isLike)：渲染喜欢按钮
#### lrc.js：歌词处理
> * parseLrc(lrc)：将歌词字符串转换成时间和对应歌词的对象
#### gaussBlur.js：模糊背景图片处理函数
## 项目展示
#### 播放
![play](https://github.com/Seventysevendays/H5-Music-Player/tree/master/captures/front.png)
#### 列表
![play](https://github.com/Seventysevendays/H5-Music-Player/tree/master/captures/list.png)

