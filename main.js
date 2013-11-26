define(function(require, exports, module) {
    "use-strict";
    
    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus = brackets.getModule("command/Menus");
    var EditorManager  = brackets.getModule("editor/EditorManager");
    
    function handleThreeJS() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var insertionPos = editor.getCursorPos();
            editor.document.replaceRange("$(function() {\n    var width = 1280;\n    var height = 720;\n    \n    // camera parameters\n    var viewAngle = 45;\n    var aspect = width / height;\n    var near = 0.1;\n    var far = 10000;\n  \n    // create a renderer and scene\n    var renderer = new THREE.WebGLRenderer();\n    var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);\n  \n    var scene = new THREE.Scene();\n    scene.add(camera);\n  \n    camera.position.z = 300;\n    \n    // start the renderer\n    renderer.setSize(width, height);\n \n    // attach the render-supplied DOM element\n    document.body.appendChild(renderer.domElement);\n  \n    // set up the sphere vars\n    var radius = 50,\n        segments = 16,\n        rings = 16;\n    \n    // create a new mesh with sphere geometry\n    var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);\n  \n    // add the sphere to the scene\n    scene.add(sphere);\n  \n    // create the sphere's material\n    var sphereMaterial = new THREE.MeshLambertMaterial({\n          color: 0xCC0000\n    });\n   \n    // create a point light\n    var pointLight = new THREE.PointLight(0xFFFFFF);\n   \n    // set its position\n    pointLight.position.x = -10;\n    pointLight.position.y = 50;\n    pointLight.position.z = 130;\n    \n    // add to the scene\n    scene.add(pointLight);\n \n    // draw!\n    function render() {\n        requestAnimationFrame(render);\n        renderer.render(scene, camera);\n    }\n    render();\n});", insertionPos);
        }
    }
    
    var COMMAND_ID = "hamdanjaveed.boilerplate";
    var THREE_JS_COMMAND_ID = COMMAND_ID + ".threejs";
    CommandManager.register("Three js", THREE_JS_COMMAND_ID, handleThreeJS);
    
    var menu = Menus.addMenu("Boilerplate", COMMAND_ID);
    menu.addMenuItem(THREE_JS_COMMAND_ID);
    
    exports.handleThreeJS = handleThreeJS;
});