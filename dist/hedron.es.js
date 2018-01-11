import React, { Children, Component } from 'react';
import styled, { css } from 'styled-components';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction$1 = function emptyFunction$1() {};

emptyFunction$1.thatReturns = makeEmptyFunction;
emptyFunction$1.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$1.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$1.thatReturnsNull = makeEmptyFunction(null);
emptyFunction$1.thatReturnsThis = function () {
  return this;
};
emptyFunction$1.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction$1;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant$1;

var emptyFunction$2 = emptyFunction_1;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning$1 = emptyFunction$2;

{
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning$1 = function warning$1(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

var warning_1 = warning$1;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

{
  var invariant$2 = invariant_1;
  var warning$2 = warning_1;
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        warning$2(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$2(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes$1;

var emptyFunction = emptyFunction_1;
var invariant = invariant_1;
var warning = warning_1;

var ReactPropTypesSecret = ReactPropTypesSecret_1;
var checkPropTypes = checkPropTypes_1;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var index = createCommonjsModule(function (module) {
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

{
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};





var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var _templateObject$2 = taggedTemplateLiteral(["\n  @media (min-width: ", "px) {\n    ", "\n  }"], ["\n  @media (min-width: ", "px) {\n    ", "\n  }"]);

var defaultBreakpoints = {
  sm: 500,
  md: 768,
  lg: 1100
};

var query = function query(size) {
  var breakpoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultBreakpoints;
  return function () {
    return css(_templateObject$2, breakpoints[size] || defaultBreakpoints[size], css.apply(undefined, arguments));
  };
};

var media = Object.keys(defaultBreakpoints).reduce(function (acc, label) {
  var accumulator = acc;
  accumulator[label] = function (breakpoints) {
    return query(label, breakpoints);
  };
  return accumulator;
}, {});

var _templateObject$3 = taggedTemplateLiteral(['', ''], ['', '']);

var breakpoint = function breakpoint(name, getStyle) {
  return function (props) {
    return media[name] ? media[name](props.breakpoints)(_templateObject$3, function (props) {
      return getStyle(props, name);
    }) : getStyle(props, name);
  };
};

var applyBreakpointStyle = function applyBreakpointStyle(rule, value, breakpoint) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      on = _ref.on,
      off = _ref.off,
      _ref$modifier = _ref.modifier,
      modifier = _ref$modifier === undefined ? function (v) {
    return v;
  } : _ref$modifier;

  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'string':
      return rule + ': ' + modifier(value) + ';';
    case 'number':
      return rule + ': ' + modifier(value) + ';';
    case 'boolean':
      if (value === true && on) return rule + ': ' + on + ';';
      if (value === false && off) return rule + ': ' + off + ';';
    case 'object':
      if (typeof value[breakpoint] === 'undefined') return;
      if (value[breakpoint] === true && on) return rule + ': ' + modifier(on) + ';';
      if (value[breakpoint] === false && off) return rule + ': ' + modifier(off) + ';';
      return rule + ': ' + modifier(value[breakpoint]) + ';';
    default:
      return;
  }
};

// this is the object that holds the css translation
// rules for hedron's 1.0.0 API
var flexCSS = {
  hAlign: {
    directions: {
      horizontal: "justify-content",
      vertical: "align-items"
    },
    values: {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch",
      spaced: "space-around"
    }
  },
  vAlign: {
    directions: {
      horizontal: "align-items",
      vertical: "justify-content"
    },
    values: {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch",
      spaced: "space-around"
    }
  }
};

var verticalAlign = function verticalAlign(rule, direction) {
  return flexCSS.vAlign.directions[direction] + ": " + flexCSS.vAlign.values[rule] + ";";
};

var horizontalAlign = function horizontalAlign(rule, direction) {
  return flexCSS.hAlign.directions[direction] + ": " + flexCSS.hAlign.values[rule] + ";";
};

var flex = Object.freeze({
	verticalAlign: verticalAlign,
	horizontalAlign: horizontalAlign
});

var applyStyle = function applyStyle(condition, styles) {
  if (!condition) return;
  return styles.join(";");
};

var styles = Object.freeze({
	applyStyle: applyStyle
});



var index$1 = Object.freeze({
	media: media,
	defaultBreakpoints: defaultBreakpoints,
	breakpoint: breakpoint,
	applyBreakpointStyle: applyBreakpointStyle,
	flex: flex,
	styles: styles
});

/* globals ReactClass */
var defaultDebug = {
  enabled: false
};

var defaultGutter = "20px";

var breakpointsShape = index.shape({
  sm: index.number,
  md: index.number,
  lg: index.number
});

var debugShape = index.shape({
  enabled: index.bool,
  color: index.string,
  border: index.string
});

var LayoutProvider = function (_Component) {
  inherits(LayoutProvider, _Component);

  function LayoutProvider() {
    classCallCheck(this, LayoutProvider);
    return possibleConstructorReturn(this, (LayoutProvider.__proto__ || Object.getPrototypeOf(LayoutProvider)).apply(this, arguments));
  }

  createClass(LayoutProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _props = this.props,
          _props$breakpoints = _props.breakpoints,
          propsBreakpoints = _props$breakpoints === undefined ? {} : _props$breakpoints,
          _props$debug = _props.debug,
          propsDebug = _props$debug === undefined ? {} : _props$debug,
          _props$gutter = _props.gutter,
          propsGutter = _props$gutter === undefined ? "20px" : _props$gutter;
      var _context = this.context,
          _context$breakpoints = _context.breakpoints,
          contextBreakpoints = _context$breakpoints === undefined ? {} : _context$breakpoints,
          _context$debug = _context.debug,
          contextDebug = _context$debug === undefined ? {} : _context$debug,
          _context$gutter = _context.gutter,
          contextGutter = _context$gutter === undefined ? "20px" : _context$gutter;


      return {
        breakpoints: _extends({}, defaultBreakpoints, contextBreakpoints, propsBreakpoints),
        debug: _extends({}, defaultDebug, contextDebug, propsDebug),
        gutter: propsGutter || contextGutter || defaultGutter
      };
    }
  }, {
    key: "render",
    value: function render() {
      return Children.only(this.props.children);
    }
  }]);
  return LayoutProvider;
}(Component);

LayoutProvider.propTypes = {
  children: index.node,
  breakpoints: breakpointsShape,
  gutter: index.string,
  debug: debugShape
};
LayoutProvider.contextTypes = {
  breakpoints: breakpointsShape,
  gutter: index.string,
  debug: debugShape
};
LayoutProvider.childContextTypes = {
  breakpoints: breakpointsShape,
  gutter: index.string,
  debug: debugShape
};
var withLayout = function withLayout(WrappedComponent
// eslint-disable-next-line react/no-multi-comp
) {
  var _class, _temp;

  return _temp = _class = function (_Component2) {
    inherits(Breakpoints, _Component2);

    function Breakpoints() {
      classCallCheck(this, Breakpoints);
      return possibleConstructorReturn(this, (Breakpoints.__proto__ || Object.getPrototypeOf(Breakpoints)).apply(this, arguments));
    }

    createClass(Breakpoints, [{
      key: "render",
      value: function render() {
        var _context2 = this.context,
            breakpoints = _context2.breakpoints,
            debug = _context2.debug,
            gutter = _context2.gutter;


        return React.createElement(WrappedComponent, _extends({}, this.props, {
          breakpoints: breakpoints,
          debug: debug,
          gutter: gutter
        }));
      }
      // eslint-disable-line  react/prefer-stateless-function

    }]);
    return Breakpoints;
  }(Component), _class.contextTypes = {
    breakpoints: breakpointsShape,
    debug: debugShape,
    gutter: index.string
  }, _temp;
};

var _templateObject$1 = taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

/* eslint-disable no-unused-vars */
var compute = function compute(name) {
  return breakpoint(name, function (props, name) {
    return "display:" + (props[name] ? "none" : "inherit") + ";";
  });
};

var Hidden = styled.div(_templateObject$1, compute("xs"), compute("sm"), compute("md"), compute("lg"));

var Hidden$1 = withLayout(Hidden);

var _templateObject = taggedTemplateLiteral(["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

/* eslint-disable no-unused-vars */
var Section = styled.div(_templateObject, function (props) {
  return props.fluid ? "width: 100%;" : "\n      margin: 0 auto;\n      max-width: 100%;\n      position: relative;\n      " + (props.width ? "width: " + props.width + ";" : "width: 960px;") + "\n    ";
}, function (props) {
  return props.height && "height: " + props.height + ";";
}, function (props) {
  return props.absolute && "position: absolute;";
}, function (props) {
  return props.top && "top: " + props.top + ";";
}, function (props) {
  return props.bottom && "bottom: " + props.bottom + ";";
}, function (props) {
  return props.left && "left: " + props.left + ";";
}, function (props) {
  return props.right && "right: " + props.right + ";";
}, function (props) {
  return props.height && "height: " + props.height + ";";
}, function (props) {
  return props.width && "width: " + props.width + ";";
});

var Section$1 = withLayout(Section);

/* globals ReactClass */
// This is an undocumented utility that is subject to change.
// Please do not use this externally. Eventually I will likely
// expose it once it's been cleaned and made reusable.
//
// The passOn function applies a specific set of properties
// to the children components. It will only apply the props
// to a component type that exists in the ofTypes array.
var passOn = function (children) {
  var process = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (r) {
    return r;
  };

  var response = React.isValidElement(children) ? React.cloneElement(children, process(children)) : React.Children.map(children, function (child) {
    return React.cloneElement(child, process(child));
  });
  return response;
};

var _templateObject$4 = taggedTemplateLiteral(["\n  display: flex;\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  display: flex;\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

var containerDirectionError = "Container direction must be `horizontal` or `vertical`";

var directionToFlex = function directionToFlex(direction) {
  if (direction === "vertical") {
    return "column";
  } else if (direction === "horizontal") {
    return "row";
  }
  throw Error(containerDirectionError);
};

var compute$1 = function compute$1(name) {
  return breakpoint(name, function (props, name) {
    return [applyBreakpointStyle('width', props.width, name), applyBreakpointStyle('height', props.height, name), applyBreakpointStyle('flex-grow', props.grow, name, { on: 1, off: 0 }), applyBreakpointStyle('flex-shrink', props.shrink, name, { on: 1, off: 0 }), applyBreakpointStyle('flex', props.flex, name), applyBreakpointStyle('flex-wrap', props.wrap, name, { on: 'wrap', off: 'nowrap' }), applyBreakpointStyle('flex-direction', props.direction, name, { modifier: function modifier(v) {
        return directionToFlex(v);
      } })];
  });
};

var Wrapper = styled.div(_templateObject$4, function (props) {
  return props.alignX && horizontalAlign(props.alignX, props.direction);
}, function (props) {
  return props.alignY && verticalAlign(props.alignY, props.direction);
}, compute$1("xs"), compute$1("sm"), compute$1("md"), compute$1("lg"));

Wrapper.defaultProps = {
  direction: "horizontal"
};

var Container = function Container(_ref) {
  var children = _ref.children,
      props = objectWithoutProperties(_ref, ["children"]);

  return React.createElement(
    Wrapper,
    props,
    passOn(children, function (child) {
      return {
        xs: child.props.xs || child.props.direction === "horizontal" && 12 / children.length
      };
    })
  );
};

var Container$1 = withLayout(Container);

/* thank you sindresorhus ~> https://github.com/sindresorhus/hex-rgb*/

var hexToRgb = function (hex) {
	if (typeof hex !== 'string') {
		throw new TypeError('Expected a string');
	}

	hex = hex.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	var num = parseInt(hex, 16);

	return [num >> 16, num >> 8 & 255, num & 255];
};

var _templateObject$5 = taggedTemplateLiteral(["\n  box-sizing: border-box;\n  display: ", ";\n  flex-direction: column;\n  overflow: ", ";\n  ", ";\n\n  ", "\n  ", "\n  ", "\n  ", "\n"], ["\n  box-sizing: border-box;\n  display: ", ";\n  flex-direction: column;\n  overflow: ", ";\n  ", ";\n\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

var debugStyles = {
  outline: '1px solid #fff',
  background: 'rgba(0, 0, 100, .15)'
};

var toRgba = function toRgba(rbg) {
  var result = [];

  rbg.map(function (n) {
    return result.push(String(n));
  });
  result.push('.15');

  return result.join(',');
};
var getDebugStyles = function getDebugStyles(props) {
  props.debug = props.debug || {};
  var outline = props.debug.outline ? props.debug.outline : debugStyles.outline;
  var background = /^#/.test(props.debug.fill) ? "rgba(" + toRgba(hexToRgb(props.debug.fill)) + ")" : debugStyles.background;

  return ["background: " + background, "outline: " + outline];
};

var compute$2 = function compute$2(name) {
  return breakpoint(name, function (props, name) {
    return [applyBreakpointStyle('width', props.width, name), applyBreakpointStyle('height', props.height, name), applyBreakpointStyle('margin-left', props.shift, name), applyBreakpointStyle('flex-grow', props.grow, name, { on: 1, off: 0 }), applyBreakpointStyle('flex-shrink', props.shrink, name, { on: 1, off: 0 }), applyBreakpointStyle('flex', props.flex, name), applyBreakpointStyle('padding', props.gutter, name), applyBreakpointStyle('padding', props.fluid, name, { on: '0', off: props.gutter })];
  });
};

var Box = styled.div(_templateObject$5, function (props) {
  return props.block ? "block" : "flex";
}, function (props) {
  return props.overflow ? props.overflow : "auto";
}, function (props) {
  return applyStyle(props.debug && props.debug.enabled, getDebugStyles(props));
}, compute$2("xs"), compute$2("sm"), compute$2("md"), compute$2("lg"));

Box.defaultProps = {
  shrink: true
};

var Box$1 = withLayout(Box);

export { Section$1 as Section, Container$1 as Container, Box$1 as Box, Hidden$1 as Hidden, LayoutProvider, withLayout, index$1 as utils };
