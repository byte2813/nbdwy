
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'feefcb/VXtFp4L+Zqa6CrBZ', 'controller');
// Script/controller.js

"use strict";

/**
 * @author uu
 * @file 主控制器
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    musicMgr: require('musicMgr'),
    //音乐控制组件
    game: require('game'),
    //主游戏控制器
    pageMgr: require('pageMgr'),
    //页面控制器
    social: require('social'),
    //排行榜、广告控制器
    config: cc.JsonAsset,
    gameData: cc.JsonAsset,
    scoreMgr: require('score'),
    //分数 特效控制
    totalRank: cc.Node,
    groupRank: cc.Node,
    startPage: require('startPage'),
    navNode: cc.Node,
    pictorial: cc.Node,
    helpPage: cc.Node,
    cbl: cc.Node
  },
  start: function start() {
    this.totalRank.active = false;
    this.pictorial.active = false;
    this.cbl.active = false;
    this.game.init(this);

    if (cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
      this.social.init(this);
    }

    this.musicMgr.init();
    this.lateStart();
  },
  lateStart: function lateStart() {
    if (this.social.node.active) {
      this.social.closeBannerAdv();
    }

    this.game._status = 0;
    this.pictorial.getComponent('pictorial').init(this);
    this.startPage.bannerNode.scale = 1;
    this.pageMgr.onOpenPage(0);
  },
  onGameStartButton: function onGameStartButton() {
    var _this = this;

    // TODO:  增加一个动画
    if (this.social.node.active) {
      this.social.openBannerAdv();
    }

    this.startPage.showAnimation().then(function () {
      _this.gameStart();
    });
  },
  gameStart: function gameStart() {
    this.pageMgr.onOpenPage(1);
    this.game.gameStart();
  },
  closeRank: function closeRank() {
    this.totalRank.active = false;
    this.navNode.active = true;

    if (this.social.node.active) {
      this.social.closeRank();
    }
  },
  openRank: function openRank() {
    this.totalRank.active = true;
    this.navNode.active = false;

    if (this.social.node.active) {
      this.social.showRank();
    }
  },
  openGroupRank: function openGroupRank() {
    this.groupRank.active = true;

    if (this.social.node.active) {
      this.social.showGroupRank();
      this.pageMgr.addPage(6);
    }
  },
  closeGroupRank: function closeGroupRank() {
    this.groupRank.active = false;
    this.navNode.active = true;

    if (this.social.node.active) {
      this.social.closeGroupRank();
      this.pageMgr.removePage(6);
    }
  },
  openPictorial: function openPictorial() {
    this.pictorial.active = true;
  },
  closePictorial: function closePictorial() {
    this.pictorial.active = false;
  },
  openCbl: function openCbl() {
    this.cbl.active = true;
  },
  closeCbl: function closeCbl() {
    this.cbl.active = false;
  },
  openHelpPage: function openHelpPage() {
    this.pageMgr.addPage(2);
    this.helpPage.active = true;
  },
  closeHelpPage: function closeHelpPage() {
    this.pageMgr.removePage(2);
    this.helpPage.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibXVzaWNNZ3IiLCJyZXF1aXJlIiwiZ2FtZSIsInBhZ2VNZ3IiLCJzb2NpYWwiLCJjb25maWciLCJKc29uQXNzZXQiLCJnYW1lRGF0YSIsInNjb3JlTWdyIiwidG90YWxSYW5rIiwiTm9kZSIsImdyb3VwUmFuayIsInN0YXJ0UGFnZSIsIm5hdk5vZGUiLCJwaWN0b3JpYWwiLCJoZWxwUGFnZSIsImNibCIsInN0YXJ0IiwiYWN0aXZlIiwiaW5pdCIsInN5cyIsInBsYXRmb3JtIiwiV0VDSEFUX0dBTUUiLCJCWVRFREFOQ0VfR0FNRSIsImxhdGVTdGFydCIsIm5vZGUiLCJjbG9zZUJhbm5lckFkdiIsIl9zdGF0dXMiLCJnZXRDb21wb25lbnQiLCJiYW5uZXJOb2RlIiwic2NhbGUiLCJvbk9wZW5QYWdlIiwib25HYW1lU3RhcnRCdXR0b24iLCJvcGVuQmFubmVyQWR2Iiwic2hvd0FuaW1hdGlvbiIsInRoZW4iLCJnYW1lU3RhcnQiLCJjbG9zZVJhbmsiLCJvcGVuUmFuayIsInNob3dSYW5rIiwib3Blbkdyb3VwUmFuayIsInNob3dHcm91cFJhbmsiLCJhZGRQYWdlIiwiY2xvc2VHcm91cFJhbmsiLCJyZW1vdmVQYWdlIiwib3BlblBpY3RvcmlhbCIsImNsb3NlUGljdG9yaWFsIiwib3BlbkNibCIsImNsb3NlQ2JsIiwib3BlbkhlbHBQYWdlIiwiY2xvc2VIZWxwUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNQLGFBQVNELEVBQUUsQ0FBQ0UsU0FETDtBQUVQQyxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsUUFBUSxFQUFFQyxPQUFPLENBQUMsVUFBRCxDQURQO0FBQ3FCO0FBQy9CQyxJQUFBQSxJQUFJLEVB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QUFTRSxNQUFULEdBQWtCLElBQWxCO0FBQ0QsR0F4Rk07QUF5RlA4QixFQUFBQSxRQXpGTyxzQkF5Rkc7QUFDUixTQUFLaEMsR0FBTCxDQUFTRSxNQUFULEdBQWtCLEtBQWxCO0FBQ0QsR0EzRk07QUE0RlArQixFQUFBQSxZQTVGTywwQkE0RlE7QUFDZixTQUFLOUMsT0FBTCxDQUFhdUMsT0FBYixDQUFxQixDQUFyQjtBQUNFLFNBQUszQixRQUFMLENBQWNHLE1BQWQsR0FBdUIsSUFBdkI7QUFDRCxHQS9GTTtBQWdHUGdDLEVBQUFBLGFBaEdPLDJCQWdHUztBQUNoQixTQUFLL0MsT0FBTCxDQUFheUMsVUFBYixDQUF3QixDQUF4QjtBQUNFLFNBQUs3QixRQUFMLENBQWNHLE1BQWQsR0FBdUIsS0FBdkI7QUFDRDtBQW5HTSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBhdXRob3IgdXVcbiAqIEBmaWxlIOS4u+aOp+WItuWZqFxuICovXG5cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgbXVzaWNNZ3I6IHJlcXVpcmUoJ211c2ljTWdyJyksIC8v6Z+z5LmQ5o6n5Yi257uE5Lu2XG4gICAgZ2FtZTogcmVxdWlyZSgnZ2FtZScpLCAvL+S4u+a4uOaIj+aOp+WItuWZqFxuICAgIHBhZ2VNZ3I6IHJlcXVpcmUoJ3BhZ2VNZ3InKSwgLy/pobXpnaLmjqfliLblmahcbiAgICBzb2NpYWw6IHJlcXVpcmUoJ3NvY2lhbCcpLCAvL+aOkuihjOamnOOAgeW5v+WRiuaOp+WItuWZqFxuICAgIGNvbmZpZzogY2MuSnNvbkFzc2V0LFxuICAgIGdhbWVEYXRhOiBjYy5Kc29uQXNzZXQsXG4gICAgc2NvcmVNZ3I6IHJlcXVpcmUoJ3Njb3JlJyksIC8v5YiG5pWwIOeJueaViOaOp+WItlxuICAgIHRvdGFsUmFuazogY2MuTm9kZSxcbiAgICBncm91cFJhbms6IGNjLk5vZGUsXG4gICAgc3RhcnRQYWdlOiByZXF1aXJlKCdzdGFydFBhZ2UnKSxcbiAgICBuYXZOb2RlOiBjYy5Ob2RlLFxuICAgIHBpY3RvcmlhbDogY2MuTm9kZSxcbiAgICBoZWxwUGFnZTogY2MuTm9kZSxcbiAgICBjYmw6IGNjLk5vZGUsXG4gIH0sXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMudG90YWxSYW5rLmFjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy5waWN0b3JpYWwuYWN0aXZlID0gZmFsc2VcbiAgICB0aGlzLmNibC5hY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMuZ2FtZS5pbml0KHRoaXMpXG4gICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FIHx8IGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKSB7XG4gICAgICB0aGlzLnNvY2lhbC5pbml0KHRoaXMpXG4gICAgfVxuICAgIHRoaXMubXVzaWNNZ3IuaW5pdCgpXG4gICAgdGhpcy5sYXRlU3RhcnQoKVxuICB9LFxuICBsYXRlU3RhcnQoKSB7XG4gICAgaWYgKHRoaXMuc29jaWFsLm5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNvY2lhbC5jbG9zZUJhbm5lckFkdigpXG5cdFx0fVxuXHRcdHRoaXMuZ2FtZS5fc3RhdHVzPTBcbiAgICB0aGlzLnBpY3RvcmlhbC5nZXRDb21wb25lbnQoJ3BpY3RvcmlhbCcpLmluaXQodGhpcylcbiAgICB0aGlzLnN0YXJ0UGFnZS5iYW5uZXJOb2RlLnNjYWxlID0gMVxuICAgIHRoaXMucGFnZU1nci5vbk9wZW5QYWdlKDApXG4gIH0sXG4gIG9uR2FtZVN0YXJ0QnV0dG9uKCkge1xuICAgIC8vIFRPRE86ICDlop7liqDkuIDkuKrliqjnlLtcbiAgICBpZiAodGhpcy5zb2NpYWwubm9kZS5hY3RpdmUpIHtcbiAgICAgIHRoaXMuc29jaWFsLm9wZW5CYW5uZXJBZHYoKVxuICAgIH1cbiAgICB0aGlzLnN0YXJ0UGFnZS5zaG93QW5pbWF0aW9uKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmdhbWVTdGFydCgpXG4gICAgfSlcbiAgfSxcbiAgZ2FtZVN0YXJ0KCkge1xuICAgIHRoaXMucGFnZU1nci5vbk9wZW5QYWdlKDEpXG4gICAgdGhpcy5nYW1lLmdhbWVTdGFydCgpXG4gIH0sXG4gIGNsb3NlUmFuaygpIHtcbiAgICB0aGlzLnRvdGFsUmFuay5hY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMubmF2Tm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgaWYgKHRoaXMuc29jaWFsLm5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNvY2lhbC5jbG9zZVJhbmsoKVxuICAgIH1cbiAgfSxcbiAgb3BlblJhbmsoKSB7XG4gICAgdGhpcy50b3RhbFJhbmsuYWN0aXZlID0gdHJ1ZVxuICAgIHRoaXMubmF2Tm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgIGlmICh0aGlzLnNvY2lhbC5ub2RlLmFjdGl2ZSkge1xuICAgICAgdGhpcy5zb2NpYWwuc2hvd1JhbmsoKVxuICAgIH1cbiAgfSxcbiAgb3Blbkdyb3VwUmFuaygpIHtcbiAgICB0aGlzLmdyb3VwUmFuay5hY3RpdmUgPSB0cnVlXG4gICAgaWYgKHRoaXMuc29jaWFsLm5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNvY2lhbC5zaG93R3JvdXBSYW5rKClcbiAgICAgIHRoaXMucGFnZU1nci5hZGRQYWdlKDYpXG4gICAgfVxuICB9LFxuICBjbG9zZUdyb3VwUmFuaygpIHtcbiAgICB0aGlzLmdyb3VwUmFuay5hY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMubmF2Tm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgaWYgKHRoaXMuc29jaWFsLm5vZGUuYWN0aXZlKSB7XG4gICAgICB0aGlzLnNvY2lhbC5jbG9zZUdyb3VwUmFuaygpXG4gICAgICB0aGlzLnBhZ2VNZ3IucmVtb3ZlUGFnZSg2KVxuICAgIH1cbiAgfSxcbiAgb3BlblBpY3RvcmlhbCgpIHtcbiAgICB0aGlzLnBpY3RvcmlhbC5hY3RpdmUgPSB0cnVlXG4gIH0sXG4gIGNsb3NlUGljdG9yaWFsKCkge1xuICAgIHRoaXMucGljdG9yaWFsLmFjdGl2ZSA9IGZhbHNlXG4gIH0sXG4gIG9wZW5DYmwoKXtcbiAgICB0aGlzLmNibC5hY3RpdmUgPSB0cnVlXG4gIH0sXG4gIGNsb3NlQ2JsKCl7XG4gICAgdGhpcy5jYmwuYWN0aXZlID0gZmFsc2VcbiAgfSxcbiAgb3BlbkhlbHBQYWdlKCkge1xuXHRcdHRoaXMucGFnZU1nci5hZGRQYWdlKDIpXG4gICAgdGhpcy5oZWxwUGFnZS5hY3RpdmUgPSB0cnVlXG4gIH0sXG4gIGNsb3NlSGVscFBhZ2UoKSB7XG5cdFx0dGhpcy5wYWdlTWdyLnJlbW92ZVBhZ2UoMilcbiAgICB0aGlzLmhlbHBQYWdlLmFjdGl2ZSA9IGZhbHNlXG4gIH1cbn0pOyJdfQ==