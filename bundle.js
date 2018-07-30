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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Playfield\", function() { return Playfield; });\n/**\n * The playfield class\n */\nclass Playfield {\n    constructor(width, height, image) {\n        this.width = width;\n        this.height = height;\n        this.image = image;\n        this.width = width;\n        this.height = height;\n        this.field = new Array(width * height);\n        this.field.fill(0);\n    }\n    isFullRow(row) {\n        let fullRow = true;\n        for (let x = 0; x < this.width; x++) {\n            if (this.field[x + row * this.width] === 0) {\n                fullRow = false;\n                break;\n            }\n        }\n        return fullRow;\n    }\n    removeFullRows() {\n        let removal = false;\n        for (let y = 0; y < this.height; y++) {\n            if (this.isFullRow(y)) {\n                this.field.splice(y * 10, 10);\n                this.field.unshift(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);\n                removal = true;\n            }\n        }\n        return removal;\n    }\n    getNumberOfFullRows() {\n        let count = 0;\n        for (let y = 0; y < this.height; y++) {\n            if (this.isFullRow(y)) {\n                count++;\n            }\n        }\n        return count;\n    }\n    hasFullRows() {\n        for (let y = 0; y < this.height; y++) {\n            if (this.isFullRow(y)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    draw(context) {\n        context.translate(96, 40);\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                const num = this.field[x + y * this.width];\n                if (num !== 0) {\n                    this.drawSprite(context, x, y, num);\n                }\n            }\n        }\n    }\n    drawSprite(context, x, y, sprite) {\n        context.drawImage(this.image, 8 * sprite, 0, 8, 8, x * 8, y * 8, 8, 8);\n    }\n    collides(shape) {\n        const tiles = shape.getTiles();\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            if (this.isSet(tile.x, tile.y)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    setBlocks(shape) {\n        const tiles = shape.getTiles();\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            this.set(tile.x, tile.y, shape.spriteId);\n        }\n        return false;\n    }\n    isSet(x, y) {\n        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {\n            return true;\n        }\n        return this.field[x + y * this.width] !== 0;\n    }\n    set(x, y, tileId = 1) {\n        this.field[x + y * this.width] = tileId;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Playfield.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Shape\", function() { return Shape; });\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ \"./src/Position.ts\");\n\nclass Shape {\n    constructor(tiles, image, sprite = 2) {\n        this.image = image;\n        this.position = new _Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"](3, 0);\n        this.tiles = tiles;\n        this.spriteId = sprite;\n    }\n    draw(context) {\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                const num = this.tiles[y][x];\n                if (num === 1) {\n                    context.drawImage(this.image, 8 * this.spriteId, 0, 8, 8, this.position.x * 8 + x * 8, this.position.y * 8 + y * 8, 8, 8);\n                }\n            }\n        }\n    }\n    drawAt(context, pos) {\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                const num = this.tiles[y][x];\n                if (num === 1) {\n                    context.drawImage(this.image, 8 * this.spriteId, 0, 8, 8, pos.x + x * 8, pos.y + y * 8, 8, 8);\n                }\n            }\n        }\n    }\n    rotate() {\n        const temp = new Array(this.tiles[0].length);\n        for (let i = 0; i < this.tiles[0].length; i++) {\n            const arr = new Array(this.tiles.length);\n            arr.fill(0);\n            temp[i] = arr;\n        }\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                temp[x][this.tiles.length - 1 - y] = this.tiles[y][x];\n            }\n        }\n        this.tiles = temp;\n    }\n    getTiles() {\n        const tiles = Array();\n        for (let y = 0; y < this.tiles.length; y++) {\n            for (let x = 0; x < this.tiles[y].length; x++) {\n                const num = this.tiles[y][x];\n                if (num === 1) {\n                    tiles.push(new _Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"](x + this.position.x, y + this.position.y));\n                }\n            }\n        }\n        return tiles;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Shape.ts?");

/***/ }),

/***/ "./src/ShapeSpawner.ts":
/*!*****************************!*\
  !*** ./src/ShapeSpawner.ts ***!
  \*****************************/
/*! exports provided: ShapeSpawner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeSpawner\", function() { return ShapeSpawner; });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./src/Shape.ts\");\n\nclass ShapeSpawner {\n    getNextShape(image) {\n        const random = Math.floor(Math.random() * 7);\n        // TODO: put into Array to slect by index\n        switch (random) {\n            case 0:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [1, 1],\n                    [1, 1],\n                ], image, 1);\n            case 1:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 1, 0],\n                    [1, 1, 1],\n                    [0, 0, 0]\n                ], image, 2);\n            case 2:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 0, 0, 0],\n                    [1, 1, 1, 1],\n                    [0, 0, 0, 0],\n                    [0, 0, 0, 0]\n                ], image, 3);\n            case 3:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [1, 0, 0],\n                    [1, 1, 1],\n                    [0, 0, 0]\n                ], image, 4);\n            case 4:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 0, 1],\n                    [1, 1, 1],\n                    [0, 0, 0]\n                ], image, 1);\n            case 5:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [0, 1, 1],\n                    [1, 1, 0],\n                    [0, 0, 0]\n                ], image, 2);\n            case 6:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    [1, 1, 0],\n                    [0, 1, 1],\n                    [0, 0, 0]\n                ], image, 3);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ShapeSpawner.ts?");

/***/ }),

/***/ "./src/TetrisGame.ts":
/*!***************************!*\
  !*** ./src/TetrisGame.ts ***!
  \***************************/
/*! exports provided: TetrisGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TetrisGame\", function() { return TetrisGame; });\n/* harmony import */ var _Playfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Playfield */ \"./src/Playfield.ts\");\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shape */ \"./src/Shape.ts\");\n/* harmony import */ var _assets_sprites2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/sprites2.png */ \"./src/assets/sprites2.png\");\n/* harmony import */ var _assets_sprites2_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_sprites2_png__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _ShapeSpawner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShapeSpawner */ \"./src/ShapeSpawner.ts\");\n/* harmony import */ var _sound_Sound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sound/Sound */ \"./src/sound/Sound.ts\");\n/* harmony import */ var _sound_SoundManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sound/SoundManager */ \"./src/sound/SoundManager.ts\");\n/* harmony import */ var _assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/block-rotate.mp3 */ \"./src/assets/block-rotate.mp3\");\n/* harmony import */ var _assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/line-removal.mp3 */ \"./src/assets/line-removal.mp3\");\n/* harmony import */ var _assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/slow-hit.mp3 */ \"./src/assets/slow-hit.mp3\");\n/* harmony import */ var _assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _Gamepad__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Gamepad */ \"./src/Gamepad.ts\");\n\n\n\n\n\n\n\n\n\n\nclass TetrisGame {\n    constructor(context) {\n        this.score = 0;\n        this.level = 0;\n        this.lineCounter = 0;\n        this.startLevel = 0;\n        this.rotatePressed = false;\n        this.inputElapsedTime = Date.now();\n        this.width = 640;\n        this.height = 360;\n        this.elapsedTime = Date.now();\n        this.soundManager = new _sound_SoundManager__WEBPACK_IMPORTED_MODULE_5__[\"SoundManager\"]();\n        this.gamepad = new _Gamepad__WEBPACK_IMPORTED_MODULE_9__[\"Gamepad2\"]();\n        this.soundManager.loadSound(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].DROP, _assets_slow_hit_mp3__WEBPACK_IMPORTED_MODULE_8___default.a);\n        this.soundManager.loadSound(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].REMOVE_ROWS, _assets_line_removal_mp3__WEBPACK_IMPORTED_MODULE_7___default.a);\n        this.soundManager.loadSound(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].ROTATION, _assets_block_rotate_mp3__WEBPACK_IMPORTED_MODULE_6___default.a);\n        this.context = context;\n        this.image = new Image();\n        this.image.onload = () => {\n            this.shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_3__[\"ShapeSpawner\"]().getNextShape(this.image);\n            this.futureShape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_3__[\"ShapeSpawner\"]().getNextShape(this.image);\n            this.field = new _Playfield__WEBPACK_IMPORTED_MODULE_0__[\"Playfield\"](10, 20, this.image);\n        };\n        this.image.src = _assets_sprites2_png__WEBPACK_IMPORTED_MODULE_2___default.a;\n    }\n    update() {\n        if (this.gamepad.isButtonPressed(0) && !this.rotatePressed) {\n            this.rotatePressed = true;\n            this.rotateClockwise();\n        }\n        if (!this.gamepad.isButtonPressed(0)) {\n            this.rotatePressed = false;\n        }\n        if (Date.now() > this.inputElapsedTime + 100) {\n            if (this.gamepad.isLeft(0, -1)) {\n                this.moveLeft();\n            }\n            if (this.gamepad.isLeft(0, 1)) {\n                this.moveRight();\n            }\n            if (this.gamepad.isLeft(1, 1)) {\n                this.moveDown();\n            }\n            this.inputElapsedTime = Date.now();\n        }\n        if (this.shape !== null) {\n            if (Date.now() > this.elapsedTime + this.getTetrominoSpeedInMillis(this.level)) {\n                this.moveDown();\n                this.elapsedTime = Date.now();\n            }\n        }\n    }\n    getField() {\n        return this.field;\n    }\n    getShape() {\n        return this.shape;\n    }\n    getFuture() {\n        return this.futureShape;\n    }\n    getGhost() {\n        const ghost = new _Shape__WEBPACK_IMPORTED_MODULE_1__[\"Shape\"](this.shape.tiles, this.image, 9);\n        ghost.position.y = this.shape.position.y;\n        ghost.position.x = this.shape.position.x;\n        do {\n            ghost.position.y += 1;\n        } while (!this.field.collides(ghost));\n        ghost.position.y -= 1;\n        return ghost;\n    }\n    moveLeft() {\n        this.shape.position.x -= 1;\n        if (this.field.collides(this.shape)) {\n            this.shape.position.x += 1;\n        }\n    }\n    moveRight() {\n        this.shape.position.x += 1;\n        if (this.field.collides(this.shape)) {\n            this.shape.position.x -= 1;\n        }\n    }\n    rotateCounterclockwise() {\n        const oldTiles = this.shape.tiles;\n        this.shape.rotate();\n        this.shape.rotate();\n        this.shape.rotate();\n        if (this.field.collides(this.shape)) {\n            this.shape.tiles = oldTiles;\n        }\n        else {\n            this.soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].ROTATION);\n        }\n    }\n    rotateClockwise() {\n        const oldTiles = this.shape.tiles;\n        this.shape.rotate();\n        if (this.field.collides(this.shape)) {\n            this.shape.tiles = oldTiles;\n        }\n        else {\n            this.soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].ROTATION);\n        }\n    }\n    moveDown() {\n        this.shape.position.y += 1;\n        if (this.field.collides(this.shape)) {\n            this.soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].DROP);\n            this.shape.position.y -= 1;\n            this.field.setBlocks(this.shape);\n            this.shape = this.futureShape;\n            this.futureShape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_3__[\"ShapeSpawner\"]().getNextShape(this.image);\n            if (this.field.hasFullRows()) {\n                const fullRows = this.field.getNumberOfFullRows();\n                this.updateScore(this.level, fullRows);\n                this.field.removeFullRows();\n                this.soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].REMOVE_ROWS);\n                this.lineCounter += fullRows;\n                const firstLevelStep = Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));\n                this.level = Math.floor(Math.max(this.lineCounter - firstLevelStep, 0) / 10) +\n                    (this.lineCounter >= firstLevelStep ? 1 : 0);\n            }\n        }\n    }\n    hardDrop() {\n        do {\n            this.shape.position.y += 1;\n        } while (!this.field.collides(this.shape));\n        this.soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].DROP);\n        this.shape.position.y -= 1;\n        this.field.setBlocks(this.shape);\n        this.shape = this.futureShape;\n        this.futureShape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_3__[\"ShapeSpawner\"]().getNextShape(this.image);\n        if (this.field.hasFullRows()) {\n            const fullRows = this.field.getNumberOfFullRows();\n            this.updateScore(this.level, fullRows);\n            this.field.removeFullRows();\n            this.soundManager.play(_sound_Sound__WEBPACK_IMPORTED_MODULE_4__[\"Sound\"].REMOVE_ROWS);\n            this.lineCounter += fullRows;\n            const firstLevelStep = Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));\n            this.level = Math.floor(Math.max(this.lineCounter - firstLevelStep, 0) / 10) +\n                (this.lineCounter >= firstLevelStep ? 1 : 0);\n        }\n    }\n    // uses original nintendo scoring system used in NES, GB and SNES versions\n    updateScore(currentLevel, numLines) {\n        let lineScore = 0;\n        switch (numLines) {\n            case 1:\n                lineScore = 40;\n                break;\n            case 2:\n                lineScore = 100;\n                break;\n            case 3:\n                lineScore = 300;\n                break;\n            case 4:\n                lineScore = 1200;\n                break;\n        }\n        this.score += lineScore * (currentLevel + 1);\n    }\n    getTetrominoSpeedInMillis(currentLevel) {\n        return this.convertFrameToMilliseconds(this.convertLevelToFramesPerGridCell(currentLevel));\n    }\n    convertFrameToMilliseconds(frames) {\n        const NES_FPS = 60.098814;\n        return 1000 / NES_FPS * frames;\n    }\n    convertLevelToFramesPerGridCell(currentLevel) {\n        if (currentLevel === 0) {\n            return 48;\n        }\n        else if (currentLevel === 1) {\n            return 43;\n        }\n        else if (currentLevel === 2) {\n            return 38;\n        }\n        else if (currentLevel === 3) {\n            return 33;\n        }\n        else if (currentLevel === 4) {\n            return 28;\n        }\n        else if (currentLevel === 5) {\n            return 23;\n        }\n        else if (currentLevel === 6) {\n            return 18;\n        }\n        else if (currentLevel === 7) {\n            return 13;\n        }\n        else if (currentLevel === 8) {\n            return 8;\n        }\n        else if (currentLevel === 9) {\n            return 6;\n        }\n        else if (currentLevel >= 10 && currentLevel <= 12) {\n            return 5;\n        }\n        else if (currentLevel >= 13 && currentLevel <= 15) {\n            return 4;\n        }\n        else if (currentLevel >= 16 && currentLevel <= 18) {\n            return 3;\n        }\n        else if (currentLevel >= 19 && currentLevel <= 28) {\n            return 2;\n        }\n        else if (currentLevel >= 29) {\n            return 1;\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/TetrisGame.ts?");

/***/ }),

/***/ "./src/assets/background.png":
/*!***********************************!*\
  !*** ./src/assets/background.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"64aaf93c24abdffb3b22ec451686bfb0.png\";\n\n//# sourceURL=webpack:///./src/assets/background.png?");

/***/ }),

/***/ "./src/assets/block-rotate.mp3":
/*!*************************************!*\
  !*** ./src/assets/block-rotate.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"63fb42473eb1310a894e3b3684606e2e.mp3\";\n\n//# sourceURL=webpack:///./src/assets/block-rotate.mp3?");

/***/ }),

/***/ "./src/assets/digits.png":
/*!*******************************!*\
  !*** ./src/assets/digits.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"e4ca3299a1f7fbbd22f51242f2594902.png\";\n\n//# sourceURL=webpack:///./src/assets/digits.png?");

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

/***/ "./src/assets/sprites2.png":
/*!*********************************!*\
  !*** ./src/assets/sprites2.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"de826f6bbc34c65228072a0e959e8213.png\";\n\n//# sourceURL=webpack:///./src/assets/sprites2.png?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_background_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/background.png */ \"./src/assets/background.png\");\n/* harmony import */ var _assets_background_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_background_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_digits_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/digits.png */ \"./src/assets/digits.png\");\n/* harmony import */ var _assets_digits_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_digits_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _fullscreen_FullscreenUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fullscreen/FullscreenUtils */ \"./src/fullscreen/FullscreenUtils.ts\");\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Position */ \"./src/Position.ts\");\n/* harmony import */ var _TetrisGame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TetrisGame */ \"./src/TetrisGame.ts\");\n\n\n\n\n\nconst canvas = document.createElement('canvas');\ncanvas.width = 256;\ncanvas.height = 224;\ncanvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0\n    'image-rendering: -moz-crisp-edges;' + // FireFox\n    'image-rendering: -o-crisp-edges;' + // Opera\n    'image-rendering: -webkit-crisp-edges;' + // Chrome\n    'image-rendering: crisp-edges;' + // Chrome\n    'image-rendering: -webkit-optimize-contrast;' + // Safari\n    'image-rendering: pixelated; ' + // Future browsers\n    '-ms-interpolation-mode: nearest-neighbor;'; // IE\ncanvas.style.width = `${256 * 2}px`;\ncanvas.style.height = `${224 * 2}px`;\ndocument.body.appendChild(canvas);\nconst context = canvas.getContext('2d');\nconst image = new Image();\nimage.src = _assets_background_png__WEBPACK_IMPORTED_MODULE_0___default.a;\nconst digitsImage = new Image();\ndigitsImage.src = _assets_digits_png__WEBPACK_IMPORTED_MODULE_1___default.a;\nconst tetris = new _TetrisGame__WEBPACK_IMPORTED_MODULE_4__[\"TetrisGame\"](context);\nrequestAnimationFrame(() => draw());\nfunction draw() {\n    context.setTransform(1, 0, 0, 1, 0, 0);\n    context.fillStyle = '#222222';\n    context.fillRect(0, 0, 640, 360);\n    context.drawImage(image, 0, 0, 256, 224, 0, 0, 256, 224);\n    tetris.update();\n    tetris.getField().draw(context);\n    context.globalAlpha = 0.24;\n    tetris.getGhost().draw(context);\n    context.globalAlpha = 1;\n    const shape = tetris.getShape();\n    if (shape !== null) {\n        shape.draw(context);\n    }\n    drawNextShape();\n    drawStatistics();\n    requestAnimationFrame(() => draw());\n}\nfunction drawNextShape() {\n    context.setTransform(1, 0, 0, 1, 0, 0);\n    const shape = tetris.getFuture();\n    const height = shape.tiles.length * 8;\n    const width = shape.tiles[0].length * 8;\n    shape.drawAt(context, new _Position__WEBPACK_IMPORTED_MODULE_3__[\"Position\"](208 - width / 2, 124 - height / 2));\n}\nfunction pad(orig, length, char) {\n    const leng = orig.length;\n    return char.repeat(Math.max(0, length - leng)) + orig;\n}\nfunction drawStatistics() {\n    drawNum(152, 16, pad(tetris.lineCounter.toString(), 3, '0')); // 3\n    drawNum(192, 56, pad(tetris.score.toString(), 6, '0')); // 6\n    drawNum(192, 32, pad('31337', 6, '0')); // 3\n    drawNum(208, 160, pad(tetris.level.toString(), 2, '0')); // 2\n    drawNum(48, 88, pad('000', 3, '0')); // 3\n    drawNum(48, 88 + 16, pad('000', 3, '0')); // 3\n    drawNum(48, 88 + 16 + 16, pad('000', 3, '0')); // 3\n    drawNum(48, 88 + 16 + 16 + 16, pad('000', 3, '0')); // 3\n    drawNum(48, 88 + 16 + 16 + 16 + 16, pad('000', 3, '0')); // 3\n    drawNum(48, 88 + 16 + 16 + 16 + 16 + 16, pad('000', 3, '0')); // 3\n    drawNum(48, 88 + 16 + 16 + 16 + 16 + 16 + 16, pad('000', 3, '0')); // 3\n}\nfunction drawNum(x, y, num) {\n    const myNum = '' + num;\n    for (let i = 0; i < myNum.length; i++) {\n        drawDigit(x + i * 8, y, myNum.charCodeAt(i));\n    }\n}\nfunction drawDigit(x, y, char) {\n    const index = char - '0'.charCodeAt(0);\n    context.drawImage(digitsImage, 8 * index, 0, 8, 8, x, y, 8, 8);\n}\ndocument.addEventListener('keydown', (event) => {\n    if (event.keyCode === 70) {\n        _fullscreen_FullscreenUtils__WEBPACK_IMPORTED_MODULE_2__[\"FullscreenUtils\"].fullscreen(canvas);\n    }\n    if (event.keyCode === 37) {\n        tetris.moveLeft();\n    }\n    if (event.keyCode === 39) {\n        tetris.moveRight();\n    }\n    if (event.keyCode === 38) {\n        tetris.rotateClockwise();\n    }\n    // rotate counter clockwhise: y\n    if (event.keyCode === 89) {\n        tetris.rotateCounterclockwise();\n    }\n    // soft drop: arrow down\n    if (event.keyCode === 40) {\n        tetris.moveDown();\n    }\n    // hard drop: space\n    if (event.keyCode === 32) {\n        tetris.hardDrop();\n    }\n});\n\n\n//# sourceURL=webpack:///./src/index.ts?");

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