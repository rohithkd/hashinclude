(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";function t(e,t){for(var r=0,i=e.length;r<i;++r)t(e[r])}function r(e,t){if(!Array.prototype.indexOf){var r=e.length;while(r--){if(e[r]===t){return true}}return false}return e.indexOf(t)!=-1}function i(t,r,i){var n=t.getCursor(),o=i(t,n),s=o;if(!/^[\w$_]*$/.test(o.string)){o=s={start:n.ch,end:n.ch,string:"",state:o.state,className:o.string==":"?"python-type":null}}if(!a)var a=[];a.push(s);var l=c(o,a);l=l.sort();return{list:l,from:e.Pos(n.line,o.start),to:e.Pos(n.line,o.end)}}function n(e){return i(e,a,function(e,t){return e.getTokenAt(t)})}e.registerHelper("hint","python",n);var o="and del from not while as elif global or with assert else if pass yield"+"break except import print class exec in raise continue finally is return def for lambda try";var s=o.split(" ");var a=o.toUpperCase().split(" ");var l="abs divmod input open staticmethod all enumerate int ord str "+"any eval isinstance pow sum basestring execfile issubclass print super"+"bin file iter property tuple bool filter len range type"+"bytearray float list raw_input unichr callable format locals reduce unicode"+"chr frozenset long reload vars classmethod getattr map repr xrange"+"cmp globals max reversed zip compile hasattr memoryview round __import__"+"complex hash min set apply delattr help next setattr buffer"+"dict hex object slice coerce dir id oct sorted intern ";var p=l.split(" ").join("() ").split(" ");var f=l.toUpperCase().split(" ").join("() ").split(" ");function c(e,i){var n=[],o=e.string;function l(e){if(e.lastIndexOf(o,0)==0&&!r(n,e))n.push(e)}function c(e){t(p,l);t(f,l);t(s,l);t(a,l)}if(i){var u=i.pop(),d;if(u.type=="variable")d=u.string;else if(u.type=="variable-3")d=":"+u.string;while(d!=null&&i.length)d=d[i.pop().string];if(d!=null)c(d)}return n}});