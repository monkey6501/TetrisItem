class ObjectUtils {
    public constructor() {
    }
    public static BASETYPES = ["boolean", "number", "string", "null"];

    public static BIGNUMBERKEY = ["baseCost", "baseAttack", "baseLife"]
    /**
     * 拷贝数据
     * @param obj			需要赋值的对象
     * @param value			拥有数据的对象
     */
    public static copyValue(obj: Object, value: Object): void {
        for (var key in value) {
            var attrValue = value[key];
            var attrType: string = egret.getQualifiedClassName(attrValue);
            var baseType: boolean = this.isBaseType(value[key]);
            if (baseType) {
                obj[key] = value[key];
            }
            else {
                this.copyValue(obj[key], value[key]);
            }
        }
    }

    /**
     * 拷贝数据 ---- BIGNUMBERKEY 里面的数据特殊处理
     * @param obj			需要赋值的对象
     * @param value			拥有数据的对象
     */
    public static copyValue1(obj: Object, value: Object): void {
        for (var key in value) {
            var attrValue = value[key];
            var attrType: string = egret.getQualifiedClassName(attrValue);
            var baseType: boolean = this.isBaseType(value[key]);
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
    }

    /**
     * 判断对象是否为基础类型
     * @param obj			对象
     * @return				true为基础类型，false为复杂类型
     */
    public static isBaseType(obj: Object): boolean {
        var type: string = egret.getQualifiedClassName(obj);
        var index: number = ObjectUtils.BASETYPES.indexOf(type);
        return index != -1;
    }

    public static removeFromArray(target: any, array: any[]): any[] {
        let index = array.indexOf(target);
        if (index >= 0) array.splice(index, 1);
        return array;
    }

    public static getRandomFromIn(array: number[]): number {
        if (array == null || array.length < 1) {
            return 0;
        }
        let random: number = array[0] + Math.random() * (array[1] - array[0]);
        let index: number = Math.floor(random);
        return index;
    }

    public static getRandomStr(str: string, strSplit: string = "#"): string {
        let arr: string[] = str.split(strSplit);
        return ObjectUtils.getRandomItem(arr);
    }

    public static getRandomItem(array: any[]): any {
        if (array == null || array.length < 1) {
            return null;
        }
        let random: number = Math.random() * array.length
        let index: number = Math.floor(random);
        return array[index];
    }

    public static shuffle(arr: any[]): void {
        let len: number = arr.length;
        let i: number = len;
        while (i--) {
            let ran: number = Math.floor(Math.random() * len);
            if (i != ran) {
                let tem: any = arr[i];
                arr[i] = arr[ran];
                arr[ran] = tem;
            }
        }
    }

    public static charExchange(nums: string): string {
        let newNums: string = nums;
        let result: string = "";
        for (let i: number = 0; i < newNums.length; i++) {
            let str: string = newNums.substr(i, 1);
        }
        return newNums;
    }

    public static disposeArray(arr: any[]): void {

    }

    public static splitToString(value, sprelator: string = ","): any[] {
        let result: string[] = [];
        let sArray: string[] = value.split(sprelator);
        for (let i: number = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    }

    public static updateUrl(url, key = "t") {
        var reg = new RegExp(key + '\\d+');  //正则：t=1472286066028
        var timestamp = +new Date();
        if (url.indexOf(key) > -1) { //有时间戳，直接更新
            return url.replace(reg, key + timestamp);
        } else {  //没有时间戳，加上时间戳
            if (url.indexOf('\?') > -1) {
                var urlArr = url.split('\?');
                if (urlArr[1]) {
                    return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
                } else {
                    return urlArr[0] + '?' + key + timestamp;
                }
            } else {
                if (url.indexOf('#') > -1) {
                    return url.split('#')[0] + '?' + key + timestamp + location.hash;
                } else {
                    return url + '?' + key + timestamp;
                }
            }
        }
    }
}