/**
@author Chris Humboldt
**/

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
