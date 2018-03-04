(function (window) {
  'use strict'

  function Block(blockType) {
    //类型指定用哪一种方块、
    this.blockType = blockType
    this.size = TetrisConfig.bolckSize
    //方块原始大小
    this.originalSize = 32
    this.sprite = window.ResourceManager.getResource('blocks');  //获取图片
  }

  Block.prototype = {
    constructor: Block,
    
    draw: function (context, x, y, blockType, size) {
      size = size || this.size
      context.drawImage(this.sprite, ((blockType || this.blockType) - 1) * this.originalSize, 0, this.originalSize, this.originalSize, x * size, y * size, size, size);
    }

  }

  window.Block = Block;
})(window)