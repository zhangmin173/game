/**
 * 扩展字符串方法：正则
 * @return {[Boolean]} [返回布尔值]
 */
String.prototype.isMobile = function() {
	let reg = /^(1[3|4|5|7|8][0-9]\d{8})$/
	return reg.test(this)
}
String.prototype.isEmail = function() {
	let reg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	return reg.test(this);		
}
String.prototype.isNumber = function() {
	let reg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	return /^\+?[1-9][0-9]*$/.test(this);		
}


/**
 * 扩展数组方法：去重
 * @return {[array]} [返回数组中剩下的元素]
 */
Array.prototype.unique = function() {
	this.sort();
    let newArr = [this[0]];
    for(let i = 1; i < this.length; i++){
    	let len = newArr.length-1;
        if( this[i] !== newArr[len]){
            newArr.push(this[i]);
        }
    }
    return newArr;
}

/**
 * 扩展数组方法：删除指定元素
 * @return {[array]} [返回数组中剩下的元素]
 */
Array.prototype.remove = function(val) {
	let index = this.indexOf(val);
    while(index>-1){
        this.splice(index, 1);
        index = this.indexOf(val);
    }
    return this;
}

/**
 * 扩展数组方法：交集
 * @return {[array]} [返回数组中相同的元素]
 */
Array.prototype.intersect = function(arr) {
	let result = new Array(),
		obj = {},
		newArr = this.concat(arr);
    newArr.forEach( function(element, index) {
    	if (!obj[element]) {
            obj[element] = 1;
        } else {
            obj[element]++;
            if (obj[element] === 2) {
                result.push(element);
            }
        }
    });
    return result;
}

/**
 * 扩展数组方法：并集
 * @return {[array]} [返回数组中总共的元素]
 */
Array.prototype.union = function(arr) {
	let result = new Array(),
		obj = {},
		newArr = this.concat(arr);
    newArr.forEach( function(element, index) {
    	if (!obj[element]) {
            obj[element] = 1;
            result.push(element);
        }
    });
    return result;
}

/**
 * 扩展日期方法：格式化时间
 * @return {[string]} [返回格式化后的时间]
 */
Date.prototype.format = function(str,del1,del2) {
	let Y = this.getFullYear().toString(),
		M = ((this.getMonth()+1>9)?this.getMonth()+1:'0'+(this.getMonth()+1)).toString(),
		D = ((this.getDate()>9)?this.getDate():'0'+this.getDate()).toString(),
		h = this.getHours().toString(),
		m = this.getMinutes().toString(),
		s = this.getSeconds().toString();
	
	del1 = del1 || '-';
	del2 = del2 || ':';

	switch (str) {
		case 'yyyy-mm-dd':
			return Y + del1 + M + del1 + D;
			break;
		case 'yyyy-mm-dd hh:mm':
			return Y + del1 + M + del1 + D + ' ' + h + del2 + m;
			break;
		case 'yyyy-mm-dd hh:mm:ss':
			return Y + del1 + M + del1 + D + ' ' + h + del2 + m + del2 + s;
			break;
		case 'yy-mm-dd':
			Y = Y.substring(Y.length-2);
			return Y + del1 + M + del1 + D;
			break;
		case 'yy-mm-dd hh:mm':
			Y = Y.substring(Y.length-2);
			return Y + del1 + M + del1 + D + ' ' + h + del2 + m;
			break;
		case 'yy-mm-dd hh:mm:ss':
			Y = Y.substring(Y.length-2);
			return Y + del1 + M + del1 + D + ' ' + h + del2 + m + del2 + s;
			break;
		default:
			return Y + del1 + M + del1 + D + ' ' + h + del2 + m + del2 + s;
			break;
	}
}