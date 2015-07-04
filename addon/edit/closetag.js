(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"),require("../fold/xml-fold"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../fold/xml-fold"],e);else e(CodeMirror)})(function(e){e.defineOption("autoCloseTags",false,function(t,n,o){if(o!=e.Init&&o)t.removeKeyMap("autoCloseTags");if(!n)return;var i={name:"autoCloseTags"};if(typeof n!="object"||n.whenClosing)i["'/'"]=function(e){return a(e)};if(typeof n!="object"||n.whenOpening)i["'>'"]=function(e){return r(e)};t.addKeyMap(i)});var t=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];var n=["applet","blockquote","body","button","div","dl","fieldset","form","frameset","h1","h2","h3","h4","h5","h6","head","html","iframe","layer","legend","object","ol","p","select","table","ul"];function r(r){if(r.getOption("disableInput"))return e.Pass;var a=r.listSelections(),l=[];for(var s=0;s<a.length;s++){if(!a[s].empty())return e.Pass;var f=a[s].head,c=r.getTokenAt(f);var g=e.innerMode(r.getMode(),c.state),d=g.state;if(g.mode.name!="xml"||!d.tagName)return e.Pass;var u=r.getOption("autoCloseTags"),h=g.mode.configuration=="html";var m=typeof u=="object"&&u.dontCloseTags||h&&t;var p=typeof u=="object"&&u.indentTags||h&&n;var v=d.tagName;if(c.end>f.ch)v=v.slice(0,v.length-c.end+f.ch);var b=v.toLowerCase();if(!v||c.type=="string"&&(c.end!=f.ch||!/[\"\']/.test(c.string.charAt(c.string.length-1))||c.string.length==1)||c.type=="tag"&&d.type=="closeTag"||c.string.indexOf("/")==c.string.length-1||m&&o(m,b)>-1||i(r,v,f,d,true))return e.Pass;var y=p&&o(p,b)>-1;l[s]={indent:y,text:">"+(y?"\n\n":"")+"</"+v+">",newPos:y?e.Pos(f.line+1,0):e.Pos(f.line,f.ch+1)}}for(var s=a.length-1;s>=0;s--){var x=l[s];r.replaceRange(x.text,a[s].head,a[s].anchor,"+insert");var P=r.listSelections().slice(0);P[s]={head:x.newPos,anchor:x.newPos};r.setSelections(P);if(x.indent){r.indentLine(x.newPos.line,null,true);r.indentLine(x.newPos.line+1,null,true)}}}function a(t){if(t.getOption("disableInput"))return e.Pass;var n=t.listSelections(),r=[];for(var a=0;a<n.length;a++){if(!n[a].empty())return e.Pass;var o=n[a].head,l=t.getTokenAt(o);var s=e.innerMode(t.getMode(),l.state),f=s.state;if(l.type=="string"||l.string.charAt(0)!="<"||l.start!=o.ch-1||s.mode.name!="xml"||!f.context||!f.context.tagName||i(t,f.context.tagName,o,f))return e.Pass;r[a]="/"+f.context.tagName+">"}t.replaceSelections(r);n=t.listSelections();for(var a=0;a<n.length;a++)if(a==n.length-1||n[a].head.line<n[a+1].head.line)t.indentLine(n[a].head.line)}function o(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,r=e.length;n<r;++n)if(e[n]==t)return n;return-1}function i(t,n,r,a,o){if(!e.scanForClosingTag)return false;var i=Math.min(t.lastLine()+1,r.line+500);var l=e.scanForClosingTag(t,r,null,i);if(!l||l.tag!=n)return false;var s=a.context;for(var f=o?1:0;s&&s.tagName==n;s=s.prev)++f;r=l.to;for(var c=1;c<f;c++){var g=e.scanForClosingTag(t,r,null,i);if(!g||g.tag!=n)return false;r=g.to}return true}});