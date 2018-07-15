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

/***/ "./src/Playfield.ts":
/*!**************************!*\
  !*** ./src/Playfield.ts ***!
  \**************************/
/*! exports provided: Playfield */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Playfield\", function() { return Playfield; });\n/**\n * The playfield class\n */\nclass Playfield {\n    constructor(width, height, image) {\n        this.width = width;\n        this.height = height;\n        this.image = image;\n        this.width = width;\n        this.height = height;\n        this.field = new Array(width * height);\n        this.field.fill(0);\n        this.field[0] = 1;\n    }\n    removeFullRow(row) {\n        let fullRow = true;\n        for (let x = 0; x < this.width; x++) {\n            if (this.field[x + row * this.width] === 0) {\n                fullRow = false;\n                break;\n            }\n        }\n        if (fullRow) {\n            for (let x = 0; x < this.width; x++) {\n                this.field[x + row * this.width] = 0;\n            }\n        }\n    }\n    removeFullRows() {\n        for (let y = 0; y < this.height; y++) {\n            this.removeFullRow(y);\n        }\n    }\n    draw(context) {\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                const num = this.field[x + y * this.width];\n                if (num === 1) {\n                    context.drawImage(this.image, 16, 0, 16, 16, x * 16, y * 16, 16, 16);\n                }\n            }\n        }\n    }\n    collides(shape) {\n        const tiles = shape.getTiles();\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            if (this.isSet(tile.x, tile.y)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    setBlocks(shape) {\n        const tiles = shape.getTiles();\n        for (let i = 0; i < tiles.length; i++) {\n            const tile = tiles[i];\n            this.set(tile.x, tile.y);\n        }\n        return false;\n    }\n    isSet(x, y) {\n        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {\n            return true;\n        }\n        return this.field[x + y * this.width] === 1;\n    }\n    set(x, y) {\n        this.field[x + y * this.width] = 1;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Playfield.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Shape\", function() { return Shape; });\n/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Position */ \"./src/Position.ts\");\n\nclass Shape {\n    constructor(tiles, image) {\n        this.image = image;\n        this.position = new _Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"](3, 0);\n        this.width = 4;\n        this.height = 4;\n        this.tiles = tiles;\n    }\n    draw(context) {\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                const num = this.tiles[x + y * this.width];\n                if (num === 1) {\n                    context.drawImage(this.image, 0, 0, 16, 16, this.position.x * 16 + x * 16, this.position.y * 16 + y * 16, 16, 16);\n                }\n            }\n        }\n    }\n    rotate() {\n        const temp = Array(this.tiles.length);\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                temp[x + (this.height - 1 - y) * this.width] = this.tiles[y + x * this.width];\n            }\n        }\n        this.tiles = temp;\n    }\n    getTiles() {\n        const tiles = Array();\n        for (let y = 0; y < this.height; y++) {\n            for (let x = 0; x < this.width; x++) {\n                const num = this.tiles[x + y * this.width];\n                if (num === 1) {\n                    tiles.push(new _Position__WEBPACK_IMPORTED_MODULE_0__[\"Position\"](x + this.position.x, y + this.position.y));\n                }\n            }\n        }\n        return tiles;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/Shape.ts?");

/***/ }),

/***/ "./src/ShapeSpawner.ts":
/*!*****************************!*\
  !*** ./src/ShapeSpawner.ts ***!
  \*****************************/
/*! exports provided: ShapeSpawner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ShapeSpawner\", function() { return ShapeSpawner; });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./src/Shape.ts\");\n\nclass ShapeSpawner {\n    getNextShape(image) {\n        const random = Math.floor(Math.random() * 4);\n        // TODO: put into Array to slect by index\n        switch (random) {\n            case 0:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    0, 0, 0, 0,\n                    0, 1, 1, 0,\n                    0, 1, 1, 0,\n                    0, 0, 0, 0\n                ], image);\n            case 1:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    0, 0, 1, 0,\n                    0, 1, 1, 0,\n                    0, 0, 1, 0,\n                    0, 0, 0, 0\n                ], image);\n            case 2:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    0, 0, 1, 0,\n                    0, 0, 1, 0,\n                    0, 0, 1, 0,\n                    0, 0, 1, 0\n                ], image);\n            case 3:\n                return new _Shape__WEBPACK_IMPORTED_MODULE_0__[\"Shape\"]([\n                    0, 0, 1, 0,\n                    0, 0, 1, 0,\n                    0, 1, 1, 0,\n                    0, 0, 0, 0\n                ], image);\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/ShapeSpawner.ts?");

/***/ }),

/***/ "./src/assets/tiles.png":
/*!******************************!*\
  !*** ./src/assets/tiles.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"909589f4979cede332e1033fa8a64b7d.png\";\n\n//# sourceURL=webpack:///./src/assets/tiles.png?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Playfield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Playfield */ \"./src/Playfield.ts\");\n/* harmony import */ var _ShapeSpawner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShapeSpawner */ \"./src/ShapeSpawner.ts\");\n/* harmony import */ var _assets_tiles_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/tiles.png */ \"./src/assets/tiles.png\");\n/* harmony import */ var _assets_tiles_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_tiles_png__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst width = 10 * 16;\nconst height = 20 * 16;\nconst canvas = document.createElement('canvas');\ncanvas.width = width;\ncanvas.height = height;\ncanvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0\n    'image-rendering: -moz-crisp-edges;' + // FireFox\n    'image-rendering: -o-crisp-edges;' + // Opera\n    'image-rendering: -webkit-crisp-edges;' + // Chrome\n    'image-rendering: crisp-edges;' + // Chrome\n    'image-rendering: -webkit-optimize-contrast;' + // Safari\n    'image-rendering: pixelated; ' + // Future browsers\n    '-ms-interpolation-mode: nearest-neighbor;'; // IE\ncanvas.style.width = `${width * 2}px`;\ncanvas.style.height = `${height * 2}px`;\ndocument.body.appendChild(canvas);\nconst context = canvas.getContext('2d');\nlet field;\nlet shape;\nconst image = new Image();\nimage.onload = () => {\n    shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_1__[\"ShapeSpawner\"]().getNextShape(image);\n    field = new _Playfield__WEBPACK_IMPORTED_MODULE_0__[\"Playfield\"](10, 20, image);\n    requestAnimationFrame(() => draw());\n};\nimage.src = _assets_tiles_png__WEBPACK_IMPORTED_MODULE_2___default.a;\nlet elapsedTime = Date.now();\ndocument.addEventListener('keypress', (event) => {\n    if (event.keyCode === 37) {\n        shape.position.x -= 1;\n        if (field.collides(shape)) {\n            shape.position.x += 1;\n        }\n    }\n    if (event.keyCode === 39) {\n        shape.position.x += 1;\n        if (field.collides(shape)) {\n            shape.position.x -= 1;\n        }\n    }\n    if (event.keyCode === 38) {\n        shape.rotate();\n        if (field.collides(shape)) {\n            // rotate back\n        }\n    }\n    if (event.keyCode === 40) {\n        shape.position.y += 1;\n        if (field.collides(shape)) {\n            shape.position.y -= 1;\n            field.setBlocks(shape);\n            shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_1__[\"ShapeSpawner\"]().getNextShape(image);\n        }\n    }\n});\nfunction draw() {\n    context.fillStyle = '#000000';\n    context.fillRect(0, 0, width, height);\n    if (shape !== null) {\n        if (Date.now() > elapsedTime + 500) {\n            shape.position.y += 1;\n            if (field.collides(shape)) {\n                shape.position.y -= 1;\n                field.setBlocks(shape);\n                shape = new _ShapeSpawner__WEBPACK_IMPORTED_MODULE_1__[\"ShapeSpawner\"]().getNextShape(image);\n            }\n            elapsedTime = Date.now();\n        }\n    }\n    field.removeFullRows();\n    field.draw(context);\n    if (shape !== null) {\n        shape.draw(context);\n    }\n    requestAnimationFrame(() => draw());\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });