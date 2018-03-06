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
      }else{
        this.addShapeToBoardList()

        if(this.gameInst._status === 'over'){
          this.gameInst.endGame()
          return
        }

        this.clearFullRows()

        this.shape = this.nextShape

        this.shape.setPosition(this.cols,this.rows,true)

        this._buildNextShape()
      }
   
      this.refresh()
      this.shape.draw(this.context)
    },

    refresh: function (params) {
      this.canvas.clear()
      this.context.putImageData(this.gridImageData, 0, 0)
      this.drawBlocks()
    },

    addShapeToBoardList: function () {			//方块堆砌
			for (var y = 0; y < this.shape.layout.length; y++) {
				for (var x = 0; x < this.shape.layout[y].length; x++) {
					if (this.shape.layout[y][x]) {		//
						var boardX = this.shape.x + x;		//
						var boardY = this.shape.y + y;
            if (this.boardList[boardY][boardX]) {		//如果碰撞上
							// todo Game over
							this.gameInst._state = 'over';
							return;   //停止加入
						}
						else {
							this.boardList[boardY][boardX] = this.shape.blockType;
							// this.boardList[boardY][boardX] = 1;
						}
					}
				}
			}
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
    
    drawBlocks: function () {
      for(var y = 0; y < this.rows; y++){
        for(var x = 0;x< this.cols;x++){
          if(this.boardList[y][x]){
            this.shape.block.draw(this.context,x,y,this.boardList[y][x])
          }
        }
      }
    },
    createEmptyRow: function () {   		//创建行
			var emptyArr = [];
			for (var i = 0; i < this.cols; i++) {
				emptyArr.push(0);
			}
			return emptyArr;
		},
    clearFullRows: function(){
      var self = this;
			var lines = 0;
			for (var y = this.rows - 1; y >= 0; y--) {
				var filled = this.boardList[y].filter(function (item) { return item > 0; }).length === this.cols;
				if (filled && y) {
					this.boardList.splice(y, 1);			//boardList是什么？？？、
					this.boardList.unshift(this.createEmptyRow());  //追加到第一行
					lines++;
					y++;    //
				}
      }

      let score = lines * 10 * lines

      let totalScore = this.gameInst.score.addScore(score)
      this.gameInst.highscore.checkScore(totalScore);   
    }
  }


  window.Board = Board
})(window)