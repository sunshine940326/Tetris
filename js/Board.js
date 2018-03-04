(function (window) {
  'use strict'
  function Board(gameInst) {
    this.gameInst = gameInst
    this.blockSize = TetrisConfig.bolckSize
    this.rows = TetrisConfig.rows
    this.cols = TetrisConfig.cols
    this.canvas = new Canvas('c_game_main', this.cols * this.blockSize, this.rows * this.blockSize)
    this.context = this.canvas.context
    this.shape = new window.Shape();

    this.boardList = []

    this._init()

    var self = this;  //添加延迟，这里render访问不到
    setTimeout(function () {
      self._buildNextShape();			//调用下 下一步方块
    })


    var b = ResourceManager.getResource('blocks')
  }

  Board.prototype = {
    constructor: Board,
    _init: function () {
      this._buildGridData()

      this._drawGrid()

      this.shape.draw(this.context)

      let self = this
      setTimeout(function () {
        self._buildNextShape();			//调用下 下一步方块
      })

    },
    _buildGridData: function () {
      for (let i = 0; i < this.rows; i++) {
        this.boardList[i] = [0]
        for (let j = 0; j < this.cols; j++) {
          this.boardList[i][j] = 0
        }
      }
    },

    _buildNextShape: function () {
      this.nextShape = new window.Shape();   //注意这里变量名
      this.nextShape.setPosition(this.gameInst.nextshape.cols, this.gameInst.nextshape.rows);      //定位  这里对象位置？？？？？？？？
      this.gameInst.nextshape.render(this.nextShape);  //绘制出右上角方块
    },
    _drawGrid: function () {
      this.context.strokeStyle = TetrisConfig.gridColor
      this.context.lineWidth = 0.5
      for (var i = 0; i < this.rows; i++) {
        this.context.moveTo(0, i * this.blockSize)
        this.context.lineTo(this.canvas.width, i * this.blockSize)
      }
      for (let i = 0; i < this.cols; i++) {
        this.context.moveTo(i * this.blockSize, 0)
        this.context.lineTo(i * this.blockSize, this.canvas.height)
      }
      this.context.stroke();

      this.gridImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    },

    tick: function (params) {

      if( this.validMove(0,1) ){
        this.shape.y += 1
      }
   
      this.refresh()
      this.shape.draw(this.context)
    },

    refresh: function (params) {
      this.canvas.clear()
      this.context.putImageData(this.gridImageData, 0, 0)
      // this.drawBlocks()
    },

    validMove: function (moveX, moveY) {     //边界控制  ??????????????????????
			//下一步位置
			var nextX = this.shape.x + moveX;
			var nextY = this.shape.y + moveY;
			for (var y = 0; y < this.shape.layout.length; y++) {  //第几行
				for (var x = 0; x < this.shape.layout[y].length; x++) {
					if (this.shape.layout[y][x]) {
						if (typeof this.boardList[nextY + y] === 'undefined'  //找不到行
							|| typeof this.boardList[nextY + y][nextX + x] === 'undefined'  //找不到列
							|| this.boardList[nextY + y][nextX + x] //当前位置已有方块
							|| nextX + x < 0	//超出左边界
							|| nextX + x >= this.cols	//超出右边界
							|| nextY + y >= this.rows	//超出下边界
						) {
							return false;
						}
					}
				}
      }
			return true;
		},
    
    drawBlocks: function (params) {

    }


  }


  window.Board = Board
})(window)