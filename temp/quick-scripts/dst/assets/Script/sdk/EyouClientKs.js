
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/sdk/EyouClientKs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bddfzXn5NPLYimqZwfuQKm', 'EyouClientKs');
// Script/sdk/EyouClientKs.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BASE_URL = 'https://games.hndibei.com';

var EyouClientKs = /*#__PURE__*/function () {
  function EyouClientKs() {
    var F = null,
        I = 0x9,
        n = null,
        q = null,
        f = '-1',
        s = '-1',
        o = '4',
        i = null,
        X = null,
        u = null,
        w = null,
        t = null,
        C = null;
    var j = new Map();
    var P = null;

    var K = function K(S, J) {
      S['gameId'] = F, (S['platformId'] = I, S['sys'] = o), B(S)['then'](function (O) {
        if (O['payType'] == 0x4) tt['previewImage']({
          'urls': [O['payUrl']],
          'showmenu': !![]
        });else {
          if (O['payType'] == 0x8) O['balance'] > 0x0 ? r('充值提示', '账户余额:' + O['balance'] + '元,\x20还需充值:' + O['needPay'] + '元', function () {
            return l(O, J);
          }) : l(O, J);else {
            if (O['payType'] == 0x9) O['balance'] > 0x0 ? r('充值提示', '账户余额:' + O['balance'] + '元,\x20还需充值:' + O['needPay'] + '元', function () {
              return L(O, J);
            }) : L(O, J);else throw new Error('非法支付类型');
          }
        }
      });
    },
        l = function l(S, J) {
      if (S['needPay'] == 0x0) {
        x(S, J);
        return;
      }

      tt['requestGamePayment']({
        'mode': 'game',
        'env': 0x0,
        'currencyType': 'CNY',
        'platform': 'android',
        'buyQuantity': S['needPay'] * S['rate'],
        'zoneId': S['zoneId'],
        'customId': S['orderId'],
        'extraInfo': S['orderId'],
        'success': function success(O) {
          x(S, J);
        }
      });
    },
        L = function L(S, J) {
      if (S['needPay'] == 0x0) {
        x(S, J);
        return;
      }

      tt['openAwemeCustomerService']({
        'buyQuantity': S['needPay'] * S['rate'],
        'customId': S['orderId'],
        'currencyType': 'CNY',
        'zoneId': S['zoneId'],
        'extraInfo': S['orderId'],
        'success': function success(O) {
          J({
            'code': CodeStatus['SUCCESS'],
            'message': '操作成功',
            'data': null
          });
        },
        'fail': function fail(O) {
          J({
            'code': CodeStatus['FAIL'],
            'message': '操作失败',
            'data': null
          });
        }
      });
    },
        h = BASE_URL + '/market-multi-game-server/kuaiShouClient/deduct',
        x = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(S, J) {
        var O, d;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                O = {
                  'orderId': S['orderId'],
                  'gameId': F,
                  'platformId': I,
                  'userId': S['userId']
                };
                _context.next = 4;
                return p(h, O);

              case 4:
                d = _context.sent;
                d['code'] === CodeStatus['SUCCESS'] && J(d);
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console['error']('[扣款失败]异常:>', _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      return function x(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }(),
        e = BASE_URL + '/market-multi-game-server/kuaiShouClient/pullPay',
        B = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(S) {
        var J, O, d, k, g;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                J = 0x3;
                O = 0x0, d = ![], k = ![];

              case 2:
                if (!(O < J && !d)) {
                  _context2.next = 20;
                  break;
                }

                _context2.prev = 3;
                _context2.next = 6;
                return p(e, S);

              case 6:
                g = _context2.sent;

                if (!(g['code'] === CodeStatus['SUCCESS'])) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", g['data']);

              case 11:
                !k && (r('支付拉起失败', g['message']), k = !![]);

              case 12:
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](3);
                !k && (r('支付拉起失败', '网络超时'), k = !![]);

              case 17:
                O++;
                _context2.next = 2;
                break;

              case 20:
                throw new Error('支付拉起失败');

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 14]]);
      }));

      return function B(_x3) {
        return _ref2.apply(this, arguments);
      };
    }(),
        Q = function Q() {
      return new Promise(function (S, J) {
        ks['login']({
          'force': !![],
          'success': function success(_ref3) {
            var O = _ref3.code;
            O ? (console['log']('code:>', O), S(O)) : J(new Error('获取code失败'));
          },
          'fail': J
        });
      });
    },
        c = function c(S) {
      F = S;
      var J = ks['getSystemInfoSync']();
      o = J['platform'] === 'android' ? '4' : J['platform'] === 'ios' ? '5' : '6';
      var O = ks['getLaunchOptionsSync']()['query'];
      O && (n = O['channel'], q = O['sub_channel']);
      var d = {
        '10913': ['unit_id', 'callback']
      };

      if (d['hasOwnProperty'](n)) {
        var _d$n = d[n],
            k = _d$n[0],
            g = _d$n[1];
        f = O[k], s = O[g];
      } else n = '10906', q = '' + F + I + n + o + '0';
    },
        E = BASE_URL + '/market-multi-game-server/kuaiShouClient/adAction',
        m = function m(S, J, O) {
      var d = {
        'gameId': F,
        'platformId': I,
        'channelId': n,
        'subChannelId': q,
        'aid': f,
        'traceId': s,
        'sys': o,
        'userId': X,
        'adType': S,
        'adUnitId': J,
        'adActionType': O
      };
      p(E, d)['catch'](function (k) {
        console['log']('发送广告行为失败:>', k);
      });
    },
        M = function M(S) {
      var J = j['get'](S);
      if (!J) throw new Error('未创建编号为' + S + '的客服按钮');
      return J;
    },
        T = function T() {
      if (!P) throw new Error('未创建录屏管理器');
    },
        V = function V(S, J) {
      J(S);
    },
        r = function r(S, J, O, d) {
      tt['showModal']({
        'title': S,
        'content': J,
        'success': function success(k) {
          if (k['confirm'] && O) O();else k['cancel'] && d && d();
        }
      });
    },
        p = function p(S, J) {
      return new Promise(function (O, d) {
        ks['request']({
          'url': S,
          'method': 'POST',
          'header': {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          'data': JSON['stringify'](J),
          'fail': d,
          'success': function success(k) {
            O(k['data']);
          },
          'complete': function complete(k) {
            console['log']('---------------------------------请求\x20BEGIN--------------------------------'), console['log']('Url:>', S), console['log']('请求参数:>', J);
            var g = k && (k['data'] || k['errMsg']) ? k['data'] || k['errMsg'] : 'No\x20response\x20data';
            console['log']('响应:>', g), console['log']('---------------------------------请求\x20END--------------------------------');
          }
        });
      });
    },
        H = BASE_URL + '/market-multi-game-server/kuaiShouClient/initGame';

    this['init'] = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(S, J) {
        var O, d;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                ks['onShareAppMessage'](function (k) {
                  return {
                    'templateId': w,
                    'query': '',
                    'success': function success() {
                      console['log']('分享成功');
                    },
                    'fail': function fail(g) {
                      console['log']('分享失败', g);
                    }
                  };
                });
                _context3.next = 4;
                return Q();

              case 4:
                i = _context3.sent;
                c(S);
                O = {
                  'code': i,
                  'gameId': F,
                  'platformId': I,
                  'channelId': n,
                  'subChannelId': q,
                  'aid': f,
                  'traceId': s,
                  'sys': o
                };
                _context3.next = 9;
                return p(H, O);

              case 9:
                d = _context3.sent;
                d['code'] === CodeStatus['SUCCESS'] && (X = d['data']['userId'], u = d['data']['unionId'], w = d['data']['shareTemplateId'], d['data'] = null), J(i);
                _context3.next = 16;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                console['error']('[初始化游戏]异常:>', _context3.t0);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }(), this['login'] = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(S) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                S({
                  'code': CodeStatus['SUCCESS'],
                  'message': '操作成功',
                  'data': {
                    'code': i
                  }
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }(), this['pay'] = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(S, J) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                tt['checkSession']({
                  'success': function success(O) {
                    try {
                      K(S, J);
                    } catch (d) {
                      console['error']('[支付拉起]异常:>', d);
                    }
                  },
                  'fail': function fail(O) {
                    tt['login']({
                      'success': function success(d) {
                        try {
                          K(S, J);
                        } catch (k) {
                          console['error']('[支付拉起]异常:>', k);
                        }
                      }
                    });
                  }
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }();
    var G = BASE_URL + '/market-multi-game-server/kuaiShouClient/uploadRoleInfo';

    this['uploadRoleInfo'] = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(S, J) {
        var O;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                S['gameId'] = F, S['platformId'] = I;
                _context6.next = 4;
                return p(G, S);

              case 4:
                O = _context6.sent;
                J(O);
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                console['error']('上报角色数据异常:>', _context6.t0);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }();

    var b = BASE_URL + '/market-multi-game-server/kuaiShouClient/antidirt';
    this['antidirt'] = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(S, J) {
        var O, d;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                O = {
                  'gameId': F,
                  'platformId': I,
                  'contents': S
                };
                _context7.next = 4;
                return p(b, O);

              case 4:
                d = _context7.sent;
                J(d);
                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                console['error']('[内容安全检测]异常:>', _context7.t0);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 8]]);
      }));

      return function (_x11, _x12) {
        return _ref8.apply(this, arguments);
      };
    }(), this['createRewardedVideoAd'] = function (S, J) {
      var O = {
        'adUnitId': S['adUnitId']
      };
      S['multiton'] && (O['multiton'] = S['multiton'], O['multitonRewardMsg'] = S['multitonRewardMsg'], O['multitonRewardTimes'] = S['multitonRewardTimes']), S['progressTip'] && (O['progressTip'] = S['progressTip']), C = ks['createRewardedVideoAd'](O), C['onClose'](function (d) {
        d && d['isEnded'] && (m(AdType['REWARDED_VIDEO_AD'], t, AdActionType['FINISHED']), console['log']('正常播放结束，可以下发游戏奖励')), S['onClose'] && S['onClose'](d), C['destroy']();
      }), S['onError'] && C['onError'](function (d) {
        S['onError'] && S['onError'](d), C['destroy']();
      }), t = S['adUnitId'], J({
        'code': CodeStatus['SUCCESS'],
        'message': '操作成功',
        'data': null
      });
    }, this['showRewardedVideoAd'] = function () {
      C && (C['load'](), C['show']()['then'](function () {
        return m(AdType['REWARDED_VIDEO_AD'], t, AdActionType['SHOW']);
      })['catch'](function (S) {
        C['load']()['then'](function () {
          C['show']()['then'](function () {
            return m(AdType['REWARDED_VIDEO_AD'], t, AdActionType['SHOW']);
          });
        })['catch'](function (J) {
          return console['log']('激励视频\x20广告显示失败');
        });
      }));
    }, this['createContactButton'] = function (S, J) {
      var O = tt['createContactButton'](S);
      j['set'](j['size'], O), J({
        'code': CodeStatus['SUCCESS'],
        'message': '操作成功',
        'data': {
          'contactBtnNo': j['size'] - 0x1
        }
      });
    }, this['contactBtnDestory'] = function (S) {
      var J = M(S);
      J['destory'](), j['set'](S, null);
    }, this['contactBtnShow'] = function (S) {
      var J = M(S);
      J['show']();
    }, this['contactBtnHide'] = function (S) {
      var J = M(S);
      J['hide']();
    }, this['createGameRecorder'] = function (S, J) {
      P = ks['getGameRecorder'](), S['onStart'] && P['on']('start', S['onStart']), S['onResume'] && P['on']('resume', S['onResume']), S['onPause'] && P['on']('pause', S['onPause']), S['onStop'] && P['on']('stop', S['onStop']), S['onError'] && P['on']('error', S['onError']), S['onAbort'] && P['on']('abort', S['onAbort']), J({
        'code': CodeStatus['SUCCESS'],
        'message': '操作成功',
        'data': null
      });
    }, this['gameRecorderStart'] = function (S) {
      T(), P['start'](S);
    }, this['gameRecorderPause'] = function () {
      T(), P['pause']();
    }, this['gameRecorderResume'] = function () {
      T(), P['resume']();
    }, this['gameRecorderStop'] = function () {
      T(), console['log']('触发停止录屏'), P['stop']();
    }, this['publishVideo'] = function (S) {
      T(), P['publishVideo']({
        'video': S['videoID'],
        'callback': function callback(J) {
          if (J != null && J != undefined) {
            console['log']('分享录屏失败:\x20', J);
            return;
          }

          console['log']('分享录屏成功');
        }
      });
    }, this['shareAppMessage'] = function (S, J) {
      ks['shareAppMessage'](_extends({}, S, {
        'templateId': w,
        'success': function success() {
          J({
            'code': CodeStatus['SUCCESS'],
            'message': '操作成功',
            'data': null
          });
        },
        'fail': function fail(O) {
          console['log']('[分享失败]:>', O), J({
            'code': CodeStatus['FAIL'],
            'message': '操作失败',
            'data': null
          });
        }
      }));
    }, this['addShortcut'] = function (S) {
      ks['addShortcut']({
        'complete': S
      });
    }, this['addCommonUse'] = function (S) {
      ks['addCommonUse']({
        'complete': S
      });
    }, this['checkSidebar'] = function (S) {
      tt['checkScene']({
        'scene': 'sidebar',
        'success': function success(J) {
          J && J['isExist'] && S({
            'code': CodeStatus['SUCCESS'],
            'message': '操作成功',
            'data': null
          });
        }
      });
    }, this['navigateToSidebar'] = function (S) {
      tt['navigateToScene']({
        'scene': 'sidebar',
        'success': function success(J) {
          S({
            'code': CodeStatus['SUCCESS'],
            'message': '操作成功',
            'data': null
          });
        },
        'fail': function fail(J) {
          console['log']('[跳转侧边栏失败]:>', J), S({
            'code': CodeStatus['FAIL'],
            'message': '操作失败',
            'data': null
          });
        }
      });
    }, this['onFromSidebar'] = function (S) {
      tt['onShow'](function (_ref9) {
        var J = _ref9.scene,
            O = _ref9.launch_from,
            d = _ref9.location;
        J == '021036' && O == 'homepage' && d == 'sidebar_card' && S({
          'code': CodeStatus['SUCCESS'],
          'message': '操作成功',
          'data': null
        });
      });
    }, this['onKeyboardComplete'] = function (S) {
      var J = function J(O) {
        S({
          'code': CodeStatus['SUCCESS'],
          'message': '操作成功',
          'data': O
        }), tt['offKeyboardComplete'](J);
      };

      tt['onKeyboardComplete'](J);
    }, this['requestSubscribeMessage'] = function (S, J) {
      tt['requestSubscribeMessage']({
        'tmplIds': S,
        'success': function success(O) {
          var d = Object['keys'](O)['filter'](function (k) {
            return O[k] === 'accept';
          });
          J({
            'code': CodeStatus['SUCCESS'],
            'message': '操作成功',
            'data': d
          });
        },
        'fail': function fail(O) {
          J({
            'code': CodeStatus['FAILED'],
            'message': O['errMsg'],
            'data': null
          });
        }
      });
    };
  }

  EyouClientKs['getIns'] = function getIns() {
    return !this['ins'] && (this['ins'] = new EyouClientKs()), this['ins'];
  };

  return EyouClientKs;
}();

exports["default"] = EyouClientKs;

var CodeStatus = function CodeStatus() {};

CodeStatus['SUCCESS'] = 0x0;
CodeStatus['FAIL'] = -0x1;

var AdType = function AdType() {};

AdType['REWARDED_VIDEO_AD'] = 0x1;
AdType['BANNER_AD'] = 0x2;

var AdActionType = function AdActionType() {};

AdActionType['SHOW'] = 0x1;
AdActionType['FINISHED'] = 0x2;
module.exports = exports["default"];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZGtcXEV5b3VDbGllbnRLcy5qcyJdLCJuYW1lcyI6WyJCQVNFX1VSTCIsIkV5b3VDbGllbnRLcyIsIkYiLCJJIiwibiIsInEiLCJmIiwicyIsIm8iLCJpIiwiWCIsInUiLCJ3IiwidCIsIkMiLCJqIiwiTWFwIiwiUCIsIksiLCJTIiwiSiIsIkIiLCJPIiwidHQiLCJyIiwibCIsIkwiLCJFcnJvciIsIngiLCJDb2RlU3RhdHVzIiwiaCIsInAiLCJkIiwiY29uc29sZSIsImUiLCJrIiwiZyIsIlEiLCJQcm9taXNlIiwia3MiLCJjb2RlIiwiYyIsIkUiLCJtIiwiTSIsIlQiLCJWIiwiSlNPTiIsIkgiLCJHIiwiYiIsIkFkVHlwZSIsIkFkQWN0aW9uVHlwZSIsInVuZGVmaW5lZCIsInNjZW5lIiwibGF1bmNoX2Zyb20iLCJsb2NhdGlvbiIsIk9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRLEdBQUMsMkJBQWY7O0lBQWdFQztBQUFhLDBCQUFhO0FBQUMsUUFBSUMsQ0FBQyxHQUFDLElBQU47QUFBQSxRQUFXQyxDQUFDLEdBQUMsR0FBYjtBQUFBLFFBQWlCQyxDQUFDLEdBQUMsSUFBbkI7QUFBQSxRQUF3QkMsQ0FBQyxHQUFDLElBQTFCO0FBQUEsUUFBK0JDLENBQUMsR0FBQyxJQUFqQztBQUFBLFFBQXNDQyxDQUFDLEdBQUMsSUFBeEM7QUFBQSxRQUE2Q0MsQ0FBQyxHQUFDLEdBQS9DO0FBQUEsUUFBbURDLENBQUMsR0FBQyxJQUFyRDtBQUFBLFFBQTBEQyxDQUFDLEdBQUMsSUFBNUQ7QUFBQSxRQUFpRUMsQ0FBQyxHQUFDLElBQW5FO0FBQUEsUUFBd0VDLENBQUMsR0FBQyxJQUExRTtBQUFBLFFBQStFQyxDQUFDLEdBQUMsSUFBakY7QUFBQSxRQUFzRkMsQ0FBQyxHQUFDLElBQXhGO0FBQTZGLFFBQU1DLENBQUMsR0FBQyxJQUFJQyxHQUFKLEVBQVI7QUFBa0IsUUFB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K0MsS0FBSyxLQUFMLENBQXJEO0FBQWtFOzs7Ozs7O0lBQU80Qjs7QUFBQUEsV0FBbUIsYUFBVztBQUE5QkEsV0FBMEMsVUFBUSxDQUFDOztJQUFXc0I7O0FBQUFBLE9BQWUsdUJBQXFCO0FBQXBDQSxPQUFnRCxlQUFhOztJQUFXQzs7QUFBQUEsYUFBcUIsVUFBUTtBQUE3QkEsYUFBeUMsY0FBWSIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkFTRV9VUkw9J2h0dHBzOi8vZ2FtZXMuaG5kaWJlaS5jb20nO2V4cG9ydCBkZWZhdWx0IGNsYXNzIEV5b3VDbGllbnRLc3tjb25zdHJ1Y3Rvcigpe2xldCBGPW51bGwsST0weDksbj1udWxsLHE9bnVsbCxmPSctMScscz0nLTEnLG89JzQnLGk9bnVsbCxYPW51bGwsdT1udWxsLHc9bnVsbCx0PW51bGwsQz1udWxsO2NvbnN0IGo9bmV3IE1hcCgpO2xldCBQPW51bGw7Y29uc3QgSz0oUyxKKT0+e1NbJ2dhbWVJZCddPUYsKFNbJ3BsYXRmb3JtSWQnXT1JLFNbJ3N5cyddPW8pLEIoUylbJ3RoZW4nXShPPT57aWYoT1sncGF5VHlwZSddPT0weDQpdHRbJ3ByZXZpZXdJbWFnZSddKHsndXJscyc6W09bJ3BheVVybCddXSwnc2hvd21lbnUnOiEhW119KTtlbHNle2lmKE9bJ3BheVR5cGUnXT09MHg4KU9bJ2JhbGFuY2UnXT4weDA/cign5YWF5YC85o+Q56S6Jywn6LSm5oi35L2Z6aKdOicrT1snYmFsYW5jZSddKyflhYMsXFx4MjDov5jpnIDlhYXlgLw6JytPWyduZWVkUGF5J10rJ+WFgycsKCk9PmwoTyxKKSk6bChPLEopO2Vsc2V7aWYoT1sncGF5VHlwZSddPT0weDkpT1snYmFsYW5jZSddPjB4MD9yKCflhYXlgLzmj5DnpLonLCfotKbmiLfkvZnpop06JytPWydiYWxhbmNlJ10rJ+WFgyxcXHgyMOi/mOmcgOWFheWAvDonK09bJ25lZWRQYXknXSsn5YWDJywoKT0+TChPLEopKTpMKE8sSik7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ+mdnuazleaUr+S7mOexu+WeiycpO319fSk7fSxsPShTLEopPT57aWYoU1snbmVlZFBheSddPT0weDApe3goUyxKKTtyZXR1cm47fXR0WydyZXF1ZXN0R2FtZVBheW1lbnQnXSh7J21vZGUnOidnYW1lJywnZW52JzoweDAsJ2N1cnJlbmN5VHlwZSc6J0NOWScsJ3BsYXRmb3JtJzonYW5kcm9pZCcsJ2J1eVF1YW50aXR5JzpTWyduZWVkUGF5J10qU1sncmF0ZSddLCd6b25lSWQnOlNbJ3pvbmVJZCddLCdjdXN0b21JZCc6U1snb3JkZXJJZCddLCdleHRyYUluZm8nOlNbJ29yZGVySWQnXSwnc3VjY2Vzcyc6Tz0+e3goUyxKKTt9fSk7fSxMPShTLEopPT57aWYoU1snbmVlZFBheSddPT0weDApe3goUyxKKTtyZXR1cm47fXR0WydvcGVuQXdlbWVDdXN0b21lclNlcnZpY2UnXSh7J2J1eVF1YW50aXR5JzpTWyduZWVkUGF5J10qU1sncmF0ZSddLCdjdXN0b21JZCc6U1snb3JkZXJJZCddLCdjdXJyZW5jeVR5cGUnOidDTlknLCd6b25lSWQnOlNbJ3pvbmVJZCddLCdleHRyYUluZm8nOlNbJ29yZGVySWQnXSwnc3VjY2Vzcyc6Tz0+e0ooeydjb2RlJzpDb2RlU3RhdHVzWydTVUNDRVNTJ10sJ21lc3NhZ2UnOifmk43kvZzmiJDlip8nLCdkYXRhJzpudWxsfSk7fSwnZmFpbCc6Tz0+e0ooeydjb2RlJzpDb2RlU3RhdHVzWydGQUlMJ10sJ21lc3NhZ2UnOifmk43kvZzlpLHotKUnLCdkYXRhJzpudWxsfSk7fX0pO30saD1CQVNFX1VSTCsnL21hcmtldC1tdWx0aS1nYW1lLXNlcnZlci9rdWFpU2hvdUNsaWVudC9kZWR1Y3QnLHg9YXN5bmMoUyxKKT0+e3RyeXtjb25zdCBPPXsnb3JkZXJJZCc6U1snb3JkZXJJZCddLCdnYW1lSWQnOkYsJ3BsYXRmb3JtSWQnOkksJ3VzZXJJZCc6U1sndXNlcklkJ119O2xldCBkPWF3YWl0IHAoaCxPKTtkWydjb2RlJ109PT1Db2RlU3RhdHVzWydTVUNDRVNTJ10mJkooZCk7fWNhdGNoKGspe2NvbnNvbGVbJ2Vycm9yJ10oJ1vmiaPmrL7lpLHotKVd5byC5bi4Oj4nLGspO319LGU9QkFTRV9VUkwrJy9tYXJrZXQtbXVsdGktZ2FtZS1zZXJ2ZXIva3VhaVNob3VDbGllbnQvcHVsbFBheScsQj1hc3luYyBTPT57Y29uc3QgSj0weDM7bGV0IE89MHgwLGQ9IVtdLGs9IVtdO3doaWxlKE88SiYmIWQpe3RyeXtjb25zdCBnPWF3YWl0IHAoZSxTKTtpZihnWydjb2RlJ109PT1Db2RlU3RhdHVzWydTVUNDRVNTJ10pcmV0dXJuIGdbJ2RhdGEnXTtlbHNlIWsmJihyKCfmlK/ku5jmi4notbflpLHotKUnLGdbJ21lc3NhZ2UnXSksaz0hIVtdKTt9Y2F0Y2goVyl7IWsmJihyKCfmlK/ku5jmi4notbflpLHotKUnLCfnvZHnu5zotoXml7YnKSxrPSEhW10pO31PKys7fXRocm93IG5ldyBFcnJvcign5pSv5LuY5ouJ6LW35aSx6LSlJyk7fSxRPSgpPT57cmV0dXJuIG5ldyBQcm9taXNlKChTLEopPT57a3NbJ2xvZ2luJ10oeydmb3JjZSc6ISFbXSwnc3VjY2Vzcyc6KHtjb2RlOk99KT0+e08/KGNvbnNvbGVbJ2xvZyddKCdjb2RlOj4nLE8pLFMoTykpOkoobmV3IEVycm9yKCfojrflj5Zjb2Rl5aSx6LSlJykpO30sJ2ZhaWwnOkp9KTt9KTt9LGM9Uz0+e0Y9Uztjb25zdCBKPWtzWydnZXRTeXN0ZW1JbmZvU3luYyddKCk7bz1KWydwbGF0Zm9ybSddPT09J2FuZHJvaWQnPyc0JzpKWydwbGF0Zm9ybSddPT09J2lvcyc/JzUnOic2Jztjb25zdCBPPWtzWydnZXRMYXVuY2hPcHRpb25zU3luYyddKClbJ3F1ZXJ5J107TyYmKG49T1snY2hhbm5lbCddLHE9T1snc3ViX2NoYW5uZWwnXSk7Y29uc3QgZD17JzEwOTEzJzpbJ3VuaXRfaWQnLCdjYWxsYmFjayddfTtpZihkWydoYXNPd25Qcm9wZXJ0eSddKG4pKXtjb25zdCBbayxnXT1kW25dO2Y9T1trXSxzPU9bZ107fWVsc2Ugbj0nMTA5MDYnLHE9JycrRitJK24rbysnMCc7fSxFPUJBU0VfVVJMKycvbWFya2V0LW11bHRpLWdhbWUtc2VydmVyL2t1YWlTaG91Q2xpZW50L2FkQWN0aW9uJyxtPShTLEosTyk9PntsZXQgZD17J2dhbWVJZCc6RiwncGxhdGZvcm1JZCc6SSwnY2hhbm5lbElkJzpuLCdzdWJDaGFubmVsSWQnOnEsJ2FpZCc6ZiwndHJhY2VJZCc6cywnc3lzJzpvLCd1c2VySWQnOlgsJ2FkVHlwZSc6UywnYWRVbml0SWQnOkosJ2FkQWN0aW9uVHlwZSc6T307cChFLGQpWydjYXRjaCddKGs9Pntjb25zb2xlWydsb2cnXSgn5Y+R6YCB5bm/5ZGK6KGM5Li65aSx6LSlOj4nLGspO30pO30sTT1TPT57bGV0IEo9alsnZ2V0J10oUyk7aWYoIUopdGhyb3cgbmV3IEVycm9yKCfmnKrliJvlu7rnvJblj7fkuLonK1MrJ+eahOWuouacjeaMiemSricpO3JldHVybiBKO30sVD0oKT0+e2lmKCFQKXRocm93IG5ldyBFcnJvcign5pyq5Yib5bu65b2V5bGP566h55CG5ZmoJyk7fSxWPShTLEopPT57SihTKTt9LHI9KFMsSixPLGQpPT57dHRbJ3Nob3dNb2RhbCddKHsndGl0bGUnOlMsJ2NvbnRlbnQnOkosJ3N1Y2Nlc3MnOmZ1bmN0aW9uKGspe2lmKGtbJ2NvbmZpcm0nXSYmTylPKCk7ZWxzZSBrWydjYW5jZWwnXSYmZCYmZCgpO319KTt9LHA9KFMsSik9PntyZXR1cm4gbmV3IFByb21pc2UoKE8sZCk9Pntrc1sncmVxdWVzdCddKHsndXJsJzpTLCdtZXRob2QnOidQT1NUJywnaGVhZGVyJzp7J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCd9LCdkYXRhJzpKU09OWydzdHJpbmdpZnknXShKKSwnZmFpbCc6ZCwnc3VjY2Vzcyc6ZnVuY3Rpb24oayl7TyhrWydkYXRhJ10pO30sJ2NvbXBsZXRlJzpmdW5jdGlvbihrKXtjb25zb2xlWydsb2cnXSgnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6K+35rGCXFx4MjBCRUdJTi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyksY29uc29sZVsnbG9nJ10oJ1VybDo+JyxTKSxjb25zb2xlWydsb2cnXSgn6K+35rGC5Y+C5pWwOj4nLEopO2NvbnN0IGc9ayYmKGtbJ2RhdGEnXXx8a1snZXJyTXNnJ10pP2tbJ2RhdGEnXXx8a1snZXJyTXNnJ106J05vXFx4MjByZXNwb25zZVxceDIwZGF0YSc7Y29uc29sZVsnbG9nJ10oJ+WTjeW6lDo+JyxnKSxjb25zb2xlWydsb2cnXSgnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6K+35rGCXFx4MjBFTkQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO319KTt9KTt9LEg9QkFTRV9VUkwrJy9tYXJrZXQtbXVsdGktZ2FtZS1zZXJ2ZXIva3VhaVNob3VDbGllbnQvaW5pdEdhbWUnO3RoaXNbJ2luaXQnXT1hc3luYyhTLEopPT57dHJ5e2tzWydvblNoYXJlQXBwTWVzc2FnZSddKGs9PntyZXR1cm57J3RlbXBsYXRlSWQnOncsJ3F1ZXJ5JzonJywnc3VjY2Vzcyc6KCk9Pntjb25zb2xlWydsb2cnXSgn5YiG5Lqr5oiQ5YqfJyk7fSwnZmFpbCc6Zz0+e2NvbnNvbGVbJ2xvZyddKCfliIbkuqvlpLHotKUnLGcpO319O30pLGk9YXdhaXQgUSgpLGMoUyk7Y29uc3QgTz17J2NvZGUnOmksJ2dhbWVJZCc6RiwncGxhdGZvcm1JZCc6SSwnY2hhbm5lbElkJzpuLCdzdWJDaGFubmVsSWQnOnEsJ2FpZCc6ZiwndHJhY2VJZCc6cywnc3lzJzpvfSxkPWF3YWl0IHAoSCxPKTtkWydjb2RlJ109PT1Db2RlU3RhdHVzWydTVUNDRVNTJ10mJihYPWRbJ2RhdGEnXVsndXNlcklkJ10sdT1kWydkYXRhJ11bJ3VuaW9uSWQnXSx3PWRbJ2RhdGEnXVsnc2hhcmVUZW1wbGF0ZUlkJ10sZFsnZGF0YSddPW51bGwpLEooaSk7fWNhdGNoKGspe2NvbnNvbGVbJ2Vycm9yJ10oJ1vliJ3lp4vljJbmuLjmiI9d5byC5bi4Oj4nLGspO319LHRoaXNbJ2xvZ2luJ109YXN5bmMgUz0+e1Moeydjb2RlJzpDb2RlU3RhdHVzWydTVUNDRVNTJ10sJ21lc3NhZ2UnOifmk43kvZzmiJDlip8nLCdkYXRhJzp7J2NvZGUnOml9fSk7fSx0aGlzWydwYXknXT1hc3luYyhTLEopPT57dHRbJ2NoZWNrU2Vzc2lvbiddKHsnc3VjY2Vzcyc6Tz0+e3RyeXtLKFMsSik7fWNhdGNoKGQpe2NvbnNvbGVbJ2Vycm9yJ10oJ1vmlK/ku5jmi4notbdd5byC5bi4Oj4nLGQpO319LCdmYWlsJzpPPT57dHRbJ2xvZ2luJ10oeydzdWNjZXNzJzpkPT57dHJ5e0soUyxKKTt9Y2F0Y2goayl7Y29uc29sZVsnZXJyb3InXSgnW+aUr+S7mOaLiei1t13lvILluLg6Picsayk7fX19KTt9fSk7fTtjb25zdCBHPUJBU0VfVVJMKycvbWFya2V0LW11bHRpLWdhbWUtc2VydmVyL2t1YWlTaG91Q2xpZW50L3VwbG9hZFJvbGVJbmZvJzt0aGlzWyd1cGxvYWRSb2xlSW5mbyddPWFzeW5jKFMsSik9Pnt0cnl7U1snZ2FtZUlkJ109RixTWydwbGF0Zm9ybUlkJ109STtjb25zdCBPPWF3YWl0IHAoRyxTKTtKKE8pO31jYXRjaChkKXtjb25zb2xlWydlcnJvciddKCfkuIrmiqXop5LoibLmlbDmja7lvILluLg6PicsZCk7fX07Y29uc3QgYj1CQVNFX1VSTCsnL21hcmtldC1tdWx0aS1nYW1lLXNlcnZlci9rdWFpU2hvdUNsaWVudC9hbnRpZGlydCc7dGhpc1snYW50aWRpcnQnXT1hc3luYyhTLEopPT57dHJ5e2xldCBPPXsnZ2FtZUlkJzpGLCdwbGF0Zm9ybUlkJzpJLCdjb250ZW50cyc6U307Y29uc3QgZD1hd2FpdCBwKGIsTyk7SihkKTt9Y2F0Y2goayl7Y29uc29sZVsnZXJyb3InXSgnW+WGheWuueWuieWFqOajgOa1i13lvILluLg6Picsayk7fX0sdGhpc1snY3JlYXRlUmV3YXJkZWRWaWRlb0FkJ109KFMsSik9PntsZXQgTz17J2FkVW5pdElkJzpTWydhZFVuaXRJZCddfTtTWydtdWx0aXRvbiddJiYoT1snbXVsdGl0b24nXT1TWydtdWx0aXRvbiddLE9bJ211bHRpdG9uUmV3YXJkTXNnJ109U1snbXVsdGl0b25SZXdhcmRNc2cnXSxPWydtdWx0aXRvblJld2FyZFRpbWVzJ109U1snbXVsdGl0b25SZXdhcmRUaW1lcyddKSxTWydwcm9ncmVzc1RpcCddJiYoT1sncHJvZ3Jlc3NUaXAnXT1TWydwcm9ncmVzc1RpcCddKSxDPWtzWydjcmVhdGVSZXdhcmRlZFZpZGVvQWQnXShPKSxDWydvbkNsb3NlJ10oZD0+e2QmJmRbJ2lzRW5kZWQnXSYmKG0oQWRUeXBlWydSRVdBUkRFRF9WSURFT19BRCddLHQsQWRBY3Rpb25UeXBlWydGSU5JU0hFRCddKSxjb25zb2xlWydsb2cnXSgn5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxJykpLFNbJ29uQ2xvc2UnXSYmU1snb25DbG9zZSddKGQpLENbJ2Rlc3Ryb3knXSgpO30pLFNbJ29uRXJyb3InXSYmQ1snb25FcnJvciddKGQ9PntTWydvbkVycm9yJ10mJlNbJ29uRXJyb3InXShkKSxDWydkZXN0cm95J10oKTt9KSx0PVNbJ2FkVW5pdElkJ10sSih7J2NvZGUnOkNvZGVTdGF0dXNbJ1NVQ0NFU1MnXSwnbWVzc2FnZSc6J+aTjeS9nOaIkOWKnycsJ2RhdGEnOm51bGx9KTt9LHRoaXNbJ3Nob3dSZXdhcmRlZFZpZGVvQWQnXT0oKT0+e0MmJihDWydsb2FkJ10oKSxDWydzaG93J10oKVsndGhlbiddKCgpPT5tKEFkVHlwZVsnUkVXQVJERURfVklERU9fQUQnXSx0LEFkQWN0aW9uVHlwZVsnU0hPVyddKSlbJ2NhdGNoJ10oUz0+e0NbJ2xvYWQnXSgpWyd0aGVuJ10oKCk9PntDWydzaG93J10oKVsndGhlbiddKCgpPT5tKEFkVHlwZVsnUkVXQVJERURfVklERU9fQUQnXSx0LEFkQWN0aW9uVHlwZVsnU0hPVyddKSk7fSlbJ2NhdGNoJ10oSj0+Y29uc29sZVsnbG9nJ10oJ+a/gOWKseinhumikVxceDIw5bm/5ZGK5pi+56S65aSx6LSlJykpO30pKTt9LHRoaXNbJ2NyZWF0ZUNvbnRhY3RCdXR0b24nXT0oUyxKKT0+e2NvbnN0IE89dHRbJ2NyZWF0ZUNvbnRhY3RCdXR0b24nXShTKTtqWydzZXQnXShqWydzaXplJ10sTyksSih7J2NvZGUnOkNvZGVTdGF0dXNbJ1NVQ0NFU1MnXSwnbWVzc2FnZSc6J+aTjeS9nOaIkOWKnycsJ2RhdGEnOnsnY29udGFjdEJ0bk5vJzpqWydzaXplJ10tMHgxfX0pO30sdGhpc1snY29udGFjdEJ0bkRlc3RvcnknXT1TPT57bGV0IEo9TShTKTtKWydkZXN0b3J5J10oKSxqWydzZXQnXShTLG51bGwpO30sdGhpc1snY29udGFjdEJ0blNob3cnXT1TPT57bGV0IEo9TShTKTtKWydzaG93J10oKTt9LHRoaXNbJ2NvbnRhY3RCdG5IaWRlJ109Uz0+e2xldCBKPU0oUyk7SlsnaGlkZSddKCk7fSx0aGlzWydjcmVhdGVHYW1lUmVjb3JkZXInXT0oUyxKKT0+e1A9a3NbJ2dldEdhbWVSZWNvcmRlciddKCksU1snb25TdGFydCddJiZQWydvbiddKCdzdGFydCcsU1snb25TdGFydCddKSxTWydvblJlc3VtZSddJiZQWydvbiddKCdyZXN1bWUnLFNbJ29uUmVzdW1lJ10pLFNbJ29uUGF1c2UnXSYmUFsnb24nXSgncGF1c2UnLFNbJ29uUGF1c2UnXSksU1snb25TdG9wJ10mJlBbJ29uJ10oJ3N0b3AnLFNbJ29uU3RvcCddKSxTWydvbkVycm9yJ10mJlBbJ29uJ10oJ2Vycm9yJyxTWydvbkVycm9yJ10pLFNbJ29uQWJvcnQnXSYmUFsnb24nXSgnYWJvcnQnLFNbJ29uQWJvcnQnXSksSih7J2NvZGUnOkNvZGVTdGF0dXNbJ1NVQ0NFU1MnXSwnbWVzc2FnZSc6J+aTjeS9nOaIkOWKnycsJ2RhdGEnOm51bGx9KTt9LHRoaXNbJ2dhbWVSZWNvcmRlclN0YXJ0J109Uz0+e1QoKSxQWydzdGFydCddKFMpO30sdGhpc1snZ2FtZVJlY29yZGVyUGF1c2UnXT0oKT0+e1QoKSxQWydwYXVzZSddKCk7fSx0aGlzWydnYW1lUmVjb3JkZXJSZXN1bWUnXT0oKT0+e1QoKSxQWydyZXN1bWUnXSgpO30sdGhpc1snZ2FtZVJlY29yZGVyU3RvcCddPSgpPT57VCgpLGNvbnNvbGVbJ2xvZyddKCfop6blj5HlgZzmraLlvZXlsY8nKSxQWydzdG9wJ10oKTt9LHRoaXNbJ3B1Ymxpc2hWaWRlbyddPVM9PntUKCksUFsncHVibGlzaFZpZGVvJ10oeyd2aWRlbyc6U1sndmlkZW9JRCddLCdjYWxsYmFjayc6Sj0+e2lmKEohPW51bGwmJkohPXVuZGVmaW5lZCl7Y29uc29sZVsnbG9nJ10oJ+WIhuS6q+W9leWxj+Wksei0pTpcXHgyMCcsSik7cmV0dXJuO31jb25zb2xlWydsb2cnXSgn5YiG5Lqr5b2V5bGP5oiQ5YqfJyk7fX0pO30sdGhpc1snc2hhcmVBcHBNZXNzYWdlJ109KFMsSik9Pntrc1snc2hhcmVBcHBNZXNzYWdlJ10oey4uLlMsJ3RlbXBsYXRlSWQnOncsJ3N1Y2Nlc3MnOigpPT57Sih7J2NvZGUnOkNvZGVTdGF0dXNbJ1NVQ0NFU1MnXSwnbWVzc2FnZSc6J+aTjeS9nOaIkOWKnycsJ2RhdGEnOm51bGx9KTt9LCdmYWlsJzpPPT57Y29uc29sZVsnbG9nJ10oJ1vliIbkuqvlpLHotKVdOj4nLE8pLEooeydjb2RlJzpDb2RlU3RhdHVzWydGQUlMJ10sJ21lc3NhZ2UnOifmk43kvZzlpLHotKUnLCdkYXRhJzpudWxsfSk7fX0pO30sdGhpc1snYWRkU2hvcnRjdXQnXT1TPT57a3NbJ2FkZFNob3J0Y3V0J10oeydjb21wbGV0ZSc6U30pO30sdGhpc1snYWRkQ29tbW9uVXNlJ109Uz0+e2tzWydhZGRDb21tb25Vc2UnXSh7J2NvbXBsZXRlJzpTfSk7fSx0aGlzWydjaGVja1NpZGViYXInXT1TPT57dHRbJ2NoZWNrU2NlbmUnXSh7J3NjZW5lJzonc2lkZWJhcicsJ3N1Y2Nlc3MnOko9PntKJiZKWydpc0V4aXN0J10mJlMoeydjb2RlJzpDb2RlU3RhdHVzWydTVUNDRVNTJ10sJ21lc3NhZ2UnOifmk43kvZzmiJDlip8nLCdkYXRhJzpudWxsfSk7fX0pO30sdGhpc1snbmF2aWdhdGVUb1NpZGViYXInXT1TPT57dHRbJ25hdmlnYXRlVG9TY2VuZSddKHsnc2NlbmUnOidzaWRlYmFyJywnc3VjY2Vzcyc6Sj0+e1Moeydjb2RlJzpDb2RlU3RhdHVzWydTVUNDRVNTJ10sJ21lc3NhZ2UnOifmk43kvZzmiJDlip8nLCdkYXRhJzpudWxsfSk7fSwnZmFpbCc6Sj0+e2NvbnNvbGVbJ2xvZyddKCdb6Lez6L2s5L6n6L655qCP5aSx6LSlXTo+JyxKKSxTKHsnY29kZSc6Q29kZVN0YXR1c1snRkFJTCddLCdtZXNzYWdlJzon5pON5L2c5aSx6LSlJywnZGF0YSc6bnVsbH0pO319KTt9LHRoaXNbJ29uRnJvbVNpZGViYXInXT1TPT57dHRbJ29uU2hvdyddKCh7c2NlbmU6SixsYXVuY2hfZnJvbTpPLGxvY2F0aW9uOmR9KT0+e0o9PScwMjEwMzYnJiZPPT0naG9tZXBhZ2UnJiZkPT0nc2lkZWJhcl9jYXJkJyYmUyh7J2NvZGUnOkNvZGVTdGF0dXNbJ1NVQ0NFU1MnXSwnbWVzc2FnZSc6J+aTjeS9nOaIkOWKnycsJ2RhdGEnOm51bGx9KTt9KTt9LHRoaXNbJ29uS2V5Ym9hcmRDb21wbGV0ZSddPVM9Pntjb25zdCBKPU89PntTKHsnY29kZSc6Q29kZVN0YXR1c1snU1VDQ0VTUyddLCdtZXNzYWdlJzon5pON5L2c5oiQ5YqfJywnZGF0YSc6T30pLHR0WydvZmZLZXlib2FyZENvbXBsZXRlJ10oSik7fTt0dFsnb25LZXlib2FyZENvbXBsZXRlJ10oSik7fSx0aGlzWydyZXF1ZXN0U3Vic2NyaWJlTWVzc2FnZSddPShTLEopPT57dHRbJ3JlcXVlc3RTdWJzY3JpYmVNZXNzYWdlJ10oeyd0bXBsSWRzJzpTLCdzdWNjZXNzJzpPPT57bGV0IGQ9T2JqZWN0WydrZXlzJ10oTylbJ2ZpbHRlciddKGs9Pk9ba109PT0nYWNjZXB0Jyk7Sih7J2NvZGUnOkNvZGVTdGF0dXNbJ1NVQ0NFU1MnXSwnbWVzc2FnZSc6J+aTjeS9nOaIkOWKnycsJ2RhdGEnOmR9KTt9LCdmYWlsJzpPPT57Sih7J2NvZGUnOkNvZGVTdGF0dXNbJ0ZBSUxFRCddLCdtZXNzYWdlJzpPWydlcnJNc2cnXSwnZGF0YSc6bnVsbH0pO319KTt9O31zdGF0aWNbJ2dldElucyddKCl7cmV0dXJuIXRoaXNbJ2lucyddJiYodGhpc1snaW5zJ109bmV3IEV5b3VDbGllbnRLcygpKSx0aGlzWydpbnMnXTt9fWNsYXNzIENvZGVTdGF0dXN7c3RhdGljIFsnU1VDQ0VTUyddPTB4MDtzdGF0aWMgWydGQUlMJ109LTB4MTt9Y2xhc3MgQWRUeXBle3N0YXRpYyBbJ1JFV0FSREVEX1ZJREVPX0FEJ109MHgxO3N0YXRpYyBbJ0JBTk5FUl9BRCddPTB4Mjt9Y2xhc3MgQWRBY3Rpb25UeXBle3N0YXRpYyBbJ1NIT1cnXT0weDE7c3RhdGljIFsnRklOSVNIRUQnXT0weDI7fSJdfQ==