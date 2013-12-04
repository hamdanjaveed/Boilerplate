define(function(require, exports, module) {
    "use-strict";
    
    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus = brackets.getModule("command/Menus");
    
    var ThreeJSCommandID = "hamdanjaveed.boilerplate.threejs";
    
    var insertThreeJSSnip = function() {
        console.log(threejs);
    }
    
    var AppInit = brackets.getModule("utils/AppInit");
    var threejs = require("text!threejs.snip");
    
    AppInit.appReady(function() {
        CommandManager.register("Three JS", ThreeJSCommandID, insertThreeJSSnip);
        
        var boilerplateMenu = Menus.addMenu("Boilerplate", "hamdanjaveed.boilerplate");
        boilerplateMenu.addMenuItem(ThreeJSCommandID, [{ "key": "Ctrl-3" }, { "key": "Cmd-3", "platform": "mac" }]);
    });
    
    
//    var CommandManager = brackets.getModule("command/CommandManager");
//    var Menus = brackets.getModule("command/Menus");
//    var EditorManager  = brackets.getModule("editor/EditorManager");
//    
//    function handleThreeJS() {
//        var editor = EditorManager.getFocusedEditor();
//        if (editor) {
//            var insertionPos = editor.getCursorPos();
//            editor.document.replaceRange(localStorage.getItem("threejs"), insertionPos);
//        }
//    }
//    
//    var COMMAND_ID = "hamdanjaveed.boilerplate";
//    var THREE_JS_COMMAND_ID = COMMAND_ID + ".threejs";
//    CommandManager.register("Three js", THREE_JS_COMMAND_ID, handleThreeJS);
//    
//    var menu = Menus.addMenu("Boilerplate", COMMAND_ID);
//    menu.addMenuItem(THREE_JS_COMMAND_ID);
//    
//    exports.handleThreeJS = handleThreeJS;
});