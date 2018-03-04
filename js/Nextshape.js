/**
 * Created by cherry on 2018/1/7.
 */
(function (window) {
  'use strict'
  function NextShape() {
    this.canvas = new Canvas('nextshape',100,70)

    this._init()
  }

  NextShape.prototype = {
    constructor: NextShape,

    _init: function () {
      this.rows = 4
      this.cols = 6
    },
    render: function (shape) {
      this.canvas.clear()
      shape.draw(this.canvas.context,20)

    }
  }

  window.NextShape = NextShape
})(window)