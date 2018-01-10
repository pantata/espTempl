/* -- zepto.js -- */
/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
!function (t, e) { "function" == typeof define && define.amd ? define(function () { return e(t) }) : e(t) }(this, function (t) { var e = function () { function $(t) { return null == t ? String(t) : S[C.call(t)] || "object" } function F(t) { return "function" == $(t) } function k(t) { return null != t && t == t.window } function M(t) { return null != t && t.nodeType == t.DOCUMENT_NODE } function R(t) { return "object" == $(t) } function Z(t) { return R(t) && !k(t) && Object.getPrototypeOf(t) == Object.prototype } function z(t) { var e = !!t && "length" in t && t.length, n = r.type(t); return "function" != n && !k(t) && ("array" == n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t) } function q(t) { return a.call(t, function (t) { return null != t }) } function H(t) { return t.length > 0 ? r.fn.concat.apply([], t) : t } function I(t) { return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() } function V(t) { return t in l ? l[t] : l[t] = new RegExp("(^|\\s)" + t + "(\\s|$)") } function _(t, e) { return "number" != typeof e || h[I(t)] ? e : e + "px" } function B(t) { var e, n; return c[t] || (e = f.createElement(t), f.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), c[t] = n), c[t] } function U(t) { return "children" in t ? u.call(t.children) : r.map(t.childNodes, function (t) { return 1 == t.nodeType ? t : void 0 }) } function X(t, e) { var n, r = t ? t.length : 0; for (n = 0; r > n; n++)this[n] = t[n]; this.length = r, this.selector = e || "" } function J(t, r, i) { for (n in r) i && (Z(r[n]) || L(r[n])) ? (Z(r[n]) && !Z(t[n]) && (t[n] = {}), L(r[n]) && !L(t[n]) && (t[n] = []), J(t[n], r[n], i)) : r[n] !== e && (t[n] = r[n]) } function W(t, e) { return null == e ? r(t) : r(t).filter(e) } function Y(t, e, n, r) { return F(e) ? e.call(t, n, r) : e } function G(t, e, n) { null == n ? t.removeAttribute(e) : t.setAttribute(e, n) } function K(t, n) { var r = t.className || "", i = r && r.baseVal !== e; return n === e ? i ? r.baseVal : r : void (i ? r.baseVal = n : t.className = n) } function Q(t) { try { return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? r.parseJSON(t) : t) : t } catch (e) { return t } } function tt(t, e) { e(t); for (var n = 0, r = t.childNodes.length; r > n; n++)tt(t.childNodes[n], e) } var e, n, r, i, O, P, o = [], s = o.concat, a = o.filter, u = o.slice, f = t.document, c = {}, l = {}, h = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 }, p = /^\s*<(\w+|!)[^>]*>/, d = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, m = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, g = /^(?:body|html)$/i, v = /([A-Z])/g, y = ["val", "css", "html", "text", "data", "width", "height", "offset"], x = ["after", "prepend", "before", "append"], b = f.createElement("table"), E = f.createElement("tr"), j = { tr: f.createElement("tbody"), tbody: b, thead: b, tfoot: b, td: E, th: E, "*": f.createElement("div") }, w = /complete|loaded|interactive/, T = /^[\w-]*$/, S = {}, C = S.toString, N = {}, A = f.createElement("div"), D = { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, L = Array.isArray || function (t) { return t instanceof Array }; return N.matches = function (t, e) { if (!e || !t || 1 !== t.nodeType) return !1; var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector; if (n) return n.call(t, e); var r, i = t.parentNode, o = !i; return o && (i = A).appendChild(t), r = ~N.qsa(i, e).indexOf(t), o && A.removeChild(t), r }, O = function (t) { return t.replace(/-+(.)?/g, function (t, e) { return e ? e.toUpperCase() : "" }) }, P = function (t) { return a.call(t, function (e, n) { return t.indexOf(e) == n }) }, N.fragment = function (t, n, i) { var o, s, a; return d.test(t) && (o = r(f.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(m, "<$1></$2>")), n === e && (n = p.test(t) && RegExp.$1), n in j || (n = "*"), a = j[n], a.innerHTML = "" + t, o = r.each(u.call(a.childNodes), function () { a.removeChild(this) })), Z(i) && (s = r(o), r.each(i, function (t, e) { y.indexOf(t) > -1 ? s[t](e) : s.attr(t, e) })), o }, N.Z = function (t, e) { return new X(t, e) }, N.isZ = function (t) { return t instanceof N.Z }, N.init = function (t, n) { var i; if (!t) return N.Z(); if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && p.test(t)) i = N.fragment(t, RegExp.$1, n), t = null; else { if (n !== e) return r(n).find(t); i = N.qsa(f, t) } else { if (F(t)) return r(f).ready(t); if (N.isZ(t)) return t; if (L(t)) i = q(t); else if (R(t)) i = [t], t = null; else if (p.test(t)) i = N.fragment(t.trim(), RegExp.$1, n), t = null; else { if (n !== e) return r(n).find(t); i = N.qsa(f, t) } } return N.Z(i, t) }, r = function (t, e) { return N.init(t, e) }, r.extend = function (t) { var e, n = u.call(arguments, 1); return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) { J(t, n, e) }), t }, N.qsa = function (t, e) { var n, r = "#" == e[0], i = !r && "." == e[0], o = r || i ? e.slice(1) : e, s = T.test(o); return t.getElementById && s && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : u.call(s && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e)) }, r.contains = f.documentElement.contains ? function (t, e) { return t !== e && t.contains(e) } : function (t, e) { for (; e && (e = e.parentNode);)if (e === t) return !0; return !1 }, r.type = $, r.isFunction = F, r.isWindow = k, r.isArray = L, r.isPlainObject = Z, r.isEmptyObject = function (t) { var e; for (e in t) return !1; return !0 }, r.isNumeric = function (t) { var e = Number(t), n = typeof t; return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1 }, r.inArray = function (t, e, n) { return o.indexOf.call(e, t, n) }, r.camelCase = O, r.trim = function (t) { return null == t ? "" : String.prototype.trim.call(t) }, r.uuid = 0, r.support = {}, r.expr = {}, r.noop = function () { }, r.map = function (t, e) { var n, i, o, r = []; if (z(t)) for (i = 0; i < t.length; i++)n = e(t[i], i), null != n && r.push(n); else for (o in t) n = e(t[o], o), null != n && r.push(n); return H(r) }, r.each = function (t, e) { var n, r; if (z(t)) { for (n = 0; n < t.length; n++)if (e.call(t[n], n, t[n]) === !1) return t } else for (r in t) if (e.call(t[r], r, t[r]) === !1) return t; return t }, r.grep = function (t, e) { return a.call(t, e) }, t.JSON && (r.parseJSON = JSON.parse), r.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) { S["[object " + e + "]"] = e.toLowerCase() }), r.fn = { constructor: N.Z, length: 0, forEach: o.forEach, reduce: o.reduce, push: o.push, sort: o.sort, splice: o.splice, indexOf: o.indexOf, concat: function () { var t, e, n = []; for (t = 0; t < arguments.length; t++)e = arguments[t], n[t] = N.isZ(e) ? e.toArray() : e; return s.apply(N.isZ(this) ? this.toArray() : this, n) }, map: function (t) { return r(r.map(this, function (e, n) { return t.call(e, n, e) })) }, slice: function () { return r(u.apply(this, arguments)) }, ready: function (t) { return w.test(f.readyState) && f.body ? t(r) : f.addEventListener("DOMContentLoaded", function () { t(r) }, !1), this }, get: function (t) { return t === e ? u.call(this) : this[t >= 0 ? t : t + this.length] }, toArray: function () { return this.get() }, size: function () { return this.length }, remove: function () { return this.each(function () { null != this.parentNode && this.parentNode.removeChild(this) }) }, each: function (t) { return o.every.call(this, function (e, n) { return t.call(e, n, e) !== !1 }), this }, filter: function (t) { return F(t) ? this.not(this.not(t)) : r(a.call(this, function (e) { return N.matches(e, t) })) }, add: function (t, e) { return r(P(this.concat(r(t, e)))) }, is: function (t) { return this.length > 0 && N.matches(this[0], t) }, not: function (t) { var n = []; if (F(t) && t.call !== e) this.each(function (e) { t.call(this, e) || n.push(this) }); else { var i = "string" == typeof t ? this.filter(t) : z(t) && F(t.item) ? u.call(t) : r(t); this.forEach(function (t) { i.indexOf(t) < 0 && n.push(t) }) } return r(n) }, has: function (t) { return this.filter(function () { return R(t) ? r.contains(this, t) : r(this).find(t).size() }) }, eq: function (t) { return -1 === t ? this.slice(t) : this.slice(t, +t + 1) }, first: function () { var t = this[0]; return t && !R(t) ? t : r(t) }, last: function () { var t = this[this.length - 1]; return t && !R(t) ? t : r(t) }, find: function (t) { var e, n = this; return e = t ? "object" == typeof t ? r(t).filter(function () { var t = this; return o.some.call(n, function (e) { return r.contains(e, t) }) }) : 1 == this.length ? r(N.qsa(this[0], t)) : this.map(function () { return N.qsa(this, t) }) : r() }, closest: function (t, e) { var n = [], i = "object" == typeof t && r(t); return this.each(function (r, o) { for (; o && !(i ? i.indexOf(o) >= 0 : N.matches(o, t));)o = o !== e && !M(o) && o.parentNode; o && n.indexOf(o) < 0 && n.push(o) }), r(n) }, parents: function (t) { for (var e = [], n = this; n.length > 0;)n = r.map(n, function (t) { return (t = t.parentNode) && !M(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0 }); return W(e, t) }, parent: function (t) { return W(P(this.pluck("parentNode")), t) }, children: function (t) { return W(this.map(function () { return U(this) }), t) }, contents: function () { return this.map(function () { return this.contentDocument || u.call(this.childNodes) }) }, siblings: function (t) { return W(this.map(function (t, e) { return a.call(U(e.parentNode), function (t) { return t !== e }) }), t) }, empty: function () { return this.each(function () { this.innerHTML = "" }) }, pluck: function (t) { return r.map(this, function (e) { return e[t] }) }, show: function () { return this.each(function () { "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = B(this.nodeName)) }) }, replaceWith: function (t) { return this.before(t).remove() }, wrap: function (t) { var e = F(t); if (this[0] && !e) var n = r(t).get(0), i = n.parentNode || this.length > 1; return this.each(function (o) { r(this).wrapAll(e ? t.call(this, o) : i ? n.cloneNode(!0) : n) }) }, wrapAll: function (t) { if (this[0]) { r(this[0]).before(t = r(t)); for (var e; (e = t.children()).length;)t = e.first(); r(t).append(this) } return this }, wrapInner: function (t) { var e = F(t); return this.each(function (n) { var i = r(this), o = i.contents(), s = e ? t.call(this, n) : t; o.length ? o.wrapAll(s) : i.append(s) }) }, unwrap: function () { return this.parent().each(function () { r(this).replaceWith(r(this).children()) }), this }, clone: function () { return this.map(function () { return this.cloneNode(!0) }) }, hide: function () { return this.css("display", "none") }, toggle: function (t) { return this.each(function () { var n = r(this); (t === e ? "none" == n.css("display") : t) ? n.show() : n.hide() }) }, prev: function (t) { return r(this.pluck("previousElementSibling")).filter(t || "*") }, next: function (t) { return r(this.pluck("nextElementSibling")).filter(t || "*") }, html: function (t) { return 0 in arguments ? this.each(function (e) { var n = this.innerHTML; r(this).empty().append(Y(this, t, e, n)) }) : 0 in this ? this[0].innerHTML : null }, text: function (t) { return 0 in arguments ? this.each(function (e) { var n = Y(this, t, e, this.textContent); this.textContent = null == n ? "" : "" + n }) : 0 in this ? this.pluck("textContent").join("") : null }, attr: function (t, r) { var i; return "string" != typeof t || 1 in arguments ? this.each(function (e) { if (1 === this.nodeType) if (R(t)) for (n in t) G(this, n, t[n]); else G(this, t, Y(this, r, e, this.getAttribute(t))) }) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(t)) ? i : e }, removeAttr: function (t) { return this.each(function () { 1 === this.nodeType && t.split(" ").forEach(function (t) { G(this, t) }, this) }) }, prop: function (t, e) { return t = D[t] || t, 1 in arguments ? this.each(function (n) { this[t] = Y(this, e, n, this[t]) }) : this[0] && this[0][t] }, removeProp: function (t) { return t = D[t] || t, this.each(function () { delete this[t] }) }, data: function (t, n) { var r = "data-" + t.replace(v, "-$1").toLowerCase(), i = 1 in arguments ? this.attr(r, n) : this.attr(r); return null !== i ? Q(i) : e }, val: function (t) { return 0 in arguments ? (null == t && (t = ""), this.each(function (e) { this.value = Y(this, t, e, this.value) })) : this[0] && (this[0].multiple ? r(this[0]).find("option").filter(function () { return this.selected }).pluck("value") : this[0].value) }, offset: function (e) { if (e) return this.each(function (t) { var n = r(this), i = Y(this, e, t, n.offset()), o = n.offsetParent().offset(), s = { top: i.top - o.top, left: i.left - o.left }; "static" == n.css("position") && (s.position = "relative"), n.css(s) }); if (!this.length) return null; if (f.documentElement !== this[0] && !r.contains(f.documentElement, this[0])) return { top: 0, left: 0 }; var n = this[0].getBoundingClientRect(); return { left: n.left + t.pageXOffset, top: n.top + t.pageYOffset, width: Math.round(n.width), height: Math.round(n.height) } }, css: function (t, e) { if (arguments.length < 2) { var i = this[0]; if ("string" == typeof t) { if (!i) return; return i.style[O(t)] || getComputedStyle(i, "").getPropertyValue(t) } if (L(t)) { if (!i) return; var o = {}, s = getComputedStyle(i, ""); return r.each(t, function (t, e) { o[e] = i.style[O(e)] || s.getPropertyValue(e) }), o } } var a = ""; if ("string" == $(t)) e || 0 === e ? a = I(t) + ":" + _(t, e) : this.each(function () { this.style.removeProperty(I(t)) }); else for (n in t) t[n] || 0 === t[n] ? a += I(n) + ":" + _(n, t[n]) + ";" : this.each(function () { this.style.removeProperty(I(n)) }); return this.each(function () { this.style.cssText += ";" + a }) }, index: function (t) { return t ? this.indexOf(r(t)[0]) : this.parent().children().indexOf(this[0]) }, hasClass: function (t) { return t ? o.some.call(this, function (t) { return this.test(K(t)) }, V(t)) : !1 }, addClass: function (t) { return t ? this.each(function (e) { if ("className" in this) { i = []; var n = K(this), o = Y(this, t, e, n); o.split(/\s+/g).forEach(function (t) { r(this).hasClass(t) || i.push(t) }, this), i.length && K(this, n + (n ? " " : "") + i.join(" ")) } }) : this }, removeClass: function (t) { return this.each(function (n) { if ("className" in this) { if (t === e) return K(this, ""); i = K(this), Y(this, t, n, i).split(/\s+/g).forEach(function (t) { i = i.replace(V(t), " ") }), K(this, i.trim()) } }) }, toggleClass: function (t, n) { return t ? this.each(function (i) { var o = r(this), s = Y(this, t, i, K(this)); s.split(/\s+/g).forEach(function (t) { (n === e ? !o.hasClass(t) : n) ? o.addClass(t) : o.removeClass(t) }) }) : this }, scrollTop: function (t) { if (this.length) { var n = "scrollTop" in this[0]; return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () { this.scrollTop = t } : function () { this.scrollTo(this.scrollX, t) }) } }, scrollLeft: function (t) { if (this.length) { var n = "scrollLeft" in this[0]; return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () { this.scrollLeft = t } : function () { this.scrollTo(t, this.scrollY) }) } }, position: function () { if (this.length) { var t = this[0], e = this.offsetParent(), n = this.offset(), i = g.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset(); return n.top -= parseFloat(r(t).css("margin-top")) || 0, n.left -= parseFloat(r(t).css("margin-left")) || 0, i.top += parseFloat(r(e[0]).css("border-top-width")) || 0, i.left += parseFloat(r(e[0]).css("border-left-width")) || 0, { top: n.top - i.top, left: n.left - i.left } } }, offsetParent: function () { return this.map(function () { for (var t = this.offsetParent || f.body; t && !g.test(t.nodeName) && "static" == r(t).css("position");)t = t.offsetParent; return t }) } }, r.fn.detach = r.fn.remove, ["width", "height"].forEach(function (t) { var n = t.replace(/./, function (t) { return t[0].toUpperCase() }); r.fn[t] = function (i) { var o, s = this[0]; return i === e ? k(s) ? s["inner" + n] : M(s) ? s.documentElement["scroll" + n] : (o = this.offset()) && o[t] : this.each(function (e) { s = r(this), s.css(t, Y(this, i, e, s[t]())) }) } }), x.forEach(function (n, i) { var o = i % 2; r.fn[n] = function () { var n, a, s = r.map(arguments, function (t) { var i = []; return n = $(t), "array" == n ? (t.forEach(function (t) { return t.nodeType !== e ? i.push(t) : r.zepto.isZ(t) ? i = i.concat(t.get()) : void (i = i.concat(N.fragment(t))) }), i) : "object" == n || null == t ? t : N.fragment(t) }), u = this.length > 1; return s.length < 1 ? this : this.each(function (e, n) { a = o ? n : n.parentNode, n = 0 == i ? n.nextSibling : 1 == i ? n.firstChild : 2 == i ? n : null; var c = r.contains(f.documentElement, a); s.forEach(function (e) { if (u) e = e.cloneNode(!0); else if (!a) return r(e).remove(); a.insertBefore(e, n), c && tt(e, function (e) { if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) { var n = e.ownerDocument ? e.ownerDocument.defaultView : t; n.eval.call(n, e.innerHTML) } }) }) }) }, r.fn[o ? n + "To" : "insert" + (i ? "Before" : "After")] = function (t) { return r(t)[n](this), this } }), N.Z.prototype = X.prototype = r.fn, N.uniq = P, N.deserializeValue = Q, r.zepto = N, r }(); return t.Zepto = e, void 0 === t.$ && (t.$ = e), function (e) { function h(t) { return t._zid || (t._zid = n++) } function p(t, e, n, r) { if (e = d(e), e.ns) var i = m(e.ns); return (a[h(t)] || []).filter(function (t) { return t && (!e.e || t.e == e.e) && (!e.ns || i.test(t.ns)) && (!n || h(t.fn) === h(n)) && (!r || t.sel == r) }) } function d(t) { var e = ("" + t).split("."); return { e: e[0], ns: e.slice(1).sort().join(" ") } } function m(t) { return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)") } function g(t, e) { return t.del && !f && t.e in c || !!e } function v(t) { return l[t] || f && c[t] || t } function y(t, n, i, o, s, u, f) { var c = h(t), p = a[c] || (a[c] = []); n.split(/\s/).forEach(function (n) { if ("ready" == n) return e(document).ready(i); var a = d(n); a.fn = i, a.sel = s, a.e in l && (i = function (t) { var n = t.relatedTarget; return !n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0 }), a.del = u; var c = u || i; a.proxy = function (e) { if (e = T(e), !e.isImmediatePropagationStopped()) { e.data = o; var n = c.apply(t, e._args == r ? [e] : [e].concat(e._args)); return n === !1 && (e.preventDefault(), e.stopPropagation()), n } }, a.i = p.length, p.push(a), "addEventListener" in t && t.addEventListener(v(a.e), a.proxy, g(a, f)) }) } function x(t, e, n, r, i) { var o = h(t); (e || "").split(/\s/).forEach(function (e) { p(t, e, n, r).forEach(function (e) { delete a[o][e.i], "removeEventListener" in t && t.removeEventListener(v(e.e), e.proxy, g(e, i)) }) }) } function T(t, n) { return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(w, function (e, r) { var i = n[e]; t[e] = function () { return this[r] = b, i && i.apply(n, arguments) }, t[r] = E }), t.timeStamp || (t.timeStamp = Date.now()), (n.defaultPrevented !== r ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = b)), t } function S(t) { var e, n = { originalEvent: t }; for (e in t) j.test(e) || t[e] === r || (n[e] = t[e]); return T(n, t) } var r, n = 1, i = Array.prototype.slice, o = e.isFunction, s = function (t) { return "string" == typeof t }, a = {}, u = {}, f = "onfocusin" in t, c = { focus: "focusin", blur: "focusout" }, l = { mouseenter: "mouseover", mouseleave: "mouseout" }; u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = { add: y, remove: x }, e.proxy = function (t, n) { var r = 2 in arguments && i.call(arguments, 2); if (o(t)) { var a = function () { return t.apply(n, r ? r.concat(i.call(arguments)) : arguments) }; return a._zid = h(t), a } if (s(n)) return r ? (r.unshift(t[n], t), e.proxy.apply(null, r)) : e.proxy(t[n], t); throw new TypeError("expected function") }, e.fn.bind = function (t, e, n) { return this.on(t, e, n) }, e.fn.unbind = function (t, e) { return this.off(t, e) }, e.fn.one = function (t, e, n, r) { return this.on(t, e, n, r, 1) }; var b = function () { return !0 }, E = function () { return !1 }, j = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/, w = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" }; e.fn.delegate = function (t, e, n) { return this.on(e, t, n) }, e.fn.undelegate = function (t, e, n) { return this.off(e, t, n) }, e.fn.live = function (t, n) { return e(document.body).delegate(this.selector, t, n), this }, e.fn.die = function (t, n) { return e(document.body).undelegate(this.selector, t, n), this }, e.fn.on = function (t, n, a, u, f) { var c, l, h = this; return t && !s(t) ? (e.each(t, function (t, e) { h.on(t, n, a, e, f) }), h) : (s(n) || o(u) || u === !1 || (u = a, a = n, n = r), (u === r || a === !1) && (u = a, a = r), u === !1 && (u = E), h.each(function (r, o) { f && (c = function (t) { return x(o, t.type, u), u.apply(this, arguments) }), n && (l = function (t) { var r, s = e(t.target).closest(n, o).get(0); return s && s !== o ? (r = e.extend(S(t), { currentTarget: s, liveFired: o }), (c || u).apply(s, [r].concat(i.call(arguments, 1)))) : void 0 }), y(o, t, u, a, n, l || c) })) }, e.fn.off = function (t, n, i) { var a = this; return t && !s(t) ? (e.each(t, function (t, e) { a.off(t, n, e) }), a) : (s(n) || o(i) || i === !1 || (i = n, n = r), i === !1 && (i = E), a.each(function () { x(this, t, i, n) })) }, e.fn.trigger = function (t, n) { return t = s(t) || e.isPlainObject(t) ? e.Event(t) : T(t), t._args = n, this.each(function () { t.type in c && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n) }) }, e.fn.triggerHandler = function (t, n) { var r, i; return this.each(function (o, a) { r = S(s(t) ? e.Event(t) : t), r._args = n, r.target = a, e.each(p(a, t.type || t), function (t, e) { return i = e.proxy(r), r.isImmediatePropagationStopped() ? !1 : void 0 }) }), i }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) { e.fn[t] = function (e) { return 0 in arguments ? this.bind(t, e) : this.trigger(t) } }), e.Event = function (t, e) { s(t) || (e = t, t = e.type); var n = document.createEvent(u[t] || "Events"), r = !0; if (e) for (var i in e) "bubbles" == i ? r = !!e[i] : n[i] = e[i]; return n.initEvent(t, r, !0), T(n) } }(e), function (e) { function p(t, n, r) { var i = e.Event(n); return e(t).trigger(i, r), !i.isDefaultPrevented() } function d(t, e, n, i) { return t.global ? p(e || r, n, i) : void 0 } function m(t) { t.global && 0 === e.active++ && d(t, null, "ajaxStart") } function g(t) { t.global && !--e.active && d(t, null, "ajaxStop") } function v(t, e) { var n = e.context; return e.beforeSend.call(n, t, e) === !1 || d(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void d(e, n, "ajaxSend", [t, e]) } function y(t, e, n, r) { var i = n.context, o = "success"; n.success.call(i, t, o, e), r && r.resolveWith(i, [t, o, e]), d(n, i, "ajaxSuccess", [e, n, t]), b(o, e, n) } function x(t, e, n, r, i) { var o = r.context; r.error.call(o, n, e, t), i && i.rejectWith(o, [n, e, t]), d(r, o, "ajaxError", [n, r, t || e]), b(e, n, r) } function b(t, e, n) { var r = n.context; n.complete.call(r, e, t), d(n, r, "ajaxComplete", [e, n]), g(n) } function E(t, e, n) { if (n.dataFilter == j) return t; var r = n.context; return n.dataFilter.call(r, t, e) } function j() { } function w(t) { return t && (t = t.split(";", 2)[0]), t && (t == c ? "html" : t == f ? "json" : a.test(t) ? "script" : u.test(t) && "xml") || "text" } function T(t, e) { return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?") } function S(t) { t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = T(t.url, t.data), t.data = void 0) } function C(t, n, r, i) { return e.isFunction(n) && (i = r, r = n, n = void 0), e.isFunction(r) || (i = r, r = void 0), { url: t, data: n, success: r, dataType: i } } function O(t, n, r, i) { var o, s = e.isArray(n), a = e.isPlainObject(n); e.each(n, function (n, u) { o = e.type(u), i && (n = r ? i : i + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !i && s ? t.add(u.name, u.value) : "array" == o || !r && "object" == o ? O(t, u, r, n) : t.add(n, u) }) } var i, o, n = +new Date, r = t.document, s = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, a = /^(?:text|application)\/javascript/i, u = /^(?:text|application)\/xml/i, f = "application/json", c = "text/html", l = /^\s*$/, h = r.createElement("a"); h.href = t.location.href, e.active = 0, e.ajaxJSONP = function (i, o) { if (!("type" in i)) return e.ajax(i); var c, p, s = i.jsonpCallback, a = (e.isFunction(s) ? s() : s) || "Zepto" + n++, u = r.createElement("script"), f = t[a], l = function (t) { e(u).triggerHandler("error", t || "abort") }, h = { abort: l }; return o && o.promise(h), e(u).on("load error", function (n, r) { clearTimeout(p), e(u).off().remove(), "error" != n.type && c ? y(c[0], h, i, o) : x(null, r || "error", h, i, o), t[a] = f, c && e.isFunction(f) && f(c[0]), f = c = void 0 }), v(h, i) === !1 ? (l("abort"), h) : (t[a] = function () { c = arguments }, u.src = i.url.replace(/\?(.+)=\?/, "?$1=" + a), r.head.appendChild(u), i.timeout > 0 && (p = setTimeout(function () { l("timeout") }, i.timeout)), h) }, e.ajaxSettings = { type: "GET", beforeSend: j, success: j, error: j, complete: j, context: null, global: !0, xhr: function () { return new t.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: f, xml: "application/xml, text/xml", html: c, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0, dataFilter: j }, e.ajax = function (n) { var u, f, s = e.extend({}, n || {}), a = e.Deferred && e.Deferred(); for (i in e.ajaxSettings) void 0 === s[i] && (s[i] = e.ajaxSettings[i]); m(s), s.crossDomain || (u = r.createElement("a"), u.href = s.url, u.href = u.href, s.crossDomain = h.protocol + "//" + h.host != u.protocol + "//" + u.host), s.url || (s.url = t.location.toString()), (f = s.url.indexOf("#")) > -1 && (s.url = s.url.slice(0, f)), S(s); var c = s.dataType, p = /\?.+=\?/.test(s.url); if (p && (c = "jsonp"), s.cache !== !1 && (n && n.cache === !0 || "script" != c && "jsonp" != c) || (s.url = T(s.url, "_=" + Date.now())), "jsonp" == c) return p || (s.url = T(s.url, s.jsonp ? s.jsonp + "=?" : s.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(s, a); var P, d = s.accepts[c], g = {}, b = function (t, e) { g[t.toLowerCase()] = [t, e] }, C = /^([\w-]+:)\/\//.test(s.url) ? RegExp.$1 : t.location.protocol, N = s.xhr(), O = N.setRequestHeader; if (a && a.promise(N), s.crossDomain || b("X-Requested-With", "XMLHttpRequest"), b("Accept", d || "*/*"), (d = s.mimeType || d) && (d.indexOf(",") > -1 && (d = d.split(",", 2)[0]), N.overrideMimeType && N.overrideMimeType(d)), (s.contentType || s.contentType !== !1 && s.data && "GET" != s.type.toUpperCase()) && b("Content-Type", s.contentType || "application/x-www-form-urlencoded"), s.headers) for (o in s.headers) b(o, s.headers[o]); if (N.setRequestHeader = b, N.onreadystatechange = function () { if (4 == N.readyState) { N.onreadystatechange = j, clearTimeout(P); var t, n = !1; if (N.status >= 200 && N.status < 300 || 304 == N.status || 0 == N.status && "file:" == C) { if (c = c || w(s.mimeType || N.getResponseHeader("content-type")), "arraybuffer" == N.responseType || "blob" == N.responseType) t = N.response; else { t = N.responseText; try { t = E(t, c, s), "script" == c ? (1, eval)(t) : "xml" == c ? t = N.responseXML : "json" == c && (t = l.test(t) ? null : e.parseJSON(t)) } catch (r) { n = r } if (n) return x(n, "parsererror", N, s, a) } y(t, N, s, a) } else x(N.statusText || null, N.status ? "error" : "abort", N, s, a) } }, v(N, s) === !1) return N.abort(), x(null, "abort", N, s, a), N; var A = "async" in s ? s.async : !0; if (N.open(s.type, s.url, A, s.username, s.password), s.xhrFields) for (o in s.xhrFields) N[o] = s.xhrFields[o]; for (o in g) O.apply(N, g[o]); return s.timeout > 0 && (P = setTimeout(function () { N.onreadystatechange = j, N.abort(), x(null, "timeout", N, s, a) }, s.timeout)), N.send(s.data ? s.data : null), N }, e.get = function () { return e.ajax(C.apply(null, arguments)) }, e.post = function () { var t = C.apply(null, arguments); return t.type = "POST", e.ajax(t) }, e.getJSON = function () { var t = C.apply(null, arguments); return t.dataType = "json", e.ajax(t) }, e.fn.load = function (t, n, r) { if (!this.length) return this; var a, i = this, o = t.split(/\s/), u = C(t, n, r), f = u.success; return o.length > 1 && (u.url = o[0], a = o[1]), u.success = function (t) { i.html(a ? e("<div>").html(t.replace(s, "")).find(a) : t), f && f.apply(i, arguments) }, e.ajax(u), this }; var N = encodeURIComponent; e.param = function (t, n) { var r = []; return r.add = function (t, n) { e.isFunction(n) && (n = n()), null == n && (n = ""), this.push(N(t) + "=" + N(n)) }, O(r, t, n), r.join("&").replace(/%20/g, "+") } }(e), function (t) { t.fn.serializeArray = function () { var e, n, r = [], i = function (t) { return t.forEach ? t.forEach(i) : void r.push({ name: e, value: t }) }; return this[0] && t.each(this[0].elements, function (r, o) { n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val()) }), r }, t.fn.serialize = function () { var t = []; return this.serializeArray().forEach(function (e) { t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)) }), t.join("&") }, t.fn.submit = function (e) { if (0 in arguments) this.bind("submit", e); else if (this.length) { var n = t.Event("submit"); this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit() } return this } }(e), function () { try { getComputedStyle(void 0) } catch (e) { var n = getComputedStyle; t.getComputedStyle = function (t, e) { try { return n(t, e) } catch (r) { return null } } } }(), e });
/* -- end zepto.js -- */

/*! nouislider - 9.1.0 - 2016-12-10 16:00:32 */
!function (a) { "function" == typeof define && define.amd ? define([], a) : "object" == typeof exports ? module.exports = a() : window.noUiSlider = a() }(function () { "use strict"; function a(a, b) { var c = document.createElement("div"); return j(c, b), a.appendChild(c), c } function b(a) { return a.filter(function (a) { return !this[a] && (this[a] = !0) }, {}) } function c(a, b) { return Math.round(a / b) * b } function d(a, b) { var c = a.getBoundingClientRect(), d = a.ownerDocument, e = d.documentElement, f = m(); return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (f.x = 0), b ? c.top + f.y - e.clientTop : c.left + f.x - e.clientLeft } function e(a) { return "number" == typeof a && !isNaN(a) && isFinite(a) } function f(a, b, c) { c > 0 && (j(a, b), setTimeout(function () { k(a, b) }, c)) } function g(a) { return Math.max(Math.min(a, 100), 0) } function h(a) { return Array.isArray(a) ? a : [a] } function i(a) { a = String(a); var b = a.split("."); return b.length > 1 ? b[1].length : 0 } function j(a, b) { a.classList ? a.classList.add(b) : a.className += " " + b } function k(a, b) { a.classList ? a.classList.remove(b) : a.className = a.className.replace(new RegExp("(^|\\b)" + b.split(" ").join("|") + "(\\b|$)", "gi"), " ") } function l(a, b) { return a.classList ? a.classList.contains(b) : new RegExp("\\b" + b + "\\b").test(a.className) } function m() { var a = void 0 !== window.pageXOffset, b = "CSS1Compat" === (document.compatMode || ""), c = a ? window.pageXOffset : b ? document.documentElement.scrollLeft : document.body.scrollLeft, d = a ? window.pageYOffset : b ? document.documentElement.scrollTop : document.body.scrollTop; return { x: c, y: d } } function n() { return window.navigator.pointerEnabled ? { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" } : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" } } function o(a, b) { return 100 / (b - a) } function p(a, b) { return 100 * b / (a[1] - a[0]) } function q(a, b) { return p(a, a[0] < 0 ? b + Math.abs(a[0]) : b - a[0]) } function r(a, b) { return b * (a[1] - a[0]) / 100 + a[0] } function s(a, b) { for (var c = 1; a >= b[c];)c += 1; return c } function t(a, b, c) { if (c >= a.slice(-1)[0]) return 100; var d, e, f, g, h = s(c, a); return d = a[h - 1], e = a[h], f = b[h - 1], g = b[h], f + q([d, e], c) / o(f, g) } function u(a, b, c) { if (c >= 100) return a.slice(-1)[0]; var d, e, f, g, h = s(c, b); return d = a[h - 1], e = a[h], f = b[h - 1], g = b[h], r([d, e], (c - f) * o(f, g)) } function v(a, b, d, e) { if (100 === e) return e; var f, g, h = s(e, a); return d ? (f = a[h - 1], g = a[h], e - f > (g - f) / 2 ? g : f) : b[h - 1] ? a[h - 1] + c(e - a[h - 1], b[h - 1]) : e } function w(a, b, c) { var d; if ("number" == typeof b && (b = [b]), "[object Array]" !== Object.prototype.toString.call(b)) throw new Error("noUiSlider: 'range' contains invalid value."); if (d = "min" === a ? 0 : "max" === a ? 100 : parseFloat(a), !e(d) || !e(b[0])) throw new Error("noUiSlider: 'range' value isn't numeric."); c.xPct.push(d), c.xVal.push(b[0]), d ? c.xSteps.push(!isNaN(b[1]) && b[1]) : isNaN(b[1]) || (c.xSteps[0] = b[1]), c.xHighestCompleteStep.push(0) } function x(a, b, c) { if (!b) return !0; c.xSteps[a] = p([c.xVal[a], c.xVal[a + 1]], b) / o(c.xPct[a], c.xPct[a + 1]); var d = (c.xVal[a + 1] - c.xVal[a]) / c.xNumSteps[a], e = Math.ceil(Number(d.toFixed(3)) - 1), f = c.xVal[a] + c.xNumSteps[a] * e; c.xHighestCompleteStep[a] = f } function y(a, b, c, d) { this.xPct = [], this.xVal = [], this.xSteps = [d || !1], this.xNumSteps = [!1], this.xHighestCompleteStep = [], this.snap = b, this.direction = c; var e, f = []; for (e in a) a.hasOwnProperty(e) && f.push([a[e], e]); for (f.length && "object" == typeof f[0][0] ? f.sort(function (a, b) { return a[0][0] - b[0][0] }) : f.sort(function (a, b) { return a[0] - b[0] }), e = 0; e < f.length; e++)w(f[e][1], f[e][0], this); for (this.xNumSteps = this.xSteps.slice(0), e = 0; e < this.xNumSteps.length; e++)x(e, this.xNumSteps[e], this) } function z(a, b) { if (!e(b)) throw new Error("noUiSlider: 'step' is not numeric."); a.singleStep = b } function A(a, b) { if ("object" != typeof b || Array.isArray(b)) throw new Error("noUiSlider: 'range' is not an object."); if (void 0 === b.min || void 0 === b.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'."); if (b.min === b.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal."); a.spectrum = new y(b, a.snap, a.dir, a.singleStep) } function B(a, b) { if (b = h(b), !Array.isArray(b) || !b.length) throw new Error("noUiSlider: 'start' option is incorrect."); a.handles = b.length, a.start = b } function C(a, b) { if (a.snap = b, "boolean" != typeof b) throw new Error("noUiSlider: 'snap' option must be a boolean.") } function D(a, b) { if (a.animate = b, "boolean" != typeof b) throw new Error("noUiSlider: 'animate' option must be a boolean.") } function E(a, b) { if (a.animationDuration = b, "number" != typeof b) throw new Error("noUiSlider: 'animationDuration' option must be a number.") } function F(a, b) { var c, d = [!1]; if ("lower" === b ? b = [!0, !1] : "upper" === b && (b = [!1, !0]), b === !0 || b === !1) { for (c = 1; c < a.handles; c++)d.push(b); d.push(!1) } else { if (!Array.isArray(b) || !b.length || b.length !== a.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); d = b } a.connect = d } function G(a, b) { switch (b) { case "horizontal": a.ort = 0; break; case "vertical": a.ort = 1; break; default: throw new Error("noUiSlider: 'orientation' option is invalid.") } } function H(a, b) { if (!e(b)) throw new Error("noUiSlider: 'margin' option must be numeric."); if (0 !== b && (a.margin = a.spectrum.getMargin(b), !a.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.") } function I(a, b) { if (!e(b)) throw new Error("noUiSlider: 'limit' option must be numeric."); if (a.limit = a.spectrum.getMargin(b), !a.limit || a.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.") } function J(a, b) { if (!e(b)) throw new Error("noUiSlider: 'padding' option must be numeric."); if (0 !== b) { if (a.padding = a.spectrum.getMargin(b), !a.padding) throw new Error("noUiSlider: 'padding' option is only supported on linear sliders."); if (a.padding < 0) throw new Error("noUiSlider: 'padding' option must be a positive number."); if (a.padding >= 50) throw new Error("noUiSlider: 'padding' option must be less than half the range.") } } function K(a, b) { switch (b) { case "ltr": a.dir = 0; break; case "rtl": a.dir = 1; break; default: throw new Error("noUiSlider: 'direction' option was not recognized.") } } function L(a, b) { if ("string" != typeof b) throw new Error("noUiSlider: 'behaviour' must be a string containing options."); var c = b.indexOf("tap") >= 0, d = b.indexOf("drag") >= 0, e = b.indexOf("fixed") >= 0, f = b.indexOf("snap") >= 0, g = b.indexOf("hover") >= 0; if (e) { if (2 !== a.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles"); H(a, a.start[1] - a.start[0]) } a.events = { tap: c || f, drag: d, fixed: e, snap: f, hover: g } } function M(a, b) { if (b !== !1) if (b === !0) { a.tooltips = []; for (var c = 0; c < a.handles; c++)a.tooltips.push(!0) } else { if (a.tooltips = h(b), a.tooltips.length !== a.handles) throw new Error("noUiSlider: must pass a formatter for all handles."); a.tooltips.forEach(function (a) { if ("boolean" != typeof a && ("object" != typeof a || "function" != typeof a.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.") }) } } function N(a, b) { if (a.format = b, "function" == typeof b.to && "function" == typeof b.from) return !0; throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.") } function O(a, b) { if (void 0 !== b && "string" != typeof b && b !== !1) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`."); a.cssPrefix = b } function P(a, b) { if (void 0 !== b && "object" != typeof b) throw new Error("noUiSlider: 'cssClasses' must be an object."); if ("string" == typeof a.cssPrefix) { a.cssClasses = {}; for (var c in b) b.hasOwnProperty(c) && (a.cssClasses[c] = a.cssPrefix + b[c]) } else a.cssClasses = b } function Q(a, b) { if (b !== !0 && b !== !1) throw new Error("noUiSlider: 'useRequestAnimationFrame' option should be true (default) or false."); a.useRequestAnimationFrame = b } function R(a) { var b = { margin: 0, limit: 0, padding: 0, animate: !0, animationDuration: 300, format: U }, c = { step: { r: !1, t: z }, start: { r: !0, t: B }, connect: { r: !0, t: F }, direction: { r: !0, t: K }, snap: { r: !1, t: C }, animate: { r: !1, t: D }, animationDuration: { r: !1, t: E }, range: { r: !0, t: A }, orientation: { r: !1, t: G }, margin: { r: !1, t: H }, limit: { r: !1, t: I }, padding: { r: !1, t: J }, behaviour: { r: !0, t: L }, format: { r: !1, t: N }, tooltips: { r: !1, t: M }, cssPrefix: { r: !1, t: O }, cssClasses: { r: !1, t: P }, useRequestAnimationFrame: { r: !1, t: Q } }, d = { connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal", cssPrefix: "noUi-", cssClasses: { target: "target", base: "base", origin: "origin", handle: "handle", handleLower: "handle-lower", handleUpper: "handle-upper", horizontal: "horizontal", vertical: "vertical", background: "background", connect: "connect", ltr: "ltr", rtl: "rtl", draggable: "draggable", drag: "state-drag", tap: "state-tap", active: "active", tooltip: "tooltip", pips: "pips", pipsHorizontal: "pips-horizontal", pipsVertical: "pips-vertical", marker: "marker", markerHorizontal: "marker-horizontal", markerVertical: "marker-vertical", markerNormal: "marker-normal", markerLarge: "marker-large", markerSub: "marker-sub", value: "value", valueHorizontal: "value-horizontal", valueVertical: "value-vertical", valueNormal: "value-normal", valueLarge: "value-large", valueSub: "value-sub" }, useRequestAnimationFrame: !0 }; Object.keys(c).forEach(function (e) { if (void 0 === a[e] && void 0 === d[e]) { if (c[e].r) throw new Error("noUiSlider: '" + e + "' is required."); return !0 } c[e].t(b, void 0 === a[e] ? d[e] : a[e]) }), b.pips = a.pips; var e = [["left", "top"], ["right", "bottom"]]; return b.style = e[b.dir][b.ort], b.styleOposite = e[b.dir ? 0 : 1][b.ort], b } function S(c, e, i) { function o(b, c) { var d = a(b, e.cssClasses.origin), f = a(d, e.cssClasses.handle); return f.setAttribute("data-handle", c), 0 === c ? j(f, e.cssClasses.handleLower) : c === e.handles - 1 && j(f, e.cssClasses.handleUpper), d } function p(b, c) { return !!c && a(b, e.cssClasses.connect) } function q(a, b) { ba = [], ca = [], ca.push(p(b, a[0])); for (var c = 0; c < e.handles; c++)ba.push(o(b, c)), ha[c] = c, ca.push(p(b, a[c + 1])) } function r(b) { j(b, e.cssClasses.target), 0 === e.dir ? j(b, e.cssClasses.ltr) : j(b, e.cssClasses.rtl), 0 === e.ort ? j(b, e.cssClasses.horizontal) : j(b, e.cssClasses.vertical), aa = a(b, e.cssClasses.base) } function s(b, c) { return !!e.tooltips[c] && a(b.firstChild, e.cssClasses.tooltip) } function t() { var a = ba.map(s); Z("update", function (b, c, d) { if (a[c]) { var f = b[c]; e.tooltips[c] !== !0 && (f = e.tooltips[c].to(d[c])), a[c].innerHTML = f } }) } function u(a, b, c) { if ("range" === a || "steps" === a) return ja.xVal; if ("count" === a) { var d, e = 100 / (b - 1), f = 0; for (b = []; (d = f++ * e) <= 100;)b.push(d); a = "positions" } return "positions" === a ? b.map(function (a) { return ja.fromStepping(c ? ja.getStep(a) : a) }) : "values" === a ? c ? b.map(function (a) { return ja.fromStepping(ja.getStep(ja.toStepping(a))) }) : b : void 0 } function v(a, c, d) { function e(a, b) { return (a + b).toFixed(7) / 1 } var f = {}, g = ja.xVal[0], h = ja.xVal[ja.xVal.length - 1], i = !1, j = !1, k = 0; return d = b(d.slice().sort(function (a, b) { return a - b })), d[0] !== g && (d.unshift(g), i = !0), d[d.length - 1] !== h && (d.push(h), j = !0), d.forEach(function (b, g) { var h, l, m, n, o, p, q, r, s, t, u = b, v = d[g + 1]; if ("steps" === c && (h = ja.xNumSteps[g]), h || (h = v - u), u !== !1 && void 0 !== v) for (h = Math.max(h, 1e-7), l = u; l <= v; l = e(l, h)) { for (n = ja.toStepping(l), o = n - k, r = o / a, s = Math.round(r), t = o / s, m = 1; m <= s; m += 1)p = k + m * t, f[p.toFixed(5)] = ["x", 0]; q = d.indexOf(l) > -1 ? 1 : "steps" === c ? 2 : 0, !g && i && (q = 0), l === v && j || (f[n.toFixed(5)] = [l, q]), k = n } }), f } function w(a, b, c) { function d(a, b) { var c = b === e.cssClasses.value, d = c ? m : n, f = c ? k : l; return b + " " + d[e.ort] + " " + f[a] } function f(a, b, c) { return 'class="' + d(c[1], b) + '" style="' + e.style + ": " + a + '%"' } function g(a, d) { d[1] = d[1] && b ? b(d[0], d[1]) : d[1], i += "<div " + f(a, e.cssClasses.marker, d) + "></div>", d[1] && (i += "<div " + f(a, e.cssClasses.value, d) + ">" + c.to(d[0]) + "</div>") } var h = document.createElement("div"), i = "", k = [e.cssClasses.valueNormal, e.cssClasses.valueLarge, e.cssClasses.valueSub], l = [e.cssClasses.markerNormal, e.cssClasses.markerLarge, e.cssClasses.markerSub], m = [e.cssClasses.valueHorizontal, e.cssClasses.valueVertical], n = [e.cssClasses.markerHorizontal, e.cssClasses.markerVertical]; return j(h, e.cssClasses.pips), j(h, 0 === e.ort ? e.cssClasses.pipsHorizontal : e.cssClasses.pipsVertical), Object.keys(a).forEach(function (b) { g(b, a[b]) }), h.innerHTML = i, h } function x(a) { var b = a.mode, c = a.density || 1, d = a.filter || !1, e = a.values || !1, f = a.stepped || !1, g = u(b, e, f), h = v(c, b, g), i = a.format || { to: Math.round }; return fa.appendChild(w(h, d, i)) } function y() { var a = aa.getBoundingClientRect(), b = "offset" + ["Width", "Height"][e.ort]; return 0 === e.ort ? a.width || aa[b] : a.height || aa[b] } function z(a, b, c, d) { var f = function (b) { return !fa.hasAttribute("disabled") && (!l(fa, e.cssClasses.tap) && (!!(b = A(b, d.pageOffset)) && (!(a === ea.start && void 0 !== b.buttons && b.buttons > 1) && ((!d.hover || !b.buttons) && (b.calcPoint = b.points[e.ort], void c(b, d)))))) }, g = []; return a.split(" ").forEach(function (a) { b.addEventListener(a, f, !1), g.push([a, f]) }), g } function A(a, b) { a.preventDefault(); var c, d, e = 0 === a.type.indexOf("touch"), f = 0 === a.type.indexOf("mouse"), g = 0 === a.type.indexOf("pointer"); if (0 === a.type.indexOf("MSPointer") && (g = !0), e) { if (a.touches.length > 1) return !1; c = a.changedTouches[0].pageX, d = a.changedTouches[0].pageY } return b = b || m(), (f || g) && (c = a.clientX + b.x, d = a.clientY + b.y), a.pageOffset = b, a.points = [c, d], a.cursor = f || g, a } function B(a) { var b = a - d(aa, e.ort), c = 100 * b / y(); return e.dir ? 100 - c : c } function C(a) { var b = 100, c = !1; return ba.forEach(function (d, e) { if (!d.hasAttribute("disabled")) { var f = Math.abs(ga[e] - a); f < b && (c = e, b = f) } }), c } function D(a, b, c, d) { var e = c.slice(), f = [!a, a], g = [a, !a]; d = d.slice(), a && d.reverse(), d.length > 1 ? d.forEach(function (a, c) { var d = M(e, a, e[a] + b, f[c], g[c]); d === !1 ? b = 0 : (b = d - e[a], e[a] = d) }) : f = g = [!0]; var h = !1; d.forEach(function (a, d) { h = Q(a, c[a] + b, f[d], g[d]) || h }), h && d.forEach(function (a) { E("update", a), E("slide", a) }) } function E(a, b, c) { Object.keys(la).forEach(function (d) { var f = d.split(".")[0]; a === f && la[d].forEach(function (a) { a.call(da, ka.map(e.format.to), b, ka.slice(), c || !1, ga.slice()) }) }) } function F(a, b) { "mouseout" === a.type && "HTML" === a.target.nodeName && null === a.relatedTarget && H(a, b) } function G(a, b) { if (navigator.appVersion.indexOf("MSIE 9") === -1 && 0 === a.buttons && 0 !== b.buttonsProperty) return H(a, b); var c = (e.dir ? -1 : 1) * (a.calcPoint - b.startCalcPoint), d = 100 * c / b.baseSize; D(c > 0, d, b.locations, b.handleNumbers) } function H(a, b) { ia && (k(ia, e.cssClasses.active), ia = !1), a.cursor && (document.body.style.cursor = "", document.body.removeEventListener("selectstart", document.body.noUiListener)), document.documentElement.noUiListeners.forEach(function (a) { document.documentElement.removeEventListener(a[0], a[1]) }), k(fa, e.cssClasses.drag), P(), b.handleNumbers.forEach(function (a) { E("set", a), E("change", a), E("end", a) }) } function I(a, b) { if (1 === b.handleNumbers.length) { var c = ba[b.handleNumbers[0]]; if (c.hasAttribute("disabled")) return !1; ia = c.children[0], j(ia, e.cssClasses.active) } a.preventDefault(), a.stopPropagation(); var d = z(ea.move, document.documentElement, G, { startCalcPoint: a.calcPoint, baseSize: y(), pageOffset: a.pageOffset, handleNumbers: b.handleNumbers, buttonsProperty: a.buttons, locations: ga.slice() }), f = z(ea.end, document.documentElement, H, { handleNumbers: b.handleNumbers }), g = z("mouseout", document.documentElement, F, { handleNumbers: b.handleNumbers }); if (document.documentElement.noUiListeners = d.concat(f, g), a.cursor) { document.body.style.cursor = getComputedStyle(a.target).cursor, ba.length > 1 && j(fa, e.cssClasses.drag); var h = function () { return !1 }; document.body.noUiListener = h, document.body.addEventListener("selectstart", h, !1) } b.handleNumbers.forEach(function (a) { E("start", a) }) } function J(a) { a.stopPropagation(); var b = B(a.calcPoint), c = C(b); return c !== !1 && (e.events.snap || f(fa, e.cssClasses.tap, e.animationDuration), Q(c, b, !0, !0), P(), E("slide", c, !0), E("set", c, !0), E("change", c, !0), E("update", c, !0), void (e.events.snap && I(a, { handleNumbers: [c] }))) } function K(a) { var b = B(a.calcPoint), c = ja.getStep(b), d = ja.fromStepping(c); Object.keys(la).forEach(function (a) { "hover" === a.split(".")[0] && la[a].forEach(function (a) { a.call(da, d) }) }) } function L(a) { a.fixed || ba.forEach(function (a, b) { z(ea.start, a.children[0], I, { handleNumbers: [b] }) }), a.tap && z(ea.start, aa, J, {}), a.hover && z(ea.move, aa, K, { hover: !0 }), a.drag && ca.forEach(function (b, c) { if (b !== !1 && 0 !== c && c !== ca.length - 1) { var d = ba[c - 1], f = ba[c], g = [b]; j(b, e.cssClasses.draggable), a.fixed && (g.push(d.children[0]), g.push(f.children[0])), g.forEach(function (a) { z(ea.start, a, I, { handles: [d, f], handleNumbers: [c - 1, c] }) }) } }) } function M(a, b, c, d, f) { return ba.length > 1 && (d && b > 0 && (c = Math.max(c, a[b - 1] + e.margin)), f && b < ba.length - 1 && (c = Math.min(c, a[b + 1] - e.margin))), ba.length > 1 && e.limit && (d && b > 0 && (c = Math.min(c, a[b - 1] + e.limit)), f && b < ba.length - 1 && (c = Math.max(c, a[b + 1] - e.limit))), e.padding && (0 === b && (c = Math.max(c, e.padding)), b === ba.length - 1 && (c = Math.min(c, 100 - e.padding))), c = ja.getStep(c), c = g(c), c !== a[b] && c } function N(a) { return a + "%" } function O(a, b) { ga[a] = b, ka[a] = ja.fromStepping(b); var c = function () { ba[a].style[e.style] = N(b), S(a), S(a + 1) }; window.requestAnimationFrame && e.useRequestAnimationFrame ? window.requestAnimationFrame(c) : c() } function P() { ha.forEach(function (a) { var b = ga[a] > 50 ? -1 : 1, c = 3 + (ba.length + b * a); ba[a].childNodes[0].style.zIndex = c }) } function Q(a, b, c, d) { return b = M(ga, a, b, c, d), b !== !1 && (O(a, b), !0) } function S(a) { if (ca[a]) { var b = 0, c = 100; 0 !== a && (b = ga[a - 1]), a !== ca.length - 1 && (c = ga[a]), ca[a].style[e.style] = N(b), ca[a].style[e.styleOposite] = N(100 - c) } } function T(a, b) { null !== a && a !== !1 && ("number" == typeof a && (a = String(a)), a = e.format.from(a), a === !1 || isNaN(a) || Q(b, ja.toStepping(a), !1, !1)) } function U(a, b) { var c = h(a), d = void 0 === ga[0]; b = void 0 === b || !!b, c.forEach(T), e.animate && !d && f(fa, e.cssClasses.tap, e.animationDuration), ha.forEach(function (a) { Q(a, ga[a], !0, !1) }), P(), ha.forEach(function (a) { E("update", a), null !== c[a] && b && E("set", a) }) } function V(a) { U(e.start, a) } function W() { var a = ka.map(e.format.to); return 1 === a.length ? a[0] : a } function X() { for (var a in e.cssClasses) e.cssClasses.hasOwnProperty(a) && k(fa, e.cssClasses[a]); for (; fa.firstChild;)fa.removeChild(fa.firstChild); delete fa.noUiSlider } function Y() { return ga.map(function (a, b) { var c = ja.getNearbySteps(a), d = ka[b], e = c.thisStep.step, f = null; e !== !1 && d + e > c.stepAfter.startValue && (e = c.stepAfter.startValue - d), f = d > c.thisStep.startValue ? c.thisStep.step : c.stepBefore.step !== !1 && d - c.stepBefore.highestStep, 100 === a ? e = null : 0 === a && (f = null); var g = ja.countStepDecimals(); return null !== e && e !== !1 && (e = Number(e.toFixed(g))), null !== f && f !== !1 && (f = Number(f.toFixed(g))), [f, e] }) } function Z(a, b) { la[a] = la[a] || [], la[a].push(b), "update" === a.split(".")[0] && ba.forEach(function (a, b) { E("update", b) }) } function $(a) { var b = a && a.split(".")[0], c = b && a.substring(b.length); Object.keys(la).forEach(function (a) { var d = a.split(".")[0], e = a.substring(d.length); b && b !== d || c && c !== e || delete la[a] }) } function _(a, b) { var c = W(), d = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format"]; d.forEach(function (b) { void 0 !== a[b] && (i[b] = a[b]) }); var f = R(i); d.forEach(function (b) { void 0 !== a[b] && (e[b] = f[b]) }), f.spectrum.direction = ja.direction, ja = f.spectrum, e.margin = f.margin, e.limit = f.limit, e.padding = f.padding, ga = [], U(a.start || c, b) } var aa, ba, ca, da, ea = n(), fa = c, ga = [], ha = [], ia = !1, ja = e.spectrum, ka = [], la = {}; if (fa.noUiSlider) throw new Error("Slider was already initialized."); return r(fa), q(e.connect, aa), da = { destroy: X, steps: Y, on: Z, off: $, get: W, set: U, reset: V, __moveHandles: function (a, b, c) { D(a, b, ga, c) }, options: i, updateOptions: _, target: fa, pips: x }, L(e.events), U(e.start), e.pips && x(e.pips), e.tooltips && t(), da } function T(a, b) { if (!a.nodeName) throw new Error("noUiSlider.create requires a single element."); var c = R(b, a), d = S(a, c, b); return a.noUiSlider = d, d } y.prototype.getMargin = function (a) { var b = this.xNumSteps[0]; if (b && a / b % 1 !== 0) throw new Error("noUiSlider: 'limit', 'margin' and 'padding' must be divisible by step."); return 2 === this.xPct.length && p(this.xVal, a) }, y.prototype.toStepping = function (a) { return a = t(this.xVal, this.xPct, a) }, y.prototype.fromStepping = function (a) { return u(this.xVal, this.xPct, a) }, y.prototype.getStep = function (a) { return a = v(this.xPct, this.xSteps, this.snap, a) }, y.prototype.getNearbySteps = function (a) { var b = s(a, this.xPct); return { stepBefore: { startValue: this.xVal[b - 2], step: this.xNumSteps[b - 2], highestStep: this.xHighestCompleteStep[b - 2] }, thisStep: { startValue: this.xVal[b - 1], step: this.xNumSteps[b - 1], highestStep: this.xHighestCompleteStep[b - 1] }, stepAfter: { startValue: this.xVal[b - 0], step: this.xNumSteps[b - 0], highestStep: this.xHighestCompleteStep[b - 0] } } }, y.prototype.countStepDecimals = function () { var a = this.xNumSteps.map(i); return Math.max.apply(null, a) }, y.prototype.convert = function (a) { return this.getStep(this.toStepping(a)) }; var U = { to: function (a) { return void 0 !== a && a.toFixed(2) }, from: Number }; return { create: T } });

/* --  J42 -- */
var J42R = { defaultLang: "en", cookievalid: 864e5, text: {}, extractLang: function (t) { var n; for (var e in t) { var i = t[e].split("="); "lang" === i[0] && (n = i[1].length > 2 ? i[1].charAt(0) + i[1].charAt(1) : i[1]) } return n }, getUrlLang: function () { return window.location.search.length < 2 ? void 0 : this.extractLang(window.location.search.substring(1).split("&")) }, getCookieLang: function () { return this.extractLang(document.cookie.split("; ")) }, getLang: function () { return "string" != typeof this.lang && ("string" == typeof (this.lang = this.getUrlLang()) || "string" == typeof (this.lang = this.getCookieLang()) || "string" == typeof (this.lang = navigator.language) || "string" == typeof (this.lang = navigator.userLanguage) || (this.lang = this.defaultLang), this.lang.length > 2 && (this.lang = this.lang.charAt(0) + this.lang.charAt(1))), this.lang }, setLang: function (t, n) { if (this.lang = t, n) { var e = window.location, i = new Date, a = i.getTime(); a += this.cookievalid, i.setTime(a), document.cookie = "lang=" + t + ";path=" + e.pathname + ";domain=" + e.host + ";expires=" + i.toGMTString() } return this }, load: function () { var t = this, n = this.getLang(); return $.ajax({ url: "I18N_" + n + ".json", type: "GET", dataType: "json", cache: !0, async: !1, contentType: "application/json; charset=utf-8", success: function (e) { t.put(n, e).t() }, error: function (e, i) { t.put(n, {}).t() } }), this }, put: function (t, n) { if ("string" == typeof t && "object" == typeof n) { var e = {}; e[t] = n } else e = t; return this.text = $.extend(!0, this.text, e), this }, get: function (t) { for (var n = t.split("."), e = this.getLang(), i = this.text[e]; "undefined" != typeof i && n.length > 0;)i = i[n.shift()]; return "undefined" == typeof i ? t : i }, t1: function (t) { if ("object" == typeof t && t instanceof Element) { var n = $(t), e = n.attr("i18n"); n.removeClass("I18N"), ("undefined" == typeof e || null == e) && (e = n.text()), n.attr("i18n", e).text(this.get(e)) } return this }, t: function (t) { if ("undefined" == typeof this.text[this.getLang()]) return this.load(), this; if ("undefined" == typeof t) { t = $("[I18N]"); $(".I18N"); $(".I18N").each(function (n) { contains(t, this) || (t = t.add(this)) }) } if ($.zepto.isZ(t)) for (var n in t) this.t1(t[n]); else this.t1(t); return this } };

var language = ["en","de","pl","cs"];
var daysArr = ["time.days.6", "time.days.0", "time.days.1", "time.days.2", "time.days.3", "time.days.4", "time.days.5"];
var monthsArr = ["time.months.0", "time.months.1", "time.months.2", "time.months.3", "time.months.4", "time.months.5", "time.months.6", "time.months.7", "time.months.8", "time.months.9", "time.months.10", "time.months.11"];
var weeksArr = ["time.weeks.4", "time.weeks.0", "time.weeks.1", "time.weeks.2", "time.weeks.3",];
var dateFormat = ["DD.MM.YY", "DD/MM/YY", "DD-MM-YY", "YY/MM/DD", "YY-MM-DD"];
var timeFormat = ["HH:MI:SS P", "HH.MI:SS P", "HH24:MI:SS", "HH24.MI:SS", "HH:MI P", "HH.MI P", "HH24:MI", "HH24.MI"];
var timezone = ["GMT-12", "GMT-11", "GMT-10", "GMT-9", "GMT-8", "GMT-7", "GMT-6", "GMT-5", "GMT-4", "GMT-3.5", "GMT-3", "GMT-2", "GMT-1", "GMT", "GMT+1", "GMT+2", "GMT+3", "GMT+3.5", "GMT+4", "GMT+4.5", "GMT+5", "GMT+5.5", "GMT+5.75", "GMT+6", "GMT+6.5", "GMT+7", "GMT+8", "GMT+9", "GMT+9.5", "GMT+10", "GMT+11", "GMT+12", "GMT+13"];
var tzminute = [-720, -660, -600, -540, -480, -420, -360, -300, -240, -210, -180, -120, -60, 0, 60, 120, 180, 210, 240, 270, 300, 330, 345, 360, 390, 420, 480, 540, 570, 600, 660, 720, 780];

var timertime = 0;
var timersken = 0;
var currAp="";

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

function showResult(id, text, tout) {
    $(id).text(text);
    setTimeout(function () {
        $(id).text("");
    }, tout);
}

function pad(pad, str, padLeft) {
    if (typeof str === 'undefined')
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function isRealValue(obj) {
    return obj && obj !== "null" && obj !== "undefined";
}

$("#aps").on('click', 'div', function (e) {
    e.preventDefault();
    $("#input-ssid").attr("placeholder", "").val($(this).find('span').text());
    $("#input-wifi-pwd").focus();
});

function createInputForAp(ap) {
    if (ap.essid == "" && ap.rssi == 0) return;

    //var input = $("<input>", { type:"radio", name:"ssid", value:ap.essid, id:"opt-" + ap.essid});
    //if (currAp == ap.essid) input.checked = "1";
    var rssiVal = -Math.floor(ap.rssi / 37) * 32;
    var bars = $("<span>", { class: "aps lock-icon", css: { backgroundPosition: "0px " + rssiVal + "px;" } });

    var rssi = $("<span>", { text: " " + ap.rssi + " dB " });

    var encVal = "-64"; //assume wpa/wpa2
    if (ap.enc == "0") encVal = "0"; //open
    if (ap.enc == "5") encVal = "-32"; //wep
    var encrypt = $("<span>", { class: "aps lock-icon", css: { backgroundPosition: "-32px " + encVal + "px;" } });

    //var label =  $("<label>", {for:"opt-" + ap.essid});
    var label = $("<span>", {class: "aps", style: "cursor: pointer; text-decoration: underline;" });
    //onclick:"setWiFiSSID('"+ap.essid+"');return false;", 
    var div = $("<div>", { style: "cursor: pointer;" });

    label.text(ap.essid);
    div.append(bars);
    //div.append(rssi);
    div.append(encrypt);
    div.append(label);    
    return div;
}

function getSelectedEssid() {
    var e = document.forms.wifiform.elements;
    for (var i = 0; i < e.length; i++) {
        if (e[i].type == "radio" && e[i].checked) return e[i].value;
    }
    return currAp;
}

function scanAPs() {
    $("#apscan").show();
    $.ajax({
        url: 'wifiscan.cgi',
        type: "GET",
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            currAp = getSelectedEssid();
            if (data.inProgress == "0" && data.APs.length > 1) {
                $("#aps").html("");
                $("#apscan").hide();
                for (var i = 0; i < data.APs.length; i++) {
                    if (data.APs[i].essid == "" && data.APs[i].rssi == 0) continue;
                    $("#aps").append(createInputForAp(data.APs[i]));
                }
                clearTimeout
                timersken = window.setTimeout(scanAPs, 60000);
            } else {
                timersken = window.setTimeout(scanAPs, 5000);
            }
        },
        error: function (xhr, type) {
            console.log(xhr);
            console.log(type);
        }
    });
}

function getWifiInfo() {
    $.ajax({
        url: 'wifistatus.cgi',
        type: "GET",
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            showWifiInfo(data);
        },
        error: function (xhr, type) {
            console.log(xhr);
        }
    });
}

function showWifiInfo(data) {
    for (x in data) {
        if (x.substring(0, 5) == "i18n_") {
            $("#wifi-" + x).text(J42R.get("wifi."+x+"."+data[x]));
        } else {
            $("#wifi-" + x).text(data[x]);        
        }
    }

    $("#wifi-spinner").hide();
    $("#wifi-table").show();
    currAp = data.ssid;
    if (data['i18n_mode'] == 1) {
        if ($("#apmode .Switch").hasClass("Off")) {
            $('#apmode .Switch').toggleClass('Off').toggleClass('On');
            var text = J42R.get('wifi.assoc') + ' ' + currAp;
            $('#wifi-assoc').text(text);
            $("#input-apmode").val('1');
        }
        $("#setapip").hide();
        $(".setwifi").show();
        $("#apSubmit").hide();
        //run scan
        scanAPs();
    } else {
        $("#input-apmode").val('2');
        $("#apSubmit").show();
        $("#wifi-ap-ip").attr("placeholder", "").val(data['apIp']);
    }

}

function pSelectBox(x, arr, y, z, sel) {
    var BreakException = {};
    y = typeof y !== 'undefined' ? y : 999;
    z = typeof z !== 'undefined' ? z : 0;
    if (z == null) z = 0;
    sel = typeof sel !== 'undefined' ? sel : true;
    $(x).empty();
    if (sel === true) $(x).append($('<option>').text("Select"));
    try {
        arr.forEach(function (entry) {
            $(x).append($('<option>').text(J42R.get(entry)).attr('value', z));
            if (y == z) throw BreakException;
            z++;
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }
}



$("select[name='lang']").on("change", function () {
    console.log(language[this.value]);
    J42R.setLang(language[this.value], true).t();
    populateSelectBox();
    var _data = $("#langform").serialize();
    $.ajax({
        type: 'POST',
        url: 'setlang.cgi',
        data: _data,
        cache: false,
        success: function (data) {
            showResult('#lang-save-result', "Saved", 10000);
            console.log(data);
            //TODO: doplnit zobrazeni OK
        },
        error: function (xhr, type) {
            showResult('#lang-save-result', "Error", 10000);
            console.log("Error", xhr);
        }
    });
});

function getConfig() {
    $.ajax({
        url: 'getconfig.cgi',
        type: "GET",
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            config = data;
            showConfigData();
        },
        error: function (xhr, type) {
            console.log(xhr);
        }
    });
}

$('#dhcpOnOff .Switch').click(function () {
    $('#dhcpOnOff .Switch').toggleClass('On').toggleClass('Off');
    if ($("#dhcpOnOff .Switch").hasClass("On")) {
        $("#setip").hide();
        $("#input-dhcponoff").val('1');
    } else {
        $("#setip").show();
        $("#input-dhcponoff").val('0');
    }
});

$('#apExt .Switch').click(function () {
    $('#apExt .Switch').toggleClass('On').toggleClass('Off');
    if ($("#apExt .Switch").hasClass("On")) {
        $("#apExtData").show();
    } else {
        $("#apExtData").hide();
    }
});

$('#ntpOnOff .Switch').click(function () {
    $('#ntpOnOff .Switch').toggleClass('On').toggleClass('Off');
    if ($("#ntpOnOff .Switch").hasClass("On")) {
        $("#time-set").hide();
        $("#time-setntp").show();
        $("#use-ntp").val('1');
    } else {
        $("#time-setntp").hide();
        $("#time-set").show();
        $("#use-ntp").val('0');
    }
});

$('#dstOnOff .Switch').click(function () {
    $('#dstOnOff .Switch').toggleClass('On').toggleClass('Off');
    if ($("#dstOnOff .Switch").hasClass("On")) {
        $("#set-dst").show();
        $("#use-dst").val('1');
        $("#timezone-set").hide();
    } else {
        $("#set-dst").hide();
        $("#use-dst").val('0');
        $("#timezone-set").show();
    }
});


$('#apmode .Switch').click(function () {
    $('#apmode .Switch').toggleClass('On').toggleClass('Off');
    if ($("#apmode .Switch").hasClass("On")) {
        $(".setwifi").show();
        $("#setapip").hide();
        $("#input-apmode").val('1');
        $("#apSubmit").hide();
        //run scan
        scanAPs();
    } else {
        $(".setwifi").hide();
        $("#setip").hide();
        $("#setapip").show();
        if ($("#dhcpOnOff .Switch").hasClass("Off")) {
            $('#dhcpOnOff .Switch').toggleClass('Off').toggleClass('On');
        }
        $("#input-apmode").val('2');
        $("#apSubmit").show();
        //stop scan
        window.clearTimeout(timersken);
    }
});

$('#wifiform').on('submit', function (e) {
    e.preventDefault();
    console.log("SEND");
    //prevent form from submitting
    var _data = $("#wifiform").serialize();
    console.log(_data);
    $.ajax({
        type: 'POST',
        url: 'wificonnect.cgi',
        data: _data,
        cache: false,
        dataType: "json",
        success: function (data) {
            //TODO: show spin
            console.log(data);
            setTimeout(function () {
                window.location.href = data.url;
            }, 2000);
        },
        error: function (xhr, type) {
            console.log(xhr);
        }
    });
});

function display_ct() {
    //todo: revize?
    $.ajax({
        type: 'GET',
        url: 'gettime.cgi',
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            unixtime = data.utc;
            unixtimestamp = data.utc;
            show_ct();
        },
        error: function (xhr, type) {
            console.log(xhr);
        }
    });
}

function show_ct() {
    var format = dateFormat[config.dtFormat] + " " + timeFormat[config.tmFormat];
    var x = new Date(unixtime * 1000);
    var m = x.getMonth() + 1;
    var mm = pad('00', m, true);
    var dd = pad('00', x.getDate(), true);
    var yyyy = x.getFullYear();
    var yy = yyyy - 2000;
    var mi = pad('00', x.getMinutes(), true);
    var hh24 = pad('00', x.getHours(), true);
    var hh = pad('00', x.getHours() == 12 ? 12 : x.getHours() % 12, true);
    var ss = pad('00', x.getSeconds(), true);
    var res = format.replace('YYYY', yyyy);
    var period = x.getHours() < 12 ? "am" : "pm";
    res = res.replace('YY', yy);
    res = res.replace('DD', dd);
    res = res.replace('MM', mm);
    res = res.replace('MO', J42R.get('month.' + m));
    res = res.replace('HH24', hh24);
    res = res.replace('HH', hh);
    res = res.replace('MI', mi);
    res = res.replace('SS', ss);
    res = res.replace('P', period);
    $("#showtime").text(res);
    if (unixtime++ == (unixtimestamp + 60)) {
        //if (isRealValue(timertime)) 
        window.clearTimeout(timertime);
        timertime = window.setTimeout('display_ct()', 1000);
    } else {
        timertime = window.setTimeout('show_ct()', 1000);
    }
}

function showCurrentTime() {
    var d = new Date();
    $("#dd").attr("placeholder", "").val(d.getDate());
    $("#mm").attr("placeholder", "").val(d.getMonth());
    $("#yy").attr("placeholder", "").val(d.getFullYear() - 2000);
    $("#hh").attr("placeholder", "").val(d.getHours());
    $("#mi").attr("placeholder", "").val(d.getMinutes());
}



function populateSelectBox() {
    pSelectBox('#dstStartDay', daysArr, 7, 1);
    pSelectBox('#dstEndDay', daysArr, 7, 1);
    pSelectBox('#mm', monthsArr);
    pSelectBox('#dstStartMonth', monthsArr, 12, 1);
    pSelectBox('#dstEndMonth', monthsArr, 12, 1);
    pSelectBox('#dstStartWeek', weeksArr);
    pSelectBox('#dstEndWeek', weeksArr);
    pSelectBox('#dateFormat', dateFormat);
    pSelectBox('#timeFormat', timeFormat);
    pSelectBox('#dstStartOffset', timezone);
    pSelectBox('#dstEndOffset', timezone);
    pSelectBox('#timezone', timezone);
}

function showConfigData() {

    J42R.setLang(language[config.lang], true).t();
    $('select#lang').val(config.lang);
    populateSelectBox();

    if (config.useNTP == true) {
        $('#ntpOnOff .Switch').removeClass('Off');
        $('#ntpOnOff .Switch').addClass('On');
        $('#time-setntp').show();
        $('#time-set').hide();
        $("#use-ntp").val('1');
    } else {
        $('#ntpOnOff .Switch').removeClass('On');
        $('#ntpOnOff .Switch').addClass('Off');
        $('#time-setntp').hide();
        $('#time-set').show();
        $("#use-ntp").val('0');
    }

    if (config.dst == true) {
        $('#dstOnOff .Switch').removeClass('Off');
        $('#dstOnOff .Switch').addClass('On');
        $('#set-dst').show();
        $('#timezone-set').hide();
        $("#use-dst").val('1');
    } else {
        $('#dstOnOff .Switch').removeClass('On');
        $('#dstOnOff .Switch').addClass('Off');
        $('#set-dst').hide();
        $('#timezone-set').show();
        $("#use-dst").val('0');
    }


    $('#ntpip').val(config.ntpServer);
    //$('#useDST').prop('checked', config.dst);
    $('#dstStartMonth').val(config.dstStartMonth);
    $('#dstStartDay').val(config.dstStartDay);
    $('#dstStartWeek').val(config.dstStartWeek);
    $('#dstStartOffset').val(tzminute.indexOf(config.dstStartOffset));

    $('#dstEndMonth').val(config.dstEndMonth);
    $('#dstEndDay').val(config.dstEndDay);
    $('#dstEndWeek').val(config.dstEndWeek);
    $('#dstEndOffset').val(tzminute.indexOf(config.dstEndOffset));

    $('#dateFormat').val(config.dtFormat);
    $('#timeFormat').val(config.tmFormat);

    $('#lcdTimeout').val(config.lcdTimeout);
    $('#menuTimeout').val(config.menuTimeout);

    $('#timezone').val(tzminute.indexOf(config.dstEndOffset));

    $("#wifi-ap-chan").val(config.apchannel);
    $("#wifi-ap-name").val(config.hostname);
    $("#wifi-ap-ip").val(config.apip);
    $("#wifi-ap-mask").val(config.apmask);
}

function getFwVersions() {
	$.ajax({ url:'showversions.cgi',
		type:"GET",
	    dataType:"json",
	    cache:true,
	    contentType:"application/json; charset=utf-8",
		success:function(data) {
            for (x in data) {
                $("#fw-" + x).text(data[x]);
            }
		},
		error:function(xhr,type){
	    }
	});
}

$('#timeform').on('submit', function(e) { 
    e.preventDefault();
      //prevent form from submitting
   var _data = $("#timeform").serialize();		
    $.ajax({
        type: 'POST',
        url: 'settime.cgi',
        data: _data,
        cache:false,
        success: function (data) {  
            getConfig();
            showResult('#time-save-result', "Saved", 10000);        
        }
     });       
});


$('a#menuLink').click(function(e) {
    $('#layout').toggleClass('active');
    $('#menu').toggleClass('active');
    $('a#menuLink').toggleClass('active');
    e.preventDefault();
   });
   
   var lastmenu = 'home';
   
   $('div#menu a.pure-menu-link').click(function(event) {
       var curmenu = this.id;
       //hide menu  
       if ($('a#menuLink').hasClass('active')) {
            $('#layout').toggleClass('active');
            $('#menu').toggleClass('active');
            $('a#menuLink').toggleClass('active');
       }    
        
       $(".pure-menu-item").removeClass("pure-menu-selected");
       $('a#'+curmenu).parent(".pure-menu-item").addClass("pure-menu-selected");
       if (lastmenu !== 'null')  {
           $('div#'+lastmenu).toggle();
       } 
       $('div#'+curmenu).toggle();
       lastmenu = curmenu;	
       
       if (curmenu == 'settings') {
           window.clearTimeout(timersken);
           getWifiInfo();
           showCurrentTime();
           
       };
       
       if (curmenu == 'home') {
           window.clearTimeout(timertime);
           display_ct();	
       }
       
       if (curmenu == 'appsetings') {
           ;
       }
       
       if (curmenu == 'firmware') {
           getFwVersions();
       }
   });

$(document).ready(function () {
    J42R.t();
    getConfig();

    timertime = window.setTimeout('display_ct()', 1000);
    
    // Captive portal 
    if (QueryString.page == 'wifi') {
        lastmenu = 'home';
        curmenu = 'settings';
        $(".pure-menu-item").removeClass("pure-menu-selected");
        $('a#' + curmenu).parent(".pure-menu-item").addClass("pure-menu-selected");
        if (lastmenu !== 'null') {
            $('div#' + lastmenu).toggle();
        }
        $('div#' + curmenu).toggle();
        lastmenu = curmenu;
        //if (isRealValue(timersken)) 
        window.clearTimeout(timersken);
        getWifiInfo();
    };
});
