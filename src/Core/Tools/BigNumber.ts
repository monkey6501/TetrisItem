class BigNumber {

	public base: number;

	public power: number;

	public constructor(param1: Object = 0, param2: number = 0, param3: number = -1) {
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
			this.base = (param1 as BigNumber).base;
			this.power = (param1 as BigNumber).power;
		}
		else {
			this.base = 0;
			this.power = 0;
		}
	}

	/**数字转换为BigNumber */
	public fromFloat(param1: number): void {
		let self = this;
		self.base = param1;
		self.power = 0;
		self.normalize();
	}

	/**科学计算法的字符串转换为BigNumber */
	public fromString(param1: string): void {
		let temNumber: string[] = param1.split("e");
		this.base = Number(temNumber[0]);
		temNumber.splice(0, 1);
		this.power = Number(temNumber.join("e"));
		this.normalize();
	}

	/** bigNumber规范化 */
	public normalize(): void {
		let self = this;
		let tem: number;
		if (self.base == 0) {
			self.power = 0;
			return;
		}
		let base: number = Math.abs(self.base);
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
	}

	public static copy(param1: BigNumber): BigNumber {
		let tem: BigNumber = new BigNumber(0);
		tem.base = param1.base;
		tem.power = param1.power;
		return tem;
	}

	public static clone(param1: BigNumber): BigNumber {
		return BigNumber.copy(param1);
	}

	public toString(): string {
		let self = this;
		let tem3: number;
		let tem1: number = self.base;
		let tem2: number = self.power;
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
	}

	/** 返回一个base保留小数点后几位,默认3位 ---不改变this - */
	public toFixed(param1: number = 3): string {
		let self = this;
		let needStr: string = "";
		let len: number = 0;
		let selfStr: string[] = self.toString().split("e");
		let tem: string[] = selfStr[0].split(".");
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
	}

	public static charNumber: boolean = false;
	public toRoundShow(): string {
		let self = this;
		let tem3: number;
		let tem: BigNumber = BigNumber.copy(self);
		tem.normalize();
		let tem1: number = tem.base;
		let tem2: number = tem.power;
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
			return BigNumber.toCharNumber(tem)
		} else {
			return tem.toFixed();
		}
	}

	/** 返回一个正常数字 --不改变this */
	public numberValue(): number {
		let self = this;
		return self.base * Math.pow(10, self.power);
	}

	/**获取大的BigNumber */
	public static max(param1: BigNumber, param2: BigNumber): BigNumber {
		if (param1.biggerEqualThan(param2)) {
			return param1;
		}
		return param2;
	}

	/**获取小的的BigNumber */
	public static min(param1: BigNumber, param2: BigNumber): BigNumber {
		if (param1.smallerEqualThan(param2)) {
			return param1;
		}
		return param2;
	}

	/**当前BigNumber是否大于等于param1 */
	public biggerEqualThan(param1: BigNumber): boolean {
		let self = this;
		let tem: number = 0;
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
	}

	/**当前BigNumber是否大于param1 */
	public biggerThan(param1: BigNumber): boolean {
		let self = this;
		let tem: number = 0;
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
	}

	/**当前BigNumber是否大于param1---和number类型比较 */
	public biggerThanOfNumber(param1: number): boolean {
		let self = this;
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
	}

	/**当前BigNumber是否大于等于param1---和number类型比较 */
	public biggerEqualThanOfNumber(param1: number): boolean {
		let self = this;
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
	}

	/**当前BigNumber是否小于等于param1 */
	public smallerEqualThan(param1: BigNumber): boolean {
		let self = this;
		let tem: number;
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
	}

	/**当前BigNumber是否小于param1 */
	public smallerThan(param1: BigNumber): boolean {
		let self = this;
		let tem: number;
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
	}

	/**当前BigNumber是否小于param1 --和number类型比较 */
	public smallerThanOfNumber(param1: number): boolean {
		let self = this;
		return self.smallerThan(new BigNumber(param1));
	}

	/**当前BigNumber是否小于等于param1 --和number类型比较*/
	public smallerEqualThanOfNumber(param1: number): boolean {
		let self = this;
		return self.smallerEqualThan(new BigNumber(param1));
	}

	/**取反 */
	public negate(): BigNumber {
		let self = this;
		let tem: BigNumber = BigNumber.copy(self);
		tem.base = -1 * self.base;
		return tem;
	}

	/**加上BigNumber类型,返回相加结果--不改变this */
	public add(param1: BigNumber): BigNumber {
		let self = this;
		let baseAdd: number;
		let res: BigNumber = BigNumber.copy(self);
		let powerGap: number = res.power - param1.power;
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
	}

	/**加上number类型,返回相加结果--不改变this */
	public addN(param1: number): BigNumber {
		let self = this;
		return self.add(new BigNumber(param1));
	}

	/**加上BigNumber类型,直接加到this上--改变this */
	public plusEquals(param1: BigNumber): void {
		let self = this;
		let baseAdd: number;
		let powerGap: number = self.power - param1.power;
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
	}

	/**减去BigNumber类型,直接减掉this--改变this */
	public minusEquals(param1: BigNumber): void {
		let self = this;
		let baseAdd: number;
		let powerGap: number = self.power - param1.power;
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
	}

	/**减去BigNumber类型,返回相减结果--不改变this */
	public subtract(param1: BigNumber): BigNumber {
		let self = this;
		let tem: BigNumber = BigNumber.copy(param1);
		tem.base = -tem.base;
		return self.add(tem);
	}

	/**乘以BigNumber类型,返回相乘结果--不改变this */
	public multiply(param1: BigNumber): BigNumber {
		let self = this;
		let tem: BigNumber = BigNumber.copy(self);
		tem.base = tem.base * param1.base;
		tem.power = tem.power + param1.power;
		tem.normalize();
		return tem;
	}

	/**乘以BigNumber类型,直接乘this--改变this */
	public timesEquals(param1: BigNumber): void {
		let self = this;
		self.base = self.base * param1.base;
		self.power = self.power + param1.power;
		self.normalize();
	}

	/**乘以number类型,返回相乘结果--不改变this */
	public multiplyN(param1: number): BigNumber {
		let self = this;
		let tem: BigNumber = BigNumber.copy(self);
		tem.base = tem.base * param1;
		tem.normalize();
		return tem;
	}

	/**乘以number类型,直接乘this--改变this */
	public timesEqualsN(param1: number): void {
		let self = this;
		self.base = self.base * param1;
		self.normalize();
	}

	/**除以BigNumber类型,返回相除结果--不改变this */
	public divide(param1: BigNumber): BigNumber {
		let self = this;
		let copyThis: BigNumber = BigNumber.copy(self);
		let temBase: number = copyThis.base / param1.base;
		if (temBase < 10000) {
			temBase = temBase * 10000;
			copyThis.power = copyThis.power - 4;
		}
		copyThis.base = temBase;
		copyThis.power = copyThis.power - param1.power;
		copyThis.normalize();
		return copyThis;
	}

	/**除以number类型,返回相除结果--不改变this */
	public divideN(param1: number): BigNumber {
		let self = this;
		return self.divide(new BigNumber(param1));
	}

	/** 开平方根，返回结果--不改变this */
	public sqrt(): BigNumber {
		let self = this;
		let copyThis: BigNumber = BigNumber.copy(self);
		if (copyThis.power % 2 != 0) {
			copyThis.power = copyThis.power - 1;
			copyThis.base = copyThis.base * 10;
		}
		copyThis.base = Math.sqrt(copyThis.base);
		copyThis.power = copyThis.power / 2;
		copyThis.normalize();
		return copyThis;
	}

	/** param1次方，返回结果--不改变this */
	public pow(param1: number): BigNumber {
		let self = this;
		let copyThis: BigNumber = BigNumber.copy(self);
		let tem: BigNumber = new BigNumber(1);
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
	}

	/** 加上this%，返回结果--不改变this */
	public percentIncreaseToMultiplier(): BigNumber {
		let self = this;
		return self.multiplyN(0.01).addN(1);
	}

	/**是否相等 */
	public equal(param1: BigNumber): boolean {
		let self = this;
		if (self.power != param1.power) {
			return false;
		}
		if (self.base == param1.base) {
			return true;
		}
		return false;
	}

	/**是否相等，和number类型比较 */
	public equalOfNumber(param1: number): boolean {
		let self = this;
		return self.equal(new BigNumber(param1));
	}

	/**向下取整，用于指数小于15--不改变this */
	public floor(): BigNumber {
		let self = this;
		let tem: number;
		let copyThis: BigNumber = BigNumber.copy(self);
		if (copyThis.power < 15) {
			tem = copyThis.power;
			copyThis.base = copyThis.base * Math.pow(10, tem);
			copyThis.power = copyThis.power - tem;
			copyThis.base = Math.floor(copyThis.base);
			copyThis.normalize();
		}
		return copyThis;
	}

	/**向上取整，用于指数小于15--不改变this */
	public ceil(): BigNumber {
		let self = this;
		let tem: number;
		let copyThis: BigNumber = BigNumber.copy(self);
		if (copyThis.power < 15) {
			tem = copyThis.power;
			copyThis.base = copyThis.base * Math.pow(10, tem);
			copyThis.power = copyThis.power - tem;
			copyThis.base = Math.ceil(copyThis.base);
			copyThis.normalize();
		}
		return copyThis;
	}

	/**返回一个四舍五入的值--不改变this */
	public round(): BigNumber {
		let self = this;
		let copyThis: BigNumber = BigNumber.copy(self);
		let tem: BigNumber = copyThis.floor();
		if (copyThis.subtract(tem).biggerThanOfNumber(0.5)) {
			return copyThis.ceil();
		}
		return tem;
	}

	public static charFour: string[] = ["K", "M", "B", "T"];
	public static lettersCount: number = 26;
	public static totalChar: number = 82;
	public static toCharNumber(param1: any): string {
		let charNumber: string = "";
		let _char1: string = "";
		let _char2: string = "";
		let _char: string = "";
		let index: number = 0;
		if (typeof param1 == "number") {
			let copyN: number = Number(param1);
			let copyNStr = Math.round(copyN).toString();
			if (copyNStr.length > 5 + BigNumber.totalChar * 3) {
				charNumber = new BigNumber(copyN).toFixed();
			} else {
				if (copyNStr.length <= 5) {
					charNumber = copyNStr;
				}
				else {
					index = Math.ceil((copyNStr.length - 5) / 3);
					// let _char = ObjectUtils.chars[index - 1];
					_char = BigNumber.transformChar(index);
					let head: string = copyNStr.substr(0, copyNStr.length - index * 3);
					charNumber = BigNumber.headAdd(head) + _char;
				}
			}
		} else {
			let copyBig: BigNumber = BigNumber.copy(param1 as BigNumber);
			copyBig.normalize();
			if (copyBig.power > 4 + BigNumber.totalChar * 3) {
				charNumber = copyBig.toFixed();
			} else {
				let power: number = copyBig.power;
				while (power > 4) {
					power -= 3;
					index++;
				}
				if (index == 0) {
					charNumber = String(Math.floor(copyBig.base * Math.pow(10, power)));
				}
				else {
					_char = BigNumber.transformChar(index);
					let head1: string = String(Math.floor(copyBig.base * Math.pow(10, power)))
					charNumber = BigNumber.headAdd(head1) + _char;
				}
			}
		}
		return charNumber;
	}

	private static transformChar(index: number): string {
		let _char1: string = "";
		let _char2: string = "";
		let _char: string = "";
		if (index <= BigNumber.charFour.length) {
			_char = BigNumber.charFour[index - 1];
		} else {
			let newIndex: number = index - BigNumber.charFour.length - 1;
			let charChange: number = 0;
			if (newIndex < BigNumber.lettersCount) {
				charChange = 97;//97-122
			} else {
				charChange = 65;//65-90
			}
			_char1 = String.fromCharCode(newIndex % BigNumber.lettersCount + charChange);
			if (newIndex < BigNumber.lettersCount * 2 && newIndex >= BigNumber.lettersCount) {
				_char2 = _char1.toLowerCase();
			} else {
				_char2 = _char1;
			}
			_char = _char1 + _char2;
		}
		return _char;
	}

	private static headAdd(head: string): string {
		let result: string = head;
		let len: number = result.length;
		let arr: string[];
		if (len > 3) {
			arr = result.split("");
			arr.splice(len - 3, 0, ",")
			result = arr.join("");
		}
		return result;
	}
}