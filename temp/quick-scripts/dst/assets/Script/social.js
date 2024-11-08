
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/social.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53b05czD4xGgZ8D0pLpUj9M', 'social');
// Script/social.js

"use strict";

/**
 * @author uu
 * @file  排行榜组件
 * @description 用户点击查看排行榜才检查授权,如果此时用户没有授权则进入授权界面
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    display: cc.Sprite,
    groupDisplay: cc.Sprite,
    _isShow: false // score: 0

  },
  isSharing: false,
  init: function init(c) {
    var _this = this;

    var self = this;
    this._controller = c;

    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.onShareAppMessage(function () {
        return {
          title: "开局只是个农民，现在已经做到宰相",
          // imageUrlId: 'oxEwGvClT0uldQ470pM84w',
          imageUrl: 'https://mmocgame.qpic.cn/wechatgame/LtJZOjH6Z9ibiaMlpqzldsOf46Q7TZiaysI1fwc4Oj1L3CkbCaJMAMoicibbHu2HUQkOib/0'
        };
      }); // this.display.node.width = window.width
      //this.display.node.height = window.height
      //this.display.node.getComponent(cc.WXSubContextView).enabled = false;
      //   this.tex = new cc.Texture2D();
      //TODO: 微信小游戏导致音乐自动关闭 处理失败
      // 监听

      wx.onAudioInterruptionEnd(function () {
        c.musicMgr.pauseBg();
        c.musicMgr.resumeBg();
      });
      wx.onShow(function (options) {
        // console.log(options)
        if (options.scene == 1044) {
          wx.postMessage({
            message: 'group',
            shareTicket: options.shareTicket
          });
          c.openGroupRank();
          _this.display.node.active = false;
          c.totalRank.active = false;
        }

        cc.director.resume(); // if (!self.hasShared && self.isSharing && self._controller.game._status == 1) {
        // 	// TODO 分享成功
        // 	self.onItemShareSuccess()
        // }
      });
      wx.onHide(function () {
        cc.director.pause();
      }); // 获取最高官阶

      this.getHighestLevel();
    }
  },
  onItemShareSuccess: function onItemShareSuccess() {
    this.hasShared = true;

    this._controller.game.fakeShareSuccess();
  },
  getHighestLevel: function getHighestLevel() {
    var highLevel = wx.getStorageSync('highLevel');
    return highLevel;
  },
  getHighestScore: function getHighestScore() {
    var score = wx.getStorageSync('highScore');
    return score;
  },
  // --------------- share ----------------
  onShareButton: function onShareButton() {
    var self = this;
    wx.shareAppMessage({
      title: "我终于当上了" + this._controller.scoreMgr.levelData[this._controller.scoreMgr.level - 1].name + ",不服来战",
      // imageUrlId: 'oxEwGvClT0uldQ470pM84w',
      imageUrl: 'https://mmocgame.qpic.cn/wechatgame/LtJZOjH6Z9ibiaMlpqzldsOf46Q7TZiaysI1fwc4Oj1L3CkbCaJMAMoicibbHu2HUQkOib/0'
    });
  },
  onUsualShareButton: function onUsualShareButton() {
    wx.shareAppMessage({
      title: "开局只是个农民，现在已经做到宰相",
      // imageUrlId: 'oxEwGvClT0uldQ470pM84w',
      imageUrl: 'https://mmocgame.qpic.cn/wechatgame/LtJZOjH6Z9ibiaMlpqzldsOf46Q7TZiaysI1fwc4Oj1L3CkbCaJMAMoicibbHu2HUQkOib/0'
    });
  },
  onItemShareButton: function onItemShareButton() {
    if (!this.hasShared) {
      this.isSharing = true;
    } else {
      // 提示玩家 当前局已分享
      return;
    }

    wx.shareAppMessage({
      title: "开局只是个农民，现在已经做到宰相",
      // imageUrlId: 'oxEwGvClT0uldQ470pM84w',
      imageUrl: 'https://mmocgame.qpic.cn/wechatgame/LtJZOjH6Z9ibiaMlpqzldsOf46Q7TZiaysI1fwc4Oj1L3CkbCaJMAMoicibbHu2HUQkOib/0'
    });
  },
  onShakePhone: function onShakePhone() {
    wx.vibrateShort();
  },
  // ---------------分数上传---------------
  onGameOver: function onGameOver(level, score) {
    //上传分数
    //打开开放域
    this.score = score;
    var highLevel = level;
    var highScore = score;
    var self = this;
    highLevel = wx.getStorageSync('highLevel');
    highLevel = parseInt(highLevel);

    if (highLevel) {
      highLevel = highLevel < level ? level : highLevel;
    } else {
      highLevel = level;
    }

    highScore = wx.getStorageSync('highScore');

    if (highScore) {
      highScore = parseInt(highScore);
      highScore = highScore < score ? score : highScore;
    } else {
      highScore = score;
    }

    var highLevelName = this._controller.gameData.json.levelData[highLevel - 1].name;
    wx.setStorageSync('highLevel', highLevel + '');
    wx.setStorageSync('highScore', highScore + '');
    self._controller.scoreMgr.failHighScore.string = "您的最高分:" + (highScore + '');
    var kvDataList = new Array();
    kvDataList.push({
      key: "highLevel",
      value: highLevelName
    }, {
      key: "highScore",
      value: highScore + ''
    });
    wx.setUserCloudStorage({
      "KVDataList": kvDataList,
      success: function success() {//  self.showRank()
      },
      fail: function fail(res) {//   console.log(res)
      }
    });
  },
  showRank: function showRank() {
    wx.postMessage({
      message: 'Show'
    });
    this.display.node.active = true;
    this._isShow = true;
  },
  // switchRankType() {
  //   wx.postMessage({
  //     message: 'switchRank'
  //   })
  //   this._isShow = true
  // },
  closeRank: function closeRank() {
    this.display.node.active = false;
    wx.postMessage({
      message: 'Hide'
    });
    this._isShow = false;
  },
  showGroupRank: function showGroupRank() {
    wx.postMessage({
      message: 'Show'
    });
    this.groupDisplay.node.active = true;
    this._isShow = true;
  },
  // switchRankType() {
  //   wx.postMessage({
  //     message: 'switchRank'
  //   })
  //   this._isShow = true
  // },
  closeGroupRank: function closeGroupRank() {
    this.groupDisplay.node.active = false;
    wx.postMessage({
      message: 'Hide'
    });
    this._isShow = false;
  },
  createImage: function createImage(sprite, url) {
    var image = wx.createImage();

    image.onload = function () {
      var texture = new cc.Texture2D();
      texture.initWithElement(image);
      texture.handleLoadedTexture();
      sprite.spriteFrame = new cc.SpriteFrame(texture);
    };

    image.src = url;
  },
  update: function update() {
    if (this._isShow) {
      if (this.display.node.active) {
        this.display.node.getComponent(cc.WXSubContextView).update();
      }

      if (this.groupDisplay.node.active) {
        this.groupDisplay.node.getComponent(cc.WXSubContextView).update();
      }
    }
  },
  // 控制打开广告
  onReviveButton: function onReviveButton(type) {
    var _this2 = this;

    // 广告位
    var self = this;
    this.adType = type; //0表示加倍 1表示复活 2表示炸弹

    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      if (this.audioAd) {
        this.audioAd.show()["catch"](function () {
          // 失败重试
          _this2.audioAd.load().then(function () {
            return _this2.audioAd.show();
          })["catch"](function (err) {
            console.log('激励视频 广告显示失败', err.errMsg);

            if (self.adType == 1) {
              self._controller.game.onSkipRevive();
            } else if (self.adType == 2) {
              self._controller.scoreMgr.onLevelUpButton();
            } else {
              self.onItemShareSuccess();
            }
          });
        });
        return;
      }

      this.audioAd = wx.createRewardedVideoAd({
        adUnitId: '2300011781_01'
      });
      this.audioAd.show()["catch"](function () {
        // 失败重试
        _this2.audioAd.load().then(function () {
          return _this2.audioAd.show();
        })["catch"](function (err) {
          self.fakeShare();
        });
      });
      this.audioAd.onError(function (err) {
        self.fakeShare();
      });
      this.audioAd.onClose(function (res) {
        if (self.adType == 1) {
          if (res && res.isEnded || res === undefined) {
            self._controller.game.showReviveSuccess();
          } else {
            self._controller.game.askRevive();
          }
        } else if (self.adType == 0) {
          if (res && res.isEnded || res === undefined) {
            self._controller.scoreMgr.onLevelUpButton(2);
          }
        } else {
          if (res && res.isEnded || res === undefined) {
            self.onItemShareSuccess();
          }
        }
      });
    } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
      this._createVedioAd(function (res) {
        if (self.adType == 1) {
          if (res && res.isEnded || res === undefined) {
            self._controller.game.showReviveSuccess();
          } else {
            self._controller.game.askRevive();
          }
        } else if (self.adType == 0) {
          if (res && res.isEnded || res === undefined) {
            self._controller.scoreMgr.onLevelUpButton(2);
          }
        } else {
          if (res && res.isEnded || res === undefined) {
            self.onItemShareSuccess();
          }
        }
      });
    }
  },
  _createVedioAd: function _createVedioAd(callback) {
    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
      var videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-7a9758fd45a5f9ce'
      });
      videoAd.load().then(function () {
        return videoAd.show();
      })["catch"](function (err) {
        console.log("视频加载失败", err);
        wx.showModal({
          title: '提示',
          content: '视频加载失败',
          showCancel: false
        });
      });
      videoAd.onClose(function (res) {
        if (!videoAd) {
          return;
        }

        if (res.isEnded) {
          callback(res);
          videoAd.offClose();
        } else {
          videoAd.offClose();
        }
      });
      videoAd.onError(function (msg) {
        wx.showToast({
          title: '错误'
        });
        console.log(msg);
      });
    } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
      var _videoAd = tt.createRewardedVideoAd({
        adUnitId: '44l22nib948p0c5v63'
      });

      _videoAd.load().then(function () {
        return _videoAd.show();
      })["catch"](function (err) {
        console.log("视频加载失败", err);
        tt.showModal({
          title: '提示',
          content: '视频加载失败',
          showCancel: false
        });
      });

      _videoAd.onClose(function (res) {
        if (!_videoAd) {
          return;
        }

        if (res.isEnded) {
          callback(res);

          _videoAd.offClose();
        } else {
          console.log("未播放完关闭");

          _videoAd.offClose();
        }
      });

      _videoAd.onError(function (msg) {
        tt.showToast({
          title: '错误'
        });
        console.log(msg);
      });
    }
  },
  fakeShare: function fakeShare() {
    var self = this;
    wx.shareAppMessage({
      title: "我已经玩到" + this._controller.scoreMgr.score + "分了，邀请你来挑战",
      // imageUrlId: 'oxEwGvClT0uldQ470pM84w',
      imageUrl: 'https://mmocgame.qpic.cn/wechatgame/LtJZOjH6Z9ibiaMlpqzldsOf46Q7TZiaysI1fwc4Oj1L3CkbCaJMAMoicibbHu2HUQkOib/0'
    });

    if (this.adType) {
      self._controller.game.showReviveSuccess();
    } else {
      self._controller.scoreMgr.onLevelUpButton(2);
    }
  },
  openBannerAdv: function openBannerAdv() {// 创建 Banner 广告实例，提前初始化
    // let screenWidth = wx.getSystemInfoSync().screenWidth
    // let bannerHeight = screenWidth / 350 * 120
    // let screenHeight = wx.getSystemInfoSync().screenHeight - 108
    // let adUnitIds = [
    //   'adunit-510a4ec39065ef96',
    //   'adunit-29b0fa7a2db8e8cb',
    //   'adunit-4020bb9ea439e6a5'
    // ]
    // if (this.bannerAd) {
    //   this.bannerAd.destroy()
    // }
    // this.bannerAd = wx.createBannerAd({
    //   adUnitId: adUnitIds[Math.floor(Math.random() * 3)],
    //   style: {
    //     left: 0,
    //     top: screenHeight,
    //     width: 620,
    //   }
    // })
    // // 在适合的场景显示 Banner 广告
    // this.bannerAd.onLoad(() => {
    //   // console.log('banner 广告加载成功')
    // })
    // this.bannerAd.onError((e) => {
    //   console.log('banner 广告加载失败', e)
    // })
    // this.bannerAd.show()
    //   .then()
  },
  navToMiniprogram: function navToMiniprogram(event, custom) {
    console.log(custom);
    wx.navigateToMiniProgram({
      appId: custom
    });
  },
  closeBannerAdv: function closeBannerAdv() {
    if (this.bannerAd) {
      this.bannerAd.hide();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzb2NpYWwuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkaXNwbGF5IiwiU3ByaXRlIiwiZ3JvdXBEaXNwbGF5IiwiX2lzU2hvdyIsImlzU2hhcmluZyIsImluaXQiLCJjIiwic2VsZiIsIl9jb250cm9sbGVyIiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJpbWFnZVVybCIsIm9uQXVkaW9JbnRlcnJ1cHRpb25FbmQiLCJtdXNpY01nciIsInBhdXNlQmciLCJyZXN1bWVCZyIsIm9uU2hvdyIsIm9wdGlvbnMiLCJzY2VuZSIsInBvc3RNZXNzYWdlIiwibWVzc2FnZSIsInNoYXJlVGlja2V0Iiwib3Blbkdyb3VwUmFuayIsIm5vZGUiLCJhY3RpdmUiLCJ0b3RhbFJhbmsiLCJkaXJlY3RvciIsInJlc3VtZSIsIm9uSGlkZSIsInBhdXNlIiwiZ2V0SGlnaGVzdExldmVsIiwib25JdGVtU2hhcmVTdWNjZXNzIiwiaGFzU2hhcmVkIiwiZ2FtZSIsImZha2VTaGFyZVN1Y2Nlc3MiLCJoaWdoTGV2ZWwiLCJnZXRTdG9yYWdlU3luYyIsImdldEhpZ2hlc3RTY29yZSIsInNjb3JlIiwib25TaGFyZUJ1dHRvbiIsInNoYXJlQXBwTWVzc2FnZSIsInNjb3JlTWdyIiwibGV2ZWxEYXRhIiwibGV2ZWwiLCJuYW1lIiwib25Vc3VhbFNoYXJlQnV0dG9uIiwib25JdGVtU2hhcmVCdXR0b24iLCJvblNoYWtlUGhvbmUiLCJ2aWJyYXRlU2hvcnQiLCJvbkdhbWVPdmVyIiwiaGlnaFNjb3JlIiwicGFyc2VJbnQiLCJoaWdoTGV2ZWxOYW1lIiwiZ2FtZURhdGEiLCJqc29uIiwic2V0U3RvcmFnZVN5bmMiLCJmYWlsSGlnaFNjb3JlIiwic3RyaW5nIiwia3ZEYXRhTGlzdCIsIkFycmF5IiwicHVzaCIsImtleSIsInZhbHVlIiwic2V0VXNlckNsb3VkU3RvcmFnZSIsInN1Y2Nlc3MiLCJmYWlsIiwicmVzIiwic2hvd1JhbmsiLCJjbG9zZVJhbmsiLCJzaG93R3JvdXBSYW5rIiwiY2xvc2VHcm91cFJhbmsiLCJjcmVhdGVJbWFnZSIsInNwcml0ZSIsInVybCIsImltYWdlIiwib25sb2FkIiwidGV4dHVyZSIsIlRleHR1cmUyRCIsImluaXRXaXRoRWxlbWVudCIsImhhbmRsZUxvYWRlZFRleHR1cmUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwic3JjIiwidXBkYXRlIiwiZ2V0Q29tcG9uZW50IiwiV1hTdWJDb250ZXh0VmlldyIsIm9uUmV2aXZlQnV0dG9uIiwidHlwZSIsImFkVHlwZSIsImF1ZGlvQWQiLCJzaG93IiwibG9hZCIsInRoZW4iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZXJyTXNnIiwib25Ta2lwUmV2aXZlIiwib25MZXZlbFVwQnV0dG9uIiwiY3JlYXRlUmV3YXJkZWRWaWRlb0FkIiwiYWRVbml0SWQiLCJmYWtlU2hhcmUiLCJvbkVycm9yIiwib25DbG9zZSIsImlzRW5kZWQiLCJ1bmRlZmluZWQiLCJzaG93UmV2aXZlU3VjY2VzcyIsImFza1Jldml2ZSIsIkJZVEVEQU5DRV9HQU1FIiwiX2NyZWF0ZVZlZGlvQWQiLCJjYWxsYmFjayIsInZpZGVvQWQiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsIm9mZkNsb3NlIiwibXNnIiwic2hvd1RvYXN0IiwidHQiLCJvcGVuQmFubmVyQWR2IiwibmF2VG9NaW5pcHJvZ3JhbSIsImV2ZW50IiwiY3VzdG9tIiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJjbG9zZUJhbm5lckFkdiIsImJhbm5lckFkIiwiaGlkZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1IsYUFBU0Qs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QUFqQixDQUEwQkgsS0FBcEMsR0FBNEMsV0FEakM7QUFFbEI7QUFDQTNCLE1BQUFBLFFBQVEsRUFBRTtBQUhRLEtBQW5COztBQUtBLFFBQUksS0FBSzZFLE1BQVQsRUFBaUI7QUFDaEJ2RixNQUFBQSxJQUFJLENBQUNDLFdBQUwsQ0FBaUIrQixJQUFqQixDQUFzQnlFLGlCQUF0QjtBQUNBLEtBRkQsTUFFTztBQUNOekcsTUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCdUMsUUFBakIsQ0FBMEJ5RCxlQUExQixDQUEwQyxDQUExQztBQUNBO0FBQ0QsR0E3V087QUE4V1JxQixFQUFBQSxhQTlXUSwyQkE4V1EsQ0FDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0E1WU87QUE2WVJDLEVBQUFBLGdCQTdZUSw0QkE2WVNDLEtBN1lULEVBNllnQkMsTUE3WWhCLEVBNll3QjtBQUMvQjVCLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMkIsTUFBWjtBQUNBcEgsSUFBQUEsRUFBRSxDQUFDcUgscUJBQUgsQ0FBeUI7QUFDeEJDLE1BQUFBLEtBQUssRUFBRUY7QUFEaUIsS0FBekI7QUFHQSxHQWxaTztBQW1aUkcsRUFBQUEsY0FuWlEsNEJBbVpTO0FBQ2hCLFFBQUksS0FBS0MsUUFBVCxFQUFtQjtBQUNsQixXQUFLQSxRQUFMLENBQWNDLElBQWQ7QUFDQTtBQUNEO0FBdlpPLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciB1dVxuICogQGZpbGUgIOaOkuihjOamnOe7hOS7tlxuICogQGRlc2NyaXB0aW9uIOeUqOaIt+eCueWHu+afpeeci+aOkuihjOamnOaJjeajgOafpeaOiOadgyzlpoLmnpzmraTml7bnlKjmiLfmsqHmnInmjojmnYPliJnov5vlhaXmjojmnYPnlYzpnaJcbiAqL1xuY2MuQ2xhc3Moe1xuXHRleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cdHByb3BlcnRpZXM6IHtcblx0XHRkaXNwbGF5OiBjYy5TcHJpdGUsXG5cdFx0Z3JvdXBEaXNwbGF5OiBjYy5TcHJpdGUsXG5cdFx0X2lzU2hvdzogZmFsc2UsXG5cdFx0Ly8gc2NvcmU6IDBcblx0fSxcblx0aXNTaGFyaW5nOiBmYWxzZSxcblx0aW5pdChjKSB7XG5cdFx0bGV0IHNlbGYgPSB0aGlzXG5cdFx0dGhpcy5fY29udHJvbGxlciA9IGNcblx0XHRpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xuXHRcdFx0d3guc2hvd1NoYXJlTWVudSh7XG5cdFx0XHRcdHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuXHRcdFx0fSlcblx0XHRcdHd4Lm9uU2hhcmVBcHBNZXNzYWdlKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0aXRsZTogXCLlvIDlsYDlj6rmmK/kuKrlhpzmsJHvvIznjrDlnKjlt7Lnu4/lgZrliLDlrrDnm7hcIixcblx0XHRcdFx0XHQvLyBpbWFnZVVybElkOiAnb3hFd0d2Q2xUMHVsZFE0NzBwTTg0dycsXG5cdFx0XHRcdFx0aW1hZ2VVcmw6ICdodHRwczovL21tb2NnYW1lLnFwaWMuY24vd2VjaGF0Z2FtZS9MdEpaT2pINlo5aWJpYU1scHF6bGRzT2Y0NlE3VFppYXlzSTFmd2M0T2oxTDNDa2JDYUpNQU1vaWNpYmJIdTJIVVFrT2liLzAnXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQvLyB0aGlzLmRpc3BsYXkubm9kZS53aWR0aCA9IHdpbmRvdy53aWR0aFxuXHRcdFx0Ly90aGlzLmRpc3BsYXkubm9kZS5oZWlnaHQgPSB3aW5kb3cuaGVpZ2h0XG5cdFx0XHQvL3RoaXMuZGlzcGxheS5ub2RlLmdldENvbXBvbmVudChjYy5XWFN1YkNvbnRleHRWaWV3KS5lbmFibGVkID0gZmFsc2U7XG5cdFx0XHQvLyAgIHRoaXMudGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuXHRcdFx0Ly9UT0RPOiDlvq7kv6HlsI/muLjmiI/lr7zoh7Tpn7PkuZDoh6rliqjlhbPpl60g5aSE55CG5aSx6LSlXG5cdFx0XHQvLyDnm5HlkKxcblx0XHRcdHd4Lm9uQXVkaW9JbnRlcnJ1cHRpb25FbmQoKCkgPT4ge1xuXHRcdFx0XHRjLm11c2ljTWdyLnBhdXNlQmcoKVxuXHRcdFx0XHRjLm11c2ljTWdyLnJlc3VtZUJnKClcblx0XHRcdH0pXG5cdFx0XHR3eC5vblNob3coKG9wdGlvbnMpID0+IHtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cob3B0aW9ucylcblx0XHRcdFx0aWYgKG9wdGlvbnMuc2NlbmUgPT0gMTA0NCkge1xuXHRcdFx0XHRcdHd4LnBvc3RNZXNzYWdlKHtcblx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdncm91cCcsXG5cdFx0XHRcdFx0XHRzaGFyZVRpY2tldDogb3B0aW9ucy5zaGFyZVRpY2tldFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Yy5vcGVuR3JvdXBSYW5rKClcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSBmYWxzZVxuXHRcdFx0XHRcdGMudG90YWxSYW5rLmFjdGl2ZSA9IGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2MuZGlyZWN0b3IucmVzdW1lKClcblx0XHRcdFx0Ly8gaWYgKCFzZWxmLmhhc1NoYXJlZCAmJiBzZWxmLmlzU2hhcmluZyAmJiBzZWxmLl9jb250cm9sbGVyLmdhbWUuX3N0YXR1cyA9PSAxKSB7XG5cdFx0XHRcdC8vIFx0Ly8gVE9ETyDliIbkuqvmiJDlip9cblx0XHRcdFx0Ly8gXHRzZWxmLm9uSXRlbVNoYXJlU3VjY2VzcygpXG5cdFx0XHRcdC8vIH1cblx0XHRcdH0pXG5cdFx0XHR3eC5vbkhpZGUoKCkgPT4ge1xuXHRcdFx0XHRjYy5kaXJlY3Rvci5wYXVzZSgpXG5cdFx0XHR9KVxuXG5cdFx0XHQvLyDojrflj5bmnIDpq5jlrpjpmLZcblx0XHRcdHRoaXMuZ2V0SGlnaGVzdExldmVsKClcblx0XHR9XG5cblx0fSxcblx0b25JdGVtU2hhcmVTdWNjZXNzKCkge1xuXHRcdHRoaXMuaGFzU2hhcmVkID0gdHJ1ZVxuXHRcdHRoaXMuX2NvbnRyb2xsZXIuZ2FtZS5mYWtlU2hhcmVTdWNjZXNzKClcblx0fSxcblx0Z2V0SGlnaGVzdExldmVsKCkge1xuXHRcdGxldCBoaWdoTGV2ZWwgPSB3eC5nZXRTdG9yYWdlU3luYygnaGlnaExldmVsJylcblx0XHRyZXR1cm4gaGlnaExldmVsXG5cdH0sXG5cdGdldEhpZ2hlc3RTY29yZSgpIHtcblx0XHRsZXQgc2NvcmUgPSB3eC5nZXRTdG9yYWdlU3luYygnaGlnaFNjb3JlJylcblx0XHRyZXR1cm4gc2NvcmVcblx0fSxcblx0Ly8gLS0tLS0tLS0tLS0tLS0tIHNoYXJlIC0tLS0tLS0tLS0tLS0tLS1cblx0b25TaGFyZUJ1dHRvbigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0d3guc2hhcmVBcHBNZXNzYWdlKHtcblx0XHRcdHRpdGxlOiBcIuaIkee7iOS6juW9k+S4iuS6hlwiICsgdGhpcy5fY29udHJvbGxlci5zY29yZU1nci5sZXZlbERhdGFbdGhpcy5fY29udHJvbGxlci5zY29yZU1nci5sZXZlbCAtIDFdLm5hbWUgKyBcIizkuI3mnI3mnaXmiJhcIixcblx0XHRcdC8vIGltYWdlVXJsSWQ6ICdveEV3R3ZDbFQwdWxkUTQ3MHBNODR3Jyxcblx0XHRcdGltYWdlVXJsOiAnaHR0cHM6Ly9tbW9jZ2FtZS5xcGljLmNuL3dlY2hhdGdhbWUvTHRKWk9qSDZaOWliaWFNbHBxemxkc09mNDZRN1RaaWF5c0kxZndjNE9qMUwzQ2tiQ2FKTUFNb2ljaWJiSHUySFVRa09pYi8wJ1xuXHRcdH0pXG5cdH0sXG5cdG9uVXN1YWxTaGFyZUJ1dHRvbigpIHtcblx0XHR3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xuXHRcdFx0dGl0bGU6IFwi5byA5bGA5Y+q5piv5Liq5Yac5rCR77yM546w5Zyo5bey57uP5YGa5Yiw5a6w55u4XCIsXG5cdFx0XHQvLyBpbWFnZVVybElkOiAnb3hFd0d2Q2xUMHVsZFE0NzBwTTg0dycsXG5cdFx0XHRpbWFnZVVybDogJ2h0dHBzOi8vbW1vY2dhbWUucXBpYy5jbi93ZWNoYXRnYW1lL0x0SlpPakg2WjlpYmlhTWxwcXpsZHNPZjQ2UTdUWmlheXNJMWZ3YzRPajFMM0NrYkNhSk1BTW9pY2liYkh1MkhVUWtPaWIvMCdcblx0XHR9KVxuXHR9LFxuXHRvbkl0ZW1TaGFyZUJ1dHRvbigpIHtcblx0XHRpZiAoIXRoaXMuaGFzU2hhcmVkKSB7XG5cdFx0XHR0aGlzLmlzU2hhcmluZyA9IHRydWVcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8g5o+Q56S6546p5a62IOW9k+WJjeWxgOW3suWIhuS6q1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdHd4LnNoYXJlQXBwTWVzc2FnZSh7XG5cdFx0XHR0aXRsZTogXCLlvIDlsYDlj6rmmK/kuKrlhpzmsJHvvIznjrDlnKjlt7Lnu4/lgZrliLDlrrDnm7hcIixcblx0XHRcdC8vIGltYWdlVXJsSWQ6ICdveEV3R3ZDbFQwdWxkUTQ3MHBNODR3Jyxcblx0XHRcdGltYWdlVXJsOiAnaHR0cHM6Ly9tbW9jZ2FtZS5xcGljLmNuL3dlY2hhdGdhbWUvTHRKWk9qSDZaOWliaWFNbHBxemxkc09mNDZRN1RaaWF5c0kxZndjNE9qMUwzQ2tiQ2FKTUFNb2ljaWJiSHUySFVRa09pYi8wJ1xuXHRcdH0pXG5cdH0sXG5cdG9uU2hha2VQaG9uZSgpIHtcblx0XHR3eC52aWJyYXRlU2hvcnQoKVxuXHR9LFxuXHQvLyAtLS0tLS0tLS0tLS0tLS3liIbmlbDkuIrkvKAtLS0tLS0tLS0tLS0tLS1cblx0b25HYW1lT3ZlcihsZXZlbCwgc2NvcmUpIHtcblx0XHQvL+S4iuS8oOWIhuaVsFxuXHRcdC8v5omT5byA5byA5pS+5Z+fXG5cdFx0dGhpcy5zY29yZSA9IHNjb3JlXG5cdFx0bGV0IGhpZ2hMZXZlbCA9IGxldmVsXG5cdFx0bGV0IGhpZ2hTY29yZSA9IHNjb3JlXG5cdFx0bGV0IHNlbGYgPSB0aGlzXG5cdFx0aGlnaExldmVsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2hpZ2hMZXZlbCcpXG5cdFx0aGlnaExldmVsID0gcGFyc2VJbnQoaGlnaExldmVsKVxuXHRcdGlmIChoaWdoTGV2ZWwpIHtcblx0XHRcdGhpZ2hMZXZlbCA9IGhpZ2hMZXZlbCA8IGxldmVsID8gbGV2ZWwgOiBoaWdoTGV2ZWxcblx0XHR9IGVsc2Uge1xuXHRcdFx0aGlnaExldmVsID0gbGV2ZWxcblx0XHR9XG5cdFx0aGlnaFNjb3JlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2hpZ2hTY29yZScpXG5cdFx0aWYgKGhpZ2hTY29yZSkge1xuXHRcdFx0aGlnaFNjb3JlID0gcGFyc2VJbnQoaGlnaFNjb3JlKVxuXHRcdFx0aGlnaFNjb3JlID0gaGlnaFNjb3JlIDwgc2NvcmUgPyBzY29yZSA6IGhpZ2hTY29yZVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRoaWdoU2NvcmUgPSBzY29yZVxuXHRcdH1cblx0XHR2YXIgaGlnaExldmVsTmFtZSA9IHRoaXMuX2NvbnRyb2xsZXIuZ2FtZURhdGEuanNvbi5sZXZlbERhdGFbaGlnaExldmVsIC0gMV0ubmFtZVxuXHRcdHd4LnNldFN0b3JhZ2VTeW5jKCdoaWdoTGV2ZWwnLCBoaWdoTGV2ZWwgKyAnJylcblx0XHR3eC5zZXRTdG9yYWdlU3luYygnaGlnaFNjb3JlJywgaGlnaFNjb3JlICsgJycpXG5cdFx0c2VsZi5fY29udHJvbGxlci5zY29yZU1nci5mYWlsSGlnaFNjb3JlLnN0cmluZyA9IFwi5oKo55qE5pyA6auY5YiGOlwiICsgKGhpZ2hTY29yZSArICcnKVxuXHRcdHZhciBrdkRhdGFMaXN0ID0gbmV3IEFycmF5KClcblx0XHRrdkRhdGFMaXN0LnB1c2goe1xuXHRcdFx0a2V5OiBcImhpZ2hMZXZlbFwiLFxuXHRcdFx0dmFsdWU6IGhpZ2hMZXZlbE5hbWUsXG5cdFx0fSwge1xuXHRcdFx0a2V5OiBcImhpZ2hTY29yZVwiLFxuXHRcdFx0dmFsdWU6IGhpZ2hTY29yZSArICcnLFxuXHRcdH0pXG5cdFx0d3guc2V0VXNlckNsb3VkU3RvcmFnZSh7XG5cdFx0XHRcIktWRGF0YUxpc3RcIjoga3ZEYXRhTGlzdCxcblx0XHRcdHN1Y2Nlc3M6ICgpID0+IHtcblx0XHRcdFx0Ly8gIHNlbGYuc2hvd1JhbmsoKVxuXHRcdFx0fSxcblx0XHRcdGZhaWw6IChyZXMpID0+IHtcblx0XHRcdFx0Ly8gICBjb25zb2xlLmxvZyhyZXMpXG5cdFx0XHR9XG5cdFx0fSlcblx0fSxcblx0c2hvd1JhbmsoKSB7XG5cdFx0d3gucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0bWVzc2FnZTogJ1Nob3cnXG5cdFx0fSlcblx0XHR0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSB0cnVlXG5cdFx0dGhpcy5faXNTaG93ID0gdHJ1ZVxuXHR9LFxuXHQvLyBzd2l0Y2hSYW5rVHlwZSgpIHtcblx0Ly8gICB3eC5wb3N0TWVzc2FnZSh7XG5cdC8vICAgICBtZXNzYWdlOiAnc3dpdGNoUmFuaydcblx0Ly8gICB9KVxuXHQvLyAgIHRoaXMuX2lzU2hvdyA9IHRydWVcblx0Ly8gfSxcblx0Y2xvc2VSYW5rKCkge1xuXHRcdHRoaXMuZGlzcGxheS5ub2RlLmFjdGl2ZSA9IGZhbHNlXG5cdFx0d3gucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0bWVzc2FnZTogJ0hpZGUnXG5cdFx0fSlcblx0XHR0aGlzLl9pc1Nob3cgPSBmYWxzZVxuXHR9LFxuXHRzaG93R3JvdXBSYW5rKCkge1xuXHRcdHd4LnBvc3RNZXNzYWdlKHtcblx0XHRcdG1lc3NhZ2U6ICdTaG93J1xuXHRcdH0pXG5cdFx0dGhpcy5ncm91cERpc3BsYXkubm9kZS5hY3RpdmUgPSB0cnVlXG5cdFx0dGhpcy5faXNTaG93ID0gdHJ1ZVxuXHR9LFxuXHQvLyBzd2l0Y2hSYW5rVHlwZSgpIHtcblx0Ly8gICB3eC5wb3N0TWVzc2FnZSh7XG5cdC8vICAgICBtZXNzYWdlOiAnc3dpdGNoUmFuaydcblx0Ly8gICB9KVxuXHQvLyAgIHRoaXMuX2lzU2hvdyA9IHRydWVcblx0Ly8gfSxcblx0Y2xvc2VHcm91cFJhbmsoKSB7XG5cdFx0dGhpcy5ncm91cERpc3BsYXkubm9kZS5hY3RpdmUgPSBmYWxzZVxuXHRcdHd4LnBvc3RNZXNzYWdlKHtcblx0XHRcdG1lc3NhZ2U6ICdIaWRlJ1xuXHRcdH0pXG5cdFx0dGhpcy5faXNTaG93ID0gZmFsc2Vcblx0fSxcblx0Y3JlYXRlSW1hZ2Uoc3ByaXRlLCB1cmwpIHtcblx0XHRsZXQgaW1hZ2UgPSB3eC5jcmVhdGVJbWFnZSgpO1xuXHRcdGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGxldCB0ZXh0dXJlID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuXHRcdFx0dGV4dHVyZS5pbml0V2l0aEVsZW1lbnQoaW1hZ2UpO1xuXHRcdFx0dGV4dHVyZS5oYW5kbGVMb2FkZWRUZXh0dXJlKCk7XG5cdFx0XHRzcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XG5cdFx0fTtcblx0XHRpbWFnZS5zcmMgPSB1cmw7XG5cdH0sXG5cdHVwZGF0ZSgpIHtcblx0XHRpZiAodGhpcy5faXNTaG93KSB7XG5cdFx0XHRpZiAodGhpcy5kaXNwbGF5Lm5vZGUuYWN0aXZlKSB7XG5cdFx0XHRcdHRoaXMuZGlzcGxheS5ub2RlLmdldENvbXBvbmVudChjYy5XWFN1YkNvbnRleHRWaWV3KS51cGRhdGUoKVxuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuZ3JvdXBEaXNwbGF5Lm5vZGUuYWN0aXZlKSB7XG5cdFx0XHRcdHRoaXMuZ3JvdXBEaXNwbGF5Lm5vZGUuZ2V0Q29tcG9uZW50KGNjLldYU3ViQ29udGV4dFZpZXcpLnVwZGF0ZSgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHQvLyDmjqfliLbmiZPlvIDlub/lkYpcblx0b25SZXZpdmVCdXR0b24odHlwZSkge1xuXHRcdC8vIOW5v+WRiuS9jVxuXHRcdGxldCBzZWxmID0gdGhpc1xuXHRcdHRoaXMuYWRUeXBlID0gdHlwZSAvLzDooajnpLrliqDlgI0gMeihqOekuuWkjea0uyAy6KGo56S654K45by5XG5cdFx0aWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKXtcblx0XHRcdGlmICh0aGlzLmF1ZGlvQWQpIHtcblx0XHRcdFx0dGhpcy5hdWRpb0FkLnNob3coKS5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdFx0Ly8g5aSx6LSl6YeN6K+VXG5cdFx0XHRcdFx0dGhpcy5hdWRpb0FkLmxvYWQoKVxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4gdGhpcy5hdWRpb0FkLnNob3coKSlcblx0XHRcdFx0XHRcdC5jYXRjaChlcnIgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuaYvuekuuWksei0pScsIGVyci5lcnJNc2cpXG5cdFx0XHRcdFx0XHRcdGlmIChzZWxmLmFkVHlwZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5fY29udHJvbGxlci5nYW1lLm9uU2tpcFJldml2ZSgpXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoc2VsZi5hZFR5cGUgPT0gMikge1xuXHRcdFx0XHRcdFx0XHRcdHNlbGYuX2NvbnRyb2xsZXIuc2NvcmVNZ3Iub25MZXZlbFVwQnV0dG9uKClcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRzZWxmLm9uSXRlbVNoYXJlU3VjY2VzcygpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dGhpcy5hdWRpb0FkID0gd3guY3JlYXRlUmV3YXJkZWRWaWRlb0FkKHtcblx0XHRcdFx0YWRVbml0SWQ6ICcyMzAwMDExNzgxXzAxJ1xuXHRcdFx0fSlcblx0XHRcdHRoaXMuYXVkaW9BZC5zaG93KCkuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHQvLyDlpLHotKXph43or5Vcblx0XHRcdFx0dGhpcy5hdWRpb0FkLmxvYWQoKVxuXHRcdFx0XHRcdC50aGVuKCgpID0+IHRoaXMuYXVkaW9BZC5zaG93KCkpXG5cdFx0XHRcdFx0LmNhdGNoKGVyciA9PiB7XG5cdFx0XHRcdFx0XHRzZWxmLmZha2VTaGFyZSgpXG5cdFx0XHRcdFx0fSlcblx0XHRcdH0pXG5cdFx0XHR0aGlzLmF1ZGlvQWQub25FcnJvcihlcnIgPT4ge1xuXHRcdFx0XHRzZWxmLmZha2VTaGFyZSgpXG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5hdWRpb0FkLm9uQ2xvc2UoKHJlcykgPT4ge1xuXHRcdFx0XHRpZiAoc2VsZi5hZFR5cGUgPT0gMSkge1xuXHRcdFx0XHRcdGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHNlbGYuX2NvbnRyb2xsZXIuZ2FtZS5zaG93UmV2aXZlU3VjY2VzcygpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuX2NvbnRyb2xsZXIuZ2FtZS5hc2tSZXZpdmUoKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChzZWxmLmFkVHlwZSA9PSAwKSB7XG5cdFx0XHRcdFx0aWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0c2VsZi5fY29udHJvbGxlci5zY29yZU1nci5vbkxldmVsVXBCdXR0b24oMilcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0c2VsZi5vbkl0ZW1TaGFyZVN1Y2Nlc3MoKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9ZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpe1xuXHRcdFx0dGhpcy5fY3JlYXRlVmVkaW9BZChmdW5jdGlvbiAocmVzKXtcblx0XHRcdFx0aWYgKHNlbGYuYWRUeXBlID09IDEpIHtcblx0XHRcdFx0XHRpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9jb250cm9sbGVyLmdhbWUuc2hvd1Jldml2ZVN1Y2Nlc3MoKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxmLl9jb250cm9sbGVyLmdhbWUuYXNrUmV2aXZlKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoc2VsZi5hZFR5cGUgPT0gMCkge1xuXHRcdFx0XHRcdGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHNlbGYuX2NvbnRyb2xsZXIuc2NvcmVNZ3Iub25MZXZlbFVwQnV0dG9uKDIpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHNlbGYub25JdGVtU2hhcmVTdWNjZXNzKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cblx0fSxcblxuXHRfY3JlYXRlVmVkaW9BZCAgKGNhbGxiYWNrKXtcblx0XHRpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpe1xuXHRcdFx0bGV0IHZpZGVvQWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuXHRcdFx0XHRhZFVuaXRJZDogJ2FkdW5pdC03YTk3NThmZDQ1YTVmOWNlJ1xuXHRcdFx0fSk7XG5cdFx0XHR2aWRlb0FkLmxvYWQoKVxuXHRcdFx0XHQudGhlbigoKSA9PiB2aWRlb0FkLnNob3coKSlcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuinhumikeWKoOi9veWksei0pVwiLCBlcnIpO1xuXHRcdFx0XHRcdHd4LnNob3dNb2RhbCh7XG5cdFx0XHRcdFx0XHR0aXRsZTogJ+aPkOekuicsXG5cdFx0XHRcdFx0XHRjb250ZW50OiAn6KeG6aKR5Yqg6L295aSx6LSlJyxcblx0XHRcdFx0XHRcdHNob3dDYW5jZWw6IGZhbHNlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0dmlkZW9BZC5vbkNsb3NlKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdFx0aWYgKCF2aWRlb0FkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyZXMuaXNFbmRlZCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKHJlcyk7XG5cdFx0XHRcdFx0dmlkZW9BZC5vZmZDbG9zZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZpZGVvQWQub2ZmQ2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR2aWRlb0FkLm9uRXJyb3IoZnVuY3Rpb24gKG1zZykge1xuXHRcdFx0XHR3eC5zaG93VG9hc3Qoe1xuXHRcdFx0XHRcdHRpdGxlOiAn6ZSZ6K+vJ1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHRcdH0pO1xuXHRcdH1lbHNlIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSl7XG5cdFx0XHRsZXQgdmlkZW9BZCA9IHR0LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG5cdFx0XHRcdGFkVW5pdElkOiAnNDRsMjJuaWI5NDhwMGM1djYzJ1xuXHRcdFx0fSk7XG5cdFx0XHR2aWRlb0FkLmxvYWQoKVxuXHRcdFx0XHQudGhlbigoKSA9PiB2aWRlb0FkLnNob3coKSlcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuinhumikeWKoOi9veWksei0pVwiLGVycik7XG5cdFx0XHRcdFx0dHQuc2hvd01vZGFsKHtcblx0XHRcdFx0XHRcdHRpdGxlOiAn5o+Q56S6Jyxcblx0XHRcdFx0XHRcdGNvbnRlbnQ6ICfop4bpopHliqDovb3lpLHotKUnLFxuXHRcdFx0XHRcdFx0c2hvd0NhbmNlbDogZmFsc2Vcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR2aWRlb0FkLm9uQ2xvc2UoZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0XHRpZighdmlkZW9BZCl7XG5cdFx0XHRcdFx0cmV0dXJuIDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihyZXMuaXNFbmRlZCl7XG5cdFx0XHRcdFx0Y2FsbGJhY2socmVzKTtcblx0XHRcdFx0XHR2aWRlb0FkLm9mZkNsb3NlKCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5pyq5pKt5pS+5a6M5YWz6ZetXCIpXG5cdFx0XHRcdFx0dmlkZW9BZC5vZmZDbG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHZpZGVvQWQub25FcnJvcihmdW5jdGlvbihtc2cpe1xuXHRcdFx0XHR0dC5zaG93VG9hc3Qoe1xuXHRcdFx0XHRcdHRpdGxlOiAn6ZSZ6K+vJ1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9LFxuXG5cdGZha2VTaGFyZSgpIHtcblx0XHRsZXQgc2VsZiA9IHRoaXNcblx0XHR3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xuXHRcdFx0dGl0bGU6IFwi5oiR5bey57uP546p5YiwXCIgKyB0aGlzLl9jb250cm9sbGVyLnNjb3JlTWdyLnNjb3JlICsgXCLliIbkuobvvIzpgoDor7fkvaDmnaXmjJHmiJhcIixcblx0XHRcdC8vIGltYWdlVXJsSWQ6ICdveEV3R3ZDbFQwdWxkUTQ3MHBNODR3Jyxcblx0XHRcdGltYWdlVXJsOiAnaHR0cHM6Ly9tbW9jZ2FtZS5xcGljLmNuL3dlY2hhdGdhbWUvTHRKWk9qSDZaOWliaWFNbHBxemxkc09mNDZRN1RaaWF5c0kxZndjNE9qMUwzQ2tiQ2FKTUFNb2ljaWJiSHUySFVRa09pYi8wJ1xuXHRcdH0pXG5cdFx0aWYgKHRoaXMuYWRUeXBlKSB7XG5cdFx0XHRzZWxmLl9jb250cm9sbGVyLmdhbWUuc2hvd1Jldml2ZVN1Y2Nlc3MoKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZWxmLl9jb250cm9sbGVyLnNjb3JlTWdyLm9uTGV2ZWxVcEJ1dHRvbigyKVxuXHRcdH1cblx0fSxcblx0b3BlbkJhbm5lckFkdigpIHtcblx0XHQvLyDliJvlu7ogQmFubmVyIOW5v+WRiuWunuS+i++8jOaPkOWJjeWIneWni+WMllxuXHRcdC8vIGxldCBzY3JlZW5XaWR0aCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkuc2NyZWVuV2lkdGhcblx0XHQvLyBsZXQgYmFubmVySGVpZ2h0ID0gc2NyZWVuV2lkdGggLyAzNTAgKiAxMjBcblx0XHQvLyBsZXQgc2NyZWVuSGVpZ2h0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5zY3JlZW5IZWlnaHQgLSAxMDhcblx0XHQvLyBsZXQgYWRVbml0SWRzID0gW1xuXHRcdC8vICAgJ2FkdW5pdC01MTBhNGVjMzkwNjVlZjk2Jyxcblx0XHQvLyAgICdhZHVuaXQtMjliMGZhN2EyZGI4ZThjYicsXG5cdFx0Ly8gICAnYWR1bml0LTQwMjBiYjllYTQzOWU2YTUnXG5cdFx0Ly8gXVxuXHRcdC8vIGlmICh0aGlzLmJhbm5lckFkKSB7XG5cdFx0Ly8gICB0aGlzLmJhbm5lckFkLmRlc3Ryb3koKVxuXHRcdC8vIH1cblx0XHQvLyB0aGlzLmJhbm5lckFkID0gd3guY3JlYXRlQmFubmVyQWQoe1xuXHRcdC8vICAgYWRVbml0SWQ6IGFkVW5pdElkc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKV0sXG5cdFx0Ly8gICBzdHlsZToge1xuXHRcdC8vICAgICBsZWZ0OiAwLFxuXHRcdC8vICAgICB0b3A6IHNjcmVlbkhlaWdodCxcblx0XHQvLyAgICAgd2lkdGg6IDYyMCxcblx0XHQvLyAgIH1cblx0XHQvLyB9KVxuXHRcdC8vIC8vIOWcqOmAguWQiOeahOWcuuaZr+aYvuekuiBCYW5uZXIg5bm/5ZGKXG5cdFx0Ly8gdGhpcy5iYW5uZXJBZC5vbkxvYWQoKCkgPT4ge1xuXHRcdC8vICAgLy8gY29uc29sZS5sb2coJ2Jhbm5lciDlub/lkYrliqDovb3miJDlip8nKVxuXHRcdC8vIH0pXG5cdFx0Ly8gdGhpcy5iYW5uZXJBZC5vbkVycm9yKChlKSA9PiB7XG5cdFx0Ly8gICBjb25zb2xlLmxvZygnYmFubmVyIOW5v+WRiuWKoOi9veWksei0pScsIGUpXG5cdFx0Ly8gfSlcblx0XHQvLyB0aGlzLmJhbm5lckFkLnNob3coKVxuXHRcdC8vICAgLnRoZW4oKVxuXHR9LFxuXHRuYXZUb01pbmlwcm9ncmFtKGV2ZW50LCBjdXN0b20pIHtcblx0XHRjb25zb2xlLmxvZyhjdXN0b20pXG5cdFx0d3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcblx0XHRcdGFwcElkOiBjdXN0b21cblx0XHR9KVxuXHR9LFxuXHRjbG9zZUJhbm5lckFkdigpIHtcblx0XHRpZiAodGhpcy5iYW5uZXJBZCkge1xuXHRcdFx0dGhpcy5iYW5uZXJBZC5oaWRlKClcblx0XHR9XG5cdH1cbn0pOyJdfQ==