define(function(require, exports, module) {
    "use-strict";
    
    var threejs = require("text!./snip/threejs.snip");
    
    var snippets = Object.create(null);
    snippets.threejs = threejs;
    
    module.exports = snippets;
});