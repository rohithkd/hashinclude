(function(t){if(typeof exports=="object"&&typeof module=="object")t(require("../../lib/codemirror"),require("./foldcode"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","./foldcode"],t);else t(CodeMirror)})(function(t){"use strict";t.defineOption("foldGutter",false,function(o,n,f){if(f&&f!=t.Init){o.clearGutter(o.state.foldGutter.options.gutter);o.state.foldGutter=null;o.off("gutterClick",d);o.off("change",a);o.off("viewportChange",l);o.off("fold",c);o.off("unfold",c);o.off("swapDoc",u)}if(n){o.state.foldGutter=new e(r(n));u(o);o.on("gutterClick",d);o.on("change",a);o.on("viewportChange",l);o.on("fold",c);o.on("unfold",c);o.on("swapDoc",u)}});var o=t.Pos;function e(t){this.options=t;this.from=this.to=0}function r(t){if(t===true)t={};if(t.gutter==null)t.gutter="CodeMirror-foldgutter";if(t.indicatorOpen==null)t.indicatorOpen="CodeMirror-foldgutter-open";if(t.indicatorFolded==null)t.indicatorFolded="CodeMirror-foldgutter-folded";return t}function n(t,e){var r=t.findMarksAt(o(e));for(var n=0;n<r.length;++n)if(r[n].__isFold&&r[n].find().from.line==e)return true}function f(t){if(typeof t=="string"){var o=document.createElement("div");o.className=t+" CodeMirror-guttermarker-subtle";return o}else{return t.cloneNode(true)}}function i(e,r,i){var u=e.state.foldGutter.options,d=r;e.eachLine(r,i,function(r){var i=null;if(n(e,d)){i=f(u.indicatorFolded)}else{var a=o(d,0),l=u.rangeFinder||t.fold.auto;var c=l&&l(e,a);if(c&&c.from.line+1<c.to.line)i=f(u.indicatorOpen)}e.setGutterMarker(r,u.gutter,i);++d})}function u(t){var o=t.getViewport(),e=t.state.foldGutter;if(!e)return;t.operation(function(){i(t,o.from,o.to)});e.from=o.from;e.to=o.to}function d(t,e,r){var n=t.state.foldGutter.options;if(r!=n.gutter)return;t.foldCode(o(e,0),n.rangeFinder)}function a(t){var o=t.state.foldGutter,e=t.state.foldGutter.options;o.from=o.to=0;clearTimeout(o.changeUpdate);o.changeUpdate=setTimeout(function(){u(t)},e.foldOnChangeTimeSpan||600)}function l(t){var o=t.state.foldGutter,e=t.state.foldGutter.options;clearTimeout(o.changeUpdate);o.changeUpdate=setTimeout(function(){var e=t.getViewport();if(o.from==o.to||e.from-o.to>20||o.from-e.to>20){u(t)}else{t.operation(function(){if(e.from<o.from){i(t,e.from,o.from);o.from=e.from}if(e.to>o.to){i(t,o.to,e.to);o.to=e.to}})}},e.updateViewportTimeSpan||400)}function c(t,o){var e=t.state.foldGutter,r=o.line;if(r>=e.from&&r<e.to)i(t,r,r+1)}});