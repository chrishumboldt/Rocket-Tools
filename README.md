# Webplate Tools
The Webplate Tools library is a lightweight set of Javascript methods that facilitate quicker and easier development.

* [Getting Started](#getting-started)
* [Getting Started With NPM](#getting-started-with-npm)
* [Initialization](#initialization)
	* [Defaults](#defaults)
* [Methods](#methods)
	* [Basic Checks](#basic-checks)
	* [Classes](#classes)
	* [Dates](#dates)
	* [Development](#development)
	* [DOM](#dom)
	* [Events](#events)
	* [Helpers](#helpers)

## Getting Started
You can either download a copy of the source files or install Webplate Tools via Bower.

```
bower install webplate-tools
```

Next include the required Javascript file.

```html
<body>
	/* Your content goes here */
	<script src="js/webplate-tools.min.js"></script>
</body>
```

## Getting Started With NPM
If you instead wish to use Weplate Tools as a Node module simply install using the following command.

```
npm install webplate-tools
```

Once done require Webplate Tools as you would any other module.

```javascript
var Web = require('webplate-tools');
```

`NOTE:` There are slight differences between the Node and standard library files. These differences should not affect its usage but please report any issue should you find any.

## Initialization
The library is automatically initialized due the Revealing Module Pattern used and is bound to the variable `Web`. This variable acts as the libraries namespace and scopes all methods to this declaration. An example of some method calls can be seen below:

```javascript
// Convert a string to uppercase
var boldName = Web.string.uppercase.all('Chris Humboldt');

// Generate a random integer
var randomNumber = Web.random.integer();
```

Make sure not to overwrite or reassign this variable name to anything else within your project.

#### Defaults
You can overwrite the library options globally by altering the defaults. To do so reference the defaults object property.

| Property | Default |
| ---- | ---- |
| `defaults.extensions.all` | ['png', 'jpg', 'jpeg', 'json', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv'] |
| `defaults.extensions.images` | ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png'] |
| `defaults.log` | true |
| `defaults.regexp.colour` | /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/ |
| `defaults.regexp.date` | /^[0-9]{4}-[0-9]{2}-[0-9]{2}/ |
| `defaults.regexp.email` | /([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i |
| `defaults.regexp.float` | /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/ |
| `defaults.regexp.integer` | /^[0-9]+/ |
| `defaults.regexp.password` | /^(?=.*\d).{6,}/ |
| `defaults.regexp.time` | /([01]\d|2[0-3]):([0-5]\d)/ |
| `defaults.regexp.url` | /(https?:\/\/[^\s]+)/g |

##### Example
```javascript
/*
This allows you to use the Web.log() method throughout your project
and when deploying to production, assign this a value of "false" to
prevent any forgotten console.log messages from displaying.
*/
Web.defaults.log = false;
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

Web.exists(elm); // true
Web.has.spaces('This is a test'); // true
Web.has.class(elm, 'example'); // true
Web.has.extension(filename, ['jpg', 'png']); // false

Web.is.integer(filename); // false
Web.is.time(time); // true
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
Web.class.add(elm, 'block');
Web.class.add(elm, 'block blue rounded');
Web.class.add(elm, ['block', 'blue', 'rounded']);

Web.class.replace(elm, 'block', 'circle');

// You can also execute one class change on multiple elements at once.
var elms = document.querySelectorAll('.elements');

Web.class.add(elms, 'block');
```

#### Dates
The arguments in the date methods below are all `optional`. Also if no `date` is provided or is `false`, then the current date and time will be used.

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
Web.date.basic('22-04-2016', true) // 22 April 2016, 16:45
Web.date.month('22-04-2016', 'long') // March
```

#### Development
Method | Description
---- | ----
`log(val)` | Console log `val` if the window.log option is available. The `defaults.log` option must also be set to `true`.

```javascript
Web.log('This is a test.');
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
Web.dom.ratio('#example', 1.5); // The elements height will now be 75px.
Web.dom.wallpaper('.example'); // A background style is now applied.

Web.dom.select('.example'); // Both elements are returned in an array.
Web.dom.select('#example')[0]; // This is how you would reference a unique element.

Web.dom.title.innerHTML = 'New Title'; // The document title is now changed.
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

Web.event.add(button, 'click', sayHi); // Hi will be alerted every time the button is clicked.
Web.event.remove(button, 'click', sayHi); // The sayHi function has now been removed from this event.
```

#### Helpers
Method | Options | Description
---- | ---- | ----
`helper.makeArray(val, unique)` | unique: `true` `false` | Will **attempt** to return an array based on `val`.<br>`unique` will return only uniqeu array values and defaults to `false`.
