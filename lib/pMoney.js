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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$p = function (element) {
  const queue = [];

  if (element instanceof HTMLElement) {
    return new DOMNodeCollection([element]);
  } else if (element instanceof Function) {
    if (document.readyState === 'complete') {
      element();
      queue.forEach((func) => {
        func();
      });
    } else {
      queue.push(element);
    }
  } else {
    const selector = [].slice.call(document.querySelectorAll(element));
    return new DOMNodeCollection(selector);
  }
};


$p.extend = function (firstObj, ...restObjs) {
    return Object.assign({}, firstObj, ...restObjs);
  };

$p.ajax = function (options) {
  const defaults = {
    success: () => console.log('success'),
    error: (err) => console.log(err),
    url: '/',
    method: 'get',
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const finalOptions = $p.extend(defaults, options);
  return fetch(finalOptions.url, {
    method: finalOptions.method
  }).then((response) => finalOptions.success(response))
    .catch((err) => finalOptions.error(err));
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(string) {
    if (string) {
      this.elements.forEach((element) => {
        element.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.elements.forEach((element) => {
      element.innerHTML = '';
    });
  }

  append (args) {
    this.elements.forEach((element) => {
      if (typeof args === 'string') {
        element.innerHTML += args;
      } else if (args instanceof HTMLElement) {
        element.innerHTML += args.outerHTML;
      } else {
        Array.from(args.elements).forEach((arg) => {
          element.innerHTML += arg.outerHTML;
        });
      }
    });
  }

  attr(key, value) {
    if (value) {
      this.elements.forEach((element) => {
        element.setAttribute(key, value);
      });
    } else {
      return this.elements[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.elements.forEach((element) => {
      element.classList.add(className);
    });
  }

  removeClass(className) {
    this.elements.forEach((element) => {
      element.classList.remove(className);
    });
  }

  children() {
    let finalKids = [];

    this.elements.forEach((element) => {
      const elementChildren = Array.from(element.children);
      finalKids = finalKids.concat(elementChildren);
    });

    return new DOMNodeCollection(finalKids);
  }

  parent() {
    return new DOMNodeCollection(this.elements[0].parentNode);
  }

  find(selector) {
    const found = [];
    let finalFound = [];

    this.elements.forEach((element) => {
      const queryString = element.localName + ' ' + selector;
      const foundArr = Array.from(document.querySelectorAll(queryString));
      finalFound = found.concat(foundArr);
    });

    return new DOMNodeCollection(finalFound);
  }

  remove() {
    this.elements.forEach((element) => {
      element.remove();
    });
  }

  on(action, callback) {
    this.elements.forEach((element) => {
      element.addEventListener(action, callback);
      element.callback = callback;
    });
  }

  off(action) {
    this.elements.forEach((element) => {
      const callback = $p(element).attr('callback');
      elements.removeEventListener(action, elements.callback);
    });
  }

}

module.exports = DOMNodeCollection;

/***/ })
/******/ ]);