// would like to eventually have snippets with parameters

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
    var snippets = require("lib/snippets");
    
    function parseLine(line, cursorColumn) {
        var words;
        line = line.substring(0, cursorColumn);
        words = line.split(/\W/);
        return words[words.length - 1];
    }
    
    // handle a key event
    function handleKeyEvent($event, editor, event) {
        var cursorPosition;
        var line;
        var snippetKey;
        if ((event.type === "keydown") && (event.keyCode === KeyEvent.DOM_VK_TAB)) {
            cursorPosition = editor.getCursorPos();
            line = editor.document.getLine(cursorPosition.line);
            snippetKey = parseLine(line, cursorPosition.ch);
            if (snippets[snippetKey]) {
                editor.document.replaceRange(snippets[snippetKey], {
                    line: cursorPosition.line,
                    ch: cursorPosition.ch - snippetKey.length
                }, cursorPosition);
                event.preventDefault();
            }
        }
    }
    
    // when brackets has finished loading ...
    AppInit.appReady(function() {
        var editor = EditorManager.getFocusedEditor();
        $(editor).on("keyEvent", handleKeyEvent);
        $(EditorManager).on("activeEditorChange", editorDidChange);
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
