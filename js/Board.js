(function (window) {
    'use strict';

    function Board(gameInst) {
        this.gameInst = gameInst
        this.blockSize = 30        //每个三十像素大小
        this.rows = TetrisConfig.rows
        this.cols = TetrisConfig.cols
        this.canvas = new Canvas('c_game_main', this.rows * this.blockSize, this.rows * this.blockSize)
        this.content = this.canvas.content
        this.borderList = []
        this.shape = new window.Shape()

        this._init()

        var b =  ResourceManager.getResource('blocks')
        console.log(b)
    }

    Board.prototype = {
        constructor: Board,
        _init: function () {
            this._buildGridData()
            this._initGrid()

            //初始化随机出现的方块
            this.shape.draw(this.content)
            //添加延迟，这里render访问不到
            var self = this;
            setTimeout(function(){
                self._buildNextShape();			//调用下 下一步方块
            })
        },

        _buildNextShape: function () {
            this.nextShape = new window.Shape()

            this.nextShape,setPosition(this.gameInst.nextShape.cols,this.gameInst.nextShape.rows)
            //绘制出右上角方块
            this.gameInst.nextShape.render(this.nextShape)
        },

        _buildGridData: function () {
            //创建二维数组
            var i,j;
            for(i = 0;i<this.rows;i++){
                this.borderList[i] = [];
                for(j = 0;j<this.cols;j++){
                    this.borderList[i][j] = 0
                }
            }
            // console.log(this.boardList);    打印出二维数组

        },


        // 创建画笔
        _initGrid: function () {
            var i;
            this.context.strokeStyle = 'green';
            this.context.lineWidth = 0.5;

            // 绘制线条笔迹
            // 绘制横线
            for(i = 0;i <= this.rows;i++){
                this.context.moveTo(0,i*this.blockSize)
                this.context.lineTo(this.canvas.width,i*this.blockSize)
            }

            // 绘制竖线
            for(i = 0;i <= this.cols;i++){
                this.context.moveTo(0,i*this.blockSize)
                this.context.lineTo(this.canvas.width,i*this.blockSize)
            }

            //画线
            this.context.stroke();
        }

    }
})(window)