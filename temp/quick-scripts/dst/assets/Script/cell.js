
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/cell.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbc3cQxtHpPj77TncyB18gQ', 'cell');
// Script/cell.js

"use strict";

/**
 * @author uu
 * @file 单个方块控制
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    _status: 0,
    //1为可触发点击 2为已经消失
    _itemType: 0,
    //新增道具功能 1为双倍倍数 2为炸弹
    warningSprite: cc.Sprite,
    lightSprite: cc.Sprite
  },
  init: function init(g, data, width, itemType, pos) {
    this._game = g;
    this._status = 1;

    if (pos) {//cc.log('生成的方块', pos)
    }

    pos = pos || {
      x: data.x,
      y: data.y
    };
    this._itemType = itemType || 0;
    this.warningType = 0;
    this.isPush = false;
    this.bindEvent();
    this.color = data.color || Math.ceil(Math.random() * 4);
    this.colorSprite = this.node.getChildByName('color').getComponent(cc.Sprite);
    this.colorSprite.spriteFrame = itemType ? g.propSpriteFrame[(itemType - 1) * 4 + this.color - 1] : this._game.blockSprite[this.color - 1];
    this.warningSprite.spriteFrame = '';
    this._width = width;
    this._controller = g._controller; // 计算宽

    this.lightSprite.node.active = false; //  this.lightSprite.spriteFrame = this._game.blockSprite[this.color - 1]

    this.node.width = this.node.height = width;
    this.startTime = data.startTime;
    this.iid = data.y;
    this.jid = data.x; // console.log('生成方块位置', data.y, data.x)

    this.node.x = -(730 / 2 - g.gap - width / 2) + pos.x * (width + g.gap);
    this.node.y = 730 / 2 - g.gap - width / 2 - pos.y * (width + g.gap);
    this.node.rotation = 0;
    this.playStartAction();
  },
  changeItemType: function changeItemType(type) {
    this._itemType = type;
    this.colorSprite.spriteFrame = type ? this._game.propSpriteFrame[(type - 1) * 4 + this.color - 1] : this._game.blockSprite[this.color - 1];
  },
  onWarning: function onWarning(type) {
    this.warningSprite.spriteFrame = this._game.warningSpriteFrame[type - 1] || '';
    this.warningType = type; //   this.lightSprite.node.active = true

    var action1 = cc.blink(1, 10); //   this.lightSprite.node.runAction(action1)
  },
  warningInit: function warningInit() {
    this.warningSprite.spriteFrame = ''; //  this.lightSprite.node.active = false

    this.isPush = false;
  },
  growInit: function growInit() {
    this.growType = 0;
    this.colorSprite.node.height = this.colorSprite.node.width = this._width;
    this.colorSprite.node.y = this.colorSprite.node.x = 0;
  },
  grow: function grow(type) {
    //1234 上下左右
    switch (type) {
      case 1:
        if (this.growType != 2) {
          this.colorSprite.node.height += this._game.gap * 2;
          this.colorSprite.node.y += this._game.gap;
          this.growType = 1;
        }

        break;

      case 2:
        if (this.growType != 2) {
          this.colorSprite.node.height += this._game.gap * 2;
          this.colorSprite.node.y -= this._game.gap;
          this.growType = 1;
        }

        break;

      case 3:
        if (this.growType != 1) {
          this.colorSprite.node.width += this._game.gap * 2;
          this.colorSprite.node.x -= this._game.gap;
          this.growType = 2;
        }

        break;

      case 4:
        if (this.growType != 1) {
          this.colorSprite.node.width += this._game.gap * 2;
          this.colorSprite.node.x += this._game.gap;
          this.growType = 2;
        }

        break;
    }
  },
  bindEvent: function bindEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouched, this);
  },
  // 用户点击 或者被其他方块触发
  onTouched: function onTouched(color, isChain, isBomb, time) {
    var _this = this;

    //道具新增参数 isChain是否连锁 isBomb是否强制消除
    if (time) {
      setTimeout(function () {
        _this.onTouched(color, false, isBomb);
      }, time);
      return;
    }

    isChain = JSON.stringify(isChain) == 'null' ? true : isChain;
    isBomb = isBomb ? isBomb : false;
    color = color || this.color;
    var self = this; // 爆炸触发

    if (this._status == 1 && isBomb == true) {
      this._status = 2;
      this.playDieAction().then(function () {
        _this.onBlockPop(color, isChain, isBomb);
      });
      return;
    }

    if (color.type) {
      // 一定是用户主动触发 保存这个坐标给game
      if (this.isSingle && this._itemType <= 1) {
        this.node.scale = 1;

        this._game._score.tipBox.init(this._game._score, 3);

        var action1 = cc.scaleTo(0.1, 1.1, 0.9);
        var action2 = cc.scaleTo(0.3, 1).easing(cc.easeBackOut(2.0));
        var action = cc.sequence(action1, action2);
        this.node.runAction(action);
        return;
      } // console.log('方块位置', this.iid, this.jid, this._itemType)


      color = this.color;

      if (this._status == 1 && this._game._status == 1 && this.color == color) {
        this._game.onUserTouched(this.iid, this.jid, this._itemType, this.color, this.warningType, {
          x: this.node.x,
          y: this.node.y
        });

        this._game._score.onStep(-1).then(function (res) {
          if (res) {
            _this.playDieAction().then(function () {
              _this.onBlockPop(color, null, null);
            });
          }
        });
      }
    } else {
      // 由其他方块触发
      if (this._status == 1 && this._game._status == 5 && this.color == color) {
        this.playDieAction().then(function () {
          _this.onBlockPop(color, null, null);
        });
      }
    }
  },
  onBlockPop: function onBlockPop(color, isChain, isBomb) {
    var self = this;
    isChain = JSON.stringify(isChain) == 'null' ? true : isChain;
    isBomb = isBomb ? isBomb : false;

    self._game.checkNeedFall();

    self._game._status = 5;

    self._controller.musicMgr.onPlayAudio(0 //self._game._score.chain - 1
    );

    if (this._itemType != 0) {
      // console.log("触发了道具", this._itemType)
      self._game.onItem(this._itemType, this.color, {
        x: this.node.x,
        y: this.node.y
      });
    }

    self._game._score.addScore(cc.v2(this.node.x, this.node.y - this.node.width + this._game.gap), this._itemType == 3 ? this._game._controller.config.json.propConfig[2].score : null); // 连锁状态


    if (isChain) {
      if (self.iid - 1 >= 0) {
        self._game.map[self.iid - 1][self.jid].getComponent('cell').onTouched(color);
      }

      if (self.iid + 1 < this._game.rowNum) {
        self._game.map[self.iid + 1][self.jid].getComponent('cell').onTouched(color);
      }

      if (self.jid - 1 >= 0) {
        self._game.map[self.iid][self.jid - 1].getComponent('cell').onTouched(color);
      }

      if (self.jid + 1 < this._game.rowNum) {
        self._game.map[self.iid][self.jid + 1].getComponent('cell').onTouched(color);
      }
    }
  },
  playFallAction: function playFallAction(y, data) {
    var _this2 = this;

    //下降了几个格子
    this._status = 0;

    if (data) {
      this.iid = data.y;
      this.jid = data.x;
    }

    var action = cc.moveBy(0.25, 0, -y * (this._game.gap + this._game.blockWidth)).easing(cc.easeBounceOut(5 / y)); //1 * y / this._game.animationSpeed

    var seq = cc.sequence(action, cc.callFunc(function () {
      _this2._status = 1; //  this._game.checkNeedGenerator()
    }, this));
    this.node.runAction(seq);
  },
  playStartAction: function playStartAction() {
    var _this3 = this;

    this.node.scaleX = 0;
    this.node.scaleY = 0;
    var action = cc.scaleTo(0.8 / this._game.animationSpeed, 1, 1).easing(cc.easeBackOut());
    var seq = cc.sequence(action, cc.callFunc(function () {
      _this3._status = 1;
    }, this)); // 如果有延迟时间就用延迟时间

    if (this.startTime) {
      setTimeout(function () {
        _this3.node.runAction(seq);
      }, this.startTime / 1 // (cc.game.getFrameRate() / 60)
      );
    } else {
      this.node.runAction(seq);
    }
  },
  playDieAction: function playDieAction() {
    var _this4 = this;

    var self = this;
    clearTimeout(this.surfaceTimer);
    this.node.stopAllActions();
    this._status = 2;
    this.node.scaleX = 1;
    this.node.scaleY = 1;
    return new Promise(function (resolve, reject) {
      var action;

      if (_this4.warningSprite.spriteFrame) {
        //有道具预警
        var action1 = cc.scaleTo(0.2 / self._game.animationSpeed, 1.1);
        var action2 = cc.moveTo(0.2 / self._game.animationSpeed, _this4._game.target.x, _this4._game.target.y);
        var action3 = cc.scaleTo(0.2, 0);
        var seq = cc.sequence(action1, cc.callFunc(function () {
          resolve('');
        }, _this4), cc.spawn(action2, action3));
      } else {
        action = cc.scaleTo(0.2 / self._game.animationSpeed, 0, 0);
        var seq = cc.sequence(action, cc.callFunc(function () {
          resolve('');
        }, _this4));
      }

      self.node.runAction(seq);
    });
  },
  surfaceAction: function surfaceAction(dela) {
    var _this5 = this;

    this.surfaceTimer = setTimeout(function () {
      var action = cc.scaleTo(0.4 / _this5._game.animationSpeed, 0.8, 0.8);
      var action1 = cc.scaleTo(0.4 / _this5._game.animationSpeed, 1, 1);

      _this5.node.runAction(cc.sequence(action, action1));
    }, dela);
  },
  generatePropAction: function generatePropAction() {},
  generateItem: function generateItem(type) {
    this._itemType = type;
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjZWxsLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiX3N0YXR1cyIsIl9pdGVtVHlwZSIsIndhcm5pbmdTcHJpdGUiLCJTcHJpdGUiLCJsaWdodFNwcml0ZSIsImluaXQiLCJnIiwiZGF0YSIsIndpZHRoIiwiaXRlbVR5cGUiLCJwb3MiLCJfZ2FtZSIsIngiLCJ5Iiwid2FybmluZ1R5cGUiLCJpc1B1c2giLCJiaW5kRXZlbnQiLCJjb2xvciIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiY29sb3JTcHJpdGUiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJzcHJpdGVGcmFtZSIsInByb3BTcHJpdGVGcmFtZSIsImJsb2NrU3ByaXRlIiwiX3dpZHRoIiwiX2NvbnRyb2xsZXIiLCJhY3RpdmUiLCJoZWlnaHQiLCJzdGFydFRpbWUiLCJpaWQiLCJqaWQiLCJnYXAiLCJyb3RhdGlvbiIsInBsYXlTdGFydEFjdGlvbiIsImNoYW5nZUl0ZW1UeXBlIiwidHlwZSIsIm9uV2FybmluZyIsIndhcm5pbmdTcHJpdGVGcmFtZSIsImFjdGlvbjEiLCJibGluayIsIndhcm5pbmdJbml0IiwiZ3Jvd0luaXQiLCJncm93VHlwZSIsImdyb3ciLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsIm9uVG91Y2hlZCIsImlzQ2hhaW4iLCJpc0JvbWIiLCJ0aW1lIiwic2V0VGltZW91dCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZWxmIiwicGxheURpZUFjdGlvbiIsInRoZW4iLCJvbkJsb2NrUG9wIiwiaXNTaW5nbGUiLCJzY2FsZSIsIl9zY29yZSIsInRpcEJveCIsInNjYWxlVG8iLCJhY3Rpb24yIiwiZWFzaW5nIiwiZWFzZUJhY2tPdXQiLCJhY3Rpb24iLCJzZXF1ZW5jZSIsInJ1bkFjdGlvbiIsIm9uVXNlclRvdWNoZWQiLCJvblN0ZXAiLCJyZXMiLCJjaGVja05lZWRGYWxsIiwibXVzaWNNZ3IiLCJvblBsYXlBdWRpbyIsIm9uSXRlbSIsImFkZFNjb3JlIiwidjIiLCJjb25maWciLCJqc29uIiwicHJvcENvbmZpZyIsInNjb3JlIiwibWFwIiwicm93TnVtIiwicGxheUZhbGxBY3Rpb24iLCJtb3ZlQnkiLCJibG9ja1dpZHRoIiwiZWFzZUJvdW5jZU91dCIsInNlcSIsImNhbGxGdW5jIiwic2NhbGVYIiwic2NhbGVZIiwiYW5pbWF0aW9uU3BlZWQiLCJjbGVhclRpbWVvdXQiLCJzdXJmYWNlVGltZXIiLCJzdG9wQWxsQWN0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibW92ZVRvIiwidGFyZ2V0IiwiYWN0aW9uMyIsInNwYXduIiwic3VyZmFjZUFjdGlvbiIsImRlbGEiLCJnZW5lcmF0ZVByb3BBY3Rpb24iLCJnZW5lcmF0ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUCxhQUFTRCxFQUFFLENBQUNFLFNBREw7QUFFUEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLE9BQU8sRUFBRSxDQURDO0FBQ0U7QUFDWkMsSUFBQUEsU0FBUyxFQUFFLENBRkQ7QUFFSTtBQUNkQyxJQUFBQSxhQUFhLEVBQUVOLEVBQUUsQ0FBQ08sTUFIUjtBQUlWQyxJQUFBQSxXQUFXLEVBQUVSLEVBQUUsQ0FBQ087QUFKTixHQUZMO0FBUVBFLEVBQUFBLElBUk8sZ0JBUUZDLENBUkUsRUFRQ0MsSUFSRCxFQVFPQyxLQVJQLEVBUWNDLFFBUmQsRUFRd0JDLEdBUnhCLEVBUTZCO0FBQ2xDLFNBQUtDLEtBQUwsR0FBYUwsQ0FBYjtBQUNBLFNBQUtOLE9BQUwsR0FBZSxDQUFmOztBQUNBLFFBQUlVLEdBQUosRUFBUyxDQUNQO0FBQ0Q7O0FBQ0RBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJO0FBQ1hFLE1BQUFBLENBQUMsRUFBRUwsSUFBSSxDQUFDSyxD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QUwsR0FBaUJzQyxJQUFqQjtBQUNEO0FBalFNLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciB1dVxuICogQGZpbGUg5Y2V5Liq5pa55Z2X5o6n5Yi2XG4gKi9cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgX3N0YXR1czogMCwgLy8x5Li65Y+v6Kem5Y+R54K55Ye7IDLkuLrlt7Lnu4/mtojlpLFcbiAgICBfaXRlbVR5cGU6IDAsIC8v5paw5aKe6YGT5YW35Yqf6IO9IDHkuLrlj4zlgI3lgI3mlbAgMuS4uueCuOW8uVxuICAgIHdhcm5pbmdTcHJpdGU6IGNjLlNwcml0ZSxcbiAgICBsaWdodFNwcml0ZTogY2MuU3ByaXRlLFxuICB9LFxuICBpbml0KGcsIGRhdGEsIHdpZHRoLCBpdGVtVHlwZSwgcG9zKSB7XG4gICAgdGhpcy5fZ2FtZSA9IGdcbiAgICB0aGlzLl9zdGF0dXMgPSAxXG4gICAgaWYgKHBvcykge1xuICAgICAgLy9jYy5sb2coJ+eUn+aIkOeahOaWueWdlycsIHBvcylcbiAgICB9XG4gICAgcG9zID0gcG9zIHx8IHtcbiAgICAgIHg6IGRhdGEueCxcbiAgICAgIHk6IGRhdGEueVxuICAgIH1cbiAgICB0aGlzLl9pdGVtVHlwZSA9IGl0ZW1UeXBlIHx8IDBcbiAgICB0aGlzLndhcm5pbmdUeXBlID0gMFxuICAgIHRoaXMuaXNQdXNoID0gZmFsc2VcbiAgICB0aGlzLmJpbmRFdmVudCgpXG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3IgfHwgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiA0KVxuICAgIHRoaXMuY29sb3JTcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbG9yJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcbiAgICB0aGlzLmNvbG9yU3ByaXRlLnNwcml0ZUZyYW1lID0gaXRlbVR5cGUgPyBnLnByb3BTcHJpdGVGcmFtZVsoaXRlbVR5cGUgLSAxKSAqIDQgKyB0aGlzLmNvbG9yIC0gMV0gOiB0aGlzLl9nYW1lLmJsb2NrU3ByaXRlW3RoaXMuY29sb3IgLSAxXVxuICAgIHRoaXMud2FybmluZ1Nwcml0ZS5zcHJpdGVGcmFtZSA9ICcnXG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aFxuICAgIHRoaXMuX2NvbnRyb2xsZXIgPSBnLl9jb250cm9sbGVyXG4gICAgLy8g6K6h566X5a69XG4gICAgdGhpcy5saWdodFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgLy8gIHRoaXMubGlnaHRTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLl9nYW1lLmJsb2NrU3ByaXRlW3RoaXMuY29sb3IgLSAxXVxuICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMubm9kZS5oZWlnaHQgPSB3aWR0aFxuICAgIHRoaXMuc3RhcnRUaW1lID0gZGF0YS5zdGFydFRpbWVcbiAgICB0aGlzLmlpZCA9IGRhdGEueVxuICAgIHRoaXMuamlkID0gZGF0YS54XG4gICAgLy8gY29uc29sZS5sb2coJ+eUn+aIkOaWueWdl+S9jee9ricsIGRhdGEueSwgZGF0YS54KVxuICAgIHRoaXMubm9kZS54ID0gLSg3MzAgLyAyIC0gZy5nYXAgLSB3aWR0aCAvIDIpICsgcG9zLnggKiAod2lkdGggKyBnLmdhcClcbiAgICB0aGlzLm5vZGUueSA9ICg3MzAgLyAyIC0gZy5nYXAgLSB3aWR0aCAvIDIpIC0gcG9zLnkgKiAod2lkdGggKyBnLmdhcClcbiAgICB0aGlzLm5vZGUucm90YXRpb24gPSAwXG4gICAgdGhpcy5wbGF5U3RhcnRBY3Rpb24oKVxuXHR9LFxuXHRjaGFuZ2VJdGVtVHlwZSh0eXBlKXtcblx0XHR0aGlzLl9pdGVtVHlwZT10eXBlXG5cdFx0dGhpcy5jb2xvclNwcml0ZS5zcHJpdGVGcmFtZSA9IHR5cGUgPyB0aGlzLl9nYW1lLnByb3BTcHJpdGVGcmFtZVsodHlwZSAtIDEpICogNCArIHRoaXMuY29sb3IgLSAxXSA6IHRoaXMuX2dhbWUuYmxvY2tTcHJpdGVbdGhpcy5jb2xvciAtIDFdXG5cdH0sXG4gIG9uV2FybmluZyh0eXBlKSB7XG4gICAgdGhpcy53YXJuaW5nU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5fZ2FtZS53YXJuaW5nU3ByaXRlRnJhbWVbdHlwZSAtIDFdIHx8ICcnXG4gICAgdGhpcy53YXJuaW5nVHlwZSA9IHR5cGVcbiAgICAvLyAgIHRoaXMubGlnaHRTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgbGV0IGFjdGlvbjEgPSBjYy5ibGluaygxLCAxMClcbiAgICAvLyAgIHRoaXMubGlnaHRTcHJpdGUubm9kZS5ydW5BY3Rpb24oYWN0aW9uMSlcbiAgfSxcbiAgd2FybmluZ0luaXQoKSB7XG4gICAgdGhpcy53YXJuaW5nU3ByaXRlLnNwcml0ZUZyYW1lID0gJydcbiAgICAvLyAgdGhpcy5saWdodFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy5pc1B1c2ggPSBmYWxzZVxuICB9LFxuICBncm93SW5pdCgpIHtcbiAgICB0aGlzLmdyb3dUeXBlID0gMFxuICAgIHRoaXMuY29sb3JTcHJpdGUubm9kZS5oZWlnaHQgPSB0aGlzLmNvbG9yU3ByaXRlLm5vZGUud2lkdGggPSB0aGlzLl93aWR0aFxuICAgIHRoaXMuY29sb3JTcHJpdGUubm9kZS55ID0gdGhpcy5jb2xvclNwcml0ZS5ub2RlLnggPSAwXG4gIH0sXG4gIGdyb3codHlwZSkgeyAvLzEyMzQg5LiK5LiL5bem5Y+zXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmICh0aGlzLmdyb3dUeXBlICE9IDIpIHtcbiAgICAgICAgICB0aGlzLmNvbG9yU3ByaXRlLm5vZGUuaGVpZ2h0ICs9IHRoaXMuX2dhbWUuZ2FwICogMlxuICAgICAgICAgIHRoaXMuY29sb3JTcHJpdGUubm9kZS55ICs9IHRoaXMuX2dhbWUuZ2FwXG4gICAgICAgICAgdGhpcy5ncm93VHlwZSA9IDFcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBpZiAodGhpcy5ncm93VHlwZSAhPSAyKSB7XG4gICAgICAgICAgdGhpcy5jb2xvclNwcml0ZS5ub2RlLmhlaWdodCArPSB0aGlzLl9nYW1lLmdhcCAqIDJcbiAgICAgICAgICB0aGlzLmNvbG9yU3ByaXRlLm5vZGUueSAtPSB0aGlzLl9nYW1lLmdhcFxuICAgICAgICAgIHRoaXMuZ3Jvd1R5cGUgPSAxXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaWYgKHRoaXMuZ3Jvd1R5cGUgIT0gMSkge1xuICAgICAgICAgIHRoaXMuY29sb3JTcHJpdGUubm9kZS53aWR0aCArPSB0aGlzLl9nYW1lLmdhcCAqIDJcbiAgICAgICAgICB0aGlzLmNvbG9yU3ByaXRlLm5vZGUueCAtPSB0aGlzLl9nYW1lLmdhcFxuICAgICAgICAgIHRoaXMuZ3Jvd1R5cGUgPSAyXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHRoaXMuZ3Jvd1R5cGUgIT0gMSkge1xuICAgICAgICAgIHRoaXMuY29sb3JTcHJpdGUubm9kZS53aWR0aCArPSB0aGlzLl9nYW1lLmdhcCAqIDJcbiAgICAgICAgICB0aGlzLmNvbG9yU3ByaXRlLm5vZGUueCArPSB0aGlzLl9nYW1lLmdhcFxuICAgICAgICAgIHRoaXMuZ3Jvd1R5cGUgPSAyXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0sXG4gIGJpbmRFdmVudCgpIHtcbiAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaGVkLCB0aGlzKVxuXG4gIH0sXG4gIC8vIOeUqOaIt+eCueWHuyDmiJbogIXooqvlhbbku5bmlrnlnZfop6blj5FcbiAgb25Ub3VjaGVkKGNvbG9yLCBpc0NoYWluLCBpc0JvbWIsIHRpbWUpIHsgLy/pgZPlhbfmlrDlop7lj4LmlbAgaXNDaGFpbuaYr+WQpui/numUgSBpc0JvbWLmmK/lkKblvLrliLbmtojpmaRcbiAgICBpZiAodGltZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKGNvbG9yLCBmYWxzZSwgaXNCb21iKVxuICAgICAgfSwgdGltZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpc0NoYWluID0gSlNPTi5zdHJpbmdpZnkoaXNDaGFpbikgPT0gJ251bGwnID8gdHJ1ZSA6IGlzQ2hhaW5cbiAgICBpc0JvbWIgPSBpc0JvbWIgPyBpc0JvbWIgOiBmYWxzZVxuICAgIGNvbG9yPWNvbG9yfHx0aGlzLmNvbG9yXG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgLy8g54iG54K46Kem5Y+RXG4gICAgaWYgKHRoaXMuX3N0YXR1cyA9PSAxICYmIGlzQm9tYiA9PSB0cnVlKSB7XG4gICAgICB0aGlzLl9zdGF0dXMgPSAyXG4gICAgICB0aGlzLnBsYXlEaWVBY3Rpb24oKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5vbkJsb2NrUG9wKGNvbG9yLCBpc0NoYWluLCBpc0JvbWIpXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGNvbG9yLnR5cGUpIHtcbiAgICAgIC8vIOS4gOWumuaYr+eUqOaIt+S4u+WKqOinpuWPkSDkv53lrZjov5nkuKrlnZDmoIfnu5lnYW1lXG4gICAgICBpZiAodGhpcy5pc1NpbmdsZSAmJiB0aGlzLl9pdGVtVHlwZSA8PSAxKSB7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDFcbiAgICAgICAgdGhpcy5fZ2FtZS5fc2NvcmUudGlwQm94LmluaXQodGhpcy5fZ2FtZS5fc2NvcmUsIDMpXG4gICAgICAgIGxldCBhY3Rpb24xID0gY2Muc2NhbGVUbygwLjEsIDEuMSwgMC45KVxuICAgICAgICBsZXQgYWN0aW9uMiA9IGNjLnNjYWxlVG8oMC4zLCAxKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoMi4wKSlcbiAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnNlcXVlbmNlKGFjdGlvbjEsIGFjdGlvbjIpXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oYWN0aW9uKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCfmlrnlnZfkvY3nva4nLCB0aGlzLmlpZCwgdGhpcy5qaWQsIHRoaXMuX2l0ZW1UeXBlKVxuICAgICAgY29sb3IgPSB0aGlzLmNvbG9yXG4gICAgICBpZiAodGhpcy5fc3RhdHVzID09IDEgJiYgdGhpcy5fZ2FtZS5fc3RhdHVzID09IDEgJiYgdGhpcy5jb2xvciA9PSBjb2xvcikge1xuICAgICAgICB0aGlzLl9nYW1lLm9uVXNlclRvdWNoZWQodGhpcy5paWQsIHRoaXMuamlkLCB0aGlzLl9pdGVtVHlwZSwgdGhpcy5jb2xvciwgdGhpcy53YXJuaW5nVHlwZSwge1xuICAgICAgICAgIHg6IHRoaXMubm9kZS54LFxuICAgICAgICAgIHk6IHRoaXMubm9kZS55XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuX2dhbWUuX3Njb3JlLm9uU3RlcCgtMSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgdGhpcy5wbGF5RGllQWN0aW9uKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25CbG9ja1BvcChjb2xvciwgbnVsbCwgbnVsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDnlLHlhbbku5bmlrnlnZfop6blj5FcbiAgICAgIGlmICh0aGlzLl9zdGF0dXMgPT0gMSAmJiB0aGlzLl9nYW1lLl9zdGF0dXMgPT0gNSAmJiB0aGlzLmNvbG9yID09IGNvbG9yKSB7XG4gICAgICAgIHRoaXMucGxheURpZUFjdGlvbigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25CbG9ja1BvcChjb2xvciwgbnVsbCwgbnVsbClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG9uQmxvY2tQb3AoY29sb3IsIGlzQ2hhaW4sIGlzQm9tYikge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIGlzQ2hhaW4gPSBKU09OLnN0cmluZ2lmeShpc0NoYWluKSA9PSAnbnVsbCcgPyB0cnVlIDogaXNDaGFpblxuICAgIGlzQm9tYiA9IGlzQm9tYiA/IGlzQm9tYiA6IGZhbHNlXG4gICAgc2VsZi5fZ2FtZS5jaGVja05lZWRGYWxsKClcbiAgICBzZWxmLl9nYW1lLl9zdGF0dXMgPSA1XG4gICAgc2VsZi5fY29udHJvbGxlci5tdXNpY01nci5vblBsYXlBdWRpbygwXG4gICAgICAvL3NlbGYuX2dhbWUuX3Njb3JlLmNoYWluIC0gMVxuICAgIClcbiAgICBpZiAodGhpcy5faXRlbVR5cGUgIT0gMCkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCLop6blj5HkuobpgZPlhbdcIiwgdGhpcy5faXRlbVR5cGUpXG5cbiAgICAgIHNlbGYuX2dhbWUub25JdGVtKHRoaXMuX2l0ZW1UeXBlLCB0aGlzLmNvbG9yLCB7XG4gICAgICAgIHg6IHRoaXMubm9kZS54LFxuICAgICAgICB5OiB0aGlzLm5vZGUueVxuICAgICAgfSlcbiAgICB9XG4gICAgc2VsZi5fZ2FtZS5fc2NvcmUuYWRkU2NvcmUoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55IC0gdGhpcy5ub2RlLndpZHRoICsgdGhpcy5fZ2FtZS5nYXApLCB0aGlzLl9pdGVtVHlwZSA9PSAzID8gdGhpcy5fZ2FtZS5fY29udHJvbGxlci5jb25maWcuanNvbi5wcm9wQ29uZmlnWzJdLnNjb3JlIDogbnVsbClcblxuICAgIC8vIOi/numUgeeKtuaAgVxuICAgIGlmIChpc0NoYWluKSB7XG4gICAgICBpZiAoKHNlbGYuaWlkIC0gMSkgPj0gMCkge1xuICAgICAgICBzZWxmLl9nYW1lLm1hcFtzZWxmLmlpZCAtIDFdW3NlbGYuamlkXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5vblRvdWNoZWQoY29sb3IpXG4gICAgICB9XG4gICAgICBpZiAoKHNlbGYuaWlkICsgMSkgPCB0aGlzLl9nYW1lLnJvd051bSkge1xuICAgICAgICBzZWxmLl9nYW1lLm1hcFtzZWxmLmlpZCArIDFdW3NlbGYuamlkXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5vblRvdWNoZWQoY29sb3IpXG4gICAgICB9XG4gICAgICBpZiAoKHNlbGYuamlkIC0gMSkgPj0gMCkge1xuICAgICAgICBzZWxmLl9nYW1lLm1hcFtzZWxmLmlpZF1bc2VsZi5qaWQgLSAxXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5vblRvdWNoZWQoY29sb3IpXG4gICAgICB9XG4gICAgICBpZiAoKHNlbGYuamlkICsgMSkgPCB0aGlzLl9nYW1lLnJvd051bSkge1xuICAgICAgICBzZWxmLl9nYW1lLm1hcFtzZWxmLmlpZF1bc2VsZi5qaWQgKyAxXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5vblRvdWNoZWQoY29sb3IpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbGF5RmFsbEFjdGlvbih5LCBkYXRhKSB7IC8v5LiL6ZmN5LqG5Yeg5Liq5qC85a2QXG4gICAgdGhpcy5fc3RhdHVzID0gMFxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLmlpZCA9IGRhdGEueVxuICAgICAgdGhpcy5qaWQgPSBkYXRhLnhcbiAgICB9XG4gICAgbGV0IGFjdGlvbiA9IGNjLm1vdmVCeSgwLjI1LCAwLCAteSAqICh0aGlzLl9nYW1lLmdhcCArIHRoaXMuX2dhbWUuYmxvY2tXaWR0aCkpLmVhc2luZyhjYy5lYXNlQm91bmNlT3V0KDUgLyB5KSkgLy8xICogeSAvIHRoaXMuX2dhbWUuYW5pbWF0aW9uU3BlZWRcbiAgICBsZXQgc2VxID0gY2Muc2VxdWVuY2UoYWN0aW9uLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICB0aGlzLl9zdGF0dXMgPSAxXG4gICAgICAvLyAgdGhpcy5fZ2FtZS5jaGVja05lZWRHZW5lcmF0b3IoKVxuICAgIH0sIHRoaXMpKVxuICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKVxuICB9LFxuICBwbGF5U3RhcnRBY3Rpb24oKSB7XG4gICAgdGhpcy5ub2RlLnNjYWxlWCA9IDBcbiAgICB0aGlzLm5vZGUuc2NhbGVZID0gMFxuICAgIGxldCBhY3Rpb24gPSBjYy5zY2FsZVRvKDAuOCAvIHRoaXMuX2dhbWUuYW5pbWF0aW9uU3BlZWQsIDEsIDEpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKVxuICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShhY3Rpb24sIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgIHRoaXMuX3N0YXR1cyA9IDFcbiAgICB9LCB0aGlzKSlcbiAgICAvLyDlpoLmnpzmnInlu7bov5/ml7bpl7TlsLHnlKjlu7bov5/ml7bpl7RcbiAgICBpZiAodGhpcy5zdGFydFRpbWUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKVxuICAgICAgICB9LCB0aGlzLnN0YXJ0VGltZSAvIDFcbiAgICAgICAgLy8gKGNjLmdhbWUuZ2V0RnJhbWVSYXRlKCkgLyA2MClcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpXG4gICAgfVxuICB9LFxuICBwbGF5RGllQWN0aW9uKCkge1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnN1cmZhY2VUaW1lcilcbiAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKVxuICAgIHRoaXMuX3N0YXR1cyA9IDJcbiAgICB0aGlzLm5vZGUuc2NhbGVYID0gMVxuICAgIHRoaXMubm9kZS5zY2FsZVkgPSAxXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBhY3Rpb25cbiAgICAgIGlmICh0aGlzLndhcm5pbmdTcHJpdGUuc3ByaXRlRnJhbWUpIHsgLy/mnInpgZPlhbfpooToraZcbiAgICAgICAgbGV0IGFjdGlvbjEgPSBjYy5zY2FsZVRvKDAuMiAvIHNlbGYuX2dhbWUuYW5pbWF0aW9uU3BlZWQsIDEuMSlcbiAgICAgICAgbGV0IGFjdGlvbjIgPSBjYy5tb3ZlVG8oMC4yIC8gc2VsZi5fZ2FtZS5hbmltYXRpb25TcGVlZCwgdGhpcy5fZ2FtZS50YXJnZXQueCwgdGhpcy5fZ2FtZS50YXJnZXQueSlcbiAgICAgICAgbGV0IGFjdGlvbjMgPSBjYy5zY2FsZVRvKDAuMiwgMClcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGFjdGlvbjEsIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCcnKVxuICAgICAgICB9LCB0aGlzKSwgY2Muc3Bhd24oYWN0aW9uMiwgYWN0aW9uMykpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3Rpb24gPSBjYy5zY2FsZVRvKDAuMiAvIHNlbGYuX2dhbWUuYW5pbWF0aW9uU3BlZWQsIDAsIDApXG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShhY3Rpb24sIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKCcnKVxuICAgICAgICB9LCB0aGlzKSlcbiAgICAgIH1cbiAgICAgIHNlbGYubm9kZS5ydW5BY3Rpb24oc2VxKVxuICAgIH0pO1xuICB9LFxuICBzdXJmYWNlQWN0aW9uKGRlbGEpIHtcbiAgICB0aGlzLnN1cmZhY2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGV0IGFjdGlvbiA9IGNjLnNjYWxlVG8oMC40IC8gdGhpcy5fZ2FtZS5hbmltYXRpb25TcGVlZCwgMC44LCAwLjgpXG4gICAgICBsZXQgYWN0aW9uMSA9IGNjLnNjYWxlVG8oMC40IC8gdGhpcy5fZ2FtZS5hbmltYXRpb25TcGVlZCwgMSwgMSlcbiAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWN0aW9uLCBhY3Rpb24xKSlcbiAgICB9LCBkZWxhKVxuICB9LFxuICBnZW5lcmF0ZVByb3BBY3Rpb24oKSB7XG5cbiAgfSxcbiAgZ2VuZXJhdGVJdGVtKHR5cGUpIHtcbiAgICB0aGlzLl9pdGVtVHlwZSA9IHR5cGVcbiAgfSxcbn0pOyJdfQ==