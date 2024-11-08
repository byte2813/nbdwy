
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47c77yOeKpPiJVINXipHohs', 'game');
// Script/game.js

"use strict";

/**
 * @author uu
 * @file 游戏控制
 */
var AC = require('action');

cc.Class({
  "extends": cc.Component,
  properties: {
    _status: 0,
    //0 未开始 1 游戏开始 2 游戏暂停 3 游戏结束 4 下落状态 5无法触摸状态
    blockPrefab: cc.Prefab,
    blockSprite: [cc.SpriteFrame],
    //todo: 换成动态生成 暂不处理
    warningSpriteFrame: [cc.SpriteFrame],
    propSpriteFrame: [cc.SpriteFrame],
    checkMgr: require("check"),
    revivePage: cc.Node,
    tutorialNode: cc.Node,
    shareBtn: cc.Node,
    shareSuccessDialog: cc.Node,
    luping: cc.Node,
    share: cc.Node
  },
  start: function start() {
    if (typeof ks !== 'undefined') {
      console.log("创建录屏管理器");

      this._gameRecorder();
    }

    this.bindNode();
    this.generatePool();
    this.loadRes();
  },
  loadRes: function loadRes() {},
  init: function init(c) {
    this._controller = c;
    this._score = c.scoreMgr;
    this.rowNum = c.config.json.rowNum;
    this.gap = c.config.json.gap;
    this.animationSpeed = c.config.json.gap;
    this.blockWidth = (730 - (this.rowNum + 1) * this.gap) / this.rowNum;
    this.reviveTimer = null;
    this.tutorialNode.active = false;
    this.isWeChat = this._controller.social.node.active;
    this.shareSuccessDialog.active = false; //console.log(this.gap)
    //console.log(this.blockWidth)
  },
  // 动态获取需要动态控制的组件
  bindNode: function bindNode() {
    this.blocksContainer = this.node.getChildByName('map');
  },
  //---------------- 游戏控制 ---------------------
  // 游戏开始
  gameStart: function gameStart() {
    var _this = this;

    this.recoveryAllBlocks().then();
    this.shareBtn.active = true;

    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      this._controller.social.hasShared = false;
    }

    this._score.init(this);

    var data = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [4, 2, 3, 4, 2, 2, 3, 4]];

    if (this.isFirstTime()) {
      this.mapSet(this.rowNum, data).then(function (result) {
        _this.showTutorial(_this.map[1][4], '点击连续的区域生成炸弹鸭');

        _this.tutorialProgress = 1;
        _this._status = 1;
      });
    } else {
      this.mapSet(this.rowNum).then(function (result) {
        _this._status = 1;
      });
    }
  },
  _gameRecorder: function _gameRecorder() {
    var _this3 = this;

    if (typeof ks !== 'undefined') {
      // 可以监听 error 事件
      if (this.recorder) {
        return;
      }

      this.recorder = ks.getGameRecorder();
      this.recorder.on('start', function (res) {
        console.log("开始录屏");
      });
      this.recorder.on('error', function (res) {
        var error = res.error;

        if (error.code === ks.error.GameRecorder_StartWhileAlreadyStartRecording) {}
      });
      this.recorder.on("stop", function (res) {
        console.log("暂停录屏返参结果:", JSON.stringify(res));

        if (res.error) {
          if (res.error.code === ks.error.GameRecorder_StopWhileNotStartRecording) {
            ks.showModal({
              title: '提示',
              content: '在还没有开始录制的情况下调用 stop',
              showCancel: false
            });
          }

          if (res.error.code === ks.error.GameRecorder_RecordFailedTimeRangeTooShort) {
            ks.showModal({
              title: '提示',
              content: '录制结束，录制时间太短',
              showCancel: false
            });
          }

          if (res.error.code === ks.error.GameRecorder_RecordFailedTimeRangeTooLong) {
            ks.showModal({
              title: '提示',
              content: '录制结束，录制时间太长',
              showCancel: false
            });
          }

          if (res.error.code === ks.error.GameRecorder_RecordFailedNoVideo) {
            ks.showModal({
              title: '提示',
              content: '录制结束，未录制到视频',
              showCancel: false
            });
          }
        } else {
          var _this2 = _this3;

          if (res.videoID) {
            console.log("提示发布视频:", res.videoID);
            ks.showModal({
              title: '提示',
              content: '发布录屏到快手',
              success: function success(dataRes) {
                if (dataRes.confirm) {
                  _this2.publishVideo(res.videoID);
                }
              }
            });
          }
        }
      });
      this.recorder.on('abort', function (res) {
        console.log("放弃录制游戏画面。此时已经录制的内容会被丢弃。");
      });
    }
  },
  gameRecorderStart: function gameRecorderStart() {
    if (this.recorder) {
      console.log("录屏管理器已创建");

      if (this.startFlag === 1) {
        this.recorder.stop();
        this.startFlag = 0;
      } else {
        this.recorder.start();
        this.startFlag = 1;
      }

      var path = '/atlas/screenRecording-' + this.startFlag;
      console.log("录屏图标切换路径:", path);

      var _this2 = this;

      cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
          console.error('set sprite frame failed! err', path, err);
          return;
        }

        _this2.luping.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
  },
  publishVideo: function publishVideo(videoID) {
    if (this.recorder) {
      this.recorder.publishVideo({
        video: videoID,
        callback: function callback(error) {
          if (error != null && error != undefined) {
            console.log("分布录屏失败: ", error);
            return;
          }

          console.log("分布录屏成功");
        }
      });
    } else {
      ks.showModal({
        title: '提示',
        content: '录屏发布失败',
        showCancel: false
      });
    }
  },
  shareAppMessage: function shareAppMessage() {
    ks.shareAppMessage({});
  },
  showTutorial: function showTutorial(target, label) {
    this.tutorialNode.active = true;
    this.tutorialNode.getChildByName('targetBtn').getChildByName('sqr').runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.8), cc.scaleTo(0.3, 1.2))));
    this.tutorialNode.getChildByName('target').x = target.x;
    this.tutorialNode.getChildByName('target').y = target.y;
    this.tutorialNode.getChildByName('targetBtn').x = target.x;
    this.tutorialNode.getChildByName('targetBtn').y = target.y;
    this.tutorialNode.getChildByName('label').getChildByName('label').getComponent(cc.Label).string = label;
  },
  closeTutorial: function closeTutorial() {
    var _this4 = this;

    this.tutorialNode.getChildByName('targetBtn').getChildByName('sqr').stopAllActions(); // console.log('close Tutorial ')

    this.tutorialNode.active = false;
    this._status = 1;
    this.map[1][4].getComponent('cell').onTouched({
      type: 1
    }, false, false);

    if (this.tutorialProgress == 1) {
      setTimeout(function () {
        _this4.showTutorial(_this4.map[1][4], '点击炸弹消除所有同色方块哦');

        _this4.tutorialProgress = 2;
      }, 1000);
    }
  },
  isFirstTime: function isFirstTime() {
    var isFirst = false;

    if (cc.sys.platform === cc.sys.WECHAT_GAME && !wx.getStorageSync('isFirst')) {
      wx.setStorageSync('isFirst', "1");
      isFirst = true;
    } else if (!cc.sys.localStorage.getItem('isFirst')) {
      cc.sys.localStorage.setItem('isFirst', "1");
      isFirst = true;
    }

    return isFirst;
  },
  onItemShare: function onItemShare() {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      this._controller.social.onItemShareButton();
    } else {
      this.fakeShareSuccess();
    }
  },
  onItemAdv: function onItemAdv() {
    if (cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
      this._controller.social.onReviveButton(2);
    } else {
      this.fakeShareSuccess();
    }
  },
  fakeShareSuccess: function fakeShareSuccess() {
    this.shareBtn.active = false;
    this.shareSuccessDialog.active = true;
  },
  onCreateBomb: function onCreateBomb() {
    var x = Math.floor(Math.random() * 8);
    var y = Math.floor(Math.random() * 8);
    this.shareSuccessDialog.active = false;

    if (this.map[x][y].getComponent('cell')._itemType == 0) {
      this.map[x][y].getComponent('cell').changeItemType(2);
    } else {
      this.onCreateBomb();
      return;
    }
  },

  /**
   * 初始化地图
   * @param {*} num 
   * @param {*} data 传入颜色数组
   */
  mapSet: function mapSet(num, data) {
    var _this5 = this;

    this.map = new Array();
    var self = this; // 生成两个随机的对象数组

    var a = Math.floor(Math.random() * num);
    var b = Math.floor(Math.random() * num);
    var c = Math.floor(1 + Math.random() * (num - 1)) - 1;
    a == c ? c++ : '';
    var d = Math.floor(Math.random() * num);
    this.tutorialPos = [c, d];
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < num; i++) {
        //行
        _this5.map[i] = new Array();

        for (var j = 0; j < num; j++) {
          //列
          var itemType = i == a && j == b ? 1 : i == c && j == d ? data ? 1 : 2 : 0;
          self.map[i][j] = self.instantiateBlock(self, {
            x: j,
            y: i,
            color: data && data[i] ? data[i][j] : null,
            width: self.blockWidth,
            startTime: (i + j + 1) * self._controller.config.json.startAnimationTime / num * 2
          }, self.blocksContainer, itemType);
        }
      }

      _this5.checkMgr.init(_this5);

      setTimeout(function () {
        resolve('200 OK');

        _this5.checkMgr.check(_this5);
      }, self._controller.config.json.startAnimationTime * num / 2 / 1 //  (cc.game.getFrameRate() / 60)
      );
    });
  },
  //防抖动 判断是否需要检测下落
  checkNeedFall: function checkNeedFall() {
    var _this6 = this;

    if (this.checkNeedFallTimer) {
      clearTimeout(this.checkNeedFallTimer);
    }

    this.checkNeedFallTimer = setTimeout(function () {
      if (_this6._status == 5) {
        _this6._status = 4;

        _this6.onFall();
      }
    }, 300 / 1 // (cc.game.getFrameRate() / 60)
    );
  },
  //方块下落
  onFall: function onFall() {
    var _this7 = this;

    this.checkGenerateProp(this._score.chain).then(function () {
      var self = _this7;
      var canFall = 0; //从每一列的最下面一个开始往上判断
      //如果有空 就判断有几个空 然后让最上方的方块掉落下来

      for (var j = _this7.rowNum - 1; j >= 0; j--) {
        canFall = 0;

        for (var i = _this7.rowNum - 1; i >= 0; i--) {
          if (_this7.map[i][j].getComponent('cell')._status == 2) {
            _this7.blockPool.put(_this7.map[i][j]);

            _this7.map[i][j] = null;
            canFall++;
          } else {
            if (canFall != 0) {
              _this7.map[i + canFall][j] = _this7.map[i][j];
              _this7.map[i][j] = null;

              _this7.map[i + canFall][j].getComponent('cell').playFallAction(canFall, {
                x: j,
                y: i + canFall
              });
            }
          }
        }

        for (var k = 0; k < canFall; k++) {
          _this7.map[k][j] = _this7.instantiateBlock(_this7, {
            x: j,
            y: k,
            width: _this7.blockWidth,
            startTime: null
          }, _this7.blocksContainer, '', {
            x: j,
            y: -canFall + k
          });

          _this7.map[k][j].getComponent('cell').playFallAction(canFall, null);
        }
      }

      setTimeout(function () {
        _this7.checkMgr.init(_this7);

        _this7.checkMgr.check(_this7);

        _this7._status = 1;
      }, 250);
    });
  },
  gameOver: function gameOver() {
    this._status = 3;

    this._controller.pageMgr.addPage(2);

    this._controller.pageMgr.addPage(4);

    if (this._controller.social.node.active) {
      this._controller.social.closeBannerAdv();
    }
  },
  // todo 复活
  askRevive: function askRevive() {
    var _this8 = this;

    this._controller.pageMgr.addPage(2);

    this._controller.pageMgr.addPage(5);

    this.revivePage.active = true;
    this.revivePage.getChildByName('askRevive').active = true;
    this.revivePage.getChildByName('successRevive').active = false;
    this.rangeSprite = this.revivePage.getChildByName('askRevive').getChildByName('numBg').getChildByName('sprite').getComponent(cc.Sprite);
    this.rangeSprite.fillRange = 1;
    this.isRangeAction = true;
    var numLabel = this.revivePage.getChildByName('askRevive').getChildByName('numBg').getChildByName('num').getComponent(cc.Label);
    numLabel.string = 9;

    if (this.reviveTimer) {
      clearInterval(this.reviveTimer);
    }

    this.reviveTimer = setInterval(function () {
      if (+numLabel.string > 0) {
        numLabel.string--;
        _this8.rangeSprite.fillRange = 1;
      } else {
        _this8.onSkipRevive();
      }
    }, 1000);
  },
  onReviveButton: function onReviveButton() {
    clearInterval(this.reviveTimer);
    this.isRangeAction = false;

    if (cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
      console.log("复活");

      this._controller.social.onReviveButton(1);
    } else {
      this.showReviveSuccess();
    }
  },
  showReviveSuccess: function showReviveSuccess() {
    //console.log('打开复活成功页面')
    this.revivePage.getChildByName('askRevive').active = false;
    this.revivePage.getChildByName('successRevive').active = true;
  },
  onReviveCertainBtn: function onReviveCertainBtn() {
    this._controller.pageMgr.removePage(2);

    this.revivePage.active = false;
    this._status = 1;

    this._score.onRevive();
  },
  update: function update() {
    if (this.isRangeAction) {
      this.rangeSprite.fillRange -= 1 / 60;
    }
  },
  onSkipRevive: function onSkipRevive() {
    clearInterval(this.reviveTimer);
    this._controller.pageMgr.pages[5].active = false;

    this._score.onGameOver(true);

    this.isRangeAction = false;
  },
  restart: function restart() {
    var _this9 = this;

    this._controller.pageMgr.onOpenPage(1);

    this.recoveryAllBlocks().then(function () {
      _this9.gameStart();
    });
  },
  // -----------------道具相关---------------
  // 储存用户点击时的方块 用于生成道具
  onUserTouched: function onUserTouched(iid, jid, itemType, color, warning, pos) {
    this.target = {
      i: iid,
      j: jid,
      color: color,
      itemType: itemType,
      x: pos.x,
      y: pos.y,
      warning: warning
    };
  },
  // 生成道具 type 1为双倍倍数 2为炸弹 3为加五百
  generatePropItem: function generatePropItem(type) {
    var _this10 = this;

    return new Promise(function (resolve, reject) {
      // 是否做道具生成动画
      _this10.map[_this10.target.i][_this10.target.j] = _this10.instantiateBlock(_this10, {
        x: _this10.target.j,
        y: _this10.target.i,
        color: _this10.target.color,
        width: _this10.blockWidth,
        startTime: null
      }, _this10.blocksContainer, type);
      setTimeout(function () {
        resolve();
      }, 300);
    });
  },
  checkGenerateProp: function checkGenerateProp(chain) {
    var _this11 = this;

    return new Promise(function (resolve, reject) {
      if (_this11.target && _this11.target.warning) {
        _this11.generatePropItem(_this11.target.warning).then(function () {
          resolve();
          return;
        });
      }

      resolve();
    });
  },
  onItem: function onItem(type, color, pos) {
    switch (type) {
      case 1:
        // 分数翻倍 最高八倍
        this._score.tipBox.init(this._score, 1);

        this._score.addMult(color, pos);

        this._controller.musicMgr.onDouble();

        for (var i = 0; i < this.rowNum; i++) {
          //行
          for (var j = 0; j < this.rowNum; j++) {
            //列
            if (this.map[i][j] && this.map[i][j].getComponent('cell')._status == 1) {
              var distance = Math.sqrt(Math.pow(pos.x - this.map[i][j].x, 2) + Math.pow(pos.y - this.map[i][j].y, 2));

              if (distance != 0) {
                this.map[i][j].getComponent('cell').surfaceAction(distance);
              }
            }
          }
        }

        break;

      case 2:
        // 炸弹 消除同种颜色的
        this._score.tipBox.init(this._score, 2);

        this.node.runAction(AC.shackAction(0.1, 10));

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
          this._controller.social.onShakePhone();
        }

        this.isPropChain = true;

        this._controller.musicMgr.onBoom();

        for (var _i = 0; _i < this.rowNum; _i++) {
          //行
          for (var _j = 0; _j < this.rowNum; _j++) {
            //列
            if (this.map[_i][_j] && this.map[_i][_j].getComponent('cell').color == color && this.map[_i][_j] && this.map[_i][_j].getComponent('cell')._status != 2) {
              this.map[_i][_j].getComponent('cell').onTouched(color, false, true);
            } else {
              this.map[_i][_j].runAction(AC.rockAction(0.2, 10));
            }
          }
        }

        break;

      case 3:
        //:  加步数
        this._score.tipBox.init(this._score, 4);

        this._controller.musicMgr.onDouble();

        for (var _i2 = 0; _i2 < this.rowNum; _i2++) {
          //行
          for (var _j2 = 0; _j2 < this.rowNum; _j2++) {
            //列
            if (this.map[_i2][_j2] && this.map[_i2][_j2].getComponent('cell')._status == 1) {
              var _distance = Math.sqrt(Math.pow(pos.x - this.map[_i2][_j2].x, 2) + Math.pow(pos.y - this.map[_i2][_j2].y, 2));

              if (_distance != 0) {
                this.map[_i2][_j2].getComponent('cell').surfaceAction(_distance);
              }
            }
          }
        }

        this._score.onStep(3).then();

        break;

      case 4:
        // : 消除全部单身的方块
        this._score.tipBox.init(this._score, 5);

        this.isPropChain = true;

        this._controller.musicMgr.onMagic();

        for (var _i3 = 0; _i3 < this.rowNum; _i3++) {
          //行
          for (var _j3 = 0; _j3 < this.rowNum; _j3++) {
            //列
            if (this.map[_i3][_j3] && this.map[_i3][_j3].getComponent('cell').isSingle && this.map[_i3][_j3] && this.map[_i3][_j3].getComponent('cell')._status != 2) {
              var _distance2 = Math.sqrt(Math.pow(pos.x - this.map[_i3][_j3].x, 2) + Math.pow(pos.y - this.map[_i3][_j3].y, 2));

              this.map[_i3][_j3].getComponent('cell').onTouched(color, false, true, _distance2); // console.log("魔法棒触发的点", i, j, this.map[i][j].getComponent('cell').color, this.map[i][j].getComponent('cell').isSingle)

            }
          }
        }

        break;
    }
  },
  //--------------------- 预制体实例化---------------------
  // 生成对象池
  generatePool: function generatePool() {
    this.blockPool = new cc.NodePool();

    for (var i = 0; i < Math.pow(this.rowNum, 2); i++) {
      var block = cc.instantiate(this.blockPrefab);
      this.blockPool.put(block);
    }
  },
  // 实例化单个方块
  instantiateBlock: function instantiateBlock(self, data, parent, itemType, pos) {
    itemType = itemType ? itemType : 0;

    if (itemType != 0) {// console.log("道具节点数据", data, itemType)
    }

    var block = null;

    if (self.blockPool && self.blockPool.size() > 0) {
      block = self.blockPool.get();
    } else {
      block = cc.instantiate(self.blockPrefab);
    }

    block.parent = parent;
    block.scale = 1;
    block.x = 0;
    block.y = 0;
    block.getComponent('cell').init(self, data, this.blockWidth, itemType, pos);
    return block;
  },
  // 回收所有节点
  recoveryAllBlocks: function recoveryAllBlocks() {
    var _this12 = this;

    return new Promise(function (resolve, reject) {
      var children = _this12.blocksContainer.children;

      if (children.length != 0) {
        var length = children.length; //   console.log(length)

        for (var i = 0; i < length; i++) {
          _this12.blockPool.put(children[0]);
        }

        for (var _i4 = 0; _i4 < _this12.rowNum; _i4++) {
          for (var j = 0; j < _this12.rowNum; j++) {
            _this12.map[_i4][j] = null;
          }
        }
      }

      resolve('');
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbIkFDIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiX3N0YXR1cyIsImJsb2NrUHJlZmFiIiwiUHJlZmFiIiwiYmxvY2tTcHJpdGUiLCJTcHJpdGVGcmFtZSIsIndhcm5pbmdTcHJpdGVGcmFtZSIsInByb3BTcHJpdGVGcmFtZSIsImNoZWNrTWdyIiwicmV2aXZlUGFnZSIsIk5vZGUiLCJ0dXRvcmlhbE5vZGUiLCJzaGFyZUJ0biIsInNoYXJlU3VjY2Vzc0RpYWxvZyIsImx1cGluZyIsInNoYXJlIiwic3RhcnQiLCJrcyIsImNvbnNvbGUiLCJsb2ciLCJfZ2FtZVJlY29yZGVyIiwiYmluZE5vZGUiLCJnZW5lcmF0ZVBvb2wiLCJsb2FkUmVzIiwiaW5pdCIsImMiLCJfY29udHJvbGxlciIsIl9zY29yZSIsInNjb3JlTWdyIiwicm93TnVtIiwiY29uZmlnIiwianNvbiIsImdhcCIsImFuaW1hdGlvblNwZWVkIiwiYmxvY2tXaWR0aCIsInJldml2ZVRpbWVyIiwiYWN0aXZlIiwiaXNXZUNoYXQiLCJzb2NpYWwiLCJub2RlIiwiYmxvY2tzQ29udGFpbmVyIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnYW1lU3RhcnQiLCJyZWNvdmVyeUFsbEJsb2NrcyIsInRoZW4iLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiaGFzU2hhcmVkIiwiZGF0YSIsImlzRmlyc3RUaW1lIiwibWFwU2V0IiwicmVzdWx0Iiwic2hvd1R1dG9yaWFsIiwibWFwIiwidHV0b3JpYWxQcm9ncmVzcyIsInJlY29yZGVyIiwiZ2V0R2FtZVJlY29yZGVyIiwib24iLCJyZXMiLCJlcnJvciIsImNvZGUiLCJHYW1lUmVjb3JkZXJfU3RhcnRXaGlsZUFscmVhZHlTdGFydFJlY29yZGluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJHYW1lUmVjb3JkZXJfU3RvcFdoaWxlTm90U3RhcnRSZWNvcmRpbmciLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwiR2FtZVJlY29yZGVyX1JlY29yZEZhaWxlZFRpbWVSYW5nZVRvb1Nob3J0IiwiR2FtZVJlY29yZGVyX1JlY29yZEZhaWxlZFRpbWVSYW5nZVRvb0xvbmciLCJHYW1lUmVjb3JkZXJfUmVjb3JkRmFpbGVkTm9WaWRlbyIsIl90aGlzMiIsInZpZGVvSUQiLCJzdWNjZXNzIiwiZGF0YVJlcyIsImNvbmZpcm0iLCJwdWJsaXNoVmlkZW8iLCJnYW1lUmVjb3JkZXJTdGFydCIsInN0YXJ0RmxhZyIsInN0b3AiLCJwYXRoIiwibG9hZGVyIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJ2aWRlbyIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwic2hhcmVBcHBNZXNzYWdlIiwidGFyZ2V0IiwibGFiZWwiLCJydW5BY3Rpb24iLCJyZXBlYXRGb3JldmVyIiwic2VxdWVuY2UiLCJzY2FsZVRvIiwieCIsInkiLCJMYWJlbCIsInN0cmluZyIsImNsb3NlVHV0b3JpYWwiLCJzdG9wQWxsQWN0aW9ucyIsIm9uVG91Y2hlZCIsInR5cGUiLCJzZXRUaW1lb3V0IiwiaXNGaXJzdCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRTdG9yYWdlU3luYyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwib25JdGVtU2hhcmUiLCJvbkl0ZW1TaGFyZUJ1dHRvbiIsImZha2VTaGFyZVN1Y2Nlc3MiLCJvbkl0ZW1BZHYiLCJCWVRFREFOQ0VfR0FNRSIsIm9uUmV2aXZlQnV0dG9uIiwib25DcmVhdGVCb21iIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiX2l0ZW1UeXBlIiwiY2hhbmdlSXRlbVR5cGUiLCJudW0iLCJBcnJheSIsInNlbGYiLCJhIiwiYiIsImQiLCJ0dXRvcmlhbFBvcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaSIsImoiLCJpdGVtVHlwZSIsImluc3RhbnRpYXRlQmxvY2siLCJjb2xvciIsIndpZHRoIiwic3RhcnRUaW1lIiwic3RhcnRBbmltYXRpb25UaW1lIiwiY2hlY2siLCJjaGVja05lZWRGYWxsIiwiY2hlY2tOZWVkRmFsbFRpbWVyIiwiY2xlYXJUaW1lb3V0Iiwib25GYWxsIiwiY2hlY2tHZW5lcmF0ZVByb3AiLCJjaGFpbiIsImNhbkZhbGwiLCJibG9ja1Bvb2wiLCJwdXQiLCJwbGF5RmFsbEFjdGlvbiIsImsiLCJnYW1lT3ZlciIsInBhZ2VNZ3IiLCJhZGRQYWdlIiwiY2xvc2VCYW5uZXJBZHYiLCJhc2tSZXZpdmUiLCJyYW5nZVNwcml0ZSIsImZpbGxSYW5nZSIsImlzUmFuZ2VBY3Rpb24iLCJudW1MYWJlbCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsIm9uU2tpcFJldml2ZSIsInNob3dSZXZpdmVTdWNjZXNzIiwib25SZXZpdmVDZXJ0YWluQnRuIiwicmVtb3ZlUGFnZSIsIm9uUmV2aXZlIiwidXBkYXRlIiwicGFnZXMiLCJvbkdhbWVPdmVyIiwicmVzdGFydCIsIm9uT3BlblBhZ2UiLCJvblVzZXJUb3VjaGVkIiwiaWlkIiwiamlkIiwid2FybmluZyIsInBvcyIsImdlbmVyYXRlUHJvcEl0ZW0iLCJvbkl0ZW0iLCJ0aXBCb3giLCJhZGRNdWx0IiwibXVzaWNNZ3IiLCJvbkRvdWJsZSIsImRpc3RhbmNlIiwic3FydCIsInBvdyIsInN1cmZhY2VBY3Rpb24iLCJzaGFja0FjdGlvbiIsIm9uU2hha2VQaG9uZSIsImlzUHJvcENoYWluIiwib25Cb29tIiwicm9ja0FjdGlvbiIsIm9uU3RlcCIsIm9uTWFnaWMiLCJpc1NpbmdsZSIsIk5vZGVQb29sIiwiYmxvY2siLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInNpemUiLCJnZXQiLCJzY2FsZSIsImNoaWxkcmVuIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFoQjs7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RCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3ZDLFVBQUl3RSxRQUFRLEdBQUcsT0FBSSxDQUFDdkssZUFBTCxDQUFxQnVLLFFBQXBDOztBQUNBLFVBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxJQUFtQixDQUF2QixFQUEwQjtBQUN6QixZQUFJQSxNQUFNLEdBQUdELFFBQVEsQ0FBQ0MsTUFBdEIsQ0FEeUIsQ0FFekI7O0FBQ0EsYUFBSyxJQUFJeEUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3dFLE1BQXBCLEVBQTRCeEUsQ0FBQyxFQUE3QixFQUFpQztBQUNoQyxVQUFBLE9BQUksQ0FBQ2dCLFNBQUwsQ0FBZUMsR0FBZixDQUFtQnNELFFBQVEsQ0FBQyxDQUFELENBQTNCO0FBQ0E7O0FBQ0QsYUFBSyxJQUFJdkUsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBRyxPQUFJLENBQUMzRyxNQUF6QixFQUFpQzJHLEdBQUMsRUFBbEMsRUFBc0M7QUFDckMsZUFBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLE9BQUksQ0FBQzVHLE1BQXpCLEVBQWlDNEcsQ0FBQyxFQUFsQyxFQUFzQztBQUNyQyxZQUFBLE9BQUksQ0FBQ25GLEdBQUwsQ0FBU2tGLEdBQVQsRUFBWUMsQ0FBWixJQUFpQixJQUFqQjtBQUNBO0FBQ0Q7QUFDRDs7QUFDREgsTUFBQUEsT0FBTyxDQUFDLEVBQUQsQ0FBUDtBQUNBLEtBZk0sQ0FBUDtBQWdCQTtBQXprQk8sQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIHV1XG4gKiBAZmlsZSDmuLjmiI/mjqfliLZcbiAqL1xudmFyIEFDID0gcmVxdWlyZSgnYWN0aW9uJylcbmNjLkNsYXNzKHtcblx0ZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXHRwcm9wZXJ0aWVzOiB7XG5cdFx0X3N0YXR1czogMCwgLy8wIOacquW8gOWniyAxIOa4uOaIj+W8gOWniyAyIOa4uOaIj+aaguWBnCAzIOa4uOaIj+e7k+adnyA0IOS4i+iQveeKtuaAgSA15peg5rOV6Kem5pG454q25oCBXG5cdFx0YmxvY2tQcmVmYWI6IGNjLlByZWZhYixcblx0XHRibG9ja1Nwcml0ZTogW2NjLlNwcml0ZUZyYW1lXSwgLy90b2RvOiDmjaLmiJDliqjmgIHnlJ/miJAg5pqC5LiN5aSE55CGXG5cdFx0d2FybmluZ1Nwcml0ZUZyYW1lOiBbY2MuU3ByaXRlRnJhbWVdLFxuXHRcdHByb3BTcHJpdGVGcmFtZTogW2NjLlNwcml0ZUZyYW1lXSxcblx0XHRjaGVja01ncjogcmVxdWlyZShcImNoZWNrXCIpLFxuXHRcdHJldml2ZVBhZ2U6IGNjLk5vZGUsXG5cdFx0dHV0b3JpYWxOb2RlOiBjYy5Ob2RlLFxuXHRcdHNoYXJlQnRuOiBjYy5Ob2RlLFxuXHRcdHNoYXJlU3VjY2Vzc0RpYWxvZzogY2MuTm9kZSxcblx0XHRsdXBpbmc6IGNjLk5vZGUsXG5cdFx0c2hhcmU6IGNjLk5vZGVcblx0fSxcblx0c3RhcnQoKSB7XG5cdFx0aWYgKHR5cGVvZiBrcyAhPT0gJ3VuZGVmaW5lZCcpe1xuXHRcdFx0Y29uc29sZS5sb2coXCLliJvlu7rlvZXlsY/nrqHnkIblmahcIilcblx0XHRcdHRoaXMuX2dhbWVSZWNvcmRlcigpO1xuXHRcdH1cblx0XHR0aGlzLmJpbmROb2RlKClcblx0XHR0aGlzLmdlbmVyYXRlUG9vbCgpXG5cdFx0dGhpcy5sb2FkUmVzKClcblx0fSxcblx0bG9hZFJlcygpIHtcblxuXHR9LFxuXHRpbml0KGMpIHtcblx0XHR0aGlzLl9jb250cm9sbGVyID0gY1xuXHRcdHRoaXMuX3Njb3JlID0gYy5zY29yZU1nclxuXHRcdHRoaXMucm93TnVtID0gYy5jb25maWcuanNvbi5yb3dOdW1cblx0XHR0aGlzLmdhcCA9IGMuY29uZmlnLmpzb24uZ2FwXG5cdFx0dGhpcy5hbmltYXRpb25TcGVlZCA9IGMuY29uZmlnLmpzb24uZ2FwXG5cdFx0dGhpcy5ibG9ja1dpZHRoID0gKDczMCAtICh0aGlzLnJvd051bSArIDEpICogdGhpcy5nYXApIC8gdGhpcy5yb3dOdW1cblx0XHR0aGlzLnJldml2ZVRpbWVyID0gbnVsbFxuXHRcdHRoaXMudHV0b3JpYWxOb2RlLmFjdGl2ZSA9IGZhbHNlXG5cdFx0dGhpcy5pc1dlQ2hhdCA9IHRoaXMuX2NvbnRyb2xsZXIuc29jaWFsLm5vZGUuYWN0aXZlXG5cdFx0dGhpcy5zaGFyZVN1Y2Nlc3NEaWFsb2cuYWN0aXZlID0gZmFsc2Vcblx0XHQvL2NvbnNvbGUubG9nKHRoaXMuZ2FwKVxuXHRcdC8vY29uc29sZS5sb2codGhpcy5ibG9ja1dpZHRoKVxuXHR9LFxuXHQvLyDliqjmgIHojrflj5bpnIDopoHliqjmgIHmjqfliLbnmoTnu4Tku7Zcblx0YmluZE5vZGUoKSB7XG5cdFx0dGhpcy5ibG9ja3NDb250YWluZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21hcCcpXG5cdH0sXG5cdC8vLS0tLS0tLS0tLS0tLS0tLSDmuLjmiI/mjqfliLYgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIOa4uOaIj+W8gOWni1xuXHRnYW1lU3RhcnQoKSB7XG5cdFx0dGhpcy5yZWNvdmVyeUFsbEJsb2NrcygpLnRoZW4oKVxuXHRcdHRoaXMuc2hhcmVCdG4uYWN0aXZlID0gdHJ1ZVxuXHRcdGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xuXHRcdFx0dGhpcy5fY29udHJvbGxlci5zb2NpYWwuaGFzU2hhcmVkID0gZmFsc2Vcblx0XHR9XG5cdFx0dGhpcy5fc2NvcmUuaW5pdCh0aGlzKVxuXHRcdGxldCBkYXRhID0gW1xuXHRcdFx0WzEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuXHRcdFx0WzEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuXHRcdFx0WzQsIDIsIDMsIDQsIDIsIDIsIDMsIDRdXG5cdFx0XVxuXHRcdGlmICh0aGlzLmlzRmlyc3RUaW1lKCkpIHtcblx0XHRcdHRoaXMubWFwU2V0KHRoaXMucm93TnVtLCBkYXRhKS50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0dGhpcy5zaG93VHV0b3JpYWwodGhpcy5tYXBbMV1bNF0sICfngrnlh7vov57nu63nmoTljLrln5/nlJ/miJDngrjlvLnpuK0nKVxuXHRcdFx0XHR0aGlzLnR1dG9yaWFsUHJvZ3Jlc3MgPSAxXG5cdFx0XHRcdHRoaXMuX3N0YXR1cyA9IDFcblx0XHRcdH0pXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMubWFwU2V0KHRoaXMucm93TnVtKS50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0dGhpcy5fc3RhdHVzID0gMVxuXHRcdFx0fSlcblx0XHR9XG5cdH0sXG5cdF9nYW1lUmVjb3JkZXIoKXtcblx0XHRpZiAodHlwZW9mIGtzICE9PSAndW5kZWZpbmVkJyl7XG5cdFx0XHQvLyDlj6/ku6Xnm5HlkKwgZXJyb3Ig5LqL5Lu2XG5cdFx0XHRpZiAodGhpcy5yZWNvcmRlcil7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVjb3JkZXIgPSBrcy5nZXRHYW1lUmVjb3JkZXIoKVxuXHRcdFx0dGhpcy5yZWNvcmRlci5vbignc3RhcnQnLCByZXMgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuW8gOWni+W9leWxj1wiKTtcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnJlY29yZGVyLm9uKCdlcnJvcicsIHJlcyA9PiB7XG5cdFx0XHRcdGNvbnN0IGVycm9yID0gcmVzLmVycm9yXG5cdFx0XHRcdGlmIChlcnJvci5jb2RlID09PSBrcy5lcnJvci5HYW1lUmVjb3JkZXJfU3RhcnRXaGlsZUFscmVhZHlTdGFydFJlY29yZGluZykge1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHR0aGlzLnJlY29yZGVyLm9uKFwic3RvcFwiLCByZXMgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuaaguWBnOW9leWxj+i/lOWPgue7k+aenDpcIixKU09OLnN0cmluZ2lmeShyZXMpKVxuXHRcdFx0XHRpZihyZXMuZXJyb3Ipe1xuXHRcdFx0XHRcdGlmIChyZXMuZXJyb3IuY29kZSA9PT0ga3MuZXJyb3IuR2FtZVJlY29yZGVyX1N0b3BXaGlsZU5vdFN0YXJ0UmVjb3JkaW5nKSB7XG5cdFx0XHRcdFx0XHRrcy5zaG93TW9kYWwoe1xuXHRcdFx0XHRcdFx0XHR0aXRsZTogJ+aPkOekuicsXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQ6ICflnKjov5jmsqHmnInlvIDlp4vlvZXliLbnmoTmg4XlhrXkuIvosIPnlKggc3RvcCcsXG5cdFx0XHRcdFx0XHRcdHNob3dDYW5jZWw6IGZhbHNlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHJlcy5lcnJvci5jb2RlID09PSBrcy5lcnJvci5HYW1lUmVjb3JkZXJfUmVjb3JkRmFpbGVkVGltZVJhbmdlVG9vU2hvcnQpIHtcblx0XHRcdFx0XHRcdGtzLnNob3dNb2RhbCh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiAn5o+Q56S6Jyxcblx0XHRcdFx0XHRcdFx0Y29udGVudDogJ+W9leWItue7k+adn++8jOW9leWItuaXtumXtOWkquefrScsXG5cdFx0XHRcdFx0XHRcdHNob3dDYW5jZWw6IGZhbHNlXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHJlcy5lcnJvci5jb2RlID09PSBrcy5lcnJvci5HYW1lUmVjb3JkZXJfUmVjb3JkRmFpbGVkVGltZVJhbmdlVG9vTG9uZykge1xuXHRcdFx0XHRcdFx0a3Muc2hvd01vZGFsKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6ICfmj5DnpLonLFxuXHRcdFx0XHRcdFx0XHRjb250ZW50OiAn5b2V5Yi257uT5p2f77yM5b2V5Yi25pe26Ze05aSq6ZW/Jyxcblx0XHRcdFx0XHRcdFx0c2hvd0NhbmNlbDogZmFsc2Vcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocmVzLmVycm9yLmNvZGUgPT09IGtzLmVycm9yLkdhbWVSZWNvcmRlcl9SZWNvcmRGYWlsZWROb1ZpZGVvKSB7XG5cdFx0XHRcdFx0XHRrcy5zaG93TW9kYWwoe1xuXHRcdFx0XHRcdFx0XHR0aXRsZTogJ+aPkOekuicsXG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQ6ICflvZXliLbnu5PmnZ/vvIzmnKrlvZXliLbliLDop4bpopEnLFxuXHRcdFx0XHRcdFx0XHRzaG93Q2FuY2VsOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0bGV0IF90aGlzMiA9IHRoaXM7XG5cdFx0XHRcdFx0aWYgKHJlcy52aWRlb0lEKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5o+Q56S65Y+R5biD6KeG6aKROlwiLCByZXMudmlkZW9JRClcblx0XHRcdFx0XHRcdGtzLnNob3dNb2RhbCh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiAn5o+Q56S6Jyxcblx0XHRcdFx0XHRcdFx0Y29udGVudDogJ+WPkeW4g+W9leWxj+WIsOW/q+aJiycsXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3MoZGF0YVJlcyl7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRhdGFSZXMuY29uZmlybSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRfdGhpczIucHVibGlzaFZpZGVvKHJlcy52aWRlb0lEKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0XHR0aGlzLnJlY29yZGVyLm9uKCdhYm9ydCcsIHJlcyA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwi5pS+5byD5b2V5Yi25ri45oiP55S76Z2i44CC5q2k5pe25bey57uP5b2V5Yi255qE5YaF5a655Lya6KKr5Lii5byD44CCXCIpXG5cdFx0XHR9KVxuXHRcdH1cblx0fSxcblxuXHRnYW1lUmVjb3JkZXJTdGFydCgpe1xuXHRcdGlmICh0aGlzLnJlY29yZGVyKXtcblx0XHRcdGNvbnNvbGUubG9nKFwi5b2V5bGP566h55CG5Zmo5bey5Yib5bu6XCIpXG5cdFx0XHRpZiAodGhpcy5zdGFydEZsYWcgPT09IDEpe1xuXHRcdFx0XHR0aGlzLnJlY29yZGVyLnN0b3AoKTtcblx0XHRcdFx0dGhpcy5zdGFydEZsYWcgPSAwO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHR0aGlzLnJlY29yZGVyLnN0YXJ0KCk7XG5cdFx0XHRcdHRoaXMuc3RhcnRGbGFnID0gMTtcblx0XHRcdH1cblx0XHRcdGxldCBwYXRoID0gJy9hdGxhcy9zY3JlZW5SZWNvcmRpbmctJyArIHRoaXMuc3RhcnRGbGFnO1xuXHRcdFx0Y29uc29sZS5sb2coXCLlvZXlsY/lm77moIfliIfmjaLot6/lvoQ6XCIscGF0aClcblx0XHRcdGxldCBfdGhpczIgPSB0aGlzO1xuXHRcdFx0Y2MubG9hZGVyLmxvYWRSZXMocGF0aCwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKXtcblx0XHRcdFx0aWYgKGVycil7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignc2V0IHNwcml0ZSBmcmFtZSBmYWlsZWQhIGVycicsIHBhdGgsIGVycik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF90aGlzMi5sdXBpbmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcblxuXHRcdFx0fSlcblx0XHR9XG5cblx0fSxcblxuXHRwdWJsaXNoVmlkZW8odmlkZW9JRCl7XG5cdFx0aWYgKHRoaXMucmVjb3JkZXIpe1xuXHRcdFx0dGhpcy5yZWNvcmRlci5wdWJsaXNoVmlkZW8oe1xuXHRcdFx0XHR2aWRlbzogdmlkZW9JRCxcblx0XHRcdFx0Y2FsbGJhY2s6IChlcnJvcikgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnJvciAhPSBudWxsICYmIGVycm9yICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCLliIbluIPlvZXlsY/lpLHotKU6IFwiICwgZXJyb3IpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuWIhuW4g+W9leWxj+aIkOWKn1wiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fWVsc2Uge1xuXHRcdFx0a3Muc2hvd01vZGFsKHtcblx0XHRcdFx0dGl0bGU6ICfmj5DnpLonLFxuXHRcdFx0XHRjb250ZW50OiAn5b2V5bGP5Y+R5biD5aSx6LSlJyxcblx0XHRcdFx0c2hvd0NhbmNlbDogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9LFxuXG5cdHNoYXJlQXBwTWVzc2FnZSgpe1xuXHRcdGtzLnNoYXJlQXBwTWVzc2FnZSh7fSlcblx0fSxcblxuXG5cblx0c2hvd1R1dG9yaWFsKHRhcmdldCwgbGFiZWwpIHtcblx0XHR0aGlzLnR1dG9yaWFsTm9kZS5hY3RpdmUgPSB0cnVlXG5cdFx0dGhpcy50dXRvcmlhbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RhcmdldEJ0bicpLmdldENoaWxkQnlOYW1lKCdzcXInKS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMywgMC44KSwgY2Muc2NhbGVUbygwLjMsIDEuMikpKSlcblx0XHR0aGlzLnR1dG9yaWFsTm9kZS5nZXRDaGlsZEJ5TmFtZSgndGFyZ2V0JykueCA9IHRhcmdldC54XG5cdFx0dGhpcy50dXRvcmlhbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RhcmdldCcpLnkgPSB0YXJnZXQueVxuXHRcdHRoaXMudHV0b3JpYWxOb2RlLmdldENoaWxkQnlOYW1lKCd0YXJnZXRCdG4nKS54ID0gdGFyZ2V0Lnhcblx0XHR0aGlzLnR1dG9yaWFsTm9kZS5nZXRDaGlsZEJ5TmFtZSgndGFyZ2V0QnRuJykueSA9IHRhcmdldC55XG5cdFx0dGhpcy50dXRvcmlhbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBsYWJlbFxuXHR9LFxuXHRjbG9zZVR1dG9yaWFsKCkge1xuXHRcdHRoaXMudHV0b3JpYWxOb2RlLmdldENoaWxkQnlOYW1lKCd0YXJnZXRCdG4nKS5nZXRDaGlsZEJ5TmFtZSgnc3FyJykuc3RvcEFsbEFjdGlvbnMoKVxuXHRcdC8vIGNvbnNvbGUubG9nKCdjbG9zZSBUdXRvcmlhbCAnKVxuXHRcdHRoaXMudHV0b3JpYWxOb2RlLmFjdGl2ZSA9IGZhbHNlXG5cdFx0dGhpcy5fc3RhdHVzID0gMVxuXG5cdFx0dGhpcy5tYXBbMV1bNF0uZ2V0Q29tcG9uZW50KCdjZWxsJykub25Ub3VjaGVkKHtcblx0XHRcdHR5cGU6IDFcblx0XHR9LCBmYWxzZSwgZmFsc2UpXG5cdFx0aWYgKHRoaXMudHV0b3JpYWxQcm9ncmVzcyA9PSAxKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5zaG93VHV0b3JpYWwodGhpcy5tYXBbMV1bNF0sICfngrnlh7vngrjlvLnmtojpmaTmiYDmnInlkIzoibLmlrnlnZflk6YnKVxuXHRcdFx0XHR0aGlzLnR1dG9yaWFsUHJvZ3Jlc3MgPSAyXG5cdFx0XHR9LCAxMDAwKVxuXHRcdH1cblx0fSxcblx0aXNGaXJzdFRpbWUoKSB7XG5cdFx0bGV0IGlzRmlyc3QgPSBmYWxzZVxuXHRcdGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSAmJiAhd3guZ2V0U3RvcmFnZVN5bmMoJ2lzRmlyc3QnKSkge1xuXHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoJ2lzRmlyc3QnLCBcIjFcIilcblx0XHRcdGlzRmlyc3QgPSB0cnVlXG5cdFx0fSBlbHNlIGlmICghY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0ZpcnN0JykpIHtcblx0XHRcdGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNGaXJzdCcsIFwiMVwiKVxuXHRcdFx0aXNGaXJzdCA9IHRydWVcblx0XHR9XG5cdFx0cmV0dXJuIGlzRmlyc3Rcblx0fSxcblx0b25JdGVtU2hhcmUoKSB7XG5cdFx0aWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG5cdFx0XHR0aGlzLl9jb250cm9sbGVyLnNvY2lhbC5vbkl0ZW1TaGFyZUJ1dHRvbigpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZmFrZVNoYXJlU3VjY2VzcygpXG5cdFx0fVxuXHR9LFxuXHRvbkl0ZW1BZHYoKSB7XG5cdFx0aWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKSB7XG5cdFx0XHR0aGlzLl9jb250cm9sbGVyLnNvY2lhbC5vblJldml2ZUJ1dHRvbigyKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmZha2VTaGFyZVN1Y2Nlc3MoKVxuXHRcdH1cblx0fSxcblx0ZmFrZVNoYXJlU3VjY2VzcygpIHtcblx0XHR0aGlzLnNoYXJlQnRuLmFjdGl2ZSA9IGZhbHNlXG5cdFx0dGhpcy5zaGFyZVN1Y2Nlc3NEaWFsb2cuYWN0aXZlID0gdHJ1ZVxuXHR9LFxuXHRvbkNyZWF0ZUJvbWIoKSB7XG5cdFx0bGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KVxuXHRcdGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOClcblx0XHR0aGlzLnNoYXJlU3VjY2Vzc0RpYWxvZy5hY3RpdmUgPSBmYWxzZVxuXHRcdGlmKHRoaXMubWFwW3hdW3ldLmdldENvbXBvbmVudCgnY2VsbCcpLl9pdGVtVHlwZT09MCl7XG5cdFx0XHR0aGlzLm1hcFt4XVt5XS5nZXRDb21wb25lbnQoJ2NlbGwnKS5jaGFuZ2VJdGVtVHlwZSgyKVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5vbkNyZWF0ZUJvbWIoKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHR9LFxuXHQvKipcblx0ICog5Yid5aeL5YyW5Zyw5Zu+XG5cdCAqIEBwYXJhbSB7Kn0gbnVtIFxuXHQgKiBAcGFyYW0geyp9IGRhdGEg5Lyg5YWl6aKc6Imy5pWw57uEXG5cdCAqL1xuXHRtYXBTZXQobnVtLCBkYXRhKSB7XG5cdFx0dGhpcy5tYXAgPSBuZXcgQXJyYXkoKVxuXHRcdGxldCBzZWxmID0gdGhpc1xuXHRcdC8vIOeUn+aIkOS4pOS4qumaj+acuueahOWvueixoeaVsOe7hFxuXHRcdGxldCBhID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKVxuXHRcdGxldCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKVxuXG5cdFx0bGV0IGMgPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogKG51bSAtIDEpKSAtIDFcblx0XHRhID09IGMgPyBjKysgOiAnJ1xuXHRcdGxldCBkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVtKVxuXHRcdHRoaXMudHV0b3JpYWxQb3MgPSBbYywgZF1cblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7IC8v6KGMXG5cdFx0XHRcdHRoaXMubWFwW2ldID0gbmV3IEFycmF5KClcblx0XHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykgeyAvL+WIl1xuXHRcdFx0XHRcdGxldCBpdGVtVHlwZSA9IChpID09IGEgJiYgaiA9PSBiKSA/IDEgOiAoaSA9PSBjICYmIGogPT0gZCkgPyAoZGF0YSA/IDEgOiAyKSA6IDBcblx0XHRcdFx0XHRzZWxmLm1hcFtpXVtqXSA9IHNlbGYuaW5zdGFudGlhdGVCbG9jayhzZWxmLCB7XG5cdFx0XHRcdFx0XHR4OiBqLFxuXHRcdFx0XHRcdFx0eTogaSxcblx0XHRcdFx0XHRcdGNvbG9yOiAoZGF0YSAmJiBkYXRhW2ldKSA/IGRhdGFbaV1bal0gOiBudWxsLFxuXHRcdFx0XHRcdFx0d2lkdGg6IHNlbGYuYmxvY2tXaWR0aCxcblx0XHRcdFx0XHRcdHN0YXJ0VGltZTogKGkgKyBqICsgMSkgKiBzZWxmLl9jb250cm9sbGVyLmNvbmZpZy5qc29uLnN0YXJ0QW5pbWF0aW9uVGltZSAvIG51bSAqIDJcblx0XHRcdFx0XHR9LCBzZWxmLmJsb2Nrc0NvbnRhaW5lciwgaXRlbVR5cGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuY2hlY2tNZ3IuaW5pdCh0aGlzKVxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgnMjAwIE9LJyk7XG5cdFx0XHRcdFx0dGhpcy5jaGVja01nci5jaGVjayh0aGlzKVxuXHRcdFx0XHR9LCBzZWxmLl9jb250cm9sbGVyLmNvbmZpZy5qc29uLnN0YXJ0QW5pbWF0aW9uVGltZSAqIG51bSAvIDIgLyAxXG5cdFx0XHRcdC8vICAoY2MuZ2FtZS5nZXRGcmFtZVJhdGUoKSAvIDYwKVxuXHRcdFx0KVxuXHRcdH0pXG5cdH0sXG5cdC8v6Ziy5oqW5YqoIOWIpOaWreaYr+WQpumcgOimgeajgOa1i+S4i+iQvVxuXHRjaGVja05lZWRGYWxsKCkge1xuXHRcdGlmICh0aGlzLmNoZWNrTmVlZEZhbGxUaW1lcikge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuY2hlY2tOZWVkRmFsbFRpbWVyKVxuXHRcdH1cblx0XHR0aGlzLmNoZWNrTmVlZEZhbGxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5fc3RhdHVzID09IDUpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGF0dXMgPSA0XG5cdFx0XHRcdFx0dGhpcy5vbkZhbGwoKVxuXHRcdFx0XHR9XG5cdFx0XHR9LCAzMDAgLyAxXG5cdFx0XHQvLyAoY2MuZ2FtZS5nZXRGcmFtZVJhdGUoKSAvIDYwKVxuXHRcdClcblx0fSxcblx0Ly/mlrnlnZfkuIvokL1cblx0b25GYWxsKCkge1xuXHRcdHRoaXMuY2hlY2tHZW5lcmF0ZVByb3AodGhpcy5fc2NvcmUuY2hhaW4pLnRoZW4oKCkgPT4ge1xuXHRcdFx0bGV0IHNlbGYgPSB0aGlzXG5cdFx0XHRsZXQgY2FuRmFsbCA9IDBcblx0XHRcdC8v5LuO5q+P5LiA5YiX55qE5pyA5LiL6Z2i5LiA5Liq5byA5aeL5b6A5LiK5Yik5patXG5cdFx0XHQvL+WmguaenOacieepuiDlsLHliKTmlq3mnInlh6DkuKrnqbog54S25ZCO6K6p5pyA5LiK5pa555qE5pa55Z2X5o6J6JC95LiL5p2lXG5cdFx0XHRmb3IgKGxldCBqID0gdGhpcy5yb3dOdW0gLSAxOyBqID49IDA7IGotLSkge1xuXHRcdFx0XHRjYW5GYWxsID0gMFxuXHRcdFx0XHRmb3IgKGxldCBpID0gdGhpcy5yb3dOdW0gLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5fc3RhdHVzID09IDIpIHtcblx0XHRcdFx0XHRcdHRoaXMuYmxvY2tQb29sLnB1dCh0aGlzLm1hcFtpXVtqXSlcblx0XHRcdFx0XHRcdHRoaXMubWFwW2ldW2pdID0gbnVsbFxuXHRcdFx0XHRcdFx0Y2FuRmFsbCsrXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChjYW5GYWxsICE9IDApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5tYXBbaSArIGNhbkZhbGxdW2pdID0gdGhpcy5tYXBbaV1bal1cblx0XHRcdFx0XHRcdFx0dGhpcy5tYXBbaV1bal0gPSBudWxsXG5cdFx0XHRcdFx0XHRcdHRoaXMubWFwW2kgKyBjYW5GYWxsXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5wbGF5RmFsbEFjdGlvbihjYW5GYWxsLCB7XG5cdFx0XHRcdFx0XHRcdFx0eDogaixcblx0XHRcdFx0XHRcdFx0XHR5OiBpICsgY2FuRmFsbCxcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYW5GYWxsOyBrKyspIHtcblx0XHRcdFx0XHR0aGlzLm1hcFtrXVtqXSA9IHRoaXMuaW5zdGFudGlhdGVCbG9jayh0aGlzLCB7XG5cdFx0XHRcdFx0XHR4OiBqLFxuXHRcdFx0XHRcdFx0eTogayxcblx0XHRcdFx0XHRcdHdpZHRoOiB0aGlzLmJsb2NrV2lkdGgsXG5cdFx0XHRcdFx0XHRzdGFydFRpbWU6IG51bGxcblx0XHRcdFx0XHR9LCB0aGlzLmJsb2Nrc0NvbnRhaW5lciwgJycsIHtcblx0XHRcdFx0XHRcdHg6IGosXG5cdFx0XHRcdFx0XHR5OiAtY2FuRmFsbCArIGtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHRoaXMubWFwW2tdW2pdLmdldENvbXBvbmVudCgnY2VsbCcpLnBsYXlGYWxsQWN0aW9uKGNhbkZhbGwsIG51bGwpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNoZWNrTWdyLmluaXQodGhpcylcblx0XHRcdFx0dGhpcy5jaGVja01nci5jaGVjayh0aGlzKVxuXHRcdFx0XHR0aGlzLl9zdGF0dXMgPSAxXG5cdFx0XHR9LCAyNTApXG5cdFx0fSlcblx0fSxcblx0Z2FtZU92ZXIoKSB7XG5cdFx0dGhpcy5fc3RhdHVzID0gM1xuXHRcdHRoaXMuX2NvbnRyb2xsZXIucGFnZU1nci5hZGRQYWdlKDIpXG5cdFx0dGhpcy5fY29udHJvbGxlci5wYWdlTWdyLmFkZFBhZ2UoNClcblx0XHRpZiAodGhpcy5fY29udHJvbGxlci5zb2NpYWwubm9kZS5hY3RpdmUpIHtcblx0XHRcdHRoaXMuX2NvbnRyb2xsZXIuc29jaWFsLmNsb3NlQmFubmVyQWR2KClcblx0XHR9XG5cdH0sXG5cdC8vIHRvZG8g5aSN5rS7XG5cdGFza1Jldml2ZSgpIHtcblx0XHR0aGlzLl9jb250cm9sbGVyLnBhZ2VNZ3IuYWRkUGFnZSgyKVxuXHRcdHRoaXMuX2NvbnRyb2xsZXIucGFnZU1nci5hZGRQYWdlKDUpXG5cdFx0dGhpcy5yZXZpdmVQYWdlLmFjdGl2ZSA9IHRydWVcblx0XHR0aGlzLnJldml2ZVBhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2Fza1Jldml2ZScpLmFjdGl2ZSA9IHRydWVcblx0XHR0aGlzLnJldml2ZVBhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ3N1Y2Nlc3NSZXZpdmUnKS5hY3RpdmUgPSBmYWxzZVxuXHRcdHRoaXMucmFuZ2VTcHJpdGUgPSB0aGlzLnJldml2ZVBhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2Fza1Jldml2ZScpLmdldENoaWxkQnlOYW1lKCdudW1CZycpLmdldENoaWxkQnlOYW1lKCdzcHJpdGUnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxuXHRcdHRoaXMucmFuZ2VTcHJpdGUuZmlsbFJhbmdlID0gMVxuXHRcdHRoaXMuaXNSYW5nZUFjdGlvbiA9IHRydWVcblx0XHRsZXQgbnVtTGFiZWwgPSB0aGlzLnJldml2ZVBhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ2Fza1Jldml2ZScpLmdldENoaWxkQnlOYW1lKCdudW1CZycpLmdldENoaWxkQnlOYW1lKCdudW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG5cdFx0bnVtTGFiZWwuc3RyaW5nID0gOVxuXHRcdGlmICh0aGlzLnJldml2ZVRpbWVyKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMucmV2aXZlVGltZXIpXG5cdFx0fVxuXHRcdHRoaXMucmV2aXZlVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRpZiAoK251bUxhYmVsLnN0cmluZyA+IDApIHtcblx0XHRcdFx0bnVtTGFiZWwuc3RyaW5nLS1cblx0XHRcdFx0dGhpcy5yYW5nZVNwcml0ZS5maWxsUmFuZ2UgPSAxXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLm9uU2tpcFJldml2ZSgpXG5cdFx0XHR9XG5cdFx0fSwgMTAwMClcblxuXHR9LFxuXHRvblJldml2ZUJ1dHRvbigpIHtcblx0XHRjbGVhckludGVydmFsKHRoaXMucmV2aXZlVGltZXIpXG5cdFx0dGhpcy5pc1JhbmdlQWN0aW9uID0gZmFsc2Vcblx0XHRpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUgfHwgY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwi5aSN5rS7XCIpXG5cdFx0XHR0aGlzLl9jb250cm9sbGVyLnNvY2lhbC5vblJldml2ZUJ1dHRvbigxKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNob3dSZXZpdmVTdWNjZXNzKClcblx0XHR9XG5cdH0sXG5cdHNob3dSZXZpdmVTdWNjZXNzKCkge1xuXHRcdC8vY29uc29sZS5sb2coJ+aJk+W8gOWkjea0u+aIkOWKn+mhtemdoicpXG5cdFx0dGhpcy5yZXZpdmVQYWdlLmdldENoaWxkQnlOYW1lKCdhc2tSZXZpdmUnKS5hY3RpdmUgPSBmYWxzZVxuXHRcdHRoaXMucmV2aXZlUGFnZS5nZXRDaGlsZEJ5TmFtZSgnc3VjY2Vzc1Jldml2ZScpLmFjdGl2ZSA9IHRydWVcblx0fSxcblx0b25SZXZpdmVDZXJ0YWluQnRuKCkge1xuXHRcdHRoaXMuX2NvbnRyb2xsZXIucGFnZU1nci5yZW1vdmVQYWdlKDIpXG5cdFx0dGhpcy5yZXZpdmVQYWdlLmFjdGl2ZSA9IGZhbHNlXG5cdFx0dGhpcy5fc3RhdHVzID0gMVxuXHRcdHRoaXMuX3Njb3JlLm9uUmV2aXZlKClcblx0fSxcblx0dXBkYXRlKCkge1xuXHRcdGlmICh0aGlzLmlzUmFuZ2VBY3Rpb24pIHtcblx0XHRcdHRoaXMucmFuZ2VTcHJpdGUuZmlsbFJhbmdlIC09IDEgLyA2MFxuXHRcdH1cblx0fSxcblx0b25Ta2lwUmV2aXZlKCkge1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5yZXZpdmVUaW1lcilcblx0XHR0aGlzLl9jb250cm9sbGVyLnBhZ2VNZ3IucGFnZXNbNV0uYWN0aXZlID0gZmFsc2Vcblx0XHR0aGlzLl9zY29yZS5vbkdhbWVPdmVyKHRydWUpXG5cdFx0dGhpcy5pc1JhbmdlQWN0aW9uID0gZmFsc2Vcblx0fSxcblx0cmVzdGFydCgpIHtcblx0XHR0aGlzLl9jb250cm9sbGVyLnBhZ2VNZ3Iub25PcGVuUGFnZSgxKVxuXHRcdHRoaXMucmVjb3ZlcnlBbGxCbG9ja3MoKS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuZ2FtZVN0YXJ0KClcblx0XHR9KVxuXHR9LFxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLemBk+WFt+ebuOWFsy0tLS0tLS0tLS0tLS0tLVxuXHQvLyDlgqjlrZjnlKjmiLfngrnlh7vml7bnmoTmlrnlnZcg55So5LqO55Sf5oiQ6YGT5YW3XG5cdG9uVXNlclRvdWNoZWQoaWlkLCBqaWQsIGl0ZW1UeXBlLCBjb2xvciwgd2FybmluZywgcG9zKSB7XG5cdFx0dGhpcy50YXJnZXQgPSB7XG5cdFx0XHRpOiBpaWQsXG5cdFx0XHRqOiBqaWQsXG5cdFx0XHRjb2xvcjogY29sb3IsXG5cdFx0XHRpdGVtVHlwZTogaXRlbVR5cGUsXG5cdFx0XHR4OiBwb3MueCxcblx0XHRcdHk6IHBvcy55LFxuXHRcdFx0d2FybmluZzogd2FybmluZ1xuXHRcdH1cblx0fSxcblx0Ly8g55Sf5oiQ6YGT5YW3IHR5cGUgMeS4uuWPjOWAjeWAjeaVsCAy5Li654K45by5IDPkuLrliqDkupTnmb5cblx0Z2VuZXJhdGVQcm9wSXRlbSh0eXBlKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdC8vIOaYr+WQpuWBmumBk+WFt+eUn+aIkOWKqOeUu1xuXHRcdFx0dGhpcy5tYXBbdGhpcy50YXJnZXQuaV1bdGhpcy50YXJnZXQual0gPSB0aGlzLmluc3RhbnRpYXRlQmxvY2sodGhpcywge1xuXHRcdFx0XHR4OiB0aGlzLnRhcmdldC5qLFxuXHRcdFx0XHR5OiB0aGlzLnRhcmdldC5pLFxuXHRcdFx0XHRjb2xvcjogdGhpcy50YXJnZXQuY29sb3IsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLmJsb2NrV2lkdGgsXG5cdFx0XHRcdHN0YXJ0VGltZTogbnVsbFxuXHRcdFx0fSwgdGhpcy5ibG9ja3NDb250YWluZXIsIHR5cGUpXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0cmVzb2x2ZSgpXG5cdFx0XHR9LCAzMDApXG5cdFx0fSlcblx0fSxcblx0Y2hlY2tHZW5lcmF0ZVByb3AoY2hhaW4pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lndhcm5pbmcpIHtcblx0XHRcdFx0dGhpcy5nZW5lcmF0ZVByb3BJdGVtKHRoaXMudGFyZ2V0Lndhcm5pbmcpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0cmVzb2x2ZSgpXG5cdFx0fSlcblx0fSxcblx0b25JdGVtKHR5cGUsIGNvbG9yLCBwb3MpIHtcblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0Ly8g5YiG5pWw57+75YCNIOacgOmrmOWFq+WAjVxuXHRcdFx0XHR0aGlzLl9zY29yZS50aXBCb3guaW5pdCh0aGlzLl9zY29yZSwgMSlcblx0XHRcdFx0dGhpcy5fc2NvcmUuYWRkTXVsdChjb2xvciwgcG9zKVxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVyLm11c2ljTWdyLm9uRG91YmxlKClcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd051bTsgaSsrKSB7IC8v6KGMXG5cdFx0XHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnJvd051bTsgaisrKSB7IC8v5YiXXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5tYXBbaV1bal0gJiYgdGhpcy5tYXBbaV1bal0uZ2V0Q29tcG9uZW50KCdjZWxsJykuX3N0YXR1cyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhwb3MueCAtIHRoaXMubWFwW2ldW2pdLngsIDIpICsgTWF0aC5wb3cocG9zLnkgLSB0aGlzLm1hcFtpXVtqXS55LCAyKSlcblx0XHRcdFx0XHRcdFx0aWYgKGRpc3RhbmNlICE9IDApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5zdXJmYWNlQWN0aW9uKGRpc3RhbmNlKVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0Ly8g54K45by5IOa2iOmZpOWQjOenjeminOiJsueahFxuXHRcdFx0XHR0aGlzLl9zY29yZS50aXBCb3guaW5pdCh0aGlzLl9zY29yZSwgMilcblx0XHRcdFx0dGhpcy5ub2RlLnJ1bkFjdGlvbihBQy5zaGFja0FjdGlvbigwLjEsIDEwKSlcblx0XHRcdFx0aWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XG5cdFx0XHRcdFx0dGhpcy5fY29udHJvbGxlci5zb2NpYWwub25TaGFrZVBob25lKClcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmlzUHJvcENoYWluID0gdHJ1ZVxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVyLm11c2ljTWdyLm9uQm9vbSgpXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dOdW07IGkrKykgeyAvL+ihjFxuXHRcdFx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5yb3dOdW07IGorKykgeyAvL+WIl1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMubWFwW2ldW2pdICYmIHRoaXMubWFwW2ldW2pdLmdldENvbXBvbmVudCgnY2VsbCcpLmNvbG9yID09IGNvbG9yICYmIHRoaXMubWFwW2ldW2pdICYmIHRoaXMubWFwW2ldW2pdLmdldENvbXBvbmVudCgnY2VsbCcpLl9zdGF0dXMgIT0gMikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5vblRvdWNoZWQoY29sb3IsIGZhbHNlLCB0cnVlKVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5tYXBbaV1bal0ucnVuQWN0aW9uKEFDLnJvY2tBY3Rpb24oMC4yLCAxMCkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDM6IC8vOiAg5Yqg5q2l5pWwXG5cdFx0XHRcdHRoaXMuX3Njb3JlLnRpcEJveC5pbml0KHRoaXMuX3Njb3JlLCA0KVxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVyLm11c2ljTWdyLm9uRG91YmxlKClcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd051bTsgaSsrKSB7IC8v6KGMXG5cdFx0XHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnJvd051bTsgaisrKSB7IC8v5YiXXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5tYXBbaV1bal0gJiYgdGhpcy5tYXBbaV1bal0uZ2V0Q29tcG9uZW50KCdjZWxsJykuX3N0YXR1cyA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhwb3MueCAtIHRoaXMubWFwW2ldW2pdLngsIDIpICsgTWF0aC5wb3cocG9zLnkgLSB0aGlzLm1hcFtpXVtqXS55LCAyKSlcblx0XHRcdFx0XHRcdFx0aWYgKGRpc3RhbmNlICE9IDApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5zdXJmYWNlQWN0aW9uKGRpc3RhbmNlKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3Njb3JlLm9uU3RlcCgzKS50aGVuKClcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDQ6IC8vIDog5raI6Zmk5YWo6YOo5Y2V6Lqr55qE5pa55Z2XXG5cdFx0XHRcdHRoaXMuX3Njb3JlLnRpcEJveC5pbml0KHRoaXMuX3Njb3JlLCA1KVxuXHRcdFx0XHR0aGlzLmlzUHJvcENoYWluID0gdHJ1ZVxuXHRcdFx0XHR0aGlzLl9jb250cm9sbGVyLm11c2ljTWdyLm9uTWFnaWMoKVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93TnVtOyBpKyspIHsgLy/ooYxcblx0XHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93TnVtOyBqKyspIHsgLy/liJdcblx0XHRcdFx0XHRcdGlmICh0aGlzLm1hcFtpXVtqXSAmJiB0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5pc1NpbmdsZSAmJiB0aGlzLm1hcFtpXVtqXSAmJiB0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5fc3RhdHVzICE9IDIpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHBvcy54IC0gdGhpcy5tYXBbaV1bal0ueCwgMikgKyBNYXRoLnBvdyhwb3MueSAtIHRoaXMubWFwW2ldW2pdLnksIDIpKVxuXHRcdFx0XHRcdFx0XHR0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoJ2NlbGwnKS5vblRvdWNoZWQoY29sb3IsIGZhbHNlLCB0cnVlLCBkaXN0YW5jZSlcblx0XHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCLprZTms5Xmo5Lop6blj5HnmoTngrlcIiwgaSwgaiwgdGhpcy5tYXBbaV1bal0uZ2V0Q29tcG9uZW50KCdjZWxsJykuY29sb3IsIHRoaXMubWFwW2ldW2pdLmdldENvbXBvbmVudCgnY2VsbCcpLmlzU2luZ2xlKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH0sXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tIOmihOWItuS9k+WunuS+i+WMli0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyDnlJ/miJDlr7nosaHmsaBcblx0Z2VuZXJhdGVQb29sKCkge1xuXHRcdHRoaXMuYmxvY2tQb29sID0gbmV3IGNjLk5vZGVQb29sKClcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgucG93KHRoaXMucm93TnVtLCAyKTsgaSsrKSB7XG5cdFx0XHRsZXQgYmxvY2sgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJsb2NrUHJlZmFiKVxuXHRcdFx0dGhpcy5ibG9ja1Bvb2wucHV0KGJsb2NrKVxuXHRcdH1cblx0fSxcblx0Ly8g5a6e5L6L5YyW5Y2V5Liq5pa55Z2XXG5cdGluc3RhbnRpYXRlQmxvY2soc2VsZiwgZGF0YSwgcGFyZW50LCBpdGVtVHlwZSwgcG9zKSB7XG5cdFx0aXRlbVR5cGUgPSBpdGVtVHlwZSA/IGl0ZW1UeXBlIDogMFxuXHRcdGlmIChpdGVtVHlwZSAhPSAwKSB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIumBk+WFt+iKgueCueaVsOaNrlwiLCBkYXRhLCBpdGVtVHlwZSlcblx0XHR9XG5cdFx0bGV0IGJsb2NrID0gbnVsbFxuXHRcdGlmIChzZWxmLmJsb2NrUG9vbCAmJiBzZWxmLmJsb2NrUG9vbC5zaXplKCkgPiAwKSB7XG5cdFx0XHRibG9jayA9IHNlbGYuYmxvY2tQb29sLmdldCgpXG5cdFx0fSBlbHNlIHtcblx0XHRcdGJsb2NrID0gY2MuaW5zdGFudGlhdGUoc2VsZi5ibG9ja1ByZWZhYilcblx0XHR9XG5cdFx0YmxvY2sucGFyZW50ID0gcGFyZW50XG5cdFx0YmxvY2suc2NhbGUgPSAxXG5cdFx0YmxvY2sueCA9IDBcblx0XHRibG9jay55ID0gMFxuXHRcdGJsb2NrLmdldENvbXBvbmVudCgnY2VsbCcpLmluaXQoc2VsZiwgZGF0YSwgdGhpcy5ibG9ja1dpZHRoLCBpdGVtVHlwZSwgcG9zKVxuXHRcdHJldHVybiBibG9ja1xuXHR9LFxuXHQvLyDlm57mlLbmiYDmnInoioLngrlcblx0cmVjb3ZlcnlBbGxCbG9ja3MoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBjaGlsZHJlbiA9IHRoaXMuYmxvY2tzQ29udGFpbmVyLmNoaWxkcmVuXG5cdFx0XHRpZiAoY2hpbGRyZW4ubGVuZ3RoICE9IDApIHtcblx0XHRcdFx0bGV0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0XHQvLyAgIGNvbnNvbGUubG9nKGxlbmd0aClcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuYmxvY2tQb29sLnB1dChjaGlsZHJlblswXSlcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93TnVtOyBpKyspIHtcblx0XHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMucm93TnVtOyBqKyspIHtcblx0XHRcdFx0XHRcdHRoaXMubWFwW2ldW2pdID0gbnVsbFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmVzb2x2ZSgnJylcblx0XHR9KVxuXHR9LFxuXG59KTsiXX0=