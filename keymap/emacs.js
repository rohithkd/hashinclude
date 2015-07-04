(function(t){if(typeof exports=="object"&&typeof module=="object")t(require("../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../lib/codemirror"],t);else t(CodeMirror)})(function(t){"use strict";var e=t.Pos;function n(t,e){return t.line==e.line&&t.ch==e.ch}var r=[];function i(t){r.push(t);if(r.length>50)r.shift()}function o(t){if(!r.length)return i(t);r[r.length-1]+=t}function l(t){return r[r.length-(t?Math.min(t,1):1)]||""}function a(){if(r.length>1)r.pop();return l()}var u=null;function f(t,e,r,l,a){if(a==null)a=t.getRange(e,r);if(l&&u&&u.cm==t&&n(e,u.pos)&&t.isClean(u.gen))o(a);else i(a);t.replaceRange("",e,r,"+delete");if(l)u={cm:t,pos:e,gen:t.changeGeneration()};else u=null}function c(t,e,n){return t.findPosH(e,n,"char",true)}function s(t,e,n){return t.findPosH(e,n,"word",true)}function g(t,e,n){return t.findPosV(e,n,"line",t.doc.sel.goalColumn)}function C(t,e,n){return t.findPosV(e,n,"page",t.doc.sel.goalColumn)}function p(t,n,r){var i=n.line,o=t.getLine(i);var l=/\S/.test(r<0?o.slice(0,n.ch):o.slice(n.ch));var a=t.firstLine(),u=t.lastLine();for(;;){i+=r;if(i<a||i>u)return t.clipPos(e(i-r,r<0?0:null));o=t.getLine(i);var f=/\S/.test(o);if(f)l=true;else if(l)return e(i,0)}}function d(t,n,r){var i=n.line,o=n.ch;var l=t.getLine(n.line),a=false;for(;;){var u=l.charAt(o+(r<0?-1:0));if(!u){if(i==(r<0?t.firstLine():t.lastLine()))return e(i,o);l=t.getLine(i+r);if(!/\S/.test(l))return e(i,o);i+=r;o=r<0?l.length:0;continue}if(a&&/[!?.]/.test(u))return e(i,o+(r>0?1:0));if(!a)a=/\w/.test(u);o+=r}}function h(t,r,i){var o;if(t.findMatchingBracket&&(o=t.findMatchingBracket(r,true))&&o.match&&(o.forward?1:-1)==i)return i>0?e(o.to.line,o.to.ch+1):o.to;for(var l=true;;l=false){var a=t.getTokenAt(r);var u=e(r.line,i<0?a.start:a.end);if(l&&i>0&&a.end==r.ch||!/\w/.test(a.string)){var f=t.findPosH(u,i,"char");if(n(u,f))return r;else r=f}else{return u}}}function v(t,e){var n=t.state.emacsPrefix;if(!n)return e?null:1;k(t);return n=="-"?-1:Number(n)}function m(t){var e=typeof t=="string"?function(e){e.execCommand(t)}:t;return function(t){var n=v(t);e(t);for(var r=1;r<n;++r)e(t)}}function A(t,e,r){var i=t.getCursor(),o=v(t);if(o<0){r=-r;o=-o}for(var l=0;l<o;++l){var a=e(t,i,r);if(n(a,i))break;i=a}return i}function S(t,e){var n=function(n){n.extendSelection(A(n,t,e))};n.motion=true;return n}function P(t,e,n){f(t,t.getCursor(),A(t,e,n),true)}function x(t,e){if(t.state.emacsPrefix){if(e!="-")t.state.emacsPrefix+=e;return}t.state.emacsPrefix=e;t.on("keyHandled",L);t.on("inputRead",w)}var y={"Alt-G":true,"Ctrl-X":true,"Ctrl-Q":true,"Ctrl-U":true};function L(t,e){if(!t.state.emacsPrefixMap&&!y.hasOwnProperty(e))k(t)}function k(t){t.state.emacsPrefix=null;t.off("keyHandled",L);t.off("inputRead",w)}function w(t,e){var n=v(t);if(n>1&&e.origin=="+input"){var r=e.text.join("\n"),i="";for(var o=1;o<n;++o)i+=r;t.replaceSelection(i)}}function R(t){t.state.emacsPrefixMap=true;t.addKeyMap(T);t.on("keyHandled",M);t.on("inputRead",M)}function M(t,e){if(typeof e=="string"&&(/^\d$/.test(e)||e=="Ctrl-U"))return;t.removeKeyMap(T);t.state.emacsPrefixMap=false;t.off("keyHandled",M);t.off("inputRead",M)}function b(t){t.setCursor(t.getCursor());t.setExtending(!t.getExtending());t.on("change",function(){t.setExtending(false)})}function U(t){t.setExtending(false);t.setCursor(t.getCursor())}function D(t,e,n){if(t.openDialog)t.openDialog(e+': <input type="text" style="width: 10em"/>',n,{bottom:true});else n(prompt(e,""))}function E(t,e){var n=t.getCursor(),r=t.findPosH(n,1,"word");t.replaceRange(e(t.getRange(n,r)),n,r);t.setCursor(r)}function H(t){var n=t.getCursor(),r=n.line,i=n.ch;var o=[];while(r>=t.firstLine()){var l=t.getLine(r);for(var a=i==null?l.length:i;a>0;){var i=l.charAt(--a);if(i==")")o.push("(");else if(i=="]")o.push("[");else if(i=="}")o.push("{");else if(/[\(\{\[]/.test(i)&&(!o.length||o.pop()!=i))return t.extendSelection(e(r,a))}--r;i=null}}function G(t){t.execCommand("clearSearch");U(t)}var B=t.keyMap.emacs={"Ctrl-W":function(t){f(t,t.getCursor("start"),t.getCursor("end"))},"Ctrl-K":m(function(t){var n=t.getCursor(),r=t.clipPos(e(n.line));var i=t.getRange(n,r);if(!/\S/.test(i)){i+="\n";r=e(n.line+1,0)}f(t,n,r,true,i)}),"Alt-W":function(t){i(t.getSelection());U(t)},"Ctrl-Y":function(t){var e=t.getCursor();t.replaceRange(l(v(t)),e,e,"paste");t.setSelection(e,t.getCursor())},"Alt-Y":function(t){t.replaceSelection(a(),"around","paste")},"Ctrl-Space":b,"Ctrl-Shift-2":b,"Ctrl-F":S(c,1),"Ctrl-B":S(c,-1),Right:S(c,1),Left:S(c,-1),"Ctrl-D":function(t){P(t,c,1)},Delete:function(t){P(t,c,1)},"Ctrl-H":function(t){P(t,c,-1)},Backspace:function(t){P(t,c,-1)},"Alt-F":S(s,1),"Alt-B":S(s,-1),"Alt-D":function(t){P(t,s,1)},"Alt-Backspace":function(t){P(t,s,-1)},"Ctrl-N":S(g,1),"Ctrl-P":S(g,-1),Down:S(g,1),Up:S(g,-1),"Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd",End:"goLineEnd",Home:"goLineStart","Alt-V":S(C,-1),"Ctrl-V":S(C,1),PageUp:S(C,-1),PageDown:S(C,1),"Ctrl-Up":S(p,-1),"Ctrl-Down":S(p,1),"Alt-A":S(d,-1),"Alt-E":S(d,1),"Alt-K":function(t){P(t,d,1)},"Ctrl-Alt-K":function(t){P(t,h,1)},"Ctrl-Alt-Backspace":function(t){P(t,h,-1)},"Ctrl-Alt-F":S(h,1),"Ctrl-Alt-B":S(h,-1),"Shift-Ctrl-Alt-2":function(t){t.setSelection(A(t,h,1),t.getCursor())},"Ctrl-Alt-T":function(t){var e=h(t,t.getCursor(),-1),n=h(t,e,1);var r=h(t,n,1),i=h(t,r,-1);t.replaceRange(t.getRange(i,r)+t.getRange(n,i)+t.getRange(e,n),e,r)},"Ctrl-Alt-U":m(H),"Alt-Space":function(t){var n=t.getCursor(),r=n.ch,i=n.ch,o=t.getLine(n.line);while(r&&/\s/.test(o.charAt(r-1)))--r;while(i<o.length&&/\s/.test(o.charAt(i)))++i;t.replaceRange(" ",e(n.line,r),e(n.line,i))},"Ctrl-O":m(function(t){t.replaceSelection("\n","start")}),"Ctrl-T":m(function(t){t.execCommand("transposeChars")}),"Alt-C":m(function(t){E(t,function(t){var e=t.search(/\w/);if(e==-1)return t;return t.slice(0,e)+t.charAt(e).toUpperCase()+t.slice(e+1).toLowerCase()})}),"Alt-U":m(function(t){E(t,function(t){return t.toUpperCase()})}),"Alt-L":m(function(t){E(t,function(t){return t.toLowerCase()})}),"Alt-;":"toggleComment","Ctrl-/":m("undo"),"Shift-Ctrl--":m("undo"),"Ctrl-Z":m("undo"),"Cmd-Z":m("undo"),"Shift-Alt-,":"goDocStart","Shift-Alt-.":"goDocEnd","Ctrl-S":"findNext","Ctrl-R":"findPrev","Ctrl-G":G,"Shift-Alt-5":"replace","Alt-/":"autocomplete","Ctrl-J":"newlineAndIndent",Enter:false,Tab:"indentAuto","Alt-G":function(t){t.setOption("keyMap","emacs-Alt-G")},"Ctrl-X":function(t){t.setOption("keyMap","emacs-Ctrl-X")},"Ctrl-Q":function(t){t.setOption("keyMap","emacs-Ctrl-Q")},"Ctrl-U":R};t.keyMap["emacs-Ctrl-X"]={Tab:function(t){t.indentSelection(v(t,true)||t.getOption("indentUnit"))},"Ctrl-X":function(t){t.setSelection(t.getCursor("head"),t.getCursor("anchor"))},"Ctrl-S":"save","Ctrl-W":"save",S:"saveAll",F:"open",U:m("undo"),K:"close",Delete:function(t){f(t,t.getCursor(),d(t,t.getCursor(),1),true)},auto:"emacs",nofallthrough:true,disableInput:true};t.keyMap["emacs-Alt-G"]={G:function(t){var e=v(t,true);if(e!=null&&e>0)return t.setCursor(e-1);D(t,"Goto line",function(e){var n;if(e&&!isNaN(n=Number(e))&&n==n|0&&n>0)t.setCursor(n-1)})},auto:"emacs",nofallthrough:true,disableInput:true};t.keyMap["emacs-Ctrl-Q"]={Tab:m("insertTab"),auto:"emacs",nofallthrough:true};var T={"Ctrl-G":k};function K(t){T[t]=function(e){x(e,t)};B["Ctrl-"+t]=function(e){x(e,t)};y["Ctrl-"+t]=true}for(var N=0;N<10;++N)K(String(N));K("-")});