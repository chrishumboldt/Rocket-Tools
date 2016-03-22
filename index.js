/**
 * File: index.js
 * Type: Javascript Node module
 * Author: Chris Humboldt
 */

var web = function() {

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
	var $webPrefix = {
		basic: 'web-',
		position: 'web-pos-',
		scroll: 'web-scroll-',
		state: 'web-state-'
	};
	var $webState = {
		alts: {
			active: 'inactive',
			closed: 'open',
			hidden: 'visible',
			inactive: 'active',
			open: 'closed',
			visible: 'hidden'
		},
		list: ['active', 'closed', 'hidden', 'inactive', 'open', 'selected', 'toggled', 'visible']
	};
	var $webTypes = {
		extensions: ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
		images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
	};

	// Basic checks
	var exists = function($element) {
		return ($element === null || typeof($element) === undefined) ? false : true;
	};
	var hasWhiteSpace = function($check) {
		return /\s/.test($check);
	};
	var hasClass = function($element, $class) {
		return (' ' + $element.className + ' ').indexOf(' ' + $class + ' ') > -1;
	};
	var hasExtension = function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.extensions;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	};
	var isColor = function($color) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($color);
	};
	var isColour = function($colour) {
		return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test($colour);
	};
	var isDate = function($date) {
		return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test($date);
	};
	var isEmail = function($email, $regExp) {
		var $regExp = $regExp || /([\w\.]+)@([\w\.]+)\.(\w+)/i;
		return $regExp.test($email);
	};
	var isFullInteger = function($int) {
		return /^[0-9]+$/.test($int);
	};
	var isImage = function($file, $arAllowedTypes) {
		var $allowedTypes = $arAllowedTypes || $webTypes.images;
		return $allowedTypes[$file.split('.').pop().toLowerCase()];
	};
	var isInteger = function($int) {
		return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test($int);
	};
	var isPassword = function($password, $regExp) {
		var $regExp = $regExp || /^(?=.*\d).{6,}$/;
		return $regExp.test($password);
	};
	var isTime = function($time, $regExp) {
		var $regExp = $regExp || /([01]\d|2[0-3]):([0-5]\d)/;
		return $regExp.test($time);
	};
	var isTouch = function() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	};
	var isURL = function($url, $regExp) {
		var $regExp = $regExp || /(https?:\/\/[^\s]+)/g;
		return $regExp.test($url);
	};

	// Dates
	var crtDBDate = function() {
		var $now = new Date();
		return $now.getFullYear() + '-' + ('0' + ($now.getMonth() + 1)).slice(-2) + '-' + ('0' + $now.getDate()).slice(-2);
	};
	var dateToISO = function($date, $fullDate) {
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
	};

	// Development
	var log = function($text) {
		if (window.console) {
			console.log($text);
		}
	};
	// DOM
	var append = function($element, $html) {
		if (exists($element)) {
			if ($element.length > 0) {
				for (var $i = 0, $len = $element.length; $i < $len; $i++) {
					var $div = document.createElement('div');
					$div.innerHTML = $html;
					$element[$i].appendChild($div.firstChild);
				}
			} else {
				var $div = document.createElement('div');
				$div.innerHTML = $html;
				$element.appendChild($div.firstChild);
			}
		}
	};
	var classAdd = function($element, $class) {
		if (exists($element)) {
			if (typeof $class === 'object') {
				for (var $i = 0, $len = $class.length; $i < $len; $i++) {
					classAddExecute($element, $class[$i]);
				}
			} else if (hasWhiteSpace($class)) {
				var $classes = $class.split(' ');
				for (var $i = 0, $len = $classes.length; $i < $len; $i++) {
					classAddExecute($element, $classes[$i]);
				}
			} else {
				classAddExecute($element, $class);
			}
		}
	};
	var classAddExecute = function($element, $class) {
		var $crtClass = $element.className;
		if ($crtClass.match(new RegExp('\\b' + $class + '\\b', 'g')) === null) {
			$element.className = $crtClass === '' ? $class : $crtClass + ' ' + $class;
		}
	};
	var classClear = function($element) {
		if (exists($element)) {
			$element.removeAttribute('class');
		}
	};
	var classRemove = function($element, $class) {
		if (exists($element)) {
			if (typeof $class === 'object') {
				for (var $i = $class.length - 1; $i >= 0; $i--) {
					classRemoveExecute($element, $class[$i]);
				}
			} else if (hasWhiteSpace($class)) {
				var $classes = $class.split(' ');
				for (var $i = 0, $len = $classes.length; $i < $len; $i++) {
					classRemoveExecute($element, $classes[$i]);
				}
			} else {
				classRemoveExecute($element, $class);
			}
		}
	};
	var classRemoveExecute = function($element, $class) {
		if ($element.className.indexOf($class) > -1) {
			$element.className = $element.className.split(' ').filter(function($val) {
				return $val != $class;
			}).toString().replace(/,/g, ' ');
			if ($element.className === '') {
				classClear($element);
			}
		}
	};
	var classReplace = function($element, $removeClass, $addClass) {
		if (exists($element)) {
			classAdd($element, $addClass);
			classRemove($element, $removeClass);
		}
	};
	var classToggle = function($element, $class) {
		if (exists($element)) {
			if (!hasClass($element, $class)) {
				classAdd($element, $class);
			} else {
				classRemove($element, $class);
			}
		}
	};
	var eventAdd = function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.addEventListener) {
			$elem.addEventListener($type, $eventHandle, false);
		} else if ($elem.attachEvent) {
			$elem.attachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	};
	var eventRemove = function($elem, $type, $eventHandle) {
		if ($elem == null || typeof($elem) == 'undefined') return;
		if ($elem.removeEventListener) {
			$elem.removeEventListener($type, $eventHandle, false);
		} else if ($elem.detachEvent) {
			$elem.detachEvent("on" + $type, $eventHandle);
		} else {
			$elem["on" + $type] = $eventHandle;
		}
	};
	var getIndex = function($node) {
		return [].indexOf.call($node.parentNode.children, $node);
	};
	var idAdd = function($element, $id) {
		if (exists($element)) {
			$element.setAttribute('id', $id);
		}
	};
	var idRemove = function($element) {
		if (exists($element)) {
			$element.removeAttribute('id');
		}
	};
	var inputDisable = function($selector) {
		var $inputElements = select($selector);
		if ($inputElements.nodeType == undefined) {
			for (var $i = $inputElements.length - 1; $i >= 0; $i--) {
				$inputElements[$i].disabled = true;
			}
		} else {
			$inputElements.disabled = true;
		}
	}
	var inputEnable = function($selector) {
		var $inputElements = select($selector);
		if ($inputElements.nodeType == undefined) {
			for (var $i = $inputElements.length - 1; $i >= 0; $i--) {
				$inputElements[$i].disabled = false;
			}
		} else {
			$inputElements.disabled = false;
		}
	}
	var remove = function($selElm) {
		if ($selElm.nodeType == undefined) {
			var $elements = select($selElm);
			if ($elements !== null) {
				if ($elements.nodeType == undefined) {
					for (var $i = $elements.length - 1; $i >= 0; $i--) {
						if ($elements[$i] !== null) {
							$elements[$i].parentNode.removeChild($elements[$i]);
						}
					}
				} else {
					$elements.parentNode.removeChild($elements);
				}
			}
		} else {
			if ($selElm !== null) {
				$selElm.parentNode.removeChild($selElm);
			}
		}
	};
	var select = function($selector) {
		if ($selector.indexOf('.') > -1 || hasWhiteSpace($selector)) {
			var $returnElements = document.querySelectorAll($selector);
			if ($returnElements.length === 1) {
				return $returnElements[0];
			} else {
				return $returnElements;
			}
		} else {
			if ($selector.indexOf('#') > -1) {
				return document.getElementById($selector.substring(1));
			} else {
				var $returnElements = document.getElementsByTagName($selector);
				if ($returnElements.length === 1) {
					return $returnElements[0];
				} else {
					return $returnElements;
				}
			}
		}
	};
	var setRatio = function($selector, $multiplier) {
		var $elements = document.querySelectorAll($selector);
		if (typeof($multiplier) === 'undefined') {
			$multiplier = 1;
		}
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			$elements[$i].style.height = Math.floor($elements[$i].offsetWidth * $multiplier) + 'px';
		};
	};
	var stateClear = function($element) {
		if (exists($element)) {
			var $newWebStates = $webState.list.slice().map(function($newState) {
				return $webPrefix.state + $newState;
			});
			classRemove($element, $newWebStates);
		}
	};
	var stateSet = function($element, $state) {
		if (exists($element)) {
			var $newWebStates = $webState.list.slice().map(function($newState) {
				return $webPrefix.state + $newState;
			});
			var $stateClass = $newWebStates.splice($newWebStates.indexOf($webPrefix.state + $state), 1);
			classReplace($element, $newWebStates, $stateClass);
		}
	};
	var stateToggle = function($element, $state, $clear) {
		if (exists($element)) {
			if ($webState.list.indexOf($state) > -1) {
				var $altState = $webState.alts[$state] || false;
				var $clear = $clear || false;
				var $stateClass = $webPrefix.state + $state;
				if (hasClass($element, $stateClass)) {
					if ($clear || $altState === false) {
						stateClear($element);
					} else {
						stateSet($element, $altState);
					}
				} else {
					stateSet($element, $state);
				}
			}
		}
	};
	var wallpaper = function($selector) {
		var $elements = document.querySelectorAll($selector);
		for (var $i = $elements.length - 1; $i >= 0; $i--) {
			var $thisWallpaper = $elements[$i].getAttribute('data-wallpaper');
			if ($thisWallpaper !== null) {
				$elements[$i].style.backgroundImage = 'url("' + $thisWallpaper + '")';
			}
		}
	};
	var wrap = function($element, $tag, $className) {
		if (exists($element)) {
			var $wrapper = document.createElement($tag);
			var $tempElement = $element.cloneNode(true);
			$wrapper.className = $className;

			$element.parentNode.insertBefore($wrapper, $element).appendChild($tempElement);
			$element.parentNode.removeChild($element);
		}
	};
	var wrapInner = function($element, $tag, $className) {
		if (exists($element)) {
			if (typeof $tag === 'string') {
				$tag = document.createElement($tag);
			}
			if ($className !== undefined) {
				var $div = $element.appendChild($tag).setAttribute('class', $className);
			} else {
				var $div = $element.appendChild($tag);
			}
			while ($element.firstChild !== $tag) {
				$tag.appendChild($element.firstChild);
			}
		}
	};

	// File
	var fileLoad = function($file, $callback) {
		var $xmlhttp = new XMLHttpRequest();
		$xmlhttp.onreadystatechange = $callback;
		$xmlhttp.open('GET', $file, true);
		$xmlhttp.send();
	};

	// Strings
	// As per Aliceljm
	// http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
	var formatBytes = function($bytes, $decimals) {
		if ($bytes == 0) return '0 Byte';
		var $k = 1000;
		var $dm = $decimals + 1 || 3;
		var $sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var $i = Math.floor(Math.log($bytes) / Math.log($k));
		return parseFloat(($bytes / Math.pow($k, $i)).toFixed($dm)) + ' ' + $sizes[$i];
	}
	var getExtension = function($file) {
		return $file.split('.').pop().toLowerCase();
	};
	var getIntegers = function($string) {
		return $string.replace(/^\D+ /g, '').replace(/ /g, '');
	};
	var lowercaseAll = function($string) {
		return $string.toLowerCase();
	};
	var randomInteger = function($max, $min) {
		var $max = $max || 10;
		var $min = $min || 1;
		return Math.floor(Math.random() * ($max - $min + 1)) + $min;
	};
	var randomString = function($stringLength) {
		var $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
		var $len = $stringLength || 5;
		var $randomString = '';
		for (var $i = 0; $i < $len; $i++) {
			$rNum = Math.floor(Math.random() * $chars.length);
			$randomString += $chars[$rNum];
		}
		return $randomString;
	};
	var removeFirst = function($string) {
		return $string.substring(1);
	};
	var removeFirstLast = function($string) {
		return $string.substring(1, $string.length - 1);
	};
	var removeLast = function($string) {
		return $string.substring(0, $string.length - 1);
	};
	var removeWhiteSpace = function($string) {
		return $string.replace(/ /g, '');
	};
	var uppercaseAll = function($string) {
		return $string.toUpperCase();
	};
	var uppercaseFirst = function($string) {
		return $string.charAt(0).toUpperCase() + $string.slice(1);
	};

	// Return
	return {
		prefix: $webPrefix,
		exists: exists,
		hasWhiteSpace: hasWhiteSpace,
		hasClass: hasClass,
		hasExtension: hasExtension,
		isColor: isColor,
		isColour: isColour,
		isDate: isDate,
		isEmail: isEmail,
		isFullInteger: isFullInteger,
		isImage: isImage,
		isInteger: isInteger,
		isPassword: isPassword,
		isTime: isTime,
		isTouch: isTouch,
		isURL: isURL,
		crtDBDate: crtDBDate,
		dateToISO: dateToISO,
		log: log,
		append: append,
		eventAdd: eventAdd,
		eventRemove: eventRemove,
		classAdd: classAdd,
		classClear: classClear,
		classRemove: classRemove,
		classReplace: classReplace,
		classToggle: classToggle,
		getIndex: getIndex,
		idAdd: idAdd,
		idRemove: idRemove,
		inputDisable: inputDisable,
		inputEnable: inputEnable,
		remove: remove,
		select: select,
		setRatio: setRatio,
		stateClear: stateClear,
		stateSet: stateSet,
		stateToggle: stateToggle,
		wallpaper: wallpaper,
		wrap: wrap,
		wrapInner: wrapInner,
		fileLoad: fileLoad,
		formatBytes: formatBytes,
		getExtension: getExtension,
		getIntegers: getIntegers,
		lowercaseAll: lowercaseAll,
		randomInteger: randomInteger,
		randomString: randomString,
		removeFirst: removeFirst,
		removeFirstLast: removeFirstLast,
		removeLast: removeLast,
		removeWhiteSpace: removeWhiteSpace,
		uppercaseAll: uppercaseAll,
		uppercaseFirst: uppercaseFirst
	};
}();