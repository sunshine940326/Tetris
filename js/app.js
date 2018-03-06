(function (document) {
  var gameInst;

  function DomObject(dom) {
    this.dom = dom
  }

  DomObject.prototype.get = function () {
    return this.dom
  }

  DomObject.prototype.on = function (eventName, eventHandler) {
    this.get().addEventListener(eventName, eventHandler)
  }

  DomObject.prototype.css = function (styleKey, styleValue) {
    this.get().style[styleKey] = styleValue;
  }

  function $(selector, context) {
    return new DomObject((context || document).querySelector(selector))
  }

  /*创建方法，启动游戏*/
  function StartGame() {
    // 这里只是设置，没有调用
    ResourceManager.onResourceLoaded = function () {
      // new Board();   //测试显示第一个图形
      gameInst = new Tetris();
      gameInst.startGame();    //启动游戏
      
    }
    ResourceManager.init();      //调用init方法
  }

  $('.btn-game-pause').on('click',function(evt){   //暂停游戏
    // alert("你要暂停吗");
    var el = evt.target;
    if(el.innerText ==='暂停'){
      el.innerText = '继续';
      gameInst.pause();
    }else{
      el.innerText = '暂停';
      gameInst.resume();
    }
  });
  /*初始化*/
  function _init() {
    /*开始游戏*/

    $('.btn-start').on('click', function () {
      $('.start-container').css('display', 'none');
      $('.game-container').css('display', 'block');
      StartGame();
    })
  }

  document.addEventListener('DOMContentLoaded', function (ev) {
    _init();
  })
})(document);
