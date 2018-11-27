var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BigNumber = (function () {
    function BigNumber(param1, param2, param3) {
        if (param1 === void 0) { param1 = 0; }
        if (param2 === void 0) { param2 = 0; }
        if (param3 === void 0) { param3 = -1; }
        if (typeof param1 == "number") {
            if (param1 == 0) {
                this.base = 0;
                this.power = 0;
            }
            else {
                this.fromFloat(param1);
            }
        }
        else if (typeof param1 == "string") {
            this.fromString(param1);
        }
        else if (param1 instanceof BigNumber) {
            this.base = param1.base;
            this.power = param1.power;
        }
        else {
            this.base = 0;
            this.power = 0;
        }
    }
    /**数字转换为BigNumber */
    BigNumber.prototype.fromFloat = function (param1) {
        var self = this;
        self.base = param1;
        self.power = 0;
        self.normalize();
    };
    /**科学计算法的字符串转换为BigNumber */
    BigNumber.prototype.fromString = function (param1) {
        var temNumber = param1.split("e");
        this.base = Number(temNumber[0]);
        temNumber.splice(0, 1);
        this.power = Number(temNumber.join("e"));
        this.normalize();
    };
    /** bigNumber规范化 */
    BigNumber.prototype.normalize = function () {
        var self = this;
        var tem;
        if (self.base == 0) {
            self.power = 0;
            return;
        }
        var base = Math.abs(self.base);
        if (base >= 10) {
            tem = Math.floor(Math.log(base) / Math.log(10));
            self.base = self.base / Math.pow(10, tem);
            self.power = self.power + tem;
        }
        else if (base < 1) {
            tem = 0 - Math.floor(Math.log(base) / Math.log(10));
            self.base = self.base * Math.pow(10, tem);
            self.power = self.power - tem;
        }
    };
    BigNumber.copy = function (param1) {
        var tem = new BigNumber(0);
        tem.base = param1.base;
        tem.power = param1.power;
        return tem;
    };
    BigNumber.clone = function (param1) {
        return BigNumber.copy(param1);
    };
    BigNumber.prototype.toString = function () {
        var self = this;
        var tem3;
        var tem1 = self.base;
        var tem2 = self.power;
        if (tem2 < 5 && tem2 >= 0) {
            while (tem2 > 0) {
                tem1 = tem1 * 10;
                tem2--;
            }
            tem3 = tem1;
            self.normalize();
            return tem3.toString();
        }
        if (tem2 > -5 && tem2 < 0) {
            while (tem2 < 0) {
                tem1 = tem1 / 10;
                tem2++;
            }
            tem3 = tem1;
            self.normalize();
            return tem3.toString();
        }
        return tem1.toString() + "e" + tem2.toString();
    };
    /** 返回一个base保留小数点后几位,默认3位 ---不改变this - */
    BigNumber.prototype.toFixed = function (param1) {
        if (param1 === void 0) { param1 = 3; }
        var self = this;
        var needStr = "";
        var len = 0;
        var selfStr = self.toString().split("e");
        var tem = selfStr[0].split(".");
        if (tem[1]) {
            if (tem[1].length < param1) {
                len = tem[1].length;
                // while (len < param1) {
                // 	tem[1] = tem[1] + "0";
                // 	len++;
                // }
                tem[1] = tem[1].substr(0, len);
            }
            else {
                len = param1;
                while (tem[1].substr(len - 1, 1) == "0") {
                    len--;
                }
                tem[1] = tem[1].substr(0, len);
            }
        }
        if (selfStr[1]) {
            selfStr[0] = !!tem[1] ? tem.join(".") : tem[0];
            needStr = selfStr.join("e");
        }
        else {
            needStr = !!tem[1] ? tem.join(".") : tem[0];
        }
        return needStr;
    };
    BigNumber.prototype.toRoundShow = function () {
        var self = this;
        var tem3;
        var tem = BigNumber.copy(self);
        tem.normalize();
        var tem1 = tem.base;
        var tem2 = tem.power;
        if (tem2 < 5 && tem2 >= 0) {
            while (tem2 > 0) {
                tem1 = tem1 * 10;
                tem2--;
            }
            tem3 = Math.round(tem1);
            return tem3.toString();
        }
        if (tem2 > -5 && tem2 < 0) {
            while (tem2 < 0) {
                tem1 = tem1 / 10;
                tem2++;
            }
            tem3 = tem1;
            return tem3.toFixed(3);
        }
        if (BigNumber.charNumber) {
            return BigNumber.toCharNumber(tem);
        }
        else {
            return tem.toFixed();
        }
    };
    /** 返回一个正常数字 --不改变this */
    BigNumber.prototype.numberValue = function () {
        var self = this;
        return self.base * Math.pow(10, self.power);
    };
    /**获取大的BigNumber */
    BigNumber.max = function (param1, param2) {
        if (param1.biggerEqualThan(param2)) {
            return param1;
        }
        return param2;
    };
    /**获取小的的BigNumber */
    BigNumber.min = function (param1, param2) {
        if (param1.smallerEqualThan(param2)) {
            return param1;
        }
        return param2;
    };
    /**当前BigNumber是否大于等于param1 */
    BigNumber.prototype.biggerEqualThan = function (param1) {
        var self = this;
        var tem = 0;
        if (self.base == 0) {
            return param1.base <= 0;
        }
        if (param1.base == 0) {
            return self.base >= 0;
        }
        if (self.base < 0 != param1.base < 0) {
            return self.base > param1.base;
        }
        tem = self.base > 0 ? 1 : -1;
        if (tem * self.power < tem * param1.power) {
            return false;
        }
        if (self.power == param1.power) {
            return self.base >= param1.base;
        }
        return true;
    };
    /**当前BigNumber是否大于param1 */
    BigNumber.prototype.biggerThan = function (param1) {
        var self = this;
        var tem = 0;
        if (self.base == 0) {
            return param1.base < 0;
        }
        if (param1.base == 0) {
            return self.base > 0;
        }
        if (self.base < 0 != param1.base < 0) {
            return self.base > param1.base;
        }
        tem = self.base > 0 ? 1 : -1;
        if (tem * self.power < tem * param1.power) {
            return false;
        }
        if (self.power == param1.power) {
            return self.base > param1.base;
        }
        return true;
    };
    /**当前BigNumber是否大于param1---和number类型比较 */
    BigNumber.prototype.biggerThanOfNumber = function (param1) {
        var self = this;
        if (param1 == 0) {
            return self.base > 0;
        }
        if (self.base == 0) {
            return param1 < 0;
        }
        if (self.base < 0 != param1 < 0) {
            return self.base > param1;
        }
        return self.biggerThan(new BigNumber(param1));
    };
    /**当前BigNumber是否大于等于param1---和number类型比较 */
    BigNumber.prototype.biggerEqualThanOfNumber = function (param1) {
        var self = this;
        if (self.base == 0) {
            return param1 <= 0;
        }
        if (param1 == 0) {
            return self.base >= 0;
        }
        if (self.base < 0 != param1 < 0) {
            return self.base > param1;
        }
        return self.biggerEqualThan(new BigNumber(param1));
    };
    /**当前BigNumber是否小于等于param1 */
    BigNumber.prototype.smallerEqualThan = function (param1) {
        var self = this;
        var tem;
        if (self.base == 0) {
            return param1.base >= 0;
        }
        if (param1.base == 0) {
            return self.base <= 0;
        }
        if (self.base < 0 != param1.base < 0) {
            return self.base < param1.base;
        }
        tem = self.base > 0 ? 1 : -1;
        if (tem * self.power > tem * param1.power) {
            return false;
        }
        if (self.power == param1.power) {
            return self.base <= param1.base;
        }
        return true;
    };
    /**当前BigNumber是否小于param1 */
    BigNumber.prototype.smallerThan = function (param1) {
        var self = this;
        var tem;
        if (self.base == 0) {
            return param1.base > 0;
        }
        if (param1.base == 0) {
            return self.base < 0;
        }
        if (self.base < 0 != param1.base < 0) {
            return self.base < param1.base;
        }
        tem = self.base > 0 ? 1 : -1;
        if (tem * self.power > tem * param1.power) {
            return false;
        }
        if (self.power == param1.power) {
            return self.base < param1.base;
        }
        return true;
    };
    /**当前BigNumber是否小于param1 --和number类型比较 */
    BigNumber.prototype.smallerThanOfNumber = function (param1) {
        var self = this;
        return self.smallerThan(new BigNumber(param1));
    };
    /**当前BigNumber是否小于等于param1 --和number类型比较*/
    BigNumber.prototype.smallerEqualThanOfNumber = function (param1) {
        var self = this;
        return self.smallerEqualThan(new BigNumber(param1));
    };
    /**取反 */
    BigNumber.prototype.negate = function () {
        var self = this;
        var tem = BigNumber.copy(self);
        tem.base = -1 * self.base;
        return tem;
    };
    /**加上BigNumber类型,返回相加结果--不改变this */
    BigNumber.prototype.add = function (param1) {
        var self = this;
        var baseAdd;
        var res = BigNumber.copy(self);
        var powerGap = res.power - param1.power;
        if (powerGap > 10) {
            return res;
        }
        if (powerGap < -10) {
            res.base = param1.base;
            res.power = param1.power;
            return res;
        }
        if (powerGap == 0) {
            res.base = res.base + param1.base;
            res.normalize();
            return res;
        }
        if (powerGap > 0) {
            res.base = res.base * Math.pow(10, powerGap);
            res.power = param1.power;
            res.base = res.base + param1.base;
            res.normalize();
            return res;
        }
        if (powerGap < 0) {
            baseAdd = param1.base * Math.pow(10, -powerGap);
            res.base = res.base + baseAdd;
            res.normalize();
            return res;
        }
        return res;
    };
    /**加上number类型,返回相加结果--不改变this */
    BigNumber.prototype.addN = function (param1) {
        var self = this;
        return self.add(new BigNumber(param1));
    };
    /**加上BigNumber类型,直接加到this上--改变this */
    BigNumber.prototype.plusEquals = function (param1) {
        var self = this;
        var baseAdd;
        var powerGap = self.power - param1.power;
        if (powerGap > 10) {
            return;
        }
        if (powerGap < -10) {
            self.base = param1.base;
            self.power = param1.power;
            return;
        }
        if (powerGap == 0) {
            self.base = self.base + param1.base;
            self.normalize();
            return;
        }
        if (powerGap > 0) {
            self.base = self.base * Math.pow(10, powerGap);
            self.power = param1.power;
            self.base = self.base + param1.base;
            self.normalize();
            return;
        }
        if (powerGap < 0) {
            baseAdd = param1.base * Math.pow(10, -powerGap);
            self.base = self.base + baseAdd;
            self.normalize();
            return;
        }
    };
    /**减去BigNumber类型,直接减掉this--改变this */
    BigNumber.prototype.minusEquals = function (param1) {
        var self = this;
        var baseAdd;
        var powerGap = self.power - param1.power;
        if (powerGap > 10) {
            return;
        }
        if (powerGap < -10) {
            self.base = -param1.base;
            self.power = param1.power;
            return;
        }
        if (powerGap == 0) {
            self.base = self.base - param1.base;
            self.normalize();
            return;
        }
        if (powerGap > 0) {
            self.base = self.base * Math.pow(10, powerGap);
            self.power = param1.power;
            self.base = self.base - param1.base;
            self.normalize();
            return;
        }
        if (powerGap < 0) {
            baseAdd = param1.base * Math.pow(10, -powerGap);
            self.base = self.base - baseAdd;
            self.normalize();
            return;
        }
    };
    /**减去BigNumber类型,返回相减结果--不改变this */
    BigNumber.prototype.subtract = function (param1) {
        var self = this;
        var tem = BigNumber.copy(param1);
        tem.base = -tem.base;
        return self.add(tem);
    };
    /**乘以BigNumber类型,返回相乘结果--不改变this */
    BigNumber.prototype.multiply = function (param1) {
        var self = this;
        var tem = BigNumber.copy(self);
        tem.base = tem.base * param1.base;
        tem.power = tem.power + param1.power;
        tem.normalize();
        return tem;
    };
    /**乘以BigNumber类型,直接乘this--改变this */
    BigNumber.prototype.timesEquals = function (param1) {
        var self = this;
        self.base = self.base * param1.base;
        self.power = self.power + param1.power;
        self.normalize();
    };
    /**乘以number类型,返回相乘结果--不改变this */
    BigNumber.prototype.multiplyN = function (param1) {
        var self = this;
        var tem = BigNumber.copy(self);
        tem.base = tem.base * param1;
        tem.normalize();
        return tem;
    };
    /**乘以number类型,直接乘this--改变this */
    BigNumber.prototype.timesEqualsN = function (param1) {
        var self = this;
        self.base = self.base * param1;
        self.normalize();
    };
    /**除以BigNumber类型,返回相除结果--不改变this */
    BigNumber.prototype.divide = function (param1) {
        var self = this;
        var copyThis = BigNumber.copy(self);
        var temBase = copyThis.base / param1.base;
        if (temBase < 10000) {
            temBase = temBase * 10000;
            copyThis.power = copyThis.power - 4;
        }
        copyThis.base = temBase;
        copyThis.power = copyThis.power - param1.power;
        copyThis.normalize();
        return copyThis;
    };
    /**除以number类型,返回相除结果--不改变this */
    BigNumber.prototype.divideN = function (param1) {
        var self = this;
        return self.divide(new BigNumber(param1));
    };
    /** 开平方根，返回结果--不改变this */
    BigNumber.prototype.sqrt = function () {
        var self = this;
        var copyThis = BigNumber.copy(self);
        if (copyThis.power % 2 != 0) {
            copyThis.power = copyThis.power - 1;
            copyThis.base = copyThis.base * 10;
        }
        copyThis.base = Math.sqrt(copyThis.base);
        copyThis.power = copyThis.power / 2;
        copyThis.normalize();
        return copyThis;
    };
    /** param1次方，返回结果--不改变this */
    BigNumber.prototype.pow = function (param1) {
        var self = this;
        var copyThis = BigNumber.copy(self);
        var tem = new BigNumber(1);
        if (param1 == 0) {
            return tem;
        }
        if (param1 < 0) {
            copyThis = tem.divide(copyThis);
            param1 = -param1;
        }
        while (param1 > 1) {
            if (param1 % 2 == 0) {
                copyThis.base = copyThis.base * copyThis.base;
                copyThis.power = copyThis.power + copyThis.power;
                copyThis.normalize();
                param1 = param1 / 2;
            }
            else {
                tem.base = copyThis.base * tem.base;
                tem.power = copyThis.power + tem.power;
                tem.normalize();
                copyThis.base = copyThis.base * copyThis.base;
                copyThis.power = copyThis.power + copyThis.power;
                copyThis.normalize();
                param1 = (param1 - 1) / 2;
            }
        }
        copyThis.base = copyThis.base * tem.base;
        copyThis.power = copyThis.power + tem.power;
        copyThis.normalize();
        return copyThis;
    };
    /** 加上this%，返回结果--不改变this */
    BigNumber.prototype.percentIncreaseToMultiplier = function () {
        var self = this;
        return self.multiplyN(0.01).addN(1);
    };
    /**是否相等 */
    BigNumber.prototype.equal = function (param1) {
        var self = this;
        if (self.power != param1.power) {
            return false;
        }
        if (self.base == param1.base) {
            return true;
        }
        return false;
    };
    /**是否相等，和number类型比较 */
    BigNumber.prototype.equalOfNumber = function (param1) {
        var self = this;
        return self.equal(new BigNumber(param1));
    };
    /**向下取整，用于指数小于15--不改变this */
    BigNumber.prototype.floor = function () {
        var self = this;
        var tem;
        var copyThis = BigNumber.copy(self);
        if (copyThis.power < 15) {
            tem = copyThis.power;
            copyThis.base = copyThis.base * Math.pow(10, tem);
            copyThis.power = copyThis.power - tem;
            copyThis.base = Math.floor(copyThis.base);
            copyThis.normalize();
        }
        return copyThis;
    };
    /**向上取整，用于指数小于15--不改变this */
    BigNumber.prototype.ceil = function () {
        var self = this;
        var tem;
        var copyThis = BigNumber.copy(self);
        if (copyThis.power < 15) {
            tem = copyThis.power;
            copyThis.base = copyThis.base * Math.pow(10, tem);
            copyThis.power = copyThis.power - tem;
            copyThis.base = Math.ceil(copyThis.base);
            copyThis.normalize();
        }
        return copyThis;
    };
    /**返回一个四舍五入的值--不改变this */
    BigNumber.prototype.round = function () {
        var self = this;
        var copyThis = BigNumber.copy(self);
        var tem = copyThis.floor();
        if (copyThis.subtract(tem).biggerThanOfNumber(0.5)) {
            return copyThis.ceil();
        }
        return tem;
    };
    BigNumber.toCharNumber = function (param1) {
        var charNumber = "";
        var _char1 = "";
        var _char2 = "";
        var _char = "";
        var index = 0;
        if (typeof param1 == "number") {
            var copyN = Number(param1);
            var copyNStr = Math.round(copyN).toString();
            if (copyNStr.length > 5 + BigNumber.totalChar * 3) {
                charNumber = new BigNumber(copyN).toFixed();
            }
            else {
                if (copyNStr.length <= 5) {
                    charNumber = copyNStr;
                }
                else {
                    index = Math.ceil((copyNStr.length - 5) / 3);
                    // let _char = ObjectUtils.chars[index - 1];
                    _char = BigNumber.transformChar(index);
                    var head = copyNStr.substr(0, copyNStr.length - index * 3);
                    charNumber = BigNumber.headAdd(head) + _char;
                }
            }
        }
        else {
            var copyBig = BigNumber.copy(param1);
            copyBig.normalize();
            if (copyBig.power > 4 + BigNumber.totalChar * 3) {
                charNumber = copyBig.toFixed();
            }
            else {
                var power = copyBig.power;
                while (power > 4) {
                    power -= 3;
                    index++;
                }
                if (index == 0) {
                    charNumber = String(Math.floor(copyBig.base * Math.pow(10, power)));
                }
                else {
                    _char = BigNumber.transformChar(index);
                    var head1 = String(Math.floor(copyBig.base * Math.pow(10, power)));
                    charNumber = BigNumber.headAdd(head1) + _char;
                }
            }
        }
        return charNumber;
    };
    BigNumber.transformChar = function (index) {
        var _char1 = "";
        var _char2 = "";
        var _char = "";
        if (index <= BigNumber.charFour.length) {
            _char = BigNumber.charFour[index - 1];
        }
        else {
            var newIndex = index - BigNumber.charFour.length - 1;
            var charChange = 0;
            if (newIndex < BigNumber.lettersCount) {
                charChange = 97; //97-122
            }
            else {
                charChange = 65; //65-90
            }
            _char1 = String.fromCharCode(newIndex % BigNumber.lettersCount + charChange);
            if (newIndex < BigNumber.lettersCount * 2 && newIndex >= BigNumber.lettersCount) {
                _char2 = _char1.toLowerCase();
            }
            else {
                _char2 = _char1;
            }
            _char = _char1 + _char2;
        }
        return _char;
    };
    BigNumber.headAdd = function (head) {
        var result = head;
        var len = result.length;
        var arr;
        if (len > 3) {
            arr = result.split("");
            arr.splice(len - 3, 0, ",");
            result = arr.join("");
        }
        return result;
    };
    BigNumber.charNumber = false;
    BigNumber.charFour = ["K", "M", "B", "T"];
    BigNumber.lettersCount = 26;
    BigNumber.totalChar = 82;
    return BigNumber;
}());
__reflect(BigNumber.prototype, "BigNumber");
