
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/musicMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0fd3emgDv1Pc6rR7NiVJ4q/', 'musicMgr');
// Script/musicMgr.js

"use strict";

/**
 * @author uu
 * @file  音乐控制组件
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    volume: 1,
    audios: [cc.AudioSource],
    audioPrefab: cc.Prefab,
    bgMusic: cc.AudioSource,
    winAudio: cc.AudioSource,
    doubleAudio: cc.AudioSource,
    boomAudio: cc.AudioSource,
    magicAudio: cc.AudioSource //audioSource: cc.AudioSource,

  },
  init: function init() {
    this.audio = [];
    this.instanceAudio();
    this.createMusicPool();
  },
  createMusicPool: function createMusicPool() {// this.musicPool = new cc.NodePool()
    // for (let i = 0; i < 20; i++) {
    //   let music = cc.instantiate(this.audioPrefab)
    //   this.musicPool.put(music)
    // }
  },
  instanceAudio: function instanceAudio() {},
  changeVol: function changeVol(vol) {
    var _this = this;

    this.volume = vol;
    this.audios.forEach(function (item, index) {
      // item.volume = vol
      _this.audios[index].volume = vol;
    });
  },
  onPlayAudio: function onPlayAudio(num) {
    var self = this;

    if (!this.audios[num] || this.audios[num].isPlaying) {
      if (this.audios[num + 1]) {
        self.onPlayAudio(num + 1);
      } else {
        //console.log('创建新的音乐实例')
        var music = null;

        if (self.musicPool && self.musicPool.size() > 0) {
          music = self.musicPool.get();
        } else {
          music = cc.instantiate(self.audioPrefab);
        }

        music.parent = self.node;
        this.audios[num + 1] = music.getComponent(cc.AudioSource);
        music.getComponent(cc.AudioSource).play();
      } // if (num < this.audios.length) {
      //   this.audios[num].stop()
      //   this.audios[num].rewind()
      //   this.audios[num].play()
      // }

    } else {
      // console.log('使用旧的音乐')
      this.audios[num].rewind();
      this.audios[num].play();
    }
  },
  pauseBg: function pauseBg() {
    this.bgMusic.pause();
  },
  resumeBg: function resumeBg() {
    this.bgMusic.resume();
  },
  start: function start() {// this.onPlayAudio(1);
  },
  checkBg: function checkBg() {},
  onWin: function onWin() {
    this.winAudio.rewind();
    this.winAudio.play();
  },
  onDouble: function onDouble() {
    this.doubleAudio.rewind();
    this.doubleAudio.play();
  },
  onBoom: function onBoom() {
    this.boomAudio.rewind();
    this.boomAudio.play();
  },
  onMagic: function onMagic() {
    this.magicAudio.rewind();
    this.magicAudio.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtdXNpY01nci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInZvbHVtZSIsImF1ZGlvcyIsIkF1ZGlvU291cmNlIiwiYXVkaW9QcmVmYWIiLCJQcmVmYWIiLCJiZ011c2ljIiwid2luQXVkaW8iLCJkb3VibGVBdWRpbyIsImJvb21BdWRpbyIsIm1hZ2ljQXVkaW8iLCJpbml0IiwiYXVkaW8iLCJpbnN0YW5jZUF1ZGlvIiwiY3JlYXRlTXVzaWNQb29sIiwiY2hhbmdlVm9sIiwidm9sIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsIm9uUGxheUF1ZGlvIiwibnVtIiwic2VsZiIsImlzUGxheWluZyIsIm11c2ljIiwibXVzaWNQb29sIiwic2l6ZSIsImdldCIsImluc3RhbnRpYXRlIiwicGFyZW50Iiwibm9kZSIsImdldENvbXBvbmVudCIsInBsYXkiLCJyZXdpbmQiLCJwYXVzZUJnIiwicGF1c2UiLCJyZXN1bWVCZyIsInJlc3VtZSIsInN0YXJ0IiwiY2hlY2tCZyIsIm9uV2luIiwib25Eb3VibGUiLCJvbkJvb20iLCJvbk1hZ2ljIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ1AsYUFBU0QsRUFBRSxDQUFDRSxTQURMO0FBRVBDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxNQUFNLEVBQUUsQ0FERTtBQUVWQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQ0wsRUFBRSxDQUFDTSxXQUFKLENBRkU7QUFHVkMsSUFBQUEsV0FBVyxFQUFFUCxFQUFFLENBQUNRLE1BSE47QUFJVkMsSUFBQUEsT0FBTyxFQUFFVCxFQUFFLENBQUNNLFdBSkY7QUFLVkksSUFBQUEsUUFBUSxFQUFFVixFQUFFLENBQUNNLFdBTEg7QUFNVkssSUFBQUEsV0FBVyxFQUFFWCxFQUFFLENBQUNNLFdBTk47QUFPVk0s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LENBQWlCd0IsSUFBakI7QUFDRCxHQW5GTTtBQXFGUFUsRUFBQUEsTUFyRk8sb0JBcUZFO0FBQ1AsU0FBS2pDLFNBQUwsQ0FBZXdCLE1BQWY7QUFDQSxTQUFLeEIsU0FBTCxDQUFldUIsSUFBZjtBQUNELEdBeEZNO0FBeUZQVyxFQUFBQSxPQXpGTyxxQkF5Rkc7QUFDUixTQUFLakMsVUFBTCxDQUFnQnVCLE1BQWhCO0FBQ0EsU0FBS3ZCLFVBQUwsQ0FBZ0JzQixJQUFoQjtBQUNEO0FBNUZNLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGF1dGhvciB1dVxuICogQGZpbGUgIOmfs+S5kOaOp+WItue7hOS7tlxuICovXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgcHJvcGVydGllczoge1xuICAgIHZvbHVtZTogMSxcbiAgICBhdWRpb3M6IFtjYy5BdWRpb1NvdXJjZV0sXG4gICAgYXVkaW9QcmVmYWI6IGNjLlByZWZhYixcbiAgICBiZ011c2ljOiBjYy5BdWRpb1NvdXJjZSxcbiAgICB3aW5BdWRpbzogY2MuQXVkaW9Tb3VyY2UsXG4gICAgZG91YmxlQXVkaW86IGNjLkF1ZGlvU291cmNlLFxuICAgIGJvb21BdWRpbzogY2MuQXVkaW9Tb3VyY2UsXG4gICAgbWFnaWNBdWRpbzogY2MuQXVkaW9Tb3VyY2UsXG4gICAgLy9hdWRpb1NvdXJjZTogY2MuQXVkaW9Tb3VyY2UsXG4gIH0sXG4gIGluaXQoKSB7XG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gICAgdGhpcy5pbnN0YW5jZUF1ZGlvKClcbiAgICB0aGlzLmNyZWF0ZU11c2ljUG9vbCgpXG4gIH0sXG4gIGNyZWF0ZU11c2ljUG9vbCgpIHtcbiAgICAvLyB0aGlzLm11c2ljUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpXG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgLy8gICBsZXQgbXVzaWMgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmF1ZGlvUHJlZmFiKVxuICAgIC8vICAgdGhpcy5tdXNpY1Bvb2wucHV0KG11c2ljKVxuICAgIC8vIH1cbiAgfSxcbiAgaW5zdGFuY2VBdWRpbygpIHtcblxuICB9LFxuICBjaGFuZ2VWb2wodm9sKSB7XG4gICAgdGhpcy52b2x1bWUgPSB2b2xcbiAgICB0aGlzLmF1ZGlvcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgLy8gaXRlbS52b2x1bWUgPSB2b2xcbiAgICAgIHRoaXMuYXVkaW9zW2luZGV4XS52b2x1bWUgPSB2b2xcbiAgICB9KVxuICB9LFxuICBvblBsYXlBdWRpbyhudW0pIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBpZiAoIXRoaXMuYXVkaW9zW251bV0gfHwgdGhpcy5hdWRpb3NbbnVtXS5pc1BsYXlpbmcpIHtcbiAgICAgIGlmICh0aGlzLmF1ZGlvc1tudW0gKyAxXSkge1xuICAgICAgICBzZWxmLm9uUGxheUF1ZGlvKG51bSArIDEpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCfliJvlu7rmlrDnmoTpn7PkuZDlrp7kvosnKVxuICAgICAgICBsZXQgbXVzaWMgPSBudWxsXG4gICAgICAgIGlmIChzZWxmLm11c2ljUG9vbCAmJiBzZWxmLm11c2ljUG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgbXVzaWMgPSBzZWxmLm11c2ljUG9vbC5nZXQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG11c2ljID0gY2MuaW5zdGFudGlhdGUoc2VsZi5hdWRpb1ByZWZhYilcbiAgICAgICAgfVxuICAgICAgICBtdXNpYy5wYXJlbnQgPSBzZWxmLm5vZGVcbiAgICAgICAgdGhpcy5hdWRpb3NbbnVtICsgMV0gPSBtdXNpYy5nZXRDb21wb25lbnQoY2MuQXVkaW9Tb3VyY2UpXG4gICAgICAgIG11c2ljLmdldENvbXBvbmVudChjYy5BdWRpb1NvdXJjZSkucGxheSgpXG4gICAgICB9XG4gICAgICAvLyBpZiAobnVtIDwgdGhpcy5hdWRpb3MubGVuZ3RoKSB7XG4gICAgICAvLyAgIHRoaXMuYXVkaW9zW251bV0uc3RvcCgpXG4gICAgICAvLyAgIHRoaXMuYXVkaW9zW251bV0ucmV3aW5kKClcbiAgICAgIC8vICAgdGhpcy5hdWRpb3NbbnVtXS5wbGF5KClcbiAgICAgIC8vIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coJ+S9v+eUqOaXp+eahOmfs+S5kCcpXG4gICAgICB0aGlzLmF1ZGlvc1tudW1dLnJld2luZCgpXG4gICAgICB0aGlzLmF1ZGlvc1tudW1dLnBsYXkoKVxuICAgIH1cbiAgfSxcbiAgcGF1c2VCZygpIHtcbiAgICB0aGlzLmJnTXVzaWMucGF1c2UoKVxuICB9LFxuICByZXN1bWVCZygpIHtcbiAgICB0aGlzLmJnTXVzaWMucmVzdW1lKClcbiAgfSxcbiAgc3RhcnQoKSB7XG4gICAgLy8gdGhpcy5vblBsYXlBdWRpbygxKTtcbiAgfSxcbiAgY2hlY2tCZygpIHtcblxuICB9LFxuICBvbldpbigpIHtcbiAgICB0aGlzLndpbkF1ZGlvLnJld2luZCgpXG4gICAgdGhpcy53aW5BdWRpby5wbGF5KClcbiAgfSxcblxuICBvbkRvdWJsZSgpIHtcbiAgICB0aGlzLmRvdWJsZUF1ZGlvLnJld2luZCgpXG4gICAgdGhpcy5kb3VibGVBdWRpby5wbGF5KClcbiAgfSxcblxuICBvbkJvb20oKSB7XG4gICAgdGhpcy5ib29tQXVkaW8ucmV3aW5kKClcbiAgICB0aGlzLmJvb21BdWRpby5wbGF5KClcbiAgfSxcbiAgb25NYWdpYygpIHtcbiAgICB0aGlzLm1hZ2ljQXVkaW8ucmV3aW5kKClcbiAgICB0aGlzLm1hZ2ljQXVkaW8ucGxheSgpXG4gIH0sXG59KTsiXX0=