# Rocket Tools
The Rocket Tools library is a lightweight (28 KB) set of Javascript methods for quicker and easier development.

* [Getting Started](#getting-started)
   * [Use In HTML](#use-in-html)
   * [Use In NodeJS](#use-in-nodejs)
* [Initialization](#initialization)
* [Defaults](#defaults)
	* [Basic](#basic)
	* [Regular Expressions](#regular-expressions)
	* [Request](#request)
	* [Storage](#storage)
* [Methods](#methods)
	* [Arrays](#arrays)
	* [Basic Checks](#basic-checks)
	* [Classes](#classes)
	* [Dates](#dates)
	* [Development](#development)
   * [Dimensions](#dimensions)
	* [DOM](#dom)
	* [Events](#events)
	* [Gets](#gets)
	* [Helpers](#helpers)
	* [ID's](#ids)
	* [Inputs](#inputs)
   * [Milliseconds](#milliseconds)
   * [Overlay](#overlay)
	* [Random](#random)
	* [Request](#request-1)
	* [States](#states)
	* [Storage](#storage-1)
	* [Strings](#strings)
	* [Time](#time)
	* [URL](#url)

## Getting Started
You can install Rocket Tools via NPM.

```
npm install rocket-tools
```

#### Use In HTML
Simply add in the Rocket Tools script tag as shown below.

```html
<body>
   /* Your content goes here */
   <script src="rocket-tools/js/tools.min.js"></script>
</body>
```

#### Use In NodeJS
If you wish to use Rocket Tools as a Node module then just require it as you would any other module.

```javascript
const Rocket = require('rocket-tools');
```

**NOTE** that there are slight differences between the NodeJS and standard library files. These differences should not affect its usage but please report any issue should you find any.

## Initialization
The library is automatically initialized and assigned to the variable `Rocket`. This variable acts as the libraries namespace and scopes all methods to this declaration. An example of it in use can be seen below:

```javascript
// Some methods
const boldName = Rocket.string.uppercase.all('Chris Humboldt'); // Convert a string to uppercase
const randomNumber = Rocket.random.integer(); // Generate a random integer
```

Make sure not to overwrite the `Rocket` variable name to anything else within your project. Often a new reference will be made for the library and its defaults making typing easier. For example:

```javascript
// Here we assign the library to a quick variable reference
const _R = Rocket;
const _RD = Rocket.defaults;

const randomNumber = _R.random.integer(); // Generate a random integer
```

**NOTE** that a no touch check is run and the result assigned to the HTML element in the form of a class `rocket-no-touch`. An [overlay](#overlay) is also automatically applied.

## Defaults
You can overwrite the library options globally by altering the defaults. To do so reference the defaults object property.

#### Basic
Property | Default
---- | ----
`defaults.extensions.all` | `['png', 'jpg', 'jpeg', 'json', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv']`
`defaults.extensions.images` | `['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']`
`defaults.log` | `true`

#### Regular Expressions
Property | Default
---- | ----
`defaults.regexp.colour` | <code>/^#([A-Fa-f0-9]{6}&#124;[A-Fa-f0-9]{3})/</code>
`defaults.regexp.date` | `/^[0-9]{4}-[0-9]{2}-[0-9]{2}/`
`defaults.regexp.email` | `/([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i`
`defaults.regexp.password` | `/^(?=.*\d).{6,}/`
`defaults.regexp.time` | <code>/([01]\d&#124;2[0-3]):([0-5]\d)/</code>
`defaults.regexp.url` | `/^(https?:\/\/[^\s]+)/`

#### Request
Property | Default
---- | ----
`defaults.request.async` | `true`
`defaults.request.data` | `false`
`defaults.request.dataForce` | `false`
`defaults.request.dataType` | `json`
`defaults.request.headers` | `false`
`defaults.request.onStart` | `false`
`defaults.request.onLoading` | `false`
`defaults.request.onEnd` | `false`
`defaults.request.timeout` | `false`
`defaults.request.type` | `false`
`defaults.request.withCredentials` | `false`

#### Storage
Property | Options | Default
---- | ---- | ----
`defaults.storage.name` | | `false`
`defaults.storage.type` | `local` `session` | `session`

```javascript
/*
This allows you to use the Rocket.log() method throughout your project
and when deploying to production, assign this a value of "false" to
prevent any forgotten console.log messages from displaying.
*/
Rocket.defaults.log = false;
```

## Methods
Below is a list of the all the methods with a description.

#### Arrays
Method | Defaults | Description
---- | ---- | ----
`array.clean(ar)` | | Remove any `null` values from array `ar`.
`array.make(val, unique)` | unique: `true` `false` | Will **attempt** to return an array based on `val`.<br>`unique` will return only unique array values.<br>`unique` defaults to `false`.
`array.unique(ar)` | | Return only unique array values from array `ar`.

```javascript
const myElement = Rocket.dom.element('element');
const myNumbers = [1,1,2,3,4,5,5,5,5];
const myString = 'This is a string';

Rocket.array.make(myElement); // Returns [element]
Rocket.array.make(myNumbers); // Returns [1,1,2,3,4,5,5,5,5]
Rocket.array.make(myNumbers, true); // Returns [1,2,3,4,5]
Rocket.array.make(myString); // Returns ['This', 'is', 'a', 'string']
```

#### Basic Checks
Method | Description
---- | ----
`exists(x)` | Check if `x` exists. This is based on a `null`, `undefined` and `false` check.
`has.spaces(str)` | Check if string `str` has any spaces.
`has.class(elm, class)` | Check if element `elm` has the class name `class`.
`has.extension(str, ext)` | Check if string `str` has an extension in array `ext`.<br>`ext` checks against the all extensions array and is optional.
`is.array(ar)` | Check if `ar` is an array.
`is.boolean(x)` | Check if `x` is a boolean value.
`is.colour(hex)` | Check if `hex` is a hexadecimal colour code.
`is.date(date, regExp)` | Check if string `date` is in a date format (`regExp` optional).
`is.element(elm)` | Check if `elm` is a DOM element.
`is.email(email, regExp)` | Check if string `email` is a valid email address (`regExp` optional).
`is.function(x)` | Check if `x` is a valid function.
`is.image(str, ext)` | Check if string `str` has an extension in array `ext`.<br>`ext` checks against the images extensions array and is optional.
`is.integer(num)` | Check if `num` is a valid whole number.
`is.json(json)` | Check if `json` is valid JSON.
`is.number(num)` | Check if `num` is a valid number.
`is.object(obj)` | Check if `obj` is a valid object.
`is.password(str, regExp)` | Check if string `str` is a password (`regExp` optional).
`is.string(str)` | Check if `str` is a valid string type.
`is.time(str, regExp)` | Check if string `str` is a valid time value (`regExp` optional).
`is.touch()` | A very basic touchscreen check on the current window.
`is.url(str, regExp)` | Check if string `str` is a valid url (`regExp` optional).

```javascript
const elm = Rocket.dom.element('.element');
const filename = 'filename.json';
const time = '12:54:07';

Rocket.exists(elm); // true
Rocket.has.spaces('This is a test'); // true
Rocket.has.class(elm, 'element'); // true
Rocket.has.extension(filename, ['jpg', 'png']); // false

Rocket.is.number(filename); // false
Rocket.is.time(time); // true
```

#### Classes
All `elms` arguments can be either a string selector or DOM elements.

Method | Description
---- | ----
`classes.add(elms, classes)` | Add class names `classes` to all elements `elms`.
`classes.clear(elms)` | Remove all class names from elements `elms`.
`classes.remove(elms, classes)` | Remove class names `classes` from all elements `elms`.
`classes.replace(elms, remove, add)` | Remove class names `remove` from all elements `elms`.<br>Replace with `add`.
`classes.toggle(elms, class)` | Remove / add class name `class` from all elements `elms`.

```javascript
// Classes can be either a string, space separated string list or an array.
Rocket.classes.add('.element', 'block');
Rocket.classes.add('.element', 'block blue rounded');
Rocket.classes.add('.element', ['block', 'blue', 'rounded']);

Rocket.classes.replace('.element', 'block', 'circle');

// You can also execute class changes on multiple elements at once.
// Here DOM elements are provided instead of a target selector.
// Either option will work.
const elms = Rocket.dom.select('.elements');

Rocket.classes.add(elms, 'block');
```

#### Dates
The arguments in the date methods below are all optional. Also if no `date` is provided or is `false`, then the current date and time will be used.

Method | Options | Description
---- | ---- | ----
`date.basic(date, time)` | time: `true` `false` | Return a basic date value.<br>`time` defaults to `false`.
`date.day(date, type)` | type: `short` `long` | Return the day value of `date`.<br>A `type` of "long" adds a leading zero if required.<br>`type` defaults to `short`.
`date.month(date, type)` | type: `short` `long` `number` | Return the month value of `date`.<br>`type` defaults to `short`.
`date.safe(date, time)` | | Will return a date in a standard safe format. <br>`yyyy-mm-dd`.
`date.transform(date)` | | Attempt to transform `date` into a Javascript date.
`date.year(date, type)` | type: `short` `long` | Return the year value of `date`.<br>`type` defaults to `short`.

```javascript
Rocket.date.basic('22-04-2016', true); // 22 Apr 2016, 16:45
Rocket.date.month('12-03-2016', 'long'); // March
```

#### Development
Method | Description
---- | ----
`log(val)` | Console log `val` if the window.log option is available.<br>The `Rocket.defaults.log` option must also be set to `true`.
`error(val)` | Console out an error `val` if allowed. The `Rocket.defaults.log` option must also be set to `true`.

```javascript
Rocket.log('This is a test.');
```

#### Dimensions
Method | Description
---- | ----
`dimensions.height(elm)` | Get the height value of element `elm`.
`dimensions.width(elm)` | Get the width value of element `elm`.

#### DOM
Method | Description
---- | ----
`dom.body` | Access the document body element.
`dom.element(sel)` | Select the first element with selector `sel`.<br>**Only** one element will ever be returned.
`dom.head` | Access the document head element.
`dom.html` | Access the document html element.
`dom.ratio(sel, int)` | Select all elements with selector `sel`.<br>Set the height values to the width values times `int`.
`dom.remove(val)` | Remove element(s). `val` can either be an element or a selector.
`dom.select(sel)` | Select all elements with selector `sel`.<br>**Always** returns an array even if unique selector was used.<br>If you want only one element or the first use `dom.element(sel)`.
`dom.title` | Access the document title element.

```html
<div id="example" style="width:50px;"></div>
<div class="example"></div>
<div class="example"></div>

<script>
Rocket.dom.title.innerHTML = 'New Title'; // The document title is now changed.
Rocket.dom.ratio('#example', 1.5); // The elements height will now be 75px.

Rocket.dom.select('.example'); // Both elements are returned in an array.
Rocket.dom.select('#example')[0]; // This is how you would reference a unique element.
Rocket.dom.element('#example'); // This will return only one element, similar to the above method.

Rocket.dom.remove('#example'); // Remove with selector
Rocket.dom.remove(Rocket.dom.element('example')); // Remove element directly
</script>
```

#### Events
The events methods will automatically determine the best type of event assignment based on your browser.

Method | Description
---- | ----
`event.add(elm, event, func)` | Attach a function `func` to element `elm` when `event` occurs.
`event.remove(elm, event, func)` | Remove function `func` from element `elm` when `event` occurs.

```javascript
const button = Rocket.dom.element('button');
const sayHi = () => {
   alert('Hi');
};

Rocket.event.add(button, 'click', sayHi); // Hi will be alerted every time the button is clicked.
Rocket.event.remove(button, 'click', sayHi); // The sayHi function has now been removed from this event.
```

#### Gets
Method | Description
---- | ----
`get.extension(str)` | Return the extension of string `str`.
`get.index(elm)` | Return the index integer of `elm` in its parent container.

```javascript
Rocket.get.extension('awesome.jpg'); // Returns 'jpg'.
```

#### Helpers
Method | Options | Description
---- | ---- | ----
`helper.parse.json(json)` | | Will attempt to safely parse `json`. |
`helper.setDefault(val, default)` | | Will compare `val` to `default` and return.<br>Should be used for **matching value types** only.

```javascript
const myString = 'This is a string';

Rocket.helper.setDefault(awesome, myString); // Returns 'This is a string' as awesome is undefined.
Rocket.helper.setDefault('Coolio', myString); // Returns 'Coolio' as the types match to string.
Rocket.helper.setDefault(2, myString); // Returns 'This is a string' as 2 is not a string.
```

#### ID's
Method | Description
---- | ----
`id.add(elm, id)` | Add `id` to element `elm`.
`id.remove(elm, id)` | Remove `id` from element `elm`.

```javascript
const elm = Rocket.dom.element('.element');

Rocket.id.add(elm, 'my-element');
Rocket.id.remove(elm, 'my-element');
```

#### Inputs
Method | Description
---- | ----
`input.disable(sel)` | Select all elements (inputs) with selector `sel`.<br>Set a `disabled` attribute on each element.
`input.enable(sel)` | Select all elements (inputs) with selector `sel`.<br>Remove the `disabled` attribute from each element.

```javascript
Rocket.input.disable('.form-input');
Rocket.input.enable('.form-input');
```

#### Milliseconds
Method | Description
---- | ----
`milliseconds.hours(int)` | Return the millisecond value of `int` hours.
`milliseconds.minutes(int)` | Return the millisecond value of `int` minutes.
`milliseconds.seconds(int)` | Return the millisecond value of `int` seconds.

```javascript
Rocket.milliseconds.minutes(5); // Returns '300000' milliseconds
```

#### Overlay
An overlay element is automatically added to the DOM when the library is initialized. It has an id of **rocket-overlay** and has the following methods.

Method | Description
---- | ----
`overlay.add()` | Add the overlay to the page. Will only execute if an existing overlay cannot be found.
`overlay.show()` | Show the overlay.
`overlay.hide()` | Hide the overlay.

#### Random
All arguments are `optional`.

Method | Description
---- | ----
`random.integer(max, min)` | Return a random integer ranging from `min` to `max`.<br>`max` defaults to 10 and `min` defaults to 1.
`random.string(len, text)` | Return a random alphanumeric string of length `len`.<br>`text` defaults to `false` but if `true` will exclude integers. `len` defaults to 5.

#### Request
The `options` is **always** provided in the form of an object. Success and error responses are managed using promises with a [polyfill](https://github.com/stefanpenner/es6-promise) for older browsers.

Method | Description
---- | ----
`request.delete(options)` | Make a `DELETE` request. See the available `options` below.
`request.get(options)` | Make a `GET` request. See the available `options` below.
`request.patch(options)` | Make a `PATCH` request. See the available `options` below.
`request.post(options)` | Make a `POST` request. See the available `options` below.
`request.put(options)` | Make a `PUT` request. See the available `options` below.
`request.run(options)` | Make a request of your choice. See the available `options` below.

**NOTE** that all defaults are set by the [request defaults](#request) above.

Option | Default | Description
---- | ---- | ----
`url` | | Set the request `URL`.
`async` | `true` | Determine if request must be asynchronous.
`data` | `false` | Attach data to the request. `GET`, `DELETE` request data is attached as a query string. `PATCH`, `POST` and `PUT` request data is attached to the body.
`dataForce` | `false` | If set, force the way data is attached. In this way you can attach a body to a `GET` request. The options are `queryString` or `body`.
`dataType` | `json` | Set the data type that you will be sending. The options are `json`, `form` or `formdata`.
`headers` | `false` | Attach custom headers to the request.
`onComplete` | `false` | Attach a function to execute once the request is complete.
`onLoading` | `false` | Attach a function to execute while the request is loading. This is a continuous state.
`onStart` | `false` | Attach a function to execute as the request is made.
`timeout` | `false` | Set the request timeout in seconds.
`type` | `false` | Set the type of request made. **Only used** on the `Rocket.request.run()` method.
`withCredentials` | `false` | Set the `withCredentials` option for the request.

```javascript
Rocket.request.get({
   url: 'http://someurl.com',
   data: {
      key: 'value'
   },
   onStart: () => {
      Rocket.log('Starting request...');
   },
   onComplete: () => {
      Rocket.log('Request done!!!');
   }
})
// Successful response
.then(({ response, status, headers }) => {
   Rocket.log(response);
})
// Error
.catch(({ error, status, headers }) => {
   Rocket.log(status + ': ' + error);
});
```

#### States
There are a predefined list of states with an opposing state that can be added to elements in the form of a class. The states are `active`, `open` and `visible` with the opposites being `inactive`, `closed` and `hidden`. All states are prefixed with `is-`.

Method | Description
---- | ----
`state.add(elms, state)` | Set a `state` on all elements `elms`.
`state.clear(elms)` | Clear all states currently set on all elements `elms`.
`state.toggle(elms, state)` | Set a `state` on all elements `elms`. If set, then change it to its opposing state.

```javascript
const elm = Rocket.dom.element('#my-element');

Rocket.state.set(elm, 'visible'); // A class of 'is-visible' has now been added to this element.
Rocket.state.toggle(elm, 'visible'); // The class has now be changed to 'is-hidden'.
```

#### Storage
These methods facade the browser storage API by putting all data into a JSON object. **NOTE** that in order to use these methods you need to first set the [defaults storage](#storage) name.

Method | Description
---- | ----
`storage.add(key, value)` | Add a `key`, `value` store pair to the storage.
`storage.add(obj)` | Add an object of `key`, `value` store pairs to the storage.
`storage.clear(exclude)` | Destroy storage with the name `Rocket.defaults.storage.name`.<br>`exclude` is optional and allows you to exclude a certain `key` from the clear.<br>`exclude` can be either a string or an array.
`storage.get(key)` | Get the storage `value` of `key`.
`storage.remove(key)` | Remove the storage item reference with `key`.

```javascript
// A storage name is required and only needs to be declared once.
Rocket.defaults.storage.name = 'my-storage-name';

Rocket.storage.add('name', 'Chris Humboldt');
Rocket.storage.get('name'); // Return 'Chris Humboldt'
Rocket.storage.remove('name');

Rocket.storage.clear(); // Storage with name 'my-storage-name' will no longer exist.

// Exclusion example with object add
Rocket.storage.add({
   firstCar: 'Mazda 323',
   lastCar: 'Ford Fiesta',
   coolCar: 'Nissan GT-R'
});
Rocket.storage.clear(['coolCar']); // Only 'coolCar' will remain in the storage.
```

#### Strings
Method | Description
---- | ----
`string.format.bytes(bytes)` | Format the integer `bytes` into a human readable form.<br>This will output KB, MB, GB as needed.
`string.lowercase.all(str)` | Lowercase all characters of `str`.
`string.lowercase.first(str)` | Lowercase the first character of `str`.
`string.lowercase.last(str)` | Lowercase the last character of `str`.
`string.remove.first(str)` | Remove the first character of `str`.
`string.remove.firstAndLast(str)` | Remove the first and last characters of `str`.
`string.remove.last(str)` | Remove the last character of `str`.
`string.remove.spaces(str)` | Remove all space characters of `str`.
`string.trim(str)` | Remove the white space from before and after `str`.
`string.uppercase.all(str)` | Uppercase all characters of `str`.
`string.uppercase.first(str)` | Uppercase the first character of `str`.
`string.uppercase.last(str)` | Uppercase the last character of `str`.

```javascript
const myString = 'hello bright world!';

Rocket.string.remove.firstAndLast(myString); // Returns 'ello bright world'
Rocket.string.uppercase.all(myString); // Returns 'HELLO BRIGHT WORLD!'
```

#### Time
If no `date` is provided or is `false`, then the current date and time will be used.

Method | Description
---- | ----
`time.basic(date)` | Transform and return the time value of `date`. This **excludes** seconds and milliseconds.
`time.exact(date)` | Transform and return the time value of `date`. This **includes** seconds and milliseconds.
`time.full(date)` | Transform and return the time value of `date`. This **includes** seconds.
`time.hours(date)` | Transform and return the hours value of `date`.
`time.minutes(date)` | Transform and return the minutes value of `date`.
`time.seconds(date)` | Transform and return the seconds value of `date`.

```javascript
const myDate = new Date();

Rocket.time.basic(myDate); // Returns the time in format '21:17'
Rocket.time.full(myDate); // Returns the time in format '21:17:05'
Rocket.time.minutes(myDate); // Returns '17'
```

#### URL
Method | Description
---- | ----
`url.all()` | Returns an object containing all URL information. This includes:<br>`base`, `current`, `full`, `hash`, `host`, `pathname`, `protocol` and `segments`.
`url.base()` | Returns the `base` of URL.
`url.current()` | Returns the `current` URL.
`url.full()` | Returns the `full` URL.
`url.hash()` | Returns the `hash` of URL.
`url.host()` | Returns the `host` of URL.
`url.pathname()` | Returns the `pathname` of URL.
`url.protocol()` | Returns the `protocol` of URL.
`url.segments()` | Returns the `segments` of URL.

```javascript
// Let assume the current URL is:
// http://chrishumboldt.com/rocket/test.html

Rocket.url.base(); // Returns 'http://chrishumboldt.com'
Rocket.url.pathname(); // Returns '/rocket/test.html'
```

## Author
Created and maintained by Chris Humboldt<br>
Website: <a href="http://chrishumboldt.com/">chrishumboldt.com</a><br>
Twitter: <a href="https://twitter.com/chrishumboldt">twitter.com/chrishumboldt</a><br>
GitHub <a href="https://github.com/chrishumboldt">github.com/chrishumboldt</a><br>

## Copyright and License
Copyright 2017 Rocket Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
