"use strict";
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