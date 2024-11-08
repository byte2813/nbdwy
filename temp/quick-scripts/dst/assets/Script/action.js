
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/action.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9d3711KFVFCZ6a/86BjU5eU', 'action');
// Script/action.js

"use strict";

/**
 * @author uu
 * @file 所有的简单动作集合
 */
// 震动动作 0.1效果比较好
function shackAction(time, range) {
  var action1 = cc.moveBy(time, range, range);
  var action2 = cc.moveBy(time, -range, -range);
  var action3 = cc.moveBy(time * 0.8, range * 0.8, range * 0.8);
  var action4 = cc.moveBy(time * 0.8, -range * 0.8, -range * 0.8);
  var action5 = cc.moveBy(time * 0.6, range * 0.6, range * 0.6);
  var action6 = cc.moveBy(time * 0.6, -range * 0.6, -range * 0.6);
  var action7 = cc.moveBy(time * 0.4, range * 0.4, range * 0.4);
  var action8 = cc.moveBy(time * 0.4, -range * 0.4, -range * 0.4);
  var action9 = cc.moveBy(time * 0.2, range * 0.2, range * 0.2);
  var action10 = cc.moveBy(time * 0.2, -range * 0.2, -range * 0.2);
  var sq = cc.sequence(action1, action2, action3, action4, action5, action6, action7, action8, action9, action10);
  return sq;
} // 晃动动作


function rockAction(time, range) {
  var action1 = cc.rotateBy(time, range, range);
  var action2 = cc.rotateBy(time, -2 * range, -2 * range);
  var action3 = cc.rotateBy(time * 0.8, 2 * range * 0.8, 2 * range * 0.8);
  var action6 = cc.rotateBy(time * 0.6, -2 * range * 0.6, -2 * range * 0.6);
  var action7 = cc.rotateBy(time * 0.4, 2 * range * 0.4, 2 * range * 0.4);
  var action10 = cc.rotateTo(time * 0.2, 0, 0);
  var sq = cc.sequence(action1, action2, action3, action6, action7, action10);
  return sq;
} // 弹出效果


function popOut(time) {
  return cc.scaleTo(time, 1).easing(cc.easeBackOut(2.0));
} // 收入效果


function popIn(time) {
  return cc.scaleTo(time, 0.5).easing(cc.easeBackIn(2.0));
}

function heartBeat() {
  var action1 = cc.scaleTo(0.2, 1.2).easing(cc.easeElasticInOut());
  var action2 = cc.scaleTo(0.2, 1).easing(cc.easeElasticInOut());
  var action3 = cc.rotateTo(0.1, 45);
  var action4 = cc.rotateTo(0.2, -45);
  var action5 = cc.rotateTo(0.1, 0);
} //翻页效果 前两个传node type传数字 左右旋转的


function pageTurning(pageUp, pageDown, typeA) {
  switch (typeA) {
    case 0:
      pageUp.runAction(cc.fadeOut(0.6));
      pageDown.runAction(cc.delayTime(0.6), cc.fadeIn(0.6), cc.sequence(cc.callFunc(function () {
        pageUp.active = false;
      }, this, pageUp)));
      break;

    case 1:
      pageDown.scaleX = 0;
      pageUp.runAction(cc.scaleTo(0.6, 0, 1));
      pageDown.runAction(cc.sequence(cc.delayTime(0.6), cc.callFunc(function () {
        pageUp.active = false;
      }, this, pageUp), cc.scaleTo(0.6, 1, 1)));
      break;

    case 2:
      break;
  }
} //移动到屏幕外 并且隐藏  0123 上右下左 会移动一个屏幕的距离 然后直接消失


function getMoveOutofScreenActive(typeA, winWidth, winHeight, delTime) {
  switch (typeA) {
    case 0:
      return cc.moveBy(delTime, 0, winHeight);

    case 1:
      return cc.moveBy(delTime, winWidth, 0);

    case 2:
      return cc.moveBy(delTime, 0, -winHeight);

    case 3:
      return cc.moveBy(delTime, -winWidth, 0);
  }
} //从屏幕外进入 上右下左


function getMoveInScreenActive(typeA, winWidth, winHeight, delTime) {
  switch (typeA) {
    case 0:
      return cc.moveBy(delTime, 0, -winHeight);

    case 1:
      return cc.moveBy(delTime, -winWidth, 0);

    case 2:
      return cc.moveBy(delTime, 0, winHeight);

    case 3:
      return cc.moveBy(delTime, winWidth, 0);
  }
} //闪烁动作


function blinkAction(delTime) {
  return cc.repeatForever(cc.sequence(cc.fadeOut(delTime), cc.fadeIn(delTime)));
}

module.exports = {
  shackAction: shackAction,
  blinkAction: blinkAction,
  pageTurning: pageTurning,
  heartBeat: heartBeat,
  getMoveOutofScreenActive: getMoveOutofScreenActive,
  popOut: popOut,
  popIn: popIn,
  getMoveInScreenActive: getMoveInScreenActive,
  rockAction: rockAction
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxhY3Rpb24uanMiXSwibmFtZXMiOlsic2hhY2tBY3Rpb24iLCJ0aW1lIiwicmFuZ2UiLCJhY3Rpb24xIiwiY2MiLCJtb3ZlQnkiLCJhY3Rpb24yIiwiYWN0aW9uMyIsImFjdGlvbjQiLCJhY3Rpb241IiwiYWN0aW9uNiIsImFjdGlvbjciLCJhY3Rpb244IiwiYWN0aW9uOSIsImFjdGlvbjEwIiwic3EiLCJzZXF1ZW5jZSIsInJvY2tBY3Rpb24iLCJyb3RhdGVCeSIsInJvdGF0ZVRvIiwicG9wT3V0Iiwic2NhbGVUbyIsImVhc2luZyIsImVhc2VCYWNrT3V0IiwicG9wSW4iLCJlYXNlQmFja0luIiwiaGVhcnRCZWF0IiwiZWFzZUVsYXN0aWNJbk91dCIsInBhZ2VUdXJuaW5nIiwicGFnZVVwIiwicGFnZURvd24iLCJ0eXBlQSIsInJ1bkFjdGlvbiIsImZhZGVPdXQiLCJkZWxheVRpbWUiLCJmYWRlSW4iLCJjYWxsRnVuYyIsImFjdGl2ZSIsInNjYWxlWCIsImdldE1vdmVPdXRvZlNjcmVlbkFjdGl2ZSIsIndpbldpZHRoIiwid2luSGVpZ2h0IiwiZGVsVGltZSIsImdldE1vdmVJblNjcmVlbkFjdGl2ZSIsImJsaW5rQWN0aW9uIiwicmVwZWF0Rm9yZXZlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLFNBQVNBLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxLQUEzQixFQUFrQztBQUNoQyxNQUFJQyxPQUFPLEdBQUdDLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVSixJQUFWLEVBQWdCQyxLQUFoQixFQUF1QkEsS0FBdkIsQ0FBZDtBQUNBLE1BQUlJLE9BQU8sR0FBR0YsRUFBRSxDQUFDQyxNQUFILENBQVVKLElBQVYsRUFBZ0IsQ0FBQ0MsS0FBakIsRUFBd0IsQ0FBQ0EsS0FBekIsQ0FBZDtBQUNBLE1BQUlLLE9BQU8sR0FBR0gsRUFBRSxD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cUMsT0FBVixFQUFtQkYsUUFBbkIsRUFBNkIsQ0FBN0IsQ0FBUDtBQVJKO0FBVUQsRUFDRDs7O0FBQ0EsU0FBU0ksV0FBVCxDQUFxQkYsT0FBckIsRUFBOEI7QUFDNUIsU0FBT3RDLEVBQUUsQ0FBQ3lDLGFBQUgsQ0FBaUJ6QyxFQUFFLENBQUNZLFFBQUgsQ0FBWVosRUFBRSxDQUFDNkIsT0FBSCxDQUFXUyxPQUFYLENBQVosRUFBaUN0QyxFQUFFLENBQUMrQixNQUFILENBQVVPLE9BQVYsQ0FBakMsQ0FBakIsQ0FBUDtBQUNEOztBQUNESSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZi9DLEVBQUFBLFdBQVcsRUFBRUEsV0FERTtBQUVmNEMsRUFBQUEsV0FBVyxFQUFFQSxXQUZFO0FBR2ZoQixFQUFBQSxXQUFXLEVBQUVBLFdBSEU7QUFJZkYsRUFBQUEsU0FBUyxFQUFFQSxTQUpJO0FBS2ZhLEVBQUFBLHdCQUF3QixFQUFFQSx3QkFMWDtBQU1mbkIsRUFBQUEsTUFBTSxFQUFFQSxNQU5PO0FBT2ZJLEVBQUFBLEtBQUssRUFBRUEsS0FQUTtBQVFmbUIsRUFBQUEscUJBQXFCLEVBQUVBLHFCQVJSO0FBU2YxQixFQUFBQSxVQUFVLEVBQUVBO0FBVEcsQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciB1dVxuICogQGZpbGUg5omA5pyJ55qE566A5Y2V5Yqo5L2c6ZuG5ZCIXG4gKi9cblxuLy8g6ZyH5Yqo5Yqo5L2cIDAuMeaViOaenOavlOi+g+WlvVxuZnVuY3Rpb24gc2hhY2tBY3Rpb24odGltZSwgcmFuZ2UpIHtcbiAgbGV0IGFjdGlvbjEgPSBjYy5tb3ZlQnkodGltZSwgcmFuZ2UsIHJhbmdlKVxuICBsZXQgYWN0aW9uMiA9IGNjLm1vdmVCeSh0aW1lLCAtcmFuZ2UsIC1yYW5nZSlcbiAgbGV0IGFjdGlvbjMgPSBjYy5tb3ZlQnkodGltZSAqIDAuOCwgcmFuZ2UgKiAwLjgsIHJhbmdlICogMC44KVxuICBsZXQgYWN0aW9uNCA9IGNjLm1vdmVCeSh0aW1lICogMC44LCAtcmFuZ2UgKiAwLjgsIC1yYW5nZSAqIDAuOClcbiAgbGV0IGFjdGlvbjUgPSBjYy5tb3ZlQnkodGltZSAqIDAuNiwgcmFuZ2UgKiAwLjYsIHJhbmdlICogMC42KVxuICBsZXQgYWN0aW9uNiA9IGNjLm1vdmVCeSh0aW1lICogMC42LCAtcmFuZ2UgKiAwLjYsIC1yYW5nZSAqIDAuNilcbiAgbGV0IGFjdGlvbjcgPSBjYy5tb3ZlQnkodGltZSAqIDAuNCwgcmFuZ2UgKiAwLjQsIHJhbmdlICogMC40KVxuICBsZXQgYWN0aW9uOCA9IGNjLm1vdmVCeSh0aW1lICogMC40LCAtcmFuZ2UgKiAwLjQsIC1yYW5nZSAqIDAuNClcbiAgbGV0IGFjdGlvbjkgPSBjYy5tb3ZlQnkodGltZSAqIDAuMiwgcmFuZ2UgKiAwLjIsIHJhbmdlICogMC4yKVxuICBsZXQgYWN0aW9uMTAgPSBjYy5tb3ZlQnkodGltZSAqIDAuMiwgLXJhbmdlICogMC4yLCAtcmFuZ2UgKiAwLjIpXG4gIGxldCBzcSA9IGNjLnNlcXVlbmNlKGFjdGlvbjEsIGFjdGlvbjIsIGFjdGlvbjMsIGFjdGlvbjQsIGFjdGlvbjUsIGFjdGlvbjYsIGFjdGlvbjcsIGFjdGlvbjgsIGFjdGlvbjksIGFjdGlvbjEwKVxuICByZXR1cm4gc3Fcbn1cbi8vIOaZg+WKqOWKqOS9nFxuZnVuY3Rpb24gcm9ja0FjdGlvbih0aW1lLCByYW5nZSkge1xuICBsZXQgYWN0aW9uMSA9IGNjLnJvdGF0ZUJ5KHRpbWUsIHJhbmdlLCByYW5nZSlcbiAgbGV0IGFjdGlvbjIgPSBjYy5yb3RhdGVCeSh0aW1lLCAtMiAqIHJhbmdlLCAtMiAqIHJhbmdlKVxuICBsZXQgYWN0aW9uMyA9IGNjLnJvdGF0ZUJ5KHRpbWUgKiAwLjgsIDIgKiByYW5nZSAqIDAuOCwgMiAqIHJhbmdlICogMC44KVxuICBsZXQgYWN0aW9uNiA9IGNjLnJvdGF0ZUJ5KHRpbWUgKiAwLjYsIC0yICogcmFuZ2UgKiAwLjYsIC0yICogcmFuZ2UgKiAwLjYpXG4gIGxldCBhY3Rpb243ID0gY2Mucm90YXRlQnkodGltZSAqIDAuNCwgMiAqIHJhbmdlICogMC40LCAyICogcmFuZ2UgKiAwLjQpXG4gIGxldCBhY3Rpb24xMCA9IGNjLnJvdGF0ZVRvKHRpbWUgKiAwLjIsIDAsIDApXG4gIGxldCBzcSA9IGNjLnNlcXVlbmNlKGFjdGlvbjEsIGFjdGlvbjIsIGFjdGlvbjMsIGFjdGlvbjYsIGFjdGlvbjcsIGFjdGlvbjEwKVxuICByZXR1cm4gc3Fcbn1cblxuLy8g5by55Ye65pWI5p6cXG5mdW5jdGlvbiBwb3BPdXQodGltZSkge1xuICByZXR1cm4gY2Muc2NhbGVUbyh0aW1lLCAxKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoMi4wKSlcbn1cbi8vIOaUtuWFpeaViOaenFxuZnVuY3Rpb24gcG9wSW4odGltZSkge1xuICByZXR1cm4gY2Muc2NhbGVUbyh0aW1lLCAwLjUpLmVhc2luZyhjYy5lYXNlQmFja0luKDIuMCkpXG59XG5cbmZ1bmN0aW9uIGhlYXJ0QmVhdCgpIHtcbiAgbGV0IGFjdGlvbjEgPSBjYy5zY2FsZVRvKDAuMiwgMS4yKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNJbk91dCgpKVxuICBsZXQgYWN0aW9uMiA9IGNjLnNjYWxlVG8oMC4yLCAxKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNJbk91dCgpKVxuICBsZXQgYWN0aW9uMyA9IGNjLnJvdGF0ZVRvKDAuMSwgNDUpXG4gIGxldCBhY3Rpb240ID0gY2Mucm90YXRlVG8oMC4yLCAtNDUpXG4gIGxldCBhY3Rpb241ID0gY2Mucm90YXRlVG8oMC4xLCAwKVxufVxuLy/nv7vpobXmlYjmnpwg5YmN5Lik5Liq5Lygbm9kZSB0eXBl5Lyg5pWw5a2XIOW3puWPs+aXi+i9rOeahFxuZnVuY3Rpb24gcGFnZVR1cm5pbmcocGFnZVVwLCBwYWdlRG93biwgdHlwZUEpIHtcbiAgc3dpdGNoICh0eXBlQSkge1xuICAgIGNhc2UgMDpcbiAgICAgIHBhZ2VVcC5ydW5BY3Rpb24oY2MuZmFkZU91dCgwLjYpKTtcbiAgICAgIHBhZ2VEb3duLnJ1bkFjdGlvbihjYy5kZWxheVRpbWUoMC42KSwgY2MuZmFkZUluKDAuNiksIGNjLnNlcXVlbmNlKGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgcGFnZVVwLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSwgdGhpcywgcGFnZVVwKSkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxOlxuICAgICAgcGFnZURvd24uc2NhbGVYID0gMDtcbiAgICAgIHBhZ2VVcC5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjYsIDAsIDEpKVxuICAgICAgcGFnZURvd24ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjYpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgIHBhZ2VVcC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH0sIHRoaXMsIHBhZ2VVcCksIGNjLnNjYWxlVG8oMC42LCAxLCAxKSwgKSlcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIGJyZWFrO1xuICB9XG59XG4vL+enu+WKqOWIsOWxj+W5leWkliDlubbkuJTpmpDol48gIDAxMjMg5LiK5Y+z5LiL5bemIOS8muenu+WKqOS4gOS4quWxj+W5leeahOi3neemuyDnhLblkI7nm7TmjqXmtojlpLFcbmZ1bmN0aW9uIGdldE1vdmVPdXRvZlNjcmVlbkFjdGl2ZSh0eXBlQSwgd2luV2lkdGgsIHdpbkhlaWdodCwgZGVsVGltZSkge1xuICBzd2l0Y2ggKHR5cGVBKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGNjLm1vdmVCeShkZWxUaW1lLCAwLCB3aW5IZWlnaHQpXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGNjLm1vdmVCeShkZWxUaW1lLCB3aW5XaWR0aCwgMClcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gY2MubW92ZUJ5KGRlbFRpbWUsIDAsIC13aW5IZWlnaHQpXG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGNjLm1vdmVCeShkZWxUaW1lLCAtd2luV2lkdGgsIDApXG4gIH1cbn1cbi8v5LuO5bGP5bmV5aSW6L+b5YWlIOS4iuWPs+S4i+W3plxuZnVuY3Rpb24gZ2V0TW92ZUluU2NyZWVuQWN0aXZlKHR5cGVBLCB3aW5XaWR0aCwgd2luSGVpZ2h0LCBkZWxUaW1lKSB7XG4gIHN3aXRjaCAodHlwZUEpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gY2MubW92ZUJ5KGRlbFRpbWUsIDAsIC13aW5IZWlnaHQpXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGNjLm1vdmVCeShkZWxUaW1lLCAtd2luV2lkdGgsIDApXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGNjLm1vdmVCeShkZWxUaW1lLCAwLCB3aW5IZWlnaHQpXG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIGNjLm1vdmVCeShkZWxUaW1lLCB3aW5XaWR0aCwgMClcbiAgfVxufVxuLy/pl6rng4HliqjkvZxcbmZ1bmN0aW9uIGJsaW5rQWN0aW9uKGRlbFRpbWUpIHtcbiAgcmV0dXJuIGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZmFkZU91dChkZWxUaW1lKSwgY2MuZmFkZUluKGRlbFRpbWUpKSlcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGFja0FjdGlvbjogc2hhY2tBY3Rpb24sXG4gIGJsaW5rQWN0aW9uOiBibGlua0FjdGlvbixcbiAgcGFnZVR1cm5pbmc6IHBhZ2VUdXJuaW5nLFxuICBoZWFydEJlYXQ6IGhlYXJ0QmVhdCxcbiAgZ2V0TW92ZU91dG9mU2NyZWVuQWN0aXZlOiBnZXRNb3ZlT3V0b2ZTY3JlZW5BY3RpdmUsXG4gIHBvcE91dDogcG9wT3V0LFxuICBwb3BJbjogcG9wSW4sXG4gIGdldE1vdmVJblNjcmVlbkFjdGl2ZTogZ2V0TW92ZUluU2NyZWVuQWN0aXZlLFxuICByb2NrQWN0aW9uOiByb2NrQWN0aW9uXG59Il19