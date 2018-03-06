/**
 * Created by cherry on 2018/1/7.
 */
(function (window) {
  function Timer() {
    this.canvas = new Canvas('timer',100,60)
    this.time = 0
    this._init()

    this.timeId
  }

  Timer.prototype = {
    constructor: Timer,
    _init: function() {
      this._render()
      let self = this
      this.resume()
      
    },
    _format: function (second) {
      let hours = Math.floor(second/(60*60))
      second = second - hours * 3600
      let minutes = Math.floor(second/60)
      second = second - minutes * 60
      if( hours < 10){
        hours = '0' + hours
      }
      if( minutes < 10 ){
        minutes = '0' + minutes
      }
      if( second < 10 ){
        second = '0' + second
      }

      return hours + ':' + minutes + ':' + second
    },

    _render: function () {
      this.canvas.drawText(this._format(this.time))
    },

    pause: function () {
      clearInterval(this.timeId)
    },

    resume: function () {
      let self = this
      this.timeId = window.setInterval(function () {
        self.time += 1
        self._render()
      }, 1000)
    },

    stop: function () {
      this.pause()
    }

  }

  window.Timer = Timer
})(window)