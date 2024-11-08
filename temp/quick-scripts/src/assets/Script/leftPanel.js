"use strict";
cc._RF.push(module, '19760R8qpdCFYlVX1z2Uzv2', 'leftPanel');
// Script/leftPanel.ts

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.addShortcut = function () {
        if (typeof ks !== 'undefined') {
            ks.addShortcut({
                success: function () {
                    console.log("添加桌面成功");
                },
                fail: function (err) {
                    if (err.code === -10005) {
                        console.log("暂不支持该功能");
                    }
                    else {
                        console.log("添加桌面失败", err.msg);
                    }
                },
            });
        }
    };
    NewClass.prototype.addCommonUse = function () {
        if (typeof ks !== 'undefined') {
            ks.addCommonUse({
                success: function () {
                    console.log("设为常用成功");
                },
                fail: function (err) {
                    if (err.code === -10005) {
                        console.log("暂不支持该功能");
                    }
                    else {
                        console.log("设为常用失败", err.msg);
                    }
                },
            });
        }
    };
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "shortcutBtn", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "commonUseBtn", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();