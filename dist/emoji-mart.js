(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["EmojiMart"] = factory(require("vue"));
	else
		root["EmojiMart"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_133__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(28)('wks');
var uid = __webpack_require__(18);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(45);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(44);
var hide = __webpack_require__(6);
var has = __webpack_require__(5);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiView = exports.Emoji = exports.EmojiIndex = undefined;

var _assign = __webpack_require__(78);

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = __webpack_require__(50);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _freeze = __webpack_require__(34);

var _freeze2 = _interopRequireDefault(_freeze);

var _classCallCheck2 = __webpack_require__(98);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(99);

var _createClass3 = _interopRequireDefault(_createClass2);

var _index = __webpack_require__(58);

var _data = __webpack_require__(37);

var _frequently = __webpack_require__(38);

var _frequently2 = _interopRequireDefault(_frequently);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHEET_COLUMNS = 52;
var COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
// Skin tones
var SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF'];

/**
 * Emoji data structure:
 * {
 *    "compressed": false,
 *    "aliases": {
 *      collision: "boom"
 *      cooking: "fried_egg"
 *      envelope: "email"
 *      face_with_finger_covering_closed_lips: "shushing_face"
 *      ...
 *    },
 *    "categories": [ {
 *      id: "people", 
 *      name: "Smileys & People", 
 *      emojis: [ "grinning", "grin", "joy", ... ]
 *    }, {
 *      id: "nature", 
 *      name: "Animals & Nature", 
 *      emojis: [ "monkey_face", "money", "gorilla", ... ]
 *    },
 *    ...
 *    ],
 *    "emojis": [
 *      smiley: {
 *        added_in: "6.0",
 *        emoticons: ["=)", "=-)"],
 *        has_img_apple: true,
 *        has_img_emojione: true,
 *        has_img_facebook: true,
 *        has_img_google: true,
 *        has_img_messenger: true,
 *        has_img_twitter: true,
 *        keywords: ["face", "happy", "joy", "haha", ":D", ":)", "smile", "funny"],
 *        name: "Smiling Face with Open Mouth",
 *        non_qualified: undefined,
 *        search: "smiley,smiling,face,with,open,mouth,happy,joy,haha,:d,:),smile,funny,=),=-)",
 *        sheet_x: 30,
 *        sheet_y: 27,
 *        short_names: ["smiley"],
 *        text: ":)",
 *        unified: "1F603",
 *      }, {
 *      +1: {    // emoji with skin_variations
 *          ..., // all the regular fields are present
 *          name: "Thumbs Up Sign",
 *          short_names: (2) ["+1", "thumbsup"],
 *          skin_variations: {
 *            1F3FB:             // each variation has additional set of fields:
 *              added_in: "8.0",
 *              has_img_apple: true,
 *              has_img_emojione: true,
 *              has_img_facebook: true,
 *              has_img_google: true,
 *              has_img_messenger: true,
 *              has_img_twitter: true,
 *              image: "1f44d-1f3fb.png",
 *              non_qualified: null,
 *              sheet_x: 14,
 *              sheet_y: 50,
 *              unified: "1F44D-1F3FB",
 *            1F3FB: {…},
 *            1F3FC: {…},
 *            1F3FD: {…},
 *            1F3FE: {…},
 *            1F3FF: {…}
*            },
 *          ...
 *      },
 *      a: {  // emoji with non_qualified field set
 *        added_in: "6.0",
 *        emoticons: undefined,
 *        has_img_apple: true,
 *        ...
 *        non_qualified: "1F170",
 *        unified: "1F170-FE0F",
 *     },
 *     ...
 *   ]
 * }
 */

/**
 * Wraps raw jason emoji data, serves as data source for
 * emoji picker components.
 *
 * Usage:
 *
 *   import data from '../../../data/all.json' 
 *   let index = new EmojiIndex(data)
 *
 */

var EmojiIndex = exports.EmojiIndex = function () {

  /**
   * Constructor.
   *
   * @param {object} data - Raw json data, see the structure above.
   * @param {object} options - additional options, as an object:
   * @param {Function} emojisToShowFilter - optional, function to filter out
   *   some emojis, function(emoji) { return true|false }
   *   where `emoji` is an raw emoji object, see data.emojis above.
   * @param {Array} include - optional, a list of category ids to include.
   * @param {Array} exclude - optional, a list of category ids to exclude.
   * @param {Array} custom - optional, a list custom emojis, each emoji is
   *   an object, see data.emojis above for examples.
   */
  function EmojiIndex(data) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var emojisToShowFilter = _ref.emojisToShowFilter;
    var include = _ref.include;
    var exclude = _ref.exclude;
    var custom = _ref.custom;
    var recent = _ref.recent;
    var _ref$recentLength = _ref.recentLength;
    var recentLength = _ref$recentLength === undefined ? 20 : _ref$recentLength;
    (0, _classCallCheck3.default)(this, EmojiIndex);

    this._data = (0, _data.uncompress)(data);
    // Callback to exclude specific emojis
    this._emojisFilter = emojisToShowFilter || null;
    // Categories to include / exclude
    this._include = include || null;
    this._exclude = exclude || null;
    // Custom emojis
    this._custom = custom || [];
    // Recent emojis
    // TODO: make parameter configurable
    this._recent = recent || _frequently2.default.get(recentLength);

    this._emojis = [];
    this._emoticons = [];
    this._categories = [];
    this._recentCategory = { id: 'recent', name: 'Recent', emojis: [] };
    this._customCategory = { id: 'custom', name: 'Custom', emojis: [] };
    this._searchIndex = {};
    this.buildIndex();
    (0, _freeze2.default)(this);
  }

  (0, _createClass3.default)(EmojiIndex, [{
    key: 'buildIndex',
    value: function buildIndex() {
      var _this = this;

      this._data.categories.forEach(function (categoryData) {
        if (!_this.isCategoryNeeded(categoryData)) {
          return;
        }
        var category = {
          id: categoryData.id,
          name: categoryData.name,
          emojis: []
        };
        categoryData.emojis.forEach(function (emojiId) {
          var emoji = _this.addEmoji(emojiId);
          category.emojis.push(emoji);
        });
        _this._categories.push(category);
      });

      if (this.isCategoryNeeded('custom')) {
        if (this._custom.length > 0) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(this._custom), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var customEmoji = _step.value;

              this.addCustomEmoji(customEmoji);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        this._categories.push(this._customCategory);
      }

      if (this.isCategoryNeeded('recent')) {
        if (this._recent.length) {
          this._recent.map(function (id) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (0, _getIterator3.default)(_this._customCategory.emojis), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _customEmoji = _step2.value;

                if (_customEmoji.id === id) {
                  _this._recentCategory.emojis.push(_customEmoji);
                  return;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            _this._recentCategory.emojis.push(_this.emoji(id));
            return;
          });
        }
        // Add recent category to the top
        this._categories.unshift(this._recentCategory);
      }
    }

    /**
     * Find the emoji from the string
     */

  }, {
    key: 'findEmoji',
    value: function findEmoji(emoji, skin) {
      // 1. Parse as :emoji_name:skin-tone-xx:
      var matches = emoji.match(COLONS_REGEX);

      if (matches) {
        emoji = matches[1];
        if (matches[2]) {
          skin = parseInt(matches[2], 10);
        }
      }

      // 2. Check if the specified emoji is an alias
      if (this._data.aliases.hasOwnProperty(emoji)) {
        emoji = this._data.aliases[emoji];
      }

      // 3. Check if we have the specified emoji
      if (this._emojis.hasOwnProperty(emoji)) {
        var emojiObject = this._emojis[emoji];
        if (skin) {
          return emojiObject.getSkin(skin);
        }
        return emojiObject;
      }
      return null;
    }
  }, {
    key: 'categories',
    value: function categories() {
      return this._categories;
    }
  }, {
    key: 'emoji',
    value: function emoji(emojiId) {
      if (this._data.aliases.hasOwnProperty(emojiId)) {
        emojiId = this._data.aliases[emojiId];
      }
      var emoji = this._emojis[emojiId];
      if (!emoji) {
        throw new Error('Can not find emoji by id: ' + emojiId);
      }
      return emoji;
    }
  }, {
    key: 'search',
    value: function search(value, maxResults) {
      var _this2 = this;

      maxResults || (maxResults = 75);
      if (!value.length) {
        return null;
      }
      if (value == '-' || value == '-1') {
        return [this.emoji('-1')];
      }

      var values = value.toLowerCase().split(/[\s|,|\-|_]+/);
      var allResults = [];

      if (values.length > 2) {
        values = [values[0], values[1]];
      }

      allResults = values.map(function (value) {
        // Start searchin in the global list of emojis
        var emojis = _this2._emojis;
        var currentIndex = _this2._searchIndex;
        var length = 0;

        for (var charIndex = 0; charIndex < value.length; charIndex++) {
          var char = value[charIndex];
          length++;

          currentIndex[char] || (currentIndex[char] = {});
          currentIndex = currentIndex[char];

          if (!currentIndex.results) {
            (function () {
              var scores = {};
              currentIndex.results = [];
              currentIndex.emojis = {};

              for (var emojiId in emojis) {
                var emoji = emojis[emojiId];
                // search is a comma-separated string with words, related
                // to the emoji, for example:
                // search: "smiley,smiling,face,joy,haha,:d,:),smile,funny,=),=-)",
                var search = emoji._data.search;
                var sub = value.substr(0, length);
                var subIndex = search.indexOf(sub);
                if (subIndex != -1) {
                  var score = subIndex + 1;
                  if (sub == emojiId) score = 0;

                  currentIndex.results.push(emoji);
                  currentIndex.emojis[emojiId] = emoji;

                  scores[emojiId] = score;
                }
              }
              currentIndex.results.sort(function (a, b) {
                var aScore = scores[a.id],
                    bScore = scores[b.id];
                return aScore - bScore;
              });
            })();
          }

          // continue search in the reduced set of emojis
          emojis = currentIndex.emojis;
        }
        return currentIndex.results;
        // The "filter" call removes undefined values from allResults
        // array, for example, if we have "test " (with trailing space),
        // we will get "[Array, undefined]" for allResults and after
        // the "filter" call it will turn into "[Array]"
      }).filter(function (a) {
        return a;
      });

      var results = null;
      if (allResults.length > 1) {
        results = _index.intersect.apply(null, allResults);
      } else if (allResults.length) {
        results = allResults[0];
      } else {
        results = [];
      }
      if (results && results.length > maxResults) {
        results = results.slice(0, maxResults);
      }
      return results;
    }
  }, {
    key: 'addCustomEmoji',
    value: function addCustomEmoji(customEmoji) {
      var emojiData = (0, _assign2.default)({}, customEmoji, {
        id: customEmoji.short_names[0],
        custom: true
      });
      if (!emojiData.search) {
        emojiData.search = (0, _data.buildSearch)(emojiData);
      }
      var emoji = new Emoji(emojiData);
      this._emojis[emoji.id] = emoji;
      this._customCategory.emojis.push(emoji);
      return emoji;
    }
  }, {
    key: 'addEmoji',
    value: function addEmoji(emojiId) {
      var _this3 = this;

      // We expect the correct emoji id that is present in the emojis data.
      var data = this._data.emojis[emojiId];

      if (!this.isEmojiNeeded(data)) {
        return false;
      }

      var emoji = new Emoji(data);
      this._emojis[emojiId] = emoji;

      if (emoji.emoticons) {
        emoji.emoticons.forEach(function (emoticon) {
          if (_this3._emoticons[emoticon]) {
            return;
          }
          _this3._emoticons[emoticon] = emojiId;
        });
      }
      return emoji;
    }

    /**
     * Check if we need to include given category.
     *
     * @param {object} category - The category object.
     * @return {boolean} - Whether to include the emoji.
     */

  }, {
    key: 'isCategoryNeeded',
    value: function isCategoryNeeded(category) {
      var isIncluded = this._include && this._include.length ? this._include.indexOf(category.id) > -1 : true;
      var isExcluded = this._exclude && this._exclude.length ? this._exclude.indexOf(category.id) > -1 : false;
      if (!isIncluded || isExcluded) {
        return false;
      }
      return true;
    }

    /**
     * Check if we need to include given emoji.
     *
     * @param {object} emoji - The raw emoji object.
     * @return {boolean} - Whether to include the emoji.
     */

  }, {
    key: 'isEmojiNeeded',
    value: function isEmojiNeeded(emoji) {
      if (this._emojisFilter && this._emojisFilter(emoji)) {
        return false;
      }
      return true;
    }
  }]);
  return EmojiIndex;
}();

var Emoji = exports.Emoji = function () {
  function Emoji(data) {
    (0, _classCallCheck3.default)(this, Emoji);

    this._data = (0, _assign2.default)({}, data);
    this._skins = null;
    if (this._data.skin_variations) {
      this._skins = [];
      for (var skinIdx in SKINS) {
        var skinKey = SKINS[skinIdx];
        var variationData = this._data.skin_variations[skinKey];
        var skinData = (0, _assign2.default)({}, data);
        for (var k in variationData) {
          skinData[k] = variationData[k];
        }
        delete skinData.skin_variations;
        this._skins.push(new Emoji(skinData));
      }
    }
    this._sanitized = sanitize(this._data);
    for (var key in this._sanitized) {
      this[key] = this._sanitized[key];
    }
    this.short_name = this._data.short_names[0];
    (0, _freeze2.default)(this);
  }

  (0, _createClass3.default)(Emoji, [{
    key: 'getSkin',
    value: function getSkin(skinIdx) {
      if (skinIdx && skinIdx != 'native' && this._skins) {
        return this._skins[skinIdx - 1];
      }
      return this;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      var multiply = 100 / (SHEET_COLUMNS - 1),
          x = multiply * this._data.sheet_x,
          y = multiply * this._data.sheet_y;
      return x + '% ' + y + '%';
    }
  }]);
  return Emoji;
}();

var EmojiView = exports.EmojiView = function () {

  /**
   * emoji - Emoji to display
   * set - string, emoji set name
   * native - boolean, whether to render native emoji
   * fallback - fallback function to render missing emoji, optional
   */
  function EmojiView(emoji, skin, set, native, fallback) {
    (0, _classCallCheck3.default)(this, EmojiView);

    this._emoji = emoji;
    this._native = native;
    this._skin = skin;
    this._set = set;
    this._fallback = fallback;

    this.canRender = this._canRender();
    this.cssClass = this._cssClass();
    this.cssStyle = this._cssStyle();
    this.content = this._content();

    (0, _freeze2.default)(this);
  }

  (0, _createClass3.default)(EmojiView, [{
    key: '_getEmoji',
    value: function _getEmoji() {
      return this._emoji.getSkin(this._skin);
    }
  }, {
    key: '_canRender',
    value: function _canRender() {
      return this._isCustom() || this._isNative() || this._hasEmoji() || this._fallback;
    }
  }, {
    key: '_cssClass',
    value: function _cssClass() {
      return ['emoji-set-' + this._set, 'emoji-type-' + this._emojiType()];
    }
  }, {
    key: '_cssStyle',
    value: function _cssStyle() {
      if (this._isCustom()) {
        return {
          backgroundImage: 'url(' + this._getEmoji()._data.imageUrl + ')',
          backgroundSize: '100%'
        };
      }
      if (this._hasEmoji() && !this._isNative()) {
        return {
          backgroundPosition: this._getEmoji().getPosition()
        };
      }
      return {};
    }
  }, {
    key: '_content',
    value: function _content() {
      if (this._isCustom()) {
        return '';
      }
      if (this._isNative()) {
        return this._getEmoji().native;
      }
      if (this._hasEmoji()) {
        return '';
      }
      return this._fallback ? this._fallback(this._getEmoji()) : null;
    }
  }, {
    key: '_isNative',
    value: function _isNative() {
      return this._native;
    }
  }, {
    key: '_isCustom',
    value: function _isCustom() {
      return this._getEmoji().custom;
    }
  }, {
    key: '_hasEmoji',
    value: function _hasEmoji() {
      return this._getEmoji()._data && this._getEmoji()._data['has_img_' + this._set];
    }
  }, {
    key: '_emojiType',
    value: function _emojiType() {
      if (this._isCustom()) {
        return 'custom';
      }
      if (this._isNative()) {
        return 'native';
      }
      if (this._hasEmoji()) {
        return 'image';
      }
      return 'fallback';
    }
  }]);
  return EmojiView;
}();

function sanitize(emoji) {
  var name = emoji.name;
  var short_names = emoji.short_names;
  var skin_tone = emoji.skin_tone;
  var skin_variations = emoji.skin_variations;
  var emoticons = emoji.emoticons;
  var unified = emoji.unified;
  var custom = emoji.custom;
  var imageUrl = emoji.imageUrl;
  var id = emoji.id || short_names[0];
  var colons = ':' + id + ':';

  if (custom) {
    return {
      id: id,
      name: name,
      colons: colons,
      emoticons: emoticons,
      custom: custom,
      imageUrl: imageUrl
    };
  }

  if (skin_tone) {
    colons += ':skin-tone-' + skin_tone + ':';
  }

  return {
    id: id,
    name: name,
    colons: colons,
    emoticons: emoticons,
    unified: unified.toLowerCase(),
    skin: skin_tone || (skin_variations ? 1 : null),
    native: (0, _index.unifiedToNative)(unified)
  };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(47);
var enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f853594_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimbleEmoji_vue__ = __webpack_require__(115);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimbleEmoji_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f853594_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimbleEmoji_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/emoji/nimbleEmoji.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f853594", Component.options)
  } else {
    hotAPI.reload("data-v-7f853594", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Object = Object;

exports.default = _Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EmojiProps = {
  native: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: Boolean,
    default: false
  },
  fallback: {
    type: Function
  },
  skin: {
    type: Number,
    default: 1
  },
  set: {
    type: String,
    default: 'apple'
  },
  emoji: {
    type: [String, Object],
    required: true
  }
};

var PickerProps = {
  perLine: {
    type: Number,
    default: 9
  },
  emojiSize: {
    type: Number,
    default: 24
  },
  title: {
    type: String,
    default: 'Emoji Mart™'
  },
  emoji: {
    type: String,
    default: 'department_store'
  },
  color: {
    type: String,
    default: '#ae65c5'
  },
  set: {
    type: String,
    default: 'apple'
  },
  skin: {
    type: Number,
    default: null
  },
  defaultSkin: {
    type: Number,
    default: 1
  },
  native: {
    type: Boolean,
    default: false
  },
  emojiTooltip: {
    type: Boolean,
    default: false
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  i18n: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  showPreview: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showCategories: {
    type: Boolean,
    default: true
  },
  showSkinTones: {
    type: Boolean,
    default: true
  },
  infiniteScroll: {
    type: Boolean,
    default: true
  },
  pickerStyles: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};

exports.EmojiProps = EmojiProps;
exports.PickerProps = PickerProps;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(28)('keys');
var uid = __webpack_require__(18);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(17) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(5);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(93)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(52)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(17);
var wksExt = __webpack_require__(35);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(59);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = __webpack_require__(50);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _freeze = __webpack_require__(34);

var _freeze2 = _interopRequireDefault(_freeze);

var _getOwnPropertyNames = __webpack_require__(112);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapping = {
  name: 'a',
  unified: 'b',
  non_qualified: 'c',
  has_img_apple: 'd',
  has_img_google: 'e',
  has_img_twitter: 'f',
  has_img_emojione: 'g',
  has_img_facebook: 'h',
  has_img_messenger: 'i',
  keywords: 'j',
  sheet: 'k',
  emoticons: 'l',
  text: 'm',
  short_names: 'n',
  added_in: 'o'
};

var buildSearch = function buildSearch(emoji) {
  var search = [];

  var addToSearch = function addToSearch(strings, split) {
    if (!strings) {
      return;
    }

    ;(Array.isArray(strings) ? strings : [strings]).forEach(function (string) {
      ;(split ? string.split(/[-|_|\s]+/) : [string]).forEach(function (s) {
        s = s.toLowerCase();

        if (search.indexOf(s) == -1) {
          search.push(s);
        }
      });
    });
  };

  addToSearch(emoji.short_names, true);
  addToSearch(emoji.name, true);
  addToSearch(emoji.keywords, false);
  addToSearch(emoji.emoticons, false);

  return search.join(',');
};

var compress = function compress(emoji) {
  emoji.short_names = emoji.short_names.filter(function (short_name) {
    return short_name !== emoji.short_name;
  });
  delete emoji.short_name;

  emoji.sheet = [emoji.sheet_x, emoji.sheet_y];
  delete emoji.sheet_x;
  delete emoji.sheet_y;

  emoji.added_in = parseInt(emoji.added_in);
  if (emoji.added_in === 6) {
    delete emoji.added_in;
  }

  for (var key in mapping) {
    emoji[mapping[key]] = emoji[key];
    delete emoji[key];
  }

  for (var _key in emoji) {
    var value = emoji[_key];

    if (Array.isArray(value) && !value.length) {
      delete emoji[_key];
    } else if (typeof value === 'string' && !value.length) {
      delete emoji[_key];
    } else if (value === null) {
      delete emoji[_key];
    }
  }
};

function deepFreeze(object) {
  // Retrieve the property names defined on object
  var propNames = (0, _getOwnPropertyNames2.default)(object);

  // Freeze properties before freezing self
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(propNames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      var value = object[name];
      object[name] = value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === "object" ? deepFreeze(value) : value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (0, _freeze2.default)(object);
}

var uncompress = function uncompress(data) {
  if (!data.compressed) {
    return data;
  }
  data.compressed = false;

  for (var id in data.emojis) {
    var emoji = data.emojis[id];

    for (var key in mapping) {
      emoji[key] = emoji[mapping[key]];
      delete emoji[mapping[key]];
    }

    if (!emoji.short_names) emoji.short_names = [];
    emoji.short_names.unshift(id);

    emoji.sheet_x = emoji.sheet[0];
    emoji.sheet_y = emoji.sheet[1];
    delete emoji.sheet;

    if (!emoji.text) emoji.text = '';

    if (!emoji.added_in) emoji.added_in = 6;
    emoji.added_in = emoji.added_in.toFixed(1);

    emoji.search = buildSearch(emoji);
  }
  data = deepFreeze(data);
  return data;
};

module.exports = { buildSearch: buildSearch, compress: compress, uncompress: uncompress };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = __webpack_require__(39);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = ['+1', 'grinning', 'kissing_heart', 'heart_eyes', 'laughing', 'stuck_out_tongue_winking_eye', 'sweat_smile', 'joy', 'scream', 'disappointed', 'unamused', 'weary', 'sob', 'sunglasses', 'heart', 'poop'];

var frequently = void 0,
    initialized = void 0;
var defaults = {};

function init() {
  initialized = true;
  frequently = _store2.default.get('frequently');
}

function add(emoji) {
  if (!initialized) init();
  var id = emoji.id;


  frequently || (frequently = defaults);
  frequently[id] || (frequently[id] = 0);
  frequently[id] += 1;

  _store2.default.set('last', id);
  _store2.default.set('frequently', frequently);
}

function get(maxNumber) {
  if (!initialized) init();
  if (!frequently) {
    defaults = {};

    var result = [];

    var defaultLength = Math.min(maxNumber, DEFAULTS.length);
    for (var i = 0; i < defaultLength; i++) {
      defaults[DEFAULTS[i]] = defaultLength - i;
      result.push(DEFAULTS[i]);
    }

    return result;
  }

  var quantity = maxNumber;
  var frequentlyKeys = [];

  for (var key in frequently) {
    if (frequently.hasOwnProperty(key)) {
      frequentlyKeys.push(key);
    }
  }

  var sorted = frequentlyKeys.sort(function (a, b) {
    return frequently[a] - frequently[b];
  }).reverse();
  var sliced = sorted.slice(0, quantity);

  var last = _store2.default.get('last');

  if (last && sliced.indexOf(last) == -1) {
    sliced.pop();
    sliced.push(last);
  }

  return sliced;
}

exports.default = { add: add, get: get };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAMESPACE = 'emoji-mart';

var _JSON = JSON;

var isLocalStorageSupported = typeof window !== 'undefined' && 'localStorage' in window;

var getter = void 0;
var setter = void 0;

function setHandlers(handlers) {
  handlers || (handlers = {});

  getter = handlers.getter;
  setter = handlers.setter;
}

function setNamespace(namespace) {
  NAMESPACE = namespace;
}

function update(state) {
  for (var key in state) {
    var value = state[key];
    set(key, value);
  }
}

function set(key, value) {
  if (setter) {
    setter(key, value);
  } else {
    if (!isLocalStorageSupported) return;
    try {
      window.localStorage[NAMESPACE + '.' + key] = _JSON.stringify(value);
    } catch (e) {}
  }
}

function get(key) {
  if (getter) {
    return getter(key);
  } else {
    if (!isLocalStorageSupported) return;
    try {
      var value = window.localStorage[NAMESPACE + '.' + key];
    } catch (e) {
      return;
    }

    if (value) {
      return JSON.parse(value);
    }
  }
}

exports.default = { update: update, set: set, get: get, setNamespace: setNamespace, setHandlers: setHandlers };

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_51188104_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_anchors_vue__ = __webpack_require__(77);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_anchors_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_51188104_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_anchors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/anchors.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51188104", Component.options)
  } else {
    hotAPI.reload("data-v-51188104", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _svgs = __webpack_require__(76);

var _svgs2 = _interopRequireDefault(_svgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    i18n: {
      type: Object,
      required: true
    },
    color: {
      type: String
    },
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    this.svgs = _svgs2.default;
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_376cda0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_category_vue__ = __webpack_require__(116);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_category_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_376cda0e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_category_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/category.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-376cda0e", Component.options)
  } else {
    hotAPI.reload("data-v-376cda0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emojiData = __webpack_require__(15);

var _nimbleEmoji = __webpack_require__(20);

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: {
    data: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    emojis: {
      type: Array
    },
    emojiProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    isVisible: function isVisible() {
      return !!this.emojis;
    },
    isSearch: function isSearch() {
      return this.name == 'Search';
    },
    hasResults: function hasResults() {
      return this.emojis.length > 0;
    },
    emojiObjects: function emojiObjects() {
      var _this = this;

      return this.emojis.map(function (emoji) {
        var emojiObject = emoji;
        var emojiView = new _emojiData.EmojiView(emoji, _this.emojiProps.skin, _this.emojiProps.set, _this.emojiProps.native, _this.emojiProps.fallback);
        return { emojiObject: emojiObject, emojiView: emojiView };
      });
    }
  },
  components: {
    NimbleEmoji: _nimbleEmoji2.default
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(81);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(46)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(5);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(83)(false);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var global = __webpack_require__(3);
var hide = __webpack_require__(6);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var $export = __webpack_require__(12);
var redefine = __webpack_require__(53);
var hide = __webpack_require__(6);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(89);
var setToStringTag = __webpack_require__(32);
var getPrototypeOf = __webpack_require__(92);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(90);
var enumBugKeys = __webpack_require__(29);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(46)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(91).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(95);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(18)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(5);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(12);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureScrollbar = exports.unifiedToNative = exports.deepMerge = exports.intersect = exports.uniq = undefined;

var _typeof2 = __webpack_require__(59);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringFromCodePoint = __webpack_require__(111);

var _stringFromCodePoint2 = _interopRequireDefault(_stringFromCodePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unifiedToNative(unified) {
  var unicodes = unified.split('-'),
      codePoints = unicodes.map(function (u) {
    return '0x' + u;
  });

  return _stringFromCodePoint2.default.apply(null, codePoints);
}

function uniq(arr) {
  return arr.reduce(function (acc, item) {
    if (acc.indexOf(item) === -1) {
      acc.push(item);
    }
    return acc;
  }, []);
}

function intersect(a, b) {
  var uniqA = uniq(a);
  var uniqB = uniq(b);

  return uniqA.filter(function (item) {
    return uniqB.indexOf(item) >= 0;
  });
}

function deepMerge(a, b) {
  var o = {};

  for (var key in a) {
    var originalValue = a[key],
        value = originalValue;

    if (b.hasOwnProperty(key)) {
      value = b[key];
    }

    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      value = deepMerge(originalValue, value);
    }

    o[key] = value;
  }

  return o;
}

// https://github.com/sonicdoe/measure-scrollbar
function measureScrollbar() {
  if (typeof document == 'undefined') return 0;
  var div = document.createElement('div');

  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  div.style.position = 'absolute';
  div.style.top = '-9999px';

  document.body.appendChild(div);
  var scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollbarWidth;
}

exports.uniq = uniq;
exports.intersect = intersect;
exports.deepMerge = deepMerge;
exports.unifiedToNative = unifiedToNative;
exports.measureScrollbar = measureScrollbar;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(100);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(102);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(61).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(47);
var hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

var _sharedProps = __webpack_require__(22);

var _emojiData = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//


var SHEET_COLUMNS = 52;

exports.default = {
  props: (0, _extends3.default)({}, _sharedProps.EmojiProps, {
    data: {
      type: Object,
      required: true
    }
  }),
  computed: {
    view: function view() {
      return new _emojiData.EmojiView(this._emoji, this.skin, this.set, this.native, this.fallback);
    },
    sanitizedData: function sanitizedData() {
      return this._emoji._sanitized;
    },
    title: function title() {
      return this.tooltip ? this._emoji.short_name : null;
    }
  },
  created: function created() {
    if (typeof this.emoji == "string") {
      this._emoji = this.data.emoji(this.emoji);
    } else {
      this._emoji = this.emoji;
    }
  },

  methods: {
    onClick: function onClick() {
      this.$emit('click', this._emoji);
    },
    onMouseEnter: function onMouseEnter() {
      this.$emit('mouseenter', this._emoji);
    },
    onMouseLeave: function onMouseLeave() {
      this.$emit('mouseleave', this._emoji);
    }
  }
};

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35056c30_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_preview_vue__ = __webpack_require__(118);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_preview_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_35056c30_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_preview_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/preview.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35056c30", Component.options)
  } else {
    hotAPI.reload("data-v-35056c30", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nimbleEmoji = __webpack_require__(20);

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _skins = __webpack_require__(65);

var _skins2 = _interopRequireDefault(_skins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: {
    data: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    emoji: {
      type: [String, Object]
    },
    idleEmoji: {
      type: [String, Object],
      required: true
    },
    showSkinTones: {
      type: Boolean,
      default: true
    },
    emojiProps: {
      type: Object,
      required: true
    },
    skinProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    emojiData: function emojiData() {
      if (this.emoji) {
        return this.emoji;
      } else {
        return {};
      }
    },
    emojiShortNames: function emojiShortNames() {
      return this.emojiData.short_names;
    },
    emojiEmoticons: function emojiEmoticons() {
      return this.emojiData.emoticons;
    }
  },
  components: {
    NimbleEmoji: _nimbleEmoji2.default,
    Skins: _skins2.default
  }
};

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c614894_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_skins_vue__ = __webpack_require__(117);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_skins_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1c614894_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_skins_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/skins.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c614894", Component.options)
  } else {
    hotAPI.reload("data-v-1c614894", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: {
    skin: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      opened: false
    };
  },

  methods: {
    onClick: function onClick(skinTone) {
      if (this.opened) {
        if (skinTone != this.skin) {
          this.$emit('change', skinTone);
        }
      }

      this.opened = !this.opened;
    }
  }
};

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ad41bb8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__ = __webpack_require__(119);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_search_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ad41bb8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_search_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/search.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ad41bb8", Component.options)
  } else {
    hotAPI.reload("data-v-4ad41bb8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//


exports.default = {
  props: {
    data: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      required: true
    },
    maxResults: {
      type: Number,
      default: 75
    },
    autoFocus: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      value: ''
    };
  },

  computed: {
    emojiIndex: function emojiIndex() {
      return this.data;
    }
  },
  watch: {
    value: function value() {
      var emojis = this.emojiIndex.search(this.value, this.maxResults);
      this.$emit('search', emojis);
    }
  },
  methods: {
    clear: function clear() {
      this.value = '';
    }
  },
  mounted: function mounted() {
    var $input = this.$el.querySelector('input');

    if (this.autoFocus) {
      $input.focus();
    }
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

var _all = __webpack_require__(70);

var _all2 = _interopRequireDefault(_all);

var _data = __webpack_require__(37);

var _nimbleEmoji = __webpack_require__(20);

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _sharedProps = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  functional: true,
  props: (0, _extends3.default)({}, _sharedProps.EmojiProps, {
    data: {
      type: Object,
      default: function _default() {
        return (0, _data.uncompress)(_all2.default);
      }
    }
  }),
  render: function render(h, ctx) {
    var data = ctx.data;
    var props = ctx.props;
    var children = ctx.children;


    return h(_nimbleEmoji2.default, (0, _extends3.default)({}, data, { props: props }), children);
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {"compressed":true,"categories":[{"id":"people","name":"Smileys & People","emojis":["grinning","grin","joy","rolling_on_the_floor_laughing","smiley","smile","sweat_smile","laughing","wink","blush","yum","sunglasses","heart_eyes","kissing_heart","kissing","kissing_smiling_eyes","kissing_closed_eyes","relaxed","slightly_smiling_face","hugging_face","star-struck","thinking_face","face_with_raised_eyebrow","neutral_face","expressionless","no_mouth","face_with_rolling_eyes","smirk","persevere","disappointed_relieved","open_mouth","zipper_mouth_face","hushed","sleepy","tired_face","sleeping","relieved","stuck_out_tongue","stuck_out_tongue_winking_eye","stuck_out_tongue_closed_eyes","drooling_face","unamused","sweat","pensive","confused","upside_down_face","money_mouth_face","astonished","white_frowning_face","slightly_frowning_face","confounded","disappointed","worried","triumph","cry","sob","frowning","anguished","fearful","weary","exploding_head","grimacing","cold_sweat","scream","flushed","zany_face","dizzy_face","rage","angry","face_with_symbols_on_mouth","mask","face_with_thermometer","face_with_head_bandage","nauseated_face","face_vomiting","sneezing_face","innocent","face_with_cowboy_hat","clown_face","lying_face","shushing_face","face_with_hand_over_mouth","face_with_monocle","nerd_face","smiling_imp","imp","japanese_ogre","japanese_goblin","skull","skull_and_crossbones","ghost","alien","space_invader","robot_face","hankey","smiley_cat","smile_cat","joy_cat","heart_eyes_cat","smirk_cat","kissing_cat","scream_cat","crying_cat_face","pouting_cat","see_no_evil","hear_no_evil","speak_no_evil","baby","child","boy","girl","adult","man","woman","older_adult","older_man","older_woman","male-doctor","female-doctor","male-student","female-student","male-teacher","female-teacher","male-judge","female-judge","male-farmer","female-farmer","male-cook","female-cook","male-mechanic","female-mechanic","male-factory-worker","female-factory-worker","male-office-worker","female-office-worker","male-scientist","female-scientist","male-technologist","female-technologist","male-singer","female-singer","male-artist","female-artist","male-pilot","female-pilot","male-astronaut","female-astronaut","male-firefighter","female-firefighter","cop","male-police-officer","female-police-officer","sleuth_or_spy","male-detective","female-detective","guardsman","male-guard","female-guard","construction_worker","male-construction-worker","female-construction-worker","prince","princess","man_with_turban","man-wearing-turban","woman-wearing-turban","man_with_gua_pi_mao","person_with_headscarf","bearded_person","person_with_blond_hair","blond-haired-man","blond-haired-woman","man_in_tuxedo","bride_with_veil","pregnant_woman","breast-feeding","angel","santa","mrs_claus","mage","female_mage","male_mage","fairy","female_fairy","male_fairy","vampire","female_vampire","male_vampire","merperson","mermaid","merman","elf","female_elf","male_elf","genie","female_genie","male_genie","zombie","female_zombie","male_zombie","person_frowning","man-frowning","woman-frowning","person_with_pouting_face","man-pouting","woman-pouting","no_good","man-gesturing-no","woman-gesturing-no","ok_woman","man-gesturing-ok","woman-gesturing-ok","information_desk_person","man-tipping-hand","woman-tipping-hand","raising_hand","man-raising-hand","woman-raising-hand","bow","man-bowing","woman-bowing","face_palm","man-facepalming","woman-facepalming","shrug","man-shrugging","woman-shrugging","massage","man-getting-massage","woman-getting-massage","haircut","man-getting-haircut","woman-getting-haircut","walking","man-walking","woman-walking","runner","man-running","woman-running","dancer","man_dancing","dancers","man-with-bunny-ears-partying","woman-with-bunny-ears-partying","person_in_steamy_room","woman_in_steamy_room","man_in_steamy_room","person_climbing","woman_climbing","man_climbing","person_in_lotus_position","woman_in_lotus_position","man_in_lotus_position","bath","sleeping_accommodation","man_in_business_suit_levitating","speaking_head_in_silhouette","bust_in_silhouette","busts_in_silhouette","fencer","horse_racing","skier","snowboarder","golfer","man-golfing","woman-golfing","surfer","man-surfing","woman-surfing","rowboat","man-rowing-boat","woman-rowing-boat","swimmer","man-swimming","woman-swimming","person_with_ball","man-bouncing-ball","woman-bouncing-ball","weight_lifter","man-lifting-weights","woman-lifting-weights","bicyclist","man-biking","woman-biking","mountain_bicyclist","man-mountain-biking","woman-mountain-biking","racing_car","racing_motorcycle","person_doing_cartwheel","man-cartwheeling","woman-cartwheeling","wrestlers","man-wrestling","woman-wrestling","water_polo","man-playing-water-polo","woman-playing-water-polo","handball","man-playing-handball","woman-playing-handball","juggling","man-juggling","woman-juggling","couple","two_men_holding_hands","two_women_holding_hands","couplekiss","woman-kiss-man","man-kiss-man","woman-kiss-woman","couple_with_heart","woman-heart-man","man-heart-man","woman-heart-woman","family","man-woman-boy","man-woman-girl","man-woman-girl-boy","man-woman-boy-boy","man-woman-girl-girl","man-man-boy","man-man-girl","man-man-girl-boy","man-man-boy-boy","man-man-girl-girl","woman-woman-boy","woman-woman-girl","woman-woman-girl-boy","woman-woman-boy-boy","woman-woman-girl-girl","man-boy","man-boy-boy","man-girl","man-girl-boy","man-girl-girl","woman-boy","woman-boy-boy","woman-girl","woman-girl-boy","woman-girl-girl","selfie","muscle","point_left","point_right","point_up","point_up_2","middle_finger","point_down","v","crossed_fingers","spock-hand","the_horns","call_me_hand","raised_hand_with_fingers_splayed","hand","ok_hand","+1","-1","fist","facepunch","left-facing_fist","right-facing_fist","raised_back_of_hand","wave","i_love_you_hand_sign","writing_hand","clap","open_hands","raised_hands","palms_up_together","pray","handshake","nail_care","ear","nose","footprints","eyes","eye","eye-in-speech-bubble","brain","tongue","lips","kiss","cupid","heart","heartbeat","broken_heart","two_hearts","sparkling_heart","heartpulse","blue_heart","green_heart","yellow_heart","orange_heart","purple_heart","black_heart","gift_heart","revolving_hearts","heart_decoration","heavy_heart_exclamation_mark_ornament","love_letter","zzz","anger","bomb","boom","sweat_drops","dash","dizzy","speech_balloon","left_speech_bubble","right_anger_bubble","thought_balloon","hole","eyeglasses","dark_sunglasses","necktie","shirt","jeans","scarf","gloves","coat","socks","dress","kimono","bikini","womans_clothes","purse","handbag","pouch","shopping_bags","school_satchel","mans_shoe","athletic_shoe","high_heel","sandal","boot","crown","womans_hat","tophat","mortar_board","billed_cap","helmet_with_white_cross","prayer_beads","lipstick","ring","gem"]},{"id":"nature","name":"Animals & Nature","emojis":["monkey_face","monkey","gorilla","dog","dog2","poodle","wolf","fox_face","cat","cat2","lion_face","tiger","tiger2","leopard","horse","racehorse","unicorn_face","zebra_face","deer","cow","ox","water_buffalo","cow2","pig","pig2","boar","pig_nose","ram","sheep","goat","dromedary_camel","camel","giraffe_face","elephant","rhinoceros","mouse","mouse2","rat","hamster","rabbit","rabbit2","chipmunk","hedgehog","bat","bear","koala","panda_face","feet","turkey","chicken","rooster","hatching_chick","baby_chick","hatched_chick","bird","penguin","dove_of_peace","eagle","duck","owl","frog","crocodile","turtle","lizard","snake","dragon_face","dragon","sauropod","t-rex","whale","whale2","dolphin","fish","tropical_fish","blowfish","shark","octopus","shell","crab","shrimp","squid","snail","butterfly","bug","ant","bee","beetle","cricket","spider","spider_web","scorpion","bouquet","cherry_blossom","white_flower","rosette","rose","wilted_flower","hibiscus","sunflower","blossom","tulip","seedling","evergreen_tree","deciduous_tree","palm_tree","cactus","ear_of_rice","herb","shamrock","four_leaf_clover","maple_leaf","fallen_leaf","leaves"]},{"id":"foods","name":"Food & Drink","emojis":["grapes","melon","watermelon","tangerine","lemon","banana","pineapple","apple","green_apple","pear","peach","cherries","strawberry","kiwifruit","tomato","coconut","avocado","eggplant","potato","carrot","corn","hot_pepper","cucumber","broccoli","mushroom","peanuts","chestnut","bread","croissant","baguette_bread","pretzel","pancakes","cheese_wedge","meat_on_bone","poultry_leg","cut_of_meat","bacon","hamburger","fries","pizza","hotdog","sandwich","taco","burrito","stuffed_flatbread","egg","fried_egg","shallow_pan_of_food","stew","bowl_with_spoon","green_salad","popcorn","canned_food","bento","rice_cracker","rice_ball","rice","curry","ramen","spaghetti","sweet_potato","oden","sushi","fried_shrimp","fish_cake","dango","dumpling","fortune_cookie","takeout_box","icecream","shaved_ice","ice_cream","doughnut","cookie","birthday","cake","pie","chocolate_bar","candy","lollipop","custard","honey_pot","baby_bottle","glass_of_milk","coffee","tea","sake","champagne","wine_glass","cocktail","tropical_drink","beer","beers","clinking_glasses","tumbler_glass","cup_with_straw","chopsticks","knife_fork_plate","fork_and_knife","spoon","hocho","amphora"]},{"id":"activity","name":"Activities","emojis":["jack_o_lantern","christmas_tree","fireworks","sparkler","sparkles","balloon","tada","confetti_ball","tanabata_tree","bamboo","dolls","flags","wind_chime","rice_scene","ribbon","gift","reminder_ribbon","admission_tickets","ticket","medal","trophy","sports_medal","first_place_medal","second_place_medal","third_place_medal","soccer","baseball","basketball","volleyball","football","rugby_football","tennis","8ball","bowling","cricket_bat_and_ball","field_hockey_stick_and_ball","ice_hockey_stick_and_puck","table_tennis_paddle_and_ball","badminton_racquet_and_shuttlecock","boxing_glove","martial_arts_uniform","goal_net","dart","golf","ice_skate","fishing_pole_and_fish","running_shirt_with_sash","ski","sled","curling_stone","video_game","joystick","game_die","spades","hearts","diamonds","clubs","black_joker","mahjong","flower_playing_cards"]},{"id":"places","name":"Travel & Places","emojis":["earth_africa","earth_americas","earth_asia","globe_with_meridians","world_map","japan","snow_capped_mountain","mountain","volcano","mount_fuji","camping","beach_with_umbrella","desert","desert_island","national_park","stadium","classical_building","building_construction","house_buildings","cityscape","derelict_house_building","house","house_with_garden","office","post_office","european_post_office","hospital","bank","hotel","love_hotel","convenience_store","school","department_store","factory","japanese_castle","european_castle","wedding","tokyo_tower","statue_of_liberty","church","mosque","synagogue","shinto_shrine","kaaba","fountain","tent","foggy","night_with_stars","sunrise_over_mountains","sunrise","city_sunset","city_sunrise","bridge_at_night","hotsprings","milky_way","carousel_horse","ferris_wheel","roller_coaster","barber","circus_tent","performing_arts","frame_with_picture","art","slot_machine","steam_locomotive","railway_car","bullettrain_side","bullettrain_front","train2","metro","light_rail","station","tram","monorail","mountain_railway","train","bus","oncoming_bus","trolleybus","minibus","ambulance","fire_engine","police_car","oncoming_police_car","taxi","oncoming_taxi","car","oncoming_automobile","blue_car","truck","articulated_lorry","tractor","bike","scooter","motor_scooter","busstop","motorway","railway_track","fuelpump","rotating_light","traffic_light","vertical_traffic_light","construction","octagonal_sign","anchor","boat","canoe","speedboat","passenger_ship","ferry","motor_boat","ship","airplane","small_airplane","airplane_departure","airplane_arriving","seat","helicopter","suspension_railway","mountain_cableway","aerial_tramway","satellite","rocket","flying_saucer","bellhop_bell","door","bed","couch_and_lamp","toilet","shower","bathtub","hourglass","hourglass_flowing_sand","watch","alarm_clock","stopwatch","timer_clock","mantelpiece_clock","clock12","clock1230","clock1","clock130","clock2","clock230","clock3","clock330","clock4","clock430","clock5","clock530","clock6","clock630","clock7","clock730","clock8","clock830","clock9","clock930","clock10","clock1030","clock11","clock1130","new_moon","waxing_crescent_moon","first_quarter_moon","moon","full_moon","waning_gibbous_moon","last_quarter_moon","waning_crescent_moon","crescent_moon","new_moon_with_face","first_quarter_moon_with_face","last_quarter_moon_with_face","thermometer","sunny","full_moon_with_face","sun_with_face","star","star2","stars","cloud","partly_sunny","thunder_cloud_and_rain","mostly_sunny","barely_sunny","partly_sunny_rain","rain_cloud","snow_cloud","lightning","tornado","fog","wind_blowing_face","cyclone","rainbow","closed_umbrella","umbrella","umbrella_with_rain_drops","umbrella_on_ground","zap","snowflake","snowman","snowman_without_snow","comet","fire","droplet","ocean"]},{"id":"objects","name":"Objects","emojis":["mute","speaker","sound","loud_sound","loudspeaker","mega","postal_horn","bell","no_bell","musical_score","musical_note","notes","studio_microphone","level_slider","control_knobs","microphone","headphones","radio","saxophone","guitar","musical_keyboard","trumpet","violin","drum_with_drumsticks","iphone","calling","phone","telephone_receiver","pager","fax","battery","electric_plug","computer","desktop_computer","printer","keyboard","three_button_mouse","trackball","minidisc","floppy_disk","cd","dvd","movie_camera","film_frames","film_projector","clapper","tv","camera","camera_with_flash","video_camera","vhs","mag","mag_right","microscope","telescope","satellite_antenna","candle","bulb","flashlight","izakaya_lantern","notebook_with_decorative_cover","closed_book","book","green_book","blue_book","orange_book","books","notebook","ledger","page_with_curl","scroll","page_facing_up","newspaper","rolled_up_newspaper","bookmark_tabs","bookmark","label","moneybag","yen","dollar","euro","pound","money_with_wings","credit_card","chart","currency_exchange","heavy_dollar_sign","email","e-mail","incoming_envelope","envelope_with_arrow","outbox_tray","inbox_tray","package","mailbox","mailbox_closed","mailbox_with_mail","mailbox_with_no_mail","postbox","ballot_box_with_ballot","pencil2","black_nib","lower_left_fountain_pen","lower_left_ballpoint_pen","lower_left_paintbrush","lower_left_crayon","memo","briefcase","file_folder","open_file_folder","card_index_dividers","date","calendar","spiral_note_pad","spiral_calendar_pad","card_index","chart_with_upwards_trend","chart_with_downwards_trend","bar_chart","clipboard","pushpin","round_pushpin","paperclip","linked_paperclips","straight_ruler","triangular_ruler","scissors","card_file_box","file_cabinet","wastebasket","lock","unlock","lock_with_ink_pen","closed_lock_with_key","key","old_key","hammer","pick","hammer_and_pick","hammer_and_wrench","dagger_knife","crossed_swords","gun","bow_and_arrow","shield","wrench","nut_and_bolt","gear","compression","alembic","scales","link","chains","syringe","pill","smoking","coffin","funeral_urn","moyai","oil_drum","crystal_ball","shopping_trolley"]},{"id":"symbols","name":"Symbols","emojis":["atm","put_litter_in_its_place","potable_water","wheelchair","mens","womens","restroom","baby_symbol","wc","passport_control","customs","baggage_claim","left_luggage","warning","children_crossing","no_entry","no_entry_sign","no_bicycles","no_smoking","do_not_litter","non-potable_water","no_pedestrians","no_mobile_phones","underage","radioactive_sign","biohazard_sign","arrow_up","arrow_upper_right","arrow_right","arrow_lower_right","arrow_down","arrow_lower_left","arrow_left","arrow_upper_left","arrow_up_down","left_right_arrow","leftwards_arrow_with_hook","arrow_right_hook","arrow_heading_up","arrow_heading_down","arrows_clockwise","arrows_counterclockwise","back","end","on","soon","top","place_of_worship","atom_symbol","om_symbol","star_of_david","wheel_of_dharma","yin_yang","latin_cross","orthodox_cross","star_and_crescent","peace_symbol","menorah_with_nine_branches","six_pointed_star","aries","taurus","gemini","cancer","leo","virgo","libra","scorpius","sagittarius","capricorn","aquarius","pisces","ophiuchus","twisted_rightwards_arrows","repeat","repeat_one","arrow_forward","fast_forward","black_right_pointing_double_triangle_with_vertical_bar","black_right_pointing_triangle_with_double_vertical_bar","arrow_backward","rewind","black_left_pointing_double_triangle_with_vertical_bar","arrow_up_small","arrow_double_up","arrow_down_small","arrow_double_down","double_vertical_bar","black_square_for_stop","black_circle_for_record","eject","cinema","low_brightness","high_brightness","signal_strength","vibration_mode","mobile_phone_off","female_sign","male_sign","medical_symbol","recycle","fleur_de_lis","trident","name_badge","beginner","o","white_check_mark","ballot_box_with_check","heavy_check_mark","heavy_multiplication_x","x","negative_squared_cross_mark","heavy_plus_sign","heavy_minus_sign","heavy_division_sign","curly_loop","loop","part_alternation_mark","eight_spoked_asterisk","eight_pointed_black_star","sparkle","bangbang","interrobang","question","grey_question","grey_exclamation","exclamation","wavy_dash","copyright","registered","tm","hash","keycap_star","zero","one","two","three","four","five","six","seven","eight","nine","keycap_ten","100","capital_abcd","abcd","1234","symbols","abc","a","ab","b","cl","cool","free","information_source","id","m","new","ng","o2","ok","parking","sos","up","vs","koko","sa","u6708","u6709","u6307","ideograph_advantage","u5272","u7121","u7981","accept","u7533","u5408","u7a7a","congratulations","secret","u55b6","u6e80","black_small_square","white_small_square","white_medium_square","black_medium_square","white_medium_small_square","black_medium_small_square","black_large_square","white_large_square","large_orange_diamond","large_blue_diamond","small_orange_diamond","small_blue_diamond","small_red_triangle","small_red_triangle_down","diamond_shape_with_a_dot_inside","radio_button","black_square_button","white_square_button","white_circle","black_circle","red_circle","large_blue_circle"]},{"id":"flags","name":"Flags","emojis":["checkered_flag","cn","crossed_flags","de","es","flag-ac","flag-ad","flag-ae","flag-af","flag-ag","flag-ai","flag-al","flag-am","flag-ao","flag-aq","flag-ar","flag-as","flag-at","flag-au","flag-aw","flag-ax","flag-az","flag-ba","flag-bb","flag-bd","flag-be","flag-bf","flag-bg","flag-bh","flag-bi","flag-bj","flag-bl","flag-bm","flag-bn","flag-bo","flag-bq","flag-br","flag-bs","flag-bt","flag-bv","flag-bw","flag-by","flag-bz","flag-ca","flag-cc","flag-cd","flag-cf","flag-cg","flag-ch","flag-ci","flag-ck","flag-cl","flag-cm","flag-co","flag-cp","flag-cr","flag-cu","flag-cv","flag-cw","flag-cx","flag-cy","flag-cz","flag-dg","flag-dj","flag-dk","flag-dm","flag-do","flag-dz","flag-ea","flag-ec","flag-ee","flag-eg","flag-eh","flag-england","flag-er","flag-et","flag-eu","flag-fi","flag-fj","flag-fk","flag-fm","flag-fo","flag-ga","flag-gd","flag-ge","flag-gf","flag-gg","flag-gh","flag-gi","flag-gl","flag-gm","flag-gn","flag-gp","flag-gq","flag-gr","flag-gs","flag-gt","flag-gu","flag-gw","flag-gy","flag-hk","flag-hm","flag-hn","flag-hr","flag-ht","flag-hu","flag-ic","flag-id","flag-ie","flag-il","flag-im","flag-in","flag-io","flag-iq","flag-ir","flag-is","flag-je","flag-jm","flag-jo","flag-ke","flag-kg","flag-kh","flag-ki","flag-km","flag-kn","flag-kp","flag-kw","flag-ky","flag-kz","flag-la","flag-lb","flag-lc","flag-li","flag-lk","flag-lr","flag-ls","flag-lt","flag-lu","flag-lv","flag-ly","flag-ma","flag-mc","flag-md","flag-me","flag-mf","flag-mg","flag-mh","flag-mk","flag-ml","flag-mm","flag-mn","flag-mo","flag-mp","flag-mq","flag-mr","flag-ms","flag-mt","flag-mu","flag-mv","flag-mw","flag-mx","flag-my","flag-mz","flag-na","flag-nc","flag-ne","flag-nf","flag-ng","flag-ni","flag-nl","flag-no","flag-np","flag-nr","flag-nu","flag-nz","flag-om","flag-pa","flag-pe","flag-pf","flag-pg","flag-ph","flag-pk","flag-pl","flag-pm","flag-pn","flag-pr","flag-ps","flag-pt","flag-pw","flag-py","flag-qa","flag-re","flag-ro","flag-rs","flag-rw","flag-sa","flag-sb","flag-sc","flag-scotland","flag-sd","flag-se","flag-sg","flag-sh","flag-si","flag-sj","flag-sk","flag-sl","flag-sm","flag-sn","flag-so","flag-sr","flag-ss","flag-st","flag-sv","flag-sx","flag-sy","flag-sz","flag-ta","flag-tc","flag-td","flag-tf","flag-tg","flag-th","flag-tj","flag-tk","flag-tl","flag-tm","flag-tn","flag-to","flag-tr","flag-tt","flag-tv","flag-tw","flag-tz","flag-ua","flag-ug","flag-um","flag-uy","flag-uz","flag-va","flag-vc","flag-ve","flag-vg","flag-vi","flag-vn","flag-vu","flag-wales","flag-wf","flag-ws","flag-xk","flag-ye","flag-yt","flag-za","flag-zm","flag-zw","fr","gb","it","jp","kr","rainbow-flag","ru","triangular_flag_on_post","us","waving_black_flag","waving_white_flag"]}],"emojis":{"100":{"a":"Hundred Points Symbol","b":"1F4AF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["score","perfect","numbers","century","exam","quiz","test","pass","hundred"],"k":[25,26]},"1234":{"a":"Input Symbol for Numbers","b":"1F522","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["numbers","blue-square"],"k":[27,36]},"monkey_face":{"a":"Monkey Face","b":"1F435","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","circus"],"k":[13,31],"l":[":o)"]},"grinning":{"a":"Grinning Face","b":"1F600","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile","happy","joy",":D","grin"],"k":[30,24],"m":":D"},"earth_africa":{"a":"Earth Globe Europe-Africa","b":"1F30D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["globe","world","international"],"k":[6,5]},"checkered_flag":{"a":"Chequered Flag","b":"1F3C1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["contest","finishline","race","gokart"],"k":[9,27]},"mute":{"a":"Speaker with Cancellation Stroke","b":"1F507","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sound","volume","silence","quiet"],"k":[27,9]},"jack_o_lantern":{"a":"Jack-O-Lantern","b":"1F383","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["halloween","light","pumpkin","creepy","fall"],"k":[8,17]},"atm":{"a":"Automated Teller Machine","b":"1F3E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","cash","blue-square","payment","bank"],"k":[12,4]},"grapes":{"a":"Grapes","b":"1F347","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","food","wine"],"k":[7,9]},"earth_americas":{"a":"Earth Globe Americas","b":"1F30E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["globe","world","USA","international"],"k":[6,6]},"grin":{"a":"Grinning Face with Smiling Eyes","b":"1F601","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","smile","joy","kawaii"],"k":[30,25]},"melon":{"a":"Melon","b":"1F348","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","nature","food"],"k":[7,10]},"triangular_flag_on_post":{"a":"Triangular Flag on Post","b":"1F6A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mark","milestone","place"],"k":[35,14]},"monkey":{"a":"Monkey","b":"1F412","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","banana","circus"],"k":[12,48]},"christmas_tree":{"a":"Christmas Tree","b":"1F384","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","vacation","december","xmas","celebration"],"k":[8,18]},"put_litter_in_its_place":{"a":"Put Litter in Its Place Symbol","b":"1F6AE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","sign","human","info"],"k":[35,19]},"speaker":{"a":"Speaker","b":"1F508","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sound","volume","silence","broadcast"],"k":[27,10]},"earth_asia":{"a":"Earth Globe Asia-Australia","b":"1F30F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["globe","world","east","international"],"k":[6,7]},"crossed_flags":{"a":"Crossed Flags","b":"1F38C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","nation","country","border"],"k":[8,31]},"joy":{"a":"Face with Tears of Joy","b":"1F602","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","cry","tears","weep","happy","happytears","haha"],"k":[30,26]},"sound":{"a":"Speaker with One Sound Wave","b":"1F509","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["volume","speaker","broadcast"],"k":[27,11]},"watermelon":{"a":"Watermelon","b":"1F349","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","food","picnic","summer"],"k":[7,11]},"gorilla":{"a":"Gorilla","b":"1F98D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","circus"],"k":[42,37],"o":9},"fireworks":{"a":"Fireworks","b":"1F386","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","festival","carnival","congratulations"],"k":[8,25]},"potable_water":{"a":"Potable Water Symbol","b":"1F6B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","liquid","restroom","cleaning","faucet"],"k":[35,21]},"wheelchair":{"a":"Wheelchair Symbol","b":"267F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","disabled","a11y","accessibility"],"k":[48,10],"o":4},"rolling_on_the_floor_laughing":{"a":"Rolling on the Floor Laughing","b":"1F923","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,26],"o":9},"loud_sound":{"a":"Speaker with Three Sound Waves","b":"1F50A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["volume","noise","noisy","speaker","broadcast"],"k":[27,12]},"waving_black_flag":{"a":"Waving Black Flag","b":"1F3F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[12,19],"o":7},"tangerine":{"a":"Tangerine","b":"1F34A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","fruit","nature","orange"],"k":[7,12]},"dog":{"a":"Dog Face","b":"1F436","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","friend","nature","woof","puppy","pet","faithful"],"k":[13,32]},"sparkler":{"a":"Firework Sparkler","b":"1F387","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","night","shine"],"k":[8,26]},"globe_with_meridians":{"a":"Globe with Meridians","b":"1F310","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["earth","international","world","internet","interweb","i18n"],"k":[6,8]},"smiley":{"a":"Smiling Face with Open Mouth","b":"1F603","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","joy","haha",":D",":)","smile","funny"],"k":[30,27],"l":["=)","=-)"],"m":":)"},"loudspeaker":{"a":"Public Address Loudspeaker","b":"1F4E2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["volume","sound"],"k":[26,25]},"sparkles":{"a":"Sparkles","b":"2728","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","shine","shiny","cool","awesome","good","magic"],"k":[49,48]},"dog2":{"a":"Dog","b":"1F415","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","friend","doge","pet","faithful"],"k":[12,51]},"waving_white_flag":{"a":"Waving White Flag","b":"1F3F3-FE0F","c":"1F3F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[12,15],"o":7},"world_map":{"a":"World Map","b":"1F5FA-FE0F","c":"1F5FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["location","direction"],"k":[30,18],"o":7},"lemon":{"a":"Lemon","b":"1F34B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","nature"],"k":[7,13]},"mens":{"a":"Mens Symbol","b":"1F6B9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["toilet","restroom","wc","blue-square","gender","male"],"k":[36,29]},"womens":{"a":"Womens Symbol","b":"1F6BA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","woman","female","toilet","loo","restroom","gender"],"k":[36,30]},"rainbow-flag":{"a":"Rainbow Flag","b":"1F3F3-FE0F-200D-1F308","c":"1F3F3-200D-1F308","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[12,14],"o":7},"smile":{"a":"Smiling Face with Open Mouth and Smiling Eyes","b":"1F604","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","joy","funny","haha","laugh","like",":D",":)"],"k":[30,28],"l":["C:","c:",":D",":-D"],"m":":)"},"banana":{"a":"Banana","b":"1F34C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","food","monkey"],"k":[7,14]},"mega":{"a":"Cheering Megaphone","b":"1F4E3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sound","speaker","volume"],"k":[26,26]},"japan":{"a":"Silhouette of Japan","b":"1F5FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nation","country","japanese","asia"],"k":[30,22]},"poodle":{"a":"Poodle","b":"1F429","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dog","animal","101","nature","pet"],"k":[13,19]},"balloon":{"a":"Balloon","b":"1F388","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["party","celebration","birthday","circus"],"k":[8,27]},"flag-ac":{"a":"Ascension Island Flag","b":"1F1E6-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,31]},"sweat_smile":{"a":"Smiling Face with Open Mouth and Cold Sweat","b":"1F605","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hot","happy","laugh","sweat","smile","relief"],"k":[30,29]},"pineapple":{"a":"Pineapple","b":"1F34D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","nature","food"],"k":[7,15]},"restroom":{"a":"Restroom","b":"1F6BB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","toilet","refresh","wc","gender"],"k":[36,31]},"postal_horn":{"a":"Postal Horn","b":"1F4EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["instrument","music"],"k":[26,38]},"wolf":{"a":"Wolf Face","b":"1F43A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","wild"],"k":[13,36]},"tada":{"a":"Party Popper","b":"1F389","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["party","congratulations","birthday","magic","circus","celebration"],"k":[8,28]},"snow_capped_mountain":{"a":"Snow Capped Mountain","b":"1F3D4-FE0F","c":"1F3D4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,37],"o":7},"laughing":{"a":"Smiling Face with Open Mouth and Tightly-Closed Eyes","b":"1F606","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["happy","joy","lol","satisfied","haha","face","glad","XD","laugh"],"k":[30,30],"l":[":>",":->"],"n":["satisfied"]},"apple":{"a":"Red Apple","b":"1F34E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","mac","school"],"k":[7,16]},"flag-ad":{"a":"Andorra Flag","b":"1F1E6-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,32]},"fox_face":{"a":"Fox Face","b":"1F98A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","face"],"k":[42,34],"o":9},"confetti_ball":{"a":"Confetti Ball","b":"1F38A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","party","birthday","circus"],"k":[8,29]},"bell":{"a":"Bell","b":"1F514","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sound","notification","christmas","xmas","chime"],"k":[27,22]},"mountain":{"a":"Mountain","b":"26F0-FE0F","c":"26F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","nature","environment"],"k":[48,38],"o":5},"baby_symbol":{"a":"Baby Symbol","b":"1F6BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","child"],"k":[36,32]},"wc":{"a":"Water Closet","b":"1F6BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["toilet","restroom","blue-square"],"k":[36,34]},"wink":{"a":"Winking Face","b":"1F609","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","happy","mischievous","secret",";)","smile","eye"],"k":[30,33],"l":[";)",";-)"],"m":";)"},"no_bell":{"a":"Bell with Cancellation Stroke","b":"1F515","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sound","volume","mute","quiet","silent"],"k":[27,23]},"green_apple":{"a":"Green Apple","b":"1F34F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","nature"],"k":[7,17]},"tanabata_tree":{"a":"Tanabata Tree","b":"1F38B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature","branch","summer"],"k":[8,30]},"flag-ae":{"a":"United Arab Emirates Flag","b":"1F1E6-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,33]},"volcano":{"a":"Volcano","b":"1F30B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","nature","disaster"],"k":[6,3]},"cat":{"a":"Cat Face","b":"1F431","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","meow","nature","pet","kitten"],"k":[13,27]},"flag-af":{"a":"Afghanistan Flag","b":"1F1E6-1F1EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,34]},"musical_score":{"a":"Musical Score","b":"1F3BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["treble","clef","compose"],"k":[9,22]},"blush":{"a":"Smiling Face with Smiling Eyes","b":"1F60A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile","happy","flushed","crush","embarrassed","shy","joy"],"k":[30,34],"m":":)"},"pear":{"a":"Pear","b":"1F350","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","nature","food"],"k":[7,18]},"bamboo":{"a":"Pine Decoration","b":"1F38D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature","vegetable","panda","pine_decoration"],"k":[8,32]},"passport_control":{"a":"Passport Control","b":"1F6C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["custom","blue-square"],"k":[36,43]},"mount_fuji":{"a":"Mount Fuji","b":"1F5FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","mountain","nature","japanese"],"k":[30,19]},"cat2":{"a":"Cat","b":"1F408","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","meow","pet","cats"],"k":[12,38]},"musical_note":{"a":"Musical Note","b":"1F3B5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["score","tone","sound"],"k":[9,15]},"dolls":{"a":"Japanese Dolls","b":"1F38E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","toy","kimono"],"k":[8,33]},"lion_face":{"a":"Lion Face","b":"1F981","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,25],"o":8},"camping":{"a":"Camping","b":"1F3D5-FE0F","c":"1F3D5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","outdoors","tent"],"k":[11,38],"o":7},"flag-ag":{"a":"Antigua & Barbuda Flag","b":"1F1E6-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,35]},"customs":{"a":"Customs","b":"1F6C3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["passport","border","blue-square"],"k":[36,44]},"yum":{"a":"Face Savouring Delicious Food","b":"1F60B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["happy","joy","tongue","smile","face","silly","yummy","nom","delicious","savouring"],"k":[30,35]},"peach":{"a":"Peach","b":"1F351","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","nature","food"],"k":[7,19]},"tiger":{"a":"Tiger Face","b":"1F42F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cat","danger","wild","nature","roar"],"k":[13,25]},"notes":{"a":"Multiple Musical Notes","b":"1F3B6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["music","score"],"k":[9,16]},"flags":{"a":"Carp Streamer","b":"1F38F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fish","japanese","koinobori","carp","banner"],"k":[8,34]},"beach_with_umbrella":{"a":"Beach with Umbrella","b":"1F3D6-FE0F","c":"1F3D6","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,39],"o":7},"cherries":{"a":"Cherries","b":"1F352","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","fruit"],"k":[7,20]},"flag-ai":{"a":"Anguilla Flag","b":"1F1E6-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,36]},"baggage_claim":{"a":"Baggage Claim","b":"1F6C4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","airport","transport"],"k":[36,45]},"sunglasses":{"a":"Smiling Face with Sunglasses","b":"1F60E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","cool","smile","summer","beach","sunglass"],"k":[30,38],"l":["8)"]},"left_luggage":{"a":"Left Luggage","b":"1F6C5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","travel"],"k":[36,46]},"wind_chime":{"a":"Wind Chime","b":"1F390","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","ding","spring","bell"],"k":[8,35]},"strawberry":{"a":"Strawberry","b":"1F353","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","food","nature"],"k":[7,21]},"desert":{"a":"Desert","b":"1F3DC-FE0F","c":"1F3DC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","warm","saharah"],"k":[11,45],"o":7},"studio_microphone":{"a":"Studio Microphone","b":"1F399-FE0F","c":"1F399","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sing","recording","artist","talkshow"],"k":[8,41],"o":7},"flag-al":{"a":"Albania Flag","b":"1F1E6-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,37]},"tiger2":{"a":"Tiger","b":"1F405","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","roar"],"k":[12,35]},"heart_eyes":{"a":"Smiling Face with Heart-Shaped Eyes","b":"1F60D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","love","like","affection","valentines","infatuation","crush","heart"],"k":[30,37]},"desert_island":{"a":"Desert Island","b":"1F3DD-FE0F","c":"1F3DD","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","tropical","mojito"],"k":[11,46],"o":7},"kiwifruit":{"a":"Kiwifruit","b":"1F95D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,9],"o":9},"rice_scene":{"a":"Moon Viewing Ceremony","b":"1F391","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","japan","asia","tsukimi"],"k":[8,36]},"kissing_heart":{"a":"Face Throwing a Kiss","b":"1F618","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","love","like","affection","valentines","infatuation","kiss"],"k":[30,48],"l":[":*",":-*"]},"warning":{"a":"Warning Sign","b":"26A0-FE0F","c":"26A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["exclamation","wip","alert","error","problem","issue"],"k":[48,20],"o":4},"flag-am":{"a":"Armenia Flag","b":"1F1E6-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,38]},"leopard":{"a":"Leopard","b":"1F406","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[12,36]},"level_slider":{"a":"Level Slider","b":"1F39A-FE0F","c":"1F39A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["scale"],"k":[8,42],"o":7},"horse":{"a":"Horse Face","b":"1F434","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","brown","nature"],"k":[13,30]},"children_crossing":{"a":"Children Crossing","b":"1F6B8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["school","warning","danger","sign","driving","yellow-diamond"],"k":[36,28]},"ribbon":{"a":"Ribbon","b":"1F380","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["decoration","pink","girl","bowtie"],"k":[8,14]},"national_park":{"a":"National Park","b":"1F3DE-FE0F","c":"1F3DE","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","environment","nature"],"k":[11,47],"o":7},"control_knobs":{"a":"Control Knobs","b":"1F39B-FE0F","c":"1F39B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["dial"],"k":[8,43],"o":7},"kissing":{"a":"Kissing Face","b":"1F617","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","face","3","valentines","infatuation","kiss"],"k":[30,47]},"tomato":{"a":"Tomato","b":"1F345","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fruit","vegetable","nature","food"],"k":[7,7]},"flag-ao":{"a":"Angola Flag","b":"1F1E6-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,39]},"stadium":{"a":"Stadium","b":"1F3DF-FE0F","c":"1F3DF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","place","sports","concert","venue"],"k":[11,48],"o":7},"flag-aq":{"a":"Antarctica Flag","b":"1F1E6-1F1F6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,40]},"gift":{"a":"Wrapped Present","b":"1F381","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["present","birthday","christmas","xmas"],"k":[8,15]},"no_entry":{"a":"No Entry","b":"26D4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["limit","security","privacy","bad","denied","stop","circle"],"k":[48,35],"o":5},"kissing_smiling_eyes":{"a":"Kissing Face with Smiling Eyes","b":"1F619","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","affection","valentines","infatuation","kiss"],"k":[30,49]},"coconut":{"a":"Coconut","b":"1F965","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["fruit","nature","food","palm"],"k":[42,17],"o":10},"racehorse":{"a":"Horse","b":"1F40E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","gamble","luck"],"k":[12,44]},"microphone":{"a":"Microphone","b":"1F3A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sound","music","PA","sing","talkshow"],"k":[8,50]},"classical_building":{"a":"Classical Building","b":"1F3DB-FE0F","c":"1F3DB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["art","culture","history"],"k":[11,44],"o":7},"no_entry_sign":{"a":"No Entry Sign","b":"1F6AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["forbid","stop","limit","denied","disallow","circle"],"k":[35,16]},"reminder_ribbon":{"a":"Reminder Ribbon","b":"1F397-FE0F","c":"1F397","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports","cause","support","awareness"],"k":[8,40],"o":7},"kissing_closed_eyes":{"a":"Kissing Face with Closed Eyes","b":"1F61A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","love","like","affection","valentines","infatuation","kiss"],"k":[30,50]},"unicorn_face":{"a":"Unicorn Face","b":"1F984","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,28],"o":8},"flag-ar":{"a":"Argentina Flag","b":"1F1E6-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,41]},"headphones":{"a":"Headphone","b":"1F3A7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["music","score","gadgets"],"k":[9,1]},"avocado":{"a":"Avocado","b":"1F951","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["fruit","food"],"k":[41,49],"o":9},"relaxed":{"a":"White Smiling Face","b":"263A-FE0F","c":"263A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","blush","massage","happiness"],"k":[47,41],"o":1},"zebra_face":{"a":"Zebra Face","b":"1F993","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,43],"o":10},"eggplant":{"a":"Aubergine","b":"1F346","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","nature","food","aubergine"],"k":[7,8]},"radio":{"a":"Radio","b":"1F4FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["communication","music","podcast","program"],"k":[26,50]},"building_construction":{"a":"Building Construction","b":"1F3D7-FE0F","c":"1F3D7","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["wip","working","progress"],"k":[11,40],"o":7},"flag-as":{"a":"American Samoa Flag","b":"1F1E6-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,42]},"admission_tickets":{"a":"Admission Tickets","b":"1F39F-FE0F","c":"1F39F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[8,45],"o":7},"no_bicycles":{"a":"No Bicycles","b":"1F6B3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cyclist","prohibited","circle"],"k":[35,24]},"no_smoking":{"a":"No Smoking Symbol","b":"1F6AD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cigarette","blue-square","smell","smoke"],"k":[35,18]},"slightly_smiling_face":{"a":"Slightly Smiling Face","b":"1F642","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile"],"k":[31,38],"l":[":)","(:",":-)"],"o":7},"flag-at":{"a":"Austria Flag","b":"1F1E6-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,43]},"ticket":{"a":"Ticket","b":"1F3AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["event","concert","pass"],"k":[9,5]},"saxophone":{"a":"Saxophone","b":"1F3B7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["music","instrument","jazz","blues"],"k":[9,17]},"deer":{"a":"Deer","b":"1F98C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","horns","venison"],"k":[42,36],"o":9},"house_buildings":{"a":"House Buildings","b":"1F3D8-FE0F","c":"1F3D8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,41],"o":7},"potato":{"a":"Potato","b":"1F954","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","tuber","vegatable","starch"],"k":[42,0],"o":9},"guitar":{"a":"Guitar","b":"1F3B8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["music","instrument"],"k":[9,18]},"carrot":{"a":"Carrot","b":"1F955","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["vegetable","food","orange"],"k":[42,1],"o":9},"cityscape":{"a":"Cityscape","b":"1F3D9-FE0F","c":"1F3D9","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["photo","night life","urban"],"k":[11,42],"o":7},"flag-au":{"a":"Australia Flag","b":"1F1E6-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,44]},"do_not_litter":{"a":"Do Not Litter Symbol","b":"1F6AF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["trash","bin","garbage","circle"],"k":[35,20]},"hugging_face":{"a":"Hugging Face","b":"1F917","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,31],"o":8},"cow":{"a":"Cow Face","b":"1F42E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beef","ox","animal","nature","moo","milk"],"k":[13,24]},"medal":{"a":"Medal","b":"1F396-FE0F","c":"1F396","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[8,39],"o":7},"musical_keyboard":{"a":"Musical Keyboard","b":"1F3B9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["piano","instrument","compose"],"k":[9,19]},"corn":{"a":"Ear of Maize","b":"1F33D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","vegetable","plant"],"k":[6,51]},"derelict_house_building":{"a":"Derelict House Building","b":"1F3DA-FE0F","c":"1F3DA","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,43],"o":7},"non-potable_water":{"a":"Non-Potable Water Symbol","b":"1F6B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["drink","faucet","tap","circle"],"k":[35,22]},"trophy":{"a":"Trophy","b":"1F3C6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["win","award","contest","place","ftw","ceremony"],"k":[10,19]},"flag-aw":{"a":"Aruba Flag","b":"1F1E6-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,45]},"star-struck":{"a":"Grinning Face with Star Eyes","b":"1F929","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,49],"n":["grinning_face_with_star_eyes"],"o":10},"ox":{"a":"Ox","b":"1F402","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cow","beef"],"k":[12,32]},"trumpet":{"a":"Trumpet","b":"1F3BA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["music","brass"],"k":[9,20]},"hot_pepper":{"a":"Hot Pepper","b":"1F336-FE0F","c":"1F336","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","spicy","chilli","chili"],"k":[6,44],"o":7},"sports_medal":{"a":"Sports Medal","b":"1F3C5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[10,18],"o":7},"flag-ax":{"a":"Åland Islands Flag","b":"1F1E6-1F1FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,46]},"water_buffalo":{"a":"Water Buffalo","b":"1F403","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","ox","cow"],"k":[12,33]},"no_pedestrians":{"a":"No Pedestrians","b":"1F6B7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["rules","crossing","walking","circle"],"k":[36,27]},"thinking_face":{"a":"Thinking Face","b":"1F914","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,28],"o":8},"house":{"a":"House Building","b":"1F3E0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","home"],"k":[11,49]},"no_mobile_phones":{"a":"No Mobile Phones","b":"1F4F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["iphone","mute","circle"],"k":[26,44]},"flag-az":{"a":"Azerbaijan Flag","b":"1F1E6-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,47]},"first_place_medal":{"a":"First Place Medal","b":"1F947","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,42],"o":9},"house_with_garden":{"a":"House with Garden","b":"1F3E1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["home","plant","nature"],"k":[11,50]},"violin":{"a":"Violin","b":"1F3BB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["music","instrument","orchestra","symphony"],"k":[9,21]},"face_with_raised_eyebrow":{"a":"Face with One Eyebrow Raised","b":"1F928","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,48],"n":["face_with_one_eyebrow_raised"],"o":10},"cucumber":{"a":"Cucumber","b":"1F952","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["fruit","food","pickle"],"k":[41,50],"o":9},"cow2":{"a":"Cow","b":"1F404","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beef","ox","animal","nature","moo","milk"],"k":[12,34]},"flag-ba":{"a":"Bosnia & Herzegovina Flag","b":"1F1E7-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[0,48]},"pig":{"a":"Pig Face","b":"1F437","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","oink","nature"],"k":[13,33]},"drum_with_drumsticks":{"a":"Drum with Drumsticks","b":"1F941","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,37],"o":9},"underage":{"a":"No One Under Eighteen Symbol","b":"1F51E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["18","drink","pub","night","minor","circle"],"k":[27,32]},"broccoli":{"a":"Broccoli","b":"1F966","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["fruit","food","vegetable"],"k":[42,18],"o":10},"office":{"a":"Office Building","b":"1F3E2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","bureau","work"],"k":[11,51]},"second_place_medal":{"a":"Second Place Medal","b":"1F948","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,43],"o":9},"neutral_face":{"a":"Neutral Face","b":"1F610","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["indifference","meh",":|","neutral"],"k":[30,40],"l":[":|",":-|"]},"third_place_medal":{"a":"Third Place Medal","b":"1F949","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,44],"o":9},"mushroom":{"a":"Mushroom","b":"1F344","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","vegetable"],"k":[7,6]},"flag-bb":{"a":"Barbados Flag","b":"1F1E7-1F1E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,49]},"radioactive_sign":{"a":"Radioactive Sign","b":"2622-FE0F","c":"2622","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,33],"o":1},"pig2":{"a":"Pig","b":"1F416","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,0]},"expressionless":{"a":"Expressionless Face","b":"1F611","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","indifferent","-_-","meh","deadpan"],"k":[30,41]},"iphone":{"a":"Mobile Phone","b":"1F4F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","apple","gadgets","dial"],"k":[26,40]},"post_office":{"a":"Japanese Post Office","b":"1F3E3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","envelope","communication"],"k":[12,0]},"european_post_office":{"a":"European Post Office","b":"1F3E4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","email"],"k":[12,1]},"soccer":{"a":"Soccer Ball","b":"26BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","football"],"k":[48,26],"o":5},"boar":{"a":"Boar","b":"1F417","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,1]},"peanuts":{"a":"Peanuts","b":"1F95C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","nut"],"k":[42,8],"o":9},"calling":{"a":"Mobile Phone with Rightwards Arrow at Left","b":"1F4F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["iphone","incoming"],"k":[26,41]},"biohazard_sign":{"a":"Biohazard Sign","b":"2623-FE0F","c":"2623","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,34],"o":1},"flag-bd":{"a":"Bangladesh Flag","b":"1F1E7-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,50]},"no_mouth":{"a":"Face Without Mouth","b":"1F636","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hellokitty"],"k":[31,26]},"face_with_rolling_eyes":{"a":"Face with Rolling Eyes","b":"1F644","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[31,40],"o":8},"phone":{"a":"Black Telephone","b":"260E-FE0F","c":"260E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","communication","dial","telephone"],"k":[47,21],"n":["telephone"],"o":1},"pig_nose":{"a":"Pig Nose","b":"1F43D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","oink"],"k":[13,39]},"chestnut":{"a":"Chestnut","b":"1F330","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","squirrel"],"k":[6,38]},"arrow_up":{"a":"Upwards Black Arrow","b":"2B06-FE0F","c":"2B06","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","continue","top","direction"],"k":[50,18],"o":4},"hospital":{"a":"Hospital","b":"1F3E5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","health","surgery","doctor"],"k":[12,2]},"flag-be":{"a":"Belgium Flag","b":"1F1E7-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[0,51]},"baseball":{"a":"Baseball","b":"26BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls"],"k":[48,27],"o":5},"smirk":{"a":"Smirking Face","b":"1F60F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","smile","mean","prank","smug","sarcasm"],"k":[30,39]},"arrow_upper_right":{"a":"North East Arrow","b":"2197-FE0F","c":"2197","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","point","direction","diagonal","northeast"],"k":[46,36],"o":1},"flag-bf":{"a":"Burkina Faso Flag","b":"1F1E7-1F1EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,0]},"basketball":{"a":"Basketball and Hoop","b":"1F3C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls","NBA"],"k":[9,26]},"ram":{"a":"Ram","b":"1F40F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","sheep","nature"],"k":[12,45]},"bank":{"a":"Bank","b":"1F3E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","money","sales","cash","business","enterprise"],"k":[12,3]},"bread":{"a":"Bread","b":"1F35E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","wheat","breakfast","toast"],"k":[7,32]},"telephone_receiver":{"a":"Telephone Receiver","b":"1F4DE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","communication","dial"],"k":[26,21]},"croissant":{"a":"Croissant","b":"1F950","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","bread","french"],"k":[41,48],"o":9},"pager":{"a":"Pager","b":"1F4DF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bbcall","oldschool","90s"],"k":[26,22]},"sheep":{"a":"Sheep","b":"1F411","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","wool","shipit"],"k":[12,47]},"arrow_right":{"a":"Black Rightwards Arrow","b":"27A1-FE0F","c":"27A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","next"],"k":[50,12],"o":1},"persevere":{"a":"Persevering Face","b":"1F623","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sick","no","upset","oops"],"k":[31,7]},"flag-bg":{"a":"Bulgaria Flag","b":"1F1E7-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,1]},"volleyball":{"a":"Volleyball","b":"1F3D0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports","balls"],"k":[11,33],"o":8},"hotel":{"a":"Hotel","b":"1F3E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","accomodation","checkin"],"k":[12,5]},"arrow_lower_right":{"a":"South East Arrow","b":"2198-FE0F","c":"2198","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","diagonal","southeast"],"k":[46,37],"o":1},"goat":{"a":"Goat","b":"1F410","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[12,46]},"flag-bh":{"a":"Bahrain Flag","b":"1F1E7-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,2]},"love_hotel":{"a":"Love Hotel","b":"1F3E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["like","affection","dating"],"k":[12,6]},"disappointed_relieved":{"a":"Disappointed but Relieved Face","b":"1F625","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","phew","sweat","nervous"],"k":[31,9]},"baguette_bread":{"a":"Baguette Bread","b":"1F956","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","bread","french"],"k":[42,2],"o":9},"football":{"a":"American Football","b":"1F3C8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls","NFL"],"k":[10,26]},"fax":{"a":"Fax Machine","b":"1F4E0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["communication","technology"],"k":[26,23]},"convenience_store":{"a":"Convenience Store","b":"1F3EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","shopping","groceries"],"k":[12,7]},"dromedary_camel":{"a":"Dromedary Camel","b":"1F42A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","hot","desert","hump"],"k":[13,20]},"arrow_down":{"a":"Downwards Black Arrow","b":"2B07-FE0F","c":"2B07","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[50,19],"o":4},"battery":{"a":"Battery","b":"1F50B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["power","energy","sustain"],"k":[27,13]},"rugby_football":{"a":"Rugby Football","b":"1F3C9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","team"],"k":[10,27]},"pretzel":{"a":"Pretzel","b":"1F968","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","bread","twisted"],"k":[42,20],"o":10},"open_mouth":{"a":"Face with Open Mouth","b":"1F62E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","surprise","impressed","wow","whoa",":O"],"k":[31,18],"l":[":o",":-o",":O",":-O"]},"flag-bi":{"a":"Burundi Flag","b":"1F1E7-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,3]},"flag-bj":{"a":"Benin Flag","b":"1F1E7-1F1EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,4]},"pancakes":{"a":"Pancakes","b":"1F95E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","breakfast","flapjacks","hotcakes"],"k":[42,10],"o":9},"school":{"a":"School","b":"1F3EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","student","education","learn","teach"],"k":[12,8]},"tennis":{"a":"Tennis Racquet and Ball","b":"1F3BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","balls","green"],"k":[9,24]},"zipper_mouth_face":{"a":"Zipper-Mouth Face","b":"1F910","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","sealed","zipper","secret"],"k":[37,24],"o":8},"camel":{"a":"Bactrian Camel","b":"1F42B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","hot","desert","hump"],"k":[13,21]},"arrow_lower_left":{"a":"South West Arrow","b":"2199-FE0F","c":"2199","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","diagonal","southwest"],"k":[46,38],"o":1},"electric_plug":{"a":"Electric Plug","b":"1F50C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["charger","power"],"k":[27,14]},"cheese_wedge":{"a":"Cheese Wedge","b":"1F9C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,48],"o":8},"hushed":{"a":"Hushed Face","b":"1F62F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","woo","shh"],"k":[31,19]},"computer":{"a":"Personal Computer","b":"1F4BB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","laptop","screen","display","monitor"],"k":[25,38]},"giraffe_face":{"a":"Giraffe Face","b":"1F992","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,42],"o":10},"8ball":{"a":"Billiards","b":"1F3B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pool","hobby","game","luck","magic"],"k":[9,11]},"flag-bl":{"a":"St. Barthélemy Flag","b":"1F1E7-1F1F1","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[1,5]},"arrow_left":{"a":"Leftwards Black Arrow","b":"2B05-FE0F","c":"2B05","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","previous","back"],"k":[50,17],"o":4},"department_store":{"a":"Department Store","b":"1F3EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","shopping","mall"],"k":[12,9]},"meat_on_bone":{"a":"Meat on Bone","b":"1F356","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["good","food","drumstick"],"k":[7,24]},"arrow_upper_left":{"a":"North West Arrow","b":"2196-FE0F","c":"2196","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","point","direction","diagonal","northwest"],"k":[46,35],"o":1},"flag-bm":{"a":"Bermuda Flag","b":"1F1E7-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,6]},"sleepy":{"a":"Sleepy Face","b":"1F62A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tired","rest","nap"],"k":[31,14]},"bowling":{"a":"Bowling","b":"1F3B3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","fun","play"],"k":[9,13]},"factory":{"a":"Factory","b":"1F3ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","industry","pollution","smoke"],"k":[12,10]},"desktop_computer":{"a":"Desktop Computer","b":"1F5A5-FE0F","c":"1F5A5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["technology","computing","screen"],"k":[29,51],"o":7},"elephant":{"a":"Elephant","b":"1F418","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","nose","th","circus"],"k":[13,2]},"rhinoceros":{"a":"Rhinoceros","b":"1F98F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","horn"],"k":[42,39],"o":9},"arrow_up_down":{"a":"Up Down Arrow","b":"2195-FE0F","c":"2195","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","way","vertical"],"k":[46,34],"o":1},"cricket_bat_and_ball":{"a":"Cricket Bat and Ball","b":"1F3CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,32],"o":8},"printer":{"a":"Printer","b":"1F5A8-FE0F","c":"1F5A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["paper","ink"],"k":[30,0],"o":7},"poultry_leg":{"a":"Poultry Leg","b":"1F357","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","meat","drumstick","bird","chicken","turkey"],"k":[7,25]},"tired_face":{"a":"Tired Face","b":"1F62B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sick","whine","upset","frustrated"],"k":[31,15]},"japanese_castle":{"a":"Japanese Castle","b":"1F3EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","building"],"k":[12,12]},"flag-bn":{"a":"Brunei Flag","b":"1F1E7-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[1,7]},"field_hockey_stick_and_ball":{"a":"Field Hockey Stick and Ball","b":"1F3D1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,34],"o":8},"sleeping":{"a":"Sleeping Face","b":"1F634","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tired","sleepy","night","zzz"],"k":[31,24]},"left_right_arrow":{"a":"Left Right Arrow","b":"2194-FE0F","c":"2194","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","direction","horizontal","sideways"],"k":[46,33],"o":1},"keyboard":{"a":"Keyboard","b":"2328-FE0F","c":"2328","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["technology","computer","type","input","text"],"k":[46,43],"o":1},"european_castle":{"a":"European Castle","b":"1F3F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","royalty","history"],"k":[12,13]},"mouse":{"a":"Mouse Face","b":"1F42D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","cheese_wedge","rodent"],"k":[13,23]},"flag-bo":{"a":"Bolivia Flag","b":"1F1E7-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,8]},"cut_of_meat":{"a":"Cut of Meat","b":"1F969","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,21],"o":10},"ice_hockey_stick_and_puck":{"a":"Ice Hockey Stick and Puck","b":"1F3D2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,35],"o":8},"mouse2":{"a":"Mouse","b":"1F401","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","rodent"],"k":[12,31]},"three_button_mouse":{"a":"Three Button Mouse","b":"1F5B1-FE0F","c":"1F5B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,1],"o":7},"leftwards_arrow_with_hook":{"a":"Leftwards Arrow with Hook","b":"21A9-FE0F","c":"21A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["back","return","blue-square","undo","enter"],"k":[46,39],"o":1},"bacon":{"a":"Bacon","b":"1F953","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","breakfast","pork","pig","meat"],"k":[41,51],"o":9},"relieved":{"a":"Relieved Face","b":"1F60C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","relaxed","phew","massage","happiness"],"k":[30,36]},"flag-bq":{"a":"Caribbean Netherlands Flag","b":"1F1E7-1F1F6","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[1,9]},"wedding":{"a":"Wedding","b":"1F492","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","couple","marriage","bride","groom"],"k":[24,44]},"tokyo_tower":{"a":"Tokyo Tower","b":"1F5FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","japanese"],"k":[30,20]},"arrow_right_hook":{"a":"Rightwards Arrow with Hook","b":"21AA-FE0F","c":"21AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","return","rotate","direction"],"k":[46,40],"o":1},"hamburger":{"a":"Hamburger","b":"1F354","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["meat","fast food","beef","cheeseburger","mcdonalds","burger king"],"k":[7,22]},"stuck_out_tongue":{"a":"Face with Stuck-out Tongue","b":"1F61B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","prank","childish","playful","mischievous","smile","tongue"],"k":[30,51],"l":[":p",":-p",":P",":-P",":b",":-b"],"m":":p"},"trackball":{"a":"Trackball","b":"1F5B2-FE0F","c":"1F5B2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["technology","trackpad"],"k":[30,2],"o":7},"flag-br":{"a":"Brazil Flag","b":"1F1E7-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,10]},"rat":{"a":"Rat","b":"1F400","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","mouse","rodent"],"k":[12,30]},"table_tennis_paddle_and_ball":{"a":"Table Tennis Paddle and Ball","b":"1F3D3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,36],"o":8},"minidisc":{"a":"Minidisc","b":"1F4BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","record","data","disk","90s"],"k":[25,40]},"stuck_out_tongue_winking_eye":{"a":"Face with Stuck-out Tongue and Winking Eye","b":"1F61C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","prank","childish","playful","mischievous","smile","wink","tongue"],"k":[31,0],"l":[";p",";-p",";b",";-b",";P",";-P"],"m":";p"},"fries":{"a":"French Fries","b":"1F35F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chips","snack","fast food"],"k":[7,33]},"badminton_racquet_and_shuttlecock":{"a":"Badminton Racquet and Shuttlecock","b":"1F3F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[12,22],"o":8},"statue_of_liberty":{"a":"Statue of Liberty","b":"1F5FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["american","newyork"],"k":[30,21]},"flag-bs":{"a":"Bahamas Flag","b":"1F1E7-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,11]},"arrow_heading_up":{"a":"Arrow Pointing Rightwards Then Curving Upwards","b":"2934-FE0F","c":"2934","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","top"],"k":[50,15],"o":3},"hamster":{"a":"Hamster Face","b":"1F439","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,35]},"stuck_out_tongue_closed_eyes":{"a":"Face with Stuck-out Tongue and Tightly-Closed Eyes","b":"1F61D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","prank","playful","mischievous","smile","tongue"],"k":[31,1]},"pizza":{"a":"Slice of Pizza","b":"1F355","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","party"],"k":[7,23]},"boxing_glove":{"a":"Boxing Glove","b":"1F94A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports","fighting"],"k":[41,45],"o":9},"floppy_disk":{"a":"Floppy Disk","b":"1F4BE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["oldschool","technology","save","90s","80s"],"k":[25,41]},"arrow_heading_down":{"a":"Arrow Pointing Rightwards Then Curving Downwards","b":"2935-FE0F","c":"2935","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[50,16],"o":3},"flag-bt":{"a":"Bhutan Flag","b":"1F1E7-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,12]},"rabbit":{"a":"Rabbit Face","b":"1F430","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","pet","spring","magic","bunny"],"k":[13,26]},"church":{"a":"Church","b":"26EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["building","religion","christ"],"k":[48,37],"o":5},"drooling_face":{"a":"Drooling Face","b":"1F924","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face"],"k":[38,27],"o":9},"flag-bv":{"a":"Bouvet Island Flag","b":"1F1E7-1F1FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,13]},"mosque":{"a":"Mosque","b":"1F54C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["islam","worship","minaret"],"k":[28,15],"o":8},"rabbit2":{"a":"Rabbit","b":"1F407","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","pet","magic","spring"],"k":[12,37]},"hotdog":{"a":"Hot Dog","b":"1F32D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","frankfurter"],"k":[6,35],"o":8},"martial_arts_uniform":{"a":"Martial Arts Uniform","b":"1F94B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["judo","karate","taekwondo"],"k":[41,46],"o":9},"arrows_clockwise":{"a":"Clockwise Downwards and Upwards Open Circle Arrows","b":"1F503","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sync","cycle","round","repeat"],"k":[27,5]},"cd":{"a":"Optical Disc","b":"1F4BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","dvd","disk","disc","90s"],"k":[25,42]},"arrows_counterclockwise":{"a":"Anticlockwise Downwards and Upwards Open Circle Arrows","b":"1F504","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","sync","cycle"],"k":[27,6]},"sandwich":{"a":"Sandwich","b":"1F96A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","lunch","bread"],"k":[42,22],"o":10},"chipmunk":{"a":"Chipmunk","b":"1F43F-FE0F","c":"1F43F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","rodent","squirrel"],"k":[13,41],"o":7},"synagogue":{"a":"Synagogue","b":"1F54D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["judaism","worship","temple","jewish"],"k":[28,16],"o":8},"unamused":{"a":"Unamused Face","b":"1F612","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["indifference","bored","straight face","serious","sarcasm","unimpressed","skeptical","dubious","side_eye"],"k":[30,42],"m":":("},"goal_net":{"a":"Goal Net","b":"1F945","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports"],"k":[41,41],"o":9},"flag-bw":{"a":"Botswana Flag","b":"1F1E7-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,14]},"dvd":{"a":"Dvd","b":"1F4C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cd","disk","disc"],"k":[25,43]},"hedgehog":{"a":"Hedgehog","b":"1F994","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","spiny"],"k":[42,44],"o":10},"dart":{"a":"Direct Hit","b":"1F3AF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","play","bar","target","bullseye"],"k":[9,9]},"taco":{"a":"Taco","b":"1F32E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","mexican"],"k":[6,36],"o":8},"back":{"a":"Back with Leftwards Arrow Above","b":"1F519","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","words","return"],"k":[27,27]},"flag-by":{"a":"Belarus Flag","b":"1F1E7-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,15]},"shinto_shrine":{"a":"Shinto Shrine","b":"26E9-FE0F","c":"26E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["temple","japan","kyoto"],"k":[48,36],"o":5},"movie_camera":{"a":"Movie Camera","b":"1F3A5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["film","record"],"k":[8,51]},"sweat":{"a":"Face with Cold Sweat","b":"1F613","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hot","sad","tired","exercise"],"k":[30,43]},"burrito":{"a":"Burrito","b":"1F32F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","mexican"],"k":[6,37],"o":8},"flag-bz":{"a":"Belize Flag","b":"1F1E7-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,16]},"pensive":{"a":"Pensive Face","b":"1F614","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sad","depressed","upset"],"k":[30,44]},"kaaba":{"a":"Kaaba","b":"1F54B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["mecca","mosque","islam"],"k":[28,14],"o":8},"film_frames":{"a":"Film Frames","b":"1F39E-FE0F","c":"1F39E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[8,44],"o":7},"bat":{"a":"Bat","b":"1F987","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","blind","vampire"],"k":[42,31],"o":9},"golf":{"a":"Flag in Hole","b":"26F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","business","flag","hole","summer"],"k":[48,41],"o":5},"end":{"a":"End with Leftwards Arrow Above","b":"1F51A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","arrow"],"k":[27,28]},"film_projector":{"a":"Film Projector","b":"1F4FD-FE0F","c":"1F4FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["video","tape","record","movie"],"k":[27,0],"o":7},"bear":{"a":"Bear Face","b":"1F43B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","wild"],"k":[13,37]},"ice_skate":{"a":"Ice Skate","b":"26F8-FE0F","c":"26F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports"],"k":[48,45],"o":5},"fountain":{"a":"Fountain","b":"26F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","summer","water","fresh"],"k":[48,40],"o":5},"confused":{"a":"Confused Face","b":"1F615","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","indifference","huh","weird","hmmm",":/"],"k":[30,45],"l":[":\\",":-\\",":/",":-/"]},"flag-ca":{"a":"Canada Flag","b":"1F1E8-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,17]},"on":{"a":"On with Exclamation Mark with Left Right Arrow Above","b":"1F51B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","words"],"k":[27,29]},"stuffed_flatbread":{"a":"Stuffed Flatbread","b":"1F959","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","flatbread","stuffed","gyro"],"k":[42,5],"o":9},"soon":{"a":"Soon with Rightwards Arrow Above","b":"1F51C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","words"],"k":[27,30]},"upside_down_face":{"a":"Upside-Down Face","b":"1F643","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","flipped","silly","smile"],"k":[31,39],"o":8},"fishing_pole_and_fish":{"a":"Fishing Pole and Fish","b":"1F3A3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","hobby","summer"],"k":[8,49]},"tent":{"a":"Tent","b":"26FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","camping","outdoors"],"k":[49,12],"o":5},"clapper":{"a":"Clapper Board","b":"1F3AC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["movie","film","record"],"k":[9,6]},"egg":{"a":"Egg","b":"1F95A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","chicken","breakfast"],"k":[42,6],"o":9},"flag-cc":{"a":"Cocos (keeling) Islands Flag","b":"1F1E8-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,18]},"koala":{"a":"Koala","b":"1F428","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,18]},"foggy":{"a":"Foggy","b":"1F301","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","mountain"],"k":[5,45]},"tv":{"a":"Television","b":"1F4FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["technology","program","oldschool","show","television"],"k":[26,49]},"panda_face":{"a":"Panda Face","b":"1F43C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","panda"],"k":[13,38]},"fried_egg":{"a":"Cooking","b":"1F373","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","breakfast","kitchen","egg"],"k":[8,1],"n":["cooking"]},"top":{"a":"Top with Upwards Arrow Above","b":"1F51D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","blue-square"],"k":[27,31]},"flag-cd":{"a":"Congo - Kinshasa Flag","b":"1F1E8-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,19]},"money_mouth_face":{"a":"Money-Mouth Face","b":"1F911","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","rich","dollar","money"],"k":[37,25],"o":8},"running_shirt_with_sash":{"a":"Running Shirt with Sash","b":"1F3BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["play","pageant"],"k":[9,23]},"astonished":{"a":"Astonished Face","b":"1F632","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","xox","surprised","poisoned"],"k":[31,22]},"feet":{"a":"Paw Prints","b":"1F43E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[13,40],"n":["paw_prints"]},"camera":{"a":"Camera","b":"1F4F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["gadgets","photography"],"k":[26,46]},"flag-cf":{"a":"Central African Republic Flag","b":"1F1E8-1F1EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,20]},"place_of_worship":{"a":"Place of Worship","b":"1F6D0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["religion","church","temple","prayer"],"k":[37,5],"o":8},"night_with_stars":{"a":"Night with Stars","b":"1F303","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["evening","city","downtown"],"k":[5,47]},"ski":{"a":"Ski and Ski Boot","b":"1F3BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","winter","cold","snow"],"k":[9,25]},"shallow_pan_of_food":{"a":"Shallow Pan of Food","b":"1F958","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","cooking","casserole","paella"],"k":[42,4],"o":9},"camera_with_flash":{"a":"Camera with Flash","b":"1F4F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[26,47],"o":7},"sunrise_over_mountains":{"a":"Sunrise over Mountains","b":"1F304","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["view","vacation","photo"],"k":[5,48]},"turkey":{"a":"Turkey","b":"1F983","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","bird"],"k":[42,27],"o":8},"white_frowning_face":{"a":"White Frowning Face","b":"2639-FE0F","c":"2639","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,40],"o":1},"flag-cg":{"a":"Congo - Brazzaville Flag","b":"1F1E8-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,21]},"stew":{"a":"Pot of Food","b":"1F372","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","meat","soup"],"k":[8,0]},"sled":{"a":"Sled","b":"1F6F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sleigh","luge","toboggan"],"k":[37,22],"o":10},"atom_symbol":{"a":"Atom Symbol","b":"269B-FE0F","c":"269B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["science","physics","chemistry"],"k":[48,18],"o":4},"curling_stone":{"a":"Curling Stone","b":"1F94C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports"],"k":[41,47],"o":10},"slightly_frowning_face":{"a":"Slightly Frowning Face","b":"1F641","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","frowning","disappointed","sad","upset"],"k":[31,37],"o":7},"sunrise":{"a":"Sunrise","b":"1F305","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["morning","view","vacation","photo"],"k":[5,49]},"om_symbol":{"a":"Om Symbol","b":"1F549-FE0F","c":"1F549","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[28,12],"o":7},"chicken":{"a":"Chicken","b":"1F414","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cluck","nature","bird"],"k":[12,50]},"bowl_with_spoon":{"a":"Bowl with Spoon","b":"1F963","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","breakfast","cereal","oatmeal","porridge"],"k":[42,15],"o":10},"flag-ch":{"a":"Switzerland Flag","b":"1F1E8-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,22]},"video_camera":{"a":"Video Camera","b":"1F4F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["film","record"],"k":[26,48]},"video_game":{"a":"Video Game","b":"1F3AE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["play","console","PS4","controller"],"k":[9,8]},"rooster":{"a":"Rooster","b":"1F413","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","chicken"],"k":[12,49]},"vhs":{"a":"Videocassette","b":"1F4FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["record","video","oldschool","90s","80s"],"k":[26,51]},"city_sunset":{"a":"Cityscape at Dusk","b":"1F306","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","evening","sky","buildings"],"k":[5,50]},"confounded":{"a":"Confounded Face","b":"1F616","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","confused","sick","unwell","oops",":S"],"k":[30,46]},"green_salad":{"a":"Green Salad","b":"1F957","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","healthy","lettuce"],"k":[42,3],"o":9},"star_of_david":{"a":"Star of David","b":"2721-FE0F","c":"2721","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["judaism"],"k":[49,47],"o":1},"flag-ci":{"a":"Côte D’ivoire Flag","b":"1F1E8-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,23]},"popcorn":{"a":"Popcorn","b":"1F37F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","movie theater","films","snack"],"k":[8,13],"o":8},"city_sunrise":{"a":"Sunset over Buildings","b":"1F307","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","good morning","dawn"],"k":[5,51]},"disappointed":{"a":"Disappointed Face","b":"1F61E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sad","upset","depressed",":("],"k":[31,2],"l":["):",":(",":-("],"m":":("},"mag":{"a":"Left-Pointing Magnifying Glass","b":"1F50D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["search","zoom","find","detective"],"k":[27,15]},"hatching_chick":{"a":"Hatching Chick","b":"1F423","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","chicken","egg","born","baby","bird"],"k":[13,13]},"joystick":{"a":"Joystick","b":"1F579-FE0F","c":"1F579","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["game","play"],"k":[29,20],"o":7},"wheel_of_dharma":{"a":"Wheel of Dharma","b":"2638-FE0F","c":"2638","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["hinduism","buddhism","sikhism","jainism"],"k":[47,39],"o":1},"flag-ck":{"a":"Cook Islands Flag","b":"1F1E8-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,24]},"canned_food":{"a":"Canned Food","b":"1F96B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","soup"],"k":[42,23],"o":10},"worried":{"a":"Worried Face","b":"1F61F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","concern","nervous",":("],"k":[31,3]},"baby_chick":{"a":"Baby Chick","b":"1F424","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","chicken","bird"],"k":[13,14]},"flag-cl":{"a":"Chile Flag","b":"1F1E8-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,25]},"game_die":{"a":"Game Die","b":"1F3B2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dice","random","tabletop","play","luck"],"k":[9,12]},"mag_right":{"a":"Right-Pointing Magnifying Glass","b":"1F50E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["search","zoom","find","detective"],"k":[27,16]},"yin_yang":{"a":"Yin Yang","b":"262F-FE0F","c":"262F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["balance"],"k":[47,38],"o":1},"bridge_at_night":{"a":"Bridge at Night","b":"1F309","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","sanfrancisco"],"k":[6,1]},"spades":{"a":"Black Spade Suit","b":"2660-FE0F","c":"2660","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","suits","magic"],"k":[48,4],"o":1},"hatched_chick":{"a":"Front-Facing Baby Chick","b":"1F425","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","chicken","baby","bird"],"k":[13,15]},"flag-cm":{"a":"Cameroon Flag","b":"1F1E8-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,26]},"latin_cross":{"a":"Latin Cross","b":"271D-FE0F","c":"271D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["christianity"],"k":[49,46],"o":1},"triumph":{"a":"Face with Look of Triumph","b":"1F624","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","gas","phew","proud","pride"],"k":[31,8]},"hotsprings":{"a":"Hot Springs","b":"2668-FE0F","c":"2668","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bath","warm","relax"],"k":[48,8],"o":1},"bento":{"a":"Bento Box","b":"1F371","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","japanese","box"],"k":[7,51]},"microscope":{"a":"Microscope","b":"1F52C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["laboratory","experiment","zoomin","science","study"],"k":[27,46]},"cry":{"a":"Crying Face","b":"1F622","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tears","sad","depressed","upset",":'("],"k":[31,6],"l":[":'("],"m":":'("},"bird":{"a":"Bird","b":"1F426","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","fly","tweet","spring"],"k":[13,16]},"cn":{"a":"China Flag","b":"1F1E8-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["china","chinese","prc","flag","country","nation","banner"],"k":[1,27],"n":["flag-cn"]},"telescope":{"a":"Telescope","b":"1F52D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","space","zoom","science","astronomy"],"k":[27,47]},"rice_cracker":{"a":"Rice Cracker","b":"1F358","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","japanese"],"k":[7,26]},"hearts":{"a":"Black Heart Suit","b":"2665-FE0F","c":"2665","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","magic","suits"],"k":[48,6],"o":1},"orthodox_cross":{"a":"Orthodox Cross","b":"2626-FE0F","c":"2626","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["suppedaneum","religion"],"k":[47,35],"o":1},"milky_way":{"a":"Milky Way","b":"1F30C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","space","stars"],"k":[6,4]},"rice_ball":{"a":"Rice Ball","b":"1F359","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","japanese"],"k":[7,27]},"satellite_antenna":{"a":"Satellite Antenna","b":"1F4E1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[26,24]},"flag-co":{"a":"Colombia Flag","b":"1F1E8-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,28]},"carousel_horse":{"a":"Carousel Horse","b":"1F3A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","carnival"],"k":[8,46]},"sob":{"a":"Loudly Crying Face","b":"1F62D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","cry","tears","sad","upset","depressed"],"k":[31,17],"m":":'("},"diamonds":{"a":"Black Diamond Suit","b":"2666-FE0F","c":"2666","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","magic","suits"],"k":[48,7],"o":1},"star_and_crescent":{"a":"Star and Crescent","b":"262A-FE0F","c":"262A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["islam"],"k":[47,36],"o":1},"penguin":{"a":"Penguin","b":"1F427","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature"],"k":[13,17]},"dove_of_peace":{"a":"Dove of Peace","b":"1F54A-FE0F","c":"1F54A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[28,13],"o":7},"flag-cp":{"a":"Clipperton Island Flag","b":"1F1E8-1F1F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[1,29]},"ferris_wheel":{"a":"Ferris Wheel","b":"1F3A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["photo","carnival","londoneye"],"k":[8,47]},"clubs":{"a":"Black Club Suit","b":"2663-FE0F","c":"2663","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","magic","suits"],"k":[48,5],"o":1},"peace_symbol":{"a":"Peace Symbol","b":"262E-FE0F","c":"262E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["hippie"],"k":[47,37],"o":1},"candle":{"a":"Candle","b":"1F56F-FE0F","c":"1F56F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["fire","wax"],"k":[28,42],"o":7},"frowning":{"a":"Frowning Face with Open Mouth","b":"1F626","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","aw","what"],"k":[31,10]},"rice":{"a":"Cooked Rice","b":"1F35A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","china","asian"],"k":[7,28]},"flag-cr":{"a":"Costa Rica Flag","b":"1F1E8-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,30]},"roller_coaster":{"a":"Roller Coaster","b":"1F3A2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["carnival","playground","photo","fun"],"k":[8,48]},"menorah_with_nine_branches":{"a":"Menorah with Nine Branches","b":"1F54E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[28,17],"o":8},"black_joker":{"a":"Playing Card Black Joker","b":"1F0CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["poker","cards","game","play","magic"],"k":[0,15]},"eagle":{"a":"Eagle","b":"1F985","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","bird"],"k":[42,29],"o":9},"curry":{"a":"Curry and Rice","b":"1F35B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","spicy","hot","indian"],"k":[7,29]},"bulb":{"a":"Electric Light Bulb","b":"1F4A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["light","electricity","idea"],"k":[25,7]},"anguished":{"a":"Anguished Face","b":"1F627","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","stunned","nervous"],"k":[31,11],"l":["D:"]},"flag-cu":{"a":"Cuba Flag","b":"1F1E8-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,31]},"barber":{"a":"Barber Pole","b":"1F488","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hair","salon","style"],"k":[24,34]},"duck":{"a":"Duck","b":"1F986","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","bird","mallard"],"k":[42,30],"o":9},"six_pointed_star":{"a":"Six Pointed Star with Middle Dot","b":"1F52F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","religion","jewish","hexagram"],"k":[27,49]},"ramen":{"a":"Steaming Bowl","b":"1F35C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","japanese","noodle","chopsticks"],"k":[7,30]},"flashlight":{"a":"Electric Torch","b":"1F526","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dark","camping","sight","night"],"k":[27,40]},"mahjong":{"a":"Mahjong Tile Red Dragon","b":"1F004","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","play","chinese","kanji"],"k":[0,14],"o":5},"fearful":{"a":"Fearful Face","b":"1F628","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","scared","terrified","nervous","oops","huh"],"k":[31,12]},"aries":{"a":"Aries","b":"2648","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[47,44],"o":1},"spaghetti":{"a":"Spaghetti","b":"1F35D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","italian","noodle"],"k":[7,31]},"circus_tent":{"a":"Circus Tent","b":"1F3AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","carnival","party"],"k":[9,4]},"izakaya_lantern":{"a":"Izakaya Lantern","b":"1F3EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["light","paper","halloween","spooky"],"k":[12,11],"n":["lantern"]},"flag-cv":{"a":"Cape Verde Flag","b":"1F1E8-1F1FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,32]},"weary":{"a":"Weary Face","b":"1F629","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","tired","sleepy","sad","frustrated","upset"],"k":[31,13]},"flower_playing_cards":{"a":"Flower Playing Cards","b":"1F3B4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","sunset","red"],"k":[9,14]},"owl":{"a":"Owl","b":"1F989","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","bird","hoot"],"k":[42,33],"o":9},"performing_arts":{"a":"Performing Arts","b":"1F3AD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["acting","theater","drama"],"k":[9,7]},"frog":{"a":"Frog Face","b":"1F438","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","croak","toad"],"k":[13,34]},"flag-cw":{"a":"Curaçao Flag","b":"1F1E8-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,33]},"notebook_with_decorative_cover":{"a":"Notebook with Decorative Cover","b":"1F4D4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["classroom","notes","record","paper","study"],"k":[26,11]},"exploding_head":{"a":"Shocked Face with Exploding Head","b":"1F92F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","shocked","mind","blown"],"k":[39,3],"n":["shocked_face_with_exploding_head"],"o":10},"taurus":{"a":"Taurus","b":"2649","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","sign","zodiac","astrology"],"k":[47,45],"o":1},"sweet_potato":{"a":"Roasted Sweet Potato","b":"1F360","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","nature"],"k":[7,34]},"closed_book":{"a":"Closed Book","b":"1F4D5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["read","library","knowledge","textbook","learn"],"k":[26,12]},"gemini":{"a":"Gemini","b":"264A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[47,46],"o":1},"frame_with_picture":{"a":"Frame with Picture","b":"1F5BC-FE0F","c":"1F5BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,3],"o":7},"flag-cx":{"a":"Christmas Island Flag","b":"1F1E8-1F1FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,34]},"grimacing":{"a":"Grimacing Face","b":"1F62C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","grimace","teeth"],"k":[31,16]},"crocodile":{"a":"Crocodile","b":"1F40A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","reptile","lizard","alligator"],"k":[12,40]},"oden":{"a":"Oden","b":"1F362","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","japanese"],"k":[7,36]},"flag-cy":{"a":"Cyprus Flag","b":"1F1E8-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,35]},"book":{"a":"Open Book","b":"1F4D6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[26,13],"n":["open_book"]},"turtle":{"a":"Turtle","b":"1F422","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","slow","nature","tortoise"],"k":[13,12]},"art":{"a":"Artist Palette","b":"1F3A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["design","paint","draw","colors"],"k":[9,2]},"sushi":{"a":"Sushi","b":"1F363","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","fish","japanese","rice"],"k":[7,37]},"cold_sweat":{"a":"Face with Open Mouth and Cold Sweat","b":"1F630","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","nervous","sweat"],"k":[31,20]},"cancer":{"a":"Cancer","b":"264B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[47,47],"o":1},"fried_shrimp":{"a":"Fried Shrimp","b":"1F364","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","animal","appetizer","summer"],"k":[7,38]},"slot_machine":{"a":"Slot Machine","b":"1F3B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bet","gamble","vegas","fruit machine","luck","casino"],"k":[9,10]},"scream":{"a":"Face Screaming in Fear","b":"1F631","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","munch","scared","omg"],"k":[31,21]},"green_book":{"a":"Green Book","b":"1F4D7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["read","library","knowledge","study"],"k":[26,14]},"leo":{"a":"Leo","b":"264C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[47,48],"o":1},"flag-cz":{"a":"Czechia Flag","b":"1F1E8-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,36]},"lizard":{"a":"Lizard","b":"1F98E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","reptile"],"k":[42,38],"o":9},"virgo":{"a":"Virgo","b":"264D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[47,49],"o":1},"steam_locomotive":{"a":"Steam Locomotive","b":"1F682","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","train"],"k":[34,10]},"de":{"a":"Germany Flag","b":"1F1E9-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["german","nation","flag","country","banner"],"k":[1,37],"n":["flag-de"]},"flushed":{"a":"Flushed Face","b":"1F633","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","blush","shy","flattered"],"k":[31,23]},"blue_book":{"a":"Blue Book","b":"1F4D8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["read","library","knowledge","learn","study"],"k":[26,15]},"snake":{"a":"Snake","b":"1F40D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","evil","nature","hiss","python"],"k":[12,43]},"fish_cake":{"a":"Fish Cake with Swirl Design","b":"1F365","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","japan","sea","beach","narutomaki","pink","swirl","kamaboko","surimi","ramen"],"k":[7,39]},"railway_car":{"a":"Railway Car","b":"1F683","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,11]},"dango":{"a":"Dango","b":"1F361","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","dessert","sweet","japanese","barbecue","meat"],"k":[7,35]},"orange_book":{"a":"Orange Book","b":"1F4D9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["read","library","knowledge","textbook","study"],"k":[26,16]},"libra":{"a":"Libra","b":"264E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[47,50],"o":1},"dragon_face":{"a":"Dragon Face","b":"1F432","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","myth","nature","chinese","green"],"k":[13,28]},"flag-dg":{"a":"Diego Garcia Flag","b":"1F1E9-1F1EC","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[1,38]},"zany_face":{"a":"Grinning Face with One Large and One Small Eye","b":"1F92A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,50],"n":["grinning_face_with_one_large_and_one_small_eye"],"o":10},"books":{"a":"Books","b":"1F4DA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["literature","library","study"],"k":[26,17]},"dragon":{"a":"Dragon","b":"1F409","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","myth","nature","chinese","green"],"k":[12,39]},"flag-dj":{"a":"Djibouti Flag","b":"1F1E9-1F1EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,39]},"dumpling":{"a":"Dumpling","b":"1F95F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","empanada","pierogi","potsticker"],"k":[42,11],"o":10},"dizzy_face":{"a":"Dizzy Face","b":"1F635","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["spent","unconscious","xox","dizzy"],"k":[31,25]},"scorpius":{"a":"Scorpius","b":"264F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology","scorpio"],"k":[47,51],"o":1},"bullettrain_side":{"a":"High-Speed Train","b":"1F684","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,12]},"bullettrain_front":{"a":"High-Speed Train with Bullet Nose","b":"1F685","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","speed","fast","public","travel"],"k":[34,13]},"notebook":{"a":"Notebook","b":"1F4D3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","record","notes","paper","study"],"k":[26,10]},"fortune_cookie":{"a":"Fortune Cookie","b":"1F960","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","prophecy"],"k":[42,12],"o":10},"sagittarius":{"a":"Sagittarius","b":"2650","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[48,0],"o":1},"sauropod":{"a":"Sauropod","b":"1F995","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","dinosaur","brachiosaurus","brontosaurus","diplodocus","extinct"],"k":[42,45],"o":10},"flag-dk":{"a":"Denmark Flag","b":"1F1E9-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,40]},"rage":{"a":"Pouting Face","b":"1F621","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["angry","mad","hate","despise"],"k":[31,5]},"ledger":{"a":"Ledger","b":"1F4D2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["notes","paper"],"k":[26,9]},"angry":{"a":"Angry Face","b":"1F620","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mad","face","annoyed","frustrated"],"k":[31,4],"l":[">:(",">:-("]},"t-rex":{"a":"T-Rex","b":"1F996","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","dinosaur","tyrannosaurus","extinct"],"k":[42,46],"o":10},"capricorn":{"a":"Capricorn","b":"2651","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","zodiac","purple-square","astrology"],"k":[48,1],"o":1},"takeout_box":{"a":"Takeout Box","b":"1F961","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","leftovers"],"k":[42,13],"o":10},"flag-dm":{"a":"Dominica Flag","b":"1F1E9-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,41]},"train2":{"a":"Train","b":"1F686","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,14]},"page_with_curl":{"a":"Page with Curl","b":"1F4C3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["documents","office","paper"],"k":[25,46]},"whale":{"a":"Spouting Whale","b":"1F433","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","sea","ocean"],"k":[13,29]},"face_with_symbols_on_mouth":{"a":"Serious Face with Symbols Covering Mouth","b":"1F92C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[39,0],"n":["serious_face_with_symbols_covering_mouth"],"o":10},"flag-do":{"a":"Dominican Republic Flag","b":"1F1E9-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,42]},"metro":{"a":"Metro","b":"1F687","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","blue-square","mrt","underground","tube"],"k":[34,15]},"icecream":{"a":"Soft Ice Cream","b":"1F366","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","hot","dessert","summer"],"k":[7,40]},"aquarius":{"a":"Aquarius","b":"2652","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","zodiac","astrology"],"k":[48,2],"o":1},"flag-dz":{"a":"Algeria Flag","b":"1F1E9-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,43]},"whale2":{"a":"Whale","b":"1F40B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","sea","ocean"],"k":[12,41]},"mask":{"a":"Face with Medical Mask","b":"1F637","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","sick","ill","disease"],"k":[31,27]},"scroll":{"a":"Scroll","b":"1F4DC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["documents","ancient","history","paper"],"k":[26,19]},"shaved_ice":{"a":"Shaved Ice","b":"1F367","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hot","dessert","summer"],"k":[7,41]},"pisces":{"a":"Pisces","b":"2653","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","sign","zodiac","astrology"],"k":[48,3],"o":1},"light_rail":{"a":"Light Rail","b":"1F688","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,16]},"dolphin":{"a":"Dolphin","b":"1F42C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","fish","sea","ocean","flipper","fins","beach"],"k":[13,22],"n":["flipper"]},"face_with_thermometer":{"a":"Face with Thermometer","b":"1F912","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sick","temperature","thermometer","cold","fever"],"k":[37,26],"o":8},"flag-ea":{"a":"Ceuta & Melilla Flag","b":"1F1EA-1F1E6","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[1,44]},"ophiuchus":{"a":"Ophiuchus","b":"26CE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sign","purple-square","constellation","astrology"],"k":[48,31]},"station":{"a":"Station","b":"1F689","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","public"],"k":[34,17]},"ice_cream":{"a":"Ice Cream","b":"1F368","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","hot","dessert"],"k":[7,42]},"page_facing_up":{"a":"Page Facing Up","b":"1F4C4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["documents","office","paper","information"],"k":[25,47]},"doughnut":{"a":"Doughnut","b":"1F369","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","dessert","snack","sweet","donut"],"k":[7,43]},"face_with_head_bandage":{"a":"Face with Head-Bandage","b":"1F915","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["injured","clumsy","bandage","hurt"],"k":[37,29],"o":8},"fish":{"a":"Fish","b":"1F41F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","food","nature"],"k":[13,9]},"newspaper":{"a":"Newspaper","b":"1F4F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["press","headline"],"k":[26,39]},"tram":{"a":"Tram","b":"1F68A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,18]},"flag-ec":{"a":"Ecuador Flag","b":"1F1EA-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,45]},"twisted_rightwards_arrows":{"a":"Twisted Rightwards Arrows","b":"1F500","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","shuffle","music","random"],"k":[27,2]},"flag-ee":{"a":"Estonia Flag","b":"1F1EA-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,46]},"cookie":{"a":"Cookie","b":"1F36A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","snack","oreo","chocolate","sweet","dessert"],"k":[7,44]},"monorail":{"a":"Monorail","b":"1F69D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,37]},"tropical_fish":{"a":"Tropical Fish","b":"1F420","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","swim","ocean","beach","nemo"],"k":[13,10]},"rolled_up_newspaper":{"a":"Rolled Up Newspaper","b":"1F5DE-FE0F","c":"1F5DE","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,12],"o":7},"nauseated_face":{"a":"Nauseated Face","b":"1F922","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","vomit","gross","green","sick","throw up","ill"],"k":[38,25],"o":9},"repeat":{"a":"Clockwise Rightwards and Leftwards Open Circle Arrows","b":"1F501","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["loop","record"],"k":[27,3]},"bookmark_tabs":{"a":"Bookmark Tabs","b":"1F4D1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["favorite","save","order","tidy"],"k":[26,8]},"repeat_one":{"a":"Clockwise Rightwards and Leftwards Open Circle Arrows with Circled One Overlay","b":"1F502","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","loop"],"k":[27,4]},"flag-eg":{"a":"Egypt Flag","b":"1F1EA-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,47]},"mountain_railway":{"a":"Mountain Railway","b":"1F69E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,38]},"birthday":{"a":"Birthday Cake","b":"1F382","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","dessert","cake"],"k":[8,16]},"blowfish":{"a":"Blowfish","b":"1F421","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","nature","food","sea","ocean"],"k":[13,11]},"face_vomiting":{"a":"Face with Open Mouth Vomiting","b":"1F92E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[39,2],"n":["face_with_open_mouth_vomiting"],"o":10},"arrow_forward":{"a":"Black Right-Pointing Triangle","b":"25B6-FE0F","c":"25B6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","right","direction","play"],"k":[47,10],"o":1},"bookmark":{"a":"Bookmark","b":"1F516","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["favorite","label","save"],"k":[27,24]},"flag-eh":{"a":"Western Sahara Flag","b":"1F1EA-1F1ED","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[1,48]},"shark":{"a":"Shark","b":"1F988","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","fish","sea","ocean","jaws","fins","beach"],"k":[42,32],"o":9},"train":{"a":"Tram Car","b":"1F68B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","carriage","public","travel"],"k":[34,19]},"sneezing_face":{"a":"Sneezing Face","b":"1F927","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","gesundheit","sneeze","sick","allergy"],"k":[38,47],"o":9},"cake":{"a":"Shortcake","b":"1F370","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","dessert"],"k":[7,50]},"bus":{"a":"Bus","b":"1F68C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["car","vehicle","transportation"],"k":[34,20]},"pie":{"a":"Pie","b":"1F967","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food","dessert","pastry"],"k":[42,19],"o":10},"innocent":{"a":"Smiling Face with Halo","b":"1F607","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","angel","heaven","halo"],"k":[30,31]},"fast_forward":{"a":"Black Right-Pointing Double Triangle","b":"23E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","play","speed","continue"],"k":[46,45]},"label":{"a":"Label","b":"1F3F7-FE0F","c":"1F3F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sale","tag"],"k":[12,21],"o":7},"octopus":{"a":"Octopus","b":"1F419","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","creature","ocean","sea","nature","beach"],"k":[13,3]},"flag-er":{"a":"Eritrea Flag","b":"1F1EA-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,49]},"black_right_pointing_double_triangle_with_vertical_bar":{"a":"Black Right Pointing Double Triangle with Vertical Bar","b":"23ED-FE0F","c":"23ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,49]},"chocolate_bar":{"a":"Chocolate Bar","b":"1F36B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","snack","dessert","sweet"],"k":[7,45]},"oncoming_bus":{"a":"Oncoming Bus","b":"1F68D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","transportation"],"k":[34,21]},"shell":{"a":"Spiral Shell","b":"1F41A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","sea","beach"],"k":[13,4]},"face_with_cowboy_hat":{"a":"Face with Cowboy Hat","b":"1F920","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,23],"o":9},"moneybag":{"a":"Money Bag","b":"1F4B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dollar","payment","coins","sale"],"k":[25,27]},"es":{"a":"Spain Flag","b":"1F1EA-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["spain","flag","nation","country","banner"],"k":[1,50],"n":["flag-es"]},"crab":{"a":"Crab","b":"1F980","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","crustacean"],"k":[42,24],"o":8},"yen":{"a":"Banknote with Yen Sign","b":"1F4B4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","japanese","dollar","currency"],"k":[25,31]},"flag-et":{"a":"Ethiopia Flag","b":"1F1EA-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[1,51]},"clown_face":{"a":"Clown Face","b":"1F921","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face"],"k":[38,24],"o":9},"black_right_pointing_triangle_with_double_vertical_bar":{"a":"Black Right Pointing Triangle with Double Vertical Bar","b":"23EF-FE0F","c":"23EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,51]},"trolleybus":{"a":"Trolleybus","b":"1F68E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bart","transportation","vehicle"],"k":[34,22]},"candy":{"a":"Candy","b":"1F36C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["snack","dessert","sweet","lolly"],"k":[7,46]},"lying_face":{"a":"Lying Face","b":"1F925","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","lie","pinocchio"],"k":[38,28],"o":9},"arrow_backward":{"a":"Black Left-Pointing Triangle","b":"25C0-FE0F","c":"25C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","left","direction"],"k":[47,11],"o":1},"dollar":{"a":"Banknote with Dollar Sign","b":"1F4B5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","bill","currency"],"k":[25,32]},"shrimp":{"a":"Shrimp","b":"1F990","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","ocean","nature","seafood"],"k":[42,40],"o":9},"minibus":{"a":"Minibus","b":"1F690","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","car","transportation"],"k":[34,24]},"flag-eu":{"a":"European Union Flag","b":"1F1EA-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,0]},"lollipop":{"a":"Lollipop","b":"1F36D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","snack","candy","sweet"],"k":[7,47]},"squid":{"a":"Squid","b":"1F991","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","nature","ocean","sea"],"k":[42,41],"o":9},"euro":{"a":"Banknote with Euro Sign","b":"1F4B6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","dollar","currency"],"k":[25,33]},"flag-fi":{"a":"Finland Flag","b":"1F1EB-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,1]},"ambulance":{"a":"Ambulance","b":"1F691","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["health","911","hospital"],"k":[34,25]},"custard":{"a":"Custard","b":"1F36E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dessert","food"],"k":[7,48]},"shushing_face":{"a":"Face with Finger Covering Closed Lips","b":"1F92B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,51],"n":["face_with_finger_covering_closed_lips"],"o":10},"rewind":{"a":"Black Left-Pointing Double Triangle","b":"23EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["play","blue-square"],"k":[46,46]},"black_left_pointing_double_triangle_with_vertical_bar":{"a":"Black Left Pointing Double Triangle with Vertical Bar","b":"23EE-FE0F","c":"23EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,50]},"face_with_hand_over_mouth":{"a":"Smiling Face with Smiling Eyes and Hand Covering Mouth","b":"1F92D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[39,1],"n":["smiling_face_with_smiling_eyes_and_hand_covering_mouth"],"o":10},"flag-fj":{"a":"Fiji Flag","b":"1F1EB-1F1EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,2]},"honey_pot":{"a":"Honey Pot","b":"1F36F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bees","sweet","kitchen"],"k":[7,49]},"snail":{"a":"Snail","b":"1F40C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["slow","animal","shell"],"k":[12,42]},"pound":{"a":"Banknote with Pound Sign","b":"1F4B7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["british","sterling","money","sales","bills","uk","england","currency"],"k":[25,34]},"fire_engine":{"a":"Fire Engine","b":"1F692","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","cars","vehicle"],"k":[34,26]},"baby_bottle":{"a":"Baby Bottle","b":"1F37C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["food","container","milk"],"k":[8,10]},"flag-fk":{"a":"Falkland Islands Flag","b":"1F1EB-1F1F0","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[2,3]},"butterfly":{"a":"Butterfly","b":"1F98B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","insect","nature","caterpillar"],"k":[42,35],"o":9},"money_with_wings":{"a":"Money with Wings","b":"1F4B8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dollar","bills","payment","sale"],"k":[25,35]},"face_with_monocle":{"a":"Face with Monocle","b":"1F9D0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,49],"o":10},"police_car":{"a":"Police Car","b":"1F693","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","cars","transportation","law","legal","enforcement"],"k":[34,27]},"arrow_up_small":{"a":"Up-Pointing Small Red Triangle","b":"1F53C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","triangle","direction","point","forward","top"],"k":[28,10]},"flag-fm":{"a":"Micronesia Flag","b":"1F1EB-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,4]},"glass_of_milk":{"a":"Glass of Milk","b":"1F95B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[42,7],"o":9},"credit_card":{"a":"Credit Card","b":"1F4B3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","dollar","bill","payment","shopping"],"k":[25,30]},"oncoming_police_car":{"a":"Oncoming Police Car","b":"1F694","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","law","legal","enforcement","911"],"k":[34,28]},"bug":{"a":"Bug","b":"1F41B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","insect","nature","worm"],"k":[13,5]},"nerd_face":{"a":"Nerd Face","b":"1F913","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","nerdy","geek","dork"],"k":[37,27],"o":8},"arrow_double_up":{"a":"Black Up-Pointing Double Triangle","b":"23EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","top"],"k":[46,47]},"chart":{"a":"Chart with Upwards Trend and Yen Sign","b":"1F4B9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["green-square","graph","presentation","stats"],"k":[25,36]},"flag-fo":{"a":"Faroe Islands Flag","b":"1F1EB-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,5]},"ant":{"a":"Ant","b":"1F41C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","insect","nature","bug"],"k":[13,6]},"arrow_down_small":{"a":"Down-Pointing Small Red Triangle","b":"1F53D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[28,11]},"smiling_imp":{"a":"Smiling Face with Horns","b":"1F608","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["devil","horns"],"k":[30,32]},"taxi":{"a":"Taxi","b":"1F695","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["uber","vehicle","cars","transportation"],"k":[34,29]},"coffee":{"a":"Hot Beverage","b":"2615","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beverage","caffeine","latte","espresso"],"k":[47,24],"o":4},"fr":{"a":"France Flag","b":"1F1EB-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["banner","flag","nation","france","french","country"],"k":[2,6],"n":["flag-fr"]},"oncoming_taxi":{"a":"Oncoming Taxi","b":"1F696","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","cars","uber"],"k":[34,30]},"arrow_double_down":{"a":"Black Down-Pointing Double Triangle","b":"23EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","direction","bottom"],"k":[46,48]},"imp":{"a":"Imp","b":"1F47F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["devil","angry","horns"],"k":[22,51]},"currency_exchange":{"a":"Currency Exchange","b":"1F4B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","dollar","travel"],"k":[25,28]},"tea":{"a":"Teacup Without Handle","b":"1F375","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["drink","bowl","breakfast","green","british"],"k":[8,3]},"bee":{"a":"Honeybee","b":"1F41D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[13,7],"n":["honeybee"]},"heavy_dollar_sign":{"a":"Heavy Dollar Sign","b":"1F4B2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["money","sales","payment","currency","buck"],"k":[25,29]},"car":{"a":"Automobile","b":"1F697","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[34,31],"n":["red_car"]},"sake":{"a":"Sake Bottle and Cup","b":"1F376","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wine","drink","drunk","beverage","japanese","alcohol","booze"],"k":[8,4]},"flag-ga":{"a":"Gabon Flag","b":"1F1EC-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,7]},"beetle":{"a":"Lady Beetle","b":"1F41E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","insect","nature","ladybug"],"k":[13,8]},"japanese_ogre":{"a":"Japanese Ogre","b":"1F479","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["monster","red","mask","halloween","scary","creepy","devil","demon","japanese","ogre"],"k":[22,40]},"double_vertical_bar":{"a":"Double Vertical Bar","b":"23F8-FE0F","c":"23F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,4],"o":7},"champagne":{"a":"Bottle with Popping Cork","b":"1F37E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["drink","wine","bottle","celebration"],"k":[8,12],"o":8},"japanese_goblin":{"a":"Japanese Goblin","b":"1F47A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red","evil","mask","monster","scary","creepy","japanese","goblin"],"k":[22,41]},"black_square_for_stop":{"a":"Black Square for Stop","b":"23F9-FE0F","c":"23F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,5],"o":7},"oncoming_automobile":{"a":"Oncoming Automobile","b":"1F698","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["car","vehicle","transportation"],"k":[34,32]},"email":{"a":"Envelope","b":"2709-FE0F","c":"2709","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["letter","postal","inbox","communication"],"k":[49,17],"n":["envelope"],"o":1},"cricket":{"a":"Cricket","b":"1F997","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports"],"k":[42,47],"o":10},"gb":{"a":"United Kingdom Flag","b":"1F1EC-1F1E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,8],"n":["uk","flag-gb"]},"black_circle_for_record":{"a":"Black Circle for Record","b":"23FA-FE0F","c":"23FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,6],"o":7},"flag-gd":{"a":"Grenada Flag","b":"1F1EC-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,9]},"spider":{"a":"Spider","b":"1F577-FE0F","c":"1F577","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","arachnid"],"k":[29,18],"o":7},"blue_car":{"a":"Recreational Vehicle","b":"1F699","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle"],"k":[34,33]},"skull":{"a":"Skull","b":"1F480","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dead","skeleton","creepy","death"],"k":[23,0]},"e-mail":{"a":"E-Mail Symbol","b":"1F4E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["communication","inbox"],"k":[26,30]},"wine_glass":{"a":"Wine Glass","b":"1F377","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["drink","beverage","drunk","alcohol","booze"],"k":[8,5]},"spider_web":{"a":"Spider Web","b":"1F578-FE0F","c":"1F578","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","insect","arachnid","silk"],"k":[29,19],"o":7},"cocktail":{"a":"Cocktail Glass","b":"1F378","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["drink","drunk","alcohol","beverage","booze","mojito"],"k":[8,6]},"skull_and_crossbones":{"a":"Skull and Crossbones","b":"2620-FE0F","c":"2620","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["poison","danger","deadly","scary","death","pirate","evil"],"k":[47,32],"o":1},"flag-ge":{"a":"Georgia Flag","b":"1F1EC-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,10]},"eject":{"a":"Eject","b":"23CF-FE0F","c":"23CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,44],"o":4},"truck":{"a":"Delivery Truck","b":"1F69A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cars","transportation"],"k":[34,34]},"incoming_envelope":{"a":"Incoming Envelope","b":"1F4E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","inbox"],"k":[26,31]},"tropical_drink":{"a":"Tropical Drink","b":"1F379","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beverage","cocktail","summer","beach","alcohol","booze","mojito"],"k":[8,7]},"scorpion":{"a":"Scorpion","b":"1F982","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["animal","arachnid"],"k":[42,26],"o":8},"cinema":{"a":"Cinema","b":"1F3A6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","record","film","movie","curtain","stage","theater"],"k":[9,0]},"articulated_lorry":{"a":"Articulated Lorry","b":"1F69B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","cars","transportation","express"],"k":[34,35]},"envelope_with_arrow":{"a":"Envelope with Downwards Arrow Above","b":"1F4E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","communication"],"k":[26,32]},"ghost":{"a":"Ghost","b":"1F47B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["halloween","spooky","scary"],"k":[22,42]},"flag-gf":{"a":"French Guiana Flag","b":"1F1EC-1F1EB","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[2,11]},"bouquet":{"a":"Bouquet","b":"1F490","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["flowers","nature","spring"],"k":[24,42]},"tractor":{"a":"Tractor","b":"1F69C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","car","farming","agriculture"],"k":[34,36]},"beer":{"a":"Beer Mug","b":"1F37A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["relax","beverage","drink","drunk","party","pub","summer","alcohol","booze"],"k":[8,8]},"outbox_tray":{"a":"Outbox Tray","b":"1F4E4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["inbox","email"],"k":[26,27]},"low_brightness":{"a":"Low Brightness Symbol","b":"1F505","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sun","afternoon","warm","summer"],"k":[27,7]},"alien":{"a":"Extraterrestrial Alien","b":"1F47D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["UFO","paul","weird","outer_space"],"k":[22,49]},"flag-gg":{"a":"Guernsey Flag","b":"1F1EC-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,12]},"cherry_blossom":{"a":"Cherry Blossom","b":"1F338","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","spring","flower"],"k":[6,46]},"inbox_tray":{"a":"Inbox Tray","b":"1F4E5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","documents"],"k":[26,28]},"flag-gh":{"a":"Ghana Flag","b":"1F1EC-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,13]},"bike":{"a":"Bicycle","b":"1F6B2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","bicycle","exercise","hipster"],"k":[35,23]},"space_invader":{"a":"Alien Monster","b":"1F47E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["game","arcade","play"],"k":[22,50]},"beers":{"a":"Clinking Beer Mugs","b":"1F37B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["relax","beverage","drink","drunk","party","pub","summer","alcohol","booze"],"k":[8,9]},"high_brightness":{"a":"High Brightness Symbol","b":"1F506","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sun","light"],"k":[27,8]},"package":{"a":"Package","b":"1F4E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mail","gift","cardboard","box","moving"],"k":[26,29]},"scooter":{"a":"Scooter","b":"1F6F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,19],"o":9},"white_flower":{"a":"White Flower","b":"1F4AE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","spring"],"k":[25,25]},"clinking_glasses":{"a":"Clinking Glasses","b":"1F942","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["beverage","drink","party","alcohol","celebrate","cheers","wine","champagne","toast"],"k":[41,38],"o":9},"robot_face":{"a":"Robot Face","b":"1F916","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,30],"o":8},"signal_strength":{"a":"Antenna with Bars","b":"1F4F6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","reception","phone","internet","connection","wifi","bluetooth","bars"],"k":[26,45]},"flag-gi":{"a":"Gibraltar Flag","b":"1F1EC-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,14]},"flag-gl":{"a":"Greenland Flag","b":"1F1EC-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,15]},"motor_scooter":{"a":"Motor Scooter","b":"1F6F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["vehicle","vespa","sasha"],"k":[37,20],"o":9},"mailbox":{"a":"Closed Mailbox with Raised Flag","b":"1F4EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","inbox","communication"],"k":[26,34]},"vibration_mode":{"a":"Vibration Mode","b":"1F4F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","phone"],"k":[26,42]},"hankey":{"a":"Pile of Poo","b":"1F4A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[25,15],"n":["poop","shit"]},"rosette":{"a":"Rosette","b":"1F3F5-FE0F","c":"1F3F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["flower","decoration","military"],"k":[12,20],"o":7},"tumbler_glass":{"a":"Tumbler Glass","b":"1F943","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["drink","beverage","drunk","alcohol","liquor","booze","bourbon","scotch","whisky","glass","shot"],"k":[41,39],"o":9},"cup_with_straw":{"a":"Cup with Straw","b":"1F964","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["drink","soda"],"k":[42,16],"o":10},"flag-gm":{"a":"Gambia Flag","b":"1F1EC-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,16]},"mailbox_closed":{"a":"Closed Mailbox with Lowered Flag","b":"1F4EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","communication","inbox"],"k":[26,33]},"mobile_phone_off":{"a":"Mobile Phone off","b":"1F4F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mute","orange-square","silence","quiet"],"k":[26,43]},"busstop":{"a":"Bus Stop","b":"1F68F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","wait"],"k":[34,23]},"smiley_cat":{"a":"Smiling Cat Face with Open Mouth","b":"1F63A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","happy","smile"],"k":[31,30]},"rose":{"a":"Rose","b":"1F339","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["flowers","valentines","love","spring"],"k":[6,47]},"motorway":{"a":"Motorway","b":"1F6E3-FE0F","c":"1F6E3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["road","cupertino","interstate","highway"],"k":[37,11],"o":7},"smile_cat":{"a":"Grinning Cat Face with Smiling Eyes","b":"1F638","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","smile"],"k":[31,28]},"flag-gn":{"a":"Guinea Flag","b":"1F1EC-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,17]},"wilted_flower":{"a":"Wilted Flower","b":"1F940","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["plant","nature","flower"],"k":[41,36],"o":9},"mailbox_with_mail":{"a":"Open Mailbox with Raised Flag","b":"1F4EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","inbox","communication"],"k":[26,35]},"chopsticks":{"a":"Chopsticks","b":"1F962","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["food"],"k":[42,14],"o":10},"female_sign":{"a":"Female Sign","b":"2640-FE0F","c":"2640","d":false,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,42],"o":1},"mailbox_with_no_mail":{"a":"Open Mailbox with Lowered Flag","b":"1F4ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","inbox"],"k":[26,36]},"knife_fork_plate":{"a":"Knife Fork Plate","b":"1F37D-FE0F","c":"1F37D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[8,11],"o":7},"hibiscus":{"a":"Hibiscus","b":"1F33A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","vegetable","flowers","beach"],"k":[6,48]},"flag-gp":{"a":"Guadeloupe Flag","b":"1F1EC-1F1F5","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[2,18]},"railway_track":{"a":"Railway Track","b":"1F6E4-FE0F","c":"1F6E4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["train","transportation"],"k":[37,12],"o":7},"male_sign":{"a":"Male Sign","b":"2642-FE0F","c":"2642","d":false,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[47,43],"o":1},"joy_cat":{"a":"Cat Face with Tears of Joy","b":"1F639","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","haha","happy","tears"],"k":[31,29]},"fuelpump":{"a":"Fuel Pump","b":"26FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["gas station","petroleum"],"k":[49,13],"o":5},"sunflower":{"a":"Sunflower","b":"1F33B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","fall"],"k":[6,49]},"postbox":{"a":"Postbox","b":"1F4EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","letter","envelope"],"k":[26,37]},"flag-gq":{"a":"Equatorial Guinea Flag","b":"1F1EC-1F1F6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,19]},"heart_eyes_cat":{"a":"Smiling Cat Face with Heart-Shaped Eyes","b":"1F63B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","love","like","affection","cats","valentines","heart"],"k":[31,31]},"fork_and_knife":{"a":"Fork and Knife","b":"1F374","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cutlery","kitchen"],"k":[8,2]},"medical_symbol":{"a":"Medical Symbol","b":"2695-FE0F","c":"2695","d":false,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[48,14],"n":["staff_of_aesculapius"],"o":4},"recycle":{"a":"Black Universal Recycling Symbol","b":"267B-FE0F","c":"267B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arrow","environment","garbage","trash"],"k":[48,9],"o":3},"spoon":{"a":"Spoon","b":"1F944","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["cutlery","kitchen","tableware"],"k":[41,40],"o":9},"blossom":{"a":"Blossom","b":"1F33C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","flowers","yellow"],"k":[6,50]},"rotating_light":{"a":"Police Cars Revolving Light","b":"1F6A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["police","ambulance","911","emergency","alert","error","pinged","law","legal"],"k":[35,13]},"smirk_cat":{"a":"Cat Face with Wry Smile","b":"1F63C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","smirk"],"k":[31,32]},"ballot_box_with_ballot":{"a":"Ballot Box with Ballot","b":"1F5F3-FE0F","c":"1F5F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,17],"o":7},"flag-gr":{"a":"Greece Flag","b":"1F1EC-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,20]},"kissing_cat":{"a":"Kissing Cat Face with Closed Eyes","b":"1F63D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","kiss"],"k":[31,33]},"pencil2":{"a":"Pencil","b":"270F-FE0F","c":"270F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","write","paper","writing","school","study"],"k":[49,42],"o":1},"traffic_light":{"a":"Horizontal Traffic Light","b":"1F6A5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","signal"],"k":[35,10]},"fleur_de_lis":{"a":"Fleur De Lis","b":"269C-FE0F","c":"269C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["decorative","scout"],"k":[48,19],"o":4},"tulip":{"a":"Tulip","b":"1F337","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["flowers","plant","nature","summer","spring"],"k":[6,45]},"hocho":{"a":"Hocho","b":"1F52A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["knife","blade","cutlery","kitchen","weapon"],"k":[27,44],"n":["knife"]},"flag-gs":{"a":"South Georgia & South Sandwich Islands Flag","b":"1F1EC-1F1F8","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[2,21]},"seedling":{"a":"Seedling","b":"1F331","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature","grass","lawn","spring"],"k":[6,39]},"amphora":{"a":"Amphora","b":"1F3FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["vase","jar"],"k":[12,24],"o":8},"scream_cat":{"a":"Weary Cat Face","b":"1F640","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats","munch","scared","scream"],"k":[31,36]},"vertical_traffic_light":{"a":"Vertical Traffic Light","b":"1F6A6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","driving"],"k":[35,11]},"black_nib":{"a":"Black Nib","b":"2712-FE0F","c":"2712","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pen","stationery","writing","write"],"k":[49,43],"o":1},"flag-gt":{"a":"Guatemala Flag","b":"1F1EC-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,22]},"trident":{"a":"Trident Emblem","b":"1F531","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weapon","spear"],"k":[27,51]},"flag-gu":{"a":"Guam Flag","b":"1F1EC-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,23]},"name_badge":{"a":"Name Badge","b":"1F4DB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fire","forbid"],"k":[26,18]},"construction":{"a":"Construction Sign","b":"1F6A7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wip","progress","caution","warning"],"k":[35,12]},"lower_left_fountain_pen":{"a":"Lower Left Fountain Pen","b":"1F58B-FE0F","c":"1F58B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,29],"o":7},"evergreen_tree":{"a":"Evergreen Tree","b":"1F332","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature"],"k":[6,40]},"crying_cat_face":{"a":"Crying Cat Face","b":"1F63F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","tears","weep","sad","cats","upset","cry"],"k":[31,35]},"flag-gw":{"a":"Guinea-Bissau Flag","b":"1F1EC-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,24]},"lower_left_ballpoint_pen":{"a":"Lower Left Ballpoint Pen","b":"1F58A-FE0F","c":"1F58A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,28],"o":7},"pouting_cat":{"a":"Pouting Cat Face","b":"1F63E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","cats"],"k":[31,34]},"deciduous_tree":{"a":"Deciduous Tree","b":"1F333","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","nature"],"k":[6,41]},"octagonal_sign":{"a":"Octagonal Sign","b":"1F6D1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,6],"o":9},"beginner":{"a":"Japanese Symbol for Beginner","b":"1F530","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["badge","shield"],"k":[27,50]},"flag-gy":{"a":"Guyana Flag","b":"1F1EC-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,25]},"lower_left_paintbrush":{"a":"Lower Left Paintbrush","b":"1F58C-FE0F","c":"1F58C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,30],"o":7},"o":{"a":"Heavy Large Circle","b":"2B55","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["circle","round"],"k":[50,23],"o":5},"palm_tree":{"a":"Palm Tree","b":"1F334","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["plant","vegetable","nature","summer","beach","mojito","tropical"],"k":[6,42]},"anchor":{"a":"Anchor","b":"2693","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ship","ferry","sea","boat"],"k":[48,12],"o":4},"see_no_evil":{"a":"See-No-Evil Monkey","b":"1F648","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["monkey","animal","nature","haha"],"k":[32,43]},"boat":{"a":"Sailboat","b":"26F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[48,43],"n":["sailboat"],"o":5},"white_check_mark":{"a":"White Heavy Check Mark","b":"2705","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["green-square","ok","agree","vote","election","answer","tick"],"k":[49,15]},"flag-hk":{"a":"Hong Kong Sar China Flag","b":"1F1ED-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,26]},"lower_left_crayon":{"a":"Lower Left Crayon","b":"1F58D-FE0F","c":"1F58D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,31],"o":7},"hear_no_evil":{"a":"Hear-No-Evil Monkey","b":"1F649","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","monkey","nature"],"k":[32,44]},"cactus":{"a":"Cactus","b":"1F335","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","plant","nature"],"k":[6,43]},"ear_of_rice":{"a":"Ear of Rice","b":"1F33E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant"],"k":[7,0]},"speak_no_evil":{"a":"Speak-No-Evil Monkey","b":"1F64A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["monkey","animal","nature","omg"],"k":[32,45]},"flag-hm":{"a":"Heard & Mcdonald Islands Flag","b":"1F1ED-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,27]},"ballot_box_with_check":{"a":"Ballot Box with Check","b":"2611-FE0F","c":"2611","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ok","agree","confirm","black-square","vote","election","yes","tick"],"k":[47,22],"o":1},"canoe":{"a":"Canoe","b":"1F6F6","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["boat","paddle","water","ship"],"k":[37,21],"o":9},"memo":{"a":"Memo","b":"1F4DD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["write","documents","stationery","pencil","paper","writing","legal","exam","quiz","test","study","compose"],"k":[26,20],"n":["pencil"]},"herb":{"a":"Herb","b":"1F33F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","plant","medicine","weed","grass","lawn"],"k":[7,1]},"flag-hn":{"a":"Honduras Flag","b":"1F1ED-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,28]},"heavy_check_mark":{"a":"Heavy Check Mark","b":"2714-FE0F","c":"2714","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ok","nike","answer","yes","tick"],"k":[49,44],"o":1},"briefcase":{"a":"Briefcase","b":"1F4BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["business","documents","work","law","legal","job","career"],"k":[25,39]},"speedboat":{"a":"Speedboat","b":"1F6A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ship","transportation","vehicle","summer"],"k":[35,9]},"baby":{"skin_variations":{"1F3FB":{"unified":"1F476-1F3FB","non_qualified":null,"image":"1f476-1f3fb.png","sheet_x":22,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F476-1F3FC","non_qualified":null,"image":"1f476-1f3fc.png","sheet_x":22,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F476-1F3FD","non_qualified":null,"image":"1f476-1f3fd.png","sheet_x":22,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F476-1F3FE","non_qualified":null,"image":"1f476-1f3fe.png","sheet_x":22,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F476-1F3FF","non_qualified":null,"image":"1f476-1f3ff.png","sheet_x":22,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Baby","b":"1F476","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["child","boy","girl","toddler"],"k":[22,10]},"heavy_multiplication_x":{"a":"Heavy Multiplication X","b":"2716-FE0F","c":"2716","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["math","calculation"],"k":[49,45],"o":1},"child":{"skin_variations":{"1F3FB":{"unified":"1F9D2-1F3FB","non_qualified":null,"image":"1f9d2-1f3fb.png","sheet_x":43,"sheet_y":5,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F9D2-1F3FC","non_qualified":null,"image":"1f9d2-1f3fc.png","sheet_x":43,"sheet_y":6,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F9D2-1F3FD","non_qualified":null,"image":"1f9d2-1f3fd.png","sheet_x":43,"sheet_y":7,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F9D2-1F3FE","non_qualified":null,"image":"1f9d2-1f3fe.png","sheet_x":43,"sheet_y":8,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F9D2-1F3FF","non_qualified":null,"image":"1f9d2-1f3ff.png","sheet_x":43,"sheet_y":9,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Child","b":"1F9D2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["gender-neutral","young"],"k":[43,4],"o":10},"shamrock":{"a":"Shamrock","b":"2618-FE0F","c":"2618","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["vegetable","plant","nature","irish","clover"],"k":[47,25],"o":4},"passenger_ship":{"a":"Passenger Ship","b":"1F6F3-FE0F","c":"1F6F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["yacht","cruise","ferry"],"k":[37,18],"o":7},"flag-hr":{"a":"Croatia Flag","b":"1F1ED-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,29]},"file_folder":{"a":"File Folder","b":"1F4C1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["documents","business","office"],"k":[25,44]},"x":{"a":"Cross Mark","b":"274C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["no","delete","remove","cancel"],"k":[50,1]},"four_leaf_clover":{"a":"Four Leaf Clover","b":"1F340","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vegetable","plant","nature","lucky","irish"],"k":[7,2]},"open_file_folder":{"a":"Open File Folder","b":"1F4C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["documents","load"],"k":[25,45]},"boy":{"skin_variations":{"1F3FB":{"unified":"1F466-1F3FB","non_qualified":null,"image":"1f466-1f3fb.png","sheet_x":15,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F466-1F3FC","non_qualified":null,"image":"1f466-1f3fc.png","sheet_x":15,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F466-1F3FD","non_qualified":null,"image":"1f466-1f3fd.png","sheet_x":15,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F466-1F3FE","non_qualified":null,"image":"1f466-1f3fe.png","sheet_x":15,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F466-1F3FF","non_qualified":null,"image":"1f466-1f3ff.png","sheet_x":15,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Boy","b":"1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["man","male","guy","teenager"],"k":[15,42]},"ferry":{"a":"Ferry","b":"26F4-FE0F","c":"26F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["boat","ship","yacht"],"k":[48,42],"o":5},"flag-ht":{"a":"Haiti Flag","b":"1F1ED-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,30]},"girl":{"skin_variations":{"1F3FB":{"unified":"1F467-1F3FB","non_qualified":null,"image":"1f467-1f3fb.png","sheet_x":15,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F467-1F3FC","non_qualified":null,"image":"1f467-1f3fc.png","sheet_x":15,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F467-1F3FD","non_qualified":null,"image":"1f467-1f3fd.png","sheet_x":15,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F467-1F3FE","non_qualified":null,"image":"1f467-1f3fe.png","sheet_x":16,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F467-1F3FF","non_qualified":null,"image":"1f467-1f3ff.png","sheet_x":16,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Girl","b":"1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","woman","teenager"],"k":[15,48]},"negative_squared_cross_mark":{"a":"Negative Squared Cross Mark","b":"274E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["x","green-square","no","deny"],"k":[50,2]},"flag-hu":{"a":"Hungary Flag","b":"1F1ED-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,31]},"card_index_dividers":{"a":"Card Index Dividers","b":"1F5C2-FE0F","c":"1F5C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["organizing","business","stationery"],"k":[30,4],"o":7},"maple_leaf":{"a":"Maple Leaf","b":"1F341","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","vegetable","ca","fall"],"k":[7,3]},"motor_boat":{"a":"Motor Boat","b":"1F6E5-FE0F","c":"1F6E5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["ship"],"k":[37,13],"o":7},"flag-ic":{"a":"Canary Islands Flag","b":"1F1EE-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,32]},"fallen_leaf":{"a":"Fallen Leaf","b":"1F342","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","vegetable","leaves"],"k":[7,4]},"adult":{"skin_variations":{"1F3FB":{"unified":"1F9D1-1F3FB","non_qualified":null,"image":"1f9d1-1f3fb.png","sheet_x":42,"sheet_y":51,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F9D1-1F3FC","non_qualified":null,"image":"1f9d1-1f3fc.png","sheet_x":43,"sheet_y":0,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F9D1-1F3FD","non_qualified":null,"image":"1f9d1-1f3fd.png","sheet_x":43,"sheet_y":1,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F9D1-1F3FE","non_qualified":null,"image":"1f9d1-1f3fe.png","sheet_x":43,"sheet_y":2,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F9D1-1F3FF","non_qualified":null,"image":"1f9d1-1f3ff.png","sheet_x":43,"sheet_y":3,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Adult","b":"1F9D1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["gender-neutral","person"],"k":[42,50],"o":10},"ship":{"a":"Ship","b":"1F6A2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","titanic","deploy"],"k":[34,42]},"heavy_plus_sign":{"a":"Heavy Plus Sign","b":"2795","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["math","calculation","addition","more","increase"],"k":[50,9]},"date":{"a":"Calendar","b":"1F4C5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["calendar","schedule"],"k":[25,48]},"man":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB","non_qualified":null,"image":"1f468-1f3fb.png","sheet_x":18,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F468-1F3FC","non_qualified":null,"image":"1f468-1f3fc.png","sheet_x":18,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F468-1F3FD","non_qualified":null,"image":"1f468-1f3fd.png","sheet_x":18,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F468-1F3FE","non_qualified":null,"image":"1f468-1f3fe.png","sheet_x":18,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F468-1F3FF","non_qualified":null,"image":"1f468-1f3ff.png","sheet_x":18,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Man","b":"1F468","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mustache","father","dad","guy","classy","sir","moustache"],"k":[18,11]},"flag-id":{"a":"Indonesia Flag","b":"1F1EE-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,33]},"leaves":{"a":"Leaf Fluttering in Wind","b":"1F343","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","plant","tree","vegetable","grass","lawn","spring"],"k":[7,5]},"heavy_minus_sign":{"a":"Heavy Minus Sign","b":"2796","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["math","calculation","subtract","less"],"k":[50,10]},"calendar":{"a":"Tear-off Calendar","b":"1F4C6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["schedule","date","planning"],"k":[25,49]},"airplane":{"a":"Airplane","b":"2708-FE0F","c":"2708","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","transportation","flight","fly"],"k":[49,16],"o":1},"spiral_note_pad":{"a":"Spiral Note Pad","b":"1F5D2-FE0F","c":"1F5D2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,8],"o":7},"heavy_division_sign":{"a":"Heavy Division Sign","b":"2797","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["divide","math","calculation"],"k":[50,11]},"small_airplane":{"a":"Small Airplane","b":"1F6E9-FE0F","c":"1F6E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["flight","transportation","fly","vehicle"],"k":[37,14],"o":7},"woman":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB","non_qualified":null,"image":"1f469-1f3fb.png","sheet_x":20,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F469-1F3FC","non_qualified":null,"image":"1f469-1f3fc.png","sheet_x":20,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F469-1F3FD","non_qualified":null,"image":"1f469-1f3fd.png","sheet_x":20,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F469-1F3FE","non_qualified":null,"image":"1f469-1f3fe.png","sheet_x":20,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F469-1F3FF","non_qualified":null,"image":"1f469-1f3ff.png","sheet_x":20,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Woman","b":"1F469","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","girls","lady"],"k":[20,23]},"flag-ie":{"a":"Ireland Flag","b":"1F1EE-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,34]},"curly_loop":{"a":"Curly Loop","b":"27B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["scribble","draw","shape","squiggle"],"k":[50,13]},"flag-il":{"a":"Israel Flag","b":"1F1EE-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,35]},"airplane_departure":{"a":"Airplane Departure","b":"1F6EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,15],"o":7},"spiral_calendar_pad":{"a":"Spiral Calendar Pad","b":"1F5D3-FE0F","c":"1F5D3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,9],"o":7},"older_adult":{"skin_variations":{"1F3FB":{"unified":"1F9D3-1F3FB","non_qualified":null,"image":"1f9d3-1f3fb.png","sheet_x":43,"sheet_y":11,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F9D3-1F3FC","non_qualified":null,"image":"1f9d3-1f3fc.png","sheet_x":43,"sheet_y":12,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F9D3-1F3FD","non_qualified":null,"image":"1f9d3-1f3fd.png","sheet_x":43,"sheet_y":13,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F9D3-1F3FE","non_qualified":null,"image":"1f9d3-1f3fe.png","sheet_x":43,"sheet_y":14,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F9D3-1F3FF","non_qualified":null,"image":"1f9d3-1f3ff.png","sheet_x":43,"sheet_y":15,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Older Adult","b":"1F9D3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["human","elder","senior","gender-neutral"],"k":[43,10],"o":10},"airplane_arriving":{"a":"Airplane Arriving","b":"1F6EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,16],"o":7},"card_index":{"a":"Card Index","b":"1F4C7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["business","stationery"],"k":[25,50]},"loop":{"a":"Double Curly Loop","b":"27BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["tape","cassette"],"k":[50,14]},"older_man":{"skin_variations":{"1F3FB":{"unified":"1F474-1F3FB","non_qualified":null,"image":"1f474-1f3fb.png","sheet_x":21,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F474-1F3FC","non_qualified":null,"image":"1f474-1f3fc.png","sheet_x":22,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F474-1F3FD","non_qualified":null,"image":"1f474-1f3fd.png","sheet_x":22,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F474-1F3FE","non_qualified":null,"image":"1f474-1f3fe.png","sheet_x":22,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F474-1F3FF","non_qualified":null,"image":"1f474-1f3ff.png","sheet_x":22,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Older Man","b":"1F474","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["human","male","men","old","elder","senior"],"k":[21,50]},"flag-im":{"a":"Isle of Man Flag","b":"1F1EE-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,36]},"flag-in":{"a":"India Flag","b":"1F1EE-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,37]},"chart_with_upwards_trend":{"a":"Chart with Upwards Trend","b":"1F4C8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["graph","presentation","stats","recovery","business","economics","money","sales","good","success"],"k":[25,51]},"part_alternation_mark":{"a":"Part Alternation Mark","b":"303D-FE0F","c":"303D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["graph","presentation","stats","business","economics","bad"],"k":[50,25],"o":3},"seat":{"a":"Seat","b":"1F4BA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sit","airplane","transport","bus","flight","fly"],"k":[25,37]},"older_woman":{"skin_variations":{"1F3FB":{"unified":"1F475-1F3FB","non_qualified":null,"image":"1f475-1f3fb.png","sheet_x":22,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F475-1F3FC","non_qualified":null,"image":"1f475-1f3fc.png","sheet_x":22,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F475-1F3FD","non_qualified":null,"image":"1f475-1f3fd.png","sheet_x":22,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F475-1F3FE","non_qualified":null,"image":"1f475-1f3fe.png","sheet_x":22,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F475-1F3FF","non_qualified":null,"image":"1f475-1f3ff.png","sheet_x":22,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Older Woman","b":"1F475","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["human","female","women","lady","old","elder","senior"],"k":[22,4]},"eight_spoked_asterisk":{"a":"Eight Spoked Asterisk","b":"2733-FE0F","c":"2733","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["star","sparkle","green-square"],"k":[49,49],"o":1},"chart_with_downwards_trend":{"a":"Chart with Downwards Trend","b":"1F4C9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["graph","presentation","stats","recession","business","economics","money","sales","bad","failure"],"k":[26,0]},"flag-io":{"a":"British Indian Ocean Territory Flag","b":"1F1EE-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,38]},"male-doctor":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-2695-FE0F","non_qualified":"1F468-1F3FB-200D-2695","image":"1f468-1f3fb-200d-2695-fe0f.png","sheet_x":17,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-2695-FE0F","non_qualified":"1F468-1F3FC-200D-2695","image":"1f468-1f3fc-200d-2695-fe0f.png","sheet_x":17,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-2695-FE0F","non_qualified":"1F468-1F3FD-200D-2695","image":"1f468-1f3fd-200d-2695-fe0f.png","sheet_x":17,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-2695-FE0F","non_qualified":"1F468-1F3FE-200D-2695","image":"1f468-1f3fe-200d-2695-fe0f.png","sheet_x":17,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-2695-FE0F","non_qualified":"1F468-1F3FF-200D-2695","image":"1f468-1f3ff-200d-2695-fe0f.png","sheet_x":17,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Male Doctor","b":"1F468-200D-2695-FE0F","c":"1F468-200D-2695","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,43]},"helicopter":{"a":"Helicopter","b":"1F681","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","fly"],"k":[34,9]},"female-doctor":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-2695-FE0F","non_qualified":"1F469-1F3FB-200D-2695","image":"1f469-1f3fb-200d-2695-fe0f.png","sheet_x":20,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-2695-FE0F","non_qualified":"1F469-1F3FC-200D-2695","image":"1f469-1f3fc-200d-2695-fe0f.png","sheet_x":20,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-2695-FE0F","non_qualified":"1F469-1F3FD-200D-2695","image":"1f469-1f3fd-200d-2695-fe0f.png","sheet_x":20,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-2695-FE0F","non_qualified":"1F469-1F3FE-200D-2695","image":"1f469-1f3fe-200d-2695-fe0f.png","sheet_x":20,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-2695-FE0F","non_qualified":"1F469-1F3FF-200D-2695","image":"1f469-1f3ff-200d-2695-fe0f.png","sheet_x":20,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Doctor","b":"1F469-200D-2695-FE0F","c":"1F469-200D-2695","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,1]},"suspension_railway":{"a":"Suspension Railway","b":"1F69F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["vehicle","transportation"],"k":[34,39]},"bar_chart":{"a":"Bar Chart","b":"1F4CA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["graph","presentation","stats"],"k":[26,1]},"flag-iq":{"a":"Iraq Flag","b":"1F1EE-1F1F6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,39]},"eight_pointed_black_star":{"a":"Eight Pointed Black Star","b":"2734-FE0F","c":"2734","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","shape","polygon"],"k":[49,50],"o":1},"mountain_cableway":{"a":"Mountain Cableway","b":"1F6A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","ski"],"k":[34,40]},"male-student":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F393","non_qualified":null,"image":"1f468-1f3fb-200d-1f393.png","sheet_x":16,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F393","non_qualified":null,"image":"1f468-1f3fc-200d-1f393.png","sheet_x":16,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F393","non_qualified":null,"image":"1f468-1f3fd-200d-1f393.png","sheet_x":16,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F393","non_qualified":null,"image":"1f468-1f3fe-200d-1f393.png","sheet_x":16,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F393","non_qualified":null,"image":"1f468-1f3ff-200d-1f393.png","sheet_x":16,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Student","b":"1F468-200D-1F393","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,14]},"clipboard":{"a":"Clipboard","b":"1F4CB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","documents"],"k":[26,2]},"flag-ir":{"a":"Iran Flag","b":"1F1EE-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,40]},"sparkle":{"a":"Sparkle","b":"2747-FE0F","c":"2747","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stars","green-square","awesome","good","fireworks"],"k":[50,0],"o":1},"female-student":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F393","non_qualified":null,"image":"1f469-1f3fb-200d-1f393.png","sheet_x":18,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F393","non_qualified":null,"image":"1f469-1f3fc-200d-1f393.png","sheet_x":18,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F393","non_qualified":null,"image":"1f469-1f3fd-200d-1f393.png","sheet_x":18,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F393","non_qualified":null,"image":"1f469-1f3fe-200d-1f393.png","sheet_x":18,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F393","non_qualified":null,"image":"1f469-1f3ff-200d-1f393.png","sheet_x":18,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Student","b":"1F469-200D-1F393","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,29]},"pushpin":{"a":"Pushpin","b":"1F4CC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","mark","here"],"k":[26,3]},"aerial_tramway":{"a":"Aerial Tramway","b":"1F6A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["transportation","vehicle","ski"],"k":[34,41]},"flag-is":{"a":"Iceland Flag","b":"1F1EE-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,41]},"bangbang":{"a":"Double Exclamation Mark","b":"203C-FE0F","c":"203C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["exclamation","surprise"],"k":[46,29],"o":1},"interrobang":{"a":"Exclamation Question Mark","b":"2049-FE0F","c":"2049","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wat","punctuation","surprise"],"k":[46,30],"o":3},"satellite":{"a":"Satellite","b":"1F6F0-FE0F","c":"1F6F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["communication","future","radio","space"],"k":[37,17],"o":7},"it":{"a":"Italy Flag","b":"1F1EE-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["italy","flag","nation","country","banner"],"k":[2,42],"n":["flag-it"]},"male-teacher":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F3EB","non_qualified":null,"image":"1f468-1f3fb-200d-1f3eb.png","sheet_x":16,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F3EB","non_qualified":null,"image":"1f468-1f3fc-200d-1f3eb.png","sheet_x":16,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F3EB","non_qualified":null,"image":"1f468-1f3fd-200d-1f3eb.png","sheet_x":16,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F3EB","non_qualified":null,"image":"1f468-1f3fe-200d-1f3eb.png","sheet_x":16,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F3EB","non_qualified":null,"image":"1f468-1f3ff-200d-1f3eb.png","sheet_x":16,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Teacher","b":"1F468-200D-1F3EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,32]},"round_pushpin":{"a":"Round Pushpin","b":"1F4CD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","location","map","here"],"k":[26,4]},"flag-je":{"a":"Jersey Flag","b":"1F1EF-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,43]},"question":{"a":"Black Question Mark Ornament","b":"2753","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["doubt","confused"],"k":[50,3]},"rocket":{"a":"Rocket","b":"1F680","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["launch","ship","staffmode","NASA","outer space","outer_space","fly"],"k":[34,8]},"female-teacher":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F3EB","non_qualified":null,"image":"1f469-1f3fb-200d-1f3eb.png","sheet_x":18,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F3EB","non_qualified":null,"image":"1f469-1f3fc-200d-1f3eb.png","sheet_x":18,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F3EB","non_qualified":null,"image":"1f469-1f3fd-200d-1f3eb.png","sheet_x":18,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F3EB","non_qualified":null,"image":"1f469-1f3fe-200d-1f3eb.png","sheet_x":18,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F3EB","non_qualified":null,"image":"1f469-1f3ff-200d-1f3eb.png","sheet_x":19,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Teacher","b":"1F469-200D-1F3EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,47]},"paperclip":{"a":"Paperclip","b":"1F4CE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["documents","stationery"],"k":[26,5]},"linked_paperclips":{"a":"Linked Paperclips","b":"1F587-FE0F","c":"1F587","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,27],"o":7},"flying_saucer":{"a":"Flying Saucer","b":"1F6F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["transportation","vehicle","ufo"],"k":[37,23],"o":10},"male-judge":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-2696-FE0F","non_qualified":"1F468-1F3FB-200D-2696","image":"1f468-1f3fb-200d-2696-fe0f.png","sheet_x":17,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-2696-FE0F","non_qualified":"1F468-1F3FC-200D-2696","image":"1f468-1f3fc-200d-2696-fe0f.png","sheet_x":17,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-2696-FE0F","non_qualified":"1F468-1F3FD-200D-2696","image":"1f468-1f3fd-200d-2696-fe0f.png","sheet_x":18,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-2696-FE0F","non_qualified":"1F468-1F3FE-200D-2696","image":"1f468-1f3fe-200d-2696-fe0f.png","sheet_x":18,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-2696-FE0F","non_qualified":"1F468-1F3FF-200D-2696","image":"1f468-1f3ff-200d-2696-fe0f.png","sheet_x":18,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Male Judge","b":"1F468-200D-2696-FE0F","c":"1F468-200D-2696","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,49]},"grey_question":{"a":"White Question Mark Ornament","b":"2754","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["doubts","gray","huh","confused"],"k":[50,4]},"flag-jm":{"a":"Jamaica Flag","b":"1F1EF-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,44]},"bellhop_bell":{"a":"Bellhop Bell","b":"1F6CE-FE0F","c":"1F6CE","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["service"],"k":[37,3],"o":7},"straight_ruler":{"a":"Straight Ruler","b":"1F4CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","calculate","length","math","school","drawing","architect","sketch"],"k":[26,6]},"flag-jo":{"a":"Jordan Flag","b":"1F1EF-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,45]},"female-judge":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-2696-FE0F","non_qualified":"1F469-1F3FB-200D-2696","image":"1f469-1f3fb-200d-2696-fe0f.png","sheet_x":20,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-2696-FE0F","non_qualified":"1F469-1F3FC-200D-2696","image":"1f469-1f3fc-200d-2696-fe0f.png","sheet_x":20,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-2696-FE0F","non_qualified":"1F469-1F3FD-200D-2696","image":"1f469-1f3fd-200d-2696-fe0f.png","sheet_x":20,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-2696-FE0F","non_qualified":"1F469-1F3FE-200D-2696","image":"1f469-1f3fe-200d-2696-fe0f.png","sheet_x":20,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-2696-FE0F","non_qualified":"1F469-1F3FF-200D-2696","image":"1f469-1f3ff-200d-2696-fe0f.png","sheet_x":20,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Judge","b":"1F469-200D-2696-FE0F","c":"1F469-200D-2696","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,7]},"grey_exclamation":{"a":"White Exclamation Mark Ornament","b":"2755","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["surprise","punctuation","gray","wow","warning"],"k":[50,5]},"door":{"a":"Door","b":"1F6AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["house","entry","exit"],"k":[35,15]},"male-farmer":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F33E","non_qualified":null,"image":"1f468-1f3fb-200d-1f33e.png","sheet_x":16,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F33E","non_qualified":null,"image":"1f468-1f3fc-200d-1f33e.png","sheet_x":16,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F33E","non_qualified":null,"image":"1f468-1f3fd-200d-1f33e.png","sheet_x":16,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F33E","non_qualified":null,"image":"1f468-1f3fe-200d-1f33e.png","sheet_x":16,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F33E","non_qualified":null,"image":"1f468-1f3ff-200d-1f33e.png","sheet_x":16,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Farmer","b":"1F468-200D-1F33E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,2]},"jp":{"a":"Japan Flag","b":"1F1EF-1F1F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","nation","flag","country","banner"],"k":[2,46],"n":["flag-jp"]},"triangular_ruler":{"a":"Triangular Ruler","b":"1F4D0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","math","architect","sketch"],"k":[26,7]},"exclamation":{"a":"Heavy Exclamation Mark Symbol","b":"2757","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["heavy_exclamation_mark","danger","surprise","punctuation","wow","warning"],"k":[50,6],"n":["heavy_exclamation_mark"],"o":5},"bed":{"a":"Bed","b":"1F6CF-FE0F","c":"1F6CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sleep","rest"],"k":[37,4],"o":7},"female-farmer":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F33E","non_qualified":null,"image":"1f469-1f3fb-200d-1f33e.png","sheet_x":18,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F33E","non_qualified":null,"image":"1f469-1f3fc-200d-1f33e.png","sheet_x":18,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F33E","non_qualified":null,"image":"1f469-1f3fd-200d-1f33e.png","sheet_x":18,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F33E","non_qualified":null,"image":"1f469-1f3fe-200d-1f33e.png","sheet_x":18,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F33E","non_qualified":null,"image":"1f469-1f3ff-200d-1f33e.png","sheet_x":18,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Farmer","b":"1F469-200D-1F33E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,17]},"scissors":{"a":"Black Scissors","b":"2702-FE0F","c":"2702","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["stationery","cut"],"k":[49,14],"o":1},"wavy_dash":{"a":"Wavy Dash","b":"3030-FE0F","c":"3030","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["draw","line","moustache","mustache","squiggle","scribble"],"k":[50,24],"o":1},"flag-ke":{"a":"Kenya Flag","b":"1F1F0-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,47]},"flag-kg":{"a":"Kyrgyzstan Flag","b":"1F1F0-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,48]},"couch_and_lamp":{"a":"Couch and Lamp","b":"1F6CB-FE0F","c":"1F6CB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["read","chill"],"k":[36,47],"o":7},"male-cook":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F373","non_qualified":null,"image":"1f468-1f3fb-200d-1f373.png","sheet_x":16,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F373","non_qualified":null,"image":"1f468-1f3fc-200d-1f373.png","sheet_x":16,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F373","non_qualified":null,"image":"1f468-1f3fd-200d-1f373.png","sheet_x":16,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F373","non_qualified":null,"image":"1f468-1f3fe-200d-1f373.png","sheet_x":16,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F373","non_qualified":null,"image":"1f468-1f3ff-200d-1f373.png","sheet_x":16,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Cook","b":"1F468-200D-1F373","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,8]},"card_file_box":{"a":"Card File Box","b":"1F5C3-FE0F","c":"1F5C3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["business","stationery"],"k":[30,5],"o":7},"copyright":{"a":"Copyright Sign","b":"00A9-FE0F","c":"00A9","d":true,"e":true,"f":false,"g":true,"h":false,"i":false,"j":["ip","license","circle","law","legal"],"k":[0,12],"o":1},"file_cabinet":{"a":"File Cabinet","b":"1F5C4-FE0F","c":"1F5C4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["filing","organizing"],"k":[30,6],"o":7},"registered":{"a":"Registered Sign","b":"00AE-FE0F","c":"00AE","d":true,"e":true,"f":false,"g":true,"h":false,"i":false,"j":["alphabet","circle"],"k":[0,13],"o":1},"flag-kh":{"a":"Cambodia Flag","b":"1F1F0-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,49]},"female-cook":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F373","non_qualified":null,"image":"1f469-1f3fb-200d-1f373.png","sheet_x":18,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F373","non_qualified":null,"image":"1f469-1f3fc-200d-1f373.png","sheet_x":18,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F373","non_qualified":null,"image":"1f469-1f3fd-200d-1f373.png","sheet_x":18,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F373","non_qualified":null,"image":"1f469-1f3fe-200d-1f373.png","sheet_x":18,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F373","non_qualified":null,"image":"1f469-1f3ff-200d-1f373.png","sheet_x":18,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Cook","b":"1F469-200D-1F373","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,23]},"toilet":{"a":"Toilet","b":"1F6BD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["restroom","wc","washroom","bathroom","potty"],"k":[36,33]},"wastebasket":{"a":"Wastebasket","b":"1F5D1-FE0F","c":"1F5D1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["bin","trash","rubbish","garbage","toss"],"k":[30,7],"o":7},"flag-ki":{"a":"Kiribati Flag","b":"1F1F0-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,50]},"shower":{"a":"Shower","b":"1F6BF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clean","water","bathroom"],"k":[36,35]},"male-mechanic":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F527","non_qualified":null,"image":"1f468-1f3fb-200d-1f527.png","sheet_x":17,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F527","non_qualified":null,"image":"1f468-1f3fc-200d-1f527.png","sheet_x":17,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F527","non_qualified":null,"image":"1f468-1f3fd-200d-1f527.png","sheet_x":17,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F527","non_qualified":null,"image":"1f468-1f3fe-200d-1f527.png","sheet_x":17,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F527","non_qualified":null,"image":"1f468-1f3ff-200d-1f527.png","sheet_x":17,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Mechanic","b":"1F468-200D-1F527","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,19]},"tm":{"a":"Trade Mark Sign","b":"2122-FE0F","c":"2122","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["trademark","brand","law","legal"],"k":[46,31],"o":1},"hash":{"a":"Hash Key","b":"0023-FE0F-20E3","c":"0023-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["symbol","blue-square","twitter"],"k":[0,0],"o":3},"flag-km":{"a":"Comoros Flag","b":"1F1F0-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[2,51]},"bathtub":{"a":"Bathtub","b":"1F6C1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clean","shower","bathroom"],"k":[36,42]},"female-mechanic":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F527","non_qualified":null,"image":"1f469-1f3fb-200d-1f527.png","sheet_x":19,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F527","non_qualified":null,"image":"1f469-1f3fc-200d-1f527.png","sheet_x":19,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F527","non_qualified":null,"image":"1f469-1f3fd-200d-1f527.png","sheet_x":19,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F527","non_qualified":null,"image":"1f469-1f3fe-200d-1f527.png","sheet_x":19,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F527","non_qualified":null,"image":"1f469-1f3ff-200d-1f527.png","sheet_x":19,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Mechanic","b":"1F469-200D-1F527","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,29]},"lock":{"a":"Lock","b":"1F512","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["security","password","padlock"],"k":[27,20]},"male-factory-worker":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F3ED","non_qualified":null,"image":"1f468-1f3fb-200d-1f3ed.png","sheet_x":16,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F3ED","non_qualified":null,"image":"1f468-1f3fc-200d-1f3ed.png","sheet_x":16,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F3ED","non_qualified":null,"image":"1f468-1f3fd-200d-1f3ed.png","sheet_x":16,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F3ED","non_qualified":null,"image":"1f468-1f3fe-200d-1f3ed.png","sheet_x":16,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F3ED","non_qualified":null,"image":"1f468-1f3ff-200d-1f3ed.png","sheet_x":16,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Factory Worker","b":"1F468-200D-1F3ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,38]},"flag-kn":{"a":"St. Kitts & Nevis Flag","b":"1F1F0-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,0]},"hourglass":{"a":"Hourglass","b":"231B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","clock","oldschool","limit","exam","quiz","test"],"k":[46,42],"o":1},"keycap_star":{"a":"Keycap Star","b":"002A-FE0F-20E3","c":"002A-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[0,1],"o":3},"unlock":{"a":"Open Lock","b":"1F513","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["privacy","security"],"k":[27,21]},"flag-kp":{"a":"North Korea Flag","b":"1F1F0-1F1F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,1]},"female-factory-worker":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F3ED","non_qualified":null,"image":"1f469-1f3fb-200d-1f3ed.png","sheet_x":19,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F3ED","non_qualified":null,"image":"1f469-1f3fc-200d-1f3ed.png","sheet_x":19,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F3ED","non_qualified":null,"image":"1f469-1f3fd-200d-1f3ed.png","sheet_x":19,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F3ED","non_qualified":null,"image":"1f469-1f3fe-200d-1f3ed.png","sheet_x":19,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F3ED","non_qualified":null,"image":"1f469-1f3ff-200d-1f3ed.png","sheet_x":19,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Factory Worker","b":"1F469-200D-1F3ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,1]},"zero":{"a":"Keycap 0","b":"0030-FE0F-20E3","c":"0030-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["0","numbers","blue-square","null"],"k":[0,2],"o":3},"lock_with_ink_pen":{"a":"Lock with Ink Pen","b":"1F50F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["security","secret"],"k":[27,17]},"hourglass_flowing_sand":{"a":"Hourglass with Flowing Sand","b":"23F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["oldschool","time","countdown"],"k":[47,3]},"one":{"a":"Keycap 1","b":"0031-FE0F-20E3","c":"0031-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["blue-square","numbers","1"],"k":[0,3],"o":3},"kr":{"a":"South Korea Flag","b":"1F1F0-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["south","korea","nation","flag","country","banner"],"k":[3,2],"n":["flag-kr"]},"watch":{"a":"Watch","b":"231A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","accessories"],"k":[46,41],"o":1},"male-office-worker":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F4BC","non_qualified":null,"image":"1f468-1f3fb-200d-1f4bc.png","sheet_x":17,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F4BC","non_qualified":null,"image":"1f468-1f3fc-200d-1f4bc.png","sheet_x":17,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F4BC","non_qualified":null,"image":"1f468-1f3fd-200d-1f4bc.png","sheet_x":17,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F4BC","non_qualified":null,"image":"1f468-1f3fe-200d-1f4bc.png","sheet_x":17,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F4BC","non_qualified":null,"image":"1f468-1f3ff-200d-1f4bc.png","sheet_x":17,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Office Worker","b":"1F468-200D-1F4BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,13]},"closed_lock_with_key":{"a":"Closed Lock with Key","b":"1F510","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["security","privacy"],"k":[27,18]},"female-office-worker":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F4BC","non_qualified":null,"image":"1f469-1f3fb-200d-1f4bc.png","sheet_x":19,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F4BC","non_qualified":null,"image":"1f469-1f3fc-200d-1f4bc.png","sheet_x":19,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F4BC","non_qualified":null,"image":"1f469-1f3fd-200d-1f4bc.png","sheet_x":19,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F4BC","non_qualified":null,"image":"1f469-1f3fe-200d-1f4bc.png","sheet_x":19,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F4BC","non_qualified":null,"image":"1f469-1f3ff-200d-1f4bc.png","sheet_x":19,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Office Worker","b":"1F469-200D-1F4BC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,23]},"two":{"a":"Keycap 2","b":"0032-FE0F-20E3","c":"0032-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["numbers","2","prime","blue-square"],"k":[0,4],"o":3},"alarm_clock":{"a":"Alarm Clock","b":"23F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","wake"],"k":[47,0]},"key":{"a":"Key","b":"1F511","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["lock","door","password"],"k":[27,19]},"flag-kw":{"a":"Kuwait Flag","b":"1F1F0-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,3]},"stopwatch":{"a":"Stopwatch","b":"23F1-FE0F","c":"23F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["time","deadline"],"k":[47,1]},"male-scientist":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F52C","non_qualified":null,"image":"1f468-1f3fb-200d-1f52c.png","sheet_x":17,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F52C","non_qualified":null,"image":"1f468-1f3fc-200d-1f52c.png","sheet_x":17,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F52C","non_qualified":null,"image":"1f468-1f3fd-200d-1f52c.png","sheet_x":17,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F52C","non_qualified":null,"image":"1f468-1f3fe-200d-1f52c.png","sheet_x":17,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F52C","non_qualified":null,"image":"1f468-1f3ff-200d-1f52c.png","sheet_x":17,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Scientist","b":"1F468-200D-1F52C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,25]},"three":{"a":"Keycap 3","b":"0033-FE0F-20E3","c":"0033-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["3","numbers","prime","blue-square"],"k":[0,5],"o":3},"flag-ky":{"a":"Cayman Islands Flag","b":"1F1F0-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,4]},"old_key":{"a":"Old Key","b":"1F5DD-FE0F","c":"1F5DD","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["lock","door","password"],"k":[30,11],"o":7},"flag-kz":{"a":"Kazakhstan Flag","b":"1F1F0-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,5]},"hammer":{"a":"Hammer","b":"1F528","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["tools","build","create"],"k":[27,42]},"female-scientist":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F52C","non_qualified":null,"image":"1f469-1f3fb-200d-1f52c.png","sheet_x":19,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F52C","non_qualified":null,"image":"1f469-1f3fc-200d-1f52c.png","sheet_x":19,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F52C","non_qualified":null,"image":"1f469-1f3fd-200d-1f52c.png","sheet_x":19,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F52C","non_qualified":null,"image":"1f469-1f3fe-200d-1f52c.png","sheet_x":19,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F52C","non_qualified":null,"image":"1f469-1f3ff-200d-1f52c.png","sheet_x":19,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Scientist","b":"1F469-200D-1F52C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,35]},"timer_clock":{"a":"Timer Clock","b":"23F2-FE0F","c":"23F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["alarm"],"k":[47,2]},"four":{"a":"Keycap 4","b":"0034-FE0F-20E3","c":"0034-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["4","numbers","blue-square"],"k":[0,6],"o":3},"male-technologist":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F4BB","non_qualified":null,"image":"1f468-1f3fb-200d-1f4bb.png","sheet_x":17,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F4BB","non_qualified":null,"image":"1f468-1f3fc-200d-1f4bb.png","sheet_x":17,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F4BB","non_qualified":null,"image":"1f468-1f3fd-200d-1f4bb.png","sheet_x":17,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F4BB","non_qualified":null,"image":"1f468-1f3fe-200d-1f4bb.png","sheet_x":17,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F4BB","non_qualified":null,"image":"1f468-1f3ff-200d-1f4bb.png","sheet_x":17,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Technologist","b":"1F468-200D-1F4BB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,7]},"mantelpiece_clock":{"a":"Mantelpiece Clock","b":"1F570-FE0F","c":"1F570","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["time"],"k":[28,43],"o":7},"five":{"a":"Keycap 5","b":"0035-FE0F-20E3","c":"0035-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["5","numbers","blue-square","prime"],"k":[0,7],"o":3},"flag-la":{"a":"Laos Flag","b":"1F1F1-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,6]},"pick":{"a":"Pick","b":"26CF-FE0F","c":"26CF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["tools","dig"],"k":[48,32],"o":5},"flag-lb":{"a":"Lebanon Flag","b":"1F1F1-1F1E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,7]},"clock12":{"a":"Clock Face Twelve Oclock","b":"1F55B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","noon","midnight","midday","late","early","schedule"],"k":[28,29]},"hammer_and_pick":{"a":"Hammer and Pick","b":"2692-FE0F","c":"2692","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["tools","build","create"],"k":[48,11],"o":4},"six":{"a":"Keycap 6","b":"0036-FE0F-20E3","c":"0036-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["6","numbers","blue-square"],"k":[0,8],"o":3},"female-technologist":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F4BB","non_qualified":null,"image":"1f469-1f3fb-200d-1f4bb.png","sheet_x":19,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F4BB","non_qualified":null,"image":"1f469-1f3fc-200d-1f4bb.png","sheet_x":19,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F4BB","non_qualified":null,"image":"1f469-1f3fd-200d-1f4bb.png","sheet_x":19,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F4BB","non_qualified":null,"image":"1f469-1f3fe-200d-1f4bb.png","sheet_x":19,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F4BB","non_qualified":null,"image":"1f469-1f3ff-200d-1f4bb.png","sheet_x":19,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Technologist","b":"1F469-200D-1F4BB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,17]},"hammer_and_wrench":{"a":"Hammer and Wrench","b":"1F6E0-FE0F","c":"1F6E0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["tools","build","create"],"k":[37,8],"o":7},"flag-lc":{"a":"St. Lucia Flag","b":"1F1F1-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,8]},"clock1230":{"a":"Clock Face Twelve-Thirty","b":"1F567","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,41]},"seven":{"a":"Keycap 7","b":"0037-FE0F-20E3","c":"0037-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["7","numbers","blue-square","prime"],"k":[0,9],"o":3},"male-singer":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F3A4","non_qualified":null,"image":"1f468-1f3fb-200d-1f3a4.png","sheet_x":16,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F3A4","non_qualified":null,"image":"1f468-1f3fc-200d-1f3a4.png","sheet_x":16,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F3A4","non_qualified":null,"image":"1f468-1f3fd-200d-1f3a4.png","sheet_x":16,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F3A4","non_qualified":null,"image":"1f468-1f3fe-200d-1f3a4.png","sheet_x":16,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F3A4","non_qualified":null,"image":"1f468-1f3ff-200d-1f3a4.png","sheet_x":16,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Singer","b":"1F468-200D-1F3A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,20]},"eight":{"a":"Keycap 8","b":"0038-FE0F-20E3","c":"0038-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["8","blue-square","numbers"],"k":[0,10],"o":3},"flag-li":{"a":"Liechtenstein Flag","b":"1F1F1-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,9]},"dagger_knife":{"a":"Dagger Knife","b":"1F5E1-FE0F","c":"1F5E1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,13],"o":7},"clock1":{"a":"Clock Face One Oclock","b":"1F550","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,18]},"female-singer":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F3A4","non_qualified":null,"image":"1f469-1f3fb-200d-1f3a4.png","sheet_x":18,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F3A4","non_qualified":null,"image":"1f469-1f3fc-200d-1f3a4.png","sheet_x":18,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F3A4","non_qualified":null,"image":"1f469-1f3fd-200d-1f3a4.png","sheet_x":18,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F3A4","non_qualified":null,"image":"1f469-1f3fe-200d-1f3a4.png","sheet_x":18,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F3A4","non_qualified":null,"image":"1f469-1f3ff-200d-1f3a4.png","sheet_x":18,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Singer","b":"1F469-200D-1F3A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,35]},"male-artist":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F3A8","non_qualified":null,"image":"1f468-1f3fb-200d-1f3a8.png","sheet_x":16,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F3A8","non_qualified":null,"image":"1f468-1f3fc-200d-1f3a8.png","sheet_x":16,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F3A8","non_qualified":null,"image":"1f468-1f3fd-200d-1f3a8.png","sheet_x":16,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F3A8","non_qualified":null,"image":"1f468-1f3fe-200d-1f3a8.png","sheet_x":16,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F3A8","non_qualified":null,"image":"1f468-1f3ff-200d-1f3a8.png","sheet_x":16,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Artist","b":"1F468-200D-1F3A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,26]},"crossed_swords":{"a":"Crossed Swords","b":"2694-FE0F","c":"2694","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["weapon"],"k":[48,13],"o":4},"nine":{"a":"Keycap 9","b":"0039-FE0F-20E3","c":"0039-20E3","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"j":["blue-square","numbers","9"],"k":[0,11],"o":3},"flag-lk":{"a":"Sri Lanka Flag","b":"1F1F1-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,10]},"clock130":{"a":"Clock Face One-Thirty","b":"1F55C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,30]},"clock2":{"a":"Clock Face Two Oclock","b":"1F551","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,19]},"gun":{"a":"Pistol","b":"1F52B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["violence","weapon","pistol","revolver"],"k":[27,45]},"keycap_ten":{"a":"Keycap Ten","b":"1F51F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["numbers","10","blue-square"],"k":[27,33]},"female-artist":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F3A8","non_qualified":null,"image":"1f469-1f3fb-200d-1f3a8.png","sheet_x":18,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F3A8","non_qualified":null,"image":"1f469-1f3fc-200d-1f3a8.png","sheet_x":18,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F3A8","non_qualified":null,"image":"1f469-1f3fd-200d-1f3a8.png","sheet_x":18,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F3A8","non_qualified":null,"image":"1f469-1f3fe-200d-1f3a8.png","sheet_x":18,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F3A8","non_qualified":null,"image":"1f469-1f3ff-200d-1f3a8.png","sheet_x":18,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Artist","b":"1F469-200D-1F3A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,41]},"flag-lr":{"a":"Liberia Flag","b":"1F1F1-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,11]},"clock230":{"a":"Clock Face Two-Thirty","b":"1F55D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,31]},"bow_and_arrow":{"a":"Bow and Arrow","b":"1F3F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports"],"k":[12,23],"o":8},"male-pilot":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-2708-FE0F","non_qualified":"1F468-1F3FB-200D-2708","image":"1f468-1f3fb-200d-2708-fe0f.png","sheet_x":18,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-2708-FE0F","non_qualified":"1F468-1F3FC-200D-2708","image":"1f468-1f3fc-200d-2708-fe0f.png","sheet_x":18,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-2708-FE0F","non_qualified":"1F468-1F3FD-200D-2708","image":"1f468-1f3fd-200d-2708-fe0f.png","sheet_x":18,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-2708-FE0F","non_qualified":"1F468-1F3FE-200D-2708","image":"1f468-1f3fe-200d-2708-fe0f.png","sheet_x":18,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-2708-FE0F","non_qualified":"1F468-1F3FF-200D-2708","image":"1f468-1f3ff-200d-2708-fe0f.png","sheet_x":18,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Male Pilot","b":"1F468-200D-2708-FE0F","c":"1F468-200D-2708","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[18,3]},"flag-ls":{"a":"Lesotho Flag","b":"1F1F1-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,12]},"flag-lt":{"a":"Lithuania Flag","b":"1F1F1-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,13]},"capital_abcd":{"a":"Input Symbol for Latin Capital Letters","b":"1F520","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","words","blue-square"],"k":[27,34]},"female-pilot":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-2708-FE0F","non_qualified":"1F469-1F3FB-200D-2708","image":"1f469-1f3fb-200d-2708-fe0f.png","sheet_x":20,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-2708-FE0F","non_qualified":"1F469-1F3FC-200D-2708","image":"1f469-1f3fc-200d-2708-fe0f.png","sheet_x":20,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-2708-FE0F","non_qualified":"1F469-1F3FD-200D-2708","image":"1f469-1f3fd-200d-2708-fe0f.png","sheet_x":20,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-2708-FE0F","non_qualified":"1F469-1F3FE-200D-2708","image":"1f469-1f3fe-200d-2708-fe0f.png","sheet_x":20,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-2708-FE0F","non_qualified":"1F469-1F3FF-200D-2708","image":"1f469-1f3ff-200d-2708-fe0f.png","sheet_x":20,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Pilot","b":"1F469-200D-2708-FE0F","c":"1F469-200D-2708","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,13]},"clock3":{"a":"Clock Face Three Oclock","b":"1F552","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,20]},"shield":{"a":"Shield","b":"1F6E1-FE0F","c":"1F6E1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["protection","security"],"k":[37,9],"o":7},"male-astronaut":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F680","non_qualified":null,"image":"1f468-1f3fb-200d-1f680.png","sheet_x":17,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F680","non_qualified":null,"image":"1f468-1f3fc-200d-1f680.png","sheet_x":17,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F680","non_qualified":null,"image":"1f468-1f3fd-200d-1f680.png","sheet_x":17,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F680","non_qualified":null,"image":"1f468-1f3fe-200d-1f680.png","sheet_x":17,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F680","non_qualified":null,"image":"1f468-1f3ff-200d-1f680.png","sheet_x":17,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Astronaut","b":"1F468-200D-1F680","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,31]},"abcd":{"a":"Input Symbol for Latin Small Letters","b":"1F521","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","alphabet"],"k":[27,35]},"clock330":{"a":"Clock Face Three-Thirty","b":"1F55E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,32]},"flag-lu":{"a":"Luxembourg Flag","b":"1F1F1-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,14]},"wrench":{"a":"Wrench","b":"1F527","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["tools","diy","ikea","fix","maintainer"],"k":[27,41]},"nut_and_bolt":{"a":"Nut and Bolt","b":"1F529","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["handy","tools","fix"],"k":[27,43]},"clock4":{"a":"Clock Face Four Oclock","b":"1F553","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,21]},"female-astronaut":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F680","non_qualified":null,"image":"1f469-1f3fb-200d-1f680.png","sheet_x":19,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F680","non_qualified":null,"image":"1f469-1f3fc-200d-1f680.png","sheet_x":19,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F680","non_qualified":null,"image":"1f469-1f3fd-200d-1f680.png","sheet_x":19,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F680","non_qualified":null,"image":"1f469-1f3fe-200d-1f680.png","sheet_x":19,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F680","non_qualified":null,"image":"1f469-1f3ff-200d-1f680.png","sheet_x":19,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Astronaut","b":"1F469-200D-1F680","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,41]},"flag-lv":{"a":"Latvia Flag","b":"1F1F1-1F1FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,15]},"gear":{"a":"Gear","b":"2699-FE0F","c":"2699","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["cog"],"k":[48,17],"o":4},"male-firefighter":{"skin_variations":{"1F3FB":{"unified":"1F468-1F3FB-200D-1F692","non_qualified":null,"image":"1f468-1f3fb-200d-1f692.png","sheet_x":17,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F468-1F3FC-200D-1F692","non_qualified":null,"image":"1f468-1f3fc-200d-1f692.png","sheet_x":17,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F468-1F3FD-200D-1F692","non_qualified":null,"image":"1f468-1f3fd-200d-1f692.png","sheet_x":17,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F468-1F3FE-200D-1F692","non_qualified":null,"image":"1f468-1f3fe-200d-1f692.png","sheet_x":17,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F468-1F3FF-200D-1F692","non_qualified":null,"image":"1f468-1f3ff-200d-1f692.png","sheet_x":17,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Male Firefighter","b":"1F468-200D-1F692","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[17,37]},"flag-ly":{"a":"Libya Flag","b":"1F1F1-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,16]},"symbols":{"a":"Input Symbol for Symbols","b":"1F523","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","music","note","ampersand","percent","glyphs","characters"],"k":[27,37]},"clock430":{"a":"Clock Face Four-Thirty","b":"1F55F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,33]},"flag-ma":{"a":"Morocco Flag","b":"1F1F2-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,17]},"compression":{"a":"Compression","b":"1F5DC-FE0F","c":"1F5DC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,10],"o":7},"female-firefighter":{"skin_variations":{"1F3FB":{"unified":"1F469-1F3FB-200D-1F692","non_qualified":null,"image":"1f469-1f3fb-200d-1f692.png","sheet_x":19,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F469-1F3FC-200D-1F692","non_qualified":null,"image":"1f469-1f3fc-200d-1f692.png","sheet_x":19,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F469-1F3FD-200D-1F692","non_qualified":null,"image":"1f469-1f3fd-200d-1f692.png","sheet_x":19,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F469-1F3FE-200D-1F692","non_qualified":null,"image":"1f469-1f3fe-200d-1f692.png","sheet_x":19,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F469-1F3FF-200D-1F692","non_qualified":null,"image":"1f469-1f3ff-200d-1f692.png","sheet_x":20,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Female Firefighter","b":"1F469-200D-1F692","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,47]},"abc":{"a":"Input Symbol for Latin Letters","b":"1F524","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","alphabet"],"k":[27,38]},"clock5":{"a":"Clock Face Five Oclock","b":"1F554","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,22]},"clock530":{"a":"Clock Face Five-Thirty","b":"1F560","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,34]},"a":{"a":"Negative Squared Latin Capital Letter a","b":"1F170-FE0F","c":"1F170","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red-square","alphabet","letter"],"k":[0,16]},"alembic":{"a":"Alembic","b":"2697-FE0F","c":"2697","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["distilling","science","experiment","chemistry"],"k":[48,16],"o":4},"flag-mc":{"a":"Monaco Flag","b":"1F1F2-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,18]},"cop":{"skin_variations":{"1F3FB":{"unified":"1F46E-1F3FB","non_qualified":null,"image":"1f46e-1f3fb.png","sheet_x":20,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F46E-1F3FC","non_qualified":null,"image":"1f46e-1f3fc.png","sheet_x":20,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F46E-1F3FD","non_qualified":null,"image":"1f46e-1f3fd.png","sheet_x":20,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F46E-1F3FE","non_qualified":null,"image":"1f46e-1f3fe.png","sheet_x":20,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F46E-1F3FF","non_qualified":null,"image":"1f46e-1f3ff.png","sheet_x":20,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F46E-200D-2642-FE0F","a":"Police Officer","b":"1F46E","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[20,45]},"scales":{"a":"Scales","b":"2696-FE0F","c":"2696","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[48,15],"o":4},"clock6":{"a":"Clock Face Six Oclock","b":"1F555","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule","dawn","dusk"],"k":[28,23]},"flag-md":{"a":"Moldova Flag","b":"1F1F2-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,19]},"ab":{"a":"Negative Squared Ab","b":"1F18E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red-square","alphabet"],"k":[0,20]},"male-police-officer":{"skin_variations":{"1F3FB":{"unified":"1F46E-1F3FB-200D-2642-FE0F","non_qualified":"1F46E-1F3FB-200D-2642","image":"1f46e-1f3fb-200d-2642-fe0f.png","sheet_x":20,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F46E-1F3FC-200D-2642-FE0F","non_qualified":"1F46E-1F3FC-200D-2642","image":"1f46e-1f3fc-200d-2642-fe0f.png","sheet_x":20,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F46E-1F3FD-200D-2642-FE0F","non_qualified":"1F46E-1F3FD-200D-2642","image":"1f46e-1f3fd-200d-2642-fe0f.png","sheet_x":20,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F46E-1F3FE-200D-2642-FE0F","non_qualified":"1F46E-1F3FE-200D-2642","image":"1f46e-1f3fe-200d-2642-fe0f.png","sheet_x":20,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F46E-1F3FF-200D-2642-FE0F","non_qualified":"1F46E-1F3FF-200D-2642","image":"1f46e-1f3ff-200d-2642-fe0f.png","sheet_x":20,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F46E","a":"Male Police Officer","b":"1F46E-200D-2642-FE0F","c":"1F46E-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,39]},"link":{"a":"Link Symbol","b":"1F517","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["rings","url"],"k":[27,25]},"flag-me":{"a":"Montenegro Flag","b":"1F1F2-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,20]},"clock630":{"a":"Clock Face Six-Thirty","b":"1F561","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,35]},"b":{"a":"Negative Squared Latin Capital Letter B","b":"1F171-FE0F","c":"1F171","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["red-square","alphabet","letter"],"k":[0,17]},"female-police-officer":{"skin_variations":{"1F3FB":{"unified":"1F46E-1F3FB-200D-2640-FE0F","non_qualified":"1F46E-1F3FB-200D-2640","image":"1f46e-1f3fb-200d-2640-fe0f.png","sheet_x":20,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F46E-1F3FC-200D-2640-FE0F","non_qualified":"1F46E-1F3FC-200D-2640","image":"1f46e-1f3fc-200d-2640-fe0f.png","sheet_x":20,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F46E-1F3FD-200D-2640-FE0F","non_qualified":"1F46E-1F3FD-200D-2640","image":"1f46e-1f3fd-200d-2640-fe0f.png","sheet_x":20,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F46E-1F3FE-200D-2640-FE0F","non_qualified":"1F46E-1F3FE-200D-2640","image":"1f46e-1f3fe-200d-2640-fe0f.png","sheet_x":20,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F46E-1F3FF-200D-2640-FE0F","non_qualified":"1F46E-1F3FF-200D-2640","image":"1f46e-1f3ff-200d-2640-fe0f.png","sheet_x":20,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Police Officer","b":"1F46E-200D-2640-FE0F","c":"1F46E-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,33]},"clock7":{"a":"Clock Face Seven Oclock","b":"1F556","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,24]},"cl":{"a":"Squared Cl","b":"1F191","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","words","red-square"],"k":[0,21]},"sleuth_or_spy":{"skin_variations":{"1F3FB":{"unified":"1F575-1F3FB","non_qualified":null,"image":"1f575-1f3fb.png","sheet_x":29,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F575-1F3FC","non_qualified":null,"image":"1f575-1f3fc.png","sheet_x":29,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F575-1F3FD","non_qualified":null,"image":"1f575-1f3fd.png","sheet_x":29,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F575-1F3FE","non_qualified":null,"image":"1f575-1f3fe.png","sheet_x":29,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F575-1F3FF","non_qualified":null,"image":"1f575-1f3ff.png","sheet_x":29,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoleted_by":"1F575-FE0F-200D-2642-FE0F","a":"Sleuth or Spy","b":"1F575-FE0F","c":"1F575","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[29,11],"o":7},"flag-mf":{"a":"St. Martin Flag","b":"1F1F2-1F1EB","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[3,21]},"chains":{"a":"Chains","b":"26D3-FE0F","c":"26D3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["lock","arrest"],"k":[48,34],"o":5},"syringe":{"a":"Syringe","b":"1F489","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["health","hospital","drugs","blood","medicine","needle","doctor","nurse"],"k":[24,35]},"male-detective":{"skin_variations":{"1F3FB":{"unified":"1F575-1F3FB-200D-2642-FE0F","non_qualified":"1F575-1F3FB-200D-2642","image":"1f575-1f3fb-200d-2642-fe0f.png","sheet_x":29,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F575-1F3FC-200D-2642-FE0F","non_qualified":"1F575-1F3FC-200D-2642","image":"1f575-1f3fc-200d-2642-fe0f.png","sheet_x":29,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F575-1F3FD-200D-2642-FE0F","non_qualified":"1F575-1F3FD-200D-2642","image":"1f575-1f3fd-200d-2642-fe0f.png","sheet_x":29,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F575-1F3FE-200D-2642-FE0F","non_qualified":"1F575-1F3FE-200D-2642","image":"1f575-1f3fe-200d-2642-fe0f.png","sheet_x":29,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F575-1F3FF-200D-2642-FE0F","non_qualified":"1F575-1F3FF-200D-2642","image":"1f575-1f3ff-200d-2642-fe0f.png","sheet_x":29,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F575-FE0F","a":"Male Detective","b":"1F575-FE0F-200D-2642-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[29,5],"o":7},"cool":{"a":"Squared Cool","b":"1F192","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","blue-square"],"k":[0,22]},"clock730":{"a":"Clock Face Seven-Thirty","b":"1F562","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,36]},"flag-mg":{"a":"Madagascar Flag","b":"1F1F2-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,22]},"free":{"a":"Squared Free","b":"1F193","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","words"],"k":[0,23]},"flag-mh":{"a":"Marshall Islands Flag","b":"1F1F2-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,23]},"clock8":{"a":"Clock Face Eight Oclock","b":"1F557","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,25]},"pill":{"a":"Pill","b":"1F48A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["health","medicine","doctor","pharmacy","drug"],"k":[24,36]},"female-detective":{"skin_variations":{"1F3FB":{"unified":"1F575-1F3FB-200D-2640-FE0F","non_qualified":"1F575-1F3FB-200D-2640","image":"1f575-1f3fb-200d-2640-fe0f.png","sheet_x":29,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F575-1F3FC-200D-2640-FE0F","non_qualified":"1F575-1F3FC-200D-2640","image":"1f575-1f3fc-200d-2640-fe0f.png","sheet_x":29,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F575-1F3FD-200D-2640-FE0F","non_qualified":"1F575-1F3FD-200D-2640","image":"1f575-1f3fd-200d-2640-fe0f.png","sheet_x":29,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F575-1F3FE-200D-2640-FE0F","non_qualified":"1F575-1F3FE-200D-2640","image":"1f575-1f3fe-200d-2640-fe0f.png","sheet_x":29,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F575-1F3FF-200D-2640-FE0F","non_qualified":"1F575-1F3FF-200D-2640","image":"1f575-1f3ff-200d-2640-fe0f.png","sheet_x":29,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Detective","b":"1F575-FE0F-200D-2640-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[28,51],"o":7},"clock830":{"a":"Clock Face Eight-Thirty","b":"1F563","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,37]},"guardsman":{"skin_variations":{"1F3FB":{"unified":"1F482-1F3FB","non_qualified":null,"image":"1f482-1f3fb.png","sheet_x":23,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F482-1F3FC","non_qualified":null,"image":"1f482-1f3fc.png","sheet_x":23,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F482-1F3FD","non_qualified":null,"image":"1f482-1f3fd.png","sheet_x":23,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F482-1F3FE","non_qualified":null,"image":"1f482-1f3fe.png","sheet_x":23,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F482-1F3FF","non_qualified":null,"image":"1f482-1f3ff.png","sheet_x":23,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F482-200D-2642-FE0F","a":"Guardsman","b":"1F482","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"j":["uk","gb","british","male","guy","royal"],"k":[23,31]},"information_source":{"a":"Information Source","b":"2139-FE0F","c":"2139","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","alphabet","letter"],"k":[46,32],"o":3},"flag-mk":{"a":"Macedonia Flag","b":"1F1F2-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,24]},"smoking":{"a":"Smoking Symbol","b":"1F6AC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["kills","tobacco","cigarette","joint","smoke"],"k":[35,17]},"id":{"a":"Squared Id","b":"1F194","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","words"],"k":[0,24]},"clock9":{"a":"Clock Face Nine Oclock","b":"1F558","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,26]},"flag-ml":{"a":"Mali Flag","b":"1F1F2-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,25]},"coffin":{"a":"Coffin","b":"26B0-FE0F","c":"26B0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["vampire","dead","die","death","rip","graveyard","cemetery","casket","funeral","box"],"k":[48,24],"o":4},"male-guard":{"skin_variations":{"1F3FB":{"unified":"1F482-1F3FB-200D-2642-FE0F","non_qualified":"1F482-1F3FB-200D-2642","image":"1f482-1f3fb-200d-2642-fe0f.png","sheet_x":23,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F482-1F3FC-200D-2642-FE0F","non_qualified":"1F482-1F3FC-200D-2642","image":"1f482-1f3fc-200d-2642-fe0f.png","sheet_x":23,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F482-1F3FD-200D-2642-FE0F","non_qualified":"1F482-1F3FD-200D-2642","image":"1f482-1f3fd-200d-2642-fe0f.png","sheet_x":23,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F482-1F3FE-200D-2642-FE0F","non_qualified":"1F482-1F3FE-200D-2642","image":"1f482-1f3fe-200d-2642-fe0f.png","sheet_x":23,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F482-1F3FF-200D-2642-FE0F","non_qualified":"1F482-1F3FF-200D-2642","image":"1f482-1f3ff-200d-2642-fe0f.png","sheet_x":23,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F482","a":"Male Guard","b":"1F482-200D-2642-FE0F","c":"1F482-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[23,25]},"m":{"a":"Circled Latin Capital Letter M","b":"24C2-FE0F","c":"24C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","blue-circle","letter"],"k":[47,7],"o":1},"funeral_urn":{"a":"Funeral Urn","b":"26B1-FE0F","c":"26B1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["dead","die","death","rip","ashes"],"k":[48,25],"o":4},"female-guard":{"skin_variations":{"1F3FB":{"unified":"1F482-1F3FB-200D-2640-FE0F","non_qualified":"1F482-1F3FB-200D-2640","image":"1f482-1f3fb-200d-2640-fe0f.png","sheet_x":23,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F482-1F3FC-200D-2640-FE0F","non_qualified":"1F482-1F3FC-200D-2640","image":"1f482-1f3fc-200d-2640-fe0f.png","sheet_x":23,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F482-1F3FD-200D-2640-FE0F","non_qualified":"1F482-1F3FD-200D-2640","image":"1f482-1f3fd-200d-2640-fe0f.png","sheet_x":23,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F482-1F3FE-200D-2640-FE0F","non_qualified":"1F482-1F3FE-200D-2640","image":"1f482-1f3fe-200d-2640-fe0f.png","sheet_x":23,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F482-1F3FF-200D-2640-FE0F","non_qualified":"1F482-1F3FF-200D-2640","image":"1f482-1f3ff-200d-2640-fe0f.png","sheet_x":23,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Guard","b":"1F482-200D-2640-FE0F","c":"1F482-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[23,19]},"flag-mm":{"a":"Myanmar (burma) Flag","b":"1F1F2-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,26]},"clock930":{"a":"Clock Face Nine-Thirty","b":"1F564","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,38]},"moyai":{"a":"Moyai","b":"1F5FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["rock","easter island","moai"],"k":[30,23]},"new":{"a":"Squared New","b":"1F195","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","words","start"],"k":[0,25]},"flag-mn":{"a":"Mongolia Flag","b":"1F1F2-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,27]},"construction_worker":{"skin_variations":{"1F3FB":{"unified":"1F477-1F3FB","non_qualified":null,"image":"1f477-1f3fb.png","sheet_x":22,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F477-1F3FC","non_qualified":null,"image":"1f477-1f3fc.png","sheet_x":22,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F477-1F3FD","non_qualified":null,"image":"1f477-1f3fd.png","sheet_x":22,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F477-1F3FE","non_qualified":null,"image":"1f477-1f3fe.png","sheet_x":22,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F477-1F3FF","non_qualified":null,"image":"1f477-1f3ff.png","sheet_x":22,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F477-200D-2642-FE0F","a":"Construction Worker","b":"1F477","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[22,28]},"clock10":{"a":"Clock Face Ten Oclock","b":"1F559","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,27]},"clock1030":{"a":"Clock Face Ten-Thirty","b":"1F565","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,39]},"ng":{"a":"Squared Ng","b":"1F196","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","words","shape","icon"],"k":[0,26]},"male-construction-worker":{"skin_variations":{"1F3FB":{"unified":"1F477-1F3FB-200D-2642-FE0F","non_qualified":"1F477-1F3FB-200D-2642","image":"1f477-1f3fb-200d-2642-fe0f.png","sheet_x":22,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F477-1F3FC-200D-2642-FE0F","non_qualified":"1F477-1F3FC-200D-2642","image":"1f477-1f3fc-200d-2642-fe0f.png","sheet_x":22,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F477-1F3FD-200D-2642-FE0F","non_qualified":"1F477-1F3FD-200D-2642","image":"1f477-1f3fd-200d-2642-fe0f.png","sheet_x":22,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F477-1F3FE-200D-2642-FE0F","non_qualified":"1F477-1F3FE-200D-2642","image":"1f477-1f3fe-200d-2642-fe0f.png","sheet_x":22,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F477-1F3FF-200D-2642-FE0F","non_qualified":"1F477-1F3FF-200D-2642","image":"1f477-1f3ff-200d-2642-fe0f.png","sheet_x":22,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F477","a":"Male Construction Worker","b":"1F477-200D-2642-FE0F","c":"1F477-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[22,22]},"flag-mo":{"a":"Macau Sar China Flag","b":"1F1F2-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,28]},"oil_drum":{"a":"Oil Drum","b":"1F6E2-FE0F","c":"1F6E2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["barrell"],"k":[37,10],"o":7},"o2":{"a":"Negative Squared Latin Capital Letter O","b":"1F17E-FE0F","c":"1F17E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["alphabet","red-square","letter"],"k":[0,18]},"female-construction-worker":{"skin_variations":{"1F3FB":{"unified":"1F477-1F3FB-200D-2640-FE0F","non_qualified":"1F477-1F3FB-200D-2640","image":"1f477-1f3fb-200d-2640-fe0f.png","sheet_x":22,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F477-1F3FC-200D-2640-FE0F","non_qualified":"1F477-1F3FC-200D-2640","image":"1f477-1f3fc-200d-2640-fe0f.png","sheet_x":22,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F477-1F3FD-200D-2640-FE0F","non_qualified":"1F477-1F3FD-200D-2640","image":"1f477-1f3fd-200d-2640-fe0f.png","sheet_x":22,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F477-1F3FE-200D-2640-FE0F","non_qualified":"1F477-1F3FE-200D-2640","image":"1f477-1f3fe-200d-2640-fe0f.png","sheet_x":22,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F477-1F3FF-200D-2640-FE0F","non_qualified":"1F477-1F3FF-200D-2640","image":"1f477-1f3ff-200d-2640-fe0f.png","sheet_x":22,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Construction Worker","b":"1F477-200D-2640-FE0F","c":"1F477-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[22,16]},"clock11":{"a":"Clock Face Eleven Oclock","b":"1F55A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,28]},"crystal_ball":{"a":"Crystal Ball","b":"1F52E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["disco","party","magic","circus","fortune_teller"],"k":[27,48]},"flag-mp":{"a":"Northern Mariana Islands Flag","b":"1F1F2-1F1F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,29]},"flag-mq":{"a":"Martinique Flag","b":"1F1F2-1F1F6","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[3,30]},"prince":{"skin_variations":{"1F3FB":{"unified":"1F934-1F3FB","non_qualified":null,"image":"1f934-1f3fb.png","sheet_x":39,"sheet_y":29,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F934-1F3FC","non_qualified":null,"image":"1f934-1f3fc.png","sheet_x":39,"sheet_y":30,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F934-1F3FD","non_qualified":null,"image":"1f934-1f3fd.png","sheet_x":39,"sheet_y":31,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F934-1F3FE","non_qualified":null,"image":"1f934-1f3fe.png","sheet_x":39,"sheet_y":32,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F934-1F3FF","non_qualified":null,"image":"1f934-1f3ff.png","sheet_x":39,"sheet_y":33,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Prince","b":"1F934","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["boy","man","male","crown","royal","king"],"k":[39,28],"o":9},"ok":{"a":"Squared Ok","b":"1F197","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["good","agree","yes","blue-square"],"k":[0,27]},"clock1130":{"a":"Clock Face Eleven-Thirty","b":"1F566","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["time","late","early","schedule"],"k":[28,40]},"shopping_trolley":{"a":"Shopping Trolley","b":"1F6D2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,7],"o":9},"flag-mr":{"a":"Mauritania Flag","b":"1F1F2-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,31]},"princess":{"skin_variations":{"1F3FB":{"unified":"1F478-1F3FB","non_qualified":null,"image":"1f478-1f3fb.png","sheet_x":22,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F478-1F3FC","non_qualified":null,"image":"1f478-1f3fc.png","sheet_x":22,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F478-1F3FD","non_qualified":null,"image":"1f478-1f3fd.png","sheet_x":22,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F478-1F3FE","non_qualified":null,"image":"1f478-1f3fe.png","sheet_x":22,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F478-1F3FF","non_qualified":null,"image":"1f478-1f3ff.png","sheet_x":22,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Princess","b":"1F478","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["girl","woman","female","blond","crown","royal","queen"],"k":[22,34]},"new_moon":{"a":"New Moon Symbol","b":"1F311","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,9]},"parking":{"a":"Negative Squared Latin Capital Letter P","b":"1F17F-FE0F","c":"1F17F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cars","blue-square","alphabet","letter"],"k":[0,19],"o":5},"sos":{"a":"Squared Sos","b":"1F198","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["help","red-square","words","emergency","911"],"k":[0,28]},"man_with_turban":{"skin_variations":{"1F3FB":{"unified":"1F473-1F3FB","non_qualified":null,"image":"1f473-1f3fb.png","sheet_x":21,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F473-1F3FC","non_qualified":null,"image":"1f473-1f3fc.png","sheet_x":21,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F473-1F3FD","non_qualified":null,"image":"1f473-1f3fd.png","sheet_x":21,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F473-1F3FE","non_qualified":null,"image":"1f473-1f3fe.png","sheet_x":21,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F473-1F3FF","non_qualified":null,"image":"1f473-1f3ff.png","sheet_x":21,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F473-200D-2642-FE0F","a":"Man with Turban","b":"1F473","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"j":["male","indian","hinduism","arabs"],"k":[21,44]},"flag-ms":{"a":"Montserrat Flag","b":"1F1F2-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,32]},"waxing_crescent_moon":{"a":"Waxing Crescent Moon Symbol","b":"1F312","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,10]},"up":{"a":"Squared Up with Exclamation Mark","b":"1F199","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","above","high"],"k":[0,29]},"first_quarter_moon":{"a":"First Quarter Moon Symbol","b":"1F313","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,11]},"flag-mt":{"a":"Malta Flag","b":"1F1F2-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,33]},"man-wearing-turban":{"skin_variations":{"1F3FB":{"unified":"1F473-1F3FB-200D-2642-FE0F","non_qualified":"1F473-1F3FB-200D-2642","image":"1f473-1f3fb-200d-2642-fe0f.png","sheet_x":21,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F473-1F3FC-200D-2642-FE0F","non_qualified":"1F473-1F3FC-200D-2642","image":"1f473-1f3fc-200d-2642-fe0f.png","sheet_x":21,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F473-1F3FD-200D-2642-FE0F","non_qualified":"1F473-1F3FD-200D-2642","image":"1f473-1f3fd-200d-2642-fe0f.png","sheet_x":21,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F473-1F3FE-200D-2642-FE0F","non_qualified":"1F473-1F3FE-200D-2642","image":"1f473-1f3fe-200d-2642-fe0f.png","sheet_x":21,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F473-1F3FF-200D-2642-FE0F","non_qualified":"1F473-1F3FF-200D-2642","image":"1f473-1f3ff-200d-2642-fe0f.png","sheet_x":21,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F473","a":"Man Wearing Turban","b":"1F473-200D-2642-FE0F","c":"1F473-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[21,38]},"moon":{"a":"Waxing Gibbous Moon Symbol","b":"1F314","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[6,12],"n":["waxing_gibbous_moon"]},"woman-wearing-turban":{"skin_variations":{"1F3FB":{"unified":"1F473-1F3FB-200D-2640-FE0F","non_qualified":"1F473-1F3FB-200D-2640","image":"1f473-1f3fb-200d-2640-fe0f.png","sheet_x":21,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F473-1F3FC-200D-2640-FE0F","non_qualified":"1F473-1F3FC-200D-2640","image":"1f473-1f3fc-200d-2640-fe0f.png","sheet_x":21,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F473-1F3FD-200D-2640-FE0F","non_qualified":"1F473-1F3FD-200D-2640","image":"1f473-1f3fd-200d-2640-fe0f.png","sheet_x":21,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F473-1F3FE-200D-2640-FE0F","non_qualified":"1F473-1F3FE-200D-2640","image":"1f473-1f3fe-200d-2640-fe0f.png","sheet_x":21,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F473-1F3FF-200D-2640-FE0F","non_qualified":"1F473-1F3FF-200D-2640","image":"1f473-1f3ff-200d-2640-fe0f.png","sheet_x":21,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Wearing Turban","b":"1F473-200D-2640-FE0F","c":"1F473-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[21,32]},"vs":{"a":"Squared Vs","b":"1F19A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["words","orange-square"],"k":[0,30]},"flag-mu":{"a":"Mauritius Flag","b":"1F1F2-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,34]},"man_with_gua_pi_mao":{"skin_variations":{"1F3FB":{"unified":"1F472-1F3FB","non_qualified":null,"image":"1f472-1f3fb.png","sheet_x":21,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F472-1F3FC","non_qualified":null,"image":"1f472-1f3fc.png","sheet_x":21,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F472-1F3FD","non_qualified":null,"image":"1f472-1f3fd.png","sheet_x":21,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F472-1F3FE","non_qualified":null,"image":"1f472-1f3fe.png","sheet_x":21,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F472-1F3FF","non_qualified":null,"image":"1f472-1f3ff.png","sheet_x":21,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Man with Gua Pi Mao","b":"1F472","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["male","boy","chinese"],"k":[21,26]},"koko":{"a":"Squared Katakana Koko","b":"1F201","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue-square","here","katakana","japanese","destination"],"k":[5,29]},"full_moon":{"a":"Full Moon Symbol","b":"1F315","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","yellow","twilight","planet","space","night","evening","sleep"],"k":[6,13]},"flag-mv":{"a":"Maldives Flag","b":"1F1F2-1F1FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,35]},"person_with_headscarf":{"skin_variations":{"1F3FB":{"unified":"1F9D5-1F3FB","non_qualified":null,"image":"1f9d5-1f3fb.png","sheet_x":43,"sheet_y":23,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F9D5-1F3FC","non_qualified":null,"image":"1f9d5-1f3fc.png","sheet_x":43,"sheet_y":24,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F9D5-1F3FD","non_qualified":null,"image":"1f9d5-1f3fd.png","sheet_x":43,"sheet_y":25,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F9D5-1F3FE","non_qualified":null,"image":"1f9d5-1f3fe.png","sheet_x":43,"sheet_y":26,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F9D5-1F3FF","non_qualified":null,"image":"1f9d5-1f3ff.png","sheet_x":43,"sheet_y":27,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Person with Headscarf","b":"1F9D5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[43,22],"o":10},"waning_gibbous_moon":{"a":"Waning Gibbous Moon Symbol","b":"1F316","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep","waxing_gibbous_moon"],"k":[6,14]},"sa":{"a":"Squared Katakana Sa","b":"1F202-FE0F","c":"1F202","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","blue-square","katakana"],"k":[5,30]},"flag-mw":{"a":"Malawi Flag","b":"1F1F2-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,36]},"last_quarter_moon":{"a":"Last Quarter Moon Symbol","b":"1F317","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,15]},"u6708":{"a":"Squared Cjk Unified Ideograph-6708","b":"1F237-FE0F","c":"1F237","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","month","moon","japanese","orange-square","kanji"],"k":[5,38]},"bearded_person":{"skin_variations":{"1F3FB":{"unified":"1F9D4-1F3FB","non_qualified":null,"image":"1f9d4-1f3fb.png","sheet_x":43,"sheet_y":17,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F9D4-1F3FC","non_qualified":null,"image":"1f9d4-1f3fc.png","sheet_x":43,"sheet_y":18,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F9D4-1F3FD","non_qualified":null,"image":"1f9d4-1f3fd.png","sheet_x":43,"sheet_y":19,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F9D4-1F3FE","non_qualified":null,"image":"1f9d4-1f3fe.png","sheet_x":43,"sheet_y":20,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F9D4-1F3FF","non_qualified":null,"image":"1f9d4-1f3ff.png","sheet_x":43,"sheet_y":21,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Bearded Person","b":"1F9D4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["person","bewhiskered"],"k":[43,16],"o":10},"flag-mx":{"a":"Mexico Flag","b":"1F1F2-1F1FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,37]},"u6709":{"a":"Squared Cjk Unified Ideograph-6709","b":"1F236","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["orange-square","chinese","have","kanji"],"k":[5,37]},"person_with_blond_hair":{"skin_variations":{"1F3FB":{"unified":"1F471-1F3FB","non_qualified":null,"image":"1f471-1f3fb.png","sheet_x":21,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F471-1F3FC","non_qualified":null,"image":"1f471-1f3fc.png","sheet_x":21,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F471-1F3FD","non_qualified":null,"image":"1f471-1f3fd.png","sheet_x":21,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F471-1F3FE","non_qualified":null,"image":"1f471-1f3fe.png","sheet_x":21,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F471-1F3FF","non_qualified":null,"image":"1f471-1f3ff.png","sheet_x":21,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F471-200D-2642-FE0F","a":"Person with Blond Hair","b":"1F471","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[21,20]},"waning_crescent_moon":{"a":"Waning Crescent Moon Symbol","b":"1F318","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,16]},"flag-my":{"a":"Malaysia Flag","b":"1F1F2-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,38]},"u6307":{"a":"Squared Cjk Unified Ideograph-6307","b":"1F22F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","point","green-square","kanji"],"k":[5,32],"o":5},"blond-haired-man":{"skin_variations":{"1F3FB":{"unified":"1F471-1F3FB-200D-2642-FE0F","non_qualified":"1F471-1F3FB-200D-2642","image":"1f471-1f3fb-200d-2642-fe0f.png","sheet_x":21,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F471-1F3FC-200D-2642-FE0F","non_qualified":"1F471-1F3FC-200D-2642","image":"1f471-1f3fc-200d-2642-fe0f.png","sheet_x":21,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F471-1F3FD-200D-2642-FE0F","non_qualified":"1F471-1F3FD-200D-2642","image":"1f471-1f3fd-200d-2642-fe0f.png","sheet_x":21,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F471-1F3FE-200D-2642-FE0F","non_qualified":"1F471-1F3FE-200D-2642","image":"1f471-1f3fe-200d-2642-fe0f.png","sheet_x":21,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F471-1F3FF-200D-2642-FE0F","non_qualified":"1F471-1F3FF-200D-2642","image":"1f471-1f3ff-200d-2642-fe0f.png","sheet_x":21,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F471","a":"Blond Haired Man","b":"1F471-200D-2642-FE0F","c":"1F471-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[21,14]},"crescent_moon":{"a":"Crescent Moon","b":"1F319","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","sleep","sky","evening","magic"],"k":[6,17]},"flag-mz":{"a":"Mozambique Flag","b":"1F1F2-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,39]},"new_moon_with_face":{"a":"New Moon with Face","b":"1F31A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,18]},"flag-na":{"a":"Namibia Flag","b":"1F1F3-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,40]},"blond-haired-woman":{"skin_variations":{"1F3FB":{"unified":"1F471-1F3FB-200D-2640-FE0F","non_qualified":"1F471-1F3FB-200D-2640","image":"1f471-1f3fb-200d-2640-fe0f.png","sheet_x":21,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F471-1F3FC-200D-2640-FE0F","non_qualified":"1F471-1F3FC-200D-2640","image":"1f471-1f3fc-200d-2640-fe0f.png","sheet_x":21,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F471-1F3FD-200D-2640-FE0F","non_qualified":"1F471-1F3FD-200D-2640","image":"1f471-1f3fd-200d-2640-fe0f.png","sheet_x":21,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F471-1F3FE-200D-2640-FE0F","non_qualified":"1F471-1F3FE-200D-2640","image":"1f471-1f3fe-200d-2640-fe0f.png","sheet_x":21,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F471-1F3FF-200D-2640-FE0F","non_qualified":"1F471-1F3FF-200D-2640","image":"1f471-1f3ff-200d-2640-fe0f.png","sheet_x":21,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Blond Haired Woman","b":"1F471-200D-2640-FE0F","c":"1F471-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[21,8]},"ideograph_advantage":{"a":"Circled Ideograph Advantage","b":"1F250","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","kanji","obtain","get","circle"],"k":[5,42]},"first_quarter_moon_with_face":{"a":"First Quarter Moon with Face","b":"1F31B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,19]},"man_in_tuxedo":{"skin_variations":{"1F3FB":{"unified":"1F935-1F3FB","non_qualified":null,"image":"1f935-1f3fb.png","sheet_x":39,"sheet_y":35,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F935-1F3FC","non_qualified":null,"image":"1f935-1f3fc.png","sheet_x":39,"sheet_y":36,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F935-1F3FD","non_qualified":null,"image":"1f935-1f3fd.png","sheet_x":39,"sheet_y":37,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F935-1F3FE","non_qualified":null,"image":"1f935-1f3fe.png","sheet_x":39,"sheet_y":38,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F935-1F3FF","non_qualified":null,"image":"1f935-1f3ff.png","sheet_x":39,"sheet_y":39,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Man in Tuxedo","b":"1F935","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["couple","marriage","wedding","groom"],"k":[39,34],"o":9},"flag-nc":{"a":"New Caledonia Flag","b":"1F1F3-1F1E8","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[3,41]},"u5272":{"a":"Squared Cjk Unified Ideograph-5272","b":"1F239","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["cut","divide","chinese","kanji","pink-square"],"k":[5,40]},"flag-ne":{"a":"Niger Flag","b":"1F1F3-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,42]},"last_quarter_moon_with_face":{"a":"Last Quarter Moon with Face","b":"1F31C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,20]},"u7121":{"a":"Squared Cjk Unified Ideograph-7121","b":"1F21A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nothing","chinese","kanji","japanese","orange-square"],"k":[5,31],"o":5},"bride_with_veil":{"skin_variations":{"1F3FB":{"unified":"1F470-1F3FB","non_qualified":null,"image":"1f470-1f3fb.png","sheet_x":21,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F470-1F3FC","non_qualified":null,"image":"1f470-1f3fc.png","sheet_x":21,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F470-1F3FD","non_qualified":null,"image":"1f470-1f3fd.png","sheet_x":21,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F470-1F3FE","non_qualified":null,"image":"1f470-1f3fe.png","sheet_x":21,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F470-1F3FF","non_qualified":null,"image":"1f470-1f3ff.png","sheet_x":21,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Bride with Veil","b":"1F470","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["couple","marriage","wedding","woman","bride"],"k":[21,2]},"u7981":{"a":"Squared Cjk Unified Ideograph-7981","b":"1F232","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["kanji","japanese","chinese","forbidden","limit","restricted","red-square"],"k":[5,33]},"pregnant_woman":{"skin_variations":{"1F3FB":{"unified":"1F930-1F3FB","non_qualified":null,"image":"1f930-1f3fb.png","sheet_x":39,"sheet_y":5,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F930-1F3FC","non_qualified":null,"image":"1f930-1f3fc.png","sheet_x":39,"sheet_y":6,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F930-1F3FD","non_qualified":null,"image":"1f930-1f3fd.png","sheet_x":39,"sheet_y":7,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F930-1F3FE","non_qualified":null,"image":"1f930-1f3fe.png","sheet_x":39,"sheet_y":8,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F930-1F3FF","non_qualified":null,"image":"1f930-1f3ff.png","sheet_x":39,"sheet_y":9,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Pregnant Woman","b":"1F930","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["baby"],"k":[39,4],"o":9},"thermometer":{"a":"Thermometer","b":"1F321-FE0F","c":"1F321","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["weather","temperature","hot","cold"],"k":[6,25],"o":7},"flag-nf":{"a":"Norfolk Island Flag","b":"1F1F3-1F1EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,43]},"sunny":{"a":"Black Sun with Rays","b":"2600-FE0F","c":"2600","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","nature","brightness","summer","beach","spring"],"k":[47,16],"o":1},"accept":{"a":"Circled Ideograph Accept","b":"1F251","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["ok","good","chinese","kanji","agree","yes","orange-circle"],"k":[5,43]},"flag-ng":{"a":"Nigeria Flag","b":"1F1F3-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,44]},"breast-feeding":{"skin_variations":{"1F3FB":{"unified":"1F931-1F3FB","non_qualified":null,"image":"1f931-1f3fb.png","sheet_x":39,"sheet_y":11,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F931-1F3FC","non_qualified":null,"image":"1f931-1f3fc.png","sheet_x":39,"sheet_y":12,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F931-1F3FD","non_qualified":null,"image":"1f931-1f3fd.png","sheet_x":39,"sheet_y":13,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F931-1F3FE","non_qualified":null,"image":"1f931-1f3fe.png","sheet_x":39,"sheet_y":14,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F931-1F3FF","non_qualified":null,"image":"1f931-1f3ff.png","sheet_x":39,"sheet_y":15,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Breast-Feeding","b":"1F931","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[39,10],"o":10},"full_moon_with_face":{"a":"Full Moon with Face","b":"1F31D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","twilight","planet","space","night","evening","sleep"],"k":[6,21]},"flag-ni":{"a":"Nicaragua Flag","b":"1F1F3-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,45]},"u7533":{"a":"Squared Cjk Unified Ideograph-7533","b":"1F238","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","japanese","kanji","orange-square"],"k":[5,39]},"angel":{"skin_variations":{"1F3FB":{"unified":"1F47C-1F3FB","non_qualified":null,"image":"1f47c-1f3fb.png","sheet_x":22,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F47C-1F3FC","non_qualified":null,"image":"1f47c-1f3fc.png","sheet_x":22,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F47C-1F3FD","non_qualified":null,"image":"1f47c-1f3fd.png","sheet_x":22,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F47C-1F3FE","non_qualified":null,"image":"1f47c-1f3fe.png","sheet_x":22,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F47C-1F3FF","non_qualified":null,"image":"1f47c-1f3ff.png","sheet_x":22,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Baby Angel","b":"1F47C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["heaven","wings","halo"],"k":[22,43]},"sun_with_face":{"a":"Sun with Face","b":"1F31E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","morning","sky"],"k":[6,22]},"santa":{"skin_variations":{"1F3FB":{"unified":"1F385-1F3FB","non_qualified":null,"image":"1f385-1f3fb.png","sheet_x":8,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F385-1F3FC","non_qualified":null,"image":"1f385-1f3fc.png","sheet_x":8,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F385-1F3FD","non_qualified":null,"image":"1f385-1f3fd.png","sheet_x":8,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F385-1F3FE","non_qualified":null,"image":"1f385-1f3fe.png","sheet_x":8,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F385-1F3FF","non_qualified":null,"image":"1f385-1f3ff.png","sheet_x":8,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Father Christmas","b":"1F385","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["festival","man","male","xmas","father christmas"],"k":[8,19]},"u5408":{"a":"Squared Cjk Unified Ideograph-5408","b":"1F234","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","chinese","join","kanji","red-square"],"k":[5,35]},"flag-nl":{"a":"Netherlands Flag","b":"1F1F3-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,46]},"mrs_claus":{"skin_variations":{"1F3FB":{"unified":"1F936-1F3FB","non_qualified":null,"image":"1f936-1f3fb.png","sheet_x":39,"sheet_y":41,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F936-1F3FC","non_qualified":null,"image":"1f936-1f3fc.png","sheet_x":39,"sheet_y":42,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F936-1F3FD","non_qualified":null,"image":"1f936-1f3fd.png","sheet_x":39,"sheet_y":43,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F936-1F3FE","non_qualified":null,"image":"1f936-1f3fe.png","sheet_x":39,"sheet_y":44,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F936-1F3FF","non_qualified":null,"image":"1f936-1f3ff.png","sheet_x":39,"sheet_y":45,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Mother Christmas","b":"1F936","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["woman","female","xmas","mother christmas"],"k":[39,40],"n":["mother_christmas"],"o":9},"u7a7a":{"a":"Squared Cjk Unified Ideograph-7a7a","b":"1F233","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["kanji","japanese","chinese","empty","sky","blue-square"],"k":[5,34]},"star":{"a":"White Medium Star","b":"2B50","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","yellow"],"k":[50,22],"o":5},"flag-no":{"a":"Norway Flag","b":"1F1F3-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,47]},"mage":{"skin_variations":{"1F3FB":{"unified":"1F9D9-1F3FB","non_qualified":null,"image":"1f9d9-1f3fb.png","sheet_x":44,"sheet_y":43,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D9-1F3FB-200D-2640-FE0F"},"1F3FC":{"unified":"1F9D9-1F3FC","non_qualified":null,"image":"1f9d9-1f3fc.png","sheet_x":44,"sheet_y":44,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D9-1F3FC-200D-2640-FE0F"},"1F3FD":{"unified":"1F9D9-1F3FD","non_qualified":null,"image":"1f9d9-1f3fd.png","sheet_x":44,"sheet_y":45,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D9-1F3FD-200D-2640-FE0F"},"1F3FE":{"unified":"1F9D9-1F3FE","non_qualified":null,"image":"1f9d9-1f3fe.png","sheet_x":44,"sheet_y":46,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D9-1F3FE-200D-2640-FE0F"},"1F3FF":{"unified":"1F9D9-1F3FF","non_qualified":null,"image":"1f9d9-1f3ff.png","sheet_x":44,"sheet_y":47,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D9-1F3FF-200D-2640-FE0F"}},"obsoleted_by":"1F9D9-200D-2640-FE0F","a":"Mage","b":"1F9D9","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,42],"o":10},"star2":{"a":"Glowing Star","b":"1F31F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","sparkle","awesome","good","magic"],"k":[6,23]},"flag-np":{"a":"Nepal Flag","b":"1F1F3-1F1F5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,48]},"congratulations":{"a":"Circled Ideograph Congratulation","b":"3297-FE0F","c":"3297","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["chinese","kanji","japanese","red-circle"],"k":[50,26],"o":1},"flag-nr":{"a":"Nauru Flag","b":"1F1F3-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,49]},"stars":{"a":"Shooting Star","b":"1F320","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["night","photo"],"k":[6,24]},"female_mage":{"skin_variations":{"1F3FB":{"unified":"1F9D9-1F3FB-200D-2640-FE0F","non_qualified":"1F9D9-1F3FB-200D-2640","image":"1f9d9-1f3fb-200d-2640-fe0f.png","sheet_x":44,"sheet_y":31,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D9-1F3FB"},"1F3FC":{"unified":"1F9D9-1F3FC-200D-2640-FE0F","non_qualified":"1F9D9-1F3FC-200D-2640","image":"1f9d9-1f3fc-200d-2640-fe0f.png","sheet_x":44,"sheet_y":32,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D9-1F3FC"},"1F3FD":{"unified":"1F9D9-1F3FD-200D-2640-FE0F","non_qualified":"1F9D9-1F3FD-200D-2640","image":"1f9d9-1f3fd-200d-2640-fe0f.png","sheet_x":44,"sheet_y":33,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D9-1F3FD"},"1F3FE":{"unified":"1F9D9-1F3FE-200D-2640-FE0F","non_qualified":"1F9D9-1F3FE-200D-2640","image":"1f9d9-1f3fe-200d-2640-fe0f.png","sheet_x":44,"sheet_y":34,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D9-1F3FE"},"1F3FF":{"unified":"1F9D9-1F3FF-200D-2640-FE0F","non_qualified":"1F9D9-1F3FF-200D-2640","image":"1f9d9-1f3ff-200d-2640-fe0f.png","sheet_x":44,"sheet_y":35,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D9-1F3FF"}},"obsoletes":"1F9D9","a":"Female Mage","b":"1F9D9-200D-2640-FE0F","c":"1F9D9-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,30],"o":10},"secret":{"a":"Circled Ideograph Secret","b":"3299-FE0F","c":"3299","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["privacy","chinese","sshh","kanji","red-circle"],"k":[50,27],"o":1},"flag-nu":{"a":"Niue Flag","b":"1F1F3-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,50]},"u55b6":{"a":"Squared Cjk Unified Ideograph-55b6","b":"1F23A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["japanese","opening hours","orange-square"],"k":[5,41]},"male_mage":{"skin_variations":{"1F3FB":{"unified":"1F9D9-1F3FB-200D-2642-FE0F","non_qualified":"1F9D9-1F3FB-200D-2642","image":"1f9d9-1f3fb-200d-2642-fe0f.png","sheet_x":44,"sheet_y":37,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9D9-1F3FC-200D-2642-FE0F","non_qualified":"1F9D9-1F3FC-200D-2642","image":"1f9d9-1f3fc-200d-2642-fe0f.png","sheet_x":44,"sheet_y":38,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9D9-1F3FD-200D-2642-FE0F","non_qualified":"1F9D9-1F3FD-200D-2642","image":"1f9d9-1f3fd-200d-2642-fe0f.png","sheet_x":44,"sheet_y":39,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9D9-1F3FE-200D-2642-FE0F","non_qualified":"1F9D9-1F3FE-200D-2642","image":"1f9d9-1f3fe-200d-2642-fe0f.png","sheet_x":44,"sheet_y":40,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9D9-1F3FF-200D-2642-FE0F","non_qualified":"1F9D9-1F3FF-200D-2642","image":"1f9d9-1f3ff-200d-2642-fe0f.png","sheet_x":44,"sheet_y":41,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Male Mage","b":"1F9D9-200D-2642-FE0F","c":"1F9D9-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,36],"o":10},"cloud":{"a":"Cloud","b":"2601-FE0F","c":"2601","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","sky"],"k":[47,17],"o":1},"flag-nz":{"a":"New Zealand Flag","b":"1F1F3-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[3,51]},"partly_sunny":{"a":"Sun Behind Cloud","b":"26C5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","nature","cloudy","morning","fall","spring"],"k":[48,29],"o":5},"fairy":{"skin_variations":{"1F3FB":{"unified":"1F9DA-1F3FB","non_qualified":null,"image":"1f9da-1f3fb.png","sheet_x":45,"sheet_y":9,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DA-1F3FB-200D-2640-FE0F"},"1F3FC":{"unified":"1F9DA-1F3FC","non_qualified":null,"image":"1f9da-1f3fc.png","sheet_x":45,"sheet_y":10,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DA-1F3FC-200D-2640-FE0F"},"1F3FD":{"unified":"1F9DA-1F3FD","non_qualified":null,"image":"1f9da-1f3fd.png","sheet_x":45,"sheet_y":11,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DA-1F3FD-200D-2640-FE0F"},"1F3FE":{"unified":"1F9DA-1F3FE","non_qualified":null,"image":"1f9da-1f3fe.png","sheet_x":45,"sheet_y":12,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DA-1F3FE-200D-2640-FE0F"},"1F3FF":{"unified":"1F9DA-1F3FF","non_qualified":null,"image":"1f9da-1f3ff.png","sheet_x":45,"sheet_y":13,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DA-1F3FF-200D-2640-FE0F"}},"obsoleted_by":"1F9DA-200D-2640-FE0F","a":"Fairy","b":"1F9DA","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,8],"o":10},"u6e80":{"a":"Squared Cjk Unified Ideograph-6e80","b":"1F235","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["full","chinese","japanese","red-square","kanji"],"k":[5,36]},"black_small_square":{"a":"Black Small Square","b":"25AA-FE0F","c":"25AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon"],"k":[47,8],"o":1},"thunder_cloud_and_rain":{"a":"Thunder Cloud and Rain","b":"26C8-FE0F","c":"26C8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[48,30],"o":5},"female_fairy":{"skin_variations":{"1F3FB":{"unified":"1F9DA-1F3FB-200D-2640-FE0F","non_qualified":"1F9DA-1F3FB-200D-2640","image":"1f9da-1f3fb-200d-2640-fe0f.png","sheet_x":44,"sheet_y":49,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DA-1F3FB"},"1F3FC":{"unified":"1F9DA-1F3FC-200D-2640-FE0F","non_qualified":"1F9DA-1F3FC-200D-2640","image":"1f9da-1f3fc-200d-2640-fe0f.png","sheet_x":44,"sheet_y":50,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DA-1F3FC"},"1F3FD":{"unified":"1F9DA-1F3FD-200D-2640-FE0F","non_qualified":"1F9DA-1F3FD-200D-2640","image":"1f9da-1f3fd-200d-2640-fe0f.png","sheet_x":44,"sheet_y":51,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DA-1F3FD"},"1F3FE":{"unified":"1F9DA-1F3FE-200D-2640-FE0F","non_qualified":"1F9DA-1F3FE-200D-2640","image":"1f9da-1f3fe-200d-2640-fe0f.png","sheet_x":45,"sheet_y":0,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DA-1F3FE"},"1F3FF":{"unified":"1F9DA-1F3FF-200D-2640-FE0F","non_qualified":"1F9DA-1F3FF-200D-2640","image":"1f9da-1f3ff-200d-2640-fe0f.png","sheet_x":45,"sheet_y":1,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DA-1F3FF"}},"obsoletes":"1F9DA","a":"Female Fairy","b":"1F9DA-200D-2640-FE0F","c":"1F9DA-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,48],"o":10},"flag-om":{"a":"Oman Flag","b":"1F1F4-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,0]},"white_small_square":{"a":"White Small Square","b":"25AB-FE0F","c":"25AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon"],"k":[47,9],"o":1},"flag-pa":{"a":"Panama Flag","b":"1F1F5-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,1]},"mostly_sunny":{"a":"Mostly Sunny","b":"1F324-FE0F","c":"1F324","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,26],"n":["sun_small_cloud"],"o":7},"male_fairy":{"skin_variations":{"1F3FB":{"unified":"1F9DA-1F3FB-200D-2642-FE0F","non_qualified":"1F9DA-1F3FB-200D-2642","image":"1f9da-1f3fb-200d-2642-fe0f.png","sheet_x":45,"sheet_y":3,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9DA-1F3FC-200D-2642-FE0F","non_qualified":"1F9DA-1F3FC-200D-2642","image":"1f9da-1f3fc-200d-2642-fe0f.png","sheet_x":45,"sheet_y":4,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9DA-1F3FD-200D-2642-FE0F","non_qualified":"1F9DA-1F3FD-200D-2642","image":"1f9da-1f3fd-200d-2642-fe0f.png","sheet_x":45,"sheet_y":5,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9DA-1F3FE-200D-2642-FE0F","non_qualified":"1F9DA-1F3FE-200D-2642","image":"1f9da-1f3fe-200d-2642-fe0f.png","sheet_x":45,"sheet_y":6,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9DA-1F3FF-200D-2642-FE0F","non_qualified":"1F9DA-1F3FF-200D-2642","image":"1f9da-1f3ff-200d-2642-fe0f.png","sheet_x":45,"sheet_y":7,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Male Fairy","b":"1F9DA-200D-2642-FE0F","c":"1F9DA-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,2],"o":10},"barely_sunny":{"a":"Barely Sunny","b":"1F325-FE0F","c":"1F325","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,27],"n":["sun_behind_cloud"],"o":7},"white_medium_square":{"a":"White Medium Square","b":"25FB-FE0F","c":"25FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","stone","icon"],"k":[47,12],"o":3},"flag-pe":{"a":"Peru Flag","b":"1F1F5-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,2]},"vampire":{"skin_variations":{"1F3FB":{"unified":"1F9DB-1F3FB","non_qualified":null,"image":"1f9db-1f3fb.png","sheet_x":45,"sheet_y":27,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DB-1F3FB-200D-2640-FE0F"},"1F3FC":{"unified":"1F9DB-1F3FC","non_qualified":null,"image":"1f9db-1f3fc.png","sheet_x":45,"sheet_y":28,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DB-1F3FC-200D-2640-FE0F"},"1F3FD":{"unified":"1F9DB-1F3FD","non_qualified":null,"image":"1f9db-1f3fd.png","sheet_x":45,"sheet_y":29,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DB-1F3FD-200D-2640-FE0F"},"1F3FE":{"unified":"1F9DB-1F3FE","non_qualified":null,"image":"1f9db-1f3fe.png","sheet_x":45,"sheet_y":30,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DB-1F3FE-200D-2640-FE0F"},"1F3FF":{"unified":"1F9DB-1F3FF","non_qualified":null,"image":"1f9db-1f3ff.png","sheet_x":45,"sheet_y":31,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoleted_by":"1F9DB-1F3FF-200D-2640-FE0F"}},"obsoleted_by":"1F9DB-200D-2640-FE0F","a":"Vampire","b":"1F9DB","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,26],"o":10},"female_vampire":{"skin_variations":{"1F3FB":{"unified":"1F9DB-1F3FB-200D-2640-FE0F","non_qualified":"1F9DB-1F3FB-200D-2640","image":"1f9db-1f3fb-200d-2640-fe0f.png","sheet_x":45,"sheet_y":15,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DB-1F3FB"},"1F3FC":{"unified":"1F9DB-1F3FC-200D-2640-FE0F","non_qualified":"1F9DB-1F3FC-200D-2640","image":"1f9db-1f3fc-200d-2640-fe0f.png","sheet_x":45,"sheet_y":16,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DB-1F3FC"},"1F3FD":{"unified":"1F9DB-1F3FD-200D-2640-FE0F","non_qualified":"1F9DB-1F3FD-200D-2640","image":"1f9db-1f3fd-200d-2640-fe0f.png","sheet_x":45,"sheet_y":17,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DB-1F3FD"},"1F3FE":{"unified":"1F9DB-1F3FE-200D-2640-FE0F","non_qualified":"1F9DB-1F3FE-200D-2640","image":"1f9db-1f3fe-200d-2640-fe0f.png","sheet_x":45,"sheet_y":18,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DB-1F3FE"},"1F3FF":{"unified":"1F9DB-1F3FF-200D-2640-FE0F","non_qualified":"1F9DB-1F3FF-200D-2640","image":"1f9db-1f3ff-200d-2640-fe0f.png","sheet_x":45,"sheet_y":19,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DB-1F3FF"}},"obsoletes":"1F9DB","a":"Female Vampire","b":"1F9DB-200D-2640-FE0F","c":"1F9DB-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,14],"o":10},"partly_sunny_rain":{"a":"Partly Sunny Rain","b":"1F326-FE0F","c":"1F326","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,28],"n":["sun_behind_rain_cloud"],"o":7},"flag-pf":{"a":"French Polynesia Flag","b":"1F1F5-1F1EB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,3]},"black_medium_square":{"a":"Black Medium Square","b":"25FC-FE0F","c":"25FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","button","icon"],"k":[47,13],"o":3},"white_medium_small_square":{"a":"White Medium Small Square","b":"25FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","stone","icon","button"],"k":[47,14],"o":3},"rain_cloud":{"a":"Rain Cloud","b":"1F327-FE0F","c":"1F327","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,29],"o":7},"flag-pg":{"a":"Papua New Guinea Flag","b":"1F1F5-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,4]},"male_vampire":{"skin_variations":{"1F3FB":{"unified":"1F9DB-1F3FB-200D-2642-FE0F","non_qualified":"1F9DB-1F3FB-200D-2642","image":"1f9db-1f3fb-200d-2642-fe0f.png","sheet_x":45,"sheet_y":21,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9DB-1F3FC-200D-2642-FE0F","non_qualified":"1F9DB-1F3FC-200D-2642","image":"1f9db-1f3fc-200d-2642-fe0f.png","sheet_x":45,"sheet_y":22,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9DB-1F3FD-200D-2642-FE0F","non_qualified":"1F9DB-1F3FD-200D-2642","image":"1f9db-1f3fd-200d-2642-fe0f.png","sheet_x":45,"sheet_y":23,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9DB-1F3FE-200D-2642-FE0F","non_qualified":"1F9DB-1F3FE-200D-2642","image":"1f9db-1f3fe-200d-2642-fe0f.png","sheet_x":45,"sheet_y":24,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9DB-1F3FF-200D-2642-FE0F","non_qualified":"1F9DB-1F3FF-200D-2642","image":"1f9db-1f3ff-200d-2642-fe0f.png","sheet_x":45,"sheet_y":25,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Male Vampire","b":"1F9DB-200D-2642-FE0F","c":"1F9DB-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,20],"o":10},"flag-ph":{"a":"Philippines Flag","b":"1F1F5-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,5]},"merperson":{"skin_variations":{"1F3FB":{"unified":"1F9DC-1F3FB","non_qualified":null,"image":"1f9dc-1f3fb.png","sheet_x":45,"sheet_y":45,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DC-1F3FB-200D-2642-FE0F"},"1F3FC":{"unified":"1F9DC-1F3FC","non_qualified":null,"image":"1f9dc-1f3fc.png","sheet_x":45,"sheet_y":46,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DC-1F3FC-200D-2642-FE0F"},"1F3FD":{"unified":"1F9DC-1F3FD","non_qualified":null,"image":"1f9dc-1f3fd.png","sheet_x":45,"sheet_y":47,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DC-1F3FD-200D-2642-FE0F"},"1F3FE":{"unified":"1F9DC-1F3FE","non_qualified":null,"image":"1f9dc-1f3fe.png","sheet_x":45,"sheet_y":48,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DC-1F3FE-200D-2642-FE0F"},"1F3FF":{"unified":"1F9DC-1F3FF","non_qualified":null,"image":"1f9dc-1f3ff.png","sheet_x":45,"sheet_y":49,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DC-1F3FF-200D-2642-FE0F"}},"obsoleted_by":"1F9DC-200D-2642-FE0F","a":"Merperson","b":"1F9DC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,44],"o":10},"black_medium_small_square":{"a":"Black Medium Small Square","b":"25FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["icon","shape","button"],"k":[47,15],"o":3},"snow_cloud":{"a":"Snow Cloud","b":"1F328-FE0F","c":"1F328","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,30],"o":7},"lightning":{"a":"Lightning","b":"1F329-FE0F","c":"1F329","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,31],"n":["lightning_cloud"],"o":7},"black_large_square":{"a":"Black Large Square","b":"2B1B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon","button"],"k":[50,20],"o":5},"mermaid":{"skin_variations":{"1F3FB":{"unified":"1F9DC-1F3FB-200D-2640-FE0F","non_qualified":"1F9DC-1F3FB-200D-2640","image":"1f9dc-1f3fb-200d-2640-fe0f.png","sheet_x":45,"sheet_y":33,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9DC-1F3FC-200D-2640-FE0F","non_qualified":"1F9DC-1F3FC-200D-2640","image":"1f9dc-1f3fc-200d-2640-fe0f.png","sheet_x":45,"sheet_y":34,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9DC-1F3FD-200D-2640-FE0F","non_qualified":"1F9DC-1F3FD-200D-2640","image":"1f9dc-1f3fd-200d-2640-fe0f.png","sheet_x":45,"sheet_y":35,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9DC-1F3FE-200D-2640-FE0F","non_qualified":"1F9DC-1F3FE-200D-2640","image":"1f9dc-1f3fe-200d-2640-fe0f.png","sheet_x":45,"sheet_y":36,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9DC-1F3FF-200D-2640-FE0F","non_qualified":"1F9DC-1F3FF-200D-2640","image":"1f9dc-1f3ff-200d-2640-fe0f.png","sheet_x":45,"sheet_y":37,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Mermaid","b":"1F9DC-200D-2640-FE0F","c":"1F9DC-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["woman","female","merwoman","ariel"],"k":[45,32],"o":10},"flag-pk":{"a":"Pakistan Flag","b":"1F1F5-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,6]},"merman":{"skin_variations":{"1F3FB":{"unified":"1F9DC-1F3FB-200D-2642-FE0F","non_qualified":"1F9DC-1F3FB-200D-2642","image":"1f9dc-1f3fb-200d-2642-fe0f.png","sheet_x":45,"sheet_y":39,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DC-1F3FB"},"1F3FC":{"unified":"1F9DC-1F3FC-200D-2642-FE0F","non_qualified":"1F9DC-1F3FC-200D-2642","image":"1f9dc-1f3fc-200d-2642-fe0f.png","sheet_x":45,"sheet_y":40,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DC-1F3FC"},"1F3FD":{"unified":"1F9DC-1F3FD-200D-2642-FE0F","non_qualified":"1F9DC-1F3FD-200D-2642","image":"1f9dc-1f3fd-200d-2642-fe0f.png","sheet_x":45,"sheet_y":41,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DC-1F3FD"},"1F3FE":{"unified":"1F9DC-1F3FE-200D-2642-FE0F","non_qualified":"1F9DC-1F3FE-200D-2642","image":"1f9dc-1f3fe-200d-2642-fe0f.png","sheet_x":45,"sheet_y":42,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DC-1F3FE"},"1F3FF":{"unified":"1F9DC-1F3FF-200D-2642-FE0F","non_qualified":"1F9DC-1F3FF-200D-2642","image":"1f9dc-1f3ff-200d-2642-fe0f.png","sheet_x":45,"sheet_y":43,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DC-1F3FF"}},"obsoletes":"1F9DC","a":"Merman","b":"1F9DC-200D-2642-FE0F","c":"1F9DC-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["man","male","triton"],"k":[45,38],"o":10},"white_large_square":{"a":"White Large Square","b":"2B1C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon","stone","button"],"k":[50,21],"o":5},"tornado":{"a":"Tornado","b":"1F32A-FE0F","c":"1F32A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["weather","cyclone","twister"],"k":[6,32],"n":["tornado_cloud"],"o":7},"flag-pl":{"a":"Poland Flag","b":"1F1F5-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,7]},"elf":{"skin_variations":{"1F3FB":{"unified":"1F9DD-1F3FB","non_qualified":null,"image":"1f9dd-1f3fb.png","sheet_x":46,"sheet_y":11,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DD-1F3FB-200D-2642-FE0F"},"1F3FC":{"unified":"1F9DD-1F3FC","non_qualified":null,"image":"1f9dd-1f3fc.png","sheet_x":46,"sheet_y":12,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DD-1F3FC-200D-2642-FE0F"},"1F3FD":{"unified":"1F9DD-1F3FD","non_qualified":null,"image":"1f9dd-1f3fd.png","sheet_x":46,"sheet_y":13,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DD-1F3FD-200D-2642-FE0F"},"1F3FE":{"unified":"1F9DD-1F3FE","non_qualified":null,"image":"1f9dd-1f3fe.png","sheet_x":46,"sheet_y":14,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DD-1F3FE-200D-2642-FE0F"},"1F3FF":{"unified":"1F9DD-1F3FF","non_qualified":null,"image":"1f9dd-1f3ff.png","sheet_x":46,"sheet_y":15,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9DD-1F3FF-200D-2642-FE0F"}},"obsoleted_by":"1F9DD-200D-2642-FE0F","a":"Elf","b":"1F9DD","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,10],"o":10},"fog":{"a":"Fog","b":"1F32B-FE0F","c":"1F32B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["weather"],"k":[6,33],"o":7},"large_orange_diamond":{"a":"Large Orange Diamond","b":"1F536","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,4]},"flag-pm":{"a":"St. Pierre & Miquelon Flag","b":"1F1F5-1F1F2","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[4,8]},"flag-pn":{"a":"Pitcairn Islands Flag","b":"1F1F5-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,9]},"wind_blowing_face":{"a":"Wind Blowing Face","b":"1F32C-FE0F","c":"1F32C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[6,34],"o":7},"female_elf":{"skin_variations":{"1F3FB":{"unified":"1F9DD-1F3FB-200D-2640-FE0F","non_qualified":"1F9DD-1F3FB-200D-2640","image":"1f9dd-1f3fb-200d-2640-fe0f.png","sheet_x":45,"sheet_y":51,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9DD-1F3FC-200D-2640-FE0F","non_qualified":"1F9DD-1F3FC-200D-2640","image":"1f9dd-1f3fc-200d-2640-fe0f.png","sheet_x":46,"sheet_y":0,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9DD-1F3FD-200D-2640-FE0F","non_qualified":"1F9DD-1F3FD-200D-2640","image":"1f9dd-1f3fd-200d-2640-fe0f.png","sheet_x":46,"sheet_y":1,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9DD-1F3FE-200D-2640-FE0F","non_qualified":"1F9DD-1F3FE-200D-2640","image":"1f9dd-1f3fe-200d-2640-fe0f.png","sheet_x":46,"sheet_y":2,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9DD-1F3FF-200D-2640-FE0F","non_qualified":"1F9DD-1F3FF-200D-2640","image":"1f9dd-1f3ff-200d-2640-fe0f.png","sheet_x":46,"sheet_y":3,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Female Elf","b":"1F9DD-200D-2640-FE0F","c":"1F9DD-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[45,50],"o":10},"large_blue_diamond":{"a":"Large Blue Diamond","b":"1F537","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,5]},"male_elf":{"skin_variations":{"1F3FB":{"unified":"1F9DD-1F3FB-200D-2642-FE0F","non_qualified":"1F9DD-1F3FB-200D-2642","image":"1f9dd-1f3fb-200d-2642-fe0f.png","sheet_x":46,"sheet_y":5,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DD-1F3FB"},"1F3FC":{"unified":"1F9DD-1F3FC-200D-2642-FE0F","non_qualified":"1F9DD-1F3FC-200D-2642","image":"1f9dd-1f3fc-200d-2642-fe0f.png","sheet_x":46,"sheet_y":6,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DD-1F3FC"},"1F3FD":{"unified":"1F9DD-1F3FD-200D-2642-FE0F","non_qualified":"1F9DD-1F3FD-200D-2642","image":"1f9dd-1f3fd-200d-2642-fe0f.png","sheet_x":46,"sheet_y":7,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DD-1F3FD"},"1F3FE":{"unified":"1F9DD-1F3FE-200D-2642-FE0F","non_qualified":"1F9DD-1F3FE-200D-2642","image":"1f9dd-1f3fe-200d-2642-fe0f.png","sheet_x":46,"sheet_y":8,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DD-1F3FE"},"1F3FF":{"unified":"1F9DD-1F3FF-200D-2642-FE0F","non_qualified":"1F9DD-1F3FF-200D-2642","image":"1f9dd-1f3ff-200d-2642-fe0f.png","sheet_x":46,"sheet_y":9,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9DD-1F3FF"}},"obsoletes":"1F9DD","a":"Male Elf","b":"1F9DD-200D-2642-FE0F","c":"1F9DD-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,4],"o":10},"small_orange_diamond":{"a":"Small Orange Diamond","b":"1F538","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,6]},"flag-pr":{"a":"Puerto Rico Flag","b":"1F1F5-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,10]},"cyclone":{"a":"Cyclone","b":"1F300","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","swirl","blue","cloud","vortex","spiral","whirlpool","spin","tornado","hurricane","typhoon"],"k":[5,44]},"rainbow":{"a":"Rainbow","b":"1F308","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["nature","happy","unicorn_face","photo","sky","spring"],"k":[6,0]},"small_blue_diamond":{"a":"Small Blue Diamond","b":"1F539","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","jewel","gem"],"k":[28,7]},"genie":{"obsoleted_by":"1F9DE-200D-2642-FE0F","a":"Genie","b":"1F9DE","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,18],"o":10},"flag-ps":{"a":"Palestinian Territories Flag","b":"1F1F5-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,11]},"small_red_triangle":{"a":"Up-Pointing Red Triangle","b":"1F53A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","direction","up","top"],"k":[28,8]},"closed_umbrella":{"a":"Closed Umbrella","b":"1F302","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["weather","rain","drizzle"],"k":[5,46]},"female_genie":{"a":"Female Genie","b":"1F9DE-200D-2640-FE0F","c":"1F9DE-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,16],"o":10},"flag-pt":{"a":"Portugal Flag","b":"1F1F5-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,12]},"flag-pw":{"a":"Palau Flag","b":"1F1F5-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,13]},"small_red_triangle_down":{"a":"Down-Pointing Red Triangle","b":"1F53B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","direction","bottom"],"k":[28,9]},"umbrella":{"a":"Umbrella","b":"2602-FE0F","c":"2602","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["rainy","weather","spring"],"k":[47,18],"o":1},"male_genie":{"obsoletes":"1F9DE","a":"Male Genie","b":"1F9DE-200D-2642-FE0F","c":"1F9DE-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,17],"o":10},"zombie":{"obsoleted_by":"1F9DF-200D-2642-FE0F","a":"Zombie","b":"1F9DF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,21],"o":10},"flag-py":{"a":"Paraguay Flag","b":"1F1F5-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,14]},"diamond_shape_with_a_dot_inside":{"a":"Diamond Shape with a Dot Inside","b":"1F4A0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["jewel","blue","gem","crystal","fancy"],"k":[25,6]},"umbrella_with_rain_drops":{"a":"Umbrella with Rain Drops","b":"2614","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[47,23],"o":4},"radio_button":{"a":"Radio Button","b":"1F518","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["input","old","music","circle"],"k":[27,26]},"female_zombie":{"a":"Female Zombie","b":"1F9DF-200D-2640-FE0F","c":"1F9DF-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,19],"o":10},"flag-qa":{"a":"Qatar Flag","b":"1F1F6-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,15]},"umbrella_on_ground":{"a":"Umbrella on Ground","b":"26F1-FE0F","c":"26F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[48,39],"o":5},"black_square_button":{"a":"Black Square Button","b":"1F532","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","input","frame"],"k":[28,0]},"zap":{"a":"High Voltage Sign","b":"26A1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["thunder","weather","lightning bolt","fast"],"k":[48,21],"o":4},"male_zombie":{"obsoletes":"1F9DF","a":"Male Zombie","b":"1F9DF-200D-2642-FE0F","c":"1F9DF-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,20],"o":10},"flag-re":{"a":"Réunion Flag","b":"1F1F7-1F1EA","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[4,16]},"flag-ro":{"a":"Romania Flag","b":"1F1F7-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,17]},"snowflake":{"a":"Snowflake","b":"2744-FE0F","c":"2744","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["winter","season","cold","weather","christmas","xmas"],"k":[49,51],"o":1},"white_square_button":{"a":"White Square Button","b":"1F533","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","input"],"k":[28,1]},"person_frowning":{"skin_variations":{"1F3FB":{"unified":"1F64D-1F3FB","non_qualified":null,"image":"1f64d-1f3fb.png","sheet_x":33,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F64D-1F3FC","non_qualified":null,"image":"1f64d-1f3fc.png","sheet_x":33,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F64D-1F3FD","non_qualified":null,"image":"1f64d-1f3fd.png","sheet_x":33,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F64D-1F3FE","non_qualified":null,"image":"1f64d-1f3fe.png","sheet_x":33,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F64D-1F3FF","non_qualified":null,"image":"1f64d-1f3ff.png","sheet_x":33,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F64D-200D-2640-FE0F","a":"Person Frowning","b":"1F64D","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[33,30]},"flag-rs":{"a":"Serbia Flag","b":"1F1F7-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,18]},"man-frowning":{"skin_variations":{"1F3FB":{"unified":"1F64D-1F3FB-200D-2642-FE0F","non_qualified":"1F64D-1F3FB-200D-2642","image":"1f64d-1f3fb-200d-2642-fe0f.png","sheet_x":33,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F64D-1F3FC-200D-2642-FE0F","non_qualified":"1F64D-1F3FC-200D-2642","image":"1f64d-1f3fc-200d-2642-fe0f.png","sheet_x":33,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F64D-1F3FD-200D-2642-FE0F","non_qualified":"1F64D-1F3FD-200D-2642","image":"1f64d-1f3fd-200d-2642-fe0f.png","sheet_x":33,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F64D-1F3FE-200D-2642-FE0F","non_qualified":"1F64D-1F3FE-200D-2642","image":"1f64d-1f3fe-200d-2642-fe0f.png","sheet_x":33,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F64D-1F3FF-200D-2642-FE0F","non_qualified":"1F64D-1F3FF-200D-2642","image":"1f64d-1f3ff-200d-2642-fe0f.png","sheet_x":33,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Frowning","b":"1F64D-200D-2642-FE0F","c":"1F64D-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[33,24]},"white_circle":{"a":"Medium White Circle","b":"26AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","round"],"k":[48,22],"o":4},"snowman":{"a":"Snowman","b":"2603-FE0F","c":"2603","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["winter","season","cold","weather","christmas","xmas","frozen","without_snow"],"k":[47,19],"o":1},"snowman_without_snow":{"a":"Snowman Without Snow","b":"26C4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[48,28],"o":5},"ru":{"a":"Russia Flag","b":"1F1F7-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["russian","federation","flag","nation","country","banner"],"k":[4,19],"n":["flag-ru"]},"black_circle":{"a":"Medium Black Circle","b":"26AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","button","round"],"k":[48,23],"o":4},"woman-frowning":{"skin_variations":{"1F3FB":{"unified":"1F64D-1F3FB-200D-2640-FE0F","non_qualified":"1F64D-1F3FB-200D-2640","image":"1f64d-1f3fb-200d-2640-fe0f.png","sheet_x":33,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F64D-1F3FC-200D-2640-FE0F","non_qualified":"1F64D-1F3FC-200D-2640","image":"1f64d-1f3fc-200d-2640-fe0f.png","sheet_x":33,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F64D-1F3FD-200D-2640-FE0F","non_qualified":"1F64D-1F3FD-200D-2640","image":"1f64d-1f3fd-200d-2640-fe0f.png","sheet_x":33,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F64D-1F3FE-200D-2640-FE0F","non_qualified":"1F64D-1F3FE-200D-2640","image":"1f64d-1f3fe-200d-2640-fe0f.png","sheet_x":33,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F64D-1F3FF-200D-2640-FE0F","non_qualified":"1F64D-1F3FF-200D-2640","image":"1f64d-1f3ff-200d-2640-fe0f.png","sheet_x":33,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F64D","a":"Woman Frowning","b":"1F64D-200D-2640-FE0F","c":"1F64D-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[33,18]},"flag-rw":{"a":"Rwanda Flag","b":"1F1F7-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,20]},"comet":{"a":"Comet","b":"2604-FE0F","c":"2604","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["space"],"k":[47,20],"o":1},"person_with_pouting_face":{"skin_variations":{"1F3FB":{"unified":"1F64E-1F3FB","non_qualified":null,"image":"1f64e-1f3fb.png","sheet_x":33,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F64E-1F3FC","non_qualified":null,"image":"1f64e-1f3fc.png","sheet_x":33,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F64E-1F3FD","non_qualified":null,"image":"1f64e-1f3fd.png","sheet_x":33,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F64E-1F3FE","non_qualified":null,"image":"1f64e-1f3fe.png","sheet_x":34,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F64E-1F3FF","non_qualified":null,"image":"1f64e-1f3ff.png","sheet_x":34,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F64E-200D-2640-FE0F","a":"Person with Pouting Face","b":"1F64E","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[33,48]},"red_circle":{"a":"Large Red Circle","b":"1F534","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","error","danger"],"k":[28,2]},"large_blue_circle":{"a":"Large Blue Circle","b":"1F535","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shape","icon","button"],"k":[28,3]},"man-pouting":{"skin_variations":{"1F3FB":{"unified":"1F64E-1F3FB-200D-2642-FE0F","non_qualified":"1F64E-1F3FB-200D-2642","image":"1f64e-1f3fb-200d-2642-fe0f.png","sheet_x":33,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F64E-1F3FC-200D-2642-FE0F","non_qualified":"1F64E-1F3FC-200D-2642","image":"1f64e-1f3fc-200d-2642-fe0f.png","sheet_x":33,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F64E-1F3FD-200D-2642-FE0F","non_qualified":"1F64E-1F3FD-200D-2642","image":"1f64e-1f3fd-200d-2642-fe0f.png","sheet_x":33,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F64E-1F3FE-200D-2642-FE0F","non_qualified":"1F64E-1F3FE-200D-2642","image":"1f64e-1f3fe-200d-2642-fe0f.png","sheet_x":33,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F64E-1F3FF-200D-2642-FE0F","non_qualified":"1F64E-1F3FF-200D-2642","image":"1f64e-1f3ff-200d-2642-fe0f.png","sheet_x":33,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Pouting","b":"1F64E-200D-2642-FE0F","c":"1F64E-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[33,42]},"flag-sa":{"a":"Saudi Arabia Flag","b":"1F1F8-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,21]},"fire":{"a":"Fire","b":"1F525","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hot","cook","flame"],"k":[27,39]},"woman-pouting":{"skin_variations":{"1F3FB":{"unified":"1F64E-1F3FB-200D-2640-FE0F","non_qualified":"1F64E-1F3FB-200D-2640","image":"1f64e-1f3fb-200d-2640-fe0f.png","sheet_x":33,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F64E-1F3FC-200D-2640-FE0F","non_qualified":"1F64E-1F3FC-200D-2640","image":"1f64e-1f3fc-200d-2640-fe0f.png","sheet_x":33,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F64E-1F3FD-200D-2640-FE0F","non_qualified":"1F64E-1F3FD-200D-2640","image":"1f64e-1f3fd-200d-2640-fe0f.png","sheet_x":33,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F64E-1F3FE-200D-2640-FE0F","non_qualified":"1F64E-1F3FE-200D-2640","image":"1f64e-1f3fe-200d-2640-fe0f.png","sheet_x":33,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F64E-1F3FF-200D-2640-FE0F","non_qualified":"1F64E-1F3FF-200D-2640","image":"1f64e-1f3ff-200d-2640-fe0f.png","sheet_x":33,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F64E","a":"Woman Pouting","b":"1F64E-200D-2640-FE0F","c":"1F64E-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[33,36]},"flag-sb":{"a":"Solomon Islands Flag","b":"1F1F8-1F1E7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,22]},"droplet":{"a":"Droplet","b":"1F4A7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["water","drip","faucet","spring"],"k":[25,13]},"no_good":{"skin_variations":{"1F3FB":{"unified":"1F645-1F3FB","non_qualified":null,"image":"1f645-1f3fb.png","sheet_x":32,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F645-1F3FC","non_qualified":null,"image":"1f645-1f3fc.png","sheet_x":32,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F645-1F3FD","non_qualified":null,"image":"1f645-1f3fd.png","sheet_x":32,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F645-1F3FE","non_qualified":null,"image":"1f645-1f3fe.png","sheet_x":32,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F645-1F3FF","non_qualified":null,"image":"1f645-1f3ff.png","sheet_x":32,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F645-200D-2640-FE0F","a":"Face with No Good Gesture","b":"1F645","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[32,1]},"flag-sc":{"a":"Seychelles Flag","b":"1F1F8-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,23]},"ocean":{"a":"Water Wave","b":"1F30A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sea","water","wave","nature","tsunami","disaster"],"k":[6,2]},"man-gesturing-no":{"skin_variations":{"1F3FB":{"unified":"1F645-1F3FB-200D-2642-FE0F","non_qualified":"1F645-1F3FB-200D-2642","image":"1f645-1f3fb-200d-2642-fe0f.png","sheet_x":31,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F645-1F3FC-200D-2642-FE0F","non_qualified":"1F645-1F3FC-200D-2642","image":"1f645-1f3fc-200d-2642-fe0f.png","sheet_x":31,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F645-1F3FD-200D-2642-FE0F","non_qualified":"1F645-1F3FD-200D-2642","image":"1f645-1f3fd-200d-2642-fe0f.png","sheet_x":31,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F645-1F3FE-200D-2642-FE0F","non_qualified":"1F645-1F3FE-200D-2642","image":"1f645-1f3fe-200d-2642-fe0f.png","sheet_x":31,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F645-1F3FF-200D-2642-FE0F","non_qualified":"1F645-1F3FF-200D-2642","image":"1f645-1f3ff-200d-2642-fe0f.png","sheet_x":32,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Gesturing No","b":"1F645-200D-2642-FE0F","c":"1F645-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[31,47]},"flag-sd":{"a":"Sudan Flag","b":"1F1F8-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,24]},"woman-gesturing-no":{"skin_variations":{"1F3FB":{"unified":"1F645-1F3FB-200D-2640-FE0F","non_qualified":"1F645-1F3FB-200D-2640","image":"1f645-1f3fb-200d-2640-fe0f.png","sheet_x":31,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F645-1F3FC-200D-2640-FE0F","non_qualified":"1F645-1F3FC-200D-2640","image":"1f645-1f3fc-200d-2640-fe0f.png","sheet_x":31,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F645-1F3FD-200D-2640-FE0F","non_qualified":"1F645-1F3FD-200D-2640","image":"1f645-1f3fd-200d-2640-fe0f.png","sheet_x":31,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F645-1F3FE-200D-2640-FE0F","non_qualified":"1F645-1F3FE-200D-2640","image":"1f645-1f3fe-200d-2640-fe0f.png","sheet_x":31,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F645-1F3FF-200D-2640-FE0F","non_qualified":"1F645-1F3FF-200D-2640","image":"1f645-1f3ff-200d-2640-fe0f.png","sheet_x":31,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F645","a":"Woman Gesturing No","b":"1F645-200D-2640-FE0F","c":"1F645-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[31,41]},"flag-se":{"a":"Sweden Flag","b":"1F1F8-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,25]},"flag-sg":{"a":"Singapore Flag","b":"1F1F8-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,26]},"ok_woman":{"skin_variations":{"1F3FB":{"unified":"1F646-1F3FB","non_qualified":null,"image":"1f646-1f3fb.png","sheet_x":32,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F646-1F3FC","non_qualified":null,"image":"1f646-1f3fc.png","sheet_x":32,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F646-1F3FD","non_qualified":null,"image":"1f646-1f3fd.png","sheet_x":32,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F646-1F3FE","non_qualified":null,"image":"1f646-1f3fe.png","sheet_x":32,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F646-1F3FF","non_qualified":null,"image":"1f646-1f3ff.png","sheet_x":32,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F646-200D-2640-FE0F","a":"Face with Ok Gesture","b":"1F646","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"j":["women","girl","female","pink","human","woman"],"k":[32,19]},"flag-sh":{"a":"St. Helena Flag","b":"1F1F8-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,27]},"man-gesturing-ok":{"skin_variations":{"1F3FB":{"unified":"1F646-1F3FB-200D-2642-FE0F","non_qualified":"1F646-1F3FB-200D-2642","image":"1f646-1f3fb-200d-2642-fe0f.png","sheet_x":32,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F646-1F3FC-200D-2642-FE0F","non_qualified":"1F646-1F3FC-200D-2642","image":"1f646-1f3fc-200d-2642-fe0f.png","sheet_x":32,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F646-1F3FD-200D-2642-FE0F","non_qualified":"1F646-1F3FD-200D-2642","image":"1f646-1f3fd-200d-2642-fe0f.png","sheet_x":32,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F646-1F3FE-200D-2642-FE0F","non_qualified":"1F646-1F3FE-200D-2642","image":"1f646-1f3fe-200d-2642-fe0f.png","sheet_x":32,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F646-1F3FF-200D-2642-FE0F","non_qualified":"1F646-1F3FF-200D-2642","image":"1f646-1f3ff-200d-2642-fe0f.png","sheet_x":32,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Gesturing Ok","b":"1F646-200D-2642-FE0F","c":"1F646-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[32,13]},"flag-si":{"a":"Slovenia Flag","b":"1F1F8-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,28]},"woman-gesturing-ok":{"skin_variations":{"1F3FB":{"unified":"1F646-1F3FB-200D-2640-FE0F","non_qualified":"1F646-1F3FB-200D-2640","image":"1f646-1f3fb-200d-2640-fe0f.png","sheet_x":32,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F646-1F3FC-200D-2640-FE0F","non_qualified":"1F646-1F3FC-200D-2640","image":"1f646-1f3fc-200d-2640-fe0f.png","sheet_x":32,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F646-1F3FD-200D-2640-FE0F","non_qualified":"1F646-1F3FD-200D-2640","image":"1f646-1f3fd-200d-2640-fe0f.png","sheet_x":32,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F646-1F3FE-200D-2640-FE0F","non_qualified":"1F646-1F3FE-200D-2640","image":"1f646-1f3fe-200d-2640-fe0f.png","sheet_x":32,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F646-1F3FF-200D-2640-FE0F","non_qualified":"1F646-1F3FF-200D-2640","image":"1f646-1f3ff-200d-2640-fe0f.png","sheet_x":32,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F646","a":"Woman Gesturing Ok","b":"1F646-200D-2640-FE0F","c":"1F646-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[32,7]},"information_desk_person":{"skin_variations":{"1F3FB":{"unified":"1F481-1F3FB","non_qualified":null,"image":"1f481-1f3fb.png","sheet_x":23,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F481-1F3FC","non_qualified":null,"image":"1f481-1f3fc.png","sheet_x":23,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F481-1F3FD","non_qualified":null,"image":"1f481-1f3fd.png","sheet_x":23,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F481-1F3FE","non_qualified":null,"image":"1f481-1f3fe.png","sheet_x":23,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F481-1F3FF","non_qualified":null,"image":"1f481-1f3ff.png","sheet_x":23,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F481-200D-2640-FE0F","a":"Information Desk Person","b":"1F481","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[23,13]},"flag-sj":{"a":"Svalbard & Jan Mayen Flag","b":"1F1F8-1F1EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,29]},"man-tipping-hand":{"skin_variations":{"1F3FB":{"unified":"1F481-1F3FB-200D-2642-FE0F","non_qualified":"1F481-1F3FB-200D-2642","image":"1f481-1f3fb-200d-2642-fe0f.png","sheet_x":23,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F481-1F3FC-200D-2642-FE0F","non_qualified":"1F481-1F3FC-200D-2642","image":"1f481-1f3fc-200d-2642-fe0f.png","sheet_x":23,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F481-1F3FD-200D-2642-FE0F","non_qualified":"1F481-1F3FD-200D-2642","image":"1f481-1f3fd-200d-2642-fe0f.png","sheet_x":23,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F481-1F3FE-200D-2642-FE0F","non_qualified":"1F481-1F3FE-200D-2642","image":"1f481-1f3fe-200d-2642-fe0f.png","sheet_x":23,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F481-1F3FF-200D-2642-FE0F","non_qualified":"1F481-1F3FF-200D-2642","image":"1f481-1f3ff-200d-2642-fe0f.png","sheet_x":23,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Tipping Hand","b":"1F481-200D-2642-FE0F","c":"1F481-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[23,7]},"flag-sk":{"a":"Slovakia Flag","b":"1F1F8-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,30]},"flag-sl":{"a":"Sierra Leone Flag","b":"1F1F8-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,31]},"woman-tipping-hand":{"skin_variations":{"1F3FB":{"unified":"1F481-1F3FB-200D-2640-FE0F","non_qualified":"1F481-1F3FB-200D-2640","image":"1f481-1f3fb-200d-2640-fe0f.png","sheet_x":23,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F481-1F3FC-200D-2640-FE0F","non_qualified":"1F481-1F3FC-200D-2640","image":"1f481-1f3fc-200d-2640-fe0f.png","sheet_x":23,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F481-1F3FD-200D-2640-FE0F","non_qualified":"1F481-1F3FD-200D-2640","image":"1f481-1f3fd-200d-2640-fe0f.png","sheet_x":23,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F481-1F3FE-200D-2640-FE0F","non_qualified":"1F481-1F3FE-200D-2640","image":"1f481-1f3fe-200d-2640-fe0f.png","sheet_x":23,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F481-1F3FF-200D-2640-FE0F","non_qualified":"1F481-1F3FF-200D-2640","image":"1f481-1f3ff-200d-2640-fe0f.png","sheet_x":23,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F481","a":"Woman Tipping Hand","b":"1F481-200D-2640-FE0F","c":"1F481-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[23,1]},"flag-sm":{"a":"San Marino Flag","b":"1F1F8-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,32]},"raising_hand":{"skin_variations":{"1F3FB":{"unified":"1F64B-1F3FB","non_qualified":null,"image":"1f64b-1f3fb.png","sheet_x":33,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F64B-1F3FC","non_qualified":null,"image":"1f64b-1f3fc.png","sheet_x":33,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F64B-1F3FD","non_qualified":null,"image":"1f64b-1f3fd.png","sheet_x":33,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F64B-1F3FE","non_qualified":null,"image":"1f64b-1f3fe.png","sheet_x":33,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F64B-1F3FF","non_qualified":null,"image":"1f64b-1f3ff.png","sheet_x":33,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F64B-200D-2640-FE0F","a":"Happy Person Raising One Hand","b":"1F64B","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[33,6]},"flag-sn":{"a":"Senegal Flag","b":"1F1F8-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,33]},"man-raising-hand":{"skin_variations":{"1F3FB":{"unified":"1F64B-1F3FB-200D-2642-FE0F","non_qualified":"1F64B-1F3FB-200D-2642","image":"1f64b-1f3fb-200d-2642-fe0f.png","sheet_x":33,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F64B-1F3FC-200D-2642-FE0F","non_qualified":"1F64B-1F3FC-200D-2642","image":"1f64b-1f3fc-200d-2642-fe0f.png","sheet_x":33,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F64B-1F3FD-200D-2642-FE0F","non_qualified":"1F64B-1F3FD-200D-2642","image":"1f64b-1f3fd-200d-2642-fe0f.png","sheet_x":33,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F64B-1F3FE-200D-2642-FE0F","non_qualified":"1F64B-1F3FE-200D-2642","image":"1f64b-1f3fe-200d-2642-fe0f.png","sheet_x":33,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F64B-1F3FF-200D-2642-FE0F","non_qualified":"1F64B-1F3FF-200D-2642","image":"1f64b-1f3ff-200d-2642-fe0f.png","sheet_x":33,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Raising Hand","b":"1F64B-200D-2642-FE0F","c":"1F64B-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[33,0]},"flag-so":{"a":"Somalia Flag","b":"1F1F8-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,34]},"woman-raising-hand":{"skin_variations":{"1F3FB":{"unified":"1F64B-1F3FB-200D-2640-FE0F","non_qualified":"1F64B-1F3FB-200D-2640","image":"1f64b-1f3fb-200d-2640-fe0f.png","sheet_x":32,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F64B-1F3FC-200D-2640-FE0F","non_qualified":"1F64B-1F3FC-200D-2640","image":"1f64b-1f3fc-200d-2640-fe0f.png","sheet_x":32,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F64B-1F3FD-200D-2640-FE0F","non_qualified":"1F64B-1F3FD-200D-2640","image":"1f64b-1f3fd-200d-2640-fe0f.png","sheet_x":32,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F64B-1F3FE-200D-2640-FE0F","non_qualified":"1F64B-1F3FE-200D-2640","image":"1f64b-1f3fe-200d-2640-fe0f.png","sheet_x":32,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F64B-1F3FF-200D-2640-FE0F","non_qualified":"1F64B-1F3FF-200D-2640","image":"1f64b-1f3ff-200d-2640-fe0f.png","sheet_x":32,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F64B","a":"Woman Raising Hand","b":"1F64B-200D-2640-FE0F","c":"1F64B-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[32,46]},"flag-sr":{"a":"Suriname Flag","b":"1F1F8-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,35]},"bow":{"skin_variations":{"1F3FB":{"unified":"1F647-1F3FB","non_qualified":null,"image":"1f647-1f3fb.png","sheet_x":32,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F647-1F3FC","non_qualified":null,"image":"1f647-1f3fc.png","sheet_x":32,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F647-1F3FD","non_qualified":null,"image":"1f647-1f3fd.png","sheet_x":32,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F647-1F3FE","non_qualified":null,"image":"1f647-1f3fe.png","sheet_x":32,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F647-1F3FF","non_qualified":null,"image":"1f647-1f3ff.png","sheet_x":32,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F647-200D-2642-FE0F","a":"Person Bowing Deeply","b":"1F647","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[32,37]},"man-bowing":{"skin_variations":{"1F3FB":{"unified":"1F647-1F3FB-200D-2642-FE0F","non_qualified":"1F647-1F3FB-200D-2642","image":"1f647-1f3fb-200d-2642-fe0f.png","sheet_x":32,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F647-1F3FC-200D-2642-FE0F","non_qualified":"1F647-1F3FC-200D-2642","image":"1f647-1f3fc-200d-2642-fe0f.png","sheet_x":32,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F647-1F3FD-200D-2642-FE0F","non_qualified":"1F647-1F3FD-200D-2642","image":"1f647-1f3fd-200d-2642-fe0f.png","sheet_x":32,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F647-1F3FE-200D-2642-FE0F","non_qualified":"1F647-1F3FE-200D-2642","image":"1f647-1f3fe-200d-2642-fe0f.png","sheet_x":32,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F647-1F3FF-200D-2642-FE0F","non_qualified":"1F647-1F3FF-200D-2642","image":"1f647-1f3ff-200d-2642-fe0f.png","sheet_x":32,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F647","a":"Man Bowing","b":"1F647-200D-2642-FE0F","c":"1F647-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[32,31]},"flag-ss":{"a":"South Sudan Flag","b":"1F1F8-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,36]},"woman-bowing":{"skin_variations":{"1F3FB":{"unified":"1F647-1F3FB-200D-2640-FE0F","non_qualified":"1F647-1F3FB-200D-2640","image":"1f647-1f3fb-200d-2640-fe0f.png","sheet_x":32,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F647-1F3FC-200D-2640-FE0F","non_qualified":"1F647-1F3FC-200D-2640","image":"1f647-1f3fc-200d-2640-fe0f.png","sheet_x":32,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F647-1F3FD-200D-2640-FE0F","non_qualified":"1F647-1F3FD-200D-2640","image":"1f647-1f3fd-200d-2640-fe0f.png","sheet_x":32,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F647-1F3FE-200D-2640-FE0F","non_qualified":"1F647-1F3FE-200D-2640","image":"1f647-1f3fe-200d-2640-fe0f.png","sheet_x":32,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F647-1F3FF-200D-2640-FE0F","non_qualified":"1F647-1F3FF-200D-2640","image":"1f647-1f3ff-200d-2640-fe0f.png","sheet_x":32,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Bowing","b":"1F647-200D-2640-FE0F","c":"1F647-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[32,25]},"flag-st":{"a":"São Tomé & Príncipe Flag","b":"1F1F8-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,37]},"face_palm":{"skin_variations":{"1F3FB":{"unified":"1F926-1F3FB","non_qualified":null,"image":"1f926-1f3fb.png","sheet_x":38,"sheet_y":42,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F926-1F3FC","non_qualified":null,"image":"1f926-1f3fc.png","sheet_x":38,"sheet_y":43,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F926-1F3FD","non_qualified":null,"image":"1f926-1f3fd.png","sheet_x":38,"sheet_y":44,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F926-1F3FE","non_qualified":null,"image":"1f926-1f3fe.png","sheet_x":38,"sheet_y":45,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F926-1F3FF","non_qualified":null,"image":"1f926-1f3ff.png","sheet_x":38,"sheet_y":46,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Face Palm","b":"1F926","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[38,41],"o":9},"flag-sv":{"a":"El Salvador Flag","b":"1F1F8-1F1FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,38]},"man-facepalming":{"skin_variations":{"1F3FB":{"unified":"1F926-1F3FB-200D-2642-FE0F","non_qualified":"1F926-1F3FB-200D-2642","image":"1f926-1f3fb-200d-2642-fe0f.png","sheet_x":38,"sheet_y":36,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F926-1F3FC-200D-2642-FE0F","non_qualified":"1F926-1F3FC-200D-2642","image":"1f926-1f3fc-200d-2642-fe0f.png","sheet_x":38,"sheet_y":37,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F926-1F3FD-200D-2642-FE0F","non_qualified":"1F926-1F3FD-200D-2642","image":"1f926-1f3fd-200d-2642-fe0f.png","sheet_x":38,"sheet_y":38,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F926-1F3FE-200D-2642-FE0F","non_qualified":"1F926-1F3FE-200D-2642","image":"1f926-1f3fe-200d-2642-fe0f.png","sheet_x":38,"sheet_y":39,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F926-1F3FF-200D-2642-FE0F","non_qualified":"1F926-1F3FF-200D-2642","image":"1f926-1f3ff-200d-2642-fe0f.png","sheet_x":38,"sheet_y":40,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Facepalming","b":"1F926-200D-2642-FE0F","c":"1F926-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,35],"o":9},"flag-sx":{"a":"Sint Maarten Flag","b":"1F1F8-1F1FD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,39]},"flag-sy":{"a":"Syria Flag","b":"1F1F8-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,40]},"woman-facepalming":{"skin_variations":{"1F3FB":{"unified":"1F926-1F3FB-200D-2640-FE0F","non_qualified":"1F926-1F3FB-200D-2640","image":"1f926-1f3fb-200d-2640-fe0f.png","sheet_x":38,"sheet_y":30,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F926-1F3FC-200D-2640-FE0F","non_qualified":"1F926-1F3FC-200D-2640","image":"1f926-1f3fc-200d-2640-fe0f.png","sheet_x":38,"sheet_y":31,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F926-1F3FD-200D-2640-FE0F","non_qualified":"1F926-1F3FD-200D-2640","image":"1f926-1f3fd-200d-2640-fe0f.png","sheet_x":38,"sheet_y":32,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F926-1F3FE-200D-2640-FE0F","non_qualified":"1F926-1F3FE-200D-2640","image":"1f926-1f3fe-200d-2640-fe0f.png","sheet_x":38,"sheet_y":33,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F926-1F3FF-200D-2640-FE0F","non_qualified":"1F926-1F3FF-200D-2640","image":"1f926-1f3ff-200d-2640-fe0f.png","sheet_x":38,"sheet_y":34,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Facepalming","b":"1F926-200D-2640-FE0F","c":"1F926-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,29],"o":9},"shrug":{"skin_variations":{"1F3FB":{"unified":"1F937-1F3FB","non_qualified":null,"image":"1f937-1f3fb.png","sheet_x":40,"sheet_y":7,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F937-1F3FC","non_qualified":null,"image":"1f937-1f3fc.png","sheet_x":40,"sheet_y":8,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F937-1F3FD","non_qualified":null,"image":"1f937-1f3fd.png","sheet_x":40,"sheet_y":9,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F937-1F3FE","non_qualified":null,"image":"1f937-1f3fe.png","sheet_x":40,"sheet_y":10,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F937-1F3FF","non_qualified":null,"image":"1f937-1f3ff.png","sheet_x":40,"sheet_y":11,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Shrug","b":"1F937","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[40,6],"o":9},"flag-sz":{"a":"Swaziland Flag","b":"1F1F8-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,41]},"flag-ta":{"a":"Tristan Da Cunha Flag","b":"1F1F9-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,42]},"man-shrugging":{"skin_variations":{"1F3FB":{"unified":"1F937-1F3FB-200D-2642-FE0F","non_qualified":"1F937-1F3FB-200D-2642","image":"1f937-1f3fb-200d-2642-fe0f.png","sheet_x":40,"sheet_y":1,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F937-1F3FC-200D-2642-FE0F","non_qualified":"1F937-1F3FC-200D-2642","image":"1f937-1f3fc-200d-2642-fe0f.png","sheet_x":40,"sheet_y":2,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F937-1F3FD-200D-2642-FE0F","non_qualified":"1F937-1F3FD-200D-2642","image":"1f937-1f3fd-200d-2642-fe0f.png","sheet_x":40,"sheet_y":3,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F937-1F3FE-200D-2642-FE0F","non_qualified":"1F937-1F3FE-200D-2642","image":"1f937-1f3fe-200d-2642-fe0f.png","sheet_x":40,"sheet_y":4,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F937-1F3FF-200D-2642-FE0F","non_qualified":"1F937-1F3FF-200D-2642","image":"1f937-1f3ff-200d-2642-fe0f.png","sheet_x":40,"sheet_y":5,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Shrugging","b":"1F937-200D-2642-FE0F","c":"1F937-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,0],"o":9},"woman-shrugging":{"skin_variations":{"1F3FB":{"unified":"1F937-1F3FB-200D-2640-FE0F","non_qualified":"1F937-1F3FB-200D-2640","image":"1f937-1f3fb-200d-2640-fe0f.png","sheet_x":39,"sheet_y":47,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F937-1F3FC-200D-2640-FE0F","non_qualified":"1F937-1F3FC-200D-2640","image":"1f937-1f3fc-200d-2640-fe0f.png","sheet_x":39,"sheet_y":48,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F937-1F3FD-200D-2640-FE0F","non_qualified":"1F937-1F3FD-200D-2640","image":"1f937-1f3fd-200d-2640-fe0f.png","sheet_x":39,"sheet_y":49,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F937-1F3FE-200D-2640-FE0F","non_qualified":"1F937-1F3FE-200D-2640","image":"1f937-1f3fe-200d-2640-fe0f.png","sheet_x":39,"sheet_y":50,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F937-1F3FF-200D-2640-FE0F","non_qualified":"1F937-1F3FF-200D-2640","image":"1f937-1f3ff-200d-2640-fe0f.png","sheet_x":39,"sheet_y":51,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Shrugging","b":"1F937-200D-2640-FE0F","c":"1F937-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[39,46],"o":9},"flag-tc":{"a":"Turks & Caicos Islands Flag","b":"1F1F9-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,43]},"massage":{"skin_variations":{"1F3FB":{"unified":"1F486-1F3FB","non_qualified":null,"image":"1f486-1f3fb.png","sheet_x":24,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F486-1F3FC","non_qualified":null,"image":"1f486-1f3fc.png","sheet_x":24,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F486-1F3FD","non_qualified":null,"image":"1f486-1f3fd.png","sheet_x":24,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F486-1F3FE","non_qualified":null,"image":"1f486-1f3fe.png","sheet_x":24,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F486-1F3FF","non_qualified":null,"image":"1f486-1f3ff.png","sheet_x":24,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F486-200D-2640-FE0F","a":"Face Massage","b":"1F486","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,10]},"flag-td":{"a":"Chad Flag","b":"1F1F9-1F1E9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,44]},"man-getting-massage":{"skin_variations":{"1F3FB":{"unified":"1F486-1F3FB-200D-2642-FE0F","non_qualified":"1F486-1F3FB-200D-2642","image":"1f486-1f3fb-200d-2642-fe0f.png","sheet_x":24,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F486-1F3FC-200D-2642-FE0F","non_qualified":"1F486-1F3FC-200D-2642","image":"1f486-1f3fc-200d-2642-fe0f.png","sheet_x":24,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F486-1F3FD-200D-2642-FE0F","non_qualified":"1F486-1F3FD-200D-2642","image":"1f486-1f3fd-200d-2642-fe0f.png","sheet_x":24,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F486-1F3FE-200D-2642-FE0F","non_qualified":"1F486-1F3FE-200D-2642","image":"1f486-1f3fe-200d-2642-fe0f.png","sheet_x":24,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F486-1F3FF-200D-2642-FE0F","non_qualified":"1F486-1F3FF-200D-2642","image":"1f486-1f3ff-200d-2642-fe0f.png","sheet_x":24,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Getting Massage","b":"1F486-200D-2642-FE0F","c":"1F486-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[24,4]},"flag-tf":{"a":"French Southern Territories Flag","b":"1F1F9-1F1EB","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[4,45]},"woman-getting-massage":{"skin_variations":{"1F3FB":{"unified":"1F486-1F3FB-200D-2640-FE0F","non_qualified":"1F486-1F3FB-200D-2640","image":"1f486-1f3fb-200d-2640-fe0f.png","sheet_x":23,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F486-1F3FC-200D-2640-FE0F","non_qualified":"1F486-1F3FC-200D-2640","image":"1f486-1f3fc-200d-2640-fe0f.png","sheet_x":24,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F486-1F3FD-200D-2640-FE0F","non_qualified":"1F486-1F3FD-200D-2640","image":"1f486-1f3fd-200d-2640-fe0f.png","sheet_x":24,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F486-1F3FE-200D-2640-FE0F","non_qualified":"1F486-1F3FE-200D-2640","image":"1f486-1f3fe-200d-2640-fe0f.png","sheet_x":24,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F486-1F3FF-200D-2640-FE0F","non_qualified":"1F486-1F3FF-200D-2640","image":"1f486-1f3ff-200d-2640-fe0f.png","sheet_x":24,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F486","a":"Woman Getting Massage","b":"1F486-200D-2640-FE0F","c":"1F486-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[23,50]},"flag-tg":{"a":"Togo Flag","b":"1F1F9-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,46]},"haircut":{"skin_variations":{"1F3FB":{"unified":"1F487-1F3FB","non_qualified":null,"image":"1f487-1f3fb.png","sheet_x":24,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F487-1F3FC","non_qualified":null,"image":"1f487-1f3fc.png","sheet_x":24,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F487-1F3FD","non_qualified":null,"image":"1f487-1f3fd.png","sheet_x":24,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F487-1F3FE","non_qualified":null,"image":"1f487-1f3fe.png","sheet_x":24,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F487-1F3FF","non_qualified":null,"image":"1f487-1f3ff.png","sheet_x":24,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F487-200D-2640-FE0F","a":"Haircut","b":"1F487","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,28]},"flag-th":{"a":"Thailand Flag","b":"1F1F9-1F1ED","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,47]},"man-getting-haircut":{"skin_variations":{"1F3FB":{"unified":"1F487-1F3FB-200D-2642-FE0F","non_qualified":"1F487-1F3FB-200D-2642","image":"1f487-1f3fb-200d-2642-fe0f.png","sheet_x":24,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F487-1F3FC-200D-2642-FE0F","non_qualified":"1F487-1F3FC-200D-2642","image":"1f487-1f3fc-200d-2642-fe0f.png","sheet_x":24,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F487-1F3FD-200D-2642-FE0F","non_qualified":"1F487-1F3FD-200D-2642","image":"1f487-1f3fd-200d-2642-fe0f.png","sheet_x":24,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F487-1F3FE-200D-2642-FE0F","non_qualified":"1F487-1F3FE-200D-2642","image":"1f487-1f3fe-200d-2642-fe0f.png","sheet_x":24,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F487-1F3FF-200D-2642-FE0F","non_qualified":"1F487-1F3FF-200D-2642","image":"1f487-1f3ff-200d-2642-fe0f.png","sheet_x":24,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Getting Haircut","b":"1F487-200D-2642-FE0F","c":"1F487-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[24,22]},"flag-tj":{"a":"Tajikistan Flag","b":"1F1F9-1F1EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,48]},"flag-tk":{"a":"Tokelau Flag","b":"1F1F9-1F1F0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,49]},"woman-getting-haircut":{"skin_variations":{"1F3FB":{"unified":"1F487-1F3FB-200D-2640-FE0F","non_qualified":"1F487-1F3FB-200D-2640","image":"1f487-1f3fb-200d-2640-fe0f.png","sheet_x":24,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F487-1F3FC-200D-2640-FE0F","non_qualified":"1F487-1F3FC-200D-2640","image":"1f487-1f3fc-200d-2640-fe0f.png","sheet_x":24,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F487-1F3FD-200D-2640-FE0F","non_qualified":"1F487-1F3FD-200D-2640","image":"1f487-1f3fd-200d-2640-fe0f.png","sheet_x":24,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F487-1F3FE-200D-2640-FE0F","non_qualified":"1F487-1F3FE-200D-2640","image":"1f487-1f3fe-200d-2640-fe0f.png","sheet_x":24,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F487-1F3FF-200D-2640-FE0F","non_qualified":"1F487-1F3FF-200D-2640","image":"1f487-1f3ff-200d-2640-fe0f.png","sheet_x":24,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F487","a":"Woman Getting Haircut","b":"1F487-200D-2640-FE0F","c":"1F487-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[24,16]},"walking":{"skin_variations":{"1F3FB":{"unified":"1F6B6-1F3FB","non_qualified":null,"image":"1f6b6-1f3fb.png","sheet_x":36,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F6B6-1F3FC","non_qualified":null,"image":"1f6b6-1f3fc.png","sheet_x":36,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F6B6-1F3FD","non_qualified":null,"image":"1f6b6-1f3fd.png","sheet_x":36,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F6B6-1F3FE","non_qualified":null,"image":"1f6b6-1f3fe.png","sheet_x":36,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F6B6-1F3FF","non_qualified":null,"image":"1f6b6-1f3ff.png","sheet_x":36,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F6B6-200D-2642-FE0F","a":"Pedestrian","b":"1F6B6","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[36,21]},"flag-tl":{"a":"Timor-Leste Flag","b":"1F1F9-1F1F1","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,50]},"man-walking":{"skin_variations":{"1F3FB":{"unified":"1F6B6-1F3FB-200D-2642-FE0F","non_qualified":"1F6B6-1F3FB-200D-2642","image":"1f6b6-1f3fb-200d-2642-fe0f.png","sheet_x":36,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6B6-1F3FC-200D-2642-FE0F","non_qualified":"1F6B6-1F3FC-200D-2642","image":"1f6b6-1f3fc-200d-2642-fe0f.png","sheet_x":36,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6B6-1F3FD-200D-2642-FE0F","non_qualified":"1F6B6-1F3FD-200D-2642","image":"1f6b6-1f3fd-200d-2642-fe0f.png","sheet_x":36,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6B6-1F3FE-200D-2642-FE0F","non_qualified":"1F6B6-1F3FE-200D-2642","image":"1f6b6-1f3fe-200d-2642-fe0f.png","sheet_x":36,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6B6-1F3FF-200D-2642-FE0F","non_qualified":"1F6B6-1F3FF-200D-2642","image":"1f6b6-1f3ff-200d-2642-fe0f.png","sheet_x":36,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F6B6","a":"Man Walking","b":"1F6B6-200D-2642-FE0F","c":"1F6B6-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[36,15]},"flag-tm":{"a":"Turkmenistan Flag","b":"1F1F9-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[4,51]},"woman-walking":{"skin_variations":{"1F3FB":{"unified":"1F6B6-1F3FB-200D-2640-FE0F","non_qualified":"1F6B6-1F3FB-200D-2640","image":"1f6b6-1f3fb-200d-2640-fe0f.png","sheet_x":36,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6B6-1F3FC-200D-2640-FE0F","non_qualified":"1F6B6-1F3FC-200D-2640","image":"1f6b6-1f3fc-200d-2640-fe0f.png","sheet_x":36,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6B6-1F3FD-200D-2640-FE0F","non_qualified":"1F6B6-1F3FD-200D-2640","image":"1f6b6-1f3fd-200d-2640-fe0f.png","sheet_x":36,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6B6-1F3FE-200D-2640-FE0F","non_qualified":"1F6B6-1F3FE-200D-2640","image":"1f6b6-1f3fe-200d-2640-fe0f.png","sheet_x":36,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6B6-1F3FF-200D-2640-FE0F","non_qualified":"1F6B6-1F3FF-200D-2640","image":"1f6b6-1f3ff-200d-2640-fe0f.png","sheet_x":36,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Walking","b":"1F6B6-200D-2640-FE0F","c":"1F6B6-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[36,9]},"flag-tn":{"a":"Tunisia Flag","b":"1F1F9-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,0]},"runner":{"skin_variations":{"1F3FB":{"unified":"1F3C3-1F3FB","non_qualified":null,"image":"1f3c3-1f3fb.png","sheet_x":9,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F3C3-1F3FC","non_qualified":null,"image":"1f3c3-1f3fc.png","sheet_x":9,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F3C3-1F3FD","non_qualified":null,"image":"1f3c3-1f3fd.png","sheet_x":9,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F3C3-1F3FE","non_qualified":null,"image":"1f3c3-1f3fe.png","sheet_x":9,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F3C3-1F3FF","non_qualified":null,"image":"1f3c3-1f3ff.png","sheet_x":9,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F3C3-200D-2642-FE0F","a":"Runner","b":"1F3C3","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[9,46],"n":["running"]},"flag-to":{"a":"Tonga Flag","b":"1F1F9-1F1F4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,1]},"man-running":{"skin_variations":{"1F3FB":{"unified":"1F3C3-1F3FB-200D-2642-FE0F","non_qualified":"1F3C3-1F3FB-200D-2642","image":"1f3c3-1f3fb-200d-2642-fe0f.png","sheet_x":9,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3C3-1F3FC-200D-2642-FE0F","non_qualified":"1F3C3-1F3FC-200D-2642","image":"1f3c3-1f3fc-200d-2642-fe0f.png","sheet_x":9,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3C3-1F3FD-200D-2642-FE0F","non_qualified":"1F3C3-1F3FD-200D-2642","image":"1f3c3-1f3fd-200d-2642-fe0f.png","sheet_x":9,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3C3-1F3FE-200D-2642-FE0F","non_qualified":"1F3C3-1F3FE-200D-2642","image":"1f3c3-1f3fe-200d-2642-fe0f.png","sheet_x":9,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3C3-1F3FF-200D-2642-FE0F","non_qualified":"1F3C3-1F3FF-200D-2642","image":"1f3c3-1f3ff-200d-2642-fe0f.png","sheet_x":9,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F3C3","a":"Man Running","b":"1F3C3-200D-2642-FE0F","c":"1F3C3-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[9,40]},"flag-tr":{"a":"Turkey Flag","b":"1F1F9-1F1F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,2]},"flag-tt":{"a":"Trinidad & Tobago Flag","b":"1F1F9-1F1F9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,3]},"woman-running":{"skin_variations":{"1F3FB":{"unified":"1F3C3-1F3FB-200D-2640-FE0F","non_qualified":"1F3C3-1F3FB-200D-2640","image":"1f3c3-1f3fb-200d-2640-fe0f.png","sheet_x":9,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3C3-1F3FC-200D-2640-FE0F","non_qualified":"1F3C3-1F3FC-200D-2640","image":"1f3c3-1f3fc-200d-2640-fe0f.png","sheet_x":9,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3C3-1F3FD-200D-2640-FE0F","non_qualified":"1F3C3-1F3FD-200D-2640","image":"1f3c3-1f3fd-200d-2640-fe0f.png","sheet_x":9,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3C3-1F3FE-200D-2640-FE0F","non_qualified":"1F3C3-1F3FE-200D-2640","image":"1f3c3-1f3fe-200d-2640-fe0f.png","sheet_x":9,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3C3-1F3FF-200D-2640-FE0F","non_qualified":"1F3C3-1F3FF-200D-2640","image":"1f3c3-1f3ff-200d-2640-fe0f.png","sheet_x":9,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Running","b":"1F3C3-200D-2640-FE0F","c":"1F3C3-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[9,34]},"flag-tv":{"a":"Tuvalu Flag","b":"1F1F9-1F1FB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,4]},"dancer":{"skin_variations":{"1F3FB":{"unified":"1F483-1F3FB","non_qualified":null,"image":"1f483-1f3fb.png","sheet_x":23,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F483-1F3FC","non_qualified":null,"image":"1f483-1f3fc.png","sheet_x":23,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F483-1F3FD","non_qualified":null,"image":"1f483-1f3fd.png","sheet_x":23,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F483-1F3FE","non_qualified":null,"image":"1f483-1f3fe.png","sheet_x":23,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F483-1F3FF","non_qualified":null,"image":"1f483-1f3ff.png","sheet_x":23,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Dancer","b":"1F483","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","girl","woman","fun"],"k":[23,37]},"flag-tw":{"a":"Taiwan Flag","b":"1F1F9-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,5]},"man_dancing":{"skin_variations":{"1F3FB":{"unified":"1F57A-1F3FB","non_qualified":null,"image":"1f57a-1f3fb.png","sheet_x":29,"sheet_y":22,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F57A-1F3FC","non_qualified":null,"image":"1f57a-1f3fc.png","sheet_x":29,"sheet_y":23,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F57A-1F3FD","non_qualified":null,"image":"1f57a-1f3fd.png","sheet_x":29,"sheet_y":24,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F57A-1F3FE","non_qualified":null,"image":"1f57a-1f3fe.png","sheet_x":29,"sheet_y":25,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F57A-1F3FF","non_qualified":null,"image":"1f57a-1f3ff.png","sheet_x":29,"sheet_y":26,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Man Dancing","b":"1F57A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["male","boy","fun","dancer"],"k":[29,21],"o":9},"dancers":{"obsoleted_by":"1F46F-200D-2640-FE0F","a":"Woman with Bunny Ears","b":"1F46F","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[21,1]},"flag-tz":{"a":"Tanzania Flag","b":"1F1F9-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,6]},"flag-ua":{"a":"Ukraine Flag","b":"1F1FA-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,7]},"man-with-bunny-ears-partying":{"a":"Man with Bunny Ears Partying","b":"1F46F-200D-2642-FE0F","c":"1F46F-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[21,0]},"woman-with-bunny-ears-partying":{"obsoletes":"1F46F","a":"Woman with Bunny Ears Partying","b":"1F46F-200D-2640-FE0F","c":"1F46F-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,51]},"flag-ug":{"a":"Uganda Flag","b":"1F1FA-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,8]},"flag-um":{"a":"U.s. Outlying Islands Flag","b":"1F1FA-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,9]},"person_in_steamy_room":{"skin_variations":{"1F3FB":{"unified":"1F9D6-1F3FB","non_qualified":null,"image":"1f9d6-1f3fb.png","sheet_x":43,"sheet_y":41,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D6-1F3FB-200D-2642-FE0F"},"1F3FC":{"unified":"1F9D6-1F3FC","non_qualified":null,"image":"1f9d6-1f3fc.png","sheet_x":43,"sheet_y":42,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D6-1F3FC-200D-2642-FE0F"},"1F3FD":{"unified":"1F9D6-1F3FD","non_qualified":null,"image":"1f9d6-1f3fd.png","sheet_x":43,"sheet_y":43,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D6-1F3FD-200D-2642-FE0F"},"1F3FE":{"unified":"1F9D6-1F3FE","non_qualified":null,"image":"1f9d6-1f3fe.png","sheet_x":43,"sheet_y":44,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D6-1F3FE-200D-2642-FE0F"},"1F3FF":{"unified":"1F9D6-1F3FF","non_qualified":null,"image":"1f9d6-1f3ff.png","sheet_x":43,"sheet_y":45,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D6-1F3FF-200D-2642-FE0F"}},"obsoleted_by":"1F9D6-200D-2642-FE0F","a":"Person in Steamy Room","b":"1F9D6","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[43,40],"o":10},"woman_in_steamy_room":{"skin_variations":{"1F3FB":{"unified":"1F9D6-1F3FB-200D-2640-FE0F","non_qualified":"1F9D6-1F3FB-200D-2640","image":"1f9d6-1f3fb-200d-2640-fe0f.png","sheet_x":43,"sheet_y":29,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9D6-1F3FC-200D-2640-FE0F","non_qualified":"1F9D6-1F3FC-200D-2640","image":"1f9d6-1f3fc-200d-2640-fe0f.png","sheet_x":43,"sheet_y":30,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9D6-1F3FD-200D-2640-FE0F","non_qualified":"1F9D6-1F3FD-200D-2640","image":"1f9d6-1f3fd-200d-2640-fe0f.png","sheet_x":43,"sheet_y":31,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9D6-1F3FE-200D-2640-FE0F","non_qualified":"1F9D6-1F3FE-200D-2640","image":"1f9d6-1f3fe-200d-2640-fe0f.png","sheet_x":43,"sheet_y":32,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9D6-1F3FF-200D-2640-FE0F","non_qualified":"1F9D6-1F3FF-200D-2640","image":"1f9d6-1f3ff-200d-2640-fe0f.png","sheet_x":43,"sheet_y":33,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman in Steamy Room","b":"1F9D6-200D-2640-FE0F","c":"1F9D6-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["female","woman","spa","steamroom","sauna"],"k":[43,28],"o":10},"flag-un":{"a":"United Nations Flag","b":"1F1FA-1F1F3","d":false,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[5,10]},"us":{"a":"United States Flag","b":"1F1FA-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["united","states","america","flag","nation","country","banner"],"k":[5,11],"n":["flag-us"]},"man_in_steamy_room":{"skin_variations":{"1F3FB":{"unified":"1F9D6-1F3FB-200D-2642-FE0F","non_qualified":"1F9D6-1F3FB-200D-2642","image":"1f9d6-1f3fb-200d-2642-fe0f.png","sheet_x":43,"sheet_y":35,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D6-1F3FB"},"1F3FC":{"unified":"1F9D6-1F3FC-200D-2642-FE0F","non_qualified":"1F9D6-1F3FC-200D-2642","image":"1f9d6-1f3fc-200d-2642-fe0f.png","sheet_x":43,"sheet_y":36,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D6-1F3FC"},"1F3FD":{"unified":"1F9D6-1F3FD-200D-2642-FE0F","non_qualified":"1F9D6-1F3FD-200D-2642","image":"1f9d6-1f3fd-200d-2642-fe0f.png","sheet_x":43,"sheet_y":37,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D6-1F3FD"},"1F3FE":{"unified":"1F9D6-1F3FE-200D-2642-FE0F","non_qualified":"1F9D6-1F3FE-200D-2642","image":"1f9d6-1f3fe-200d-2642-fe0f.png","sheet_x":43,"sheet_y":38,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D6-1F3FE"},"1F3FF":{"unified":"1F9D6-1F3FF-200D-2642-FE0F","non_qualified":"1F9D6-1F3FF-200D-2642","image":"1f9d6-1f3ff-200d-2642-fe0f.png","sheet_x":43,"sheet_y":39,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D6-1F3FF"}},"obsoletes":"1F9D6","a":"Man in Steamy Room","b":"1F9D6-200D-2642-FE0F","c":"1F9D6-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["male","man","spa","steamroom","sauna"],"k":[43,34],"o":10},"person_climbing":{"skin_variations":{"1F3FB":{"unified":"1F9D7-1F3FB","non_qualified":null,"image":"1f9d7-1f3fb.png","sheet_x":44,"sheet_y":7,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D7-1F3FB-200D-2640-FE0F"},"1F3FC":{"unified":"1F9D7-1F3FC","non_qualified":null,"image":"1f9d7-1f3fc.png","sheet_x":44,"sheet_y":8,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D7-1F3FC-200D-2640-FE0F"},"1F3FD":{"unified":"1F9D7-1F3FD","non_qualified":null,"image":"1f9d7-1f3fd.png","sheet_x":44,"sheet_y":9,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D7-1F3FD-200D-2640-FE0F"},"1F3FE":{"unified":"1F9D7-1F3FE","non_qualified":null,"image":"1f9d7-1f3fe.png","sheet_x":44,"sheet_y":10,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D7-1F3FE-200D-2640-FE0F"},"1F3FF":{"unified":"1F9D7-1F3FF","non_qualified":null,"image":"1f9d7-1f3ff.png","sheet_x":44,"sheet_y":11,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D7-1F3FF-200D-2640-FE0F"}},"obsoleted_by":"1F9D7-200D-2640-FE0F","a":"Person Climbing","b":"1F9D7","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,6],"o":10},"flag-uy":{"a":"Uruguay Flag","b":"1F1FA-1F1FE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,12]},"woman_climbing":{"skin_variations":{"1F3FB":{"unified":"1F9D7-1F3FB-200D-2640-FE0F","non_qualified":"1F9D7-1F3FB-200D-2640","image":"1f9d7-1f3fb-200d-2640-fe0f.png","sheet_x":43,"sheet_y":47,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D7-1F3FB"},"1F3FC":{"unified":"1F9D7-1F3FC-200D-2640-FE0F","non_qualified":"1F9D7-1F3FC-200D-2640","image":"1f9d7-1f3fc-200d-2640-fe0f.png","sheet_x":43,"sheet_y":48,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D7-1F3FC"},"1F3FD":{"unified":"1F9D7-1F3FD-200D-2640-FE0F","non_qualified":"1F9D7-1F3FD-200D-2640","image":"1f9d7-1f3fd-200d-2640-fe0f.png","sheet_x":43,"sheet_y":49,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D7-1F3FD"},"1F3FE":{"unified":"1F9D7-1F3FE-200D-2640-FE0F","non_qualified":"1F9D7-1F3FE-200D-2640","image":"1f9d7-1f3fe-200d-2640-fe0f.png","sheet_x":43,"sheet_y":50,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D7-1F3FE"},"1F3FF":{"unified":"1F9D7-1F3FF-200D-2640-FE0F","non_qualified":"1F9D7-1F3FF-200D-2640","image":"1f9d7-1f3ff-200d-2640-fe0f.png","sheet_x":43,"sheet_y":51,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D7-1F3FF"}},"obsoletes":"1F9D7","a":"Woman Climbing","b":"1F9D7-200D-2640-FE0F","c":"1F9D7-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[43,46],"o":10},"flag-uz":{"a":"Uzbekistan Flag","b":"1F1FA-1F1FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,13]},"man_climbing":{"skin_variations":{"1F3FB":{"unified":"1F9D7-1F3FB-200D-2642-FE0F","non_qualified":"1F9D7-1F3FB-200D-2642","image":"1f9d7-1f3fb-200d-2642-fe0f.png","sheet_x":44,"sheet_y":1,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9D7-1F3FC-200D-2642-FE0F","non_qualified":"1F9D7-1F3FC-200D-2642","image":"1f9d7-1f3fc-200d-2642-fe0f.png","sheet_x":44,"sheet_y":2,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9D7-1F3FD-200D-2642-FE0F","non_qualified":"1F9D7-1F3FD-200D-2642","image":"1f9d7-1f3fd-200d-2642-fe0f.png","sheet_x":44,"sheet_y":3,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9D7-1F3FE-200D-2642-FE0F","non_qualified":"1F9D7-1F3FE-200D-2642","image":"1f9d7-1f3fe-200d-2642-fe0f.png","sheet_x":44,"sheet_y":4,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9D7-1F3FF-200D-2642-FE0F","non_qualified":"1F9D7-1F3FF-200D-2642","image":"1f9d7-1f3ff-200d-2642-fe0f.png","sheet_x":44,"sheet_y":5,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Climbing","b":"1F9D7-200D-2642-FE0F","c":"1F9D7-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,0],"o":10},"flag-va":{"a":"Vatican City Flag","b":"1F1FB-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,14]},"person_in_lotus_position":{"skin_variations":{"1F3FB":{"unified":"1F9D8-1F3FB","non_qualified":null,"image":"1f9d8-1f3fb.png","sheet_x":44,"sheet_y":25,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D8-1F3FB-200D-2640-FE0F"},"1F3FC":{"unified":"1F9D8-1F3FC","non_qualified":null,"image":"1f9d8-1f3fc.png","sheet_x":44,"sheet_y":26,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D8-1F3FC-200D-2640-FE0F"},"1F3FD":{"unified":"1F9D8-1F3FD","non_qualified":null,"image":"1f9d8-1f3fd.png","sheet_x":44,"sheet_y":27,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D8-1F3FD-200D-2640-FE0F"},"1F3FE":{"unified":"1F9D8-1F3FE","non_qualified":null,"image":"1f9d8-1f3fe.png","sheet_x":44,"sheet_y":28,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D8-1F3FE-200D-2640-FE0F"},"1F3FF":{"unified":"1F9D8-1F3FF","non_qualified":null,"image":"1f9d8-1f3ff.png","sheet_x":44,"sheet_y":29,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false,"obsoleted_by":"1F9D8-1F3FF-200D-2640-FE0F"}},"obsoleted_by":"1F9D8-200D-2640-FE0F","a":"Person in Lotus Position","b":"1F9D8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[44,24],"o":10},"flag-vc":{"a":"St. Vincent & Grenadines Flag","b":"1F1FB-1F1E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,15]},"flag-ve":{"a":"Venezuela Flag","b":"1F1FB-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,16]},"woman_in_lotus_position":{"skin_variations":{"1F3FB":{"unified":"1F9D8-1F3FB-200D-2640-FE0F","non_qualified":"1F9D8-1F3FB-200D-2640","image":"1f9d8-1f3fb-200d-2640-fe0f.png","sheet_x":44,"sheet_y":13,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D8-1F3FB"},"1F3FC":{"unified":"1F9D8-1F3FC-200D-2640-FE0F","non_qualified":"1F9D8-1F3FC-200D-2640","image":"1f9d8-1f3fc-200d-2640-fe0f.png","sheet_x":44,"sheet_y":14,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D8-1F3FC"},"1F3FD":{"unified":"1F9D8-1F3FD-200D-2640-FE0F","non_qualified":"1F9D8-1F3FD-200D-2640","image":"1f9d8-1f3fd-200d-2640-fe0f.png","sheet_x":44,"sheet_y":15,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D8-1F3FD"},"1F3FE":{"unified":"1F9D8-1F3FE-200D-2640-FE0F","non_qualified":"1F9D8-1F3FE-200D-2640","image":"1f9d8-1f3fe-200d-2640-fe0f.png","sheet_x":44,"sheet_y":16,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D8-1F3FE"},"1F3FF":{"unified":"1F9D8-1F3FF-200D-2640-FE0F","non_qualified":"1F9D8-1F3FF-200D-2640","image":"1f9d8-1f3ff-200d-2640-fe0f.png","sheet_x":44,"sheet_y":17,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false,"obsoletes":"1F9D8-1F3FF"}},"obsoletes":"1F9D8","a":"Woman in Lotus Position","b":"1F9D8-200D-2640-FE0F","c":"1F9D8-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["woman","female","meditation","yoga","serenity","zen","mindfulness"],"k":[44,12],"o":10},"man_in_lotus_position":{"skin_variations":{"1F3FB":{"unified":"1F9D8-1F3FB-200D-2642-FE0F","non_qualified":"1F9D8-1F3FB-200D-2642","image":"1f9d8-1f3fb-200d-2642-fe0f.png","sheet_x":44,"sheet_y":19,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F9D8-1F3FC-200D-2642-FE0F","non_qualified":"1F9D8-1F3FC-200D-2642","image":"1f9d8-1f3fc-200d-2642-fe0f.png","sheet_x":44,"sheet_y":20,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F9D8-1F3FD-200D-2642-FE0F","non_qualified":"1F9D8-1F3FD-200D-2642","image":"1f9d8-1f3fd-200d-2642-fe0f.png","sheet_x":44,"sheet_y":21,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F9D8-1F3FE-200D-2642-FE0F","non_qualified":"1F9D8-1F3FE-200D-2642","image":"1f9d8-1f3fe-200d-2642-fe0f.png","sheet_x":44,"sheet_y":22,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F9D8-1F3FF-200D-2642-FE0F","non_qualified":"1F9D8-1F3FF-200D-2642","image":"1f9d8-1f3ff-200d-2642-fe0f.png","sheet_x":44,"sheet_y":23,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man in Lotus Position","b":"1F9D8-200D-2642-FE0F","c":"1F9D8-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["man","male","meditation","yoga","serenity","zen","mindfulness"],"k":[44,18],"o":10},"flag-vg":{"a":"British Virgin Islands Flag","b":"1F1FB-1F1EC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,17]},"flag-vi":{"a":"U.s. Virgin Islands Flag","b":"1F1FB-1F1EE","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,18]},"bath":{"skin_variations":{"1F3FB":{"unified":"1F6C0-1F3FB","non_qualified":null,"image":"1f6c0-1f3fb.png","sheet_x":36,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F6C0-1F3FC","non_qualified":null,"image":"1f6c0-1f3fc.png","sheet_x":36,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F6C0-1F3FD","non_qualified":null,"image":"1f6c0-1f3fd.png","sheet_x":36,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F6C0-1F3FE","non_qualified":null,"image":"1f6c0-1f3fe.png","sheet_x":36,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F6C0-1F3FF","non_qualified":null,"image":"1f6c0-1f3ff.png","sheet_x":36,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Bath","b":"1F6C0","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clean","shower","bathroom"],"k":[36,36]},"sleeping_accommodation":{"skin_variations":{"1F3FB":{"unified":"1F6CC-1F3FB","non_qualified":null,"image":"1f6cc-1f3fb.png","sheet_x":36,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F6CC-1F3FC","non_qualified":null,"image":"1f6cc-1f3fc.png","sheet_x":36,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F6CC-1F3FD","non_qualified":null,"image":"1f6cc-1f3fd.png","sheet_x":36,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F6CC-1F3FE","non_qualified":null,"image":"1f6cc-1f3fe.png","sheet_x":37,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F6CC-1F3FF","non_qualified":null,"image":"1f6cc-1f3ff.png","sheet_x":37,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Sleeping Accommodation","b":"1F6CC","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[36,48],"o":7},"flag-vn":{"a":"Vietnam Flag","b":"1F1FB-1F1F3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,19]},"man_in_business_suit_levitating":{"skin_variations":{"1F3FB":{"unified":"1F574-1F3FB","non_qualified":null,"image":"1f574-1f3fb.png","sheet_x":28,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F574-1F3FC","non_qualified":null,"image":"1f574-1f3fc.png","sheet_x":28,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F574-1F3FD","non_qualified":null,"image":"1f574-1f3fd.png","sheet_x":28,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F574-1F3FE","non_qualified":null,"image":"1f574-1f3fe.png","sheet_x":28,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F574-1F3FF","non_qualified":null,"image":"1f574-1f3ff.png","sheet_x":28,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Man in Business Suit Levitating","b":"1F574-FE0F","c":"1F574","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[28,45],"o":7},"flag-vu":{"a":"Vanuatu Flag","b":"1F1FB-1F1FA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,20]},"flag-wf":{"a":"Wallis & Futuna Flag","b":"1F1FC-1F1EB","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[5,21]},"speaking_head_in_silhouette":{"a":"Speaking Head in Silhouette","b":"1F5E3-FE0F","c":"1F5E3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[30,14],"o":7},"bust_in_silhouette":{"a":"Bust in Silhouette","b":"1F464","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["user","person","human"],"k":[15,40]},"flag-ws":{"a":"Samoa Flag","b":"1F1FC-1F1F8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,22]},"busts_in_silhouette":{"a":"Busts in Silhouette","b":"1F465","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["user","person","human","group","team"],"k":[15,41]},"flag-xk":{"a":"Kosovo Flag","b":"1F1FD-1F1F0","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[5,23]},"fencer":{"a":"Fencer","b":"1F93A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,48],"o":9},"flag-ye":{"a":"Yemen Flag","b":"1F1FE-1F1EA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,24]},"flag-yt":{"a":"Mayotte Flag","b":"1F1FE-1F1F9","d":true,"e":false,"f":true,"g":true,"h":true,"i":true,"k":[5,25]},"horse_racing":{"skin_variations":{"1F3FB":{"unified":"1F3C7-1F3FB","non_qualified":null,"image":"1f3c7-1f3fb.png","sheet_x":10,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F3C7-1F3FC","non_qualified":null,"image":"1f3c7-1f3fc.png","sheet_x":10,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F3C7-1F3FD","non_qualified":null,"image":"1f3c7-1f3fd.png","sheet_x":10,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F3C7-1F3FE","non_qualified":null,"image":"1f3c7-1f3fe.png","sheet_x":10,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F3C7-1F3FF","non_qualified":null,"image":"1f3c7-1f3ff.png","sheet_x":10,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Horse Racing","b":"1F3C7","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["animal","betting","competition","gambling","luck"],"k":[10,20]},"flag-za":{"a":"South Africa Flag","b":"1F1FF-1F1E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,26]},"skier":{"a":"Skier","b":"26F7-FE0F","c":"26F7","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports","winter","snow"],"k":[48,44],"o":5},"flag-zm":{"a":"Zambia Flag","b":"1F1FF-1F1F2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,27]},"snowboarder":{"skin_variations":{"1F3FB":{"unified":"1F3C2-1F3FB","non_qualified":null,"image":"1f3c2-1f3fb.png","sheet_x":9,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F3C2-1F3FC","non_qualified":null,"image":"1f3c2-1f3fc.png","sheet_x":9,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F3C2-1F3FD","non_qualified":null,"image":"1f3c2-1f3fd.png","sheet_x":9,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F3C2-1F3FE","non_qualified":null,"image":"1f3c2-1f3fe.png","sheet_x":9,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F3C2-1F3FF","non_qualified":null,"image":"1f3c2-1f3ff.png","sheet_x":9,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Snowboarder","b":"1F3C2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sports","winter"],"k":[9,28]},"golfer":{"skin_variations":{"1F3FB":{"unified":"1F3CC-1F3FB","non_qualified":null,"image":"1f3cc-1f3fb.png","sheet_x":11,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CC-1F3FC","non_qualified":null,"image":"1f3cc-1f3fc.png","sheet_x":11,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CC-1F3FD","non_qualified":null,"image":"1f3cc-1f3fd.png","sheet_x":11,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CC-1F3FE","non_qualified":null,"image":"1f3cc-1f3fe.png","sheet_x":11,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CC-1F3FF","non_qualified":null,"image":"1f3cc-1f3ff.png","sheet_x":11,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoleted_by":"1F3CC-FE0F-200D-2642-FE0F","a":"Golfer","b":"1F3CC-FE0F","c":"1F3CC","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[11,24],"o":7},"flag-zw":{"a":"Zimbabwe Flag","b":"1F1FF-1F1FC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[5,28]},"man-golfing":{"skin_variations":{"1F3FB":{"unified":"1F3CC-1F3FB-200D-2642-FE0F","non_qualified":"1F3CC-1F3FB-200D-2642","image":"1f3cc-1f3fb-200d-2642-fe0f.png","sheet_x":11,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CC-1F3FC-200D-2642-FE0F","non_qualified":"1F3CC-1F3FC-200D-2642","image":"1f3cc-1f3fc-200d-2642-fe0f.png","sheet_x":11,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CC-1F3FD-200D-2642-FE0F","non_qualified":"1F3CC-1F3FD-200D-2642","image":"1f3cc-1f3fd-200d-2642-fe0f.png","sheet_x":11,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CC-1F3FE-200D-2642-FE0F","non_qualified":"1F3CC-1F3FE-200D-2642","image":"1f3cc-1f3fe-200d-2642-fe0f.png","sheet_x":11,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CC-1F3FF-200D-2642-FE0F","non_qualified":"1F3CC-1F3FF-200D-2642","image":"1f3cc-1f3ff-200d-2642-fe0f.png","sheet_x":11,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F3CC-FE0F","a":"Man Golfing","b":"1F3CC-FE0F-200D-2642-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[11,18],"o":7},"flag-england":{"a":"England Flag","b":"1F3F4-E0067-E0062-E0065-E006E-E0067-E007F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[12,16],"o":7},"woman-golfing":{"skin_variations":{"1F3FB":{"unified":"1F3CC-1F3FB-200D-2640-FE0F","non_qualified":"1F3CC-1F3FB-200D-2640","image":"1f3cc-1f3fb-200d-2640-fe0f.png","sheet_x":11,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CC-1F3FC-200D-2640-FE0F","non_qualified":"1F3CC-1F3FC-200D-2640","image":"1f3cc-1f3fc-200d-2640-fe0f.png","sheet_x":11,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CC-1F3FD-200D-2640-FE0F","non_qualified":"1F3CC-1F3FD-200D-2640","image":"1f3cc-1f3fd-200d-2640-fe0f.png","sheet_x":11,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CC-1F3FE-200D-2640-FE0F","non_qualified":"1F3CC-1F3FE-200D-2640","image":"1f3cc-1f3fe-200d-2640-fe0f.png","sheet_x":11,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CC-1F3FF-200D-2640-FE0F","non_qualified":"1F3CC-1F3FF-200D-2640","image":"1f3cc-1f3ff-200d-2640-fe0f.png","sheet_x":11,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Golfing","b":"1F3CC-FE0F-200D-2640-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[11,12],"o":7},"flag-scotland":{"a":"Scotland Flag","b":"1F3F4-E0067-E0062-E0073-E0063-E0074-E007F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[12,17],"o":7},"flag-wales":{"a":"Wales Flag","b":"1F3F4-E0067-E0062-E0077-E006C-E0073-E007F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[12,18],"o":7},"surfer":{"skin_variations":{"1F3FB":{"unified":"1F3C4-1F3FB","non_qualified":null,"image":"1f3c4-1f3fb.png","sheet_x":10,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F3C4-1F3FC","non_qualified":null,"image":"1f3c4-1f3fc.png","sheet_x":10,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F3C4-1F3FD","non_qualified":null,"image":"1f3c4-1f3fd.png","sheet_x":10,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F3C4-1F3FE","non_qualified":null,"image":"1f3c4-1f3fe.png","sheet_x":10,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F3C4-1F3FF","non_qualified":null,"image":"1f3c4-1f3ff.png","sheet_x":10,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F3C4-200D-2642-FE0F","a":"Surfer","b":"1F3C4","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[10,12]},"man-surfing":{"skin_variations":{"1F3FB":{"unified":"1F3C4-1F3FB-200D-2642-FE0F","non_qualified":"1F3C4-1F3FB-200D-2642","image":"1f3c4-1f3fb-200d-2642-fe0f.png","sheet_x":10,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3C4-1F3FC-200D-2642-FE0F","non_qualified":"1F3C4-1F3FC-200D-2642","image":"1f3c4-1f3fc-200d-2642-fe0f.png","sheet_x":10,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3C4-1F3FD-200D-2642-FE0F","non_qualified":"1F3C4-1F3FD-200D-2642","image":"1f3c4-1f3fd-200d-2642-fe0f.png","sheet_x":10,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3C4-1F3FE-200D-2642-FE0F","non_qualified":"1F3C4-1F3FE-200D-2642","image":"1f3c4-1f3fe-200d-2642-fe0f.png","sheet_x":10,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3C4-1F3FF-200D-2642-FE0F","non_qualified":"1F3C4-1F3FF-200D-2642","image":"1f3c4-1f3ff-200d-2642-fe0f.png","sheet_x":10,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F3C4","a":"Man Surfing","b":"1F3C4-200D-2642-FE0F","c":"1F3C4-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[10,6]},"woman-surfing":{"skin_variations":{"1F3FB":{"unified":"1F3C4-1F3FB-200D-2640-FE0F","non_qualified":"1F3C4-1F3FB-200D-2640","image":"1f3c4-1f3fb-200d-2640-fe0f.png","sheet_x":10,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3C4-1F3FC-200D-2640-FE0F","non_qualified":"1F3C4-1F3FC-200D-2640","image":"1f3c4-1f3fc-200d-2640-fe0f.png","sheet_x":10,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3C4-1F3FD-200D-2640-FE0F","non_qualified":"1F3C4-1F3FD-200D-2640","image":"1f3c4-1f3fd-200d-2640-fe0f.png","sheet_x":10,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3C4-1F3FE-200D-2640-FE0F","non_qualified":"1F3C4-1F3FE-200D-2640","image":"1f3c4-1f3fe-200d-2640-fe0f.png","sheet_x":10,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3C4-1F3FF-200D-2640-FE0F","non_qualified":"1F3C4-1F3FF-200D-2640","image":"1f3c4-1f3ff-200d-2640-fe0f.png","sheet_x":10,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Surfing","b":"1F3C4-200D-2640-FE0F","c":"1F3C4-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[10,0]},"rowboat":{"skin_variations":{"1F3FB":{"unified":"1F6A3-1F3FB","non_qualified":null,"image":"1f6a3-1f3fb.png","sheet_x":35,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6A3-1F3FC","non_qualified":null,"image":"1f6a3-1f3fc.png","sheet_x":35,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6A3-1F3FD","non_qualified":null,"image":"1f6a3-1f3fd.png","sheet_x":35,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6A3-1F3FE","non_qualified":null,"image":"1f6a3-1f3fe.png","sheet_x":35,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6A3-1F3FF","non_qualified":null,"image":"1f6a3-1f3ff.png","sheet_x":35,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoleted_by":"1F6A3-200D-2642-FE0F","a":"Rowboat","b":"1F6A3","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[35,3]},"man-rowing-boat":{"skin_variations":{"1F3FB":{"unified":"1F6A3-1F3FB-200D-2642-FE0F","non_qualified":"1F6A3-1F3FB-200D-2642","image":"1f6a3-1f3fb-200d-2642-fe0f.png","sheet_x":34,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6A3-1F3FC-200D-2642-FE0F","non_qualified":"1F6A3-1F3FC-200D-2642","image":"1f6a3-1f3fc-200d-2642-fe0f.png","sheet_x":34,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6A3-1F3FD-200D-2642-FE0F","non_qualified":"1F6A3-1F3FD-200D-2642","image":"1f6a3-1f3fd-200d-2642-fe0f.png","sheet_x":35,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6A3-1F3FE-200D-2642-FE0F","non_qualified":"1F6A3-1F3FE-200D-2642","image":"1f6a3-1f3fe-200d-2642-fe0f.png","sheet_x":35,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6A3-1F3FF-200D-2642-FE0F","non_qualified":"1F6A3-1F3FF-200D-2642","image":"1f6a3-1f3ff-200d-2642-fe0f.png","sheet_x":35,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F6A3","a":"Man Rowing Boat","b":"1F6A3-200D-2642-FE0F","c":"1F6A3-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[34,49]},"woman-rowing-boat":{"skin_variations":{"1F3FB":{"unified":"1F6A3-1F3FB-200D-2640-FE0F","non_qualified":"1F6A3-1F3FB-200D-2640","image":"1f6a3-1f3fb-200d-2640-fe0f.png","sheet_x":34,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6A3-1F3FC-200D-2640-FE0F","non_qualified":"1F6A3-1F3FC-200D-2640","image":"1f6a3-1f3fc-200d-2640-fe0f.png","sheet_x":34,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6A3-1F3FD-200D-2640-FE0F","non_qualified":"1F6A3-1F3FD-200D-2640","image":"1f6a3-1f3fd-200d-2640-fe0f.png","sheet_x":34,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6A3-1F3FE-200D-2640-FE0F","non_qualified":"1F6A3-1F3FE-200D-2640","image":"1f6a3-1f3fe-200d-2640-fe0f.png","sheet_x":34,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6A3-1F3FF-200D-2640-FE0F","non_qualified":"1F6A3-1F3FF-200D-2640","image":"1f6a3-1f3ff-200d-2640-fe0f.png","sheet_x":34,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Rowing Boat","b":"1F6A3-200D-2640-FE0F","c":"1F6A3-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[34,43]},"swimmer":{"skin_variations":{"1F3FB":{"unified":"1F3CA-1F3FB","non_qualified":null,"image":"1f3ca-1f3fb.png","sheet_x":10,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F3CA-1F3FC","non_qualified":null,"image":"1f3ca-1f3fc.png","sheet_x":10,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F3CA-1F3FD","non_qualified":null,"image":"1f3ca-1f3fd.png","sheet_x":10,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F3CA-1F3FE","non_qualified":null,"image":"1f3ca-1f3fe.png","sheet_x":10,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F3CA-1F3FF","non_qualified":null,"image":"1f3ca-1f3ff.png","sheet_x":10,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F3CA-200D-2642-FE0F","a":"Swimmer","b":"1F3CA","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[10,40]},"man-swimming":{"skin_variations":{"1F3FB":{"unified":"1F3CA-1F3FB-200D-2642-FE0F","non_qualified":"1F3CA-1F3FB-200D-2642","image":"1f3ca-1f3fb-200d-2642-fe0f.png","sheet_x":10,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CA-1F3FC-200D-2642-FE0F","non_qualified":"1F3CA-1F3FC-200D-2642","image":"1f3ca-1f3fc-200d-2642-fe0f.png","sheet_x":10,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CA-1F3FD-200D-2642-FE0F","non_qualified":"1F3CA-1F3FD-200D-2642","image":"1f3ca-1f3fd-200d-2642-fe0f.png","sheet_x":10,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CA-1F3FE-200D-2642-FE0F","non_qualified":"1F3CA-1F3FE-200D-2642","image":"1f3ca-1f3fe-200d-2642-fe0f.png","sheet_x":10,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CA-1F3FF-200D-2642-FE0F","non_qualified":"1F3CA-1F3FF-200D-2642","image":"1f3ca-1f3ff-200d-2642-fe0f.png","sheet_x":10,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F3CA","a":"Man Swimming","b":"1F3CA-200D-2642-FE0F","c":"1F3CA-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[10,34]},"woman-swimming":{"skin_variations":{"1F3FB":{"unified":"1F3CA-1F3FB-200D-2640-FE0F","non_qualified":"1F3CA-1F3FB-200D-2640","image":"1f3ca-1f3fb-200d-2640-fe0f.png","sheet_x":10,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CA-1F3FC-200D-2640-FE0F","non_qualified":"1F3CA-1F3FC-200D-2640","image":"1f3ca-1f3fc-200d-2640-fe0f.png","sheet_x":10,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CA-1F3FD-200D-2640-FE0F","non_qualified":"1F3CA-1F3FD-200D-2640","image":"1f3ca-1f3fd-200d-2640-fe0f.png","sheet_x":10,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CA-1F3FE-200D-2640-FE0F","non_qualified":"1F3CA-1F3FE-200D-2640","image":"1f3ca-1f3fe-200d-2640-fe0f.png","sheet_x":10,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CA-1F3FF-200D-2640-FE0F","non_qualified":"1F3CA-1F3FF-200D-2640","image":"1f3ca-1f3ff-200d-2640-fe0f.png","sheet_x":10,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Swimming","b":"1F3CA-200D-2640-FE0F","c":"1F3CA-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[10,28]},"person_with_ball":{"skin_variations":{"1F3FB":{"unified":"26F9-1F3FB","non_qualified":null,"image":"26f9-1f3fb.png","sheet_x":49,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"26F9-1F3FC","non_qualified":null,"image":"26f9-1f3fc.png","sheet_x":49,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"26F9-1F3FD","non_qualified":null,"image":"26f9-1f3fd.png","sheet_x":49,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"26F9-1F3FE","non_qualified":null,"image":"26f9-1f3fe.png","sheet_x":49,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"26F9-1F3FF","non_qualified":null,"image":"26f9-1f3ff.png","sheet_x":49,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoleted_by":"26F9-FE0F-200D-2642-FE0F","a":"Person with Ball","b":"26F9-FE0F","c":"26F9","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[49,6],"o":5},"man-bouncing-ball":{"skin_variations":{"1F3FB":{"unified":"26F9-1F3FB-200D-2642-FE0F","non_qualified":"26F9-1F3FB-200D-2642","image":"26f9-1f3fb-200d-2642-fe0f.png","sheet_x":49,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"26F9-1F3FC-200D-2642-FE0F","non_qualified":"26F9-1F3FC-200D-2642","image":"26f9-1f3fc-200d-2642-fe0f.png","sheet_x":49,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"26F9-1F3FD-200D-2642-FE0F","non_qualified":"26F9-1F3FD-200D-2642","image":"26f9-1f3fd-200d-2642-fe0f.png","sheet_x":49,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"26F9-1F3FE-200D-2642-FE0F","non_qualified":"26F9-1F3FE-200D-2642","image":"26f9-1f3fe-200d-2642-fe0f.png","sheet_x":49,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"26F9-1F3FF-200D-2642-FE0F","non_qualified":"26F9-1F3FF-200D-2642","image":"26f9-1f3ff-200d-2642-fe0f.png","sheet_x":49,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"26F9-FE0F","a":"Man Bouncing Ball","b":"26F9-FE0F-200D-2642-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[49,0],"o":5},"woman-bouncing-ball":{"skin_variations":{"1F3FB":{"unified":"26F9-1F3FB-200D-2640-FE0F","non_qualified":"26F9-1F3FB-200D-2640","image":"26f9-1f3fb-200d-2640-fe0f.png","sheet_x":48,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"26F9-1F3FC-200D-2640-FE0F","non_qualified":"26F9-1F3FC-200D-2640","image":"26f9-1f3fc-200d-2640-fe0f.png","sheet_x":48,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"26F9-1F3FD-200D-2640-FE0F","non_qualified":"26F9-1F3FD-200D-2640","image":"26f9-1f3fd-200d-2640-fe0f.png","sheet_x":48,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"26F9-1F3FE-200D-2640-FE0F","non_qualified":"26F9-1F3FE-200D-2640","image":"26f9-1f3fe-200d-2640-fe0f.png","sheet_x":48,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"26F9-1F3FF-200D-2640-FE0F","non_qualified":"26F9-1F3FF-200D-2640","image":"26f9-1f3ff-200d-2640-fe0f.png","sheet_x":48,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Bouncing Ball","b":"26F9-FE0F-200D-2640-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[48,46],"o":5},"weight_lifter":{"skin_variations":{"1F3FB":{"unified":"1F3CB-1F3FB","non_qualified":null,"image":"1f3cb-1f3fb.png","sheet_x":11,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CB-1F3FC","non_qualified":null,"image":"1f3cb-1f3fc.png","sheet_x":11,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CB-1F3FD","non_qualified":null,"image":"1f3cb-1f3fd.png","sheet_x":11,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CB-1F3FE","non_qualified":null,"image":"1f3cb-1f3fe.png","sheet_x":11,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CB-1F3FF","non_qualified":null,"image":"1f3cb-1f3ff.png","sheet_x":11,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoleted_by":"1F3CB-FE0F-200D-2642-FE0F","a":"Weight Lifter","b":"1F3CB-FE0F","c":"1F3CB","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[11,6],"o":7},"man-lifting-weights":{"skin_variations":{"1F3FB":{"unified":"1F3CB-1F3FB-200D-2642-FE0F","non_qualified":"1F3CB-1F3FB-200D-2642","image":"1f3cb-1f3fb-200d-2642-fe0f.png","sheet_x":11,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CB-1F3FC-200D-2642-FE0F","non_qualified":"1F3CB-1F3FC-200D-2642","image":"1f3cb-1f3fc-200d-2642-fe0f.png","sheet_x":11,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CB-1F3FD-200D-2642-FE0F","non_qualified":"1F3CB-1F3FD-200D-2642","image":"1f3cb-1f3fd-200d-2642-fe0f.png","sheet_x":11,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CB-1F3FE-200D-2642-FE0F","non_qualified":"1F3CB-1F3FE-200D-2642","image":"1f3cb-1f3fe-200d-2642-fe0f.png","sheet_x":11,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CB-1F3FF-200D-2642-FE0F","non_qualified":"1F3CB-1F3FF-200D-2642","image":"1f3cb-1f3ff-200d-2642-fe0f.png","sheet_x":11,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F3CB-FE0F","a":"Man Lifting Weights","b":"1F3CB-FE0F-200D-2642-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[11,0],"o":7},"woman-lifting-weights":{"skin_variations":{"1F3FB":{"unified":"1F3CB-1F3FB-200D-2640-FE0F","non_qualified":"1F3CB-1F3FB-200D-2640","image":"1f3cb-1f3fb-200d-2640-fe0f.png","sheet_x":10,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F3CB-1F3FC-200D-2640-FE0F","non_qualified":"1F3CB-1F3FC-200D-2640","image":"1f3cb-1f3fc-200d-2640-fe0f.png","sheet_x":10,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F3CB-1F3FD-200D-2640-FE0F","non_qualified":"1F3CB-1F3FD-200D-2640","image":"1f3cb-1f3fd-200d-2640-fe0f.png","sheet_x":10,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F3CB-1F3FE-200D-2640-FE0F","non_qualified":"1F3CB-1F3FE-200D-2640","image":"1f3cb-1f3fe-200d-2640-fe0f.png","sheet_x":10,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F3CB-1F3FF-200D-2640-FE0F","non_qualified":"1F3CB-1F3FF-200D-2640","image":"1f3cb-1f3ff-200d-2640-fe0f.png","sheet_x":10,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Lifting Weights","b":"1F3CB-FE0F-200D-2640-FE0F","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[10,46],"o":7},"bicyclist":{"skin_variations":{"1F3FB":{"unified":"1F6B4-1F3FB","non_qualified":null,"image":"1f6b4-1f3fb.png","sheet_x":35,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F6B4-1F3FC","non_qualified":null,"image":"1f6b4-1f3fc.png","sheet_x":35,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F6B4-1F3FD","non_qualified":null,"image":"1f6b4-1f3fd.png","sheet_x":35,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F6B4-1F3FE","non_qualified":null,"image":"1f6b4-1f3fe.png","sheet_x":35,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F6B4-1F3FF","non_qualified":null,"image":"1f6b4-1f3ff.png","sheet_x":35,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F6B4-200D-2642-FE0F","a":"Bicyclist","b":"1F6B4","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[35,37]},"man-biking":{"skin_variations":{"1F3FB":{"unified":"1F6B4-1F3FB-200D-2642-FE0F","non_qualified":"1F6B4-1F3FB-200D-2642","image":"1f6b4-1f3fb-200d-2642-fe0f.png","sheet_x":35,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6B4-1F3FC-200D-2642-FE0F","non_qualified":"1F6B4-1F3FC-200D-2642","image":"1f6b4-1f3fc-200d-2642-fe0f.png","sheet_x":35,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6B4-1F3FD-200D-2642-FE0F","non_qualified":"1F6B4-1F3FD-200D-2642","image":"1f6b4-1f3fd-200d-2642-fe0f.png","sheet_x":35,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6B4-1F3FE-200D-2642-FE0F","non_qualified":"1F6B4-1F3FE-200D-2642","image":"1f6b4-1f3fe-200d-2642-fe0f.png","sheet_x":35,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6B4-1F3FF-200D-2642-FE0F","non_qualified":"1F6B4-1F3FF-200D-2642","image":"1f6b4-1f3ff-200d-2642-fe0f.png","sheet_x":35,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F6B4","a":"Man Biking","b":"1F6B4-200D-2642-FE0F","c":"1F6B4-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[35,31]},"woman-biking":{"skin_variations":{"1F3FB":{"unified":"1F6B4-1F3FB-200D-2640-FE0F","non_qualified":"1F6B4-1F3FB-200D-2640","image":"1f6b4-1f3fb-200d-2640-fe0f.png","sheet_x":35,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6B4-1F3FC-200D-2640-FE0F","non_qualified":"1F6B4-1F3FC-200D-2640","image":"1f6b4-1f3fc-200d-2640-fe0f.png","sheet_x":35,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6B4-1F3FD-200D-2640-FE0F","non_qualified":"1F6B4-1F3FD-200D-2640","image":"1f6b4-1f3fd-200d-2640-fe0f.png","sheet_x":35,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6B4-1F3FE-200D-2640-FE0F","non_qualified":"1F6B4-1F3FE-200D-2640","image":"1f6b4-1f3fe-200d-2640-fe0f.png","sheet_x":35,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6B4-1F3FF-200D-2640-FE0F","non_qualified":"1F6B4-1F3FF-200D-2640","image":"1f6b4-1f3ff-200d-2640-fe0f.png","sheet_x":35,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Biking","b":"1F6B4-200D-2640-FE0F","c":"1F6B4-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[35,25]},"mountain_bicyclist":{"skin_variations":{"1F3FB":{"unified":"1F6B5-1F3FB","non_qualified":null,"image":"1f6b5-1f3fb.png","sheet_x":36,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FC":{"unified":"1F6B5-1F3FC","non_qualified":null,"image":"1f6b5-1f3fc.png","sheet_x":36,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FD":{"unified":"1F6B5-1F3FD","non_qualified":null,"image":"1f6b5-1f3fd.png","sheet_x":36,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FE":{"unified":"1F6B5-1F3FE","non_qualified":null,"image":"1f6b5-1f3fe.png","sheet_x":36,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true},"1F3FF":{"unified":"1F6B5-1F3FF","non_qualified":null,"image":"1f6b5-1f3ff.png","sheet_x":36,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":true}},"obsoleted_by":"1F6B5-200D-2642-FE0F","a":"Mountain Bicyclist","b":"1F6B5","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[36,3]},"man-mountain-biking":{"skin_variations":{"1F3FB":{"unified":"1F6B5-1F3FB-200D-2642-FE0F","non_qualified":"1F6B5-1F3FB-200D-2642","image":"1f6b5-1f3fb-200d-2642-fe0f.png","sheet_x":35,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6B5-1F3FC-200D-2642-FE0F","non_qualified":"1F6B5-1F3FC-200D-2642","image":"1f6b5-1f3fc-200d-2642-fe0f.png","sheet_x":35,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6B5-1F3FD-200D-2642-FE0F","non_qualified":"1F6B5-1F3FD-200D-2642","image":"1f6b5-1f3fd-200d-2642-fe0f.png","sheet_x":36,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6B5-1F3FE-200D-2642-FE0F","non_qualified":"1F6B5-1F3FE-200D-2642","image":"1f6b5-1f3fe-200d-2642-fe0f.png","sheet_x":36,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6B5-1F3FF-200D-2642-FE0F","non_qualified":"1F6B5-1F3FF-200D-2642","image":"1f6b5-1f3ff-200d-2642-fe0f.png","sheet_x":36,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"obsoletes":"1F6B5","a":"Man Mountain Biking","b":"1F6B5-200D-2642-FE0F","c":"1F6B5-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[35,49]},"woman-mountain-biking":{"skin_variations":{"1F3FB":{"unified":"1F6B5-1F3FB-200D-2640-FE0F","non_qualified":"1F6B5-1F3FB-200D-2640","image":"1f6b5-1f3fb-200d-2640-fe0f.png","sheet_x":35,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F6B5-1F3FC-200D-2640-FE0F","non_qualified":"1F6B5-1F3FC-200D-2640","image":"1f6b5-1f3fc-200d-2640-fe0f.png","sheet_x":35,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F6B5-1F3FD-200D-2640-FE0F","non_qualified":"1F6B5-1F3FD-200D-2640","image":"1f6b5-1f3fd-200d-2640-fe0f.png","sheet_x":35,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F6B5-1F3FE-200D-2640-FE0F","non_qualified":"1F6B5-1F3FE-200D-2640","image":"1f6b5-1f3fe-200d-2640-fe0f.png","sheet_x":35,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F6B5-1F3FF-200D-2640-FE0F","non_qualified":"1F6B5-1F3FF-200D-2640","image":"1f6b5-1f3ff-200d-2640-fe0f.png","sheet_x":35,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Mountain Biking","b":"1F6B5-200D-2640-FE0F","c":"1F6B5-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[35,43]},"racing_car":{"a":"Racing Car","b":"1F3CE-FE0F","c":"1F3CE","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["sports","race","fast","formula","f1"],"k":[11,31],"o":7},"racing_motorcycle":{"a":"Racing Motorcycle","b":"1F3CD-FE0F","c":"1F3CD","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[11,30],"o":7},"person_doing_cartwheel":{"skin_variations":{"1F3FB":{"unified":"1F938-1F3FB","non_qualified":null,"image":"1f938-1f3fb.png","sheet_x":40,"sheet_y":25,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F938-1F3FC","non_qualified":null,"image":"1f938-1f3fc.png","sheet_x":40,"sheet_y":26,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F938-1F3FD","non_qualified":null,"image":"1f938-1f3fd.png","sheet_x":40,"sheet_y":27,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F938-1F3FE","non_qualified":null,"image":"1f938-1f3fe.png","sheet_x":40,"sheet_y":28,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F938-1F3FF","non_qualified":null,"image":"1f938-1f3ff.png","sheet_x":40,"sheet_y":29,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Person Doing Cartwheel","b":"1F938","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[40,24],"o":9},"man-cartwheeling":{"skin_variations":{"1F3FB":{"unified":"1F938-1F3FB-200D-2642-FE0F","non_qualified":"1F938-1F3FB-200D-2642","image":"1f938-1f3fb-200d-2642-fe0f.png","sheet_x":40,"sheet_y":19,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F938-1F3FC-200D-2642-FE0F","non_qualified":"1F938-1F3FC-200D-2642","image":"1f938-1f3fc-200d-2642-fe0f.png","sheet_x":40,"sheet_y":20,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F938-1F3FD-200D-2642-FE0F","non_qualified":"1F938-1F3FD-200D-2642","image":"1f938-1f3fd-200d-2642-fe0f.png","sheet_x":40,"sheet_y":21,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F938-1F3FE-200D-2642-FE0F","non_qualified":"1F938-1F3FE-200D-2642","image":"1f938-1f3fe-200d-2642-fe0f.png","sheet_x":40,"sheet_y":22,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F938-1F3FF-200D-2642-FE0F","non_qualified":"1F938-1F3FF-200D-2642","image":"1f938-1f3ff-200d-2642-fe0f.png","sheet_x":40,"sheet_y":23,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Cartwheeling","b":"1F938-200D-2642-FE0F","c":"1F938-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,18],"o":9},"woman-cartwheeling":{"skin_variations":{"1F3FB":{"unified":"1F938-1F3FB-200D-2640-FE0F","non_qualified":"1F938-1F3FB-200D-2640","image":"1f938-1f3fb-200d-2640-fe0f.png","sheet_x":40,"sheet_y":13,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F938-1F3FC-200D-2640-FE0F","non_qualified":"1F938-1F3FC-200D-2640","image":"1f938-1f3fc-200d-2640-fe0f.png","sheet_x":40,"sheet_y":14,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F938-1F3FD-200D-2640-FE0F","non_qualified":"1F938-1F3FD-200D-2640","image":"1f938-1f3fd-200d-2640-fe0f.png","sheet_x":40,"sheet_y":15,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F938-1F3FE-200D-2640-FE0F","non_qualified":"1F938-1F3FE-200D-2640","image":"1f938-1f3fe-200d-2640-fe0f.png","sheet_x":40,"sheet_y":16,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F938-1F3FF-200D-2640-FE0F","non_qualified":"1F938-1F3FF-200D-2640","image":"1f938-1f3ff-200d-2640-fe0f.png","sheet_x":40,"sheet_y":17,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Cartwheeling","b":"1F938-200D-2640-FE0F","c":"1F938-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,12],"o":9},"wrestlers":{"a":"Wrestlers","b":"1F93C","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[40,51],"o":9},"man-wrestling":{"a":"Man Wrestling","b":"1F93C-200D-2642-FE0F","c":"1F93C-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,50],"o":9},"woman-wrestling":{"a":"Woman Wrestling","b":"1F93C-200D-2640-FE0F","c":"1F93C-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,49],"o":9},"water_polo":{"skin_variations":{"1F3FB":{"unified":"1F93D-1F3FB","non_qualified":null,"image":"1f93d-1f3fb.png","sheet_x":41,"sheet_y":13,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F93D-1F3FC","non_qualified":null,"image":"1f93d-1f3fc.png","sheet_x":41,"sheet_y":14,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F93D-1F3FD","non_qualified":null,"image":"1f93d-1f3fd.png","sheet_x":41,"sheet_y":15,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F93D-1F3FE","non_qualified":null,"image":"1f93d-1f3fe.png","sheet_x":41,"sheet_y":16,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F93D-1F3FF","non_qualified":null,"image":"1f93d-1f3ff.png","sheet_x":41,"sheet_y":17,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Water Polo","b":"1F93D","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[41,12],"o":9},"man-playing-water-polo":{"skin_variations":{"1F3FB":{"unified":"1F93D-1F3FB-200D-2642-FE0F","non_qualified":"1F93D-1F3FB-200D-2642","image":"1f93d-1f3fb-200d-2642-fe0f.png","sheet_x":41,"sheet_y":7,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F93D-1F3FC-200D-2642-FE0F","non_qualified":"1F93D-1F3FC-200D-2642","image":"1f93d-1f3fc-200d-2642-fe0f.png","sheet_x":41,"sheet_y":8,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F93D-1F3FD-200D-2642-FE0F","non_qualified":"1F93D-1F3FD-200D-2642","image":"1f93d-1f3fd-200d-2642-fe0f.png","sheet_x":41,"sheet_y":9,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F93D-1F3FE-200D-2642-FE0F","non_qualified":"1F93D-1F3FE-200D-2642","image":"1f93d-1f3fe-200d-2642-fe0f.png","sheet_x":41,"sheet_y":10,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F93D-1F3FF-200D-2642-FE0F","non_qualified":"1F93D-1F3FF-200D-2642","image":"1f93d-1f3ff-200d-2642-fe0f.png","sheet_x":41,"sheet_y":11,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Playing Water Polo","b":"1F93D-200D-2642-FE0F","c":"1F93D-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,6],"o":9},"woman-playing-water-polo":{"skin_variations":{"1F3FB":{"unified":"1F93D-1F3FB-200D-2640-FE0F","non_qualified":"1F93D-1F3FB-200D-2640","image":"1f93d-1f3fb-200d-2640-fe0f.png","sheet_x":41,"sheet_y":1,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F93D-1F3FC-200D-2640-FE0F","non_qualified":"1F93D-1F3FC-200D-2640","image":"1f93d-1f3fc-200d-2640-fe0f.png","sheet_x":41,"sheet_y":2,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F93D-1F3FD-200D-2640-FE0F","non_qualified":"1F93D-1F3FD-200D-2640","image":"1f93d-1f3fd-200d-2640-fe0f.png","sheet_x":41,"sheet_y":3,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F93D-1F3FE-200D-2640-FE0F","non_qualified":"1F93D-1F3FE-200D-2640","image":"1f93d-1f3fe-200d-2640-fe0f.png","sheet_x":41,"sheet_y":4,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F93D-1F3FF-200D-2640-FE0F","non_qualified":"1F93D-1F3FF-200D-2640","image":"1f93d-1f3ff-200d-2640-fe0f.png","sheet_x":41,"sheet_y":5,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Playing Water Polo","b":"1F93D-200D-2640-FE0F","c":"1F93D-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,0],"o":9},"handball":{"skin_variations":{"1F3FB":{"unified":"1F93E-1F3FB","non_qualified":null,"image":"1f93e-1f3fb.png","sheet_x":41,"sheet_y":31,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F93E-1F3FC","non_qualified":null,"image":"1f93e-1f3fc.png","sheet_x":41,"sheet_y":32,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F93E-1F3FD","non_qualified":null,"image":"1f93e-1f3fd.png","sheet_x":41,"sheet_y":33,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F93E-1F3FE","non_qualified":null,"image":"1f93e-1f3fe.png","sheet_x":41,"sheet_y":34,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F93E-1F3FF","non_qualified":null,"image":"1f93e-1f3ff.png","sheet_x":41,"sheet_y":35,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Handball","b":"1F93E","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[41,30],"o":9},"man-playing-handball":{"skin_variations":{"1F3FB":{"unified":"1F93E-1F3FB-200D-2642-FE0F","non_qualified":"1F93E-1F3FB-200D-2642","image":"1f93e-1f3fb-200d-2642-fe0f.png","sheet_x":41,"sheet_y":25,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F93E-1F3FC-200D-2642-FE0F","non_qualified":"1F93E-1F3FC-200D-2642","image":"1f93e-1f3fc-200d-2642-fe0f.png","sheet_x":41,"sheet_y":26,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F93E-1F3FD-200D-2642-FE0F","non_qualified":"1F93E-1F3FD-200D-2642","image":"1f93e-1f3fd-200d-2642-fe0f.png","sheet_x":41,"sheet_y":27,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F93E-1F3FE-200D-2642-FE0F","non_qualified":"1F93E-1F3FE-200D-2642","image":"1f93e-1f3fe-200d-2642-fe0f.png","sheet_x":41,"sheet_y":28,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F93E-1F3FF-200D-2642-FE0F","non_qualified":"1F93E-1F3FF-200D-2642","image":"1f93e-1f3ff-200d-2642-fe0f.png","sheet_x":41,"sheet_y":29,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Playing Handball","b":"1F93E-200D-2642-FE0F","c":"1F93E-200D-2642","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,24],"o":9},"woman-playing-handball":{"skin_variations":{"1F3FB":{"unified":"1F93E-1F3FB-200D-2640-FE0F","non_qualified":"1F93E-1F3FB-200D-2640","image":"1f93e-1f3fb-200d-2640-fe0f.png","sheet_x":41,"sheet_y":19,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F93E-1F3FC-200D-2640-FE0F","non_qualified":"1F93E-1F3FC-200D-2640","image":"1f93e-1f3fc-200d-2640-fe0f.png","sheet_x":41,"sheet_y":20,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F93E-1F3FD-200D-2640-FE0F","non_qualified":"1F93E-1F3FD-200D-2640","image":"1f93e-1f3fd-200d-2640-fe0f.png","sheet_x":41,"sheet_y":21,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F93E-1F3FE-200D-2640-FE0F","non_qualified":"1F93E-1F3FE-200D-2640","image":"1f93e-1f3fe-200d-2640-fe0f.png","sheet_x":41,"sheet_y":22,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F93E-1F3FF-200D-2640-FE0F","non_qualified":"1F93E-1F3FF-200D-2640","image":"1f93e-1f3ff-200d-2640-fe0f.png","sheet_x":41,"sheet_y":23,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Playing Handball","b":"1F93E-200D-2640-FE0F","c":"1F93E-200D-2640","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[41,18],"o":9},"juggling":{"skin_variations":{"1F3FB":{"unified":"1F939-1F3FB","non_qualified":null,"image":"1f939-1f3fb.png","sheet_x":40,"sheet_y":43,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F939-1F3FC","non_qualified":null,"image":"1f939-1f3fc.png","sheet_x":40,"sheet_y":44,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F939-1F3FD","non_qualified":null,"image":"1f939-1f3fd.png","sheet_x":40,"sheet_y":45,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F939-1F3FE","non_qualified":null,"image":"1f939-1f3fe.png","sheet_x":40,"sheet_y":46,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F939-1F3FF","non_qualified":null,"image":"1f939-1f3ff.png","sheet_x":40,"sheet_y":47,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Juggling","b":"1F939","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[40,42],"o":9},"man-juggling":{"skin_variations":{"1F3FB":{"unified":"1F939-1F3FB-200D-2642-FE0F","non_qualified":"1F939-1F3FB-200D-2642","image":"1f939-1f3fb-200d-2642-fe0f.png","sheet_x":40,"sheet_y":37,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F939-1F3FC-200D-2642-FE0F","non_qualified":"1F939-1F3FC-200D-2642","image":"1f939-1f3fc-200d-2642-fe0f.png","sheet_x":40,"sheet_y":38,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F939-1F3FD-200D-2642-FE0F","non_qualified":"1F939-1F3FD-200D-2642","image":"1f939-1f3fd-200d-2642-fe0f.png","sheet_x":40,"sheet_y":39,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F939-1F3FE-200D-2642-FE0F","non_qualified":"1F939-1F3FE-200D-2642","image":"1f939-1f3fe-200d-2642-fe0f.png","sheet_x":40,"sheet_y":40,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F939-1F3FF-200D-2642-FE0F","non_qualified":"1F939-1F3FF-200D-2642","image":"1f939-1f3ff-200d-2642-fe0f.png","sheet_x":40,"sheet_y":41,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Man Juggling","b":"1F939-200D-2642-FE0F","c":"1F939-200D-2642","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[40,36],"o":9},"woman-juggling":{"skin_variations":{"1F3FB":{"unified":"1F939-1F3FB-200D-2640-FE0F","non_qualified":"1F939-1F3FB-200D-2640","image":"1f939-1f3fb-200d-2640-fe0f.png","sheet_x":40,"sheet_y":31,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FC":{"unified":"1F939-1F3FC-200D-2640-FE0F","non_qualified":"1F939-1F3FC-200D-2640","image":"1f939-1f3fc-200d-2640-fe0f.png","sheet_x":40,"sheet_y":32,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FD":{"unified":"1F939-1F3FD-200D-2640-FE0F","non_qualified":"1F939-1F3FD-200D-2640","image":"1f939-1f3fd-200d-2640-fe0f.png","sheet_x":40,"sheet_y":33,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FE":{"unified":"1F939-1F3FE-200D-2640-FE0F","non_qualified":"1F939-1F3FE-200D-2640","image":"1f939-1f3fe-200d-2640-fe0f.png","sheet_x":40,"sheet_y":34,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false},"1F3FF":{"unified":"1F939-1F3FF-200D-2640-FE0F","non_qualified":"1F939-1F3FF-200D-2640","image":"1f939-1f3ff-200d-2640-fe0f.png","sheet_x":40,"sheet_y":35,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":false,"has_img_messenger":false}},"a":"Woman Juggling","b":"1F939-200D-2640-FE0F","c":"1F939-200D-2640","d":true,"e":true,"f":true,"g":true,"h":false,"i":false,"k":[40,30],"o":9},"couple":{"a":"Man and Woman Holding Hands","b":"1F46B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pair","people","human","love","date","dating","like","affection","valentines","marriage"],"k":[20,30],"n":["man_and_woman_holding_hands"]},"two_men_holding_hands":{"a":"Two Men Holding Hands","b":"1F46C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pair","couple","love","like","bromance","friendship","people","human"],"k":[20,31]},"two_women_holding_hands":{"a":"Two Women Holding Hands","b":"1F46D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["pair","friendship","couple","love","like","female","people","human"],"k":[20,32]},"couplekiss":{"obsoleted_by":"1F469-200D-2764-FE0F-200D-1F48B-200D-1F468","a":"Kiss","b":"1F48F","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,41]},"woman-kiss-man":{"obsoletes":"1F48F","a":"Woman Kiss Man","b":"1F469-200D-2764-FE0F-200D-1F48B-200D-1F468","c":"1F469-200D-2764-200D-1F48B-200D-1F468","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,21]},"man-kiss-man":{"a":"Man Kiss Man","b":"1F468-200D-2764-FE0F-200D-1F48B-200D-1F468","c":"1F468-200D-2764-200D-1F48B-200D-1F468","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[18,10]},"woman-kiss-woman":{"a":"Woman Kiss Woman","b":"1F469-200D-2764-FE0F-200D-1F48B-200D-1F469","c":"1F469-200D-2764-200D-1F48B-200D-1F469","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[20,22]},"couple_with_heart":{"obsoleted_by":"1F469-200D-2764-FE0F-200D-1F468","a":"Couple with Heart","b":"1F491","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[24,43]},"woman-heart-man":{"obsoletes":"1F491","a":"Woman Heart Man","b":"1F469-200D-2764-FE0F-200D-1F468","c":"1F469-200D-2764-200D-1F468","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[20,19]},"man-heart-man":{"a":"Man Heart Man","b":"1F468-200D-2764-FE0F-200D-1F468","c":"1F468-200D-2764-200D-1F468","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[18,9]},"woman-heart-woman":{"a":"Woman Heart Woman","b":"1F469-200D-2764-FE0F-200D-1F469","c":"1F469-200D-2764-200D-1F469","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[20,20]},"family":{"obsoleted_by":"1F468-200D-1F469-200D-1F466","a":"Family","b":"1F46A","d":true,"e":true,"f":true,"g":true,"h":false,"i":true,"k":[20,29],"n":["man-woman-boy"]},"man-woman-boy":{"obsoletes":"1F46A","a":"Man Woman Boy","b":"1F468-200D-1F469-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,2],"n":["family"]},"man-woman-girl":{"a":"Man Woman Girl","b":"1F468-200D-1F469-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,4]},"man-woman-girl-boy":{"a":"Man Woman Girl Boy","b":"1F468-200D-1F469-200D-1F467-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,5]},"man-woman-boy-boy":{"a":"Man Woman Boy Boy","b":"1F468-200D-1F469-200D-1F466-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,3]},"man-woman-girl-girl":{"a":"Man Woman Girl Girl","b":"1F468-200D-1F469-200D-1F467-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,6]},"man-man-boy":{"a":"Man Man Boy","b":"1F468-200D-1F468-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[16,49]},"man-man-girl":{"a":"Man Man Girl","b":"1F468-200D-1F468-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[16,51]},"man-man-girl-boy":{"a":"Man Man Girl Boy","b":"1F468-200D-1F468-200D-1F467-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,0]},"man-man-boy-boy":{"a":"Man Man Boy Boy","b":"1F468-200D-1F468-200D-1F466-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[16,50]},"man-man-girl-girl":{"a":"Man Man Girl Girl","b":"1F468-200D-1F468-200D-1F467-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[17,1]},"woman-woman-boy":{"a":"Woman Woman Boy","b":"1F469-200D-1F469-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[19,12]},"woman-woman-girl":{"a":"Woman Woman Girl","b":"1F469-200D-1F469-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[19,14]},"woman-woman-girl-boy":{"a":"Woman Woman Girl Boy","b":"1F469-200D-1F469-200D-1F467-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[19,15]},"woman-woman-boy-boy":{"a":"Woman Woman Boy Boy","b":"1F469-200D-1F469-200D-1F466-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[19,13]},"woman-woman-girl-girl":{"a":"Woman Woman Girl Girl","b":"1F469-200D-1F469-200D-1F467-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[19,16]},"man-boy":{"a":"Man Boy","b":"1F468-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,45]},"man-boy-boy":{"a":"Man Boy Boy","b":"1F468-200D-1F466-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,44]},"man-girl":{"a":"Man Girl","b":"1F468-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,48]},"man-girl-boy":{"a":"Man Girl Boy","b":"1F468-200D-1F467-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,46]},"man-girl-girl":{"a":"Man Girl Girl","b":"1F468-200D-1F467-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[16,47]},"woman-boy":{"a":"Woman Boy","b":"1F469-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,8]},"woman-boy-boy":{"a":"Woman Boy Boy","b":"1F469-200D-1F466-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,7]},"woman-girl":{"a":"Woman Girl","b":"1F469-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,11]},"woman-girl-boy":{"a":"Woman Girl Boy","b":"1F469-200D-1F467-200D-1F466","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,9]},"woman-girl-girl":{"a":"Woman Girl Girl","b":"1F469-200D-1F467-200D-1F467","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[19,10]},"selfie":{"skin_variations":{"1F3FB":{"unified":"1F933-1F3FB","non_qualified":null,"image":"1f933-1f3fb.png","sheet_x":39,"sheet_y":23,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F933-1F3FC","non_qualified":null,"image":"1f933-1f3fc.png","sheet_x":39,"sheet_y":24,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F933-1F3FD","non_qualified":null,"image":"1f933-1f3fd.png","sheet_x":39,"sheet_y":25,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F933-1F3FE","non_qualified":null,"image":"1f933-1f3fe.png","sheet_x":39,"sheet_y":26,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F933-1F3FF","non_qualified":null,"image":"1f933-1f3ff.png","sheet_x":39,"sheet_y":27,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Selfie","b":"1F933","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["camera","phone"],"k":[39,22],"o":9},"muscle":{"skin_variations":{"1F3FB":{"unified":"1F4AA-1F3FB","non_qualified":null,"image":"1f4aa-1f3fb.png","sheet_x":25,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F4AA-1F3FC","non_qualified":null,"image":"1f4aa-1f3fc.png","sheet_x":25,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F4AA-1F3FD","non_qualified":null,"image":"1f4aa-1f3fd.png","sheet_x":25,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F4AA-1F3FE","non_qualified":null,"image":"1f4aa-1f3fe.png","sheet_x":25,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F4AA-1F3FF","non_qualified":null,"image":"1f4aa-1f3ff.png","sheet_x":25,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Flexed Biceps","b":"1F4AA","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["arm","flex","hand","summer","strong","biceps"],"k":[25,16]},"point_left":{"skin_variations":{"1F3FB":{"unified":"1F448-1F3FB","non_qualified":null,"image":"1f448-1f3fb.png","sheet_x":14,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F448-1F3FC","non_qualified":null,"image":"1f448-1f3fc.png","sheet_x":14,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F448-1F3FD","non_qualified":null,"image":"1f448-1f3fd.png","sheet_x":14,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F448-1F3FE","non_qualified":null,"image":"1f448-1f3fe.png","sheet_x":14,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F448-1F3FF","non_qualified":null,"image":"1f448-1f3ff.png","sheet_x":14,"sheet_y":24,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Left Pointing Backhand Index","b":"1F448","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["direction","fingers","hand","left"],"k":[14,19]},"point_right":{"skin_variations":{"1F3FB":{"unified":"1F449-1F3FB","non_qualified":null,"image":"1f449-1f3fb.png","sheet_x":14,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F449-1F3FC","non_qualified":null,"image":"1f449-1f3fc.png","sheet_x":14,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F449-1F3FD","non_qualified":null,"image":"1f449-1f3fd.png","sheet_x":14,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F449-1F3FE","non_qualified":null,"image":"1f449-1f3fe.png","sheet_x":14,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F449-1F3FF","non_qualified":null,"image":"1f449-1f3ff.png","sheet_x":14,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Right Pointing Backhand Index","b":"1F449","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","direction","right"],"k":[14,25]},"point_up":{"skin_variations":{"1F3FB":{"unified":"261D-1F3FB","non_qualified":null,"image":"261d-1f3fb.png","sheet_x":47,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"261D-1F3FC","non_qualified":null,"image":"261d-1f3fc.png","sheet_x":47,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"261D-1F3FD","non_qualified":null,"image":"261d-1f3fd.png","sheet_x":47,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"261D-1F3FE","non_qualified":null,"image":"261d-1f3fe.png","sheet_x":47,"sheet_y":30,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"261D-1F3FF","non_qualified":null,"image":"261d-1f3ff.png","sheet_x":47,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Up Pointing Index","b":"261D-FE0F","c":"261D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hand","fingers","direction","up"],"k":[47,26],"o":1},"point_up_2":{"skin_variations":{"1F3FB":{"unified":"1F446-1F3FB","non_qualified":null,"image":"1f446-1f3fb.png","sheet_x":14,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F446-1F3FC","non_qualified":null,"image":"1f446-1f3fc.png","sheet_x":14,"sheet_y":9,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F446-1F3FD","non_qualified":null,"image":"1f446-1f3fd.png","sheet_x":14,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F446-1F3FE","non_qualified":null,"image":"1f446-1f3fe.png","sheet_x":14,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F446-1F3FF","non_qualified":null,"image":"1f446-1f3ff.png","sheet_x":14,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Up Pointing Backhand Index","b":"1F446","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","direction","up"],"k":[14,7]},"middle_finger":{"skin_variations":{"1F3FB":{"unified":"1F595-1F3FB","non_qualified":null,"image":"1f595-1f3fb.png","sheet_x":29,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F595-1F3FC","non_qualified":null,"image":"1f595-1f3fc.png","sheet_x":29,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F595-1F3FD","non_qualified":null,"image":"1f595-1f3fd.png","sheet_x":29,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F595-1F3FE","non_qualified":null,"image":"1f595-1f3fe.png","sheet_x":29,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F595-1F3FF","non_qualified":null,"image":"1f595-1f3ff.png","sheet_x":29,"sheet_y":43,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Reversed Hand with Middle Finger Extended","b":"1F595","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,38],"n":["reversed_hand_with_middle_finger_extended"],"o":7},"point_down":{"skin_variations":{"1F3FB":{"unified":"1F447-1F3FB","non_qualified":null,"image":"1f447-1f3fb.png","sheet_x":14,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F447-1F3FC","non_qualified":null,"image":"1f447-1f3fc.png","sheet_x":14,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F447-1F3FD","non_qualified":null,"image":"1f447-1f3fd.png","sheet_x":14,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F447-1F3FE","non_qualified":null,"image":"1f447-1f3fe.png","sheet_x":14,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F447-1F3FF","non_qualified":null,"image":"1f447-1f3ff.png","sheet_x":14,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"White Down Pointing Backhand Index","b":"1F447","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","direction","down"],"k":[14,13]},"v":{"skin_variations":{"1F3FB":{"unified":"270C-1F3FB","non_qualified":null,"image":"270c-1f3fb.png","sheet_x":49,"sheet_y":31,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"270C-1F3FC","non_qualified":null,"image":"270c-1f3fc.png","sheet_x":49,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"270C-1F3FD","non_qualified":null,"image":"270c-1f3fd.png","sheet_x":49,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"270C-1F3FE","non_qualified":null,"image":"270c-1f3fe.png","sheet_x":49,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"270C-1F3FF","non_qualified":null,"image":"270c-1f3ff.png","sheet_x":49,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Victory Hand","b":"270C-FE0F","c":"270C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","ohyeah","hand","peace","victory","two"],"k":[49,30],"o":1},"crossed_fingers":{"skin_variations":{"1F3FB":{"unified":"1F91E-1F3FB","non_qualified":null,"image":"1f91e-1f3fb.png","sheet_x":38,"sheet_y":12,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F91E-1F3FC","non_qualified":null,"image":"1f91e-1f3fc.png","sheet_x":38,"sheet_y":13,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F91E-1F3FD","non_qualified":null,"image":"1f91e-1f3fd.png","sheet_x":38,"sheet_y":14,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F91E-1F3FE","non_qualified":null,"image":"1f91e-1f3fe.png","sheet_x":38,"sheet_y":15,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F91E-1F3FF","non_qualified":null,"image":"1f91e-1f3ff.png","sheet_x":38,"sheet_y":16,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Hand with Index and Middle Fingers Crossed","b":"1F91E","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["good","lucky"],"k":[38,11],"n":["hand_with_index_and_middle_fingers_crossed"],"o":9},"spock-hand":{"skin_variations":{"1F3FB":{"unified":"1F596-1F3FB","non_qualified":null,"image":"1f596-1f3fb.png","sheet_x":29,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F596-1F3FC","non_qualified":null,"image":"1f596-1f3fc.png","sheet_x":29,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F596-1F3FD","non_qualified":null,"image":"1f596-1f3fd.png","sheet_x":29,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F596-1F3FE","non_qualified":null,"image":"1f596-1f3fe.png","sheet_x":29,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F596-1F3FF","non_qualified":null,"image":"1f596-1f3ff.png","sheet_x":29,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Raised Hand with Part Between Middle and Ring Fingers","b":"1F596","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[29,44],"o":7},"the_horns":{"skin_variations":{"1F3FB":{"unified":"1F918-1F3FB","non_qualified":null,"image":"1f918-1f3fb.png","sheet_x":37,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F918-1F3FC","non_qualified":null,"image":"1f918-1f3fc.png","sheet_x":37,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F918-1F3FD","non_qualified":null,"image":"1f918-1f3fd.png","sheet_x":37,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F918-1F3FE","non_qualified":null,"image":"1f918-1f3fe.png","sheet_x":37,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F918-1F3FF","non_qualified":null,"image":"1f918-1f3ff.png","sheet_x":37,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Sign of the Horns","b":"1F918","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,32],"n":["sign_of_the_horns"],"o":8},"call_me_hand":{"skin_variations":{"1F3FB":{"unified":"1F919-1F3FB","non_qualified":null,"image":"1f919-1f3fb.png","sheet_x":37,"sheet_y":39,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F919-1F3FC","non_qualified":null,"image":"1f919-1f3fc.png","sheet_x":37,"sheet_y":40,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F919-1F3FD","non_qualified":null,"image":"1f919-1f3fd.png","sheet_x":37,"sheet_y":41,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F919-1F3FE","non_qualified":null,"image":"1f919-1f3fe.png","sheet_x":37,"sheet_y":42,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F919-1F3FF","non_qualified":null,"image":"1f919-1f3ff.png","sheet_x":37,"sheet_y":43,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Call Me Hand","b":"1F919","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["hands","gesture"],"k":[37,38],"o":9},"raised_hand_with_fingers_splayed":{"skin_variations":{"1F3FB":{"unified":"1F590-1F3FB","non_qualified":null,"image":"1f590-1f3fb.png","sheet_x":29,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F590-1F3FC","non_qualified":null,"image":"1f590-1f3fc.png","sheet_x":29,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F590-1F3FD","non_qualified":null,"image":"1f590-1f3fd.png","sheet_x":29,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F590-1F3FE","non_qualified":null,"image":"1f590-1f3fe.png","sheet_x":29,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F590-1F3FF","non_qualified":null,"image":"1f590-1f3ff.png","sheet_x":29,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Raised Hand with Fingers Splayed","b":"1F590-FE0F","c":"1F590","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["hand","fingers","palm"],"k":[29,32],"o":7},"hand":{"skin_variations":{"1F3FB":{"unified":"270B-1F3FB","non_qualified":null,"image":"270b-1f3fb.png","sheet_x":49,"sheet_y":25,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"270B-1F3FC","non_qualified":null,"image":"270b-1f3fc.png","sheet_x":49,"sheet_y":26,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"270B-1F3FD","non_qualified":null,"image":"270b-1f3fd.png","sheet_x":49,"sheet_y":27,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"270B-1F3FE","non_qualified":null,"image":"270b-1f3fe.png","sheet_x":49,"sheet_y":28,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"270B-1F3FF","non_qualified":null,"image":"270b-1f3ff.png","sheet_x":49,"sheet_y":29,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Raised Hand","b":"270B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[49,24],"n":["raised_hand"]},"ok_hand":{"skin_variations":{"1F3FB":{"unified":"1F44C-1F3FB","non_qualified":null,"image":"1f44c-1f3fb.png","sheet_x":14,"sheet_y":44,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44C-1F3FC","non_qualified":null,"image":"1f44c-1f3fc.png","sheet_x":14,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44C-1F3FD","non_qualified":null,"image":"1f44c-1f3fd.png","sheet_x":14,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44C-1F3FE","non_qualified":null,"image":"1f44c-1f3fe.png","sheet_x":14,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44C-1F3FF","non_qualified":null,"image":"1f44c-1f3ff.png","sheet_x":14,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Ok Hand Sign","b":"1F44C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","limbs","perfect","ok","okay"],"k":[14,43]},"+1":{"skin_variations":{"1F3FB":{"unified":"1F44D-1F3FB","non_qualified":null,"image":"1f44d-1f3fb.png","sheet_x":14,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44D-1F3FC","non_qualified":null,"image":"1f44d-1f3fc.png","sheet_x":14,"sheet_y":51,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44D-1F3FD","non_qualified":null,"image":"1f44d-1f3fd.png","sheet_x":15,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44D-1F3FE","non_qualified":null,"image":"1f44d-1f3fe.png","sheet_x":15,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44D-1F3FF","non_qualified":null,"image":"1f44d-1f3ff.png","sheet_x":15,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Thumbs Up Sign","b":"1F44D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["thumbsup","yes","awesome","good","agree","accept","cool","hand","like"],"k":[14,49],"n":["thumbsup"]},"-1":{"skin_variations":{"1F3FB":{"unified":"1F44E-1F3FB","non_qualified":null,"image":"1f44e-1f3fb.png","sheet_x":15,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44E-1F3FC","non_qualified":null,"image":"1f44e-1f3fc.png","sheet_x":15,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44E-1F3FD","non_qualified":null,"image":"1f44e-1f3fd.png","sheet_x":15,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44E-1F3FE","non_qualified":null,"image":"1f44e-1f3fe.png","sheet_x":15,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44E-1F3FF","non_qualified":null,"image":"1f44e-1f3ff.png","sheet_x":15,"sheet_y":8,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Thumbs Down Sign","b":"1F44E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["thumbsdown","no","dislike","hand"],"k":[15,3],"n":["thumbsdown"]},"fist":{"skin_variations":{"1F3FB":{"unified":"270A-1F3FB","non_qualified":null,"image":"270a-1f3fb.png","sheet_x":49,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"270A-1F3FC","non_qualified":null,"image":"270a-1f3fc.png","sheet_x":49,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"270A-1F3FD","non_qualified":null,"image":"270a-1f3fd.png","sheet_x":49,"sheet_y":21,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"270A-1F3FE","non_qualified":null,"image":"270a-1f3fe.png","sheet_x":49,"sheet_y":22,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"270A-1F3FF","non_qualified":null,"image":"270a-1f3ff.png","sheet_x":49,"sheet_y":23,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Raised Fist","b":"270A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","hand","grasp"],"k":[49,18]},"facepunch":{"skin_variations":{"1F3FB":{"unified":"1F44A-1F3FB","non_qualified":null,"image":"1f44a-1f3fb.png","sheet_x":14,"sheet_y":32,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44A-1F3FC","non_qualified":null,"image":"1f44a-1f3fc.png","sheet_x":14,"sheet_y":33,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44A-1F3FD","non_qualified":null,"image":"1f44a-1f3fd.png","sheet_x":14,"sheet_y":34,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44A-1F3FE","non_qualified":null,"image":"1f44a-1f3fe.png","sheet_x":14,"sheet_y":35,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44A-1F3FF","non_qualified":null,"image":"1f44a-1f3ff.png","sheet_x":14,"sheet_y":36,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Fisted Hand Sign","b":"1F44A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["angry","violence","fist","hit","attack","hand"],"k":[14,31],"n":["punch"]},"left-facing_fist":{"skin_variations":{"1F3FB":{"unified":"1F91B-1F3FB","non_qualified":null,"image":"1f91b-1f3fb.png","sheet_x":37,"sheet_y":51,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F91B-1F3FC","non_qualified":null,"image":"1f91b-1f3fc.png","sheet_x":38,"sheet_y":0,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F91B-1F3FD","non_qualified":null,"image":"1f91b-1f3fd.png","sheet_x":38,"sheet_y":1,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F91B-1F3FE","non_qualified":null,"image":"1f91b-1f3fe.png","sheet_x":38,"sheet_y":2,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F91B-1F3FF","non_qualified":null,"image":"1f91b-1f3ff.png","sheet_x":38,"sheet_y":3,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Left-Facing Fist","b":"1F91B","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,50],"o":9},"right-facing_fist":{"skin_variations":{"1F3FB":{"unified":"1F91C-1F3FB","non_qualified":null,"image":"1f91c-1f3fb.png","sheet_x":38,"sheet_y":5,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F91C-1F3FC","non_qualified":null,"image":"1f91c-1f3fc.png","sheet_x":38,"sheet_y":6,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F91C-1F3FD","non_qualified":null,"image":"1f91c-1f3fd.png","sheet_x":38,"sheet_y":7,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F91C-1F3FE","non_qualified":null,"image":"1f91c-1f3fe.png","sheet_x":38,"sheet_y":8,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F91C-1F3FF","non_qualified":null,"image":"1f91c-1f3ff.png","sheet_x":38,"sheet_y":9,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Right-Facing Fist","b":"1F91C","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,4],"o":9},"raised_back_of_hand":{"skin_variations":{"1F3FB":{"unified":"1F91A-1F3FB","non_qualified":null,"image":"1f91a-1f3fb.png","sheet_x":37,"sheet_y":45,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F91A-1F3FC","non_qualified":null,"image":"1f91a-1f3fc.png","sheet_x":37,"sheet_y":46,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F91A-1F3FD","non_qualified":null,"image":"1f91a-1f3fd.png","sheet_x":37,"sheet_y":47,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F91A-1F3FE","non_qualified":null,"image":"1f91a-1f3fe.png","sheet_x":37,"sheet_y":48,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F91A-1F3FF","non_qualified":null,"image":"1f91a-1f3ff.png","sheet_x":37,"sheet_y":49,"added_in":"9.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Raised Back of Hand","b":"1F91A","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["fingers","raised","backhand"],"k":[37,44],"o":9},"wave":{"skin_variations":{"1F3FB":{"unified":"1F44B-1F3FB","non_qualified":null,"image":"1f44b-1f3fb.png","sheet_x":14,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44B-1F3FC","non_qualified":null,"image":"1f44b-1f3fc.png","sheet_x":14,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44B-1F3FD","non_qualified":null,"image":"1f44b-1f3fd.png","sheet_x":14,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44B-1F3FE","non_qualified":null,"image":"1f44b-1f3fe.png","sheet_x":14,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44B-1F3FF","non_qualified":null,"image":"1f44b-1f3ff.png","sheet_x":14,"sheet_y":42,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Waving Hand Sign","b":"1F44B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hands","gesture","goodbye","solong","farewell","hello","hi","palm"],"k":[14,37]},"i_love_you_hand_sign":{"skin_variations":{"1F3FB":{"unified":"1F91F-1F3FB","non_qualified":null,"image":"1f91f-1f3fb.png","sheet_x":38,"sheet_y":18,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F91F-1F3FC","non_qualified":null,"image":"1f91f-1f3fc.png","sheet_x":38,"sheet_y":19,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F91F-1F3FD","non_qualified":null,"image":"1f91f-1f3fd.png","sheet_x":38,"sheet_y":20,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F91F-1F3FE","non_qualified":null,"image":"1f91f-1f3fe.png","sheet_x":38,"sheet_y":21,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F91F-1F3FF","non_qualified":null,"image":"1f91f-1f3ff.png","sheet_x":38,"sheet_y":22,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"I Love You Hand Sign","b":"1F91F","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[38,17],"o":10},"writing_hand":{"skin_variations":{"1F3FB":{"unified":"270D-1F3FB","non_qualified":null,"image":"270d-1f3fb.png","sheet_x":49,"sheet_y":37,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"270D-1F3FC","non_qualified":null,"image":"270d-1f3fc.png","sheet_x":49,"sheet_y":38,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"270D-1F3FD","non_qualified":null,"image":"270d-1f3fd.png","sheet_x":49,"sheet_y":39,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"270D-1F3FE","non_qualified":null,"image":"270d-1f3fe.png","sheet_x":49,"sheet_y":40,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"270D-1F3FF","non_qualified":null,"image":"270d-1f3ff.png","sheet_x":49,"sheet_y":41,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Writing Hand","b":"270D-FE0F","c":"270D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["lower_left_ballpoint_pen","stationery","write","compose"],"k":[49,36],"o":1},"clap":{"skin_variations":{"1F3FB":{"unified":"1F44F-1F3FB","non_qualified":null,"image":"1f44f-1f3fb.png","sheet_x":15,"sheet_y":10,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F44F-1F3FC","non_qualified":null,"image":"1f44f-1f3fc.png","sheet_x":15,"sheet_y":11,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F44F-1F3FD","non_qualified":null,"image":"1f44f-1f3fd.png","sheet_x":15,"sheet_y":12,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F44F-1F3FE","non_qualified":null,"image":"1f44f-1f3fe.png","sheet_x":15,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F44F-1F3FF","non_qualified":null,"image":"1f44f-1f3ff.png","sheet_x":15,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Clapping Hands Sign","b":"1F44F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["hands","praise","applause","congrats","yay"],"k":[15,9]},"open_hands":{"skin_variations":{"1F3FB":{"unified":"1F450-1F3FB","non_qualified":null,"image":"1f450-1f3fb.png","sheet_x":15,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F450-1F3FC","non_qualified":null,"image":"1f450-1f3fc.png","sheet_x":15,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F450-1F3FD","non_qualified":null,"image":"1f450-1f3fd.png","sheet_x":15,"sheet_y":18,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F450-1F3FE","non_qualified":null,"image":"1f450-1f3fe.png","sheet_x":15,"sheet_y":19,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F450-1F3FF","non_qualified":null,"image":"1f450-1f3ff.png","sheet_x":15,"sheet_y":20,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Open Hands Sign","b":"1F450","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fingers","butterfly","hands","open"],"k":[15,15]},"raised_hands":{"skin_variations":{"1F3FB":{"unified":"1F64C-1F3FB","non_qualified":null,"image":"1f64c-1f3fb.png","sheet_x":33,"sheet_y":13,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F64C-1F3FC","non_qualified":null,"image":"1f64c-1f3fc.png","sheet_x":33,"sheet_y":14,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F64C-1F3FD","non_qualified":null,"image":"1f64c-1f3fd.png","sheet_x":33,"sheet_y":15,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F64C-1F3FE","non_qualified":null,"image":"1f64c-1f3fe.png","sheet_x":33,"sheet_y":16,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F64C-1F3FF","non_qualified":null,"image":"1f64c-1f3ff.png","sheet_x":33,"sheet_y":17,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Person Raising Both Hands in Celebration","b":"1F64C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["gesture","hooray","yea","celebration","hands"],"k":[33,12]},"palms_up_together":{"skin_variations":{"1F3FB":{"unified":"1F932-1F3FB","non_qualified":null,"image":"1f932-1f3fb.png","sheet_x":39,"sheet_y":17,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FC":{"unified":"1F932-1F3FC","non_qualified":null,"image":"1f932-1f3fc.png","sheet_x":39,"sheet_y":18,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FD":{"unified":"1F932-1F3FD","non_qualified":null,"image":"1f932-1f3fd.png","sheet_x":39,"sheet_y":19,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FE":{"unified":"1F932-1F3FE","non_qualified":null,"image":"1f932-1f3fe.png","sheet_x":39,"sheet_y":20,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false},"1F3FF":{"unified":"1F932-1F3FF","non_qualified":null,"image":"1f932-1f3ff.png","sheet_x":39,"sheet_y":21,"added_in":"10.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":false}},"a":"Palms Up Together","b":"1F932","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[39,16],"o":10},"pray":{"skin_variations":{"1F3FB":{"unified":"1F64F-1F3FB","non_qualified":null,"image":"1f64f-1f3fb.png","sheet_x":34,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F64F-1F3FC","non_qualified":null,"image":"1f64f-1f3fc.png","sheet_x":34,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F64F-1F3FD","non_qualified":null,"image":"1f64f-1f3fd.png","sheet_x":34,"sheet_y":5,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F64F-1F3FE","non_qualified":null,"image":"1f64f-1f3fe.png","sheet_x":34,"sheet_y":6,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F64F-1F3FF","non_qualified":null,"image":"1f64f-1f3ff.png","sheet_x":34,"sheet_y":7,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Person with Folded Hands","b":"1F64F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["please","hope","wish","namaste","highfive"],"k":[34,2]},"handshake":{"a":"Handshake","b":"1F91D","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["agreement","shake"],"k":[38,10],"o":9},"nail_care":{"skin_variations":{"1F3FB":{"unified":"1F485-1F3FB","non_qualified":null,"image":"1f485-1f3fb.png","sheet_x":23,"sheet_y":45,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F485-1F3FC","non_qualified":null,"image":"1f485-1f3fc.png","sheet_x":23,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F485-1F3FD","non_qualified":null,"image":"1f485-1f3fd.png","sheet_x":23,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F485-1F3FE","non_qualified":null,"image":"1f485-1f3fe.png","sheet_x":23,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F485-1F3FF","non_qualified":null,"image":"1f485-1f3ff.png","sheet_x":23,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Nail Polish","b":"1F485","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["beauty","manicure","finger","fashion","nail"],"k":[23,44]},"ear":{"skin_variations":{"1F3FB":{"unified":"1F442-1F3FB","non_qualified":null,"image":"1f442-1f3fb.png","sheet_x":13,"sheet_y":46,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F442-1F3FC","non_qualified":null,"image":"1f442-1f3fc.png","sheet_x":13,"sheet_y":47,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F442-1F3FD","non_qualified":null,"image":"1f442-1f3fd.png","sheet_x":13,"sheet_y":48,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F442-1F3FE","non_qualified":null,"image":"1f442-1f3fe.png","sheet_x":13,"sheet_y":49,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F442-1F3FF","non_qualified":null,"image":"1f442-1f3ff.png","sheet_x":13,"sheet_y":50,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Ear","b":"1F442","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","hear","sound","listen"],"k":[13,45]},"nose":{"skin_variations":{"1F3FB":{"unified":"1F443-1F3FB","non_qualified":null,"image":"1f443-1f3fb.png","sheet_x":14,"sheet_y":0,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FC":{"unified":"1F443-1F3FC","non_qualified":null,"image":"1f443-1f3fc.png","sheet_x":14,"sheet_y":1,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FD":{"unified":"1F443-1F3FD","non_qualified":null,"image":"1f443-1f3fd.png","sheet_x":14,"sheet_y":2,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FE":{"unified":"1F443-1F3FE","non_qualified":null,"image":"1f443-1f3fe.png","sheet_x":14,"sheet_y":3,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true},"1F3FF":{"unified":"1F443-1F3FF","non_qualified":null,"image":"1f443-1f3ff.png","sheet_x":14,"sheet_y":4,"added_in":"8.0","has_img_apple":true,"has_img_google":true,"has_img_twitter":true,"has_img_emojione":true,"has_img_facebook":true,"has_img_messenger":true}},"a":"Nose","b":"1F443","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["smell","sniff"],"k":[13,51]},"footprints":{"a":"Footprints","b":"1F463","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["feet","tracking","walking","beach"],"k":[15,39]},"eyes":{"a":"Eyes","b":"1F440","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["look","watch","stalk","peek","see"],"k":[13,42]},"eye":{"a":"Eye","b":"1F441-FE0F","c":"1F441","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","look","see","watch","stare"],"k":[13,44],"o":7},"eye-in-speech-bubble":{"a":"Eye in Speech Bubble","b":"1F441-FE0F-200D-1F5E8-FE0F","d":true,"e":true,"f":false,"g":true,"h":false,"i":false,"k":[13,43],"o":7},"brain":{"a":"Brain","b":"1F9E0","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["smart","intelligent"],"k":[46,22],"o":10},"tongue":{"a":"Tongue","b":"1F445","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mouth","playful"],"k":[14,6]},"lips":{"a":"Mouth","b":"1F444","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["mouth","kiss"],"k":[14,5]},"kiss":{"a":"Kiss Mark","b":"1F48B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["face","lips","love","like","affection","valentines"],"k":[24,37]},"cupid":{"a":"Heart with Arrow","b":"1F498","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","heart","affection","valentines"],"k":[24,50]},"heart":{"a":"Heavy Black Heart","b":"2764-FE0F","c":"2764","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","valentines"],"k":[50,8],"l":["<3"],"m":"<3","o":1},"heartbeat":{"a":"Beating Heart","b":"1F493","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines","pink","heart"],"k":[24,45]},"broken_heart":{"a":"Broken Heart","b":"1F494","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sad","sorry","break","heart","heartbreak"],"k":[24,46],"l":["</3"],"m":"</3"},"two_hearts":{"a":"Two Hearts","b":"1F495","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines","heart"],"k":[24,47]},"sparkling_heart":{"a":"Sparkling Heart","b":"1F496","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[24,48]},"heartpulse":{"a":"Growing Heart","b":"1F497","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["like","love","affection","valentines","pink"],"k":[24,49]},"blue_heart":{"a":"Blue Heart","b":"1F499","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[24,51],"m":"<3"},"green_heart":{"a":"Green Heart","b":"1F49A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,0],"m":"<3"},"yellow_heart":{"a":"Yellow Heart","b":"1F49B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,1],"m":"<3"},"orange_heart":{"a":"Orange Heart","b":"1F9E1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["love","like","affection","valentines"],"k":[46,23],"o":10},"purple_heart":{"a":"Purple Heart","b":"1F49C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,2],"m":"<3"},"black_heart":{"a":"Black Heart","b":"1F5A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["evil"],"k":[29,50],"o":9},"gift_heart":{"a":"Heart with Ribbon","b":"1F49D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","valentines"],"k":[25,3]},"revolving_hearts":{"a":"Revolving Hearts","b":"1F49E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["love","like","affection","valentines"],"k":[25,4]},"heart_decoration":{"a":"Heart Decoration","b":"1F49F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["purple-square","love","like"],"k":[25,5]},"heavy_heart_exclamation_mark_ornament":{"a":"Heavy Heart Exclamation Mark Ornament","b":"2763-FE0F","c":"2763","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[50,7],"o":1},"love_letter":{"a":"Love Letter","b":"1F48C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["email","like","affection","envelope","valentines"],"k":[24,38]},"zzz":{"a":"Sleeping Symbol","b":"1F4A4","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["sleepy","tired","dream"],"k":[25,10]},"anger":{"a":"Anger Symbol","b":"1F4A2","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["angry","mad"],"k":[25,8]},"bomb":{"a":"Bomb","b":"1F4A3","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["boom","explode","explosion","terrorism"],"k":[25,9]},"boom":{"a":"Collision Symbol","b":"1F4A5","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bomb","explode","explosion","collision","blown"],"k":[25,11],"n":["collision"]},"sweat_drops":{"a":"Splashing Sweat Symbol","b":"1F4A6","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["water","drip","oops"],"k":[25,12]},"dash":{"a":"Dash Symbol","b":"1F4A8","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wind","air","fast","shoo","fart","smoke","puff"],"k":[25,14]},"dizzy":{"a":"Dizzy Symbol","b":"1F4AB","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["star","sparkle","shoot","magic"],"k":[25,22]},"speech_balloon":{"a":"Speech Balloon","b":"1F4AC","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bubble","words","message","talk","chatting"],"k":[25,23]},"left_speech_bubble":{"a":"Left Speech Bubble","b":"1F5E8-FE0F","c":"1F5E8","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["words","message","talk","chatting"],"k":[30,15],"o":7},"right_anger_bubble":{"a":"Right Anger Bubble","b":"1F5EF-FE0F","c":"1F5EF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["caption","speech","thinking","mad"],"k":[30,16],"o":7},"thought_balloon":{"a":"Thought Balloon","b":"1F4AD","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bubble","cloud","speech","thinking","dream"],"k":[25,24]},"hole":{"a":"Hole","b":"1F573-FE0F","c":"1F573","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["embarrassing"],"k":[28,44],"o":7},"eyeglasses":{"a":"Eyeglasses","b":"1F453","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessories","eyesight","nerdy","dork","geek"],"k":[15,23]},"dark_sunglasses":{"a":"Dark Sunglasses","b":"1F576-FE0F","c":"1F576","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["face","cool","accessories"],"k":[29,17],"o":7},"necktie":{"a":"Necktie","b":"1F454","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shirt","suitup","formal","fashion","cloth","business"],"k":[15,24]},"shirt":{"a":"T-Shirt","b":"1F455","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"k":[15,25],"n":["tshirt"]},"jeans":{"a":"Jeans","b":"1F456","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","shopping"],"k":[15,26]},"scarf":{"a":"Scarf","b":"1F9E3","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["neck","winter","clothes"],"k":[46,25],"o":10},"gloves":{"a":"Gloves","b":"1F9E4","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["hands","winter","clothes"],"k":[46,26],"o":10},"coat":{"a":"Coat","b":"1F9E5","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["jacket"],"k":[46,27],"o":10},"socks":{"a":"Socks","b":"1F9E6","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["stockings","clothes"],"k":[46,28],"o":10},"dress":{"a":"Dress","b":"1F457","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["clothes","fashion","shopping"],"k":[15,27]},"kimono":{"a":"Kimono","b":"1F458","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["dress","fashion","women","female","japanese"],"k":[15,28]},"bikini":{"a":"Bikini","b":"1F459","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["swimming","female","woman","girl","fashion","beach","summer"],"k":[15,29]},"womans_clothes":{"a":"Womans Clothes","b":"1F45A","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","shopping_bags","female"],"k":[15,30]},"purse":{"a":"Purse","b":"1F45B","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessories","money","sales","shopping"],"k":[15,31]},"handbag":{"a":"Handbag","b":"1F45C","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessory","accessories","shopping"],"k":[15,32]},"pouch":{"a":"Pouch","b":"1F45D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["bag","accessories","shopping"],"k":[15,33]},"shopping_bags":{"a":"Shopping Bags","b":"1F6CD-FE0F","c":"1F6CD","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[37,2],"o":7},"school_satchel":{"a":"School Satchel","b":"1F392","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["student","education","bag","backpack"],"k":[8,37]},"mans_shoe":{"a":"Mans Shoe","b":"1F45E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","male"],"k":[15,34],"n":["shoe"]},"athletic_shoe":{"a":"Athletic Shoe","b":"1F45F","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shoes","sports","sneakers"],"k":[15,35]},"high_heel":{"a":"High-Heeled Shoe","b":"1F460","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","shoes","female","pumps","stiletto"],"k":[15,36]},"sandal":{"a":"Womans Sandal","b":"1F461","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shoes","fashion","flip flops"],"k":[15,37]},"boot":{"a":"Womans Boots","b":"1F462","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["shoes","fashion"],"k":[15,38]},"crown":{"a":"Crown","b":"1F451","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["king","kod","leader","royalty","lord"],"k":[15,21]},"womans_hat":{"a":"Womans Hat","b":"1F452","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["fashion","accessories","female","lady","spring"],"k":[15,22]},"tophat":{"a":"Top Hat","b":"1F3A9","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["magic","gentleman","classy","circus"],"k":[9,3]},"mortar_board":{"a":"Graduation Cap","b":"1F393","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["school","college","degree","university","graduation","cap","hat","legal","learn","education"],"k":[8,38]},"billed_cap":{"a":"Billed Cap","b":"1F9E2","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[46,24],"o":10},"helmet_with_white_cross":{"a":"Helmet with White Cross","b":"26D1-FE0F","c":"26D1","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"k":[48,33],"o":5},"prayer_beads":{"a":"Prayer Beads","b":"1F4FF","d":true,"e":true,"f":true,"g":true,"h":true,"i":false,"j":["dhikr","religious"],"k":[27,1],"o":8},"lipstick":{"a":"Lipstick","b":"1F484","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["female","girl","fashion","woman"],"k":[23,43]},"ring":{"a":"Ring","b":"1F48D","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["wedding","propose","marriage","valentines","diamond","fashion","jewelry","gem","engagement"],"k":[24,39]},"gem":{"a":"Gem Stone","b":"1F48E","d":true,"e":true,"f":true,"g":true,"h":true,"i":true,"j":["blue","ruby","diamond","jewelry"],"k":[24,40]}},"aliases":{"satisfied":"laughing","grinning_face_with_star_eyes":"star-struck","face_with_one_eyebrow_raised":"face_with_raised_eyebrow","telephone":"phone","cooking":"fried_egg","paw_prints":"feet","flag-cn":"cn","lantern":"izakaya_lantern","shocked_face_with_exploding_head":"exploding_head","open_book":"book","flag-de":"de","grinning_face_with_one_large_and_one_small_eye":"zany_face","serious_face_with_symbols_covering_mouth":"face_with_symbols_on_mouth","flipper":"dolphin","face_with_open_mouth_vomiting":"face_vomiting","flag-es":"es","face_with_finger_covering_closed_lips":"shushing_face","smiling_face_with_smiling_eyes_and_hand_covering_mouth":"face_with_hand_over_mouth","flag-fr":"fr","honeybee":"bee","red_car":"car","envelope":"email","uk":"gb","flag-gb":"gb","poop":"hankey","shit":"hankey","staff_of_aesculapius":"medical_symbol","knife":"hocho","sailboat":"boat","pencil":"memo","flag-it":"it","flag-jp":"jp","heavy_exclamation_mark":"exclamation","flag-kr":"kr","waxing_gibbous_moon":"moon","mother_christmas":"mrs_claus","sun_small_cloud":"mostly_sunny","sun_behind_cloud":"barely_sunny","sun_behind_rain_cloud":"partly_sunny_rain","lightning_cloud":"lightning","tornado_cloud":"tornado","flag-ru":"ru","running":"runner","flag-us":"us","man_and_woman_holding_hands":"couple","man-woman-boy":"family","family":"man-woman-boy","reversed_hand_with_middle_finger_extended":"middle_finger","hand_with_index_and_middle_fingers_crossed":"crossed_fingers","sign_of_the_horns":"the_horns","raised_hand":"hand","thumbsup":"+1","thumbsdown":"-1","punch":"facepunch","collision":"boom","tshirt":"shirt","shoe":"mans_shoe"}}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

var _all = __webpack_require__(70);

var _all2 = _interopRequireDefault(_all);

var _emojiData = __webpack_require__(15);

var _nimblePicker = __webpack_require__(72);

var _nimblePicker2 = _interopRequireDefault(_nimblePicker);

var _sharedProps = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = new _emojiData.EmojiIndex(_all2.default);

exports.default = {
  functional: true,
  props: (0, _extends3.default)({}, _sharedProps.PickerProps, {
    data: {
      type: Object,
      default: function _default() {
        return index;
      }
    }
  }),
  render: function render(h, ctx) {
    var data = ctx.data;
    var props = ctx.props;
    var children = ctx.children;


    return h(_nimblePicker2.default, (0, _extends3.default)({}, data, { props: props }), children);
  }
};

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7bc71df8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimblePicker_vue__ = __webpack_require__(139);
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nimblePicker_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7bc71df8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nimblePicker_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/picker/nimblePicker.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bc71df8", Component.options)
  } else {
    hotAPI.reload("data-v-7bc71df8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(122);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _freeze = __webpack_require__(34);

var _freeze2 = _interopRequireDefault(_freeze);

var _extends2 = __webpack_require__(21);

var _extends3 = _interopRequireDefault(_extends2);

__webpack_require__(130);

var _store = __webpack_require__(39);

var _store2 = _interopRequireDefault(_store);

var _frequently = __webpack_require__(38);

var _frequently2 = _interopRequireDefault(_frequently);

var _utils = __webpack_require__(58);

var _sharedProps = __webpack_require__(22);

var _anchors = __webpack_require__(40);

var _anchors2 = _interopRequireDefault(_anchors);

var _category = __webpack_require__(42);

var _category2 = _interopRequireDefault(_category);

var _preview = __webpack_require__(63);

var _preview2 = _interopRequireDefault(_preview);

var _search = __webpack_require__(67);

var _search2 = _interopRequireDefault(_search);

var _vueVirtualScroller = __webpack_require__(131);

__webpack_require__(134);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var I18N = {
  search: 'Search',
  notfound: 'No Emoji Found',
  categories: {
    search: 'Search Results',
    recent: 'Frequently Used',
    people: 'Smileys & People',
    nature: 'Animals & Nature',
    foods: 'Food & Drink',
    activity: 'Activity',
    places: 'Travel & Places',
    objects: 'Objects',
    symbols: 'Symbols',
    flags: 'Flags',
    custom: 'Custom'
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  props: (0, _extends3.default)({}, _sharedProps.PickerProps, {
    data: {
      type: Object,
      required: true
    }
  }),
  data: function data() {
    return {
      activeSkin: this.skin || _store2.default.get('skin') || this.defaultSkin,
      activeCategory: null,
      previewEmoji: null,
      searchEmojis: null
    };
  },

  computed: {
    customStyles: function customStyles() {
      return (0, _extends3.default)({
        width: this.calculateWidth + 'px'
      }, this.pickerStyles);
    },
    emojiProps: function emojiProps() {
      return {
        native: this.native,
        skin: this.activeSkin,
        set: this.set,
        tooltip: this.emojiTooltip,
        onEnter: this.onEmojiEnter.bind(this),
        onLeave: this.onEmojiLeave.bind(this),
        onClick: this.onEmojiClick.bind(this)
      };
    },
    skinProps: function skinProps() {
      return {
        skin: this.activeSkin
      };
    },
    calculateWidth: function calculateWidth() {
      return this.perLine * (this.emojiSize + 12) + 12 + 2 + (0, _utils.measureScrollbar)();
    },
    scrollerCategories: function scrollerCategories() {
      var _this = this;

      var id = 0;
      return this.categories.map(function (category) {
        return {
          'id': id++,
          'category': category,
          'show': !_this.searchEmojis && (_this.infiniteScroll || category == _this.activeCategory),
          'mergedI18n': _this.mergedI18n,
          'data': _this.data,
          'emojisLength': category.emojis.length,
          'emojiProps': _this.emojiProps
        };
      });
    },
    mergedI18n: function mergedI18n() {
      return (0, _freeze2.default)((0, _utils.deepMerge)(I18N, this.i18n));
    },
    idleEmoji: function idleEmoji() {
      return this.data.emoji(this.emoji);
    }
  },
  created: function created() {
    var _categories;

    this.categories = [];
    (_categories = this.categories).push.apply(_categories, (0, _toConsumableArray3.default)(this.data.categories()));
    this.categories = this.categories.filter(function (category) {
      return category.emojis.length > 0;
    });

    this.categories[0].first = true;
    (0, _freeze2.default)(this.categories);
    this.activeCategory = this.categories[0];
    this.skipScrollUpdate = false;
  },

  methods: {
    onScrollUpdate: function onScrollUpdate(startIndex, endIndex) {
      if (this.skipScrollUpdate) {
        this.skipScrollUpdate = false;
      } else {
        this.activeCategory = this.categories[endIndex - 1];
      }
    },
    onAnchorClick: function onAnchorClick(category) {
      var i = this.categories.indexOf(category);
      this.$refs.dynScroller.scrollToItem(i);
      this.activeCategory = this.categories[i];
      this.skipScrollUpdate = true;
    },
    onSearch: function onSearch(emojis) {
      this.searchEmojis = emojis;
    },
    onEmojiEnter: function onEmojiEnter(emoji) {
      this.previewEmoji = emoji;
    },
    onEmojiLeave: function onEmojiLeave(emoji) {
      this.previewEmoji = null;
    },
    onEmojiClick: function onEmojiClick(emoji) {
      this.$emit('select', emoji);
      _frequently2.default.add(emoji);
    },
    onSkinChange: function onSkinChange(skin) {
      this.activeSkin = skin;
      _store2.default.update({ skin: skin });

      this.$emit('skin-change', skin);
    }
  },
  components: {
    Anchors: _anchors2.default,
    Category: _category2.default,
    Preview: _preview2.default,
    Search: _search2.default,
    DynamicScroller: _vueVirtualScroller.DynamicScroller,
    DynamicScrollerItem: _vueVirtualScroller.DynamicScrollerItem
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequently = exports.store = exports.uncompress = exports.EmojiIndex = exports.Category = exports.NimbleEmoji = exports.Emoji = exports.NimblePicker = exports.Picker = undefined;

var _components = __webpack_require__(75);

Object.defineProperty(exports, 'Picker', {
  enumerable: true,
  get: function get() {
    return _components.Picker;
  }
});
Object.defineProperty(exports, 'NimblePicker', {
  enumerable: true,
  get: function get() {
    return _components.NimblePicker;
  }
});
Object.defineProperty(exports, 'Emoji', {
  enumerable: true,
  get: function get() {
    return _components.Emoji;
  }
});
Object.defineProperty(exports, 'NimbleEmoji', {
  enumerable: true,
  get: function get() {
    return _components.NimbleEmoji;
  }
});
Object.defineProperty(exports, 'Category', {
  enumerable: true,
  get: function get() {
    return _components.Category;
  }
});

var _emojiData = __webpack_require__(15);

Object.defineProperty(exports, 'EmojiIndex', {
  enumerable: true,
  get: function get() {
    return _emojiData.EmojiIndex;
  }
});

var _store = __webpack_require__(39);

var _store2 = _interopRequireDefault(_store);

var _data = __webpack_require__(37);

var _frequently = __webpack_require__(38);

var _frequently2 = _interopRequireDefault(_frequently);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.uncompress = _data.uncompress;
exports.store = _store2.default;
exports.frequently = _frequently2.default;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchors = __webpack_require__(40);

Object.defineProperty(exports, 'Anchors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_anchors).default;
  }
});

var _category = __webpack_require__(42);

Object.defineProperty(exports, 'Category', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_category).default;
  }
});

var _preview = __webpack_require__(63);

Object.defineProperty(exports, 'Preview', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_preview).default;
  }
});

var _search = __webpack_require__(67);

Object.defineProperty(exports, 'Search', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_search).default;
  }
});

var _skins = __webpack_require__(65);

Object.defineProperty(exports, 'Skins', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_skins).default;
  }
});

var _emoji = __webpack_require__(120);

Object.defineProperty(exports, 'Emoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_emoji).default;
  }
});

var _nimbleEmoji = __webpack_require__(20);

Object.defineProperty(exports, 'NimbleEmoji', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nimbleEmoji).default;
  }
});

var _picker = __webpack_require__(121);

Object.defineProperty(exports, 'Picker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_picker).default;
  }
});

var _nimblePicker = __webpack_require__(72);

Object.defineProperty(exports, 'NimblePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nimblePicker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SVGs = {
  activity: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12m9.949 11H17.05c.224-2.527 1.232-4.773 1.968-6.113A9.966 9.966 0 0 1 21.949 11M13 11V2.051a9.945 9.945 0 0 1 4.432 1.564c-.858 1.491-2.156 4.22-2.392 7.385H13zm-2 0H8.961c-.238-3.165-1.536-5.894-2.393-7.385A9.95 9.95 0 0 1 11 2.051V11zm0 2v8.949a9.937 9.937 0 0 1-4.432-1.564c.857-1.492 2.155-4.221 2.393-7.385H11zm4.04 0c.236 3.164 1.534 5.893 2.392 7.385A9.92 9.92 0 0 1 13 21.949V13h2.04zM4.982 4.887C5.718 6.227 6.726 8.473 6.951 11h-4.9a9.977 9.977 0 0 1 2.931-6.113M2.051 13h4.9c-.226 2.527-1.233 4.771-1.969 6.113A9.972 9.972 0 0 1 2.051 13m16.967 6.113c-.735-1.342-1.744-3.586-1.968-6.113h4.899a9.961 9.961 0 0 1-2.931 6.113\"/></svg>",

  custom: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><g transform=\"translate(2.000000, 1.000000)\"><rect id=\"Rectangle\" x=\"8\" y=\"0\" width=\"3\" height=\"21\" rx=\"1.5\"></rect><rect id=\"Rectangle\" transform=\"translate(9.843, 10.549) rotate(60) translate(-9.843, -10.549) \" x=\"8.343\" y=\"0.049\" width=\"3\" height=\"21\" rx=\"1.5\"></rect><rect id=\"Rectangle\" transform=\"translate(9.843, 10.549) rotate(-60) translate(-9.843, -10.549) \" x=\"8.343\" y=\"0.049\" width=\"3\" height=\"21\" rx=\"1.5\"></rect></g></svg>",

  flags: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z\"/></svg>",

  foods: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M17 4.978c-1.838 0-2.876.396-3.68.934.513-1.172 1.768-2.934 4.68-2.934a1 1 0 0 0 0-2c-2.921 0-4.629 1.365-5.547 2.512-.064.078-.119.162-.18.244C11.73 1.838 10.798.023 9.207.023 8.579.022 7.85.306 7 .978 5.027 2.54 5.329 3.902 6.492 4.999 3.609 5.222 0 7.352 0 12.969c0 4.582 4.961 11.009 9 11.009 1.975 0 2.371-.486 3-1 .629.514 1.025 1 3 1 4.039 0 9-6.418 9-11 0-5.953-4.055-8-7-8M8.242 2.546c.641-.508.943-.523.965-.523.426.169.975 1.405 1.357 3.055-1.527-.629-2.741-1.352-2.98-1.846.059-.112.241-.356.658-.686M15 21.978c-1.08 0-1.21-.109-1.559-.402l-.176-.146c-.367-.302-.816-.452-1.266-.452s-.898.15-1.266.452l-.176.146c-.347.292-.477.402-1.557.402-2.813 0-7-5.389-7-9.009 0-5.823 4.488-5.991 5-5.991 1.939 0 2.484.471 3.387 1.251l.323.276a1.995 1.995 0 0 0 2.58 0l.323-.276c.902-.78 1.447-1.251 3.387-1.251.512 0 5 .168 5 6 0 3.617-4.187 9-7 9\"/></svg>",

  nature: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M15.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 8M8.5 8a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 8\"/><path d=\"M18.933 0h-.027c-.97 0-2.138.787-3.018 1.497-1.274-.374-2.612-.51-3.887-.51-1.285 0-2.616.133-3.874.517C7.245.79 6.069 0 5.093 0h-.027C3.352 0 .07 2.67.002 7.026c-.039 2.479.276 4.238 1.04 5.013.254.258.882.677 1.295.882.191 3.177.922 5.238 2.536 6.38.897.637 2.187.949 3.2 1.102C8.04 20.6 8 20.795 8 21c0 1.773 2.35 3 4 3 1.648 0 4-1.227 4-3 0-.201-.038-.393-.072-.586 2.573-.385 5.435-1.877 5.925-7.587.396-.22.887-.568 1.104-.788.763-.774 1.079-2.534 1.04-5.013C23.929 2.67 20.646 0 18.933 0M3.223 9.135c-.237.281-.837 1.155-.884 1.238-.15-.41-.368-1.349-.337-3.291.051-3.281 2.478-4.972 3.091-5.031.256.015.731.27 1.265.646-1.11 1.171-2.275 2.915-2.352 5.125-.133.546-.398.858-.783 1.313M12 22c-.901 0-1.954-.693-2-1 0-.654.475-1.236 1-1.602V20a1 1 0 1 0 2 0v-.602c.524.365 1 .947 1 1.602-.046.307-1.099 1-2 1m3-3.48v.02a4.752 4.752 0 0 0-1.262-1.02c1.092-.516 2.239-1.334 2.239-2.217 0-1.842-1.781-2.195-3.977-2.195-2.196 0-3.978.354-3.978 2.195 0 .883 1.148 1.701 2.238 2.217A4.8 4.8 0 0 0 9 18.539v-.025c-1-.076-2.182-.281-2.973-.842-1.301-.92-1.838-3.045-1.853-6.478l.023-.041c.496-.826 1.49-1.45 1.804-3.102 0-2.047 1.357-3.631 2.362-4.522C9.37 3.178 10.555 3 11.948 3c1.447 0 2.685.192 3.733.57 1 .9 2.316 2.465 2.316 4.48.313 1.651 1.307 2.275 1.803 3.102.035.058.068.117.102.178-.059 5.967-1.949 7.01-4.902 7.19m6.628-8.202c-.037-.065-.074-.13-.113-.195a7.587 7.587 0 0 0-.739-.987c-.385-.455-.648-.768-.782-1.313-.076-2.209-1.241-3.954-2.353-5.124.531-.376 1.004-.63 1.261-.647.636.071 3.044 1.764 3.096 5.031.027 1.81-.347 3.218-.37 3.235\"/></svg>",

  objects: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 0a9 9 0 0 0-5 16.482V21s2.035 3 5 3 5-3 5-3v-4.518A9 9 0 0 0 12 0zm0 2c3.86 0 7 3.141 7 7s-3.14 7-7 7-7-3.141-7-7 3.14-7 7-7zM9 17.477c.94.332 1.946.523 3 .523s2.06-.19 3-.523v.834c-.91.436-1.925.689-3 .689a6.924 6.924 0 0 1-3-.69v-.833zm.236 3.07A8.854 8.854 0 0 0 12 21c.965 0 1.888-.167 2.758-.451C14.155 21.173 13.153 22 12 22c-1.102 0-2.117-.789-2.764-1.453z\"/><path d=\"M14.745 12.449h-.004c-.852-.024-1.188-.858-1.577-1.824-.421-1.061-.703-1.561-1.182-1.566h-.009c-.481 0-.783.497-1.235 1.537-.436.982-.801 1.811-1.636 1.791l-.276-.043c-.565-.171-.853-.691-1.284-1.794-.125-.313-.202-.632-.27-.913-.051-.213-.127-.53-.195-.634C7.067 9.004 7.039 9 6.99 9A1 1 0 0 1 7 7h.01c1.662.017 2.015 1.373 2.198 2.134.486-.981 1.304-2.058 2.797-2.075 1.531.018 2.28 1.153 2.731 2.141l.002-.008C14.944 8.424 15.327 7 16.979 7h.032A1 1 0 1 1 17 9h-.011c-.149.076-.256.474-.319.709a6.484 6.484 0 0 1-.311.951c-.429.973-.79 1.789-1.614 1.789\"/></svg>",

  people: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10\"/><path d=\"M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0\"/></svg>",

  places: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M6.5 12C5.122 12 4 13.121 4 14.5S5.122 17 6.5 17 9 15.879 9 14.5 7.878 12 6.5 12m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5M17.5 12c-1.378 0-2.5 1.121-2.5 2.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5-1.122-2.5-2.5-2.5m0 3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5.5.225.5.5-.225.5-.5.5\"/><path d=\"M22.482 9.494l-1.039-.346L21.4 9h.6c.552 0 1-.439 1-.992 0-.006-.003-.008-.003-.008H23c0-1-.889-2-1.984-2h-.642l-.731-1.717C19.262 3.012 18.091 2 16.764 2H7.236C5.909 2 4.738 3.012 4.357 4.283L3.626 6h-.642C1.889 6 1 7 1 8h.003S1 8.002 1 8.008C1 8.561 1.448 9 2 9h.6l-.043.148-1.039.346a2.001 2.001 0 0 0-1.359 2.097l.751 7.508a1 1 0 0 0 .994.901H3v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h6v1c0 1.103.896 2 2 2h2c1.104 0 2-.897 2-2v-1h1.096a.999.999 0 0 0 .994-.901l.751-7.508a2.001 2.001 0 0 0-1.359-2.097M6.273 4.857C6.402 4.43 6.788 4 7.236 4h9.527c.448 0 .834.43.963.857L19.313 9H4.688l1.585-4.143zM7 21H5v-1h2v1zm12 0h-2v-1h2v1zm2.189-3H2.811l-.662-6.607L3 11h18l.852.393L21.189 18z\"/></svg>",

  recent: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M13 4h-2l-.001 7H9v2h2v2h2v-2h4v-2h-4z\"/><path d=\"M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10\"/></svg>",

  symbols: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M0 0h11v2H0zM4 11h3V6h4V4H0v2h4zM15.5 17c1.381 0 2.5-1.116 2.5-2.493s-1.119-2.493-2.5-2.493S13 13.13 13 14.507 14.119 17 15.5 17m0-2.986c.276 0 .5.222.5.493 0 .272-.224.493-.5.493s-.5-.221-.5-.493.224-.493.5-.493M21.5 19.014c-1.381 0-2.5 1.116-2.5 2.493S20.119 24 21.5 24s2.5-1.116 2.5-2.493-1.119-2.493-2.5-2.493m0 2.986a.497.497 0 0 1-.5-.493c0-.271.224-.493.5-.493s.5.222.5.493a.497.497 0 0 1-.5.493M22 13l-9 9 1.513 1.5 8.99-9.009zM17 11c2.209 0 4-1.119 4-2.5V2s.985-.161 1.498.949C23.01 4.055 23 6 23 6s1-1.119 1-3.135C24-.02 21 0 21 0h-2v6.347A5.853 5.853 0 0 0 17 6c-2.209 0-4 1.119-4 2.5s1.791 2.5 4 2.5M10.297 20.482l-1.475-1.585a47.54 47.54 0 0 1-1.442 1.129c-.307-.288-.989-1.016-2.045-2.183.902-.836 1.479-1.466 1.729-1.892s.376-.871.376-1.336c0-.592-.273-1.178-.818-1.759-.546-.581-1.329-.871-2.349-.871-1.008 0-1.79.293-2.344.879-.556.587-.832 1.181-.832 1.784 0 .813.419 1.748 1.256 2.805-.847.614-1.444 1.208-1.794 1.784a3.465 3.465 0 0 0-.523 1.833c0 .857.308 1.56.924 2.107.616.549 1.423.823 2.42.823 1.173 0 2.444-.379 3.813-1.137L8.235 24h2.819l-2.09-2.383 1.333-1.135zm-6.736-6.389a1.02 1.02 0 0 1 .73-.286c.31 0 .559.085.747.254a.849.849 0 0 1 .283.659c0 .518-.419 1.112-1.257 1.784-.536-.651-.805-1.231-.805-1.742a.901.901 0 0 1 .302-.669M3.74 22c-.427 0-.778-.116-1.057-.349-.279-.232-.418-.487-.418-.766 0-.594.509-1.288 1.527-2.083.968 1.134 1.717 1.946 2.248 2.438-.921.507-1.686.76-2.3.76\"/></svg>"
};

exports.default = SVGs;

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "emoji-mart-anchors" },
    _vm._l(_vm.categories, function(category) {
      return _c(
        "span",
        {
          key: category.id,
          class: {
            "emoji-mart-anchor": true,
            "emoji-mart-anchor-selected": category.id == _vm.activeCategory.id
          },
          style: {
            color: category.id == _vm.activeCategory.id ? _vm.color : ""
          },
          attrs: { title: _vm.i18n.categories[category.id] },
          on: {
            click: function($event) {
              _vm.$emit("click", category)
            }
          }
        },
        [
          _c("div", { domProps: { innerHTML: _vm._s(_vm.svgs[category.id]) } }),
          _vm._v(" "),
          _c("span", {
            staticClass: "emoji-mart-anchor-bar",
            style: { backgroundColor: _vm.color }
          })
        ]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-51188104", esExports)
  }
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(12);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(82) });


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(19);
var toObject = __webpack_require__(31);
var IObject = __webpack_require__(48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(49);
var toAbsoluteIndex = __webpack_require__(84);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(33);
module.exports = __webpack_require__(94);


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(87);
var step = __webpack_require__(88);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(52)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(54);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(32);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(16);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(5);
var toObject = __webpack_require__(31);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var get = __webpack_require__(55);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(8);
var meta = __webpack_require__(56).onFreeze;

__webpack_require__(57)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Object = Object;

exports.default = function createClass() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      _Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(51);
module.exports = __webpack_require__(35).f('iterator');


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(12);
var redefine = __webpack_require__(53);
var META = __webpack_require__(56).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(28);
var setToStringTag = __webpack_require__(32);
var uid = __webpack_require__(18);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(35);
var wksDefine = __webpack_require__(36);
var enumKeys = __webpack_require__(105);
var isArray = __webpack_require__(106);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(23);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(54);
var gOPNExt = __webpack_require__(60);
var $GOPD = __webpack_require__(107);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(16);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(61).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(19).f = $propertyIsEnumerable;
  __webpack_require__(30).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(17)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(19);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(19);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(45);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {



/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('asyncIterator');


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('observable');


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _String = String;

exports.default = _String.fromCodePoint || function stringFromCodePoint() {
  var MAX_SIZE = 0x4000;
  var codeUnits = [];
  var highSurrogate;
  var lowSurrogate;
  var index = -1;
  var length = arguments.length;
  if (!length) {
    return '';
  }
  var result = '';
  while (++index < length) {
    var codePoint = Number(arguments[index]);
    if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
    codePoint < 0 || // not a valid Unicode code point
    codePoint > 0x10ffff || // not a valid Unicode code point
    Math.floor(codePoint) != codePoint // not an integer
    ) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
    if (codePoint <= 0xffff) {
      // BMP code point
      codeUnits.push(codePoint);
    } else {
      // Astral code point; split in surrogate halves
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      highSurrogate = (codePoint >> 10) + 0xd800;
      lowSurrogate = codePoint % 0x400 + 0xdc00;
      codeUnits.push(highSurrogate, lowSurrogate);
    }
    if (index + 1 === length || codeUnits.length > MAX_SIZE) {
      result += String.fromCharCode.apply(null, codeUnits);
      codeUnits.length = 0;
    }
  }
  return result;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(57)('getOwnPropertyNames', function () {
  return __webpack_require__(60).f;
});


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.view.canRender
    ? _c(
        "span",
        {
          staticClass: "emoji-mart-emoji",
          attrs: { "data-title": _vm.title },
          on: {
            mouseenter: _vm.onMouseEnter,
            mouseleave: _vm.onMouseLeave,
            click: _vm.onClick
          }
        },
        [
          _c("span", { class: _vm.view.cssClass, style: _vm.view.cssStyle }, [
            _vm._v(_vm._s(_vm.view.content))
          ])
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7f853594", esExports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isVisible && (_vm.isSearch || _vm.hasResults)
    ? _c(
        "div",
        {
          class: {
            "emoji-mart-category": true,
            "emoji-mart-no-results": !_vm.hasResults
          }
        },
        [
          _c("div", { staticClass: "emoji-mart-category-label" }, [
            _c("span", [_vm._v(_vm._s(_vm.i18n.categories[_vm.id]))])
          ]),
          _vm._v(" "),
          _vm._l(_vm.emojiObjects, function(ref) {
            var emojiObject = ref.emojiObject
            var emojiView = ref.emojiView
            return [
              emojiView.canRender
                ? _c(
                    "span",
                    {
                      staticClass: "emoji-mart-emoji",
                      attrs: { "data-title": emojiObject.short_name },
                      on: {
                        mouseenter: function($event) {
                          _vm.emojiProps.onEnter(emojiObject)
                        },
                        mouseleave: function($event) {
                          _vm.emojiProps.onLeave(emojiObject)
                        },
                        click: function($event) {
                          _vm.emojiProps.onClick(emojiObject)
                        }
                      }
                    },
                    [
                      _c(
                        "span",
                        {
                          class: emojiView.cssClass,
                          style: emojiView.cssStyle
                        },
                        [_vm._v(_vm._s(emojiView.content))]
                      )
                    ]
                  )
                : _vm._e()
            ]
          }),
          _vm._v(" "),
          !_vm.hasResults
            ? _c(
                "div",
                [
                  _c("nimble-emoji", {
                    attrs: {
                      data: _vm.data,
                      emoji: "sleuth_or_spy",
                      native: _vm.emojiProps.native,
                      skin: _vm.emojiProps.skin,
                      set: _vm.emojiProps.set
                    }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "emoji-mart-no-results-label" }, [
                    _vm._v(_vm._s(_vm.i18n.notfound))
                  ])
                ],
                1
              )
            : _vm._e()
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-376cda0e", esExports)
  }
}

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: {
        "emoji-mart-skin-swatches": true,
        "emoji-mart-skin-swatches-opened": _vm.opened
      }
    },
    _vm._l(6, function(skinTone) {
      return _c(
        "span",
        {
          key: skinTone,
          class: {
            "emoji-mart-skin-swatch": true,
            "emoji-mart-skin-swatch-selected": _vm.skin == skinTone
          }
        },
        [
          _c("span", {
            class: "emoji-mart-skin emoji-mart-skin-tone-" + skinTone,
            on: {
              click: function($event) {
                _vm.onClick(skinTone)
              }
            }
          })
        ]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1c614894", esExports)
  }
}

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "emoji-mart-preview" },
    [
      _vm.emoji
        ? [
            _c(
              "div",
              { staticClass: "emoji-mart-preview-emoji" },
              [
                _c("nimble-emoji", {
                  attrs: {
                    data: _vm.data,
                    emoji: _vm.emoji,
                    native: _vm.emojiProps.native,
                    skin: _vm.emojiProps.skin,
                    set: _vm.emojiProps.set
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "emoji-mart-preview-data" }, [
              _c("div", { staticClass: "emoji-mart-preview-name" }, [
                _vm._v(_vm._s(_vm.emoji.name))
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "emoji-mart-preview-shortnames" },
                _vm._l(_vm.emojiShortNames, function(shortName) {
                  return _c(
                    "span",
                    {
                      key: shortName,
                      staticClass: "emoji-mart-preview-shortname"
                    },
                    [_vm._v(":" + _vm._s(shortName) + ":")]
                  )
                })
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "emoji-mart-preview-emoticons" },
                _vm._l(_vm.emojiEmoticons, function(emoticon) {
                  return _c(
                    "span",
                    {
                      key: emoticon,
                      staticClass: "emoji-mart-preview-emoticon"
                    },
                    [_vm._v(_vm._s(emoticon))]
                  )
                })
              )
            ])
          ]
        : [
            _c(
              "div",
              { staticClass: "emoji-mart-preview-emoji" },
              [
                _c("nimble-emoji", {
                  attrs: {
                    data: _vm.data,
                    emoji: _vm.idleEmoji,
                    native: _vm.emojiProps.native,
                    skin: _vm.emojiProps.skin,
                    set: _vm.emojiProps.set
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "emoji-mart-preview-data" }, [
              _c("span", { staticClass: "emoji-mart-title-label" }, [
                _vm._v(_vm._s(_vm.title))
              ])
            ]),
            _vm._v(" "),
            _vm.showSkinTones
              ? _c(
                  "div",
                  { staticClass: "emoji-mart-preview-skins" },
                  [
                    _c("skins", {
                      attrs: { skin: _vm.skinProps.skin },
                      on: {
                        change: function($event) {
                          _vm.$emit("change", $event)
                        }
                      }
                    })
                  ],
                  1
                )
              : _vm._e()
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-35056c30", esExports)
  }
}

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "emoji-mart-search" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.value,
          expression: "value"
        }
      ],
      attrs: { type: "text", placeholder: _vm.i18n.search },
      domProps: { value: _vm.value },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.value = $event.target.value
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4ad41bb8", esExports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_emoji_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/emoji/emoji.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-924ece46", Component.options)
  } else {
    hotAPI.reload("data-v-924ece46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_picker_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/picker/picker.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-344c59cf", Component.options)
  } else {
    hotAPI.reload("data-v-344c59cf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(123);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(125);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(44);
var $export = __webpack_require__(12);
var toObject = __webpack_require__(31);
var call = __webpack_require__(126);
var isArrayIter = __webpack_require__(127);
var toLength = __webpack_require__(49);
var createProperty = __webpack_require__(128);
var getIterFn = __webpack_require__(55);

$export($export.S + $export.F * !__webpack_require__(129)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(13);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var isWindowAvailable = typeof window !== 'undefined';

isWindowAvailable && function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);

    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}();

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecycleScroller", function() { return RecycleScroller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicScroller", function() { return DynamicScroller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicScrollerItem", function() { return DynamicScrollerItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdState", function() { return IdState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var config = {
  itemsLimit: 1000
};

function getInternetExplorerVersion() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return -1;
}

var isIE = void 0;

function initCompat() {
	if (!initCompat.init) {
		initCompat.init = true;
		isIE = getInternetExplorerVersion() !== -1;
	}
}

var ResizeObserver = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "resize-observer", attrs: { "tabindex": "-1" } });
	}, staticRenderFns: [], _scopeId: 'data-v-b329ee4c',
	name: 'resize-observer',

	methods: {
		compareAndNotify: function compareAndNotify() {
			if (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) {
				this._w = this.$el.offsetWidth;
				this._h = this.$el.offsetHeight;
				this.$emit('notify');
			}
		},
		addResizeHandlers: function addResizeHandlers() {
			this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);
			this.compareAndNotify();
		},
		removeResizeHandlers: function removeResizeHandlers() {
			if (this._resizeObject && this._resizeObject.onload) {
				if (!isIE && this._resizeObject.contentDocument) {
					this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
				}
				delete this._resizeObject.onload;
			}
		}
	},

	mounted: function mounted() {
		var _this = this;

		initCompat();
		this.$nextTick(function () {
			_this._w = _this.$el.offsetWidth;
			_this._h = _this.$el.offsetHeight;
		});
		var object = document.createElement('object');
		this._resizeObject = object;
		object.setAttribute('aria-hidden', 'true');
		object.setAttribute('tabindex', -1);
		object.onload = this.addResizeHandlers;
		object.type = 'text/html';
		if (isIE) {
			this.$el.appendChild(object);
		}
		object.data = 'about:blank';
		if (!isIE) {
			this.$el.appendChild(object);
		}
	},
	beforeDestroy: function beforeDestroy() {
		this.removeResizeHandlers();
	}
};

// Install the components
function install(Vue$$1) {
	Vue$$1.component('resize-observer', ResizeObserver);
	Vue$$1.component('ResizeObserver', ResizeObserver);
}

// Plugin
var plugin$2 = {
	// eslint-disable-next-line no-undef
	version: "0.4.5",
	install: install
};

// Auto-install
var GlobalVue$1 = null;
if (typeof window !== 'undefined') {
	GlobalVue$1 = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue$1 = global.Vue;
}
if (GlobalVue$1) {
	GlobalVue$1.use(plugin$2);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function processOptions(value) {
	var options = void 0;
	if (typeof value === 'function') {
		// Simple options (callback-only)
		options = {
			callback: value
		};
	} else {
		// Options object
		options = value;
	}
	return options;
}

function throttle(callback, delay) {
	var timeout = void 0;
	var lastState = void 0;
	var currentArgs = void 0;
	var throttled = function throttled(state) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		currentArgs = args;
		if (timeout && state === lastState) return;
		lastState = state;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			callback.apply(undefined, [state].concat(toConsumableArray(currentArgs)));
			timeout = 0;
		}, delay);
	};
	throttled._clear = function () {
		clearTimeout(timeout);
	};
	return throttled;
}

function deepEqual(val1, val2) {
	if (val1 === val2) return true;
	if ((typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) === 'object') {
		for (var key in val1) {
			if (!deepEqual(val1[key], val2[key])) {
				return false;
			}
		}
		return true;
	}
	return false;
}

var VisibilityState = function () {
	function VisibilityState(el, options, vnode) {
		classCallCheck(this, VisibilityState);

		this.el = el;
		this.observer = null;
		this.frozen = false;
		this.createObserver(options, vnode);
	}

	createClass(VisibilityState, [{
		key: 'createObserver',
		value: function createObserver(options, vnode) {
			var _this = this;

			if (this.observer) {
				this.destroyObserver();
			}

			if (this.frozen) return;

			this.options = processOptions(options);

			this.callback = this.options.callback;
			// Throttle
			if (this.callback && this.options.throttle) {
				this.callback = throttle(this.callback, this.options.throttle);
			}

			this.oldResult = undefined;

			this.observer = new IntersectionObserver(function (entries) {
				var entry = entries[0];
				if (_this.callback) {
					// Use isIntersecting if possible because browsers can report isIntersecting as true, but intersectionRatio as 0, when something very slowly enters the viewport.
					var result = entry.isIntersecting && entry.intersectionRatio >= _this.threshold;
					if (result === _this.oldResult) return;
					_this.oldResult = result;
					_this.callback(result, entry);
					if (result && _this.options.once) {
						_this.frozen = true;
						_this.destroyObserver();
					}
				}
			}, this.options.intersection);

			// Wait for the element to be in document
			vnode.context.$nextTick(function () {
				_this.observer.observe(_this.el);
			});
		}
	}, {
		key: 'destroyObserver',
		value: function destroyObserver() {
			if (this.observer) {
				this.observer.disconnect();
				this.observer = null;
			}

			// Cancel throttled call
			if (this.callback && this.callback._clear) {
				this.callback._clear();
				this.callback = null;
			}
		}
	}, {
		key: 'threshold',
		get: function get$$1() {
			return this.options.intersection && this.options.intersection.threshold || 0;
		}
	}]);
	return VisibilityState;
}();

function bind(el, _ref, vnode) {
	var value = _ref.value;

	if (typeof IntersectionObserver === 'undefined') {
		console.warn('[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill');
	} else {
		var state = new VisibilityState(el, value, vnode);
		el._vue_visibilityState = state;
	}
}

function update(el, _ref2, vnode) {
	var value = _ref2.value,
	    oldValue = _ref2.oldValue;

	if (deepEqual(value, oldValue)) return;
	var state = el._vue_visibilityState;
	if (state) {
		state.createObserver(value, vnode);
	} else {
		bind(el, { value: value }, vnode);
	}
}

function unbind(el) {
	var state = el._vue_visibilityState;
	if (state) {
		state.destroyObserver();
		delete el._vue_visibilityState;
	}
}

var ObserveVisibility = {
	bind: bind,
	update: update,
	unbind: unbind
};

// Install the components
function install$1(Vue$$1) {
	Vue$$1.directive('observe-visibility', ObserveVisibility);
	/* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
var plugin$4 = {
	// eslint-disable-next-line no-undef
	version: "0.4.3",
	install: install$1
};

// Auto-install
var GlobalVue$2 = null;
if (typeof window !== 'undefined') {
	GlobalVue$2 = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue$2 = global.Vue;
}
if (GlobalVue$2) {
	GlobalVue$2.use(plugin$4);
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var scrollparent = createCommonjsModule(function (module) {
(function (root, factory) {
  if (false) {
    undefined([], factory);
  } else if ('object' === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Scrollparent = factory();
  }
}(commonjsGlobal, function () {
  var regex = /(auto|scroll)/;

  var parents = function (node, ps) {
    if (node.parentNode === null) { return ps; }

    return parents(node.parentNode, ps.concat([node]));
  };

  var style = function (node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
  };

  var overflow = function (node) {
    return style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x");
  };

  var scroll = function (node) {
   return regex.test(overflow(node));
  };

  var scrollParent = function (node) {
    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
      return ;
    }

    var ps = parents(node.parentNode, []);

    for (var i = 0; i < ps.length; i += 1) {
      if (scroll(ps[i])) {
        return ps[i];
      }
    }

    return document.scrollingElement || document.documentElement;
  };

  return scrollParent;
}));
});

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator$1 = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();













var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var props = {
  items: {
    type: Array,
    required: true
  },

  keyField: {
    type: String,
    default: 'id'
  },

  direction: {
    type: String,
    default: 'vertical',
    validator: function validator(value) {
      return ['vertical', 'horizontal'].includes(value);
    }
  }
};

function simpleArray() {
  return this.items.length && _typeof$1(this.items[0]) !== 'object';
}

var supportsPassive = false;

if (typeof window !== 'undefined') {
  supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
}

var uid = 0;

var RecycleScroller = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: _vm.handleVisibilityChange, expression: "handleVisibilityChange" }], staticClass: "vue-recycle-scroller", class: defineProperty({ ready: _vm.ready, 'page-mode': _vm.pageMode }, 'direction-' + _vm.direction, true), on: { "&scroll": function scroll($event) {
          return _vm.handleScroll($event);
        } } }, [_vm.$slots.before ? _c('div', { staticClass: "vue-recycle-scroller__slot" }, [_vm._t("before")], 2) : _vm._e(), _vm._v(" "), _c('div', { ref: "wrapper", staticClass: "vue-recycle-scroller__item-wrapper", style: defineProperty({}, _vm.direction === 'vertical' ? 'minHeight' : 'minWidth', _vm.totalSize + 'px') }, _vm._l(_vm.pool, function (view) {
      return _c('div', { key: view.nr.id, staticClass: "vue-recycle-scroller__item-view", class: { hover: _vm.hoverKey === view.nr.key }, style: _vm.ready ? { transform: 'translate' + (_vm.direction === 'vertical' ? 'Y' : 'X') + '(' + view.position + 'px)' } : null, on: { "mouseenter": function mouseenter($event) {
            _vm.hoverKey = view.nr.key;
          }, "mouseleave": function mouseleave($event) {
            _vm.hoverKey = null;
          } } }, [_vm._t("default", null, { item: view.item, index: view.nr.index, active: view.nr.used })], 2);
    }), 0), _vm._v(" "), _vm.$slots.after ? _c('div', { staticClass: "vue-recycle-scroller__slot" }, [_vm._t("after")], 2) : _vm._e(), _vm._v(" "), _c('ResizeObserver', { on: { "notify": _vm.handleResize } })], 1);
  }, staticRenderFns: [],
  name: 'RecycleScroller',

  components: {
    ResizeObserver: ResizeObserver
  },

  directives: {
    ObserveVisibility: ObserveVisibility
  },

  props: _extends({}, props, {

    itemSize: {
      type: Number,
      default: null
    },

    minItemSize: {
      type: [Number, String],
      default: null
    },

    sizeField: {
      type: String,
      default: 'size'
    },

    typeField: {
      type: String,
      default: 'type'
    },

    buffer: {
      type: Number,
      default: 200
    },

    pageMode: {
      type: Boolean,
      default: false
    },

    prerender: {
      type: Number,
      default: 0
    },

    emitUpdate: {
      type: Boolean,
      default: false
    }
  }),

  data: function data() {
    return {
      pool: [],
      totalSize: 0,
      ready: false,
      hoverKey: null
    };
  },


  computed: {
    sizes: function sizes() {
      if (this.itemSize === null) {
        var sizes = {
          '-1': { accumulator: 0 }
        };
        var items = this.items;
        var field = this.sizeField;
        var minItemSize = this.minItemSize;
        var accumulator = 0;
        var current = void 0;
        for (var i = 0, l = items.length; i < l; i++) {
          current = items[i][field] || minItemSize;
          accumulator += current;
          sizes[i] = { accumulator: accumulator, size: current };
        }
        return sizes;
      }
      return [];
    },


    simpleArray: simpleArray
  },

  watch: {
    items: function items() {
      this.updateVisibleItems(true);
    },
    pageMode: function pageMode() {
      this.applyPageMode();
      this.updateVisibleItems(false);
    },


    sizes: {
      handler: function handler() {
        this.updateVisibleItems(false);
      },

      deep: true
    }
  },

  created: function created() {
    this.$_startIndex = 0;
    this.$_endIndex = 0;
    this.$_views = new Map();
    this.$_unusedViews = new Map();
    this.$_scrollDirty = false;

    if (this.$isServer) {
      this.updateVisibleItems(false);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.applyPageMode();
    this.$nextTick(function () {
      _this.updateVisibleItems(true);
      _this.ready = true;
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.removeListeners();
  },


  methods: {
    addView: function addView(pool, index, item, key, type) {
      var view = {
        item: item,
        position: 0
      };
      var nonReactive = {
        id: uid++,
        index: index,
        used: true,
        key: key,
        type: type
      };
      Object.defineProperty(view, 'nr', {
        configurable: false,
        value: nonReactive
      });
      pool.push(view);
      return view;
    },
    unuseView: function unuseView(view) {
      var fake = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var unusedViews = this.$_unusedViews;
      var type = view.nr.type;
      var unusedPool = unusedViews.get(type);
      if (!unusedPool) {
        unusedPool = [];
        unusedViews.set(type, unusedPool);
      }
      unusedPool.push(view);
      if (!fake) {
        view.nr.used = false;
        view.position = -9999;
        this.$_views.delete(view.nr.key);
      }
    },
    handleResize: function handleResize() {
      this.$emit('resize');
      if (this.ready) this.updateVisibleItems(false);
    },
    handleScroll: function handleScroll(event) {
      var _this2 = this;

      if (!this.$_scrollDirty) {
        this.$_scrollDirty = true;
        requestAnimationFrame(function () {
          _this2.$_scrollDirty = false;

          var _updateVisibleItems = _this2.updateVisibleItems(false),
              continuous = _updateVisibleItems.continuous;

          // It seems sometimes chrome doesn't fire scroll event :/
          // When non continous scrolling is ending, we force a refresh


          if (!continuous) {
            clearTimeout(_this2.$_refreshTimout);
            _this2.$_refreshTimout = setTimeout(_this2.handleScroll, 100);
          }
        });
      }
    },
    handleVisibilityChange: function handleVisibilityChange(isVisible, entry) {
      var _this3 = this;

      if (this.ready) {
        if (isVisible || entry.boundingClientRect.width !== 0 || entry.boundingClientRect.height !== 0) {
          this.$emit('visible');
          requestAnimationFrame(function () {
            _this3.updateVisibleItems(false);
          });
        } else {
          this.$emit('hidden');
        }
      }
    },
    updateVisibleItems: function updateVisibleItems(checkItem) {
      var itemSize = this.itemSize;
      var typeField = this.typeField;
      var keyField = this.simpleArray ? null : this.keyField;
      var items = this.items;
      var count = items.length;
      var sizes = this.sizes;
      var views = this.$_views;
      var unusedViews = this.$_unusedViews;
      var pool = this.pool;
      var startIndex = void 0,
          endIndex = void 0;
      var totalSize = void 0;

      if (!count) {
        startIndex = endIndex = totalSize = 0;
      } else if (this.$isServer) {
        startIndex = 0;
        endIndex = this.prerender;
        totalSize = null;
      } else {
        var scroll = this.getScroll();
        var buffer = this.buffer;
        scroll.start -= buffer;
        scroll.end += buffer;

        // Variable size mode
        if (itemSize === null) {
          var h = void 0;
          var a = 0;
          var b = count - 1;
          var i = ~~(count / 2);
          var oldI = void 0;

          // Searching for startIndex
          do {
            oldI = i;
            h = sizes[i].accumulator;
            if (h < scroll.start) {
              a = i;
            } else if (i < count - 1 && sizes[i + 1].accumulator > scroll.start) {
              b = i;
            }
            i = ~~((a + b) / 2);
          } while (i !== oldI);
          i < 0 && (i = 0);
          startIndex = i;

          // For container style
          totalSize = sizes[count - 1].accumulator;

          // Searching for endIndex
          for (endIndex = i; endIndex < count && sizes[endIndex].accumulator < scroll.end; endIndex++) {}
          if (endIndex === -1) {
            endIndex = items.length - 1;
          } else {
            endIndex++;
            // Bounds
            endIndex > count && (endIndex = count);
          }
        } else {
          // Fixed size mode
          startIndex = ~~(scroll.start / itemSize);
          endIndex = Math.ceil(scroll.end / itemSize);

          // Bounds
          startIndex < 0 && (startIndex = 0);
          endIndex > count && (endIndex = count);

          totalSize = count * itemSize;
        }
      }

      if (endIndex - startIndex > config.itemsLimit) {
        this.itemsLimitError();
      }

      this.totalSize = totalSize;

      var view = void 0;

      var continuous = startIndex <= this.$_endIndex && endIndex >= this.$_startIndex;
      var unusedIndex = void 0;

      if (this.$_continuous !== continuous) {
        if (continuous) {
          views.clear();
          unusedViews.clear();
          for (var _i = 0, l = pool.length; _i < l; _i++) {
            view = pool[_i];
            this.unuseView(view);
          }
        }
        this.$_continuous = continuous;
      } else if (continuous) {
        for (var _i2 = 0, _l = pool.length; _i2 < _l; _i2++) {
          view = pool[_i2];
          if (view.nr.used) {
            // Update view item index
            if (checkItem) {
              view.nr.index = items.findIndex(function (item) {
                return keyField ? item[keyField] === view.item[keyField] : item === view.item;
              });
            }

            // Check if index is still in visible range
            if (view.nr.index === -1 || view.nr.index < startIndex || view.nr.index >= endIndex) {
              this.unuseView(view);
            }
          }
        }
      }

      if (!continuous) {
        unusedIndex = new Map();
      }

      var item = void 0,
          type = void 0,
          unusedPool = void 0;
      var v = void 0;
      for (var _i3 = startIndex; _i3 < endIndex; _i3++) {
        item = items[_i3];
        var key = keyField ? item[keyField] : item;
        view = views.get(key);

        if (!itemSize && !sizes[_i3].size) {
          if (view) this.unuseView(view);
          continue;
        }

        // No view assigned to item
        if (!view) {
          type = item[typeField];

          if (continuous) {
            unusedPool = unusedViews.get(type);
            // Reuse existing view
            if (unusedPool && unusedPool.length) {
              view = unusedPool.pop();
              view.item = item;
              view.nr.used = true;
              view.nr.index = _i3;
              view.nr.key = key;
              view.nr.type = type;
            } else {
              view = this.addView(pool, _i3, item, key, type);
            }
          } else {
            unusedPool = unusedViews.get(type);
            v = unusedIndex.get(type) || 0;
            // Use existing view
            // We don't care if they are already used
            // because we are not in continous scrolling
            if (unusedPool && v < unusedPool.length) {
              view = unusedPool[v];
              view.item = item;
              view.nr.used = true;
              view.nr.index = _i3;
              view.nr.key = key;
              view.nr.type = type;
              unusedIndex.set(type, v + 1);
            } else {
              view = this.addView(pool, _i3, item, key, type);
              this.unuseView(view, true);
            }
            v++;
          }
          views.set(key, view);
        } else {
          view.nr.used = true;
          view.item = item;
        }

        // Update position
        if (itemSize === null) {
          view.position = sizes[_i3 - 1].accumulator;
        } else {
          view.position = _i3 * itemSize;
        }
      }

      this.$_startIndex = startIndex;
      this.$_endIndex = endIndex;

      if (this.emitUpdate) this.$emit('update', startIndex, endIndex);

      return {
        continuous: continuous
      };
    },
    getListenerTarget: function getListenerTarget() {
      var target = scrollparent(this.$el);
      // Fix global scroll target for Chrome and Safari
      if (window.document && (target === window.document.documentElement || target === window.document.body)) {
        target = window;
      }
      return target;
    },
    getScroll: function getScroll() {
      var el = this.$el,
          direction = this.direction;

      var isVertical = direction === 'vertical';
      var scrollState = void 0;

      if (this.pageMode) {
        var bounds = el.getBoundingClientRect();
        var boundsSize = isVertical ? bounds.height : bounds.width;
        var start = -(isVertical ? bounds.top : bounds.left);
        var size = isVertical ? window.innerHeight : window.innerWidth;
        if (start < 0) {
          size += start;
          start = 0;
        }
        if (start + size > boundsSize) {
          size = boundsSize - start;
        }
        scrollState = {
          start: start,
          end: start + size
        };
      } else if (isVertical) {
        scrollState = {
          start: el.scrollTop,
          end: el.scrollTop + el.clientHeight
        };
      } else {
        scrollState = {
          start: el.scrollLeft,
          end: el.scrollLeft + el.clientWidth
        };
      }

      return scrollState;
    },
    applyPageMode: function applyPageMode() {
      if (this.pageMode) {
        this.addListeners();
      } else {
        this.removeListeners();
      }
    },
    addListeners: function addListeners() {
      this.listenerTarget = this.getListenerTarget();
      this.listenerTarget.addEventListener('scroll', this.handleScroll, supportsPassive ? {
        passive: true
      } : false);
      this.listenerTarget.addEventListener('resize', this.handleResize);
    },
    removeListeners: function removeListeners() {
      if (!this.listenerTarget) {
        return;
      }

      this.listenerTarget.removeEventListener('scroll', this.handleScroll);
      this.listenerTarget.removeEventListener('resize', this.handleResize);

      this.listenerTarget = null;
    },
    scrollToItem: function scrollToItem(index) {
      var scroll = void 0;
      if (this.itemSize === null) {
        scroll = index > 0 ? this.sizes[index - 1].accumulator : 0;
      } else {
        scroll = index * this.itemSize;
      }
      this.scrollToPosition(scroll);
    },
    scrollToPosition: function scrollToPosition(position) {
      if (this.direction === 'vertical') {
        this.$el.scrollTop = position;
      } else {
        this.$el.scrollLeft = position;
      }
    },
    itemsLimitError: function itemsLimitError() {
      var _this4 = this;

      setTimeout(function () {
        console.log('It seems the scroller element isn\'t scrolling, so it tries to render all the items at once.', 'Scroller:', _this4.$el);
        console.log('Make sure the scroller has a fixed height (or width) and \'overflow-y\' (or \'overflow-x\') set to \'auto\' so it can scroll correctly and only render the items visible in the scroll viewport.');
      });
      throw new Error('Rendered items limit reached');
    }
  }
};

var DynamicScroller = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('RecycleScroller', _vm._g(_vm._b({ ref: "scroller", attrs: { "items": _vm.itemsWithSize, "min-item-size": _vm.minItemSize, "direction": _vm.direction, "key-field": "id" }, on: { "resize": _vm.onScrollerResize, "visible": _vm.onScrollerVisible }, scopedSlots: _vm._u([{ key: "default", fn: function fn(_ref) {
          var itemWithSize = _ref.item,
              index = _ref.index,
              active = _ref.active;
          return [_vm._t("default", null, null, {
            item: itemWithSize.item,
            index: index,
            active: active,
            itemWithSize: itemWithSize
          })];
        } }]) }, 'RecycleScroller', _vm.$attrs, false), _vm.listeners), [_c('template', { slot: "before" }, [_vm._t("before")], 2), _vm._v(" "), _c('template', { slot: "after" }, [_vm._t("after")], 2)], 2);
  }, staticRenderFns: [],
  name: 'DynamicScroller',

  components: {
    RecycleScroller: RecycleScroller
  },

  inheritAttrs: false,

  provide: function provide() {
    return {
      vscrollData: this.vscrollData,
      vscrollParent: this
    };
  },


  props: _extends({}, props, {

    minItemSize: {
      type: [Number, String],
      required: true
    }
  }),

  data: function data() {
    return {
      vscrollData: {
        active: true,
        sizes: {},
        validSizes: {},
        keyField: this.keyField,
        simpleArray: false
      }
    };
  },


  computed: {
    simpleArray: simpleArray,

    itemsWithSize: function itemsWithSize() {
      var result = [];
      var items = this.items,
          keyField = this.keyField,
          simpleArray$$1 = this.simpleArray;

      var sizes = this.vscrollData.sizes;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var id = simpleArray$$1 ? i : item[keyField];
        var size = sizes[id];
        if (typeof size === 'undefined' && !this.$_undefinedMap[id]) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$_undefinedSizes++;
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.$_undefinedMap[id] = true;
          size = 0;
        }
        result.push({
          item: item,
          id: id,
          size: size
        });
      }
      return result;
    },
    listeners: function listeners() {
      var listeners = {};
      for (var key in this.$listeners) {
        if (key !== 'resize' && key !== 'visible') {
          listeners[key] = this.$listeners[key];
        }
      }
      return listeners;
    }
  },

  watch: {
    items: function items() {
      this.forceUpdate(false);
    },


    simpleArray: {
      handler: function handler(value) {
        this.vscrollData.simpleArray = value;
      },

      immediate: true
    },

    direction: function direction(value) {
      this.forceUpdate(true);
    }
  },

  created: function created() {
    this.$_updates = [];
    this.$_undefinedSizes = 0;
    this.$_undefinedMap = {};
  },
  activated: function activated() {
    this.vscrollData.active = true;
  },
  deactivated: function deactivated() {
    this.vscrollData.active = false;
  },


  methods: {
    onScrollerResize: function onScrollerResize() {
      var scroller = this.$refs.scroller;
      if (scroller) {
        this.forceUpdate();
      }
      this.$emit('resize');
    },
    onScrollerVisible: function onScrollerVisible() {
      this.$emit('vscroll:update', { force: false });
      this.$emit('visible');
    },
    forceUpdate: function forceUpdate() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (clear || this.simpleArray) {
        this.vscrollData.validSizes = {};
      }
      this.$emit('vscroll:update', { force: true });
    },
    scrollToItem: function scrollToItem(index) {
      var scroller = this.$refs.scroller;
      if (scroller) scroller.scrollToItem(index);
    },
    getItemSize: function getItemSize(item) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var id = this.simpleArray ? index != null ? index : this.items.indexOf(item) : item[this.keyField];
      return this.vscrollData.sizes[id] || 0;
    },
    scrollToBottom: function scrollToBottom() {
      var _this = this;

      if (this.$_scrollingToBottom) return;
      this.$_scrollingToBottom = true;
      var el = this.$el;
      // Item is inserted to the DOM
      this.$nextTick(function () {
        // Item sizes are computed
        var cb = function cb() {
          el.scrollTop = el.scrollHeight;
          if (_this.$_undefinedSizes === 0) {
            _this.$_scrollingToBottom = false;
          } else {
            requestAnimationFrame(cb);
          }
        };
        requestAnimationFrame(cb);
      });
    }
  }
};

var DynamicScrollerItem = {
  name: 'DynamicScrollerItem',

  inject: ['vscrollData', 'vscrollParent'],

  props: {
    item: {
      required: true
    },

    watchData: {
      type: Boolean,
      default: false
    },

    active: {
      type: Boolean,
      required: true
    },

    index: {
      type: Number,
      default: undefined
    },

    sizeDependencies: {
      type: [Array, Object],
      default: null
    },

    emitResize: {
      type: Boolean,
      default: false
    },

    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    id: function id() {
      return this.vscrollData.simpleArray ? this.index : this.item[this.vscrollData.keyField];
    },
    size: function size() {
      return this.vscrollData.validSizes[this.id] && this.vscrollData.sizes[this.id] || 0;
    }
  },

  watch: {
    watchData: 'updateWatchData',

    id: function id() {
      if (!this.size) {
        this.onDataUpdate();
      }
    },
    active: function active(value) {
      if (value && this.$_pendingVScrollUpdate === this.id) {
        this.updateSize();
      }
    }
  },

  created: function created() {
    var _this = this;

    if (this.$isServer) return;

    this.$_forceNextVScrollUpdate = null;
    this.updateWatchData();

    var _loop = function _loop(k) {
      _this.$watch(function () {
        return _this.sizeDependencies[k];
      }, _this.onDataUpdate);
    };

    for (var k in this.sizeDependencies) {
      _loop(k);
    }

    this.vscrollParent.$on('vscroll:update', this.onVscrollUpdate);
    this.vscrollParent.$on('vscroll:update-size', this.onVscrollUpdateSize);
  },
  mounted: function mounted() {
    if (this.vscrollData.active) {
      this.updateSize();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.vscrollParent.$off('vscroll:update', this.onVscrollUpdate);
    this.vscrollParent.$off('vscroll:update-size', this.onVscrollUpdateSize);
  },


  methods: {
    updateSize: function updateSize() {
      if (this.active && this.vscrollData.active) {
        if (this.$_pendingSizeUpdate !== this.id) {
          this.$_pendingSizeUpdate = this.id;
          this.$_forceNextVScrollUpdate = null;
          this.$_pendingVScrollUpdate = null;
          if (this.active && this.vscrollData.active) {
            this.computeSize(this.id);
          }
        }
      } else {
        this.$_forceNextVScrollUpdate = this.id;
      }
    },
    getBounds: function getBounds() {
      return this.$el.getBoundingClientRect();
    },
    updateWatchData: function updateWatchData() {
      var _this2 = this;

      if (this.watchData) {
        this.$_watchData = this.$watch('data', function () {
          _this2.onDataUpdate();
        }, {
          deep: true
        });
      } else if (this.$_watchData) {
        this.$_watchData();
        this.$_watchData = null;
      }
    },
    onVscrollUpdate: function onVscrollUpdate(_ref) {
      var force = _ref.force;

      if (!this.active && force) {
        this.$_pendingVScrollUpdate = this.id;
      }
      if (this.$_forceNextVScrollUpdate === this.id || force || !this.size) {
        this.updateSize();
      }
    },
    onDataUpdate: function onDataUpdate() {
      this.updateSize();
    },
    computeSize: function computeSize(id) {
      var _this3 = this;

      this.$nextTick(function () {
        if (_this3.id === id) {
          var bounds = _this3.getBounds();
          var size = Math.round(_this3.vscrollParent.direction === 'vertical' ? bounds.height : bounds.width);
          if (size && _this3.size !== size) {
            if (_this3.vscrollParent.$_undefinedMap[id]) {
              _this3.vscrollParent.$_undefinedSizes--;
              _this3.vscrollParent.$_undefinedMap[id] = undefined;
            }
            _this3.$set(_this3.vscrollData.sizes, _this3.id, size);
            _this3.$set(_this3.vscrollData.validSizes, _this3.id, true);
            if (_this3.emitResize) _this3.$emit('resize', _this3.id);
          }
        }
        _this3.$_pendingSizeUpdate = null;
      });
    }
  },

  render: function render(h) {
    return h(this.tag, this.$slots.default);
  }
};

var IdState = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$idProp = _ref.idProp,
      idProp = _ref$idProp === undefined ? function (vm) {
    return vm.item.id;
  } : _ref$idProp;

  var store = {};
  var vm = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    data: function data() {
      return {
        store: store
      };
    }
  });

  // @vue/component
  return {
    data: function data() {
      return {
        idState: null
      };
    },
    created: function created() {
      var _this = this;

      this.$_id = null;
      if (typeof idProp === 'function') {
        this.$_getId = function () {
          return idProp.call(_this, _this);
        };
      } else {
        this.$_getId = function () {
          return _this[idProp];
        };
      }
      this.$watch(this.$_getId, {
        handler: function handler(value) {
          var _this2 = this;

          this.$nextTick(function () {
            _this2.$_id = value;
          });
        },

        immediate: true
      });
      this.$_updateIdState();
    },
    beforeUpdate: function beforeUpdate() {
      this.$_updateIdState();
    },


    methods: {
      /**
       * Initialize an idState
       * @param {number|string} id Unique id for the data
       */
      $_idStateInit: function $_idStateInit(id) {
        var factory = this.$options.idState;
        if (typeof factory === 'function') {
          var data = factory.call(this, this);
          vm.$set(store, id, data);
          this.$_id = id;
          return data;
        } else {
          throw new Error('[mixin IdState] Missing `idState` function on component definition.');
        }
      },


      /**
       * Ensure idState is created and up-to-date
       */
      $_updateIdState: function $_updateIdState() {
        var id = this.$_getId();
        if (id == null) {
          console.warn('No id found for IdState with idProp: \'' + idProp + '\'.');
        }
        if (id !== this.$_id) {
          if (!store[id]) {
            this.$_idStateInit(id);
          }
          this.idState = store[id];
        }
      }
    }
  };
};

function registerComponents(Vue$$1, prefix) {
  Vue$$1.component(prefix + 'recycle-scroller', RecycleScroller);
  Vue$$1.component(prefix + 'RecycleScroller', RecycleScroller);
  Vue$$1.component(prefix + 'dynamic-scroller', DynamicScroller);
  Vue$$1.component(prefix + 'DynamicScroller', DynamicScroller);
  Vue$$1.component(prefix + 'dynamic-scroller-item', DynamicScrollerItem);
  Vue$$1.component(prefix + 'DynamicScrollerItem', DynamicScrollerItem);
}

var plugin = {
  // eslint-disable-next-line no-undef
  version: "1.0.0-rc.2",
  install: function install(Vue$$1, options) {
    var finalOptions = Object.assign({}, {
      installComponents: true,
      componentsPrefix: ''
    }, options);

    for (var key in finalOptions) {
      if (typeof finalOptions[key] !== 'undefined') {
        config[key] = finalOptions[key];
      }
    }

    if (finalOptions.installComponents) {
      registerComponents(Vue$$1, finalOptions.componentsPrefix);
    }
  }
};

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}


/* harmony default export */ __webpack_exports__["default"] = (plugin);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(132)))

/***/ }),
/* 132 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_133__;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(135);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(137).default
var update = add("04618570", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../css-loader/index.js!../../postcss-loader/src/index.js!./vue-virtual-scroller.css", function() {
     var newContent = require("!!../../css-loader/index.js!../../postcss-loader/src/index.js!./vue-virtual-scroller.css");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(136)(false);
// imports


// module
exports.push([module.i, ".vue-recycle-scroller{position:relative}.vue-recycle-scroller.direction-vertical:not(.page-mode){overflow-y:auto}.vue-recycle-scroller.direction-horizontal:not(.page-mode){overflow-x:auto}.vue-recycle-scroller.direction-horizontal{display:-ms-flexbox;display:flex}.vue-recycle-scroller__slot{-ms-flex:auto 0 0px;flex:auto 0 0}.vue-recycle-scroller__item-wrapper{-ms-flex:1;flex:1;box-sizing:border-box;overflow:hidden;position:relative}.vue-recycle-scroller.ready .vue-recycle-scroller__item-view{position:absolute;top:0;left:0;will-change:transform}.vue-recycle-scroller.direction-vertical .vue-recycle-scroller__item-wrapper{width:100%}.vue-recycle-scroller.direction-horizontal .vue-recycle-scroller__item-wrapper{height:100%}.vue-recycle-scroller.ready.direction-vertical .vue-recycle-scroller__item-view{width:100%}.vue-recycle-scroller.ready.direction-horizontal .vue-recycle-scroller__item-view{height:100%}.resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}", ""]);

// exports


/***/ }),
/* 136 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(138);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "emoji-mart", style: _vm.customStyles },
    [
      _vm.showCategories
        ? _c(
            "div",
            { staticClass: "emoji-mart-bar" },
            [
              _c("anchors", {
                attrs: {
                  data: _vm.data,
                  i18n: _vm.mergedI18n,
                  color: _vm.color,
                  categories: _vm.categories,
                  "active-category": _vm.activeCategory
                },
                on: { click: _vm.onAnchorClick }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showSearch
        ? _c("search", {
            ref: "search",
            attrs: {
              data: _vm.data,
              i18n: _vm.mergedI18n,
              "auto-focus": _vm.autoFocus
            },
            on: { search: _vm.onSearch }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("category", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.searchEmojis,
            expression: "searchEmojis"
          }
        ],
        staticClass: "emoji-mart-search-results",
        attrs: {
          data: _vm.data,
          i18n: _vm.mergedI18n,
          id: "search",
          name: "Search",
          emojis: _vm.searchEmojis,
          "emoji-props": _vm.emojiProps
        }
      }),
      _vm._v(" "),
      _c("DynamicScroller", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.searchEmojis,
            expression: "!searchEmojis"
          }
        ],
        ref: "dynScroller",
        staticClass: "scroller",
        attrs: {
          items: _vm.scrollerCategories,
          "min-item-size": 60,
          "emit-update": true
        },
        on: { update: _vm.onScrollUpdate },
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function(ref) {
              var item = ref.item
              var active = ref.active
              var index = ref.index
              return [
                _c(
                  "DynamicScrollerItem",
                  {
                    attrs: { item: item, active: active, "data-index": index }
                  },
                  [
                    _c("category", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: item.show,
                          expression: "item.show"
                        }
                      ],
                      key: item.category.id,
                      ref: "categories",
                      attrs: {
                        data: item.data,
                        i18n: item.mergedI18n,
                        id: item.category.id,
                        name: item.category.name,
                        emojis: item.category.emojis,
                        "emoji-props": item.emojiProps
                      }
                    })
                  ],
                  1
                )
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _vm.showPreview
        ? _c(
            "div",
            { staticClass: "emoji-mart-bar" },
            [
              _c("preview", {
                attrs: {
                  data: _vm.data,
                  title: _vm.title,
                  emoji: _vm.previewEmoji,
                  "idle-emoji": _vm.idleEmoji,
                  "show-skin-tones": _vm.showSkinTones,
                  "emoji-props": _vm.emojiProps,
                  "skin-props": _vm.skinProps
                },
                on: { change: _vm.onSkinChange }
              })
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7bc71df8", esExports)
  }
}

/***/ })
/******/ ]);
});