/**
@author Chris Humboldt

NOTE
Rocket serves as the "namespace" for all subsequent modules. Rocket modules do
require this toolset so make sure that this library is loaded first.
**/

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
// Setup
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
         name: <any>false,
         type: 'session'
      }
   }

   // Variables
   const rocketMonths = [{
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
      clean: (thisArray) => {
         // Catch
         if (!is.array(thisArray)) {
            return false;
         };
         // Continue
         return thisArray.filter(value => value !== null);
      },
      make: (arValue: any, isUnique?) => {
         let returnArray = [];

         // Catch
         if (!arValue) { return returnArray; }

         // Continue
         let unique = helper.setDefault(isUnique, false);

         if (is.array(arValue) && arValue.length > 0) {
            returnArray = arValue;
         } else if (is.element(arValue)) {
            returnArray.push(arValue);
         } else if (is.string(arValue)) {
            returnArray = arValue.split(' ');
         } else if (is.object(arValue)) {
            // Try and catch HTMLCollection and NodeList
            arValue = Array.prototype.slice.call(arValue);

            if (is.array(arValue) && arValue.length > 0) {
               returnArray = arValue;
            }
         }

         return (unique) ? array.unique(returnArray) : returnArray;
      },
      unique: (thisArray) => {
         // Catch
         if (!is.array(thisArray)) {
            return false;
         };

         // Continue
         return thisArray.filter((value, index, self) => self.indexOf(value) === index);
      }
   }

   // Basic checks
   export const exists = (check) => {
      return !(typeof check === 'undefined' || check === null || check === false);
   };

   export const has = {
      spaces: (check) => {
         return /\s/.test(check);
      },
      class: (element, thisClass) => {
         return (' ' + element.className + ' ').indexOf(' ' + thisClass + ' ') > -1;
      },
      extension: (file, arAllowedTypes) => {
         let allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.all;
         return (allowedTypes.indexOf(file.split('.').pop().toLowerCase()) > -1);
      }
   };

   export const is = {
      array: (check) => {
         return (typeof check === 'object' && check instanceof Array);
      },
      boolean: (check) => {
         return (typeof check === 'boolean');
      },
      browser: () => {
         /*
         A very basic check to detect if using a browser.
         Lifted this directly from the Require.js check.
         https://github.com/requirejs/requirejs/blob/master/require.js
         */
         return !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
      },
      color: (color) => {
         return is.colour(color);
      },
      colour: (colour) => {
         return defaults.regexp.colour.test(colour);
      },
      date: (date, thisRegExp: any) => {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.date;
         return regExp.test(date);
      },
      element: (element) => {
         return (element.nodeType && element.nodeType === 1);
      },
      email: (email, thisRegExp: any) => {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.email;
         return regExp.test(email);
      },
      function: (check) => {
         return (typeof check === 'function');
      },
      image: (file, arAllowedTypes) => {
         let allowedTypes = (is.array(arAllowedTypes)) ? arAllowedTypes : defaults.extensions.images;
         return allowedTypes[file.split('.').pop().toLowerCase()];
      },
      integer: (check) => {
         return (is.number(check) && (parseFloat(check) === parseInt(check)));
      },
      json: (json) => {
         if (typeof json !== 'object') {
            try {
               JSON.parse(json);
            } catch (e) {
               return false;
            }
         }
         return true;
      },
      number: (check) => {
         return (typeof check === 'number' && !isNaN(check));
      },
      object: (check) => {
         return (typeof check === 'object');
      },
      password: (check, thisRegExp: any) => {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.password;
         return regExp.test(check);
      },
      string: (check) => {
         return (typeof check === 'string');
      },
      time: (check, thisRegExp: any) => {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.time;
         return regExp.test(check);
      },
      touch: () => {
         // Catch
         if (!is.browser() || !window || !window.console) {
            return false;
         }
         // Continue
         return 'ontouchstart' in window || 'onmsgesturechange' in window;
      },
      url: (url, thisRegExp: any) => {
         let regExp = (thisRegExp instanceof RegExp) ? thisRegExp : defaults.regexp.url;
         return regExp.test(url);
      }
   };

   // Classes
   export const classes = {
      add: (elements, classNames) => {
         const elms = (is.string(elements)) ? dom.select(elements) : elements;
         classes.executeClasses(elms, classNames, false);
      },
      clear: (element) => {
         const elms = (is.string(element)) ? dom.select(element) : [element];
         if (elms.length > 0) {
            for (let elm of elms) {
               if (exists(elm)) {
                  elm.removeAttribute('class');
               }
            }
         }
      },
      executeAdd: (element, classes) => {
         element.className = element.className
            .split(' ')
            .concat(classes)
            .filter((val, i, ar) => (ar.indexOf(val) === i) && (val !== ''))
            .toString()
            .replace(/,/g, ' ');
      },
      executeClasses: (elements, classesAdd, classesRemove) => {
         // Catch
         if (!exists(elements)) { return false; }

         // Continue
         // Create elements array
         let arElements = array.make(elements);

         // Catch
         if (arElements.length < 1) { return false; }

         // Create classes array
         let arClassesAdd = array.make(classesAdd, true);
         let arClassesRemove = array.make(classesRemove, true);
         let actionAdd = (arClassesAdd.length > 0) ? true : false;
         let actionRemove = (arClassesRemove.length > 0) ? true : false;

         // Execute
         for (let i = 0, len = arElements.length; i < len; i++) {
            if (actionAdd) {
               classes.executeAdd(arElements[i], arClassesAdd)
            }
            if (actionRemove) {
               classes.executeRemove(arElements[i], arClassesRemove)
            }
         }
      },
      executeRemove: (element, classes) => {
         element.className = element.className
            .split(' ')
            .filter(val => classes.indexOf(val) < 0)
            .toString()
            .replace(/,/g, ' ');

         if (element.className === '') {
            Rocket.classes.clear(element);
         }
      },
      remove: (elements, classNames) => {
         const elms = (is.string(elements)) ? dom.select(elements) : elements;
         classes.executeClasses(elms, false, classNames);
      },
      replace: (elements, classesRemove, classesAdd) => {
         const elms = (is.string(elements)) ? dom.select(elements) : elements;
         classes.executeClasses(elms, classesAdd, classesRemove);
      },
      toggle: (elements, className) => {
         const elms = (is.string(elements)) ? dom.select(elements) : elements;

         // Catch
         if (!exists(elms) || typeof className !== 'string' || has.spaces(className)) {
            return false;
         }

         // Create elements array
         let arElements = [];
         if (is.element(elms)) {
            arElements.push(elms);
         } else if (is.array(elms)) {
            arElements = elms;
         }

         // Catch
         if (arElements.length < 1) {
            return false;
         }
         // Execute
         for (let i = 0, len = arElements.length; i < len; i++) {
            if (!has.class(arElements[i], className)) {
               classes.executeAdd(arElements[i], [className]);
            } else {
               classes.executeRemove(arElements[i], [className]);
            }
         }
      }
   };

   // Clone
   /*
   NOTE
   INCOMPLETE! Needs a ton more work and really is not a viable method right now.
   */
   export const clone = (original: any) => {
      return helper.parse.json(JSON.stringify(original));
   };

   // Dates
   export const date = {
      basic: (thisDate, thisWithTime: boolean) => {
         const transDate = (thisDate) ? date.transform(thisDate) : new Date();
         // Catch
         if (!transDate) {
            return false;
         }
         // Continue
         const withTime = (is.boolean(thisWithTime)) ? thisWithTime : false;
         let returnValue = '';
         const day = date.day(transDate.getDate());
         const month = date.month(transDate.getMonth() + 1);
         const year = date.year(transDate.getFullYear());

         returnValue += day + ' ' + month + ' ' + year;
         if (withTime) {
            returnValue += ', ' + time.basic(thisDate);
         }
         return returnValue;
      },
      day: (thisDayVal, thisType?: string) => {
         let thisDay;
         const type = (is.string(thisType)) ? thisType : false;

         // Get month
         if (is.number(thisDayVal)) {
            thisDay = thisDayVal;
         } else if (is.string(thisDayVal)) {
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
      safe: (thisDate, thisWithTime?: boolean) => {
         const newData = (thisDate) ? date.transform(thisDate) : new Date();
         // Catch
         if (!newData) {
            return false;
         }
         // Continue
         const withTime = (is.boolean(thisWithTime)) ? thisWithTime : false;
         var returnValue = newData.getFullYear() + '-' + ('0' + (newData.getMonth() + 1)).slice(-2) + '-' + ('0' + newData.getDate()).slice(-2);
         if (withTime) {
            returnValue += ' ' + time.full(thisDate);
         }
         return returnValue;
      },
      month: (thisMonthVal, thisType?: string) => {
         let thisMonth;
         const type = (is.string(thisType)) ? thisType : false;

         // Get month
         if (is.number(thisMonthVal)) {
            thisMonth = thisMonthVal;
         } else if (is.string(thisMonthVal)) {
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
      toISO: (thisDate: any, thisFullDate?: any) => {
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
      transform: (thisDate: any) => {
         /*
         NOTE This is not a perfect test. This function will attempt to convert
         any string passed into a date. This should really only be used with date
         formats that are known to be correct.
         */
         function fixDateOrder (fixDate: any, seperator: string) {
            return fixDate.split(seperator).reverse().join(seperator);
         }

         // Execute
         if (is.string(thisDate)) {
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
         }

         // Make the date
         let newDate = (typeof thisDate !== 'undefined') ? new Date(thisDate) : new Date();

         // Fail test
         if (newDate.toString() == 'Invalid Date') {
            return false;
         }
         return newDate;
      },
      year: (thisYearVal: any, thisType?: string) => {
         let thisYear: any;
         const type = (is.string(thisType)) ? thisType : false;

         // Get month
         if (is.number(thisYearVal)) {
            thisYear = thisYearVal;
         } else if (is.string(thisYearVal)) {
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
   export const log = (text: string, thisError?: boolean) => {
      if (is.browser() && (!window || !window.console)) { return; }

      // Continue
      if (defaults.log) {
         let error = (is.boolean(thisError)) ? thisError : false;

         if (error && is.browser()) {
            throw new Error(text);
         } else {
            console.log(text);
         }
      }
   };

   export const error = (text: string) => {
      Rocket.log(text, true);
   };

   // Dimensions
   export const dimensions: any = {
      getWidthOrHeight: (elm: any, type: string) => {
         // Catch
         if (!is.browser() || !window || !window.console) {
            return false;
         }
         if (!is.element(elm) && !is.string(elm) && elm !== window) {
            return false;
         }
         if (is.string(type) && (type !== 'width' && type !== 'height')) {
            return false;
         }
         // Continue
         let retValue;

         // Check for window
         if (elm === window) {
            type = string.uppercase.first(type);
            retValue = window['inner' + type] || document.documentElement['client' + type] || document.body['client' + type];
         } else {
            // Check if string selector
            if (is.string(elm)) {
               elm = dom.select(elm);
               // Catch
               if (elm.length < 1) {
                  return false;
               }
               // Continue
               elm = elm[0];
            }

            // Continue
            if (elm.getClientRects().length) {
               retValue = elm.getBoundingClientRect()[type];
            }
            if (retValue < 1 || retValue == null ) {
               retValue = elm.style[type];
            }
         }

         return parseFloat(retValue) || 0;
      },
      height: (elm: any) => {
         return dimensions.getWidthOrHeight(elm, 'height');
      },
      width: (elm: any) => {
         return dimensions.getWidthOrHeight(elm, 'width');
      }
   }

   // DOM
   export const dom: any = {
      body: (typeof document !== 'undefined') ? document.getElementsByTagName('body')[0] : false,
      element: (selector: any) => {
         /*
         Only a single element is required. The below uses a more performant
         code block to complete this action.
         */
         if (is.string(selector)) {
            switch (get.selector.type(selector)) {
               case 'gebi':
                  return document.getElementById(selector.substring(1));

               default:
                  return document.querySelector(selector);
            }
         }
         // Check if already an element. This really shouldn't happen
         else if (Rocket.is.element(selector)) {
            return selector;
         }
         // Try and catch HTMLCollection and NodeList
         else if (is.object(selector)) {
            selector = Array.prototype.slice.call(selector);

            if (is.array(selector) && selector.length > 0) {
               return selector[0];
            }
         }
         // Fallback
         else {
            return null;
         }
      },
      head: (typeof document !== 'undefined') ? document.getElementsByTagName('head')[0] : false,
      html: (typeof document !== 'undefined') ? document.getElementsByTagName('html')[0] : false,
      ratio: (selector: any, multiplier: number) => {
         let elements = document.querySelectorAll(selector);
         if (typeof (multiplier) === 'undefined') {
            multiplier = 1;
         }
         for (let i = elements.length - 1; i >= 0; i--) {
            elements[i].style.height = Math.floor(elements[i].offsetWidth * multiplier) + 'px';
         }
      },
      remove: (selElm) => {
         if (exists(selElm)) {
            if (is.element(selElm)) {
               selElm.parentNode.removeChild(selElm);
            } else if (is.string(selElm)) {
               let elements = dom.select(selElm);

               for (let i = 0, len = elements.length; i < len; i++) {
                  if (is.element(elements[i])) {
                     elements[i].parentNode.removeChild(elements[i]);
                  }
               }
            }
         }
      },
      select: (selectors: any) => {
         /*
         NOTE
         Get multiple elements. The method assumes that many elements exist
         on the DOM with the "selectors". As such an array will ALWAYS be returned.

         Even an ID selector will return an array as the user has requested
         this particular method type. It's important to maintain consistency.
         */
         let returnElms = [];

         // String selectors
         if (Rocket.is.string(selectors)) {
            returnElms = returnElms.concat(Rocket.dom.selectByString(selectors));
         }
         // Return an element
         else if (Rocket.is.element(selectors)) {
            returnElms.push(selectors);
         }
         // If an array (can be mixed)
         else if (Rocket.is.array(selectors)) {
            var stringSelectors = '';

            for (let selector of selectors) {
               if (Rocket.is.string(selector)) {
                  stringSelectors += `${selector},`;
               }
               else if (Rocket.is.element(selector)) {
                  returnElms.push(selector);
               }
            }

            // Check if there is any string selectors to use
            if (stringSelectors.length > 0) {
               returnElms = returnElms.concat(Rocket.dom.selectByString(stringSelectors));
            }
         }
         // Try and catch HTMLCollection and NodeList
         else if (is.object(selectors)) {
            selectors = Array.prototype.slice.call(selectors);

            if (is.array(selectors) && selectors.length > 0) {
               returnElms = selectors;
            }
         }

         return array.clean(array.unique(returnElms));
      },
      selectByString: (selectors: string) => {
         let returnElms = [];
         let selectorSplit = selectors.split(',').map(string.trim).filter(selector => selector.length > 0);

         if (selectorSplit.length > 0) {
            // Loop through all the selectors
            for (let i = 0, len = selectorSplit.length; i < len; i++) {
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

         return returnElms;
      },
      title: (typeof document !== 'undefined') ? document.getElementsByTagName('title')[0] : false,
      window: (typeof window !== 'undefined') ? window : false,
   };

   // Events
   export const event = {
      add: (elms, type = 'click', eventHandle) => {
         Rocket.event.apply(elms, type, eventHandle, 'add');
      },
      apply: (elms, type = 'click', eventHandle, eventType) => {
         var domElms = Rocket.dom.select(elms);

         // Catch
         if (domElms.length < 1) { return; }

         // Continue
         for (let elm of domElms) {
            // Check event type
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
      remove: (elms, type = 'click', eventHandle) => {
         Rocket.event.apply(elms, type, eventHandle, 'remove');
      }
   };

   // Gets
   export const get = {
      extension: (file) => {
         return file.split('.').pop().toLowerCase();
      },
      index: (node) => {
         return [].indexOf.call(node.parentNode.children, node);
      },
      selector: {
         type: (selector) => {
            let selectType: any = false;

            if (selector.indexOf('.') > -1 || has.spaces(selector) || defaults.regexp.selector.attribute.test(selector)) {
               selectType = 'qsa';
            } else if (selector.indexOf('#') > -1) {
               selectType = 'gebi';
            } else if (defaults.regexp.selector.tag.test(selector)) {
               selectType = 'gebtn';
            }

            return selectType;
         }
      }
   };

   // Helpers
   export const helper = {
      parse: {
         json: (json) => {
            if (is.json(json)) {
               return JSON.parse(json);
            }
            return json;
         }
      },
      setDefault: (setValue, defaultValue) => {
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
      add: (element, id) => {
         if (exists(element)) {
            element.setAttribute('id', id);
         }
      },
      remove: (element) => {
         if (exists(element)) {
            element.removeAttribute('id');
         }
      }
   };

   // Inputs
   export const input = {
      disable: (selector) => {
         const elements = dom.select(selector);

         for (let i = 0, len = elements.length; i < len; i++) {
            elements[i].disabled = true;
         }
      },
      enable: (selector) => {
         const elements = dom.select(selector);

         for (let i = 0, len = elements.length; i < len; i++) {
            elements[i].disabled = false;
         }
      }
   };

   // Milliseconds
   export const milliseconds = {
      hours: (hours: number) => {
         return hours * 60 * 60 * 1000;
      },
      minutes: (minutes: number) => {
         return minutes * 60 * 1000;
      },
      seconds: (seconds: number) => {
         return seconds * 1000;
      }
   };

   // Overlay
   export const overlay = {
      add: () => {
         // Catch
         if (!is.browser() || !window || !window.console) {
            return false;
         }
         // Continue
         let rocketOverlay = document.createElement('div');
         id.add(rocketOverlay, rocketPrefix.basic + 'overlay');

         // Styles
         rocketOverlay.setAttribute('style', '-webkit-transition: all .4s ease-out 0s;-moz-transition: all .4s ease-out 0s;-ms-transition: all .4s ease-out 0s;transition: all .4s ease-out 0s;');
         rocketOverlay.style.display = 'block';
         rocketOverlay.style.position = 'fixed';
         rocketOverlay.style.top = '0';
         rocketOverlay.style.right = '0';
         rocketOverlay.style.bottom = '0';
         rocketOverlay.style.left = '0';
         rocketOverlay.style.backgroundColor = defaults.overlay.backgroundColor;
         rocketOverlay.style.zIndex = '1000';
         rocketOverlay.style.visibility = 'hidden';
         rocketOverlay.style.opacity = '0';
         rocketOverlay.style.filter = 'alpha(opacity=0)';

         if (!exists(document.getElementById(rocketPrefix.basic + 'overlay'))) {
            dom.body.appendChild(rocketOverlay);
         }
      },
      hide: () => {
         // Catch
         if (!is.browser() || !window || !window.console) {
            return false;
         }
         // Continue
         let rocketOverlay = dom.select('#rocket-overlay')[0];
         rocketOverlay.style.visibility = 'hidden';
         rocketOverlay.style.opacity = '0';
         rocketOverlay.style.filter = 'alpha(opacity=0)';
      },
      show: () => {
         // Catch
         if (!is.browser() || !window || !window.console) {
            return false;
         }
         // Continue
         let rocketOverlay = dom.select('#rocket-overlay')[0];

         setTimeout(() => {
            rocketOverlay.style.visibility = 'visible';
            rocketOverlay.style.opacity = '1';
            rocketOverlay.style.filter = 'alpha(opacity=100)';
         }, 50);
      }
   };

   // Random
   export let random = {
      integer: (thisMax: number, thisMin: number) => {
         const max = (typeof thisMax === 'number') ? thisMax : 10;
         const min = (typeof thisMin === 'number') ? thisMin : 1;

         return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      string: (stringLength, thisTextOnly: boolean) => {
         let rNum;
         const textOnly = (is.boolean(thisTextOnly)) ? thisTextOnly : false;
         let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
         const len = (is.number(stringLength)) ? stringLength : 5;
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
      run: (uOptions) => {
         // Catch
         if (!exists(uOptions) || !exists(uOptions.url)) {
            return false;
         }
         // Continue
         let options = {
            url: uOptions.url,
            async: (is.string(uOptions.async)) ? uOptions.async : defaults.request.async,
            data: (exists(uOptions.data)) ? uOptions.data : defaults.request.data,
            dataForce: (is.string(uOptions.dataForce)) ? uOptions.dataForce : defaults.request.dataForce,
            dataType: (exists(uOptions.dataType)) ? uOptions.dataType : defaults.request.dataType,
            headers: (is.object(uOptions.headers)) ? uOptions.headers : defaults.request.headers,
            onStart: (is.function(uOptions.onStart)) ? uOptions.onStart : defaults.request.onStart,
            onLoading: (is.function(uOptions.onLoading)) ? uOptions.onLoading : defaults.request.onLoading,
            onSuccess: (is.function(uOptions.onSuccess)) ? uOptions.onSuccess : defaults.request.onSuccess,
            onError: (is.function(uOptions.onError)) ? uOptions.onError : defaults.request.onError,
            onComplete: (is.function(uOptions.onComplete)) ? uOptions.onComplete : defaults.request.onComplete,
            timeout: (is.number(uOptions.timeout)) ? time.seconds(uOptions.timeout) : defaults.request.timeout,
            type: (exists(uOptions.type)) ? string.uppercase.all(uOptions.type) : defaults.request.type,
            withCredentials: (is.boolean(uOptions.withCredentials)) ? uOptions.withCredentials : defaults.request.withCredentials
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
         if (options.data && options.dataForce !== 'body' && (options.type === 'GET' || options.type === 'DELETE' || options.dataForce === 'queryString')) {
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
         if (options.data && options.dataForce !== 'queryString' && (options.type === 'POST' || options.type === 'PUT' || options.type === 'PATCH' || options.dataForce === 'body')) {
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
      delete: (uOptions) => {
         uOptions.type = 'DELETE';
         request.run(uOptions);
      },
      get: (uOptions) => {
         uOptions.type = 'GET';
         request.run(uOptions);
      },
      patch: (uOptions) => {
         uOptions.type = 'PATCH';
         request.run(uOptions);
      },
      post: (uOptions) => {
         uOptions.type = 'POST';
         request.run(uOptions);
      },
      put: (uOptions) => {
         uOptions.type = 'PUT';
         request.run(uOptions);
      }
   };

   // Setup
   function setup() {
      // Catch
      if (!is.browser() || !window || !window.console) {
         return false;
      }
      // Continue
      // No touch class
      if (!is.touch() && !has.class(dom.html, 'rocket-no-touch')) {
         classes.add(dom.html, 'rocket-no-touch');
      }
      // Add overlay
      overlay.add();
   }
   setup();

   // State
   export let state = {
      add: (element, state) => {
         if (!exists(element)) { return false; }

         let newRocketStates = rocketState.list.slice().map(newState => rocketPrefix.state + newState);
         let stateClass = newRocketStates.splice(newRocketStates.indexOf(rocketPrefix.state + state), 1);
         classes.replace(element, newRocketStates, stateClass);
      },
      clear: (element) => {
         if (!exists(element)) { return false; }

         let newRocketStates = rocketState.list.slice().map(newState => rocketPrefix.state + newState);
         classes.remove(element, newRocketStates);
      },
      toggle: (element, state, thisClear) => {
         if (!exists(element)) {
            return false;
         }

         if (rocketState.list.indexOf(state) > -1) {
            let altState = rocketState.alts[state] || false;
            let clear = (typeof thisClear === 'boolean') ? thisClear : false;
            let stateClass = rocketPrefix.state + state;
            if (has.class(element, stateClass)) {
               if (clear || altState === false) {
                  Rocket.state.clear(element);
               } else {
                  Rocket.state.add(element, altState);
               }
            } else {
               Rocket.state.add(element, state);
            }
         }
      }
   };

   // Storage
   export let storage = {
      add: (nameObj: any, value?: any) => {
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
      clear: (exclusion) => {
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
         } else if (is.array(exclusion)) {
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
         } else {
            deleteStorage();
         }
      },
      get: (key) => {
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
      getStorageEngine: () => {
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


         if (store) {
            return helper.parse.json(store);
         } else {
            return {};
         }
      },
      remove: (key) => {
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
         bytes: (bytes, decimals) => {
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
         all: (string) => {
            return (is.string(string)) ? string.toLowerCase() : string;
         },
         first: (string) => {
            return (is.string(string)) ? string.charAt(0).toLowerCase() + string.slice(1) : string;
         },
         last: (string) => {
            return (is.string(string)) ? string.slice(0, string.length - 1) + string.charAt(string.length - 1).toLowerCase() : string;
         }
      },
      remove: {
         first: (string) => {
            return (is.string(string)) ? string.substring(1) : string;
         },
         firstAndLast: (string) => {
            return (is.string(string)) ? string.substring(1, string.length - 1) : string;
         },
         last: (string) => {
            return (is.string(string)) ? string.substring(0, string.length - 1) : string;
         },
         spaces: (string) => {
            return (is.string(string)) ? string.replace(/ /g, '') : string;
         }
      },
      trim: (string) => {
         return (is.string(string)) ? string.replace(/^ /, '').replace(/ +$/, '') : string;
      },
      uppercase: {
         all: (string) => {
            return (is.string(string)) ? string.toUpperCase() : string;
         },
         first: (string) => {
            return (is.string(string)) ? string.charAt(0).toUpperCase() + string.slice(1) : string;
         },
         last: (string) => {
            return (is.string(string)) ? string.slice(0, string.length - 1) + string.charAt(string.length - 1).toUpperCase() : string;
         }
      }
   };

   // Time
   export const time = {
      basic: (thisTime: any) => {
         const transTime = date.transform(thisTime);

         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         const hours = time.leadingZero(transTime.getHours());
         const minutes = time.leadingZero(transTime.getMinutes());

         return hours + ':' + minutes;
      },
      exact: (thisTime: any) => {
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
      full: (thisTime: any) => {
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
      hours: (thisTime: any) => {
         const transTime = date.transform(thisTime);

         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         return time.leadingZero(transTime.getHours());
      },
      minutes: (thisTime: any) => {
         const transTime = date.transform(thisTime);

         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         return time.leadingZero(transTime.getMinutes());
      },
      seconds: (thisTime: any) => {
         const transTime = date.transform(thisTime);

         // Catch
         if (!transTime) {
            return false;
         }
         // Continue
         return time.leadingZero(transTime.getSeconds());
      },
      leadingZero: (int: any) => {
         return ((int < 10) ? '0' : '') + int;
      }
   };

   // URL
   export let url = {
      all: () => {
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
      base: () => {
         return url.all().base;
      },
      current: () => {
         return url.all().current;
      },
      full: () => {
         return url.all().full;
      },
      hash: () => {
         return url.all().hash;
      },
      host: () => {
         return url.all().host;
      },
      pathname: () => {
         return url.all().pathname;
      },
      protocol: () => {
         return url.all().protocol;
      },
      segments: () => {
         return url.all().segments;
      }
   };
}
