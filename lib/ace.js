'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ace = window.ace;

var editorOptions = ['minLines', 'maxLines', 'readOnly', 'highlightActiveLine', 'tabSize', 'enableBasicAutocompletion', 'enableLiveAutocompletion', 'enableSnippets '];

var ReactAce = (function (_Component) {
  _inherits(ReactAce, _Component);

  function ReactAce(props) {
    var _this = this;

    _classCallCheck(this, ReactAce);

    _get(Object.getPrototypeOf(ReactAce.prototype), 'constructor', this).call(this, props);
    ['onChange', 'onFocus', 'onBlur', 'onCopy', 'onPaste'].forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });
  }

  _createClass(ReactAce, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props;
      var name = _props.name;
      var onBeforeLoad = _props.onBeforeLoad;
      var mode = _props.mode;
      var theme = _props.theme;
      var fontSize = _props.fontSize;
      var value = _props.value;
      var cursorStart = _props.cursorStart;
      var showGutter = _props.showGutter;
      var wrapEnabled = _props.wrapEnabled;
      var showPrintMargin = _props.showPrintMargin;
      var keyboardHandler = _props.keyboardHandler;
      var onLoad = _props.onLoad;
      var commands = _props.commands;

      this.editor = ace.edit(name);

      if (onBeforeLoad) {
        onBeforeLoad(ace);
      }

      var editorProps = Object.keys(this.props.editorProps);
      for (var i = 0; i < editorProps.length; i++) {
        this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
      }

      this.editor.getSession().setMode('ace/mode/' + mode);
      this.editor.setTheme('ace/theme/' + theme);
      this.editor.setFontSize(fontSize);
      this.editor.setValue(value, cursorStart);
      this.editor.renderer.setShowGutter(showGutter);
      this.editor.getSession().setUseWrapMode(wrapEnabled);
      this.editor.setShowPrintMargin(showPrintMargin);
      this.editor.on('focus', this.onFocus);
      this.editor.on('blur', this.onBlur);
      this.editor.on('copy', this.onCopy);
      this.editor.on('paste', this.onPaste);
      this.editor.on('change', this.onChange);

      for (var i = 0; i < editorOptions.length; i++) {
        var option = editorOptions[i];
        this.editor.setOption(option, this.props[option]);
      }

      if (Array.isArray(commands)) {
        commands.forEach(function (command) {
          _this2.editor.commands.addCommand(command);
        });
      }

      if (keyboardHandler) {
        this.editor.setKeyboardHandler('ace/keyboard/' + keyboardHandler);
      }

      if (onLoad) {
        onLoad(this.editor);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var oldProps = this.props;

      for (var i = 0; i < editorOptions.length; i++) {
        var option = editorOptions[i];
        if (nextProps[option] !== oldProps[option]) {
          this.editor.setOption(option, nextProps[option]);
        }
      }

      if (nextProps.mode !== oldProps.mode) {
        this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
      }
      if (nextProps.theme !== oldProps.theme) {
        this.editor.setTheme('ace/theme/' + nextProps.theme);
      }
      if (nextProps.fontSize !== oldProps.fontSize) {
        this.editor.setFontSize(nextProps.fontSize);
      }
      if (nextProps.wrapEnabled !== oldProps.wrapEnabled) {
        this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
      }
      if (nextProps.showPrintMargin !== oldProps.showPrintMargin) {
        this.editor.setShowPrintMargin(nextProps.showPrintMargin);
      }
      if (nextProps.showGutter !== oldProps.showGutter) {
        this.editor.renderer.setShowGutter(nextProps.showGutter);
      }
      if (this.editor.getValue() !== nextProps.value) {
        // editor.setValue is a synchronous function call, change event is emitted before setValue return.
        this.silent = true;
        this.editor.setValue(nextProps.value, nextProps.cursorStart);
        this.silent = false;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.editor.destroy();
      this.editor = null;
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (this.props.onChange && !this.silent) {
        var value = this.editor.getValue();
        this.props.onChange(value);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      if (this.props.onFocus) {
        this.props.onFocus();
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }
  }, {
    key: 'onCopy',
    value: function onCopy(text) {
      if (this.props.onCopy) {
        this.props.onCopy(text);
      }
    }
  }, {
    key: 'onPaste',
    value: function onPaste(text) {
      if (this.props.onPaste) {
        this.props.onPaste(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var name = _props2.name;
      var className = _props2.className;
      var width = _props2.width;
      var height = _props2.height;

      var divStyle = { width: width, height: height };
      return _react2['default'].createElement('div', {
        id: name,
        className: className,
        style: divStyle
      });
    }
  }]);

  return ReactAce;
})(_react.Component);

exports['default'] = ReactAce;

ReactAce.propTypes = {
  mode: _react.PropTypes.string,
  theme: _react.PropTypes.string,
  name: _react.PropTypes.string,
  className: _react.PropTypes.string,
  height: _react.PropTypes.string,
  width: _react.PropTypes.string,
  fontSize: _react.PropTypes.number,
  showGutter: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  onCopy: _react.PropTypes.func,
  onPaste: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  value: _react.PropTypes.string,
  onLoad: _react.PropTypes.func,
  onBeforeLoad: _react.PropTypes.func,
  minLines: _react.PropTypes.number,
  maxLines: _react.PropTypes.number,
  readOnly: _react.PropTypes.bool,
  highlightActiveLine: _react.PropTypes.bool,
  tabSize: _react.PropTypes.number,
  showPrintMargin: _react.PropTypes.bool,
  cursorStart: _react.PropTypes.number,
  editorProps: _react.PropTypes.object,
  keyboardHandler: _react.PropTypes.string,
  wrapEnabled: _react.PropTypes.bool,
  enableBasicAutocompletion: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array]),
  enableLiveAutocompletion: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.array]),
  commands: _react.PropTypes.array
};

ReactAce.defaultProps = {
  name: 'brace-editor',
  mode: '',
  theme: '',
  height: '500px',
  width: '500px',
  value: '',
  fontSize: 12,
  showGutter: true,
  onChange: null,
  onPaste: null,
  onLoad: null,
  minLines: null,
  maxLines: null,
  readOnly: false,
  highlightActiveLine: true,
  showPrintMargin: true,
  tabSize: 4,
  cursorStart: 1,
  editorProps: {},
  wrapEnabled: false,
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false
};
module.exports = exports['default'];