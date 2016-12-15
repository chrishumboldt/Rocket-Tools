/**
 * Author: Chris Humboldt
**/

/*
Bind class methods

Tyescript has the "class" keyword locked down, even when using a export variable
declaration before it. I get why but I do not want to change the class methods
name to something less intuitive.

As such I am binding the exposed "classMethods" property to a new "class" property.
A double up I know but so be it. Hopefully I can find an actual solution.
*/
Rocket.class = Rocket.classMethods;

/*
Rocket Node module

If used as a Node module then bind to the module exports. This is handled in
a similar fashion to underscore.
*/
if (typeof exports !== 'undefined' && !exports.nodeType) {
   if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      module.exports = Rocket;
   }
}
