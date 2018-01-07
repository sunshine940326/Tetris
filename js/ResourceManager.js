(function (window) {
    'use strict';

    var cacheMap = new Map();   //用于存储资源map对象
    var resourceTotalCount =1;  //资源总数量
    var currentLoaded = 0;   	//当前加载资源总量

    //回调函数，加载成功后
    var isAddLoaded = function () {
        currentLoaded +=1;
        if(currentLoaded === resourceTotalCount && typeof window.ResourceManager.onResourceLoaded ==='function') {
            window.ResourceManager.onResourceLoaded();
        }
    }

    var init = function () {
        var image = new Image();   //创建image对象
        image.onload = function () {
            cacheMap.set('blocks',image)
            isAddLoaded()
        }
        image.src = 'img/blocks.png';  //指定图片路径？？？
    }

    var getResource = function(key){   //通过key获取资源
        return cacheMap.get(key);
    };

    window.ResourceManager = {
        getResource:getResource,
        init:init,
        onResourceLoaded:null		//资源加载完成回调
    }
})(window)