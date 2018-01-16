/**
@author Chris Humboldt

NOTE
Rocket serves as the "namespace" for all subsequent modules. Rocket modules do
require this toolset so make sure that this library is loaded first.
**/

// Variables
// Defaults
// Arrays
// Basic checks
// Classes
// Clone
// Dates
// Development
// Dimensions
// DOM
// Events
// Gets
// Helpers
// ID's
// Inputs
// Overlay
// Random
// Request
// Setup
// State
// Storage
// Strings
// Time
// URL
// Exports
// Bind Rocket object

let Rocket;

((Rocket) => {
   // Variables
   const _var = {
      months: [
         { number: '01', name: 'january', nameShort: 'jan' },
         { number: '02', name: 'february', nameShort: 'feb' },
         { number: '03', name: 'march', nameShort: 'mar' },
         { number: '04', name: 'april', nameShort: 'apr' },
         { number: '05', name: 'may', nameShort: 'may' },
         { number: '06', name: 'june', nameShort: 'jun' },
         { number: '07', name: 'july', nameShort: 'jul' },
         { number: '08', name: 'august', nameShort: 'aug' },
         { number: '09', name: 'september', nameShort: 'sep' },
         { number: '10', name: 'october', nameShort: 'oct' },
         { number: '11', name: 'november', nameShort: 'nov' },
         { number: '12', name: 'december', nameShort: 'dec' }
      ],
      prefix: {
         basic: 'rocket-',
         state: 'is-'
      },
      state: {
         alts: {
            active: 'inactive',
            closed: 'open',
            hidden: 'visible',
            inactive: 'active',
            open: 'closed',
            visible: 'hidden'
         },
         list: [`active`, 'closed', 'hidden', 'inactive', 'open', 'selected', 'toggled', 'visible']
      }
   };
   _var.state.list = _var.state.list.map((state) => `${_var.prefix.state}${state}`);

   // Defaults
   Rocket.defaults = {
      extensions: {
         all: ['png', 'jpg', 'jpeg', 'json', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
         images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
      },
      log: true,
      overlay: {
         backgroundColor: 'rgba(56,56,56,0.6)'
      },
      regexp: {
         colour: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/,
         date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}/,
         email: /([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i,
         password: /^(?=.*\d).{6,}/,
         selector: {
            attribute: /([a-z])+(\[)+([a-z])+(=")+([a-zA-Z\-])+("\])/,
            tag: /^[a-zA-Z]+$/
         },
         time: /([01]\d|2[0-3]):([0-5]\d)/,
         url: /^(https?:\/\/[^\s]+)/
      },
      request: {
         async: true,
         data: false,
         dataForce: false,
         dataType: 'json',
         headers: false,
         onStart: false,
         onLoading: false,
         onSuccess: false,
         onError: false,
         onComplete: false,
         timeout: false,
         type: false,
         withCredentials: false
      },
      storage: {
         name: false,
         type: 'session'
      }
   };

   // Arrays
   Rocket.array = {
      clean: function (thisArray) {
         if (!Rocket.is.array(thisArray)) return false;
         return thisArray.filter(function (value) { return value !== null; });
      },
      make: function (arValue, isUnique) {
         let returnArray = [];

         if (!arValue) return returnArray;

         // Continue
         let unique = Rocket.helper.setDefault(isUnique, false);

         if (Rocket.is.array(arValue) && arValue.length > 0) {
            returnArray = arValue;
         } else if (Rocket.is.element(arValue)) {
            returnArray.push(arValue);
         } else if (Rocket.is.string(arValue)) {
            returnArray = arValue.split(' ');
         } else if (Rocket.is.object(arValue)) {
            // Try and catch HTMLCollection and NodeList
            arValue = Array.prototype.slice.call(arValue);

            if (Rocket.is.array(arValue) && arValue.length > 0) {
               returnArray = arValue;
            }
         }

         return (unique) ? Rocket.array.unique(returnArray) : returnArray;
      },
      unique: function (thisArray) {
         if (!Rocket.is.array(thisArray)) return false;
         return thisArray.filter(function (value, index, self) { return self.indexOf(value) === index; });
      }
   };

   // Basic checks
   Rocket.exists = function (check) {
      return !(typeof check === 'undefined' || check === null || check === false);
   };

   Rocket.has = {
      spaces: function (check) {
         return /\s/.test(check);
      },
      class: function (element, thisClass) {
         return (' ' + element.className + ' ').indexOf(' ' + thisClass + ' ') > -1;
      },
      extension: function (file, arAllowedTypes) {
         var allowedTypes = (Rocket.is.array(arAllowedTypes)) ? arAllowedTypes : Rocket.defaults.extensions.all;
         return (allowedTypes.indexOf(file.split('.').pop().toLowerCase()) > -1);
      }
   };

   Rocket.is = {
      array: function (check) {
         return (typeof check === 'object' && check instanceof Array);
      },
      boolean: function (check) {
         return (typeof check === 'boolean');
      },
      browser: function () {
         /*
         A very basic check to detect if using a browser.
         Lifted this directly from the Require.js check.
         https://github.com/requirejs/requirejs/blob/master/require.js
         */
         return !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
      },
      color: function (color) {
         return Rocket.is.colour(color);
      },
      colour: function (colour) {
         return Rocket.defaults.regexp.colour.test(colour);
      },
      date: function (date, thisRegExp) {
         var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.date;
         return regExp.test(date);
      },
      element: function (element) {
         return (Rocket.exists(element)) ? (element.nodeType && element.nodeType === 1) : false;
      },
      email: function (email, thisRegExp) {
         var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.email;
         return regExp.test(email);
      },
      function: function (check) {
         return (typeof check === 'function');
      },
      image: function (file, arAllowedTypes) {
         var allowedTypes = (Rocket.is.array(arAllowedTypes)) ? arAllowedTypes : Rocket.defaults.extensions.images;
         return (allowedTypes.indexOf(file.split('.').pop().toLowerCase()) > -1);
      },
      integer: function (check) {
         return (check ^ 0) === check;
      },
      json: function (json) {
         if (typeof json !== 'object') {
            try {
               JSON.parse(json);
            }
            catch (e) {
               return false;
            }
         }

         return true;
      },
      number: function (check) {
         return (typeof check === 'number' && !isNaN(check));
      },
      object: function (check) {
         return (typeof check === 'object');
      },
      password: function (check, thisRegExp) {
         var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.password;
         return regExp.test(check);
      },
      string: function (check) {
         return (typeof check === 'string');
      },
      time: function (check, thisRegExp) {
         var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.time;
         return regExp.test(check);
      },
      touch: function () {
         if (!Rocket.is.browser() || !window || !window.console) return false;
         return 'ontouchstart' in window || 'onmsgesturechange' in window;
      },
      url: function (url, thisRegExp) {
         var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.url;
         return regExp.test(url);
      }
   };

   // Classes
   Rocket.classes = {
      add: function (elements, classNames) {
         var elms = (Rocket.is.string(elements)) ? Rocket.dom.select(elements) : elements;
         Rocket.classes.executeClasses(elms, classNames, false);
      },
      clear: function (element) {
         var elms = (Rocket.is.string(element)) ? Rocket.dom.select(element) : [element];

         if (elms.length > 0) {
            for (var i = 0, len = elms.length; i < len; i++) {
               if (Rocket.exists(elms[i])) {
                  elms[i].removeAttribute('class');
               }
            }
         }
      },
      executeAdd: function (element, classes) {
         element.className = element.className
         .split(' ')
         .concat(classes)
         .filter(function (val, i, ar) { return (ar.indexOf(val) === i) && (val !== ''); })
         .toString()
         .replace(/,/g, ' ');
      },
      executeClasses: function (elements, classesAdd, classesRemove) {
         if (!Rocket.exists(elements)) return false;

         // Create elements array
         var arElements = Rocket.array.make(elements);
         if (arElements.length < 1) return false;

         // Create classes array
         var arClassesAdd = Rocket.array.make(classesAdd, true);
         var arClassesRemove = Rocket.array.make(classesRemove, true);
         var actionAdd = (arClassesAdd.length > 0) ? true : false;
         var actionRemove = (arClassesRemove.length > 0) ? true : false;

         // Execute
         for (var i = 0, len = arElements.length; i < len; i++) {
            if (actionRemove) {
               Rocket.classes.executeRemove(arElements[i], arClassesRemove);
            }
            if (actionAdd) {
               Rocket.classes.executeAdd(arElements[i], arClassesAdd);
            }
         }
      },
      executeRemove: function (element, classes) {
         element.className = element.className
         .split(' ')
         .filter(function (val) { return classes.indexOf(val) < 0; })
         .toString()
         .replace(/,/g, ' ');

         if (element.className === '') Rocket.classes.clear(element);
      },
      remove: function (elements, classNames) {
         var elms = (Rocket.is.string(elements)) ? Rocket.dom.select(elements) : elements;
         Rocket.classes.executeClasses(elms, false, classNames);
      },
      replace: function (elements, classesRemove, classesAdd) {
         var elms = (Rocket.is.string(elements)) ? Rocket.dom.select(elements) : elements;
         Rocket.classes.executeClasses(elms, classesAdd, classesRemove);
      },
      toggle: function (elements, className) {
         var elms = (Rocket.is.string(elements)) ? Rocket.dom.select(elements) : elements;
         if (!Rocket.exists(elms) || typeof className !== 'string' || Rocket.has.spaces(className)) return false;

         // Create elements array
         var arElements = [];
         if (Rocket.is.element(elms)) {
            arElements.push(elms);
         } else if (Rocket.is.array(elms)) {
            arElements = elms;
         }

         if (arElements.length < 1) return false;

         // Execute
         for (var i = 0, len = arElements.length; i < len; i++) {
            if (!Rocket.has.class(arElements[i], className)) {
               Rocket.classes.executeAdd(arElements[i], [className]);
            } else {
               Rocket.classes.executeRemove(arElements[i], [className]);
            }
         }
      }
   };

   // Clone
   /*
   NOTE
   INCOMPLETE! Needs a ton more work and really is not a viable method right now.
   */
   Rocket.clone = function (original) {
      return Rocket.helper.parse.json(JSON.stringify(original));
   };

   // Dates
   Rocket.date = {
      basic: function (thisDate, thisWithTime) {
         var transDate = (thisDate) ? Rocket.date.transform(thisDate) : new Date();
         if (!transDate) return false;

         // Continue
         var withTime = (Rocket.is.boolean(thisWithTime)) ? thisWithTime : false;
         var returnValue = '';
         var day = Rocket.date.day(transDate.getDate());
         var month = Rocket.date.month(transDate.getMonth() + 1);
         var year = Rocket.date.year(transDate.getFullYear());

         returnValue += day + ' ' + month + ' ' + year;

         if (withTime) {
            returnValue += ', ' + Rocket.time.basic(thisDate);
         }

         return returnValue;
      },
      day: function (thisDayVal, thisType) {
         var thisDay;
         var type = (Rocket.is.string(thisType)) ? thisType : false;

         // Get month
         if (Rocket.is.number(thisDayVal)) {
            thisDay = thisDayVal;
         } else if (Rocket.is.string(thisDayVal)) {
            var transDayVal = Rocket.date.transform(thisDayVal);
            thisDay = (transDayVal) ? transDayVal.getDate() : thisDayVal;
         } else {
            thisDay = new Date().getDate();
         }

         // Validate
         if (!thisDay) {
            return false;
         } else {
            thisDay = thisDay.toString();
         }

         // Return
         if (type === 'long') {
            return (thisDay.length === 1) ? '0' + thisDay : thisDay;
         } else {
            return parseInt(thisDay);
         }
      },
      safe: function (thisDate, thisWithTime) {
         var newData = (thisDate) ? Rocket.date.transform(thisDate) : new Date();
         if (!newData) return false;

         // Continue
         var withTime = (Rocket.is.boolean(thisWithTime)) ? thisWithTime : false;
         var returnValue = newData.getFullYear() + '-' + ('0' + (newData.getMonth() + 1)).slice(-2) + '-' + ('0' + newData.getDate()).slice(-2);

         if (withTime) {
            returnValue += ' ' + Rocket.time.full(thisDate);
         }

         return returnValue;
      },
      month: function (thisMonthVal, thisType) {
         var thisMonth;
         var type = (Rocket.is.string(thisType)) ? thisType : false;

         // Get month
         if (Rocket.is.number(thisMonthVal)) {
            thisMonth = thisMonthVal;
         } else if (Rocket.is.string(thisMonthVal)) {
            var transMonthVal = Rocket.date.transform(thisMonthVal);
            thisMonth = (transMonthVal) ? transMonthVal.getMonth() + 1 : thisMonthVal;
         } else {
            thisMonth = new Date().getMonth() + 1;
         }

         // Validate
         if (!thisMonth) {
            return false;
         } else {
            thisMonth = thisMonth.toString();
         }

         // Return
         switch (type) {
            case 'long':
               thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
               for (var i = 0, len = _var.months.length; i < len; i++) {
                  if (_var.months[i].number == thisMonth) {
                     thisMonth = Rocket.string.uppercase.first(_var.months[i].name);
                     break;
                  }
               }
               break;

            case 'number':
               thisMonth = parseInt(thisMonth);
               break;

            default:
               thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
               for (var i = 0, len = _var.months.length; i < len; i++) {
                  if (_var.months[i].number == thisMonth) {
                     thisMonth = Rocket.string.uppercase.first(_var.months[i].nameShort);
                     break;
                  }
               }
         }

         return thisMonth;
      },
      toISO: function (thisDate, thisFullDate) {
         var fullDate = (typeof thisFullDate !== 'undefined') ? thisFullDate : true;

         // Spaced dates
         if (thisDate.indexOf(' ') > -1) {
            var year = void 0, month = void 0, day = void 0, time_1, returnDate = void 0;
            var dateSplit = thisDate.split(' ');

            for (var i = 0, len = dateSplit.length; i < len; i++) {
               if (Rocket.is.integer(dateSplit[i])) {
                  if (dateSplit[i].length === 2) {
                     day = dateSplit[i];
                  } else if (dateSplit[i].length === 4) {
                     year = dateSplit[i];
                  }
               } else if (dateSplit[i].indexOf(':') === 2 && fullDate === true) {
                  time_1 = dateSplit[i];
               } else {
                  var lowerDateSplit = Rocket.string.lowercase.all(dateSplit[i]);
                  for (var i2 = 0, len2 = _var.months.length; i2 < len2; i2++) {
                     if (lowerDateSplit === _var.months[i2].name || lowerDateSplit === _var.months[i2].nameShort) {
                        month = _var.months[i2].number;
                        break;
                     }
                  }
               }
            }
            returnDate = year + '-' + month + '-' + day;

            if (fullDate === true && time_1 !== undefined) {
               returnDate += 'T' + time_1;
            }

            return returnDate;
         }
      },
      transform: function (thisDate) {
         /*
         NOTE This is not a perfect test. This function will attempt to convert
         any string passed into a date. This should really only be used with date
         formats that are known to be correct.
         */
         function fixDateOrder(fixDate, seperator) {
            return fixDate.split(seperator).reverse().join(seperator);
         }

         // Execute
         if (Rocket.is.string(thisDate)) {
            var dateIndexDash = thisDate.indexOf('-');
            var dateIndexDot = thisDate.indexOf('.');
            var dateIndexSlash = thisDate.indexOf('/');

            if (dateIndexDash == 2) {
               thisDate = fixDateOrder(thisDate, '-');
            } else if (dateIndexDot == 2) {
               thisDate = fixDateOrder(thisDate, '.');
            } else if (dateIndexSlash == 2) {
               thisDate = fixDateOrder(thisDate, '/');
            }
         }

         var newDate = (typeof thisDate !== 'undefined') ? new Date(thisDate) : new Date(); // Make the date
         if (newDate.toString() == 'Invalid Date') return false; // Fail test

         return newDate;
      },
      year: function (thisYearVal, thisType) {
         var thisYear;
         var type = (Rocket.is.string(thisType)) ? thisType : false;

         // Get month
         if (Rocket.is.number(thisYearVal)) {
            thisYear = thisYearVal;
         } else if (Rocket.is.string(thisYearVal)) {
            var transYearVal = Rocket.date.transform(thisYearVal);
            thisYear = (transYearVal) ? transYearVal.getFullYear() : thisYearVal;
         } else {
            thisYear = new Date().getFullYear();
         }

         // Validate
         if (!thisYear) {
            return false;
         } else {
            thisYear = thisYear.toString();
         }

         // Return
         switch (type) {
            case 'long':
               if (thisYear.length < 4) {
                  var newDate = new Date().getFullYear().toString().substring(0, 4 - thisYear.length).toString();
                  thisYear = parseInt(newDate + thisYear);
               } else {
                  thisYear = parseInt(thisYear);
               }
               break;

            case 'short':
               if (thisYear.length === 1) {
                  var newDate = new Date().getFullYear().toString().substr(2, 1);
                  thisYear = newDate + thisYear;
               } else {
                  thisYear = thisYear.substr(thisYear.length - 2, 2);
               }

               break;
         }

         return parseInt(thisYear);
      }
   };

   // Development
   Rocket.log = function (text) {
      if ((Rocket.is.browser() && (!window || !window.console)) || !Rocket.defaults.log) return;
      console.log(text);
   };

   Rocket.error = function (text) {
      if ((Rocket.is.browser() && (!window || !window.console)) || !Rocket.is.browser() || !Rocket.defaults.log) return;
      throw new Error(text);
   };

   // Dimensions
   Rocket.dimensions = {
      getWidthOrHeight: function (elm, type) {
         if (!Rocket.is.browser() || !window || !window.console) return false;
         if (!Rocket.is.element(elm) && !Rocket.is.string(elm) && elm !== window) return false;
         if (Rocket.is.string(type) && (type !== 'width' && type !== 'height')) return false;

         // Continue
         var retValue;

         // Check for window
         if (elm === window) {
            type = Rocket.string.uppercase.first(type);
            retValue = window['inner' + type] || document.documentElement['client' + type] || document.body['client' + type];
         } else {
            // Check if string selector
            if (Rocket.is.string(elm)) {
               elm = Rocket.dom.select(elm);
               if (elm.length < 1) return false;

               // Continue
               elm = elm[0];
            }

            // Continue
            if (elm.getClientRects().length) {
               retValue = elm.getBoundingClientRect()[type];
            }

            if (retValue < 1 || retValue == null) {
               retValue = elm.style[type];
            }
         }

         return parseFloat(retValue) || 0;
      },
      height: function (elm) {
         return Rocket.dimensions.getWidthOrHeight(elm, 'height');
      },
      width: function (elm) {
         return Rocket.dimensions.getWidthOrHeight(elm, 'width');
      }
   };

   // DOM
   Rocket.dom = {
      body: (typeof document !== 'undefined') ? document.getElementsByTagName('body')[0] : false,
      element: function (selector) {
         /*
         Only a single element is required. The below uses a more performant
         code block to complete this action.
         */
         if (Rocket.is.string(selector)) {
            switch (Rocket.get.selector.type(selector)) {
               case 'gebi':
                  return document.getElementById(selector.substring(1));

               default:
                  return document.querySelector(selector);
            }
         } else if (Rocket.is.element(selector)) {
            return selector;
         } else if (Rocket.is.object(selector)) {
            if (selector === window || selector === document) {
               return selector;
            } else {
               selector = Array.prototype.slice.call(selector);
               if (Rocket.is.array(selector) && selector.length > 0) {
                  return selector[0];
               }
            }
         } else {
            return null;
         }
      },
      head: (typeof document !== 'undefined') ? document.getElementsByTagName('head')[0] : false,
      html: (typeof document !== 'undefined') ? document.getElementsByTagName('html')[0] : false,
      ratio: function (selector, multiplier) {
         var elements = document.querySelectorAll(selector);

         if (typeof (multiplier) === 'undefined') {
            multiplier = 1;
         }

         for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].style.height = Math.floor(elements[i].offsetWidth * multiplier) + 'px';
         }
      },
      remove: function (selElm) {
         if (Rocket.exists(selElm)) {
            if (Rocket.is.element(selElm) && Rocket.is.element(selElm.parentNode)) {
               selElm.parentNode.removeChild(selElm);
            } else if (Rocket.is.string(selElm)) {
               var elements = Rocket.dom.select(selElm);

               for (var i = 0, len = elements.length; i < len; i++) {
                  if (Rocket.is.element(elements[i])) {
                     elements[i].parentNode.removeChild(elements[i]);
                  }
               }
            }
         }
      },
      select: function (selectors) {
         /*
         NOTE
         Get multiple elements. The method assumes that many elements exist
         on the DOM with the "selectors". As such an array will ALWAYS be returned.

         Even an ID selector will return an array as the user has requested
         this particular method type. It's important to maintain consistency.
         */
         var returnElms = [];

         // String selectors
         if (Rocket.is.string(selectors)) {
            returnElms = returnElms.concat(Rocket.dom.selectByString(selectors));
         } else if (Rocket.is.element(selectors)) {
            returnElms.push(selectors);
         } else if (Rocket.is.array(selectors)) {
            var stringSelectors = '';

            for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
               var selector = selectors_1[_i];

               if (Rocket.is.string(selector)) {
                  stringSelectors += selector + ",";
               } else if (Rocket.is.element(selector)) {
                  returnElms.push(selector);
               }
            }

            // Check if there is any string selectors to use
            if (stringSelectors.length > 0) {
               returnElms = returnElms.concat(Rocket.dom.selectByString(stringSelectors));
            }
         } else if (Rocket.is.object(selectors)) {
            if (selectors === window || selectors === document) {
               returnElms = [selectors];
            } else {
               selectors = Array.prototype.slice.call(selectors);

               if (Rocket.is.array(selectors) && selectors.length > 0) {
                  returnElms = selectors;
               }
            }
         } else if (selectors === window || selectors === document) {
            returnElms = [selectors];
         }

         return Rocket.array.clean(Rocket.array.unique(returnElms));
      },
      selectByString: function (selectors) {
         var returnElms = [];
         var selectorSplit = selectors.split(',').map(Rocket.string.trim).filter(function (selector) { return selector.length > 0; });

         if (selectorSplit.length > 0) {
            // Loop through all the selectors
            for (var i = 0, len = selectorSplit.length; i < len; i++) {
               switch (Rocket.get.selector.type(selectorSplit[i])) {
                  case 'gebi':
                     returnElms = returnElms.concat(document.getElementById(selectorSplit[i].substring(1)));
                     break;

                  case 'gebtn':
                     returnElms = returnElms.concat(Array.prototype.slice.call(document.getElementsByTagName(selectorSplit[i])));
                     break;

                  case 'qsa':
                     returnElms = returnElms.concat(Array.prototype.slice.call(document.querySelectorAll(selectorSplit[i])));
                     break;
               }
            }
         }

         return returnElms;
      },
      title: (typeof document !== 'undefined') ? document.getElementsByTagName('title')[0] : false,
      window: (typeof window !== 'undefined') ? window : false,
   };

   // Events
   Rocket.event = {
      add: function (elms, type, eventHandle) {
         if (type === void 0) { type = 'click'; }
         Rocket.event.apply(elms, type, eventHandle, 'add');
      },
      apply: function (elms, type, eventHandle, eventType) {
         if (type === void 0) { type = 'click'; }

         var domElms = Rocket.dom.select(elms);
         if (domElms.length < 1) return;

         for (var i = 0, len = domElms.length; i < len; i++) {
            var elm = domElms[i];
            switch (eventType) {
               case 'add':
                  if (elm.addEventListener) {
                     elm.addEventListener(type, eventHandle, false);
                  } else if (elm.attachEvent) {
                     elm.attachEvent('on' + type, eventHandle);
                  } else {
                     elm['on' + type] = eventHandle;
                  }
                  break;

               case 'remove':
                  if (elm.removeEventListener) {
                     elm.removeEventListener(type, eventHandle, false);
                  } else if (elm.detachEvent) {
                     elm.detachEvent('on' + type, eventHandle);
                  } else {
                     elm['on' + type] = eventHandle;
                  }
                  break;
            }
         }
      },
      remove: function (elms, type, eventHandle) {
         if (type === void 0) { type = 'click'; }
         Rocket.event.apply(elms, type, eventHandle, 'remove');
      }
   };

   // Gets
   Rocket.get = {
      extension: function (file) {
         return file.split('.').pop().toLowerCase();
      },
      index: function (node) {
         return [].indexOf.call(node.parentNode.children, node);
      },
      selector: {
         type: function (selector) {
            var selectType = false;

            if (selector.indexOf('.') > -1 || Rocket.has.spaces(selector) || Rocket.defaults.regexp.selector.attribute.test(selector)) {
               selectType = 'qsa';
            } else if (selector.indexOf('#') > -1) {
               selectType = 'gebi';
            } else if (Rocket.defaults.regexp.selector.tag.test(selector)) {
               selectType = 'gebtn';
            }

            return selectType;
         }
      }
   };

   // Helpers
   Rocket.helper = {
      parse: {
         json: function (json) {
            if (Rocket.is.json(json)) return JSON.parse(json);
            return json;
         }
      },
      setDefault: function (setValue, defaultValue) {
         if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
            return false;
         } else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
            return setValue;
         } else if (typeof setValue === typeof defaultValue) {
            return setValue;
         } else {
            return defaultValue;
         }
      }
   };

   // ID's
   Rocket.id = {
      add: function (element, id) {
         if (Rocket.exists(element)) {
            element.setAttribute('id', id);
         }
      },
      remove: function (element) {
         if (Rocket.exists(element)) {
            element.removeAttribute('id');
         }
      }
   };

   // Inputs
   Rocket.input = {
      disable: function (selector) {
         var elements = Rocket.dom.select(selector);
         for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].disabled = true;
         }
      },
      enable: function (selector) {
         var elements = Rocket.dom.select(selector);
         for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].disabled = false;
         }
      }
   };

   // Milliseconds
   Rocket.milliseconds = {
      hours: (hours) => {
         return hours * 60 * 60 * 1000;
      },
      minutes: (minutes) => {
         return minutes * 60 * 1000;
      },
      seconds: (seconds) => {
         return seconds * 1000;
      }
   };

   // Overlay
   Rocket.overlay = {
      add: function () {
         if (!Rocket.is.browser() || !window || !window.console) return false;

         // Continue
         var rocketOverlay = document.createElement('div');
         Rocket.id.add(rocketOverlay, _var.prefix.basic + 'overlay');

         // Styles
         rocketOverlay.setAttribute('style', '-webkit-transition: all .4s ease-out 0s;-moz-transition: all .4s ease-out 0s;-ms-transition: all .4s ease-out 0s;transition: all .4s ease-out 0s;');
         rocketOverlay.style.display = 'block';
         rocketOverlay.style.position = 'fixed';
         rocketOverlay.style.top = '0';
         rocketOverlay.style.right = '0';
         rocketOverlay.style.bottom = '0';
         rocketOverlay.style.left = '0';
         rocketOverlay.style.backgroundColor = Rocket.defaults.overlay.backgroundColor;
         rocketOverlay.style.zIndex = '1000';
         rocketOverlay.style.visibility = 'hidden';
         rocketOverlay.style.opacity = '0';
         rocketOverlay.style.filter = 'alpha(opacity=0)';

         if (!Rocket.exists(document.getElementById(_var.prefix.basic + 'overlay'))) {
            Rocket.dom.body.appendChild(rocketOverlay);
         }
      },
      hide: function () {
         if (!Rocket.is.browser() || !window || !window.console) return false;

         // Continue
         var rocketOverlay = Rocket.dom.select('#rocket-overlay')[0];
         rocketOverlay.style.visibility = 'hidden';
         rocketOverlay.style.opacity = '0';
         rocketOverlay.style.filter = 'alpha(opacity=0)';
      },
      show: function () {
         if (!Rocket.is.browser() || !window || !window.console) return false;

         // Continue
         var rocketOverlay = Rocket.dom.select('#rocket-overlay')[0];
         setTimeout(function () {
            rocketOverlay.style.visibility = 'visible';
            rocketOverlay.style.opacity = '1';
            rocketOverlay.style.filter = 'alpha(opacity=100)';
         }, 50);
      }
   };

   // Random
   Rocket.random = {
      integer: function (thisMax, thisMin) {
         var max = (typeof thisMax === 'number') ? thisMax : 10;
         var min = (typeof thisMin === 'number') ? thisMin : 1;

         return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      string: function (stringLength, thisTextOnly) {
         var rNum;
         var textOnly = (Rocket.is.boolean(thisTextOnly)) ? thisTextOnly : false;
         var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
         var len = (Rocket.is.number(stringLength)) ? stringLength : 5;
         var randomString = '';

         if (!textOnly) {
            chars += '0123456789';
         }
         for (var i = 0; i < len; i++) {
            rNum = Math.floor(Math.random() * chars.length);
            randomString += chars[rNum];
         }

         return randomString;
      }
   };

   // Request
   Rocket.request = {
      run: function (uOptions) {
         if (!Rocket.exists(uOptions) || !Rocket.exists(uOptions.url)) return;

         return new Promise((resolve, reject) => {
            var options = {
               url: uOptions.url,
               async: (Rocket.is.string(uOptions.async)) ? uOptions.async : Rocket.defaults.request.async,
               data: (Rocket.exists(uOptions.data)) ? uOptions.data : Rocket.defaults.request.data,
               dataForce: (Rocket.is.string(uOptions.dataForce)) ? uOptions.dataForce : Rocket.defaults.request.dataForce,
               dataType: (Rocket.exists(uOptions.dataType)) ? uOptions.dataType : Rocket.defaults.request.dataType,
               headers: (Rocket.is.object(uOptions.headers)) ? uOptions.headers : Rocket.defaults.request.headers,
               onStart: (Rocket.is.function(uOptions.onStart)) ? uOptions.onStart : Rocket.defaults.request.onStart,
               onLoading: (Rocket.is.function(uOptions.onLoading)) ? uOptions.onLoading : Rocket.defaults.request.onLoading,
               onComplete: (Rocket.is.function(uOptions.onComplete)) ? uOptions.onComplete : Rocket.defaults.request.onComplete,
               timeout: (Rocket.is.number(uOptions.timeout)) ? Rocket.time.seconds(uOptions.timeout) : Rocket.defaults.request.timeout,
               type: (Rocket.exists(uOptions.type)) ? Rocket.string.uppercase.all(uOptions.type) : Rocket.defaults.request.type,
               withCredentials: (Rocket.is.boolean(uOptions.withCredentials)) ? uOptions.withCredentials : Rocket.defaults.request.withCredentials
            };

            var xhr = new XMLHttpRequest();

            xhr.withCredentials = options.withCredentials;

            if (options.timeout) {
               xhr.timeout = options.timeout;
            }

            xhr.onreadystatechange = function () {
               switch (this.readyState) {
                  case 1:
                     if (options.onStart) options.onStart();
                     break;

                  case 3:
                     if (options.onLoading) options.onLoading();
                     break;

                  case 4:
                     if (options.onComplete) options.onComplete(this);

                     if (this.status >= 200 && this.status < 300) {
                        resolve({
                           response: Rocket.helper.parse.json(this.responseText),
                           status: this.status,
                           headers: xhr.getAllResponseHeaders()
                        });
                     } else {
                        reject({
                           error: Rocket.helper.parse.json(this.responseText),
                           status: this.status,
                           headers: xhr.getAllResponseHeaders()
                        });
                     }

                     break;
               }
            };

            // Handle network errors
            xhr.onerror = function() {
               reject({
                  error: 'Network Error',
                  status: xhr.status,
                  headers: xhr.getAllResponseHeaders()
               });
            };

            // Make the request
            if (options.data && options.dataForce !== 'body' && (options.type === 'GET' || options.type === 'DELETE' || options.dataForce === 'queryString')) {
               var queryString = '';
               for (var key in options.data) {
                  if (options.data.hasOwnProperty(key)) {
                     queryString += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
                  }
               }
               options.url = options.url + '?' + Rocket.string.remove.first(queryString);
            }

            xhr.open(options.type, options.url, options.async);

            // Set headers
            if (options.headers) {
               for (var key in options.headers) {
                  if (options.headers.hasOwnProperty(key)) {
                     xhr.setRequestHeader(key, options.headers[key]);
                  }
               }
            }

            // Send (with data if need be)
            if (options.data && options.dataForce !== 'queryString' && (options.type === 'POST' || options.type === 'PUT' || options.type === 'PATCH' || options.dataForce === 'body')) {
               if (Rocket.is.json(options.data)) {
                  var send;

                  switch (Rocket.string.lowercase.all(options.dataType)) {
                     case 'form':
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        var formQuery = '';

                        for (var key in options.data) {
                           if (options.data.hasOwnProperty(key)) {
                              formQuery += '&' + key + '=' + options.data[key];
                           }
                        }

                        send = Rocket.string.remove.first(formQuery);
                        break;

                     case 'formdata':
                        send = new FormData();

                        for (var key in options.data) {
                           if (options.data.hasOwnProperty(key)) {
                              send.append(key, options.data[key]);
                           }
                        }
                        break;

                     default:
                        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
                        send = JSON.stringify(options.data);
                        break;
                  }
                  xhr.send(send);
               } else {
                  xhr.send(options.data);
               }
            } else {
               xhr.send();
            }
         });
      },
      delete: function (uOptions) {
         uOptions.type = 'DELETE';
         return Rocket.request.run(uOptions);
      },
      get: function (uOptions) {
         uOptions.type = 'GET';
         return Rocket.request.run(uOptions);
      },
      patch: function (uOptions) {
         uOptions.type = 'PATCH';
         return Rocket.request.run(uOptions);
      },
      post: function (uOptions) {
         uOptions.type = 'POST';
         return Rocket.request.run(uOptions);
      },
      put: function (uOptions) {
         uOptions.type = 'PUT';
         return Rocket.request.run(uOptions);
      }
   };

   // Setup
   (function setup() {
      if (!Rocket.is.browser() || !window || !window.console) return false;

      if (!Rocket.is.touch() && !Rocket.has.class(Rocket.dom.html, 'rocket-no-touch')) {
         Rocket.classes.add(Rocket.dom.html, 'rocket-no-touch');
      }

      Rocket.overlay.add();
   })();

   // State
   Rocket.state = {
      add: function (elements, state) {
         if (!Rocket.exists(elements) || _var.state.list.indexOf(`${_var.prefix.state}${state}`) < 0) return false;
         Rocket.classes.replace(elements, _var.state.list, `${_var.prefix.state}${state}`);
      },
      clear: function (elements) {
         if (!Rocket.exists(elements)) return false;
         Rocket.classes.remove(elements, _var.state.list);
      },
      toggle: function (inpElements, inpState) {
         const elements = Rocket.array.make(inpElements);
         const state = `${_var.prefix.state}${inpState}`;

         if (!Rocket.exists(elements) || _var.state.list.indexOf(state) < 0) return false;

         const altState = _var.state.alts[inpState];

         for (let i = 0, len = elements.length; i < len; i++) {
            if (Rocket.has.class(elements[i], state)) {
               Rocket.state.clear(elements[i]);
               Rocket.state.add(elements[i], altState);
            } else if (Rocket.has.class(elements[i], `${_var.prefix.state}${altState}`)) {
               Rocket.state.clear(elements[i]);
               Rocket.state.add(elements[i], inpState);
            } else {
               Rocket.state.add(elements[i], state);
            }
         }
      }
   };

   // Storage
   Rocket.storage = {
      add: function (nameObj, value) {
         if (!Rocket.exists(nameObj)) return false;

         if (Rocket.is.string(nameObj)) {
            if (!Rocket.exists(value)) return false;
         } else if (!Rocket.is.object(nameObj) || Rocket.is.array(nameObj)) {
            return false;
         }

         // Continue
         var store = Rocket.storage.getStorageEngine();
         var storeAdd = {};

         // Transform the string / apply the object
         if (Rocket.is.string(nameObj)) {
            storeAdd[nameObj] = value;
         } else {
            storeAdd = nameObj;
         }

         for (var key in storeAdd) {
            if (storeAdd.hasOwnProperty(key)) {
               store[key] = storeAdd[key];
            }
         }

         // Store it
         switch (Rocket.defaults.storage.type) {
            case 'local':
               localStorage.setItem(Rocket.defaults.storage.name, JSON.stringify(store));
               break;

            case 'session':
               sessionStorage.setItem(Rocket.defaults.storage.name, JSON.stringify(store));
               break;
         }
      },
      clear: function (exclusion) {
         function deleteStorage() {
            localStorage.removeItem(Rocket.defaults.storage.name);
            sessionStorage.removeItem(Rocket.defaults.storage.name);
         }

         // Check for exclusion
         if (Rocket.is.string(exclusion)) {
            var exclValue = Rocket.storage.get(exclusion);

            deleteStorage();

            if (exclValue !== false) {
               Rocket.storage.add(exclusion, exclValue);
            }
         } else if (Rocket.is.array(exclusion)) {
            var newStore = {};
            var store = Rocket.storage.getStorageEngine();

            // Build new storage object
            for (var i = 0, len = exclusion.length; i < len; i++) {
               var exclusionValue = store[exclusion[i]];
               if (Rocket.exists(exclusionValue)) {
                  newStore[exclusion[i]] = exclusionValue;
               }
            }

            deleteStorage();

            // Create new storage
            if (Object.keys(newStore).length > 0) {
               Rocket.storage.add(newStore);
            }
         } else {
            deleteStorage();
         }
      },
      get: function (key) {
         if (!Rocket.is.string(key)) return false;
         var store = Rocket.storage.getStorageEngine();
         if (!Rocket.exists(store[key])) return false;
         return store[key];
      },
      getStorageEngine: function () {
         if (!Rocket.defaults.storage.name) {
            Rocket.log('ROCKET: You have not set the storage name. Provide a name for [Rocket].defaults.storage.name.', true);
            return false;
         }

         // Continue
         var store;
         switch (Rocket.defaults.storage.type) {
            case 'local':
               store = localStorage.getItem(Rocket.defaults.storage.name);
               break;

            case 'session':
               store = sessionStorage.getItem(Rocket.defaults.storage.name);
               break;
         }

         if (store) {
            return Rocket.helper.parse.json(store);
         } else {
            return {};
         }
      },
      remove: function (key) {
         if (!Rocket.is.string(key)) return false;
         var store = Rocket.storage.getStorageEngine();

         if (!Rocket.exists(store[key])) return false;

         delete store[key];

         switch (Rocket.defaults.storage.type) {
            case 'local':
               localStorage.setItem(Rocket.defaults.storage.name, JSON.stringify(store));
               break;

            case 'session':
               sessionStorage.setItem(Rocket.defaults.storage.name, JSON.stringify(store));
               break;
         }
      }
   };

   // Strings
   Rocket.string = {
      format: {
         // As per Aliceljm
         // http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
         bytes: function (bytes, decimals) {
            if (typeof bytes !== 'number' || bytes == 0) {
               return '0 Byte';
            }
            var k = 1000;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
         }
      },
      lowercase: {
         all: function (string) {
            return (Rocket.is.string(string)) ? string.toLowerCase() : string;
         },
         first: function (string) {
            return (Rocket.is.string(string)) ? string.charAt(0).toLowerCase() + string.slice(1) : string;
         },
         last: function (string) {
            return (Rocket.is.string(string)) ? string.slice(0, string.length - 1) + string.charAt(string.length - 1).toLowerCase() : string;
         }
      },
      remove: {
         first: function (string) {
            return (Rocket.is.string(string)) ? string.substring(1) : string;
         },
         firstAndLast: function (string) {
            return (Rocket.is.string(string)) ? string.substring(1, string.length - 1) : string;
         },
         last: function (string) {
            return (Rocket.is.string(string)) ? string.substring(0, string.length - 1) : string;
         },
         spaces: function (string) {
            return (Rocket.is.string(string)) ? string.replace(/ /g, '') : string;
         }
      },
      trim: function (string) {
         return (Rocket.is.string(string)) ? string.replace(/^ /, '').replace(/ +$/, '') : string;
      },
      uppercase: {
         all: function (string) {
            return (Rocket.is.string(string)) ? string.toUpperCase() : string;
         },
         first: function (string) {
            return (Rocket.is.string(string)) ? string.charAt(0).toUpperCase() + string.slice(1) : string;
         },
         last: function (string) {
            return (Rocket.is.string(string)) ? string.slice(0, string.length - 1) + string.charAt(string.length - 1).toUpperCase() : string;
         }
      }
   };

   // Time
   Rocket.time = {
      basic: function (thisTime) {
         var transTime = Rocket.date.transform(thisTime);
         if (!transTime) return false;

         // Continue
         var hours = Rocket.time.leadingZero(transTime.getHours());
         var minutes = Rocket.time.leadingZero(transTime.getMinutes());

         return hours + ':' + minutes;
      },
      exact: function (thisTime) {
         var transTime = Rocket.date.transform(thisTime);
         if (!transTime) return false;

         // Continue
         var hours = Rocket.time.leadingZero(transTime.getHours());
         var minutes = Rocket.time.leadingZero(transTime.getMinutes());
         var seconds = Rocket.time.leadingZero(transTime.getSeconds());
         var milliseconds = Rocket.time.leadingZero(transTime.getMilliseconds());

         return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
      },
      full: function (thisTime) {
         var transTime = Rocket.date.transform(thisTime);
         if (!transTime) return false;

         var hours = Rocket.time.leadingZero(transTime.getHours());
         var minutes = Rocket.time.leadingZero(transTime.getMinutes());
         var seconds = Rocket.time.leadingZero(transTime.getSeconds());

         return hours + ':' + minutes + ':' + seconds;
      },
      hours: function (thisTime) {
         var transTime = Rocket.date.transform(thisTime);
         if (!transTime) return false;

         return Rocket.time.leadingZero(transTime.getHours());
      },
      minutes: function (thisTime) {
         var transTime = Rocket.date.transform(thisTime);
         if (!transTime) return false;

         return Rocket.time.leadingZero(transTime.getMinutes());
      },
      seconds: function (thisTime) {
         var transTime = Rocket.date.transform(thisTime);
         if (!transTime) return false;

         return Rocket.time.leadingZero(transTime.getSeconds());
      },
      leadingZero: function (int) {
         return ((int < 10) ? '0' : '') + int;
      }
   };

   // URL
   Rocket.url = {
      all: function () {
         var windowLocation = window.location;
         var fullUrl = windowLocation.href;
         var currentUrl = fullUrl.split('#')[0];
         var hash = windowLocation.hash.substring(1);
         var host = windowLocation.host;
         var protocol = windowLocation.protocol + '//';
         var baseUrl = '';

         if (document.getElementsByTagName('base').length > 0) {
            baseUrl = document.getElementsByTagName('base')[0].href;
         } else {
            baseUrl = protocol + host;
         }

         var pathname = windowLocation.pathname;
         var segments = [];
         var pathnameSplit = pathname.split('/');

         for (var i = 0, len = pathnameSplit.length; i < len; i++) {
            if (pathnameSplit[i].indexOf('.') < 0 && pathnameSplit[i] != '') {
               segments.push(pathnameSplit[i]);
            }
         }

         return {
            base: baseUrl,
            current: currentUrl,
            full: fullUrl,
            hash: hash,
            host: host,
            pathname: pathname,
            protocol: protocol,
            segments: segments
         };
      },
      base: function () {
         return Rocket.url.all().base;
      },
      current: function () {
         return Rocket.url.all().current;
      },
      full: function () {
         return Rocket.url.all().full;
      },
      hash: function () {
         return Rocket.url.all().hash;
      },
      host: function () {
         return Rocket.url.all().host;
      },
      pathname: function () {
         return Rocket.url.all().pathname;
      },
      protocol: function () {
         return Rocket.url.all().protocol;
      },
      segments: function () {
         return Rocket.url.all().segments;
      }
   };
})(Rocket || (Rocket = {}));
