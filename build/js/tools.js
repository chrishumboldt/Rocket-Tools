var Rocket;
(function (Rocket) {
    Rocket.defaults = {
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
            name: false,
            type: 'session'
        }
    };
    var rocketMonths = [
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
    var rocketPrefix = {
        basic: 'rocket-',
        state: '_state-'
    };
    var rocketState = {
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
    Rocket.array = {
        clean: function (thisArray) {
            if (!Rocket.is.array(thisArray)) {
                return false;
            }
            ;
            return thisArray.filter(function (value) {
                return (value !== null);
            });
        },
        make: function (arValue, isUnique) {
            var returnArray = [];
            if (!arValue) {
                return returnArray;
            }
            var unique = Rocket.helper.setDefault(isUnique, false);
            if (Rocket.is.array(arValue) && arValue.length > 0) {
                returnArray = arValue;
            }
            else if (Rocket.is.element(arValue)) {
                returnArray.push(arValue);
            }
            else if (Rocket.is.string(arValue)) {
                returnArray = arValue.split(' ');
            }
            else if (Rocket.is.object(arValue)) {
                arValue = Array.prototype.slice.call(arValue);
                if (Rocket.is.array(arValue) && arValue.length > 0) {
                    returnArray = arValue;
                }
            }
            return (unique) ? Rocket.array.unique(returnArray) : returnArray;
        },
        unique: function (thisArray) {
            if (!Rocket.is.array(thisArray)) {
                return false;
            }
            ;
            return thisArray.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
        }
    };
    Rocket.exists = function (check) {
        return (typeof check === 'undefined' || check === null || check === false) ? false : true;
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
            return (allowedTypes.indexOf(file.split('.').pop().toLowerCase()) > -1) ? true : false;
        }
    };
    Rocket.is = {
        array: function (check) {
            return (typeof check === 'object' && check instanceof Array) ? true : false;
        },
        boolean: function (check) {
            return (typeof check === 'boolean');
        },
        browser: function () {
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
            return (element.nodeType && element.nodeType === 1) ? true : false;
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
            return allowedTypes[file.split('.').pop().toLowerCase()];
        },
        integer: function (check) {
            return (Rocket.is.number(check) && (parseFloat(check) === parseInt(check)));
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
            return (typeof check === 'number');
        },
        object: function (check) {
            return (typeof check === 'object');
        },
        password: function (password, thisRegExp) {
            var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.password;
            return regExp.test(password);
        },
        string: function (str) {
            return (typeof str === 'string');
        },
        time: function (time, thisRegExp) {
            var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.time;
            return regExp.test(time);
        },
        touch: function () {
            return 'ontouchstart' in window || 'onmsgesturechange' in window;
        },
        url: function (url, thisRegExp) {
            var regExp = (thisRegExp instanceof RegExp) ? thisRegExp : Rocket.defaults.regexp.url;
            return regExp.test(url);
        }
    };
    Rocket.classMethods = {
        add: function (elements, classNames) {
            Rocket.classMethods.executeClasses(elements, classNames, false);
        },
        clear: function (element) {
            if (Rocket.exists(element)) {
                element.removeAttribute('class');
            }
        },
        executeAdd: function (element, classes) {
            element.className = element.className.split(' ').concat(classes).filter(function (val, i, ar) {
                return (ar.indexOf(val) === i) && (val !== '');
            }).toString().replace(/,/g, ' ');
        },
        executeClasses: function (elements, classesAdd, classesRemove) {
            if (!Rocket.exists(elements)) {
                return false;
            }
            var arElements = Rocket.array.make(elements);
            if (arElements.length < 1) {
                return false;
            }
            var arClassesAdd = Rocket.array.make(classesAdd, true);
            var arClassesRemove = Rocket.array.make(classesRemove, true);
            var actionAdd = (arClassesAdd.length > 0) ? true : false;
            var actionRemove = (arClassesRemove.length > 0) ? true : false;
            for (var i = 0, len = arElements.length; i < len; i++) {
                if (actionAdd) {
                    Rocket.classMethods.executeAdd(arElements[i], arClassesAdd);
                }
                if (actionRemove) {
                    Rocket.classMethods.executeRemove(arElements[i], arClassesRemove);
                }
            }
        },
        executeRemove: function (element, classes) {
            element.className = element.className.split(' ').filter(function (val) {
                return classes.indexOf(val) < 0;
            }).toString().replace(/,/g, ' ');
            if (element.className === '') {
                Rocket.classMethods.clear(element);
            }
        },
        remove: function (elements, classNames) {
            Rocket.classMethods.executeClasses(elements, false, classNames);
        },
        replace: function (elements, classesRemove, classesAdd) {
            Rocket.classMethods.executeClasses(elements, classesAdd, classesRemove);
        },
        toggle: function (elements, className) {
            if (!Rocket.exists(elements) || typeof className !== 'string' || Rocket.has.spaces(className)) {
                return false;
            }
            var arElements = [];
            if (Rocket.is.element(elements)) {
                arElements.push(elements);
            }
            else if (Rocket.is.array(elements)) {
                arElements = elements;
            }
            if (arElements.length < 1) {
                return false;
            }
            for (var i = 0, len = elements.length; i < len; i++) {
                if (!Rocket.has.class(elements[i], className)) {
                    Rocket.classMethods.executeAdd(elements[i], [className]);
                }
                else {
                    Rocket.classMethods.executeRemove(elements[i], [className]);
                }
            }
        }
    };
    Rocket.clone = function (original) {
        return Rocket.helper.parse.json(JSON.stringify(original));
    };
    Rocket.date = {
        basic: function (thisDate, thisWithTime) {
            var transDate = (thisDate) ? Rocket.date.transform(thisDate) : new Date();
            if (!transDate) {
                return false;
            }
            var withTime = (typeof thisWithTime === 'boolean') ? thisWithTime : false;
            var returnValue = '';
            var day = this.day(transDate.getDate());
            var month = this.month(transDate.getMonth() + 1);
            var year = this.year(transDate.getFullYear());
            returnValue += day + ' ' + month + ' ' + year;
            if (withTime) {
                returnValue += ', ' + Rocket.time.basic(thisDate);
            }
            return returnValue;
        },
        day: function (thisDayVal, thisType) {
            var thisDay;
            var type = (typeof thisType === 'string') ? thisType : false;
            if (typeof thisDayVal === 'number') {
                thisDay = thisDayVal;
            }
            else if (typeof thisDayVal === 'string') {
                var transDayVal = Rocket.date.transform(thisDayVal);
                thisDay = (transDayVal) ? transDayVal.getDate() : thisDayVal;
            }
            else {
                thisDay = new Date().getDate();
            }
            if (!thisDay) {
                return false;
            }
            else {
                thisDay = thisDay.toString();
            }
            if (type === 'long') {
                return (thisDay.length === 1) ? '0' + thisDay : thisDay;
            }
            else {
                return parseInt(thisDay);
            }
        },
        safe: function (thisDate, thisWithTime) {
            var newData = (thisDate) ? Rocket.date.transform(thisDate) : new Date();
            if (!newData) {
                return false;
            }
            var withTime = (typeof thisWithTime === 'boolean') ? thisWithTime : false;
            var returnValue = newData.getFullYear() + '-' + ('0' + (newData.getMonth() + 1)).slice(-2) + '-' + ('0' + newData.getDate()).slice(-2);
            if (withTime) {
                returnValue += ' ' + Rocket.time.full(thisDate);
            }
            return returnValue;
        },
        month: function (thisMonthVal, thisType) {
            var thisMonth;
            var type = (typeof thisType === 'string') ? thisType : false;
            if (typeof thisMonthVal === 'number') {
                thisMonth = thisMonthVal;
            }
            else if (typeof thisMonthVal === 'string') {
                var transMonthVal = Rocket.date.transform(thisMonthVal);
                thisMonth = (transMonthVal) ? transMonthVal.getMonth() + 1 : thisMonthVal;
            }
            else {
                thisMonth = new Date().getMonth() + 1;
            }
            if (!thisMonth) {
                return false;
            }
            else {
                thisMonth = thisMonth.toString();
            }
            switch (type) {
                case 'long':
                    thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
                    for (var i = 0, len = rocketMonths.length; i < len; i++) {
                        if (rocketMonths[i].number == thisMonth) {
                            thisMonth = Rocket.string.uppercase.first(rocketMonths[i].name);
                            break;
                        }
                    }
                    break;
                case 'number':
                    thisMonth = parseInt(thisMonth);
                    break;
                default:
                    thisMonth = (thisMonth.length === 1) ? '0' + thisMonth : thisMonth;
                    for (var i = 0, len = rocketMonths.length; i < len; i++) {
                        if (rocketMonths[i].number == thisMonth) {
                            thisMonth = Rocket.string.uppercase.first(rocketMonths[i].nameShort);
                            break;
                        }
                    }
            }
            return thisMonth;
        },
        toISO: function (thisDate, thisFullDate) {
            var fullDate = (typeof thisFullDate !== 'undefined') ? thisFullDate : true;
            if (thisDate.indexOf(' ') > -1) {
                var year = void 0, month = void 0, day = void 0, time_1, returnDate = void 0;
                var dateSplit = thisDate.split(' ');
                for (var i = 0, len = dateSplit.length; i < len; i++) {
                    if (Rocket.is.integer(dateSplit[i])) {
                        if (dateSplit[i].length === 2) {
                            day = dateSplit[i];
                        }
                        else if (dateSplit[i].length === 4) {
                            year = dateSplit[i];
                        }
                    }
                    else if (dateSplit[i].indexOf(':') === 2 && fullDate === true) {
                        time_1 = dateSplit[i];
                    }
                    else {
                        var lowerDateSplit = Rocket.string.lowercase.all(dateSplit[i]);
                        for (var i2 = 0, len2 = rocketMonths.length; i2 < len2; i2++) {
                            if (lowerDateSplit === rocketMonths[i2].name || lowerDateSplit === rocketMonths[i2].nameShort) {
                                month = rocketMonths[i2].number;
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
            function fixDateOrder(fixDate, seperator) {
                return fixDate.split(seperator).reverse().join(seperator);
            }
            ;
            if (typeof thisDate === 'string') {
                var dateIndexDash = thisDate.indexOf('-');
                var dateIndexDot = thisDate.indexOf('.');
                var dateIndexSlash = thisDate.indexOf('/');
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
            var newDate = (typeof thisDate !== 'undefined') ? new Date(thisDate) : new Date();
            if (newDate.toString() == 'Invalid Date') {
                return false;
            }
            return newDate;
        },
        year: function (thisYearVal, thisType) {
            var thisYear;
            var type = (typeof thisType === 'string') ? thisType : false;
            if (typeof thisYearVal === 'number') {
                thisYear = thisYearVal;
            }
            else if (typeof thisYearVal === 'string') {
                var transYearVal = Rocket.date.transform(thisYearVal);
                thisYear = (transYearVal) ? transYearVal.getFullYear() : thisYearVal;
            }
            else {
                thisYear = new Date().getFullYear();
            }
            if (!thisYear) {
                return false;
            }
            else {
                thisYear = thisYear.toString();
            }
            switch (type) {
                case 'long':
                    if (thisYear.length < 4) {
                        var newDate = new Date().getFullYear().toString().substring(0, 4 - thisYear.length).toString();
                        thisYear = parseInt(newDate + thisYear);
                    }
                    else {
                        thisYear = parseInt(thisYear);
                    }
                    break;
                case 'short':
                    if (thisYear.length === 1) {
                        var newDate = new Date().getFullYear().toString().substr(2, 1);
                        thisYear = newDate + thisYear;
                    }
                    else {
                        thisYear = thisYear.substr(thisYear.length - 2, 2);
                    }
                    break;
            }
            return parseInt(thisYear);
        }
    };
    Rocket.log = function (text, thisError) {
        if (Rocket.is.browser() && (!window || !window.console)) {
            return false;
        }
        if (Rocket.defaults.log) {
            var error_1 = (typeof thisError === 'boolean') ? thisError : false;
            if (error_1 && Rocket.is.browser()) {
                throw new Error(text);
            }
            else {
                console.log(text);
            }
        }
    };
    Rocket.error = function (text) {
        Rocket.log(text, true);
    };
    Rocket.dimensions = {
        getWidthOrHeight: function (elm, type) {
            if (!Rocket.is.element(elm) && !Rocket.is.string(elm) && elm !== window) {
                return false;
            }
            if (Rocket.is.string(type) && (type !== 'width' && type !== 'height')) {
                return false;
            }
            var retValue;
            if (elm === window) {
                type = Rocket.string.uppercase.first(type);
                retValue = window['inner' + type] || document.documentElement['client' + type] || document.body['client' + type];
            }
            else {
                if (Rocket.is.string(elm)) {
                    elm = Rocket.dom.select(elm)[0];
                }
                if (elm.length < 1) {
                    return false;
                }
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
    Rocket.dom = {
        body: (typeof document !== 'undefined') ? document.getElementsByTagName('body')[0] : false,
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
                if (Rocket.is.element(selElm)) {
                    selElm.parentNode.removeChild(selElm);
                }
                else if (Rocket.is.string(selElm)) {
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
            var returnElms = [];
            if (!Rocket.is.string(selectors)) {
                return returnElms;
            }
            var selectorSplit = selectors.split(',').map(Rocket.string.trim).filter(function (selector) {
                return selector.length > 0;
            });
            if (selectorSplit.length > 0) {
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
            return Rocket.array.clean(Rocket.array.unique(returnElms));
        },
        title: (typeof document !== 'undefined') ? document.getElementsByTagName('title')[0] : false,
        wallpaper: function (selector) {
            var elements = Rocket.dom.select(selector);
            for (var i = 0, len = elements.length; i < len; i++) {
                var thisWallpaper = elements[i].getAttribute('data-background');
                if (thisWallpaper !== null) {
                    elements[i].style.backgroundImage = 'url("' + thisWallpaper + '")';
                }
            }
        },
        window: (typeof window !== 'undefined') ? window : false,
    };
    Rocket.event = {
        add: function (elem, type, eventHandle) {
            if (elem == null || typeof (elem) == 'undefined')
                return;
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
            if (elem == null || typeof (elem) == 'undefined')
                return;
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
                }
                else if (selector.indexOf('#') > -1) {
                    selectType = 'gebi';
                }
                else if (Rocket.defaults.regexp.selector.tag.test(selector)) {
                    selectType = 'gebtn';
                }
                return selectType;
            }
        }
    };
    Rocket.helper = {
        parse: {
            json: function (json) {
                if (Rocket.is.json(json)) {
                    return JSON.parse(json);
                }
                return json;
            }
        },
        setDefault: function (setValue, defaultValue) {
            if (typeof setValue == 'undefined' && typeof defaultValue == 'undefined') {
                return false;
            }
            else if (typeof setValue != 'undefined' && typeof defaultValue == 'undefined') {
                return setValue;
            }
            else if (typeof setValue === typeof defaultValue) {
                return setValue;
            }
            else {
                return defaultValue;
            }
        }
    };
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
    Rocket.overlay = {
        add: function () {
            var rocketOverlay = document.createElement('div');
            Rocket.id.add(rocketOverlay, rocketPrefix.basic + 'overlay');
            if (!Rocket.exists(document.getElementById(rocketPrefix.basic + 'overlay'))) {
                Rocket.dom.body.appendChild(rocketOverlay);
            }
        },
        hide: function () {
            Rocket.classMethods.remove(Rocket.dom.html, 'rocket-overlay-reveal');
        },
        show: function () {
            setTimeout(function () {
                Rocket.classMethods.add(Rocket.dom.html, 'rocket-overlay-reveal');
            }, 50);
        }
    };
    Rocket.random = {
        integer: function (thisMax, thisMin) {
            var max = (typeof thisMax === 'number') ? thisMax : 10;
            var min = (typeof thisMin === 'number') ? thisMin : 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        string: function (stringLength, thisTextOnly) {
            var rNum;
            var textOnly = (typeof thisTextOnly === 'boolean') ? thisTextOnly : false;
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
            var len = (typeof stringLength === 'number') ? stringLength : 5;
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
    Rocket.request = {
        run: function (uOptions) {
            if (!Rocket.exists(uOptions) || !Rocket.exists(uOptions.url)) {
                return false;
            }
            var options = {
                url: uOptions.url,
                async: (typeof uOptions.async === 'string') ? uOptions.async : Rocket.defaults.request.async,
                data: (Rocket.exists(uOptions.data)) ? uOptions.data : Rocket.defaults.request.data,
                dataForce: (typeof uOptions.dataForce === 'string') ? uOptions.dataForce : Rocket.defaults.request.dataForce,
                dataType: (Rocket.exists(uOptions.dataType)) ? uOptions.dataType : Rocket.defaults.request.dataType,
                headers: (typeof uOptions.headers === 'object') ? uOptions.headers : Rocket.defaults.request.headers,
                onStart: (typeof uOptions.onStart === 'function') ? uOptions.onStart : Rocket.defaults.request.onStart,
                onLoading: (typeof uOptions.onLoading === 'function') ? uOptions.onLoading : Rocket.defaults.request.onLoading,
                onSuccess: (typeof uOptions.onSuccess === 'function') ? uOptions.onSuccess : Rocket.defaults.request.onSuccess,
                onError: (typeof uOptions.onError === 'function') ? uOptions.onError : Rocket.defaults.request.onError,
                onComplete: (typeof uOptions.onComplete === 'function') ? uOptions.onComplete : Rocket.defaults.request.onComplete,
                timeout: (typeof uOptions.timeout === 'number') ? Rocket.time.seconds(uOptions.timeout) : Rocket.defaults.request.timeout,
                type: (Rocket.exists(uOptions.type)) ? Rocket.string.uppercase.all(uOptions.type) : Rocket.defaults.request.type,
                withCredentials: (typeof uOptions.withCredentials === 'boolean') ? uOptions.withCredentials : Rocket.defaults.request.withCredentials
            };
            var xhr = new XMLHttpRequest();
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
                                options.onSuccess(Rocket.helper.parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
                            }
                        }
                        else {
                            if (options.onError) {
                                options.onError(Rocket.helper.parse.json(this.responseText), this.status, xhr.getAllResponseHeaders());
                            }
                        }
                        break;
                }
            };
            if (options.data && options.dataForce !== 'body' && (options.type === 'GET' || options.dataForce === 'queryString')) {
                var queryString = '';
                for (var key in options.data) {
                    if (options.data.hasOwnProperty(key)) {
                        queryString += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
                    }
                }
                options.url = options.url + '?' + Rocket.string.remove.first(queryString);
            }
            xhr.open(options.type, options.url, options.async);
            if (options.headers) {
                for (var key in options.headers) {
                    if (options.headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    }
                }
            }
            if (options.data && options.dataForce !== 'queryString' && (options.type === 'POST' || options.dataForce === 'body')) {
                if (Rocket.is.json(options.data)) {
                    var send = void 0;
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
                }
                else {
                    xhr.send(options.data);
                }
            }
            else {
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
    Rocket.state = {
        add: function (element, state) {
            if (!Rocket.exists(element)) {
                return false;
            }
            var newRocketStates = rocketState.list.slice().map(function (newState) {
                return rocketPrefix.state + newState;
            });
            var stateClass = newRocketStates.splice(newRocketStates.indexOf(rocketPrefix.state + state), 1);
            Rocket.classMethods.replace(element, newRocketStates, stateClass);
        },
        clear: function (element) {
            if (!Rocket.exists(element)) {
                return false;
            }
            var newRocketStates = rocketState.list.slice().map(function (newState) {
                return rocketPrefix.state + newState;
            });
            Rocket.classMethods.remove(element, newRocketStates);
        },
        toggle: function (element, state, thisClear) {
            if (!Rocket.exists(element)) {
                return false;
            }
            if (rocketState.list.indexOf(state) > -1) {
                var altState = rocketState.alts[state] || false;
                var clear = (typeof thisClear === 'boolean') ? thisClear : false;
                var stateClass = rocketPrefix.state + state;
                if (Rocket.has.class(element, stateClass)) {
                    if (clear || altState === false) {
                        this.clear(element);
                    }
                    else {
                        this.add(element, altState);
                    }
                }
                else {
                    this.add(element, state);
                }
            }
        }
    };
    Rocket.storage = {
        add: function (nameObj, value) {
            if (!Rocket.exists(nameObj)) {
                return false;
            }
            if (Rocket.is.string(nameObj)) {
                if (!Rocket.exists(value)) {
                    return false;
                }
            }
            else if (!Rocket.is.object(nameObj) || Rocket.is.array(nameObj)) {
                return false;
            }
            var store = Rocket.storage.getStorageEngine();
            var storeAdd = {};
            if (Rocket.is.string(nameObj)) {
                storeAdd[nameObj] = value;
            }
            else {
                storeAdd = nameObj;
            }
            for (var key in storeAdd) {
                if (storeAdd.hasOwnProperty(key)) {
                    store[key] = storeAdd[key];
                }
            }
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
            ;
            if (Rocket.is.string(exclusion)) {
                var exclValue = Rocket.storage.get(exclusion);
                deleteStorage();
                if (exclValue !== false) {
                    Rocket.storage.add(exclusion, exclValue);
                }
            }
            else if (Rocket.is.array(exclusion)) {
                var newStore = {};
                var store = Rocket.storage.getStorageEngine();
                for (var i = 0, len = exclusion.length; i < len; i++) {
                    var exclusionValue = store[exclusion[i]];
                    if (Rocket.exists(exclusionValue)) {
                        newStore[exclusion[i]] = exclusionValue;
                    }
                }
                deleteStorage();
                if (Object.keys(newStore).length > 0) {
                    Rocket.storage.add(newStore);
                }
            }
            else {
                deleteStorage();
            }
        },
        get: function (key) {
            if (!Rocket.is.string(key)) {
                return false;
            }
            var store = Rocket.storage.getStorageEngine();
            if (!Rocket.exists(store[key])) {
                return false;
            }
            return store[key];
        },
        getStorageEngine: function () {
            if (!Rocket.defaults.storage.name) {
                Rocket.log('ROCKET: You have not set the storage name. Provide a name for [Rocket].defaults.storage.name.', true);
                return false;
            }
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
            }
            return {};
        },
        remove: function (key) {
            if (!Rocket.is.string(key)) {
                return false;
            }
            var store = Rocket.storage.getStorageEngine();
            if (!Rocket.exists(store[key])) {
                return false;
            }
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
    Rocket.string = {
        format: {
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
    Rocket.time = {
        basic: function (thisTime) {
            var transTime = Rocket.date.transform(thisTime);
            if (!transTime) {
                return false;
            }
            var hours = this.leadingZero(transTime.getHours());
            var minutes = Rocket.time.leadingZero(transTime.getMinutes());
            return hours + ':' + minutes;
        },
        exact: function (thisTime) {
            var transTime = Rocket.date.transform(thisTime);
            if (!transTime) {
                return false;
            }
            var hours = Rocket.time.leadingZero(transTime.getHours());
            var minutes = Rocket.time.leadingZero(transTime.getMinutes());
            var seconds = Rocket.time.leadingZero(transTime.getSeconds());
            var milliseconds = Rocket.time.leadingZero(transTime.getMilliseconds());
            return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
        },
        full: function (thisTime) {
            var transTime = Rocket.date.transform(thisTime);
            if (!transTime) {
                return false;
            }
            var hours = Rocket.time.leadingZero(transTime.getHours());
            var minutes = Rocket.time.leadingZero(transTime.getMinutes());
            var seconds = Rocket.time.leadingZero(transTime.getSeconds());
            return hours + ':' + minutes + ':' + seconds;
        },
        hours: function (thisTime) {
            var transTime = Rocket.date.transform(thisTime);
            if (!transTime) {
                return false;
            }
            return this.leadingZero(transTime.getHours());
        },
        milliseconds: {
            hours: function (hours) {
                return hours * 60 * 60 * 1000;
            },
            minutes: function (minutes) {
                return minutes * 60 * 1000;
            },
            seconds: function (seconds) {
                return seconds * 1000;
            }
        },
        minutes: function (thisTime) {
            var transTime = Rocket.date.transform(thisTime);
            if (!transTime) {
                return false;
            }
            return Rocket.time.leadingZero(transTime.getMinutes());
        },
        seconds: function (thisTime) {
            var transTime = Rocket.date.transform(thisTime);
            if (!transTime) {
                return false;
            }
            return Rocket.time.leadingZero(transTime.getSeconds());
        },
        leadingZero: function (int) {
            return ((int < 10) ? '0' : '') + int;
        }
    };
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
            }
            else {
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
