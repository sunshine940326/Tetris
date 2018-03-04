(function (window) {
  function Canvas(canvasId,width,height) {
    this.canvasId = canvasId
    this.el = document.getElementById(canvasId)

    if( !this.el ){
      throw new Error("Must provider a right canvas id");
    }

    this.context = this.el.getContext('2d')

    this.width = width || window.innerWidth

    this.height = height || window.innerHeight

    this._init()
  }

  Canvas.prototype = {
    constructor: Canvas,
    
    _init:function () {
      this.el.width = this.width;    //this.el.width  style里面属性,防止拉伸压缩
      this.el.height = this.height;
    },

    clear: function (fromX,fromY,toX,toY) {
      fromX = fromX || 0
      fromY = fromY || 0
      toX = toX || this.width
      toY = toY || this.height
      this.context.clearRect(fromX,fromY,toX,toY)
    },

    drawText: function (text,x,y) {
      this.clear(0,0)
      this.context.font = '25px Arial'
      this.context.fillStyle = '#CE670D'
      this.context.textAlign = 'center'
      this.context.fillText(text,x === undefined ? (this.width/2):x,y === undefined ? (this.height/2) : y )
    }
  },

  window.Canvas = Canvas
})(window)