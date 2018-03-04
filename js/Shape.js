(function (window) {
  'use strict'

  let shapeLayouts = [		//
    [[0, 1, 0], [1, 1, 1]],
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1], [1, 1], [1, 0]],
    [[1, 0], [1, 1], [0, 1]],
    [[1, 0, 1], [1, 1, 1]],
    [[0, 1], [1, 1]],
    [[1, 1]],
    [[1, 1], [1, 0], [1, 0]],
    [[1, 1], [0, 1], [0, 1]]
  ];

  let random = function (minValue, maxValue) {
    return minValue + Math.floor(Math.random() * maxValue)
  }

  let styleCount = TetrisConfig.styleCount;  //七种颜色

  function Shape(params) {
    this.x = 0
    this.y = 0

    this.blockType = random(1, styleCount)
    this.block = new Block(this.blockType)
    this.layout = shapeLayouts[random(0, shapeLayouts.length)]
  }

  Shape.prototype = {
    constructor: Shape,
    draw: function (context, size) {
      for (let i = 0; i < this.layout.length; i++) {
        for (let j = 0; j < this.layout[i].length; j++) {
          if (this.layout[i][j]) {
            // this.block.draw(context, j + this.x, i + this.y, this.blockType)
            this.block.draw(context, j + this.x, i + this.y, undefined, size);  //????  

          }
        }
      }
    },

    rotate: function (params) {
      let newLayout = []
      for(let y = 0; y < this.layout[0].length;y++ ){
        newLayout[y] = []
        for( let x = 0; x < this.layout.length;x ++){
          newLayout[y][x] = this.layout[this.layout.length - 1 - x][y]
        }
      }
      this.layout = newLayout
      this._setLayout()
    },

    _setLayout: function () {
      if(this.x < 0){
        this.x = 0
      }

      if(this.y < 0){
        this.y = 0
      }

      if(this.x + this.layout[0].length > TetrisConfig.cols){
        this.x = TetrisConfig.cols - this.layout[0].length
      }

      if(this.y + this.layout.length > TetrisConfig.rols){
        this.y = TetrisConfig.rols - this.layout.length
      }
    },

    _getMaxCols: function () {
      let max = 0
      for (let i = 0; i < this.layout.length; i++) {
        max = Math.max(max, this.layout[i].length)
      }
      return max
    },

    _getMaxRows: function () {
      return this.layout.length;
    },

    setPosition: function (cols, rows, ignoreRows) {
      this.x = Math.floor((cols - this._getMaxCols()) / 2)
      if(!ignoreRows){
        this.y = Math.floor((rows - this._getMaxRows())/2)
      }
    }


  }


  window.Shape = Shape
})(window)