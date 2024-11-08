
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tipBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '25720Je1mZOOb7eOx8qoRZt', 'tipBox');
// Script/tipBox.js

"use strict";

// 提示框
cc.Class({
  "extends": cc.Component,
  properties: {
    label: cc.Label,
    tipLabel: cc.Label
  },
  start: function start() {
    this.tip = ['一次性大量消除可获得道具!', 'X2道具可以翻倍一次消除的分数', '炸弹道具可以消除全屏同色方块', '单个方块无法消除哦', '炸弹道具可以消除全屏同色方块', '仙女棒可以消除所有单个方块'];
    this.otherTip = ['长风破浪会有时，直挂云帆济沧海', '黄沙百战穿金甲，不破楼兰终不还', '纸上得来终觉浅，绝知此事要躬行', '君子坦荡荡，小人长戚戚', '穷则独善其身，达则兼济天下', '盛年不重来，一日难再晨', '人生若只如初见，何事秋风悲画扇', '行到水穷处，坐看云起时', '天生我材必有用，千金散尽还复来', '大鹏一日同风起，扶摇直上九万里', '遥望齐州九点烟，一泓海水杯中泻', '人世几回伤往事，山形依旧枕寒流', '但使龙城飞将在，不教胡马度阴山', '十年一觉扬州梦，赢得青楼薄幸名', '沧海月明珠有泪，蓝田日暖玉生烟', '世间无限丹青手，一片伤心画不成', '男儿何不带吴钩，收取关山五十州', '苟利国家生死以，岂因祸福避趋之', '夜阑卧听风吹雨，铁马冰河入梦来', '人生自古谁无死？留取丹心照汗青'];
  },
  onLoad: function onLoad() {
    var _this = this;

    setInterval(function () {
      _this.tipLabel.string = _this.tip ? 'tip:' + _this.tip[Math.floor(Math.random() * _this.tip.length)] : '';
    }, 10000);
  },
  init: function init(s, type) {
    var _this2 = this;

    //传type是道具触发 不传是随机触发
    this._score = s;

    if (type > 0) {
      this.label.string = this.tip[type];
    } else {
      this.label.string = this.otherTip[Math.floor(Math.random() * this.otherTip.length)];
    }

    this.openTipBox();

    if (this.gapTimer) {
      clearInterval(this.gapTimer);
    }

    this.gapTimer = setInterval(function () {
      _this2.init(_this2._score, -1);
    }, 5000);
  },
  openTipBox: function openTipBox() {
    var _this3 = this;

    if (!this.isOpen) {
      // 动画 动画回掉
      var action = cc.scaleTo(0.3, 1).easing(cc.easeBackOut(2.0));
      var sq = cc.sequence(action, cc.callFunc(function () {
        _this3.isOpen = true;
      }));
      this.node.runAction(sq);
    }

    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }

    this.closeTimer = setTimeout(function () {
      _this3.closeTioBox();
    }, 4000);
  },
  closeTioBox: function closeTioBox() {
    var _this4 = this;

    var action = cc.scaleTo(0.3, 0);
    var sq = cc.sequence(action, cc.callFunc(function () {
      _this4.isOpen = false;
    }));
    this.node.runAction(sq); // if (this.openTimer) {
    //   clearTimeout(this.closeTimer)
    // }
    //this.openTimer = setTimeout(this.init(this._score, null), this._score.level * 2000)
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0aXBCb3guanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsYWJlbCIsIkxhYmVsIiwidGlwTGFiZWwiLCJzdGFydCIsInRpcCIsIm90aGVyVGlwIiwib25Mb2FkIiwic2V0SW50ZXJ2YWwiLCJzdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJpbml0IiwicyIsInR5cGUiLCJfc2NvcmUiLCJvcGVuVGlwQm94IiwiZ2FwVGltZXIiLCJjbGVhckludGVydmFsIiwiaXNPcGVuIiwiYWN0aW9uIiwic2NhbGVUbyIsImVhc2luZyIsImVhc2VCYWNrT3V0Iiwic3EiLCJzZXF1ZW5jZSIsImNhbGxGdW5jIiwibm9kZSIsInJ1bkFjdGlvbiIsImNsb3NlVGltZXIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xvc2VUaW9Cb3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDUixhQUFTRCxFQUFFLENBQUNFLFNBREo7QUFHUkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1hDLElBQUFBLEtBQUssRUFBRUosRUFBRSxDQUFDSyxLQURDO0FBRVhDLElBQUFBLFFBQVEsRUFBRU4sRUFBRSxDQUFDSztBQUZGLEdBSEo7QUFPUkUsRUFBQUEsS0FQUSxtQkFPQTtBQUNQLFNBQUtDLEdBQUwsR0FBVyxDQUFDLGVBQUQsRUFBa0IsaUJBQWxCLEVBQXFDLGdCQUFyQyxFQUF1RCxXQUF2RCxFQUFvRSxnQkFBcEUsRUFBc0YsZUFBdEYsQ0FBWDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsQ0FDZixpQkFEZSxFQUVmLGlCQUZlLEVBR2YsaUJBSGUsRUFJZixhQUplLEVBS2YsZUFMZSxFQU1mLGFBTmUsRUFPZixpQkFQZSxFQVFmLGFBUmUsRUFTZixpQkFUZSxFQVVmLGlCQVZlLEVBV2YsaUJBWGUsRUFZZixpQkFa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LEVBQXBCLEVBTGEsQ0FNYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBOUVPLENBK0VSOztBQS9FUSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmj5DnpLrmoYZcbmNjLkNsYXNzKHtcblx0ZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG5cdHByb3BlcnRpZXM6IHtcblx0XHRsYWJlbDogY2MuTGFiZWwsXG5cdFx0dGlwTGFiZWw6IGNjLkxhYmVsLFxuXHR9LFxuXHRzdGFydCgpIHtcblx0XHR0aGlzLnRpcCA9IFsn5LiA5qyh5oCn5aSn6YeP5raI6Zmk5Y+v6I635b6X6YGT5YW3IScsICdYMumBk+WFt+WPr+S7pee/u+WAjeS4gOasoea2iOmZpOeahOWIhuaVsCcsICfngrjlvLnpgZPlhbflj6/ku6XmtojpmaTlhajlsY/lkIzoibLmlrnlnZcnLCAn5Y2V5Liq5pa55Z2X5peg5rOV5raI6Zmk5ZOmJywgJ+eCuOW8uemBk+WFt+WPr+S7pea2iOmZpOWFqOWxj+WQjOiJsuaWueWdlycsICfku5nlpbPmo5Llj6/ku6XmtojpmaTmiYDmnInljZXkuKrmlrnlnZcnXVxuXHRcdHRoaXMub3RoZXJUaXAgPSBbXG5cdFx0XHQn6ZW/6aOO56C05rWq5Lya5pyJ5pe277yM55u05oyC5LqR5biG5rWO5rKn5rW3Jyxcblx0XHRcdCfpu4Tmspnnmb7miJjnqb/ph5HnlLLvvIzkuI3noLTmpbzlhbDnu4jkuI3ov5gnLFxuXHRcdFx0J+e6uOS4iuW+l+adpee7iOiniea1he+8jOe7neefpeatpOS6i+imgei6rOihjCcsXG5cdFx0XHQn5ZCb5a2Q5Z2m6I2h6I2h77yM5bCP5Lq66ZW/5oia5oiaJyxcblx0XHRcdCfnqbfliJnni6zlloTlhbbouqvvvIzovr7liJnlhbzmtY7lpKnkuIsnLFxuXHRcdFx0J+ebm+W5tOS4jemHjeadpe+8jOS4gOaXpemavuWGjeaZqCcsXG5cdFx0XHQn5Lq655Sf6Iul5Y+q5aaC5Yid6KeB77yM5L2V5LqL56eL6aOO5oKy55S75omHJyxcblx0XHRcdCfooYzliLDmsLTnqbflpITvvIzlnZDnnIvkupHotbfml7YnLFxuXHRcdFx0J+WkqeeUn+aIkeadkOW/heacieeUqO+8jOWNg+mHkeaVo+Wwvei/mOWkjeadpScsXG5cdFx0XHQn5aSn6bmP5LiA5pel5ZCM6aOO6LW377yM5om25pGH55u05LiK5Lmd5LiH6YeMJyxcblx0XHRcdCfpgaXmnJvpvZDlt57kuZ3ngrnng5/vvIzkuIDms5PmtbfmsLTmna/kuK3ms7snLFxuXHRcdFx0J+S6uuS4luWHoOWbnuS8pOW+gOS6i++8jOWxseW9ouS+neaXp+aeleWvkua1gScsXG5cdFx0XHQn5L2G5L2/6b6Z5Z+O6aOe5bCG5Zyo77yM5LiN5pWZ6IOh6ams5bqm6Zi05bGxJyxcblx0XHRcdCfljYHlubTkuIDop4nmiazlt57moqbvvIzotaLlvpfpnZLmpbzoloTlubjlkI0nLFxuXHRcdFx0J+ayp+a1t+aciOaYjuePoOacieazqu+8jOiTneeUsOaXpeaalueOieeUn+eDnycsXG5cdFx0XHQn5LiW6Ze05peg6ZmQ5Li56Z2S5omL77yM5LiA54mH5Lyk5b+D55S75LiN5oiQJyxcblx0XHRcdCfnlLflhL/kvZXkuI3luKblkLTpkqnvvIzmlLblj5blhbPlsbHkupTljYHlt54nLFxuXHRcdFx0J+iLn+WIqeWbveWutueUn+atu+S7pe+8jOWyguWboOeluOemj+mBv+i2i+S5iycsXG5cdFx0XHQn5aSc6ZiR5Y2n5ZCs6aOO5ZC56Zuo77yM6ZOB6ams5Yaw5rKz5YWl5qKm5p2lJyxcblx0XHRcdCfkurrnlJ/oh6rlj6TosIHml6DmrbvvvJ/nlZnlj5bkuLnlv4PnhafmsZfpnZInXG5cdFx0XVxuXHR9LFxuXHRvbkxvYWQoKSB7XG5cdFx0c2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0dGhpcy50aXBMYWJlbC5zdHJpbmcgPSB0aGlzLnRpcCA/ICgndGlwOicgKyB0aGlzLnRpcFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRpcC5sZW5ndGgpXSkgOiAnJ1xuXHRcdH0sIDEwMDAwKVxuXHR9LFxuXHRpbml0KHMsIHR5cGUpIHsgLy/kvKB0eXBl5piv6YGT5YW36Kem5Y+RIOS4jeS8oOaYr+maj+acuuinpuWPkVxuXHRcdHRoaXMuX3Njb3JlID0gc1xuXHRcdGlmICh0eXBlID4gMCkge1xuXHRcdFx0dGhpcy5sYWJlbC5zdHJpbmcgPSB0aGlzLnRpcFt0eXBlXVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmxhYmVsLnN0cmluZyA9IHRoaXMub3RoZXJUaXBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5vdGhlclRpcC5sZW5ndGgpXVxuXHRcdH1cblx0XHR0aGlzLm9wZW5UaXBCb3goKVxuXHRcdGlmICh0aGlzLmdhcFRpbWVyKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuZ2FwVGltZXIpXG5cdFx0fVxuXHRcdHRoaXMuZ2FwVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHR0aGlzLmluaXQodGhpcy5fc2NvcmUsIC0xKVxuXHRcdH0sIDUwMDApXG5cdH0sXG5cdG9wZW5UaXBCb3goKSB7XG5cdFx0aWYgKCF0aGlzLmlzT3Blbikge1xuXHRcdFx0Ly8g5Yqo55S7IOWKqOeUu+WbnuaOiVxuXHRcdFx0bGV0IGFjdGlvbiA9IGNjLnNjYWxlVG8oMC4zLCAxKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoMi4wKSlcblx0XHRcdGxldCBzcSA9IGNjLnNlcXVlbmNlKGFjdGlvbiwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmlzT3BlbiA9IHRydWVcblx0XHRcdH0pKVxuXHRcdFx0dGhpcy5ub2RlLnJ1bkFjdGlvbihzcSlcblx0XHR9XG5cdFx0aWYgKHRoaXMuY2xvc2VUaW1lcikge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VUaW1lcilcblx0XHR9XG5cdFx0dGhpcy5jbG9zZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmNsb3NlVGlvQm94KClcblx0XHR9LCA0MDAwKVxuXHR9LFxuXHRjbG9zZVRpb0JveCgpIHtcblx0XHRsZXQgYWN0aW9uID0gY2Muc2NhbGVUbygwLjMsIDApXG5cdFx0bGV0IHNxID0gY2Muc2VxdWVuY2UoYWN0aW9uLCBjYy5jYWxsRnVuYygoKSA9PiB7XG5cdFx0XHR0aGlzLmlzT3BlbiA9IGZhbHNlXG5cdFx0fSkpXG5cdFx0dGhpcy5ub2RlLnJ1bkFjdGlvbihzcSlcblx0XHQvLyBpZiAodGhpcy5vcGVuVGltZXIpIHtcblx0XHQvLyAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZXIpXG5cdFx0Ly8gfVxuXHRcdC8vdGhpcy5vcGVuVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuaW5pdCh0aGlzLl9zY29yZSwgbnVsbCksIHRoaXMuX3Njb3JlLmxldmVsICogMjAwMClcblx0fSxcblx0Ly8gdXBkYXRlIChkdCkge30sXG59KTsiXX0=