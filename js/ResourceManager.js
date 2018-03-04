(function (window) {
  'use strict'

  var cacheMap = new Map()

  /* 
   * resourceTotalCount: 资源总数量
   * currentLoaded: 当前已加载资源量
   * 每加载完一个资源就调用一次 isAddLoaded 方法，该方法使得 currentLoaded 自增 1
   * 调用完 isAddLoaded，会判断 
   *    1 currentLoaded === resourceTotalCount（资源是否加载完毕）
   *    2 typeof window.ResourceManager.onResourceLoaded === 'function'（StartGame 方法是否已经创建）
   * 在满足条件时，会调用 window.ResourceManager.onResourceLoaded() 方法
   *    该方法在 app.js 中定义
   *    该方法开始游戏
   */
  var resourceTotalCount = 1
  var currentLoaded = 0

  var isAddLoaded = function () {
    currentLoaded +=1; 

    if( currentLoaded === resourceTotalCount && typeof window.ResourceManager.onResourceLoaded === 'function'){
      window.ResourceManager.onResourceLoaded()
    }
  }

  var init = function () {
    var image = new Image()
    image.onload = function () {
      cacheMap.set('blocks',image)
      isAddLoaded()
    }
    image.src = 'img/blocks.png'; 
  }

  var getResource = function (key) {
    return cacheMap.get(key)
  }

  window.ResourceManager = {
    getResource: getResource,
    init:init,
		onResourceLoaded:null		//资源加载完成回调
  }
})(window)