var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    /**
     * 拷贝数据
     * @param obj			需要赋值的对象
     * @param value			拥有数据的对象
     */
    ObjectUtils.copyValue = function (obj, value) {
        for (var key in value) {
            var attrValue = value[key];
            var attrType = egret.getQualifiedClassName(attrValue);
            var baseType = this.isBaseType(value[key]);
            if (baseType) {
                obj[key] = value[key];
            }
            else {
                this.copyValue(obj[key], value[key]);
            }
        }
    };
    /**
     * 拷贝数据 ---- BIGNUMBERKEY 里面的数据特殊处理
     * @param obj			需要赋值的对象
     * @param value			拥有数据的对象
     */
    ObjectUtils.copyValue1 = function (obj, value) {
        for (var key in value) {
            var attrValue = value[key];
            var attrType = egret.getQualifiedClassName(attrValue);
            var baseType = this.isBaseType(value[key]);
            if (ObjectUtils.BIGNUMBERKEY.indexOf(key) != -1) {
                obj[key] = new BigNumber(value[key]);
            }
            else if (baseType) {
                obj[key] = value[key];
            }
            else {
                this.copyValue1(obj[key], value[key]);
            }
        }
    };
    /**
     * 判断对象是否为基础类型
     * @param obj			对象
     * @return				true为基础类型，false为复杂类型
     */
    ObjectUtils.isBaseType = function (obj) {
        var type = egret.getQualifiedClassName(obj);
        var index = ObjectUtils.BASETYPES.indexOf(type);
        return index != -1;
    };
    ObjectUtils.removeFromArray = function (target, array) {
        var index = array.indexOf(target);
        if (index >= 0)
            array.splice(index, 1);
        return array;
    };
    ObjectUtils.getRandomFromIn = function (array) {
        if (array == null || array.length < 1) {
            return 0;
        }
        var random = array[0] + Math.random() * (array[1] - array[0]);
        var index = Math.floor(random);
        return index;
    };
    ObjectUtils.getRandomStr = function (str, strSplit) {
        if (strSplit === void 0) { strSplit = "#"; }
        var arr = str.split(strSplit);
        return ObjectUtils.getRandomItem(arr);
    };
    ObjectUtils.getRandomItem = function (array) {
        if (array == null || array.length < 1) {
            return null;
        }
        var random = Math.random() * array.length;
        var index = Math.floor(random);
        return array[index];
    };
    ObjectUtils.shuffle = function (arr) {
        var len = arr.length;
        var i = len;
        while (i--) {
            var ran = Math.floor(Math.random() * len);
            if (i != ran) {
                var tem = arr[i];
                arr[i] = arr[ran];
                arr[ran] = tem;
            }
        }
    };
    ObjectUtils.charExchange = function (nums) {
        var newNums = nums;
        var result = "";
        for (var i = 0; i < newNums.length; i++) {
            var str = newNums.substr(i, 1);
        }
        return newNums;
    };
    ObjectUtils.disposeArray = function (arr) {
    };
    ObjectUtils.splitToString = function (value, sprelator) {
        if (sprelator === void 0) { sprelator = ","; }
        var result = [];
        var sArray = value.split(sprelator);
        for (var i = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    };
    ObjectUtils.updateUrl = function (url, key) {
        if (key === void 0) { key = "t"; }
        var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028
        var timestamp = +new Date();
        if (url.indexOf(key) > -1) {
            return url.replace(reg, key + timestamp);
        }
        else {
            if (url.indexOf('\?') > -1) {
                var urlArr = url.split('\?');
                if (urlArr[1]) {
                    return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
                }
                else {
                    return urlArr[0] + '?' + key + timestamp;
                }
            }
            else {
                if (url.indexOf('#') > -1) {
                    return url.split('#')[0] + '?' + key + timestamp + location.hash;
                }
                else {
                    return url + '?' + key + timestamp;
                }
            }
        }
    };
    ObjectUtils.BASETYPES = ["boolean", "number", "string", "null"];
    ObjectUtils.BIGNUMBERKEY = ["baseCost", "baseAttack", "baseLife"];
    return ObjectUtils;
}());
__reflect(ObjectUtils.prototype, "ObjectUtils");
//# sourceMappingURL=ObjectUtils.js.map