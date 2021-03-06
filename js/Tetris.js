(function (window) {
  'use strict';

  // var intervalId;  //计时器id
  // var speed = 400;

  function Tetris() {
    this.board = new Board(this)
    // 绘制得分
    this.score = new Score()
    // 绘制计时
    this.timer = new Timer()
    // 绘制级别
    this.leavl = new Leavl()
    // 绘制下一个方块
    this.nextshape = new NextShape();
    //绘制最高分
    this.highscore = new HighScore();

    this._state = 'playing';

    (new Keyboard()).init(this.board);    //初始化键盘事件，启动keyboard
  }

  Tetris.prototype = {
    constructor: Tetris,

    // _startTick: function () {
    //   var self = this
    //   window.TetrisConfig.intervalId = windew.setInterval(function () {
    //     self.board.tick()
    //   }, TetrisConfig.speed)
    // },

    _startTick: function () {
      var self = this
      window.TetrisConfig.intervalid = window.setInterval(function () {
        self.board.tick()
      }, TetrisConfig.speed)
    },
    
    startGame: function () {
      this._startTick()
    },

    endGame: function () {
      this._stopTick()
      this.timer.stop()
    },

    pause: function () {
      if( this._state === 'stop'){
        return
      }

      this._state === 'pause'

      this._stopTick()

      this.timer.pause()
    },

    remuse: function () {
      if( this._state === 'stop'){
        return
      }

      this._state = 'playing';
			this._startTick();
			this.timer.resume();
    }
  }

  window.Tetris = Tetris
})(window)