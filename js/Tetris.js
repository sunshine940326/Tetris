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






    }

})(window)