define(function(require, exports, module) {
    "use-strict";
    
    // get the modules we'll be using from brackets
    var AppInit = brackets.getModule("utils/AppInit");
    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus = brackets.getModule("command/Menus");
    var EditorManager = brackets.getModule("editor/EditorManager");
    var KeyEvent = brackets.getModule("utils/KeyEvent");
    
    // the unique identifiers used to trigger actions
    var ThreeJSCommandID = "hamdanjaveed.snippets.threejs";
    
    // the threejs code snippet
    var threejs = require("text!threejs.snip");
    
    // handle the three js insertion command
    function insertThreeJSSnip() {
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
    
    // handle a key event
    function handleKeyEvent($event, editor, event) {
        if ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_TAB)) {
            console.log("Tab pressed!");
        }
    }
    
    // when brackets has finished loading ...
    AppInit.appReady(function() {
        // ... register the threejs menu command
        CommandManager.register("Three JS", ThreeJSCommandID, insertThreeJSSnip);
        
        var editor = EditorManager.getFocusedEditor();
        $(editor).on("keyEvent", handleKeyEvent);
        $(EditorManager).on("activeEditorChange", editorDidChange);
        
        // add a 'Snippets' menu into the main menu bar
        var snippetsMenu = Menus.addMenu("Snippets", "hamdanjaveed.snippets");
        // add a threejs menu item with a keyboard shortcut
        snippetsMenu.addMenuItem(ThreeJSCommandID, {"key":"Ctrl-3"});
    });
    
    // handle an editor switch (when switching between files)
    function editorDidChange($event, focusedEditor, lostEditor) {
        if (lostEditor) {
            $(lostEditor).off("keyEvent", handleKeyEvent);
        }
        
        if (focusedEditor) {
            $(focusedEditor).on("keyEvent", handleKeyEvent);
        }
    }
});