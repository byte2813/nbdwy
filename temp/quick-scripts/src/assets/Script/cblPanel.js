"use strict";
cc._RF.push(module, 'ac1ddb+2MNKLrlRLySYaEER', 'cblPanel');
// Script/cblPanel.ts

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
    NewClass.prototype.buttonCancelFunc = function (event) {
        this.node.destroy();
    };
    NewClass.prototype.buttonConfirmFunc = function (event) {
        var _this = this;
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            tt.navigateToScene({
                scene: "sidebar",
                success: function (res) {
                    console.log("navigate to scene success");
                    // 跳转成功回调逻辑
                },
                fail: function (res) {
                    console.log("navigate to scene fail: ", res);
                    // 跳转失败回调逻辑
                },
                complete: function (res) {
                    _this.node.destroy();
                }
            });
        }
    };
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "cancelButton", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "confirmButton", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();