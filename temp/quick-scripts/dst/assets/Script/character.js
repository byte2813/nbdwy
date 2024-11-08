
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/character.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33cd23uZ6JD4pTLpKtgjbbS', 'character');
// Script/character.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    levelUp1: cc.Node,
    levelUp2: cc.Node,
    character: cc.Node,
    fail: cc.Node,
    dbArray: [dragonBones.DragonBonesAsset],
    textureArr: [dragonBones.DragonBonesAtlasAsset]
  },
  start: function start() {
    this.loadRes();
  },
  loadRes: function loadRes() {
    var _this = this;

    var self = this;

    var _loop = function _loop(i) {
      var nameSke = "db/sanxiao" + (i + 1 + '') + "_ske";
      var nameTex = "db/sanxiao" + (i + 1 + '') + "_tex";
      cc.loader.loadRes(nameSke, dragonBones.DragonBonesAsset, function (err, assert) {
        _this.dbArray[i] = assert;
      });
      cc.loader.loadRes(nameTex, dragonBones.DragonBonesAtlasAsset, function (err, texture) {
        _this.textureArr[i] = texture;
      });
    };

    for (var i = 0; i < 15; i++) {
      _loop(i);
    } //console.log('数据加载完毕')

  },
  onWalk: function onWalk(target) {
    target.playAnimation('walk', -1);
  },
  onLevelUp: function onLevelUp() {//this.levelUp2.getComponent(dragonBones.ArmatureDisplay).playAnimation('jump', -1)
  },
  onSuccessDialog: function onSuccessDialog(level) {
    // this.showCharacter(level - 1, this.levelUp1)
    this.showCharacter(level, this.levelUp2, true);
  },
  onLevelUpBtn: function onLevelUpBtn(level) {
    this.showCharacter(level);
  },
  onFail: function onFail(level) {
    this.showCharacter(level, this.fail);
  },
  initStartPage: function initStartPage() {},
  showCharacter: function showCharacter(level, target, jump) {
    target = target || this.character;
    var assert = target.getComponent(dragonBones.ArmatureDisplay); //  cc.log("before", assert)

    assert.destroy(); //  console.log(level)

    var main = target.addComponent(dragonBones.ArmatureDisplay);
    main.dragonAsset = this.dbArray[level - 1];
    main.dragonAtlasAsset = this.textureArr[level - 1];
    main.armatureName = "Armature";
    main.timeScale = 0.5; // console.log("after", main)

    main.playAnimation(jump ? "jump" : "walk", -1); //this.onWalk(main)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjaGFyYWN0ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJsZXZlbFVwMSIsIk5vZGUiLCJsZXZlbFVwMiIsImNoYXJhY3RlciIsImZhaWwiLCJkYkFycmF5IiwiZHJhZ29uQm9uZXMiLCJEcmFnb25Cb25lc0Fzc2V0IiwidGV4dHVyZUFyciIsIkRyYWdvbkJvbmVzQXRsYXNBc3NldCIsInN0YXJ0IiwibG9hZFJlcyIsInNlbGYiLCJpIiwibmFtZVNrZSIsIm5hbWVUZXgiLCJsb2FkZXIiLCJlcnIiLCJhc3NlcnQiLCJ0ZXh0dXJlIiwib25XYWxrIiwidGFyZ2V0IiwicGxheUFuaW1hdGlvbiIsIm9uTGV2ZWxVcCIsIm9uU3VjY2Vzc0RpYWxvZyIsImxldmVsIiwic2hvd0NoYXJhY3RlciIsIm9uTGV2ZWxVcEJ0biIsIm9uRmFpbCIsImluaXRTdGFydFBhZ2UiLCJqdW1wIiwiZ2V0Q29tcG9uZW50IiwiQXJtYXR1cmVEaXNwbGF5IiwiZGVzdHJveSIsIm1haW4iLCJhZGRDb21wb25lbnQiLCJkcmFnb25Bc3NldCIsImRyYWdvbkF0bGFzQXNzZXQiLCJhcm1hdHVyZU5hbWUiLCJ0aW1lU2NhbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBR1BDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxRQUFRLEVBQUVKLEVBQUUsQ0FBQ0ssSUFESDtBQUVWQyxJQUFBQSxRQUFRLEVBQUVOLEVBQUUsQ0FBQ0ssSUFGSDtBQUdWRSxJQUFBQSxTQUFTLEVBQUVQLEVBQUUsQ0FBQ0ssSUFISjtBQUlWRyxJQUFBQSxJQUFJLEVBQUVSLEVBQUUsQ0FBQ0ssSUFKQztBQUtWSSxJQUFBQSxPQUFPLEVBQUUsQ0FBQ0MsV0FBVyxDQUFDQyxnQkFBYixDQUxDO0FBTVZDLElBQUFBLFVBQVUsRUFBRSxDQUFDRixXQUFXLENBQUNHLHFCQUFiO0FBTkYsR0FITDtBQVdQQyxFQUFBQSxLQVhPLG1CQVdDO0FBQ04sU0FBS0MsT0FBTDtBQUNELEdBYk07QUFjUEEsRUFBQUEsT0FkTyxxQkFjRztBQUFBOztBQUNSLFFBQUlDLElBQUksR0FBRyxJQUFYOztBQURRLCtCQUVDQyxDQUZEO0FBR04sVUFBSUMsT0FBTyxHQUFHLGdCQUFnQkQsQ0FBQyxHQUFHLENBQUosR0FBUSxFQUF4QixJQUE4QixNQUE1QztBQUNBLFVBQUlFLE9BQU8sR0FBRyxnQkFBZ0JGLENBQUMsR0FBRyxDQUFKLEdBQVEsRUFBeEIsSUFBOEIsTUFBNUM7QUFDQWpCLE1BQUFBLEVBQUUsQ0FBQ29CLE1BQUgsQ0FBVUwsT0FBVixDQUFrQkcsT0FBbEIsRUFBMkJSLFdBQVcsQ0FBQ0MsZ0JBQXZDLEVBQXlELFVBQUNVLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUN4RSxRQUFBLEtBQUksQ0FBQ2IsT0FBTCxDQUFhUSxDQUFiLElBQWtCSyxNQUFsQjtBQUNELE9BRkQ7QUFHQXRCLE1BQUFBLEVBQUUsQ0FBQ29CLE1BQUgsQ0FBVUwsT0FBVixDQUFrQkksT0FBbEIsRUFBMkJULFdBQVcsQ0FBQ0cscUJBQXZDLEVBQThELFVBQUNRLEdBQUQsRUFBTUUsT0FBTixFQUFrQjtBQUM5RSxRQUFBLEtBQUksQ0FBQ1gsVUFBTCxDQUFnQkssQ0FBaEIsSUFBcUJNLE9BQXJCO0FBQ0QsT0FGRDtBQVJNOztBQUVSLFNBQUssSUFBSU4sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUFBLFlBQXBCQSxDQUFvQjtBQVM1QixLQVhPLENBWVA7O0FBQ0YsR0EzQk07QUE0QlBPLEVBQUFBLE1BNUJPLGtCQTRCQUMsTUE1QkEsRUE0QlE7QUFDYkEsSUFBQUEsTUFBTSxDQUFDQyxhQUFQLENBQXFCLE1BQXJCLEVBQTZCLENBQUMsQ0FBOUI7QUFDRCxHQTlCTTtBQStCUEMsRUFBQUEsU0EvQk8sdUJBK0JLLENBQ1Y7QUFDRCxHQWpDTTtBQWtDUEMsRUFBQUEsZUFsQ08sMkJBa0NTQyxLQWxDVCxFQWtDZ0I7QUFDckI7QUFDQSxTQUFLQyxhQUFMLENBQW1CRCxLQUFuQixFQUEwQixLQUFLdkIsUUFBL0IsRUFBeUMsSUFBekM7QUFFRCxHQXRDTTtBQXVDUHlCLEVBQUFBLFlBdkNPLHdCQXVDTUYsS0F2Q04sRUF1Q2E7QUFDbEIsU0FBS0MsYUFBTCxDQUFtQkQsS0FBbkI7QUFDRCxHQXpDTTtBQTBDUEcsRUFBQUEsTUExQ08sa0JBMENBSCxLQTFDQSxFQTBDTztBQUNaLFNBQUtDLGFBQUwsQ0FBbUJELEtBQW5CLEVBQTBCLEtBQUtyQixJQUEvQjtBQUNELEdBNUNNO0FBOENQeUIsRUFBQUEsYUE5Q08sMkJBOENTLENBRWYsQ0FoRE07QUFrRFBILEVBQUFBLGFBbERPLHlCQWtET0QsS0FsRFAsRUFrRGNKLE1BbERkLEVBa0RzQlMsSUFsRHRCLEVBa0Q0QjtBQUNqQ1QsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLElBQUksS0FBS2xCLFNBQXhCO0FBQ0EsUUFBSWUsTUFBTSxHQUFHRyxNQUFNLENBQUNVLFlBQVAsQ0FBb0J6QixXQUFXLENBQUMwQixlQUFoQyxDQUFiLENBRmlDLENBR2pDOztBQUNBZCxJQUFBQSxNQUFNLENBQUNlLE9BQVAsR0FKaUMsQ0FLbkM7O0FBQ0UsUUFBSUMsSUFBSSxHQUFHYixNQUFNLENBQUNjLFlBQVAsQ0FBb0I3QixXQUFXLENBQUMwQixlQUFoQyxDQUFYO0FBQ0FFLElBQUFBLElBQUksQ0FBQ0UsV0FBTCxHQUFtQixLQUFLL0IsT0FBTCxDQUFhb0IsS0FBSyxHQUFHLENBQXJCLENBQW5CO0FBQ0FTLElBQUFBLElBQUksQ0FBQ0csZ0JBQUwsR0FBd0IsS0FBSzdCLFVBQUwsQ0FBZ0JpQixLQUFLLEdBQUcsQ0FBeEIsQ0FBeEI7QUFDQVMsSUFBQUEsSUFBSSxDQUFDSSxZQUFMLEdBQW9CLFVBQXBCO0FBQ0FKLElBQUFBLElBQUksQ0FBQ0ssU0FBTCxHQUFpQixHQUFqQixDQVZpQyxDQVdqQzs7QUFDQUwsSUFBQUEsSUFBSSxDQUFDWixhQUFMLENBQW1CUSxJQUFJLEdBQUcsTUFBSCxHQUFZLE1BQW5DLEVBQTJDLENBQUMsQ0FBNUMsRUFaaUMsQ0FhakM7QUFDRDtBQWhFTSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgbGV2ZWxVcDE6IGNjLk5vZGUsXG4gICAgbGV2ZWxVcDI6IGNjLk5vZGUsXG4gICAgY2hhcmFjdGVyOiBjYy5Ob2RlLFxuICAgIGZhaWw6IGNjLk5vZGUsXG4gICAgZGJBcnJheTogW2RyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXNzZXRdLFxuICAgIHRleHR1cmVBcnI6IFtkcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXRdXG4gIH0sXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMubG9hZFJlcygpXG4gIH0sXG4gIGxvYWRSZXMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICBsZXQgbmFtZVNrZSA9IFwiZGIvc2FueGlhb1wiICsgKGkgKyAxICsgJycpICsgXCJfc2tlXCJcbiAgICAgIGxldCBuYW1lVGV4ID0gXCJkYi9zYW54aWFvXCIgKyAoaSArIDEgKyAnJykgKyBcIl90ZXhcIlxuICAgICAgY2MubG9hZGVyLmxvYWRSZXMobmFtZVNrZSwgZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBc3NldCwgKGVyciwgYXNzZXJ0KSA9PiB7XG4gICAgICAgIHRoaXMuZGJBcnJheVtpXSA9IGFzc2VydFxuICAgICAgfSlcbiAgICAgIGNjLmxvYWRlci5sb2FkUmVzKG5hbWVUZXgsIGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCwgKGVyciwgdGV4dHVyZSkgPT4ge1xuICAgICAgICB0aGlzLnRleHR1cmVBcnJbaV0gPSB0ZXh0dXJlXG4gICAgICB9KVxuICAgIH1cbiAgICAgLy9jb25zb2xlLmxvZygn5pWw5o2u5Yqg6L295a6M5q+VJylcbiAgfSxcbiAgb25XYWxrKHRhcmdldCkge1xuICAgIHRhcmdldC5wbGF5QW5pbWF0aW9uKCd3YWxrJywgLTEpXG4gIH0sXG4gIG9uTGV2ZWxVcCgpIHtcbiAgICAvL3RoaXMubGV2ZWxVcDIuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkucGxheUFuaW1hdGlvbignanVtcCcsIC0xKVxuICB9LFxuICBvblN1Y2Nlc3NEaWFsb2cobGV2ZWwpIHtcbiAgICAvLyB0aGlzLnNob3dDaGFyYWN0ZXIobGV2ZWwgLSAxLCB0aGlzLmxldmVsVXAxKVxuICAgIHRoaXMuc2hvd0NoYXJhY3RlcihsZXZlbCwgdGhpcy5sZXZlbFVwMiwgdHJ1ZSlcblxuICB9LFxuICBvbkxldmVsVXBCdG4obGV2ZWwpIHtcbiAgICB0aGlzLnNob3dDaGFyYWN0ZXIobGV2ZWwpXG4gIH0sXG4gIG9uRmFpbChsZXZlbCkge1xuICAgIHRoaXMuc2hvd0NoYXJhY3RlcihsZXZlbCwgdGhpcy5mYWlsKVxuICB9LFxuXG4gIGluaXRTdGFydFBhZ2UoKSB7XG5cbiAgfSxcblxuICBzaG93Q2hhcmFjdGVyKGxldmVsLCB0YXJnZXQsIGp1bXApIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwgdGhpcy5jaGFyYWN0ZXJcbiAgICBsZXQgYXNzZXJ0ID0gdGFyZ2V0LmdldENvbXBvbmVudChkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXG4gICAgLy8gIGNjLmxvZyhcImJlZm9yZVwiLCBhc3NlcnQpXG4gICAgYXNzZXJ0LmRlc3Ryb3koKVxuICAvLyAgY29uc29sZS5sb2cobGV2ZWwpXG4gICAgbGV0IG1haW4gPSB0YXJnZXQuYWRkQ29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcbiAgICBtYWluLmRyYWdvbkFzc2V0ID0gdGhpcy5kYkFycmF5W2xldmVsIC0gMV1cbiAgICBtYWluLmRyYWdvbkF0bGFzQXNzZXQgPSB0aGlzLnRleHR1cmVBcnJbbGV2ZWwgLSAxXVxuICAgIG1haW4uYXJtYXR1cmVOYW1lID0gXCJBcm1hdHVyZVwiXG4gICAgbWFpbi50aW1lU2NhbGUgPSAwLjVcbiAgICAvLyBjb25zb2xlLmxvZyhcImFmdGVyXCIsIG1haW4pXG4gICAgbWFpbi5wbGF5QW5pbWF0aW9uKGp1bXAgPyBcImp1bXBcIiA6IFwid2Fsa1wiLCAtMSlcbiAgICAvL3RoaXMub25XYWxrKG1haW4pXG4gIH0sXG59KTsiXX0=