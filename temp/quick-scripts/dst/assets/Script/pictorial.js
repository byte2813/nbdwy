
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pictorial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0e40bxKGytLiJwQbi3sCcB6', 'pictorial');
// Script/pictorial.js

"use strict";

/**
 * @author uu
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    container: cc.Node,
    avatar: cc.Node,
    prefab: cc.Prefab
  },
  init: function init(c) {
    this._controller = c;

    if (c.social.node.active) {
      var highLevel = c.social.getHighestLevel();

      if (highLevel) {
        this.showAvatar(highLevel);
        this.loadContainer(+highLevel);
      } else {
        this.avatar.active = false;
        this.loadContainer(1);
      }
    } else {
      this.avatar.active = false;
    }
  },
  showAvatar: function showAvatar(level) {
    var _this = this;

    this.avatar.active = true;
    var data = this._controller.gameData.json.levelData[+level - 1];

    var heightScore = this._controller.social.getHighestScore();

    this.avatar.getChildByName('name').getComponent(cc.Label).string = '历史最高:' + data.name;
    this.avatar.getChildByName('score').getComponent(cc.Label).string = '分数' + heightScore;
    setTimeout(function () {
      _this._controller.scoreMgr.characterMgr.showCharacter(+level, _this.avatar.getChildByName('db'), false);
    }, 1000);
  },
  loadContainer: function loadContainer(level) {
    var _this2 = this;

    var data = this._controller.gameData.json.levelData;
    this.clearContainer();
    setTimeout(function () {
      for (var i = 0; i < data.length; i++) {
        var card = cc.instantiate(_this2.prefab);
        card.parent = _this2.container;

        _this2.initCard(card, data[i], i, level);
      }
    }, 1000);
  },
  clearContainer: function clearContainer() {
    this.container.children.map(function (item) {
      item.destroy();
    });
  },
  initCard: function initCard(card, info, level, selfLevel) {
    if (level < selfLevel) {
      card.getChildByName('name').getComponent(cc.Label).string = info.name; //card.getChildByName('score').getComponent(cc.Label).string = "得分:" + info.score

      card.getChildByName('db').color = cc.Color.WHITE;
      card.getChildByName('giftStep').getComponent(cc.Label).string = "开局奖励" + info.giftStep + "步";
    } else {
      card.getChildByName('name').getComponent(cc.Label).string = '???';
      card.getChildByName('giftStep').getComponent(cc.Label).string = "开局奖励???步";
      card.getChildByName('db').color = cc.Color.BLACK;
    }

    this._controller.scoreMgr.characterMgr.showCharacter(level + 1, card.getChildByName('db'), 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwaWN0b3JpYWwuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjb250YWluZXIiLCJOb2RlIiwiYXZhdGFyIiwicHJlZmFiIiwiUHJlZmFiIiwiaW5pdCIsImMiLCJfY29udHJvbGxlciIsInNvY2lhbCIsIm5vZGUiLCJhY3RpdmUiLCJoaWdoTGV2ZWwiLCJnZXRIaWdoZXN0TGV2ZWwiLCJzaG93QXZhdGFyIiwibG9hZENvbnRhaW5lciIsImxldmVsIiwiZGF0YSIsImdhbWVEYXRhIiwianNvbiIsImxldmVsRGF0YSIsImhlaWdodFNjb3JlIiwiZ2V0SGlnaGVzdFNjb3JlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsIm5hbWUiLCJzZXRUaW1lb3V0Iiwic2NvcmVNZ3IiLCJjaGFyYWN0ZXJNZ3IiLCJzaG93Q2hhcmFjdGVyIiwiY2xlYXJDb250YWluZXIiLCJpIiwibGVuZ3RoIiwiY2FyZCIsImluc3RhbnRpYXRlIiwicGFyZW50IiwiaW5pdENhcmQiLCJjaGlsZHJlbiIsIm1hcCIsIml0ZW0iLCJkZXN0cm95IiwiaW5mbyIsInNlbGZMZXZlbCIsImNvbG9yIiwiQ29sb3IiLCJXSElURSIsImdpZnRTdGVwIiwiQkxBQ0siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBRVBDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssSUFESjtBQUVWQyxJQUFBQSxNQUFNLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGRDtBQUdWRSxJQUFBQSxNQUFNLEVBQUVQLEVBQUUsQ0FBQ1E7QUFIRCxHQUZMO0FBT1BDLEVBQUFBLElBUE8sZ0JBT0ZDLENBUEUsRUFPQztBQUNOLFNBQUtD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dGVudCI6WyIvKipcbiAqIEBhdXRob3IgdXVcbiAqL1xuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gIHByb3BlcnRpZXM6IHtcbiAgICBjb250YWluZXI6IGNjLk5vZGUsXG4gICAgYXZhdGFyOiBjYy5Ob2RlLFxuICAgIHByZWZhYjogY2MuUHJlZmFiLFxuICB9LFxuICBpbml0KGMpIHtcbiAgICB0aGlzLl9jb250cm9sbGVyID0gY1xuXG4gICAgaWYgKGMuc29jaWFsLm5vZGUuYWN0aXZlKSB7XG4gICAgICBsZXQgaGlnaExldmVsID0gYy5zb2NpYWwuZ2V0SGlnaGVzdExldmVsKClcbiAgICAgIGlmIChoaWdoTGV2ZWwpIHtcbiAgICAgICAgdGhpcy5zaG93QXZhdGFyKGhpZ2hMZXZlbClcbiAgICAgICAgdGhpcy5sb2FkQ29udGFpbmVyKCtoaWdoTGV2ZWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF2YXRhci5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLmxvYWRDb250YWluZXIoMSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmF0YXIuYWN0aXZlID0gZmFsc2VcbiAgICB9XG4gIH0sXG4gIHNob3dBdmF0YXIobGV2ZWwpIHtcbiAgICB0aGlzLmF2YXRhci5hY3RpdmUgPSB0cnVlXG4gICAgbGV0IGRhdGEgPSB0aGlzLl9jb250cm9sbGVyLmdhbWVEYXRhLmpzb24ubGV2ZWxEYXRhWytsZXZlbCAtIDFdXG4gICAgbGV0IGhlaWdodFNjb3JlID0gdGhpcy5fY29udHJvbGxlci5zb2NpYWwuZ2V0SGlnaGVzdFNjb3JlKClcbiAgICB0aGlzLmF2YXRhci5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ+WOhuWPsuacgOmrmDonICsgZGF0YS5uYW1lXG4gICAgdGhpcy5hdmF0YXIuZ2V0Q2hpbGRCeU5hbWUoJ3Njb3JlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAn5YiG5pWwJyArIGhlaWdodFNjb3JlXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9jb250cm9sbGVyLnNjb3JlTWdyLmNoYXJhY3Rlck1nci5zaG93Q2hhcmFjdGVyKCtsZXZlbCwgdGhpcy5hdmF0YXIuZ2V0Q2hpbGRCeU5hbWUoJ2RiJyksIGZhbHNlKVxuICAgIH0sIDEwMDApXG4gIH0sXG4gIGxvYWRDb250YWluZXIobGV2ZWwpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuX2NvbnRyb2xsZXIuZ2FtZURhdGEuanNvbi5sZXZlbERhdGFcbiAgICB0aGlzLmNsZWFyQ29udGFpbmVyKClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgY2FyZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKVxuICAgICAgICBjYXJkLnBhcmVudCA9IHRoaXMuY29udGFpbmVyXG4gICAgICAgIHRoaXMuaW5pdENhcmQoY2FyZCwgZGF0YVtpXSwgaSwgbGV2ZWwpXG4gICAgICB9XG4gICAgfSwgMTAwMClcbiAgfSxcbiAgY2xlYXJDb250YWluZXIoKSB7XG4gICAgdGhpcy5jb250YWluZXIuY2hpbGRyZW4ubWFwKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5kZXN0cm95KClcbiAgICB9KVxuICB9LFxuICBpbml0Q2FyZChjYXJkLCBpbmZvLCBsZXZlbCwgc2VsZkxldmVsKSB7XG4gICAgaWYgKGxldmVsIDwgc2VsZkxldmVsKSB7XG4gICAgICBjYXJkLmdldENoaWxkQnlOYW1lKCduYW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvLm5hbWVcbiAgICAgIC8vY2FyZC5nZXRDaGlsZEJ5TmFtZSgnc2NvcmUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5b6X5YiGOlwiICsgaW5mby5zY29yZVxuICAgICAgY2FyZC5nZXRDaGlsZEJ5TmFtZSgnZGInKS5jb2xvciA9IGNjLkNvbG9yLldISVRFXG4gICAgICBjYXJkLmdldENoaWxkQnlOYW1lKCdnaWZ0U3RlcCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlvIDlsYDlpZblirFcIiArIGluZm8uZ2lmdFN0ZXAgKyBcIuatpVwiXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcmQuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICc/Pz8nXG4gICAgICBjYXJkLmdldENoaWxkQnlOYW1lKCdnaWZ0U3RlcCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLlvIDlsYDlpZblirE/Pz/mraVcIlxuICAgICAgY2FyZC5nZXRDaGlsZEJ5TmFtZSgnZGInKS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLXG4gICAgfVxuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2NvcmVNZ3IuY2hhcmFjdGVyTWdyLnNob3dDaGFyYWN0ZXIobGV2ZWwgKyAxLCBjYXJkLmdldENoaWxkQnlOYW1lKCdkYicpLCAwKVxuICB9XG59KTsiXX0=