/**
 * File: index.js
 * Type: Javascript Node module
 * Author: Chris Humboldt
 */

// Variables
var $webMonths = [{
	number: '01',
	name: 'january',
	nameShort: 'jan'
}, {
	number: '02',
	name: 'february',
	nameShort: 'feb'
}, {
	number: '03',
	name: 'march',
	nameShort: 'mar'
}, {
	number: '04',
	name: 'april',
	nameShort: 'apr'
}, {
	number: '05',
	name: 'may',
	nameShort: 'may'
}, {
	number: '06',
	name: 'june',
	nameShort: 'jun'
}, {
	number: '07',
	name: 'july',
	nameShort: 'jul'
}, {
	number: '08',
	name: 'august',
	nameShort: 'aug'
}, {
	number: '09',
	name: 'september',
	nameShort: 'sep'
}, {
	number: '10',
	name: 'october',
	nameShort: 'oct'
}, {
	number: '11',
	name: 'november',
	nameShort: 'nov'
}, {
	number: '12',
	name: 'december',
	nameShort: 'dec'
}];
var $webTypes = {
	extensions: ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
	images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
};

module.exports = {
	exists: function($element) {
		return ($element === null || typeof($element) === undefined) ? false : true;
	},
	hasWhiteSpace: function($check) {
		return /\s/.test($check);
	},
	hasClass: function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	},
	hasExtension: function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.extensions;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	},
	isColor: function($color) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
	},
	isColour: function($colour) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($colour);
	},
	isDate: function($date) {
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
	},
	isEmail: function($email, $regExp) {
		var $regExp = $regExp || /([\w\.]+)@([\w\.]+)\.(\w+)/i;
		return $regExp.test($email);
	},
	isFullInteger: function($int) {
		return /^[0-9]+$/.test($int);
	},
	isImage: function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.images;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	},
	isInteger: function($int) {
		return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
	},
	isPassword: function($password, $regExp) {
		var $regExp = $regExp || /^(?=.*\d).{6,}$/;
		return $regExp.test($password);
	},
	isTime: function($time, $regExp) {
		var $regExp = $regExp || /([01]\d|2[0-3]):([0-5]\d)/;
		return $regExp.test($time);
	},
	isTouch: function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	},
	isURL: function($url, $regExp) {
		var $regExp = $regExp || /(https?:\/\/[^\s]+)/g;
		return $regExp.test($url);
	},
	crtDBDate: function() {
		var $now = new Date();
		return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
	},
	dateToISO: function($date, $fullDate) {
		var $fullDate = (typeof $fullDate !== 'undefined') ? $fullDate : true;
		// Spaced dates
		if ($date.indexOf(' ') > -1) {
			var $year, $month, $day, $time, $returnDate;
			var $dateSplit = $date.split(' ');
			for (var $i = 0, $len = $dateSplit.length; $i < $len; $i++) {
				if (isFullInteger($dateSplit[$i])) {
					if ($dateSplit[$i].length === 2) {
						$day = $dateSplit[$i];
					} else if ($dateSplit[$i].length === 4) {
						$year = $dateSplit[$i];
					}
				} else if ($dateSplit[$i].indexOf(':') === 2 && $fullDate === true) {
					$time = $dateSplit[$i];
				} else {
					var $lowerDateSplit = lowercaseAll($dateSplit[$i]);
					for (var $i2 = 0, $len2 = $webMonths.length; $i2 < $len2; $i2++) {
						if ($lowerDateSplit === $webMonths[$i2].name || $lowerDateSplit === $webMonths[$i2].nameShort) {
							$month = $webMonths[$i2].number;
							break;
						}
					}
				}
			}
			$returnDate = $year + '-' + $month + '-' + $day;
			if ($fullDate === true && $time !== undefined) {
				$returnDate += 'T' + $time;
			}
			return $returnDate;
		}
	},
	log: function($text) {
		console.log($text);
	},
	formatBytes: function($bytes, $decimals) {
		if ($bytes == 0) return '0 Byte';
		var $k = 1000;
		var $dm = $decimals + 1 || 3;
		var $sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var $i = Math.floor(Math.log($bytes) / Math.log($k));
		return parseFloat(($bytes / Math.pow($k, $i)).toFixed($dm)) + ' ' + $sizes[$i];
	},
	getExtension: function($file) {
		return $file.split('.').pop().toLowerCase();
	},
	getIntegers: function($string) {
		return $string.replace(/^\D+ /g, '').replace(/ /g, '');
	},
	lowercaseAll: function($string) {
		return $string.toLowerCase();
	},
	randomInteger: function($max, $min) {
		var $max = $max || 10;
		var $min = $min || 1;
		return Math.floor(Math.random() * ($max - $min + 1)) + $min;
	},
	randomString: function($stringLength) {
		var $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
		var $len = $stringLength || 5;
		var $randomString = '';
		for (var $i = 0; $i < $len; $i++) {
			$rNum = Math.floor(Math.random() * $chars.length);
			$randomString += $chars[$rNum];
		}
		return $randomString;
	},
	removeFirst: function($string) {
		return $string.substring(1);
	},
	removeFirstLast: function($string) {
		return $string.substring(1, $string.length - 1);
	},
	removeLast: function($string) {
		return $string.substring(0, $string.length - 1);
	},
	removeWhiteSpace: function($string) {
		return $string.replace(/ /g, '');
	},
	uppercaseAll: function($string) {
		return $string.toUpperCase();
	},
	uppercaseFirst: function($string) {
		return $string.charAt(0).toUpperCase() + $string.slice(1);
	}
};