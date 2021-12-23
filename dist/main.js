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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/minesweeper.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/minesweeper.js":
/*!****************************!*\
  !*** ./lib/minesweeper.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

alert("Good luck!"); // Of course you can remove this (annoying) line ;)
const GRID_SIZE = 10;
const MINE_FREQUENCY = 0.15;

function neighbour(td, offsetX, offsetY) {
  const column = td.cellIndex;
  const row = td.parentElement.rowIndex;
  return document.querySelector(`[data-column="${column + offsetX}"][data-row="${row + offsetY}"]`);
}

function incrementNeighbour(td, offsetX, offsetY) {
  const n = neighbour(td, offsetX, offsetY);
  if (n && n.classList.contains('has-mine')) {
    return 1;
  }

  return 0;
}

function open(tile) {
  let mines = 0;

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 || j !== 0) {
        mines += incrementNeighbour(tile, i, j);
      }
    }
  }

  if (mines === 0) {
    tile.classList.add('opened');
  } else {
    tile.classList.add(`mine-neighbour-${mines}`);
  }
  tile.classList.remove('unopened');

  if (mines === 0) {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i !== 0 || j !== 0) {
          const n = neighbour(tile, i, j);
          if (n && n.classList.contains('unopened')) {
            open(n);
          }
        }
      }
    }
  }

  return mines;
}

function openOnClick(event) {
  const tile = event.currentTarget;
  if (tile.classList.contains('has-mine')) {
    document.querySelectorAll('.has-mine').forEach((cell) => {
      cell.classList.remove('has-mine', 'unopened');
      cell.classList.add('mine');
    });
    alert("You lost!");
  } else {
    open(tile);
  }
}

function flagOnClick(event) {
  event.preventDefault(); // Do not open context menu!
  const tile = event.currentTarget;
  if (tile.classList.contains('unopened')) {
    tile.classList.add('flagged');
  }
}

const minesweeper = document.querySelector('#minesweeper');
for (let i = 0; i < GRID_SIZE; i += 1) {
  const row = document.createElement('tr');
  row.dataset.row = i;
  for (let j = 0; j < GRID_SIZE; j += 1) {
    row.insertAdjacentHTML('beforeend', `<td class="unopened" data-column="${j}"></td>`);
  }
  minesweeper.append(row);
}

document.querySelectorAll('td').forEach((td) => {
  td.dataset.column = td.cellIndex;
  td.dataset.row = td.parentElement.rowIndex;

  if (Math.random() <= MINE_FREQUENCY) {
    td.classList.add('has-mine');
  }

  td.addEventListener('click', openOnClick);
  td.addEventListener('contextmenu', flagOnClick);
});


/***/ })

/******/ });
//# sourceMappingURL=main.js.map