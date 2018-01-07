(function (window) {
    'use strict'

    var shapebLayouts = [
        [[0,1,0],[1,1,1]],
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[0,1],[1,1],[1,0]],
        [[1,0],[1,1],[0,1]],
        [[1,0,1],[1,1,1]],
        [[0,1],[1,1]],
        [[1,1]],
        [[1,1],[1,0],[1,0]],
        [[1,1],[0,1],[0,1]]
    ]

    var random = function (minValue, maxValue) {
        // 产生随机数
        // 参数随机数，包含0，不包含1
        console.log(minValue + Math.floor(Math.random() + maxValue))
        return minValue + Math.floor(Math.random() * maxValue)
    }

    var styleCount = 7

    function Shape() {
        //开始处在左上角
        this.x = 0
        this.y = 0

        //颜色随机  +1解决消失
        this.blockType = random(1,styleCount)

        console.log(this.blockType);
        //第几个方块,也就是变换颜色
        this.block = new Block(this.blockType)

        //多种方块形状
        this.layout = shapebLayouts[random(0,shapebLayouts.length)];
        console.log(this.layout)
    }

    Shape.prototype = {
        constructor: Shape,

        //增加参数，控制右上角下一个方块大小
        draw:function(context,size){      //增加参数，控制右上角下一个方块大小
            for(var i=0;i<this.layout.length;i++){
                for(var j=0;j<this.layout[i].length;j++){
                    if(this.layout[i][j]){
                        this.block.draw(context,j+this.x,i+this.y,undefined,size);  //????
                        //控制右上角下一个方块新增参数
                    }
                }
            }
        },

        // 翻转
        rotate: function () {
            var newLayout= []

            for(var y = 0;y<this.layout[0].length;y++){
                newLayout[y] = []
                for(var x = 0;x < this.layout[0].length;x++){
                    newLayout[y][x] = this.layout[this.layout.length - 1 - x][y]
                }
            }

            this.layout = newLayout

            this._setLayout()
        },

        //防止翻转越界
        _setLayout: function () {
            if(this.x < 0){
                this.x = 0
            }
            if(this.y < 0){
                this.y = 0
            }
            if(this.x + this.layout[0].length > TetrisConfig.cols){
                this.x = TetrisConfig.cols - this.layout[0].length;
            }
            if (this.y + this.layout.length > TetrisConfig.rows) {
                this.y = TetrisConfig.rows - this.layout.length;
            }
        },
        _getMaxCols:function(){
            var max = 0;
            for(var y = 0;y<this.layout.length;y++){
                max = Math.max(max,this.layout[y].length);
            }
            return max;
        },
        _getMaxRows:function(){       //拿到最大rows
            return this.layout.length;
        },
        setPosition:function(cols,rows,ignoreRows){   //右上角方块定位
            this.x = Math.floor((cols-this._getMaxCols())/2);
            if(!ignoreRows){
                this.y = Math.floor((rows-this._getMaxRows())/2);
            }
        }
    }
    window.Shape=Shape;
})(window)