# Rocket Tools
The Rocket Tools library is a lightweight set of Javascript methods that facilitate quicker and easier development.

* [Getting Started](#getting-started)
* [Getting Started With NPM](#getting-started-with-npm)
* [Initialization](#initialization)
* [Defaults](#defaults)
	* [Basic](#basic)
	* [Regular Expressions](#regular-expressions)
	* [Request](#request)
	* [Storage](#storage)
* [Methods](#methods)
	* [Basic Checks](#basic-checks)
	* [Classes](#classes)
	* [Dates](#dates)
	* [Development](#development)
	* [DOM](#dom)
	* [Events](#events)
	* [Helpers](#helpers)
	* [ID's](#ids)
	* [Inputs](#inputs)
	* [Random](#random)
	* [Request](#request-1)
	* [States](#states)
	* [Storage](#storage-1)
	* [Strings](#strings)

## Getting Started
You can either download a copy of the source files or install Rocket Tools via Bower.

```
bower install rocket-tools
```

Next include the required Javascript file.

```html
<body>
	/* Your content goes here */
	<script src="js/rocket-tools.min.js"></script>
</body>
```

## Getting Started With NPM
If you instead wish to use Rocket Tools as a Node module simply install using the following command.

```
npm install rocket-tools
```

Once done require Rocket Tools as you would any other module.

```javascript
var Rocket = require('rocket-tools');
```

`NOTE:` There are slight differences between the Node and standard library files. These differences should not affect its usage but please report any issue should you find any.

## Initialization
The library is initialized and assigned to a variable of your choice, although for the sake of convenience it is recommended to use `Rocket`. This variable acts as the libraries namespace and scopes all methods to this declaration. An example can be seen below:

```javascript
// Initialize
var Rocket = new RocketTools;

// Convert a string to uppercase
var boldName = Rocket.string.uppercase.all('Chris Humboldt');

// Generate a random integer
var randomNumber = Rocket.random.integer();
```

Make sure not to overwrite or reassign this variable name to anything else within your project.

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
`defaults.regexp.colour` | `/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/`
`defaults.regexp.date` | `/^[0-9]{4}-[0-9]{2}-[0-9]{2}/`
`defaults.regexp.email` | `/([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i`
`defaults.regexp.float` | `/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/`
`defaults.regexp.integer` | `/^[0-9]+/`
`defaults.regexp.password` | `/^(?=.*\d).{6,}/`
`defaults.regexp.time` | `/([01]\d|2[0-3]):([0-5]\d)/`
`defaults.regexp.url` | `/(https?:\/\/[^\s]+)/g`

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
`defaults.request.onSuccess` | `false`
`defaults.request.onError` | `false`
`defaults.request.onEnd` | `false`
`defaults.request.timeout` | `false`
`defaults.request.type` | `false`
`defaults.request.withCredentials` | `false`

#### Storage
Property | Default
---- | ----
`defaults.storage.name` | `false`
`defaults.storage.type` | `session`

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

#### Basic Checks
Method | Description
---- | ----
`exists(x)` | Check if `x` exists. This is based on a `null`, `undefined` and `false` check.
`has.spaces(str)` | Check if string `str` has any spaces.
`has.class(el, class)` | Check if element `el` has the class name `class`.
`has.extension(str, ext)` | Check if string `str` has an extension in array `ext`.<br>`ext` checks against the all extensions array and is optional.
`is.array(ar)` | Check if `ar` is an array.
`is.colour(hex)` | Check if `hex` is a hexadecimal colour code.
`is.date(date, regExp)` | Check if string `date` is in a date format (`regExp` optional).
`is.element(el)` | Check if `el` is a DOM element.
`is.email(email, regExp)` | Check if string `email` is a valid email address (`regExp` optional).
`is.float(int)` | Check if `int` is a floating point number.
`is.integer(int)` | Check if `int` is a whole number.
`is.image(str, ext)` | Check if string `str` has an extension in array `ext`.<br>`ext` checks against the images extensions array and is optional.
`is.json(json)` | Check if `json` is valid JSON.
`is.password(str, regExp)` | Check if string `str` is a password (`regExp` optional).
`is.time(str, regExp)` | Check if string `str` is a valid time value (`regExp` optional).
`is.touch()` | A very basic touchscreen check on the current window.
`is.url(str, regExp)` | Check if string `str` is a valid url (`regExp` optional).

```javascript
var elm = document.querySelector('.element');
var filename = 'filename.json';
var time = '12:54:07';

Rocket.exists(elm); // true
Rocket.has.spaces('This is a test'); // true
Rocket.has.class(elm, 'example'); // true
Rocket.has.extension(filename, ['jpg', 'png']); // false

Rocket.is.integer(filename); // false
Rocket.is.time(time); // true
```

#### Classes
Method | Description
---- | ----
`class.add(elms, classes)` | Add class names `classes` to all elements `elms`.
`class.clear(elm)` | Remove all class names from a single element `elm`.
`class.remove(elms, classes)` | Remove class names `classes` from all elements `elms`.
`class.replace(elms, remove, add)` | Remove class names `remove` from all elements `elms`.<br>Replace with `add`.
`class.toggle(elms, class)` | Remove / add class name `class` from all elements `elms`.

```javascript
var elm = document.querySelector('.element');

// Classes can be either a string, space separated string list or an array.
Rocket.class.add(elm, 'block');
Rocket.class.add(elm, 'block blue rounded');
Rocket.class.add(elm, ['block', 'blue', 'rounded']);

Rocket.class.replace(elm, 'block', 'circle');

// You can also execute one class change on multiple elements at once.
var elms = document.querySelectorAll('.elements');

Rocket.class.add(elms, 'block');
```

#### Dates
The arguments in the date methods below are all optional. Also if no `date` is provided or is `false`, then the current date and time will be used.

Method | Options | Description
---- | ---- | ----
`date.basic(date, time)` | time: `true` `false` | Return a basic date value.<br>`time` defaults to `false`.
`date.crtDB()` | | Will return the current date in a standard db format. <br>`yyyy-mm-dd`
`date.day(date, type)` | type: `short` `long` | Return the day value of `date`.<br>A `type` of "long" adds a leading zero if required.<br>`type` defaults to `short`.
`date.month(date, type)` | type: `short` `long` `number` | Return the month value of `date`.<br>`type` defaults to `short`.
`date.toISO(date, time)` | time: `true` `false` | Attempt to transform `date` into an ISO format.<br>`time` defaults to `false`.
`date.transform(date)` | | Attempt to transform `date` into a Javascript date.
`date.year(date, type)` | type: `short` `long` | Return the year value of `date`.<br>`type` defaults to `short`.

```javascript
Rocket.date.basic('22-04-2016', true) // 22 April 2016, 16:45
Rocket.date.month('22-04-2016', 'long') // March
```

#### Development
Method | Description
---- | ----
`log(val)` | Console log `val` if the window.log option is available. The `Rocket.defaults.log` option must also be set to `true`.

```javascript
Rocket.log('This is a test.');
```

#### DOM
Method | Description
---- | ----
`dom.body` | Access the document body element.
`dom.html` | Access the document html element.
`dom.ratio(sel, int)` | Select all elements with selector `sel`.<br>Set the height values to the width values times `int`.
`dom.remove(elms)` | Remove all elements `elms`.
`dom.select(sel)` | Select all elements with selector `sel`.<br>**Always** returns an array even if unique selector was used.
`dom.title` | Access the document title element.
`dom.wallpaper(sel)` | Select all elements with selector `sel`.<br>Set the background image of the element to the elements `data-background` attribute.<br>The background size property will be set to cover.

```html
<div id="example" style="width:50px;"></div>
<div class="example" data-background="img/cool-image-1.jpg"></div>
<div class="example" data-background="img/cool-image-2.jpg"></div>

<script>
Rocket.dom.ratio('#example', 1.5); // The elements height will now be 75px.
Rocket.dom.wallpaper('.example'); // A background style is now applied.

Rocket.dom.select('.example'); // Both elements are returned in an array.
Rocket.dom.select('#example')[0]; // This is how you would reference a unique element.

Rocket.dom.title.innerHTML = 'New Title'; // The document title is now changed.
</script>
```

#### Events
The events methods will automatically determine the best type of event assignment based on your browser.

Method | Description
---- | ----
`event.add(elm, event, func)` | Attach a function `func` to element `elm` when `event` occurs.
`event.remove(elm, event, func)` | Remove function `func` from element `elm` when `event` occurs.

```javascript
var button = document.getElementById('button');
var sayHi = function () {
	alert('Hi');
};

Rocket.event.add(button, 'click', sayHi); // Hi will be alerted every time the button is clicked.
Rocket.event.remove(button, 'click', sayHi); // The sayHi function has now been removed from this event.
```

#### Helpers
Method | Options | Description
---- | ---- | ----
`helper.makeArray(val, unique)` | unique: `true` `false` | Will **attempt** to return an array based on `val`.<br>`unique` will return only unique array values.<br>`unique` defaults to `false`.
`helper.setDefault(val, default)` | | Will compare `val` to `default` and return.<br>Should be used for **matching value types** only.

```javascript
var myElement = document.getElementById('#element');
var myNumbers = [1,1,2,3,4,5,5,5,5];
var myString = 'This is a string';

Rocket.helper.makeArray(myElement); // Returns [element]
Rocket.helper.makeArray(myNumbers); // Returns [1,1,2,3,4,5,5,5,5]
Rocket.helper.makeArray(myNumbers, true) // Returns [1,2,3,4,5]
Rocket.helper.makeArray(myString) // Returns ['This', 'is', 'a', 'string']

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
var elm = document.querySelector('.element');

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

#### Random
All arguments are `optional`.

Method | Description
---- | ----
`random.integer(max, min)` | Return a random integer ranging from `min` to `max`.<br>`max` defaults to 10 and `min` defaults to 1.
`random.string(len, text)` | Return a random alphanumeric string of length `len`.<br>`text` defaults to `false` but if `true` will exclude integers. `len` defaults to 5.

#### Request
The `options` is **always** provided in the form of an object.

Method | Description
---- | ----
`request.delete(options)` | Make a `DELETE` request. See the available `options` below.
`request.get(options)` | Make a `GET` request. See the available `options` below.
`request.post(options)` | Make a `POST` request. See the available `options` below.
`request.put(options)` | Make a `PUT` request. See the available `options` below.
`request.run(options)` | Make a request of your choice. See the available `options` below.

**Note** that all defaults are set by the [request defaults](#request) above.

Option | Default | Description
---- | ---- | ----
`url` | | Set the request `URL`.
`async` | `true` | Determine if request must be asynchronous.
`data` | `false` | Attach data to the request. `GET` request date it attached as a query string. `POST` request data is attached in the body.
`dataForce` | `false` | If set, force the way data is attached. In this way you can attach a body to a `GET` request. The options are `queryString` or `body`.
`dataType` | `json` | Set the data type that you will be sending. The options are `json`, `form` or `formdata`.
`headers` | `false` | Attach custom headers to the request.
`onComplete` | `false` | Attach a function to execute once the request is complete.
`onError` | `false` | Attach a function to execute if the request is unsuccessful. The `error`, `status` and `header` variables are returned.
`onLoading` | `false` | Attach a function to execute while the request is loading. This is a continuous state.
`onStart` | `false` | Attach a function to execute as the request is made.
`onSuccess` | `false` | Attach a function to execute if the request is successful. The `data`, `status` and `header` variables are returned.
`timeout` | `false` | Set the request timeout in seconds.
`type` | `false` | Set the type of request made. **Only used** on the `Rocket.request.run()` method.
`withCredentials` | `false` | Set the `withCredentials` option for the request.

```javascript
Rocket.request.get({
	url: 'http://restplate.com/api/tests/get',
	data: {
		key: 'value'
	},
	onStart: function () {
		Rocket.log('Starting request...');
	},
	onError: function (error, status) {
		Rocket.log(status + ': ' + error);
	},
	onSuccess: function (data) {
		Rocket.log(data);
	},
	onComplete: function () {
		Rocket.log('Request done!!!');
	}
});
```

#### States
There are a predefined list of states with an opposing state that can be added to elements in the form of a class. The states are `active`, `open` and `visible` with the opposites being `inactive`, `closed` and `hidden`. All states are prefixed with `_state-`.

Method | Description
---- | ----
`state.add(elm, state)` | Set a `state` on a single element `elm`.
`state.clear(elm)` | Clear all states currently set on a single element `elm`.
`state.toggle(elm, state)` | Set a `state` on a single element `elm`. If set, then change it to its opposing state.

```javascript
var elm = document.getElementById('my-element');

Rocket.state.set(elm, 'visible'); // A class of '_state-visible' has now been added to this element.
Rocket.state.toggle(elm, 'visible'); // The class has now be changed to '_state-hidden'.
```

#### Storage
These methods facade the browser storage API by putting all data into a JSON object. **Note** that in order to use these methods you need to first set the [defaults storage](#storage) name.

Method | Description
---- | ----
`storage.add(key, value)` | Add a `key`, `value` store pair to the storage.
`storage.clear()` | Destroy the storage with the name set by `Rocket.defaults.storage.name`.
`storage.get(key)` | Get the storage `value` of `key`.
`storage.remove(key)` | Remove the storage item reference with `key`.

```javascript
// A storage name is required and only needs to be declared once.
Rocket.defaults.storage.name = 'my-storage-name';

Rocket.storage.add('name', 'Chris Humboldt');
Rocket.storage.get('name'); // Return 'Chris Humboldt'
Rocket.storage.remove('name');

Rocket.storage.clear(); // Storage with name 'my-storage-name' will no longer exist.
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
`string.uppercase.all(str)` | Uppercase all characters of `str`.
`string.uppercase.first(str)` | Uppercase the first character of `str`.
`string.uppercase.last(str)` | Uppercase the last character of `str`.

```javascript
var myString = 'hello bright world!'.

Rocket.string.remove.firstAndLast(myString); // Returns 'ello bright world'
Rocket.string.uppercase.all(myString); // Returns 'HELLO BRIGHT WORLD!'
```
