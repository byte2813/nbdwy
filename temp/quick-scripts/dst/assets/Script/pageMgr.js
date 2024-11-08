
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pageMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1bb7xaDvtHXLTuIo0MRIEu', 'pageMgr');
// Script/pageMgr.js

"use strict";

/**
 * @author uu
 * @file  通用页面控制器和适配
 */
var AC = require('action');

cc.Class({
  "extends": cc.Component,
  properties: {
    status: 0,
    //页面状态
    pages: [cc.Node]
  },
  // 0 开始游戏页面
  // 1 游戏页面
  // 2 UI页面
  // 3 过关页面
  // 4 失败页面
  // 5 复活页面
  // 6 排行榜页面
  start: function start() {
    this.lateStart();
  },
  lateStart: function lateStart() {
    this.width = cc.director.getWinSizeInPixels().width;
    window.width = this.width;
    this.height = cc.director.getWinSizeInPixels().height;
    window.height = this.height; // 存为全局变量

    this.adoptCanvas();
  },
  // 适配解决方案
  adoptCanvas: function adoptCanvas() {
    var canvas = cc.director.getScene().getChildByName('Canvas').getComponent(cc.Canvas); // 设计分辨率比

    var rateR = canvas.designResolution.height / canvas.designResolution.width; // 显示分辨率比

    var rateV = this.height / this.width;

    if (rateV > rateR) {
      canvas.fitHeight = false;
      canvas.fitWidth = true;
    } else {
      canvas.fitHeight = true;
      canvas.fitWidth = false;
    }
  },
  onOpenPage: function onOpenPage(num, callFun) {
    this.closeAllPages();
    this.pages[num].active = true; // if (callFun) {
    //   this.callFun();
    // }
  },
  addPage: function addPage(num, callFun) {
    this.pages[num].scale = 0.5;
    this.pages[num].active = true;
    this.pages[num].runAction(AC.popOut(0.5)); // if (callFun) {
    //   this.callFun();
    // }
  },
  openPageTarget: function openPageTarget(target) {
    target.scale = 0.5;
    target.active = true;
    target.runAction(AC.popOut(0.5));
  },
  removePage: function removePage(num, callFun) {
    var _this = this;

    this.pages[num].runAction(cc.sequence(AC.popIn(0.5), cc.callFunc(function () {
      _this.pages[num].active = false;
    }, this))); // if (callFun) {
    //   this.callFun();
    // }
  },
  onButtonOpenPage: function onButtonOpenPage(event, cust) {
    this.onOpenPage(cust);
  },
  onButtonAddPage: function onButtonAddPage(event, cust) {
    this.addPage(cust);
  },
  onButtonRemovePage: function onButtonRemovePage(event, cust) {
    this.removePage(cust);
  },
  closeAllPages: function closeAllPages() {
    this.pages.forEach(function (element) {
      element.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwYWdlTWdyLmpzIl0sIm5hbWVzIjpbIkFDIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhdHVzIiwicGFnZXMiLCJOb2RlIiwic3RhcnQiLCJsYXRlU3RhcnQiLCJ3aWR0aCIsImRpcmVjdG9yIiwiZ2V0V2luU2l6ZUluUGl4ZWxzIiwid2luZG93IiwiaGVpZ2h0IiwiYWRvcHRDYW52YXMiLCJjYW52YXMiLCJnZXRTY2VuZSIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiQ2FudmFzIiwicmF0ZVIiLCJkZXNpZ25SZXNvbHV0aW9uIiwicmF0ZVYiLCJmaXRIZWlnaHQiLCJmaXRXaWR0aCIsIm9uT3BlblBhZ2UiLCJudW0iLCJjYWxsRnVuIiwiY2xvc2VBbGxQYWdlcyIsImFjdGl2ZSIsImFkZFBhZ2UiLCJzY2FsZSIsInJ1bkFjdGlvbiIsInBvcE91dCIsIm9wZW5QYWdlVGFyZ2V0IiwidGFyZ2V0IiwicmVtb3ZlUGFnZSIsInNlcXVlbmNlIiwicG9wSW4iLCJjYWxsRnVuYyIsIm9uQnV0dG9uT3BlblBhZ2UiLCJldmVudCIsImN1c3QiLCJvbkJ1dHRvbkFkZFBhZ2UiLCJvbkJ1dHRvblJlbW92ZVBhZ2UiLCJmb3JFYWNoIiwiZWxlbWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBaEI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1IsYUFBU0QsRUFBRSxDQUFDRSxTQURKO0FBRVJDLEVBQUFBLFVBQVUsRUFBRTtBQUNYQyxJQUFBQSxNQUFNLEVBQUUsQ0FERztBQUNBO0FBQ1hDLElBQUFBLEtBQUssRUFBRSxDQUFDTCxFQUFFLENBQUNNLElBQUo7QUFGSSxHQUZKO0FBTVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFF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QixDQUl4QjtBQUNBO0FBQ0E7QUFDQSxHQXBFTztBQXFFUlcsRUFBQUEsZ0JBckVRLDRCQXFFU0MsS0FyRVQsRUFxRWdCQyxJQXJFaEIsRUFxRXNCO0FBQzdCLFNBQUtqQixVQUFMLENBQWdCaUIsSUFBaEI7QUFDQSxHQXZFTztBQXdFUkMsRUFBQUEsZUF4RVEsMkJBd0VRRixLQXhFUixFQXdFZUMsSUF4RWYsRUF3RXFCO0FBQzVCLFNBQUtaLE9BQUwsQ0FBYVksSUFBYjtBQUNBLEdBMUVPO0FBMkVSRSxFQUFBQSxrQkEzRVEsOEJBMkVXSCxLQTNFWCxFQTJFa0JDLElBM0VsQixFQTJFd0I7QUFDL0IsU0FBS04sVUFBTCxDQUFnQk0sSUFBaEI7QUFDQSxHQTdFTztBQThFUmQsRUFBQUEsYUE5RVEsMkJBOEVRO0FBQ2YsU0FBS3ZCLEtBQUwsQ0FBV3dDLE9BQVgsQ0FBbUIsVUFBQUMsT0FBTyxFQUFJO0FBQzdCQSxNQUFBQSxPQUFPLENBQUNqQixNQUFSLEdBQWlCLEtBQWpCO0FBQ0EsS0FGRDtBQUdBO0FBbEZPLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciB1dVxuICogQGZpbGUgIOmAmueUqOmhtemdouaOp+WItuWZqOWSjOmAgumFjVxuICovXG52YXIgQUMgPSByZXF1aXJlKCdhY3Rpb24nKVxuY2MuQ2xhc3Moe1xuXHRleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cdHByb3BlcnRpZXM6IHtcblx0XHRzdGF0dXM6IDAsIC8v6aG16Z2i54q25oCBXG5cdFx0cGFnZXM6IFtjYy5Ob2RlXSxcblx0fSxcblx0Ly8gMCDlvIDlp4vmuLjmiI/pobXpnaJcblx0Ly8gMSDmuLjmiI/pobXpnaJcblx0Ly8gMiBVSemhtemdolxuXHQvLyAzIOi/h+WFs+mhtemdolxuXHQvLyA0IOWksei0pemhtemdolxuXHQvLyA1IOWkjea0u+mhtemdolxuXHQvLyA2IOaOkuihjOamnOmhtemdolxuXG5cdHN0YXJ0KCkge1xuXHRcdHRoaXMubGF0ZVN0YXJ0KClcblx0fSxcblx0bGF0ZVN0YXJ0KCkge1xuXHRcdHRoaXMud2lkdGggPSBjYy5kaXJlY3Rvci5nZXRXaW5TaXplSW5QaXhlbHMoKS53aWR0aFxuXHRcdHdpbmRvdy53aWR0aCA9IHRoaXMud2lkdGhcblx0XHR0aGlzLmhlaWdodCA9IGNjLmRpcmVjdG9yLmdldFdpblNpemVJblBpeGVscygpLmhlaWdodFxuXHRcdHdpbmRvdy5oZWlnaHQgPSB0aGlzLmhlaWdodFxuXHRcdC8vIOWtmOS4uuWFqOWxgOWPmOmHj1xuXHRcdHRoaXMuYWRvcHRDYW52YXMoKVxuXHR9LFxuXHQvLyDpgILphY3op6PlhrPmlrnmoYhcblx0YWRvcHRDYW52YXMoKSB7XG5cdFx0bGV0IGNhbnZhcyA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLmdldENvbXBvbmVudChjYy5DYW52YXMpXG5cdFx0Ly8g6K6+6K6h5YiG6L6o546H5q+UXG5cdFx0bGV0IHJhdGVSID0gY2FudmFzLmRlc2lnblJlc29sdXRpb24uaGVpZ2h0IC8gY2FudmFzLmRlc2lnblJlc29sdXRpb24ud2lkdGg7XG5cdFx0Ly8g5pi+56S65YiG6L6o546H5q+UXG5cdFx0bGV0IHJhdGVWID0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xuXHRcdGlmIChyYXRlViA+IHJhdGVSKSB7XG5cdFx0XHRjYW52YXMuZml0SGVpZ2h0ID0gZmFsc2U7XG5cdFx0XHRjYW52YXMuZml0V2lkdGggPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYW52YXMuZml0SGVpZ2h0ID0gdHJ1ZTtcblx0XHRcdGNhbnZhcy5maXRXaWR0aCA9IGZhbHNlO1xuXHRcdH1cblx0fSxcblxuXHRvbk9wZW5QYWdlKG51bSwgY2FsbEZ1bikge1xuXHRcdHRoaXMuY2xvc2VBbGxQYWdlcygpXG5cdFx0dGhpcy5wYWdlc1tudW1dLmFjdGl2ZSA9IHRydWVcblx0XHQvLyBpZiAoY2FsbEZ1bikge1xuXHRcdC8vICAgdGhpcy5jYWxsRnVuKCk7XG5cdFx0Ly8gfVxuXHR9LFxuXHRhZGRQYWdlKG51bSwgY2FsbEZ1bikge1xuXHRcdHRoaXMucGFnZXNbbnVtXS5zY2FsZSA9IDAuNVxuXHRcdHRoaXMucGFnZXNbbnVtXS5hY3RpdmUgPSB0cnVlXG5cdFx0dGhpcy5wYWdlc1tudW1dLnJ1bkFjdGlvbihBQy5wb3BPdXQoMC41KSlcblx0XHQvLyBpZiAoY2FsbEZ1bikge1xuXHRcdC8vICAgdGhpcy5jYWxsRnVuKCk7XG5cdFx0Ly8gfVxuXHR9LFxuXHRvcGVuUGFnZVRhcmdldCh0YXJnZXQpIHtcblx0XHR0YXJnZXQuc2NhbGUgPSAwLjVcblx0XHR0YXJnZXQuYWN0aXZlID0gdHJ1ZVxuXHRcdHRhcmdldC5ydW5BY3Rpb24oQUMucG9wT3V0KDAuNSkpXG5cdH0sXG5cdHJlbW92ZVBhZ2UobnVtLCBjYWxsRnVuKSB7XG5cdFx0dGhpcy5wYWdlc1tudW1dLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShBQy5wb3BJbigwLjUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG5cdFx0XHR0aGlzLnBhZ2VzW251bV0uYWN0aXZlID0gZmFsc2Vcblx0XHR9LCB0aGlzKSkpXG5cdFx0Ly8gaWYgKGNhbGxGdW4pIHtcblx0XHQvLyAgIHRoaXMuY2FsbEZ1bigpO1xuXHRcdC8vIH1cblx0fSxcblx0b25CdXR0b25PcGVuUGFnZShldmVudCwgY3VzdCkge1xuXHRcdHRoaXMub25PcGVuUGFnZShjdXN0KTtcblx0fSxcblx0b25CdXR0b25BZGRQYWdlKGV2ZW50LCBjdXN0KSB7XG5cdFx0dGhpcy5hZGRQYWdlKGN1c3QpO1xuXHR9LFxuXHRvbkJ1dHRvblJlbW92ZVBhZ2UoZXZlbnQsIGN1c3QpIHtcblx0XHR0aGlzLnJlbW92ZVBhZ2UoY3VzdCk7XG5cdH0sXG5cdGNsb3NlQWxsUGFnZXMoKSB7XG5cdFx0dGhpcy5wYWdlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0ZWxlbWVudC5hY3RpdmUgPSBmYWxzZVxuXHRcdH0pO1xuXHR9LFxufSk7Il19