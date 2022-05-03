import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import * as React from 'react';
import React__default, { useState, useEffect, useCallback, useMemo, useLayoutEffect, createContext, useContext, forwardRef, Children, useRef, useImperativeHandle, memo, StrictMode } from 'react';
import { atom, useAtom, Provider as Provider$4 } from 'jotai';
import { Percent as Percent$1, Token, WETH9, NativeCurrency, Ether, CurrencyAmount, TradeType, Price, Fraction } from '@uniswap/sdk-core';
import { atomWithDefault, useAtomValue, useUpdateAtom, atomWithReset, useResetAtom, RESET } from 'jotai/utils';
import { Interface } from '@ethersproject/abi';
import { initializeConnector } from '@web3-react/core';
import { EMPTY } from '@web3-react/empty';
import 'web3-react-core';
import JSBI from 'jsbi';
import { createMulticall, NEVER_RELOAD } from '@uniswap/redux-multicall';
import { FACTORY_ADDRESS, Pair, computePairAddress, Trade as Trade$2, Route as Route$1, Router } from '@uniswap/v2-sdk';
import { FACTORY_ADDRESS as FACTORY_ADDRESS$1, Pool as Pool$1, computePoolAddress, FeeAmount, Route, SwapQuoter, Trade as Trade$3, toHex, SwapRouter } from '@uniswap/v3-sdk';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import { USDC_MAINNET, USDC_ARBITRUM, USDC_OPTIMISM, USDC_ARBITRUM_RINKEBY, USDC_OPTIMISTIC_KOVAN, USDC_POLYGON, USDC_POLYGON_MUMBAI, WBNB_BNB, WBNB_BNB_TESTNET, USDC_GÖRLI, USDC_RINKEBY, USDC_KOVAN, USDC_ROPSTEN, routeAmountsToString, ChainId, AlphaRouter } from '@uniswap/smart-order-router';
import { getAddress } from '@ethersproject/address';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { combineReducers, createStore } from 'redux';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime.js';
import { atomWithImmer, withImmer } from 'jotai/immer';
import { parseUnits } from '@ethersproject/units';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import { Trade as Trade$1, Protocol, SwapRouter as SwapRouter$1 } from '@uniswap/router-sdk';
import { namehash } from '@ethersproject/hash';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _typeof from '@babel/runtime/helpers/typeof';
import { arrayify, splitSignature } from '@ethersproject/bytes';
import { parseBytes32String } from '@ethersproject/strings';
import CID from 'cids';
import { getNameFromData, rmPrefix } from 'multicodec';
import { decode, toB58String } from 'multihashes';
import invariant from 'tiny-invariant';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _wrapNativeSuper from '@babel/runtime/helpers/wrapNativeSuper';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import 'wicg-inert';
import { transparentize, readableColor, opacify, darken, lighten, mix } from 'polished';
import _styled, { css as css$1, keyframes as keyframes$1, useTheme as useTheme$1, ThemeProvider as ThemeProvider$1 } from 'styled-components';
import { hex } from 'wcag-contrast';
import { Text } from 'rebass';
import { ArrowDown as ArrowDown$2, ArrowRight as ArrowRight$1, ArrowUp as ArrowUp$2, CheckCircle as CheckCircle$1, BarChart2, ChevronDown as ChevronDown$1, Clock as Clock$1, HelpCircle as HelpCircle$1, Info as Info$1, ExternalLink as ExternalLink$1, Settings as Settings$2, Slash, Trash2, X as X$1, XOctagon as XOctagon$1, AlertTriangle as AlertTriangle$1 } from 'react-feather';
import { createPortal } from 'react-dom';
import maxSize from 'popper-max-size-modifier';
import { usePopper } from 'react-popper';
import Vibrant from 'node-vibrant/lib/bundle.js';
import 'setimmediate';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, areEqual } from 'react-window';
import { BigNumber } from '@ethersproject/bignumber';
import _get from '@babel/runtime/helpers/get';
import { Provider as Provider$2 } from '@ethersproject/abstract-provider';
import { VoidSigner } from '@ethersproject/abstract-signer';
import { Eip1193Bridge as Eip1193Bridge$1 } from '@ethersproject/experimental';
import { JsonRpcProvider } from '@ethersproject/providers';
import { af, ar, ca, cs, da, de, el, en, es, fi, fr, he, hu, id, it, ja, ko, nl, no, pl, pt, ro, ru, sr, sv, sw, tr, uk, vi, zh } from 'make-plural/plurals';
import { Provider as Provider$3 } from 'react-redux';
import { EIP1193 } from '@web3-react/eip1193';
import { Url } from '@web3-react/url';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

var LinguiContext = /*#__PURE__*/React__default.createContext(null);

function useLingui$1() {
  var context = React__default.useContext(LinguiContext);
  {
    if (context == null) {
      throw new Error("useLingui hook was used without I18nProvider.");
    }
  }
  return context;
}

function withI18n(o) {
  return function (WrappedComponent) {
    return function (props) {
      {
        if (typeof o === "function" || /*#__PURE__*/React__default.isValidElement(o)) {
          throw new Error("withI18n([options]) takes options as a first argument, " + "but received React component itself. Without options, the Component " + "should be wrapped as withI18n()(Component), not withI18n(Component).");
        }
      }

      var _useLingui = useLingui$1(),
          i18n = _useLingui.i18n;

      return /*#__PURE__*/React__default.createElement(WrappedComponent, Object.assign({}, props, {
        i18n: i18n
      }));
    };
  };
}

var I18nProvider$1 = function I18nProvider(_ref) {
  var i18n = _ref.i18n,
      defaultComponent = _ref.defaultComponent,
      _ref$forceRenderOnLoc = _ref.forceRenderOnLocaleChange,
      forceRenderOnLocaleChange = _ref$forceRenderOnLoc === void 0 ? true : _ref$forceRenderOnLoc,
      children = _ref.children;
  /**
   * We can't pass `i18n` object directly through context, because even when locale
   * or messages are changed, i18n object is still the same. Context provider compares
   * reference identity and suggested workaround is create a wrapper object every time
   * we need to trigger re-render. See https://reactjs.org/docs/context.html#caveats.
   *
   * Due to this effect we also pass `defaultComponent` in the same context, instead
   * of creating a separate Provider/Consumer pair.
   *
   * We can't use useMemo hook either, because we want to recalculate value manually.
   */

  var makeContext = function makeContext() {
    return {
      i18n: i18n,
      defaultComponent: defaultComponent
    };
  };

  var getRenderKey = function getRenderKey() {
    return forceRenderOnLocaleChange ? i18n.locale || 'default' : 'default';
  };

  var _React$useState = React__default.useState(makeContext()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      context = _React$useState2[0],
      setContext = _React$useState2[1],
      _React$useState3 = React__default.useState(getRenderKey()),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      renderKey = _React$useState4[0],
      setRenderKey = _React$useState4[1];
  /**
   * Subscribe for locale/message changes
   *
   * I18n object from `@lingui/core` is the single source of truth for all i18n related
   * data (active locale, catalogs). When new messages are loaded or locale is changed
   * we need to trigger re-rendering of LinguiContext.Consumers.
   *
   * We call `setContext(makeContext())` after adding the observer in case the `change`
   * event would already have fired between the inital renderKey calculation and the
   * `useEffect` hook being called. This can happen if locales are loaded/activated
   * async.
   */


  React__default.useEffect(function () {
    var unsubscribe = i18n.on("change", function () {
      setContext(makeContext());
      setRenderKey(getRenderKey());
    });

    if (renderKey === 'default') {
      setRenderKey(getRenderKey());
    }

    if (forceRenderOnLocaleChange && renderKey === 'default') {
      console.log("I18nProvider did not render. A call to i18n.activate still needs to happen or forceRenderOnLocaleChange must be set to false.");
    }

    return function () {
      return unsubscribe();
    };
  }, []);
  if (forceRenderOnLocaleChange && renderKey === 'default') return null;
  return /*#__PURE__*/React__default.createElement(LinguiContext.Provider, {
    value: context,
    key: renderKey
  }, children);
};

function _createForOfIteratorHelper$4(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}

function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var tagRe = /<(\d+)>(.*?)<\/\1>|<(\d+)\/>/;
var nlRe = /(?:\r\n|\r|\n)/g; // For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var voidElementTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  menuitem: true
};
/**
 * `formatElements` - parse string and return tree of react elements
 *
 * `value` is string to be formatted with <0>Paired<0/> or <0/> (unpaired)
 * placeholders. `elements` is a array of react elements which indexes
 * correspond to element indexes in formatted string
 */

function formatElements(value) {
  var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var uniqueId = makeCounter(0, '$lingui$');
  var parts = value.replace(nlRe, "").split(tagRe); // no inline elements, return

  if (parts.length === 1) return value;
  var tree = [];
  var before = parts.shift();
  if (before) tree.push(before);

  var _iterator = _createForOfIteratorHelper$4(getElements(parts)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 3),
          index = _step$value[0],
          children = _step$value[1],
          after = _step$value[2];

      var element = elements[index];

      if (!element || voidElementTags[element.type] && children) {
        if (!element) {
          console.error("Can use element at index '".concat(index, "' as it is not declared in the original translation"));
        } else {
          console.error("".concat(element.type, " is a void element tag therefore it must have no children"));
        } // ignore problematic element but push its children and elements after it


        element = /*#__PURE__*/React__default.createElement(React__default.Fragment);
      }

      tree.push( /*#__PURE__*/React__default.cloneElement(element, {
        key: uniqueId()
      }, // format children for pair tags
      // unpaired tags might have children if it's a component passed as a variable
      children ? formatElements(children, elements) : element.props.children));
      if (after) tree.push(after);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return tree;
}
/*
 * `getElements` - return array of element indexes and element childrens
 *
 * `parts` is array of [pairedIndex, children, unpairedIndex, textAfter, ...]
 * where:
 * - `pairedIndex` is index of paired element (undef for unpaired)
 * - `children` are children of paired element (undef for unpaired)
 * - `unpairedIndex` is index of unpaired element (undef for paired)
 * - `textAfter` is string after all elements (empty string, if there's nothing)
 *
 * `parts` length is always multiply of 4
 *
 * Returns: Array<[elementIndex, children, after]>
 */


function getElements(parts) {
  if (!parts.length) return [];

  var _parts$slice = parts.slice(0, 4),
      _parts$slice2 = _slicedToArray(_parts$slice, 4),
      paired = _parts$slice2[0],
      children = _parts$slice2[1],
      unpaired = _parts$slice2[2],
      after = _parts$slice2[3];

  return [[parseInt(paired || unpaired), children || "", after]].concat(getElements(parts.slice(4, parts.length)));
}

var makeCounter = function makeCounter() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return function () {
    return "".concat(prefix, "_").concat(count++);
  };
};

function ownKeys$o(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$o(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$o(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$o(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function Trans$1(props) {
  var _useLingui = useLingui$1(),
      i18n = _useLingui.i18n,
      defaultComponent = _useLingui.defaultComponent;

  var render = props.render,
      component = props.component,
      id = props.id,
      message = props.message,
      formats = props.formats;

  var values = _objectSpread$o({}, props.values);

  var components = _objectSpread$o({}, props.components);

  if (values) {
    /*
      Related discussion: https://github.com/lingui/js-lingui/issues/183
           Values *might* contain React elements with static content.
      They're replaced with <INDEX /> placeholders and added to `components`.
           Example:
      Translation: Hello {name}
      Values: { name: <strong>Jane</strong> }
           It'll become "Hello <0 />" with components=[<strong>Jane</strong>]
      */
    Object.keys(values).forEach(function (key) {
      var value = values[key];
      if (! /*#__PURE__*/React__default.isValidElement(value)) return;
      var index = Object.keys(components).length;
      components[index] = value;
      values[key] = "<".concat(index, "/>");
    });
  }

  var _translation = i18n && typeof i18n._ === "function" ? i18n._(id, values, {
    message: message,
    formats: formats
  }) : id; // i18n provider isn't loaded at all


  var translation = _translation ? formatElements(_translation, components) : null;

  if (render === null || component === null) {
    // Although `string` is a valid react element, types only allow `Element`
    // Upstream issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
    return translation;
  }

  var FallbackComponent = defaultComponent || React__default.Fragment; // Validation of `render` and `component` props

  if (render && component) {
    console.error("You can't use both `component` and `render` prop at the same time. `component` is ignored.");
  } else if (render && typeof render !== "function") {
    console.error("Invalid value supplied to prop `render`. It must be a function, provided ".concat(render));
  } else if (component && typeof component !== "function") {
    // Apparently, both function components and class components are functions
    // See https://stackoverflow.com/a/41658173/1535540
    console.error("Invalid value supplied to prop `component`. It must be a React component, provided ".concat(component));
    return /*#__PURE__*/React__default.createElement(FallbackComponent, null, translation);
  } // Rendering using a render prop


  if (typeof render === "function") {
    // Component: render={(props) => <a title={props.translation}>x</a>}
    return render({
      id: id,
      translation: translation,
      message: message
    });
  } // `component` prop has a higher precedence over `defaultComponent`


  var Component = component || FallbackComponent;
  return /*#__PURE__*/React__default.createElement(Component, null, translation);
}

Trans$1.defaultProps = {
  values: {},
  components: {}
};

var r = /*#__PURE__*/React__default.createContext(null);

function o() {
  var e = React__default.useContext(r);
  return e;
}

function a(e) {
  return function (e) {
    return function (t) {
      var r = o(),
          a = r.i18n;
      return /*#__PURE__*/React__default.createElement(e, Object.assign({}, t, {
        i18n: a
      }));
    };
  };
}

var i$1 = function i(t) {
  var o = t.i18n,
      a = t.defaultComponent,
      i = t.forceRenderOnLocaleChange,
      c = void 0 === i || i,
      u = t.children,
      l = function l() {
    return {
      i18n: o,
      defaultComponent: a
    };
  },
      f = function f() {
    return c && o.locale || "default";
  },
      s = React__default.useState(l()),
      p = _slicedToArray(s, 2),
      m = p[0],
      d = p[1],
      v = React__default.useState(f()),
      y = _slicedToArray(v, 2),
      h = y[0],
      b = y[1];

  return React__default.useEffect(function () {
    var e = o.on("change", function () {
      d(l()), b(f());
    });
    return "default" === h && b(f()), c && "default" === h && console.log("I18nProvider did not render. A call to i18n.activate still needs to happen or forceRenderOnLocaleChange must be set to false."), function () {
      return e();
    };
  }, []), c && "default" === h ? null : /*#__PURE__*/React__default.createElement(r.Provider, {
    value: m,
    key: h
  }, u);
};

function c$1(e, n) {
  var t;

  if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
    if (Array.isArray(e) || (t = function (e, n) {
      if (!e) return;
      if ("string" == typeof e) return u$1(e, n);
      var t = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === t && e.constructor && (t = e.constructor.name);
      if ("Map" === t || "Set" === t) return Array.from(e);
      if ("Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return u$1(e, n);
    }(e)) || n && e && "number" == typeof e.length) {
      t && (e = t);

      var r = 0,
          o = function o() {};

      return {
        s: o,
        n: function n() {
          return r >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[r++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: o
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var a,
      i = !0,
      c = !1;
  return {
    s: function s() {
      t = e[Symbol.iterator]();
    },
    n: function n() {
      var e = t.next();
      return i = e.done, e;
    },
    e: function e(_e2) {
      c = !0, a = _e2;
    },
    f: function f() {
      try {
        i || null == t.return || t.return();
      } finally {
        if (c) throw a;
      }
    }
  };
}

function u$1(e, n) {
  (null == n || n > e.length) && (n = e.length);

  for (var t = 0, r = new Array(n); t < n; t++) {
    r[t] = e[t];
  }

  return r;
}

var l = /<(\d+)>(.*?)<\/\1>|<(\d+)\/>/,
    f$1 = /(?:\r\n|\r|\n)/g,
    s$1 = {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0,
  menuitem: !0
};

function p$1(n) {
  if (!n.length) return [];
  var t = n.slice(0, 4),
      r = _slicedToArray(t, 4),
      o = r[0],
      a = r[1],
      i = r[2],
      c = r[3];
  return [[parseInt(o || i), a || "", c]].concat(p$1(n.slice(4, n.length)));
}

var m$1 = function m() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
  return function () {
    return "".concat(n, "_").concat(e++);
  };
};

function d$1(e, n) {
  var t = Object.keys(e);

  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    n && (r = r.filter(function (n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), t.push.apply(t, r);
  }

  return t;
}

function v$1(e) {
  for (var n = 1; n < arguments.length; n++) {
    var r = null != arguments[n] ? arguments[n] : {};
    n % 2 ? d$1(Object(r), !0).forEach(function (n) {
      _defineProperty(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : d$1(Object(r)).forEach(function (n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }

  return e;
}

function y$1(t) {
  var r = o(),
      a = r.i18n,
      i = r.defaultComponent,
      u = t.render,
      d = t.component,
      y = t.id,
      h = t.message,
      b = t.formats,
      g = v$1({}, t.values),
      O = v$1({}, t.components);
  g && Object.keys(g).forEach(function (e) {
    var t = g[e];

    if ( /*#__PURE__*/React__default.isValidElement(t)) {
      var r = Object.keys(O).length;
      O[r] = t, g[e] = "<".concat(r, "/>");
    }
  });
  var j = a && "function" == typeof a._ ? a._(y, g, {
    message: h,
    formats: b
  }) : y,
      w = j ? function t(r) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        a = m$1(0, "$lingui$"),
        i = r.replace(f$1, "").split(l);
    if (1 === i.length) return r;
    var u = [],
        d = i.shift();
    d && u.push(d);
    var v,
        y = c$1(p$1(i));

    try {
      for (y.s(); !(v = y.n()).done;) {
        var h = _slicedToArray(v.value, 3),
            b = h[0],
            g = h[1],
            O = h[2],
            j = o[b];
        (!j || s$1[j.type] && g) && (j ? console.error("".concat(j.type, " is a void element tag therefore it must have no children")) : console.error("Can use element at index '".concat(b, "' as it is not declared in the original translation")), j = /*#__PURE__*/React__default.createElement(React__default.Fragment)), u.push( /*#__PURE__*/React__default.cloneElement(j, {
          key: a()
        }, g ? t(g, o) : j.props.children)), O && u.push(O);
      }
    } catch (e) {
      y.e(e);
    } finally {
      y.f();
    }

    return u;
  }(j, O) : null;
  if (null === u || null === d) return w;
  var E = i || React__default.Fragment;
  if (u && d) console.error("You can't use both `component` and `render` prop at the same time. `component` is ignored.");else if (u && "function" != typeof u) console.error("Invalid value supplied to prop `render`. It must be a function, provided ".concat(u));else if (d && "function" != typeof d) return console.error("Invalid value supplied to prop `component`. It must be a React component, provided ".concat(d)), /*#__PURE__*/React__default.createElement(E, null, w);
  if ("function" == typeof u) return u({
    id: y,
    translation: w,
    message: h
  });
  var P = d || E;
  return /*#__PURE__*/React__default.createElement(P, null, w);
}

y$1.defaultProps = {
  values: {},
  components: {}
};

var I18nProvider = process.env.NODE_ENV === "production" ? i$1 : I18nProvider$1;
var Trans = process.env.NODE_ENV === "production" ? y$1 : Trans$1;
var useLingui = process.env.NODE_ENV === "production" ? o : useLingui$1;
process.env.NODE_ENV === "production" ? a : withI18n;

var ERC20ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address"
			},
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			},
			{
				name: "_spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	}
];

var EMPTY_CONNECTOR = initializeConnector(function () {
  return EMPTY;
});
var urlAtom = atomWithDefault(function () {
  return EMPTY_CONNECTOR;
});
var injectedAtom = atomWithDefault(function () {
  return EMPTY_CONNECTOR;
});

function useActiveWeb3ReactState() {
  var injected = useAtomValue(injectedAtom);
  var url = useAtomValue(urlAtom);
  return injected[1].useIsActive() ? injected : url;
}
function useActiveWeb3ReactHooks() {
  var _useActiveWeb3ReactSt = useActiveWeb3ReactState(),
      _useActiveWeb3ReactSt2 = _slicedToArray(_useActiveWeb3ReactSt, 2),
      hooks = _useActiveWeb3ReactSt2[1];

  return hooks;
}
function useActiveWeb3React$1() {
  var _useActiveWeb3ReactHo = useActiveWeb3ReactHooks(),
      useProvider = _useActiveWeb3ReactHo.useProvider,
      useWeb3React = _useActiveWeb3ReactHo.useWeb3React;

  return useWeb3React(useProvider());
}

var ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

var DEFAULT_DEADLINE_FROM_NOW = 60 * 30;
var L2_DEADLINE_FROM_NOW = 60 * 5; // transaction popup dismisal amounts

JSBI.BigInt(60 * 60 * 24 * 7);
JSBI.BigInt(0); // one basis JSBI.BigInt

var BIPS_BASE = JSBI.BigInt(10000);
new Percent$1(JSBI.BigInt(1), BIPS_BASE); // used for warning states

new Percent$1(JSBI.BigInt(100), BIPS_BASE); // 1%

var ALLOWED_PRICE_IMPACT_MEDIUM = new Percent$1(JSBI.BigInt(300), BIPS_BASE); // 3%

var ALLOWED_PRICE_IMPACT_HIGH = new Percent$1(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute

new Percent$1(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this

new Percent$1(JSBI.BigInt(1500), BIPS_BASE); // 15%

var BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent$1(JSBI.BigInt(50), BIPS_BASE);
var ZERO_PERCENT = new Percent$1('0');
new Percent$1(JSBI.BigInt(200), BIPS_BASE);
var ONE_HUNDRED_PERCENT = new Percent$1('1');

/* eslint-disable react-hooks/rules-of-hooks */
function useActiveWeb3React() {
  {
    return useActiveWeb3React$1();
  }
}

/**
 * Debounces updates to a value.
 * Non-primitives *must* wrap the value in useMemo, or the value will be updated due to referential inequality.
 */
// modified from https://usehooks.com/useDebounce/

function useDebounce(value, delay) {
  var _useState = useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      debouncedValue = _useState2[0],
      setDebouncedValue = _useState2[1];

  useEffect(function () {
    // Update debounced value after delay
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay); // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.

    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function isVisibilityStateSupported() {
  return 'visibilityState' in document;
}

function isWindowVisible() {
  return !isVisibilityStateSupported() || document.visibilityState !== 'hidden';
}
/**
 * Returns whether the window is currently visible to the user.
 */


function useIsWindowVisible() {
  var _useState = useState(isWindowVisible()),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var listener = useCallback(function () {
    setFocused(isWindowVisible());
  }, [setFocused]);
  useEffect(function () {
    if (!isVisibilityStateSupported()) return undefined;
    document.addEventListener('visibilitychange', listener);
    return function () {
      document.removeEventListener('visibilitychange', listener);
    };
  }, [listener]);
  return focused;
}

function useBlock() {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId,
      library = _useActiveWeb3React.library;

  var windowVisible = useIsWindowVisible();

  var _useState = useState({
    chainId: chainId
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var onBlock = useCallback(function (block) {
    setState(function (state) {
      if (state.chainId === chainId) {
        if (typeof state.block !== 'number') return {
          chainId: chainId,
          block: block
        };
        return {
          chainId: chainId,
          block: Math.max(block, state.block)
        };
      }

      return state;
    });
  }, [chainId]);
  useEffect(function () {
    if (library && chainId && windowVisible) {
      // If chainId hasn't changed, don't clear the block. This prevents re-fetching still valid data.
      setState(function (state) {
        return state.chainId === chainId ? state : {
          chainId: chainId
        };
      });
      library.getBlockNumber().then(onBlock).catch(function (error) {
        console.error("Failed to get block number for chainId ".concat(chainId), error);
      });
      library.on('block', onBlock);
      return function () {
        library.removeListener('block', onBlock);
      };
    }

    return undefined;
  }, [chainId, library, onBlock, windowVisible]);
  var debouncedBlock = useDebounce(state.block, 100);
  return state.block ? debouncedBlock : undefined;
}

var blockAtom = atom(undefined);
function BlockUpdater() {
  var setBlock = useUpdateAtom(blockAtom);
  var block = useBlock();
  useEffect(function () {
    setBlock(block);
  }, [block, setBlock]);
  return null;
}
/** Requires that BlockUpdater be installed in the DOM tree. */

function useBlockNumber() {
  var _useActiveWeb3React2 = useActiveWeb3React(),
      chainId = _useActiveWeb3React2.chainId;

  var block = useAtomValue(blockAtom);
  return chainId ? block : undefined;
}
function useFastForwardBlockNumber() {
  return useUpdateAtom(blockAtom);
}

var abi$4 = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var evm$1 = {
	bytecode: {
		linkReferences: {
		},
		object: "",
		opcodes: "",
		sourceMap: ""
	},
	deployedBytecode: {
		linkReferences: {
		},
		object: "",
		opcodes: "",
		sourceMap: ""
	}
};
var bytecode$4 = "";
var IUniswapV2PairJson = {
	abi: abi$4,
	evm: evm$1,
	"interface": [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
],
	bytecode: bytecode$4
};

var abi$3 = [
	{
		inputs: [
		],
		name: "WETH",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountIn",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountOut",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsIn",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsOut",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		name: "quote",
		outputs: [
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETHSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapETHForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var evm = {
	bytecode: {
		linkReferences: {
		},
		object: "",
		opcodes: "",
		sourceMap: ""
	},
	deployedBytecode: {
		immutableReferences: {
		},
		linkReferences: {
		},
		object: "",
		opcodes: "",
		sourceMap: ""
	}
};
var bytecode$3 = "";
var IUniswapV2Router02Json = {
	abi: abi$3,
	evm: evm,
	"interface": [
	{
		inputs: [
		],
		name: "WETH",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountIn",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountOut",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsIn",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsOut",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		name: "quote",
		outputs: [
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETHSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapETHForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
],
	bytecode: bytecode$3
};

var _format$2 = "hh-sol-artifact-1";
var contractName$2 = "Quoter";
var sourceName$2 = "contracts/lens/Quoter.sol";
var abi$2 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WETH9",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "WETH9",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "quoteExactInput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceLimitX96",
				type: "uint160"
			}
		],
		name: "quoteExactInputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		name: "quoteExactOutput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceLimitX96",
				type: "uint160"
			}
		],
		name: "quoteExactOutputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "amount0Delta",
				type: "int256"
			},
			{
				internalType: "int256",
				name: "amount1Delta",
				type: "int256"
			},
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			}
		],
		name: "uniswapV3SwapCallback",
		outputs: [
		],
		stateMutability: "view",
		type: "function"
	}
];
var bytecode$2 = "0x60c060405234801561001057600080fd5b506040516112e53803806112e583398101604081905261002f91610069565b6001600160601b0319606092831b8116608052911b1660a05261009b565b80516001600160a01b038116811461006457600080fd5b919050565b6000806040838503121561007b578182fd5b6100848361004d565b91506100926020840161004d565b90509250929050565b60805160601c60a05160601c6112176100ce60003980610342525080610366528061058652806106d552506112176000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063c45a01551161005b578063c45a0155146100d3578063cdca1753146100db578063f7729d43146100ee578063fa461e33146101015761007d565b80632f80bb1d1461008257806330d07f21146100ab5780634aa4a4fc146100be575b600080fd5b610095610090366004610e9e565b610116565b6040516100a29190611148565b60405180910390f35b6100956100b9366004610e30565b61017b565b6100c6610340565b6040516100a29190611084565b6100c6610364565b6100956100e9366004610e9e565b610388565b6100956100fc366004610e30565b6103d6565b61011461010f366004610f04565b610555565b005b60005b600061012484610660565b9050600080600061013487610668565b92509250925061014882848389600061017b565b955083156101605761015987610699565b965061016c565b85945050505050610175565b50505050610119565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff808616878216109083166101a65760008490555b6101b18787876106ce565b73ffffffffffffffffffffffffffffffffffffffff1663128acb0830836101d78861070c565b60000373ffffffffffffffffffffffffffffffffffffffff8816156101fc5787610222565b8561021b5773fffd8963efd1fc6a506488495d951d5263988d25610222565b6401000276a45b8b8b8e6040516020016102379392919061101e565b6040516020818303038152906040526040518663ffffffff1660e01b81526004016102669594939291906110a5565b6040805180830381600087803b15801561027f57600080fd5b505af19250505080156102cd575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526102ca91810190610ee1565b60015b610333573d8080156102fb576040519150601f19603f3d011682016040523d82523d6000602084013e610300565b606091505b5073ffffffffffffffffffffffffffffffffffffffff841661032157600080555b61032a8161073e565b92505050610337565b5050505b95945050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60005b600061039684610660565b905060008060006103a687610668565b9250925092506103ba8383838960006103d6565b95508315610160576103cb87610699565b96505050505061038b565b600073ffffffffffffffffffffffffffffffffffffffff808616908716106103ff8787876106ce565b73ffffffffffffffffffffffffffffffffffffffff1663128acb0830836104258861070c565b73ffffffffffffffffffffffffffffffffffffffff881615610447578761046d565b856104665773fffd8963efd1fc6a506488495d951d5263988d2561046d565b6401000276a45b8c8b8d6040516020016104829392919061101e565b6040516020818303038152906040526040518663ffffffff1660e01b81526004016104b19594939291906110a5565b6040805180830381600087803b1580156104ca57600080fd5b505af1925050508015610518575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261051591810190610ee1565b60015b610333573d808015610546576040519150601f19603f3d011682016040523d82523d6000602084013e61054b565b606091505b5061032a8161073e565b60008313806105645750600082135b61056d57600080fd5b600080600061057b84610668565b9250925092506105ad7f00000000000000000000000000000000000000000000000000000000000000008484846107ef565b5060008060008089136105f3578573ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1610888a600003610628565b8473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161089896000035b925092509250821561063f57604051818152602081fd5b6000541561065557600054811461065557600080fd5b604051828152602081fd5b516042111590565b600080806106768482610805565b9250610683846014610905565b9050610690846017610805565b91509193909250565b80516060906101759083906017907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe9016109f5565b60006107047f00000000000000000000000000000000000000000000000000000000000000006106ff868686610bdc565b610c59565b949350505050565b60007f8000000000000000000000000000000000000000000000000000000000000000821061073a57600080fd5b5090565b600081516020146107db5760448251101561078e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078590611111565b60405180910390fd5b600482019150818060200190518101906107a89190610f52565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078591906110f7565b818060200190518101906101759190610fbc565b600061033785610800868686610bdc565b610d8f565b60008182601401101561087957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f746f416464726573735f6f766572666c6f770000000000000000000000000000604482015290519081900360640190fd5b81601401835110156108ec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f746f416464726573735f6f75744f66426f756e64730000000000000000000000604482015290519081900360640190fd5b5001602001516c01000000000000000000000000900490565b60008182600301101561097957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f746f55696e7432345f6f766572666c6f77000000000000000000000000000000604482015290519081900360640190fd5b81600301835110156109ec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f746f55696e7432345f6f75744f66426f756e6473000000000000000000000000604482015290519081900360640190fd5b50016003015190565b60608182601f011015610a6957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b828284011015610ada57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b81830184511015610b4c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f736c6963655f6f75744f66426f756e6473000000000000000000000000000000604482015290519081900360640190fd5b606082158015610b6b5760405191506000825260208201604052610bd3565b6040519150601f8416801560200281840101858101878315602002848b0101015b81831015610ba4578051835260209283019201610b8c565b5050858452601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016604052505b50949350505050565b610be4610dbf565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161115610c1c579192915b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff948516815292909316602083015262ffffff169181019190915290565b6000816020015173ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff1610610c9b57600080fd5b508051602080830151604093840151845173ffffffffffffffffffffffffffffffffffffffff94851681850152939091168385015262ffffff166060808401919091528351808403820181526080840185528051908301207fff0000000000000000000000000000000000000000000000000000000000000060a085015294901b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660a183015260b58201939093527fe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b5460d5808301919091528251808303909101815260f5909101909152805191012090565b6000610d9b8383610c59565b90503373ffffffffffffffffffffffffffffffffffffffff82161461017557600080fd5b604080516060810182526000808252602082018190529181019190915290565b600082601f830112610def578081fd5b8135610e02610dfd82611175565b611151565b818152846020838601011115610e16578283fd5b816020850160208301379081016020019190915292915050565b600080600080600060a08688031215610e47578081fd5b8535610e52816111e5565b94506020860135610e62816111e5565b9350604086013562ffffff81168114610e79578182fd5b9250606086013591506080860135610e90816111e5565b809150509295509295909350565b60008060408385031215610eb0578182fd5b823567ffffffffffffffff811115610ec6578283fd5b610ed285828601610ddf565b95602094909401359450505050565b60008060408385031215610ef3578182fd5b505080516020909101519092909150565b600080600060608486031215610f18578283fd5b8335925060208401359150604084013567ffffffffffffffff811115610f3c578182fd5b610f4886828701610ddf565b9150509250925092565b600060208284031215610f63578081fd5b815167ffffffffffffffff811115610f79578182fd5b8201601f81018413610f89578182fd5b8051610f97610dfd82611175565b818152856020838501011115610fab578384fd5b6103378260208301602086016111b5565b600060208284031215610fcd578081fd5b5051919050565b60008151808452610fec8160208601602086016111b5565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b606093841b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000908116825260e89390931b7fffffff0000000000000000000000000000000000000000000000000000000000166014820152921b166017820152602b0190565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b600073ffffffffffffffffffffffffffffffffffffffff8088168352861515602084015285604084015280851660608401525060a060808301526110ec60a0830184610fd4565b979650505050505050565b60006020825261110a6020830184610fd4565b9392505050565b60208082526010908201527f556e6578706563746564206572726f7200000000000000000000000000000000604082015260600190565b90815260200190565b60405181810167ffffffffffffffff8111828210171561116d57fe5b604052919050565b600067ffffffffffffffff82111561118957fe5b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60005b838110156111d05781810151838201526020016111b8565b838111156111df576000848401525b50505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461120757600080fd5b5056fea164736f6c6343000706000a";
var deployedBytecode$2 = "0x608060405234801561001057600080fd5b506004361061007d5760003560e01c8063c45a01551161005b578063c45a0155146100d3578063cdca1753146100db578063f7729d43146100ee578063fa461e33146101015761007d565b80632f80bb1d1461008257806330d07f21146100ab5780634aa4a4fc146100be575b600080fd5b610095610090366004610e9e565b610116565b6040516100a29190611148565b60405180910390f35b6100956100b9366004610e30565b61017b565b6100c6610340565b6040516100a29190611084565b6100c6610364565b6100956100e9366004610e9e565b610388565b6100956100fc366004610e30565b6103d6565b61011461010f366004610f04565b610555565b005b60005b600061012484610660565b9050600080600061013487610668565b92509250925061014882848389600061017b565b955083156101605761015987610699565b965061016c565b85945050505050610175565b50505050610119565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff808616878216109083166101a65760008490555b6101b18787876106ce565b73ffffffffffffffffffffffffffffffffffffffff1663128acb0830836101d78861070c565b60000373ffffffffffffffffffffffffffffffffffffffff8816156101fc5787610222565b8561021b5773fffd8963efd1fc6a506488495d951d5263988d25610222565b6401000276a45b8b8b8e6040516020016102379392919061101e565b6040516020818303038152906040526040518663ffffffff1660e01b81526004016102669594939291906110a5565b6040805180830381600087803b15801561027f57600080fd5b505af19250505080156102cd575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526102ca91810190610ee1565b60015b610333573d8080156102fb576040519150601f19603f3d011682016040523d82523d6000602084013e610300565b606091505b5073ffffffffffffffffffffffffffffffffffffffff841661032157600080555b61032a8161073e565b92505050610337565b5050505b95945050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60005b600061039684610660565b905060008060006103a687610668565b9250925092506103ba8383838960006103d6565b95508315610160576103cb87610699565b96505050505061038b565b600073ffffffffffffffffffffffffffffffffffffffff808616908716106103ff8787876106ce565b73ffffffffffffffffffffffffffffffffffffffff1663128acb0830836104258861070c565b73ffffffffffffffffffffffffffffffffffffffff881615610447578761046d565b856104665773fffd8963efd1fc6a506488495d951d5263988d2561046d565b6401000276a45b8c8b8d6040516020016104829392919061101e565b6040516020818303038152906040526040518663ffffffff1660e01b81526004016104b19594939291906110a5565b6040805180830381600087803b1580156104ca57600080fd5b505af1925050508015610518575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820190925261051591810190610ee1565b60015b610333573d808015610546576040519150601f19603f3d011682016040523d82523d6000602084013e61054b565b606091505b5061032a8161073e565b60008313806105645750600082135b61056d57600080fd5b600080600061057b84610668565b9250925092506105ad7f00000000000000000000000000000000000000000000000000000000000000008484846107ef565b5060008060008089136105f3578573ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1610888a600003610628565b8473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161089896000035b925092509250821561063f57604051818152602081fd5b6000541561065557600054811461065557600080fd5b604051828152602081fd5b516042111590565b600080806106768482610805565b9250610683846014610905565b9050610690846017610805565b91509193909250565b80516060906101759083906017907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe9016109f5565b60006107047f00000000000000000000000000000000000000000000000000000000000000006106ff868686610bdc565b610c59565b949350505050565b60007f8000000000000000000000000000000000000000000000000000000000000000821061073a57600080fd5b5090565b600081516020146107db5760448251101561078e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078590611111565b60405180910390fd5b600482019150818060200190518101906107a89190610f52565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078591906110f7565b818060200190518101906101759190610fbc565b600061033785610800868686610bdc565b610d8f565b60008182601401101561087957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f746f416464726573735f6f766572666c6f770000000000000000000000000000604482015290519081900360640190fd5b81601401835110156108ec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f746f416464726573735f6f75744f66426f756e64730000000000000000000000604482015290519081900360640190fd5b5001602001516c01000000000000000000000000900490565b60008182600301101561097957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f746f55696e7432345f6f766572666c6f77000000000000000000000000000000604482015290519081900360640190fd5b81600301835110156109ec57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f746f55696e7432345f6f75744f66426f756e6473000000000000000000000000604482015290519081900360640190fd5b50016003015190565b60608182601f011015610a6957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b828284011015610ada57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f736c6963655f6f766572666c6f77000000000000000000000000000000000000604482015290519081900360640190fd5b81830184511015610b4c57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f736c6963655f6f75744f66426f756e6473000000000000000000000000000000604482015290519081900360640190fd5b606082158015610b6b5760405191506000825260208201604052610bd3565b6040519150601f8416801560200281840101858101878315602002848b0101015b81831015610ba4578051835260209283019201610b8c565b5050858452601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016604052505b50949350505050565b610be4610dbf565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161115610c1c579192915b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff948516815292909316602083015262ffffff169181019190915290565b6000816020015173ffffffffffffffffffffffffffffffffffffffff16826000015173ffffffffffffffffffffffffffffffffffffffff1610610c9b57600080fd5b508051602080830151604093840151845173ffffffffffffffffffffffffffffffffffffffff94851681850152939091168385015262ffffff166060808401919091528351808403820181526080840185528051908301207fff0000000000000000000000000000000000000000000000000000000000000060a085015294901b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660a183015260b58201939093527fe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b5460d5808301919091528251808303909101815260f5909101909152805191012090565b6000610d9b8383610c59565b90503373ffffffffffffffffffffffffffffffffffffffff82161461017557600080fd5b604080516060810182526000808252602082018190529181019190915290565b600082601f830112610def578081fd5b8135610e02610dfd82611175565b611151565b818152846020838601011115610e16578283fd5b816020850160208301379081016020019190915292915050565b600080600080600060a08688031215610e47578081fd5b8535610e52816111e5565b94506020860135610e62816111e5565b9350604086013562ffffff81168114610e79578182fd5b9250606086013591506080860135610e90816111e5565b809150509295509295909350565b60008060408385031215610eb0578182fd5b823567ffffffffffffffff811115610ec6578283fd5b610ed285828601610ddf565b95602094909401359450505050565b60008060408385031215610ef3578182fd5b505080516020909101519092909150565b600080600060608486031215610f18578283fd5b8335925060208401359150604084013567ffffffffffffffff811115610f3c578182fd5b610f4886828701610ddf565b9150509250925092565b600060208284031215610f63578081fd5b815167ffffffffffffffff811115610f79578182fd5b8201601f81018413610f89578182fd5b8051610f97610dfd82611175565b818152856020838501011115610fab578384fd5b6103378260208301602086016111b5565b600060208284031215610fcd578081fd5b5051919050565b60008151808452610fec8160208601602086016111b5565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b606093841b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000908116825260e89390931b7fffffff0000000000000000000000000000000000000000000000000000000000166014820152921b166017820152602b0190565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b600073ffffffffffffffffffffffffffffffffffffffff8088168352861515602084015285604084015280851660608401525060a060808301526110ec60a0830184610fd4565b979650505050505050565b60006020825261110a6020830184610fd4565b9392505050565b60208082526010908201527f556e6578706563746564206572726f7200000000000000000000000000000000604082015260600190565b90815260200190565b60405181810167ffffffffffffffff8111828210171561116d57fe5b604052919050565b600067ffffffffffffffff82111561118957fe5b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60005b838110156111d05781810151838201526020016111b8565b838111156111df576000848401525b50505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461120757600080fd5b5056fea164736f6c6343000706000a";
var linkReferences$2 = {
};
var deployedLinkReferences$2 = {
};
var QuoterJson = {
	_format: _format$2,
	contractName: contractName$2,
	sourceName: sourceName$2,
	abi: abi$2,
	bytecode: bytecode$2,
	deployedBytecode: deployedBytecode$2,
	linkReferences: linkReferences$2,
	deployedLinkReferences: deployedLinkReferences$2
};

var _format$1 = "hh-sol-artifact-1";
var contractName$1 = "UniswapInterfaceMulticall";
var sourceName$1 = "contracts/lens/UniswapInterfaceMulticall.sol";
var abi$1 = [
	{
		inputs: [
		],
		name: "getCurrentBlockTimestamp",
		outputs: [
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "getEthBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "gasLimit",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct UniswapInterfaceMulticall.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "uint256",
						name: "gasUsed",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct UniswapInterfaceMulticall.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];
var bytecode$1 = "0x608060405234801561001057600080fd5b50610567806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80630f28c97d146100465780631749e1e3146100645780634d2301cc14610085575b600080fd5b61004e610098565b60405161005b919061041f565b60405180910390f35b6100776100723660046102a7565b61009c565b60405161005b929190610428565b61004e610093366004610286565b610220565b4290565b8051439060609067ffffffffffffffff811180156100b957600080fd5b506040519080825280602002602001820160405280156100f357816020015b6100e061023a565b8152602001906001900390816100d85790505b50905060005b835181101561021a57600080600086848151811061011357fe5b60200260200101516000015187858151811061012b57fe5b60200260200101516020015188868151811061014357fe5b60200260200101516040015192509250925060005a90506000808573ffffffffffffffffffffffffffffffffffffffff1685856040516101839190610403565b60006040518083038160008787f1925050503d80600081146101c1576040519150601f19603f3d011682016040523d82523d6000602084013e6101c6565b606091505b509150915060005a8403905060405180606001604052808415158152602001828152602001838152508989815181106101fb57fe5b60200260200101819052505050505050505080806001019150506100f9565b50915091565b73ffffffffffffffffffffffffffffffffffffffff163190565b604051806060016040528060001515815260200160008152602001606081525090565b803573ffffffffffffffffffffffffffffffffffffffff8116811461028157600080fd5b919050565b600060208284031215610297578081fd5b6102a08261025d565b9392505050565b600060208083850312156102b9578182fd5b823567ffffffffffffffff808211156102d0578384fd5b818501915085601f8301126102e3578384fd5b8135818111156102ef57fe5b6102fc8485830201610506565b81815284810190848601875b848110156103f457813587017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0606081838f03011215610346578a8bfd5b60408051606081018181108b8211171561035c57fe5b8252610369848d0161025d565b8152818401358c82015260608401358a811115610384578d8efd5b8085019450508e603f850112610398578c8dfd5b8b8401358a8111156103a657fe5b6103b68d85601f84011601610506565b93508084528f838287010111156103cb578d8efd5b808386018e86013783018c018d9052908101919091528552509287019290870190600101610308565b50909998505050505050505050565b6000825161041581846020870161052a565b9190910192915050565b90815260200190565b600060408083018584526020828186015281865180845260609350838701915083838202880101838901875b838110156104f6578983037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa001855281518051151584528681015187850152880151888401889052805188850181905260806104b582828801858c0161052a565b96880196601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01694909401909301925090850190600101610454565b50909a9950505050505050505050565b60405181810167ffffffffffffffff8111828210171561052257fe5b604052919050565b60005b8381101561054557818101518382015260200161052d565b83811115610554576000848401525b5050505056fea164736f6c6343000706000a";
var deployedBytecode$1 = "0x608060405234801561001057600080fd5b50600436106100415760003560e01c80630f28c97d146100465780631749e1e3146100645780634d2301cc14610085575b600080fd5b61004e610098565b60405161005b919061041f565b60405180910390f35b6100776100723660046102a7565b61009c565b60405161005b929190610428565b61004e610093366004610286565b610220565b4290565b8051439060609067ffffffffffffffff811180156100b957600080fd5b506040519080825280602002602001820160405280156100f357816020015b6100e061023a565b8152602001906001900390816100d85790505b50905060005b835181101561021a57600080600086848151811061011357fe5b60200260200101516000015187858151811061012b57fe5b60200260200101516020015188868151811061014357fe5b60200260200101516040015192509250925060005a90506000808573ffffffffffffffffffffffffffffffffffffffff1685856040516101839190610403565b60006040518083038160008787f1925050503d80600081146101c1576040519150601f19603f3d011682016040523d82523d6000602084013e6101c6565b606091505b509150915060005a8403905060405180606001604052808415158152602001828152602001838152508989815181106101fb57fe5b60200260200101819052505050505050505080806001019150506100f9565b50915091565b73ffffffffffffffffffffffffffffffffffffffff163190565b604051806060016040528060001515815260200160008152602001606081525090565b803573ffffffffffffffffffffffffffffffffffffffff8116811461028157600080fd5b919050565b600060208284031215610297578081fd5b6102a08261025d565b9392505050565b600060208083850312156102b9578182fd5b823567ffffffffffffffff808211156102d0578384fd5b818501915085601f8301126102e3578384fd5b8135818111156102ef57fe5b6102fc8485830201610506565b81815284810190848601875b848110156103f457813587017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0606081838f03011215610346578a8bfd5b60408051606081018181108b8211171561035c57fe5b8252610369848d0161025d565b8152818401358c82015260608401358a811115610384578d8efd5b8085019450508e603f850112610398578c8dfd5b8b8401358a8111156103a657fe5b6103b68d85601f84011601610506565b93508084528f838287010111156103cb578d8efd5b808386018e86013783018c018d9052908101919091528552509287019290870190600101610308565b50909998505050505050505050565b6000825161041581846020870161052a565b9190910192915050565b90815260200190565b600060408083018584526020828186015281865180845260609350838701915083838202880101838901875b838110156104f6578983037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa001855281518051151584528681015187850152880151888401889052805188850181905260806104b582828801858c0161052a565b96880196601f919091017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01694909401909301925090850190600101610454565b50909a9950505050505050505050565b60405181810167ffffffffffffffff8111828210171561052257fe5b604052919050565b60005b8381101561054557818101518382015260200161052d565b83811115610554576000848401525b5050505056fea164736f6c6343000706000a";
var linkReferences$1 = {
};
var deployedLinkReferences$1 = {
};
var UniswapInterfaceMulticallJson = {
	_format: _format$1,
	contractName: contractName$1,
	sourceName: sourceName$1,
	abi: abi$1,
	bytecode: bytecode$1,
	deployedBytecode: deployedBytecode$1,
	linkReferences: linkReferences$1,
	deployedLinkReferences: deployedLinkReferences$1
};

var ARGENT_WALLET_DETECTOR_ABI = [
	{
		inputs: [
			{
				internalType: "bytes32[]",
				name: "_codes",
				type: "bytes32[]"
			},
			{
				internalType: "address[]",
				name: "_implementations",
				type: "address[]"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "code",
				type: "bytes32"
			}
		],
		name: "CodeAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "implementation",
				type: "address"
			}
		],
		name: "ImplementationAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_newOwner",
				type: "address"
			}
		],
		name: "OwnerChanged",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "acceptedCodes",
		outputs: [
			{
				internalType: "bool",
				name: "exists",
				type: "bool"
			},
			{
				internalType: "uint128",
				name: "index",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "acceptedImplementations",
		outputs: [
			{
				internalType: "bool",
				name: "exists",
				type: "bool"
			},
			{
				internalType: "uint128",
				name: "index",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_code",
				type: "bytes32"
			}
		],
		name: "addCode",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_argentWallet",
				type: "address"
			}
		],
		name: "addCodeAndImplementationFromWallet",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_impl",
				type: "address"
			}
		],
		name: "addImplementation",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newOwner",
				type: "address"
			}
		],
		name: "changeOwner",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCodes",
		outputs: [
			{
				internalType: "bytes32[]",
				name: "",
				type: "bytes32[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getImplementations",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_wallet",
				type: "address"
			}
		],
		name: "isArgentWallet",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var EIP_2612 = [
	{
		constant: true,
		inputs: [
			{
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ENS_PUBLIC_RESOLVER_ABI = [
	{
		inputs: [
			{
				internalType: "contract ENS",
				name: "_ens",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "contentType",
				type: "uint256"
			}
		],
		name: "ABIChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "a",
				type: "address"
			}
		],
		name: "AddrChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "coinType",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "newAddress",
				type: "bytes"
			}
		],
		name: "AddressChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "target",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isAuthorised",
				type: "bool"
			}
		],
		name: "AuthorisationChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "hash",
				type: "bytes"
			}
		],
		name: "ContenthashChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "name",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "record",
				type: "bytes"
			}
		],
		name: "DNSRecordChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "name",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			}
		],
		name: "DNSRecordDeleted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "DNSZoneCleared",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "address",
				name: "implementer",
				type: "address"
			}
		],
		name: "InterfaceChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "NameChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		name: "PubkeyChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "string",
				name: "indexedKey",
				type: "string"
			},
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "TextChanged",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "contentTypes",
				type: "uint256"
			}
		],
		name: "ABI",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "addr",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "authorisations",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "clearDNSZone",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "contenthash",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32"
			},
			{
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			}
		],
		name: "dnsRecord",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32"
			}
		],
		name: "hasDNSRecords",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			}
		],
		name: "interfaceImplementer",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "pubkey",
		outputs: [
			{
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "contentType",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "setABI",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "coinType",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "a",
				type: "bytes"
			}
		],
		name: "setAddr",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "a",
				type: "address"
			}
		],
		name: "setAddr",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "target",
				type: "address"
			},
			{
				internalType: "bool",
				name: "isAuthorised",
				type: "bool"
			}
		],
		name: "setAuthorisation",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "hash",
				type: "bytes"
			}
		],
		name: "setContenthash",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "setDNSRecords",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			},
			{
				internalType: "address",
				name: "implementer",
				type: "address"
			}
		],
		name: "setInterface",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "setName",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		name: "setPubkey",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				internalType: "string",
				name: "value",
				type: "string"
			}
		],
		name: "setText",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "text",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ENS_ABI = [
	{
		inputs: [
			{
				internalType: "contract ENS",
				name: "_old",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "NewOwner",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "resolver",
				type: "address"
			}
		],
		name: "NewResolver",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "NewTTL",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "old",
		outputs: [
			{
				internalType: "contract ENS",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "recordExists",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "resolver",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setOwner",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setRecord",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			}
		],
		name: "setResolver",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setSubnodeOwner",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setSubnodeRecord",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setTTL",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "ttl",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ERC20_BYTES32_ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var WETH_ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "guy",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "src",
				type: "address"
			},
			{
				name: "dst",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "withdraw",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "dst",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "deposit",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			},
			{
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: true,
				name: "guy",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: true,
				name: "dst",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "dst",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Deposit",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Withdrawal",
		type: "event"
	}
];

var _CHAIN_IDS_TO_NAMES;

/**
 * List of all the networks supported by the Uniswap Interface
 */
var SupportedChainId;

(function (SupportedChainId) {
  SupportedChainId[SupportedChainId["MAINNET"] = 1] = "MAINNET";
  SupportedChainId[SupportedChainId["ROPSTEN"] = 3] = "ROPSTEN";
  SupportedChainId[SupportedChainId["RINKEBY"] = 4] = "RINKEBY";
  SupportedChainId[SupportedChainId["GOERLI"] = 5] = "GOERLI";
  SupportedChainId[SupportedChainId["KOVAN"] = 42] = "KOVAN";
  SupportedChainId[SupportedChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
  SupportedChainId[SupportedChainId["ARBITRUM_RINKEBY"] = 421611] = "ARBITRUM_RINKEBY";
  SupportedChainId[SupportedChainId["OPTIMISM"] = 10] = "OPTIMISM";
  SupportedChainId[SupportedChainId["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
  SupportedChainId[SupportedChainId["POLYGON"] = 137] = "POLYGON";
  SupportedChainId[SupportedChainId["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
	SupportedChainId[SupportedChainId["BNB"] = 56] = "BNB";
  SupportedChainId[SupportedChainId["BNB_TESTNET"] = 97] = "BNB_TESTNET";
})(SupportedChainId || (SupportedChainId = {}));

(_CHAIN_IDS_TO_NAMES = {}, _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.MAINNET, 'mainnet'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.ROPSTEN, 'ropsten'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.RINKEBY, 'rinkeby'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.GOERLI, 'goerli'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.KOVAN, 'kovan'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.POLYGON, 'polygon'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.POLYGON_MUMBAI, 'polygon_mumbai'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.BNB, 'bnb'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.BNB_TESTNET, 'bnb_testnet'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.BNB, 'bnb'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.BNB_TESTNET, 'bnb_testnet'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.ARBITRUM_ONE, 'arbitrum'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.ARBITRUM_RINKEBY, 'arbitrum_rinkeby'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.OPTIMISM, 'optimism'), _defineProperty(_CHAIN_IDS_TO_NAMES, SupportedChainId.OPTIMISTIC_KOVAN, 'optimistic_kovan'), _CHAIN_IDS_TO_NAMES);
/**
 * Array of all the supported chain IDs
 */

var ALL_SUPPORTED_CHAIN_IDS = Object.values(SupportedChainId).filter(function (id) {
  return typeof id === 'number';
});
var SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [SupportedChainId.MAINNET, SupportedChainId.POLYGON];
/**
 * All the chain IDs that are running the Ethereum protocol.
 */

[SupportedChainId.MAINNET, SupportedChainId.ROPSTEN, SupportedChainId.RINKEBY, SupportedChainId.GOERLI, SupportedChainId.KOVAN, SupportedChainId.POLYGON, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.BNB, SupportedChainId.BNB_TESTNET];

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
var L2_CHAIN_IDS = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN];

var DEFAULT_NETWORKS = [SupportedChainId.MAINNET, SupportedChainId.ROPSTEN, SupportedChainId.RINKEBY, SupportedChainId.GOERLI, SupportedChainId.KOVAN];
function constructSameAddressMap(address) {
  var additionalNetworks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return DEFAULT_NETWORKS.concat(additionalNetworks).reduce(function (memo, chainId) {
    memo[chainId] = address;
    return memo;
  }, {});
}

var _objectSpread2$2, _ENS_REGISTRAR_ADDRES, _TICK_LENS_ADDRESSES;

function ownKeys$n(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$n(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$n(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$n(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var UNI_ADDRESS = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984');
var MULTICALL_ADDRESS = _objectSpread$n(_objectSpread$n({}, constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [SupportedChainId.OPTIMISTIC_KOVAN, SupportedChainId.OPTIMISM, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.POLYGON])), {}, (_objectSpread2$2 = {}, _defineProperty(_objectSpread2$2, SupportedChainId.ARBITRUM_ONE, '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB'), _defineProperty(_objectSpread2$2, SupportedChainId.ARBITRUM_RINKEBY, '0xa501c031958F579dB7676fF1CE78AD305794d579'), _objectSpread2$2));
var V2_FACTORY_ADDRESSES = constructSameAddressMap(FACTORY_ADDRESS);
var V2_ROUTER_ADDRESS = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
var V3_ROUTER_ADDRESS = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN, SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.POLYGON, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.BNB, SupportedChainId.BNB_TESTNET]);
var SWAP_ROUTER_ADDRESSES = constructSameAddressMap('0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN, SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.POLYGON, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.BNB, SupportedChainId.BNB_TESTNET]);
/**
 * The oldest V0 governance address
 */

constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F');
/**
 * The older V1 governance address
 */

_defineProperty({}, SupportedChainId.MAINNET, '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6');
/**
 * The latest governor bravo that is currently admin of timelock
 */

_defineProperty({}, SupportedChainId.MAINNET, '0x408ED6354d4973f66138C91495F2f2FCbd8724C3');
constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC');
_defineProperty({}, SupportedChainId.MAINNET, '0x090D4613473dEE047c3f2706764f49E0821D256e');
var ARGENT_WALLET_DETECTOR_ADDRESS = _defineProperty({}, SupportedChainId.MAINNET, '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8');
var V3_CORE_FACTORY_ADDRESSES = constructSameAddressMap(FACTORY_ADDRESS$1, [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN, SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.POLYGON]);
var QUOTER_ADDRESSES = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN, SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.POLYGON]);
constructSameAddressMap('0xC36442b4a4522E871399CD717aBDD847Ab11FE88', [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN, SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.POLYGON]);
var ENS_REGISTRAR_ADDRESSES = (_ENS_REGISTRAR_ADDRES = {}, _defineProperty(_ENS_REGISTRAR_ADDRES, SupportedChainId.MAINNET, '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'), _defineProperty(_ENS_REGISTRAR_ADDRES, SupportedChainId.ROPSTEN, '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'), _defineProperty(_ENS_REGISTRAR_ADDRES, SupportedChainId.GOERLI, '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'), _defineProperty(_ENS_REGISTRAR_ADDRES, SupportedChainId.RINKEBY, '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'), _ENS_REGISTRAR_ADDRES);
_defineProperty({}, SupportedChainId.MAINNET, '0x65770b5283117639760beA3F867b69b3697a91dd');
constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY, SupportedChainId.POLYGON_MUMBAI, SupportedChainId.POLYGON]);
(_TICK_LENS_ADDRESSES = {}, _defineProperty(_TICK_LENS_ADDRESSES, SupportedChainId.ARBITRUM_ONE, '0xbfd8137f7d1516D3ea5cA83523914859ec47F573'), _defineProperty(_TICK_LENS_ADDRESSES, SupportedChainId.ARBITRUM_RINKEBY, '0xbfd8137f7d1516D3ea5cA83523914859ec47F573'), _TICK_LENS_ADDRESSES);

var _USDC, _UNI, _objectSpread2$1, _USDC2;

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys$m(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$m(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$m(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$m(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AMPL = new Token(SupportedChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth');
var DAI = new Token(SupportedChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
var DAI_ARBITRUM_ONE = new Token(SupportedChainId.ARBITRUM_ONE, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai stable coin');
var DAI_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai stable coin');
(_USDC = {}, _defineProperty(_USDC, SupportedChainId.MAINNET, USDC_MAINNET), _defineProperty(_USDC, SupportedChainId.ARBITRUM_ONE, USDC_ARBITRUM), _defineProperty(_USDC, SupportedChainId.OPTIMISM, USDC_OPTIMISM), _defineProperty(_USDC, SupportedChainId.ARBITRUM_RINKEBY, USDC_ARBITRUM_RINKEBY), _defineProperty(_USDC, SupportedChainId.OPTIMISTIC_KOVAN, USDC_OPTIMISTIC_KOVAN), _defineProperty(_USDC, SupportedChainId.POLYGON, USDC_POLYGON), _defineProperty(_USDC, SupportedChainId.POLYGON_MUMBAI, USDC_POLYGON_MUMBAI), _defineProperty(_USDC, SupportedChainId.GOERLI, USDC_GÖRLI), _defineProperty(_USDC, SupportedChainId.RINKEBY, USDC_RINKEBY), _defineProperty(_USDC, SupportedChainId.KOVAN, USDC_KOVAN), _defineProperty(_USDC, SupportedChainId.ROPSTEN, USDC_ROPSTEN), _USDC);
var DAI_POLYGON = new Token(SupportedChainId.POLYGON, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin');
var USDT_POLYGON = new Token(SupportedChainId.POLYGON, '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', 6, 'USDT', 'Tether USD');
var WBTC_POLYGON = new Token(SupportedChainId.POLYGON, '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', 8, 'WBTC', 'Wrapped BTC');
var USDT = new Token(SupportedChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
var USDT_ARBITRUM_ONE = new Token(SupportedChainId.ARBITRUM_ONE, '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', 6, 'USDT', 'Tether USD');
var USDT_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', 6, 'USDT', 'Tether USD');
var WBTC = new Token(SupportedChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC');
var WBTC_ARBITRUM_ONE = new Token(SupportedChainId.ARBITRUM_ONE, '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', 8, 'WBTC', 'Wrapped BTC');
var WBTC_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0x68f180fcCe6836688e9084f035309E29Bf0A2095', 8, 'WBTC', 'Wrapped BTC');
var FEI = new Token(SupportedChainId.MAINNET, '0x956F47F50A910163D8BF957Cf5846D573E7f87CA', 18, 'FEI', 'Fei USD');
var TRIBE = new Token(SupportedChainId.MAINNET, '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B', 18, 'TRIBE', 'Tribe');
var FRAX = new Token(SupportedChainId.MAINNET, '0x853d955aCEf822Db058eb8505911ED77F175b99e', 18, 'FRAX', 'Frax');
var FXS = new Token(SupportedChainId.MAINNET, '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0', 18, 'FXS', 'Frax Share');
var renBTC = new Token(SupportedChainId.MAINNET, '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', 8, 'renBTC', 'renBTC');
var ETH2X_FLI = new Token(SupportedChainId.MAINNET, '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD', 18, 'ETH2x-FLI', 'ETH 2x Flexible Leverage Index');
var sETH2 = new Token(SupportedChainId.MAINNET, '0xFe2e637202056d30016725477c5da089Ab0A043A', 18, 'sETH2', 'StakeWise Staked ETH2');
var rETH2 = new Token(SupportedChainId.MAINNET, '0x20BC832ca081b91433ff6c17f85701B6e92486c5', 18, 'rETH2', 'StakeWise Reward ETH2');
var SWISE = new Token(SupportedChainId.MAINNET, '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2', 18, 'SWISE', 'StakeWise');
var WETH_POLYGON_MUMBAI = new Token(SupportedChainId.POLYGON_MUMBAI, '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa', 18, 'WETH', 'Wrapped Ether');
var WETH_POLYGON = new Token(SupportedChainId.POLYGON, '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', 18, 'WETH', 'Wrapped Ether');
var UNI = (_UNI = {}, _defineProperty(_UNI, SupportedChainId.MAINNET, new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, SupportedChainId.RINKEBY, new Token(SupportedChainId.RINKEBY, UNI_ADDRESS[4], 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, SupportedChainId.ROPSTEN, new Token(SupportedChainId.ROPSTEN, UNI_ADDRESS[3], 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, SupportedChainId.GOERLI, new Token(SupportedChainId.GOERLI, UNI_ADDRESS[5], 18, 'UNI', 'Uniswap')), _defineProperty(_UNI, SupportedChainId.KOVAN, new Token(SupportedChainId.KOVAN, UNI_ADDRESS[42], 18, 'UNI', 'Uniswap')), _UNI);
var WRAPPED_NATIVE_CURRENCY = _objectSpread$m(_objectSpread$m({}, WETH9), {}, (_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, SupportedChainId.OPTIMISM, new Token(SupportedChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether')), _defineProperty(_objectSpread2$1, SupportedChainId.OPTIMISTIC_KOVAN, new Token(SupportedChainId.OPTIMISTIC_KOVAN, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether')), _defineProperty(_objectSpread2$1, SupportedChainId.ARBITRUM_ONE, new Token(SupportedChainId.ARBITRUM_ONE, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether')), _defineProperty(_objectSpread2$1, SupportedChainId.ARBITRUM_RINKEBY, new Token(SupportedChainId.ARBITRUM_RINKEBY, '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681', 18, 'WETH', 'Wrapped Ether')), _defineProperty(_objectSpread2$1, SupportedChainId.POLYGON, new Token(SupportedChainId.POLYGON, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC')), _defineProperty(_objectSpread2$1, SupportedChainId.POLYGON_MUMBAI, new Token(SupportedChainId.POLYGON_MUMBAI, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WMATIC', 'Wrapped MATIC')), _objectSpread2$1));

function isMatic(chainId) {
  return chainId === SupportedChainId.POLYGON_MUMBAI || chainId === SupportedChainId.POLYGON;
}

var MaticNativeCurrency = /*#__PURE__*/function (_NativeCurrency) {
  _inherits(MaticNativeCurrency, _NativeCurrency);

  var _super = _createSuper$6(MaticNativeCurrency);

  function MaticNativeCurrency(chainId) {
    _classCallCheck(this, MaticNativeCurrency);

    if (!isMatic(chainId)) throw new Error('Not matic');
    return _super.call(this, chainId, 18, 'MATIC', 'Polygon Matic');
  }

  _createClass(MaticNativeCurrency, [{
    key: "equals",
    value: function equals(other) {
      return other.isNative && other.chainId === this.chainId;
    }
  }, {
    key: "wrapped",
    get: function get() {
      if (!isMatic(this.chainId)) throw new Error('Not matic');
      return WRAPPED_NATIVE_CURRENCY[this.chainId];
    }
  }]);

  return MaticNativeCurrency;
}(NativeCurrency);

var ExtendedEther = /*#__PURE__*/function (_Ether) {
  _inherits(ExtendedEther, _Ether);

  var _super2 = _createSuper$6(ExtendedEther);

  function ExtendedEther() {
    _classCallCheck(this, ExtendedEther);

    return _super2.apply(this, arguments);
  }

  _createClass(ExtendedEther, [{
    key: "wrapped",
    get: function get() {
      if (this.chainId in WRAPPED_NATIVE_CURRENCY) return WRAPPED_NATIVE_CURRENCY[this.chainId];
      throw new Error('Unsupported chain ID');
    }
  }], [{
    key: "onChain",
    value: function onChain(chainId) {
      var _this$_cachedExtended;

      return (_this$_cachedExtended = this._cachedExtendedEther[chainId]) !== null && _this$_cachedExtended !== void 0 ? _this$_cachedExtended : this._cachedExtendedEther[chainId] = new ExtendedEther(chainId);
    }
  }]);

  return ExtendedEther;
}(Ether);

_defineProperty(ExtendedEther, "_cachedExtendedEther", {});

var cachedNativeCurrency = {};
function nativeOnChain(chainId) {
  var _cachedNativeCurrency;

  return (_cachedNativeCurrency = cachedNativeCurrency[chainId]) !== null && _cachedNativeCurrency !== void 0 ? _cachedNativeCurrency : cachedNativeCurrency[chainId] = isMatic(chainId) ? new MaticNativeCurrency(chainId) : ExtendedEther.onChain(chainId);
}
({
  USDC: (_USDC2 = {}, _defineProperty(_USDC2, SupportedChainId.MAINNET, USDC_MAINNET.address), _defineProperty(_USDC2, SupportedChainId.ARBITRUM_ONE, USDC_ARBITRUM.address), _defineProperty(_USDC2, SupportedChainId.OPTIMISM, USDC_OPTIMISM.address), _defineProperty(_USDC2, SupportedChainId.ARBITRUM_RINKEBY, USDC_ARBITRUM_RINKEBY.address), _defineProperty(_USDC2, SupportedChainId.OPTIMISTIC_KOVAN, USDC_OPTIMISTIC_KOVAN.address), _defineProperty(_USDC2, SupportedChainId.POLYGON, USDC_POLYGON.address), _defineProperty(_USDC2, SupportedChainId.POLYGON_MUMBAI, USDC_POLYGON_MUMBAI.address), _defineProperty(_USDC2, SupportedChainId.GOERLI, USDC_GÖRLI.address), _defineProperty(_USDC2, SupportedChainId.RINKEBY, USDC_RINKEBY.address), _defineProperty(_USDC2, SupportedChainId.KOVAN, USDC_KOVAN.address), _defineProperty(_USDC2, SupportedChainId.ROPSTEN, USDC_ROPSTEN.address), _USDC2)
});

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
  try {
    return getAddress(value);
  } catch (_unused) {
    return false;
  }
} // shorten the checksummed version of the input address to have 0x + 4 characters at start and end

function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
} // account is optional


function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
} // account is optional


function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error("Invalid 'address' parameter '".concat(address, "'."));
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

var IUniswapV2Router02ABI = IUniswapV2Router02Json.abi;
var QuoterABI = QuoterJson.abi;
var MulticallABI = UniswapInterfaceMulticallJson.abi;

function useContract(addressOrAddressMap, ABI) {
  var withSignerIfPossible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var _useActiveWeb3React = useActiveWeb3React(),
      library = _useActiveWeb3React.library,
      account = _useActiveWeb3React.account,
      chainId = _useActiveWeb3React.chainId;

  return useMemo(function () {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    var address;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;else address = addressOrAddressMap[chainId];
    if (!address) return null;

    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]);
}
function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20ABI, withSignerIfPossible);
}
function useWETHContract(withSignerIfPossible) {
  var _WRAPPED_NATIVE_CURRE;

  var _useActiveWeb3React2 = useActiveWeb3React(),
      chainId = _useActiveWeb3React2.chainId;

  return useContract(chainId ? (_WRAPPED_NATIVE_CURRE = WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address : undefined, WETH_ABI, withSignerIfPossible);
}
function useArgentWalletDetectorContract() {
  return useContract(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false);
}
function useENSRegistrarContract(withSignerIfPossible) {
  return useContract(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible);
}
function useENSResolverContract(address, withSignerIfPossible) {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}
function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
function useEIP2612Contract(tokenAddress) {
  return useContract(tokenAddress, EIP_2612, false);
}
function useV2RouterContract() {
  return useContract(V2_ROUTER_ADDRESS, IUniswapV2Router02ABI, true);
}
function useInterfaceMulticall() {
  return useContract(MULTICALL_ADDRESS, MulticallABI, false);
}
function useV3Quoter() {
  return useContract(QUOTER_ADDRESSES, QuoterABI);
}

var multicall = createMulticall();
var reducer = combineReducers(_defineProperty({}, multicall.reducerPath, multicall.reducer));
var store = createStore(reducer);
function MulticallUpdater() {
  var latestBlockNumber = useBlockNumber();

  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var contract = useInterfaceMulticall();
  return /*#__PURE__*/jsx(multicall.Updater, {
    chainId: chainId,
    latestBlockNumber: latestBlockNumber,
    contract: contract
  });
}

// Create wrappers for hooks so consumers don't need to get latest block themselves

function useMultipleContractSingleData() {
  var _multicall$hooks;

  var _useCallContext = useCallContext(),
      chainId = _useCallContext.chainId,
      latestBlock = _useCallContext.latestBlock;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (_multicall$hooks = multicall.hooks).useMultipleContractSingleData.apply(_multicall$hooks, [chainId, latestBlock].concat(args));
}
function useSingleCallResult() {
  var _multicall$hooks2;

  var _useCallContext2 = useCallContext(),
      chainId = _useCallContext2.chainId,
      latestBlock = _useCallContext2.latestBlock;

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return (_multicall$hooks2 = multicall.hooks).useSingleCallResult.apply(_multicall$hooks2, [chainId, latestBlock].concat(args));
}
function useSingleContractMultipleData() {
  var _multicall$hooks3;

  var _useCallContext3 = useCallContext(),
      chainId = _useCallContext3.chainId,
      latestBlock = _useCallContext3.latestBlock;

  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return (_multicall$hooks3 = multicall.hooks).useSingleContractMultipleData.apply(_multicall$hooks3, [chainId, latestBlock].concat(args));
}
function useSingleContractWithCallData() {
  var _multicall$hooks4;

  var _useCallContext4 = useCallContext(),
      chainId = _useCallContext4.chainId,
      latestBlock = _useCallContext4.latestBlock;

  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return (_multicall$hooks4 = multicall.hooks).useSingleContractWithCallData.apply(_multicall$hooks4, [chainId, latestBlock].concat(args));
}

function useCallContext() {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var latestBlock = useBlockNumber();
  return {
    chainId: chainId,
    latestBlock: latestBlock
  };
}

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */

function useNativeCurrencyBalances(uncheckedAddresses) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var multicallContract = useInterfaceMulticall();
  var validAddressInputs = useMemo(function () {
    return uncheckedAddresses ? uncheckedAddresses.map(isAddress).filter(function (a) {
      return a !== false;
    }).sort().map(function (addr) {
      return [addr];
    }) : [];
  }, [uncheckedAddresses]);
  var results = useSingleContractMultipleData(multicallContract, 'getEthBalance', validAddressInputs);
  return useMemo(function () {
    return validAddressInputs.reduce(function (memo, _ref, i) {
      var _results$i, _results$i$result;

      var _ref2 = _slicedToArray(_ref, 1),
          address = _ref2[0];

      var value = results === null || results === void 0 ? void 0 : (_results$i = results[i]) === null || _results$i === void 0 ? void 0 : (_results$i$result = _results$i.result) === null || _results$i$result === void 0 ? void 0 : _results$i$result[0];
      if (value && chainId) memo[address] = CurrencyAmount.fromRawAmount(nativeOnChain(chainId), JSBI.BigInt(value.toString()));
      return memo;
    }, {});
  }, [validAddressInputs, chainId, results]);
}
var ERC20Interface = new Interface(ERC20ABI);
var tokenBalancesGasRequirement = {
  gasRequired: 125000
};
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */

function useTokenBalancesWithLoadingIndicator(address, tokens) {
  var validatedTokens = useMemo(function () {
    var _tokens$filter;

    return (_tokens$filter = tokens === null || tokens === void 0 ? void 0 : tokens.filter(function (t) {
      return isAddress(t === null || t === void 0 ? void 0 : t.address) !== false;
    })) !== null && _tokens$filter !== void 0 ? _tokens$filter : [];
  }, [tokens]);
  var validatedTokenAddresses = useMemo(function () {
    return validatedTokens.map(function (vt) {
      return vt.address;
    });
  }, [validatedTokens]);
  var balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20Interface, 'balanceOf', useMemo(function () {
    return [address];
  }, [address]), tokenBalancesGasRequirement);
  var anyLoading = useMemo(function () {
    return balances.some(function (callState) {
      return callState.loading;
    });
  }, [balances]);
  return useMemo(function () {
    return [address && validatedTokens.length > 0 ? validatedTokens.reduce(function (memo, token, i) {
      var _balances$i, _balances$i$result;

      var value = balances === null || balances === void 0 ? void 0 : (_balances$i = balances[i]) === null || _balances$i === void 0 ? void 0 : (_balances$i$result = _balances$i.result) === null || _balances$i$result === void 0 ? void 0 : _balances$i$result[0];
      var amount = value ? JSBI.BigInt(value.toString()) : undefined;

      if (amount) {
        memo[token.address] = CurrencyAmount.fromRawAmount(token, amount);
      }

      return memo;
    }, {}) : {}, anyLoading];
  }, [address, validatedTokens, anyLoading, balances]);
}
function useTokenBalances(address, tokens) {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
} // get the balance for a single token/account combo
function useCurrencyBalances(account, currencies) {
  var tokens = useMemo(function () {
    var _currencies$filter;

    return (_currencies$filter = currencies === null || currencies === void 0 ? void 0 : currencies.filter(function (currency) {
      var _currency$isToken;

      return (_currency$isToken = currency === null || currency === void 0 ? void 0 : currency.isToken) !== null && _currency$isToken !== void 0 ? _currency$isToken : false;
    })) !== null && _currencies$filter !== void 0 ? _currencies$filter : [];
  }, [currencies]);
  var tokenBalances = useTokenBalances(account, tokens);
  var containsETH = useMemo(function () {
    var _currencies$some;

    return (_currencies$some = currencies === null || currencies === void 0 ? void 0 : currencies.some(function (currency) {
      return currency === null || currency === void 0 ? void 0 : currency.isNative;
    })) !== null && _currencies$some !== void 0 ? _currencies$some : false;
  }, [currencies]);
  var ethBalance = useNativeCurrencyBalances(useMemo(function () {
    return containsETH ? [account] : [];
  }, [containsETH, account]));
  return useMemo(function () {
    var _currencies$map;

    return (_currencies$map = currencies === null || currencies === void 0 ? void 0 : currencies.map(function (currency) {
      if (!account || !currency) return undefined;
      if (currency.isToken) return tokenBalances[currency.address];
      if (currency.isNative) return ethBalance[account];
      return undefined;
    })) !== null && _currencies$map !== void 0 ? _currencies$map : [];
  }, [account, currencies, ethBalance, tokenBalances]);
}
function useCurrencyBalance(account, currency) {
  return useCurrencyBalances(account, useMemo(function () {
    return [currency];
  }, [currency]))[0];
}

var Field;

(function (Field) {
  Field["INPUT"] = "INPUT";
  Field["OUTPUT"] = "OUTPUT";
})(Field || (Field = {}));

var swapAtom = atomWithImmer(_defineProperty({
  independentField: Field.INPUT,
  amount: ''
}, Field.INPUT, nativeOnChain(SupportedChainId.MAINNET))); // If set to a transaction hash, that transaction will display in a status dialog.

var displayTxHashAtom = atom(undefined);
var feeOptionsAtom = atom(undefined);

/**
 * Parses a CurrencyAmount from the passed string.
 * Returns the CurrencyAmount, or undefined if parsing fails.
 */

function tryParseCurrencyAmount(value, currency) {
  if (!value || !currency) {
    return undefined;
  }

  try {
    var typedValueParsed = parseUnits(value, currency.decimals).toString();

    if (typedValueParsed !== '0') {
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // fails if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug("Failed to parse input amount: \"".concat(value, "\""), error);
  }

  return undefined;
}

var _excluded$4 = ["gasUseEstimateUSD"];

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TradeState; // from https://github.com/Uniswap/routing-api/blob/main/lib/handlers/schema.ts

(function (TradeState) {
  TradeState[TradeState["LOADING"] = 0] = "LOADING";
  TradeState[TradeState["INVALID"] = 1] = "INVALID";
  TradeState[TradeState["NO_ROUTE_FOUND"] = 2] = "NO_ROUTE_FOUND";
  TradeState[TradeState["VALID"] = 3] = "VALID";
  TradeState[TradeState["SYNCING"] = 4] = "SYNCING";
})(TradeState || (TradeState = {}));

var InterfaceTrade = /*#__PURE__*/function (_Trade) {
  _inherits(InterfaceTrade, _Trade);

  var _super = _createSuper$5(InterfaceTrade);

  function InterfaceTrade(_ref) {
    var _this;

    var gasUseEstimateUSD = _ref.gasUseEstimateUSD,
        routes = _objectWithoutProperties(_ref, _excluded$4);

    _classCallCheck(this, InterfaceTrade);

    _this = _super.call(this, routes);
    _this.gasUseEstimateUSD = gasUseEstimateUSD;
    return _this;
  }

  return _createClass(InterfaceTrade);
}(Trade$1);

function useNativeCurrency() {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  return useMemo(function () {
    return chainId ? nativeOnChain(chainId) : // display mainnet when not connected
    nativeOnChain(SupportedChainId.MAINNET);
  }, [chainId]);
}

function safeNamehash(name) {
  if (name === undefined) return undefined;

  try {
    return namehash(name);
  } catch (error) {
    console.debug(error);
    return undefined;
  }
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
function isZero(hexNumberString) {
  return /^0x0*$/.test(hexNumberString);
}

/**
 * Does a lookup for an ENS name to find its address.
 */

function useENSAddress(ensName) {
  var _resolverAddress$resu;

  var debouncedName = useDebounce(ensName, 200);
  var ensNodeArgument = useMemo(function () {
    return [debouncedName === null ? undefined : safeNamehash(debouncedName)];
  }, [debouncedName]);
  var registrarContract = useENSRegistrarContract(false);
  var resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
  var addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument);
  var changed = debouncedName !== ensName;
  return useMemo(function () {
    var _addr$result$, _addr$result;

    return {
      address: changed ? null : (_addr$result$ = (_addr$result = addr.result) === null || _addr$result === void 0 ? void 0 : _addr$result[0]) !== null && _addr$result$ !== void 0 ? _addr$result$ : null,
      loading: changed || resolverAddress.loading || addr.loading
    };
  }, [addr.loading, addr.result, changed, resolverAddress.loading]);
}

var CHAIN_DATA_ABI = [{
  inputs: [],
  name: 'latestAnswer',
  outputs: [{
    internalType: 'int256',
    name: '',
    type: 'int256'
  }],
  stateMutability: 'view',
  type: 'function'
}];
/**
 * Returns the price of 1 gas in WEI for the currently selected network using the chainlink fast gas price oracle
 */

function useGasPrice() {
  var _useSingleCallResult$, _useSingleCallResult$2;

  var _useENSAddress = useENSAddress('fast-gas-gwei.data.eth'),
      address = _useENSAddress.address;

  var contract = useContract(address !== null && address !== void 0 ? address : undefined, CHAIN_DATA_ABI, false);
  var resultStr = (_useSingleCallResult$ = useSingleCallResult(contract, 'latestAnswer').result) === null || _useSingleCallResult$ === void 0 ? void 0 : (_useSingleCallResult$2 = _useSingleCallResult$[0]) === null || _useSingleCallResult$2 === void 0 ? void 0 : _useSingleCallResult$2.toString();
  return typeof resultStr === 'string' ? JSBI.BigInt(resultStr) : undefined;
}

// only used by v2 hooks

function isTradeBetter(tradeA, tradeB) {
  var minimumDelta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ZERO_PERCENT;
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (tradeA.tradeType !== tradeB.tradeType || !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) || !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency)) {
    throw new Error('Comparing incomparable trades');
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  } else {
    return tradeA.executionPrice.asFraction.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice);
  }
}

var _objectSpread2, _SupportedChainId$MAI, _COMMON_BASES;

function ownKeys$l(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$l(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$l(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$l(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var WRAPPED_NATIVE_CURRENCIES_ONLY = Object.fromEntries(Object.entries(WRAPPED_NATIVE_CURRENCY).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  return [key, [value]];
})); // used to construct intermediary pairs for trading

var BASES_TO_CHECK_TRADES_AGAINST = _objectSpread$l(_objectSpread$l({}, WRAPPED_NATIVE_CURRENCIES_ONLY), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, SupportedChainId.MAINNET, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET]), [DAI, USDC_MAINNET, USDT, WBTC])), _defineProperty(_objectSpread2, SupportedChainId.OPTIMISM, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.OPTIMISM]), [DAI_OPTIMISM, USDT_OPTIMISM, WBTC_OPTIMISM])), _defineProperty(_objectSpread2, SupportedChainId.ARBITRUM_ONE, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ARBITRUM_ONE]), [DAI_ARBITRUM_ONE, USDT_ARBITRUM_ONE, WBTC_ARBITRUM_ONE])), _defineProperty(_objectSpread2, SupportedChainId.POLYGON, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.POLYGON]), [DAI_POLYGON, USDC_POLYGON, USDT_POLYGON, WETH_POLYGON])), _objectSpread2));
var ADDITIONAL_BASES = _defineProperty({}, SupportedChainId.MAINNET, (_SupportedChainId$MAI = {
  '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI]
}, _defineProperty(_SupportedChainId$MAI, rETH2.address, [sETH2]), _defineProperty(_SupportedChainId$MAI, SWISE.address, [sETH2]), _defineProperty(_SupportedChainId$MAI, FEI.address, [TRIBE]), _defineProperty(_SupportedChainId$MAI, TRIBE.address, [FEI]), _defineProperty(_SupportedChainId$MAI, FRAX.address, [FXS]), _defineProperty(_SupportedChainId$MAI, FXS.address, [FRAX]), _defineProperty(_SupportedChainId$MAI, WBTC.address, [renBTC]), _defineProperty(_SupportedChainId$MAI, renBTC.address, [WBTC]), _SupportedChainId$MAI));
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */

var CUSTOM_BASES = _defineProperty({}, SupportedChainId.MAINNET, _defineProperty({}, AMPL.address, [DAI, WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET]]));
/**
 * Shows up in the currency select for swap and add liquidity
 */

(_COMMON_BASES = {}, _defineProperty(_COMMON_BASES, SupportedChainId.MAINNET, [nativeOnChain(SupportedChainId.MAINNET), DAI, USDC_MAINNET, USDT, WBTC, WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET]]), _defineProperty(_COMMON_BASES, SupportedChainId.ROPSTEN, [nativeOnChain(SupportedChainId.ROPSTEN), WRAPPED_NATIVE_CURRENCY[SupportedChainId.ROPSTEN]]), _defineProperty(_COMMON_BASES, SupportedChainId.RINKEBY, [nativeOnChain(SupportedChainId.RINKEBY), WRAPPED_NATIVE_CURRENCY[SupportedChainId.RINKEBY]]), _defineProperty(_COMMON_BASES, SupportedChainId.GOERLI, [nativeOnChain(SupportedChainId.GOERLI), WRAPPED_NATIVE_CURRENCY[SupportedChainId.GOERLI]]), _defineProperty(_COMMON_BASES, SupportedChainId.KOVAN, [nativeOnChain(SupportedChainId.KOVAN), WRAPPED_NATIVE_CURRENCY[SupportedChainId.KOVAN]]), _defineProperty(_COMMON_BASES, SupportedChainId.ARBITRUM_ONE, [nativeOnChain(SupportedChainId.ARBITRUM_ONE), DAI_ARBITRUM_ONE, USDC_ARBITRUM, USDT_ARBITRUM_ONE, WBTC_ARBITRUM_ONE, WRAPPED_NATIVE_CURRENCY[SupportedChainId.ARBITRUM_ONE]]), _defineProperty(_COMMON_BASES, SupportedChainId.ARBITRUM_RINKEBY, [nativeOnChain(SupportedChainId.ARBITRUM_RINKEBY), WRAPPED_NATIVE_CURRENCY[SupportedChainId.ARBITRUM_RINKEBY]]), _defineProperty(_COMMON_BASES, SupportedChainId.OPTIMISM, [nativeOnChain(SupportedChainId.OPTIMISM), DAI_OPTIMISM, USDC_OPTIMISM, USDT_OPTIMISM, WBTC_OPTIMISM]), _defineProperty(_COMMON_BASES, SupportedChainId.OPTIMISTIC_KOVAN, [nativeOnChain(SupportedChainId.OPTIMISTIC_KOVAN)]), _defineProperty(_COMMON_BASES, SupportedChainId.POLYGON, [nativeOnChain(SupportedChainId.POLYGON), WETH_POLYGON, USDC_POLYGON, DAI_POLYGON, USDT_POLYGON, WBTC_POLYGON]), _defineProperty(_COMMON_BASES, SupportedChainId.POLYGON_MUMBAI, [nativeOnChain(SupportedChainId.POLYGON_MUMBAI), WRAPPED_NATIVE_CURRENCY[SupportedChainId.POLYGON_MUMBAI], WETH_POLYGON_MUMBAI]), _COMMON_BASES); // used to construct the list of all pairs we consider by default in the frontend

_objectSpread$l(_objectSpread$l({}, WRAPPED_NATIVE_CURRENCIES_ONLY), {}, _defineProperty({}, SupportedChainId.MAINNET, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET]), [DAI, USDC_MAINNET, USDT, WBTC])));
_defineProperty({}, SupportedChainId.MAINNET, [[new Token(SupportedChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'), new Token(SupportedChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')], [USDC_MAINNET, USDT], [DAI, USDT]]);

function useAllCurrencyCombinations(currencyA, currencyB) {
  var chainId = currencyA === null || currencyA === void 0 ? void 0 : currencyA.chainId;

  var _ref = chainId ? [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped] : [undefined, undefined],
      _ref2 = _slicedToArray(_ref, 2),
      tokenA = _ref2[0],
      tokenB = _ref2[1];

  var bases = useMemo(function () {
    var _BASES_TO_CHECK_TRADE, _ADDITIONAL_BASES$cha, _ADDITIONAL_BASES$cha2, _ADDITIONAL_BASES$cha3, _ADDITIONAL_BASES$cha4;

    if (!chainId || chainId !== (tokenB === null || tokenB === void 0 ? void 0 : tokenB.chainId)) return [];
    var common = (_BASES_TO_CHECK_TRADE = BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _BASES_TO_CHECK_TRADE !== void 0 ? _BASES_TO_CHECK_TRADE : [];
    var additionalA = tokenA ? (_ADDITIONAL_BASES$cha = (_ADDITIONAL_BASES$cha2 = ADDITIONAL_BASES[chainId]) === null || _ADDITIONAL_BASES$cha2 === void 0 ? void 0 : _ADDITIONAL_BASES$cha2[tokenA.address]) !== null && _ADDITIONAL_BASES$cha !== void 0 ? _ADDITIONAL_BASES$cha : [] : [];
    var additionalB = tokenB ? (_ADDITIONAL_BASES$cha3 = (_ADDITIONAL_BASES$cha4 = ADDITIONAL_BASES[chainId]) === null || _ADDITIONAL_BASES$cha4 === void 0 ? void 0 : _ADDITIONAL_BASES$cha4[tokenB.address]) !== null && _ADDITIONAL_BASES$cha3 !== void 0 ? _ADDITIONAL_BASES$cha3 : [] : [];
    return [].concat(_toConsumableArray(common), _toConsumableArray(additionalA), _toConsumableArray(additionalB));
  }, [chainId, tokenA, tokenB]);
  var basePairs = useMemo(function () {
    return bases.flatMap(function (base) {
      return bases.map(function (otherBase) {
        return [base, otherBase];
      });
    }) // though redundant with the first filter below, that expression runs more often, so this is probably worthwhile
    .filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          t0 = _ref4[0],
          t1 = _ref4[1];

      return !t0.equals(t1);
    });
  }, [bases]);
  return useMemo(function () {
    return tokenA && tokenB ? [// the direct pair
    [tokenA, tokenB]].concat(_toConsumableArray(bases.map(function (base) {
      return [tokenA, base];
    })), _toConsumableArray(bases.map(function (base) {
      return [tokenB, base];
    })), _toConsumableArray(basePairs)) // filter out invalid pairs comprised of the same asset (e.g. WETH<>WETH)
    .filter(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          t0 = _ref6[0],
          t1 = _ref6[1];

      return !t0.equals(t1);
    }) // filter out duplicate pairs
    .filter(function (_ref7, i, otherPairs) {
      var _ref8 = _slicedToArray(_ref7, 2),
          t0 = _ref8[0],
          t1 = _ref8[1];

      // find the first index in the array at which there are the same 2 tokens as the current
      var firstIndexInOtherPairs = otherPairs.findIndex(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            t0Other = _ref10[0],
            t1Other = _ref10[1];

        return t0.equals(t0Other) && t1.equals(t1Other) || t0.equals(t1Other) && t1.equals(t0Other);
      }); // only accept the first occurrence of the same 2 tokens

      return firstIndexInOtherPairs === i;
    }) // optionally filter out some pairs for tokens with custom bases defined
    .filter(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          tokenA = _ref12[0],
          tokenB = _ref12[1];

      if (!chainId) return true;
      var customBases = CUSTOM_BASES[chainId];
      var customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA.address];
      var customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB.address];
      if (!customBasesA && !customBasesB) return true;
      if (customBasesA && !customBasesA.find(function (base) {
        return tokenB.equals(base);
      })) return false;
      if (customBasesB && !customBasesB.find(function (base) {
        return tokenA.equals(base);
      })) return false;
      return true;
    }) : [];
  }, [tokenA, tokenB, bases, basePairs, chainId]);
}

var IUniswapV2PairABI = IUniswapV2PairJson.abi;
var PAIR_INTERFACE = new Interface(IUniswapV2PairABI);
var PairState;

(function (PairState) {
  PairState[PairState["LOADING"] = 0] = "LOADING";
  PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
  PairState[PairState["EXISTS"] = 2] = "EXISTS";
  PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState || (PairState = {}));

function useV2Pairs(currencies) {
  var tokens = useMemo(function () {
    return currencies.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          currencyA = _ref2[0],
          currencyB = _ref2[1];

      return [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped];
    });
  }, [currencies]);
  var pairAddresses = useMemo(function () {
    return tokens.map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          tokenA = _ref4[0],
          tokenB = _ref4[1];

      return tokenA && tokenB && tokenA.chainId === tokenB.chainId && !tokenA.equals(tokenB) && V2_FACTORY_ADDRESSES[tokenA.chainId] ? computePairAddress({
        factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId],
        tokenA: tokenA,
        tokenB: tokenB
      }) : undefined;
    });
  }, [tokens]);
  var results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves');
  return useMemo(function () {
    return results.map(function (result, i) {
      var reserves = result.result,
          loading = result.loading;
      var tokenA = tokens[i][0];
      var tokenB = tokens[i][1];
      if (loading) return [PairState.LOADING, null];
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null];
      if (!reserves) return [PairState.NOT_EXISTS, null];
      var reserve0 = reserves.reserve0,
          reserve1 = reserves.reserve1;

      var _ref5 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
          _ref6 = _slicedToArray(_ref5, 2),
          token0 = _ref6[0],
          token1 = _ref6[1];

      return [PairState.EXISTS, new Pair(CurrencyAmount.fromRawAmount(token0, reserve0.toString()), CurrencyAmount.fromRawAmount(token1, reserve1.toString()))];
    });
  }, [results, tokens]);
}

function useAllCommonPairs(currencyA, currencyB) {
  var allCurrencyCombinations = useAllCurrencyCombinations(currencyA, currencyB);
  var allPairs = useV2Pairs(allCurrencyCombinations);
  return useMemo(function () {
    return Object.values(allPairs // filter out invalid pairs
    .filter(function (result) {
      return Boolean(result[0] === PairState.EXISTS && result[1]);
    }).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          pair = _ref2[1];

      return pair;
    }));
  }, [allPairs]);
}

var MAX_HOPS = 3;
/**
 * Returns the best v2 trade for a desired swap
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */

function useBestV2Trade(tradeType, amountSpecified, otherCurrency) {
  var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref3$maxHops = _ref3.maxHops,
      maxHops = _ref3$maxHops === void 0 ? MAX_HOPS : _ref3$maxHops;

  var _useMemo = useMemo(function () {
    return tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency];
  }, [tradeType, amountSpecified, otherCurrency]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      currencyIn = _useMemo2[0],
      currencyOut = _useMemo2[1];

  var allowedPairs = useAllCommonPairs(currencyIn, currencyOut);
  return useMemo(function () {
    if (amountSpecified && currencyIn && currencyOut && allowedPairs.length > 0) {
      if (maxHops === 1) {
        var options = {
          maxHops: 1,
          maxNumResults: 1
        };

        if (tradeType === TradeType.EXACT_INPUT) {
          var _Trade$bestTradeExact;

          var amountIn = amountSpecified;
          return (_Trade$bestTradeExact = Trade$2.bestTradeExactIn(allowedPairs, amountIn, currencyOut, options)[0]) !== null && _Trade$bestTradeExact !== void 0 ? _Trade$bestTradeExact : null;
        } else {
          var _Trade$bestTradeExact2;

          var amountOut = amountSpecified;
          return (_Trade$bestTradeExact2 = Trade$2.bestTradeExactOut(allowedPairs, currencyIn, amountOut, options)[0]) !== null && _Trade$bestTradeExact2 !== void 0 ? _Trade$bestTradeExact2 : null;
        }
      } // search through trades with varying hops, find best trade out of them


      var bestTradeSoFar = null;

      for (var i = 1; i <= maxHops; i++) {
        var _options = {
          maxHops: i,
          maxNumResults: 1
        };
        var currentTrade = void 0;

        if (tradeType === TradeType.EXACT_INPUT) {
          var _Trade$bestTradeExact3;

          var _amountIn = amountSpecified;
          currentTrade = (_Trade$bestTradeExact3 = Trade$2.bestTradeExactIn(allowedPairs, _amountIn, currencyOut, _options)[0]) !== null && _Trade$bestTradeExact3 !== void 0 ? _Trade$bestTradeExact3 : null;
        } else {
          var _Trade$bestTradeExact4;

          var _amountOut = amountSpecified;
          currentTrade = (_Trade$bestTradeExact4 = Trade$2.bestTradeExactOut(allowedPairs, currencyIn, _amountOut, _options)[0]) !== null && _Trade$bestTradeExact4 !== void 0 ? _Trade$bestTradeExact4 : null;
        } // if current trade is best yet, save it


        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade;
        }
      }

      return bestTradeSoFar;
    }

    return null;
  }, [tradeType, amountSpecified, currencyIn, currencyOut, allowedPairs, maxHops]);
}

var _format = "hh-sol-artifact-1";
var contractName = "IUniswapV3PoolState";
var sourceName = "contracts/interfaces/pool/IUniswapV3PoolState.sol";
var abi = [
	{
		inputs: [
		],
		name: "feeGrowthGlobal0X128",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "feeGrowthGlobal1X128",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "liquidity",
		outputs: [
			{
				internalType: "uint128",
				name: "",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "observations",
		outputs: [
			{
				internalType: "uint32",
				name: "blockTimestamp",
				type: "uint32"
			},
			{
				internalType: "int56",
				name: "tickCumulative",
				type: "int56"
			},
			{
				internalType: "uint160",
				name: "secondsPerLiquidityCumulativeX128",
				type: "uint160"
			},
			{
				internalType: "bool",
				name: "initialized",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "key",
				type: "bytes32"
			}
		],
		name: "positions",
		outputs: [
			{
				internalType: "uint128",
				name: "_liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside0LastX128",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside1LastX128",
				type: "uint256"
			},
			{
				internalType: "uint128",
				name: "tokensOwed0",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "tokensOwed1",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "protocolFees",
		outputs: [
			{
				internalType: "uint128",
				name: "token0",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "token1",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "slot0",
		outputs: [
			{
				internalType: "uint160",
				name: "sqrtPriceX96",
				type: "uint160"
			},
			{
				internalType: "int24",
				name: "tick",
				type: "int24"
			},
			{
				internalType: "uint16",
				name: "observationIndex",
				type: "uint16"
			},
			{
				internalType: "uint16",
				name: "observationCardinality",
				type: "uint16"
			},
			{
				internalType: "uint16",
				name: "observationCardinalityNext",
				type: "uint16"
			},
			{
				internalType: "uint8",
				name: "feeProtocol",
				type: "uint8"
			},
			{
				internalType: "bool",
				name: "unlocked",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int16",
				name: "wordPosition",
				type: "int16"
			}
		],
		name: "tickBitmap",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int24",
				name: "tick",
				type: "int24"
			}
		],
		name: "ticks",
		outputs: [
			{
				internalType: "uint128",
				name: "liquidityGross",
				type: "uint128"
			},
			{
				internalType: "int128",
				name: "liquidityNet",
				type: "int128"
			},
			{
				internalType: "uint256",
				name: "feeGrowthOutside0X128",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeGrowthOutside1X128",
				type: "uint256"
			},
			{
				internalType: "int56",
				name: "tickCumulativeOutside",
				type: "int56"
			},
			{
				internalType: "uint160",
				name: "secondsPerLiquidityOutsideX128",
				type: "uint160"
			},
			{
				internalType: "uint32",
				name: "secondsOutside",
				type: "uint32"
			},
			{
				internalType: "bool",
				name: "initialized",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];
var bytecode = "0x";
var deployedBytecode = "0x";
var linkReferences = {
};
var deployedLinkReferences = {
};
var IUniswapV3PoolStateJson = {
	_format: _format,
	contractName: contractName,
	sourceName: sourceName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	linkReferences: linkReferences,
	deployedLinkReferences: deployedLinkReferences
};

var IUniswapV3PoolStateABI = IUniswapV3PoolStateJson.abi;
var POOL_STATE_INTERFACE = new Interface(IUniswapV3PoolStateABI);
var PoolState;

(function (PoolState) {
  PoolState[PoolState["LOADING"] = 0] = "LOADING";
  PoolState[PoolState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
  PoolState[PoolState["EXISTS"] = 2] = "EXISTS";
  PoolState[PoolState["INVALID"] = 3] = "INVALID";
})(PoolState || (PoolState = {}));

function usePools(poolKeys) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var transformed = useMemo(function () {
    return poolKeys.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          currencyA = _ref2[0],
          currencyB = _ref2[1],
          feeAmount = _ref2[2];

      if (!chainId || !currencyA || !currencyB || !feeAmount) return null;
      var tokenA = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
      var tokenB = currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped;
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return null;

      var _ref3 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
          _ref4 = _slicedToArray(_ref3, 2),
          token0 = _ref4[0],
          token1 = _ref4[1];

      return [token0, token1, feeAmount];
    });
  }, [chainId, poolKeys]);
  var poolAddresses = useMemo(function () {
    var v3CoreFactoryAddress = chainId && V3_CORE_FACTORY_ADDRESSES[chainId];
    return transformed.map(function (value) {
      if (!v3CoreFactoryAddress || !value) return undefined;
      return computePoolAddress({
        factoryAddress: v3CoreFactoryAddress,
        tokenA: value[0],
        tokenB: value[1],
        fee: value[2]
      });
    });
  }, [chainId, transformed]);
  var slot0s = useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, 'slot0');
  var liquidities = useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, 'liquidity');
  return useMemo(function () {
    return poolKeys.map(function (_key, index) {
      var _transformed$index;

      var _ref5 = (_transformed$index = transformed[index]) !== null && _transformed$index !== void 0 ? _transformed$index : [],
          _ref6 = _slicedToArray(_ref5, 3),
          token0 = _ref6[0],
          token1 = _ref6[1],
          fee = _ref6[2];

      if (!token0 || !token1 || !fee) return [PoolState.INVALID, null];
      var _slot0s$index = slot0s[index],
          slot0 = _slot0s$index.result,
          slot0Loading = _slot0s$index.loading,
          slot0Valid = _slot0s$index.valid;
      var _liquidities$index = liquidities[index],
          liquidity = _liquidities$index.result,
          liquidityLoading = _liquidities$index.loading,
          liquidityValid = _liquidities$index.valid;
      if (!slot0Valid || !liquidityValid) return [PoolState.INVALID, null];
      if (slot0Loading || liquidityLoading) return [PoolState.LOADING, null];
      if (!slot0 || !liquidity) return [PoolState.NOT_EXISTS, null];
      if (!slot0.sqrtPriceX96 || slot0.sqrtPriceX96.eq(0)) return [PoolState.NOT_EXISTS, null];

      try {
        return [PoolState.EXISTS, new Pool$1(token0, token1, fee, slot0.sqrtPriceX96, liquidity[0], slot0.tick)];
      } catch (error) {
        console.error('Error when constructing the pool', error);
        return [PoolState.NOT_EXISTS, null];
      }
    });
  }, [liquidities, poolKeys, slot0s, transformed]);
}

/**
 * Returns all the existing pools that should be considered for swapping between an input currency and an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */

function useV3SwapPools(currencyIn, currencyOut) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var allCurrencyCombinations = useAllCurrencyCombinations(currencyIn, currencyOut);
  var allCurrencyCombinationsWithAllFees = useMemo(function () {
    return allCurrencyCombinations.reduce(function (list, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          tokenA = _ref2[0],
          tokenB = _ref2[1];

      return chainId === SupportedChainId.MAINNET ? list.concat([[tokenA, tokenB, FeeAmount.LOW], [tokenA, tokenB, FeeAmount.MEDIUM], [tokenA, tokenB, FeeAmount.HIGH]]) : list.concat([[tokenA, tokenB, FeeAmount.LOWEST], [tokenA, tokenB, FeeAmount.LOW], [tokenA, tokenB, FeeAmount.MEDIUM], [tokenA, tokenB, FeeAmount.HIGH]]);
    }, []);
  }, [allCurrencyCombinations, chainId]);
  var pools = usePools(allCurrencyCombinationsWithAllFees);
  return useMemo(function () {
    return {
      pools: pools.filter(function (tuple) {
        return tuple[0] === PoolState.EXISTS && tuple[1] !== null;
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            pool = _ref4[1];

        return pool;
      }),
      loading: pools.some(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            state = _ref6[0];

        return state === PoolState.LOADING;
      })
    };
  }, [pools]);
}

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Returns true if poolA is equivalent to poolB
 * @param poolA one of the two pools
 * @param poolB the other pool
 */

function poolEquals(poolA, poolB) {
  return poolA === poolB || poolA.token0.equals(poolB.token0) && poolA.token1.equals(poolB.token1) && poolA.fee === poolB.fee;
}

function computeAllRoutes(currencyIn, currencyOut, pools, chainId) {
  var currentPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var allPaths = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var startCurrencyIn = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : currencyIn;
  var maxHops = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 2;
  var tokenIn = currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.wrapped;
  var tokenOut = currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.wrapped;
  if (!tokenIn || !tokenOut) throw new Error('Missing tokenIn/tokenOut');

  var _iterator = _createForOfIteratorHelper$3(pools),
      _step;

  try {
    var _loop = function _loop() {
      var pool = _step.value;
      if (!pool.involvesToken(tokenIn) || currentPath.find(function (pathPool) {
        return poolEquals(pool, pathPool);
      })) return "continue";
      var outputToken = pool.token0.equals(tokenIn) ? pool.token1 : pool.token0;

      if (outputToken.equals(tokenOut)) {
        allPaths.push(new Route([].concat(_toConsumableArray(currentPath), [pool]), startCurrencyIn, currencyOut));
      } else if (maxHops > 1) {
        computeAllRoutes(outputToken, currencyOut, pools, chainId, [].concat(_toConsumableArray(currentPath), [pool]), allPaths, startCurrencyIn, maxHops - 1);
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return allPaths;
}
/**
 * Returns all the routes from an input currency to an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */


function useAllV3Routes(currencyIn, currencyOut) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var _useV3SwapPools = useV3SwapPools(currencyIn, currencyOut),
      pools = _useV3SwapPools.pools,
      poolsLoading = _useV3SwapPools.loading;

  return useMemo(function () {
    if (poolsLoading || !chainId || !pools || !currencyIn || !currencyOut) return {
      loading: true,
      routes: []
    };
    var routes = computeAllRoutes(currencyIn, currencyOut, pools, chainId, [], [], currencyIn, 2);
    return {
      loading: false,
      routes: routes
    };
  }, [chainId, currencyIn, currencyOut, pools, poolsLoading]);
}

var _QUOTE_GAS_OVERRIDES;
var QUOTE_GAS_OVERRIDES = (_QUOTE_GAS_OVERRIDES = {}, _defineProperty(_QUOTE_GAS_OVERRIDES, SupportedChainId.ARBITRUM_ONE, 25000000), _defineProperty(_QUOTE_GAS_OVERRIDES, SupportedChainId.ARBITRUM_RINKEBY, 25000000), _QUOTE_GAS_OVERRIDES);
var DEFAULT_GAS_QUOTE = 2000000;
/**
 * Returns the best v3 trade for a desired swap
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */

function useClientSideV3Trade(tradeType, amountSpecified, otherCurrency) {
  var _QUOTE_GAS_OVERRIDES$;

  var _useMemo = useMemo(function () {
    return tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency];
  }, [tradeType, amountSpecified, otherCurrency]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      currencyIn = _useMemo2[0],
      currencyOut = _useMemo2[1];

  var _useAllV3Routes = useAllV3Routes(currencyIn, currencyOut),
      routes = _useAllV3Routes.routes,
      routesLoading = _useAllV3Routes.loading;

  var quoter = useV3Quoter();

  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var quotesResults = useSingleContractWithCallData(quoter, amountSpecified ? routes.map(function (route) {
    return SwapQuoter.quoteCallParameters(route, amountSpecified, tradeType).calldata;
  }) : [], {
    gasRequired: chainId ? (_QUOTE_GAS_OVERRIDES$ = QUOTE_GAS_OVERRIDES[chainId]) !== null && _QUOTE_GAS_OVERRIDES$ !== void 0 ? _QUOTE_GAS_OVERRIDES$ : DEFAULT_GAS_QUOTE : undefined
  });
  return useMemo(function () {
    if (!amountSpecified || !currencyIn || !currencyOut || quotesResults.some(function (_ref) {
      var valid = _ref.valid;
      return !valid;
    }) || ( // skip when tokens are the same
    tradeType === TradeType.EXACT_INPUT ? amountSpecified.currency.equals(currencyOut) : amountSpecified.currency.equals(currencyIn))) {
      return {
        state: TradeState.INVALID,
        trade: undefined
      };
    }

    if (routesLoading || quotesResults.some(function (_ref2) {
      var loading = _ref2.loading;
      return loading;
    })) {
      return {
        state: TradeState.LOADING,
        trade: undefined
      };
    }

    var _quotesResults$reduce = quotesResults.reduce(function (currentBest, _ref3, i) {
      var result = _ref3.result;
      if (!result) return currentBest; // overwrite the current best if it's not defined or if this route is better

      // overwrite the current best if it's not defined or if this route is better
      if (tradeType === TradeType.EXACT_INPUT) {
        var _amountOut = CurrencyAmount.fromRawAmount(currencyOut, result.amountOut.toString());

        if (currentBest.amountOut === null || JSBI.lessThan(currentBest.amountOut.quotient, _amountOut.quotient)) {
          return {
            bestRoute: routes[i],
            amountIn: amountSpecified,
            amountOut: _amountOut
          };
        }
      } else {
        var _amountIn = CurrencyAmount.fromRawAmount(currencyIn, result.amountIn.toString());

        if (currentBest.amountIn === null || JSBI.greaterThan(currentBest.amountIn.quotient, _amountIn.quotient)) {
          return {
            bestRoute: routes[i],
            amountIn: _amountIn,
            amountOut: amountSpecified
          };
        }
      }

      return currentBest;
    }, {
      bestRoute: null,
      amountIn: null,
      amountOut: null
    }),
        bestRoute = _quotesResults$reduce.bestRoute,
        amountIn = _quotesResults$reduce.amountIn,
        amountOut = _quotesResults$reduce.amountOut;

    if (!bestRoute || !amountIn || !amountOut) {
      return {
        state: TradeState.NO_ROUTE_FOUND,
        trade: undefined
      };
    }

    return {
      state: TradeState.VALID,
      trade: new InterfaceTrade({
        v2Routes: [],
        v3Routes: [{
          routev3: bestRoute,
          inputAmount: amountIn,
          outputAmount: amountOut
        }],
        tradeType: tradeType
      })
    };
  }, [amountSpecified, currencyIn, currencyOut, quotesResults, routes, routesLoading, tradeType]);
}

var _STABLECOIN_AMOUNT_OU;
// The amount is large enough to filter low liquidity pairs.

var STABLECOIN_AMOUNT_OUT = (_STABLECOIN_AMOUNT_OU = {}, _defineProperty(_STABLECOIN_AMOUNT_OU, SupportedChainId.MAINNET, CurrencyAmount.fromRawAmount(USDC_MAINNET, 100000e6)), _defineProperty(_STABLECOIN_AMOUNT_OU, SupportedChainId.ARBITRUM_ONE, CurrencyAmount.fromRawAmount(USDC_ARBITRUM, 10000e6)), _defineProperty(_STABLECOIN_AMOUNT_OU, SupportedChainId.OPTIMISM, CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 10000e18)), _defineProperty(_STABLECOIN_AMOUNT_OU, SupportedChainId.POLYGON, CurrencyAmount.fromRawAmount(USDC_POLYGON, 10000e6)), _STABLECOIN_AMOUNT_OU);
/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */

function useUSDCPrice(currency) {
  var chainId = currency === null || currency === void 0 ? void 0 : currency.chainId;
  var amountOut = chainId ? STABLECOIN_AMOUNT_OUT[chainId] : undefined;
  var stablecoin = amountOut === null || amountOut === void 0 ? void 0 : amountOut.currency; // TODO(#2808): remove dependency on useBestV2Trade

  var v2USDCTrade = useBestV2Trade(TradeType.EXACT_OUTPUT, amountOut, currency, {
    maxHops: 2
  });
  var v3USDCTrade = useClientSideV3Trade(TradeType.EXACT_OUTPUT, amountOut, currency);
  return useMemo(function () {
    if (!currency || !stablecoin) {
      return undefined;
    } // handle usdc


    if (currency !== null && currency !== void 0 && currency.wrapped.equals(stablecoin)) {
      return new Price(stablecoin, stablecoin, '1', '1');
    } // use v2 price if available, v3 as fallback


    if (v2USDCTrade) {
      var _v2USDCTrade$route$mi = v2USDCTrade.route.midPrice,
          numerator = _v2USDCTrade$route$mi.numerator,
          denominator = _v2USDCTrade$route$mi.denominator;
      return new Price(currency, stablecoin, denominator, numerator);
    } else if (v3USDCTrade.trade) {
      var _v3USDCTrade$trade$ro = v3USDCTrade.trade.routes[0].midPrice,
          _numerator = _v3USDCTrade$trade$ro.numerator,
          _denominator = _v3USDCTrade$trade$ro.denominator;
      return new Price(currency, stablecoin, _denominator, _numerator);
    }

    return undefined;
  }, [currency, stablecoin, v2USDCTrade, v3USDCTrade.trade]);
}
function useUSDCValue(currencyAmount) {
  var price = useUSDCPrice(currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency);
  return useMemo(function () {
    if (!price || !currencyAmount) return null;

    try {
      return price.quote(currencyAmount);
    } catch (error) {
      return null;
    }
  }, [currencyAmount, price]);
}
/**
 *
 * @param fiatValue string representation of a USD amount
 * @returns CurrencyAmount where currency is stablecoin on active chain
 */

function useStablecoinAmountFromFiatValue(fiatValue) {
  var _STABLECOIN_AMOUNT_OU2;

  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var stablecoin = chainId ? (_STABLECOIN_AMOUNT_OU2 = STABLECOIN_AMOUNT_OUT[chainId]) === null || _STABLECOIN_AMOUNT_OU2 === void 0 ? void 0 : _STABLECOIN_AMOUNT_OU2.currency : undefined;

  if (fiatValue === null || fiatValue === undefined || !chainId || !stablecoin) {
    return undefined;
  } // trim for decimal precision when parsing


  var parsedForDecimals = parseFloat(fiatValue).toFixed(stablecoin.decimals).toString();

  try {
    // parse USD string into CurrencyAmount based on stablecoin decimals
    return tryParseCurrencyAmount(parsedForDecimals, stablecoin);
  } catch (error) {
    return undefined;
  }
}

var V3_SWAP_DEFAULT_SLIPPAGE = new Percent$1(50, 10000); // .50%

var ONE_TENTHS_PERCENT = new Percent$1(10, 10000); // .10%

/**
 * Return a guess of the gas cost used in computing slippage tolerance for a given trade
 * @param trade the trade for which to _guess_ the amount of gas it would cost to execute
 */

function guesstimateGas(trade) {
  if (!!trade) {
    return 100000 + trade.swaps.reduce(function (memo, swap) {
      return swap.route.pools.length + memo;
    }, 0) * 30000;
  }

  return undefined;
}

var MIN_AUTO_SLIPPAGE_TOLERANCE = new Percent$1(5, 1000); // 0.5%

var MAX_AUTO_SLIPPAGE_TOLERANCE = new Percent$1(25, 100); // 25%

/**
 * Returns slippage tolerance based on values from current trade, gas estimates from api, and active network.
 */

function useAutoSlippageTolerance(trade) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var onL2 = chainId && L2_CHAIN_IDS.includes(chainId);
  var outputDollarValue = useUSDCValue(trade === null || trade === void 0 ? void 0 : trade.outputAmount);
  var nativeGasPrice = useGasPrice();
  var gasEstimate = guesstimateGas(trade);
  var nativeCurrency = useNativeCurrency();
  var nativeCurrencyPrice = useUSDCPrice(nativeCurrency !== null && nativeCurrency !== void 0 ? nativeCurrency : undefined);
  return useMemo(function () {
    if (!trade || onL2) return ONE_TENTHS_PERCENT;
    var nativeGasCost = nativeGasPrice && typeof gasEstimate === 'number' ? JSBI.multiply(nativeGasPrice, JSBI.BigInt(gasEstimate)) : undefined;
    var dollarGasCost = nativeCurrency && nativeGasCost && nativeCurrencyPrice ? nativeCurrencyPrice.quote(CurrencyAmount.fromRawAmount(nativeCurrency, nativeGasCost)) : undefined; // if valid estimate from api and using api trade, use gas estimate from api
    // NOTE - dont use gas estimate for L2s yet - need to verify accuracy
    // if not, use local heuristic

    var dollarCostToUse = chainId && SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId) && trade !== null && trade !== void 0 && trade.gasUseEstimateUSD ? trade.gasUseEstimateUSD : dollarGasCost;

    if (outputDollarValue && dollarCostToUse) {
      // the rationale is that a user will not want their trade to fail for a loss due to slippage that is less than
      // the cost of the gas of the failed transaction
      var fraction = dollarCostToUse.asFraction.divide(outputDollarValue.asFraction);
      var result = new Percent$1(fraction.numerator, fraction.denominator);
      if (result.greaterThan(MAX_AUTO_SLIPPAGE_TOLERANCE)) return MAX_AUTO_SLIPPAGE_TOLERANCE;
      if (result.lessThan(MIN_AUTO_SLIPPAGE_TOLERANCE)) return MIN_AUTO_SLIPPAGE_TOLERANCE;
      return result;
    }

    return V3_SWAP_DEFAULT_SLIPPAGE;
  }, [trade, onL2, nativeGasPrice, gasEstimate, nativeCurrency, nativeCurrencyPrice, chainId, outputDollarValue]);
}

/* eslint-disable @typescript-eslint/ban-types */
/**
 * Creates a derived atom whose value is the picked object property.
 * By default, the setter acts as a primitive atom's, changing the original atom.
 * A custom setter may also be passed, which uses an Immer Draft so that it may be mutated directly.
 */

function pickAtom(anAtom, key) {
  var setter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (draft, update) {
    return update;
  };
  return atom(function (get) {
    return get(anAtom)[key];
  }, function (get, set, update) {
    return set(withImmer(anAtom), function (value) {
      var derived = setter(value[key], update);
      value[key] = derived;
    });
  });
}
/** Sets a togglable atom to invert its state at the next render. */

function setTogglable(draft) {
  return !draft;
}

var initialSettings = {
  autoSlippage: true,
  maxSlippage: undefined,
  transactionTtl: undefined,
  mockTogglable: true,
  clientSideRouter: false
};
var settingsAtom = atomWithReset(initialSettings);
var autoSlippageAtom = pickAtom(settingsAtom, 'autoSlippage');
var maxSlippageAtom = pickAtom(settingsAtom, 'maxSlippage');
var transactionTtlAtom = pickAtom(settingsAtom, 'transactionTtl');
pickAtom(settingsAtom, 'mockTogglable', setTogglable);
pickAtom(settingsAtom, 'clientSideRouter');

function toPercent(maxSlippage) {
  if (!maxSlippage) return undefined;
  var numerator = Math.floor(maxSlippage * 100);
  return new Percent$1(numerator, 10000);
}
/** Returns the user-inputted max slippage. */

function useAllowedSlippage(trade) {
  var autoSlippage = useAutoSlippageTolerance(trade);
  var maxSlippage = toPercent(useAtomValue(maxSlippageAtom));
  return useAtomValue(autoSlippageAtom) ? autoSlippage : maxSlippage !== null && maxSlippage !== void 0 ? maxSlippage : autoSlippage;
}
var MAX_VALID_SLIPPAGE = new Percent$1(1, 2);
var MIN_HIGH_SLIPPAGE = new Percent$1(1, 100);
function getSlippageWarning(slippage) {
  if (slippage !== null && slippage !== void 0 && slippage.greaterThan(MAX_VALID_SLIPPAGE)) return 'error';
  if (slippage !== null && slippage !== void 0 && slippage.greaterThan(MIN_HIGH_SLIPPAGE)) return 'warning';
  return;
}

/**
 * Transforms a Routing API quote into an array of routes that can be used to create
 * a `Trade`.
 */

function computeRoutes(currencyIn, currencyOut, tradeType, quoteResult) {
  if (!quoteResult || !quoteResult.route || !currencyIn || !currencyOut) return undefined;
  if (quoteResult.route.length === 0) return [];
  var parsedTokenIn = parseToken(quoteResult.route[0][0].tokenIn);
  var parsedTokenOut = parseToken(quoteResult.route[0][quoteResult.route[0].length - 1].tokenOut);
  if (parsedTokenIn.address !== currencyIn.wrapped.address) return undefined;
  if (parsedTokenOut.address !== currencyOut.wrapped.address) return undefined;
  var parsedCurrencyIn = currencyIn.isNative ? nativeOnChain(currencyIn.chainId) : parsedTokenIn;
  var parsedCurrencyOut = currencyOut.isNative ? nativeOnChain(currencyOut.chainId) : parsedTokenOut;

  try {
    return quoteResult.route.map(function (route) {
      if (route.length === 0) {
        throw new Error('Expected route to have at least one pair or pool');
      }

      var rawAmountIn = route[0].amountIn;
      var rawAmountOut = route[route.length - 1].amountOut;

      if (!rawAmountIn || !rawAmountOut) {
        throw new Error('Expected both amountIn and amountOut to be present');
      }

      return {
        routev3: isV3Route(route) ? new Route(route.map(parsePool), parsedCurrencyIn, parsedCurrencyOut) : null,
        routev2: !isV3Route(route) ? new Route$1(route.map(parsePair), parsedCurrencyIn, parsedCurrencyOut) : null,
        inputAmount: CurrencyAmount.fromRawAmount(parsedCurrencyIn, rawAmountIn),
        outputAmount: CurrencyAmount.fromRawAmount(parsedCurrencyOut, rawAmountOut)
      };
    });
  } catch (e) {
    // `Route` constructor may throw if inputs/outputs are temporarily out of sync
    // (RTK-Query always returns the latest data which may not be the right inputs/outputs)
    // This is not fatal and will fix itself in future render cycles
    console.error(e);
    return undefined;
  }
}
function transformRoutesToTrade(route, tradeType, gasUseEstimateUSD) {
  var _route$filter$map, _route$filter$map2;

  return new InterfaceTrade({
    v2Routes: (_route$filter$map = route === null || route === void 0 ? void 0 : route.filter(function (r) {
      return r.routev2 !== null;
    }).map(function (_ref) {
      var routev2 = _ref.routev2,
          inputAmount = _ref.inputAmount,
          outputAmount = _ref.outputAmount;
      return {
        routev2: routev2,
        inputAmount: inputAmount,
        outputAmount: outputAmount
      };
    })) !== null && _route$filter$map !== void 0 ? _route$filter$map : [],
    v3Routes: (_route$filter$map2 = route === null || route === void 0 ? void 0 : route.filter(function (r) {
      return r.routev3 !== null;
    }).map(function (_ref2) {
      var routev3 = _ref2.routev3,
          inputAmount = _ref2.inputAmount,
          outputAmount = _ref2.outputAmount;
      return {
        routev3: routev3,
        inputAmount: inputAmount,
        outputAmount: outputAmount
      };
    })) !== null && _route$filter$map2 !== void 0 ? _route$filter$map2 : [],
    tradeType: tradeType,
    gasUseEstimateUSD: gasUseEstimateUSD
  });
}

var parseToken = function parseToken(_ref3) {
  var address = _ref3.address,
      chainId = _ref3.chainId,
      decimals = _ref3.decimals,
      symbol = _ref3.symbol;
  return new Token(chainId, address, parseInt(decimals.toString()), symbol);
};

var parsePool = function parsePool(_ref4) {
  var fee = _ref4.fee,
      sqrtRatioX96 = _ref4.sqrtRatioX96,
      liquidity = _ref4.liquidity,
      tickCurrent = _ref4.tickCurrent,
      tokenIn = _ref4.tokenIn,
      tokenOut = _ref4.tokenOut;
  return new Pool$1(parseToken(tokenIn), parseToken(tokenOut), parseInt(fee), sqrtRatioX96, liquidity, parseInt(tickCurrent));
};

var parsePair = function parsePair(_ref5) {
  var reserve0 = _ref5.reserve0,
      reserve1 = _ref5.reserve1;
  return new Pair(CurrencyAmount.fromRawAmount(parseToken(reserve0.token), reserve0.quotient), CurrencyAmount.fromRawAmount(parseToken(reserve1.token), reserve1.quotient));
};

function isV3Route(route) {
  return route[0].type === 'v3-pool';
}

function ownKeys$k(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$k(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$k(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$k(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var WrapType;

(function (WrapType) {
  WrapType[WrapType["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
  WrapType[WrapType["WRAP"] = 1] = "WRAP";
  WrapType[WrapType["UNWRAP"] = 2] = "UNWRAP";
})(WrapType || (WrapType = {}));

var WrapError;

(function (WrapError) {
  WrapError[WrapError["NO_ERROR"] = 0] = "NO_ERROR";
  WrapError[WrapError["ENTER_NATIVE_AMOUNT"] = 1] = "ENTER_NATIVE_AMOUNT";
  WrapError[WrapError["ENTER_WRAPPED_AMOUNT"] = 2] = "ENTER_WRAPPED_AMOUNT";
  WrapError[WrapError["INSUFFICIENT_NATIVE_BALANCE"] = 3] = "INSUFFICIENT_NATIVE_BALANCE";
  WrapError[WrapError["INSUFFICIENT_WRAPPED_BALANCE"] = 4] = "INSUFFICIENT_WRAPPED_BALANCE";
})(WrapError || (WrapError = {}));

var wrapState = atom({
  loading: false,
  error: WrapError.NO_ERROR
});
function useWrapCallback() {
  var _currencyBalances$Fie;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      account = _useActiveWeb3React.account,
      chainId = _useActiveWeb3React.chainId;

  var _useAtom = useAtom(wrapState),
      _useAtom2 = _slicedToArray(_useAtom, 2),
      _useAtom2$ = _useAtom2[0],
      loading = _useAtom2$.loading,
      error = _useAtom2$.error,
      setWrapState = _useAtom2[1];

  var wrappedNativeCurrencyContract = useWETHContract();

  var _useAtomValue = useAtomValue(swapAtom),
      amount = _useAtomValue.amount,
      independentField = _useAtomValue.independentField,
      inputCurrency = _useAtomValue[Field.INPUT],
      outputCurrency = _useAtomValue[Field.OUTPUT];

  var wrapType = useMemo(function () {
    if (!inputCurrency || !outputCurrency || !chainId) {
      return WrapType.NOT_APPLICABLE;
    }

    var wrappedNativeCurrency = WRAPPED_NATIVE_CURRENCY[chainId];

    if (inputCurrency.isNative && wrappedNativeCurrency.equals(outputCurrency)) {
      return WrapType.WRAP;
    }

    if (wrappedNativeCurrency.equals(inputCurrency) && outputCurrency.isNative) {
      return WrapType.UNWRAP;
    }

    return WrapType.NOT_APPLICABLE;
  }, [chainId, inputCurrency, outputCurrency]);
  var isExactIn = independentField === Field.INPUT;
  var parsedAmount = useMemo(function () {
    var _ref;

    return tryParseCurrencyAmount(amount, (_ref = isExactIn ? inputCurrency : outputCurrency) !== null && _ref !== void 0 ? _ref : undefined);
  }, [inputCurrency, isExactIn, outputCurrency, amount]);
  var parsedAmountIn = isExactIn ? parsedAmount : undefined;
  var relevantTokenBalances = useCurrencyBalances(account, useMemo(function () {
    return [inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined];
  }, [inputCurrency, outputCurrency]));
  var currencyBalances = useMemo(function () {
    var _ref2;

    return _ref2 = {}, _defineProperty(_ref2, Field.INPUT, relevantTokenBalances[0]), _defineProperty(_ref2, Field.OUTPUT, relevantTokenBalances[1]), _ref2;
  }, [relevantTokenBalances]);
  var hasInputAmount = Boolean(parsedAmount === null || parsedAmount === void 0 ? void 0 : parsedAmount.greaterThan('0'));
  var sufficientBalance = parsedAmountIn && !((_currencyBalances$Fie = currencyBalances[Field.INPUT]) !== null && _currencyBalances$Fie !== void 0 && _currencyBalances$Fie.lessThan(parsedAmountIn));
  useEffect(function () {
    if (sufficientBalance) {
      setWrapState(function (state) {
        return _objectSpread$k(_objectSpread$k({}, state), {}, {
          error: WrapError.NO_ERROR
        });
      });
    } else if (wrapType === WrapType.WRAP) {
      setWrapState(function (state) {
        return _objectSpread$k(_objectSpread$k({}, state), {}, {
          error: hasInputAmount ? WrapError.INSUFFICIENT_NATIVE_BALANCE : WrapError.ENTER_NATIVE_AMOUNT
        });
      });
    } else if (wrapType === WrapType.UNWRAP) {
      setWrapState(function (state) {
        return _objectSpread$k(_objectSpread$k({}, state), {}, {
          error: hasInputAmount ? WrapError.INSUFFICIENT_WRAPPED_BALANCE : WrapError.ENTER_WRAPPED_AMOUNT
        });
      });
    }
  }, [hasInputAmount, setWrapState, sufficientBalance, wrapType]);
  var callback = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (parsedAmountIn) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", Promise.reject('Must provide an input amount to wrap.'));

          case 2:
            if (!(wrapType === WrapType.NOT_APPLICABLE)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", Promise.reject('Wrapping not applicable to this asset.'));

          case 4:
            if (sufficientBalance) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", Promise.reject('Insufficient balance to wrap desired amount.'));

          case 6:
            if (wrappedNativeCurrencyContract) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", Promise.reject('Wrap contract not found.'));

          case 8:
            setWrapState(function (state) {
              return _objectSpread$k(_objectSpread$k({}, state), {}, {
                loading: true
              });
            });
            _context.next = 11;
            return wrapType === WrapType.WRAP ? wrappedNativeCurrencyContract.deposit({
              value: "0x".concat(parsedAmountIn.quotient.toString(16))
            }) : wrappedNativeCurrencyContract.withdraw("0x".concat(parsedAmountIn.quotient.toString(16)));

          case 11:
            result = _context.sent;
            // resolve loading state after one confirmation
            result.wait(1).finally(function () {
              return setWrapState(function (state) {
                return _objectSpread$k(_objectSpread$k({}, state), {}, {
                  loading: false
                });
              });
            });
            return _context.abrupt("return", Promise.resolve(result));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [wrappedNativeCurrencyContract, sufficientBalance, parsedAmountIn, wrapType, setWrapState]);
  return useMemo(function () {
    return {
      callback: callback,
      error: error,
      loading: loading,
      type: wrapType
    };
  }, [callback, error, loading, wrapType]);
}

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// from routing-api (https://github.com/Uniswap/routing-api/blob/main/lib/handlers/quote/quote.ts#L243-L311)
function transformSwapRouteToGetQuoteResult(type, amount, _ref) {
  var quote = _ref.quote,
      quoteGasAdjusted = _ref.quoteGasAdjusted,
      route = _ref.route,
      estimatedGasUsed = _ref.estimatedGasUsed,
      estimatedGasUsedQuoteToken = _ref.estimatedGasUsedQuoteToken,
      estimatedGasUsedUSD = _ref.estimatedGasUsedUSD,
      gasPriceWei = _ref.gasPriceWei,
      methodParameters = _ref.methodParameters,
      blockNumber = _ref.blockNumber;
  var routeResponse = [];

  var _iterator = _createForOfIteratorHelper$2(route),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var subRoute = _step.value;
      var _amount = subRoute.amount,
          _quote = subRoute.quote,
          tokenPath = subRoute.tokenPath;

      if (subRoute.protocol === Protocol.V3) {
        var pools = subRoute.route.pools;
        var curRoute = [];

        for (var i = 0; i < pools.length; i++) {
          var nextPool = pools[i];
          var tokenIn = tokenPath[i];
          var tokenOut = tokenPath[i + 1];
          var edgeAmountIn = undefined;

          if (i === 0) {
            edgeAmountIn = type === 'exactIn' ? _amount.quotient.toString() : _quote.quotient.toString();
          }

          var edgeAmountOut = undefined;

          if (i === pools.length - 1) {
            edgeAmountOut = type === 'exactIn' ? _quote.quotient.toString() : _amount.quotient.toString();
          }

          curRoute.push({
            type: 'v3-pool',
            tokenIn: {
              chainId: tokenIn.chainId,
              decimals: tokenIn.decimals,
              address: tokenIn.address,
              symbol: tokenIn.symbol
            },
            tokenOut: {
              chainId: tokenOut.chainId,
              decimals: tokenOut.decimals,
              address: tokenOut.address,
              symbol: tokenOut.symbol
            },
            fee: nextPool.fee.toString(),
            liquidity: nextPool.liquidity.toString(),
            sqrtRatioX96: nextPool.sqrtRatioX96.toString(),
            tickCurrent: nextPool.tickCurrent.toString(),
            amountIn: edgeAmountIn,
            amountOut: edgeAmountOut
          });
        }

        routeResponse.push(curRoute);
      } else if (subRoute.protocol === Protocol.V2) {
        var _pools = subRoute.route.pairs;
        var _curRoute = [];

        for (var _i = 0; _i < _pools.length; _i++) {
          var _nextPool = _pools[_i];
          var _tokenIn = tokenPath[_i];
          var _tokenOut = tokenPath[_i + 1];
          var _edgeAmountIn = undefined;

          if (_i === 0) {
            _edgeAmountIn = type === 'exactIn' ? _amount.quotient.toString() : _quote.quotient.toString();
          }

          var _edgeAmountOut = undefined;

          if (_i === _pools.length - 1) {
            _edgeAmountOut = type === 'exactIn' ? _quote.quotient.toString() : _amount.quotient.toString();
          }

          var reserve0 = _nextPool.reserve0;
          var reserve1 = _nextPool.reserve1;

          _curRoute.push({
            type: 'v2-pool',
            tokenIn: {
              chainId: _tokenIn.chainId,
              decimals: _tokenIn.decimals,
              address: _tokenIn.address,
              symbol: _tokenIn.symbol
            },
            tokenOut: {
              chainId: _tokenOut.chainId,
              decimals: _tokenOut.decimals,
              address: _tokenOut.address,
              symbol: _tokenOut.symbol
            },
            reserve0: {
              token: {
                chainId: reserve0.currency.wrapped.chainId,
                decimals: reserve0.currency.wrapped.decimals,
                address: reserve0.currency.wrapped.address,
                symbol: reserve0.currency.wrapped.symbol
              },
              quotient: reserve0.quotient.toString()
            },
            reserve1: {
              token: {
                chainId: reserve1.currency.wrapped.chainId,
                decimals: reserve1.currency.wrapped.decimals,
                address: reserve1.currency.wrapped.address,
                symbol: reserve1.currency.wrapped.symbol
              },
              quotient: reserve1.quotient.toString()
            },
            amountIn: _edgeAmountIn,
            amountOut: _edgeAmountOut
          });
        }

        routeResponse.push(_curRoute);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var result = {
    methodParameters: methodParameters,
    blockNumber: blockNumber.toString(),
    amount: amount.quotient.toString(),
    amountDecimals: amount.toExact(),
    quote: quote.quotient.toString(),
    quoteDecimals: quote.toExact(),
    quoteGasAdjusted: quoteGasAdjusted.quotient.toString(),
    quoteGasAdjustedDecimals: quoteGasAdjusted.toExact(),
    gasUseEstimateQuote: estimatedGasUsedQuoteToken.quotient.toString(),
    gasUseEstimateQuoteDecimals: estimatedGasUsedQuoteToken.toExact(),
    gasUseEstimate: estimatedGasUsed.toString(),
    gasUseEstimateUSD: estimatedGasUsedUSD.toExact(),
    gasPriceWei: gasPriceWei.toString(),
    route: routeResponse,
    routeString: routeAmountsToString(route)
  };
  return result;
}

Object.values(ChainId).filter(function (chainId) {
  return Number.isInteger(chainId);
});

function getQuote(_x, _x2, _x3) {
  return _getQuote.apply(this, arguments);
}

function _getQuote() {
  _getQuote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref, routerParams, routerConfig) {
    var type, tokenIn, tokenOut, amountRaw, router, currencyIn, currencyOut, baseCurrency, quoteCurrency, amount, swapRoute;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _ref.type, tokenIn = _ref.tokenIn, tokenOut = _ref.tokenOut, amountRaw = _ref.amount;
            router = new AlphaRouter(routerParams);
            currencyIn = new Token(tokenIn.chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol);
            currencyOut = new Token(tokenOut.chainId, tokenOut.address, tokenOut.decimals, tokenOut.symbol);
            baseCurrency = type === 'exactIn' ? currencyIn : currencyOut;
            quoteCurrency = type === 'exactIn' ? currencyOut : currencyIn;
            amount = CurrencyAmount.fromRawAmount(baseCurrency, JSBI.BigInt(amountRaw));
            _context.next = 9;
            return router.route(amount, quoteCurrency, type === 'exactIn' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT,
            /*swapConfig=*/
            undefined, routerConfig);

          case 9:
            swapRoute = _context.sent;

            if (swapRoute) {
              _context.next = 12;
              break;
            }

            throw new Error('Failed to generate client side quote');

          case 12:
            return _context.abrupt("return", {
              data: transformSwapRouteToGetQuoteResult(type, amount, swapRoute)
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getQuote.apply(this, arguments);
}

function getClientSideQuote(_x4, _x5, _x6) {
  return _getClientSideQuote.apply(this, arguments);
}

function _getClientSideQuote() {
  _getClientSideQuote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref2, routerParams, routerConfig) {
    var tokenInAddress, tokenInChainId, tokenInDecimals, tokenInSymbol, tokenOutAddress, tokenOutChainId, tokenOutDecimals, tokenOutSymbol, amount, type;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tokenInAddress = _ref2.tokenInAddress, tokenInChainId = _ref2.tokenInChainId, tokenInDecimals = _ref2.tokenInDecimals, tokenInSymbol = _ref2.tokenInSymbol, tokenOutAddress = _ref2.tokenOutAddress, tokenOutChainId = _ref2.tokenOutChainId, tokenOutDecimals = _ref2.tokenOutDecimals, tokenOutSymbol = _ref2.tokenOutSymbol, amount = _ref2.amount, type = _ref2.type;
            return _context2.abrupt("return", getQuote({
              type: type,
              chainId: tokenInChainId,
              tokenIn: {
                address: tokenInAddress,
                chainId: tokenInChainId,
                decimals: tokenInDecimals,
                symbol: tokenInSymbol
              },
              tokenOut: {
                address: tokenOutAddress,
                chainId: tokenOutChainId,
                decimals: tokenOutDecimals,
                symbol: tokenOutSymbol
              },
              amount: amount
            }, routerParams, routerConfig));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getClientSideQuote.apply(this, arguments);
}

/**
 * Returns query arguments for the Routing API query or undefined if the
 * query should be skipped. Input arguments do not need to be memoized, as they will
 * be destructured.
 */

function useRoutingAPIArguments(_ref) {
  var tokenIn = _ref.tokenIn,
      tokenOut = _ref.tokenOut,
      amount = _ref.amount,
      tradeType = _ref.tradeType,
      useClientSideRouter = _ref.useClientSideRouter;
  return useMemo(function () {
    return !tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut) ? undefined : {
      amount: amount.quotient.toString(),
      tokenInAddress: tokenIn.wrapped.address,
      tokenInChainId: tokenIn.wrapped.chainId,
      tokenInDecimals: tokenIn.wrapped.decimals,
      tokenInSymbol: tokenIn.wrapped.symbol,
      tokenOutAddress: tokenOut.wrapped.address,
      tokenOutChainId: tokenOut.wrapped.chainId,
      tokenOutDecimals: tokenOut.wrapped.decimals,
      tokenOutSymbol: tokenOut.wrapped.symbol,
      useClientSideRouter: useClientSideRouter,
      type: tradeType === TradeType.EXACT_INPUT ? 'exactIn' : 'exactOut'
    };
  }, [amount, tokenIn, tokenOut, tradeType, useClientSideRouter]);
}

var _DistributionPercents;
/**
 * Reduces client-side latency by increasing the minimum percentage of the input token to use for each route in a split route while SOR is used client-side.
 * Defaults are defined in https://github.com/Uniswap/smart-order-router/blob/309e6f6603984d3b5aef0733b0cfaf129c29f602/src/routers/alpha-router/config.ts#L83.
 */

var DistributionPercents = (_DistributionPercents = {}, _defineProperty(_DistributionPercents, ChainId.MAINNET, 10), _defineProperty(_DistributionPercents, ChainId.OPTIMISM, 10), _defineProperty(_DistributionPercents, ChainId.OPTIMISTIC_KOVAN, 10), _defineProperty(_DistributionPercents, ChainId.ARBITRUM_ONE, 25), _defineProperty(_DistributionPercents, ChainId.ARBITRUM_RINKEBY, 25), _DistributionPercents);
var DEFAULT_DISTRIBUTION_PERCENT = 10;

function getConfig(chainId) {
  var _ref;

  return {
    // Limit to only V2 and V3.
    protocols: [Protocol.V2, Protocol.V3],
    distributionPercent: (_ref = chainId && DistributionPercents[chainId]) !== null && _ref !== void 0 ? _ref : DEFAULT_DISTRIBUTION_PERCENT
  };
}

function useClientSideSmartOrderRouterTrade(tradeType, amountSpecified, otherCurrency) {
  var _useStablecoinAmountF;

  // Debounce is used to prevent excessive requests to SOR, as it is data intensive.
  // This helps provide a "syncing" state the UI can reference for loading animations.
  var inputs = useMemo(function () {
    return [tradeType, amountSpecified, otherCurrency];
  }, [tradeType, amountSpecified, otherCurrency]);
  var debouncedInputs = useDebounce(inputs, 200);
  var isDebouncing = inputs !== debouncedInputs;
  var chainId = amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency.chainId;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      library = _useActiveWeb3React.library;

  var _useMemo = useMemo(function () {
    return tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency];
  }, [amountSpecified, otherCurrency, tradeType]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      currencyIn = _useMemo2[0],
      currencyOut = _useMemo2[1];

  var queryArgs = useRoutingAPIArguments({
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    tradeType: tradeType,
    useClientSideRouter: true
  });
  var params = useMemo(function () {
    return chainId && library && {
      chainId: chainId,
      provider: library
    };
  }, [chainId, library]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState({
    error: undefined
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      _useState4$ = _useState4[0],
      quoteResult = _useState4$.data,
      error = _useState4$.error,
      setResult = _useState4[1];

  var config = useMemo(function () {
    return getConfig(chainId);
  }, [chainId]);

  var _useWrapCallback = useWrapCallback(),
      wrapType = _useWrapCallback.type; // When arguments update, make a new call to SOR for updated quote


  useEffect(function () {
    if (wrapType !== WrapType.NOT_APPLICABLE) {
      return;
    }

    setLoading(true);
    if (isDebouncing) return;
    var stale = false;
    fetchQuote();
    return function () {
      stale = true;
      setLoading(false);
    };

    function fetchQuote() {
      return _fetchQuote.apply(this, arguments);
    }

    function _fetchQuote() {
      _fetchQuote = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(queryArgs && params)) {
                  _context.next = 11;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return getClientSideQuote(queryArgs, params, config);

              case 4:
                result = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                result = {
                  error: true
                };

              case 10:
                if (!stale) {
                  setResult(result);
                  setLoading(false);
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }));
      return _fetchQuote.apply(this, arguments);
    }
  }, [queryArgs, params, config, isDebouncing, wrapType]);
  var route = useMemo(function () {
    return computeRoutes(currencyIn, currencyOut, tradeType, quoteResult);
  }, [currencyIn, currencyOut, quoteResult, tradeType]);
  var gasUseEstimateUSD = (_useStablecoinAmountF = useStablecoinAmountFromFiatValue(quoteResult === null || quoteResult === void 0 ? void 0 : quoteResult.gasUseEstimateUSD)) !== null && _useStablecoinAmountF !== void 0 ? _useStablecoinAmountF : null;
  var trade = useMemo(function () {
    if (route) {
      try {
        return route && transformRoutesToTrade(route, tradeType, gasUseEstimateUSD);
      } catch (e) {
        console.debug('transformRoutesToTrade failed: ', e);
      }
    }

    return;
  }, [gasUseEstimateUSD, route, tradeType]);
  return useMemo(function () {
    if (!currencyIn || !currencyOut) {
      return {
        state: TradeState.INVALID,
        trade: undefined
      };
    } // Returns the last trade state while syncing/loading to avoid jank from clearing the last trade while loading.


    if (isDebouncing) {
      return {
        state: TradeState.SYNCING,
        trade: trade
      };
    } else if (loading) {
      return {
        state: TradeState.LOADING,
        trade: trade
      };
    }

    var otherAmount = undefined;

    if (quoteResult) {
      switch (tradeType) {
        case TradeType.EXACT_INPUT:
          otherAmount = CurrencyAmount.fromRawAmount(currencyOut, quoteResult.quote);
          break;

        case TradeType.EXACT_OUTPUT:
          otherAmount = CurrencyAmount.fromRawAmount(currencyIn, quoteResult.quote);
          break;
      }
    }

    if (error || !otherAmount || !route || route.length === 0 || !queryArgs) {
      return {
        state: TradeState.NO_ROUTE_FOUND,
        trade: undefined
      };
    }

    if (trade) {
      return {
        state: TradeState.VALID,
        trade: trade
      };
    }

    return {
      state: TradeState.INVALID,
      trade: undefined
    };
  }, [currencyIn, currencyOut, isDebouncing, loading, quoteResult, error, route, queryArgs, trade, tradeType]);
}

/**
 * Returns the best v2+v3 trade for a desired swap.
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */

function useBestTrade(tradeType, amountSpecified, otherCurrency) {
  var clientSORTrade = useClientSideSmartOrderRouterTrade(tradeType, amountSpecified, otherCurrency); // Use a simple client side logic as backup if SOR is not available.

  var useFallback = clientSORTrade.state === TradeState.NO_ROUTE_FOUND || clientSORTrade.state === TradeState.INVALID;
  var fallbackTrade = useClientSideV3Trade(tradeType, useFallback ? amountSpecified : undefined, useFallback ? otherCurrency : undefined);
  return useFallback ? fallbackTrade : clientSORTrade;
}

var BAD_RECIPIENT_ADDRESSES = {
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f': true,
  // v2 factory
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a': true,
  // v2 router 01
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D': true // v2 router 02

}; // from the current swap inputs, compute the best trade and return it.

function useComputeSwapInfo() {
  var _ref2, _trade$trade3, _trade$trade4;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      account = _useActiveWeb3React.account;

  var _useAtomValue = useAtomValue(swapAtom),
      independentField = _useAtomValue.independentField,
      amount = _useAtomValue.amount,
      inputCurrency = _useAtomValue[Field.INPUT],
      outputCurrency = _useAtomValue[Field.OUTPUT];

  var feeOptions = useAtomValue(feeOptionsAtom);
  var to = account;
  var relevantTokenBalances = useCurrencyBalances(account, useMemo(function () {
    return [inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined];
  }, [inputCurrency, outputCurrency]));
  var isExactIn = independentField === Field.INPUT;
  var parsedAmount = useMemo(function () {
    var _ref;

    return tryParseCurrencyAmount(amount, (_ref = isExactIn ? inputCurrency : outputCurrency) !== null && _ref !== void 0 ? _ref : undefined);
  }, [inputCurrency, isExactIn, outputCurrency, amount]); //@TODO(ianlapham): this would eventually be replaced with routing api logic.

  var trade = useBestTrade(isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT, parsedAmount, (_ref2 = isExactIn ? outputCurrency : inputCurrency) !== null && _ref2 !== void 0 ? _ref2 : undefined);
  var currencies = useMemo(function () {
    var _ref3;

    return _ref3 = {}, _defineProperty(_ref3, Field.INPUT, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined), _defineProperty(_ref3, Field.OUTPUT, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined), _ref3;
  }, [inputCurrency, outputCurrency]);
  var currencyBalances = useMemo(function () {
    var _ref4;

    return _ref4 = {}, _defineProperty(_ref4, Field.INPUT, relevantTokenBalances[0]), _defineProperty(_ref4, Field.OUTPUT, relevantTokenBalances[1]), _ref4;
  }, [relevantTokenBalances]);
  var tradeCurrencyAmounts = useMemo(function () {
    var _trade$trade, _trade$trade2, _ref5;

    return _ref5 = {}, _defineProperty(_ref5, Field.INPUT, (_trade$trade = trade.trade) === null || _trade$trade === void 0 ? void 0 : _trade$trade.inputAmount), _defineProperty(_ref5, Field.OUTPUT, (_trade$trade2 = trade.trade) === null || _trade$trade2 === void 0 ? void 0 : _trade$trade2.outputAmount), _ref5;
  }, [(_trade$trade3 = trade.trade) === null || _trade$trade3 === void 0 ? void 0 : _trade$trade3.inputAmount, (_trade$trade4 = trade.trade) === null || _trade$trade4 === void 0 ? void 0 : _trade$trade4.outputAmount]);
  var allowedSlippage = useAllowedSlippage(trade.trade);
  var inputError = useMemo(function () {
    var _trade$trade5;

    var inputError;

    if (!account) {
      inputError = /*#__PURE__*/jsx(Trans, {
        id: "Connect Wallet"
      });
    }

    if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
      var _inputError;

      inputError = (_inputError = inputError) !== null && _inputError !== void 0 ? _inputError : /*#__PURE__*/jsx(Trans, {
        id: "Select a token"
      });
    }

    if (!parsedAmount) {
      var _inputError2;

      inputError = (_inputError2 = inputError) !== null && _inputError2 !== void 0 ? _inputError2 : /*#__PURE__*/jsx(Trans, {
        id: "Enter an amount"
      });
    }

    var formattedTo = isAddress(to);

    if (!to || !formattedTo) {
      var _inputError3;

      inputError = (_inputError3 = inputError) !== null && _inputError3 !== void 0 ? _inputError3 : /*#__PURE__*/jsx(Trans, {
        id: "Enter a recipient"
      });
    } else {
      if (BAD_RECIPIENT_ADDRESSES[formattedTo]) {
        var _inputError4;

        inputError = (_inputError4 = inputError) !== null && _inputError4 !== void 0 ? _inputError4 : /*#__PURE__*/jsx(Trans, {
          id: "Invalid recipient"
        });
      }
    } // compare input balance to max input based on version


    var _ref6 = [currencyBalances[Field.INPUT], (_trade$trade5 = trade.trade) === null || _trade$trade5 === void 0 ? void 0 : _trade$trade5.maximumAmountIn(allowedSlippage)],
        balanceIn = _ref6[0],
        amountIn = _ref6[1];

    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
      inputError = /*#__PURE__*/jsx(Trans, {
        id: "Insufficient {0} balance",
        values: {
          0: amountIn.currency.symbol
        }
      });
    }

    return inputError;
  }, [account, allowedSlippage, currencies, currencyBalances, parsedAmount, to, trade.trade]);
  return useMemo(function () {
    return {
      currencies: currencies,
      currencyBalances: currencyBalances,
      inputError: inputError,
      trade: trade,
      tradeCurrencyAmounts: tradeCurrencyAmounts,
      allowedSlippage: allowedSlippage,
      feeOptions: feeOptions
    };
  }, [currencies, currencyBalances, inputError, trade, tradeCurrencyAmounts, allowedSlippage, feeOptions]);
}

var swapInfoAtom = atom({
  currencies: {},
  currencyBalances: {},
  trade: {
    state: TradeState.INVALID
  },
  tradeCurrencyAmounts: {},
  allowedSlippage: new Percent$1(0),
  feeOptions: undefined
});
function SwapInfoUpdater() {
  var setSwapInfo = useUpdateAtom(swapInfoAtom);
  var swapInfo = useComputeSwapInfo();
  useEffect(function () {
    return setSwapInfo(swapInfo);
  }, [swapInfo, setSwapInfo]);
  return null;
}
/** Requires that SwapInfoUpdater be installed in the DOM tree. **/

function useSwapInfo() {
  return useAtomValue(swapInfoAtom);
}

function useSyncConvenienceFee(_ref) {
  var convenienceFee = _ref.convenienceFee,
      convenienceFeeRecipient = _ref.convenienceFeeRecipient;

  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var updateFeeOptions = useUpdateAtom(feeOptionsAtom);
  useEffect(function () {
    if (convenienceFee && convenienceFeeRecipient) {
      if (typeof convenienceFeeRecipient === 'string') {
        updateFeeOptions({
          fee: new Percent$1(convenienceFee, 10000),
          recipient: convenienceFeeRecipient
        });
        return;
      }

      if (chainId && convenienceFeeRecipient[chainId]) {
        updateFeeOptions({
          fee: new Percent$1(convenienceFee, 10000),
          recipient: convenienceFeeRecipient[chainId]
        });
        return;
      }
    }

    updateFeeOptions(undefined);
  }, [chainId, convenienceFee, convenienceFeeRecipient, updateFeeOptions]);
}

var REGISTRAR_ABI = [{
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'resolver',
  outputs: [{
    name: 'resolverAddress',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}];
var REGISTRAR_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
var RESOLVER_ABI = [{
  constant: true,
  inputs: [{
    internalType: 'bytes32',
    name: 'node',
    type: 'bytes32'
  }],
  name: 'contenthash',
  outputs: [{
    internalType: 'bytes',
    name: '',
    type: 'bytes'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}]; // cache the resolver contracts since most of them are the public resolver

function resolverContract(resolverAddress, provider) {
  return new Contract(resolverAddress, RESOLVER_ABI, provider);
}
/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */


function resolveENSContentHash(_x, _x2) {
  return _resolveENSContentHash.apply(this, arguments);
}

function _resolveENSContentHash() {
  _resolveENSContentHash = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ensName, provider) {
    var ensRegistrarContract, hash, resolverAddress;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ensRegistrarContract = new Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider);
            hash = namehash(ensName);
            _context.next = 4;
            return ensRegistrarContract.resolver(hash);

          case 4:
            resolverAddress = _context.sent;
            return _context.abrupt("return", resolverContract(resolverAddress, provider).contenthash(hash));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _resolveENSContentHash.apply(this, arguments);
}

function hexToUint8Array(hex) {
  hex = hex.startsWith('0x') ? hex.substr(2) : hex;
  if (hex.length % 2 !== 0) throw new Error('hex must have length that is multiple of 2');
  var arr = new Uint8Array(hex.length / 2);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = parseInt(hex.substr(i * 2, 2), 16);
  }

  return arr;
}
var UTF_8_DECODER = new TextDecoder('utf-8');
/**
 * Returns the URI representation of the content hash for supported codecs
 * @param contenthash to decode
 */

function contenthashToUri(contenthash) {
  var data = hexToUint8Array(contenthash);
  var codec = getNameFromData(data);

  switch (codec) {
    case 'ipfs-ns':
      {
        var unprefixedData = rmPrefix(data);
        var cid = new CID(unprefixedData);
        return "ipfs://".concat(toB58String(cid.multihash));
      }

    case 'ipns-ns':
      {
        var _unprefixedData = rmPrefix(data);

        var _cid = new CID(_unprefixedData);

        var multihash = decode(_cid.multihash);

        if (multihash.name === 'identity') {
          return "ipns://".concat(UTF_8_DECODER.decode(multihash.digest).trim());
        } else {
          return "ipns://".concat(toB58String(_cid.multihash));
        }
      }

    default:
      throw new Error("Unrecognized codec: ".concat(codec));
  }
}

var ENS_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/;
function parseENSAddress(ensAddress) {
  var match = ensAddress.match(ENS_NAME_REGEX);
  if (!match) return undefined;
  return {
    ensName: "".concat(match[1].toLowerCase(), "eth"),
    ensPath: match[4]
  };
}

/**
 * Given a URI that may be ipfs, ipns, http, https, ar, or data protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
function uriToHttp(uri) {
  var _uri$match, _uri$match2, _uri$match3;

  var protocol = uri.split(':')[0].toLowerCase();

  switch (protocol) {
    case 'data':
      return [uri];

    case 'https':
      return [uri];

    case 'http':
      return ['https' + uri.substr(4), uri];

    case 'ipfs':
      var hash = (_uri$match = uri.match(/^ipfs:(\/\/)?(.*)$/i)) === null || _uri$match === void 0 ? void 0 : _uri$match[2];
      return ["https://cloudflare-ipfs.com/ipfs/".concat(hash, "/"), "https://ipfs.io/ipfs/".concat(hash, "/")];

    case 'ipns':
      var name = (_uri$match2 = uri.match(/^ipns:(\/\/)?(.*)$/i)) === null || _uri$match2 === void 0 ? void 0 : _uri$match2[2];
      return ["https://cloudflare-ipfs.com/ipns/".concat(name, "/"), "https://ipfs.io/ipns/".concat(name, "/")];

    case 'ar':
      var tx = (_uri$match3 = uri.match(/^ar:(\/\/)?(.*)$/i)) === null || _uri$match3 === void 0 ? void 0 : _uri$match3[2];
      return ["https://arweave.net/".concat(tx)];

    default:
      return [];
  }
}

function ownKeys$j(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$j(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$j(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$j(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var ValidationSchema;

(function (ValidationSchema) {
  ValidationSchema["LIST"] = "list";
  ValidationSchema["TOKENS"] = "tokens";
})(ValidationSchema || (ValidationSchema = {}));

var validator = new Promise( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(resolve) {
    var _yield$Promise$all, _yield$Promise$all2, ajv, schema, validator;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([import('ajv'), import('./tokenlist.schema-4c1da21e.js')]);

          case 2:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            ajv = _yield$Promise$all2[0];
            schema = _yield$Promise$all2[1];
            validator = new ajv.default({
              allErrors: true
            }).addSchema(schema, ValidationSchema.LIST) // Adds a meta scheme of Pick<TokenList, 'tokens'>
            .addSchema(_objectSpread$j(_objectSpread$j({}, schema), {}, {
              $id: schema.$id + '#tokens',
              required: ['tokens']
            }), ValidationSchema.TOKENS);
            resolve(validator);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

function getValidationErrors(validate) {
  var _validate$errors$map$, _validate$errors;

  return (_validate$errors$map$ = validate === null || validate === void 0 ? void 0 : (_validate$errors = validate.errors) === null || _validate$errors === void 0 ? void 0 : _validate$errors.map(function (error) {
    return [error.dataPath, error.message].filter(Boolean).join(' ');
  }).join('; ')) !== null && _validate$errors$map$ !== void 0 ? _validate$errors$map$ : 'unknown error';
}
/**
 * Validates an array of tokens.
 * @param json the TokenInfo[] to validate
 */


function validateTokens(_x2) {
  return _validateTokens.apply(this, arguments);
}
/**
 * Validates a token list.
 * @param json the TokenList to validate
 */

function _validateTokens() {
  _validateTokens = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(json) {
    var validate;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return validator;

          case 2:
            validate = _context2.sent.getSchema(ValidationSchema.TOKENS);

            if (!(validate !== null && validate !== void 0 && validate({
              tokens: json
            }))) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", json);

          case 5:
            throw new Error("Token list failed validation: ".concat(getValidationErrors(validate)));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _validateTokens.apply(this, arguments);
}

function validateTokenList(_x3) {
  return _validateTokenList.apply(this, arguments);
}

function _validateTokenList() {
  _validateTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(json) {
    var validate;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return validator;

          case 2:
            validate = _context3.sent.getSchema(ValidationSchema.LIST);

            if (!(validate !== null && validate !== void 0 && validate(json))) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", json);

          case 5:
            throw new Error("Token list failed validation: ".concat(getValidationErrors(validate)));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _validateTokenList.apply(this, arguments);
}

var listCache = new Map();
/** Fetches and validates a token list. */

function fetchTokenList(_x, _x2) {
  return _fetchTokenList.apply(this, arguments);
}

function _fetchTokenList() {
  _fetchTokenList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(listUrl, resolveENSContentHash) {
    var cached, urls, parsedENS, _parsedENS$ensPath, contentHashUri, message, translatedUri, _message, i, url, isLast, response, _message2, _message3, json, list;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cached = listCache === null || listCache === void 0 ? void 0 : listCache.get(listUrl); // avoid spurious re-fetches

            if (!cached) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", cached);

          case 3:
            parsedENS = parseENSAddress(listUrl);

            if (!parsedENS) {
              _context.next = 28;
              break;
            }

            _context.prev = 5;
            _context.next = 8;
            return resolveENSContentHash(parsedENS.ensName);

          case 8:
            contentHashUri = _context.sent;
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](5);
            message = "failed to resolve ENS name: ".concat(parsedENS.ensName);
            console.debug(message, _context.t0);
            throw new Error(message);

          case 16:
            _context.prev = 16;
            translatedUri = contenthashToUri(contentHashUri);
            _context.next = 25;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context["catch"](16);
            _message = "failed to translate contenthash to URI: ".concat(contentHashUri);
            console.debug(_message, _context.t1);
            throw new Error(_message);

          case 25:
            urls = uriToHttp("".concat(translatedUri).concat((_parsedENS$ensPath = parsedENS.ensPath) !== null && _parsedENS$ensPath !== void 0 ? _parsedENS$ensPath : ''));
            _context.next = 29;
            break;

          case 28:
            urls = uriToHttp(listUrl);

          case 29:
            i = 0;

          case 30:
            if (!(i < urls.length)) {
              _context.next = 64;
              break;
            }

            url = urls[i];
            isLast = i === urls.length - 1;
            response = void 0;
            _context.prev = 34;
            _context.next = 37;
            return fetch(url, {
              credentials: 'omit'
            });

          case 37:
            response = _context.sent;
            _context.next = 47;
            break;

          case 40:
            _context.prev = 40;
            _context.t2 = _context["catch"](34);
            _message2 = "failed to fetch list: ".concat(listUrl);
            console.debug(_message2, _context.t2);

            if (!isLast) {
              _context.next = 46;
              break;
            }

            throw new Error(_message2);

          case 46:
            return _context.abrupt("continue", 61);

          case 47:
            if (response.ok) {
              _context.next = 53;
              break;
            }

            _message3 = "failed to fetch list: ".concat(listUrl);
            console.debug(_message3, response.statusText);

            if (!isLast) {
              _context.next = 52;
              break;
            }

            throw new Error(_message3);

          case 52:
            return _context.abrupt("continue", 61);

          case 53:
            _context.next = 55;
            return response.json();

          case 55:
            json = _context.sent;
            _context.next = 58;
            return validateTokenList(json);

          case 58:
            list = _context.sent;
            listCache === null || listCache === void 0 ? void 0 : listCache.set(listUrl, list);
            return _context.abrupt("return", list);

          case 61:
            i++;
            _context.next = 30;
            break;

          case 64:
            throw new Error('Unrecognized list URL protocol.');

          case 65:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 11], [16, 20], [34, 40]]);
  }));
  return _fetchTokenList.apply(this, arguments);
}

var alwaysTrue = function alwaysTrue() {
  return true;
};
/** Creates a filter function that filters tokens that do not match the query. */


function getTokenFilter(query) {
  var searchingAddress = isAddress(query);

  if (searchingAddress) {
    var address = searchingAddress.toLowerCase();
    return function (t) {
      return 'address' in t && address === t.address.toLowerCase();
    };
  }

  var queryParts = query.toLowerCase().split(/\s+/).filter(function (s) {
    return s.length > 0;
  });
  if (queryParts.length === 0) return alwaysTrue;

  var match = function match(s) {
    var parts = s.toLowerCase().split(/\s+/).filter(function (s) {
      return s.length > 0;
    });
    return queryParts.every(function (p) {
      return p.length === 0 || parts.some(function (sp) {
        return sp.startsWith(p) || sp.endsWith(p);
      });
    });
  };

  return function (_ref) {
    var name = _ref.name,
        symbol = _ref.symbol;
    return Boolean(symbol && match(symbol) || name && match(name));
  };
}

/** Sorts currency amounts (descending). */

function balanceComparator(a, b) {
  if (a && b) {
    return a.greaterThan(b) ? -1 : a.equalTo(b) ? 0 : 1;
  } else if (a !== null && a !== void 0 && a.greaterThan('0')) {
    return -1;
  } else if (b !== null && b !== void 0 && b.greaterThan('0')) {
    return 1;
  }

  return 0;
}

/** Sorts tokens by currency amount (descending), then symbol (ascending). */
function tokenComparator(balances, a, b) {
  // Sorts by balances
  var balanceComparison = balanceComparator(balances[a.address], balances[b.address]);
  if (balanceComparison !== 0) return balanceComparison; // Sorts by symbol

  if (a.symbol && b.symbol) {
    return a.symbol.toLowerCase() < b.symbol.toLowerCase() ? -1 : 1;
  }

  return -1;
}
/** Sorts tokens by query, giving precedence to exact matches and partial matches. */

function useSortTokensByQuery(query, tokens) {
  return useMemo(function () {
    if (!tokens) {
      return [];
    }

    var matches = query.toLowerCase().split(/\s+/).filter(function (s) {
      return s.length > 0;
    });

    if (matches.length > 1) {
      return tokens;
    }

    var exactMatches = [];
    var symbolSubtrings = [];
    var rest = []; // sort tokens by exact match -> subtring on symbol match -> rest

    tokens.map(function (token) {
      var _token$symbol, _token$symbol2;

      if (((_token$symbol = token.symbol) === null || _token$symbol === void 0 ? void 0 : _token$symbol.toLowerCase()) === matches[0]) {
        return exactMatches.push(token);
      } else if ((_token$symbol2 = token.symbol) !== null && _token$symbol2 !== void 0 && _token$symbol2.toLowerCase().startsWith(query.toLowerCase().trim())) {
        return symbolSubtrings.push(token);
      } else {
        return rest.push(token);
      }
    });
    return [].concat(exactMatches, symbolSubtrings, rest);
  }, [tokens, query]);
}

function useQueryTokens(query, tokens) {
  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId,
      account = _useActiveWeb3React.account;

  var balances = useTokenBalances(account, tokens);
  var sortedTokens = useMemo( // Create a new array because sort is in-place and returns a referentially equivalent array.
  function () {
    return Array.from(tokens).sort(tokenComparator.bind(null, balances));
  }, [balances, tokens]);
  var debouncedQuery = useDebounce(query, 200);
  var filter = useMemo(function () {
    return getTokenFilter(debouncedQuery);
  }, [debouncedQuery]);
  var filteredTokens = useMemo(function () {
    return sortedTokens.filter(filter);
  }, [filter, sortedTokens]);
  var queriedTokens = useSortTokensByQuery(debouncedQuery, filteredTokens);
  var native = useMemo(function () {
    return chainId && nativeOnChain(chainId);
  }, [chainId]);
  return useMemo(function () {
    if (native && filter(native)) {
      return [native].concat(_toConsumableArray(queriedTokens));
    }

    return queriedTokens;
  }, [filter, native, queriedTokens]);
}

function ownKeys$i(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$i(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$i(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$i(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Token instances created from token info on a token list.
 */
var WrappedTokenInfo = /*#__PURE__*/function () {
  function WrappedTokenInfo(tokenInfo, list) {
    _classCallCheck(this, WrappedTokenInfo);

    _defineProperty(this, "isNative", false);

    _defineProperty(this, "isToken", true);

    _defineProperty(this, "_checksummedAddress", null);

    _defineProperty(this, "_tags", null);

    this.tokenInfo = tokenInfo;
    this.list = list;
  }

  _createClass(WrappedTokenInfo, [{
    key: "address",
    get: function get() {
      if (this._checksummedAddress) return this._checksummedAddress;
      var checksummedAddress = isAddress(this.tokenInfo.address);
      if (!checksummedAddress) throw new Error("Invalid token address: ".concat(this.tokenInfo.address));
      return this._checksummedAddress = checksummedAddress;
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.tokenInfo.chainId;
    }
  }, {
    key: "decimals",
    get: function get() {
      return this.tokenInfo.decimals;
    }
  }, {
    key: "name",
    get: function get() {
      return this.tokenInfo.name;
    }
  }, {
    key: "symbol",
    get: function get() {
      return this.tokenInfo.symbol;
    }
  }, {
    key: "logoURI",
    get: function get() {
      return this.tokenInfo.logoURI;
    }
  }, {
    key: "tags",
    get: function get() {
      var _this$list;

      if (this._tags !== null) return this._tags;
      if (!this.tokenInfo.tags) return this._tags = [];
      var listTags = (_this$list = this.list) === null || _this$list === void 0 ? void 0 : _this$list.tags;
      if (!listTags) return this._tags = [];
      return this._tags = this.tokenInfo.tags.map(function (tagId) {
        return _objectSpread$i(_objectSpread$i({}, listTags[tagId]), {}, {
          id: tagId
        });
      });
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return other.chainId === this.chainId && other.isToken && other.address.toLowerCase() === this.address.toLowerCase();
    }
  }, {
    key: "sortsBefore",
    value: function sortsBefore(other) {
      if (this.equals(other)) throw new Error('Addresses should not be equal');
      return this.address.toLowerCase() < other.address.toLowerCase();
    }
  }, {
    key: "wrapped",
    get: function get() {
      return this;
    }
  }]);

  return WrappedTokenInfo;
}();

var mapCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
function tokensToChainTokenMap(tokens) {
  var cached = mapCache === null || mapCache === void 0 ? void 0 : mapCache.get(tokens);
  if (cached) return cached;

  var _ref = Array.isArray(tokens) ? [undefined, tokens] : [tokens, tokens.tokens],
      _ref2 = _slicedToArray(_ref, 2),
      list = _ref2[0],
      infos = _ref2[1];

  var map = infos.reduce(function (map, info) {
    var _map$token$chainId;

    var token = new WrappedTokenInfo(info, list);

    if (((_map$token$chainId = map[token.chainId]) === null || _map$token$chainId === void 0 ? void 0 : _map$token$chainId[token.address]) !== undefined) {
      console.warn("Duplicate token skipped: ".concat(token.address));
      return map;
    }

    if (!map[token.chainId]) {
      map[token.chainId] = {};
    }

    map[token.chainId][token.address] = {
      token: token,
      list: list
    };
    return map;
  }, {});
  mapCache === null || mapCache === void 0 ? void 0 : mapCache.set(tokens, map);
  return map;
}

var DEFAULT_TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org';
var chainTokenMapAtom = atom(undefined);
function useIsTokenListLoaded() {
  return Boolean(useAtomValue(chainTokenMapAtom));
}
function useSyncTokenList() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TOKEN_LIST;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId,
      library = _useActiveWeb3React.library;

  var setChainTokenMap = useUpdateAtom(chainTokenMapAtom); // Error boundaries will not catch (non-rendering) async errors, but it should still be shown

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  if (error) throw error;
  var resolver = useCallback(function (ensName) {
    if (library && chainId === 1) {
      // TODO(zzmp): Use network resolver when wallet is not on chainId === 1.
      return resolveENSContentHash(ensName, library);
    }

    throw new Error('Could not construct mainnet ENS resolver');
  }, [chainId, library]);
  useEffect(function () {
    var stale = false;
    activateList(list);
    return function () {
      stale = true;
    };

    function activateList(_x) {
      return _activateList.apply(this, arguments);
    }

    function _activateList() {
      _activateList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(list) {
        var tokens, tokenMap;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(typeof list === 'string')) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return fetchTokenList(list, resolver);

              case 4:
                tokens = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return validateTokens(list);

              case 9:
                tokens = _context.sent;

              case 10:
                tokenMap = tokensToChainTokenMap(tokens); // also caches the fetched tokens, so it is invoked even if stale

                if (!stale) {
                  setChainTokenMap(tokenMap);
                  setError(undefined);
                }

                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);

                if (!stale) {
                  setChainTokenMap(undefined);
                  setError(_context.t0);
                }

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));
      return _activateList.apply(this, arguments);
    }
  }, [list, resolver, setChainTokenMap]);
}
function useTokenList() {
  var _useActiveWeb3React2 = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React2.chainId;

  var chainTokenMap = useAtomValue(chainTokenMapAtom);
  var tokenMap = chainId && (chainTokenMap === null || chainTokenMap === void 0 ? void 0 : chainTokenMap[chainId]);
  return useMemo(function () {
    if (!tokenMap) return [];
    return Object.values(tokenMap).map(function (_ref) {
      var token = _ref.token;
      return token;
    });
  }, [tokenMap]);
}
function useTokenMap() {
  var _useActiveWeb3React3 = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React3.chainId;

  var chainTokenMap = useAtomValue(chainTokenMapAtom);
  var tokenMap = chainId && (chainTokenMap === null || chainTokenMap === void 0 ? void 0 : chainTokenMap[chainId]);
  return useMemo(function () {
    if (!tokenMap) return {};
    return Object.entries(tokenMap).reduce(function (map, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          address = _ref3[0],
          token = _ref3[1].token;

      map[address] = token;
      return map;
    }, {});
  }, [tokenMap]);
}
function useQueryCurrencies() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return useQueryTokens(query, useTokenList());
}

var BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;

function parseStringOrBytes32(str, bytes32, defaultValue) {
  return str && str.length > 0 ? str : // need to check for proper bytes string and valid terminator
  bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0 ? parseBytes32String(bytes32) : defaultValue;
}
/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */


function useTokenFromNetwork(tokenAddress) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var formattedAddress = isAddress(tokenAddress);
  var tokenContract = useTokenContract(formattedAddress ? formattedAddress : undefined, false);
  var tokenContractBytes32 = useBytes32TokenContract(formattedAddress ? formattedAddress : undefined, false);
  var tokenName = useSingleCallResult(tokenContract, 'name', undefined, NEVER_RELOAD);
  var tokenNameBytes32 = useSingleCallResult(tokenContractBytes32, 'name', undefined, NEVER_RELOAD);
  var symbol = useSingleCallResult(tokenContract, 'symbol', undefined, NEVER_RELOAD);
  var symbolBytes32 = useSingleCallResult(tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD);
  var decimals = useSingleCallResult(tokenContract, 'decimals', undefined, NEVER_RELOAD);
  return useMemo(function () {
    if (typeof tokenAddress !== 'string' || !chainId || !formattedAddress) return undefined;
    if (decimals.loading || symbol.loading || tokenName.loading) return null;

    if (decimals.result) {
      var _symbol$result, _symbolBytes32$result, _tokenName$result, _tokenNameBytes32$res;

      return new Token(chainId, formattedAddress, decimals.result[0], parseStringOrBytes32((_symbol$result = symbol.result) === null || _symbol$result === void 0 ? void 0 : _symbol$result[0], (_symbolBytes32$result = symbolBytes32.result) === null || _symbolBytes32$result === void 0 ? void 0 : _symbolBytes32$result[0], 'UNKNOWN'), parseStringOrBytes32((_tokenName$result = tokenName.result) === null || _tokenName$result === void 0 ? void 0 : _tokenName$result[0], (_tokenNameBytes32$res = tokenNameBytes32.result) === null || _tokenNameBytes32$res === void 0 ? void 0 : _tokenNameBytes32$res[0], 'Unknown Token'));
    }

    return undefined;
  }, [formattedAddress, chainId, decimals.loading, decimals.result, symbol.loading, symbol.result, symbolBytes32.result, tokenAddress, tokenName.loading, tokenName.result, tokenNameBytes32.result]);
}
/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */

function useTokenFromMapOrNetwork(tokens, tokenAddress) {
  var address = isAddress(tokenAddress);
  var token = address ? tokens[address] : undefined;
  var tokenFromNetwork = useTokenFromNetwork(token ? undefined : address ? address : undefined);
  return tokenFromNetwork !== null && tokenFromNetwork !== void 0 ? tokenFromNetwork : token;
}
/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */

function useToken(tokenAddress) {
  var tokens = useTokenMap();
  return useTokenFromMapOrNetwork(tokens, tokenAddress);
}

function ownKeys$h(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$h(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$h(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$h(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function useDefaultToken(defaultAddress, chainId) {
  var address = undefined;

  if (typeof defaultAddress === 'string') {
    address = defaultAddress;
  } else if (_typeof(defaultAddress) === 'object' && chainId) {
    address = defaultAddress[chainId];
  }

  var token = useToken(address);

  if (chainId && address === 'NATIVE') {
    return nativeOnChain(chainId);
  }

  return token;
}

function useSyncTokenDefaults(_ref) {
  var defaultInputTokenAddress = _ref.defaultInputTokenAddress,
      defaultInputAmount = _ref.defaultInputAmount,
      defaultOutputTokenAddress = _ref.defaultOutputTokenAddress,
      defaultOutputAmount = _ref.defaultOutputAmount;
  var updateSwap = useUpdateAtom(swapAtom);

  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId;

  var defaultInputToken = useDefaultToken(defaultInputTokenAddress, chainId);
  var defaultOutputToken = useDefaultToken(defaultOutputTokenAddress, chainId);
  var setToDefaults = useCallback(function () {
    var _defaultSwapState;

    var defaultSwapState = (_defaultSwapState = {
      amount: ''
    }, _defineProperty(_defaultSwapState, Field.INPUT, defaultInputToken || undefined), _defineProperty(_defaultSwapState, Field.OUTPUT, defaultOutputToken || undefined), _defineProperty(_defaultSwapState, "independentField", Field.INPUT), _defaultSwapState);

    if (defaultInputToken && defaultInputAmount) {
      defaultSwapState.amount = defaultInputAmount.toString();
    } else if (defaultOutputToken && defaultOutputAmount) {
      defaultSwapState.independentField = Field.OUTPUT;
      defaultSwapState.amount = defaultOutputAmount.toString();
    }

    updateSwap(function (swap) {
      return _objectSpread$h(_objectSpread$h({}, swap), defaultSwapState);
    });
  }, [defaultInputAmount, defaultInputToken, defaultOutputAmount, defaultOutputToken, updateSwap]);

  var _useState = useState(chainId),
      _useState2 = _slicedToArray(_useState, 2),
      previousChainId = _useState2[0],
      setPreviousChainId = _useState2[1];

  useLayoutEffect(function () {
    setPreviousChainId(chainId);
  }, [chainId]);
  useLayoutEffect(function () {
    if (chainId && chainId !== previousChainId) {
      setToDefaults();
    }
  }, [chainId, previousChainId, setToDefaults]);
}

var TransactionType;

(function (TransactionType) {
  TransactionType[TransactionType["APPROVAL"] = 0] = "APPROVAL";
  TransactionType[TransactionType["SWAP"] = 1] = "SWAP";
  TransactionType[TransactionType["WRAP"] = 2] = "WRAP";
})(TransactionType || (TransactionType = {}));

var transactionsAtom = atomWithImmer({});

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function wait(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function waitRandom(min, max) {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
/**
 * This error is thrown if the function is cancelled before completing
 */


var CancelledError = /*#__PURE__*/function (_Error) {
  _inherits(CancelledError, _Error);

  var _super = _createSuper$4(CancelledError);

  function CancelledError() {
    var _this;

    _classCallCheck(this, CancelledError);

    _this = _super.call(this, 'Cancelled');

    _defineProperty(_assertThisInitialized(_this), "isCancelledError", true);

    return _this;
  }

  return _createClass(CancelledError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Throw this error if the function should retry
 */


var RetryableError = /*#__PURE__*/function (_Error2) {
  _inherits(RetryableError, _Error2);

  var _super2 = _createSuper$4(RetryableError);

  function RetryableError() {
    var _this2;

    _classCallCheck(this, RetryableError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "isRetryableError", true);

    return _this2;
  }

  return _createClass(RetryableError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
function retry(fn, _ref) {
  var n = _ref.n,
      minWait = _ref.minWait,
      maxWait = _ref.maxWait;
  var completed = false;
  var rejectCancelled;
  var promise = new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(resolve, reject) {
      var result;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rejectCancelled = reject;

            case 1:

              result = void 0;
              _context.prev = 3;
              _context.next = 6;
              return fn();

            case 6:
              result = _context.sent;

              if (!completed) {
                resolve(result);
                completed = true;
              }

              return _context.abrupt("break", 24);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);

              if (!completed) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("break", 24);

            case 15:
              if (!(n <= 0 || !_context.t0.isRetryableError)) {
                _context.next = 19;
                break;
              }

              reject(_context.t0);
              completed = true;
              return _context.abrupt("break", 24);

            case 19:
              n--;

            case 20:
              _context.next = 22;
              return waitRandom(minWait, maxWait);

            case 22:
              _context.next = 1;
              break;

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  return {
    promise: promise,
    cancel: function cancel() {
      if (completed) return;
      completed = true;
      rejectCancelled(new CancelledError());
    }
  };
}

var _RETRY_OPTIONS_BY_CHA;
function shouldCheck(lastBlockNumber, tx) {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  var blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  var minutesPending = (new Date().getTime() - tx.addedTime) / 60000;

  if (minutesPending > 60) {
    // every 10 blocks if pending longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending longer than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}
var RETRY_OPTIONS_BY_CHAIN_ID = (_RETRY_OPTIONS_BY_CHA = {}, _defineProperty(_RETRY_OPTIONS_BY_CHA, SupportedChainId.ARBITRUM_ONE, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), _defineProperty(_RETRY_OPTIONS_BY_CHA, SupportedChainId.ARBITRUM_RINKEBY, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), _defineProperty(_RETRY_OPTIONS_BY_CHA, SupportedChainId.OPTIMISTIC_KOVAN, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), _defineProperty(_RETRY_OPTIONS_BY_CHA, SupportedChainId.OPTIMISM, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), _RETRY_OPTIONS_BY_CHA);
var DEFAULT_RETRY_OPTIONS = {
  n: 1,
  minWait: 0,
  maxWait: 0
};
function Updater(_ref) {
  var pendingTransactions = _ref.pendingTransactions,
      onCheck = _ref.onCheck,
      onReceipt = _ref.onReceipt;

  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId,
      library = _useActiveWeb3React.library;

  var lastBlockNumber = useBlockNumber();
  var fastForwardBlockNumber = useFastForwardBlockNumber();
  var getReceipt = useCallback(function (hash) {
    var _RETRY_OPTIONS_BY_CHA2;

    if (!library || !chainId) throw new Error('No library or chainId');
    var retryOptions = (_RETRY_OPTIONS_BY_CHA2 = RETRY_OPTIONS_BY_CHAIN_ID[chainId]) !== null && _RETRY_OPTIONS_BY_CHA2 !== void 0 ? _RETRY_OPTIONS_BY_CHA2 : DEFAULT_RETRY_OPTIONS;
    return retry(function () {
      return library.getTransactionReceipt(hash).then(function (receipt) {
        if (receipt === null) {
          console.debug("Retrying tranasaction receipt for ".concat(hash));
          throw new RetryableError();
        }

        return receipt;
      });
    }, retryOptions);
  }, [chainId, library]);
  useEffect(function () {
    if (!chainId || !library || !lastBlockNumber) return;
    var cancels = Object.keys(pendingTransactions).filter(function (hash) {
      return shouldCheck(lastBlockNumber, pendingTransactions[hash]);
    }).map(function (hash) {
      var _getReceipt = getReceipt(hash),
          promise = _getReceipt.promise,
          cancel = _getReceipt.cancel;

      promise.then(function (receipt) {
        if (receipt) {
          onReceipt({
            chainId: chainId,
            hash: hash,
            receipt: receipt
          });
        } else {
          onCheck({
            chainId: chainId,
            hash: hash,
            blockNumber: lastBlockNumber
          });
        }
      }).catch(function (error) {
        if (!error.isCancelledError) {
          console.warn("Failed to get transaction receipt for ".concat(hash), error);
        }
      });
      return cancel;
    });
    return function () {
      cancels.forEach(function (cancel) {
        return cancel();
      });
    };
  }, [chainId, library, lastBlockNumber, getReceipt, fastForwardBlockNumber, onReceipt, onCheck, pendingTransactions]);
  return null;
}

function isTransactionRecent(transaction) {
  return Date.now() - transaction.addedTime < 86400000;
}

function usePendingTransactions() {
  var _ref;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId;

  var txs = useAtomValue(transactionsAtom);
  return (_ref = chainId ? txs[chainId] : null) !== null && _ref !== void 0 ? _ref : {};
}
function useAddTransaction() {
  var _useActiveWeb3React2 = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React2.chainId;

  var blockNumber = useBlockNumber();
  var updateTxs = useUpdateAtom(transactionsAtom);
  return useCallback(function (info) {
    invariant(chainId);
    var txChainId = chainId;
    var hash = info.response.hash;
    updateTxs(function (chainTxs) {
      var txs = chainTxs[txChainId] || {};
      txs[hash] = {
        addedTime: new Date().getTime(),
        lastCheckedBlockNumber: blockNumber,
        info: info
      };
      chainTxs[chainId] = txs;
    });
  }, [blockNumber, chainId, updateTxs]);
}
/** Returns the hash of a pending approval transaction, if it exists. */

function usePendingApproval(token, spender) {
  var _Object$values$find;

  var _useActiveWeb3React3 = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React3.chainId;

  var txs = useAtomValue(transactionsAtom);
  if (!chainId || !token || !spender) return undefined;
  var chainTxs = txs[chainId];
  if (!chainTxs) return undefined;
  return (_Object$values$find = Object.values(chainTxs).find(function (tx) {
    return tx && tx.receipt === undefined && tx.info.type === TransactionType.APPROVAL && tx.info.tokenAddress === token.address && tx.info.spenderAddress === spender && isTransactionRecent(tx);
  })) === null || _Object$values$find === void 0 ? void 0 : _Object$values$find.info.response.hash;
}
function TransactionsUpdater() {
  var pendingTransactions = usePendingTransactions();
  var updateTxs = useUpdateAtom(transactionsAtom);
  var onCheck = useCallback(function (_ref2) {
    var chainId = _ref2.chainId,
        hash = _ref2.hash,
        blockNumber = _ref2.blockNumber;
    updateTxs(function (txs) {
      var _txs$chainId;

      var tx = (_txs$chainId = txs[chainId]) === null || _txs$chainId === void 0 ? void 0 : _txs$chainId[hash];

      if (tx) {
        tx.lastCheckedBlockNumber = tx.lastCheckedBlockNumber ? Math.max(tx.lastCheckedBlockNumber, blockNumber) : blockNumber;
      }
    });
  }, [updateTxs]);
  var onReceipt = useCallback(function (_ref3) {
    var chainId = _ref3.chainId,
        hash = _ref3.hash,
        receipt = _ref3.receipt;
    updateTxs(function (txs) {
      var _txs$chainId2;

      var tx = (_txs$chainId2 = txs[chainId]) === null || _txs$chainId2 === void 0 ? void 0 : _txs$chainId2[hash];

      if (tx) {
        tx.receipt = receipt;
      }
    });
  }, [updateTxs]);
  return /*#__PURE__*/jsx(Updater, {
    pendingTransactions: pendingTransactions,
    onCheck: onCheck,
    onReceipt: onReceipt
  });
}

function useHasFocus(node) {
  var _node$contains, _document;

  useEffect(function () {
    if (node instanceof HTMLElement) {
      // tabIndex is required to receive blur events from non-button elements.
      node.tabIndex = node.tabIndex || -1; // Without explicitly omitting outline, Safari will now outline this node when focused.

      node.style.outline = node.style.outline || 'none';
    }
  }, [node]);

  var _useState = useState((_node$contains = node === null || node === void 0 ? void 0 : node.contains((_document = document) === null || _document === void 0 ? void 0 : _document.activeElement)) !== null && _node$contains !== void 0 ? _node$contains : false),
      _useState2 = _slicedToArray(_useState, 2),
      hasFocus = _useState2[0],
      setHasFocus = _useState2[1];

  var onFocus = useCallback(function () {
    return setHasFocus(true);
  }, []);
  var onBlur = useCallback(function (e) {
    var _node$contains2;

    return setHasFocus((_node$contains2 = node === null || node === void 0 ? void 0 : node.contains(e.relatedTarget)) !== null && _node$contains2 !== void 0 ? _node$contains2 : false);
  }, [node]);
  useEffect(function () {
    node === null || node === void 0 ? void 0 : node.addEventListener('focusin', onFocus);
    node === null || node === void 0 ? void 0 : node.addEventListener('focusout', onBlur);
    return function () {
      node === null || node === void 0 ? void 0 : node.removeEventListener('focusin', onFocus);
      node === null || node === void 0 ? void 0 : node.removeEventListener('focusout', onBlur);
    };
  }, [node, onFocus, onBlur]);
  return hasFocus;
}

function useOnSupportedNetwork() {
  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId;

  return useMemo(function () {
    return chainId && ALL_SUPPORTED_CHAIN_IDS.includes(chainId);
  }, [chainId]);
}

var UNMOUNTING = 'unmounting';
/**
 * Delays a node's unmounting so that an animation may be applied.
 * An animation *must* be applied, or the node will not unmount.
 */

function useUnmount(node) {
  useEffect(function () {
    var current = node.current;
    var parent = current === null || current === void 0 ? void 0 : current.parentElement;
    var removeChild = parent === null || parent === void 0 ? void 0 : parent.removeChild;

    if (parent && removeChild) {
      parent.removeChild = function (child) {
        if (child === current) {
          current.classList.add(UNMOUNTING);

          current.onanimationend = function () {
            removeChild.call(parent, child);
          };

          return child;
        } else {
          return removeChild.call(parent, child);
        }
      };
    }

    return function () {
      if (parent && removeChild) {
        parent.removeChild = removeChild;
      }
    };
  }, [node]);
}

var MissingTokenIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAlrSURBVHgB7Z1NbBvXEYBnlrQQpQFKpwWawilMA47RHlyLMhqol4rKSW0OkZFcGqAWjcZ2AxSwdeihRWLTsVsE6KESEKCK3CKbpnBPheVD3dxE5RLHaGoqPuTPgCnERpxDDBoI7CQWdzLzSOqP3D9yufuW2g+QRfFnJc+8N3/vvVkETSkUihlIwxBAbchKURYJdwJQFgAzQJAB5K/1EFT5uSoQVgCpSkjLRo0fQ6oMK1A2zWIVNARBE5TAt9UmyDBGgaw8P5WFQKEyIJbRgkW4nyqxQiqgAZEqoD7KawVCfIpHbR7ChLCEQK9HrYxIFFB4rpgntE6GLnR75kUZ5tyZeQiZ0BSwOtoNOAaBm5fAqCDBKfPsaRNCIhQFHDx64hhaVGxxnPoSmiJ6qgBlaozaa6DviHej54roiQLY3GRpoPYXfjgB/QCCiV+lTvXCWacgYA4+f2IS0JrnP3oI+ochSNFEbnj0Tvn/b5UhQAKbAeJkaYBOAljHob+Zxq/VbAgksQtEAQ2TswDxtfV+qbASxoIwSQZ0CQt/iLbVrsDWEb6gBlzh8B+6NrNdKUDsPf8hV2IUXgZJljB15dAR9nld0LETbsT2s7DFIY70cvvZOb/71iXogI4UoIRPNA0JTcY7VYJvBYjZSUZ+W8aH9+cr5XcXl/x8yFcUpBzugHK4CTYg1XLm2T95zhU8O+FGqHkeEhxhx7wgsvL6fk8zoJ5kbblQsxskT8h5SdY8zYB6hpsI3wdiLU56eaOrEy4cfrHAhu1lSPDLiBen7GiCtmCJIWiqDVNUsXuDowmyBlaKkAi/GzKNsrwttjNATA8hvAYJXcN505j5tzOldq+l7T7EwvfkRMLiOw9vhx/v/SHs2Z2FHTse4Z/Xyk93730JN2/eghs3P4Wlqx/Cx9eug06QgTKQd7V7re0M0Gn0P7Z7Fzw5nufvWc+f+fx2Fd65XIa3L1+B27f12I/Fgp4y505Pt3m+lckjL8oQykKEPMwj/OCzB3wJfjOiiItvluDSZS2Sd3HIuzbnBi1haD3shAJEyMjjOTjy61/CI9/7LnTDg4MPwD42Ww8ODsL15RuwsrICEfIApuizzQW7ligoatv/i/Ex+NWzE0p4QTE2OgLHf3sIBgO8Zidw6frY5uc2KKBw5AXZxZCFiBDhi73vBY+y4z7KsypisoXnXsivf2KDAizCAkSE2PxeCb+J+JNnDvwcooTQ2GBhVhUgWS8iPAURISYiDMQcdePYuwYpr7ZpNljLA7bV8hARI48PbYjrnVi6+gEsLL6t4n6J/wUxL5IjiPP2cp0n2dRNvxJhlD1QK/C/KiRdVQABTio3EQFi+92QkHLu7//iZOtWy2s3VBJ2ixVzSV3rCR7lTsgMkK+Pr1UgCohQLI1SgApD1QJC2opkjVdGv4xcJ0T4L//5r+q7ExJmvv/BNfV4z+5dju+VzPrS5UA3uXkHIZvb+8RMuVz6su4DIjQ/O3Z83/F1EfoMm4umufGCJF8fuYxumQGRhqXbamrfrFKAFeFBCbd4/x3OYj/voJzwz3Puq6ePucySniJHsaChACRjH0TE0tX3HV/v1EyI0txmgVfH3wuofg4ODBUSIUW2k/k9jmrsBHXxzYWORv/6azsh0VOEZEX2BqRXIt9GLjb+P+uELRHNG+fm+bkSdMPde/dAa1j2aTBQi3384jgvdinw2MGyNzg3zkKfsscl473nI7LqCUhZw1Knz/sPqS15yS8ixcKsgYDfhj5DhO+ltvSeSwTWawhxpyHTAPqIpvDdQkxx9JHPAKCM1IL65nCFmJynD4x7WsyRupEG9IcC/C7cy8jXZJ04k4YY08mOCakpzbyixYYPRSwV0KygdrKwIjWi6G3/GrFTQDfrxlLaWHIpT4SNKECGQyz8gJSPOxG+mJ1/n/9vdPV/e6qxUsCjLmsH7XBaSdMAVgBhlXMBiAN+F1Bk7VjqS3ejLjnYQVhJE9AyQjwaa8imW6nfuClCytti76Na8/UKAt1JcypcIYjHDBDhS9nabm9PXAS/ikGVNJufCsQIyWBFEfnRn8IPeEFFzIssW0p0ExvBNxETBBaVuS4NcUKiGQ0jGv+w7A1YSffB/ySmsOyNxn71CiSEDKpuvvVdEYCLkBAqiKQsT31jFlEJEsJFWihDUwH3U/OQEC6pVEm+KQUoP0BYgoRwYFmbs/XD26vnA9gmXYCEUFBNwxuslaO/TpngcqpbF5onKOW8sCw/SgL2D67z63Ik1ZWG+RE2ZGCTh08saNTRvC0i/N//7vmWdV/JjuXQhaZVz1W47nnBPHt6ovmzsfFF6xRozjM2i+5SoIv6/JcnkMz1P25QgOpngHLbD33Zt/dHtq9FevbLCyzbzfcoaDknjEQzoDGRbyfsArSoxcK0tqsRZ1xfJdOSTxxsvNbVUBn9bdrgtyhAcgL2zNr6AtnV0G4WSFn6jXP69hRsN/rV83YfmDx64jqXKLKgIbLt8Gl2uNIHQgQvkY8sumsbAfHof/3Vl9qeh7LdloI16xAZuAAa0lxojwt2o1+wbVnW6PCU1Ii6BJGtusMtUBx7xqGRmgKNHbL2SEiPKUd/6ti2svy/UjU3PPoZe4oJSPANZ71T5txLJaf3uPYNlXum5IZ/tp21OQIJnuHi5gwnXa79Vr31jr6fLuqeIWuFyGowXfTyVk8KULkBGtJRI/EHbrDwRVbmtLeb/PhrX3+4OESYtK93AimVM88Wg29fL8iF2bGE01kphqABh/wIX/B9Bw3llPeP3uGH45CwCoI1Zb56xvedRTq6h4y0XkyUsIYS/twfO+q31PFdlJQShkeXt3qOoMxOByN/9fPQJcoxG9Z5XQt3PaTKDnfMr83fTDC3MvxNMUtkLWwZJTRDzVkNbmUoyB+CXxk53VfTgkAyXBw0ckEIX10PAkZ1XjfwZB/Ohirb+ylzNtibOwd+P2EVpv5k7AKStZ31G4ujT27wKJ3nyvABc9a5sNbhtXtH7GeD2HpemLK7+0UgvwJCIIaK4HVx61Snsb0fQj2bpL0i1IjnQOKhlOm1mNb1r4QIkDb59VbJmiRxhCXZFdhLU2NHpKfzJH+AWi2vlBH2nlQldLoQ5mhvhzbHI5vKEEWQNJINvpcpr88aJbTuL8K3BuajFPp6tD2fWjhezMAX0tOUQ9kUcaaNO3nUZhot1jLQ2t+iqr7qrRc4U6VlqMkqHpXhoXRZF4Fv5huBn+mZ1fAVaAAAAABJRU5ErkJggg==";

var _defs, _path$2;

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var SvgAutoRouter = function SvgAutoRouter(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$7({
    width: 23,
    height: 20,
    viewBox: "0 0 23 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "gradient",
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 0,
    gradientTransform: "rotate(95)"
  }, /*#__PURE__*/React.createElement("stop", {
    id: "stop1",
    offset: 0,
    stopColor: "#2274E2"
  }), /*#__PURE__*/React.createElement("stop", {
    id: "stop1",
    offset: 0.5,
    stopColor: "#2274E2"
  }), /*#__PURE__*/React.createElement("stop", {
    id: "stop2",
    offset: 1,
    stopColor: "#3FB672"
  })))), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
    d: "M16 16C10 16 9 10 5 10M16 16C16 17.6569 17.3431 19 19 19C20.6569 19 22 17.6569 22 16C22 14.3431 20.6569 13 19 13C17.3431 13 16 14.3431 16 16ZM5 10C9 10 10 4 16 4M5 10H1.5M16 4C16 5.65685 17.3431 7 19 7C20.6569 7 22 5.65685 22 4C22 2.34315 20.6569 1 19 1C17.3431 1 16 2.34315 16 4Z",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    stroke: "url(#gradient)"
  })));
};

var _circle$2, _path$1;

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var SvgCheck = function SvgCheck(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$6({
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _circle$2 || (_circle$2 = /*#__PURE__*/React.createElement("circle", {
    cx: 10,
    cy: 10,
    r: 10
  })), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
    d: "M14 7L8.5 12.5L6 10",
    stroke: "white",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
};

var _polyline, _polyline2;

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

var SvgExpando = function SvgExpando(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _polyline || (_polyline = /*#__PURE__*/React.createElement("polyline", {
    className: "left",
    points: "18 15 12 9"
  })), _polyline2 || (_polyline2 = /*#__PURE__*/React.createElement("polyline", {
    className: "right",
    points: "12 9 6 15"
  })));
};

var _mask$1, _circle$1, _circle2, _circle3;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var SvgInlineSpinner = function SvgInlineSpinner(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _mask$1 || (_mask$1 = /*#__PURE__*/React.createElement("mask", {
    id: "mask"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 10,
    fill: "black",
    stroke: "black",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("rect", {
    width: 12,
    height: 12,
    fill: "white",
    strokeWidth: 0
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 2,
    cy: 12,
    r: 1,
    fill: "white",
    strokeWidth: 0
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 2,
    r: 1,
    fill: "white",
    strokeWidth: 0
  }))), _circle$1 || (_circle$1 = /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 6,
    stroke: "none"
  })), _circle2 || (_circle2 = /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 10,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  })), _circle3 || (_circle3 = /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 10,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    mask: "url(#mask)"
  })));
};

var _g;

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var SvgLogo = function SvgLogo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    viewBox: "0 0 14 15",
    fill: "black",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M4.15217 1.55141C3.96412 1.52242 3.95619 1.51902 4.04468 1.5055C4.21427 1.47958 4.61472 1.51491 4.89067 1.58012C5.53489 1.73232 6.12109 2.12221 6.74683 2.81466L6.91307 2.99862L7.15088 2.96062C8.15274 2.8006 9.17194 2.92778 10.0244 3.31918C10.2589 3.42686 10.6287 3.64121 10.6749 3.69629C10.6896 3.71384 10.7166 3.82684 10.7349 3.94742C10.7982 4.36458 10.7665 4.68434 10.6382 4.92317C10.5683 5.05313 10.5644 5.09432 10.6114 5.20554C10.6489 5.2943 10.7534 5.35999 10.8569 5.35985C11.0687 5.35956 11.2968 5.0192 11.4024 4.54561L11.4444 4.3575L11.5275 4.45109C11.9835 4.96459 12.3417 5.66488 12.4032 6.16335L12.4192 6.29332L12.3426 6.17517C12.2107 5.97186 12.0781 5.83346 11.9084 5.72183C11.6024 5.52062 11.2789 5.45215 10.4222 5.40727C9.64839 5.36675 9.21045 5.30106 8.77621 5.16032C8.03738 4.9209 7.66493 4.60204 6.78729 3.4576C6.39748 2.94928 6.15654 2.66804 5.91687 2.44155C5.37228 1.92691 4.83716 1.65701 4.15217 1.55141Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.8494 2.68637C10.8689 2.34575 10.9153 2.12108 11.0088 1.9159C11.0458 1.83469 11.0804 1.76822 11.0858 1.76822C11.0911 1.76822 11.075 1.82816 11.05 1.90142C10.9821 2.10054 10.9709 2.3729 11.0177 2.68978C11.0771 3.09184 11.1109 3.14985 11.5385 3.58416C11.739 3.78788 11.9723 4.0448 12.0568 4.15511L12.2106 4.35568L12.0568 4.21234C11.8688 4.03705 11.4364 3.6952 11.3409 3.64633C11.2768 3.61356 11.2673 3.61413 11.2278 3.65321C11.1914 3.68922 11.1837 3.74333 11.1787 3.99915C11.1708 4.39786 11.1161 4.65377 10.9842 4.90965C10.9128 5.04805 10.9015 5.01851 10.9661 4.8623C11.0143 4.74566 11.0192 4.69439 11.0189 4.30842C11.0181 3.53291 10.9255 3.34647 10.3823 3.02709C10.2447 2.94618 10.0179 2.8295 9.87839 2.76778C9.73887 2.70606 9.62805 2.6523 9.63208 2.64828C9.64746 2.63307 10.1772 2.78675 10.3905 2.86828C10.7077 2.98954 10.76 3.00526 10.7985 2.99063C10.8244 2.98082 10.8369 2.90608 10.8494 2.68637Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.51745 4.01304C4.13569 3.49066 3.89948 2.68973 3.95062 2.091L3.96643 1.90572L4.05333 1.92148C4.21652 1.95106 4.49789 2.05515 4.62964 2.13469C4.9912 2.35293 5.14773 2.64027 5.30697 3.37811C5.35362 3.59423 5.41482 3.8388 5.44298 3.9216C5.48831 4.05487 5.65962 4.36617 5.7989 4.56834C5.89922 4.71395 5.83258 4.78295 5.61082 4.76305C5.27215 4.73267 4.8134 4.41799 4.51745 4.01304Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3863 7.90088C8.60224 7.18693 7.97389 6.56721 7.97389 5.52157C7.97389 5.36769 7.97922 5.24179 7.98571 5.24179C7.99221 5.24179 8.06124 5.29257 8.1391 5.35465C8.50088 5.64305 8.906 5.76623 10.0275 5.92885C10.6875 6.02455 11.0589 6.10185 11.4015 6.21477C12.4904 6.57371 13.1641 7.30212 13.3248 8.29426C13.3715 8.58255 13.3441 9.12317 13.2684 9.4081C13.2087 9.63315 13.0263 10.0388 12.9779 10.0544C12.9645 10.0587 12.9514 10.0076 12.9479 9.93809C12.9296 9.56554 12.7402 9.20285 12.4221 8.93116C12.0604 8.62227 11.5745 8.37633 10.3863 7.90088Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.13385 8.19748C9.11149 8.06527 9.07272 7.89643 9.04769 7.82228L9.00217 7.68748L9.08672 7.7818C9.20374 7.91233 9.2962 8.07937 9.37457 8.30185C9.43438 8.47165 9.44111 8.52215 9.44066 8.79807C9.4402 9.06896 9.43273 9.12575 9.3775 9.27858C9.29042 9.51959 9.18233 9.69048 9.00097 9.87391C8.67507 10.2036 8.25607 10.3861 7.65143 10.4618C7.54633 10.4749 7.24 10.4971 6.97069 10.511C6.292 10.5461 5.84531 10.6186 5.44393 10.7587C5.38623 10.7788 5.3347 10.7911 5.32947 10.7859C5.31323 10.7698 5.58651 10.6079 5.81223 10.4998C6.1305 10.3474 6.44733 10.2643 7.15719 10.1468C7.50785 10.0887 7.86998 10.0183 7.96194 9.99029C8.83033 9.72566 9.27671 9.04276 9.13385 8.19748Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.95169 9.64109C9.71465 9.13463 9.66022 8.64564 9.79009 8.18961C9.80399 8.14088 9.82632 8.101 9.83976 8.101C9.85319 8.101 9.90913 8.13105 9.96404 8.16777C10.0733 8.24086 10.2924 8.36395 10.876 8.68023C11.6043 9.0749 12.0196 9.3805 12.302 9.72965C12.5493 10.0354 12.7023 10.3837 12.776 10.8084C12.8177 11.0489 12.7932 11.6277 12.7311 11.8699C12.5353 12.6337 12.0802 13.2336 11.4311 13.5837C11.336 13.635 11.2506 13.6771 11.2414 13.6773C11.2321 13.6775 11.2668 13.5899 11.3184 13.4827C11.5367 13.029 11.5616 12.5877 11.3965 12.0965C11.2954 11.7957 11.0893 11.4287 10.6732 10.8084C10.1893 10.0873 10.0707 9.89539 9.95169 9.64109Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.25046 12.3737C3.91252 11.8181 4.73629 11.4234 5.48666 11.3022C5.81005 11.25 6.34877 11.2707 6.64823 11.3469C7.12824 11.469 7.55763 11.7425 7.78094 12.0683C7.99918 12.3867 8.09281 12.6642 8.19029 13.2816C8.22875 13.5252 8.27057 13.7697 8.28323 13.8251C8.35644 14.1451 8.4989 14.4008 8.67544 14.5293C8.95583 14.7333 9.43865 14.7459 9.91362 14.5618C9.99423 14.5305 10.0642 14.5089 10.0691 14.5138C10.0864 14.5308 9.84719 14.6899 9.67847 14.7737C9.45143 14.8864 9.2709 14.93 9.03102 14.93C8.59601 14.93 8.23486 14.7101 7.9335 14.2616C7.87419 14.1733 7.7409 13.909 7.63729 13.6741C7.3191 12.9528 7.16199 12.7331 6.79255 12.4926C6.47104 12.2834 6.05641 12.2459 5.74449 12.3979C5.33475 12.5976 5.22043 13.118 5.51389 13.4478C5.63053 13.5789 5.84803 13.6919 6.02588 13.7139C6.35861 13.7551 6.64455 13.5035 6.64455 13.1696C6.64455 12.9528 6.56071 12.8291 6.34966 12.7344C6.0614 12.6051 5.75156 12.7562 5.75304 13.0254C5.75368 13.1402 5.80396 13.2122 5.91971 13.2643C5.99397 13.2977 5.99569 13.3003 5.93514 13.2878C5.67066 13.2333 5.6087 12.9164 5.82135 12.706C6.07667 12.4535 6.60461 12.5649 6.78591 12.9097C6.86208 13.0545 6.87092 13.3429 6.80451 13.517C6.6559 13.9068 6.22256 14.1117 5.78297 14.0002C5.48368 13.9242 5.36181 13.842 5.00097 13.4726C4.37395 12.8306 4.13053 12.7062 3.22657 12.566L3.05335 12.5391L3.25046 12.3737Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.308383 0.883984C2.40235 3.40996 3.84457 4.45213 4.00484 4.67231C4.13717 4.85412 4.08737 5.01757 3.86067 5.14567C3.7346 5.21689 3.47541 5.28905 3.34564 5.28905C3.19887 5.28905 3.14847 5.23278 3.14847 5.23278C3.06337 5.15255 3.01544 5.16658 2.5784 4.39555C1.97166 3.45981 1.46389 2.68357 1.45004 2.67057C1.41801 2.64052 1.41856 2.64153 2.51654 4.59413C2.69394 5.0011 2.55182 5.15049 2.55182 5.20845C2.55182 5.32636 2.51946 5.38834 2.37311 5.55059C2.12914 5.8211 2.02008 6.12505 1.94135 6.7541C1.8531 7.45926 1.60492 7.95737 0.917156 8.80989C0.514562 9.30893 0.448686 9.4004 0.3471 9.60153C0.219144 9.85482 0.183961 9.99669 0.169701 10.3165C0.154629 10.6547 0.183983 10.8732 0.287934 11.1965C0.378939 11.4796 0.473932 11.6665 0.716778 12.0403C0.926351 12.3629 1.04702 12.6027 1.04702 12.6965C1.04702 12.7711 1.06136 12.7712 1.38611 12.6983C2.16328 12.5239 2.79434 12.2171 3.14925 11.8411C3.36891 11.6084 3.42048 11.4799 3.42215 11.1611C3.42325 10.9525 3.41587 10.9088 3.35914 10.7888C3.2668 10.5935 3.09869 10.4311 2.72817 10.1794C2.2427 9.84953 2.03534 9.58398 1.97807 9.21878C1.93108 8.91913 1.98559 8.70771 2.25416 8.14825C2.53214 7.56916 2.60103 7.32239 2.64763 6.73869C2.67773 6.36158 2.71941 6.21286 2.82842 6.09348C2.94212 5.969 3.04447 5.92684 3.32584 5.88863C3.78457 5.82635 4.07667 5.70839 4.31677 5.48849C4.52505 5.29772 4.61221 5.11391 4.62558 4.8372L4.63574 4.62747L4.51934 4.49259C4.09783 4.00411 0.0261003 0.5 0.000160437 0.5C-0.00538105 0.5 0.133325 0.672804 0.308383 0.883984ZM1.28364 10.6992C1.37894 10.5314 1.3283 10.3158 1.16889 10.2104C1.01827 10.1109 0.78428 10.1578 0.78428 10.2875C0.78428 10.3271 0.806303 10.3559 0.855937 10.3813C0.939514 10.424 0.945581 10.4721 0.879823 10.5703C0.81323 10.6698 0.818604 10.7573 0.894991 10.8167C1.0181 10.9125 1.19237 10.8598 1.28364 10.6992Z"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4.92523 5.99865C4.70988 6.06439 4.50054 6.29124 4.43574 6.5291C4.39621 6.67421 4.41864 6.92875 4.47785 7.00736C4.57351 7.13433 4.66602 7.16778 4.91651 7.16603C5.40693 7.16263 5.83327 6.95358 5.88284 6.69224C5.92347 6.47801 5.73622 6.18112 5.4783 6.05078C5.34521 5.98355 5.06217 5.95688 4.92523 5.99865ZM5.49853 6.44422C5.57416 6.33741 5.54107 6.22198 5.41245 6.14391C5.1675 5.99525 4.79708 6.11827 4.79708 6.34826C4.79708 6.46274 4.99025 6.58765 5.16731 6.58765C5.28516 6.58765 5.44644 6.5178 5.49853 6.44422Z"
  }))));
};

var _mask, _circle;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var SvgSpinner = function SvgSpinner(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _mask || (_mask = /*#__PURE__*/React.createElement("mask", {
    id: "mask"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 10,
    stroke: "white",
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("rect", {
    width: 12,
    height: 12,
    fill: "black",
    strokeWidth: 0
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 2,
    cy: 12,
    r: 1,
    fill: "white",
    strokeWidth: 0
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 2,
    r: 1,
    fill: "white",
    strokeWidth: 0
  }))), _circle || (_circle = /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 10,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    mask: "url(#mask)"
  })));
};

var _path, _path2, _path3;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var SvgWallet = function SvgWallet(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$1({
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
    d: "M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V7Z",
    stroke: "currentColor",
    strokeWidth: 2
  })), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
    d: "M4 19H20C21.1046 19 22 18.1046 22 17V14C22 12.8954 21.1046 12 20 12H16C15.4477 12 14.9935 12.4624 14.7645 12.965C14.4438 13.6688 13.789 14.5 12 14.5C10.29 14.5 9.48213 13.7406 9.1936 13.0589C8.96576 12.5206 8.49905 12 7.91447 12H4C2.89543 12 2 12.8954 2 14V17C2 18.1046 2.89543 19 4 19Z",
    fill: "currentColor"
  })), _path3 || (_path3 = /*#__PURE__*/React.createElement("path", {
    d: "M22 13V11C22 9.89543 21.1034 9 19.9989 9C14.0294 9 9.97062 9 4.00115 9C2.89658 9 2 9.89543 2 11V13",
    stroke: "currentColor",
    strokeWidth: 2
  })));
};

var css = css$1;
var keyframes = keyframes$1;
var useTheme = useTheme$1;
var ThemedProvider = ThemeProvider$1; // nextjs imports all of styled-components/macro instead of its default. Check for and resolve this at runtime.

var styled = _styled instanceof Function ? _styled : _styled.default;

function ownKeys$g(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$g(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$g(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$g(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var black$1 = 'hsl(0, 0%, 0%)';
var white$1 = 'hsl(0, 0%, 100%)';
var light = {
  // surface
  interactive: transparentize(1 - 0.54, black$1),
  outline: transparentize(1 - 0.24, black$1),
  // text
  primary: black$1,
  secondary: transparentize(1 - 0.64, black$1),
  onInteractive: white$1
};
var dark = {
  // surface
  interactive: transparentize(1 - 0.48, white$1),
  outline: transparentize(1 - 0.12, white$1),
  // text
  primary: white$1,
  secondary: transparentize(1 - 0.6, white$1),
  onInteractive: black$1
};
function getDynamicTheme(theme, color) {
  var colors = {
    light: light,
    dark: dark
  }[readableColor(color, 'light', 'dark', false)];
  return _objectSpread$g(_objectSpread$g(_objectSpread$g({}, theme), colors), {}, {
    module: color,
    onHover: function onHover(color) {
      return color === colors.primary ? transparentize(0.4, colors.primary) : opacify(0.25, color);
    }
  });
}

function getAccessibleColor(theme, color) {
  var dynamic = getDynamicTheme(theme, color);
  var primary = dynamic.primary;
  var AAscore = hex(color, primary);
  var contrastify = hex(color, '#000') > hex(color, '#fff') ? darken : lighten;

  while (AAscore < 3) {
    color = contrastify(0.005, color);
    primary = getDynamicTheme(theme, color).primary;
    AAscore = hex(color, primary);
  }

  return color;
}

function DynamicThemeProvider(_ref) {
  var color = _ref.color,
      children = _ref.children;
  var theme = useTheme();
  var value = useMemo(function () {
    if (!color) {
      return theme;
    }

    var accessibleColor = getAccessibleColor(theme, color);
    return getDynamicTheme(theme, accessibleColor);
  }, [theme, color]);
  return /*#__PURE__*/jsx(ThemedProvider, {
    theme: value,
    children: /*#__PURE__*/jsx("div", {
      style: {
        color: value.primary
      },
      children: children
    })
  });
}

var Layer;

(function (Layer) {
  Layer[Layer["UNDERLAYER"] = -1] = "UNDERLAYER";
  Layer[Layer["OVERLAY"] = 100] = "OVERLAY";
  Layer[Layer["DIALOG"] = 1000] = "DIALOG";
  Layer[Layer["TOOLTIP"] = 2000] = "TOOLTIP";
})(Layer || (Layer = {}));

var _templateObject$C, _templateObject2$h;

function ownKeys$f(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$f(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$f(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$f(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TextWrapper = styled(Text)(_templateObject$C || (_templateObject$C = _taggedTemplateLiteral(["\n  color: ", ";\n  // Avoid the need for placeholders by setting min-height to line-height.\n  min-height: ", ";\n  // user-select is set to 'none' at the root element (Widget), but is desired for displayed data.\n  // user-select must be configured through styled-components for cross-browser compat (eg to auto-generate prefixed properties).\n  user-select: ", ";\n  white-space: ", ";\n"])), function (_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'currentColor' : _ref$color,
      theme = _ref.theme;
  return theme[color];
}, function (_ref2) {
  var lineHeight = _ref2.lineHeight;
  return lineHeight;
}, function (_ref3) {
  var userSelect = _ref3.userSelect;
  return userSelect && 'text';
}, function (_ref4) {
  var noWrap = _ref4.noWrap;
  return noWrap && 'nowrap';
});
var TransitionTextWrapper = styled(TextWrapper)(_templateObject2$h || (_templateObject2$h = _taggedTemplateLiteral(["\n  transition: font-size 0.25s ease-out, line-height 0.25s ease-out;\n"])));
function H2(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "headline headline-2",
    fontSize: 32,
    fontWeight: 400,
    lineHeight: "32px",
    noWrap: true
  }, props));
}
function Subhead1(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "subhead subhead-1",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "16px",
    noWrap: true
  }, props));
}
function Subhead2(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "subhead subhead-2",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "14px",
    noWrap: true
  }, props));
}
function Body1(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "body body-1",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: "24px"
  }, props));
}
function Body2(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "body body-2",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "20px"
  }, props));
}
function Caption$1(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "caption",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px"
  }, props));
}
function Badge$1(props) {
  return /*#__PURE__*/jsx(TextWrapper, {
    className: "badge",
    fontSize: 8,
    fontWeight: 600,
    lineHeight: "8px",
    noWrap: true
  });
}
function ButtonLarge(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "button button-large",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: "20px",
    noWrap: true
  }, props));
}
function ButtonMedium(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "button button-medium",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "16px",
    noWrap: true
  }, props));
}
function ButtonSmall(props) {
  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "button button-small",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "14px",
    noWrap: true
  }, props));
}
function TransitionButton(props) {
  var className = "button button-".concat(props.buttonSize);
  var fontSize = {
    small: 14,
    medium: 16,
    large: 20
  }[props.buttonSize];
  var lineHeight = "".concat(fontSize, "px");
  return /*#__PURE__*/jsx(TransitionTextWrapper, _objectSpread$f({
    className: className,
    fontSize: fontSize,
    fontWeight: 500,
    lineHeight: lineHeight,
    noWrap: true
  }, props));
}
function Code(props) {
  var _useTheme = useTheme(),
      fontFamilyCode = _useTheme.fontFamilyCode;

  return /*#__PURE__*/jsx(TextWrapper, _objectSpread$f({
    className: "code",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "16px",
    fontFamily: fontFamilyCode
  }, props));
}

function ownKeys$e(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$e(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$e(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$e(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var white = 'hsl(0, 0%, 100%)';
var black = 'hsl(0, 0%, 0%)';
var brandLight = 'hsl(331.3, 100%, 50%)';
var brandDark = 'hsl(215, 79%, 51.4%)';
var brand = brandLight;
var stateColors = {
  active: 'hsl(215, 79%, 51.4%)',
  success: 'hsl(145, 63.4%, 41.8%)',
  warning: 'hsl(43, 89.9%, 53.5%)',
  error: 'hsl(0, 98%, 62.2%)'
};
var lightTheme = _objectSpread$e(_objectSpread$e({
  // surface
  accent: brandLight,
  container: 'hsl(220, 23%, 97.5%)',
  module: 'hsl(231, 14%, 90%)',
  interactive: 'hsl(229, 13%, 83%)',
  outline: 'hsl(225, 7%, 78%)',
  dialog: white,
  // text
  onAccent: white,
  primary: black,
  secondary: 'hsl(227, 10%, 37.5%)',
  hint: 'hsl(224, 9%, 57%)',
  onInteractive: black
}, stateColors), {}, {
  currentColor: 'currentColor'
});
var darkTheme = _objectSpread$e(_objectSpread$e({
  // surface
  accent: brandDark,
  container: 'hsl(220, 10.7%, 11%)',
  module: 'hsl(222, 10.2%, 19.2%)',
  interactive: 'hsl(224, 10%, 28%)',
  outline: 'hsl(227, 10%, 37.5%)',
  dialog: black,
  // text
  onAccent: white,
  primary: white,
  secondary: 'hsl(224, 8.7%, 57.1%)',
  hint: 'hsl(225, 10%, 47.1%)',
  onInteractive: white
}, stateColors), {}, {
  currentColor: 'currentColor'
});
var defaultTheme = _objectSpread$e({
  borderRadius: 1,
  fontFamily: '"Inter", sans-serif',
  fontFamilyVariable: '"InterVariable", sans-serif',
  fontFamilyCode: 'IBM Plex Mono',
  tokenColorExtraction: false
}, lightTheme);
var ThemeContext = /*#__PURE__*/createContext(toComputedTheme(defaultTheme));
function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;
  var contextTheme = useContext(ThemeContext);
  var value = useMemo(function () {
    return toComputedTheme(_objectSpread$e(_objectSpread$e({}, contextTheme), theme));
  }, [contextTheme, theme]);
  return /*#__PURE__*/jsx(ThemeContext.Provider, {
    value: value,
    children: /*#__PURE__*/jsx(ThemedProvider, {
      theme: value,
      children: children
    })
  });
}

function toComputedTheme(theme) {
  return _objectSpread$e(_objectSpread$e({}, theme), {}, {
    borderRadius: clamp(Number.isFinite(theme.borderRadius) ? theme.borderRadius : theme.borderRadius ? 1 : 0),
    onHover: function onHover(color) {
      return color === theme.primary ? transparentize(0.4, theme.primary) : mix(0.16, theme.primary, color);
    }
  });

  function clamp(value) {
    return Math.min(Math.max(value, 0), 1);
  }
}

var _templateObject$B, _templateObject2$g, _templateObject3$c, _templateObject4$9, _templateObject5$5, _templateObject6$1, _templateObject7$1, _templateObject8$1, _templateObject9, _templateObject10;

function ownKeys$d(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$d(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$d(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$d(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var StyledImage = styled.img(_templateObject$B || (_templateObject$B = _taggedTemplateLiteral(["\n  height: 1em;\n  width: 1em;\n"])));

function icon(Icon) {
  return styled(Icon)(_templateObject2$g || (_templateObject2$g = _taggedTemplateLiteral(["\n    clip-path: stroke-box;\n    height: 1em;\n    stroke: ", ";\n    width: 1em;\n  "])), function (_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? 'currentColor' : _ref$color,
        theme = _ref.theme;
    return theme[color];
  });
}

var largeIconCss = css(_templateObject3$c || (_templateObject3$c = _taggedTemplateLiteral(["\n  display: flex;\n\n  svg {\n    align-self: center;\n    height: ", "em;\n    width: ", "em;\n  }\n"])), function (_ref2) {
  var iconSize = _ref2.iconSize;
  return iconSize;
}, function (_ref3) {
  var iconSize = _ref3.iconSize;
  return iconSize;
});
var LargeWrapper = styled.div(_templateObject4$9 || (_templateObject4$9 = _taggedTemplateLiteral(["\n  height: 1em;\n  width: ", "em;\n  ", "\n"])), function (_ref4) {
  var iconSize = _ref4.iconSize;
  return iconSize;
}, largeIconCss);
function LargeIcon(_ref5) {
  var Icon = _ref5.icon,
      color = _ref5.color,
      _ref5$size = _ref5.size,
      size = _ref5$size === void 0 ? 1.2 : _ref5$size,
      className = _ref5.className;
  return /*#__PURE__*/jsx(LargeWrapper, {
    color: color,
    iconSize: size,
    className: className,
    children: Icon && /*#__PURE__*/jsx(Icon, {
      color: color
    })
  });
}
var AlertTriangle = icon(AlertTriangle$1);
var ArrowDown$1 = icon(ArrowDown$2);
var ArrowRight = icon(ArrowRight$1);
var ArrowUp$1 = icon(ArrowUp$2);
var CheckCircle = icon(CheckCircle$1);
var BarChart = icon(BarChart2);
var ChevronDown = icon(ChevronDown$1);
var Clock = icon(Clock$1);
var HelpCircle = icon(HelpCircle$1);
var Info = icon(Info$1);
var Link = icon(ExternalLink$1);
var AutoRouter = icon(SvgAutoRouter);
var Settings$1 = icon(Settings$2);
icon(Slash);
icon(Trash2);
var Wallet$1 = icon(SvgWallet);
var X = icon(X$1);
var XOctagon = icon(XOctagon$1);
var MissingToken = function MissingToken(props) {
  return /*#__PURE__*/jsx(StyledImage, _objectSpread$d({
    src: MissingTokenIcon,
    alt: "Missing token"
  }, props));
};
var Check = styled(icon(SvgCheck))(_templateObject5$5 || (_templateObject5$5 = _taggedTemplateLiteral(["\n  circle {\n    fill: ", ";\n    stroke: none;\n  }\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.active;
});
var Expando = styled(icon(SvgExpando))(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral(["\n  path {\n    transition: transform 0.25s ease-in-out;\n    will-change: transform;\n\n    &:first-child {\n      transform: ", ";\n    }\n\n    &:last-child {\n      transform: ", ";\n    }\n  }\n"])), function (_ref7) {
  var open = _ref7.open;
  return open && 'translateX(-25%)';
}, function (_ref8) {
  var open = _ref8.open;
  return open && 'translateX(25%)';
});
var Logo = styled(icon(SvgLogo))(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral(["\n  fill: ", ";\n  stroke: none;\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.secondary;
});
var rotate = keyframes(_templateObject8$1 || (_templateObject8$1 = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var Spinner = styled(icon(SvgSpinner))(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  animation: 2s ", " linear infinite;\n  stroke: ", ";\n  stroke-linecap: round;\n  stroke-width: 2;\n"])), rotate, function (_ref10) {
  var _ref10$color = _ref10.color,
      color = _ref10$color === void 0 ? 'active' : _ref10$color,
      theme = _ref10.theme;
  return theme[color];
});
var InlineSpinner = styled(icon(SvgInlineSpinner))(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  animation: ", " 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;\n  color: ", ";\n  fill: ", ";\n  stroke: ", ";\n  stroke-linecap: round;\n"])), rotate, function (_ref11) {
  var _ref11$color = _ref11.color,
      color = _ref11$color === void 0 ? 'active' : _ref11$color,
      theme = _ref11.theme;
  return theme[color];
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.outline;
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.outline;
});

var _excluded$3 = ["icon", "iconProps"];

var _templateObject$A, _templateObject2$f, _templateObject3$b;

function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$c(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BaseButton = styled.button(_templateObject$A || (_templateObject$A = _taggedTemplateLiteral(["\n  background-color: transparent;\n  border: none;\n  border-radius: 0.5em;\n  color: currentColor;\n  cursor: pointer;\n  font-size: inherit;\n  font-weight: inherit;\n  height: inherit;\n  line-height: inherit;\n  margin: 0;\n  padding: 0;\n\n  :disabled {\n    cursor: initial;\n    filter: saturate(0) opacity(0.4);\n  }\n"])));
var Button$1 = styled(BaseButton)(_templateObject2$f || (_templateObject2$f = _taggedTemplateLiteral(["\n  color: ", ";\n\n  :enabled {\n    background-color: ", ";\n  }\n\n  :enabled:hover {\n    background-color: ", ";\n  }\n\n  :disabled {\n    border: 1px solid ", ";\n    color: ", ";\n    cursor: initial;\n  }\n"])), function (_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'interactive' : _ref$color,
      theme = _ref.theme;
  return color === 'interactive' && theme.onInteractive;
}, function (_ref2) {
  var _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? 'interactive' : _ref2$color,
      theme = _ref2.theme;
  return theme[color];
}, function (_ref3) {
  var _ref3$color = _ref3.color,
      color = _ref3$color === void 0 ? 'interactive' : _ref3$color,
      theme = _ref3.theme;
  return theme.onHover(theme[color]);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.outline;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.secondary;
});

var transparentButton = function transparentButton(defaultColor) {
  return styled(BaseButton)(_templateObject3$b || (_templateObject3$b = _taggedTemplateLiteral(["\n  color: ", ";\n\n  :enabled:hover {\n    color: ", ";\n  }\n"])), function (_ref6) {
    var _ref6$color = _ref6.color,
        color = _ref6$color === void 0 ? defaultColor : _ref6$color,
        theme = _ref6.theme;
    return theme[color];
  }, function (_ref7) {
    var _ref7$color = _ref7.color,
        color = _ref7$color === void 0 ? defaultColor : _ref7$color,
        theme = _ref7.theme;
    return theme.onHover(theme[color]);
  });
};

var TextButton = transparentButton('accent');
var SecondaryButton = transparentButton('secondary');
var IconButton = /*#__PURE__*/forwardRef(function IconButton(_ref8, ref) {
  var Icon = _ref8.icon,
      iconProps = _ref8.iconProps,
      props = _objectWithoutProperties(_ref8, _excluded$3);

  return /*#__PURE__*/jsx(SecondaryButton, _objectSpread$c(_objectSpread$c({}, props), {}, {
    ref: ref,
    children: /*#__PURE__*/jsx(Icon, _objectSpread$c({}, iconProps))
  }));
});

var _templateObject$z;
var Column = styled.div(_templateObject$z || (_templateObject$z = _taggedTemplateLiteral(["\n  align-items: ", ";\n  color: ", ";\n  display: ", ";\n  flex-direction: column;\n  flex-grow: ", ";\n  gap: ", ";\n  grid-auto-flow: row;\n  grid-template-columns: 1fr;\n  justify-content: ", ";\n  padding: ", ";\n\n  ", "\n"])), function (_ref) {
  var align = _ref.align;
  return align !== null && align !== void 0 ? align : 'center';
}, function (_ref2) {
  var color = _ref2.color,
      theme = _ref2.theme;
  return color && theme[color];
}, function (_ref3) {
  var flex = _ref3.flex;
  return flex ? 'flex' : 'grid';
}, function (_ref4) {
  var grow = _ref4.grow;
  return grow && 1;
}, function (_ref5) {
  var gap = _ref5.gap;
  return gap && "".concat(gap, "em");
}, function (_ref6) {
  var justify = _ref6.justify;
  return justify !== null && justify !== void 0 ? justify : 'space-between';
}, function (_ref7) {
  var padded = _ref7.padded;
  return padded && '0.75em';
}, function (_ref8) {
  var css = _ref8.css;
  return css;
});

var _templateObject$y;
var Row = styled.div(_templateObject$y || (_templateObject$y = _taggedTemplateLiteral(["\n  align-items: ", ";\n  color: ", ";\n  display: ", ";\n  flex-flow: wrap;\n  flex-grow: ", ";\n  gap: ", ";\n  grid-auto-flow: column;\n  grid-template-columns: ", ";\n  justify-content: ", ";\n  padding: ", ";\n"])), function (_ref) {
  var align = _ref.align;
  return align !== null && align !== void 0 ? align : 'center';
}, function (_ref2) {
  var color = _ref2.color,
      theme = _ref2.theme;
  return color && theme[color];
}, function (_ref3) {
  var flex = _ref3.flex;
  return flex ? 'flex' : 'grid';
}, function (_ref4) {
  var grow = _ref4.grow;
  return grow && 1;
}, function (_ref5) {
  var gap = _ref5.gap;
  return gap && "".concat(gap, "em");
}, function (_ref6) {
  var grow = _ref6.grow,
      children = _ref6.children;
  if (grow === 'first') return '1fr';
  if (grow === 'last') return "repeat(".concat(Children.count(children) - 1, ", auto) 1fr");
  if (grow) return "repeat(".concat(Children.count(children), ", 1fr)");
  return undefined;
}, function (_ref7) {
  var justify = _ref7.justify;
  return justify !== null && justify !== void 0 ? justify : 'space-between';
}, function (_ref8) {
  var pad = _ref8.pad;
  return pad && "0 ".concat(pad, "em");
});

var _templateObject$x;
var HeaderRow = styled(Row)(_templateObject$x || (_templateObject$x = _taggedTemplateLiteral(["\n  height: 1.75em;\n  margin: 0 0.75em 0.75em;\n  padding-top: 0.5em;\n  ", "\n"])), largeIconCss);
function Header$1(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return /*#__PURE__*/jsxs(HeaderRow, {
    iconSize: 1.2,
    children: [/*#__PURE__*/jsx(Row, {
      gap: 0.5,
      children: title && /*#__PURE__*/jsx(Subhead1, {
        children: title
      })
    }), /*#__PURE__*/jsx(Row, {
      gap: 1,
      children: children
    })]
  });
}

var _templateObject$w;
var Rule = styled.hr(_templateObject$w || (_templateObject$w = _taggedTemplateLiteral(["\n  border: none;\n  border-bottom: 1px solid ", ";\n  margin: 0 ", ";\n  margin-bottom: ", "px;\n  margin-top: ", "px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.outline;
}, function (_ref2) {
  var padded = _ref2.padded;
  return padded ? '0.75em' : 0;
}, function (_ref3) {
  var scrollingEdge = _ref3.scrollingEdge;
  return scrollingEdge === 'bottom' ? -1 : 0;
}, function (_ref4) {
  var scrollingEdge = _ref4.scrollingEdge;
  return scrollingEdge !== 'bottom' ? -1 : 0;
});

var _templateObject$v;
var Context = /*#__PURE__*/createContext({
  element: null,
  active: false,
  setActive: function setActive(active) {
    return undefined;
  }
});
function Provider$1(_ref) {
  var value = _ref.value,
      children = _ref.children;
  // If a Dialog is active, mark the main content inert
  var ref = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var context = {
    element: value,
    active: active,
    setActive: setActive
  };
  useEffect(function () {
    if (ref.current) {
      ref.current.inert = active;
    }
  }, [active]);
  return /*#__PURE__*/jsx("div", {
    ref: ref,
    style: {
      isolation: 'isolate'
    } // creates a new stacking context, preventing the dialog from intercepting non-dialog clicks
    ,
    children: /*#__PURE__*/jsx(Context.Provider, {
      value: context,
      children: children
    })
  });
}
var OnCloseContext = /*#__PURE__*/createContext(function () {
  return void 0;
});
function Header(_ref2) {
  var title = _ref2.title,
      children = _ref2.children,
      ruled = _ref2.ruled;
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs(Column, {
      children: [/*#__PURE__*/jsxs(Header$1, {
        title: title,
        children: [children, /*#__PURE__*/jsx(IconButton, {
          color: "primary",
          onClick: useContext(OnCloseContext),
          icon: X
        })]
      }), ruled && /*#__PURE__*/jsx(Rule, {
        padded: true
      })]
    })
  });
}
var Modal = styled.div(_templateObject$v || (_templateObject$v = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: ", "em;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  left: 0;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: ", ";\n"])), function (_ref3) {
  var color = _ref3.color,
      theme = _ref3.theme;
  return theme[color];
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.borderRadius * 0.75;
}, Layer.DIALOG);
function Dialog(_ref5) {
  var color = _ref5.color,
      children = _ref5.children,
      _ref5$onClose = _ref5.onClose,
      onClose = _ref5$onClose === void 0 ? function () {
    return void 0;
  } : _ref5$onClose;
  var context = useContext(Context);
  useEffect(function () {
    context.setActive(true);
    return function () {
      return context.setActive(false);
    };
  }, [context]);
  var dialog = useRef(null);
  useUnmount(dialog);
  useEffect(function () {
    var close = function close(e) {
      return e.key === 'Escape' && (onClose === null || onClose === void 0 ? void 0 : onClose());
    };

    document.addEventListener('keydown', close, true);
    return function () {
      return document.removeEventListener('keydown', close, true);
    };
  }, [onClose]);
  return context.element && /*#__PURE__*/createPortal( /*#__PURE__*/jsx(ThemeProvider, {
    children: /*#__PURE__*/jsx(Modal, {
      color: color,
      ref: dialog,
      children: /*#__PURE__*/jsx(OnCloseContext.Provider, {
        value: onClose,
        children: children
      })
    })
  }), context.element);
}

var _templateObject$u, _templateObject2$e, _templateObject3$a;

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$b(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BoundaryContext = /*#__PURE__*/createContext(null);
var BoundaryProvider = BoundaryContext.Provider;
var PopoverContainer = styled.div(_templateObject$u || (_templateObject$u = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 0.5em;\n  opacity: ", ";\n  padding: 8px;\n  transition: visibility 0.25s linear, opacity 0.25s linear;\n  visibility: ", ";\n  z-index: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.dialog;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.outline;
}, function (props) {
  return props.show ? 1 : 0;
}, function (props) {
  return props.show ? 'visible' : 'hidden';
}, Layer.TOOLTIP);
var Reference = styled.div(_templateObject2$e || (_templateObject2$e = _taggedTemplateLiteral(["\n  align-self: flex-start;\n  display: inline-block;\n  height: 1em;\n"])));
var Arrow = styled.div(_templateObject3$a || (_templateObject3$a = _taggedTemplateLiteral(["\n  height: 8px;\n  width: 8px;\n  z-index: ", ";\n\n  ::before {\n    background: ", ";\n    border: 1px solid ", ";\n    content: '';\n    height: 8px;\n    position: absolute;\n    transform: rotate(45deg);\n    width: 8px;\n  }\n\n  &.arrow-top {\n    bottom: -4px;\n    ::before {\n      border-radius: 1px;\n      border-left: none;\n      border-top: none;\n    }\n  }\n\n  &.arrow-bottom {\n    top: -5px; // includes -1px from border\n    ::before {\n      border-bottom: none;\n      border-right: none;\n      border-radius: 1px;\n    }\n  }\n\n  &.arrow-left {\n    right: -4px;\n    ::before {\n      border-bottom: none;\n      border-left: none;\n      border-radius: 1px;\n    }\n  }\n\n  &.arrow-right {\n    left: -5px; // includes -1px from border\n    ::before {\n      border-radius: 1px;\n      border-right: none;\n      border-top: none;\n    }\n  }\n"])), Layer.TOOLTIP, function (_ref3) {
  var theme = _ref3.theme;
  return theme.dialog;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.outline;
});
function Popover(_ref5) {
  var _attributes$popper$da, _attributes$popper;

  var content = _ref5.content,
      show = _ref5.show,
      children = _ref5.children,
      placement = _ref5.placement,
      offset = _ref5.offset,
      contained = _ref5.contained;
  var boundary = useContext(BoundaryContext);
  var reference = useRef(null); // Use callback refs to be notified when instantiated

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      popover = _useState2[0],
      setPopover = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      arrow = _useState4[0],
      setArrow = _useState4[1];

  var options = useMemo(function () {
    var modifiers = [{
      name: 'offset',
      options: {
        offset: [4, offset || 4]
      }
    }, {
      name: 'arrow',
      options: {
        element: arrow,
        padding: 4
      }
    }];

    if (contained) {
      modifiers.push({
        name: 'preventOverflow',
        options: {
          boundary: boundary,
          padding: 8
        }
      }, {
        name: 'flip',
        options: {
          boundary: boundary,
          padding: 8
        }
      }, _objectSpread$b(_objectSpread$b({}, maxSize), {}, {
        options: {
          boundary: boundary,
          padding: 8
        }
      }), {
        name: 'applyMaxSize',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['maxSize'],
        fn: function fn(_ref6) {
          var state = _ref6.state;
          var width = state.modifiersData.maxSize.width;
          state.styles.popper = _objectSpread$b(_objectSpread$b({}, state.styles.popper), {}, {
            maxWidth: "".concat(width, "px")
          });
        }
      });
    }

    return {
      placement: placement,
      strategy: 'absolute',
      modifiers: modifiers
    };
  }, [offset, arrow, contained, placement, boundary]);

  var _usePopper = usePopper(reference.current, popover, options),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes;

  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Reference, {
      ref: reference,
      children: children
    }), boundary && /*#__PURE__*/createPortal( /*#__PURE__*/jsxs(PopoverContainer, _objectSpread$b(_objectSpread$b({
      show: show,
      ref: setPopover,
      style: styles.popper
    }, attributes.popper), {}, {
      children: [content, /*#__PURE__*/jsx(Arrow, _objectSpread$b({
        className: "arrow-".concat((_attributes$popper$da = (_attributes$popper = attributes.popper) === null || _attributes$popper === void 0 ? void 0 : _attributes$popper['data-popper-placement']) !== null && _attributes$popper$da !== void 0 ? _attributes$popper$da : ''),
        ref: setArrow,
        style: styles.arrow
      }, attributes.arrow))]
    })), boundary)]
  });
}

function Wallet(_ref) {
  var disabled = _ref.disabled,
      onClick = _ref.onClick;
  return disabled ? /*#__PURE__*/jsx(TextButton, {
    disabled: !onClick,
    onClick: onClick,
    color: "secondary",
    style: {
      filter: 'none'
    },
    children: /*#__PURE__*/jsx(Caption$1, {
      children: /*#__PURE__*/jsxs(Row, {
        gap: 0.5,
        children: [/*#__PURE__*/jsx(Wallet$1, {}), /*#__PURE__*/jsx(Trans, {
          id: "Connect your wallet"
        })]
      })
    })
  }) : null;
}

var _templateObject$t;

var loadingOpacityCss = css(_templateObject$t || (_templateObject$t = _taggedTemplateLiteral(["\n  filter: ", ";\n  opacity: ", ";\n  transition: opacity 0.2s ease-in-out;\n"])), function (_ref) {
  var $loading = _ref.$loading;
  return $loading ? 'grayscale(1)' : 'none';
}, function (_ref2) {
  var $loading = _ref2.$loading;
  return $loading ? '0.4' : '1';
});

function otherField(field) {
  switch (field) {
    case Field.INPUT:
      return Field.OUTPUT;

    case Field.OUTPUT:
      return Field.INPUT;
  }
}

function useSwitchSwapCurrencies() {
  var update = useUpdateAtom(swapAtom);
  return useCallback(function () {
    update(function (swap) {
      var oldOutput = swap[Field.OUTPUT];
      swap[Field.OUTPUT] = swap[Field.INPUT];
      swap[Field.INPUT] = oldOutput;

      switch (swap.independentField) {
        case Field.INPUT:
          swap.independentField = Field.OUTPUT;
          break;

        case Field.OUTPUT:
          swap.independentField = Field.INPUT;
          break;
      }
    });
  }, [update]);
}
function useSwapCurrency(field) {
  var atom = useMemo(function () {
    return pickAtom(swapAtom, field);
  }, [field]);
  var otherAtom = useMemo(function () {
    return pickAtom(swapAtom, otherField(field));
  }, [field]);

  var _useAtom = useAtom(atom),
      _useAtom2 = _slicedToArray(_useAtom, 2),
      currency = _useAtom2[0],
      setCurrency = _useAtom2[1];

  var otherCurrency = useAtomValue(otherAtom);
  var switchSwapCurrencies = useSwitchSwapCurrencies();
  var setOrSwitchCurrency = useCallback(function (currency) {
    if (currency === otherCurrency) {
      switchSwapCurrencies();
    } else {
      setCurrency(currency);
    }
  }, [otherCurrency, setCurrency, switchSwapCurrencies]);
  return [currency, setOrSwitchCurrency];
}
var independentFieldAtom = pickAtom(swapAtom, 'independentField');
function useIsSwapFieldIndependent(field) {
  var independentField = useAtomValue(independentFieldAtom);
  return independentField === field;
}
function useSwapTradeType() {
  var independentField = useAtomValue(independentFieldAtom);

  switch (independentField) {
    case Field.INPUT:
      return TradeType.EXACT_INPUT;

    case Field.OUTPUT:
      return TradeType.EXACT_OUTPUT;
  }
}
var amountAtom = pickAtom(swapAtom, 'amount'); // check if any amount has been entered by user

function useIsAmountPopulated() {
  return Boolean(useAtomValue(amountAtom));
}
function useSwapAmount(field) {
  var amount = useAtomValue(amountAtom);
  var isFieldIndependent = useIsSwapFieldIndependent(field);
  var value = useMemo(function () {
    return isFieldIndependent ? amount : undefined;
  }, [amount, isFieldIndependent]);
  var updateSwap = useUpdateAtom(swapAtom);
  var updateAmount = useCallback(function (amount) {
    return updateSwap(function (swap) {
      swap.independentField = field;
      swap.amount = amount;
    });
  }, [field, updateSwap]);
  return [value, updateAmount];
}
function useSwapCurrencyAmount(field) {
  var isFieldIndependent = useIsSwapFieldIndependent(field);
  var isAmountPopulated = useIsAmountPopulated();

  var _useSwapAmount = useSwapAmount(field),
      _useSwapAmount2 = _slicedToArray(_useSwapAmount, 1),
      swapAmount = _useSwapAmount2[0];

  var _useSwapCurrency = useSwapCurrency(field),
      _useSwapCurrency2 = _slicedToArray(_useSwapCurrency, 1),
      swapCurrency = _useSwapCurrency2[0];

  if (isFieldIndependent && isAmountPopulated) {
    return tryParseCurrencyAmount(swapAmount, swapCurrency);
  }

  return;
}

/**
 * Does a lookup for an ENS name to find its contenthash.
 */

function useENSContentHash(ensName) {
  var _resolverAddressResul;

  var ensNodeArgument = useMemo(function () {
    return [ensName === null ? undefined : safeNamehash(ensName)];
  }, [ensName]);
  var registrarContract = useENSRegistrarContract(false);
  var resolverAddressResult = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
  var resolverAddress = (_resolverAddressResul = resolverAddressResult.result) === null || _resolverAddressResul === void 0 ? void 0 : _resolverAddressResul[0];
  var resolverContract = useENSResolverContract(resolverAddress && isZero(resolverAddress) ? undefined : resolverAddress, false);
  var contenthash = useSingleCallResult(resolverContract, 'contenthash', ensNodeArgument);
  return useMemo(function () {
    var _contenthash$result$, _contenthash$result;

    return {
      contenthash: (_contenthash$result$ = (_contenthash$result = contenthash.result) === null || _contenthash$result === void 0 ? void 0 : _contenthash$result[0]) !== null && _contenthash$result$ !== void 0 ? _contenthash$result$ : null,
      loading: resolverAddressResult.loading || contenthash.loading
    };
  }, [contenthash.loading, contenthash.result, resolverAddressResult.loading]);
}

function useHttpLocations(uri) {
  var ens = useMemo(function () {
    return uri ? parseENSAddress(uri) : undefined;
  }, [uri]);
  var resolvedContentHash = useENSContentHash(ens === null || ens === void 0 ? void 0 : ens.ensName);
  return useMemo(function () {
    if (ens) {
      return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : [];
    } else {
      return uri ? uriToHttp(uri) : [];
    }
  }, [ens, resolvedContentHash.contenthash, uri]);
}

var EthereumLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAADxdJREFUeJztXVtzFMcVplwuP8VVeYmf7HJ+RKqSl/AQP6X8H+yqXUEIjhMnQY5jO9oVCIzA5mowdzAYG4xAGAyWLC5G3IyDL8gOASUYKrarYGZWC7qi23b6692VV6uZ7e6ZnT3di07VV6JUaLfnnG+6z+lz+vScOXUoL6SzP52/2PtlQ9p7piHlLU2k3P2JJqcjkXLO8589/OdN/tPjvx8VEP8Wv+sp/J8O/A3+Fp+Bz8JnUj/XrPjIwjT7ybxm57fJlLsy2eR2cwPe4QZksYB/Nr4D34XvxHdTP/8DJ+k0e4S/lb9Jpr2WZJNzgRtjPDaDS4DvFmPgY8GYMDZq/dStNKQzv0qmnA1c6RkqgysQIoMxYqzU+qoLWZDO/jyZdl7lir1ObdwQZLiOseMZqPVonSTS7i+4AtsTTW6O2pDR4ebEs/Bnotar8dKw2Pk1n0I76Y0W16zgdOIZqfVsnCSbvaeEB2+AkWpCBEQS/Jmp9U4u3Fl6nIdWB6gNQgb+7NABtR1qLjxcejiZdhfxKXGA3AjUswHXAXQBnVDbpSbCPeO5fAr8hlrxpgE6gW6o7ROb5N96Z3l9ePZxgUcMXEd1NxssbMk8kWxyztEr2A5AV3XjGySb3acTSLYYoFjL4EF31PYLLXwaeyiZcltnp/woEJtIrdAltT21BEkR7tnuo1dgfQC6tCbRlGh1H02k3C5qpalg/bt3WdOGDPk4lACdct1S27eiLEgPPMbDmcvkylLAgiUOc/sm2LHuITavmX48KoBun1828DNqO/tKsiX7JF+zeqmVpIqPzg2xyckc++Sfw2ImoB6POtxe6Jra3tMEb75Nxv/Hmxk2MZGbIsCpz4bZn1d45OPSIQF0Tm13IViXbJn2i+i9NcYgRQIA+zsGyMelA6Fzap8AnqktDl8RO9r7WVFKCQAs3dJHPj4tcN2TRQcizrcs1Hv+NZf1D04GEqDj/JBwDqnHqYNCiFj7fYL8Jg+9AnTQfXmYlUo5AYAtbffIx6lNAm6L2hpfbO/atcO3dGsfy+VyUgIAL66yySEE3FzNto2R2ElYtrffkHbYd7fHWbkEEeDQyUHk6cnHrQkPtonV+CKla2FWDx6+nwQRAFi5K0s+bl3ANrGmkvP5fPoH1cFfX/fYyP2cNgG6Lg6z55a55OPXJgG3UVzGn2vbug98fvW+r/FlBADePtJPPn59iKKS6lYW5ad++8q4Vu+5G2h8FQIAr663JFlUAtiqqksBZ1Uj9UPp4neLHeb0TUQmwNEzg2xemv559OE2VsX4KE2ysXoXhpOJCgGAdXttShblAZtVpayMe5Zt1A+ji5fXZdj4uL/jF4YApy4NsxdaLXQIue2iGb/Ze4r6IcLg6rejUuPrEAB47yO7kkVTJIhyAsnG41rYylUVHQIAizdZlixqyh9DC2V8HGKkHrwuELffHZiUWz4kAVBEAueS+jl1EepAqo2ndLFW64guAYBNB2xMFjmdWsbHWXbqQesC0zMMGjcBgEVv2JYs4tDpT5BvzmDAoBWBxM2tH8a0jB+FAAe77EsWwaZKxkdLE9u2fPce65dbu4oEAFp32JYscnNK7WrQ14Z+sOpAMefwiLrjVy0CdF0cYguX2rU3ANtKCWBTdS9wqWcklPGjEgDYcdiuZBEaV1U0PtqbUQ9SB6/vyoY2fjUIALy81q5kUcUWduhxRz1AVcxvdthtb2aVT60JcOT0oKg4otaHKmBjX+OLA50GN2Esx+FT8mRPLQgAIO1MrQ91ArgZ31JytDqlHpwqXlrjsbExvZg/TgKcvDTM/rjcHocQtp45/ae9FuqBqeLr/6gle2pFAAChKLVeVAFbzyRAk3OBemAq2LhfPdlTSwIA6Y12JItg62nGR9tzyq7bqljY4rK+e5WrfCgJcPzskHBOqfUkJQC39bRW9+h9Tz0oFXx8Yahqxo+DAMCGfXY4hLB5SfjnrqQekAypjRntZA8FAU5/NixK0an1JQNsXrL+m1/4ceM7/WRPJcExsas3Rtn7nQNVJ8GBj82vHppWKBLrNStVAOrzqyWjPHzEWQGEbjBW81t9bPn2LNt9tF/UE1SLBMu2Ge4QcpsL4+MyJPLBVADi68HhcMmeUrnbP8kufDUyw8ggQBHoD7Dt4D3WyX2NqASAv/L7Fnr9VYK4CAs3YlEPpBLOfxk+2QP5wRlnZy7ztTnAUKUEKGLJpj72JnfmUFoehQTbDpldPQTb8/Xfe5Z6IEHA1BxWem+N8rdd/ib7EaAUq/dkxZoelgTYtaTWYxBwJR7y/8uoB+IHnMbB26sjY+M59uU1vr5/qj6FywhQxIodWfbOh/2ioZQOAZCzMLV6CLafU7hUkXww5Wjr8j/S7Sdo+3LxyojSGx+WAFN+wtY+tp1P7V0afsIbbxtaPcRtb2T1b+Mqj90flcf8t91x1v158PoeBwGKWLy5j23kfsIxBT/h5KfDoj8RtV7LIaqFTcwBfHUt+Eg35L//G2WnqxSyhSVAKdZwP+FgV2U/Yc9R85JFIieQwH25BgymCHTt9JPxiRy7ch3xe/QQrdoEKGLlzqzICgb5CQb2Je6ZU7g0mXogAmjR5mWnJ3uwB3Dp65nxu4kEKGIZ9xN2tN9jJy5OJ6txfYm57TEDGNPwCdm0otzJTLCzX+T31uMwfJwEmNpP2NLHNu2/y453/0gEw/oSe3MK16dTD2Sqf+/N78diN3qtCDDlMG7qY2v33mWHTg6Y1ZeY294YAhw7Ozi1P19L1IIA0/yEXdxpfMeQWUAQwJAlAClUtHOrdwL8fW3GpBPGnlFOIIDp8lh3dT19EwiAJe4PprWdKziBRoWBALaB1/JpEhsothMAdYJY8w3dDhZh4HkDBuIL7J7t+qDfWgKg57BRYV85uO0xA3SQD0SCl9ZkRP9eWwjwyrqM8bUABXQYkwySpU0xhb62Lcs6z5u7E4idPpUDIn8ypeOYSAYZkg5esTPLPr0yIu2+gd1CnA3QTcvGSYA0B6IY2TpfXNLQxo5a30BDyluKI2HPUA+kCHj/qNlDDl0WKsGxevd49LAxqvGxPM2XjBV+AJpNYp/DpJ1AURBiUkkYvP9i9S9yAnjTZX+DaffoJ+H9g7CGR1j3nEKDCIS12OLGd6HGwaRoQJSEmVYU+rfVHhu+/2MR6LWbo+JMQGUmO6Lo4kSIsDFMWKfSNRRLWWnJOdrPm3aAVBSFmlgWXt7sEQc4kB+QKRBv5Pb2e7ERAIUqssbROL629eDMMSzZbFiZeLEs3NSDISjhLpeh4Umx7ssaMiD+bpMUaOgQAE6b7DYxjAkdS7ouzoxScFUdtT7LMe1giIlHw/AmORn/g6AoFlWps0OdP7p7hiUA/AuVUi74A+gU4vf5KC2XOYkkBCg9Gmbq4VBMm0gRBwkqgGX7B1A+PO+ggpKgsO4vK+VhHXwBVAAFkQuhqqk3kE07HGry8XDU5FcStIWHl40Zo9LnwH9AXZ6MAHBCZUe8EaLiFLBsL2LVbjOrgWccDze5QQTeQpX27zj6tV3hJM4r6zPsg5Lpemr7lv9eRiIA5V4dCruR+wxuLz+jQYTpLWIwHQ8MqZ0P/Pb7MdYiuQMYpMLOI87vIcRU2ZrFUnPwhNp+A7arTb5xzLdFjOlNorCTpio4+o0zhSBOpc+EZy+LKJDD33lYLyNpYPXvNPg2ibKhTRzqA3QE9wUiHAzTtgXx/po9+jUJpreTD2wTlw8HzW4UCY/e7wpYmSCc1NmDRxQQpioJOQzTbxgLbBSZXwbMbxWLmDtsj8B/3RiteA8gMnr7QtYlItEjW3JMQMVWsflZwL1OPUgZEM6FFWwrI2dQWp+H4o3NB/S2kMuBo+zUepFB2ixaEMCSdvFf/Lvy+UGZIKpAW5hiNBDF+Cae+/MlgEq7eFsujMAWbdSegdXoEoZNKFmewAwoXhhRWAasuDIGTRuitI57kNrFK18ZA7Hp0qgPz4RvHhmVACZV90ihc2lUfhYwr3GEHxrS4XsIRiEAchQmVfdUgva1cRCbLo58sayKKG4CIOdvWnVPxZckzMWRYhYwsFAkCDpXxkYlgHHVPRUQ+upYQQDLLo/W7SkYhgAoOaN+Ti0CRLk8GpJIOQeoH0IVSOfeCagiqgYBUH1sYnVPILjtIhkf0pDOPM6diAHyh1EEpufxClVEYQmA4o9Gi66Mhc1gu8gEgCTT7iLqB9KBrIooDAGM7fUXRABus6oYH5JOs4e5M/EN9UNpsF+0gq8WAd4zuLrH9/m5rWCzqhEAkkw7c23YIi4CmTl0EI1KAFHdY9UVsW4Otqqq8UtIsJz+AdWBJhNRCYD0M/Vz6AA2isX4kPxS4JyjfkgdVKoikhHgrfctC/m4bao+9ZfLwpbMEwlDGkupoFIVUSUCtJ80v7qnDB5sE6vxi5Jsdp+2yR9AFdCoTxVREAEwaxjTy08JfN3nNqmJ8adIkHJb6R9cHbt9qoiCCIBOJNTj1QFsUVPjQ/ha8xCPNfdRP7wOcFmUjAC7j9hR3TNlfG4D2KLmBCiQ4JFEyu2iVoIqyquIyglgT3VPAVz3gSXetZJEq/tossm9TK4MRbSWVBGVEwDtXqjHpwqhc657UuMXZUF64DHuiPRSK0UVOLJdTgCcPKIelzrcXuic2u7TJNmSfdIWEhSriIoEsKm6BzqGrqnt7StgpS3LAc7to+MIqntMvM/HD9CtcW9+uWBdssUxxDk+dPGiHocSoFNT1nyZiIOmloWIJqMQ6tF6+7oi9gnEZpE9O4bmwc1Bh2RxfjUkv21sT+7AIHg1396NS5CksC2LSAnoqmaJnVqJSCWLeoLZJSEYophjeewpXUpBtYpN5WW1AnQSWyWPaQKGc7Y32lRtHJvhhQ7cxrp+64NElJw3OW3URqB76522qpVu2yw4vWLTMbTohne7I5/YqUfBIUZbTiWHMjx/ttAHNR8kwVn2fJOKeogYxGZOu/b5/FnJt6vJ9yyyI8tYZvhejF25LcusVBa0N0OPO5ObWWJsGKO0FdushBckRdDqFP1u0fSYsss5vluMgY8FY7IuYVMPgrbn6H2PCxBEJBHn9Tf8s4UHz78L3zmj5fqsmCG4DAk3YiWbvGfFvYgpdz888EJL/J7Chdkerk8XEP8Wv+vJzyo8EsHf8L/FZ+Czpi5YqjP5P2ey0rAsl+yGAAAAAElFTkSuQmCC";

var MaticLogo = "data:image/svg+xml,%3Csvg%20width%3D%221024%22%20height%3D%221024%22%20viewBox%3D%220%200%201024%201024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%22512%22%20cy%3D%22512%22%20r%3D%22512%22%20fill%3D%22%238247E5%22%2F%3E%3Cpath%20d%3D%22M681.469%20402.456C669.189%20395.312%20653.224%20395.312%20639.716%20402.456L543.928%20457.228L478.842%20492.949L383.055%20547.721C370.774%20554.865%20354.81%20554.865%20341.301%20547.721L265.162%20504.856C252.882%20497.712%20244.286%20484.614%20244.286%20470.325V385.786C244.286%20371.498%20251.654%20358.4%20265.162%20351.256L340.073%20309.581C352.353%20302.437%20368.318%20302.437%20381.827%20309.581L456.737%20351.256C469.018%20358.4%20477.614%20371.498%20477.614%20385.786V440.558L542.7%20403.646V348.874C542.7%20334.586%20535.332%20321.488%20521.824%20314.344L383.055%20235.758C370.774%20228.614%20354.81%20228.614%20341.301%20235.758L200.076%20314.344C186.567%20321.488%20179.199%20334.586%20179.199%20348.874V507.237C179.199%20521.525%20186.567%20534.623%20200.076%20541.767L341.301%20620.353C353.582%20627.498%20369.546%20627.498%20383.055%20620.353L478.842%20566.772L543.928%20529.86L639.716%20476.279C651.996%20469.135%20667.961%20469.135%20681.469%20476.279L756.38%20517.953C768.66%20525.098%20777.257%20538.195%20777.257%20552.484V637.023C777.257%20651.312%20769.888%20664.409%20756.38%20671.553L681.469%20714.419C669.189%20721.563%20653.224%20721.563%20639.716%20714.419L564.805%20672.744C552.525%20665.6%20543.928%20652.502%20543.928%20638.214V583.442L478.842%20620.353V675.125C478.842%20689.414%20486.21%20702.512%20499.719%20709.656L640.944%20788.242C653.224%20795.386%20669.189%20795.386%20682.697%20788.242L823.922%20709.656C836.203%20702.512%20844.799%20689.414%20844.799%20675.125V516.763C844.799%20502.474%20837.431%20489.377%20823.922%20482.232L681.469%20402.456Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";

function chainIdToNetworkName(networkId) {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum';

    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum';

    case SupportedChainId.OPTIMISM:
      return 'optimism';

    default:
      return 'ethereum';
  }
}

function getNativeLogoURI() {
  var chainId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SupportedChainId.MAINNET;

  switch (chainId) {
    case SupportedChainId.POLYGON_MUMBAI:
    case SupportedChainId.POLYGON:
      return MaticLogo;

    default:
      return EthereumLogo;
  }
}

function getTokenLogoURI(address) {
  var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SupportedChainId.MAINNET;
  var networkName = chainIdToNetworkName(chainId);
  var networksWithUrls = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.MAINNET, SupportedChainId.OPTIMISM];

  if (networksWithUrls.includes(chainId)) {
    return "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/".concat(networkName, "/assets/").concat(address, "/logo.png");
  }
}

function useCurrencyLogoURIs(currency) {
  var locations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);
  return useMemo(function () {
    var logoURIs = _toConsumableArray(locations);

    if (currency) {
      if (currency.isNative) {
        logoURIs.push(getNativeLogoURI(currency.chainId));
      } else if (currency.isToken) {
        var logoURI = getTokenLogoURI(currency.address, currency.chainId);

        if (logoURI) {
          logoURIs.push(logoURI);
        }
      }
    }

    return logoURIs;
  }, [currency, locations]);
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var colors = new Map();
/**
 * Extracts the prominent color from a token.
 * NB: If cached, this function returns synchronously; using a callback allows sync or async returns.
 */

function getColorFromLogoURIs(_x) {
  return _getColorFromLogoURIs.apply(this, arguments);
}

function _getColorFromLogoURIs() {
  _getColorFromLogoURIs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(logoURIs) {
    var cb,
        key,
        color,
        _iterator,
        _step,
        logoURI,
        uri,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cb = _args.length > 1 && _args[1] !== undefined ? _args[1] : function () {
              return void 0;
            };
            key = logoURIs[0];
            color = colors.get(key);

            if (color) {
              _context.next = 26;
              break;
            }

            _iterator = _createForOfIteratorHelper$1(logoURIs);
            _context.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context.next = 18;
              break;
            }

            logoURI = _step.value;
            uri = logoURI;

            if (logoURI.startsWith('http')) {
              // Color extraction must use a CORS-compatible resource, but the resource may already be cached.
              // Adds a dummy parameter to force a different browser resource cache entry. Without this, color extraction prevents resource caching.
              uri += '?color';
            }

            _context.next = 13;
            return getColorFromUriPath(uri);

          case 13:
            color = _context.sent;

            if (!color) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("break", 18);

          case 16:
            _context.next = 7;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](5);

            _iterator.e(_context.t0);

          case 23:
            _context.prev = 23;

            _iterator.f();

            return _context.finish(23);

          case 26:
            colors.set(key, color);
            return _context.abrupt("return", cb(color));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 20, 23, 26]]);
  }));
  return _getColorFromLogoURIs.apply(this, arguments);
}

function getColorFromUriPath(_x2) {
  return _getColorFromUriPath.apply(this, arguments);
}

function _getColorFromUriPath() {
  _getColorFromUriPath = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(uri) {
    var _palette$Vibrant, palette;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Vibrant.from(uri).getPalette();

          case 3:
            palette = _context2.sent;
            return _context2.abrupt("return", (_palette$Vibrant = palette.Vibrant) === null || _palette$Vibrant === void 0 ? void 0 : _palette$Vibrant.hex);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

          case 9:
            return _context2.abrupt("return");

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _getColorFromUriPath.apply(this, arguments);
}

function usePrefetchCurrencyColor(token) {
  var theme = useTheme();
  var logoURIs = useCurrencyLogoURIs(token);
  useEffect(function () {
    if (theme.tokenColorExtraction && token) {
      getColorFromLogoURIs(logoURIs);
    }
  }, [token, logoURIs, theme.tokenColorExtraction]);
}
function useCurrencyColor(token) {
  var _useState = useState(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      color = _useState2[0],
      setColor = _useState2[1];

  var theme = useTheme();
  var logoURIs = useCurrencyLogoURIs(token);
  useLayoutEffect(function () {
    var stale = false;

    if (theme.tokenColorExtraction && token) {
      getColorFromLogoURIs(logoURIs, function (color) {
        if (!stale && color) {
          setColor(color);
        }
      });
    }

    return function () {
      stale = true;
      setColor(undefined);
    };
  }, [token, logoURIs, theme.tokenColorExtraction]);
  return color;
}

/*eslint-disable*/
var enUS = {
  messages: {
    "$-": "$-",
    "$<0/>": "$<0/>",
    "${0}": ["$", ["0"]],
    "(${0})": ["($", ["0"], ")"],
    "(Max)": "(Max)",
    "(View on Explorer)": "(View on Explorer)",
    "(claim)": "(claim)",
    "(clear all)": "(clear all)",
    "(edit)": "(edit)",
    "- Remove recipient": "- Remove recipient",
    "0 UNI / week": "0 UNI / week",
    "0.05% fee": "0.05% fee",
    "0.3% fee": "0.3% fee",
    "1% fee": "1% fee",
    "25%": "25%",
    "50%": "50%",
    "75%": "75%",
    "<0/> All Proposals": "<0/> All Proposals",
    "<0/> Votes": "<0/> Votes",
    "<0>Account analytics and accrued fees</0><1> ↗ </1>": "<0>Account analytics and accrued fees</0><1> ↗ </1>",
    "<0>Current Price:</0><1><2/></1><3>{0} per {1}</3>": ["<0>Current Price:</0><1><2/></1><3>", ["0"], " per ", ["1"], "</3>"],
    "<0>Tip:</0> Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.": "<0>Tip:</0> Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.",
    "<0>Tip:</0> Select an action and describe your proposal for the community. The proposal cannot be modified after submission, so please verify all information before submitting. The voting period will begin immediately and last for 7 days. To propose a custom action, <1>read the docs</1>.": "<0>Tip:</0> Select an action and describe your proposal for the community. The proposal cannot be modified after submission, so please verify all information before submitting. The voting period will begin immediately and last for 7 days. To propose a custom action, <1>read the docs</1>.",
    "<0>Tip:</0> Use this tool to find v2 pools that don't automatically appear in the interface.": "<0>Tip:</0> Use this tool to find v2 pools that don't automatically appear in the interface.",
    "<0>Tip:</0> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.": "<0>Tip:</0> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.",
    "<0>Unlock voting</0> to prepare for the next proposal.": "<0>Unlock voting</0> to prepare for the next proposal.",
    "<0>🎉 </0>Welcome to team Unicorn :) <1>🎉</1>": "<0>🎉 </0>Welcome to team Unicorn :) <1>🎉</1>",
    "A minimum threshold of 0.25% of the total UNI supply is required to submit proposals": "A minimum threshold of 0.25% of the total UNI supply is required to submit proposals",
    "About": "About",
    "Accept": "Accept",
    "Account": "Account",
    "Acknowledge": "Acknowledge",
    "Active": "Active",
    "Add": "Add",
    "Add <0/> and <1/> to Uniswap V2": "Add <0/> and <1/> to Uniswap V2",
    "Add Delegate +": "Add Delegate +",
    "Add Liquidity": "Add Liquidity",
    "Add V2 Liquidity": "Add V2 Liquidity",
    "Add liquidity.": "Add liquidity.",
    "Add more liquidity": "Add more liquidity",
    "Add {0} to Metamask <0/>": ["Add ", ["0"], " to Metamask <0/>"],
    "Add {0}-{1} liquidity": ["Add ", ["0"], "-", ["1"], " liquidity"],
    "Add {0}/{1} V3 liquidity": ["Add ", ["0"], "/", ["1"], " V3 liquidity"],
    "Added {0}": ["Added ", ["0"]],
    "Address has no available claim": "Address has no available claim",
    "Against": "Against",
    "Allow": "Allow",
    "Allow LP token migration": "Allow LP token migration",
    "Allow high price impact trades and skip the confirm screen. Use at your own risk.": "Allow high price impact trades and skip the confirm screen. Use at your own risk.",
    "Allow the Uniswap Protocol to use your {0}": ["Allow the Uniswap Protocol to use your ", ["0"]],
    "Allow {0} first": ["Allow ", ["0"], " first"],
    "Allowed": "Allowed",
    "Allowed Slippage": "Allowed Slippage",
    "Amount": "Amount",
    "An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.": "An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.",
    "Analytics": "Analytics",
    "Approval pending": "Approval pending",
    "Approval pending <0/>": "Approval pending <0/>",
    "Approve": "Approve",
    "Approve Token": "Approve Token",
    "Approve {0}": ["Approve ", ["0"]],
    "Approve {0} first": ["Approve ", ["0"], " first"],
    "Approved": "Approved",
    "Approving": "Approving",
    "Approving {0}": ["Approving ", ["0"]],
    "Arbiscan": "Arbiscan",
    "Arbitrum Bridge": "Arbitrum Bridge",
    "Arbitrum is in Beta and may experience downtime. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>": "Arbitrum is in Beta and may experience downtime. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>",
    "Are you sure?": "Are you sure?",
    "As a member of the Uniswap community you may claim UNI to be used for voting and governance.<0/><1/><2>Read more about UNI</2>": "As a member of the Uniswap community you may claim UNI to be used for voting and governance.<0/><1/><2>Read more about UNI</2>",
    "At least {0} {1} and {2} {3} will be refunded to your wallet due to selected price range.": ["At least ", ["0"], " ", ["1"], " and ", ["2"], " ", ["3"], " will be refunded to your wallet due to selected price range."],
    "Auto": "Auto",
    "Auto Router": "Auto Router",
    "Auto Router API": "Auto Router API",
    "Available to deposit: {0}": ["Available to deposit: ", ["0"]],
    "Balance:": "Balance:",
    "Balance: {0}": ["Balance: ", ["0"]],
    "Balance: {0} {1}": ["Balance: ", ["0"], " ", ["1"]],
    "Best for exotic pairs.": "Best for exotic pairs.",
    "Best for most pairs.": "Best for most pairs.",
    "Best for stable pairs.": "Best for stable pairs.",
    "Best for very stable pairs.": "Best for very stable pairs.",
    "Best price route costs ~{formattedGasPriceString} in gas.": ["Best price route costs ~", ["formattedGasPriceString"], " in gas."],
    "Blocked address": "Blocked address",
    "Bridge": "Bridge",
    "By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.": "By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.",
    "By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.": "By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.",
    "By connecting a wallet, you agree to Uniswap Labs’ <0>Terms of Service</0> and acknowledge that you have read and understand the <1>Uniswap protocol disclaimer</1>.": "By connecting a wallet, you agree to Uniswap Labs’ <0>Terms of Service</0> and acknowledge that you have read and understand the <1>Uniswap protocol disclaimer</1>.",
    "By connecting a wallet, you agree to Uniswap Labs’ <0>Terms of Service</0> and acknowledge that you have read and understand the Uniswap <1>Protocol Disclaimer</1>.": "By connecting a wallet, you agree to Uniswap Labs’ <0>Terms of Service</0> and acknowledge that you have read and understand the Uniswap <1>Protocol Disclaimer</1>.",
    "Canceled": "Canceled",
    "Change": "Change",
    "Charts": "Charts",
    "Check network status": "Check network status",
    "Check out our v3 LP walkthrough and migration guides.": "Check out our v3 LP walkthrough and migration guides.",
    "Claim": "Claim",
    "Claim <0/> for {0}": ["Claim <0/> for ", ["0"]],
    "Claim UNI": "Claim UNI",
    "Claim UNI Token": "Claim UNI Token",
    "Claim UNI reward for {0}": ["Claim UNI reward for ", ["0"]],
    "Claim fees": "Claim fees",
    "Claim your UNI tokens": "Claim your UNI tokens",
    "Claimed": "Claimed",
    "Claimed UNI!": "Claimed UNI!",
    "Claimed!": "Claimed!",
    "Claiming": "Claiming",
    "Claiming UNI": "Claiming UNI",
    "Claiming {0} UNI": ["Claiming ", ["0"], " UNI"],
    "Clear All": "Clear All",
    "Clear all": "Clear all",
    "Close": "Close",
    "Closed": "Closed",
    "Code": "Code",
    "Collect": "Collect",
    "Collect as WETH": "Collect as WETH",
    "Collect fees": "Collect fees",
    "Collect {0}/{1} fees": ["Collect ", ["0"], "/", ["1"], " fees"],
    "Collected": "Collected",
    "Collecting": "Collecting",
    "Collecting fees": "Collecting fees",
    "Collecting fees will withdraw currently available fees for you.": "Collecting fees will withdraw currently available fees for you.",
    "Common bases": "Common bases",
    "Confirm": "Confirm",
    "Confirm Create": "Confirm Create",
    "Confirm Supply": "Confirm Supply",
    "Confirm Swap": "Confirm Swap",
    "Confirm swap": "Confirm swap",
    "Confirm this transaction in your wallet": "Confirm this transaction in your wallet",
    "Confirm transaction in wallet": "Confirm transaction in wallet",
    "Connect Wallet": "Connect Wallet",
    "Connect a wallet": "Connect a wallet",
    "Connect to a wallet": "Connect to a wallet",
    "Connect to a wallet to find pools": "Connect to a wallet to find pools",
    "Connect to a wallet to view your V2 liquidity.": "Connect to a wallet to view your V2 liquidity.",
    "Connect to a wallet to view your liquidity.": "Connect to a wallet to view your liquidity.",
    "Connect wallet to swap": "Connect wallet to swap",
    "Connect your wallet": "Connect your wallet",
    "Connected with {name}": ["Connected with ", ["name"]],
    "Copied": "Copied",
    "Copy Address": "Copy Address",
    "Create": "Create",
    "Create Pool & Supply": "Create Pool & Supply",
    "Create Proposal": "Create Proposal",
    "Create a pair": "Create a pair",
    "Create a pool": "Create a pool",
    "Create an issue on GitHub": "Create an issue on GitHub",
    "Create pool and add {0}/{1} V3 liquidity": ["Create pool and add ", ["0"], "/", ["1"], " V3 liquidity"],
    "Create pool.": "Create pool.",
    "Create {0}/{1} V3 pool": ["Create ", ["0"], "/", ["1"], " V3 pool"],
    "Current price": "Current price",
    "Current {0} Price:": ["Current ", ["0"], " Price:"],
    "Custom": "Custom",
    "Dark Theme": "Dark Theme",
    "Defeated": "Defeated",
    "Delegate Votes": "Delegate Votes",
    "Delegate voting power to {0}": ["Delegate voting power to ", ["0"]],
    "Delegated to:": "Delegated to:",
    "Delegating votes": "Delegating votes",
    "Deposit": "Deposit",
    "Deposit Amounts": "Deposit Amounts",
    "Deposit Assets": "Deposit Assets",
    "Deposit UNI-V2 LP Tokens": "Deposit UNI-V2 LP Tokens",
    "Deposit liquidity": "Deposit liquidity",
    "Deposit tokens to the {label} network.": ["Deposit tokens to the ", ["label"], " network."],
    "Deposit your Liquidity Provider tokens to receive UNI, the Uniswap protocol governance token.": "Deposit your Liquidity Provider tokens to receive UNI, the Uniswap protocol governance token.",
    "Deposited liquidity:": "Deposited liquidity:",
    "Deposited {0} UNI-V2": ["Deposited ", ["0"], " UNI-V2"],
    "Depositing Liquidity": "Depositing Liquidity",
    "Description": "Description",
    "Detailed": "Detailed",
    "Details": "Details",
    "Directly support the Ukrainian government by donating tokens.": "Directly support the Ukrainian government by donating tokens.",
    "Disconnect": "Disconnect",
    "Discord": "Discord",
    "Dismiss": "Dismiss",
    "Docs": "Docs",
    "Donate to Ukraine": "Donate to Ukraine",
    "Don’t see one of your v2 positions? <0>Import it.</0>": "Don’t see one of your v2 positions? <0>Import it.</0>",
    "Earned UNI tokens represent voting shares in Uniswap governance.": "Earned UNI tokens represent voting shares in Uniswap governance.",
    "Edit": "Edit",
    "Efficiency Comparison": "Efficiency Comparison",
    "Enter a percent": "Enter a percent",
    "Enter a recipient": "Enter a recipient",
    "Enter a valid slippage percentage": "Enter a valid slippage percentage",
    "Enter amount": "Enter amount",
    "Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission.": "Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission.",
    "Enter an amount": "Enter an amount",
    "Enter valid list location": "Enter valid list location",
    "Enter valid token address": "Enter valid token address",
    "Enter {0} amount": ["Enter ", ["0"], " amount"],
    "Error": "Error",
    "Error connecting": "Error connecting",
    "Error connecting. Try refreshing the page.": "Error connecting. Try refreshing the page.",
    "Error details": "Error details",
    "Error importing list": "Error importing list",
    "Estimate may differ due to your wallet gas settings": "Estimate may differ due to your wallet gas settings",
    "Estimated network fee": "Estimated network fee",
    "Etherscan": "Etherscan",
    "Executed": "Executed",
    "Expanded results from inactive Token Lists": "Expanded results from inactive Token Lists",
    "Expected Output": "Expected Output",
    "Expert Mode": "Expert Mode",
    "Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.": "Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.",
    "Expired": "Expired",
    "Explore Uniswap Analytics.": "Explore Uniswap Analytics.",
    "Explore popular pools on Uniswap Analytics.": "Explore popular pools on Uniswap Analytics.",
    "Explorer": "Explorer",
    "Failed to switch networks from the Uniswap Interface. In order to use Uniswap on {0}, you must change the network in your wallet.": ["Failed to switch networks from the Uniswap Interface. In order to use Uniswap on ", ["0"], ", you must change the network in your wallet."],
    "Fee Tier": "Fee Tier",
    "Fee tier": "Fee tier",
    "Fetching best price...": "Fetching best price...",
    "Fetching best price…": "Fetching best price…",
    "For": "For",
    "For each pool shown below, click migrate to remove your liquidity from Uniswap V2 and deposit it into Uniswap V3.": "For each pool shown below, click migrate to remove your liquidity from Uniswap V2 and deposit it into Uniswap V3.",
    "From": "From",
    "From (at most)": "From (at most)",
    "Full Range": "Full Range",
    "Full range positions may earn less fees than concentrated positions. Learn more <0>here</0>.": "Full range positions may earn less fees than concentrated positions. Learn more <0>here</0>.",
    "Get support on Discord": "Get support on Discord",
    "Help Center": "Help Center",
    "Hide": "Hide",
    "Hide closed positions": "Hide closed positions",
    "High Price Impact": "High Price Impact",
    "High price impact": "High price impact",
    "High slippage increases the risk of price movement": "High slippage increases the risk of price movement",
    "How this app uses APIs": "How this app uses APIs",
    "I understand": "I understand",
    "If you purchase a token from this list, you may not be able to sell it back.": "If you purchase a token from this list, you may not be able to sell it back.",
    "Import": "Import",
    "Import List": "Import List",
    "Import Pool": "Import Pool",
    "Import V2 Pool": "Import V2 Pool",
    "Import at your own risk": "Import at your own risk",
    "In range": "In range",
    "Increase Liquidity": "Increase Liquidity",
    "Initial prices and pool share": "Initial prices and pool share",
    "Initializing...": "Initializing...",
    "Input is estimated. You will sell at most <0>{0} {1}</0> or the transaction will revert.": ["Input is estimated. You will sell at most <0>", ["0"], " ", ["1"], "</0> or the transaction will revert."],
    "Install Metamask": "Install Metamask",
    "Insufficient liquidity for this trade.": "Insufficient liquidity for this trade.",
    "Insufficient liquidity in the pool for your trade": "Insufficient liquidity in the pool for your trade",
    "Insufficient {0}": ["Insufficient ", ["0"]],
    "Insufficient {0} balance": ["Insufficient ", ["0"], " balance"],
    "Integrator fee": "Integrator fee",
    "Interface Settings": "Interface Settings",
    "Invalid pair": "Invalid pair",
    "Invalid pair.": "Invalid pair.",
    "Invalid price input": "Invalid price input",
    "Invalid range selected. The min price must be lower than the max price.": "Invalid range selected. The min price must be lower than the max price.",
    "Invalid recipient": "Invalid recipient",
    "Language": "Language",
    "Learn": "Learn",
    "Learn More": "Learn More",
    "Learn about providing liquidity": "Learn about providing liquidity",
    "Learn more": "Learn more",
    "Legal & Privacy": "Legal & Privacy",
    "Light Theme": "Light Theme",
    "Liquidity": "Liquidity",
    "Liquidity Provider Fee": "Liquidity Provider Fee",
    "Liquidity data not available.": "Liquidity data not available.",
    "Liquidity provider fee": "Liquidity provider fee",
    "Liquidity provider rewards": "Liquidity provider rewards",
    "Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.": "Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.",
    "Lists": "Lists",
    "Loaded": "Loaded",
    "Loading": "Loading",
    "Loading…": "Loading…",
    "MAX": "MAX",
    "Manage": "Manage",
    "Manage Liquidity in Rewards Pool": "Manage Liquidity in Rewards Pool",
    "Manage Token Lists": "Manage Token Lists",
    "Manage this pool.": "Manage this pool.",
    "Max": "Max",
    "Max Price": "Max Price",
    "Max Slippage": "Max Slippage",
    "Max price": "Max price",
    "Max slippage": "Max slippage",
    "Max:": "Max:",
    "Maximum sent": "Maximum sent",
    "Menu": "Menu",
    "Migrate": "Migrate",
    "Migrate Liquidity": "Migrate Liquidity",
    "Migrate Liquidity to V3": "Migrate Liquidity to V3",
    "Migrate V2 Liquidity": "Migrate V2 Liquidity",
    "Migrate your liquidity tokens from Uniswap V2 to Uniswap V3.": "Migrate your liquidity tokens from Uniswap V2 to Uniswap V3.",
    "Migrate {0}/{1} liquidity to V3": ["Migrate ", ["0"], "/", ["1"], " liquidity to V3"],
    "Migrating": "Migrating",
    "Min Price": "Min Price",
    "Min price": "Min price",
    "Min:": "Min:",
    "Minimum received": "Minimum received",
    "Minutes": "Minutes",
    "Missing dependencies": "Missing dependencies",
    "Mock Toggle": "Mock Toggle",
    "More": "More",
    "Network Fee": "Network Fee",
    "Network Warning": "Network Warning",
    "Network fees exceed 50% of the swap amount!": "Network fees exceed 50% of the swap amount!",
    "New Position": "New Position",
    "No V2 Liquidity found.": "No V2 Liquidity found.",
    "No active pools": "No active pools",
    "No data": "No data",
    "No description.": "No description.",
    "No liquidity found.": "No liquidity found.",
    "No pool found.": "No pool found.",
    "No proposals found.": "No proposals found.",
    "No results found.": "No results found.",
    "Not created": "Not created",
    "Note: Fee on transfer and rebase tokens are incompatible with Uniswap V3.": "Note: Fee on transfer and rebase tokens are incompatible with Uniswap V3.",
    "OFF": "OFF",
    "ON": "ON",
    "ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.": "ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.",
    "Off": "Off",
    "On": "On",
    "Once you are happy with the rate click supply to review.": "Once you are happy with the rate click supply to review.",
    "Only UNI votes that were self delegated or delegated to another address before block {0} are eligible for voting.": ["Only UNI votes that were self delegated or delegated to another address before block ", ["0"], " are eligible for voting."],
    "Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.": "Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.",
    "Optimism Gateway": "Optimism Gateway",
    "Optimism is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>": "Optimism is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>",
    "Optimistic Ethereum is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>": "Optimistic Ethereum is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>",
    "Optimistic Etherscan": "Optimistic Etherscan",
    "Out of range": "Out of range",
    "Output is estimated.": "Output is estimated.",
    "Output is estimated. If the price changes by more than {0}% your transaction will revert.": ["Output is estimated. If the price changes by more than ", ["0"], "% your transaction will revert."],
    "Output is estimated. You will receive at least <0>{0} {1}</0> or the transaction will revert.": ["Output is estimated. You will receive at least <0>", ["0"], " ", ["1"], "</0> or the transaction will revert."],
    "Output will be sent to <0>{0}</0>": ["Output will be sent to <0>", ["0"], "</0>"],
    "Owner": "Owner",
    "Participating pools": "Participating pools",
    "Pending": "Pending",
    "Please confirm you would like to remove this list by typing REMOVE": "Please confirm you would like to remove this list by typing REMOVE",
    "Please connect to Layer 1 Ethereum": "Please connect to Layer 1 Ethereum",
    "Please connect to a supported network in the dropdown menu or in your wallet.": "Please connect to a supported network in the dropdown menu or in your wallet.",
    "Please connect to the appropriate Ethereum network.": "Please connect to the appropriate Ethereum network.",
    "Please enter a valid slippage %": "Please enter a valid slippage %",
    "Please type the word \"{confirmWord}\" to enable expert mode.": ["Please type the word \"", ["confirmWord"], "\" to enable expert mode."],
    "Polygon Bridge": "Polygon Bridge",
    "Polygonscan": "Polygonscan",
    "Pool": "Pool",
    "Pool Found!": "Pool Found!",
    "Pool Rate": "Pool Rate",
    "Pool rate": "Pool rate",
    "Pool tokens in rewards pool:": "Pool tokens in rewards pool:",
    "Pooled {0}:": ["Pooled ", ["0"], ":"],
    "Pools Overview": "Pools Overview",
    "Powered by the Uniswap protocol": "Powered by the Uniswap protocol",
    "Preview": "Preview",
    "Price": "Price",
    "Price Difference:": "Price Difference:",
    "Price Impact": "Price Impact",
    "Price Impact Too High": "Price Impact Too High",
    "Price Updated": "Price Updated",
    "Price impact": "Price impact",
    "Price range": "Price range",
    "Price updated": "Price updated",
    "Price:": "Price:",
    "Prices and pool share": "Prices and pool share",
    "Proposal": "Proposal",
    "Proposal Submitted": "Proposal Submitted",
    "Proposal Title": "Proposal Title",
    "Proposals": "Proposals",
    "Proposals submitted by community members will appear here.": "Proposals submitted by community members will appear here.",
    "Proposed Action": "Proposed Action",
    "Proposer": "Proposer",
    "Protocol Disclaimer": "Protocol Disclaimer",
    "Queued": "Queued",
    "Rates": "Rates",
    "Read more about UNI": "Read more about UNI",
    "Read more about Uniswap governance": "Read more about Uniswap governance",
    "Read more about providing liquidity": "Read more about providing liquidity",
    "Read more about unsupported assets": "Read more about unsupported assets",
    "Recent Transactions": "Recent Transactions",
    "Recent transactions": "Recent transactions",
    "Recipient": "Recipient",
    "Reload the page": "Reload the page",
    "Reload the page to try again": "Reload the page to try again",
    "Remove": "Remove",
    "Remove <0/> and <1/>": "Remove <0/> and <1/>",
    "Remove Amount": "Remove Amount",
    "Remove Delegate": "Remove Delegate",
    "Remove Liquidity": "Remove Liquidity",
    "Remove list": "Remove list",
    "Removing {0} {1} and {2} {3}": ["Removing ", ["0"], " ", ["1"], " and ", ["2"], " ", ["3"]],
    "Removing {0} {1} and{2} {3}": ["Removing ", ["0"], " ", ["1"], " and", ["2"], " ", ["3"]],
    "Request Features": "Request Features",
    "Reset": "Reset",
    "Return": "Return",
    "Review swap": "Review swap",
    "Search by token name or address": "Search by token name or address",
    "Search name or paste address": "Search name or paste address",
    "Select Pair": "Select Pair",
    "Select a network": "Select a network",
    "Select a token": "Select a token",
    "Select a token to find your v2 liquidity.": "Select a token to find your v2 liquidity.",
    "Select an action": "Select an action",
    "Selected Range": "Selected Range",
    "Self": "Self",
    "Self Delegate": "Self Delegate",
    "Set Price Range": "Set Price Range",
    "Set Starting Price": "Set Starting Price",
    "Settings": "Settings",
    "Share of Pool": "Share of Pool",
    "Share of Pool:": "Share of Pool:",
    "Show Portis": "Show Portis",
    "Show closed positions": "Show closed positions",
    "Simple": "Simple",
    "Slippage tolerance": "Slippage tolerance",
    "Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons.": "Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons.",
    "Something went wrong": "Something went wrong",
    "Something went wrong.": "Something went wrong.",
    "Status": "Status",
    "Step 1. Get UNI-V2 Liquidity tokens": "Step 1. Get UNI-V2 Liquidity tokens",
    "Submit new proposal": "Submit new proposal",
    "Submitting Proposal": "Submitting Proposal",
    "Submitting Vote": "Submitting Vote",
    "Succeeded": "Succeeded",
    "Success": "Success",
    "Supply": "Supply",
    "Supplying {0} {1} and {2} {3}": ["Supplying ", ["0"], " ", ["1"], " and ", ["2"], " ", ["3"]],
    "Supplying {0} {1} and{2} {3}": ["Supplying ", ["0"], " ", ["1"], " and", ["2"], " ", ["3"]],
    "Swap": "Swap",
    "Swap <0/> for exactly <1/>": "Swap <0/> for exactly <1/>",
    "Swap Anyway": "Swap Anyway",
    "Swap confirmed": "Swap confirmed",
    "Swap details": "Swap details",
    "Swap exactly <0/> for <1/>": "Swap exactly <0/> for <1/>",
    "Swap failed: {0}": ["Swap failed: ", ["0"]],
    "Swap pending": "Swap pending",
    "Swap summary": "Swap summary",
    "Swapping {0} {1} for {2} {3}": ["Swapping ", ["0"], " ", ["1"], " for ", ["2"], " ", ["3"]],
    "Take a 10 minute survey to help us improve your experience in the Uniswap app.": "Take a 10 minute survey to help us improve your experience in the Uniswap app.",
    "Tell us what you think ↗": "Tell us what you think ↗",
    "Thanks for being part of the Uniswap community <0/>": "Thanks for being part of the Uniswap community <0/>",
    "The % you will earn in fees.": "The % you will earn in fees.",
    "The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.": "The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.",
    "The app fetches blockchain data from The Graph’s hosted service.": "The app fetches blockchain data from The Graph’s hosted service.",
    "The app fetches on-chain data and constructs contract calls with an Infura API.": "The app fetches on-chain data and constructs contract calls with an Infura API.",
    "The app fetches the optimal trade route from a Uniswap Labs server.": "The app fetches the optimal trade route from a Uniswap Labs server.",
    "The app logs anonymized usage statistics in order to improve over time.": "The app logs anonymized usage statistics in order to improve over time.",
    "The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons.": "The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons.",
    "The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons.<0>Learn more.</0>": "The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons.<0>Learn more.</0>",
    "The cost of sending this transaction is more than half of the value of the input amount.": "The cost of sending this transaction is more than half of the value of the input amount.",
    "The current fast gas amount for sending a transaction on L1. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in GWEI.": "The current fast gas amount for sending a transaction on L1. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in GWEI.",
    "The current fast gas amount for sending a transaction on L1. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in gwei.": "The current fast gas amount for sending a transaction on L1. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in gwei.",
    "The estimated difference between the USD values of input and output amounts.": "The estimated difference between the USD values of input and output amounts.",
    "The input token cannot be transferred. There may be an issue with the input token.": "The input token cannot be transferred. There may be an issue with the input token.",
    "The market price is outside your specified price range. Single-asset deposit only.": "The market price is outside your specified price range. Single-asset deposit only.",
    "The most recent block number on this network. Prices update on every block.": "The most recent block number on this network. Prices update on every block.",
    "The output token cannot be transferred. There may be an issue with the output token.": "The output token cannot be transferred. There may be an issue with the output token.",
    "The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.": "The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.",
    "The price of this pool is outside of your selected range. Your position is not currently earning fees.": "The price of this pool is outside of your selected range. Your position is not currently earning fees.",
    "The price of this pool is within your selected range. Your position is currently earning fees.": "The price of this pool is within your selected range. Your position is currently earning fees.",
    "The ratio of tokens you add will set the price of this pool.": "The ratio of tokens you add will set the price of this pool.",
    "The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.": "The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.",
    "There is no liquidity data.": "There is no liquidity data.",
    "These tokens are commonly paired with other tokens.": "These tokens are commonly paired with other tokens.",
    "This app uses the following third-party APIs:": "This app uses the following third-party APIs:",
    "This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.": "This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.",
    "This pool must be initialized on {0} before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount.": ["This pool must be initialized on ", ["0"], " before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount."],
    "This route optimizes your price by considering split routes, multiple hops, and gas costs.": "This route optimizes your price by considering split routes, multiple hops, and gas costs.",
    "This route optimizes your total output by considering split routes, multiple hops, and the gas cost of each step.": "This route optimizes your total output by considering split routes, multiple hops, and the gas cost of each step.",
    "This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.": "This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.",
    "This token is not supported in the Uniswap Labs app": "This token is not supported in the Uniswap Labs app",
    "This tool will safely migrate your {0} liquidity to V3. The process is completely trustless thanks to the": ["This tool will safely migrate your ", ["0"], " liquidity to V3. The process is completely trustless thanks to the"],
    "This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.": "This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.",
    "This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.": "This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.",
    "Tip: Custom tokens are stored locally in your browser": "Tip: Custom tokens are stored locally in your browser",
    "To": "To",
    "To (at least)": "To (at least)",
    "To start trading on {0}, first bridge your assets from L1 to L2. Please treat this as a beta release and learn about the risks before using {1}.": ["To start trading on ", ["0"], ", first bridge your assets from L1 to L2. Please treat this as a beta release and learn about the risks before using ", ["1"], "."],
    "To starting trading on {0}, first bridge your assets from L1 to L2. Please treat this as a beta release and learn about the risks before using {1}.": ["To starting trading on ", ["0"], ", first bridge your assets from L1 to L2. Please treat this as a beta release and learn about the risks before using ", ["1"], "."],
    "Token not supported": "Token not supported",
    "Tokens": "Tokens",
    "Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists.": "Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists.",
    "Top pools": "Top pools",
    "Total Supply": "Total Supply",
    "Total deposited": "Total deposited",
    "Total deposits": "Total deposits",
    "Trade Route": "Trade Route",
    "Trading": "Trading",
    "Transaction Deadline": "Transaction Deadline",
    "Transaction Details": "Transaction Details",
    "Transaction Settings": "Transaction Settings",
    "Transaction Submitted": "Transaction Submitted",
    "Transaction completed in": "Transaction completed in",
    "Transaction confirmed": "Transaction confirmed",
    "Transaction deadline": "Transaction deadline",
    "Transaction details": "Transaction details",
    "Transaction pending": "Transaction pending",
    "Transaction rejected.": "Transaction rejected.",
    "Transaction submitted": "Transaction submitted",
    "Transfer Token": "Transfer Token",
    "Try Again": "Try Again",
    "Try increasing your slippage tolerance": "Try increasing your slippage tolerance",
    "Try increasing your slippage tolerance.<0/>NOTE: Fee on transfer and rebase tokens are incompatible with Uniswap V3.": "Try increasing your slippage tolerance.<0/>NOTE: Fee on transfer and rebase tokens are incompatible with Uniswap V3.",
    "Turn On Expert Mode": "Turn On Expert Mode",
    "UNI has arrived": "UNI has arrived",
    "UNI in circulation:": "UNI in circulation:",
    "UNI price:": "UNI price:",
    "UNI tokens represent voting shares in Uniswap governance. You can vote on each proposal yourself or delegate your votes to a third party.": "UNI tokens represent voting shares in Uniswap governance. You can vote on each proposal yourself or delegate your votes to a third party.",
    "UNI {0}/{1} Burned": ["UNI ", ["0"], "/", ["1"], " Burned"],
    "UNI-V2 LP tokens are required. Once you've added liquidity to the {0}-{1} pool you can stake your liquidity tokens on this page.": ["UNI-V2 LP tokens are required. Once you've added liquidity to the ", ["0"], "-", ["1"], " pool you can stake your liquidity tokens on this page."],
    "UNI-V2 {0}-{1}": ["UNI-V2 ", ["0"], "-", ["1"]],
    "Unclaimed UNI": "Unclaimed UNI",
    "Unclaimed fees": "Unclaimed fees",
    "Unclaimed:": "Unclaimed:",
    "Undetermined": "Undetermined",
    "Unexpected error. Could not estimate gas for the swap.": "Unexpected error. Could not estimate gas for the swap.",
    "Unexpected issue with estimating the gas. Please try again.": "Unexpected issue with estimating the gas. Please try again.",
    "Uniswap Governance": "Uniswap Governance",
    "Uniswap Labs' Terms of Service": "Uniswap Labs' Terms of Service",
    "Uniswap available in: <0>{0}</0>": ["Uniswap available in: <0>", ["0"], "</0>"],
    "Uniswap governance is only available on Layer 1. Switch your network to Ethereum Mainnet to view Proposals and Vote.": "Uniswap governance is only available on Layer 1. Switch your network to Ethereum Mainnet to view Proposals and Vote.",
    "Uniswap liquidity mining": "Uniswap liquidity mining",
    "Uniswap migration contract↗": "Uniswap migration contract↗",
    "Uniswap on {0}": ["Uniswap on ", ["0"]],
    "Unknown Source": "Unknown Source",
    "Unknown error{0}. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.": ["Unknown error", ["0"], ". Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."],
    "Unlock Votes": "Unlock Votes",
    "Unlock Voting": "Unlock Voting",
    "Unlocking Votes": "Unlocking Votes",
    "Unsupported Asset": "Unsupported Asset",
    "Unsupported Assets": "Unsupported Assets",
    "Unsupported network - switch to another network to swap": "Unsupported network - switch to another network to swap",
    "Unsupported network - switch to another to trade.": "Unsupported network - switch to another to trade.",
    "Unsupported network–switch to another to trade.": "Unsupported network–switch to another to trade.",
    "Untitled": "Untitled",
    "Unwrap": "Unwrap",
    "Unwrap <0/> to ETH": "Unwrap <0/> to ETH",
    "Unwrap <0/> to {0}": ["Unwrap <0/> to ", ["0"]],
    "Unwrap confirmed": "Unwrap confirmed",
    "Unwrap native currency.": "Unwrap native currency.",
    "Unwrap pending": "Unwrap pending",
    "Unwrapping native currency.": "Unwrapping native currency.",
    "Update Delegation": "Update Delegation",
    "Update list": "Update list",
    "Use the Uniswap Labs API to get better pricing through a more efficient route.": "Use the Uniswap Labs API to get better pricing through a more efficient route.",
    "Use the Uniswap Labs API to get faster quotes.": "Use the Uniswap Labs API to get faster quotes.",
    "User": "User",
    "V2": "V2",
    "V2 is not available on Layer 2. Switch to Layer 1 Ethereum.": "V2 is not available on Layer 2. Switch to Layer 1 Ethereum.",
    "V2 liquidity": "V2 liquidity",
    "V3": "V3",
    "V3 {0} Price:": ["V3 ", ["0"], " Price:"],
    "View UNI Analytics": "View UNI Analytics",
    "View V2 Liquidity": "View V2 Liquidity",
    "View accrued fees and analytics<0>↗</0>": "View accrued fees and analytics<0>↗</0>",
    "View list": "View list",
    "View on Etherscan": "View on Etherscan",
    "View on Explorer": "View on Explorer",
    "View transaction on Explorer": "View transaction on Explorer",
    "Vote": "Vote",
    "Vote Against": "Vote Against",
    "Vote For": "Vote For",
    "Vote against proposal {proposalId}": ["Vote against proposal ", ["proposalId"]],
    "Vote against proposal {proposalKey}": ["Vote against proposal ", ["proposalKey"]],
    "Vote against proposal {proposalKey} with reason \"{0}\"": ["Vote against proposal ", ["proposalKey"], " with reason \"", ["0"], "\""],
    "Vote for proposal {proposalId}": ["Vote for proposal ", ["proposalId"]],
    "Vote for proposal {proposalKey}": ["Vote for proposal ", ["proposalKey"]],
    "Vote for proposal {proposalKey} with reason \"{0}\"": ["Vote for proposal ", ["proposalKey"], " with reason \"", ["0"], "\""],
    "Vote to abstain on proposal {proposalId}": ["Vote to abstain on proposal ", ["proposalId"]],
    "Vote to abstain on proposal {proposalKey}": ["Vote to abstain on proposal ", ["proposalKey"]],
    "Vote to abstain on proposal {proposalKey} with reason \"{0}\"": ["Vote to abstain on proposal ", ["proposalKey"], " with reason \"", ["0"], "\""],
    "Voting ended {0}": ["Voting ended ", ["0"]],
    "Voting ends approximately {0}": ["Voting ends approximately ", ["0"]],
    "Voting starts approximately {0}": ["Voting starts approximately ", ["0"]],
    "Waiting For Confirmation": "Waiting For Confirmation",
    "Wallet Address or ENS name": "Wallet Address or ENS name",
    "Weekly Rewards": "Weekly Rewards",
    "Welcome to team Unicorn :)": "Welcome to team Unicorn :)",
    "When you claim without withdrawing your liquidity remains in the mining pool.": "When you claim without withdrawing your liquidity remains in the mining pool.",
    "When you withdraw, the contract will automagically claim UNI on your behalf!": "When you withdraw, the contract will automagically claim UNI on your behalf!",
    "When you withdraw, your UNI is claimed and your liquidity is removed from the mining pool.": "When you withdraw, your UNI is claimed and your liquidity is removed from the mining pool.",
    "Withdraw": "Withdraw",
    "Withdraw & Claim": "Withdraw & Claim",
    "Withdraw deposited liquidity": "Withdraw deposited liquidity",
    "Withdrawing {0} UNI-V2": ["Withdrawing ", ["0"], " UNI-V2"],
    "Withdrew UNI-V2!": "Withdrew UNI-V2!",
    "Wrap": "Wrap",
    "Wrap <0/> to WETH": "Wrap <0/> to WETH",
    "Wrap <0/> to {0}": ["Wrap <0/> to ", ["0"]],
    "Wrap confirmed": "Wrap confirmed",
    "Wrap native currency.": "Wrap native currency.",
    "Wrap pending": "Wrap pending",
    "Wrapping native currency.": "Wrapping native currency.",
    "Wrong Network": "Wrong Network",
    "You already have an active or pending proposal": "You already have an active or pending proposal",
    "You are creating a pool": "You are creating a pool",
    "You are the first liquidity provider for this Uniswap V3 pool. Your liquidity will migrate at the current {0} price.": ["You are the first liquidity provider for this Uniswap V3 pool. Your liquidity will migrate at the current ", ["0"], " price."],
    "You are the first liquidity provider.": "You are the first liquidity provider.",
    "You can either vote on each proposal yourself or delegate your votes to a third party.": "You can either vote on each proposal yourself or delegate your votes to a third party.",
    "You can now trade {0}": ["You can now trade ", ["0"]],
    "You don't have enough votes to submit a proposal": "You don't have enough votes to submit a proposal",
    "You don’t have liquidity in this pool yet.": "You don’t have liquidity in this pool yet.",
    "You may have lost your network connection, or {label} might be down right now.": ["You may have lost your network connection, or ", ["label"], " might be down right now."],
    "You may have lost your network connection.": "You may have lost your network connection.",
    "You might consider waiting until the network fees go down to complete this transaction.": "You might consider waiting until the network fees go down to complete this transaction.",
    "You must connect an account.": "You must connect an account.",
    "You must give the Uniswap smart contracts permission to use your {0}. You only have to do this once per token.": ["You must give the Uniswap smart contracts permission to use your ", ["0"], ". You only have to do this once per token."],
    "You must have {formattedProposalThreshold} votes to submit a proposal": ["You must have ", ["formattedProposalThreshold"], " votes to submit a proposal"],
    "You should only deposit liquidity into Uniswap V3 at a price you believe is correct. <0/>If the price seems incorrect, you can either make a swap to move the price or wait for someone else to do so.": "You should only deposit liquidity into Uniswap V3 at a price you believe is correct. <0/>If the price seems incorrect, you can either make a swap to move the price or wait for someone else to do so.",
    "You will also collect fees earned from this position.": "You will also collect fees earned from this position.",
    "You will receive": "You will receive",
    "You will receive at least {0} {1} or the transaction will revert.": ["You will receive at least ", ["0"], " ", ["1"], " or the transaction will revert."],
    "You will send at most {0} {1} or the transaction will revert.": ["You will send at most ", ["0"], " ", ["1"], " or the transaction will revert."],
    "Your UNI Breakdown": "Your UNI Breakdown",
    "Your V2 liquidity": "Your V2 liquidity",
    "Your V3 liquidity positions will appear here.": "Your V3 liquidity positions will appear here.",
    "Your active V3 liquidity positions will appear here.": "Your active V3 liquidity positions will appear here.",
    "Your liquidity deposits": "Your liquidity deposits",
    "Your pool share:": "Your pool share:",
    "Your position": "Your position",
    "Your position has 0 liquidity, and is not earning fees.": "Your position has 0 liquidity, and is not earning fees.",
    "Your position will appear here.": "Your position will appear here.",
    "Your position will be 100% composed of {0} at this price": ["Your position will be 100% composed of ", ["0"], " at this price"],
    "Your position will be 100% {0} at this price.": ["Your position will be 100% ", ["0"], " at this price."],
    "Your position will not earn fees or be used in trades until the market price moves into your range.": "Your position will not earn fees or be used in trades until the market price moves into your range.",
    "Your positions": "Your positions",
    "Your rate": "Your rate",
    "Your total pool tokens:": "Your total pool tokens:",
    "Your transaction cost will be much higher as it includes the gas to create the pool.": "Your transaction cost will be much higher as it includes the gas to create the pool.",
    "Your transaction may be frontrun": "Your transaction may be frontrun",
    "Your transaction may fail": "Your transaction may fail",
    "Your transaction will revert if it has been pending for longer than this period of time.": "Your transaction will revert if it has been pending for longer than this period of time.",
    "Your transaction will revert if it has not occured by this deadline.": "Your transaction will revert if it has not occured by this deadline.",
    "Your transaction will revert if it is pending for more than this period of time.": "Your transaction will revert if it is pending for more than this period of time.",
    "Your transaction will revert if the price changes unfavorably by more than this percentage.": "Your transaction will revert if the price changes unfavorably by more than this percentage.",
    "Your transactions will appear here...": "Your transactions will appear here...",
    "Your unclaimed UNI": "Your unclaimed UNI",
    "after slippage": "after slippage",
    "confirm": "confirm",
    "for {0}": ["for ", ["0"]],
    "gwei": "gwei",
    "has socks emoji": "has socks emoji",
    "here.": "here.",
    "https:// or ipfs:// or ENS name": "https:// or ipfs:// or ENS name",
    "minutes": "minutes",
    "via {0}": ["via ", ["0"]],
    "via {0} token list": ["via ", ["0"], " token list"],
    "{0, plural, =1 {Best route via 1 hop} other {Best route via # hops}}": [["0", "plural", {
      1: "Best route via 1 hop",
      other: ["Best route via ", "#", " hops"]
    }]],
    "{0, plural, =1 {Import token} other {Import tokens}}": [["0", "plural", {
      1: "Import token",
      other: "Import tokens"
    }]],
    "{0, plural, one {Best route via 1 hop} other {Best route via # hops}}": [["0", "plural", {
      one: "Best route via 1 hop",
      other: ["Best route via ", "#", " hops"]
    }]],
    "{0, plural, one {Import token} other {Import tokens}}": [["0", "plural", {
      one: "Import token",
      other: "Import tokens"
    }]],
    "{0}": [["0"]],
    "{0} %": [["0"], " %"],
    "{0} <0/> per <1/>": [["0"], " <0/> per <1/>"],
    "{0} Custom Tokens": [["0"], " Custom Tokens"],
    "{0} Deposited": [["0"], " Deposited"],
    "{0} ETH": [["0"], " ETH"],
    "{0} Fees Earned:": [["0"], " Fees Earned:"],
    "{0} Pending": [["0"], " Pending"],
    "{0} UNI": [["0"], " UNI"],
    "{0} UNI / week": [["0"], " UNI / week"],
    "{0} UNI-V2": [["0"], " UNI-V2"],
    "{0} UNI-V2 LP tokens available": [["0"], " UNI-V2 LP tokens available"],
    "{0} Votes": [["0"], " Votes"],
    "{0} logo": [["0"], " logo"],
    "{0} per {1}": [["0"], " per ", ["1"]],
    "{0} tokens": [["0"], " tokens"],
    "{0} {1} Price:": [["0"], " ", ["1"], " Price:"],
    "{0} {nativeCurrencySymbol}": [["0"], " ", ["nativeCurrencySymbol"]],
    "{0} • Added by user": [["0"], " • Added by user"],
    "{0}%": [["0"], "%"],
    "{0}% fee tier": [["0"], "% fee tier"],
    "{0}% pool": [["0"], "% pool"],
    "{0}% select": [["0"], "% select"],
    "{0}-{1} Liquidity Mining": [["0"], "-", ["1"], " Liquidity Mining"],
    "{0}/{1} LP NFT": [["0"], "/", ["1"], " LP NFT"],
    "{0}/{1} LP Tokens": [["0"], "/", ["1"], " LP Tokens"],
    "{SOCKS_AMOUNT} UNI": [["SOCKS_AMOUNT"], " UNI"],
    "{USER_AMOUNT} UNI": [["USER_AMOUNT"], " UNI"],
    "{activeTokensOnThisChain} tokens": [["activeTokensOnThisChain"], " tokens"],
    "{integrator} fee": [["integrator"], " fee"],
    "{label} token bridge": [["label"], " token bridge"],
    "{min}m {sec}s": [["min"], "m ", ["sec"], "s"],
    "{min}m{sec}s": [["min"], "m", ["sec"], "s"],
    "{percentForSlider}%": [["percentForSlider"], "%"],
    "{sec}s": [["sec"], "s"],
    "{tokenB} per {tokenA}": [["tokenB"], " per ", ["tokenA"]],
    "~$ <0/>": "~$ <0/>",
    "← Back to Pools Overview": "← Back to Pools Overview"
  }
};

var enUS$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  'default': enUS
}, [enUS]));

var SUPPORTED_LOCALES = [// order as they appear in the language dropdown
'en-US', 'af-ZA', 'ar-SA', 'ca-ES', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'es-ES', 'fi-FI', 'fr-FR', 'he-IL', 'hu-HU', 'id-ID', 'it-IT', 'ja-JP', 'ko-KR', 'nl-NL', 'no-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sr-SP', 'sv-SE', 'sw-TZ', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-TW'];
var DEFAULT_LOCALE = 'en-US';
var DEFAULT_CATALOG = enUS$1;

function formatLocaleNumber(_ref) {
  var number = _ref.number,
      locale = _ref.locale,
      sigFigs = _ref.sigFigs,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  var localeArg;

  if (!locale || locale && !SUPPORTED_LOCALES.includes(locale)) {
    localeArg = DEFAULT_LOCALE;
  } else {
    localeArg = [locale, DEFAULT_LOCALE];
  }

  options.maximumSignificantDigits = options.maximumSignificantDigits || sigFigs;

  if (typeof number === 'number') {
    return number.toLocaleString(localeArg, options);
  } else {
    return parseFloat(number.toSignificant(sigFigs)).toLocaleString(localeArg, options);
  }
}

function formatCurrencyAmount(amount, sigFigs) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LOCALE;

  if (!amount) {
    return '-';
  }

  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return '0';
  }

  if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
    return "<".concat(formatLocaleNumber({
      number: 0.00001,
      locale: locale
    }));
  }

  return formatLocaleNumber({
    number: amount,
    locale: locale,
    sigFigs: sigFigs
  });
}
function formatPrice(price, sigFigs) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LOCALE;

  if (!price) {
    return '-';
  }

  if (parseFloat(price.toFixed(sigFigs)) < 0.0001) {
    return "<".concat(formatLocaleNumber({
      number: 0.00001,
      locale: locale
    }));
  }

  return formatLocaleNumber({
    number: price,
    locale: locale,
    sigFigs: sigFigs
  });
}

var MIN_NATIVE_CURRENCY_FOR_GAS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 ETH

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */

function maxAmountSpend(currencyAmount) {
  if (!currencyAmount) return undefined;

  if (currencyAmount.currency.isNative) {
    if (JSBI.greaterThan(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS)) {
      return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.subtract(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS));
    } else {
      return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.BigInt(0));
    }
  }

  return currencyAmount;
}

var _templateObject$s;

var _excluded$2 = ["token"];

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var badSrcs = new Set();

function TokenImg(_ref) {
  var token = _ref.token,
      rest = _objectWithoutProperties(_ref, _excluded$2);

  var srcs = useCurrencyLogoURIs(token);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      src = _useState2[0],
      setSrc = _useState2[1];

  useEffect(function () {
    setSrc(srcs.find(function (src) {
      return !badSrcs.has(src);
    }));
  }, [srcs]);
  var onError = useCallback(function () {
    if (src) badSrcs.add(src);
    setSrc(srcs.find(function (src) {
      return !badSrcs.has(src);
    }));
  }, [src, srcs]);

  if (src) {
    return /*#__PURE__*/jsx("img", _objectSpread$a({
      src: src,
      alt: token.name || token.symbol,
      onError: onError
    }, rest));
  }

  return /*#__PURE__*/jsx(MissingToken, _objectSpread$a({
    color: "secondary"
  }, rest));
}

var TokenImg$1 = styled(TokenImg)(_templateObject$s || (_templateObject$s = _taggedTemplateLiteral(["\n  // radial-gradient calculates distance from the corner, not the edge: divide by sqrt(2)\n  background: radial-gradient(\n    ", " calc(100% / ", " - 1.5px),\n    ", " calc(100% / ", " - 1.5px)\n  );\n  border-radius: 100%;\n  height: ", "em;\n  width: ", "em;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.module;
}, Math.sqrt(2), function (_ref3) {
  var theme = _ref3.theme;
  return theme.outline;
}, Math.sqrt(2), function (_ref4) {
  var size = _ref4.size;
  return size || 1;
}, function (_ref5) {
  var size = _ref5.size;
  return size || 1;
});

var _excluded$1 = ["value", "onChange"],
    _excluded2 = ["value", "onChange", "enforcer", "pattern"];

var _templateObject$r, _templateObject2$d;

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Input$2 = styled.input(_templateObject$r || (_templateObject$r = _taggedTemplateLiteral(["\n  -webkit-appearance: textfield;\n  background-color: transparent;\n  border: none;\n  color: currentColor;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  line-height: inherit;\n  margin: 0;\n  outline: none;\n  overflow: hidden;\n  padding: 0;\n  text-align: left;\n  text-overflow: ellipsis;\n  width: 100%;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  [type='number'] {\n    -moz-appearance: textfield;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.secondary;
});
var StringInput = /*#__PURE__*/forwardRef(function StringInput(_ref2, ref) {
  var value = _ref2.value,
      _onChange = _ref2.onChange,
      props = _objectWithoutProperties(_ref2, _excluded$1);

  return /*#__PURE__*/jsx(Input$2, _objectSpread$9({
    value: value,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    } // universal input options
    ,
    inputMode: "text",
    autoComplete: "off",
    autoCorrect: "off" // text-specific options
    ,
    type: "text",
    placeholder: props.placeholder || '-',
    minLength: 1,
    spellCheck: "false",
    ref: ref
  }, props));
});

function isNumericallyEqual(a, b) {
  var _a$split = a.split('.'),
      _a$split2 = _slicedToArray(_a$split, 2),
      aInteger = _a$split2[0],
      aDecimal = _a$split2[1];

  var _b$split = b.split('.'),
      _b$split2 = _slicedToArray(_b$split, 2),
      bInteger = _b$split2[0],
      bDecimal = _b$split2[1];

  return JSBI.equal(JSBI.BigInt(aInteger !== null && aInteger !== void 0 ? aInteger : 0), JSBI.BigInt(bInteger !== null && bInteger !== void 0 ? bInteger : 0)) && JSBI.equal(JSBI.BigInt(aDecimal !== null && aDecimal !== void 0 ? aDecimal : 0), JSBI.BigInt(bDecimal !== null && bDecimal !== void 0 ? bDecimal : 0));
}

var NumericInput = /*#__PURE__*/forwardRef(function NumericInput(_ref3, ref) {
  var value = _ref3.value,
      onChange = _ref3.onChange,
      enforcer = _ref3.enforcer,
      pattern = _ref3.pattern,
      props = _objectWithoutProperties(_ref3, _excluded2);

  var _useState = useState(value !== null && value !== void 0 ? value : ''),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    if (!isNumericallyEqual(state, value)) {
      setState(value !== null && value !== void 0 ? value : '');
    }
  }, [value, state, setState]);
  var validateChange = useCallback(function (event) {
    var nextInput = enforcer(event.target.value.replace(/,/g, '.'));

    if (nextInput !== null) {
      setState(nextInput !== null && nextInput !== void 0 ? nextInput : '');

      if (!isNumericallyEqual(nextInput, value)) {
        onChange(nextInput);
      }
    }
  }, [value, onChange, enforcer]);
  return /*#__PURE__*/jsx(Input$2, _objectSpread$9({
    value: state,
    onChange: validateChange // universal input options
    ,
    inputMode: "decimal",
    autoComplete: "off",
    autoCorrect: "off" // text-specific options
    ,
    type: "text",
    pattern: pattern,
    placeholder: props.placeholder || '0',
    minLength: 1,
    maxLength: 79,
    spellCheck: "false",
    ref: ref
  }, props));
});
var integerRegexp = /^\d*$/;

var integerEnforcer = function integerEnforcer(nextUserInput) {
  if (nextUserInput === '' || integerRegexp.test(nextUserInput)) {
    var nextInput = parseInt(nextUserInput);
    return isNaN(nextInput) ? '' : nextInput.toString();
  }

  return null;
};

var IntegerInput = /*#__PURE__*/forwardRef(function IntegerInput(props, ref) {
  return /*#__PURE__*/jsx(NumericInput, _objectSpread$9({
    pattern: "^[0-9]*$",
    enforcer: integerEnforcer,
    ref: ref
  }, props));
});
var decimalRegexp = /^\d*(?:[.])?\d*$/;

var decimalEnforcer = function decimalEnforcer(nextUserInput) {
  if (nextUserInput === '') {
    return '';
  } else if (nextUserInput === '.') {
    return '0.';
  } else if (decimalRegexp.test(nextUserInput)) {
    return nextUserInput;
  }

  return null;
};

var DecimalInput = /*#__PURE__*/forwardRef(function DecimalInput(props, ref) {
  return /*#__PURE__*/jsx(NumericInput, _objectSpread$9({
    pattern: "^[0-9]*[.,]?[0-9]*$",
    enforcer: decimalEnforcer,
    ref: ref
  }, props));
});
var inputCss = css(_templateObject2$d || (_templateObject2$d = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", "em;\n  cursor: text;\n  padding: calc(0.5em - 1px);\n\n  :hover:not(:focus-within) {\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :focus-within {\n    border-color: ", ";\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.container;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.container;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.borderRadius;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.onHover(theme.container);
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.onHover(theme.container);
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.active;
});

var i = function i(e) {
  return "string" == typeof e;
},
    s = function s(e) {
  return "function" == typeof e;
},
    u = new Map(),
    c = new Map();

function f(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
  return function (n) {
    if (i(n) && (n = new Date(n)), r) {
      var a = v(e, t),
          o = c.get(a);
      if (o) return o.format(n);
      var l = new Intl.DateTimeFormat(e, t);
      return c.set(a, l), l.format(n);
    }

    var s = new Intl.DateTimeFormat(e, t);
    return s.format(n);
  };
}

function h(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
  return function (n) {
    if (r) {
      var a = v(e, t),
          o = u.get(a);
      if (o) return o.format(n);
      var l = new Intl.NumberFormat(e, t);
      return u.set(a, l), l.format(n);
    }

    var i = new Intl.NumberFormat(e, t);
    return i.format(n);
  };
}

function v(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = Array.isArray(e) ? e.sort().join("-") : e;
  return "".concat(r, "-").concat(JSON.stringify(t));
}

var m = Object.freeze({
  __proto__: null,
  date: f,
  number: h
});

function g(e) {
  var t = e.locale,
      r = e.locales,
      n = e.values,
      a = e.formats,
      o = e.localeData,
      u = function (e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
      plurals: void 0
    },
        n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    t = t || e;

    var a = r.plurals,
        o = function o(e) {
      return i(e) ? n[e] || {
        style: e
      } : e;
    },
        u = function u(e, r) {
      return function (n) {
        var a = s(r) ? r(n) : r,
            o = Array.isArray(a) ? a : [a],
            l = h(t)(e);
        return o.map(function (e) {
          return i(e) ? e.replace("#", l) : e;
        });
      };
    };

    return a || console.error("Plurals for locale ".concat(e, " aren't loaded. Use i18n.loadLocaleData method to load plurals for specific locale. Using other plural rule as a fallback.")), {
      plural: function plural(e, t) {
        var r = t.offset,
            n = void 0 === r ? 0 : r,
            o = _objectWithoutProperties(t, ["offset"]),
            i = o[e] || o[null == a ? void 0 : a(e - n)] || o.other;
        return u(e - n, i);
      },
      selectordinal: function selectordinal(e, t) {
        var r = t.offset,
            n = void 0 === r ? 0 : r,
            o = _objectWithoutProperties(t, ["offset"]),
            i = o[e] || o[null == a ? void 0 : a(e - n, !0)] || o.other;
        return u(e - n, i);
      },
      select: function select(e, t) {
        return t[e] || t.other;
      },
      number: function number(e, r) {
        return h(t, o(r))(e);
      },
      date: function date(e, r) {
        return f(t, o(r))(e);
      },
      undefined: function undefined$1(e) {
        return e;
      }
    };
  }(t, r, o, a);

  return function e(t, r, a) {
    var o = n[t],
        l = u[r](o, a),
        i = s(l) ? l(e) : l;
    return Array.isArray(i) ? i.join("") : i;
  };
}

function d(e, t, r, n) {
  return function (a) {
    var l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        s = g({
      locale: t,
      locales: r,
      localeData: n,
      formats: l,
      values: a
    }),
        u = function e(t) {
      return Array.isArray(t) ? t.reduce(function (t, r) {
        if (i(r)) return t + r;
        var n = _slicedToArray(r, 3),
            a = n[0],
            l = n[1],
            u = n[2],
            c = {};
        null == u || i(u) ? c = u : Object.keys(u).forEach(function (t) {
          c[t] = e(u[t]);
        });
        var f = s(a, l, c);
        return null == f ? t : t + f;
      }, "") : t;
    },
        c = u(e);

    return i(c) && /\\u[a-fA-F0-9]{4}/g.test(c) ? JSON.parse('"'.concat(c.trim(), '"')) : i(c) ? c.trim() : c;
  };
}

var p = function () {
  function r() {
    _classCallCheck(this, r), this._events = {};
  }

  return _createClass(r, [{
    key: "on",
    value: function value(e, t) {
      var r = this;
      return this._hasEvent(e) || (this._events[e] = []), this._events[e].push(t), function () {
        return r.removeListener(e, t);
      };
    }
  }, {
    key: "removeListener",
    value: function value(e, t) {
      if (this._hasEvent(e)) {
        var r = this._events[e].indexOf(t);

        ~r && this._events[e].splice(r, 1);
      }
    }
  }, {
    key: "emit",
    value: function value(e) {
      for (var t = this, r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) {
        n[a - 1] = arguments[a];
      }

      this._hasEvent(e) && this._events[e].map(function (e) {
        return e.apply(t, n);
      });
    }
  }, {
    key: "_hasEvent",
    value: function value(e) {
      return Array.isArray(this._events[e]);
    }
  }]), r;
}();

function y(e) {
  var t = function () {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;

    try {
      return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
    } catch (e) {
      return !1;
    }
  }();

  return function () {
    var r,
        o = _getPrototypeOf(e);

    if (t) {
      var l = _getPrototypeOf(this).constructor;
      r = Reflect.construct(o, arguments, l);
    } else r = o.apply(this, arguments);

    return _possibleConstructorReturn(this, r);
  };
}

var _$1 = function (n) {
  _inherits(o, n);
  var a = y(o);

  function o(t) {
    var r;
    return _classCallCheck(this, o), r = a.call(this), r._messages = {}, r._localeData = {}, null != t.missing && (r._missing = t.missing), null != t.messages && r.load(t.messages), null != t.localeData && r.loadLocaleData(t.localeData), null == t.locale && null == t.locales || r.activate(t.locale, t.locales), r;
  }

  return _createClass(o, [{
    key: "_loadLocaleData",
    value: function value(e, t) {
      null == this._localeData[e] ? this._localeData[e] = t : Object.assign(this._localeData[e], t);
    }
  }, {
    key: "loadLocaleData",
    value: function value(e, t) {
      var r = this;
      null != t ? this._loadLocaleData(e, t) : Object.keys(e).forEach(function (t) {
        return r._loadLocaleData(t, e[t]);
      }), this.emit("change");
    }
  }, {
    key: "_load",
    value: function value(e, t) {
      null == this._messages[e] ? this._messages[e] = t : Object.assign(this._messages[e], t);
    }
  }, {
    key: "load",
    value: function value(e, t) {
      var r = this;
      null != t ? this._load(e, t) : Object.keys(e).forEach(function (t) {
        return r._load(t, e[t]);
      }), this.emit("change");
    }
  }, {
    key: "activate",
    value: function value(e, t) {
      this._locale = e, this._locales = t, this.emit("change");
    }
  }, {
    key: "_",
    value: function value(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          n = r.message,
          a = r.formats;
      i(e) || (t = e.values || t, n = e.message, e = e.id);
      var o = this.messages[e] || n || e,
          l = this._missing;
      return l && !this.messages[e] ? s(l) ? l(this.locale, e) : l : (this.messages[e] || this.emit("missing", {
        id: e,
        locale: this._locale
      }), i(o) && /\\u[a-fA-F0-9]{4}/g.test(o) ? JSON.parse('"'.concat(o, '"')) : i(o) ? o : d(o, this.locale, this.locales, this.localeData)(t, a));
    }
  }, {
    key: "date",
    value: function value(e, t) {
      return f(this.locales || this.locale, t)(e);
    }
  }, {
    key: "number",
    value: function value(e, t) {
      return h(this.locales || this.locale, t)(e);
    }
  }, {
    key: "locale",
    get: function get() {
      return this._locale;
    }
  }, {
    key: "locales",
    get: function get() {
      return this._locales;
    }
  }, {
    key: "messages",
    get: function get() {
      var e;
      return null !== (e = this._messages[this._locale]) && void 0 !== e ? e : {};
    }
  }, {
    key: "localeData",
    get: function get() {
      var e;
      return null !== (e = this._localeData[this._locale]) && void 0 !== e ? e : {};
    }
  }]), o;
}(p);

function b() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  return new _$1(e);
}

var D = b();

/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

function peg$subclass(child, parent) {
  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message = message;
  this.expected = expected;
  this.found = found;
  this.location = location;
  this.name = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function (expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function literal(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },
    "class": function _class(expectation) {
      var escapedParts = "",
          i;

      for (i = 0; i < expectation.parts.length; i++) {
        escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
      }

      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },
    any: function any(expectation) {
      return "any character";
    },
    end: function end(expectation) {
      return "end of input";
    },
    other: function other(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
      return '\\x0' + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return '\\x' + hex(ch);
    });
  }

  function classEscape(s) {
    return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
      return '\\x0' + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return '\\x' + hex(ch);
    });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i,
        j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }

      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},
      peg$startRuleFunctions = {
    start: peg$parsestart
  },
      peg$startRuleFunction = peg$parsestart,
      peg$c0 = "#",
      peg$c1 = peg$literalExpectation("#", false),
      peg$c2 = function peg$c2() {
    return inPlural[0];
  },
      peg$c3 = function peg$c3() {
    return {
      type: 'octothorpe'
    };
  },
      peg$c4 = function peg$c4(str) {
    return str.join('');
  },
      peg$c5 = "{",
      peg$c6 = peg$literalExpectation("{", false),
      peg$c7 = "}",
      peg$c8 = peg$literalExpectation("}", false),
      peg$c9 = function peg$c9(arg) {
    return {
      type: 'argument',
      arg: arg
    };
  },
      peg$c10 = ",",
      peg$c11 = peg$literalExpectation(",", false),
      peg$c12 = "select",
      peg$c13 = peg$literalExpectation("select", false),
      peg$c14 = function peg$c14(arg, m) {
    if (options.strict) {
      inPlural.unshift(false);
    }

    return m;
  },
      peg$c15 = function peg$c15(arg, cases) {
    if (options.strict) inPlural.shift();
    return {
      type: 'select',
      arg: arg,
      cases: cases
    };
  },
      peg$c16 = "plural",
      peg$c17 = peg$literalExpectation("plural", false),
      peg$c18 = "selectordinal",
      peg$c19 = peg$literalExpectation("selectordinal", false),
      peg$c20 = function peg$c20(arg, m) {
    inPlural.unshift(true);
    return m;
  },
      peg$c21 = function peg$c21(arg, type, offset, cases) {
    var ls = (type === 'selectordinal' ? options.ordinal : options.cardinal) || ['zero', 'one', 'two', 'few', 'many', 'other'];
    if (ls && ls.length) cases.forEach(function (c) {
      if (isNaN(c.key) && ls.indexOf(c.key) < 0) throw new Error('Invalid key `' + c.key + '` for argument `' + arg + '`.' + ' Valid ' + type + ' keys for this locale are `' + ls.join('`, `') + '`, and explicit keys like `=0`.');
    });
    inPlural.shift();
    return {
      type: type,
      arg: arg,
      offset: offset || 0,
      cases: cases
    };
  },
      peg$c22 = function peg$c22(arg, key, param) {
    return {
      type: 'function',
      arg: arg,
      key: key,
      param: param
    };
  },
      peg$c23 = peg$otherExpectation("identifier"),
      peg$c24 = /^[^\t-\r \x85\u200E\u200F\u2028\u2029!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/,
      peg$c25 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\u200E", "\u200F", "\u2028", "\u2029", ["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], true, false),
      peg$c26 = function peg$c26(key, tokens) {
    return {
      key: key,
      tokens: tokens
    };
  },
      peg$c27 = function peg$c27(tokens) {
    return tokens;
  },
      peg$c28 = peg$otherExpectation("plural offset"),
      peg$c29 = "offset",
      peg$c30 = peg$literalExpectation("offset", false),
      peg$c31 = ":",
      peg$c32 = peg$literalExpectation(":", false),
      peg$c33 = function peg$c33(d) {
    return d;
  },
      peg$c34 = "=",
      peg$c35 = peg$literalExpectation("=", false),
      peg$c36 = "number",
      peg$c37 = peg$literalExpectation("number", false),
      peg$c38 = "date",
      peg$c39 = peg$literalExpectation("date", false),
      peg$c40 = "time",
      peg$c41 = peg$literalExpectation("time", false),
      peg$c42 = "spellout",
      peg$c43 = peg$literalExpectation("spellout", false),
      peg$c44 = "ordinal",
      peg$c45 = peg$literalExpectation("ordinal", false),
      peg$c46 = "duration",
      peg$c47 = peg$literalExpectation("duration", false),
      peg$c48 = function peg$c48(key) {
    if (options.strict || /^\d/.test(key)) return false;

    switch (key.toLowerCase()) {
      case 'select':
      case 'plural':
      case 'selectordinal':
        return false;

      default:
        return true;
    }
  },
      peg$c49 = function peg$c49(key) {
    return key;
  },
      peg$c50 = function peg$c50(tokens) {
    return !options.strict;
  },
      peg$c51 = function peg$c51(tokens) {
    return {
      tokens: tokens
    };
  },
      peg$c52 = function peg$c52(parts) {
    return {
      tokens: [parts.join('')]
    };
  },
      peg$c53 = peg$otherExpectation("a valid (strict) function parameter"),
      peg$c54 = /^[^'{}]/,
      peg$c55 = peg$classExpectation(["'", "{", "}"], true, false),
      peg$c56 = function peg$c56(p) {
    return p.join('');
  },
      peg$c57 = "'",
      peg$c58 = peg$literalExpectation("'", false),
      peg$c59 = function peg$c59(quoted) {
    return quoted;
  },
      peg$c60 = function peg$c60(p) {
    return '{' + p.join('') + '}';
  },
      peg$c61 = peg$otherExpectation("doubled apostrophe"),
      peg$c62 = "''",
      peg$c63 = peg$literalExpectation("''", false),
      peg$c64 = function peg$c64() {
    return "'";
  },
      peg$c65 = /^[^']/,
      peg$c66 = peg$classExpectation(["'"], true, false),
      peg$c67 = "'{",
      peg$c68 = peg$literalExpectation("'{", false),
      peg$c69 = function peg$c69(str) {
    return "{" + str.join('');
  },
      peg$c70 = "'}",
      peg$c71 = peg$literalExpectation("'}", false),
      peg$c72 = function peg$c72(str) {
    return "}" + str.join('');
  },
      peg$c73 = peg$otherExpectation("escaped string"),
      peg$c74 = "'#",
      peg$c75 = peg$literalExpectation("'#", false),
      peg$c76 = function peg$c76(str) {
    return "#" + str.join('');
  },
      peg$c77 = function peg$c77(quotedOcto) {
    return quotedOcto[0];
  },
      peg$c78 = peg$otherExpectation("plain char"),
      peg$c79 = /^[^{}#\0-\x08\x0E-\x1F\x7F]/,
      peg$c80 = peg$classExpectation(["{", "}", "#", ["\0", "\b"], ["\x0E", "\x1F"], "\x7F"], true, false),
      peg$c81 = function peg$c81(octo) {
    return !inPlural[0];
  },
      peg$c82 = function peg$c82(octo) {
    return octo;
  },
      peg$c83 = peg$otherExpectation("integer"),
      peg$c84 = /^[0-9]/,
      peg$c85 = peg$classExpectation([["0", "9"]], false, false),
      peg$c86 = peg$otherExpectation("white space"),
      peg$c87 = /^[\t-\r \x85\u200E\u200F\u2028\u2029]/,
      peg$c88 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\u200E", "\u200F", "\u2028", "\u2029"], false, false),
      peg$currPos = 0,
      peg$posDetailsCache = [{
    line: 1,
    column: 1
  }],
      peg$maxFailPos = 0,
      peg$maxFailExpected = [],
      peg$silentFails = 0,
      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function peg$literalExpectation(text, ignoreCase) {
    return {
      type: "literal",
      text: text,
      ignoreCase: ignoreCase
    };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return {
      type: "class",
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase
    };
  }

  function peg$endExpectation() {
    return {
      type: "end"
    };
  }

  function peg$otherExpectation(description) {
    return {
      type: "other",
      description: description
    };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos],
        p;

    if (details) {
      return details;
    } else {
      p = pos - 1;

      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails = peg$computePosDetails(endPos);
    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
  }

  function peg$parsestart() {
    var s0, s1;
    s0 = [];
    s1 = peg$parsetoken();

    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parsetoken();
    }

    return s0;
  }

  function peg$parsetoken() {
    var s0, s1, s2;
    s0 = peg$parseargument();

    if (s0 === peg$FAILED) {
      s0 = peg$parseselect();

      if (s0 === peg$FAILED) {
        s0 = peg$parseplural();

        if (s0 === peg$FAILED) {
          s0 = peg$parsefunction();

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 35) {
              s1 = peg$c0;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c1);
              }
            }

            if (s1 !== peg$FAILED) {
              s2 = peg$c2();

              if (s2) {
                s2 = void 0;
              } else {
                s2 = peg$FAILED;
              }

              if (s2 !== peg$FAILED) {
                s1 = peg$c3();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parsechar();

              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parsechar();
                }
              } else {
                s1 = peg$FAILED;
              }

              if (s1 !== peg$FAILED) {
                s1 = peg$c4(s1);
              }

              s0 = s1;
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseargument() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c6);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c7;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s5 !== peg$FAILED) {
              s1 = peg$c9(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseselect() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c6);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c11);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;

                if (input.substr(peg$currPos, 6) === peg$c12) {
                  s8 = peg$c12;
                  peg$currPos += 6;
                } else {
                  s8 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                  }
                }

                if (s8 !== peg$FAILED) {
                  s8 = peg$c14(s3, s8);
                }

                s7 = s8;

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c10;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c11);
                      }
                    }

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();

                      if (s10 !== peg$FAILED) {
                        s11 = [];
                        s12 = peg$parseselectCase();

                        if (s12 !== peg$FAILED) {
                          while (s12 !== peg$FAILED) {
                            s11.push(s12);
                            s12 = peg$parseselectCase();
                          }
                        } else {
                          s11 = peg$FAILED;
                        }

                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();

                          if (s12 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                              s13 = peg$c7;
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;

                              if (peg$silentFails === 0) {
                                peg$fail(peg$c8);
                              }
                            }

                            if (s13 !== peg$FAILED) {
                              s1 = peg$c15(s3, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseplural() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c6);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c11);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;

                if (input.substr(peg$currPos, 6) === peg$c16) {
                  s8 = peg$c16;
                  peg$currPos += 6;
                } else {
                  s8 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }

                if (s8 === peg$FAILED) {
                  if (input.substr(peg$currPos, 13) === peg$c18) {
                    s8 = peg$c18;
                    peg$currPos += 13;
                  } else {
                    s8 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c19);
                    }
                  }
                }

                if (s8 !== peg$FAILED) {
                  s8 = peg$c20(s3, s8);
                }

                s7 = s8;

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c10;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c11);
                      }
                    }

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();

                      if (s10 !== peg$FAILED) {
                        s11 = peg$parseoffset();

                        if (s11 === peg$FAILED) {
                          s11 = null;
                        }

                        if (s11 !== peg$FAILED) {
                          s12 = [];
                          s13 = peg$parsepluralCase();

                          if (s13 !== peg$FAILED) {
                            while (s13 !== peg$FAILED) {
                              s12.push(s13);
                              s13 = peg$parsepluralCase();
                            }
                          } else {
                            s12 = peg$FAILED;
                          }

                          if (s12 !== peg$FAILED) {
                            s13 = peg$parse_();

                            if (s13 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 125) {
                                s14 = peg$c7;
                                peg$currPos++;
                              } else {
                                s14 = peg$FAILED;

                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c8);
                                }
                              }

                              if (s14 !== peg$FAILED) {
                                s1 = peg$c21(s3, s7, s11, s12);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefunction() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c6);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseid();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c10;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c11);
              }
            }

            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();

              if (s6 !== peg$FAILED) {
                s7 = peg$parsefunctionKey();

                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();

                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsefunctionParam();

                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }

                    if (s9 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s10 = peg$c7;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c8);
                        }
                      }

                      if (s10 !== peg$FAILED) {
                        s1 = peg$c22(s3, s7, s9);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseid() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];

    if (peg$c24.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c25);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c24.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c25);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c23);
      }
    }

    return s0;
  }

  function peg$parseselectCase() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      s2 = peg$parseid();

      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsecaseTokens();

          if (s4 !== peg$FAILED) {
            s1 = peg$c26(s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsepluralCase() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      s2 = peg$parsepluralKey();

      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsecaseTokens();

          if (s4 !== peg$FAILED) {
            s1 = peg$c26(s2, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsecaseTokens() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c5;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c6);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parse_();

      if (s3 !== peg$FAILED) {
        s4 = peg$currPos;
        peg$silentFails++;

        if (input.charCodeAt(peg$currPos) === 123) {
          s5 = peg$c5;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        peg$silentFails--;

        if (s5 !== peg$FAILED) {
          peg$currPos = s4;
          s4 = void 0;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsetoken();

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsetoken();
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s5 = peg$c7;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s5 !== peg$FAILED) {
              s1 = peg$c27(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseoffset() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c29) {
        s2 = peg$c29;
        peg$currPos += 6;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c30);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s4 = peg$c31;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c32);
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s6 = peg$parsedigits();

              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();

                if (s7 !== peg$FAILED) {
                  s1 = peg$c33(s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c28);
      }
    }

    return s0;
  }

  function peg$parsepluralKey() {
    var s0, s1, s2;
    s0 = peg$parseid();

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c34;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsedigits();

        if (s2 !== peg$FAILED) {
          s1 = peg$c33(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsefunctionKey() {
    var s0, s1, s2, s3, s4, s5;

    if (input.substr(peg$currPos, 6) === peg$c36) {
      s0 = peg$c36;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c37);
      }
    }

    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c38) {
        s0 = peg$c38;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }

      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c40) {
          s0 = peg$c40;
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c41);
          }
        }

        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c42) {
            s0 = peg$c42;
            peg$currPos += 8;
          } else {
            s0 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }

          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c44) {
              s0 = peg$c44;
              peg$currPos += 7;
            } else {
              s0 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c45);
              }
            }

            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 8) === peg$c46) {
                s0 = peg$c46;
                peg$currPos += 8;
              } else {
                s0 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c47);
                }
              }

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$currPos;
                peg$silentFails++;

                if (input.substr(peg$currPos, 6) === peg$c12) {
                  s2 = peg$c12;
                  peg$currPos += 6;
                } else {
                  s2 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                  }
                }

                peg$silentFails--;

                if (s2 === peg$FAILED) {
                  s1 = void 0;
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }

                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  peg$silentFails++;

                  if (input.substr(peg$currPos, 6) === peg$c16) {
                    s3 = peg$c16;
                    peg$currPos += 6;
                  } else {
                    s3 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c17);
                    }
                  }

                  peg$silentFails--;

                  if (s3 === peg$FAILED) {
                    s2 = void 0;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }

                  if (s2 !== peg$FAILED) {
                    s3 = peg$currPos;
                    peg$silentFails++;

                    if (input.substr(peg$currPos, 13) === peg$c18) {
                      s4 = peg$c18;
                      peg$currPos += 13;
                    } else {
                      s4 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c19);
                      }
                    }

                    peg$silentFails--;

                    if (s4 === peg$FAILED) {
                      s3 = void 0;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }

                    if (s3 !== peg$FAILED) {
                      s4 = peg$parseid();

                      if (s4 !== peg$FAILED) {
                        s5 = peg$c48(s4);

                        if (s5) {
                          s5 = void 0;
                        } else {
                          s5 = peg$FAILED;
                        }

                        if (s5 !== peg$FAILED) {
                          s1 = peg$c49(s4);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsefunctionParam() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$parse_();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 44) {
        s2 = peg$c10;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c11);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parsetoken();

        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parsetoken();
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$c50();

          if (s4) {
            s4 = void 0;
          } else {
            s4 = peg$FAILED;
          }

          if (s4 !== peg$FAILED) {
            s1 = peg$c51(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s2 = peg$c10;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsestrictFunctionParamPart();

          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsestrictFunctionParamPart();
          }

          if (s3 !== peg$FAILED) {
            s1 = peg$c52(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsestrictFunctionParamPart() {
    var s0, s1, s2, s3;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];

    if (peg$c54.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c55);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c54.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c55);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s1 = peg$c56(s1);
    }

    s0 = s1;

    if (s0 === peg$FAILED) {
      s0 = peg$parsedoubleapos();

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 39) {
          s1 = peg$c57;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c58);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parseinapos();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s3 = peg$c57;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c58);
              }
            }

            if (s3 !== peg$FAILED) {
              s1 = peg$c59(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c5;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }

          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsestrictFunctionParamPart();

            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsestrictFunctionParamPart();
            }

            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s3 = peg$c7;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }

              if (s3 !== peg$FAILED) {
                s1 = peg$c60(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c53);
      }
    }

    return s0;
  }

  function peg$parsedoubleapos() {
    var s0, s1;
    peg$silentFails++;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c62) {
      s1 = peg$c62;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c63);
      }
    }

    if (s1 !== peg$FAILED) {
      s1 = peg$c64();
    }

    s0 = s1;
    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c61);
      }
    }

    return s0;
  }

  function peg$parseinapos() {
    var s0, s1, s2;
    s0 = peg$parsedoubleapos();

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = [];

      if (peg$c65.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c66);
        }
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);

          if (peg$c65.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c66);
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s1 = peg$c4(s1);
      }

      s0 = s1;
    }

    return s0;
  }

  function peg$parsequotedCurly() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;

    if (input.substr(peg$currPos, 2) === peg$c67) {
      s1 = peg$c67;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c68);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseinapos();

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseinapos();
      }

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s3 = peg$c57;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c58);
          }
        }

        if (s3 !== peg$FAILED) {
          s1 = peg$c69(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c70) {
        s1 = peg$c70;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c71);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseinapos();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseinapos();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c57;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c58);
            }
          }

          if (s3 !== peg$FAILED) {
            s1 = peg$c72(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsequoted() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$parsequotedCurly();

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c74) {
        s3 = peg$c74;
        peg$currPos += 2;
      } else {
        s3 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c75);
        }
      }

      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$parseinapos();

        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parseinapos();
        }

        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s5 = peg$c57;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c58);
            }
          }

          if (s5 !== peg$FAILED) {
            s3 = peg$c76(s4);
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$c2();

        if (s3) {
          s3 = void 0;
        } else {
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s1 = peg$c77(s1);
      }

      s0 = s1;

      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 39) {
          s0 = peg$c57;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c58);
          }
        }
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c73);
      }
    }

    return s0;
  }

  function peg$parseplainChar() {
    var s0;
    peg$silentFails++;

    if (peg$c79.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c80);
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {

      if (peg$silentFails === 0) {
        peg$fail(peg$c78);
      }
    }

    return s0;
  }

  function peg$parsechar() {
    var s0, s1, s2;
    s0 = peg$parsedoubleapos();

    if (s0 === peg$FAILED) {
      s0 = peg$parsequoted();

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 35) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$c81();

          if (s2) {
            s2 = void 0;
          } else {
            s2 = peg$FAILED;
          }

          if (s2 !== peg$FAILED) {
            s1 = peg$c82(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parseplainChar();
        }
      }
    }

    return s0;
  }

  function peg$parsedigits() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];

    if (peg$c84.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c85);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c84.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c85);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c83);
      }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];

    if (peg$c87.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c88);
      }
    }

    while (s2 !== peg$FAILED) {
      s1.push(s2);

      if (peg$c87.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c88);
        }
      }
    }

    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c86);
      }
    }

    return s0;
  }

  var inPlural = [false];
  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}

var parser = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};

var isString = function isString(s) {
  return typeof s === "string";
};

var isFunction = function isFunction(f) {
  return typeof f === "function";
};
/** Memoized cache */


var numberFormats = new Map();
var dateFormats = new Map();

function date(locales) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var memoize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (value) {
    if (isString(value)) value = new Date(value);

    if (memoize) {
      var key = cacheKey(locales, format);
      var cachedFormatter = dateFormats.get(key);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      var _formatter = new Intl.DateTimeFormat(locales, format);

      dateFormats.set(key, _formatter);
      return _formatter.format(value);
    }

    var formatter = new Intl.DateTimeFormat(locales, format);
    return formatter.format(value);
  };
}

function number(locales) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var memoize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return function (value) {
    if (memoize) {
      var key = cacheKey(locales, format);
      var cachedFormatter = numberFormats.get(key);

      if (cachedFormatter) {
        return cachedFormatter.format(value);
      }

      var _formatter2 = new Intl.NumberFormat(locales, format);

      numberFormats.set(key, _formatter2);
      return _formatter2.format(value);
    }

    var formatter = new Intl.NumberFormat(locales, format);
    return formatter.format(value);
  };
}
/** Memoize helpers */


function cacheKey(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var localeKey = Array.isArray(locales) ? locales.sort().join('-') : locales;
  return "".concat(localeKey, "-").concat(JSON.stringify(options));
}

var formats = /*#__PURE__*/Object.freeze({
  __proto__: null,
  date: date,
  number: number
});

var defaultFormats = function defaultFormats(locale, locales) {
  var localeData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    plurals: undefined
  };
  var formats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  locales = locales || locale;
  var plurals = localeData.plurals;

  var style = function style(format) {
    return isString(format) ? formats[format] || {
      style: format
    } : format;
  };

  var replaceOctothorpe = function replaceOctothorpe(value, message) {
    return function (ctx) {
      var msg = isFunction(message) ? message(ctx) : message;
      var norm = Array.isArray(msg) ? msg : [msg];
      var valueStr = number(locales)(value);
      return norm.map(function (m) {
        return isString(m) ? m.replace("#", valueStr) : m;
      });
    };
  };

  if (!plurals) {
    console.error("Plurals for locale ".concat(locale, " aren't loaded. Use i18n.loadLocaleData method to load plurals for specific locale. Using other plural rule as a fallback."));
  }

  return {
    plural: function plural(value, _ref) {
      var _ref$offset = _ref.offset,
          offset = _ref$offset === void 0 ? 0 : _ref$offset,
          rules = _objectWithoutProperties(_ref, ["offset"]);

      var message = rules[value] || rules[plurals === null || plurals === void 0 ? void 0 : plurals(value - offset)] || rules.other;
      return replaceOctothorpe(value - offset, message);
    },
    selectordinal: function selectordinal(value, _ref2) {
      var _ref2$offset = _ref2.offset,
          offset = _ref2$offset === void 0 ? 0 : _ref2$offset,
          rules = _objectWithoutProperties(_ref2, ["offset"]);

      var message = rules[value] || rules[plurals === null || plurals === void 0 ? void 0 : plurals(value - offset, true)] || rules.other;
      return replaceOctothorpe(value - offset, message);
    },
    select: function select(value, rules) {
      return rules[value] || rules.other;
    },
    number: function number$1(value, format) {
      return number(locales, style(format))(value);
    },
    date: function date$1(value, format) {
      return date(locales, style(format))(value);
    },
    undefined: function undefined$1(value) {
      return value;
    }
  };
}; // Params -> CTX

/**
 * Creates a context object, which formats ICU MessageFormat arguments based on
 * argument type.
 *
 * @param locale     - Locale of message
 * @param locales      - Locales to be used when formatting the numbers or dates
 * @param values       - Parameters for variable interpolation
 * @param localeData - Locale data (e.g: plurals)
 * @param formats - Custom format styles
 * @returns {function(string, string, any)}
 */


function context(_ref3) {
  var locale = _ref3.locale,
      locales = _ref3.locales,
      values = _ref3.values,
      formats = _ref3.formats,
      localeData = _ref3.localeData;
  var formatters = defaultFormats(locale, locales, localeData, formats);

  var ctx = function ctx(name, type, format) {
    var value = values[name];
    var formatted = formatters[type](value, format);
    var message = isFunction(formatted) ? formatted(ctx) : formatted;
    return Array.isArray(message) ? message.join("") : message;
  };

  return ctx;
}

function interpolate(translation, locale, locales, localeData) {
  return function (values) {
    var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var ctx = context({
      locale: locale,
      locales: locales,
      localeData: localeData,
      formats: formats,
      values: values
    });

    var formatMessage = function formatMessage(message) {
      if (!Array.isArray(message)) return message;
      return message.reduce(function (message, token) {
        if (isString(token)) return message + token;

        var _token = _slicedToArray(token, 3),
            name = _token[0],
            type = _token[1],
            format = _token[2];

        var interpolatedFormat = {};

        if (format != null && !isString(format)) {
          Object.keys(format).forEach(function (key) {
            interpolatedFormat[key] = formatMessage(format[key]);
          });
        } else {
          interpolatedFormat = format;
        }

        var value = ctx(name, type, interpolatedFormat);
        if (value == null) return message;
        return message + value;
      }, "");
    };

    var result = formatMessage(translation);
    if (isString(result) && /\\u[a-fA-F0-9]{4}/g.test(result)) return JSON.parse("\"".concat(result.trim(), "\""));
    if (isString(result)) return result.trim();
    return result;
  };
}

function ownKeys$8(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$8(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$8(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$8(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function processTokens(tokens) {
  if (!tokens.filter(function (token) {
    return !isString(token);
  }).length) {
    return tokens.join("");
  }

  return tokens.map(function (token) {
    if (isString(token)) {
      return token; // # in plural case
    } else if (token.type === "octothorpe") {
      return "#"; // simple argument
    } else if (token.type === "argument") {
      return [token.arg]; // argument with custom format (date, number)
    } else if (token.type === "function") {
      var _param = token.param && token.param.tokens[0];

      var param = typeof _param === "string" ? _param.trim() : _param;
      return [token.arg, token.key, param].filter(Boolean);
    }

    var offset = token.offset ? parseInt(token.offset) : undefined; // complex argument with cases

    var formatProps = {};
    token.cases.forEach(function (item) {
      formatProps[item.key] = processTokens(item.tokens);
    });
    return [token.arg, token.type, _objectSpread$8({
      offset: offset
    }, formatProps)];
  });
} // Message -> (Params -> String)


function compile(message) {
  try {
    return processTokens(parser.parse(message));
  } catch (e) {
    console.error("Message cannot be parsed due to syntax errors: ".concat(message));
    return message;
  }
}

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      var _this = this;

      if (!this._hasEvent(event)) this._events[event] = [];

      this._events[event].push(listener);

      return function () {
        return _this.removeListener(event, listener);
      };
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      if (!this._hasEvent(event)) return;

      var index = this._events[event].indexOf(listener);

      if (~index) this._events[event].splice(index, 1);
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this._hasEvent(event)) return;

      this._events[event].map(function (listener) {
        return listener.apply(_this2, args);
      });
    }
  }, {
    key: "_hasEvent",
    value: function _hasEvent(event) {
      return Array.isArray(this._events[event]);
    }
  }]);

  return EventEmitter;
}();

function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var I18n = /*#__PURE__*/function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  var _super = _createSuper$3(I18n);

  function I18n(params) {
    var _this;

    _classCallCheck(this, I18n);

    _this = _super.call(this);
    _this._messages = {};
    _this._localeData = {};
    if (params.missing != null) _this._missing = params.missing;
    if (params.messages != null) _this.load(params.messages);
    if (params.localeData != null) _this.loadLocaleData(params.localeData);

    if (params.locale != null || params.locales != null) {
      _this.activate(params.locale, params.locales);
    }

    return _this;
  }

  _createClass(I18n, [{
    key: "_loadLocaleData",
    value: function _loadLocaleData(locale, localeData) {
      if (this._localeData[locale] == null) {
        this._localeData[locale] = localeData;
      } else {
        Object.assign(this._localeData[locale], localeData);
      }
    }
  }, {
    key: "loadLocaleData",
    value: function loadLocaleData(localeOrAllData, localeData) {
      var _this2 = this;

      if (localeData != null) {
        // loadLocaleData('en', enLocaleData)
        // Loading locale data for a single locale.
        this._loadLocaleData(localeOrAllData, localeData);
      } else {
        // loadLocaleData(allLocaleData)
        // Loading all locale data at once.
        Object.keys(localeOrAllData).forEach(function (locale) {
          return _this2._loadLocaleData(locale, localeOrAllData[locale]);
        });
      }

      this.emit("change");
    }
  }, {
    key: "_load",
    value: function _load(locale, messages) {
      if (this._messages[locale] == null) {
        this._messages[locale] = messages;
      } else {
        Object.assign(this._messages[locale], messages);
      }
    }
  }, {
    key: "load",
    value: function load(localeOrMessages, messages) {
      var _this3 = this;

      if (messages != null) {
        // load('en', catalog)
        // Loading a catalog for a single locale.
        this._load(localeOrMessages, messages);
      } else {
        // load(catalogs)
        // Loading several locales at once.
        Object.keys(localeOrMessages).forEach(function (locale) {
          return _this3._load(locale, localeOrMessages[locale]);
        });
      }

      this.emit("change");
    }
  }, {
    key: "activate",
    value: function activate(locale, locales) {
      {
        if (!this._messages[locale]) {
          console.warn("Messages for locale \"".concat(locale, "\" not loaded."));
        }

        if (!this._localeData[locale]) {
          console.warn("Locale data for locale \"".concat(locale, "\" not loaded. Plurals won't work correctly."));
        }
      }
      this._locale = locale;
      this._locales = locales;
      this.emit("change");
    } // method for translation and formatting

  }, {
    key: "_",
    value: function _(id) {
      var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          message = _ref.message,
          formats = _ref.formats;

      if (!isString(id)) {
        values = id.values || values;
        message = id.message;
        id = id.id;
      }

      var translation = this.messages[id] || message || id; // replace missing messages with custom message for debugging

      var missing = this._missing;

      if (missing && !this.messages[id]) {
        return isFunction(missing) ? missing(this.locale, id) : missing;
      }

      if (!this.messages[id]) {
        this.emit("missing", {
          id: id,
          locale: this._locale
        });
      }

      {
        translation = isString(translation) ? compile(translation) : translation;
      } // hack for parsing unicode values inside a string to get parsed in react native environments

      if (isString(translation) && /\\u[a-fA-F0-9]{4}/g.test(translation)) return JSON.parse("\"".concat(translation, "\""));
      if (isString(translation)) return translation;
      return interpolate(translation, this.locale, this.locales, this.localeData)(values, formats);
    }
  }, {
    key: "date",
    value: function date$1(value, format) {
      return date(this.locales || this.locale, format)(value);
    }
  }, {
    key: "number",
    value: function number$1(value, format) {
      return number(this.locales || this.locale, format)(value);
    }
  }, {
    key: "locale",
    get: function get() {
      return this._locale;
    }
  }, {
    key: "locales",
    get: function get() {
      return this._locales;
    }
  }, {
    key: "messages",
    get: function get() {
      var _this$_messages$this$;

      return (_this$_messages$this$ = this._messages[this._locale]) !== null && _this$_messages$this$ !== void 0 ? _this$_messages$this$ : {};
    }
  }, {
    key: "localeData",
    get: function get() {
      var _this$_localeData$thi;

      return (_this$_localeData$thi = this._localeData[this._locale]) !== null && _this$_localeData$thi !== void 0 ? _this$_localeData$thi : {};
    }
  }]);

  return I18n;
}(EventEmitter);

function setupI18n() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new I18n(params);
}

var i18n$1 = setupI18n();

var i18n = process.env.NODE_ENV === 'production' ? D : i18n$1;
process.env.NODE_ENV === 'production' ? b : setupI18n;
process.env.NODE_ENV === 'production' ? m : formats;
process.env.NODE_ENV === 'production' ? _$1 : I18n;

function currencyId(currency) {
  if (currency.isNative) return 'ETH';
  if (currency.isToken) return currency.address;
  throw new Error('invalid currency');
}

var _templateObject$q;
var TokenButton$2 = styled(Button$1)(_templateObject$q || (_templateObject$q = _taggedTemplateLiteral(["\n  border-radius: ", "em;\n  padding: 0.25em 0.75em 0.25em 0.25em;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.borderRadius;
});
function TokenBase(_ref2) {
  var value = _ref2.value,
      _onClick = _ref2.onClick;
  return /*#__PURE__*/jsx(TokenButton$2, {
    onClick: function onClick() {
      return _onClick(value);
    },
    children: /*#__PURE__*/jsx(ButtonMedium, {
      children: /*#__PURE__*/jsxs(Row, {
        gap: 0.5,
        children: [/*#__PURE__*/jsx(TokenImg$1, {
          token: value,
          size: 1.5
        }), value.symbol]
      })
    })
  });
}

var _templateObject$p, _templateObject2$c;
var StyledTokenButton = styled(Button$1)(_templateObject$p || (_templateObject$p = _taggedTemplateLiteral(["\n  border-radius: ", "em;\n  padding: 0.25em;\n  padding-left: ", "em;\n\n  :disabled {\n    // prevents border from expanding the button's box size\n    padding: calc(0.25em - 1px);\n    padding-left: calc(", "em - 1px);\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.borderRadius;
}, function (_ref2) {
  var empty = _ref2.empty;
  return empty ? 0.75 : 0.25;
}, function (_ref3) {
  var empty = _ref3.empty;
  return empty ? 0.75 : 0.25;
});
var TokenButtonRow = styled(Row)(_templateObject2$c || (_templateObject2$c = _taggedTemplateLiteral(["\n  height: 1.2em;\n  max-width: ", "em;\n  overflow-x: hidden;\n  transition: max-width 0.25s linear;\n"])), function (_ref4) {
  var collapsed = _ref4.collapsed;
  return collapsed ? '1.2' : '8.2';
});
function TokenButton$1(_ref5) {
  var value = _ref5.value,
      collapsed = _ref5.collapsed,
      disabled = _ref5.disabled,
      onClick = _ref5.onClick;
  var buttonBackgroundColor = useMemo(function () {
    return value ? 'interactive' : 'accent';
  }, [value]);
  var contentColor = useMemo(function () {
    return value || disabled ? 'onInteractive' : 'onAccent';
  }, [value, disabled]);
  return /*#__PURE__*/jsx(StyledTokenButton, {
    onClick: onClick,
    empty: !value,
    color: buttonBackgroundColor,
    disabled: disabled,
    children: /*#__PURE__*/jsx(ButtonLarge, {
      color: contentColor,
      children: /*#__PURE__*/jsxs(TokenButtonRow, {
        gap: 0.4,
        collapsed: Boolean(value) && collapsed,
        children: [value ? /*#__PURE__*/jsxs(Fragment, {
          children: [/*#__PURE__*/jsx(TokenImg$1, {
            token: value,
            size: 1.2
          }), value.symbol]
        }) : /*#__PURE__*/jsx(Trans, {
          id: "Select a token"
        }), /*#__PURE__*/jsx(ChevronDown, {
          color: contentColor,
          strokeWidth: 3
        })]
      })
    })
  });
}

function useNativeEvent(element, type, listener, options) {
  useEffect(function () {
    element === null || element === void 0 ? void 0 : element.addEventListener(type, listener, options);
    return function () {
      return element === null || element === void 0 ? void 0 : element.removeEventListener(type, listener, options);
    };
  }, [element, type, listener, options]);
}

var _templateObject$o, _templateObject2$b;
var overflowCss = css(_templateObject$o || (_templateObject$o = _taggedTemplateLiteral(["\n  overflow-y: scroll;\n"])));
/** Customizes the scrollbar for vertical overflow. */

var scrollbarCss = function scrollbarCss(padded) {
  return css(_templateObject2$b || (_templateObject2$b = _taggedTemplateLiteral(["\n  overflow-y: scroll;\n\n  ::-webkit-scrollbar {\n    width: 1.25em;\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: radial-gradient(\n        closest-corner at 0.25em 0.25em,\n        ", " 0.25em,\n        transparent 0.25em\n      ),\n      linear-gradient(\n        to bottom,\n        #ffffff00 0.25em,\n        ", " 0.25em,\n        ", " calc(100% - 0.25em),\n        #ffffff00 calc(100% - 0.25em)\n      ),\n      radial-gradient(\n        closest-corner at 0.25em calc(100% - 0.25em),\n        ", " 0.25em,\n        #ffffff00 0.25em\n      );\n    background-clip: padding-box;\n    border: none;\n    ", ": 0.75em solid transparent;\n  }\n\n  @supports not selector(::-webkit-scrollbar-thumb) {\n    scrollbar-color: ", " transparent;\n  }\n"])), function (_ref) {
    var theme = _ref.theme;
    return theme.interactive;
  }, function (_ref2) {
    var theme = _ref2.theme;
    return theme.interactive;
  }, function (_ref3) {
    var theme = _ref3.theme;
    return theme.interactive;
  }, function (_ref4) {
    var theme = _ref4.theme;
    return theme.interactive;
  }, padded ? 'border-right' : 'border-left', function (_ref5) {
    var theme = _ref5.theme;
    return theme.interactive;
  });
};

function useScrollbar(element) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref6$padded = _ref6.padded,
      padded = _ref6$padded === void 0 ? false : _ref6$padded;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      overflow = _useState2[0],
      setOverflow = _useState2[1];

  useEffect(function () {
    setOverflow(hasOverflow(element));
  }, [element]);
  useNativeEvent(element, 'transitionend', useCallback(function () {
    return setOverflow(hasOverflow(element));
  }, [element]));
  return useMemo(function () {
    return overflow ? scrollbarCss(padded) : overflowCss;
  }, [overflow, padded]);

  function hasOverflow(element) {
    if (!element) {
      return true;
    }

    return element.scrollHeight > element.clientHeight;
  }
}

var _templateObject$n, _templateObject2$a, _templateObject3$9, _templateObject4$8;
var TokenButton = styled(BaseButton)(_templateObject$n || (_templateObject$n = _taggedTemplateLiteral(["\n  border-radius: 0;\n  outline: none;\n  padding: 0.5em 0.75em;\n"])));
var ITEM_SIZE = 56;
var TokenList = styled(FixedSizeList)(_templateObject2$a || (_templateObject2$a = _taggedTemplateLiteral(["\n  ", "[data-index='", "'] {\n    background-color: ", ";\n  }\n\n  ", "\n  overscroll-behavior: none; // prevent Firefox's bouncy overscroll effect (because it does not trigger the scroll handler)\n"])), TokenButton, function (_ref) {
  var hover = _ref.hover;
  return hover;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.onHover(theme.module);
}, function (_ref3) {
  var scrollbar = _ref3.scrollbar;
  return scrollbar;
});
var OnHover = styled.div(_templateObject3$9 || (_templateObject3$9 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  height: ", "px;\n  left: 0;\n  position: absolute;\n  top: ", "px;\n  width: 100%;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.onHover(theme.module);
}, ITEM_SIZE, function (_ref5) {
  var hover = _ref5.hover;
  return hover * ITEM_SIZE;
});
var TokenBalance = styled.div(_templateObject4$8 || (_templateObject4$8 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 0.25em;\n  padding: 0.375em 0;\n"])), function (_ref6) {
  var theme = _ref6.theme,
      isLoading = _ref6.isLoading;
  return isLoading && theme.secondary;
});

function TokenOption$1(_ref7) {
  var index = _ref7.index,
      value = _ref7.value,
      style = _ref7.style;

  var _useLingui = useLingui(),
      i18n = _useLingui.i18n;

  var ref = useRef(null); // Annotate the event to be handled later instead of passing in handlers to avoid rerenders.
  // This prevents token logos from reloading and flashing on the screen.

  var onEvent = function onEvent(e) {
    var _ref$current;

    e.index = index;
    e.token = value;
    e.ref = (_ref$current = ref.current) !== null && _ref$current !== void 0 ? _ref$current : undefined;
  };

  var _useActiveWeb3React = useActiveWeb3React$1(),
      account = _useActiveWeb3React.account;

  var balance = useCurrencyBalance(account, value);
  return /*#__PURE__*/jsx(TokenButton, {
    "data-index": index,
    style: style,
    onClick: onEvent,
    onBlur: onEvent,
    onFocus: onEvent,
    onMouseMove: onEvent,
    onKeyDown: onEvent,
    ref: ref,
    children: /*#__PURE__*/jsx(Body1, {
      children: /*#__PURE__*/jsxs(Row, {
        children: [/*#__PURE__*/jsxs(Row, {
          gap: 0.5,
          children: [/*#__PURE__*/jsx(TokenImg$1, {
            token: value,
            size: 1.5
          }), /*#__PURE__*/jsxs(Column, {
            flex: true,
            gap: 0.125,
            align: "flex-start",
            children: [/*#__PURE__*/jsx(Subhead1, {
              children: value.symbol
            }), /*#__PURE__*/jsx(Caption$1, {
              color: "secondary",
              children: value.name
            })]
          })]
        }), /*#__PURE__*/jsx(TokenBalance, {
          isLoading: Boolean(account) && !balance,
          children: (balance === null || balance === void 0 ? void 0 : balance.greaterThan(0)) && formatCurrencyAmount(balance, 2, i18n.locale)
        })]
      })
    })
  });
}

var itemKey = function itemKey(index, tokens) {
  return currencyId(tokens[index]);
};

var ItemRow = /*#__PURE__*/memo(function ItemRow(_ref8) {
  var tokens = _ref8.data,
      index = _ref8.index,
      style = _ref8.style;
  return /*#__PURE__*/jsx(TokenOption$1, {
    index: index,
    value: tokens[index],
    style: style
  });
}, areEqual);
var TokenOptions = /*#__PURE__*/forwardRef(function TokenOptions(_ref9, ref) {
  var tokens = _ref9.tokens,
      onSelect = _ref9.onSelect;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      focused = _useState2[0],
      setFocused = _useState2[1];

  var _useState3 = useState({
    index: -1
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      hover = _useState4[0],
      setHover = _useState4[1];

  useEffect(function () {
    setHover(function (hover) {
      var index = hover.currency ? tokens.indexOf(hover.currency) : -1;
      return {
        index: index,
        currency: tokens[index]
      };
    });
  }, [tokens]);
  var list = useRef(null);

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      element = _useState6[0],
      setElement = _useState6[1];

  var scrollTo = useCallback(function (index) {
    var _list$current;

    if (index === undefined) return;
    (_list$current = list.current) === null || _list$current === void 0 ? void 0 : _list$current.scrollToItem(index);

    if (focused) {
      var _element$querySelecto;

      element === null || element === void 0 ? void 0 : (_element$querySelecto = element.querySelector("[data-index='".concat(index, "']"))) === null || _element$querySelecto === void 0 ? void 0 : _element$querySelecto.focus();
    }

    setHover({
      index: index,
      currency: tokens[index]
    });
  }, [element, focused, tokens]);
  var onKeyDown = useCallback(function (e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (e.key === 'ArrowDown' && hover.index < tokens.length - 1) {
        scrollTo(hover.index + 1);
      } else if (e.key === 'ArrowUp' && hover.index > 0) {
        scrollTo(hover.index - 1);
      } else if (e.key === 'ArrowUp' && hover.index === -1) {
        scrollTo(tokens.length - 1);
      }

      e.preventDefault();
    }

    if (e.key === 'Enter' && hover.index !== -1) {
      onSelect(tokens[hover.index]);
    }
  }, [hover.index, onSelect, scrollTo, tokens]);
  var blur = useCallback(function () {
    return setHover({
      index: -1
    });
  }, []);
  useImperativeHandle(ref, function () {
    return {
      onKeyDown: onKeyDown,
      blur: blur
    };
  }, [blur, onKeyDown]);
  var onClick = useCallback(function (_ref10) {
    var token = _ref10.token;
    return token && onSelect(token);
  }, [onSelect]);
  var onFocus = useCallback(function (_ref11) {
    var index = _ref11.index;
    setFocused(true);
    scrollTo(index);
  }, [scrollTo]);
  var onBlur = useCallback(function () {
    return setFocused(false);
  }, []);
  var onMouseMove = useCallback(function (_ref12) {
    var index = _ref12.index;
    return scrollTo(index);
  }, [scrollTo]);
  var scrollbar = useScrollbar(element, {
    padded: true
  });
  var onHover = useRef(null); // use native onscroll handler to capture Safari's bouncy overscroll effect

  useNativeEvent(element, 'scroll', useCallback(function () {
    if (element && onHover.current) {
      // must be set synchronously to avoid jank (avoiding useState)
      onHover.current.style.marginTop = "".concat(-element.scrollTop, "px");
    }
  }, [element]));
  return /*#__PURE__*/jsxs(Column, {
    align: "unset",
    grow: true,
    onKeyDown: onKeyDown,
    onClick: onClick,
    onBlur: onBlur,
    onFocus: onFocus,
    onMouseMove: onMouseMove,
    style: {
      overflow: 'hidden'
    },
    children: [/*#__PURE__*/jsx(OnHover, {
      hover: hover.index,
      ref: onHover
    }), /*#__PURE__*/jsx(AutoSizer, {
      disableWidth: true,
      children: function children(_ref13) {
        var height = _ref13.height;
        return /*#__PURE__*/jsx(TokenList, {
          hover: hover.index,
          height: height,
          width: "100%",
          itemCount: tokens.length,
          itemData: tokens,
          itemKey: itemKey,
          itemSize: ITEM_SIZE,
          className: "scrollbar",
          ref: list,
          outerRef: setElement,
          scrollbar: scrollbar,
          children: ItemRow
        });
      }
    })]
  });
});

var _templateObject$m, _templateObject2$9, _templateObject3$8, _templateObject4$7, _templateObject5$4;
var Img = styled.div(_templateObject$m || (_templateObject$m = _taggedTemplateLiteral(["\n  clip-path: circle(50%);\n  height: 1.5em;\n  width: 1.5em;\n"])));

var _Symbol = styled.div(_templateObject2$9 || (_templateObject2$9 = _taggedTemplateLiteral(["\n  height: 0.75em;\n  width: 7em;\n"])));

var Name = styled.div(_templateObject3$8 || (_templateObject3$8 = _taggedTemplateLiteral(["\n  height: 0.5em;\n  width: 5.5em;\n"])));
var Balance$1 = styled.div(_templateObject4$7 || (_templateObject4$7 = _taggedTemplateLiteral(["\n  padding: 0.375em 0;\n  width: 1.5em;\n"])));
var TokenRow = styled.div(_templateObject5$4 || (_templateObject5$4 = _taggedTemplateLiteral(["\n  outline: none;\n  padding: 0.6875em 0.75em;\n\n  ", ", ", ", ", ", ", " {\n    background-color: ", ";\n    border-radius: 0.25em;\n  }\n"])), Img, _Symbol, Name, Balance$1, function (_ref) {
  var theme = _ref.theme;
  return theme.secondary;
});

function TokenOption() {
  return /*#__PURE__*/jsx(TokenRow, {
    children: /*#__PURE__*/jsx(Body1, {
      children: /*#__PURE__*/jsxs(Row, {
        children: [/*#__PURE__*/jsxs(Row, {
          gap: 0.5,
          children: [/*#__PURE__*/jsx(Img, {}), /*#__PURE__*/jsxs(Column, {
            flex: true,
            gap: 0.125,
            align: "flex-start",
            justify: "flex-center",
            children: [/*#__PURE__*/jsx(Subhead1, {
              style: {
                display: 'flex'
              },
              children: /*#__PURE__*/jsx(_Symbol, {})
            }), /*#__PURE__*/jsx(Caption$1, {
              style: {
                display: 'flex'
              },
              children: /*#__PURE__*/jsx(Name, {})
            })]
          })]
        }), /*#__PURE__*/jsx(Balance$1, {})]
      })
    })
  });
}

function TokenOptionsSkeleton() {
  return /*#__PURE__*/jsxs(Column, {
    children: [/*#__PURE__*/jsx(TokenOption, {}), /*#__PURE__*/jsx(TokenOption, {}), /*#__PURE__*/jsx(TokenOption, {}), /*#__PURE__*/jsx(TokenOption, {}), /*#__PURE__*/jsx(TokenOption, {})]
  });
}

var _templateObject$l;
var SearchInput = styled(StringInput)(_templateObject$l || (_templateObject$l = _taggedTemplateLiteral(["\n  ", "\n"])), inputCss);

function usePrefetchBalances() {
  var _useActiveWeb3React = useActiveWeb3React$1(),
      account = _useActiveWeb3React.account;

  var tokenList = useTokenList();

  var _useState = useState(tokenList),
      _useState2 = _slicedToArray(_useState, 2),
      prefetchedTokenList = _useState2[0],
      setPrefetchedTokenList = _useState2[1];

  useEffect(function () {
    return setPrefetchedTokenList(tokenList);
  }, [tokenList]);
  useCurrencyBalances(account, tokenList !== prefetchedTokenList ? tokenList : undefined);
}

function useAreBalancesLoaded() {
  var _useActiveWeb3React2 = useActiveWeb3React$1(),
      account = _useActiveWeb3React2.account;

  var tokens = useTokenList();
  var native = useNativeCurrency();
  var currencies = useMemo(function () {
    return [native].concat(_toConsumableArray(tokens));
  }, [native, tokens]);
  var balances = useCurrencyBalances(account, currencies).filter(Boolean);
  return !account || currencies.length === balances.length;
}

function TokenSelectDialog(_ref) {
  var value = _ref.value,
      onSelect = _ref.onSelect;

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      query = _useState4[0],
      setQuery = _useState4[1];

  var queriedTokens = useQueryCurrencies(query);
  var tokens = useMemo(function () {
    return queriedTokens === null || queriedTokens === void 0 ? void 0 : queriedTokens.filter(function (token) {
      return token !== value;
    });
  }, [queriedTokens, value]);
  var isTokenListLoaded = useIsTokenListLoaded();
  var areBalancesLoaded = useAreBalancesLoaded();

  var _useState5 = useState(isTokenListLoaded && areBalancesLoaded),
      _useState6 = _slicedToArray(_useState5, 2),
      isLoaded = _useState6[0],
      setIsLoaded = _useState6[1]; // Give the balance-less tokens a small block period to avoid layout thrashing from re-sorting.


  useEffect(function () {
    if (!isLoaded) {
      var timeout = setTimeout(function () {
        return setIsLoaded(true);
      }, 250);
      return function () {
        return clearTimeout(timeout);
      };
    }

    return;
  }, [isLoaded]);
  useEffect(function () {
    return setIsLoaded(Boolean(query) || isTokenListLoaded && areBalancesLoaded);
  }, [query, areBalancesLoaded, isTokenListLoaded]);
  var baseTokens = []; // TODO(zzmp): Add base tokens to token list functionality

  var input = useRef(null);
  useEffect(function () {
    var _input$current;

    return (_input$current = input.current) === null || _input$current === void 0 ? void 0 : _input$current.focus();
  }, [input]);

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      options = _useState8[0],
      setOptions = _useState8[1];

  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Header, {
      title: /*#__PURE__*/jsx(Trans, {
        id: "Select a token"
      })
    }), /*#__PURE__*/jsxs(Column, {
      gap: 0.75,
      children: [/*#__PURE__*/jsx(Row, {
        pad: 0.75,
        grow: true,
        children: /*#__PURE__*/jsx(Body1, {
          children: /*#__PURE__*/jsx(SearchInput, {
            value: query,
            onChange: setQuery,
            placeholder:
            /*i18n*/
            i18n._("Search by token name or address"),
            onKeyDown: options === null || options === void 0 ? void 0 : options.onKeyDown,
            onBlur: options === null || options === void 0 ? void 0 : options.blur,
            ref: input
          })
        })
      }), Boolean(baseTokens.length) && /*#__PURE__*/jsx(Row, {
        pad: 0.75,
        gap: 0.25,
        justify: "flex-start",
        flex: true,
        children: baseTokens.map(function (token) {
          return /*#__PURE__*/jsx(TokenBase, {
            value: token,
            onClick: onSelect
          }, currencyId(token));
        })
      }), /*#__PURE__*/jsx(Rule, {
        padded: true
      })]
    }), isLoaded ? /*#__PURE__*/jsx(TokenOptions, {
      tokens: tokens,
      onSelect: onSelect,
      ref: setOptions
    }) : /*#__PURE__*/jsx(TokenOptionsSkeleton, {})]
  });
}
function TokenSelect(_ref2) {
  var value = _ref2.value,
      collapsed = _ref2.collapsed,
      disabled = _ref2.disabled,
      onSelect = _ref2.onSelect;
  usePrefetchBalances();

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      open = _useState10[0],
      setOpen = _useState10[1];

  var selectAndClose = useCallback(function (value) {
    onSelect(value);
    setOpen(false);
  }, [onSelect, setOpen]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(TokenButton$1, {
      value: value,
      collapsed: collapsed,
      disabled: disabled,
      onClick: function onClick() {
        return setOpen(true);
      }
    }), open && /*#__PURE__*/jsx(Dialog, {
      color: "module",
      onClose: function onClose() {
        return setOpen(false);
      },
      children: /*#__PURE__*/jsx(TokenSelectDialog, {
        value: value,
        onSelect: selectAndClose
      })
    })]
  });
}

var _templateObject$k, _templateObject2$8, _templateObject3$7, _templateObject4$6;
var TokenInputRow = styled(Row)(_templateObject$k || (_templateObject$k = _taggedTemplateLiteral(["\n  grid-template-columns: 1fr;\n"])));
var ValueInput = styled(DecimalInput)(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteral(["\n  color: ", ";\n  height: 1em;\n\n  :hover:not(:focus-within) {\n    color: ", ";\n  }\n\n  :hover:not(:focus-within)::placeholder {\n    color: ", ";\n  }\n\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.onHover(theme.primary);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.onHover(theme.secondary);
}, loadingOpacityCss);
var delayedFadeIn = keyframes(_templateObject3$7 || (_templateObject3$7 = _taggedTemplateLiteral(["\n  0% {\n    opacity: 0;\n  }\n  25% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n"])));
var MaxButton = styled(Button$1)(_templateObject4$6 || (_templateObject4$6 = _taggedTemplateLiteral(["\n  animation: ", " 0.25s linear;\n  border-radius: 0.75em;\n  padding: 0.5em;\n"])), delayedFadeIn);
function TokenInput(_ref4) {
  var currency = _ref4.currency,
      amount = _ref4.amount,
      max = _ref4.max,
      disabled = _ref4.disabled,
      onChangeInput = _ref4.onChangeInput,
      onChangeCurrency = _ref4.onChangeCurrency,
      loading = _ref4.loading,
      children = _ref4.children;
  var input = useRef(null);
  var onSelect = useCallback(function (currency) {
    onChangeCurrency(currency);
    setImmediate(function () {
      var _input$current;

      return (_input$current = input.current) === null || _input$current === void 0 ? void 0 : _input$current.focus();
    });
  }, [onChangeCurrency]);
  var maxButton = useRef(null);
  var hasMax = useMemo(function () {
    return Boolean(max && max !== amount);
  }, [max, amount]);

  var _useState = useState(hasMax),
      _useState2 = _slicedToArray(_useState, 2),
      showMax = _useState2[0],
      setShowMax = _useState2[1];

  useEffect(function () {
    var _ref5, _input$current2;

    return setShowMax((_ref5 = hasMax && ((_input$current2 = input.current) === null || _input$current2 === void 0 ? void 0 : _input$current2.contains(document.activeElement))) !== null && _ref5 !== void 0 ? _ref5 : false);
  }, [hasMax]);
  var onBlur = useCallback(function (e) {
    var _input$current3, _maxButton$current;

    // Filters out clicks on input or maxButton, because onBlur fires before onClickMax.
    if (!((_input$current3 = input.current) !== null && _input$current3 !== void 0 && _input$current3.contains(e.relatedTarget)) && !((_maxButton$current = maxButton.current) !== null && _maxButton$current !== void 0 && _maxButton$current.contains(e.relatedTarget))) {
      setShowMax(false);
    }
  }, []);
  var onClickMax = useCallback(function () {
    onChangeInput(max || '');
    setShowMax(false);
    setImmediate(function () {
      var _input$current4, _input$current5;

      (_input$current4 = input.current) === null || _input$current4 === void 0 ? void 0 : _input$current4.focus(); // Brings the start of the input into view. NB: This only works for clicks, not eg keyboard interactions.

      (_input$current5 = input.current) === null || _input$current5 === void 0 ? void 0 : _input$current5.setSelectionRange(0, null);
    });
  }, [max, onChangeInput]);
  return /*#__PURE__*/jsxs(Column, {
    gap: 0.25,
    children: [/*#__PURE__*/jsxs(TokenInputRow, {
      gap: 0.5,
      onBlur: onBlur,
      children: [/*#__PURE__*/jsx(H2, {
        children: /*#__PURE__*/jsx(ValueInput, {
          value: amount,
          onFocus: function onFocus() {
            return setShowMax(hasMax);
          },
          onChange: onChangeInput,
          disabled: disabled || !currency,
          $loading: Boolean(loading),
          ref: input
        })
      }), showMax && /*#__PURE__*/jsx(MaxButton, {
        onClick: onClickMax,
        ref: maxButton,
        children: /*#__PURE__*/jsx(ButtonMedium, {
          tabIndex: -1,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Max"
          })
        })
      }), /*#__PURE__*/jsx(TokenSelect, {
        value: currency,
        collapsed: showMax,
        disabled: disabled,
        onSelect: onSelect
      })]
    }), children]
  });
}

var _templateObject$j, _templateObject2$7, _templateObject3$6;
var USDC = styled(Row)(_templateObject$j || (_templateObject$j = _taggedTemplateLiteral(["\n  ", ";\n"])), loadingOpacityCss);
var Balance = styled(Body2)(_templateObject2$7 || (_templateObject2$7 = _taggedTemplateLiteral(["\n  opacity: ", ";\n  transition: opacity 0.25s ", ";\n"])), function (_ref) {
  var focused = _ref.focused;
  return focused ? 1 : 0;
}, function (_ref2) {
  var focused = _ref2.focused;
  return focused ? 'ease-in' : 'ease-out';
});
var InputColumn = styled(Column)(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteral(["\n  margin: 0.75em;\n  position: relative;\n\n  ", " {\n    filter: ", ";\n    transition: filter 0.25s;\n  }\n"])), TokenImg$1, function (_ref3) {
  var approved = _ref3.approved;
  return approved ? undefined : 'saturate(0) opacity(0.4)';
});
function useFormattedFieldAmount(_ref4) {
  var disabled = _ref4.disabled,
      currencyAmount = _ref4.currencyAmount,
      fieldAmount = _ref4.fieldAmount;
  return useMemo(function () {
    if (disabled) {
      return '';
    }

    if (fieldAmount !== undefined) {
      return fieldAmount;
    }

    if (currencyAmount) {
      return currencyAmount.toSignificant(6);
    }

    return '';
  }, [disabled, currencyAmount, fieldAmount]);
}
function Input$1(_ref5) {
  var disabled = _ref5.disabled,
      focused = _ref5.focused;

  var _useLingui = useLingui(),
      i18n = _useLingui.i18n;

  var _useSwapInfo = useSwapInfo(),
      balance = _useSwapInfo.currencyBalances[Field.INPUT],
      tradeState = _useSwapInfo.trade.state,
      swapInputCurrencyAmount = _useSwapInfo.tradeCurrencyAmounts[Field.INPUT];

  var inputUSDC = useUSDCValue(swapInputCurrencyAmount);

  var _useSwapAmount = useSwapAmount(Field.INPUT),
      _useSwapAmount2 = _slicedToArray(_useSwapAmount, 2),
      swapInputAmount = _useSwapAmount2[0],
      updateSwapInputAmount = _useSwapAmount2[1];

  var _useSwapCurrency = useSwapCurrency(Field.INPUT),
      _useSwapCurrency2 = _slicedToArray(_useSwapCurrency, 2),
      swapInputCurrency = _useSwapCurrency2[0],
      updateSwapInputCurrency = _useSwapCurrency2[1];

  var inputCurrencyAmount = useSwapCurrencyAmount(Field.INPUT); // extract eagerly in case of reversal

  usePrefetchCurrencyColor(swapInputCurrency);
  var isRouteLoading = tradeState === TradeState.SYNCING || tradeState === TradeState.LOADING;
  var isDependentField = !useIsSwapFieldIndependent(Field.INPUT);
  var isLoading = isRouteLoading && isDependentField; //TODO(ianlapham): mimic logic from app swap page

  var mockApproved = true; // account for gas needed if using max on native token

  var max = useMemo(function () {
    var maxAmount = maxAmountSpend(balance);
    return maxAmount !== null && maxAmount !== void 0 && maxAmount.greaterThan(0) ? maxAmount.toExact() : undefined;
  }, [balance]);
  var balanceColor = useMemo(function () {
    var insufficientBalance = balance && (inputCurrencyAmount ? inputCurrencyAmount.greaterThan(balance) : swapInputCurrencyAmount === null || swapInputCurrencyAmount === void 0 ? void 0 : swapInputCurrencyAmount.greaterThan(balance));
    return insufficientBalance ? 'error' : undefined;
  }, [balance, inputCurrencyAmount, swapInputCurrencyAmount]);
  var amount = useFormattedFieldAmount({
    disabled: disabled,
    currencyAmount: inputCurrencyAmount,
    fieldAmount: swapInputAmount
  });
  return /*#__PURE__*/jsxs(InputColumn, {
    gap: 0.5,
    approved: mockApproved,
    children: [/*#__PURE__*/jsx(TokenInput, {
      currency: swapInputCurrency,
      amount: amount,
      max: max,
      disabled: disabled,
      onChangeInput: updateSwapInputAmount,
      onChangeCurrency: updateSwapInputCurrency,
      loading: isLoading,
      children: /*#__PURE__*/jsx(Body2, {
        color: "secondary",
        userSelect: true,
        children: /*#__PURE__*/jsxs(Row, {
          children: [/*#__PURE__*/jsx(USDC, {
            $loading: isLoading,
            children: inputUSDC ? "$".concat(inputUSDC.toFixed(2)) : '-'
          }), balance && /*#__PURE__*/jsxs(Balance, {
            color: balanceColor,
            focused: focused,
            children: ["Balance: ", /*#__PURE__*/jsx("span", {
              children: formatCurrencyAmount(balance, 4, i18n.locale)
            })]
          })]
        })
      })
    }), /*#__PURE__*/jsx(Row, {})]
  });
}

var _excluded = ["target", "href", "rel"];

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Outbound link
 */
function ExternalLink(_ref) {
  var _ref$target = _ref.target,
      target = _ref$target === void 0 ? '_blank' : _ref$target,
      href = _ref.href,
      _ref$rel = _ref.rel,
      rel = _ref$rel === void 0 ? 'noopener noreferrer' : _ref$rel,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/jsx("a", _objectSpread$7(_objectSpread$7({
    target: target,
    rel: rel,
    href: href
  }, rest), {}, {
    children: rest.children
  }));
}

var _templateObject$i;
var UniswapA = styled(ExternalLink)(_templateObject$i || (_templateObject$i = _taggedTemplateLiteral(["\n  color: ", ";\n  cursor: pointer;\n  text-decoration: none;\n\n  ", " {\n    fill: ", ";\n    height: 1em;\n    transition: transform 0.25s ease, fill 0.25s ease;\n    width: 1em;\n    will-change: transform;\n  }\n\n  :hover ", " {\n    fill: ", ";\n    transform: rotate(-5deg);\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.secondary;
}, Logo, function (_ref2) {
  var theme = _ref2.theme;
  return theme.secondary;
}, Logo, brand);
function BrandedFooter() {
  return /*#__PURE__*/jsx(Row, {
    justify: "center",
    children: /*#__PURE__*/jsx(UniswapA, {
      href: "https://uniswap.org/",
      children: /*#__PURE__*/jsxs(Row, {
        gap: 0.25,
        children: [/*#__PURE__*/jsx(Logo, {}), /*#__PURE__*/jsx(Caption$1, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "Powered by the Uniswap protocol"
          })
        })]
      })
    })
  });
}

function computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput) {
  if (!fiatValueOutput || !fiatValueInput) return undefined;
  if (!fiatValueInput.currency.equals(fiatValueOutput.currency)) return undefined;
  if (JSBI.equal(fiatValueInput.quotient, JSBI.BigInt(0))) return undefined;
  var pct = ONE_HUNDRED_PERCENT.subtract(fiatValueOutput.divide(fiatValueInput));
  return new Percent$1(pct.numerator, pct.denominator);
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var THIRTY_BIPS_FEE = new Percent$1(JSBI.BigInt(30), JSBI.BigInt(10000));
var INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(THIRTY_BIPS_FEE);
function computeRealizedPriceImpact(trade) {
  var realizedLpFeePercent = computeRealizedLPFeePercent(trade);
  return trade.priceImpact.subtract(realizedLpFeePercent);
}
function getPriceImpactWarning(priceImpact) {
  if (priceImpact !== null && priceImpact !== void 0 && priceImpact.greaterThan(ALLOWED_PRICE_IMPACT_HIGH)) return 'error';
  if (priceImpact !== null && priceImpact !== void 0 && priceImpact.greaterThan(ALLOWED_PRICE_IMPACT_MEDIUM)) return 'warning';
  return;
} // computes realized lp fee as a percent

function computeRealizedLPFeePercent(trade) {
  var percent; // Since routes are either all v2 or all v3 right now, calculate separately

  if (trade.swaps[0].route.pools instanceof Pair) {
    // for each hop in our trade, take away the x*y=k price impact from 0.3% fees
    // e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
    percent = ONE_HUNDRED_PERCENT.subtract(trade.swaps.reduce(function (currentFee) {
      return currentFee.multiply(INPUT_FRACTION_AFTER_FEE);
    }, ONE_HUNDRED_PERCENT));
  } else {
    percent = ZERO_PERCENT;

    var _iterator = _createForOfIteratorHelper(trade.swaps),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var swap = _step.value;

        var _swap$inputAmount$div = swap.inputAmount.divide(trade.inputAmount),
            numerator = _swap$inputAmount$div.numerator,
            denominator = _swap$inputAmount$div.denominator;

        var overallPercent = new Percent$1(numerator, denominator);
        var routeRealizedLPFeePercent = overallPercent.multiply(ONE_HUNDRED_PERCENT.subtract(swap.route.pools.reduce(function (currentFee, pool) {
          var fee = pool instanceof Pair ? // not currently possible given protocol check above, but not fatal
          FeeAmount.MEDIUM : pool.fee;
          return currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(new Fraction(fee, 1000000)));
        }, ONE_HUNDRED_PERCENT)));
        percent = percent.add(routeRealizedLPFeePercent);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return new Percent$1(percent.numerator, percent.denominator);
} // computes price breakdown for the trade

function computeRealizedLPFeeAmount(trade) {
  if (trade) {
    var realizedLPFee = computeRealizedLPFeePercent(trade); // the amount of the input that accrues to LPs

    return CurrencyAmount.fromRawAmount(trade.inputAmount.currency, trade.inputAmount.multiply(realizedLPFee).quotient);
  }

  return undefined;
}

var _templateObject$h;
var colorAtom = atom(undefined);
var OutputColumn = styled(Column)(_templateObject$h || (_templateObject$h = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: ", "em;\n  padding: 0.75em;\n  padding-bottom: 0.5em;\n  position: relative;\n\n  // Set transitions to reduce color flashes when switching color/token.\n  // When color loads, transition the background so that it transitions from the empty or last state, but not _to_ the empty state.\n  transition: ", ";\n  > {\n    // When color is loading, delay the color/stroke so that it seems to transition from the last state.\n    transition: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.module;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.borderRadius - 0.25;
}, function (_ref3) {
  var hasColor = _ref3.hasColor;
  return hasColor ? 'background-color 0.25s ease-out' : undefined;
}, function (_ref4) {
  var hasColor = _ref4.hasColor;
  return hasColor === null ? 'color 0.25s ease-in, stroke 0.25s ease-in' : undefined;
});
function Output(_ref5) {
  var disabled = _ref5.disabled,
      focused = _ref5.focused,
      children = _ref5.children;

  var _useLingui = useLingui(),
      i18n = _useLingui.i18n;

  var _useSwapInfo = useSwapInfo(),
      balance = _useSwapInfo.currencyBalances[Field.OUTPUT],
      tradeState = _useSwapInfo.trade.state,
      _useSwapInfo$tradeCur = _useSwapInfo.tradeCurrencyAmounts,
      inputCurrencyAmount = _useSwapInfo$tradeCur[Field.INPUT],
      outputCurrencyAmount = _useSwapInfo$tradeCur[Field.OUTPUT];

  var _useSwapAmount = useSwapAmount(Field.OUTPUT),
      _useSwapAmount2 = _slicedToArray(_useSwapAmount, 2),
      swapOutputAmount = _useSwapAmount2[0],
      updateSwapOutputAmount = _useSwapAmount2[1];

  var _useSwapCurrency = useSwapCurrency(Field.OUTPUT),
      _useSwapCurrency2 = _slicedToArray(_useSwapCurrency, 2),
      swapOutputCurrency = _useSwapCurrency2[0],
      updateSwapOutputCurrency = _useSwapCurrency2[1];

  var isRouteLoading = tradeState === TradeState.SYNCING || tradeState === TradeState.LOADING;
  var isDependentField = !useIsSwapFieldIndependent(Field.OUTPUT);
  var isLoading = isRouteLoading && isDependentField;
  var overrideColor = useAtomValue(colorAtom);
  var dynamicColor = useCurrencyColor(swapOutputCurrency);
  var color = overrideColor || dynamicColor; // different state true/null/false allow smoother color transition

  var hasColor = swapOutputCurrency ? Boolean(color) || null : false;
  var inputUSDC = useUSDCValue(inputCurrencyAmount);
  var outputUSDC = useUSDCValue(outputCurrencyAmount);
  var priceImpact = useMemo(function () {
    var _fiatValuePriceImpact;

    var fiatValuePriceImpact = computeFiatValuePriceImpact(inputUSDC, outputUSDC);
    if (!fiatValuePriceImpact) return null;
    var color = getPriceImpactWarning(fiatValuePriceImpact);
    var sign = fiatValuePriceImpact.lessThan(0) ? '+' : '';
    var displayedPriceImpact = parseFloat((_fiatValuePriceImpact = fiatValuePriceImpact.multiply(-1)) === null || _fiatValuePriceImpact === void 0 ? void 0 : _fiatValuePriceImpact.toSignificant(3));
    return /*#__PURE__*/jsxs(Body2, {
      color: color,
      children: ["(", sign, displayedPriceImpact, "%)"]
    });
  }, [inputUSDC, outputUSDC]);
  var amount = useFormattedFieldAmount({
    disabled: disabled,
    currencyAmount: outputCurrencyAmount,
    fieldAmount: swapOutputAmount
  });
  return /*#__PURE__*/jsx(DynamicThemeProvider, {
    color: color,
    children: /*#__PURE__*/jsxs(OutputColumn, {
      hasColor: hasColor,
      gap: 0.5,
      children: [/*#__PURE__*/jsx(Row, {
        children: /*#__PURE__*/jsx(Subhead1, {
          color: "secondary",
          children: /*#__PURE__*/jsx(Trans, {
            id: "For"
          })
        })
      }), /*#__PURE__*/jsx(TokenInput, {
        currency: swapOutputCurrency,
        amount: amount,
        disabled: disabled,
        onChangeInput: updateSwapOutputAmount,
        onChangeCurrency: updateSwapOutputCurrency,
        loading: isLoading,
        children: /*#__PURE__*/jsx(Body2, {
          color: "secondary",
          userSelect: true,
          children: /*#__PURE__*/jsxs(Row, {
            children: [/*#__PURE__*/jsxs(USDC, {
              gap: 0.5,
              $loading: isLoading,
              children: [outputUSDC ? "$".concat(outputUSDC.toFixed(2)) : '-', " ", priceImpact]
            }), balance && /*#__PURE__*/jsxs(Balance, {
              focused: focused,
              children: ["Balance: ", /*#__PURE__*/jsx("span", {
                children: formatCurrencyAmount(balance, 4, i18n.locale)
              })]
            })]
          })
        })
      }), children, /*#__PURE__*/jsx(BrandedFooter, {})]
    })
  });
}

var _templateObject$g, _templateObject2$6, _templateObject3$5, _templateObject4$5, _templateObject5$3;
var ReverseRow = styled(Row)(_templateObject$g || (_templateObject$g = _taggedTemplateLiteral(["\n  left: 50%;\n  position: absolute;\n  transform: translate(-50%, -50%);\n  z-index: ", ";\n"])), Layer.OVERLAY);
var ArrowUp = styled(ArrowUp$1)(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteral(["\n  left: calc(50% - 0.37em);\n  position: absolute;\n  top: calc(50% - 0.82em);\n"])));
var ArrowDown = styled(ArrowDown$1)(_templateObject3$5 || (_templateObject3$5 = _taggedTemplateLiteral(["\n  bottom: calc(50% - 0.82em);\n  position: absolute;\n  right: calc(50% - 0.37em);\n"])));
var Overlay$1 = styled.div(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: ", "em;\n  padding: 0.25em;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.container;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.borderRadius;
});
var StyledReverseButton = styled(Button$1)(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteral(["\n  border-radius: ", "em;\n  height: 2.5em;\n  position: relative;\n  width: 2.5em;\n\n  div {\n    transform: rotate(", "turn);\n    transition: transform 0.25s ease-in-out;\n    will-change: transform;\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.borderRadius * 0.75;
}, function (_ref4) {
  var turns = _ref4.turns;
  return turns / 2;
});
function ReverseButton(_ref5) {
  var disabled = _ref5.disabled;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      turns = _useState2[0],
      setTurns = _useState2[1];

  var switchCurrencies = useSwitchSwapCurrencies();
  var onClick = useCallback(function () {
    switchCurrencies();
    setTurns(function (turns) {
      return ++turns;
    });
  }, [switchCurrencies]);
  return /*#__PURE__*/jsx(ReverseRow, {
    justify: "center",
    children: /*#__PURE__*/jsx(Overlay$1, {
      children: /*#__PURE__*/jsx(StyledReverseButton, {
        disabled: disabled,
        onClick: onClick,
        turns: turns,
        children: /*#__PURE__*/jsxs("div", {
          children: [/*#__PURE__*/jsx(ArrowUp, {
            strokeWidth: 3
          }), /*#__PURE__*/jsx(ArrowDown, {
            strokeWidth: 3
          })]
        })
      })
    })
  });
}

function useHasHover(node) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasHover = _useState2[0],
      setHasHover = _useState2[1];

  var onMouseEnter = useCallback(function () {
    return setHasHover(true);
  }, []);
  var onMouseLeave = useCallback(function (e) {
    return setHasHover(false);
  }, []);
  useEffect(function () {
    node === null || node === void 0 ? void 0 : node.addEventListener('mouseenter', onMouseEnter);
    node === null || node === void 0 ? void 0 : node.addEventListener('mouseleave', onMouseLeave);
    return function () {
      node === null || node === void 0 ? void 0 : node.removeEventListener('mouseenter', onMouseEnter);
      node === null || node === void 0 ? void 0 : node.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [node, onMouseEnter, onMouseLeave]);
  return hasHover;
}

var _templateObject$f;
function useTooltip(tooltip) {
  var hover = useHasHover(tooltip);
  var focus = useHasFocus(tooltip);
  return hover || focus;
}
var IconTooltip = styled(IconButton)(_templateObject$f || (_templateObject$f = _taggedTemplateLiteral(["\n  cursor: help;\n"])));
function Tooltip(_ref) {
  var _ref$icon = _ref.icon,
      Icon = _ref$icon === void 0 ? HelpCircle : _ref$icon,
      iconProps = _ref.iconProps,
      children = _ref.children,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'auto' : _ref$placement,
      offset = _ref.offset,
      contained = _ref.contained;
  var tooltip = useRef(null);
  var showTooltip = useTooltip(tooltip.current);
  return /*#__PURE__*/jsx(Popover, {
    content: children,
    show: showTooltip,
    placement: placement,
    offset: offset,
    contained: contained,
    children: /*#__PURE__*/jsx(IconTooltip, {
      icon: Icon,
      iconProps: iconProps,
      ref: tooltip
    })
  });
}

var _templateObject$e;
var optionCss = function optionCss(selected) {
  return css(_templateObject$e || (_templateObject$e = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  border-radius: ", "em;\n  color: ", " !important;\n  display: grid;\n  grid-gap: 0.25em;\n  padding: calc(0.75em - 1px) 0.625em;\n\n  :enabled {\n    border: 1px solid ", ";\n  }\n\n  :enabled:hover {\n    border-color: ", ";\n  }\n\n  :enabled:focus-within {\n    border-color: ", ";\n  }\n"])), function (_ref) {
    var theme = _ref.theme;
    return selected ? theme.active : theme.outline;
  }, function (_ref2) {
    var theme = _ref2.theme;
    return theme.borderRadius * 0.75;
  }, function (_ref3) {
    var theme = _ref3.theme;
    return theme.primary;
  }, function (_ref4) {
    var theme = _ref4.theme;
    return selected ? theme.active : theme.outline;
  }, function (_ref5) {
    var theme = _ref5.theme;
    return theme.onHover(selected ? theme.active : theme.outline);
  }, function (_ref6) {
    var theme = _ref6.theme;
    return theme.active;
  });
};
function Label(_ref8) {
  var name = _ref8.name,
      tooltip = _ref8.tooltip;
  return /*#__PURE__*/jsxs(Row, {
    gap: 0.5,
    justify: "flex-start",
    children: [/*#__PURE__*/jsx(Subhead2, {
      children: name
    }), tooltip && /*#__PURE__*/jsx(Tooltip, {
      placement: "top",
      contained: true,
      children: /*#__PURE__*/jsx(Caption$1, {
        children: tooltip
      })
    })]
  });
}

var _templateObject$d, _templateObject2$5;

var tooltip$1 = /*#__PURE__*/jsx(Trans, {
  id: "Your transaction will revert if the price changes unfavorably by more than this percentage."
});

var highSlippage = /*#__PURE__*/jsx(Trans, {
  id: "High slippage increases the risk of price movement"
});

var invalidSlippage = /*#__PURE__*/jsx(Trans, {
  id: "Please enter a valid slippage %"
});

var placeholder = '0.10';
var Button = styled(TextButton)(_templateObject$d || (_templateObject$d = _taggedTemplateLiteral(["\n  ", "\n"])), function (_ref) {
  var selected = _ref.selected;
  return optionCss(selected);
});
var Custom = styled(BaseButton)(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteral(["\n  ", "\n  ", "\n  padding: calc(0.75em - 3px) 0.625em;\n"])), function (_ref2) {
  var selected = _ref2.selected;
  return optionCss(selected);
}, inputCss);
var Option = /*#__PURE__*/forwardRef(function Option(_ref3, ref) {
  var Wrapper = _ref3.wrapper,
      children = _ref3.children,
      selected = _ref3.selected,
      onSelect = _ref3.onSelect,
      icon = _ref3.icon,
      tabIndex = _ref3.tabIndex;
  return /*#__PURE__*/jsx(Wrapper, {
    selected: selected,
    onClick: onSelect,
    ref: ref,
    tabIndex: tabIndex,
    children: /*#__PURE__*/jsxs(Row, {
      gap: 0.5,
      children: [children, icon ? icon : /*#__PURE__*/jsx(LargeIcon, {
        icon: selected ? Check : undefined,
        size: 1.25
      })]
    })
  });
});
var Warning = /*#__PURE__*/memo(function Warning(_ref4) {
  var state = _ref4.state,
      showTooltip = _ref4.showTooltip;
  var icon;
  var content;
  var show = showTooltip;

  switch (state) {
    case 'error':
      icon = XOctagon;
      content = invalidSlippage;
      show = true;
      break;

    case 'warning':
      icon = AlertTriangle;
      content = highSlippage;
      break;
  }

  return /*#__PURE__*/jsx(Popover, {
    content: /*#__PURE__*/jsx(Caption$1, {
      children: content
    }),
    show: show,
    placement: "top",
    offset: 16,
    contained: true,
    children: /*#__PURE__*/jsx(LargeIcon, {
      icon: icon,
      color: state,
      size: 1.25
    })
  }, state);
});
function MaxSlippageSelect() {
  var _useAtom = useAtom(autoSlippageAtom),
      _useAtom2 = _slicedToArray(_useAtom, 2),
      autoSlippage = _useAtom2[0],
      setAutoSlippage = _useAtom2[1];

  var _useAtom3 = useAtom(maxSlippageAtom),
      _useAtom4 = _slicedToArray(_useAtom3, 2),
      maxSlippage = _useAtom4[0],
      setMaxSlippage = _useAtom4[1];

  var maxSlippageInput = useMemo(function () {
    return (maxSlippage === null || maxSlippage === void 0 ? void 0 : maxSlippage.toString()) || '';
  }, [maxSlippage]);
  var option = useRef(null);
  var showTooltip = useTooltip(option.current);
  var input = useRef(null);
  var focus = useCallback(function () {
    var _input$current;

    return (_input$current = input.current) === null || _input$current === void 0 ? void 0 : _input$current.focus();
  }, [input]);

  var _useState = useState(getSlippageWarning(toPercent(maxSlippage))),
      _useState2 = _slicedToArray(_useState, 2),
      warning = _useState2[0],
      setWarning = _useState2[1];

  useEffect(function () {
    setWarning(getSlippageWarning(toPercent(maxSlippage)));
  }, [maxSlippage]);
  var onInputSelect = useCallback(function () {
    focus();
    var percent = toPercent(maxSlippage);
    var warning = getSlippageWarning(percent);
    setAutoSlippage(!percent || warning === 'error');
  }, [focus, maxSlippage, setAutoSlippage]);
  var processValue = useCallback(function (value) {
    var percent = toPercent(value);
    var warning = getSlippageWarning(percent);
    setMaxSlippage(value);
    setAutoSlippage(!percent || warning === 'error');
  }, [setAutoSlippage, setMaxSlippage]);
  return /*#__PURE__*/jsxs(Column, {
    gap: 0.75,
    children: [/*#__PURE__*/jsx(Label, {
      name: /*#__PURE__*/jsx(Trans, {
        id: "Max slippage"
      }),
      tooltip: tooltip$1
    }), /*#__PURE__*/jsxs(Row, {
      gap: 0.5,
      grow: "last",
      children: [/*#__PURE__*/jsx(Option, {
        wrapper: Button,
        selected: autoSlippage,
        onSelect: function onSelect() {
          return setAutoSlippage(true);
        },
        children: /*#__PURE__*/jsx(ButtonMedium, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "Auto"
          })
        })
      }), /*#__PURE__*/jsx(Option, {
        wrapper: Custom,
        selected: !autoSlippage,
        onSelect: onInputSelect,
        icon: warning && /*#__PURE__*/jsx(Warning, {
          state: warning,
          showTooltip: showTooltip
        }),
        ref: option,
        tabIndex: -1,
        children: /*#__PURE__*/jsxs(Row, {
          color: warning === 'error' ? 'error' : undefined,
          children: [/*#__PURE__*/jsx(DecimalInput, {
            size: Math.max(maxSlippageInput.length, 4),
            value: maxSlippageInput,
            onChange: function onChange(input) {
              return processValue(+input);
            },
            placeholder: placeholder,
            ref: input
          }), "%"]
        })
      })]
    })]
  });
}

function useCurrentBlockTimestamp() {
  var _useSingleCallResult, _useSingleCallResult$;

  var multicall = useInterfaceMulticall();
  return (_useSingleCallResult = useSingleCallResult(multicall, 'getCurrentBlockTimestamp')) === null || _useSingleCallResult === void 0 ? void 0 : (_useSingleCallResult$ = _useSingleCallResult.result) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$[0];
}

/** Returns the default transaction TTL for the chain, in minutes. */

function useDefaultTransactionTtl() {
  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId;

  if (chainId && L2_CHAIN_IDS.includes(chainId)) return L2_DEADLINE_FROM_NOW / 60;
  return DEFAULT_DEADLINE_FROM_NOW / 60;
}
/** Returns the user-inputted transaction TTL, in minutes. */

function useTransactionTtl() {
  return useAtom(transactionTtlAtom);
} // combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction

function useTransactionDeadline() {
  var _useTransactionTtl = useTransactionTtl(),
      _useTransactionTtl2 = _slicedToArray(_useTransactionTtl, 1),
      ttl = _useTransactionTtl2[0];

  var defaultTtl = useDefaultTransactionTtl();
  var blockTimestamp = useCurrentBlockTimestamp();
  return useMemo(function () {
    if (!blockTimestamp) return undefined;
    return blockTimestamp.add((ttl || defaultTtl
    /* in seconds */
    ) * 60);
  }, [blockTimestamp, defaultTtl, ttl]);
}

var _templateObject$c;

var tooltip = /*#__PURE__*/jsx(Trans, {
  id: "Your transaction will revert if it has been pending for longer than this period of time."
});

var Input = styled(Row)(_templateObject$c || (_templateObject$c = _taggedTemplateLiteral(["\n  ", "\n"])), inputCss);
function TransactionTtlInput() {
  var _ttl$toString;

  var _useTransactionTtl = useTransactionTtl(),
      _useTransactionTtl2 = _slicedToArray(_useTransactionTtl, 2),
      ttl = _useTransactionTtl2[0],
      setTtl = _useTransactionTtl2[1];

  var defaultTtl = useDefaultTransactionTtl();
  var placeholder = defaultTtl.toString();
  var input = useRef(null);
  return /*#__PURE__*/jsxs(Column, {
    gap: 0.75,
    children: [/*#__PURE__*/jsx(Label, {
      name: /*#__PURE__*/jsx(Trans, {
        id: "Transaction deadline"
      }),
      tooltip: tooltip
    }), /*#__PURE__*/jsx(Body1, {
      children: /*#__PURE__*/jsxs(Input, {
        justify: "start",
        onClick: function onClick() {
          var _input$current;

          return (_input$current = input.current) === null || _input$current === void 0 ? void 0 : _input$current.focus();
        },
        children: [/*#__PURE__*/jsx(IntegerInput, {
          placeholder: placeholder,
          value: (_ttl$toString = ttl === null || ttl === void 0 ? void 0 : ttl.toString()) !== null && _ttl$toString !== void 0 ? _ttl$toString : '',
          onChange: function onChange(value) {
            return setTtl(value ? parseFloat(value) : 0);
          },
          size: Math.max((ttl === null || ttl === void 0 ? void 0 : ttl.toString().length) || 0, placeholder.length),
          ref: input
        }), /*#__PURE__*/jsx(Trans, {
          id: "minutes"
        })]
      })
    })]
  });
}

var _templateObject$b;
function SettingsDialog() {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      boundary = _useState2[0],
      setBoundary = _useState2[1];

  var scrollbar = useScrollbar(boundary, {
    padded: true
  });
  var resetSettings = useResetAtom(settingsAtom);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Header, {
      title: /*#__PURE__*/jsx(Trans, {
        id: "Settings"
      }),
      ruled: true,
      children: /*#__PURE__*/jsx(TextButton, {
        onClick: resetSettings,
        children: /*#__PURE__*/jsx(ButtonSmall, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "Reset"
          })
        })
      })
    }), /*#__PURE__*/jsx(Column, {
      gap: 1,
      style: {
        paddingTop: '1em'
      },
      ref: setBoundary,
      padded: true,
      css: scrollbar,
      children: /*#__PURE__*/jsxs(BoundaryProvider, {
        value: boundary,
        children: [/*#__PURE__*/jsx(MaxSlippageSelect, {}), /*#__PURE__*/jsx(TransactionTtlInput, {})]
      })
    })]
  });
}
var SettingsButton = styled(IconButton)(_templateObject$b || (_templateObject$b = _taggedTemplateLiteral(["\n  ", " {\n    transform: ", ";\n    transition: ", ";\n    will-change: transform;\n  }\n"])), Settings$1, function (_ref) {
  var hover = _ref.hover;
  return hover && 'rotate(45deg)';
}, function (_ref2) {
  var hover = _ref2.hover;
  return hover && 'transform 0.25s';
});
function Settings(_ref3) {
  var disabled = _ref3.disabled;

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      hover = _useState6[0],
      setHover = _useState6[1];

  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(SettingsButton, {
      disabled: disabled,
      hover: hover,
      onClick: function onClick() {
        return setOpen(true);
      },
      onMouseEnter: function onMouseEnter() {
        return setHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHover(false);
      },
      icon: Settings$1
    }), open && /*#__PURE__*/jsx(Dialog, {
      color: "module",
      onClose: function onClose() {
        return setOpen(false);
      },
      children: /*#__PURE__*/jsx(SettingsDialog, {})
    })]
  });
}

var _templateObject$a, _templateObject2$4, _templateObject3$4, _templateObject4$4, _templateObject5$2;
var StyledButton = styled(Button$1)(_templateObject$a || (_templateObject$a = _taggedTemplateLiteral(["\n  border-radius: ", "em;\n  flex-grow: 1;\n  transition: background-color 0.25s ease-out, flex-grow 0.25s ease-out, padding 0.25s ease-out;\n\n  :disabled {\n    margin: -1px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.borderRadius;
});
var ActionRow = styled(Row)(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteral([""])));
var grow = keyframes(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n    width: 0;\n  }\n  to {\n    opacity: 1;\n    width: max-content;\n  }\n"])));
var actionCss = css(_templateObject4$4 || (_templateObject4$4 = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  padding: calc(0.25em - 1px);\n  padding-left: calc(0.75em - 1px);\n\n  ", " {\n    animation: ", " 0.25s ease-in;\n    white-space: nowrap;\n  }\n\n  ", " {\n    border-radius: ", "em;\n    flex-grow: 0;\n    padding: 1em;\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.outline;
}, ActionRow, grow, StyledButton, function (_ref3) {
  var theme = _ref3.theme;
  return theme.borderRadius * 0.75;
});
var Overlay = styled(Row)(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral(["\n  border-radius: ", "em;\n  flex-direction: row-reverse;\n  min-height: 3.5em;\n  transition: padding 0.25s ease-out;\n\n  ", "\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.borderRadius;
}, function (_ref5) {
  var hasAction = _ref5.hasAction;
  return hasAction && actionCss;
});
function ActionButton(_ref6) {
  var _ref6$color = _ref6.color,
      color = _ref6$color === void 0 ? 'accent' : _ref6$color,
      disabled = _ref6.disabled,
      action = _ref6.action,
      onClick = _ref6.onClick,
      children = _ref6.children;
  var textColor = useMemo(function () {
    return color === 'accent' && !disabled ? 'onAccent' : 'currentColor';
  }, [color, disabled]);
  return /*#__PURE__*/jsxs(Overlay, {
    hasAction: Boolean(action),
    flex: true,
    align: "stretch",
    children: [/*#__PURE__*/jsx(StyledButton, {
      color: color,
      disabled: disabled,
      onClick: action ? action.onClick : onClick,
      children: /*#__PURE__*/jsx(TransitionButton, {
        buttonSize: action ? 'medium' : 'large',
        color: textColor,
        children: action ? action.children : children
      })
    }), action && /*#__PURE__*/jsxs(ActionRow, {
      gap: 0.5,
      children: [/*#__PURE__*/jsx(LargeIcon, {
        color: "currentColor",
        icon: action.icon || AlertTriangle
      }), /*#__PURE__*/jsx(Subhead2, {
        children: action === null || action === void 0 ? void 0 : action.message
      })]
    })]
  });
}

var _templateObject$9, _templateObject2$3, _templateObject3$3, _templateObject4$3;
var HeaderIcon = styled(LargeIcon)(_templateObject$9 || (_templateObject$9 = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  transition: height 0.25s, width 0.25s;\n\n  svg {\n    transition: height 0.25s, width 0.25s;\n  }\n"])));
function StatusHeader(_ref) {
  var Icon = _ref.icon,
      iconColor = _ref.iconColor,
      _ref$iconSize = _ref.iconSize,
      iconSize = _ref$iconSize === void 0 ? 4 : _ref$iconSize,
      children = _ref.children;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs(Column, {
      flex: true,
      style: {
        flexGrow: 1
      },
      children: [/*#__PURE__*/jsx(HeaderIcon, {
        icon: Icon,
        color: iconColor,
        size: iconSize
      }), /*#__PURE__*/jsx(Column, {
        gap: 0.75,
        flex: true,
        style: {
          textAlign: 'center'
        },
        children: children
      })]
    }), /*#__PURE__*/jsx(Rule, {})]
  });
}
var ErrorHeader = styled(Column)(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteral(["\n  transition: gap 0.25s;\n\n  div:last-child {\n    max-height: ", "em; // 3 * line-height\n    overflow-y: hidden;\n    transition: max-height 0.25s;\n  }\n"])), function (_ref2) {
  var open = _ref2.open;
  return open ? 0 : 60 / 14;
});
var ErrorColumn = styled(Column)(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteral([""])));
var ExpandoColumn$1 = styled(Column)(_templateObject4$3 || (_templateObject4$3 = _taggedTemplateLiteral(["\n  flex-grow: ", ";\n  transition: flex-grow 0.25s, gap 0.25s;\n\n  ", " {\n    margin-bottom: ", "em;\n    transition: margin-bottom 0.25s;\n  }\n\n  ", " {\n    flex-basis: 0;\n    flex-grow: ", ";\n    overflow-y: hidden;\n    position: relative;\n    transition: flex-grow 0.25s;\n\n    ", " {\n      height: 6.825em;\n      padding: ", ";\n      transition: padding 0.25s;\n\n      :after {\n        background: linear-gradient(#ffffff00, ", ");\n        bottom: 0;\n        content: '';\n        height: 0.75em;\n        pointer-events: none;\n        position: absolute;\n        width: calc(100% - 1em);\n      }\n    }\n  }\n"])), function (_ref3) {
  var open = _ref3.open;
  return open ? 2 : 0;
}, Rule, function (_ref4) {
  var open = _ref4.open;
  return open ? 0 : 0.75;
}, ErrorColumn, function (_ref5) {
  var open = _ref5.open;
  return open ? 1 : 0;
}, Column, function (_ref6) {
  var open = _ref6.open;
  return open ? '0.5em 0' : 0;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.dialog;
});
function ErrorDialog(_ref8) {
  var header = _ref8.header,
      error = _ref8.error,
      action = _ref8.action,
      onClick = _ref8.onClick;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      details = _useState4[0],
      setDetails = _useState4[1];

  var scrollbar = useScrollbar(details);
  return /*#__PURE__*/jsxs(Column, {
    flex: true,
    padded: true,
    gap: 0.75,
    align: "stretch",
    style: {
      height: '100%'
    },
    children: [/*#__PURE__*/jsx(StatusHeader, {
      icon: AlertTriangle,
      iconColor: "error",
      iconSize: open ? 3 : 4,
      children: /*#__PURE__*/jsxs(ErrorHeader, {
        gap: open ? 0 : 0.75,
        open: open,
        children: [/*#__PURE__*/jsx(Subhead1, {
          children: /*#__PURE__*/jsx(Trans, {
            id: "Something went wrong."
          })
        }), /*#__PURE__*/jsx(Body2, {
          children: header
        })]
      })
    }), /*#__PURE__*/jsxs(Row, {
      children: [/*#__PURE__*/jsxs(Row, {
        gap: 0.5,
        children: [/*#__PURE__*/jsx(Info, {
          color: "secondary"
        }), /*#__PURE__*/jsx(Subhead2, {
          color: "secondary",
          children: /*#__PURE__*/jsx(Trans, {
            id: "Error details"
          })
        })]
      }), /*#__PURE__*/jsx(IconButton, {
        color: "secondary",
        onClick: function onClick() {
          return setOpen(!open);
        },
        icon: Expando,
        iconProps: {
          open: open
        }
      })]
    }), /*#__PURE__*/jsxs(ExpandoColumn$1, {
      flex: true,
      align: "stretch",
      open: open,
      children: [/*#__PURE__*/jsx(Rule, {}), /*#__PURE__*/jsx(ErrorColumn, {
        children: /*#__PURE__*/jsx(Column, {
          gap: 0.5,
          ref: setDetails,
          css: scrollbar,
          children: /*#__PURE__*/jsxs(Code, {
            userSelect: true,
            children: [error.name, error.message ? ": ".concat(error.message) : '']
          })
        })
      }), /*#__PURE__*/jsx(ActionButton, {
        onClick: onClick,
        children: action
      })]
    })]
  });
}

var _ETHERSCAN_PREFIXES;
var ETHERSCAN_PREFIXES = (_ETHERSCAN_PREFIXES = {}, _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.MAINNET, 'https://etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.ROPSTEN, 'https://ropsten.etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.RINKEBY, 'https://rinkeby.etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.GOERLI, 'https://goerli.etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.KOVAN, 'https://kovan.etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.OPTIMISM, 'https://optimistic.etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.OPTIMISTIC_KOVAN, 'https://kovan-optimistic.etherscan.io'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.POLYGON_MUMBAI, 'https://mumbai.polygonscan.com'), _defineProperty(_ETHERSCAN_PREFIXES, SupportedChainId.POLYGON, 'https://polygonscan.com'), _ETHERSCAN_PREFIXES);
var ExplorerDataType;
/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */

(function (ExplorerDataType) {
  ExplorerDataType["TRANSACTION"] = "transaction";
  ExplorerDataType["TOKEN"] = "token";
  ExplorerDataType["ADDRESS"] = "address";
  ExplorerDataType["BLOCK"] = "block";
})(ExplorerDataType || (ExplorerDataType = {}));

function getExplorerLink(chainId, data, type) {
  var _ETHERSCAN_PREFIXES$c;

  if (chainId === SupportedChainId.ARBITRUM_ONE) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return "https://arbiscan.io/tx/".concat(data);

      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return "https://arbiscan.io/address/".concat(data);

      case ExplorerDataType.BLOCK:
        return "https://arbiscan.io/block/".concat(data);

      default:
        return "https://arbiscan.io/";
    }
  }

  if (chainId === SupportedChainId.ARBITRUM_RINKEBY) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return "https://rinkeby-explorer.arbitrum.io/tx/".concat(data);

      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return "https://rinkeby-explorer.arbitrum.io/address/".concat(data);

      case ExplorerDataType.BLOCK:
        return "https://rinkeby-explorer.arbitrum.io/block/".concat(data);

      default:
        return "https://rinkeby-explorer.arbitrum.io/";
    }
  }

  var prefix = (_ETHERSCAN_PREFIXES$c = ETHERSCAN_PREFIXES[chainId]) !== null && _ETHERSCAN_PREFIXES$c !== void 0 ? _ETHERSCAN_PREFIXES$c : 'https://etherscan.io';

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return "".concat(prefix, "/tx/").concat(data);

    case ExplorerDataType.TOKEN:
      return "".concat(prefix, "/token/").concat(data);

    case ExplorerDataType.BLOCK:
      if (chainId === SupportedChainId.OPTIMISM || chainId === SupportedChainId.OPTIMISTIC_KOVAN) {
        return "".concat(prefix, "/tx/").concat(data);
      }

      return "".concat(prefix, "/block/").concat(data);

    case ExplorerDataType.ADDRESS:
      return "".concat(prefix, "/address/").concat(data);

    default:
      return "".concat(prefix);
  }
}

var _templateObject$8;
var StyledExternalLink = styled(ExternalLink)(_templateObject$8 || (_templateObject$8 = _taggedTemplateLiteral(["\n  color: ", ";\n  text-decoration: none;\n"])), function (_ref) {
  var theme = _ref.theme,
      color = _ref.color;
  return theme[color];
});
function EtherscanLink(_ref2) {
  var data = _ref2.data,
      type = _ref2.type,
      _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? 'currentColor' : _ref2$color,
      children = _ref2.children;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId;

  var url = useMemo(function () {
    return data && getExplorerLink(chainId || SupportedChainId.MAINNET, data, type);
  }, [chainId, data, type]);
  return /*#__PURE__*/jsx(StyledExternalLink, {
    href: url,
    color: color,
    target: "_blank",
    children: /*#__PURE__*/jsxs(Row, {
      gap: 0.25,
      children: [children, " ", /*#__PURE__*/jsx(Link, {})]
    })
  });
}

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param args either a pair of V2 trades or a pair of V3 trades
 */
function tradeMeaningfullyDiffers() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var tradeA = args[0],
      tradeB = args[1];
  return tradeA.tradeType !== tradeB.tradeType || !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) || !tradeA.inputAmount.equalTo(tradeB.inputAmount) || !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency) || !tradeA.outputAmount.equalTo(tradeB.outputAmount);
}

var _templateObject$7;
var Value = styled.span(_templateObject$7 || (_templateObject$7 = _taggedTemplateLiteral(["\n  color: ", ";\n  white-space: nowrap;\n"])), function (_ref) {
  var color = _ref.color,
      theme = _ref.theme;
  return color && theme[color];
});

function Detail(_ref2) {
  var label = _ref2.label,
      value = _ref2.value,
      color = _ref2.color;
  return /*#__PURE__*/jsx(Caption$1, {
    userSelect: true,
    children: /*#__PURE__*/jsxs(Row, {
      gap: 2,
      children: [/*#__PURE__*/jsx("span", {
        children: label
      }), /*#__PURE__*/jsx(Value, {
        color: color,
        children: value
      })]
    })
  });
}

function Details(_ref3) {
  var trade = _ref3.trade,
      allowedSlippage = _ref3.allowedSlippage;
  var inputAmount = trade.inputAmount,
      outputAmount = trade.outputAmount;
  var inputCurrency = inputAmount.currency;
  var outputCurrency = outputAmount.currency;
  var integrator = window.location.hostname;
  var feeOptions = useAtomValue(feeOptionsAtom);
  var priceImpact = useMemo(function () {
    return computeRealizedPriceImpact(trade);
  }, [trade]);
  var lpFeeAmount = useMemo(function () {
    return computeRealizedLPFeeAmount(trade);
  }, [trade]);

  var _useLingui = useLingui(),
      i18n = _useLingui.i18n;

  var details = useMemo(function () {
    var rows = []; // @TODO(ianlapham): Check that provider fee is even a valid list item

    if (feeOptions) {
      var fee = outputAmount.multiply(feeOptions.fee);

      if (fee.greaterThan(0)) {
        var parsedFee = formatCurrencyAmount(fee, 6, i18n.locale);
        rows.push([
        /*i18n*/
        i18n._("{integrator} fee", {
          integrator: integrator
        }), "".concat(parsedFee, " ").concat(outputCurrency.symbol || currencyId(outputCurrency))]);
      }
    }

    rows.push([
    /*i18n*/
    i18n._("Price impact"), "".concat(priceImpact.toFixed(2), "%"), getPriceImpactWarning(priceImpact)]);

    if (lpFeeAmount) {
      var parsedLpFee = formatCurrencyAmount(lpFeeAmount, 6, i18n.locale);
      rows.push([
      /*i18n*/
      i18n._("Liquidity provider fee"), "".concat(parsedLpFee, " ").concat(inputCurrency.symbol || currencyId(inputCurrency))]);
    }

    if (trade.tradeType === TradeType.EXACT_OUTPUT) {
      var localizedMaxSent = formatCurrencyAmount(trade.maximumAmountIn(allowedSlippage), 6, i18n.locale);
      rows.push([
      /*i18n*/
      i18n._("Maximum sent"), "".concat(localizedMaxSent, " ").concat(inputCurrency.symbol)]);
    }

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      var _localizedMaxSent = formatCurrencyAmount(trade.minimumAmountOut(allowedSlippage), 6, i18n.locale);

      rows.push([
      /*i18n*/
      i18n._("Minimum received"), "".concat(_localizedMaxSent, " ").concat(outputCurrency.symbol)]);
    }

    rows.push([
    /*i18n*/
    i18n._("Slippage tolerance"), "".concat(allowedSlippage.toFixed(2), "%"), getSlippageWarning(allowedSlippage)]);
    return rows;
  }, [feeOptions, priceImpact, lpFeeAmount, trade, allowedSlippage, outputAmount, i18n.locale, integrator, outputCurrency, inputCurrency]);
  return /*#__PURE__*/jsx(Fragment, {
    children: details.map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 3),
          label = _ref5[0],
          detail = _ref5[1],
          color = _ref5[2];

      return /*#__PURE__*/jsx(Detail, {
        label: label,
        value: detail,
        color: color
      }, label);
    })
  });
}

var _templateObject$6;
var Percent = styled.span(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref) {
  var gain = _ref.gain,
      theme = _ref.theme;
  return gain ? theme.success : theme.error;
});

function TokenValue(_ref2) {
  var input = _ref2.input,
      usdc = _ref2.usdc,
      change = _ref2.change;

  var _useLingui = useLingui(),
      i18n = _useLingui.i18n;

  var percent = useMemo(function () {
    if (change) {
      var _percent = change.toPrecision(3);

      return change > 0 ? "(+".concat(_percent, "%)") : "(".concat(_percent, "%)");
    }

    return undefined;
  }, [change]);
  var usdcAmount = useUSDCValue(input);
  return /*#__PURE__*/jsxs(Column, {
    justify: "flex-start",
    children: [/*#__PURE__*/jsxs(Row, {
      gap: 0.375,
      justify: "flex-start",
      children: [/*#__PURE__*/jsx(TokenImg$1, {
        token: input.currency
      }), /*#__PURE__*/jsxs(Body2, {
        userSelect: true,
        children: [formatCurrencyAmount(input, 6, i18n.locale), " ", input.currency.symbol]
      })]
    }), usdc && usdcAmount && /*#__PURE__*/jsx(Row, {
      justify: "flex-start",
      children: /*#__PURE__*/jsxs(Caption$1, {
        color: "secondary",
        userSelect: true,
        children: ["$", formatCurrencyAmount(usdcAmount, 2, i18n.locale), change && /*#__PURE__*/jsxs(Percent, {
          gain: change > 0,
          children: [" ", percent]
        })]
      })
    })]
  });
}

function Summary(_ref3) {
  var input = _ref3.input,
      output = _ref3.output,
      usdc = _ref3.usdc;
  var inputUSDCValue = useUSDCValue(input);
  var outputUSDCValue = useUSDCValue(output);
  var priceImpact = useMemo(function () {
    var _computedChange$multi;

    var computedChange = computeFiatValuePriceImpact(inputUSDCValue, outputUSDCValue);
    return computedChange ? parseFloat((_computedChange$multi = computedChange.multiply(-1)) === null || _computedChange$multi === void 0 ? void 0 : _computedChange$multi.toSignificant(3)) : undefined;
  }, [inputUSDCValue, outputUSDCValue]);
  return /*#__PURE__*/jsxs(Row, {
    gap: usdc ? 1 : 0.25,
    children: [/*#__PURE__*/jsx(TokenValue, {
      input: input,
      usdc: usdc
    }), /*#__PURE__*/jsx(ArrowRight, {}), /*#__PURE__*/jsx(TokenValue, {
      input: output,
      usdc: usdc,
      change: priceImpact
    })]
  });
}

var _templateObject$5, _templateObject2$2, _templateObject3$2, _templateObject4$2, _templateObject5$1;
var SummaryColumn = styled(Column)(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteral([""])));
var ExpandoColumn = styled(Column)(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral([""])));
var DetailsColumn = styled(Column)(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral([""])));
var Estimate = styled(Caption$1)(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral([""])));
var Body = styled(Column)(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral(["\n  height: calc(100% - 2.5em);\n\n  ", " {\n    flex-grow: ", ";\n    transition: flex-grow 0.25s;\n  }\n\n  ", " {\n    flex-grow: ", ";\n    transition: flex-grow 0.25s;\n\n    ", " {\n      flex-basis: ", "em;\n      overflow-y: hidden;\n      position: relative;\n      transition: flex-basis 0.25s;\n\n      ", " {\n        height: 7.5em;\n        grid-template-rows: repeat(auto-fill, 1em);\n        padding: ", ";\n        transition: padding 0.25s;\n\n        :after {\n          background: linear-gradient(#ffffff00, ", ");\n          bottom: 0;\n          content: '';\n          height: 0.75em;\n          pointer-events: none;\n          position: absolute;\n          width: calc(100% - 1em);\n        }\n      }\n    }\n\n    ", " {\n      max-height: ", "em; // 2 * line-height + padding\n      min-height: 0;\n      overflow-y: hidden;\n      padding: ", ";\n      transition: ", ";\n    }\n  }\n"])), SummaryColumn, function (_ref) {
  var open = _ref.open;
  return open ? 0 : 1;
}, ExpandoColumn, function (_ref2) {
  var open = _ref2.open;
  return open ? 1 : 0;
}, DetailsColumn, function (_ref3) {
  var open = _ref3.open;
  return open ? 7.5 : 0;
}, Column, function (_ref4) {
  var open = _ref4.open;
  return open ? '0.5em 0' : 0;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.dialog;
}, Estimate, function (_ref6) {
  var open = _ref6.open;
  return open ? 0 : 56 / 12;
}, function (_ref7) {
  var open = _ref7.open;
  return open ? 0 : '1em 0';
}, function (_ref8) {
  var open = _ref8.open;
  return open ? 'max-height 0.1s ease-out, padding 0.25s ease-out' : 'flex-grow 0.25s ease-out, max-height 0.1s ease-in, padding 0.25s ease-out';
});
function SummaryDialog(_ref9) {
  var trade = _ref9.trade,
      allowedSlippage = _ref9.allowedSlippage,
      onConfirm = _ref9.onConfirm;
  var inputAmount = trade.inputAmount,
      outputAmount = trade.outputAmount,
      executionPrice = trade.executionPrice;
  var inputCurrency = inputAmount.currency;
  var outputCurrency = outputAmount.currency;
  var priceImpact = useMemo(function () {
    return computeRealizedPriceImpact(trade);
  }, [trade]);
  var tradeType = useSwapTradeType();

  var _useLingui = useLingui(),
      i18n = _useLingui.i18n;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      details = _useState4[0],
      setDetails = _useState4[1];

  var scrollbar = useScrollbar(details);
  var warning = useMemo(function () {
    return getPriceImpactWarning(priceImpact) || getSlippageWarning(allowedSlippage);
  }, [allowedSlippage, priceImpact]);

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      ackPriceImpact = _useState6[0],
      setAckPriceImpact = _useState6[1];

  var _useState7 = useState(trade),
      _useState8 = _slicedToArray(_useState7, 2),
      confirmedTrade = _useState8[0],
      setConfirmedTrade = _useState8[1];

  var doesTradeDiffer = useMemo(function () {
    return Boolean(trade && confirmedTrade && tradeMeaningfullyDiffers(trade, confirmedTrade));
  }, [confirmedTrade, trade]);
  var action = useMemo(function () {
    if (doesTradeDiffer) {
      return {
        message: /*#__PURE__*/jsx(Trans, {
          id: "Price updated"
        }),
        icon: BarChart,
        onClick: function onClick() {
          return setConfirmedTrade(trade);
        },
        children: /*#__PURE__*/jsx(Trans, {
          id: "Accept"
        })
      };
    } else if (getPriceImpactWarning(priceImpact) === 'error' && !ackPriceImpact) {
      return {
        message: /*#__PURE__*/jsx(Trans, {
          id: "High price impact"
        }),
        onClick: function onClick() {
          return setAckPriceImpact(true);
        },
        children: /*#__PURE__*/jsx(Trans, {
          id: "Acknowledge"
        })
      };
    }

    return;
  }, [ackPriceImpact, doesTradeDiffer, priceImpact, trade]);

  if (!(inputAmount && outputAmount && inputCurrency && outputCurrency)) {
    return null;
  }

  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Header, {
      title: /*#__PURE__*/jsx(Trans, {
        id: "Swap summary"
      }),
      ruled: true
    }), /*#__PURE__*/jsxs(Body, {
      flex: true,
      align: "stretch",
      gap: 0.75,
      padded: true,
      open: open,
      children: [/*#__PURE__*/jsxs(SummaryColumn, {
        gap: 0.75,
        flex: true,
        justify: "center",
        children: [/*#__PURE__*/jsx(Summary, {
          input: inputAmount,
          output: outputAmount,
          usdc: true
        }), /*#__PURE__*/jsx(Row, {
          children: /*#__PURE__*/jsxs(Caption$1, {
            userSelect: true,
            children: [formatLocaleNumber({
              number: 1,
              sigFigs: 1,
              locale: i18n.locale
            }), " ", inputCurrency.symbol, " =", ' ', formatPrice(executionPrice, 6, i18n.locale), " ", outputCurrency.symbol]
          })
        })]
      }), /*#__PURE__*/jsx(Rule, {}), /*#__PURE__*/jsxs(Row, {
        children: [/*#__PURE__*/jsxs(Row, {
          gap: 0.5,
          children: [warning ? /*#__PURE__*/jsx(AlertTriangle, {
            color: warning
          }) : /*#__PURE__*/jsx(Info, {
            color: "secondary"
          }), /*#__PURE__*/jsx(Subhead2, {
            color: "secondary",
            children: /*#__PURE__*/jsx(Trans, {
              id: "Swap details"
            })
          })]
        }), /*#__PURE__*/jsx(IconButton, {
          color: "secondary",
          onClick: function onClick() {
            return setOpen(!open);
          },
          icon: Expando,
          iconProps: {
            open: open
          }
        })]
      }), /*#__PURE__*/jsxs(ExpandoColumn, {
        flex: true,
        align: "stretch",
        children: [/*#__PURE__*/jsx(Rule, {}), /*#__PURE__*/jsx(DetailsColumn, {
          children: /*#__PURE__*/jsx(Column, {
            gap: 0.5,
            ref: setDetails,
            css: scrollbar,
            children: /*#__PURE__*/jsx(Details, {
              trade: trade,
              allowedSlippage: allowedSlippage
            })
          })
        }), /*#__PURE__*/jsxs(Estimate, {
          color: "secondary",
          children: [/*#__PURE__*/jsx(Trans, {
            id: "Output is estimated."
          }), ' ', tradeType === TradeType.EXACT_INPUT && /*#__PURE__*/jsx(Trans, {
            id: "You will receive at least {0} {1} or the transaction will revert.",
            values: {
              0: formatCurrencyAmount(trade.minimumAmountOut(allowedSlippage), 6, i18n.locale),
              1: outputCurrency.symbol
            }
          }), tradeType === TradeType.EXACT_OUTPUT && /*#__PURE__*/jsx(Trans, {
            id: "You will send at most {0} {1} or the transaction will revert.",
            values: {
              0: formatCurrencyAmount(trade.maximumAmountIn(allowedSlippage), 6, i18n.locale),
              1: inputCurrency.symbol
            }
          })]
        }), /*#__PURE__*/jsx(ActionButton, {
          onClick: onConfirm,
          action: action,
          children: /*#__PURE__*/jsx(Trans, {
            id: "Confirm swap"
          })
        })]
      })]
    })]
  });
}

/**
 * Invokes callback repeatedly over an interval defined by the delay
 * @param callback
 * @param delay if null, the callback will not be invoked
 * @param leading if true, the callback will be invoked immediately (on the leading edge); otherwise, it will be invoked after delay
 */

function useInterval(callback, delay) {
  var leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var savedCallback = useRef(); // Remember the latest callback.

  useEffect(function () {
    savedCallback.current = callback;
  }, [callback]); // Set up the interval.

  useEffect(function () {
    function tick() {
      var current = savedCallback.current;
      current && current();
    }

    if (delay !== null) {
      if (leading) tick();
      var id = setInterval(tick, delay);
      return function () {
        return clearInterval(id);
      };
    }

    return;
  }, [delay, leading]);
}

var _templateObject$4;

var errorMessage = /*#__PURE__*/jsx(Trans, {
  id: "Try increasing your slippage tolerance.<0/>NOTE: Fee on transfer and rebase tokens are incompatible with Uniswap V3.",
  components: {
    0: /*#__PURE__*/jsx("br", {})
  }
});

var TransactionRow = styled(Row)(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral(["\n  flex-direction: row-reverse;\n"])));

function ElapsedTime(_ref) {
  var tx = _ref.tx;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      elapsedMs = _useState2[0],
      setElapsedMs = _useState2[1];

  useInterval(function () {
    return setElapsedMs(Date.now() - tx.addedTime);
  }, tx.receipt ? null : 1000);
  var toElapsedTime = useCallback(function (ms) {
    var sec = Math.floor(ms / 1000);
    var min = Math.floor(sec / 60);
    sec = sec % 60;

    if (min) {
      return /*#__PURE__*/jsx(Trans, {
        id: "{min}m {sec}s",
        values: {
          min: min,
          sec: sec
        }
      });
    } else {
      return /*#__PURE__*/jsx(Trans, {
        id: "{sec}s",
        values: {
          sec: sec
        }
      });
    }
  }, []);
  return /*#__PURE__*/jsxs(Row, {
    gap: 0.5,
    children: [/*#__PURE__*/jsx(Clock, {}), /*#__PURE__*/jsx(Body2, {
      children: toElapsedTime(elapsedMs)
    })]
  });
}

function TransactionStatus(_ref2) {
  var _tx$receipt2, _tx$receipt7, _tx$receipt8;

  var tx = _ref2.tx,
      onClose = _ref2.onClose;
  var Icon = useMemo(function () {
    var _tx$receipt;

    return (_tx$receipt = tx.receipt) !== null && _tx$receipt !== void 0 && _tx$receipt.status ? CheckCircle : Spinner;
  }, [(_tx$receipt2 = tx.receipt) === null || _tx$receipt2 === void 0 ? void 0 : _tx$receipt2.status]);
  var heading = useMemo(function () {
    var _tx$receipt6;

    if (tx.info.type === TransactionType.SWAP) {
      var _tx$receipt3;

      return (_tx$receipt3 = tx.receipt) !== null && _tx$receipt3 !== void 0 && _tx$receipt3.status ? /*#__PURE__*/jsx(Trans, {
        id: "Swap confirmed"
      }) : /*#__PURE__*/jsx(Trans, {
        id: "Swap pending"
      });
    } else if (tx.info.type === TransactionType.WRAP) {
      var _tx$receipt5;

      if (tx.info.unwrapped) {
        var _tx$receipt4;

        return (_tx$receipt4 = tx.receipt) !== null && _tx$receipt4 !== void 0 && _tx$receipt4.status ? /*#__PURE__*/jsx(Trans, {
          id: "Unwrap confirmed"
        }) : /*#__PURE__*/jsx(Trans, {
          id: "Unwrap pending"
        });
      }

      return (_tx$receipt5 = tx.receipt) !== null && _tx$receipt5 !== void 0 && _tx$receipt5.status ? /*#__PURE__*/jsx(Trans, {
        id: "Wrap confirmed"
      }) : /*#__PURE__*/jsx(Trans, {
        id: "Wrap pending"
      });
    }

    return (_tx$receipt6 = tx.receipt) !== null && _tx$receipt6 !== void 0 && _tx$receipt6.status ? /*#__PURE__*/jsx(Trans, {
      id: "Transaction confirmed"
    }) : /*#__PURE__*/jsx(Trans, {
      id: "Transaction pending"
    });
  }, [tx.info, (_tx$receipt7 = tx.receipt) === null || _tx$receipt7 === void 0 ? void 0 : _tx$receipt7.status]);
  return /*#__PURE__*/jsxs(Column, {
    flex: true,
    padded: true,
    gap: 0.75,
    align: "stretch",
    style: {
      height: '100%'
    },
    children: [/*#__PURE__*/jsxs(StatusHeader, {
      icon: Icon,
      iconColor: (_tx$receipt8 = tx.receipt) !== null && _tx$receipt8 !== void 0 && _tx$receipt8.status ? 'success' : undefined,
      children: [/*#__PURE__*/jsx(Subhead1, {
        children: heading
      }), tx.info.type === TransactionType.SWAP ? /*#__PURE__*/jsx(Summary, {
        input: tx.info.inputCurrencyAmount,
        output: tx.info.outputCurrencyAmount
      }) : null]
    }), /*#__PURE__*/jsxs(TransactionRow, {
      flex: true,
      children: [/*#__PURE__*/jsx(ButtonSmall, {
        children: /*#__PURE__*/jsx(EtherscanLink, {
          type: ExplorerDataType.TRANSACTION,
          data: tx.info.response.hash,
          children: /*#__PURE__*/jsx(Trans, {
            id: "View on Etherscan"
          })
        })
      }), /*#__PURE__*/jsx(ElapsedTime, {
        tx: tx
      })]
    }), /*#__PURE__*/jsx(ActionButton, {
      onClick: onClose,
      children: /*#__PURE__*/jsx(Trans, {
        id: "Close"
      })
    })]
  });
}

function TransactionStatusDialog(_ref3) {
  var _tx$receipt9;

  var tx = _ref3.tx,
      onClose = _ref3.onClose;
  return ((_tx$receipt9 = tx.receipt) === null || _tx$receipt9 === void 0 ? void 0 : _tx$receipt9.status) === 0 ? /*#__PURE__*/jsx(ErrorDialog, {
    header: errorMessage,
    error: new Error('TODO(zzmp)'),
    action: /*#__PURE__*/jsx(Trans, {
      id: "Dismiss"
    }),
    onClick: onClose
  }) : /*#__PURE__*/jsx(TransactionStatus, {
    tx: tx,
    onClose: onClose
  });
}

function WrapErrorText(_ref) {
  var wrapError = _ref.wrapError;
  var native = useNativeCurrency();
  var wrapped = native === null || native === void 0 ? void 0 : native.wrapped;

  switch (wrapError) {
    case WrapError.ENTER_NATIVE_AMOUNT:
      return /*#__PURE__*/jsx(Trans, {
        id: "Enter {0} amount",
        values: {
          0: native === null || native === void 0 ? void 0 : native.symbol
        }
      });

    case WrapError.ENTER_WRAPPED_AMOUNT:
      return /*#__PURE__*/jsx(Trans, {
        id: "Enter {0} amount",
        values: {
          0: wrapped === null || wrapped === void 0 ? void 0 : wrapped.symbol
        }
      });

    case WrapError.INSUFFICIENT_NATIVE_BALANCE:
      return /*#__PURE__*/jsx(Trans, {
        id: "Insufficient {0} balance",
        values: {
          0: native === null || native === void 0 ? void 0 : native.symbol
        }
      });

    case WrapError.INSUFFICIENT_WRAPPED_BALANCE:
      return /*#__PURE__*/jsx(Trans, {
        id: "Insufficient {0} balance",
        values: {
          0: wrapped === null || wrapped === void 0 ? void 0 : wrapped.symbol
        }
      });

    case WrapError.NO_ERROR:
    default:
      return null;
  }
}

function useIsArgentWallet() {
  var _call$result$, _call$result;

  var _useActiveWeb3React = useActiveWeb3React(),
      account = _useActiveWeb3React.account;

  var argentWalletDetector = useArgentWalletDetectorContract();
  var inputs = useMemo(function () {
    return [account !== null && account !== void 0 ? account : undefined];
  }, [account]);
  var call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD);
  return (_call$result$ = call === null || call === void 0 ? void 0 : (_call$result = call.result) === null || _call$result === void 0 ? void 0 : _call$result[0]) !== null && _call$result$ !== void 0 ? _call$result$ : false;
}

var _, _3;

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PermitType; // 20 minutes to submit after signing

(function (PermitType) {
  PermitType[PermitType["AMOUNT"] = 1] = "AMOUNT";
  PermitType[PermitType["ALLOWED"] = 2] = "ALLOWED";
})(PermitType || (PermitType = {}));

var PERMIT_VALIDITY_BUFFER = 20 * 60;
// todo: read this information from extensions on token lists or elsewhere (permit registry?)
var PERMITTABLE_TOKENS = {
  1: (_ = {}, _defineProperty(_, USDC_MAINNET.address, {
    type: PermitType.AMOUNT,
    name: 'USD Coin',
    version: '2'
  }), _defineProperty(_, DAI.address, {
    type: PermitType.ALLOWED,
    name: 'Dai Stablecoin',
    version: '1'
  }), _defineProperty(_, UNI[1].address, {
    type: PermitType.AMOUNT,
    name: 'Uniswap'
  }), _),
  4: _defineProperty({
    '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735': {
      type: PermitType.ALLOWED,
      name: 'Dai Stablecoin',
      version: '1'
    }
  }, UNI[4].address, {
    type: PermitType.AMOUNT,
    name: 'Uniswap'
  }),
  3: (_3 = {}, _defineProperty(_3, UNI[3].address, {
    type: PermitType.AMOUNT,
    name: 'Uniswap'
  }), _defineProperty(_3, '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', {
    type: PermitType.AMOUNT,
    name: 'USD Coin',
    version: '2'
  }), _3),
  5: _defineProperty({}, UNI[5].address, {
    type: PermitType.AMOUNT,
    name: 'Uniswap'
  }),
  42: _defineProperty({}, UNI[42].address, {
    type: PermitType.AMOUNT,
    name: 'Uniswap'
  })
};
var UseERC20PermitState;

(function (UseERC20PermitState) {
  UseERC20PermitState[UseERC20PermitState["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
  UseERC20PermitState[UseERC20PermitState["LOADING"] = 1] = "LOADING";
  UseERC20PermitState[UseERC20PermitState["NOT_SIGNED"] = 2] = "NOT_SIGNED";
  UseERC20PermitState[UseERC20PermitState["SIGNED"] = 3] = "SIGNED";
})(UseERC20PermitState || (UseERC20PermitState = {}));

var EIP712_DOMAIN_TYPE = [{
  name: 'name',
  type: 'string'
}, {
  name: 'version',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
var EIP712_DOMAIN_TYPE_NO_VERSION = [{
  name: 'name',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
var EIP2612_TYPE = [{
  name: 'owner',
  type: 'address'
}, {
  name: 'spender',
  type: 'address'
}, {
  name: 'value',
  type: 'uint256'
}, {
  name: 'nonce',
  type: 'uint256'
}, {
  name: 'deadline',
  type: 'uint256'
}];
var PERMIT_ALLOWED_TYPE = [{
  name: 'holder',
  type: 'address'
}, {
  name: 'spender',
  type: 'address'
}, {
  name: 'nonce',
  type: 'uint256'
}, {
  name: 'expiry',
  type: 'uint256'
}, {
  name: 'allowed',
  type: 'bool'
}];
function useERC20Permit(currencyAmount, spender, transactionDeadline, overridePermitInfo) {
  var _currencyAmount$curre, _PERMITTABLE_TOKENS$c;

  var _useActiveWeb3React = useActiveWeb3React(),
      account = _useActiveWeb3React.account,
      chainId = _useActiveWeb3React.chainId,
      library = _useActiveWeb3React.library;

  var tokenAddress = currencyAmount !== null && currencyAmount !== void 0 && (_currencyAmount$curre = currencyAmount.currency) !== null && _currencyAmount$curre !== void 0 && _currencyAmount$curre.isToken ? currencyAmount.currency.address : undefined;
  var eip2612Contract = useEIP2612Contract(tokenAddress);
  var isArgentWallet = useIsArgentWallet();
  var nonceInputs = useMemo(function () {
    return [account !== null && account !== void 0 ? account : undefined];
  }, [account]);
  var tokenNonceState = useSingleCallResult(eip2612Contract, 'nonces', nonceInputs);
  var permitInfo = overridePermitInfo !== null && overridePermitInfo !== void 0 ? overridePermitInfo : chainId && tokenAddress ? (_PERMITTABLE_TOKENS$c = PERMITTABLE_TOKENS[chainId]) === null || _PERMITTABLE_TOKENS$c === void 0 ? void 0 : _PERMITTABLE_TOKENS$c[tokenAddress] : undefined;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      signatureData = _useState2[0],
      setSignatureData = _useState2[1];

  return useMemo(function () {
    var _tokenNonceState$resu, _tokenNonceState$resu2;

    if (isArgentWallet || !currencyAmount || !eip2612Contract || !account || !chainId || !transactionDeadline || !library || !tokenNonceState.valid || !tokenAddress || !spender || !permitInfo) {
      return {
        state: UseERC20PermitState.NOT_APPLICABLE,
        signatureData: null,
        gatherPermitSignature: null
      };
    }

    var nonceNumber = (_tokenNonceState$resu = tokenNonceState.result) === null || _tokenNonceState$resu === void 0 ? void 0 : (_tokenNonceState$resu2 = _tokenNonceState$resu[0]) === null || _tokenNonceState$resu2 === void 0 ? void 0 : _tokenNonceState$resu2.toNumber();

    if (tokenNonceState.loading || typeof nonceNumber !== 'number') {
      return {
        state: UseERC20PermitState.LOADING,
        signatureData: null,
        gatherPermitSignature: null
      };
    }

    var isSignatureDataValid = signatureData && signatureData.owner === account && signatureData.deadline >= transactionDeadline.toNumber() && signatureData.tokenAddress === tokenAddress && signatureData.nonce === nonceNumber && signatureData.spender === spender && ('allowed' in signatureData || JSBI.equal(JSBI.BigInt(signatureData.amount), currencyAmount.quotient));
    return {
      state: isSignatureDataValid ? UseERC20PermitState.SIGNED : UseERC20PermitState.NOT_SIGNED,
      signatureData: isSignatureDataValid ? signatureData : null,
      gatherPermitSignature: function () {
        var _gatherPermitSignature = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var allowed, signatureDeadline, value, message, domain, data;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  allowed = permitInfo.type === PermitType.ALLOWED;
                  signatureDeadline = transactionDeadline.toNumber() + PERMIT_VALIDITY_BUFFER;
                  value = currencyAmount.quotient.toString();
                  message = allowed ? {
                    holder: account,
                    spender: spender,
                    allowed: allowed,
                    nonce: nonceNumber,
                    expiry: signatureDeadline
                  } : {
                    owner: account,
                    spender: spender,
                    value: value,
                    nonce: nonceNumber,
                    deadline: signatureDeadline
                  };
                  domain = permitInfo.version ? {
                    name: permitInfo.name,
                    version: permitInfo.version,
                    verifyingContract: tokenAddress,
                    chainId: chainId
                  } : {
                    name: permitInfo.name,
                    verifyingContract: tokenAddress,
                    chainId: chainId
                  };
                  data = JSON.stringify({
                    types: {
                      EIP712Domain: permitInfo.version ? EIP712_DOMAIN_TYPE : EIP712_DOMAIN_TYPE_NO_VERSION,
                      Permit: allowed ? PERMIT_ALLOWED_TYPE : EIP2612_TYPE
                    },
                    domain: domain,
                    primaryType: 'Permit',
                    message: message
                  });
                  return _context.abrupt("return", library.send('eth_signTypedData_v4', [account, data]).then(splitSignature).then(function (signature) {
                    setSignatureData(_objectSpread$6(_objectSpread$6({
                      v: signature.v,
                      r: signature.r,
                      s: signature.s,
                      deadline: signatureDeadline
                    }, allowed ? {
                      allowed: allowed
                    } : {
                      amount: value
                    }), {}, {
                      nonce: nonceNumber,
                      chainId: chainId,
                      owner: account,
                      spender: spender,
                      tokenAddress: tokenAddress,
                      permitType: permitInfo.type
                    }));
                  }));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function gatherPermitSignature() {
          return _gatherPermitSignature.apply(this, arguments);
        }

        return gatherPermitSignature;
      }()
    };
  }, [currencyAmount, eip2612Contract, account, chainId, isArgentWallet, transactionDeadline, library, tokenNonceState.loading, tokenNonceState.valid, tokenNonceState.result, tokenAddress, spender, permitInfo, signatureData]);
}
function useERC20PermitFromTrade(trade, allowedSlippage, transactionDeadline) {
  var _useActiveWeb3React2 = useActiveWeb3React(),
      chainId = _useActiveWeb3React2.chainId;

  var swapRouterAddress = chainId ? // v2 router does not support
  trade instanceof Trade$2 ? undefined : trade instanceof Trade$3 ? V3_ROUTER_ADDRESS[chainId] : SWAP_ROUTER_ADDRESSES[chainId] : undefined;
  var amountToApprove = useMemo(function () {
    return trade ? trade.maximumAmountIn(allowedSlippage) : undefined;
  }, [trade, allowedSlippage]);
  return useERC20Permit(amountToApprove, swapRouterAddress, transactionDeadline, null);
}

function useTokenAllowance(token, owner, spender) {
  var contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
  var inputs = useMemo(function () {
    return [owner, spender];
  }, [owner, spender]);
  var allowance = useSingleCallResult(contract, 'allowance', inputs).result;
  return useMemo(function () {
    return token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined;
  }, [token, allowance]);
}

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
function calculateGasMargin(value) {
  return value.mul(120).div(100);
}

var ApprovalState;

(function (ApprovalState) {
  ApprovalState["UNKNOWN"] = "UNKNOWN";
  ApprovalState["NOT_APPROVED"] = "NOT_APPROVED";
  ApprovalState["PENDING"] = "PENDING";
  ApprovalState["APPROVED"] = "APPROVED";
})(ApprovalState || (ApprovalState = {}));

function useApprovalStateForSpender(amountToApprove, spender, useIsPendingApproval) {
  var _amountToApprove$curr;

  var _useActiveWeb3React = useActiveWeb3React(),
      account = _useActiveWeb3React.account;

  var token = amountToApprove !== null && amountToApprove !== void 0 && (_amountToApprove$curr = amountToApprove.currency) !== null && _amountToApprove$curr !== void 0 && _amountToApprove$curr.isToken ? amountToApprove.currency : undefined;
  var currentAllowance = useTokenAllowance(token, account !== null && account !== void 0 ? account : undefined, spender);
  var pendingApproval = useIsPendingApproval(token, spender);
  return useMemo(function () {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED; // we might not have enough data to know whether or not we need to approve

    if (!currentAllowance) return ApprovalState.UNKNOWN; // amountToApprove will be defined if currentAllowance is

    return currentAllowance.lessThan(amountToApprove) ? pendingApproval ? ApprovalState.PENDING : ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);
}
function useApproval(amountToApprove, spender, useIsPendingApproval) {
  var _amountToApprove$curr2;

  var _useActiveWeb3React2 = useActiveWeb3React(),
      chainId = _useActiveWeb3React2.chainId;

  var token = amountToApprove !== null && amountToApprove !== void 0 && (_amountToApprove$curr2 = amountToApprove.currency) !== null && _amountToApprove$curr2 !== void 0 && _amountToApprove$curr2.isToken ? amountToApprove.currency : undefined; // check the current approval status

  var approvalState = useApprovalStateForSpender(amountToApprove, spender, useIsPendingApproval);
  var tokenContract = useTokenContract(token === null || token === void 0 ? void 0 : token.address);
  var approve = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var logFailure, useExact, estimatedGas;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logFailure = function _logFailure(error) {
              console.warn("".concat((token === null || token === void 0 ? void 0 : token.symbol) || 'Token', " approval failed:"), error);
              return;
            };

            if (!(approvalState !== ApprovalState.NOT_APPROVED)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", logFailure('approve was called unnecessarily'));

          case 5:
            if (chainId) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", logFailure('no chainId'));

          case 9:
            if (token) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", logFailure('no token'));

          case 13:
            if (tokenContract) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", logFailure('tokenContract is null'));

          case 17:
            if (amountToApprove) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", logFailure('missing amount to approve'));

          case 21:
            if (spender) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", logFailure('no spender'));

          case 23:
            useExact = false;
            _context.next = 26;
            return tokenContract.estimateGas.approve(spender, MaxUint256).catch(function () {
              // general fallback for tokens which restrict approval amounts
              useExact = true;
              return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString());
            });

          case 26:
            estimatedGas = _context.sent;
            return _context.abrupt("return", tokenContract.approve(spender, useExact ? amountToApprove.quotient.toString() : MaxUint256, {
              gasLimit: calculateGasMargin(estimatedGas)
            }).then(function (response) {
              return {
                response: response,
                tokenAddress: token.address,
                spenderAddress: spender
              };
            }).catch(function (error) {
              logFailure(error);
              throw error;
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [approvalState, token, tokenContract, amountToApprove, spender, chainId]);
  return [approvalState, approve];
}

var SwapRouterVersion;
/**
 * Returns the swap router that will result in the least amount of txs (less gas) for a given swap.
 * Heuristic:
 * - if trade contains a single v2-only trade & V2 SwapRouter is approved: use V2 SwapRouter
 * - if trade contains only v3 & V3 SwapRouter is approved: use V3 SwapRouter
 * - else: approve and use V2+V3 SwapRouter
 */

(function (SwapRouterVersion) {
  SwapRouterVersion[SwapRouterVersion["V2"] = 0] = "V2";
  SwapRouterVersion[SwapRouterVersion["V3"] = 1] = "V3";
  SwapRouterVersion[SwapRouterVersion["V2V3"] = 2] = "V2V3";
})(SwapRouterVersion || (SwapRouterVersion = {}));

function getTxOptimizedSwapRouter(_ref) {
  var onlyV2Routes = _ref.onlyV2Routes,
      onlyV3Routes = _ref.onlyV3Routes,
      tradeHasSplits = _ref.tradeHasSplits,
      approvalStates = _ref.approvalStates;
  if ([approvalStates.v2, approvalStates.v3, approvalStates.v2V3].includes(ApprovalState.PENDING)) return undefined;
  if (approvalStates.v2V3 === ApprovalState.APPROVED) return SwapRouterVersion.V2V3;
  if (approvalStates.v2 === ApprovalState.APPROVED && onlyV2Routes && !tradeHasSplits) return SwapRouterVersion.V2;
  if (approvalStates.v3 === ApprovalState.APPROVED && onlyV3Routes) return SwapRouterVersion.V3;
  return SwapRouterVersion.V2V3;
}

/** Returns approval state for all known swap routers */

function useSwapApprovalStates(trade, allowedSlippage, useIsPendingApproval) {
  var _useActiveWeb3React = useActiveWeb3React(),
      chainId = _useActiveWeb3React.chainId;

  var amountToApprove = useMemo(function () {
    return trade && trade.inputAmount.currency.isToken ? trade.maximumAmountIn(allowedSlippage) : undefined;
  }, [trade, allowedSlippage]);
  var v2RouterAddress = chainId ? V2_ROUTER_ADDRESS[chainId] : undefined;
  var v3RouterAddress = chainId ? V3_ROUTER_ADDRESS[chainId] : undefined;
  var swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined;
  var v2 = useApprovalStateForSpender(amountToApprove, v2RouterAddress, useIsPendingApproval);
  var v3 = useApprovalStateForSpender(amountToApprove, v3RouterAddress, useIsPendingApproval);
  var v2V3 = useApprovalStateForSpender(amountToApprove, swapRouterAddress, useIsPendingApproval);
  return useMemo(function () {
    return {
      v2: v2,
      v3: v3,
      v2V3: v2V3
    };
  }, [v2, v2V3, v3]);
}

function useSwapRouterAddress(trade) {
  var _useActiveWeb3React2 = useActiveWeb3React(),
      chainId = _useActiveWeb3React2.chainId;

  return useMemo(function () {
    return chainId ? trade instanceof Trade$2 ? V2_ROUTER_ADDRESS[chainId] : trade instanceof Trade$3 ? V3_ROUTER_ADDRESS[chainId] : SWAP_ROUTER_ADDRESSES[chainId] : undefined;
  }, [chainId, trade]);
} // wraps useApproveCallback in the context of a swap

function useSwapApproval(trade, allowedSlippage, useIsPendingApproval, amount) {
  var amountToApprove = useMemo(function () {
    return amount || (trade && trade.inputAmount.currency.isToken ? trade.maximumAmountIn(allowedSlippage) : undefined);
  }, [amount, trade, allowedSlippage]);
  var spender = useSwapRouterAddress(trade);
  var approval = useApproval(amountToApprove, spender, useIsPendingApproval);

  if (trade instanceof Trade$2 || trade instanceof Trade$3) {
    var approvalState = approval[0];
    invariant(approvalState === ApprovalState.APPROVED, 'Trying to approve legacy router');
  }

  return approval;
}
function useSwapApprovalOptimizedTrade(trade, allowedSlippage, useIsPendingApproval) {
  var _trade$routes$length;

  var onlyV2Routes = trade === null || trade === void 0 ? void 0 : trade.routes.every(function (route) {
    return route.protocol === Protocol.V2;
  });
  var onlyV3Routes = trade === null || trade === void 0 ? void 0 : trade.routes.every(function (route) {
    return route.protocol === Protocol.V3;
  });
  var tradeHasSplits = ((_trade$routes$length = trade === null || trade === void 0 ? void 0 : trade.routes.length) !== null && _trade$routes$length !== void 0 ? _trade$routes$length : 0) > 1;
  var approvalStates = useSwapApprovalStates(trade, allowedSlippage, useIsPendingApproval);
  var optimizedSwapRouter = useMemo(function () {
    return getTxOptimizedSwapRouter({
      onlyV2Routes: onlyV2Routes,
      onlyV3Routes: onlyV3Routes,
      tradeHasSplits: tradeHasSplits,
      approvalStates: approvalStates
    });
  }, [approvalStates, tradeHasSplits, onlyV2Routes, onlyV3Routes]);
  return useMemo(function () {
    if (!trade) return undefined;

    try {
      switch (optimizedSwapRouter) {
        case SwapRouterVersion.V2V3:
          return trade;

        case SwapRouterVersion.V2:
          var pairs = trade.swaps[0].route.pools.filter(function (pool) {
            return pool instanceof Pair;
          });
          var v2Route = new Route$1(pairs, trade.inputAmount.currency, trade.outputAmount.currency);
          return new Trade$2(v2Route, trade.inputAmount, trade.tradeType);

        case SwapRouterVersion.V3:
          return Trade$3.createUncheckedTradeWithMultipleRoutes({
            routes: trade.swaps.map(function (_ref) {
              var route = _ref.route,
                  inputAmount = _ref.inputAmount,
                  outputAmount = _ref.outputAmount;
              return {
                route: new Route(route.pools.filter(function (p) {
                  return p instanceof Pool$1;
                }), inputAmount.currency, outputAmount.currency),
                inputAmount: inputAmount,
                outputAmount: outputAmount
              };
            }),
            tradeType: trade.tradeType
          });

        default:
          return undefined;
      }
    } catch (e) {
      // TODO(#2989): remove try-catch
      console.debug(e);
      return undefined;
    }
  }, [trade, optimizedSwapRouter]);
}
var ApproveOrPermitState;
/**
 * Returns all relevant statuses and callback functions for approvals.
 * Considers both standard approval and ERC20 permit.
 */

(function (ApproveOrPermitState) {
  ApproveOrPermitState[ApproveOrPermitState["REQUIRES_APPROVAL"] = 0] = "REQUIRES_APPROVAL";
  ApproveOrPermitState[ApproveOrPermitState["PENDING_APPROVAL"] = 1] = "PENDING_APPROVAL";
  ApproveOrPermitState[ApproveOrPermitState["REQUIRES_SIGNATURE"] = 2] = "REQUIRES_SIGNATURE";
  ApproveOrPermitState[ApproveOrPermitState["PENDING_SIGNATURE"] = 3] = "PENDING_SIGNATURE";
  ApproveOrPermitState[ApproveOrPermitState["APPROVED"] = 4] = "APPROVED";
})(ApproveOrPermitState || (ApproveOrPermitState = {}));

var useApproveOrPermit = function useApproveOrPermit(trade, allowedSlippage, useIsPendingApproval, amount) {
  var deadline = useTransactionDeadline(); // Check approvals on ERC20 contract based on amount.

  var _useSwapApproval = useSwapApproval(trade, allowedSlippage, useIsPendingApproval, amount),
      _useSwapApproval2 = _slicedToArray(_useSwapApproval, 2),
      approval = _useSwapApproval2[0],
      getApproval = _useSwapApproval2[1]; // Check status of permit and whether token supports it.


  var _useERC20PermitFromTr = useERC20PermitFromTrade(trade, allowedSlippage, deadline),
      signatureState = _useERC20PermitFromTr.state,
      signatureData = _useERC20PermitFromTr.signatureData,
      gatherPermitSignature = _useERC20PermitFromTr.gatherPermitSignature;

  var notApproved = approval === ApprovalState.NOT_APPROVED && !(signatureState === UseERC20PermitState.SIGNED); // If permit is supported, trigger a signature, if not create approval transaction.

  var handleApproveOrPermit = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature)) {
              _context.next = 13;
              break;
            }

            _context.prev = 1;
            _context.next = 4;
            return gatherPermitSignature();

          case 4:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);

            if (!((_context.t0 === null || _context.t0 === void 0 ? void 0 : _context.t0.code) !== 4001)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", getApproval());

          case 11:
            _context.next = 14;
            break;

          case 13:
            return _context.abrupt("return", getApproval());

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  })), [signatureState, gatherPermitSignature, getApproval]);
  var approvalState = useMemo(function () {
    if (approval === ApprovalState.PENDING) {
      return ApproveOrPermitState.PENDING_APPROVAL;
    }

    if (signatureState === UseERC20PermitState.LOADING) {
      return ApproveOrPermitState.PENDING_SIGNATURE;
    }

    if (notApproved && Boolean(gatherPermitSignature)) {
      return ApproveOrPermitState.REQUIRES_SIGNATURE;
    }

    if (notApproved) {
      return ApproveOrPermitState.REQUIRES_APPROVAL;
    }

    return ApproveOrPermitState.APPROVED;
  }, [approval, gatherPermitSignature, notApproved, signatureState]);
  return {
    approvalState: approvalState,
    signatureData: signatureData,
    handleApproveOrPermit: handleApproveOrPermit
  };
};

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */

function useENSName(address) {
  var _resolverAddress$resu, _nameCallRes$result;

  var debouncedAddress = useDebounce(address, 200);
  var ensNodeArgument = useMemo(function () {
    if (!debouncedAddress || !isAddress(debouncedAddress)) return [undefined];
    return [namehash("".concat(debouncedAddress.toLowerCase().substr(2), ".addr.reverse"))];
  }, [debouncedAddress]);
  var registrarContract = useENSRegistrarContract(false);
  var resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
  var resolverAddressResult = (_resolverAddress$resu = resolverAddress.result) === null || _resolverAddress$resu === void 0 ? void 0 : _resolverAddress$resu[0];
  var resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
  var nameCallRes = useSingleCallResult(resolverContract, 'name', ensNodeArgument);
  var name = (_nameCallRes$result = nameCallRes.result) === null || _nameCallRes$result === void 0 ? void 0 : _nameCallRes$result[0];
  /* ENS does not enforce that an address owns a .eth domain before setting it as a reverse proxy 
     and recommends that you perform a match on the forward resolution
     see: https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
  */

  var fwdAddr = useENSAddress(name);
  var checkedName = address === (fwdAddr === null || fwdAddr === void 0 ? void 0 : fwdAddr.address) ? name : null;
  var changed = debouncedAddress !== address;
  return useMemo(function () {
    return {
      ENSName: changed ? null : checkedName,
      loading: changed || resolverAddress.loading || nameCallRes.loading
    };
  }, [changed, nameCallRes.loading, checkedName, resolverAddress.loading]);
}

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */

function useENS(nameOrAddress) {
  var validated = isAddress(nameOrAddress);
  var reverseLookup = useENSName(validated ? validated : undefined);
  var lookup = useENSAddress(nameOrAddress);
  return useMemo(function () {
    return {
      loading: reverseLookup.loading || lookup.loading,
      address: validated ? validated : lookup.address,
      name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null
    };
  }, [lookup.address, lookup.loading, nameOrAddress, reverseLookup.ENSName, reverseLookup.loading, validated]);
}

var ERC20_INTERFACE = new Interface([{
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}]);
function approveAmountCalldata(amount, spender) {
  if (!amount.currency.isToken) throw new Error('Must call with an amount of token');
  var approveData = ERC20_INTERFACE.encodeFunctionData('approve', [spender, toHex(amount.quotient)]);
  return {
    to: amount.currency.address,
    data: approveData,
    value: '0x0'
  };
}

var ArgentWalletContractABI = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "value",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "data",
						type: "bytes"
					}
				],
				name: "_transactions",
				type: "tuple[]"
			}
		],
		name: "wc_multiCall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "",
				type: "bytes[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_msgHash",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "_signature",
				type: "bytes"
			}
		],
		name: "isValidSignature",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

function useArgentWalletContract() {
  var _useActiveWeb3React = useActiveWeb3React(),
      account = _useActiveWeb3React.account;

  var isArgentWallet = useIsArgentWallet();
  return useContract(isArgentWallet ? account !== null && account !== void 0 ? account : undefined : undefined, ArgentWalletContractABI, true);
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
function useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName, signatureData, deadline, feeOptions) {
  var _useActiveWeb3React = useActiveWeb3React(),
      account = _useActiveWeb3React.account,
      chainId = _useActiveWeb3React.chainId,
      library = _useActiveWeb3React.library;

  var _useENS = useENS(recipientAddressOrName),
      recipientAddress = _useENS.address;

  var recipient = recipientAddressOrName === null ? account : recipientAddress;
  var routerContract = useV2RouterContract();
  var argentWalletContract = useArgentWalletContract();
  return useMemo(function () {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return [];

    if (trade instanceof Trade$2) {
      if (!routerContract) return [];
      var swapMethods = [];
      swapMethods.push(Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage: allowedSlippage,
        recipient: recipient,
        deadline: deadline.toNumber()
      }));

      if (trade.tradeType === TradeType.EXACT_INPUT) {
        swapMethods.push(Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage: allowedSlippage,
          recipient: recipient,
          deadline: deadline.toNumber()
        }));
      }

      return swapMethods.map(function (_ref) {
        var methodName = _ref.methodName,
            args = _ref.args,
            value = _ref.value;

        if (argentWalletContract && trade.inputAmount.currency.isToken) {
          return {
            address: argentWalletContract.address,
            calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [[approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), routerContract.address), {
              to: routerContract.address,
              value: value,
              data: routerContract.interface.encodeFunctionData(methodName, args)
            }]]),
            value: '0x0'
          };
        } else {
          return {
            address: routerContract.address,
            calldata: routerContract.interface.encodeFunctionData(methodName, args),
            value: value
          };
        }
      });
    } else {
      // swap options shared by v3 and v2+v3 swap routers
      var sharedSwapOptions = _objectSpread$5({
        fee: feeOptions,
        recipient: recipient,
        slippageTolerance: allowedSlippage
      }, signatureData ? {
        inputTokenPermit: 'allowed' in signatureData ? {
          expiry: signatureData.deadline,
          nonce: signatureData.nonce,
          s: signatureData.s,
          r: signatureData.r,
          v: signatureData.v
        } : {
          deadline: signatureData.deadline,
          amount: signatureData.amount,
          s: signatureData.s,
          r: signatureData.r,
          v: signatureData.v
        }
      } : {});

      var swapRouterAddress = chainId ? trade instanceof Trade$3 ? V3_ROUTER_ADDRESS[chainId] : SWAP_ROUTER_ADDRESSES[chainId] : undefined;
      if (!swapRouterAddress) return [];

      var _ref2 = trade instanceof Trade$3 ? SwapRouter.swapCallParameters(trade, _objectSpread$5(_objectSpread$5({}, sharedSwapOptions), {}, {
        deadline: deadline.toString()
      })) : SwapRouter$1.swapCallParameters(trade, _objectSpread$5(_objectSpread$5({}, sharedSwapOptions), {}, {
        deadlineOrPreviousBlockhash: deadline.toString()
      })),
          value = _ref2.value,
          calldata = _ref2.calldata;

      if (argentWalletContract && trade.inputAmount.currency.isToken) {
        return [{
          address: argentWalletContract.address,
          calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [[approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), swapRouterAddress), {
            to: swapRouterAddress,
            value: value,
            data: calldata
          }]]),
          value: '0x0'
        }];
      }

      return [{
        address: swapRouterAddress,
        calldata: calldata,
        value: value
      }];
    }
  }, [account, allowedSlippage, argentWalletContract, chainId, deadline, feeOptions, library, recipient, routerContract, signatureData, trade]);
}

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
function swapErrorToUserReadableMessage(error) {
  var _reason, _reason2;

  var reason;

  while (Boolean(error)) {
    var _ref, _error$reason, _error$error, _error$data;

    reason = (_ref = (_error$reason = error.reason) !== null && _error$reason !== void 0 ? _error$reason : error.message) !== null && _ref !== void 0 ? _ref : reason;
    error = (_error$error = error.error) !== null && _error$error !== void 0 ? _error$error : (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.originalError;
  }

  if (((_reason = reason) === null || _reason === void 0 ? void 0 : _reason.indexOf('execution reverted: ')) === 0) reason = reason.substr('execution reverted: '.length);

  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return /*#__PURE__*/jsx(Trans, {
        id: "The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low."
      });

    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return /*#__PURE__*/jsx(Trans, {
        id: "This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance."
      });

    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return /*#__PURE__*/jsx(Trans, {
        id: "The input token cannot be transferred. There may be an issue with the input token."
      });

    case 'UniswapV2: TRANSFER_FAILED':
      return /*#__PURE__*/jsx(Trans, {
        id: "The output token cannot be transferred. There may be an issue with the output token."
      });

    case 'UniswapV2: K':
      return /*#__PURE__*/jsx(Trans, {
        id: "The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer."
      });

    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return /*#__PURE__*/jsx(Trans, {
        id: "This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
      });

    case 'TF':
      return /*#__PURE__*/jsx(Trans, {
        id: "The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
      });

    default:
      if (((_reason2 = reason) === null || _reason2 === void 0 ? void 0 : _reason2.indexOf('undefined is not an object')) !== -1) {
        console.error(error, reason);
        return /*#__PURE__*/jsx(Trans, {
          id: "An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
        });
      }

      return /*#__PURE__*/jsx(Trans, {
        id: "Unknown error{0}. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.",
        values: {
          0: reason ? ": \"".concat(reason, "\"") : ''
        }
      });
  }
}

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// returns a function that will execute a swap, if the parameters are all valid
function useSendSwapTransaction(account, chainId, library, trade, // trade to execute, required
swapCalls) {
  return useMemo(function () {
    if (!trade || !library || !account || !chainId) {
      return {
        callback: null
      };
    }

    return {
      callback: function () {
        var _onSwap = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var estimatedCalls, bestCallOption, errorCalls, firstNoErrorCall, _bestCallOption, _bestCallOption$call, address, calldata, value;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Promise.all(swapCalls.map(function (call) {
                    var address = call.address,
                        calldata = call.calldata,
                        value = call.value;
                    var tx = !value || isZero(value) ? {
                      from: account,
                      to: address,
                      data: calldata
                    } : {
                      from: account,
                      to: address,
                      data: calldata,
                      value: value
                    };
                    return library.estimateGas(tx).then(function (gasEstimate) {
                      return {
                        call: call,
                        gasEstimate: gasEstimate
                      };
                    }).catch(function (gasError) {
                      console.debug('Gas estimate failed, trying eth_call to extract error', call);
                      return library.call(tx).then(function (result) {
                        console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
                        return {
                          call: call,
                          error: /*#__PURE__*/jsx(Trans, {
                            id: "Unexpected issue with estimating the gas. Please try again."
                          })
                        };
                      }).catch(function (callError) {
                        console.debug('Call threw error', call, callError);
                        return {
                          call: call,
                          error: swapErrorToUserReadableMessage(callError)
                        };
                      });
                    });
                  }));

                case 2:
                  estimatedCalls = _context.sent;
                  // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
                  bestCallOption = estimatedCalls.find(function (el, ix, list) {
                    return 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]);
                  }); // check if any calls errored with a recognizable error

                  if (bestCallOption) {
                    _context.next = 12;
                    break;
                  }

                  errorCalls = estimatedCalls.filter(function (call) {
                    return 'error' in call;
                  });

                  if (!(errorCalls.length > 0)) {
                    _context.next = 8;
                    break;
                  }

                  throw errorCalls[errorCalls.length - 1].error;

                case 8:
                  firstNoErrorCall = estimatedCalls.find(function (call) {
                    return !('error' in call);
                  });

                  if (firstNoErrorCall) {
                    _context.next = 11;
                    break;
                  }

                  throw new Error(
                  /*i18n*/
                  i18n._("Unexpected error. Could not estimate gas for the swap."));

                case 11:
                  bestCallOption = firstNoErrorCall;

                case 12:
                  _bestCallOption = bestCallOption, _bestCallOption$call = _bestCallOption.call, address = _bestCallOption$call.address, calldata = _bestCallOption$call.calldata, value = _bestCallOption$call.value;
                  return _context.abrupt("return", library.getSigner().sendTransaction(_objectSpread$4(_objectSpread$4({
                    from: account,
                    to: address,
                    data: calldata
                  }, 'gasEstimate' in bestCallOption ? {
                    gasLimit: calculateGasMargin(bestCallOption.gasEstimate)
                  } : {}), value && !isZero(value) ? {
                    value: value
                  } : {})).then(function (response) {
                    return response;
                  }).catch(function (error) {
                    // if the user rejected the tx, pass this along
                    if ((error === null || error === void 0 ? void 0 : error.code) === 4001) {
                      throw new Error(
                      /*i18n*/
                      i18n._("Transaction rejected."));
                    } else {
                      // otherwise, the error was unexpected and we need to convey that
                      console.error("Swap failed", error, address, calldata, value);
                      throw new Error(
                      /*i18n*/
                      i18n._("Swap failed: {0}", {
                        0: swapErrorToUserReadableMessage(error)
                      }));
                    }
                  }));

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function onSwap() {
          return _onSwap.apply(this, arguments);
        }

        return onSwap;
      }()
    };
  }, [account, chainId, library, swapCalls, trade]);
}

var SwapCallbackState;

(function (SwapCallbackState) {
  SwapCallbackState[SwapCallbackState["INVALID"] = 0] = "INVALID";
  SwapCallbackState[SwapCallbackState["LOADING"] = 1] = "LOADING";
  SwapCallbackState[SwapCallbackState["VALID"] = 2] = "VALID";
})(SwapCallbackState || (SwapCallbackState = {}));

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
function useSwapCallback(_ref) {
  var trade = _ref.trade,
      allowedSlippage = _ref.allowedSlippage,
      recipientAddressOrName = _ref.recipientAddressOrName,
      signatureData = _ref.signatureData,
      deadline = _ref.deadline,
      feeOptions = _ref.feeOptions;

  var _useActiveWeb3React = useActiveWeb3React(),
      account = _useActiveWeb3React.account,
      chainId = _useActiveWeb3React.chainId,
      library = _useActiveWeb3React.library;

  var swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName, signatureData, deadline, feeOptions);

  var _useSendSwapTransacti = useSendSwapTransaction(account, chainId, library, trade, swapCalls),
      callback = _useSendSwapTransacti.callback;

  var _useENS = useENS(recipientAddressOrName),
      recipientAddress = _useENS.address;

  var recipient = recipientAddressOrName === null ? account : recipientAddress;
  return useMemo(function () {
    if (!trade || !library || !account || !chainId || !callback) {
      return {
        state: SwapCallbackState.INVALID,
        callback: null,
        error: /*#__PURE__*/jsx(Trans, {
          id: "Missing dependencies"
        })
      };
    }

    if (!recipient) {
      if (recipientAddressOrName !== null) {
        return {
          state: SwapCallbackState.INVALID,
          callback: null,
          error: /*#__PURE__*/jsx(Trans, {
            id: "Invalid recipient"
          })
        };
      } else {
        return {
          state: SwapCallbackState.LOADING,
          callback: null,
          error: null
        };
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: function () {
        var _onSwap = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", callback().then(function (response) {
                    return response;
                  }));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function onSwap() {
          return _onSwap.apply(this, arguments);
        }

        return onSwap;
      }(),
      error: null
    };
  }, [trade, library, account, chainId, callback, recipient, recipientAddressOrName]);
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function useIsPendingApproval(token, spender) {
  return Boolean(usePendingApproval(token, spender));
}

function SwapButton(_ref) {
  var disabled = _ref.disabled;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      account = _useActiveWeb3React.account,
      chainId = _useActiveWeb3React.chainId;

  var _useTheme = useTheme(),
      tokenColorExtraction = _useTheme.tokenColorExtraction;

  var _useSwapInfo = useSwapInfo(),
      allowedSlippage = _useSwapInfo.allowedSlippage,
      inputCurrency = _useSwapInfo.currencies[Field.INPUT],
      inputCurrencyBalance = _useSwapInfo.currencyBalances[Field.INPUT],
      feeOptions = _useSwapInfo.feeOptions,
      trade = _useSwapInfo.trade,
      _useSwapInfo$tradeCur = _useSwapInfo.tradeCurrencyAmounts,
      inputTradeCurrencyAmount = _useSwapInfo$tradeCur[Field.INPUT],
      outputTradeCurrencyAmount = _useSwapInfo$tradeCur[Field.OUTPUT];

  var tradeType = useSwapTradeType();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      activeTrade = _useState2[0],
      setActiveTrade = _useState2[1];

  useEffect(function () {
    setActiveTrade(function (activeTrade) {
      return activeTrade && trade.trade;
    });
  }, [trade]); // clear active trade on chain change

  useEffect(function () {
    setActiveTrade(undefined);
  }, [chainId]); // TODO(zzmp): Return an optimized trade directly from useSwapInfo.

  var optimizedTrade = // Use trade.trade if there is no swap optimized trade. This occurs if approvals are still pending.
  useSwapApprovalOptimizedTrade(trade.trade, allowedSlippage, useIsPendingApproval) || trade.trade;
  var approvalCurrencyAmount = useSwapCurrencyAmount(Field.INPUT);

  var _useApproveOrPermit = useApproveOrPermit(optimizedTrade, allowedSlippage, useIsPendingApproval, approvalCurrencyAmount),
      approvalState = _useApproveOrPermit.approvalState,
      signatureData = _useApproveOrPermit.signatureData,
      handleApproveOrPermit = _useApproveOrPermit.handleApproveOrPermit;

  var approvalHash = usePendingApproval(inputCurrency !== null && inputCurrency !== void 0 && inputCurrency.isToken ? inputCurrency : undefined, useSwapRouterAddress(optimizedTrade));
  var addTransaction = useAddTransaction();
  var onApprove = useCallback(function () {
    handleApproveOrPermit().then(function (transaction) {
      if (transaction) {
        addTransaction(_objectSpread$3({
          type: TransactionType.APPROVAL
        }, transaction));
      }
    });
  }, [addTransaction, handleApproveOrPermit]);

  var _useWrapCallback = useWrapCallback(),
      wrapType = _useWrapCallback.type,
      wrapCallback = _useWrapCallback.callback,
      wrapError = _useWrapCallback.error,
      wrapLoading = _useWrapCallback.loading;

  var disableSwap = useMemo(function () {
    return disabled || !chainId || wrapLoading || wrapType !== WrapType.NOT_APPLICABLE && wrapError || approvalState === ApproveOrPermitState.PENDING_SIGNATURE || !(inputTradeCurrencyAmount && inputCurrencyBalance) || inputCurrencyBalance.lessThan(inputTradeCurrencyAmount);
  }, [disabled, chainId, wrapLoading, wrapType, wrapError, approvalState, inputTradeCurrencyAmount, inputCurrencyBalance]);
  var actionProps = useMemo(function () {
    if (disableSwap) {
      return {
        disabled: true
      };
    }

    if (wrapType === WrapType.NOT_APPLICABLE && (approvalState === ApproveOrPermitState.REQUIRES_APPROVAL || approvalState === ApproveOrPermitState.REQUIRES_SIGNATURE)) {
      var currency = inputCurrency || (approvalCurrencyAmount === null || approvalCurrencyAmount === void 0 ? void 0 : approvalCurrencyAmount.currency);
      invariant(currency);
      return {
        action: {
          message: approvalState === ApproveOrPermitState.REQUIRES_SIGNATURE ? /*#__PURE__*/jsx(Trans, {
            id: "Allow {0} first",
            values: {
              0: currency.symbol
            }
          }) : /*#__PURE__*/jsx(Trans, {
            id: "Approve {0} first",
            values: {
              0: currency.symbol
            }
          }),
          onClick: onApprove,
          children: approvalState === ApproveOrPermitState.REQUIRES_SIGNATURE ? /*#__PURE__*/jsx(Trans, {
            id: "Allow"
          }) : /*#__PURE__*/jsx(Trans, {
            id: "Approve"
          })
        }
      };
    }

    if (approvalState === ApproveOrPermitState.PENDING_APPROVAL) {
      return {
        disabled: true,
        action: {
          message: /*#__PURE__*/jsx(EtherscanLink, {
            type: ExplorerDataType.TRANSACTION,
            data: approvalHash,
            children: /*#__PURE__*/jsx(Trans, {
              id: "Approval pending"
            })
          }),
          icon: Spinner,
          onClick: function onClick() {
            return void 0;
          },
          // @TODO: should not require an onclick
          children: /*#__PURE__*/jsx(Trans, {
            id: "Approve"
          })
        }
      };
    }

    return {};
  }, [approvalCurrencyAmount === null || approvalCurrencyAmount === void 0 ? void 0 : approvalCurrencyAmount.currency, approvalHash, approvalState, disableSwap, inputCurrency, onApprove, wrapType]);
  var deadline = useTransactionDeadline(); // the callback to execute the swap

  var _useSwapCallback = useSwapCallback({
    trade: optimizedTrade,
    allowedSlippage: allowedSlippage,
    recipientAddressOrName: account !== null && account !== void 0 ? account : null,
    signatureData: signatureData,
    deadline: deadline,
    feeOptions: feeOptions
  }),
      swapCallback = _useSwapCallback.callback; //@TODO(ianlapham): add a loading state, process errors


  var setDisplayTxHash = useUpdateAtom(displayTxHashAtom);
  var onConfirm = useCallback(function () {
    swapCallback === null || swapCallback === void 0 ? void 0 : swapCallback().then(function (response) {
      setDisplayTxHash(response.hash);
      invariant(inputTradeCurrencyAmount && outputTradeCurrencyAmount);
      addTransaction({
        response: response,
        type: TransactionType.SWAP,
        tradeType: tradeType,
        inputCurrencyAmount: inputTradeCurrencyAmount,
        outputCurrencyAmount: outputTradeCurrencyAmount
      });
    }).catch(function (error) {
      //@TODO(ianlapham): add error handling
      console.log(error);
    }).finally(function () {
      setActiveTrade(undefined);
    });
  }, [addTransaction, inputTradeCurrencyAmount, outputTradeCurrencyAmount, setDisplayTxHash, swapCallback, tradeType]);
  var ButtonText = useCallback(function () {
    if (wrapError !== WrapError.NO_ERROR) {
      return /*#__PURE__*/jsx(WrapErrorText, {
        wrapError: wrapError
      });
    }

    switch (wrapType) {
      case WrapType.UNWRAP:
        return /*#__PURE__*/jsx(Trans, {
          id: "Unwrap"
        });

      case WrapType.WRAP:
        return /*#__PURE__*/jsx(Trans, {
          id: "Wrap"
        });

      case WrapType.NOT_APPLICABLE:
      default:
        return /*#__PURE__*/jsx(Trans, {
          id: "Review swap"
        });
    }
  }, [wrapError, wrapType]);
  var handleDialogClose = useCallback(function () {
    setActiveTrade(undefined);
  }, []);
  var handleActionButtonClick = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _transaction$value$to, _transaction$value, transaction;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(wrapType === WrapType.NOT_APPLICABLE)) {
              _context.next = 4;
              break;
            }

            setActiveTrade(trade.trade);
            _context.next = 9;
            break;

          case 4:
            _context.next = 6;
            return wrapCallback();

          case 6:
            transaction = _context.sent;
            addTransaction({
              response: transaction,
              type: TransactionType.WRAP,
              unwrapped: wrapType === WrapType.UNWRAP,
              currencyAmountRaw: (_transaction$value$to = (_transaction$value = transaction.value) === null || _transaction$value === void 0 ? void 0 : _transaction$value.toString()) !== null && _transaction$value$to !== void 0 ? _transaction$value$to : '0',
              chainId: chainId
            });
            setDisplayTxHash(transaction.hash);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [addTransaction, chainId, setDisplayTxHash, trade.trade, wrapCallback, wrapType]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ActionButton, _objectSpread$3(_objectSpread$3({
      color: tokenColorExtraction ? 'interactive' : 'accent',
      onClick: handleActionButtonClick
    }, actionProps), {}, {
      children: /*#__PURE__*/jsx(ButtonText, {})
    })), activeTrade && /*#__PURE__*/jsx(Dialog, {
      color: "dialog",
      onClose: handleDialogClose,
      children: /*#__PURE__*/jsx(SummaryDialog, {
        trade: activeTrade,
        allowedSlippage: allowedSlippage,
        onConfirm: onConfirm
      })
    })]
  });
}

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var IntegrationError = /*#__PURE__*/function (_Error) {
  _inherits(IntegrationError, _Error);

  var _super = _createSuper$2(IntegrationError);

  function IntegrationError(message) {
    var _this;

    _classCallCheck(this, IntegrationError);

    _this = _super.call(this, message);
    _this.name = 'Integration Error';
    return _this;
  }

  return _createClass(IntegrationError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

function isAddressOrAddressMap(addressOrMap) {
  if (_typeof(addressOrMap) === 'object') {
    return Object.values(addressOrMap).every(function (address) {
      return isAddress(address);
    });
  }

  if (typeof addressOrMap === 'string') {
    return typeof isAddress(addressOrMap) === 'string';
  }

  return false;
}

function SwapPropValidator(props) {
  var convenienceFee = props.convenienceFee,
      convenienceFeeRecipient = props.convenienceFeeRecipient;
  useEffect(function () {
    if (convenienceFee) {
      if (convenienceFee > 100 || convenienceFee < 0) {
        throw new IntegrationError("convenienceFee must be between 0 and 100. (You set it to ".concat(convenienceFee, ")"));
      }

      if (!convenienceFeeRecipient) {
        throw new IntegrationError('convenienceFeeRecipient is required when convenienceFee is set.');
      }

      if (typeof convenienceFeeRecipient === 'string') {
        if (!isAddress(convenienceFeeRecipient)) {
          throw new IntegrationError("convenienceFeeRecipient must be a valid address. (You set it to ".concat(convenienceFeeRecipient, ".)"));
        }
      } else if (_typeof(convenienceFeeRecipient) === 'object') {
        Object.values(convenienceFeeRecipient).forEach(function (recipient) {
          if (!isAddress(recipient)) {
            var values = Object.values(convenienceFeeRecipient).join(', ');
            throw new IntegrationError("All values in convenienceFeeRecipient object must be valid addresses. (You used ".concat(values, ".)"));
          }
        });
      }
    }
  }, [convenienceFee, convenienceFeeRecipient]);
  var defaultInputTokenAddress = props.defaultInputTokenAddress,
      defaultInputAmount = props.defaultInputAmount,
      defaultOutputTokenAddress = props.defaultOutputTokenAddress,
      defaultOutputAmount = props.defaultOutputAmount;
  useEffect(function () {
    if (defaultOutputAmount && defaultInputAmount) {
      throw new IntegrationError('defaultInputAmount and defaultOutputAmount may not both be defined.');
    }

    if (defaultInputAmount && BigNumber.from(defaultInputAmount).lt(0)) {
      throw new IntegrationError("defaultInputAmount must be a positive number. (You set it to ".concat(defaultInputAmount, ")"));
    }

    if (defaultOutputAmount && BigNumber.from(defaultOutputAmount).lt(0)) {
      throw new IntegrationError("defaultOutputAmount must be a positive number. (You set it to ".concat(defaultOutputAmount, ")"));
    }

    if (defaultInputTokenAddress && !isAddressOrAddressMap(defaultInputTokenAddress) && defaultInputTokenAddress !== 'NATIVE') {
      throw new IntegrationError("defaultInputTokenAddress(es) must be a valid address or \"NATIVE\". (You set it to ".concat(defaultInputTokenAddress));
    }

    if (defaultOutputTokenAddress && !isAddressOrAddressMap(defaultOutputTokenAddress) && defaultOutputTokenAddress !== 'NATIVE') {
      throw new IntegrationError("defaultOutputTokenAddress(es) must be a valid address or \"NATIVE\". (You set it to ".concat(defaultOutputTokenAddress));
    }
  }, [defaultInputTokenAddress, defaultInputAmount, defaultOutputTokenAddress, defaultOutputAmount]);
  return /*#__PURE__*/jsx(Fragment, {
    children: props.children
  });
}

var _line;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgDotLine = function SvgDotLine(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: "100%",
    height: 35,
    viewBox: "800 0 300 200",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _line || (_line = /*#__PURE__*/React.createElement("line", {
    x1: 0,
    x2: 2000,
    y1: 100,
    y2: 100,
    stroke: "currentColor",
    strokeWidth: 20,
    strokeLinecap: "round",
    strokeDasharray: "1, 45"
  })));
};

var _templateObject$3;
var Badge = styled(Row)(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: ", ";\n  padding: ", ";\n"])), function (_ref) {
  var theme = _ref.theme,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'outline' : _ref$color;
  return theme[color];
}, function (_ref2) {
  var borderRadius = _ref2.borderRadius;
  return "".concat(borderRadius !== null && borderRadius !== void 0 ? borderRadius : 0.5, "em");
}, function (_ref3) {
  var padding = _ref3.padding;
  return padding !== null && padding !== void 0 ? padding : '0.25em 0.375em';
});

var V2_DEFAULT_FEE_TIER = 3000;
/**
 * Loops through all routes on a trade and returns an array of diagram entries.
 */

function getTokenPath(trade) {
  return trade.swaps.map(function (_ref) {
    var _ref$route = _ref.route,
        tokenPath = _ref$route.path,
        pools = _ref$route.pools,
        protocol = _ref$route.protocol,
        inputAmount = _ref.inputAmount,
        outputAmount = _ref.outputAmount;
    var portion = trade.tradeType === TradeType.EXACT_INPUT ? inputAmount.divide(trade.inputAmount) : outputAmount.divide(trade.outputAmount);
    var percent = new Percent$1(portion.numerator, portion.denominator);
    var path = [];

    for (var i = 0; i < pools.length; i++) {
      var nextPool = pools[i];
      var tokenIn = tokenPath[i];
      var tokenOut = tokenPath[i + 1];
      var entry = [tokenIn, tokenOut, nextPool instanceof Pair ? V2_DEFAULT_FEE_TIER : nextPool.fee];
      path.push(entry);
    }

    return {
      percent: percent,
      path: path,
      protocol: protocol
    };
  });
}

var _templateObject$2, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var Wrapper = styled(Column)(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n  padding: 0.25em;\n"])));
var RouteRow = styled(Row)(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n  grid-template-columns: 1em 1.15em 1fr 1em;\n  min-width: 430px;\n"])));
var RouteDetailsContainer = styled(Row)(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral(["\n  padding: 0.1em 0.5em;\n  position: relative;\n"])));
var DotsContainer = styled.div(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  opacity: 0.5;\n  position: absolute;\n  width: calc(100% - 1em);\n  z-index: ", ";\n"])), Layer.UNDERLAYER);
var DotsContainerShort = styled(DotsContainer)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  overflow: hidden;\n  position: relative;\n  width: 71px;\n"])));
var Dots = styled(SvgDotLine)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  path {\n    stroke: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.secondary;
});
var DetailsRow = styled(Row)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: grid;\n  grid-template-columns: 4.8125em 1fr;\n  width: 100%;\n"])));
var StyledAutoRouterLabel = styled(ButtonSmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  @supports (-webkit-background-clip: text) and (-webkit-text-fill-color: transparent) {\n    background-image: linear-gradient(90deg, #2172e5 0%, #54e521 163.16%);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n  }\n"])));

function Pool(_ref2) {
  var originCurrency = _ref2.originCurrency,
      targetCurrency = _ref2.targetCurrency,
      feeAmount = _ref2.feeAmount;
  return /*#__PURE__*/jsx(Badge, {
    padding: "0 4px",
    color: "dialog",
    children: /*#__PURE__*/jsxs(Badge, {
      gap: 0.375,
      children: [/*#__PURE__*/jsxs(Row, {
        children: [/*#__PURE__*/jsx(TokenImg$1, {
          token: originCurrency
        }), /*#__PURE__*/jsx(TokenImg$1, {
          token: targetCurrency
        })]
      }), /*#__PURE__*/jsxs(Subhead2, {
        children: [feeAmount / 10000, "%"]
      })]
    })
  });
}

function RoutingDiagram(_ref3) {
  var trade = _ref3.trade;
  var routes = useMemo(function () {
    return getTokenPath(trade);
  }, [trade]);
  return /*#__PURE__*/jsxs(Wrapper, {
    gap: 0.75,
    children: [/*#__PURE__*/jsxs(Row, {
      justify: "space-between",
      children: [/*#__PURE__*/jsxs(Row, {
        gap: 0.25,
        children: [/*#__PURE__*/jsx(AutoRouter, {}), /*#__PURE__*/jsx(StyledAutoRouterLabel, {
          color: "primary",
          lineHeight: '16px',
          children: /*#__PURE__*/jsx(Trans, {
            id: "Auto Router"
          })
        })]
      }), /*#__PURE__*/jsx(ButtonSmall, {
        children: /*#__PURE__*/jsx(Trans, {
          id: "{0, plural, =1 {Best route via 1 hop} other {Best route via # hops}}",
          values: {
            0: routes.length
          }
        })
      })]
    }), /*#__PURE__*/jsx(Rule, {}), routes.map(function (route, index) {
      return /*#__PURE__*/jsxs(RouteRow, {
        align: "center",
        children: [/*#__PURE__*/jsx(TokenImg$1, {
          token: trade.inputAmount.currency
        }), /*#__PURE__*/jsx(DotsContainerShort, {
          children: /*#__PURE__*/jsx(Dots, {})
        }), /*#__PURE__*/jsxs(RouteDetailsContainer, {
          justify: "flex-start",
          flex: true,
          children: [/*#__PURE__*/jsx(DotsContainer, {
            children: /*#__PURE__*/jsx(Dots, {})
          }), /*#__PURE__*/jsxs(DetailsRow, {
            children: [/*#__PURE__*/jsx(Badge, {
              padding: "0 4px",
              color: "dialog",
              children: /*#__PURE__*/jsxs(Badge, {
                gap: 0.375,
                children: [/*#__PURE__*/jsxs(ButtonSmall, {
                  color: "secondary",
                  children: [route.percent.toSignificant(2), "%"]
                }), /*#__PURE__*/jsx(Badge, {
                  padding: "0.125em",
                  borderRadius: 0.25,
                  color: "module",
                  children: /*#__PURE__*/jsx(Badge$1, {
                    color: "secondary",
                    fontSize: '0.5rem',
                    children: route.protocol.toUpperCase()
                  })
                })]
              })
            }), /*#__PURE__*/jsx(Row, {
              justify: "space-evenly",
              flex: true,
              style: {
                width: '100%'
              },
              children: route.path.map(function (_ref4, index) {
                var _ref5 = _slicedToArray(_ref4, 3),
                    originCurrency = _ref5[0],
                    targetCurrency = _ref5[1],
                    feeAmount = _ref5[2];

                return /*#__PURE__*/jsx(Pool, {
                  originCurrency: originCurrency,
                  targetCurrency: targetCurrency,
                  feeAmount: feeAmount
                }, index);
              })
            })]
          })]
        }), /*#__PURE__*/jsx(TokenImg$1, {
          token: trade.outputAmount.currency
        })]
      }, index);
    })]
  });
}

function Caption(_ref) {
  var _ref$icon = _ref.icon,
      Icon = _ref$icon === void 0 ? AlertTriangle : _ref$icon,
      caption = _ref.caption;
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Icon, {
      color: "secondary"
    }), caption]
  });
}

function ConnectWallet() {
  return /*#__PURE__*/jsx(Caption, {
    caption: /*#__PURE__*/jsx(Trans, {
      id: "Connect wallet to swap"
    })
  });
}
function UnsupportedNetwork() {
  return /*#__PURE__*/jsx(Caption, {
    caption: /*#__PURE__*/jsx(Trans, {
      id: "Unsupported network - switch to another to trade."
    })
  });
}
function InsufficientBalance(_ref2) {
  var currency = _ref2.currency;
  return /*#__PURE__*/jsx(Caption, {
    caption: /*#__PURE__*/jsx(Trans, {
      id: "Insufficient {0} balance",
      values: {
        0: currency === null || currency === void 0 ? void 0 : currency.symbol
      }
    })
  });
}
function InsufficientLiquidity() {
  return /*#__PURE__*/jsx(Caption, {
    caption: /*#__PURE__*/jsx(Trans, {
      id: "Insufficient liquidity in the pool for your trade"
    })
  });
}
function Empty() {
  return /*#__PURE__*/jsx(Caption, {
    icon: Info,
    caption: /*#__PURE__*/jsx(Trans, {
      id: "Enter an amount"
    })
  });
}
function LoadingTrade() {
  return /*#__PURE__*/jsx(Caption, {
    icon: InlineSpinner,
    caption: /*#__PURE__*/jsx(Trans, {
      id: "Fetching best price\u2026"
    })
  });
}
function WrapCurrency(_ref3) {
  var loading = _ref3.loading,
      wrapType = _ref3.wrapType;
  var WrapText = useCallback(function () {
    if (wrapType === WrapType.WRAP) {
      return loading ? /*#__PURE__*/jsx(Trans, {
        id: "Wrapping native currency."
      }) : /*#__PURE__*/jsx(Trans, {
        id: "Wrap native currency."
      });
    }

    return loading ? /*#__PURE__*/jsx(Trans, {
      id: "Unwrapping native currency."
    }) : /*#__PURE__*/jsx(Trans, {
      id: "Unwrap native currency."
    });
  }, [loading, wrapType]);
  return /*#__PURE__*/jsx(Caption, {
    icon: Info,
    caption: /*#__PURE__*/jsx(WrapText, {})
  });
}
function Trade(_ref4) {
  var trade = _ref4.trade;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      flip = _useState2[0],
      setFlip = _useState2[1];

  var inputAmount = trade.inputAmount,
      outputAmount = trade.outputAmount,
      executionPrice = trade.executionPrice;
  var fiatValueInput = useUSDCPrice(inputAmount.currency);
  var fiatValueOutput = useUSDCPrice(outputAmount.currency);
  var ratio = useMemo(function () {
    var _ref7;

    var _ref5 = flip ? [outputAmount, inputAmount] : [inputAmount, outputAmount],
        _ref6 = _slicedToArray(_ref5, 2),
        a = _ref6[0],
        b = _ref6[1];

    var priceString = (_ref7 = !flip ? executionPrice : executionPrice === null || executionPrice === void 0 ? void 0 : executionPrice.invert()) === null || _ref7 === void 0 ? void 0 : _ref7.toSignificant(6);
    var ratio = "1 ".concat(a.currency.symbol, " = ").concat(priceString, " ").concat(b.currency.symbol);
    var usdc = !flip ? fiatValueInput ? " ($".concat(fiatValueInput.toSignificant(6), ")") : null : fiatValueOutput ? " ($".concat(fiatValueOutput.toSignificant(6), ")") : null;
    return /*#__PURE__*/jsx(Caption$1, {
      userSelect: true,
      children: /*#__PURE__*/jsxs(Row, {
        gap: 0.25,
        children: [ratio, usdc && /*#__PURE__*/jsx(Caption$1, {
          color: "secondary",
          children: usdc
        })]
      })
    });
  }, [executionPrice, fiatValueInput, fiatValueOutput, flip, inputAmount, outputAmount]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Tooltip, {
      placement: "bottom",
      icon: Info,
      children: /*#__PURE__*/jsx(RoutingDiagram, {
        trade: trade
      })
    }), /*#__PURE__*/jsx(TextButton, {
      color: "primary",
      onClick: function onClick() {
        return setFlip(!flip);
      },
      children: ratio
    })]
  });
}

var _templateObject$1;
var ToolbarRow = styled(Row)(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n  padding: 0.5em 0;\n  ", "\n"])), largeIconCss);
function Toolbar(_ref) {
  var disabled = _ref.disabled;

  var _useActiveWeb3React = useActiveWeb3React$1(),
      chainId = _useActiveWeb3React.chainId;

  var _useSwapInfo = useSwapInfo(),
      _useSwapInfo$trade = _useSwapInfo.trade,
      trade = _useSwapInfo$trade.trade,
      state = _useSwapInfo$trade.state,
      _useSwapInfo$currenci = _useSwapInfo.currencies,
      inputCurrency = _useSwapInfo$currenci[Field.INPUT],
      outputCurrency = _useSwapInfo$currenci[Field.OUTPUT],
      balance = _useSwapInfo.currencyBalances[Field.INPUT];

  var isRouteLoading = state === TradeState.SYNCING || state === TradeState.LOADING;
  var isAmountPopulated = useIsAmountPopulated();

  var _useWrapCallback = useWrapCallback(),
      wrapType = _useWrapCallback.type,
      wrapLoading = _useWrapCallback.loading;

  var caption = useMemo(function () {
    if (disabled) {
      return /*#__PURE__*/jsx(ConnectWallet, {});
    }

    if (chainId && !ALL_SUPPORTED_CHAIN_IDS.includes(chainId)) {
      return /*#__PURE__*/jsx(UnsupportedNetwork, {});
    }

    if (inputCurrency && outputCurrency && isAmountPopulated) {
      if (wrapType !== WrapType.NOT_APPLICABLE) {
        return /*#__PURE__*/jsx(WrapCurrency, {
          wrapType: wrapType,
          loading: wrapLoading
        });
      }

      if (isRouteLoading) {
        return /*#__PURE__*/jsx(LoadingTrade, {});
      }

      if (!(trade !== null && trade !== void 0 && trade.swaps)) {
        return /*#__PURE__*/jsx(InsufficientLiquidity, {});
      }

      if (balance && trade !== null && trade !== void 0 && trade.inputAmount.greaterThan(balance)) {
        return /*#__PURE__*/jsx(InsufficientBalance, {
          currency: trade.inputAmount.currency
        });
      }

      if (trade.inputAmount && trade.outputAmount) {
        return /*#__PURE__*/jsx(Trade, {
          trade: trade
        });
      }
    }

    return /*#__PURE__*/jsx(Empty, {});
  }, [balance, chainId, disabled, inputCurrency, isAmountPopulated, isRouteLoading, outputCurrency, trade, wrapLoading, wrapType]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(Rule, {}), /*#__PURE__*/jsx(Caption$1, {
      children: /*#__PURE__*/jsx(ToolbarRow, {
        justify: "flex-start",
        gap: 0.5,
        iconSize: 4 / 3,
        children: caption
      })
    })]
  });
}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function getTransactionFromMap(txs, hash) {
  if (hash) {
    var _tx$info, _tx$info2;

    var tx = txs[hash];

    if ((tx === null || tx === void 0 ? void 0 : (_tx$info = tx.info) === null || _tx$info === void 0 ? void 0 : _tx$info.type) === TransactionType.SWAP) {
      return tx;
    }

    if ((tx === null || tx === void 0 ? void 0 : (_tx$info2 = tx.info) === null || _tx$info2 === void 0 ? void 0 : _tx$info2.type) === TransactionType.WRAP) {
      return tx;
    }
  }

  return;
}

function Swap(props) {
  useSyncTokenList(props.tokenList);
  useSyncTokenDefaults(props);
  useSyncConvenienceFee(props);

  var _useActiveWeb3React = useActiveWeb3React$1(),
      active = _useActiveWeb3React.active,
      account = _useActiveWeb3React.account;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      wrapper = _useState2[0],
      setWrapper = _useState2[1];

  var _useAtom = useAtom(displayTxHashAtom),
      _useAtom2 = _slicedToArray(_useAtom, 2),
      displayTxHash = _useAtom2[0],
      setDisplayTxHash = _useAtom2[1];

  var pendingTxs = usePendingTransactions();
  var displayTx = getTransactionFromMap(pendingTxs, displayTxHash);
  var tokenList = useTokenList();
  var onSupportedNetwork = useOnSupportedNetwork();
  var isSwapSupported = useMemo(function () {
    return Boolean(active && onSupportedNetwork && (tokenList === null || tokenList === void 0 ? void 0 : tokenList.length));
  }, [active, onSupportedNetwork, tokenList === null || tokenList === void 0 ? void 0 : tokenList.length]);
  var focused = useHasFocus(wrapper);
  var isInteractive = Boolean(active && onSupportedNetwork);
  return /*#__PURE__*/jsxs(SwapPropValidator, _objectSpread$2(_objectSpread$2({}, props), {}, {
    children: [isSwapSupported && /*#__PURE__*/jsx(SwapInfoUpdater, {}), /*#__PURE__*/jsxs(Header$1, {
      title: /*#__PURE__*/jsx(Trans, {
        id: "Swap"
      }),
      children: [active && /*#__PURE__*/jsx(Wallet, {
        disabled: !account,
        onClick: props.onConnectWallet
      }), /*#__PURE__*/jsx(Settings, {
        disabled: !isInteractive
      })]
    }), /*#__PURE__*/jsx("div", {
      ref: setWrapper,
      children: /*#__PURE__*/jsxs(BoundaryProvider, {
        value: wrapper,
        children: [/*#__PURE__*/jsx(Input$1, {
          disabled: !isInteractive,
          focused: focused
        }), /*#__PURE__*/jsx(ReverseButton, {
          disabled: !isInteractive
        }), /*#__PURE__*/jsxs(Output, {
          disabled: !isInteractive,
          focused: focused,
          children: [/*#__PURE__*/jsx(Toolbar, {
            disabled: !active
          }), /*#__PURE__*/jsx(SwapButton, {
            disabled: !isSwapSupported
          })]
        })]
      })
    }), displayTx && /*#__PURE__*/jsx(Dialog, {
      color: "dialog",
      children: /*#__PURE__*/jsx(TransactionStatusDialog, {
        tx: displayTx,
        onClose: function onClose() {
          return setDisplayTxHash();
        }
      })
    })]
  }));
}

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var voidSigner = new VoidSigner(ZERO_ADDRESS);

var Eip1193Bridge = /*#__PURE__*/function (_ExperimentalEip1193B) {
  _inherits(Eip1193Bridge, _ExperimentalEip1193B);

  var _super = _createSuper$1(Eip1193Bridge);

  function Eip1193Bridge() {
    _classCallCheck(this, Eip1193Bridge);

    return _super.apply(this, arguments);
  }

  _createClass(Eip1193Bridge, [{
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(method, params) {
        var result, req, tx;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = method;
                _context.next = _context.t0 === 'eth_chainId' ? 3 : _context.t0 === 'eth_sendTransaction' ? 7 : 14;
                break;

              case 3:
                _context.next = 5;
                return this.provider.getNetwork();

              case 5:
                result = _context.sent;
                return _context.abrupt("return", '0x' + result.chainId.toString(16));

              case 7:
                if (this.signer) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("break", 15);

              case 9:
                // TODO(zzmp): JsonRpcProvider filters from/gas fields from the params.
                req = JsonRpcProvider.hexlifyTransaction(params === null || params === void 0 ? void 0 : params[0], {
                  from: true,
                  gas: true
                });
                _context.next = 12;
                return this.signer.sendTransaction(req);

              case 12:
                tx = _context.sent;
                return _context.abrupt("return", tx.hash);

              case 14:
                return _context.abrupt("return", _get(_getPrototypeOf(Eip1193Bridge.prototype), "send", this).call(this, method, params));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);

  return Eip1193Bridge;
}(Eip1193Bridge$1);

function useEip1193Provider(provider) {
  return useMemo(function () {
    if (provider) {
      if (Provider$2.isProvider(provider)) {
        var _ref;

        var signer = 'getSigner' in provider ? provider.getSigner() : (_ref = null) !== null && _ref !== void 0 ? _ref : voidSigner;
        return new Eip1193Bridge(signer, provider);
      } else if (Provider$2.isProvider(provider.provider)) {
        /*
         * Direct users to use our own wrapper to avoid any pitfalls:
         * - Eip1193Bridge is experimental
         * - signer is not straightforward
         * - bugs out if chainId>8
         */
        throw new Error('Eip1193Bridge is experimental: pass your ethers Provider directly');
      }
    }

    return provider;
  }, [provider]);
}

var _plurals = {
  'af-ZA': af,
  'ar-SA': ar,
  'ca-ES': ca,
  'cs-CZ': cs,
  'da-DK': da,
  'de-DE': de,
  'el-GR': el,
  'en-US': en,
  'es-ES': es,
  'fi-FI': fi,
  'fr-FR': fr,
  'he-IL': he,
  'hu-HU': hu,
  'id-ID': id,
  'it-IT': it,
  'ja-JP': ja,
  'ko-KR': ko,
  'nl-NL': nl,
  'no-NO': no,
  'pl-PL': pl,
  'pt-BR': pt,
  'pt-PT': pt,
  'ro-RO': ro,
  'ru-RU': ru,
  'sr-SP': sr,
  'sv-SE': sv,
  'sw-TZ': sw,
  'tr-TR': tr,
  'uk-UA': uk,
  'vi-VN': vi,
  'zh-CN': zh,
  'zh-TW': zh,
  pseudo: en
};
function dynamicActivate(_x) {
  return _dynamicActivate.apply(this, arguments);
}

function _dynamicActivate() {
  _dynamicActivate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(locale) {
    var catalog;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i18n.loadLocaleData(locale, {
              plurals: function plurals() {
                return _plurals[locale];
              }
            }); // There are no default messages in production; instead, bundle the default to save a network request:
            // see https://github.com/lingui/js-lingui/issues/388#issuecomment-497779030

            if (!(locale === DEFAULT_LOCALE)) {
              _context.next = 5;
              break;
            }

            _context.t0 = DEFAULT_CATALOG;
            _context.next = 8;
            break;

          case 5:
            _context.next = 7;
            return import("./locales".concat("/", locale));

          case 7:
            _context.t0 = _context.sent;

          case 8:
            catalog = _context.t0;
            // Bundlers will either export it as default or as a named export named default.
            i18n.load(locale, catalog.messages || catalog.default.messages);
            i18n.activate(locale);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _dynamicActivate.apply(this, arguments);
}

function Provider(_ref) {
  var locale = _ref.locale,
      _ref$forceRenderAfter = _ref.forceRenderAfterLocaleChange,
      forceRenderAfterLocaleChange = _ref$forceRenderAfter === void 0 ? true : _ref$forceRenderAfter,
      onActivate = _ref.onActivate,
      children = _ref.children;
  useEffect(function () {
    dynamicActivate(locale).then(function () {
      return onActivate === null || onActivate === void 0 ? void 0 : onActivate(locale);
    }).catch(function (error) {
      console.error('Failed to activate locale', locale, error);
    });
  }, [locale, onActivate]);
  return /*#__PURE__*/jsx(I18nProvider, {
    forceRenderOnLocaleChange: forceRenderAfterLocaleChange,
    i18n: i18n,
    children: children
  });
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _super.call(this, props);
    _this.state = {
      error: null
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      var _this$props$onError, _this$props;

      (_this$props$onError = (_this$props = this.props).onError) === null || _this$props$onError === void 0 ? void 0 : _this$props$onError.call(_this$props, error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.error) {
        return /*#__PURE__*/jsx(Dialog, {
          color: "dialog",
          children: /*#__PURE__*/jsx(ErrorDialog, {
            error: this.state.error,
            header: /*#__PURE__*/jsx(Trans, {
              id: "Something went wrong."
            }),
            action: /*#__PURE__*/jsx(Trans, {
              id: "Reload the page"
            }),
            onClick: function onClick() {
              return window.location.reload();
            }
          })
        });
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        error: error
      };
    }
  }]);

  return ErrorBoundary;
}(React__default.Component);

function WidgetsPropsValidator(props) {
  var jsonRpcEndpoint = props.jsonRpcEndpoint,
      provider = props.provider;
  useEffect(function () {
    if (!provider && !jsonRpcEndpoint) {
      throw new IntegrationError('This widget requires a provider or jsonRpcEndpoint.');
    }
  }, [provider, jsonRpcEndpoint]);
  var width = props.width;
  useEffect(function () {
    if (width && width < 300) {
      throw new IntegrationError("Set widget width to at least 300px. (You set it to ".concat(width, ".)"));
    }
  }, [width]);
  var locale = props.locale;
  useEffect(function () {
    if (locale && locale !== 'pseudo' && !SUPPORTED_LOCALES.includes(locale)) {
      console.warn('Unsupported locale: ', locale);
    }
  }, [locale]);
  return /*#__PURE__*/jsx(Fragment, {
    children: props.children
  });
}

function useConnector(Connector, initializer, setContext) {
  return useEffect(function () {
    if (initializer) {
      var state = initializeConnector(function (actions) {
        return new Connector(actions, initializer);
      });
      state[0].activate();
      setContext(state);
    } else {
      setContext(RESET);
    }
  }, [Connector, initializer, setContext]);
}

function Web3Provider(_ref) {
  var jsonRpcEndpoint = _ref.jsonRpcEndpoint,
      provider = _ref.provider,
      children = _ref.children;
  var setUrl = useUpdateAtom(urlAtom);
  useConnector(Url, jsonRpcEndpoint, setUrl);
  var setInjected = useUpdateAtom(injectedAtom);
  useConnector(EIP1193, provider, setInjected);
  return /*#__PURE__*/jsx(Fragment, {
    children: children
  });
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var WidgetWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background-color: ", ";\n  border-radius: ", "em;\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;\n  font-size: 16px;\n  font-smooth: always;\n  font-variant: none;\n  height: 348px;\n  min-width: 300px;\n  padding: 0.25em;\n  position: relative;\n  user-select: none;\n  width: ", ";\n\n  * {\n    box-sizing: border-box;\n    font-family: ", ";\n\n    @supports (font-variation-settings: normal) {\n      font-family: ", ";\n    }\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.container;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.borderRadius;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.primary;
}, function (_ref4) {
  var width = _ref4.width;
  return width && (isNaN(Number(width)) ? width : "".concat(width, "px"));
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.fontFamily;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.fontFamilyVariable;
});
var slideDown = keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  to {\n    transform: translateY(calc(100% - 0.25em));\n  }\n"])));
var slideUp = keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  from {\n    transform: translateY(calc(100% - 0.25em));\n  }\n"])));
var DialogWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  height: calc(100% - 0.5em);\n  left: 0;\n  margin: 0.25em;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  width: calc(100% - 0.5em);\n\n  @supports (overflow: clip) {\n    overflow: clip;\n  }\n\n  ", " {\n    animation: ", " 0.25s ease-in-out;\n  }\n\n  ", ".", " {\n    animation: ", " 0.25s ease-in-out;\n  }\n"])), Modal, slideUp, Modal, UNMOUNTING, slideDown);

function Updaters() {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(BlockUpdater, {}), /*#__PURE__*/jsx(MulticallUpdater, {}), /*#__PURE__*/jsx(TransactionsUpdater, {})]
  });
}

function Widget(props) {
  var children = props.children,
      theme = props.theme,
      _props$locale = props.locale,
      locale = _props$locale === void 0 ? DEFAULT_LOCALE : _props$locale,
      provider = props.provider,
      jsonRpcEndpoint = props.jsonRpcEndpoint,
      _props$width = props.width,
      width = _props$width === void 0 ? 360 : _props$width,
      userDialog = props.dialog,
      className = props.className,
      onError = props.onError;
  var eip1193 = useEip1193Provider(provider);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      dialog = _useState2[0],
      setDialog = _useState2[1];

  return /*#__PURE__*/jsx(StrictMode, {
    children: /*#__PURE__*/jsx(Provider, {
      locale: locale,
      children: /*#__PURE__*/jsx(ThemeProvider, {
        theme: theme,
        children: /*#__PURE__*/jsxs(WidgetWrapper, {
          width: width,
          className: className,
          children: [/*#__PURE__*/jsx(DialogWrapper, {
            ref: setDialog
          }), /*#__PURE__*/jsx(Provider$1, {
            value: userDialog || dialog,
            children: /*#__PURE__*/jsx(ErrorBoundary, {
              onError: onError,
              children: /*#__PURE__*/jsx(WidgetsPropsValidator, _objectSpread$1(_objectSpread$1({}, props), {}, {
                children: /*#__PURE__*/jsx(Provider$3, {
                  store: store,
                  children: /*#__PURE__*/jsx(Provider$4, {
                    children: /*#__PURE__*/jsxs(Web3Provider, {
                      provider: eip1193,
                      jsonRpcEndpoint: jsonRpcEndpoint,
                      children: [/*#__PURE__*/jsx(Updaters, {}), children]
                    })
                  })
                })
              }))
            })
          })]
        })
      })
    })
  });
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function SwapWidget(props) {
  return /*#__PURE__*/jsx(Widget, _objectSpread(_objectSpread({}, props), {}, {
    children: /*#__PURE__*/jsx(Swap, _objectSpread({}, props))
  }));
}

export { SUPPORTED_LOCALES, SwapWidget, darkTheme, lightTheme };
