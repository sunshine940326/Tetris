/**
 * Created by cherry on 2018/1/7.
 */
(function (window) {
  function HighScore() {
    this.canvas = new Canvas('highscore',100,70)

    this.highScore = 0

    this._init()
  }

  HighScore.prototype = {
    constructor: HighScore,
    _init: function () {
      this.highscore = this._getScore()
      this._render()
    },

    _render:function () {
      this.canvas.drawText(this.highScore)
    },

    _getScore: function () {
      return window.localStorage.getItem('high-score') 
    },

    _setScore: function (value) {
      window.localStorage.setItem('high-score', value)
    },

    checkScore: function (score) {
      if( score > this.highScore){
        this.highScore = score
        this._setScore(this.highScore)
        this._render
      }
    }
  }

  window.HighScore = HighScore
})(window)