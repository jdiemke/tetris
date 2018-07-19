/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Gamepad.ts":
/*!************************!*\
  !*** ./src/Gamepad.ts ***!
  \************************/
/*! exports provided: Gamepad2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Gamepad2\", function() { return Gamepad2; });\nclass Gamepad2 {\n    constructor() {\n        window.addEventListener('gamepadconnected', (e) => {\n            console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.', e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);\n            this.gamepad = e.gamepad;\n        });\n    }\n    isButtonPressed(index) {\n        if (this.gamepad) {\n            return this.gamepad.buttons[index].pressed;\n        }\n        return false;\n    }\n    isLeft(axis, value) {\n        if (this.gamepad) {\n            return this.gamepad.axes[axis] === value;\n        }\n        return false;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Gamepad.ts?");

/***/ }),

/***/ "./src/Playfield.ts":
/*!**************************!*\
  !*** ./src/Playfield.ts ***!
  \**************************/
/*! exports provided: Playfield */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Playfield\", function() { return Playfield; });\n/**\n * The playfield class\n */\nclass Playfield {\n    constructor(width, height, image) {\n        this.width = width;\n        this.height = height;\n        this.image = image;\n        this.width = width;\n        this.height = height;\n        this.field = new Array(width * height);\n        this.field.fill(0);\n    }\n    isFullRow(row) {\n        let fullRow = true;\n        for (let x = 0; x < this.width; x++) {\n            if (this.field[x + row * this.width] === 0) {\n                fullRow = false;\n                break;\n            }\n        }\n        return fullRow;\n    }\n    removeFullRows() {\n        let removal = false;\n        for (let y = 0; y < this.height; y++) {\n            if (this.isFullRow(y)) {\n                this.field.splice(y * 10, 10);\n                this.field.unshift(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);\n                removal = true;\n            }\n        }\n        return removal;\n    }\n    draw(context) {\n        context.translate(640 / 2 - (12 * 16) / 2, 12);\n        for (let y = 0; y < this.height + 1; y++) {\n            for (let x = 0; x < this.width + 2; x++) {\n                this.drawSprite(context, x, y, 0);\n            }\n        }\n        context.translate(16, 0);\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                const num = this.field[x + y * this.width];\n                if (num !== 0) {\n                    this.drawSprite(context, x, y, num);\n                }\n                else {\n                    this.drawSprite(context, x, y, 1);\n                }\n            }\n        }\n    }\n    drawSprite(context, x, y, sprite) {\n        context.drawImage(this.image, 16 * sprite, 0, 16, 16, x * 16, y * 16, 16, 16);\n    }\n    collides(shape) {\n        const tiles = shape.getTiles();\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            if (this.isSet(tile.x, tile.y)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    setBlocks(shape) {\n        const tiles = shape.getTiles();\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            this.set(tile.x, tile.y, shape.spriteId);\n        }\n        return false;\n    }\n    isSet(x, y) {\n        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {\n            return true;\n        }\n        return this.field[x + y * this.width] !== 0;\n    }\n    set(x, y, tileId = 1) {\n        this.field[x + y * this.width] = tileId;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Playfield.ts?");

/***/ }),

/***/ "./src/Position.ts":
/*!*************************!*\
  !*** ./src/Position.ts ***!
  \*************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Position\", function() { return Position; });\nclass Position {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Position.ts?");

/***/ }),

/***/ "./src/Shape.ts":
/*!**********************!*\
  !*** ./src/Shape.ts ***!
  \**********************/
/*! exports provided: Shape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Shape\", function() { return Shape; });\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ \"./src/Position.ts\");\n\nclass Shape {\n    constructor(tiles, image, sprite = 2) {\n        this.image = image;\n        this.position = new _Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"](3, 0);\n        this.tiles = tiles;\n        this.spriteId = sprite;\n    }\n    draw(context) {\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                const num = this.tiles[y][x];\n                if (num === 1) {\n                    context.drawImage(this.image, 16 * this.spriteId, 0, 16, 16, this.position.x * 16 + x * 16, this.position.y * 16 + y * 16, 16, 16);\n                }\n            }\n        }\n    }\n    rotate() {\n        const temp = new Array(this.tiles[0].length);\n        for (let i = 0; i < this.tiles[0].length; i++) {\n            const arr = new Array(this.tiles.length);\n            arr.fill(0);\n            temp[i] = arr;\n        }\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                temp[x][this.tiles.length - 1 - y] = this.tiles[y][x];\n            }\n        }\n        this.tiles = temp;\n    }\n    getTiles() {\n        const tiles = Array();\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                const num = this.tiles[y][x];\n                if (num === 1) {\n                    tiles.push(new _Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"](x + this.position.x, y + this.position.y));\n                }\n            }\n        }\n        return tiles;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Shape.ts?");

/***/ }),

/***/ "./src/ShapeSpawner.ts":
/*!*****************************!*\
  !*** ./src/ShapeSpawner.ts ***!
  \*****************************/
/*! exports provided: ShapeSpawner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeSpawner\", function() { return ShapeSpawner; });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./src/Shape.ts\");\n\nclass ShapeSpawner {\n    getNextShape(image) {\n        const random = Math.floor(Math.random() * 7);\n        // TODO: put into Array to slect by index\n        switch (random) {\n            case 0:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [1, 1],\n                    [1, 1],\n                ], image, 4);\n            case 1:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 1, 0],\n                    [1, 1, 1],\n                    [0, 0, 0]\n                ], image, 6);\n            case 2:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 0, 0, 0],\n                    [1, 1, 1, 1],\n                    [0, 0, 0, 0],\n                    [0, 0, 0, 0]\n                ], image, 5);\n            case 3:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [1, 0, 0],\n                    [1, 1, 1],\n                    [0, 0, 0]\n                ], image, 2);\n            case 4:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 0, 1],\n                    [1, 1, 1],\n                    [0, 0, 0]\n                ], image, 7);\n            case 5:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 1, 1],\n                    [1, 1, 0],\n                    [0, 0, 0]\n                ], image, 3);\n            case 6:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [1, 1, 0],\n                    [0, 1, 1],\n                    [0, 0, 0]\n                ], image, 8);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ShapeSpawner.ts?");

/***/ }),

/***/ "./src/assets/block-rotate.mp3":
/*!*************************************!*\
  !*** ./src/assets/block-rotate.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"63fb42473eb1310a894e3b3684606e2e.mp3\";\n\n//# sourceURL=webpack:///./src/assets/block-rotate.mp3?");

/***/ }),

/***/ "./src/assets/line-removal.mp3":
/*!*************************************!*\
  !*** ./src/assets/line-removal.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2c6dec5408606ce3bb82cdc83834229a.mp3\";\n\n//# sourceURL=webpack:///./src/assets/line-removal.mp3?");

/***/ }),

/***/ "./src/assets/slow-hit.mp3":
/*!*********************************!*\
  !*** ./src/assets/slow-hit.mp3 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"e83669e356df09eec35dca2df790bc7e.mp3\";\n\n//# sourceURL=webpack:///./src/assets/slow-hit.mp3?");

/***/ }),

/***/ "./src/assets/sprites.png":
/*!********************************!*\
  !*** ./src/assets/sprites.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"c0682fa63c3e9c168cc74180fd2e6ea1.png\";\n\n//# sourceURL=webpack:///./src/assets/sprites.png?");

/***/ }),

/***/ "./src/fullscreen/FullscreenUtils.ts":
/*!*******************************************!*\
  !*** ./src/fullscreen/FullscreenUtils.ts ***!
  \*******************************************/
/*! exports provided: FullscreenUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FullscreenUtils\", function() { return FullscreenUtils; });\nclass FullscreenUtils {\n    static fullscreen(stuff) {\n        const doc = stuff;\n        if ('requestFullscreen' in doc) {\n            doc['requestFullscreen']();\n        }\n        else if ('webkitRequestFullScreen' in doc) {\n            doc['webkitRequestFullScreen']();\n        }\n        else if ('mozRequestFullScreen' in doc) {\n            doc['mozRequestFullScreen']();\n        }\n        else if ('msRequestFullscreen' in doc) {\n            doc['msRequestFullscreen']();\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/fullscreen/FullscreenUtils.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sound_Sound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sound/Sound */ \"./src/sound/Sound.ts\");\n/* harmony import */ var _Playfield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Playfield */ \"./src/Playfield.ts\");\n/* harmony import */ var _ShapeSpawner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShapeSpawner */ \"./src/ShapeSpawner.ts\");\n/* harmony import */ var _assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/block-rotate.mp3 */ \"./src/assets/block-rotate.mp3\");\n/* harmony import */ var _assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/line-removal.mp3 */ \"./src/assets/line-removal.mp3\");\n/* harmony import */ var _assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/slow-hit.mp3 */ \"./src/assets/slow-hit.mp3\");\n/* harmony import */ var _assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _assets_sprites_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/sprites.png */ \"./src/assets/sprites.png\");\n/* harmony import */ var _assets_sprites_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_sprites_png__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _fullscreen_FullscreenUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fullscreen/FullscreenUtils */ \"./src/fullscreen/FullscreenUtils.ts\");\n/* harmony import */ var _Gamepad__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Gamepad */ \"./src/Gamepad.ts\");\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Position */ \"./src/Position.ts\");\n/* harmony import */ var _sound_SoundManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sound/SoundManager */ \"./src/sound/SoundManager.ts\");\n\n\n\n\n\n\n\n\n\n\n\nconst gamepad = new _Gamepad__WEBPACK_IMPORTED_MODULE_8__[\"Gamepad2\"]();\nconst soundManager = new _sound_SoundManager__WEBPACK_IMPORTED_MODULE_10__[\"SoundManager\"]();\nsoundManager.loadSound(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].DROP, _assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_5___default.a);\nsoundManager.loadSound(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].REMOVE_ROWS, _assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_4___default.a);\nsoundManager.loadSound(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].ROTATION, _assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_3___default.a);\nconst width = 640;\nconst height = 360;\nconst canvas = document.createElement('canvas');\ncanvas.width = width;\ncanvas.height = height;\ncanvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0\n    'image-rendering: -moz-crisp-edges;' + // FireFox\n    'image-rendering: -o-crisp-edges;' + // Opera\n    'image-rendering: -webkit-crisp-edges;' + // Chrome\n    'image-rendering: crisp-edges;' + // Chrome\n    'image-rendering: -webkit-optimize-contrast;' + // Safari\n    'image-rendering: pixelated; ' + // Future browsers\n    '-ms-interpolation-mode: nearest-neighbor;'; // IE\ndocument.body.appendChild(canvas);\nconst context = canvas.getContext('2d');\nlet field;\nlet shape;\nconst image = new Image();\nimage.onload = () => {\n    shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_2__[\"ShapeSpawner\"]().getNextShape(image);\n    field = new _Playfield__WEBPACK_IMPORTED_MODULE_1__[\"Playfield\"](10, 20, image);\n    requestAnimationFrame(() => draw());\n};\nimage.src = _assets_sprites_png__WEBPACK_IMPORTED_MODULE_6___default.a;\nlet elapsedTime = Date.now();\ncanvas.addEventListener('touchstart', touchHandler1);\ncanvas.addEventListener('touchmove', touchHandler);\ncanvas.addEventListener('touchend', touchHandler12);\nfunction touchHandler12(e) {\n    touchLeft = false;\n    touchRight = false;\n}\nconst startPos = new _Position__WEBPACK_IMPORTED_MODULE_9__[\"Position\"](0, 0);\nlet touchLeft = false;\nlet touchRight = false;\nlet fullscreen = false;\nfunction touchHandler1(e) {\n    if (fullscreen === false) {\n        _fullscreen_FullscreenUtils__WEBPACK_IMPORTED_MODULE_7__[\"FullscreenUtils\"].fullscreen(canvas);\n        fullscreen = true;\n    }\n    if (e.touches) {\n        const playerX = e.touches[0].pageX - canvas.offsetLeft;\n        const playerY = e.touches[0].pageY - canvas.offsetTop;\n        console.log('start x: ' + playerX + ', y: ' + playerY);\n        e.preventDefault();\n        e.stopPropagation();\n        startPos.x = playerX;\n        startPos.y = playerY;\n        console.log(playerX);\n        if (playerY < 180) {\n            const oldTiles = shape.tiles;\n            shape.rotate();\n            if (field.collides(shape)) {\n                shape.tiles = oldTiles;\n            }\n            else {\n                soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].ROTATION);\n            }\n        }\n        else {\n            if (playerX < 320) {\n                console.log('left ');\n                shape.position.x -= 1;\n                if (field.collides(shape)) {\n                    shape.position.x += 1;\n                }\n            }\n            if (playerX > 320) {\n                console.log('right ');\n                shape.position.x += 1;\n                if (field.collides(shape)) {\n                    shape.position.x -= 1;\n                }\n            }\n        }\n    }\n}\nfunction touchHandler(e) {\n    if (e.touches) {\n        const playerX = e.touches[0].pageX - canvas.offsetLeft;\n        const playerY = e.touches[0].pageY - canvas.offsetTop;\n    }\n}\ndocument.addEventListener('keydown', (event) => {\n    if (event.keyCode === 70) {\n        _fullscreen_FullscreenUtils__WEBPACK_IMPORTED_MODULE_7__[\"FullscreenUtils\"].fullscreen(canvas);\n    }\n    if (event.keyCode === 37) {\n        shape.position.x -= 1;\n        if (field.collides(shape)) {\n            shape.position.x += 1;\n        }\n    }\n    if (event.keyCode === 39) {\n        shape.position.x += 1;\n        if (field.collides(shape)) {\n            shape.position.x -= 1;\n        }\n    }\n    if (event.keyCode === 38) {\n        const oldTiles = shape.tiles;\n        shape.rotate();\n        if (field.collides(shape)) {\n            shape.tiles = oldTiles;\n        }\n        else {\n            soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].ROTATION);\n        }\n    }\n    if (event.keyCode === 40) {\n        shape.position.y += 1;\n        if (field.collides(shape)) {\n            soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].DROP);\n            shape.position.y -= 1;\n            field.setBlocks(shape);\n            shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_2__[\"ShapeSpawner\"]().getNextShape(image);\n            if (field.removeFullRows()) {\n                soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].REMOVE_ROWS);\n            }\n        }\n    }\n});\nlet inputElapsedTime = Date.now();\nlet rotatePressed = false;\nfunction draw() {\n    context.setTransform(1, 0, 0, 1, 0, 0);\n    context.fillStyle = '#000000';\n    context.fillRect(1, 1, width - 2, height - 2);\n    if (gamepad.isButtonPressed(0) && !rotatePressed) {\n        rotatePressed = true;\n        const oldTiles = shape.tiles;\n        shape.rotate();\n        if (field.collides(shape)) {\n            shape.tiles = oldTiles;\n        }\n        else {\n            soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].ROTATION);\n        }\n    }\n    if (!gamepad.isButtonPressed(0)) {\n        rotatePressed = false;\n    }\n    if (Date.now() > inputElapsedTime + 100) {\n        if (gamepad.isLeft(0, -1) || touchLeft) {\n            shape.position.x -= 1;\n            if (field.collides(shape)) {\n                shape.position.x += 1;\n            }\n        }\n        if (gamepad.isLeft(0, 1) || touchRight) {\n            shape.position.x += 1;\n            if (field.collides(shape)) {\n                shape.position.x -= 1;\n            }\n        }\n        if (gamepad.isLeft(1, 1)) {\n            shape.position.y += 1;\n            if (field.collides(shape)) {\n                soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].DROP);\n                shape.position.y -= 1;\n                field.setBlocks(shape);\n                shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_2__[\"ShapeSpawner\"]().getNextShape(image);\n                if (field.removeFullRows()) {\n                    soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].REMOVE_ROWS);\n                }\n            }\n        }\n        inputElapsedTime = Date.now();\n    }\n    if (shape !== null) {\n        if (Date.now() > elapsedTime + 500) {\n            shape.position.y += 1;\n            if (field.collides(shape)) {\n                soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].DROP);\n                shape.position.y -= 1;\n                field.setBlocks(shape);\n                shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_2__[\"ShapeSpawner\"]().getNextShape(image);\n                if (field.removeFullRows()) {\n                    soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_0__[\"Sound\"].REMOVE_ROWS);\n                }\n            }\n            elapsedTime = Date.now();\n        }\n    }\n    field.draw(context);\n    if (shape !== null) {\n        shape.draw(context);\n    }\n    requestAnimationFrame(() => draw());\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/sound/Sound.ts":
/*!****************************!*\
  !*** ./src/sound/Sound.ts ***!
  \****************************/
/*! exports provided: Sound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Sound\", function() { return Sound; });\nvar Sound;\n(function (Sound) {\n    Sound[Sound[\"DROP\"] = 0] = \"DROP\";\n    Sound[Sound[\"ROTATION\"] = 1] = \"ROTATION\";\n    Sound[Sound[\"REMOVE_ROWS\"] = 2] = \"REMOVE_ROWS\";\n})(Sound || (Sound = {}));\n\n\n//# sourceURL=webpack:///./src/sound/Sound.ts?");

/***/ }),

/***/ "./src/sound/SoundManager.ts":
/*!***********************************!*\
  !*** ./src/sound/SoundManager.ts ***!
  \***********************************/
/*! exports provided: SoundManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SoundManager\", function() { return SoundManager; });\nclass SoundManager {\n    constructor() {\n        this.sounds = new Map();\n        this.audioContext = new AudioContext();\n    }\n    loadSound(sound, filename) {\n        return fetch(filename)\n            .then((response) => response.arrayBuffer())\n            .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))\n            .then((audioBuffer) => {\n            this.sounds.set(sound, audioBuffer);\n        });\n    }\n    play(sound) {\n        const source = this.audioContext.createBufferSource();\n        source.buffer = this.sounds.get(sound);\n        source.connect(this.audioContext.destination);\n        source.start();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/sound/SoundManager.ts?");

/***/ })

/******/ });