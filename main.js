define(function(require, exports, module) {
    "use-strict";
    
    // get the modules we'll be using from brackets
    var AppInit = brackets.getModule("utils/AppInit");
    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus = brackets.getModule("command/Menus");
    var EditorManager = brackets.getModule("editor/EditorManager");
    
    // the unique identifiers used to trigger actions
    var ThreeJSCommandID = "hamdanjaveed.snippets.threejs";
    
    // the threejs code snippet
    var threejs = require("text!threejs.snip");
    
    // handle the three js insertion command
    var insertThreeJSSnip = function() {
        // get the current editor
        var editor = EditorManager.getCurrentFullEditor();
        // if the editor exits ...
        if (editor) {
            // ... get the insertion position
            var insertionPosition = editor.getCursorPos();
            // insert the code from threejs.snip into the editor
            editor.document.replaceRange(threejs, insertionPosition);
        }
    }
    
    // when brackets has finished loading ...
    AppInit.appReady(function() {
        // ... register the threejs menu command
        CommandManager.register("Three JS", ThreeJSCommandID, insertThreeJSSnip);
        
        // add a 'Snippets' menu into the main menu bar
        var snippetsMenu = Menus.addMenu("Snippets", "hamdanjaveed.snippets");
        // add a threejs menu item with a keyboard shortcut
        snippetsMenu.addMenuItem(ThreeJSCommandID, {"key":"Ctrl-3"});
    });
});