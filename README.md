# Webplate Tools
The Webplate Tools library is a lightweight set of Javascript methods that facilitate quicker and easier development.

* [Getting Started](#getting-started)
* [Getting Started With NPM](#getting-started-with-npm)
* [Initialization](#initialization)
	* [Defaults](#defaults)
* [Methods](#methods)
	* [Basic Checks](#basic-checks)

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

**NOTE:** There are slight differences between the Node and standard library files. These differences should not affect its usage but please report any issue should you find any.

## Initialization
The library is automatically initialized due the Revealing Module Pattern used and is bound to the variable **Web**. This variable acts as the libraries namespace and scopes all methods to this declaration. An example of some method calls can be seen below:

```javascript
// Convert a string to uppercase
var boldName = Web.string.uppercase.all('Chris Humboldt');

// Generate a random integer
var randomNumber = Web.random.integer();
```

Make sure not to overwrite or reassign this variable name to anything else within your project.

#### Defaults
You can overwrite the library options globally by altering the defaults. To do so reference the defaults object property. For now there is only the **log** option with the plan to add more as needed.

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
`Web.exists(x)` | Check if **x** exists. This is based on a null, undefined and false check.
`Web.has.spaces(str)` | Check if string **str** has any spaces.
`Web.has.class(el, class)` | Check if element **el** has the class name **class**.
`Web.has.extension(str, ext)` | Check if string **str** has an extension in array **ext**.<br>**ext** checks against the extensions array and is optional.
`Web.is.array(ar)` | Check if **ar** is an array.
`Web.is.colour(hex)` | Check if **hex** is a hexadecimal colour code.
`Web.is.date(date, regExp)` | Check if string **date** is in a date format (**regExp** optional).
`Web.is.element(el)` | Check if **el** is a DOM element.
`Web.is.email(email, regExp)` | Check if string **email** is a valid email address (**regExp** optional).
`Web.is.float(int)` | Check if **int** is a floating point number.
`Web.is.integer(int)` | Check if **int** is an integer (whole number).
`Web.is.image(str, ext)` | Check if string **str** has an extension in array **ext**.<br>**ext** is an array of image types and is optional.
`Web.is.json(json)` | Check if **json** is valid JSON.
`Web.is.password(str, regExp)` | Check if string **str** is a password (**regExp** optional).
`Web.is.time(str, regExp)` | Check if string **str** is a valid time value (**regExp** optional).
`Web.is.touch()` | A very basic touchscreen check.
`Web.is.url(str, regExp)` | Check if string **str** is a valid url (**regExp** optional).

##### Arrays
Name | Value
---- | ----
Extensions | ['png', 'jpg', 'jpeg', 'json', 'gif', 'tif', 'tiff', 'bmp', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv']
Image Extensions | ['jpg', 'jpeg', 'gif', 'tif', 'tiff', 'bmp', 'png']

##### Regular Expressions
| Name | RegExp |
| ---- | ---- |
| date | /^[0-9]{4}-[0-9]{2}-[0-9]{2}/ |
| email | /([\w\.\-]+)@([\w\.\-]+)\.(\w+)/i |
| password | /^(?=.*\d).{6,}/ |
| time | /([01]\d|2[0-3]):([0-5]\d)/ |
| url | /(https?:\/\/[^\s]+)/g |

##### Some Examples
```javascript
var exampleEl = document.querySelector('.element');

Web.exists(exampleEl); // true / false
Web.has.spaces('This is a test'); // true
Web.has.class(exampleEl, 'example'); // true
Web.has.extension('filename.json'); // true
```
