/**
 * File: build/ts/tools.ts
 * Type: Typescript file
 * Author: Chris Humboldt
**/

/*
NOTE:
Rocket serves as the "namespace" for all subsequent modules. Rocket modules do
not require this toolset but if included make sure that this library is loaded first.
*/

// Table of contents
// Defaults
// Variables
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
// State
// Storage
// Strings
// Time
// URL
// Exports
// Bind Rocket object

// Rocket module
module Rocket {
   // Defaults
   export let defaults = {
      extensions: {
         all: ['png', 'jpg', 'jpeg', 'json', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'],
         images: ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']
      },
      log: true,
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
         name: <any>false,
         type: 'session'
      }
   }

   // Variables
   const rocketMonths = [
      {
         number: '01',
         name: 'january',
         nameShort: 'jan'
      },
      {
         number: '02',
         name: 'february',
         nameShort: 'feb'
      },
      {
         number: '03',
         name: 'march',
         nameShort: 'mar'
      },
      {
         number: '04',
         name: 'april',
         nameShort: 'apr'
      },
      {
         number: '05',
         name: 'may',
         nameShort: 'may'
      },
      {
         number: '06',
         name: 'june',
         nameShort: 'jun'
      },
      {
         number: '07',
         name: 'july',
         nameShort: 'jul'
      },
      {
         number: '08',
         name: 'august',
         nameShort: 'aug'
      },
      {
         number: '09',
         name: 'september',
         nameShort: 'sep'
      },
      {
         number: '10',
         name: 'october',
         nameShort: 'oct'
      },
      {
         number: '11',
         name: 'november',
         nameShort: 'nov'
      },
      {
         number: '12',
         name: 'december',
         nameShort: 'dec'
      }
   ];
   const rocketPrefix = {
      basic: 'rocket-',
      state: '_state-'
   };
   const rocketState = {
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

   // Arrays
   export const array = {
      clean: function (thisArray) {
         // Catch
         if (!is.array(thisArray)) {
            return false;
         };
         // Continue
         return thisArray.filter(function (value) {
            return (value !== null);
         });
      },
      make: function (arValue: any, isUnique?) {
         let returnArray = [];
         // Catch
         if (!arValue) {
            return returnArray;
         }
         // Continue
         let unique = helper.setDefault(isUnique, false);
         if (is.array(arValue) && arValue.length > 0) {
            returnArray = arValue;
         }
         else if (is.element(arValue)) {
            returnArray.push(arValue);
         }
         else if (is.string(arValue)) {
            returnArray = arValue.split(' ');
         }
         else if (is.object(arValue)) {
            // Try and catch HTMLCollection and NodeList
            arValue = Array.prototype.slice.call(arValue);
            if (is.array(arValue) && arValue.length > 0) {
               returnArray = arValue;
            }
         }

         return (unique) ? array.unique(returnArray) : returnArray;
      },
      unique: function (thisArray) {
         // Catch
         if (!is.array(thisArray)) {
            return false;
         };
         // Continue
         return thisArray.filter(function (value, index, self) {
            return self.indexOf(value) === index;
         });
      }
   }

   // Basic checks
   export const exists = function (check) {
      return (typeof check === 'undefined' || check === null || check === false) ? false : true;
   };
   export const has = {
      spaces: function (check) {
         return /\s/.test(check);
      },
      class: function (element, thisClass) {
         return (' ' + element.className + ' ').indexOf(' ' + thisClass + ' ') > -1;
      },
      extension: function (file, arAllowedTypes) {
         let allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.all;
         return (allowedTypes.indexOf(file.split('.').pop().toLowerCase()) > -1) ? true : false;
      }
   };
   export const is = {
      array: function (check) {
         return (typeof check === 'object' && check instanceof Array) ? true : false;
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
         return !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)
      },
      color: function (color) {
         return is.colour(color);
      },
      colour: function (colour) {
         return defaults.regexp.colour.test(colour);
      },
      date: function (date, thisRegExp: any) {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.date;
         return regExp.test(date);
      },
      element: function (element) {
         return (element.nodeType && element.nodeType === 1) ? true : false;
      },
      email: function (email, thisRegExp: any) {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.email;
         return regExp.test(email);
      },
      function: function (check) {
         return (typeof check === 'function');
      },
      image: function (file, arAllowedTypes) {
         let allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.images;
         return allowedTypes[file.split('.').pop().toLowerCase()];
      },
      integer: function (check) {
         return (is.number(check) && (parseFloat(check) === parseInt(check)));
      },
      json: function (json) {
         if (typeof json !== 'object') {
            try {
               JSON.parse(json);
            } catch (e) {
               return false;
            }
         }
         return true;
      },
      number: function (check) {
         return (typeof check === 'number');
      },
      object: function (check) {
         return (typeof check === 'object');
      },
      password: function (password, thisRegExp: any) {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.password;
         return regExp.test(password);
      },
      string: function (str) {
         return (typeof str === 'string');
      },
      time: function (time, thisRegExp: any) {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.time;
         return regExp.test(time);
      },
      touch: function () {
         return 'ontouchstart' in window || 'onmsgesturechange' in window;
      },
      url: function (url, thisRegExp: any) {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.url;
         return regExp.test(url);
      }
   };

   // Classes
   export const classMethods = {
      add: function (elements, classNames) {
         classMethods.executeClasses(elements, classNames, false);
      },
      clear: function (element) {
         if (exists(element)) {
            element.removeAttribute('class');
         }
      },
      executeAdd: function (element, classes) {
         element.className = element.className.split(' ').concat(classes).filter(function (val, i, ar) {
            return (ar.indexOf(val) === i) && (val !== '');
         }).toString().replace(/,/g, ' ');
      },
      executeClasses: function (elements, classesAdd, classesRemove) {
         // Catch
         if (!exists(elements)) {
            return false;
         }
         // Create elements array
         let arElements = array.make(elements);
         // Catch
         if (arElements.length < 1) {
            return false;
         }
         // Create classes array
         let arClassesAdd = array.make(classesAdd, true);
         let arClassesRemove = array.make(classesRemove, true);
         let actionAdd = (arClassesAdd.length > 0) ? true : false;
         let actionRemove = (arClassesRemove.length > 0) ? true : false;

         // Execute
         for (let i = 0, len = arElements.length; i < len; i++) {
            if (actionAdd) {
               classMethods.executeAdd(arElements[i], arClassesAdd)
            }
            if (actionRemove) {
               classMethods.executeRemove(arElements[i], arClassesRemove)
            }
         }
      },
      executeRemove: function (element, classes) {
         element.className = element.className.split(' ').filter(function (val) {
            return classes.indexOf(val) < 0;
         }).toString().replace(/,/g, ' ');
         if (element.className === '') {
            classMethods.clear(element);
         }
      },
      remove: function (elements, classNames) {
         classMethods.executeClasses(elements, false, classNames);
      },
      replace: function (elements, classesRemove, classesAdd) {
         classMethods.executeClasses(elements, classesAdd, classesRemove);
      },
      toggle: function (elements, className) {
         // Catch
         if (!exists(elements) || typeof className !== 'string' || has.spaces(className)) {
            return false;
         }
         // Create elements array
         let arElements = [];
         if (is.element(elements)) {
            arElements.push(elements);
         } else if (is.array(elements)) {
            arElements = elements;
         }
         // Catch
         if (arElements.length < 1) {
            return false;
         }
         // Execute
         for (let i = 0, len = elements.length; i < len; i++) {
            if (!has.class(elements[i], className)) {
               classMethods.executeAdd(elements[i], [className]);
            } else {
               classMethods.executeRemove(elements[i], [className]);
            }
         }
      }
   };

   // Clone
   /*
   NOTE: INCOMPLETE!
   Needs a ton more work and really is not a viable method right now.
   */
   export const clone = function (original: any) {
      return helper.parse.json(JSON.stringify(original));
   };

   // Dates
   export const date = {
      basic: function (thisDate, thisWithTime: boolean) {
         const transDate = date.transform(thisDate);
         // Catch
         if (!transDate) {
            return false;
         }
         // Continue
         const withTime = (typeof thisWithTime === 'boolean') ? thisWithTime : false;
         let returnValue = '';
         const day = this.day(transDate.getDate());
         const month = this.month(transDate.getMonth() + 1);
         const year = this.year(transDate.getFullYear());

         returnValue += day + ' ' + month + ' ' + year;
         if (withTime) {
            returnValue += ', ' + time.basic(thisDate);
         }
         return returnValue;
      },
      crtDB: function (thisDate) {
         const newData = (thisDate) ? date.transform(thisDate) : new Date();
         // Catch
         if (!newData) {
            return false;
         }
         // Continue
         return newData.getFullYear() + '-' + ('0' + (newData.getMonth() + 1)).slice(-2) + '-' + ('0' + newData.getDate()).slice(-2);
      },
      day: function (thisDayVal, thisType: string) {
         let thisDay;
         const type = (typeof thisType === 'string') ? thisType : false;

         // Get month
         if (typeof thisDayVal === 'number') {
            thisDay = thisDayVal;
         } else if (typeof thisDayVal === 'string') {
            const transDayVal = date.transform(thisDayVal);
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
      month: function (thisMonthVal, thisType: string) {
         let thisMonth;
         const type = (typeof thisType === 'string') ? thisType : false;

         // Get month
         if (typeof thisMonthVal === 'number') {
            thisMonth = thisMonthVal;
         } else if (typeof thisMonthVal === 'string') {
            const transMonthVal = date.transform(thisMonthVal);
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
            for (let i = 0, len = rocketMonths.length; i < len; i++) {
               if (rocketMonths[i].number == thisMonth) {
                  thisMonth = string.uppercase.first(rocketMonths[i].name);
                  break;
               }
            }
            break;
            case 'number':
            thisMonth = parseInt(thisMonth);
            break;
            default:
            thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
            for (let i = 0, len = rocketMonths.length; i < len; i++) {
               if (rocketMonths[i].number == thisMonth) {
                  thisMonth = string.uppercase.first(rocketMonths[i].nameShort);
                  break;
               }
            }
         }
         return thisMonth;
      },
      toISO: function (thisDate: any, thisFullDate: any) {
         const fullDate = (typeof thisFullDate !== 'undefined') ? thisFullDate : true;

         // Spaced dates
         if (thisDate.indexOf(' ') > -1) {
            let year, month, day, time, returnDate;
            let dateSplit = thisDate.split(' ');
            for (let i = 0, len = dateSplit.length; i < len; i++) {
               if (is.integer(dateSplit[i])) {
                  if (dateSplit[i].length === 2) {
                     day = dateSplit[i];
                  } else if (dateSplit[i].length === 4) {
                     year = dateSplit[i];
                  }
               } else if (dateSplit[i].indexOf(':') === 2 && fullDate === true) {
                  time = dateSplit[i];
               } else {
                  let lowerDateSplit = string.lowercase.all(dateSplit[i]);
                  for (let i2 = 0, len2 = rocketMonths.length; i2 < len2; i2++) {
                     if (lowerDateSplit === rocketMonths[i2].name || lowerDateSplit === rocketMonths[i2].nameShort) {
                        month = rocketMonths[i2].number;
                        break;
                     }
                  }
               }
            }
            returnDate = year + '-' + month + '-' + day;
            if (fullDate === true && time !== undefined) {
               returnDate += 'T' + time;
            }
            return returnDate;
         }
      },
      transform: function (thisDate: any) {
         /*
         NOTE: This is not a perfect test. This function will attempt to convert
         any string passed into a date. This should really only be used with date
         formats that are known to be correct.
         */
         function fixDateOrder (fixDate: any, seperator: string) {
            return fixDate.split(seperator).reverse().join(seperator);
         };

         // Execute
         let dateIndexDash = thisDate.indexOf('-');
         let dateIndexDot = thisDate.indexOf('.');
         let dateIndexSlash = thisDate.indexOf('/');
         if (dateIndexDash == 2) {
            thisDate = fixDateOrder(thisDate, '-');
         }
         else if (dateIndexDot == 2) {
            thisDate = fixDateOrder(thisDate, '.');
         }
         else if (dateIndexSlash == 2) {
            thisDate = fixDateOrder(thisDate, '/');
         }
         // Make the date
         let newDate = (typeof thisDate !== 'undefined') ? new Date(thisDate) : new Date();
         // Fail test
         if (newDate.toString() == 'Invalid Date') {
            return false;
         }
         return newDate;
      },
      year: function (thisYearVal: any, thisType: string) {
         let thisYear: any;
         const type = (typeof thisType === 'string') ? thisType : false;

         // Get month
         if (typeof thisYearVal === 'number') {
            thisYear = thisYearVal;
         } else if (typeof thisYearVal === 'string') {
            const transYearVal = date.transform(thisYearVal);
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
               let newDate = new Date().getFullYear().toString().substring(0, 4 - thisYear.length).toString();
               thisYear = parseInt(newDate + thisYear);
            } else {
               thisYear = parseInt(thisYear);
            }
            break;
            case 'short':
            if (thisYear.length === 1) {
               let newDate = new Date().getFullYear().toString().substr(2, 1);
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
   export const log = function (text: string, thisError?: boolean) {
      // Catch
      if (is.browser() && (!window || !window.console)) {
         return false;
      }
      // Continue
      if (defaults.log) {
         let error = (typeof thisError === 'boolean') ? thisError : false;
         if (error && is.browser()) {
            throw new Error(text);
         }
         else {
            console.log(text);
         }
      }
   };
   export const error = function (text: string) {
      log(text, true);
   };

   // Dimensions
   export const dimensions: any = {
      getWidthOrHeight: function (elm: any, type: string) {
         // Catch
         if (!is.element(elm) && !is.string(elm) && elm !== window) {
            return false;
         }
         if (!is.string(type) || (type !== 'width' && type !== 'height')) {
            return false;
         }
         // Continue
         let retValue;
         // Check for window
         if (elm === window) {
            switch (type) {
               case 'height':
                  retValue = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                  break;
               case 'width':
                  retValue = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                  break;
            }
         }
         else {
            // Check if string selector
            if (is.string(elm)) {
               elm = dom.select(elm)[0];
            }
            // Catch
            if (elm.length < 1) {
               return false;
            }
            // Continue
            if (elm.getClientRects().length) {
               retValue = elm.getBoundingClientRect()[type];
            }
            if (retValue < 1 || retValue == null ) {
               retValue = elm.style[type];
            }
         }
         // Return
         return parseFloat(retValue) || 0;
      },
      height: function (elm: any) {
         return dimensions.getWidthOrHeight(elm, 'height');
      },
      width: function (elm: any) {
         return dimensions.getWidthOrHeight(elm, 'width');
      }
   }

   // DOM
   export const dom: any = {
      body: (typeof document !== 'undefined') ? document.getElementsByTagName('body')[0] : false,
      html: (typeof document !== 'undefined') ? document.getElementsByTagName('html')[0] : false,
      ratio: function (selector, multiplier: number) {
         let elements = document.querySelectorAll(selector);
         if (typeof (multiplier) === 'undefined') {
            multiplier = 1;
         }
         for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].style.height = Math.floor(elements[i].offsetWidth * multiplier) + 'px';
         }
      },
      remove: function (selElm) {
         if (exists(selElm)) {
            if (is.element(selElm)) {
               selElm.parentNode.removeChild(selElm);
            }
            else if (is.string(selElm)) {
               let elements = dom.select(selElm);
               for (let i = 0, len = elements.length; i < len; i++) {
                  if (is.element(elements[i])) {
                     elements[i].parentNode.removeChild(elements[i]);
                  }
               }
            }
         }
      },
      select: function (selectors) {
         let returnElms = [];
         // Catch
         if (!exists(selectors)) {
            return returnElms;
         }
         // Continue
         let selectorSplit = selectors.split(',').map(string.trim).filter(function (selector) {
            return selector.length > 0;
         });
         if (selectorSplit.length > 0) {
            for (let i = 0, len = selectorSplit.length; i < len; i++) {
               // Select the elements
               switch (get.selector.type(selectorSplit[i])) {
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
         // Return
         return array.clean(array.unique(returnElms));
      },
      title: (typeof document !== 'undefined') ? document.getElementsByTagName('title')[0] : false,
      wallpaper: function (selector) {
         let elements = dom.select(selector);
         for (let i = 0, len = elements.length; i < len; i++) {
            let thisWallpaper = elements[i].getAttribute('data-background');
            if (thisWallpaper !== null) {
               elements[i].style.backgroundImage = 'url("' + thisWallpaper + '")';
            }
         }
      },
      window: (typeof window !== 'undefined') ? window : false,
   };

   // Events
   export const event = {
      add: function (elem, type, eventHandle) {
         if (elem == null || typeof (elem) == 'undefined') return;
         if (elem.addEventListener) {
            elem.addEventListener(type, eventHandle, false);
         }
         else if (elem.attachEvent) {
            elem.attachEvent('on' + type, eventHandle);
         }
         else {
            elem['on' + type] = eventHandle;
         }
      },
      remove: function (elem, type, eventHandle) {
         if (elem == null || typeof (elem) == 'undefined') return;
         if (elem.removeEventListener) {
            elem.removeEventListener(type, eventHandle, false);
         }
         else if (elem.detachEvent) {
            elem.detachEvent('on' + type, eventHandle);
         }
         else {
            elem['on' + type] = eventHandle;
         }
      }
   };

   // Gets
   export const get = {
      extension: function (file) {
         return file.split('.').pop().toLowerCase();
      },
      index: function (node) {
         return [].indexOf.call(node.parentNode.children, node);
      },
      selector: {
         type: function (selector) {
            let selectType: any = false;
            if (selector.indexOf('.') > -1 || has.spaces(selector) || defaults.regexp.selector.attribute.test(selector)) {
               selectType = 'qsa';
            }
            else if (selector.indexOf('#') > -1) {
               selectType = 'gebi';
            }
            else if (defaults.regexp.selector.tag.test(selector)) {
               selectType = 'gebtn';
            }
            return selectType;
         }
      }
   };

   // Helpers
   export const helper = {
      parse: {
         json: function (json) {
            if (is.json(json)) {
               return JSON.parse(json);
            }
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
   export const id = {
      add: function (element, id) {
         if (exists(element)) {
            element.setAttribute('id', id);
         }
      },
      remove: function (element) {
         if (exists(element)) {
            element.removeAttribute('id');
         }
      }
   };

   // Inputs
   export const input = {
      disable: function (selector) {
         const elements = dom.select(selector);
         for (let i = 0, len = elements.length; i < len; i++) {
            elements[i].disabled = true;
         }
      },
      enable: function (selector) {
         const elements = dom.select(selector);
         for (let i = 0, len = elements.length; i < len; i++) {
            elements[i].disabled = false;
         }
      }
   };

   // Overlay
   export const overlay = {
      add: function () {
         let rocketOverlay = document.createElement('div');
         id.add(rocketOverlay, rocketPrefix.basic + 'overlay');
         if (!exists(document.getElementById(rocketPrefix.basic + 'overlay'))) {
            dom.body.appendChild(rocketOverlay);
         }
      },
      hide: function () {
         classMethods.remove(dom.html, 'rocket-overlay-reveal');
      },
      show: function () {
         setTimeout(function () {
            classMethods.add(dom.html, 'rocket-overlay-reveal');
         }, 50);
      }
   };

   // Random
   export let random = {
      integer: function (thisMax: number, thisMin: number) {
         const max = (typeof thisMax === 'number') ? thisMax : 10;
         const min = (typeof thisMin === 'number') ? thisMin : 1;
         return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      string: function (stringLength, thisTextOnly: boolean) {
         let rNum;
         const textOnly = (typeof thisTextOnly === 'boolean') ? thisTextOnly : false;
         let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
         const len = (typeof stringLength === 'number') ? stringLength : 5;
         let randomString = '';
         if (!textOnly) {
            chars += '0123456789';
         }
         for (let i = 0; i < len; i++) {
            rNum = Math.floor(Math.random() * chars.length);
            randomString += chars[rNum];
         }
         return randomString;
      }
   };

   // Request
   export let request = {
      run: function (uOptions) {
         if (!exists(uOptions) || !exists(uOptions.url)) {
            return false;
         }
         let options = {
            url: uOptions.url,
            async: (typeof uOptions.async === 'string') ? uOptions.async : defaults.request.async,
            data: (exists(uOptions.data)) ? uOptions.data : defaults.request.data,
            dataForce: (typeof uOptions.dataForce === 'string') ? uOptions.dataForce : defaults.request.dataForce,
            dataType: (exists(uOptions.dataType)) ? uOptions.dataType : defaults.request.dataType,
            headers: (typeof uOptions.headers === 'object') ? uOptions.headers : defaults.request.headers,
            onStart: (typeof uOptions.onStart === 'function') ? uOptions.onStart : defaults.request.onStart,
            onLoading: (typeof uOptions.onLoading === 'function') ? uOptions.onLoading : defaults.request.onLoading,
            onSuccess: (typeof uOptions.onSuccess === 'function') ? uOptions.onSuccess : defaults.request.onSuccess,
            onError: (typeof uOptions.onError === 'function') ? uOptions.onError : defaults.request.onError,
            onComplete: (typeof uOptions.onComplete === 'function') ? uOptions.onComplete : defaults.request.onComplete,
            timeout: (typeof uOptions.timeout === 'number') ? time.seconds(uOptions.timeout) : defaults.request.timeout,
            type: (exists(uOptions.type)) ? string.uppercase.all(uOptions.type) : defaults.request.type,
            withCredentials: (typeof uOptions.withCredentials === 'boolean') ? uOptions.withCredentials : defaults.request.withCredentials
         };
         let xhr: any = new XMLHttpRequest();
         xhr.withCredentials = options.withCredentials;

         if (options.timeout) {
            xhr.timeout = options.timeout;
         }

         xhr.onreadystatechange = function () {
            switch (this.readyState) {
               case 1:
               if (options.onStart) {
                  options.onStart();
               }
               break;

               case 3:
               if (options.onLoading) {
                  options.onLoading();
               }
               break;

               case 4:
               if (options.onComplete) {
                  options.onComplete(this);
               }
               if (this.status >= 200 && this.status < 300) {
                  if (options.onSuccess) {
                     options.onSuccess(helper.parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
                  }
               } else {
                  if (options.onError) {
                     options.onError(helper.parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
                  }
               }
               break;
            }
         };

         // Make the request
         if (options.data && options.dataForce !== 'body' && (options.type === 'GET' || options.dataForce === 'queryString')) {
            let queryString = '';
            for (let key in options.data) {
               if (options.data.hasOwnProperty(key)) {
                  queryString += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
               }
            }
            options.url = options.url + '?' + string.remove.first(queryString);
         }
         xhr.open(options.type, options.url, options.async);
         // Set headers
         if (options.headers) {
            for (let key in options.headers) {
               if (options.headers.hasOwnProperty(key)) {
                  xhr.setRequestHeader(key, options.headers[key]);
               }
            }
         }

         // Send (with data if need be)
         if (options.data && options.dataForce !== 'queryString' && (options.type === 'POST' || options.dataForce === 'body')) {
            if (is.json(options.data)) {
               let send;
               switch (string.lowercase.all(options.dataType)) {
                  case 'form':
                  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                  let formQuery = '';
                  for (let key in options.data) {
                     if (options.data.hasOwnProperty(key)) {
                        formQuery += '&' + key + '=' + options.data[key];
                     }
                  }
                  send = string.remove.first(formQuery);
                  break;

                  case 'formdata':
                  send = new FormData();
                  for (let key in options.data) {
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
      },
      delete: function (uOptions) {
         uOptions.type = 'DELETE';
         this.run(uOptions);
      },
      get: function (uOptions) {
         uOptions.type = 'GET';
         this.run(uOptions);
      },
      post: function (uOptions) {
         uOptions.type = 'POST';
         this.run(uOptions);
      },
      put: function (uOptions) {
         uOptions.type = 'PUT';
         this.run(uOptions);
      }
   };

   // State
   export let state = {
      add: function (element, state) {
         if (!exists(element)) {
            return false;
         }
         let newRocketStates = rocketState.list.slice().map(function (newState) {
            return rocketPrefix.state + newState;
         });
         let stateClass = newRocketStates.splice(newRocketStates.indexOf(rocketPrefix.state + state), 1);
         classMethods.replace(element, newRocketStates, stateClass);
      },
      clear: function (element) {
         if (!exists(element)) {
            return false;
         }
         let newRocketStates = rocketState.list.slice().map(function (newState) {
            return rocketPrefix.state + newState;
         });
         classMethods.remove(element, newRocketStates);
      },
      toggle: function (element, state, thisClear) {
         if (!exists(element)) {
            return false;
         }
         if (rocketState.list.indexOf(state) > -1) {
            let altState = rocketState.alts[state] || false;
            let clear = (typeof thisClear === 'boolean') ? thisClear : false;
            let stateClass = rocketPrefix.state + state;
            if (has.class(element, stateClass)) {
               if (clear || altState === false) {
                  this.clear(element);
               } else {
                  this.add(element, altState);
               }
            } else {
               this.add(element, state);
            }
         }
      }
   };

   // Storage
   export let storage = {
      add: function (nameObj: any, value?: any) {
         // Catch
         if (!exists(nameObj)) {
            return false;
         }
         if (is.string(nameObj)) {
            if (!exists(value)) {
               return false;
            }
         }
         else if (!is.object(nameObj) || is.array(nameObj)) {
            return false;
         }
         // Continue
         let store = storage.getStorageEngine();
         let storeAdd = {};

         // Transform the string / apply the object
         if (is.string(nameObj)) {
            storeAdd[nameObj] = value;
         }
         else {
            storeAdd = nameObj;
         }
         for (let key in storeAdd) {
            if (storeAdd.hasOwnProperty(key)) {
               store[key] = storeAdd[key];
            }
         }

         // Store it
         switch (defaults.storage.type) {
            case 'local':
            localStorage.setItem(defaults.storage.name, JSON.stringify(store));
            break;

            case 'session':
            sessionStorage.setItem(defaults.storage.name, JSON.stringify(store));
            break;
         }
      },
      clear: function (exclusion) {
         function deleteStorage () {
            localStorage.removeItem(defaults.storage.name);
            sessionStorage.removeItem(defaults.storage.name);
         };
         // Check for exclusion
         if (is.string(exclusion)) {
            let exclValue = storage.get(exclusion);
            deleteStorage();
            if (exclValue !== false) {
               storage.add(exclusion, exclValue);
            }
         }
         else if (is.array(exclusion)) {
            let newStore = {};
            let store = storage.getStorageEngine();
            // Build new storage object
            for (let i = 0, len = exclusion.length; i < len; i++) {
               let exclusionValue = store[exclusion[i]];
               if (exists(exclusionValue)) {
                  newStore[exclusion[i]] = exclusionValue;
               }
            }
            deleteStorage();
            // Create new storage
            if (Object.keys(newStore).length > 0) {
               storage.add(newStore);
            }
         }
         else {
            deleteStorage();
         }
      },
      get: function (key) {
         if (!is.string(key)) {
            return false;
         }
         let store = storage.getStorageEngine();
         // Catch
         if (!exists(store[key])) {
            return false;
         }
         // Continue
         return store[key];
      },
      getStorageEngine: function () {
         // Catch
         if (!defaults.storage.name) {
            log('ROCKET: You have not set the storage name. Provide a name for [Rocket].defaults.storage.name.', true);
            return false;
         }
         // Continue
         let store;
         switch (defaults.storage.type) {
            case 'local':
            store = localStorage.getItem(defaults.storage.name);
            break;

            case 'session':
            store = sessionStorage.getItem(defaults.storage.name);
            break;
         }
         // Return
         if (store) {
            return helper.parse.json(store);
         }
         return {};
      },
      remove: function (key) {
         if (!is.string(key)) {
            return false;
         }
         let store = storage.getStorageEngine();
         // Catch
         if (!exists(store[key])) {
            return false;
         }
         // Continue
         delete store[key];
         switch (defaults.storage.type) {
            case 'local':
            localStorage.setItem(defaults.storage.name, JSON.stringify(store));
            break;

            case 'session':
            sessionStorage.setItem(defaults.storage.name, JSON.stringify(store));
            break;
         }
      }
   };

   // Strings
   export const string = {
      format: {
         // As per Aliceljm
         // http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
         bytes: function (bytes, decimals) {
            if (typeof bytes !== 'number' || bytes == 0) {
               return '0 Byte';
            }
            let k = 1000;
            let dm = decimals + 1 || 3;
            let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
         }
      },
      lowercase: {
         all: function (string) {
            return string.toLowerCase();
         },
         first: function (string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
         },
         last: function (string) {
            return string.slice(0, string.length - 1) + string.charAt(string.length - 1).toLowerCase();
         }
      },
      remove: {
         first: function (string) {
            return string.substring(1);
         },
         firstAndLast: function (string) {
            return string.substring(1, string.length - 1);
         },
         last: function (string) {
            return string.substring(0, string.length - 1);
         },
         spaces: function (string) {
            return string.replace(/ /g, '');
         }
      },
      trim: function (string) {
         return string.replace(/^ /, '').replace(/ +$/, '');
      },
      uppercase: {
         all: function (string) {
            return string.toUpperCase();
         },
         first: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
         },
         last: function (string) {
            return string.slice(0, string.length - 1) + string.charAt(string.length - 1).toUpperCase();
         }
      }
   };

   // Time
   export const time = {
      basic: function (thisTime: any) {
         const transTime = date.transform(thisTime);
         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         const hours = this.leadingZero(transTime.getHours());
         const minutes = time.leadingZero(transTime.getMinutes());
         return hours + ':' + minutes;
      },
      exact: function (thisTime: any) {
         const transTime = date.transform(thisTime);
         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         const hours =  time.leadingZero(transTime.getHours());
         const minutes =  time.leadingZero(transTime.getMinutes());
         const seconds =  time.leadingZero(transTime.getSeconds());
         const milliseconds =  time.leadingZero(transTime.getMilliseconds());

         return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
      },
      full: function (thisTime: any) {
         const transTime = date.transform(thisTime);
         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         const hours = time.leadingZero(transTime.getHours());
         const minutes = time.leadingZero(transTime.getMinutes());
         const seconds = time.leadingZero(transTime.getSeconds());

         return hours + ':' + minutes + ':' + seconds;
      },
      hours: function (hours: number) {
         return hours * 60 * 60 * 1000;
      },
      leadingZero: function (int: any) {
         return ((int < 10) ? '0' : '') + int;
      },
      minutes: function (minutes: number) {
         return minutes * 60 * 1000;
      },
      seconds: function (seconds: number) {
         return seconds * 1000;
      }
   };

   // URL
   export let url = {
      all: function () {
         let windowLocation = window.location;
         let fullUrl = windowLocation.href;

         let currentUrl = fullUrl.split('#')[0];
         let hash = windowLocation.hash.substring(1);
         let host = windowLocation.host;
         let protocol = windowLocation.protocol + '//';

         let baseUrl = '';
         if (document.getElementsByTagName('base').length > 0) {
            baseUrl = document.getElementsByTagName('base')[0].href;
         } else {
            baseUrl = protocol + host;
         }
         let pathname = windowLocation.pathname;
         let segments = [];
         let pathnameSplit = pathname.split('/');
         for (let i = 0, len = pathnameSplit.length; i < len; i++) {
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
         return url.all().base;
      },
      current: function () {
         return url.all().current;
      },
      full: function () {
         return url.all().full;
      },
      hash: function () {
         return url.all().hash;
      },
      host: function () {
         return url.all().host;
      },
      pathname: function () {
         return url.all().pathname;
      },
      protocol: function () {
         return url.all().protocol;
      },
      segments: function () {
         return url.all().segments;
      }
   };
}
