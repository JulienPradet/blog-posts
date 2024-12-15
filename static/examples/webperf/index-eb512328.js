var ds = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var El = ds((Hl, je) => {
	(function () {
		const e = document.createElement('link').relList;
		if (e && e.supports && e.supports('modulepreload')) return;
		for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
		new MutationObserver((n) => {
			for (const r of n)
				if (r.type === 'childList')
					for (const a of r.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && s(a);
		}).observe(document, { childList: !0, subtree: !0 });
		function i(n) {
			const r = {};
			return (
				n.integrity && (r.integrity = n.integrity),
				n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
				n.crossOrigin === 'use-credentials'
					? (r.credentials = 'include')
					: n.crossOrigin === 'anonymous'
						? (r.credentials = 'omit')
						: (r.credentials = 'same-origin'),
				r
			);
		}
		function s(n) {
			if (n.ep) return;
			n.ep = !0;
			const r = i(n);
			fetch(n.href, r);
		}
	})(); //! moment.js
	//! version : 2.29.4
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com
	var hi;
	function c() {
		return hi.apply(null, arguments);
	}
	function cs(t) {
		hi = t;
	}
	function H(t) {
		return t instanceof Array || Object.prototype.toString.call(t) === '[object Array]';
	}
	function ue(t) {
		return t != null && Object.prototype.toString.call(t) === '[object Object]';
	}
	function v(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e);
	}
	function xt(t) {
		if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(t).length === 0;
		var e;
		for (e in t) if (v(t, e)) return !1;
		return !0;
	}
	function C(t) {
		return t === void 0;
	}
	function te(t) {
		return typeof t == 'number' || Object.prototype.toString.call(t) === '[object Number]';
	}
	function Ye(t) {
		return t instanceof Date || Object.prototype.toString.call(t) === '[object Date]';
	}
	function di(t, e) {
		var i = [],
			s,
			n = t.length;
		for (s = 0; s < n; ++s) i.push(e(t[s], s));
		return i;
	}
	function re(t, e) {
		for (var i in e) v(e, i) && (t[i] = e[i]);
		return (
			v(e, 'toString') && (t.toString = e.toString), v(e, 'valueOf') && (t.valueOf = e.valueOf), t
		);
	}
	function $(t, e, i, s) {
		return Ei(t, e, i, s, !0).utc();
	}
	function us() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidEra: null,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1,
			parsedDateParts: [],
			era: null,
			meridiem: null,
			rfc2822: !1,
			weekdayMismatch: !1
		};
	}
	function m(t) {
		return t._pf == null && (t._pf = us()), t._pf;
	}
	var yt;
	Array.prototype.some
		? (yt = Array.prototype.some)
		: (yt = function (t) {
				var e = Object(this),
					i = e.length >>> 0,
					s;
				for (s = 0; s < i; s++) if (s in e && t.call(this, e[s], s, e)) return !0;
				return !1;
			});
	function Tt(t) {
		if (t._isValid == null) {
			var e = m(t),
				i = yt.call(e.parsedDateParts, function (n) {
					return n != null;
				}),
				s =
					!isNaN(t._d.getTime()) &&
					e.overflow < 0 &&
					!e.empty &&
					!e.invalidEra &&
					!e.invalidMonth &&
					!e.invalidWeekday &&
					!e.weekdayMismatch &&
					!e.nullInput &&
					!e.invalidFormat &&
					!e.userInvalidated &&
					(!e.meridiem || (e.meridiem && i));
			if (
				(t._strict &&
					(s = s && e.charsLeftOver === 0 && e.unusedTokens.length === 0 && e.bigHour === void 0),
				Object.isFrozen == null || !Object.isFrozen(t))
			)
				t._isValid = s;
			else return s;
		}
		return t._isValid;
	}
	function et(t) {
		var e = $(NaN);
		return t != null ? re(m(e), t) : (m(e).userInvalidated = !0), e;
	}
	var jt = (c.momentProperties = []),
		ut = !1;
	function kt(t, e) {
		var i,
			s,
			n,
			r = jt.length;
		if (
			(C(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject),
			C(e._i) || (t._i = e._i),
			C(e._f) || (t._f = e._f),
			C(e._l) || (t._l = e._l),
			C(e._strict) || (t._strict = e._strict),
			C(e._tzm) || (t._tzm = e._tzm),
			C(e._isUTC) || (t._isUTC = e._isUTC),
			C(e._offset) || (t._offset = e._offset),
			C(e._pf) || (t._pf = m(e)),
			C(e._locale) || (t._locale = e._locale),
			r > 0)
		)
			for (i = 0; i < r; i++) (s = jt[i]), (n = e[s]), C(n) || (t[s] = n);
		return t;
	}
	function Re(t) {
		kt(this, t),
			(this._d = new Date(t._d != null ? t._d.getTime() : NaN)),
			this.isValid() || (this._d = new Date(NaN)),
			ut === !1 && ((ut = !0), c.updateOffset(this), (ut = !1));
	}
	function U(t) {
		return t instanceof Re || (t != null && t._isAMomentObject != null);
	}
	function ci(t) {
		c.suppressDeprecationWarnings === !1 &&
			typeof console < 'u' &&
			console.warn &&
			console.warn('Deprecation warning: ' + t);
	}
	function N(t, e) {
		var i = !0;
		return re(function () {
			if ((c.deprecationHandler != null && c.deprecationHandler(null, t), i)) {
				var s = [],
					n,
					r,
					a,
					o = arguments.length;
				for (r = 0; r < o; r++) {
					if (((n = ''), typeof arguments[r] == 'object')) {
						n +=
							`
[` +
							r +
							'] ';
						for (a in arguments[0]) v(arguments[0], a) && (n += a + ': ' + arguments[0][a] + ', ');
						n = n.slice(0, -2);
					} else n = arguments[r];
					s.push(n);
				}
				ci(
					t +
						`
Arguments: ` +
						Array.prototype.slice.call(s).join('') +
						`
` +
						new Error().stack
				),
					(i = !1);
			}
			return e.apply(this, arguments);
		}, e);
	}
	var $t = {};
	function ui(t, e) {
		c.deprecationHandler != null && c.deprecationHandler(t, e), $t[t] || (ci(e), ($t[t] = !0));
	}
	c.suppressDeprecationWarnings = !1;
	c.deprecationHandler = null;
	function q(t) {
		return (
			(typeof Function < 'u' && t instanceof Function) ||
			Object.prototype.toString.call(t) === '[object Function]'
		);
	}
	function fs(t) {
		var e, i;
		for (i in t) v(t, i) && ((e = t[i]), q(e) ? (this[i] = e) : (this['_' + i] = e));
		(this._config = t),
			(this._dayOfMonthOrdinalParseLenient = new RegExp(
				(this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source
			));
	}
	function gt(t, e) {
		var i = re({}, t),
			s;
		for (s in e)
			v(e, s) &&
				(ue(t[s]) && ue(e[s])
					? ((i[s] = {}), re(i[s], t[s]), re(i[s], e[s]))
					: e[s] != null
						? (i[s] = e[s])
						: delete i[s]);
		for (s in t) v(t, s) && !v(e, s) && ue(t[s]) && (i[s] = re({}, i[s]));
		return i;
	}
	function Lt(t) {
		t != null && this.set(t);
	}
	var vt;
	Object.keys
		? (vt = Object.keys)
		: (vt = function (t) {
				var e,
					i = [];
				for (e in t) v(t, e) && i.push(e);
				return i;
			});
	var ps = {
		sameDay: '[Today at] LT',
		nextDay: '[Tomorrow at] LT',
		nextWeek: 'dddd [at] LT',
		lastDay: '[Yesterday at] LT',
		lastWeek: '[Last] dddd [at] LT',
		sameElse: 'L'
	};
	function ms(t, e, i) {
		var s = this._calendar[t] || this._calendar.sameElse;
		return q(s) ? s.call(e, i) : s;
	}
	function j(t, e, i) {
		var s = '' + Math.abs(t),
			n = e - s.length,
			r = t >= 0;
		return (r ? (i ? '+' : '') : '-') + Math.pow(10, Math.max(0, n)).toString().substr(1) + s;
	}
	var It =
			/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
		We = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
		ft = {},
		ge = {};
	function p(t, e, i, s) {
		var n = s;
		typeof s == 'string' &&
			(n = function () {
				return this[s]();
			}),
			t && (ge[t] = n),
			e &&
				(ge[e[0]] = function () {
					return j(n.apply(this, arguments), e[1], e[2]);
				}),
			i &&
				(ge[i] = function () {
					return this.localeData().ordinal(n.apply(this, arguments), t);
				});
	}
	function _s(t) {
		return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, '') : t.replace(/\\/g, '');
	}
	function ys(t) {
		var e = t.match(It),
			i,
			s;
		for (i = 0, s = e.length; i < s; i++) ge[e[i]] ? (e[i] = ge[e[i]]) : (e[i] = _s(e[i]));
		return function (n) {
			var r = '',
				a;
			for (a = 0; a < s; a++) r += q(e[a]) ? e[a].call(n, t) : e[a];
			return r;
		};
	}
	function Ue(t, e) {
		return t.isValid()
			? ((e = fi(e, t.localeData())), (ft[e] = ft[e] || ys(e)), ft[e](t))
			: t.localeData().invalidDate();
	}
	function fi(t, e) {
		var i = 5;
		function s(n) {
			return e.longDateFormat(n) || n;
		}
		for (We.lastIndex = 0; i >= 0 && We.test(t); )
			(t = t.replace(We, s)), (We.lastIndex = 0), (i -= 1);
		return t;
	}
	var gs = {
		LTS: 'h:mm:ss A',
		LT: 'h:mm A',
		L: 'MM/DD/YYYY',
		LL: 'MMMM D, YYYY',
		LLL: 'MMMM D, YYYY h:mm A',
		LLLL: 'dddd, MMMM D, YYYY h:mm A'
	};
	function vs(t) {
		var e = this._longDateFormat[t],
			i = this._longDateFormat[t.toUpperCase()];
		return e || !i
			? e
			: ((this._longDateFormat[t] = i
					.match(It)
					.map(function (s) {
						return s === 'MMMM' || s === 'MM' || s === 'DD' || s === 'dddd' ? s.slice(1) : s;
					})
					.join('')),
				this._longDateFormat[t]);
	}
	var ws = 'Invalid date';
	function Ss() {
		return this._invalidDate;
	}
	var Ds = '%d',
		Ps = /\d{1,2}/;
	function Ms(t) {
		return this._ordinal.replace('%d', t);
	}
	var Os = {
		future: 'in %s',
		past: '%s ago',
		s: 'a few seconds',
		ss: '%d seconds',
		m: 'a minute',
		mm: '%d minutes',
		h: 'an hour',
		hh: '%d hours',
		d: 'a day',
		dd: '%d days',
		w: 'a week',
		ww: '%d weeks',
		M: 'a month',
		MM: '%d months',
		y: 'a year',
		yy: '%d years'
	};
	function bs(t, e, i, s) {
		var n = this._relativeTime[i];
		return q(n) ? n(t, e, i, s) : n.replace(/%d/i, t);
	}
	function xs(t, e) {
		var i = this._relativeTime[t > 0 ? 'future' : 'past'];
		return q(i) ? i(e) : i.replace(/%s/i, e);
	}
	var Te = {};
	function L(t, e) {
		var i = t.toLowerCase();
		Te[i] = Te[i + 's'] = Te[e] = t;
	}
	function W(t) {
		return typeof t == 'string' ? Te[t] || Te[t.toLowerCase()] : void 0;
	}
	function Ct(t) {
		var e = {},
			i,
			s;
		for (s in t) v(t, s) && ((i = W(s)), i && (e[i] = t[s]));
		return e;
	}
	var pi = {};
	function I(t, e) {
		pi[t] = e;
	}
	function Ts(t) {
		var e = [],
			i;
		for (i in t) v(t, i) && e.push({ unit: i, priority: pi[i] });
		return (
			e.sort(function (s, n) {
				return s.priority - n.priority;
			}),
			e
		);
	}
	function tt(t) {
		return (t % 4 === 0 && t % 100 !== 0) || t % 400 === 0;
	}
	function F(t) {
		return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
	}
	function _(t) {
		var e = +t,
			i = 0;
		return e !== 0 && isFinite(e) && (i = F(e)), i;
	}
	function Se(t, e) {
		return function (i) {
			return i != null ? (mi(this, t, i), c.updateOffset(this, e), this) : $e(this, t);
		};
	}
	function $e(t, e) {
		return t.isValid() ? t._d['get' + (t._isUTC ? 'UTC' : '') + e]() : NaN;
	}
	function mi(t, e, i) {
		t.isValid() &&
			!isNaN(i) &&
			(e === 'FullYear' && tt(t.year()) && t.month() === 1 && t.date() === 29
				? ((i = _(i)), t._d['set' + (t._isUTC ? 'UTC' : '') + e](i, t.month(), ot(i, t.month())))
				: t._d['set' + (t._isUTC ? 'UTC' : '') + e](i));
	}
	function ks(t) {
		return (t = W(t)), q(this[t]) ? this[t]() : this;
	}
	function Ls(t, e) {
		if (typeof t == 'object') {
			t = Ct(t);
			var i = Ts(t),
				s,
				n = i.length;
			for (s = 0; s < n; s++) this[i[s].unit](t[i[s].unit]);
		} else if (((t = W(t)), q(this[t]))) return this[t](e);
		return this;
	}
	var _i = /\d/,
		Y = /\d\d/,
		yi = /\d{3}/,
		At = /\d{4}/,
		it = /[+-]?\d{6}/,
		M = /\d\d?/,
		gi = /\d\d\d\d?/,
		vi = /\d\d\d\d\d\d?/,
		st = /\d{1,3}/,
		Et = /\d{1,4}/,
		nt = /[+-]?\d{1,6}/,
		De = /\d+/,
		rt = /[+-]?\d+/,
		Is = /Z|[+-]\d\d:?\d\d/gi,
		at = /Z|[+-]\d\d(?::?\d\d)?/gi,
		Cs = /[+-]?\d+(\.\d{1,3})?/,
		ze =
			/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
		qe;
	qe = {};
	function u(t, e, i) {
		qe[t] = q(e)
			? e
			: function (s, n) {
					return s && i ? i : e;
				};
	}
	function As(t, e) {
		return v(qe, t) ? qe[t](e._strict, e._locale) : new RegExp(Es(t));
	}
	function Es(t) {
		return A(
			t.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, i, s, n, r) {
				return i || s || n || r;
			})
		);
	}
	function A(t) {
		return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	var wt = {};
	function D(t, e) {
		var i,
			s = e,
			n;
		for (
			typeof t == 'string' && (t = [t]),
				te(e) &&
					(s = function (r, a) {
						a[e] = _(r);
					}),
				n = t.length,
				i = 0;
			i < n;
			i++
		)
			wt[t[i]] = s;
	}
	function Fe(t, e) {
		D(t, function (i, s, n, r) {
			(n._w = n._w || {}), e(i, n._w, n, r);
		});
	}
	function Ys(t, e, i) {
		e != null && v(wt, t) && wt[t](e, i._a, i, t);
	}
	var k = 0,
		J = 1,
		G = 2,
		T = 3,
		Z = 4,
		Q = 5,
		de = 6,
		Rs = 7,
		zs = 8;
	function Fs(t, e) {
		return ((t % e) + e) % e;
	}
	var b;
	Array.prototype.indexOf
		? (b = Array.prototype.indexOf)
		: (b = function (t) {
				var e;
				for (e = 0; e < this.length; ++e) if (this[e] === t) return e;
				return -1;
			});
	function ot(t, e) {
		if (isNaN(t) || isNaN(e)) return NaN;
		var i = Fs(e, 12);
		return (t += (e - i) / 12), i === 1 ? (tt(t) ? 29 : 28) : 31 - ((i % 7) % 2);
	}
	p('M', ['MM', 2], 'Mo', function () {
		return this.month() + 1;
	});
	p('MMM', 0, 0, function (t) {
		return this.localeData().monthsShort(this, t);
	});
	p('MMMM', 0, 0, function (t) {
		return this.localeData().months(this, t);
	});
	L('month', 'M');
	I('month', 8);
	u('M', M);
	u('MM', M, Y);
	u('MMM', function (t, e) {
		return e.monthsShortRegex(t);
	});
	u('MMMM', function (t, e) {
		return e.monthsRegex(t);
	});
	D(['M', 'MM'], function (t, e) {
		e[J] = _(t) - 1;
	});
	D(['MMM', 'MMMM'], function (t, e, i, s) {
		var n = i._locale.monthsParse(t, s, i._strict);
		n != null ? (e[J] = n) : (m(i).invalidMonth = t);
	});
	var Ns =
			'January_February_March_April_May_June_July_August_September_October_November_December'.split(
				'_'
			),
		wi = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
		Si = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
		Ws = ze,
		Zs = ze;
	function Hs(t, e) {
		return t
			? H(this._months)
				? this._months[t.month()]
				: this._months[(this._months.isFormat || Si).test(e) ? 'format' : 'standalone'][t.month()]
			: H(this._months)
				? this._months
				: this._months.standalone;
	}
	function Us(t, e) {
		return t
			? H(this._monthsShort)
				? this._monthsShort[t.month()]
				: this._monthsShort[Si.test(e) ? 'format' : 'standalone'][t.month()]
			: H(this._monthsShort)
				? this._monthsShort
				: this._monthsShort.standalone;
	}
	function Vs(t, e, i) {
		var s,
			n,
			r,
			a = t.toLocaleLowerCase();
		if (!this._monthsParse)
			for (
				this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], s = 0;
				s < 12;
				++s
			)
				(r = $([2e3, s])),
					(this._shortMonthsParse[s] = this.monthsShort(r, '').toLocaleLowerCase()),
					(this._longMonthsParse[s] = this.months(r, '').toLocaleLowerCase());
		return i
			? e === 'MMM'
				? ((n = b.call(this._shortMonthsParse, a)), n !== -1 ? n : null)
				: ((n = b.call(this._longMonthsParse, a)), n !== -1 ? n : null)
			: e === 'MMM'
				? ((n = b.call(this._shortMonthsParse, a)),
					n !== -1 ? n : ((n = b.call(this._longMonthsParse, a)), n !== -1 ? n : null))
				: ((n = b.call(this._longMonthsParse, a)),
					n !== -1 ? n : ((n = b.call(this._shortMonthsParse, a)), n !== -1 ? n : null));
	}
	function Bs(t, e, i) {
		var s, n, r;
		if (this._monthsParseExact) return Vs.call(this, t, e, i);
		for (
			this._monthsParse ||
				((this._monthsParse = []), (this._longMonthsParse = []), (this._shortMonthsParse = [])),
				s = 0;
			s < 12;
			s++
		) {
			if (
				((n = $([2e3, s])),
				i &&
					!this._longMonthsParse[s] &&
					((this._longMonthsParse[s] = new RegExp(
						'^' + this.months(n, '').replace('.', '') + '$',
						'i'
					)),
					(this._shortMonthsParse[s] = new RegExp(
						'^' + this.monthsShort(n, '').replace('.', '') + '$',
						'i'
					))),
				!i &&
					!this._monthsParse[s] &&
					((r = '^' + this.months(n, '') + '|^' + this.monthsShort(n, '')),
					(this._monthsParse[s] = new RegExp(r.replace('.', ''), 'i'))),
				i && e === 'MMMM' && this._longMonthsParse[s].test(t))
			)
				return s;
			if (i && e === 'MMM' && this._shortMonthsParse[s].test(t)) return s;
			if (!i && this._monthsParse[s].test(t)) return s;
		}
	}
	function Di(t, e) {
		var i;
		if (!t.isValid()) return t;
		if (typeof e == 'string') {
			if (/^\d+$/.test(e)) e = _(e);
			else if (((e = t.localeData().monthsParse(e)), !te(e))) return t;
		}
		return (
			(i = Math.min(t.date(), ot(t.year(), e))),
			t._d['set' + (t._isUTC ? 'UTC' : '') + 'Month'](e, i),
			t
		);
	}
	function Pi(t) {
		return t != null ? (Di(this, t), c.updateOffset(this, !0), this) : $e(this, 'Month');
	}
	function Gs() {
		return ot(this.year(), this.month());
	}
	function js(t) {
		return this._monthsParseExact
			? (v(this, '_monthsRegex') || Mi.call(this),
				t ? this._monthsShortStrictRegex : this._monthsShortRegex)
			: (v(this, '_monthsShortRegex') || (this._monthsShortRegex = Ws),
				this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex);
	}
	function $s(t) {
		return this._monthsParseExact
			? (v(this, '_monthsRegex') || Mi.call(this), t ? this._monthsStrictRegex : this._monthsRegex)
			: (v(this, '_monthsRegex') || (this._monthsRegex = Zs),
				this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex);
	}
	function Mi() {
		function t(a, o) {
			return o.length - a.length;
		}
		var e = [],
			i = [],
			s = [],
			n,
			r;
		for (n = 0; n < 12; n++)
			(r = $([2e3, n])),
				e.push(this.monthsShort(r, '')),
				i.push(this.months(r, '')),
				s.push(this.months(r, '')),
				s.push(this.monthsShort(r, ''));
		for (e.sort(t), i.sort(t), s.sort(t), n = 0; n < 12; n++) (e[n] = A(e[n])), (i[n] = A(i[n]));
		for (n = 0; n < 24; n++) s[n] = A(s[n]);
		(this._monthsRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
			(this._monthsShortRegex = this._monthsRegex),
			(this._monthsStrictRegex = new RegExp('^(' + i.join('|') + ')', 'i')),
			(this._monthsShortStrictRegex = new RegExp('^(' + e.join('|') + ')', 'i'));
	}
	p('Y', 0, 0, function () {
		var t = this.year();
		return t <= 9999 ? j(t, 4) : '+' + t;
	});
	p(0, ['YY', 2], 0, function () {
		return this.year() % 100;
	});
	p(0, ['YYYY', 4], 0, 'year');
	p(0, ['YYYYY', 5], 0, 'year');
	p(0, ['YYYYYY', 6, !0], 0, 'year');
	L('year', 'y');
	I('year', 1);
	u('Y', rt);
	u('YY', M, Y);
	u('YYYY', Et, At);
	u('YYYYY', nt, it);
	u('YYYYYY', nt, it);
	D(['YYYYY', 'YYYYYY'], k);
	D('YYYY', function (t, e) {
		e[k] = t.length === 2 ? c.parseTwoDigitYear(t) : _(t);
	});
	D('YY', function (t, e) {
		e[k] = c.parseTwoDigitYear(t);
	});
	D('Y', function (t, e) {
		e[k] = parseInt(t, 10);
	});
	function ke(t) {
		return tt(t) ? 366 : 365;
	}
	c.parseTwoDigitYear = function (t) {
		return _(t) + (_(t) > 68 ? 1900 : 2e3);
	};
	var Oi = Se('FullYear', !0);
	function qs() {
		return tt(this.year());
	}
	function Ks(t, e, i, s, n, r, a) {
		var o;
		return (
			t < 100 && t >= 0
				? ((o = new Date(t + 400, e, i, s, n, r, a)), isFinite(o.getFullYear()) && o.setFullYear(t))
				: (o = new Date(t, e, i, s, n, r, a)),
			o
		);
	}
	function Ie(t) {
		var e, i;
		return (
			t < 100 && t >= 0
				? ((i = Array.prototype.slice.call(arguments)),
					(i[0] = t + 400),
					(e = new Date(Date.UTC.apply(null, i))),
					isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t))
				: (e = new Date(Date.UTC.apply(null, arguments))),
			e
		);
	}
	function Ke(t, e, i) {
		var s = 7 + e - i,
			n = (7 + Ie(t, 0, s).getUTCDay() - e) % 7;
		return -n + s - 1;
	}
	function bi(t, e, i, s, n) {
		var r = (7 + i - s) % 7,
			a = Ke(t, s, n),
			o = 1 + 7 * (e - 1) + r + a,
			l,
			h;
		return (
			o <= 0
				? ((l = t - 1), (h = ke(l) + o))
				: o > ke(t)
					? ((l = t + 1), (h = o - ke(t)))
					: ((l = t), (h = o)),
			{ year: l, dayOfYear: h }
		);
	}
	function Ce(t, e, i) {
		var s = Ke(t.year(), e, i),
			n = Math.floor((t.dayOfYear() - s - 1) / 7) + 1,
			r,
			a;
		return (
			n < 1
				? ((a = t.year() - 1), (r = n + ee(a, e, i)))
				: n > ee(t.year(), e, i)
					? ((r = n - ee(t.year(), e, i)), (a = t.year() + 1))
					: ((a = t.year()), (r = n)),
			{ week: r, year: a }
		);
	}
	function ee(t, e, i) {
		var s = Ke(t, e, i),
			n = Ke(t + 1, e, i);
		return (ke(t) - s + n) / 7;
	}
	p('w', ['ww', 2], 'wo', 'week');
	p('W', ['WW', 2], 'Wo', 'isoWeek');
	L('week', 'w');
	L('isoWeek', 'W');
	I('week', 5);
	I('isoWeek', 5);
	u('w', M);
	u('ww', M, Y);
	u('W', M);
	u('WW', M, Y);
	Fe(['w', 'ww', 'W', 'WW'], function (t, e, i, s) {
		e[s.substr(0, 1)] = _(t);
	});
	function Xs(t) {
		return Ce(t, this._week.dow, this._week.doy).week;
	}
	var Js = { dow: 0, doy: 6 };
	function Qs() {
		return this._week.dow;
	}
	function en() {
		return this._week.doy;
	}
	function tn(t) {
		var e = this.localeData().week(this);
		return t == null ? e : this.add((t - e) * 7, 'd');
	}
	function sn(t) {
		var e = Ce(this, 1, 4).week;
		return t == null ? e : this.add((t - e) * 7, 'd');
	}
	p('d', 0, 'do', 'day');
	p('dd', 0, 0, function (t) {
		return this.localeData().weekdaysMin(this, t);
	});
	p('ddd', 0, 0, function (t) {
		return this.localeData().weekdaysShort(this, t);
	});
	p('dddd', 0, 0, function (t) {
		return this.localeData().weekdays(this, t);
	});
	p('e', 0, 0, 'weekday');
	p('E', 0, 0, 'isoWeekday');
	L('day', 'd');
	L('weekday', 'e');
	L('isoWeekday', 'E');
	I('day', 11);
	I('weekday', 11);
	I('isoWeekday', 11);
	u('d', M);
	u('e', M);
	u('E', M);
	u('dd', function (t, e) {
		return e.weekdaysMinRegex(t);
	});
	u('ddd', function (t, e) {
		return e.weekdaysShortRegex(t);
	});
	u('dddd', function (t, e) {
		return e.weekdaysRegex(t);
	});
	Fe(['dd', 'ddd', 'dddd'], function (t, e, i, s) {
		var n = i._locale.weekdaysParse(t, s, i._strict);
		n != null ? (e.d = n) : (m(i).invalidWeekday = t);
	});
	Fe(['d', 'e', 'E'], function (t, e, i, s) {
		e[s] = _(t);
	});
	function nn(t, e) {
		return typeof t != 'string'
			? t
			: isNaN(t)
				? ((t = e.weekdaysParse(t)), typeof t == 'number' ? t : null)
				: parseInt(t, 10);
	}
	function rn(t, e) {
		return typeof t == 'string' ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t;
	}
	function Yt(t, e) {
		return t.slice(e, 7).concat(t.slice(0, e));
	}
	var an = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
		xi = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
		on = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
		ln = ze,
		hn = ze,
		dn = ze;
	function cn(t, e) {
		var i = H(this._weekdays)
			? this._weekdays
			: this._weekdays[t && t !== !0 && this._weekdays.isFormat.test(e) ? 'format' : 'standalone'];
		return t === !0 ? Yt(i, this._week.dow) : t ? i[t.day()] : i;
	}
	function un(t) {
		return t === !0
			? Yt(this._weekdaysShort, this._week.dow)
			: t
				? this._weekdaysShort[t.day()]
				: this._weekdaysShort;
	}
	function fn(t) {
		return t === !0
			? Yt(this._weekdaysMin, this._week.dow)
			: t
				? this._weekdaysMin[t.day()]
				: this._weekdaysMin;
	}
	function pn(t, e, i) {
		var s,
			n,
			r,
			a = t.toLocaleLowerCase();
		if (!this._weekdaysParse)
			for (
				this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], s = 0;
				s < 7;
				++s
			)
				(r = $([2e3, 1]).day(s)),
					(this._minWeekdaysParse[s] = this.weekdaysMin(r, '').toLocaleLowerCase()),
					(this._shortWeekdaysParse[s] = this.weekdaysShort(r, '').toLocaleLowerCase()),
					(this._weekdaysParse[s] = this.weekdays(r, '').toLocaleLowerCase());
		return i
			? e === 'dddd'
				? ((n = b.call(this._weekdaysParse, a)), n !== -1 ? n : null)
				: e === 'ddd'
					? ((n = b.call(this._shortWeekdaysParse, a)), n !== -1 ? n : null)
					: ((n = b.call(this._minWeekdaysParse, a)), n !== -1 ? n : null)
			: e === 'dddd'
				? ((n = b.call(this._weekdaysParse, a)),
					n !== -1 || ((n = b.call(this._shortWeekdaysParse, a)), n !== -1)
						? n
						: ((n = b.call(this._minWeekdaysParse, a)), n !== -1 ? n : null))
				: e === 'ddd'
					? ((n = b.call(this._shortWeekdaysParse, a)),
						n !== -1 || ((n = b.call(this._weekdaysParse, a)), n !== -1)
							? n
							: ((n = b.call(this._minWeekdaysParse, a)), n !== -1 ? n : null))
					: ((n = b.call(this._minWeekdaysParse, a)),
						n !== -1 || ((n = b.call(this._weekdaysParse, a)), n !== -1)
							? n
							: ((n = b.call(this._shortWeekdaysParse, a)), n !== -1 ? n : null));
	}
	function mn(t, e, i) {
		var s, n, r;
		if (this._weekdaysParseExact) return pn.call(this, t, e, i);
		for (
			this._weekdaysParse ||
				((this._weekdaysParse = []),
				(this._minWeekdaysParse = []),
				(this._shortWeekdaysParse = []),
				(this._fullWeekdaysParse = [])),
				s = 0;
			s < 7;
			s++
		) {
			if (
				((n = $([2e3, 1]).day(s)),
				i &&
					!this._fullWeekdaysParse[s] &&
					((this._fullWeekdaysParse[s] = new RegExp(
						'^' + this.weekdays(n, '').replace('.', '\\.?') + '$',
						'i'
					)),
					(this._shortWeekdaysParse[s] = new RegExp(
						'^' + this.weekdaysShort(n, '').replace('.', '\\.?') + '$',
						'i'
					)),
					(this._minWeekdaysParse[s] = new RegExp(
						'^' + this.weekdaysMin(n, '').replace('.', '\\.?') + '$',
						'i'
					))),
				this._weekdaysParse[s] ||
					((r =
						'^' +
						this.weekdays(n, '') +
						'|^' +
						this.weekdaysShort(n, '') +
						'|^' +
						this.weekdaysMin(n, '')),
					(this._weekdaysParse[s] = new RegExp(r.replace('.', ''), 'i'))),
				i && e === 'dddd' && this._fullWeekdaysParse[s].test(t))
			)
				return s;
			if (i && e === 'ddd' && this._shortWeekdaysParse[s].test(t)) return s;
			if (i && e === 'dd' && this._minWeekdaysParse[s].test(t)) return s;
			if (!i && this._weekdaysParse[s].test(t)) return s;
		}
	}
	function _n(t) {
		if (!this.isValid()) return t != null ? this : NaN;
		var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
		return t != null ? ((t = nn(t, this.localeData())), this.add(t - e, 'd')) : e;
	}
	function yn(t) {
		if (!this.isValid()) return t != null ? this : NaN;
		var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
		return t == null ? e : this.add(t - e, 'd');
	}
	function gn(t) {
		if (!this.isValid()) return t != null ? this : NaN;
		if (t != null) {
			var e = rn(t, this.localeData());
			return this.day(this.day() % 7 ? e : e - 7);
		} else return this.day() || 7;
	}
	function vn(t) {
		return this._weekdaysParseExact
			? (v(this, '_weekdaysRegex') || Rt.call(this),
				t ? this._weekdaysStrictRegex : this._weekdaysRegex)
			: (v(this, '_weekdaysRegex') || (this._weekdaysRegex = ln),
				this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex);
	}
	function wn(t) {
		return this._weekdaysParseExact
			? (v(this, '_weekdaysRegex') || Rt.call(this),
				t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
			: (v(this, '_weekdaysShortRegex') || (this._weekdaysShortRegex = hn),
				this._weekdaysShortStrictRegex && t
					? this._weekdaysShortStrictRegex
					: this._weekdaysShortRegex);
	}
	function Sn(t) {
		return this._weekdaysParseExact
			? (v(this, '_weekdaysRegex') || Rt.call(this),
				t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
			: (v(this, '_weekdaysMinRegex') || (this._weekdaysMinRegex = dn),
				this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
	}
	function Rt() {
		function t(f, y) {
			return y.length - f.length;
		}
		var e = [],
			i = [],
			s = [],
			n = [],
			r,
			a,
			o,
			l,
			h;
		for (r = 0; r < 7; r++)
			(a = $([2e3, 1]).day(r)),
				(o = A(this.weekdaysMin(a, ''))),
				(l = A(this.weekdaysShort(a, ''))),
				(h = A(this.weekdays(a, ''))),
				e.push(o),
				i.push(l),
				s.push(h),
				n.push(o),
				n.push(l),
				n.push(h);
		e.sort(t),
			i.sort(t),
			s.sort(t),
			n.sort(t),
			(this._weekdaysRegex = new RegExp('^(' + n.join('|') + ')', 'i')),
			(this._weekdaysShortRegex = this._weekdaysRegex),
			(this._weekdaysMinRegex = this._weekdaysRegex),
			(this._weekdaysStrictRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
			(this._weekdaysShortStrictRegex = new RegExp('^(' + i.join('|') + ')', 'i')),
			(this._weekdaysMinStrictRegex = new RegExp('^(' + e.join('|') + ')', 'i'));
	}
	function zt() {
		return this.hours() % 12 || 12;
	}
	function Dn() {
		return this.hours() || 24;
	}
	p('H', ['HH', 2], 0, 'hour');
	p('h', ['hh', 2], 0, zt);
	p('k', ['kk', 2], 0, Dn);
	p('hmm', 0, 0, function () {
		return '' + zt.apply(this) + j(this.minutes(), 2);
	});
	p('hmmss', 0, 0, function () {
		return '' + zt.apply(this) + j(this.minutes(), 2) + j(this.seconds(), 2);
	});
	p('Hmm', 0, 0, function () {
		return '' + this.hours() + j(this.minutes(), 2);
	});
	p('Hmmss', 0, 0, function () {
		return '' + this.hours() + j(this.minutes(), 2) + j(this.seconds(), 2);
	});
	function Ti(t, e) {
		p(t, 0, 0, function () {
			return this.localeData().meridiem(this.hours(), this.minutes(), e);
		});
	}
	Ti('a', !0);
	Ti('A', !1);
	L('hour', 'h');
	I('hour', 13);
	function ki(t, e) {
		return e._meridiemParse;
	}
	u('a', ki);
	u('A', ki);
	u('H', M);
	u('h', M);
	u('k', M);
	u('HH', M, Y);
	u('hh', M, Y);
	u('kk', M, Y);
	u('hmm', gi);
	u('hmmss', vi);
	u('Hmm', gi);
	u('Hmmss', vi);
	D(['H', 'HH'], T);
	D(['k', 'kk'], function (t, e, i) {
		var s = _(t);
		e[T] = s === 24 ? 0 : s;
	});
	D(['a', 'A'], function (t, e, i) {
		(i._isPm = i._locale.isPM(t)), (i._meridiem = t);
	});
	D(['h', 'hh'], function (t, e, i) {
		(e[T] = _(t)), (m(i).bigHour = !0);
	});
	D('hmm', function (t, e, i) {
		var s = t.length - 2;
		(e[T] = _(t.substr(0, s))), (e[Z] = _(t.substr(s))), (m(i).bigHour = !0);
	});
	D('hmmss', function (t, e, i) {
		var s = t.length - 4,
			n = t.length - 2;
		(e[T] = _(t.substr(0, s))),
			(e[Z] = _(t.substr(s, 2))),
			(e[Q] = _(t.substr(n))),
			(m(i).bigHour = !0);
	});
	D('Hmm', function (t, e, i) {
		var s = t.length - 2;
		(e[T] = _(t.substr(0, s))), (e[Z] = _(t.substr(s)));
	});
	D('Hmmss', function (t, e, i) {
		var s = t.length - 4,
			n = t.length - 2;
		(e[T] = _(t.substr(0, s))), (e[Z] = _(t.substr(s, 2))), (e[Q] = _(t.substr(n)));
	});
	function Pn(t) {
		return (t + '').toLowerCase().charAt(0) === 'p';
	}
	var Mn = /[ap]\.?m?\.?/i,
		On = Se('Hours', !0);
	function bn(t, e, i) {
		return t > 11 ? (i ? 'pm' : 'PM') : i ? 'am' : 'AM';
	}
	var Li = {
			calendar: ps,
			longDateFormat: gs,
			invalidDate: ws,
			ordinal: Ds,
			dayOfMonthOrdinalParse: Ps,
			relativeTime: Os,
			months: Ns,
			monthsShort: wi,
			week: Js,
			weekdays: an,
			weekdaysMin: on,
			weekdaysShort: xi,
			meridiemParse: Mn
		},
		O = {},
		Pe = {},
		Ae;
	function xn(t, e) {
		var i,
			s = Math.min(t.length, e.length);
		for (i = 0; i < s; i += 1) if (t[i] !== e[i]) return i;
		return s;
	}
	function qt(t) {
		return t && t.toLowerCase().replace('_', '-');
	}
	function Tn(t) {
		for (var e = 0, i, s, n, r; e < t.length; ) {
			for (
				r = qt(t[e]).split('-'), i = r.length, s = qt(t[e + 1]), s = s ? s.split('-') : null;
				i > 0;

			) {
				if (((n = lt(r.slice(0, i).join('-'))), n)) return n;
				if (s && s.length >= i && xn(r, s) >= i - 1) break;
				i--;
			}
			e++;
		}
		return Ae;
	}
	function kn(t) {
		return t.match('^[^/\\\\]*$') != null;
	}
	function lt(t) {
		var e = null,
			i;
		if (O[t] === void 0 && typeof je < 'u' && je && je.exports && kn(t))
			try {
				(e = Ae._abbr), (i = require), i('./locale/' + t), oe(e);
			} catch {
				O[t] = null;
			}
		return O[t];
	}
	function oe(t, e) {
		var i;
		return (
			t &&
				(C(e) ? (i = ie(t)) : (i = Ft(t, e)),
				i
					? (Ae = i)
					: typeof console < 'u' &&
						console.warn &&
						console.warn('Locale ' + t + ' not found. Did you forget to load it?')),
			Ae._abbr
		);
	}
	function Ft(t, e) {
		if (e !== null) {
			var i,
				s = Li;
			if (((e.abbr = t), O[t] != null))
				ui(
					'defineLocaleOverride',
					'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
				),
					(s = O[t]._config);
			else if (e.parentLocale != null)
				if (O[e.parentLocale] != null) s = O[e.parentLocale]._config;
				else if (((i = lt(e.parentLocale)), i != null)) s = i._config;
				else
					return (
						Pe[e.parentLocale] || (Pe[e.parentLocale] = []),
						Pe[e.parentLocale].push({ name: t, config: e }),
						null
					);
			return (
				(O[t] = new Lt(gt(s, e))),
				Pe[t] &&
					Pe[t].forEach(function (n) {
						Ft(n.name, n.config);
					}),
				oe(t),
				O[t]
			);
		} else return delete O[t], null;
	}
	function Ln(t, e) {
		if (e != null) {
			var i,
				s,
				n = Li;
			O[t] != null && O[t].parentLocale != null
				? O[t].set(gt(O[t]._config, e))
				: ((s = lt(t)),
					s != null && (n = s._config),
					(e = gt(n, e)),
					s == null && (e.abbr = t),
					(i = new Lt(e)),
					(i.parentLocale = O[t]),
					(O[t] = i)),
				oe(t);
		} else
			O[t] != null &&
				(O[t].parentLocale != null
					? ((O[t] = O[t].parentLocale), t === oe() && oe(t))
					: O[t] != null && delete O[t]);
		return O[t];
	}
	function ie(t) {
		var e;
		if ((t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t)) return Ae;
		if (!H(t)) {
			if (((e = lt(t)), e)) return e;
			t = [t];
		}
		return Tn(t);
	}
	function In() {
		return vt(O);
	}
	function Nt(t) {
		var e,
			i = t._a;
		return (
			i &&
				m(t).overflow === -2 &&
				((e =
					i[J] < 0 || i[J] > 11
						? J
						: i[G] < 1 || i[G] > ot(i[k], i[J])
							? G
							: i[T] < 0 || i[T] > 24 || (i[T] === 24 && (i[Z] !== 0 || i[Q] !== 0 || i[de] !== 0))
								? T
								: i[Z] < 0 || i[Z] > 59
									? Z
									: i[Q] < 0 || i[Q] > 59
										? Q
										: i[de] < 0 || i[de] > 999
											? de
											: -1),
				m(t)._overflowDayOfYear && (e < k || e > G) && (e = G),
				m(t)._overflowWeeks && e === -1 && (e = Rs),
				m(t)._overflowWeekday && e === -1 && (e = zs),
				(m(t).overflow = e)),
			t
		);
	}
	var Cn =
			/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
		An =
			/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
		En = /Z|[+-]\d\d(?::?\d\d)?/,
		Ze = [
			['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
			['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
			['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
			['GGGG-[W]WW', /\d{4}-W\d\d/, !1],
			['YYYY-DDD', /\d{4}-\d{3}/],
			['YYYY-MM', /\d{4}-\d\d/, !1],
			['YYYYYYMMDD', /[+-]\d{10}/],
			['YYYYMMDD', /\d{8}/],
			['GGGG[W]WWE', /\d{4}W\d{3}/],
			['GGGG[W]WW', /\d{4}W\d{2}/, !1],
			['YYYYDDD', /\d{7}/],
			['YYYYMM', /\d{6}/, !1],
			['YYYY', /\d{4}/, !1]
		],
		pt = [
			['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
			['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
			['HH:mm:ss', /\d\d:\d\d:\d\d/],
			['HH:mm', /\d\d:\d\d/],
			['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
			['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
			['HHmmss', /\d\d\d\d\d\d/],
			['HHmm', /\d\d\d\d/],
			['HH', /\d\d/]
		],
		Yn = /^\/?Date\((-?\d+)/i,
		Rn =
			/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
		zn = {
			UT: 0,
			GMT: 0,
			EDT: -4 * 60,
			EST: -5 * 60,
			CDT: -5 * 60,
			CST: -6 * 60,
			MDT: -6 * 60,
			MST: -7 * 60,
			PDT: -7 * 60,
			PST: -8 * 60
		};
	function Ii(t) {
		var e,
			i,
			s = t._i,
			n = Cn.exec(s) || An.exec(s),
			r,
			a,
			o,
			l,
			h = Ze.length,
			f = pt.length;
		if (n) {
			for (m(t).iso = !0, e = 0, i = h; e < i; e++)
				if (Ze[e][1].exec(n[1])) {
					(a = Ze[e][0]), (r = Ze[e][2] !== !1);
					break;
				}
			if (a == null) {
				t._isValid = !1;
				return;
			}
			if (n[3]) {
				for (e = 0, i = f; e < i; e++)
					if (pt[e][1].exec(n[3])) {
						o = (n[2] || ' ') + pt[e][0];
						break;
					}
				if (o == null) {
					t._isValid = !1;
					return;
				}
			}
			if (!r && o != null) {
				t._isValid = !1;
				return;
			}
			if (n[4])
				if (En.exec(n[4])) l = 'Z';
				else {
					t._isValid = !1;
					return;
				}
			(t._f = a + (o || '') + (l || '')), Zt(t);
		} else t._isValid = !1;
	}
	function Fn(t, e, i, s, n, r) {
		var a = [Nn(t), wi.indexOf(e), parseInt(i, 10), parseInt(s, 10), parseInt(n, 10)];
		return r && a.push(parseInt(r, 10)), a;
	}
	function Nn(t) {
		var e = parseInt(t, 10);
		return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
	}
	function Wn(t) {
		return t
			.replace(/\([^()]*\)|[\n\t]/g, ' ')
			.replace(/(\s\s+)/g, ' ')
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '');
	}
	function Zn(t, e, i) {
		if (t) {
			var s = xi.indexOf(t),
				n = new Date(e[0], e[1], e[2]).getDay();
			if (s !== n) return (m(i).weekdayMismatch = !0), (i._isValid = !1), !1;
		}
		return !0;
	}
	function Hn(t, e, i) {
		if (t) return zn[t];
		if (e) return 0;
		var s = parseInt(i, 10),
			n = s % 100,
			r = (s - n) / 100;
		return r * 60 + n;
	}
	function Ci(t) {
		var e = Rn.exec(Wn(t._i)),
			i;
		if (e) {
			if (((i = Fn(e[4], e[3], e[2], e[5], e[6], e[7])), !Zn(e[1], i, t))) return;
			(t._a = i),
				(t._tzm = Hn(e[8], e[9], e[10])),
				(t._d = Ie.apply(null, t._a)),
				t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
				(m(t).rfc2822 = !0);
		} else t._isValid = !1;
	}
	function Un(t) {
		var e = Yn.exec(t._i);
		if (e !== null) {
			t._d = new Date(+e[1]);
			return;
		}
		if ((Ii(t), t._isValid === !1)) delete t._isValid;
		else return;
		if ((Ci(t), t._isValid === !1)) delete t._isValid;
		else return;
		t._strict ? (t._isValid = !1) : c.createFromInputFallback(t);
	}
	c.createFromInputFallback = N(
		'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
		function (t) {
			t._d = new Date(t._i + (t._useUTC ? ' UTC' : ''));
		}
	);
	function _e(t, e, i) {
		return t ?? e ?? i;
	}
	function Vn(t) {
		var e = new Date(c.now());
		return t._useUTC
			? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]
			: [e.getFullYear(), e.getMonth(), e.getDate()];
	}
	function Wt(t) {
		var e,
			i,
			s = [],
			n,
			r,
			a;
		if (!t._d) {
			for (
				n = Vn(t),
					t._w && t._a[G] == null && t._a[J] == null && Bn(t),
					t._dayOfYear != null &&
						((a = _e(t._a[k], n[k])),
						(t._dayOfYear > ke(a) || t._dayOfYear === 0) && (m(t)._overflowDayOfYear = !0),
						(i = Ie(a, 0, t._dayOfYear)),
						(t._a[J] = i.getUTCMonth()),
						(t._a[G] = i.getUTCDate())),
					e = 0;
				e < 3 && t._a[e] == null;
				++e
			)
				t._a[e] = s[e] = n[e];
			for (; e < 7; e++) t._a[e] = s[e] = t._a[e] == null ? (e === 2 ? 1 : 0) : t._a[e];
			t._a[T] === 24 &&
				t._a[Z] === 0 &&
				t._a[Q] === 0 &&
				t._a[de] === 0 &&
				((t._nextDay = !0), (t._a[T] = 0)),
				(t._d = (t._useUTC ? Ie : Ks).apply(null, s)),
				(r = t._useUTC ? t._d.getUTCDay() : t._d.getDay()),
				t._tzm != null && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
				t._nextDay && (t._a[T] = 24),
				t._w && typeof t._w.d < 'u' && t._w.d !== r && (m(t).weekdayMismatch = !0);
		}
	}
	function Bn(t) {
		var e, i, s, n, r, a, o, l, h;
		(e = t._w),
			e.GG != null || e.W != null || e.E != null
				? ((r = 1),
					(a = 4),
					(i = _e(e.GG, t._a[k], Ce(P(), 1, 4).year)),
					(s = _e(e.W, 1)),
					(n = _e(e.E, 1)),
					(n < 1 || n > 7) && (l = !0))
				: ((r = t._locale._week.dow),
					(a = t._locale._week.doy),
					(h = Ce(P(), r, a)),
					(i = _e(e.gg, t._a[k], h.year)),
					(s = _e(e.w, h.week)),
					e.d != null
						? ((n = e.d), (n < 0 || n > 6) && (l = !0))
						: e.e != null
							? ((n = e.e + r), (e.e < 0 || e.e > 6) && (l = !0))
							: (n = r)),
			s < 1 || s > ee(i, r, a)
				? (m(t)._overflowWeeks = !0)
				: l != null
					? (m(t)._overflowWeekday = !0)
					: ((o = bi(i, s, n, r, a)), (t._a[k] = o.year), (t._dayOfYear = o.dayOfYear));
	}
	c.ISO_8601 = function () {};
	c.RFC_2822 = function () {};
	function Zt(t) {
		if (t._f === c.ISO_8601) {
			Ii(t);
			return;
		}
		if (t._f === c.RFC_2822) {
			Ci(t);
			return;
		}
		(t._a = []), (m(t).empty = !0);
		var e = '' + t._i,
			i,
			s,
			n,
			r,
			a,
			o = e.length,
			l = 0,
			h,
			f;
		for (n = fi(t._f, t._locale).match(It) || [], f = n.length, i = 0; i < f; i++)
			(r = n[i]),
				(s = (e.match(As(r, t)) || [])[0]),
				s &&
					((a = e.substr(0, e.indexOf(s))),
					a.length > 0 && m(t).unusedInput.push(a),
					(e = e.slice(e.indexOf(s) + s.length)),
					(l += s.length)),
				ge[r]
					? (s ? (m(t).empty = !1) : m(t).unusedTokens.push(r), Ys(r, s, t))
					: t._strict && !s && m(t).unusedTokens.push(r);
		(m(t).charsLeftOver = o - l),
			e.length > 0 && m(t).unusedInput.push(e),
			t._a[T] <= 12 && m(t).bigHour === !0 && t._a[T] > 0 && (m(t).bigHour = void 0),
			(m(t).parsedDateParts = t._a.slice(0)),
			(m(t).meridiem = t._meridiem),
			(t._a[T] = Gn(t._locale, t._a[T], t._meridiem)),
			(h = m(t).era),
			h !== null && (t._a[k] = t._locale.erasConvertYear(h, t._a[k])),
			Wt(t),
			Nt(t);
	}
	function Gn(t, e, i) {
		var s;
		return i == null
			? e
			: t.meridiemHour != null
				? t.meridiemHour(e, i)
				: (t.isPM != null && ((s = t.isPM(i)), s && e < 12 && (e += 12), !s && e === 12 && (e = 0)),
					e);
	}
	function jn(t) {
		var e,
			i,
			s,
			n,
			r,
			a,
			o = !1,
			l = t._f.length;
		if (l === 0) {
			(m(t).invalidFormat = !0), (t._d = new Date(NaN));
			return;
		}
		for (n = 0; n < l; n++)
			(r = 0),
				(a = !1),
				(e = kt({}, t)),
				t._useUTC != null && (e._useUTC = t._useUTC),
				(e._f = t._f[n]),
				Zt(e),
				Tt(e) && (a = !0),
				(r += m(e).charsLeftOver),
				(r += m(e).unusedTokens.length * 10),
				(m(e).score = r),
				o
					? r < s && ((s = r), (i = e))
					: (s == null || r < s || a) && ((s = r), (i = e), a && (o = !0));
		re(t, i || e);
	}
	function $n(t) {
		if (!t._d) {
			var e = Ct(t._i),
				i = e.day === void 0 ? e.date : e.day;
			(t._a = di([e.year, e.month, i, e.hour, e.minute, e.second, e.millisecond], function (s) {
				return s && parseInt(s, 10);
			})),
				Wt(t);
		}
	}
	function qn(t) {
		var e = new Re(Nt(Ai(t)));
		return e._nextDay && (e.add(1, 'd'), (e._nextDay = void 0)), e;
	}
	function Ai(t) {
		var e = t._i,
			i = t._f;
		return (
			(t._locale = t._locale || ie(t._l)),
			e === null || (i === void 0 && e === '')
				? et({ nullInput: !0 })
				: (typeof e == 'string' && (t._i = e = t._locale.preparse(e)),
					U(e)
						? new Re(Nt(e))
						: (Ye(e) ? (t._d = e) : H(i) ? jn(t) : i ? Zt(t) : Kn(t), Tt(t) || (t._d = null), t))
		);
	}
	function Kn(t) {
		var e = t._i;
		C(e)
			? (t._d = new Date(c.now()))
			: Ye(e)
				? (t._d = new Date(e.valueOf()))
				: typeof e == 'string'
					? Un(t)
					: H(e)
						? ((t._a = di(e.slice(0), function (i) {
								return parseInt(i, 10);
							})),
							Wt(t))
						: ue(e)
							? $n(t)
							: te(e)
								? (t._d = new Date(e))
								: c.createFromInputFallback(t);
	}
	function Ei(t, e, i, s, n) {
		var r = {};
		return (
			(e === !0 || e === !1) && ((s = e), (e = void 0)),
			(i === !0 || i === !1) && ((s = i), (i = void 0)),
			((ue(t) && xt(t)) || (H(t) && t.length === 0)) && (t = void 0),
			(r._isAMomentObject = !0),
			(r._useUTC = r._isUTC = n),
			(r._l = i),
			(r._i = t),
			(r._f = e),
			(r._strict = s),
			qn(r)
		);
	}
	function P(t, e, i, s) {
		return Ei(t, e, i, s, !1);
	}
	var Xn = N(
			'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
			function () {
				var t = P.apply(null, arguments);
				return this.isValid() && t.isValid() ? (t < this ? this : t) : et();
			}
		),
		Jn = N(
			'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
			function () {
				var t = P.apply(null, arguments);
				return this.isValid() && t.isValid() ? (t > this ? this : t) : et();
			}
		);
	function Yi(t, e) {
		var i, s;
		if ((e.length === 1 && H(e[0]) && (e = e[0]), !e.length)) return P();
		for (i = e[0], s = 1; s < e.length; ++s) (!e[s].isValid() || e[s][t](i)) && (i = e[s]);
		return i;
	}
	function Qn() {
		var t = [].slice.call(arguments, 0);
		return Yi('isBefore', t);
	}
	function er() {
		var t = [].slice.call(arguments, 0);
		return Yi('isAfter', t);
	}
	var tr = function () {
			return Date.now ? Date.now() : +new Date();
		},
		Me = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
	function ir(t) {
		var e,
			i = !1,
			s,
			n = Me.length;
		for (e in t)
			if (v(t, e) && !(b.call(Me, e) !== -1 && (t[e] == null || !isNaN(t[e])))) return !1;
		for (s = 0; s < n; ++s)
			if (t[Me[s]]) {
				if (i) return !1;
				parseFloat(t[Me[s]]) !== _(t[Me[s]]) && (i = !0);
			}
		return !0;
	}
	function sr() {
		return this._isValid;
	}
	function nr() {
		return V(NaN);
	}
	function ht(t) {
		var e = Ct(t),
			i = e.year || 0,
			s = e.quarter || 0,
			n = e.month || 0,
			r = e.week || e.isoWeek || 0,
			a = e.day || 0,
			o = e.hour || 0,
			l = e.minute || 0,
			h = e.second || 0,
			f = e.millisecond || 0;
		(this._isValid = ir(e)),
			(this._milliseconds = +f + h * 1e3 + l * 6e4 + o * 1e3 * 60 * 60),
			(this._days = +a + r * 7),
			(this._months = +n + s * 3 + i * 12),
			(this._data = {}),
			(this._locale = ie()),
			this._bubble();
	}
	function Ve(t) {
		return t instanceof ht;
	}
	function St(t) {
		return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t);
	}
	function rr(t, e, i) {
		var s = Math.min(t.length, e.length),
			n = Math.abs(t.length - e.length),
			r = 0,
			a;
		for (a = 0; a < s; a++) ((i && t[a] !== e[a]) || (!i && _(t[a]) !== _(e[a]))) && r++;
		return r + n;
	}
	function Ri(t, e) {
		p(t, 0, 0, function () {
			var i = this.utcOffset(),
				s = '+';
			return i < 0 && ((i = -i), (s = '-')), s + j(~~(i / 60), 2) + e + j(~~i % 60, 2);
		});
	}
	Ri('Z', ':');
	Ri('ZZ', '');
	u('Z', at);
	u('ZZ', at);
	D(['Z', 'ZZ'], function (t, e, i) {
		(i._useUTC = !0), (i._tzm = Ht(at, t));
	});
	var ar = /([\+\-]|\d\d)/gi;
	function Ht(t, e) {
		var i = (e || '').match(t),
			s,
			n,
			r;
		return i === null
			? null
			: ((s = i[i.length - 1] || []),
				(n = (s + '').match(ar) || ['-', 0, 0]),
				(r = +(n[1] * 60) + _(n[2])),
				r === 0 ? 0 : n[0] === '+' ? r : -r);
	}
	function Ut(t, e) {
		var i, s;
		return e._isUTC
			? ((i = e.clone()),
				(s = (U(t) || Ye(t) ? t.valueOf() : P(t).valueOf()) - i.valueOf()),
				i._d.setTime(i._d.valueOf() + s),
				c.updateOffset(i, !1),
				i)
			: P(t).local();
	}
	function Dt(t) {
		return -Math.round(t._d.getTimezoneOffset());
	}
	c.updateOffset = function () {};
	function or(t, e, i) {
		var s = this._offset || 0,
			n;
		if (!this.isValid()) return t != null ? this : NaN;
		if (t != null) {
			if (typeof t == 'string') {
				if (((t = Ht(at, t)), t === null)) return this;
			} else Math.abs(t) < 16 && !i && (t = t * 60);
			return (
				!this._isUTC && e && (n = Dt(this)),
				(this._offset = t),
				(this._isUTC = !0),
				n != null && this.add(n, 'm'),
				s !== t &&
					(!e || this._changeInProgress
						? Ni(this, V(t - s, 'm'), 1, !1)
						: this._changeInProgress ||
							((this._changeInProgress = !0),
							c.updateOffset(this, !0),
							(this._changeInProgress = null))),
				this
			);
		} else return this._isUTC ? s : Dt(this);
	}
	function lr(t, e) {
		return t != null
			? (typeof t != 'string' && (t = -t), this.utcOffset(t, e), this)
			: -this.utcOffset();
	}
	function hr(t) {
		return this.utcOffset(0, t);
	}
	function dr(t) {
		return (
			this._isUTC && (this.utcOffset(0, t), (this._isUTC = !1), t && this.subtract(Dt(this), 'm')),
			this
		);
	}
	function cr() {
		if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
		else if (typeof this._i == 'string') {
			var t = Ht(Is, this._i);
			t != null ? this.utcOffset(t) : this.utcOffset(0, !0);
		}
		return this;
	}
	function ur(t) {
		return this.isValid()
			? ((t = t ? P(t).utcOffset() : 0), (this.utcOffset() - t) % 60 === 0)
			: !1;
	}
	function fr() {
		return (
			this.utcOffset() > this.clone().month(0).utcOffset() ||
			this.utcOffset() > this.clone().month(5).utcOffset()
		);
	}
	function pr() {
		if (!C(this._isDSTShifted)) return this._isDSTShifted;
		var t = {},
			e;
		return (
			kt(t, this),
			(t = Ai(t)),
			t._a
				? ((e = t._isUTC ? $(t._a) : P(t._a)),
					(this._isDSTShifted = this.isValid() && rr(t._a, e.toArray()) > 0))
				: (this._isDSTShifted = !1),
			this._isDSTShifted
		);
	}
	function mr() {
		return this.isValid() ? !this._isUTC : !1;
	}
	function _r() {
		return this.isValid() ? this._isUTC : !1;
	}
	function zi() {
		return this.isValid() ? this._isUTC && this._offset === 0 : !1;
	}
	var yr = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
		gr =
			/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
	function V(t, e) {
		var i = t,
			s = null,
			n,
			r,
			a;
		return (
			Ve(t)
				? (i = { ms: t._milliseconds, d: t._days, M: t._months })
				: te(t) || !isNaN(+t)
					? ((i = {}), e ? (i[e] = +t) : (i.milliseconds = +t))
					: (s = yr.exec(t))
						? ((n = s[1] === '-' ? -1 : 1),
							(i = {
								y: 0,
								d: _(s[G]) * n,
								h: _(s[T]) * n,
								m: _(s[Z]) * n,
								s: _(s[Q]) * n,
								ms: _(St(s[de] * 1e3)) * n
							}))
						: (s = gr.exec(t))
							? ((n = s[1] === '-' ? -1 : 1),
								(i = {
									y: le(s[2], n),
									M: le(s[3], n),
									w: le(s[4], n),
									d: le(s[5], n),
									h: le(s[6], n),
									m: le(s[7], n),
									s: le(s[8], n)
								}))
							: i == null
								? (i = {})
								: typeof i == 'object' &&
									('from' in i || 'to' in i) &&
									((a = vr(P(i.from), P(i.to))),
									(i = {}),
									(i.ms = a.milliseconds),
									(i.M = a.months)),
			(r = new ht(i)),
			Ve(t) && v(t, '_locale') && (r._locale = t._locale),
			Ve(t) && v(t, '_isValid') && (r._isValid = t._isValid),
			r
		);
	}
	V.fn = ht.prototype;
	V.invalid = nr;
	function le(t, e) {
		var i = t && parseFloat(t.replace(',', '.'));
		return (isNaN(i) ? 0 : i) * e;
	}
	function Kt(t, e) {
		var i = {};
		return (
			(i.months = e.month() - t.month() + (e.year() - t.year()) * 12),
			t.clone().add(i.months, 'M').isAfter(e) && --i.months,
			(i.milliseconds = +e - +t.clone().add(i.months, 'M')),
			i
		);
	}
	function vr(t, e) {
		var i;
		return t.isValid() && e.isValid()
			? ((e = Ut(e, t)),
				t.isBefore(e)
					? (i = Kt(t, e))
					: ((i = Kt(e, t)), (i.milliseconds = -i.milliseconds), (i.months = -i.months)),
				i)
			: { milliseconds: 0, months: 0 };
	}
	function Fi(t, e) {
		return function (i, s) {
			var n, r;
			return (
				s !== null &&
					!isNaN(+s) &&
					(ui(
						e,
						'moment().' +
							e +
							'(period, number) is deprecated. Please use moment().' +
							e +
							'(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
					),
					(r = i),
					(i = s),
					(s = r)),
				(n = V(i, s)),
				Ni(this, n, t),
				this
			);
		};
	}
	function Ni(t, e, i, s) {
		var n = e._milliseconds,
			r = St(e._days),
			a = St(e._months);
		t.isValid() &&
			((s = s ?? !0),
			a && Di(t, $e(t, 'Month') + a * i),
			r && mi(t, 'Date', $e(t, 'Date') + r * i),
			n && t._d.setTime(t._d.valueOf() + n * i),
			s && c.updateOffset(t, r || a));
	}
	var wr = Fi(1, 'add'),
		Sr = Fi(-1, 'subtract');
	function Wi(t) {
		return typeof t == 'string' || t instanceof String;
	}
	function Dr(t) {
		return U(t) || Ye(t) || Wi(t) || te(t) || Mr(t) || Pr(t) || t === null || t === void 0;
	}
	function Pr(t) {
		var e = ue(t) && !xt(t),
			i = !1,
			s = [
				'years',
				'year',
				'y',
				'months',
				'month',
				'M',
				'days',
				'day',
				'd',
				'dates',
				'date',
				'D',
				'hours',
				'hour',
				'h',
				'minutes',
				'minute',
				'm',
				'seconds',
				'second',
				's',
				'milliseconds',
				'millisecond',
				'ms'
			],
			n,
			r,
			a = s.length;
		for (n = 0; n < a; n += 1) (r = s[n]), (i = i || v(t, r));
		return e && i;
	}
	function Mr(t) {
		var e = H(t),
			i = !1;
		return (
			e &&
				(i =
					t.filter(function (s) {
						return !te(s) && Wi(t);
					}).length === 0),
			e && i
		);
	}
	function Or(t) {
		var e = ue(t) && !xt(t),
			i = !1,
			s = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
			n,
			r;
		for (n = 0; n < s.length; n += 1) (r = s[n]), (i = i || v(t, r));
		return e && i;
	}
	function br(t, e) {
		var i = t.diff(e, 'days', !0);
		return i < -6
			? 'sameElse'
			: i < -1
				? 'lastWeek'
				: i < 0
					? 'lastDay'
					: i < 1
						? 'sameDay'
						: i < 2
							? 'nextDay'
							: i < 7
								? 'nextWeek'
								: 'sameElse';
	}
	function xr(t, e) {
		arguments.length === 1 &&
			(arguments[0]
				? Dr(arguments[0])
					? ((t = arguments[0]), (e = void 0))
					: Or(arguments[0]) && ((e = arguments[0]), (t = void 0))
				: ((t = void 0), (e = void 0)));
		var i = t || P(),
			s = Ut(i, this).startOf('day'),
			n = c.calendarFormat(this, s) || 'sameElse',
			r = e && (q(e[n]) ? e[n].call(this, i) : e[n]);
		return this.format(r || this.localeData().calendar(n, this, P(i)));
	}
	function Tr() {
		return new Re(this);
	}
	function kr(t, e) {
		var i = U(t) ? t : P(t);
		return this.isValid() && i.isValid()
			? ((e = W(e) || 'millisecond'),
				e === 'millisecond'
					? this.valueOf() > i.valueOf()
					: i.valueOf() < this.clone().startOf(e).valueOf())
			: !1;
	}
	function Lr(t, e) {
		var i = U(t) ? t : P(t);
		return this.isValid() && i.isValid()
			? ((e = W(e) || 'millisecond'),
				e === 'millisecond'
					? this.valueOf() < i.valueOf()
					: this.clone().endOf(e).valueOf() < i.valueOf())
			: !1;
	}
	function Ir(t, e, i, s) {
		var n = U(t) ? t : P(t),
			r = U(e) ? e : P(e);
		return this.isValid() && n.isValid() && r.isValid()
			? ((s = s || '()'),
				(s[0] === '(' ? this.isAfter(n, i) : !this.isBefore(n, i)) &&
					(s[1] === ')' ? this.isBefore(r, i) : !this.isAfter(r, i)))
			: !1;
	}
	function Cr(t, e) {
		var i = U(t) ? t : P(t),
			s;
		return this.isValid() && i.isValid()
			? ((e = W(e) || 'millisecond'),
				e === 'millisecond'
					? this.valueOf() === i.valueOf()
					: ((s = i.valueOf()),
						this.clone().startOf(e).valueOf() <= s && s <= this.clone().endOf(e).valueOf()))
			: !1;
	}
	function Ar(t, e) {
		return this.isSame(t, e) || this.isAfter(t, e);
	}
	function Er(t, e) {
		return this.isSame(t, e) || this.isBefore(t, e);
	}
	function Yr(t, e, i) {
		var s, n, r;
		if (!this.isValid()) return NaN;
		if (((s = Ut(t, this)), !s.isValid())) return NaN;
		switch (((n = (s.utcOffset() - this.utcOffset()) * 6e4), (e = W(e)), e)) {
			case 'year':
				r = Be(this, s) / 12;
				break;
			case 'month':
				r = Be(this, s);
				break;
			case 'quarter':
				r = Be(this, s) / 3;
				break;
			case 'second':
				r = (this - s) / 1e3;
				break;
			case 'minute':
				r = (this - s) / 6e4;
				break;
			case 'hour':
				r = (this - s) / 36e5;
				break;
			case 'day':
				r = (this - s - n) / 864e5;
				break;
			case 'week':
				r = (this - s - n) / 6048e5;
				break;
			default:
				r = this - s;
		}
		return i ? r : F(r);
	}
	function Be(t, e) {
		if (t.date() < e.date()) return -Be(e, t);
		var i = (e.year() - t.year()) * 12 + (e.month() - t.month()),
			s = t.clone().add(i, 'months'),
			n,
			r;
		return (
			e - s < 0
				? ((n = t.clone().add(i - 1, 'months')), (r = (e - s) / (s - n)))
				: ((n = t.clone().add(i + 1, 'months')), (r = (e - s) / (n - s))),
			-(i + r) || 0
		);
	}
	c.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	c.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
	function Rr() {
		return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	}
	function zr(t) {
		if (!this.isValid()) return null;
		var e = t !== !0,
			i = e ? this.clone().utc() : this;
		return i.year() < 0 || i.year() > 9999
			? Ue(i, e ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ')
			: q(Date.prototype.toISOString)
				? e
					? this.toDate().toISOString()
					: new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
							.toISOString()
							.replace('Z', Ue(i, 'Z'))
				: Ue(i, e ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
	}
	function Fr() {
		if (!this.isValid()) return 'moment.invalid(/* ' + this._i + ' */)';
		var t = 'moment',
			e = '',
			i,
			s,
			n,
			r;
		return (
			this.isLocal() ||
				((t = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone'), (e = 'Z')),
			(i = '[' + t + '("]'),
			(s = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY'),
			(n = '-MM-DD[T]HH:mm:ss.SSS'),
			(r = e + '[")]'),
			this.format(i + s + n + r)
		);
	}
	function Nr(t) {
		t || (t = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);
		var e = Ue(this, t);
		return this.localeData().postformat(e);
	}
	function Wr(t, e) {
		return this.isValid() && ((U(t) && t.isValid()) || P(t).isValid())
			? V({ to: this, from: t }).locale(this.locale()).humanize(!e)
			: this.localeData().invalidDate();
	}
	function Zr(t) {
		return this.from(P(), t);
	}
	function Hr(t, e) {
		return this.isValid() && ((U(t) && t.isValid()) || P(t).isValid())
			? V({ from: this, to: t }).locale(this.locale()).humanize(!e)
			: this.localeData().invalidDate();
	}
	function Ur(t) {
		return this.to(P(), t);
	}
	function Zi(t) {
		var e;
		return t === void 0 ? this._locale._abbr : ((e = ie(t)), e != null && (this._locale = e), this);
	}
	var Hi = N(
		'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
		function (t) {
			return t === void 0 ? this.localeData() : this.locale(t);
		}
	);
	function Ui() {
		return this._locale;
	}
	var Xe = 1e3,
		ve = 60 * Xe,
		Je = 60 * ve,
		Vi = (365 * 400 + 97) * 24 * Je;
	function we(t, e) {
		return ((t % e) + e) % e;
	}
	function Bi(t, e, i) {
		return t < 100 && t >= 0 ? new Date(t + 400, e, i) - Vi : new Date(t, e, i).valueOf();
	}
	function Gi(t, e, i) {
		return t < 100 && t >= 0 ? Date.UTC(t + 400, e, i) - Vi : Date.UTC(t, e, i);
	}
	function Vr(t) {
		var e, i;
		if (((t = W(t)), t === void 0 || t === 'millisecond' || !this.isValid())) return this;
		switch (((i = this._isUTC ? Gi : Bi), t)) {
			case 'year':
				e = i(this.year(), 0, 1);
				break;
			case 'quarter':
				e = i(this.year(), this.month() - (this.month() % 3), 1);
				break;
			case 'month':
				e = i(this.year(), this.month(), 1);
				break;
			case 'week':
				e = i(this.year(), this.month(), this.date() - this.weekday());
				break;
			case 'isoWeek':
				e = i(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
				break;
			case 'day':
			case 'date':
				e = i(this.year(), this.month(), this.date());
				break;
			case 'hour':
				(e = this._d.valueOf()), (e -= we(e + (this._isUTC ? 0 : this.utcOffset() * ve), Je));
				break;
			case 'minute':
				(e = this._d.valueOf()), (e -= we(e, ve));
				break;
			case 'second':
				(e = this._d.valueOf()), (e -= we(e, Xe));
				break;
		}
		return this._d.setTime(e), c.updateOffset(this, !0), this;
	}
	function Br(t) {
		var e, i;
		if (((t = W(t)), t === void 0 || t === 'millisecond' || !this.isValid())) return this;
		switch (((i = this._isUTC ? Gi : Bi), t)) {
			case 'year':
				e = i(this.year() + 1, 0, 1) - 1;
				break;
			case 'quarter':
				e = i(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
				break;
			case 'month':
				e = i(this.year(), this.month() + 1, 1) - 1;
				break;
			case 'week':
				e = i(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
				break;
			case 'isoWeek':
				e = i(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
				break;
			case 'day':
			case 'date':
				e = i(this.year(), this.month(), this.date() + 1) - 1;
				break;
			case 'hour':
				(e = this._d.valueOf()),
					(e += Je - we(e + (this._isUTC ? 0 : this.utcOffset() * ve), Je) - 1);
				break;
			case 'minute':
				(e = this._d.valueOf()), (e += ve - we(e, ve) - 1);
				break;
			case 'second':
				(e = this._d.valueOf()), (e += Xe - we(e, Xe) - 1);
				break;
		}
		return this._d.setTime(e), c.updateOffset(this, !0), this;
	}
	function Gr() {
		return this._d.valueOf() - (this._offset || 0) * 6e4;
	}
	function jr() {
		return Math.floor(this.valueOf() / 1e3);
	}
	function $r() {
		return new Date(this.valueOf());
	}
	function qr() {
		var t = this;
		return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()];
	}
	function Kr() {
		var t = this;
		return {
			years: t.year(),
			months: t.month(),
			date: t.date(),
			hours: t.hours(),
			minutes: t.minutes(),
			seconds: t.seconds(),
			milliseconds: t.milliseconds()
		};
	}
	function Xr() {
		return this.isValid() ? this.toISOString() : null;
	}
	function Jr() {
		return Tt(this);
	}
	function Qr() {
		return re({}, m(this));
	}
	function ea() {
		return m(this).overflow;
	}
	function ta() {
		return {
			input: this._i,
			format: this._f,
			locale: this._locale,
			isUTC: this._isUTC,
			strict: this._strict
		};
	}
	p('N', 0, 0, 'eraAbbr');
	p('NN', 0, 0, 'eraAbbr');
	p('NNN', 0, 0, 'eraAbbr');
	p('NNNN', 0, 0, 'eraName');
	p('NNNNN', 0, 0, 'eraNarrow');
	p('y', ['y', 1], 'yo', 'eraYear');
	p('y', ['yy', 2], 0, 'eraYear');
	p('y', ['yyy', 3], 0, 'eraYear');
	p('y', ['yyyy', 4], 0, 'eraYear');
	u('N', Vt);
	u('NN', Vt);
	u('NNN', Vt);
	u('NNNN', ua);
	u('NNNNN', fa);
	D(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (t, e, i, s) {
		var n = i._locale.erasParse(t, s, i._strict);
		n ? (m(i).era = n) : (m(i).invalidEra = t);
	});
	u('y', De);
	u('yy', De);
	u('yyy', De);
	u('yyyy', De);
	u('yo', pa);
	D(['y', 'yy', 'yyy', 'yyyy'], k);
	D(['yo'], function (t, e, i, s) {
		var n;
		i._locale._eraYearOrdinalRegex && (n = t.match(i._locale._eraYearOrdinalRegex)),
			i._locale.eraYearOrdinalParse
				? (e[k] = i._locale.eraYearOrdinalParse(t, n))
				: (e[k] = parseInt(t, 10));
	});
	function ia(t, e) {
		var i,
			s,
			n,
			r = this._eras || ie('en')._eras;
		for (i = 0, s = r.length; i < s; ++i) {
			switch (typeof r[i].since) {
				case 'string':
					(n = c(r[i].since).startOf('day')), (r[i].since = n.valueOf());
					break;
			}
			switch (typeof r[i].until) {
				case 'undefined':
					r[i].until = 1 / 0;
					break;
				case 'string':
					(n = c(r[i].until).startOf('day').valueOf()), (r[i].until = n.valueOf());
					break;
			}
		}
		return r;
	}
	function sa(t, e, i) {
		var s,
			n,
			r = this.eras(),
			a,
			o,
			l;
		for (t = t.toUpperCase(), s = 0, n = r.length; s < n; ++s)
			if (
				((a = r[s].name.toUpperCase()),
				(o = r[s].abbr.toUpperCase()),
				(l = r[s].narrow.toUpperCase()),
				i)
			)
				switch (e) {
					case 'N':
					case 'NN':
					case 'NNN':
						if (o === t) return r[s];
						break;
					case 'NNNN':
						if (a === t) return r[s];
						break;
					case 'NNNNN':
						if (l === t) return r[s];
						break;
				}
			else if ([a, o, l].indexOf(t) >= 0) return r[s];
	}
	function na(t, e) {
		var i = t.since <= t.until ? 1 : -1;
		return e === void 0 ? c(t.since).year() : c(t.since).year() + (e - t.offset) * i;
	}
	function ra() {
		var t,
			e,
			i,
			s = this.localeData().eras();
		for (t = 0, e = s.length; t < e; ++t)
			if (
				((i = this.clone().startOf('day').valueOf()),
				(s[t].since <= i && i <= s[t].until) || (s[t].until <= i && i <= s[t].since))
			)
				return s[t].name;
		return '';
	}
	function aa() {
		var t,
			e,
			i,
			s = this.localeData().eras();
		for (t = 0, e = s.length; t < e; ++t)
			if (
				((i = this.clone().startOf('day').valueOf()),
				(s[t].since <= i && i <= s[t].until) || (s[t].until <= i && i <= s[t].since))
			)
				return s[t].narrow;
		return '';
	}
	function oa() {
		var t,
			e,
			i,
			s = this.localeData().eras();
		for (t = 0, e = s.length; t < e; ++t)
			if (
				((i = this.clone().startOf('day').valueOf()),
				(s[t].since <= i && i <= s[t].until) || (s[t].until <= i && i <= s[t].since))
			)
				return s[t].abbr;
		return '';
	}
	function la() {
		var t,
			e,
			i,
			s,
			n = this.localeData().eras();
		for (t = 0, e = n.length; t < e; ++t)
			if (
				((i = n[t].since <= n[t].until ? 1 : -1),
				(s = this.clone().startOf('day').valueOf()),
				(n[t].since <= s && s <= n[t].until) || (n[t].until <= s && s <= n[t].since))
			)
				return (this.year() - c(n[t].since).year()) * i + n[t].offset;
		return this.year();
	}
	function ha(t) {
		return v(this, '_erasNameRegex') || Bt.call(this), t ? this._erasNameRegex : this._erasRegex;
	}
	function da(t) {
		return v(this, '_erasAbbrRegex') || Bt.call(this), t ? this._erasAbbrRegex : this._erasRegex;
	}
	function ca(t) {
		return (
			v(this, '_erasNarrowRegex') || Bt.call(this), t ? this._erasNarrowRegex : this._erasRegex
		);
	}
	function Vt(t, e) {
		return e.erasAbbrRegex(t);
	}
	function ua(t, e) {
		return e.erasNameRegex(t);
	}
	function fa(t, e) {
		return e.erasNarrowRegex(t);
	}
	function pa(t, e) {
		return e._eraYearOrdinalRegex || De;
	}
	function Bt() {
		var t = [],
			e = [],
			i = [],
			s = [],
			n,
			r,
			a = this.eras();
		for (n = 0, r = a.length; n < r; ++n)
			e.push(A(a[n].name)),
				t.push(A(a[n].abbr)),
				i.push(A(a[n].narrow)),
				s.push(A(a[n].name)),
				s.push(A(a[n].abbr)),
				s.push(A(a[n].narrow));
		(this._erasRegex = new RegExp('^(' + s.join('|') + ')', 'i')),
			(this._erasNameRegex = new RegExp('^(' + e.join('|') + ')', 'i')),
			(this._erasAbbrRegex = new RegExp('^(' + t.join('|') + ')', 'i')),
			(this._erasNarrowRegex = new RegExp('^(' + i.join('|') + ')', 'i'));
	}
	p(0, ['gg', 2], 0, function () {
		return this.weekYear() % 100;
	});
	p(0, ['GG', 2], 0, function () {
		return this.isoWeekYear() % 100;
	});
	function dt(t, e) {
		p(0, [t, t.length], 0, e);
	}
	dt('gggg', 'weekYear');
	dt('ggggg', 'weekYear');
	dt('GGGG', 'isoWeekYear');
	dt('GGGGG', 'isoWeekYear');
	L('weekYear', 'gg');
	L('isoWeekYear', 'GG');
	I('weekYear', 1);
	I('isoWeekYear', 1);
	u('G', rt);
	u('g', rt);
	u('GG', M, Y);
	u('gg', M, Y);
	u('GGGG', Et, At);
	u('gggg', Et, At);
	u('GGGGG', nt, it);
	u('ggggg', nt, it);
	Fe(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (t, e, i, s) {
		e[s.substr(0, 2)] = _(t);
	});
	Fe(['gg', 'GG'], function (t, e, i, s) {
		e[s] = c.parseTwoDigitYear(t);
	});
	function ma(t) {
		return ji.call(
			this,
			t,
			this.week(),
			this.weekday(),
			this.localeData()._week.dow,
			this.localeData()._week.doy
		);
	}
	function _a(t) {
		return ji.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
	}
	function ya() {
		return ee(this.year(), 1, 4);
	}
	function ga() {
		return ee(this.isoWeekYear(), 1, 4);
	}
	function va() {
		var t = this.localeData()._week;
		return ee(this.year(), t.dow, t.doy);
	}
	function wa() {
		var t = this.localeData()._week;
		return ee(this.weekYear(), t.dow, t.doy);
	}
	function ji(t, e, i, s, n) {
		var r;
		return t == null
			? Ce(this, s, n).year
			: ((r = ee(t, s, n)), e > r && (e = r), Sa.call(this, t, e, i, s, n));
	}
	function Sa(t, e, i, s, n) {
		var r = bi(t, e, i, s, n),
			a = Ie(r.year, 0, r.dayOfYear);
		return (
			this.year(a.getUTCFullYear()), this.month(a.getUTCMonth()), this.date(a.getUTCDate()), this
		);
	}
	p('Q', 0, 'Qo', 'quarter');
	L('quarter', 'Q');
	I('quarter', 7);
	u('Q', _i);
	D('Q', function (t, e) {
		e[J] = (_(t) - 1) * 3;
	});
	function Da(t) {
		return t == null
			? Math.ceil((this.month() + 1) / 3)
			: this.month((t - 1) * 3 + (this.month() % 3));
	}
	p('D', ['DD', 2], 'Do', 'date');
	L('date', 'D');
	I('date', 9);
	u('D', M);
	u('DD', M, Y);
	u('Do', function (t, e) {
		return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient;
	});
	D(['D', 'DD'], G);
	D('Do', function (t, e) {
		e[G] = _(t.match(M)[0]);
	});
	var $i = Se('Date', !0);
	p('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
	L('dayOfYear', 'DDD');
	I('dayOfYear', 4);
	u('DDD', st);
	u('DDDD', yi);
	D(['DDD', 'DDDD'], function (t, e, i) {
		i._dayOfYear = _(t);
	});
	function Pa(t) {
		var e = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
		return t == null ? e : this.add(t - e, 'd');
	}
	p('m', ['mm', 2], 0, 'minute');
	L('minute', 'm');
	I('minute', 14);
	u('m', M);
	u('mm', M, Y);
	D(['m', 'mm'], Z);
	var Ma = Se('Minutes', !1);
	p('s', ['ss', 2], 0, 'second');
	L('second', 's');
	I('second', 15);
	u('s', M);
	u('ss', M, Y);
	D(['s', 'ss'], Q);
	var Oa = Se('Seconds', !1);
	p('S', 0, 0, function () {
		return ~~(this.millisecond() / 100);
	});
	p(0, ['SS', 2], 0, function () {
		return ~~(this.millisecond() / 10);
	});
	p(0, ['SSS', 3], 0, 'millisecond');
	p(0, ['SSSS', 4], 0, function () {
		return this.millisecond() * 10;
	});
	p(0, ['SSSSS', 5], 0, function () {
		return this.millisecond() * 100;
	});
	p(0, ['SSSSSS', 6], 0, function () {
		return this.millisecond() * 1e3;
	});
	p(0, ['SSSSSSS', 7], 0, function () {
		return this.millisecond() * 1e4;
	});
	p(0, ['SSSSSSSS', 8], 0, function () {
		return this.millisecond() * 1e5;
	});
	p(0, ['SSSSSSSSS', 9], 0, function () {
		return this.millisecond() * 1e6;
	});
	L('millisecond', 'ms');
	I('millisecond', 16);
	u('S', st, _i);
	u('SS', st, Y);
	u('SSS', st, yi);
	var ae, qi;
	for (ae = 'SSSS'; ae.length <= 9; ae += 'S') u(ae, De);
	function ba(t, e) {
		e[de] = _(('0.' + t) * 1e3);
	}
	for (ae = 'S'; ae.length <= 9; ae += 'S') D(ae, ba);
	qi = Se('Milliseconds', !1);
	p('z', 0, 0, 'zoneAbbr');
	p('zz', 0, 0, 'zoneName');
	function xa() {
		return this._isUTC ? 'UTC' : '';
	}
	function Ta() {
		return this._isUTC ? 'Coordinated Universal Time' : '';
	}
	var d = Re.prototype;
	d.add = wr;
	d.calendar = xr;
	d.clone = Tr;
	d.diff = Yr;
	d.endOf = Br;
	d.format = Nr;
	d.from = Wr;
	d.fromNow = Zr;
	d.to = Hr;
	d.toNow = Ur;
	d.get = ks;
	d.invalidAt = ea;
	d.isAfter = kr;
	d.isBefore = Lr;
	d.isBetween = Ir;
	d.isSame = Cr;
	d.isSameOrAfter = Ar;
	d.isSameOrBefore = Er;
	d.isValid = Jr;
	d.lang = Hi;
	d.locale = Zi;
	d.localeData = Ui;
	d.max = Jn;
	d.min = Xn;
	d.parsingFlags = Qr;
	d.set = Ls;
	d.startOf = Vr;
	d.subtract = Sr;
	d.toArray = qr;
	d.toObject = Kr;
	d.toDate = $r;
	d.toISOString = zr;
	d.inspect = Fr;
	typeof Symbol < 'u' &&
		Symbol.for != null &&
		(d[Symbol.for('nodejs.util.inspect.custom')] = function () {
			return 'Moment<' + this.format() + '>';
		});
	d.toJSON = Xr;
	d.toString = Rr;
	d.unix = jr;
	d.valueOf = Gr;
	d.creationData = ta;
	d.eraName = ra;
	d.eraNarrow = aa;
	d.eraAbbr = oa;
	d.eraYear = la;
	d.year = Oi;
	d.isLeapYear = qs;
	d.weekYear = ma;
	d.isoWeekYear = _a;
	d.quarter = d.quarters = Da;
	d.month = Pi;
	d.daysInMonth = Gs;
	d.week = d.weeks = tn;
	d.isoWeek = d.isoWeeks = sn;
	d.weeksInYear = va;
	d.weeksInWeekYear = wa;
	d.isoWeeksInYear = ya;
	d.isoWeeksInISOWeekYear = ga;
	d.date = $i;
	d.day = d.days = _n;
	d.weekday = yn;
	d.isoWeekday = gn;
	d.dayOfYear = Pa;
	d.hour = d.hours = On;
	d.minute = d.minutes = Ma;
	d.second = d.seconds = Oa;
	d.millisecond = d.milliseconds = qi;
	d.utcOffset = or;
	d.utc = hr;
	d.local = dr;
	d.parseZone = cr;
	d.hasAlignedHourOffset = ur;
	d.isDST = fr;
	d.isLocal = mr;
	d.isUtcOffset = _r;
	d.isUtc = zi;
	d.isUTC = zi;
	d.zoneAbbr = xa;
	d.zoneName = Ta;
	d.dates = N('dates accessor is deprecated. Use date instead.', $i);
	d.months = N('months accessor is deprecated. Use month instead', Pi);
	d.years = N('years accessor is deprecated. Use year instead', Oi);
	d.zone = N(
		'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
		lr
	);
	d.isDSTShifted = N(
		'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
		pr
	);
	function ka(t) {
		return P(t * 1e3);
	}
	function La() {
		return P.apply(null, arguments).parseZone();
	}
	function Ki(t) {
		return t;
	}
	var w = Lt.prototype;
	w.calendar = ms;
	w.longDateFormat = vs;
	w.invalidDate = Ss;
	w.ordinal = Ms;
	w.preparse = Ki;
	w.postformat = Ki;
	w.relativeTime = bs;
	w.pastFuture = xs;
	w.set = fs;
	w.eras = ia;
	w.erasParse = sa;
	w.erasConvertYear = na;
	w.erasAbbrRegex = da;
	w.erasNameRegex = ha;
	w.erasNarrowRegex = ca;
	w.months = Hs;
	w.monthsShort = Us;
	w.monthsParse = Bs;
	w.monthsRegex = $s;
	w.monthsShortRegex = js;
	w.week = Xs;
	w.firstDayOfYear = en;
	w.firstDayOfWeek = Qs;
	w.weekdays = cn;
	w.weekdaysMin = fn;
	w.weekdaysShort = un;
	w.weekdaysParse = mn;
	w.weekdaysRegex = vn;
	w.weekdaysShortRegex = wn;
	w.weekdaysMinRegex = Sn;
	w.isPM = Pn;
	w.meridiem = bn;
	function Qe(t, e, i, s) {
		var n = ie(),
			r = $().set(s, e);
		return n[i](r, t);
	}
	function Xi(t, e, i) {
		if ((te(t) && ((e = t), (t = void 0)), (t = t || ''), e != null)) return Qe(t, e, i, 'month');
		var s,
			n = [];
		for (s = 0; s < 12; s++) n[s] = Qe(t, s, i, 'month');
		return n;
	}
	function Gt(t, e, i, s) {
		typeof t == 'boolean'
			? (te(e) && ((i = e), (e = void 0)), (e = e || ''))
			: ((e = t), (i = e), (t = !1), te(e) && ((i = e), (e = void 0)), (e = e || ''));
		var n = ie(),
			r = t ? n._week.dow : 0,
			a,
			o = [];
		if (i != null) return Qe(e, (i + r) % 7, s, 'day');
		for (a = 0; a < 7; a++) o[a] = Qe(e, (a + r) % 7, s, 'day');
		return o;
	}
	function Ia(t, e) {
		return Xi(t, e, 'months');
	}
	function Ca(t, e) {
		return Xi(t, e, 'monthsShort');
	}
	function Aa(t, e, i) {
		return Gt(t, e, i, 'weekdays');
	}
	function Ea(t, e, i) {
		return Gt(t, e, i, 'weekdaysShort');
	}
	function Ya(t, e, i) {
		return Gt(t, e, i, 'weekdaysMin');
	}
	oe('en', {
		eras: [
			{
				since: '0001-01-01',
				until: 1 / 0,
				offset: 1,
				name: 'Anno Domini',
				narrow: 'AD',
				abbr: 'AD'
			},
			{
				since: '0000-12-31',
				until: -1 / 0,
				offset: 1,
				name: 'Before Christ',
				narrow: 'BC',
				abbr: 'BC'
			}
		],
		dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function (t) {
			var e = t % 10,
				i =
					_((t % 100) / 10) === 1 ? 'th' : e === 1 ? 'st' : e === 2 ? 'nd' : e === 3 ? 'rd' : 'th';
			return t + i;
		}
	});
	c.lang = N('moment.lang is deprecated. Use moment.locale instead.', oe);
	c.langData = N('moment.langData is deprecated. Use moment.localeData instead.', ie);
	var K = Math.abs;
	function Ra() {
		var t = this._data;
		return (
			(this._milliseconds = K(this._milliseconds)),
			(this._days = K(this._days)),
			(this._months = K(this._months)),
			(t.milliseconds = K(t.milliseconds)),
			(t.seconds = K(t.seconds)),
			(t.minutes = K(t.minutes)),
			(t.hours = K(t.hours)),
			(t.months = K(t.months)),
			(t.years = K(t.years)),
			this
		);
	}
	function Ji(t, e, i, s) {
		var n = V(e, i);
		return (
			(t._milliseconds += s * n._milliseconds),
			(t._days += s * n._days),
			(t._months += s * n._months),
			t._bubble()
		);
	}
	function za(t, e) {
		return Ji(this, t, e, 1);
	}
	function Fa(t, e) {
		return Ji(this, t, e, -1);
	}
	function Xt(t) {
		return t < 0 ? Math.floor(t) : Math.ceil(t);
	}
	function Na() {
		var t = this._milliseconds,
			e = this._days,
			i = this._months,
			s = this._data,
			n,
			r,
			a,
			o,
			l;
		return (
			(t >= 0 && e >= 0 && i >= 0) ||
				(t <= 0 && e <= 0 && i <= 0) ||
				((t += Xt(Pt(i) + e) * 864e5), (e = 0), (i = 0)),
			(s.milliseconds = t % 1e3),
			(n = F(t / 1e3)),
			(s.seconds = n % 60),
			(r = F(n / 60)),
			(s.minutes = r % 60),
			(a = F(r / 60)),
			(s.hours = a % 24),
			(e += F(a / 24)),
			(l = F(Qi(e))),
			(i += l),
			(e -= Xt(Pt(l))),
			(o = F(i / 12)),
			(i %= 12),
			(s.days = e),
			(s.months = i),
			(s.years = o),
			this
		);
	}
	function Qi(t) {
		return (t * 4800) / 146097;
	}
	function Pt(t) {
		return (t * 146097) / 4800;
	}
	function Wa(t) {
		if (!this.isValid()) return NaN;
		var e,
			i,
			s = this._milliseconds;
		if (((t = W(t)), t === 'month' || t === 'quarter' || t === 'year'))
			switch (((e = this._days + s / 864e5), (i = this._months + Qi(e)), t)) {
				case 'month':
					return i;
				case 'quarter':
					return i / 3;
				case 'year':
					return i / 12;
			}
		else
			switch (((e = this._days + Math.round(Pt(this._months))), t)) {
				case 'week':
					return e / 7 + s / 6048e5;
				case 'day':
					return e + s / 864e5;
				case 'hour':
					return e * 24 + s / 36e5;
				case 'minute':
					return e * 1440 + s / 6e4;
				case 'second':
					return e * 86400 + s / 1e3;
				case 'millisecond':
					return Math.floor(e * 864e5) + s;
				default:
					throw new Error('Unknown unit ' + t);
			}
	}
	function Za() {
		return this.isValid()
			? this._milliseconds +
					this._days * 864e5 +
					(this._months % 12) * 2592e6 +
					_(this._months / 12) * 31536e6
			: NaN;
	}
	function se(t) {
		return function () {
			return this.as(t);
		};
	}
	var Ha = se('ms'),
		Ua = se('s'),
		Va = se('m'),
		Ba = se('h'),
		Ga = se('d'),
		ja = se('w'),
		$a = se('M'),
		qa = se('Q'),
		Ka = se('y');
	function Xa() {
		return V(this);
	}
	function Ja(t) {
		return (t = W(t)), this.isValid() ? this[t + 's']() : NaN;
	}
	function fe(t) {
		return function () {
			return this.isValid() ? this._data[t] : NaN;
		};
	}
	var Qa = fe('milliseconds'),
		eo = fe('seconds'),
		to = fe('minutes'),
		io = fe('hours'),
		so = fe('days'),
		no = fe('months'),
		ro = fe('years');
	function ao() {
		return F(this.days() / 7);
	}
	var X = Math.round,
		ye = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
	function oo(t, e, i, s, n) {
		return n.relativeTime(e || 1, !!i, t, s);
	}
	function lo(t, e, i, s) {
		var n = V(t).abs(),
			r = X(n.as('s')),
			a = X(n.as('m')),
			o = X(n.as('h')),
			l = X(n.as('d')),
			h = X(n.as('M')),
			f = X(n.as('w')),
			y = X(n.as('y')),
			S =
				(r <= i.ss && ['s', r]) ||
				(r < i.s && ['ss', r]) ||
				(a <= 1 && ['m']) ||
				(a < i.m && ['mm', a]) ||
				(o <= 1 && ['h']) ||
				(o < i.h && ['hh', o]) ||
				(l <= 1 && ['d']) ||
				(l < i.d && ['dd', l]);
		return (
			i.w != null && (S = S || (f <= 1 && ['w']) || (f < i.w && ['ww', f])),
			(S = S || (h <= 1 && ['M']) || (h < i.M && ['MM', h]) || (y <= 1 && ['y']) || ['yy', y]),
			(S[2] = e),
			(S[3] = +t > 0),
			(S[4] = s),
			oo.apply(null, S)
		);
	}
	function ho(t) {
		return t === void 0 ? X : typeof t == 'function' ? ((X = t), !0) : !1;
	}
	function co(t, e) {
		return ye[t] === void 0
			? !1
			: e === void 0
				? ye[t]
				: ((ye[t] = e), t === 's' && (ye.ss = e - 1), !0);
	}
	function uo(t, e) {
		if (!this.isValid()) return this.localeData().invalidDate();
		var i = !1,
			s = ye,
			n,
			r;
		return (
			typeof t == 'object' && ((e = t), (t = !1)),
			typeof t == 'boolean' && (i = t),
			typeof e == 'object' &&
				((s = Object.assign({}, ye, e)), e.s != null && e.ss == null && (s.ss = e.s - 1)),
			(n = this.localeData()),
			(r = lo(this, !i, s, n)),
			i && (r = n.pastFuture(+this, r)),
			n.postformat(r)
		);
	}
	var mt = Math.abs;
	function me(t) {
		return (t > 0) - (t < 0) || +t;
	}
	function ct() {
		if (!this.isValid()) return this.localeData().invalidDate();
		var t = mt(this._milliseconds) / 1e3,
			e = mt(this._days),
			i = mt(this._months),
			s,
			n,
			r,
			a,
			o = this.asSeconds(),
			l,
			h,
			f,
			y;
		return o
			? ((s = F(t / 60)),
				(n = F(s / 60)),
				(t %= 60),
				(s %= 60),
				(r = F(i / 12)),
				(i %= 12),
				(a = t ? t.toFixed(3).replace(/\.?0+$/, '') : ''),
				(l = o < 0 ? '-' : ''),
				(h = me(this._months) !== me(o) ? '-' : ''),
				(f = me(this._days) !== me(o) ? '-' : ''),
				(y = me(this._milliseconds) !== me(o) ? '-' : ''),
				l +
					'P' +
					(r ? h + r + 'Y' : '') +
					(i ? h + i + 'M' : '') +
					(e ? f + e + 'D' : '') +
					(n || s || t ? 'T' : '') +
					(n ? y + n + 'H' : '') +
					(s ? y + s + 'M' : '') +
					(t ? y + a + 'S' : ''))
			: 'P0D';
	}
	var g = ht.prototype;
	g.isValid = sr;
	g.abs = Ra;
	g.add = za;
	g.subtract = Fa;
	g.as = Wa;
	g.asMilliseconds = Ha;
	g.asSeconds = Ua;
	g.asMinutes = Va;
	g.asHours = Ba;
	g.asDays = Ga;
	g.asWeeks = ja;
	g.asMonths = $a;
	g.asQuarters = qa;
	g.asYears = Ka;
	g.valueOf = Za;
	g._bubble = Na;
	g.clone = Xa;
	g.get = Ja;
	g.milliseconds = Qa;
	g.seconds = eo;
	g.minutes = to;
	g.hours = io;
	g.days = so;
	g.weeks = ao;
	g.months = no;
	g.years = ro;
	g.humanize = uo;
	g.toISOString = ct;
	g.toString = ct;
	g.toJSON = ct;
	g.locale = Zi;
	g.localeData = Ui;
	g.toIsoString = N(
		'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
		ct
	);
	g.lang = Hi;
	p('X', 0, 0, 'unix');
	p('x', 0, 0, 'valueOf');
	u('x', rt);
	u('X', Cs);
	D('X', function (t, e, i) {
		i._d = new Date(parseFloat(t) * 1e3);
	});
	D('x', function (t, e, i) {
		i._d = new Date(_(t));
	}); //! moment.js
	c.version = '2.29.4';
	cs(P);
	c.fn = d;
	c.min = Qn;
	c.max = er;
	c.now = tr;
	c.utc = $;
	c.unix = ka;
	c.months = Ia;
	c.isDate = Ye;
	c.locale = oe;
	c.invalid = et;
	c.duration = V;
	c.isMoment = U;
	c.weekdays = Aa;
	c.parseZone = La;
	c.localeData = ie;
	c.isDuration = Ve;
	c.monthsShort = Ca;
	c.weekdaysMin = Ya;
	c.defineLocale = Ft;
	c.updateLocale = Ln;
	c.locales = In;
	c.weekdaysShort = Ea;
	c.normalizeUnits = W;
	c.relativeTimeRounding = ho;
	c.relativeTimeThreshold = co;
	c.calendarFormat = br;
	c.prototype = d;
	c.HTML5_FMT = {
		DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
		DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
		DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
		DATE: 'YYYY-MM-DD',
		TIME: 'HH:mm',
		TIME_SECONDS: 'HH:mm:ss',
		TIME_MS: 'HH:mm:ss.SSS',
		WEEK: 'GGGG-[W]WW',
		MONTH: 'YYYY-MM'
	}; //! moment.js locale configuration
	//! locale : French [fr]
	//! author : John Fischer : https://github.com/jfroffice
	var fo =
			/^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
		po = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
		Jt =
			/(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
		_t = [
			/^janv/i,
			/^févr/i,
			/^mars/i,
			/^avr/i,
			/^mai/i,
			/^juin/i,
			/^juil/i,
			/^août/i,
			/^sept/i,
			/^oct/i,
			/^nov/i,
			/^déc/i
		];
	c.defineLocale('fr', {
		months:
			'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
				'_'
			),
		monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
		monthsRegex: Jt,
		monthsShortRegex: Jt,
		monthsStrictRegex: fo,
		monthsShortStrictRegex: po,
		monthsParse: _t,
		longMonthsParse: _t,
		shortMonthsParse: _t,
		weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
		weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
		weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
		weekdaysParseExact: !0,
		longDateFormat: {
			LT: 'HH:mm',
			LTS: 'HH:mm:ss',
			L: 'DD/MM/YYYY',
			LL: 'D MMMM YYYY',
			LLL: 'D MMMM YYYY HH:mm',
			LLLL: 'dddd D MMMM YYYY HH:mm'
		},
		calendar: {
			sameDay: '[Aujourd’hui à] LT',
			nextDay: '[Demain à] LT',
			nextWeek: 'dddd [à] LT',
			lastDay: '[Hier à] LT',
			lastWeek: 'dddd [dernier à] LT',
			sameElse: 'L'
		},
		relativeTime: {
			future: 'dans %s',
			past: 'il y a %s',
			s: 'quelques secondes',
			ss: '%d secondes',
			m: 'une minute',
			mm: '%d minutes',
			h: 'une heure',
			hh: '%d heures',
			d: 'un jour',
			dd: '%d jours',
			w: 'une semaine',
			ww: '%d semaines',
			M: 'un mois',
			MM: '%d mois',
			y: 'un an',
			yy: '%d ans'
		},
		dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
		ordinal: function (t, e) {
			switch (e) {
				case 'D':
					return t + (t === 1 ? 'er' : '');
				default:
				case 'M':
				case 'Q':
				case 'DDD':
				case 'd':
					return t + (t === 1 ? 'er' : 'e');
				case 'w':
				case 'W':
					return t + (t === 1 ? 're' : 'e');
			}
		},
		week: { dow: 1, doy: 4 }
	});
	c.locale('fr');
	function mo() {
		for (let t of document.querySelectorAll('time')) {
			const e = t.getAttribute('datetime');
			t.innerHTML = c(e).fromNow();
		}
	}
	const _o = 'modulepreload',
		yo = function (t) {
			return '/' + t;
		},
		Qt = {},
		go = function (e, i, s) {
			if (!i || i.length === 0) return e();
			const n = document.getElementsByTagName('link');
			return Promise.all(
				i.map((r) => {
					if (((r = yo(r)), r in Qt)) return;
					Qt[r] = !0;
					const a = r.endsWith('.css'),
						o = a ? '[rel="stylesheet"]' : '';
					if (!!s)
						for (let f = n.length - 1; f >= 0; f--) {
							const y = n[f];
							if (y.href === r && (!a || y.rel === 'stylesheet')) return;
						}
					else if (document.querySelector(`link[href="${r}"]${o}`)) return;
					const h = document.createElement('link');
					if (
						((h.rel = a ? 'stylesheet' : _o),
						a || ((h.as = 'script'), (h.crossOrigin = '')),
						(h.href = r),
						document.head.appendChild(h),
						a)
					)
						return new Promise((f, y) => {
							h.addEventListener('load', f),
								h.addEventListener('error', () => y(new Error(`Unable to preload CSS for ${r}`)));
						});
				})
			).then(() => e());
		};
	/*!
	 * PhotoSwipe Lightbox 5.3.7 - https://photoswipe.com
	 * (c) 2023 Dmytro Semenov
	 */ function be(t, e, i) {
		const s = document.createElement(e);
		return t && (s.className = t), i && i.appendChild(s), s;
	}
	function vo(t, e, i) {
		let s = `translate3d(${t}px,${e || 0}px,0)`;
		return i !== void 0 && (s += ` scale3d(${i},${i},1)`), s;
	}
	function Mt(t, e, i) {
		(t.style.width = typeof e == 'number' ? `${e}px` : e),
			(t.style.height = typeof i == 'number' ? `${i}px` : i);
	}
	const R = { IDLE: 'idle', LOADING: 'loading', LOADED: 'loaded', ERROR: 'error' };
	function wo(t) {
		return ('button' in t && t.button === 1) || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
	}
	function Ge(t, e, i = document) {
		let s = [];
		if (t instanceof Element) s = [t];
		else if (t instanceof NodeList || Array.isArray(t)) s = Array.from(t);
		else {
			const n = typeof t == 'string' ? t : e;
			n && (s = Array.from(i.querySelectorAll(n)));
		}
		return s;
	}
	function So(t) {
		return typeof t == 'function' && t.prototype && t.prototype.goTo;
	}
	function ei() {
		return !!(navigator.vendor && navigator.vendor.match(/apple/i));
	}
	let Do = class {
			constructor(e, i) {
				(this.type = e), (this.defaultPrevented = !1), i && Object.assign(this, i);
			}
			preventDefault() {
				this.defaultPrevented = !0;
			}
		},
		Po = class {
			constructor() {
				(this._listeners = {}), (this._filters = {}), (this.pswp = void 0), (this.options = void 0);
			}
			addFilter(e, i, s = 100) {
				var n, r, a;
				this._filters[e] || (this._filters[e] = []),
					(n = this._filters[e]) == null || n.push({ fn: i, priority: s }),
					(r = this._filters[e]) == null || r.sort((o, l) => o.priority - l.priority),
					(a = this.pswp) == null || a.addFilter(e, i, s);
			}
			removeFilter(e, i) {
				this._filters[e] && (this._filters[e] = this._filters[e].filter((s) => s.fn !== i)),
					this.pswp && this.pswp.removeFilter(e, i);
			}
			applyFilters(e, ...i) {
				var s;
				return (
					(s = this._filters[e]) == null ||
						s.forEach((n) => {
							i[0] = n.fn.apply(this, i);
						}),
					i[0]
				);
			}
			on(e, i) {
				var s, n;
				this._listeners[e] || (this._listeners[e] = []),
					(s = this._listeners[e]) == null || s.push(i),
					(n = this.pswp) == null || n.on(e, i);
			}
			off(e, i) {
				var s;
				this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((n) => i !== n)),
					(s = this.pswp) == null || s.off(e, i);
			}
			dispatch(e, i) {
				var n;
				if (this.pswp) return this.pswp.dispatch(e, i);
				const s = new Do(e, i);
				return (
					(n = this._listeners[e]) == null ||
						n.forEach((r) => {
							r.call(this, s);
						}),
					s
				);
			}
		},
		Mo = class {
			constructor(e, i) {
				if (((this.element = be('pswp__img pswp__img--placeholder', e ? 'img' : 'div', i)), e)) {
					const s = this.element;
					(s.decoding = 'async'), (s.alt = ''), (s.src = e), s.setAttribute('role', 'presentation');
				}
				this.element.setAttribute('aria-hidden', 'true');
			}
			setDisplayedSize(e, i) {
				this.element &&
					(this.element.tagName === 'IMG'
						? (Mt(this.element, 250, 'auto'),
							(this.element.style.transformOrigin = '0 0'),
							(this.element.style.transform = vo(0, 0, e / 250)))
						: Mt(this.element, e, i));
			}
			destroy() {
				var e;
				(e = this.element) != null && e.parentNode && this.element.remove(), (this.element = null);
			}
		},
		Oo = class {
			constructor(e, i, s) {
				(this.instance = i),
					(this.data = e),
					(this.index = s),
					(this.element = void 0),
					(this.placeholder = void 0),
					(this.slide = void 0),
					(this.displayedImageWidth = 0),
					(this.displayedImageHeight = 0),
					(this.width = Number(this.data.w) || Number(this.data.width) || 0),
					(this.height = Number(this.data.h) || Number(this.data.height) || 0),
					(this.isAttached = !1),
					(this.hasSlide = !1),
					(this.isDecoding = !1),
					(this.state = R.IDLE),
					this.data.type
						? (this.type = this.data.type)
						: this.data.src
							? (this.type = 'image')
							: (this.type = 'html'),
					this.instance.dispatch('contentInit', { content: this });
			}
			removePlaceholder() {
				this.placeholder &&
					!this.keepPlaceholder() &&
					setTimeout(() => {
						this.placeholder && (this.placeholder.destroy(), (this.placeholder = void 0));
					}, 1e3);
			}
			load(e, i) {
				if (this.slide && this.usePlaceholder())
					if (this.placeholder) {
						const s = this.placeholder.element;
						s && !s.parentElement && this.slide.container.prepend(s);
					} else {
						const s = this.instance.applyFilters(
							'placeholderSrc',
							this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
							this
						);
						this.placeholder = new Mo(s, this.slide.container);
					}
				(this.element && !i) ||
					this.instance.dispatch('contentLoad', { content: this, isLazy: e }).defaultPrevented ||
					(this.isImageContent()
						? ((this.element = be('pswp__img', 'img')),
							this.displayedImageWidth && this.loadImage(e))
						: ((this.element = be('pswp__content', 'div')),
							(this.element.innerHTML = this.data.html || '')),
					i && this.slide && this.slide.updateContentSize(!0));
			}
			loadImage(e) {
				if (
					!this.isImageContent() ||
					!this.element ||
					this.instance.dispatch('contentLoadImage', { content: this, isLazy: e }).defaultPrevented
				)
					return;
				const i = this.element;
				this.updateSrcsetSizes(),
					this.data.srcset && (i.srcset = this.data.srcset),
					(i.src = this.data.src ?? ''),
					(i.alt = this.data.alt ?? ''),
					(this.state = R.LOADING),
					i.complete
						? this.onLoaded()
						: ((i.onload = () => {
								this.onLoaded();
							}),
							(i.onerror = () => {
								this.onError();
							}));
			}
			setSlide(e) {
				(this.slide = e), (this.hasSlide = !0), (this.instance = e.pswp);
			}
			onLoaded() {
				(this.state = R.LOADED),
					this.slide &&
						this.element &&
						(this.instance.dispatch('loadComplete', { slide: this.slide, content: this }),
						this.slide.isActive &&
							this.slide.heavyAppended &&
							!this.element.parentNode &&
							(this.append(), this.slide.updateContentSize(!0)),
						(this.state === R.LOADED || this.state === R.ERROR) && this.removePlaceholder());
			}
			onError() {
				(this.state = R.ERROR),
					this.slide &&
						(this.displayError(),
						this.instance.dispatch('loadComplete', {
							slide: this.slide,
							isError: !0,
							content: this
						}),
						this.instance.dispatch('loadError', { slide: this.slide, content: this }));
			}
			isLoading() {
				return this.instance.applyFilters('isContentLoading', this.state === R.LOADING, this);
			}
			isError() {
				return this.state === R.ERROR;
			}
			isImageContent() {
				return this.type === 'image';
			}
			setDisplayedSize(e, i) {
				if (
					this.element &&
					(this.placeholder && this.placeholder.setDisplayedSize(e, i),
					!this.instance.dispatch('contentResize', { content: this, width: e, height: i })
						.defaultPrevented && (Mt(this.element, e, i), this.isImageContent() && !this.isError()))
				) {
					const s = !this.displayedImageWidth && e;
					(this.displayedImageWidth = e),
						(this.displayedImageHeight = i),
						s ? this.loadImage(!1) : this.updateSrcsetSizes(),
						this.slide &&
							this.instance.dispatch('imageSizeChange', {
								slide: this.slide,
								width: e,
								height: i,
								content: this
							});
				}
			}
			isZoomable() {
				return this.instance.applyFilters(
					'isContentZoomable',
					this.isImageContent() && this.state !== R.ERROR,
					this
				);
			}
			updateSrcsetSizes() {
				if (!this.isImageContent() || !this.element || !this.data.srcset) return;
				const e = this.element,
					i = this.instance.applyFilters('srcsetSizesWidth', this.displayedImageWidth, this);
				(!e.dataset.largestUsedSize || i > parseInt(e.dataset.largestUsedSize, 10)) &&
					((e.sizes = i + 'px'), (e.dataset.largestUsedSize = String(i)));
			}
			usePlaceholder() {
				return this.instance.applyFilters('useContentPlaceholder', this.isImageContent(), this);
			}
			lazyLoad() {
				this.instance.dispatch('contentLazyLoad', { content: this }).defaultPrevented ||
					this.load(!0);
			}
			keepPlaceholder() {
				return this.instance.applyFilters('isKeepingPlaceholder', this.isLoading(), this);
			}
			destroy() {
				(this.hasSlide = !1),
					(this.slide = void 0),
					!this.instance.dispatch('contentDestroy', { content: this }).defaultPrevented &&
						(this.remove(),
						this.placeholder && (this.placeholder.destroy(), (this.placeholder = void 0)),
						this.isImageContent() &&
							this.element &&
							((this.element.onload = null),
							(this.element.onerror = null),
							(this.element = void 0)));
			}
			displayError() {
				var e;
				if (this.slide) {
					let i = be('pswp__error-msg', 'div');
					(i.innerText = ((e = this.instance.options) == null ? void 0 : e.errorMsg) ?? ''),
						(i = this.instance.applyFilters('contentErrorElement', i, this)),
						(this.element = be('pswp__content pswp__error-msg-container', 'div')),
						this.element.appendChild(i),
						(this.slide.container.innerText = ''),
						this.slide.container.appendChild(this.element),
						this.slide.updateContentSize(!0),
						this.removePlaceholder();
				}
			}
			append() {
				if (this.isAttached || !this.element) return;
				if (((this.isAttached = !0), this.state === R.ERROR)) {
					this.displayError();
					return;
				}
				if (this.instance.dispatch('contentAppend', { content: this }).defaultPrevented) return;
				const e = 'decode' in this.element;
				this.isImageContent()
					? e && this.slide && (!this.slide.isActive || ei())
						? ((this.isDecoding = !0),
							this.element
								.decode()
								.catch(() => {})
								.finally(() => {
									(this.isDecoding = !1), this.appendImage();
								}))
						: this.appendImage()
					: this.slide &&
						!this.element.parentNode &&
						this.slide.container.appendChild(this.element);
			}
			activate() {
				this.instance.dispatch('contentActivate', { content: this }).defaultPrevented ||
					!this.slide ||
					(this.isImageContent() && this.isDecoding && !ei()
						? this.appendImage()
						: this.isError() && this.load(!1, !0),
					this.slide.holderElement &&
						this.slide.holderElement.setAttribute('aria-hidden', 'false'));
			}
			deactivate() {
				this.instance.dispatch('contentDeactivate', { content: this }),
					this.slide &&
						this.slide.holderElement &&
						this.slide.holderElement.setAttribute('aria-hidden', 'true');
			}
			remove() {
				(this.isAttached = !1),
					!this.instance.dispatch('contentRemove', { content: this }).defaultPrevented &&
						(this.element && this.element.parentNode && this.element.remove(),
						this.placeholder && this.placeholder.element && this.placeholder.element.remove());
			}
			appendImage() {
				this.isAttached &&
					(this.instance.dispatch('contentAppendImage', { content: this }).defaultPrevented ||
						(this.slide &&
							this.element &&
							!this.element.parentNode &&
							this.slide.container.appendChild(this.element),
						(this.state === R.LOADED || this.state === R.ERROR) && this.removePlaceholder()));
			}
		};
	function bo(t, e) {
		if (t.getViewportSizeFn) {
			const i = t.getViewportSizeFn(t, e);
			if (i) return i;
		}
		return { x: document.documentElement.clientWidth, y: window.innerHeight };
	}
	function He(t, e, i, s, n) {
		let r = 0;
		if (e.paddingFn) r = e.paddingFn(i, s, n)[t];
		else if (e.padding) r = e.padding[t];
		else {
			const a = 'padding' + t[0].toUpperCase() + t.slice(1);
			e[a] && (r = e[a]);
		}
		return Number(r) || 0;
	}
	function xo(t, e, i, s) {
		return {
			x: e.x - He('left', t, e, i, s) - He('right', t, e, i, s),
			y: e.y - He('top', t, e, i, s) - He('bottom', t, e, i, s)
		};
	}
	const ti = 4e3;
	let To = class {
		constructor(e, i, s, n) {
			(this.pswp = n),
				(this.options = e),
				(this.itemData = i),
				(this.index = s),
				(this.panAreaSize = null),
				(this.elementSize = null),
				(this.fit = 1),
				(this.fill = 1),
				(this.vFill = 1),
				(this.initial = 1),
				(this.secondary = 1),
				(this.max = 1),
				(this.min = 1);
		}
		update(e, i, s) {
			const n = { x: e, y: i };
			(this.elementSize = n), (this.panAreaSize = s);
			const r = s.x / n.x,
				a = s.y / n.y;
			(this.fit = Math.min(1, r < a ? r : a)),
				(this.fill = Math.min(1, r > a ? r : a)),
				(this.vFill = Math.min(1, a)),
				(this.initial = this._getInitial()),
				(this.secondary = this._getSecondary()),
				(this.max = Math.max(this.initial, this.secondary, this._getMax())),
				(this.min = Math.min(this.fit, this.initial, this.secondary)),
				this.pswp &&
					this.pswp.dispatch('zoomLevelsUpdate', { zoomLevels: this, slideData: this.itemData });
		}
		_parseZoomLevelOption(e) {
			const i = e + 'ZoomLevel',
				s = this.options[i];
			if (s)
				return typeof s == 'function'
					? s(this)
					: s === 'fill'
						? this.fill
						: s === 'fit'
							? this.fit
							: Number(s);
		}
		_getSecondary() {
			let e = this._parseZoomLevelOption('secondary');
			return (
				e ||
				((e = Math.min(1, this.fit * 3)),
				this.elementSize && e * this.elementSize.x > ti && (e = ti / this.elementSize.x),
				e)
			);
		}
		_getInitial() {
			return this._parseZoomLevelOption('initial') || this.fit;
		}
		_getMax() {
			return this._parseZoomLevelOption('max') || Math.max(1, this.fit * 4);
		}
	};
	function es(t, e, i) {
		const s = e.createContentFromData(t, i);
		let n;
		const { options: r } = e;
		if (r) {
			n = new To(r, t, -1);
			let a;
			e.pswp ? (a = e.pswp.viewportSize) : (a = bo(r, e));
			const o = xo(r, a, t, i);
			n.update(s.width, s.height, o);
		}
		return (
			s.lazyLoad(),
			n && s.setDisplayedSize(Math.ceil(s.width * n.initial), Math.ceil(s.height * n.initial)),
			s
		);
	}
	function ko(t, e) {
		const i = e.getItemData(t);
		if (!e.dispatch('lazyLoadSlide', { index: t, itemData: i }).defaultPrevented)
			return es(i, e, t);
	}
	let Lo = class extends Po {
		getNumItems() {
			var n;
			let e = 0;
			const i = (n = this.options) == null ? void 0 : n.dataSource;
			i && 'length' in i
				? (e = i.length)
				: i &&
					'gallery' in i &&
					(i.items || (i.items = this._getGalleryDOMElements(i.gallery)),
					i.items && (e = i.items.length));
			const s = this.dispatch('numItems', { dataSource: i, numItems: e });
			return this.applyFilters('numItems', s.numItems, i);
		}
		createContentFromData(e, i) {
			return new Oo(e, this, i);
		}
		getItemData(e) {
			var a;
			const i = (a = this.options) == null ? void 0 : a.dataSource;
			let s = {};
			Array.isArray(i)
				? (s = i[e])
				: i &&
					'gallery' in i &&
					(i.items || (i.items = this._getGalleryDOMElements(i.gallery)), (s = i.items[e]));
			let n = s;
			n instanceof Element && (n = this._domElementToItemData(n));
			const r = this.dispatch('itemData', { itemData: n || {}, index: e });
			return this.applyFilters('itemData', r.itemData, e);
		}
		_getGalleryDOMElements(e) {
			var i, s;
			return ((i = this.options) != null && i.children) ||
				((s = this.options) != null && s.childSelector)
				? Ge(this.options.children, this.options.childSelector, e) || []
				: [e];
		}
		_domElementToItemData(e) {
			const i = { element: e },
				s = e.tagName === 'A' ? e : e.querySelector('a');
			if (s) {
				(i.src = s.dataset.pswpSrc || s.href),
					s.dataset.pswpSrcset && (i.srcset = s.dataset.pswpSrcset),
					(i.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0),
					(i.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0),
					(i.w = i.width),
					(i.h = i.height),
					s.dataset.pswpType && (i.type = s.dataset.pswpType);
				const n = e.querySelector('img');
				n && ((i.msrc = n.currentSrc || n.src), (i.alt = n.getAttribute('alt') ?? '')),
					(s.dataset.pswpCropped || s.dataset.cropped) && (i.thumbCropped = !0);
			}
			return this.applyFilters('domItemData', i, e, s);
		}
		lazyLoadData(e, i) {
			return es(e, this, i);
		}
	};
	class Io extends Lo {
		constructor(e) {
			super(),
				(this.options = e || {}),
				(this._uid = 0),
				(this.shouldOpen = !1),
				(this._preloadedContent = void 0),
				(this.onThumbnailsClick = this.onThumbnailsClick.bind(this));
		}
		init() {
			Ge(this.options.gallery, this.options.gallerySelector).forEach((e) => {
				e.addEventListener('click', this.onThumbnailsClick, !1);
			});
		}
		onThumbnailsClick(e) {
			if (wo(e) || window.pswp || window.navigator.onLine === !1) return;
			let i = { x: e.clientX, y: e.clientY };
			!i.x && !i.y && (i = null);
			let s = this.getClickedIndex(e);
			s = this.applyFilters('clickedIndex', s, e, this);
			const n = { gallery: e.currentTarget };
			s >= 0 && (e.preventDefault(), this.loadAndOpen(s, n, i));
		}
		getClickedIndex(e) {
			if (this.options.getClickedIndexFn) return this.options.getClickedIndexFn.call(this, e);
			const i = e.target,
				n = Ge(this.options.children, this.options.childSelector, e.currentTarget).findIndex(
					(r) => r === i || r.contains(i)
				);
			return n !== -1 ? n : this.options.children || this.options.childSelector ? -1 : 0;
		}
		loadAndOpen(e, i, s) {
			return window.pswp
				? !1
				: ((this.options.index = e),
					(this.options.initialPointerPos = s),
					(this.shouldOpen = !0),
					this.preload(e, i),
					!0);
		}
		preload(e, i) {
			const { options: s } = this;
			i && (s.dataSource = i);
			const n = [],
				r = typeof s.pswpModule;
			if (So(s.pswpModule)) n.push(Promise.resolve(s.pswpModule));
			else {
				if (r === 'string') throw new Error('pswpModule as string is no longer supported');
				if (r === 'function') n.push(s.pswpModule());
				else throw new Error('pswpModule is not valid');
			}
			typeof s.openPromise == 'function' && n.push(s.openPromise()),
				s.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = ko(e, this));
			const a = ++this._uid;
			Promise.all(n).then((o) => {
				if (this.shouldOpen) {
					const l = o[0];
					this._openPhotoswipe(l, a);
				}
			});
		}
		_openPhotoswipe(e, i) {
			if ((i !== this._uid && this.shouldOpen) || ((this.shouldOpen = !1), window.pswp)) return;
			const s = typeof e == 'object' ? new e.default(this.options) : new e(this.options);
			(this.pswp = s),
				(window.pswp = s),
				Object.keys(this._listeners).forEach((n) => {
					var r;
					(r = this._listeners[n]) == null ||
						r.forEach((a) => {
							s.on(n, a);
						});
				}),
				Object.keys(this._filters).forEach((n) => {
					var r;
					(r = this._filters[n]) == null ||
						r.forEach((a) => {
							s.addFilter(n, a.fn, a.priority);
						});
				}),
				this._preloadedContent &&
					(s.contentLoader.addToCache(this._preloadedContent), (this._preloadedContent = void 0)),
				s.on('destroy', () => {
					(this.pswp = void 0), delete window.pswp;
				}),
				s.init();
		}
		destroy() {
			var e;
			(e = this.pswp) == null || e.destroy(),
				(this.shouldOpen = !1),
				(this._listeners = {}),
				Ge(this.options.gallery, this.options.gallerySelector).forEach((i) => {
					i.removeEventListener('click', this.onThumbnailsClick, !1);
				});
		}
	}
	/*!
	 * PhotoSwipe 5.3.7 - https://photoswipe.com
	 * (c) 2023 Dmytro Semenov
	 */ function E(t, e, i) {
		const s = document.createElement(e);
		return t && (s.className = t), i && i.appendChild(s), s;
	}
	function x(t, e) {
		return (t.x = e.x), (t.y = e.y), e.id !== void 0 && (t.id = e.id), t;
	}
	function ts(t) {
		(t.x = Math.round(t.x)), (t.y = Math.round(t.y));
	}
	function Ot(t, e) {
		const i = Math.abs(t.x - e.x),
			s = Math.abs(t.y - e.y);
		return Math.sqrt(i * i + s * s);
	}
	function Le(t, e) {
		return t.x === e.x && t.y === e.y;
	}
	function Ne(t, e, i) {
		return Math.min(Math.max(t, e), i);
	}
	function Ee(t, e, i) {
		let s = `translate3d(${t}px,${e || 0}px,0)`;
		return i !== void 0 && (s += ` scale3d(${i},${i},1)`), s;
	}
	function ce(t, e, i, s) {
		t.style.transform = Ee(e, i, s);
	}
	const Co = 'cubic-bezier(.4,0,.22,1)';
	function is(t, e, i, s) {
		t.style.transition = e ? `${e} ${i}ms ${s || Co}` : 'none';
	}
	function bt(t, e, i) {
		(t.style.width = typeof e == 'number' ? `${e}px` : e),
			(t.style.height = typeof i == 'number' ? `${i}px` : i);
	}
	function Ao(t) {
		is(t);
	}
	function Eo(t) {
		return 'decode' in t
			? t.decode().catch(() => {})
			: t.complete
				? Promise.resolve(t)
				: new Promise((e, i) => {
						(t.onload = () => e(t)), (t.onerror = i);
					});
	}
	const z = { IDLE: 'idle', LOADING: 'loading', LOADED: 'loaded', ERROR: 'error' };
	function Yo(t) {
		return ('button' in t && t.button === 1) || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
	}
	function Ro(t, e, i = document) {
		let s = [];
		if (t instanceof Element) s = [t];
		else if (t instanceof NodeList || Array.isArray(t)) s = Array.from(t);
		else {
			const n = typeof t == 'string' ? t : e;
			n && (s = Array.from(i.querySelectorAll(n)));
		}
		return s;
	}
	function ii() {
		return !!(navigator.vendor && navigator.vendor.match(/apple/i));
	}
	let ss = !1;
	try {
		window.addEventListener(
			'test',
			null,
			Object.defineProperty({}, 'passive', {
				get: () => {
					ss = !0;
				}
			})
		);
	} catch {}
	class zo {
		constructor() {
			this._pool = [];
		}
		add(e, i, s, n) {
			this._toggleListener(e, i, s, n);
		}
		remove(e, i, s, n) {
			this._toggleListener(e, i, s, n, !0);
		}
		removeAll() {
			this._pool.forEach((e) => {
				this._toggleListener(e.target, e.type, e.listener, e.passive, !0, !0);
			}),
				(this._pool = []);
		}
		_toggleListener(e, i, s, n, r, a) {
			if (!e) return;
			const o = r ? 'removeEventListener' : 'addEventListener';
			i.split(' ').forEach((h) => {
				if (h) {
					a ||
						(r
							? (this._pool = this._pool.filter(
									(y) => y.type !== h || y.listener !== s || y.target !== e
								))
							: this._pool.push({ target: e, type: h, listener: s, passive: n }));
					const f = ss ? { passive: n || !1 } : !1;
					e[o](h, s, f);
				}
			});
		}
	}
	function ns(t, e) {
		if (t.getViewportSizeFn) {
			const i = t.getViewportSizeFn(t, e);
			if (i) return i;
		}
		return { x: document.documentElement.clientWidth, y: window.innerHeight };
	}
	function xe(t, e, i, s, n) {
		let r = 0;
		if (e.paddingFn) r = e.paddingFn(i, s, n)[t];
		else if (e.padding) r = e.padding[t];
		else {
			const a = 'padding' + t[0].toUpperCase() + t.slice(1);
			e[a] && (r = e[a]);
		}
		return Number(r) || 0;
	}
	function rs(t, e, i, s) {
		return {
			x: e.x - xe('left', t, e, i, s) - xe('right', t, e, i, s),
			y: e.y - xe('top', t, e, i, s) - xe('bottom', t, e, i, s)
		};
	}
	class Fo {
		constructor(e) {
			(this.slide = e),
				(this.currZoomLevel = 1),
				(this.center = { x: 0, y: 0 }),
				(this.max = { x: 0, y: 0 }),
				(this.min = { x: 0, y: 0 });
		}
		update(e) {
			(this.currZoomLevel = e),
				this.slide.width
					? (this._updateAxis('x'),
						this._updateAxis('y'),
						this.slide.pswp.dispatch('calcBounds', { slide: this.slide }))
					: this.reset();
		}
		_updateAxis(e) {
			const { pswp: i } = this.slide,
				s = this.slide[e === 'x' ? 'width' : 'height'] * this.currZoomLevel,
				r = xe(
					e === 'x' ? 'left' : 'top',
					i.options,
					i.viewportSize,
					this.slide.data,
					this.slide.index
				),
				a = this.slide.panAreaSize[e];
			(this.center[e] = Math.round((a - s) / 2) + r),
				(this.max[e] = s > a ? Math.round(a - s) + r : this.center[e]),
				(this.min[e] = s > a ? r : this.center[e]);
		}
		reset() {
			(this.center.x = 0),
				(this.center.y = 0),
				(this.max.x = 0),
				(this.max.y = 0),
				(this.min.x = 0),
				(this.min.y = 0);
		}
		correctPan(e, i) {
			return Ne(i, this.max[e], this.min[e]);
		}
	}
	const si = 4e3;
	class as {
		constructor(e, i, s, n) {
			(this.pswp = n),
				(this.options = e),
				(this.itemData = i),
				(this.index = s),
				(this.panAreaSize = null),
				(this.elementSize = null),
				(this.fit = 1),
				(this.fill = 1),
				(this.vFill = 1),
				(this.initial = 1),
				(this.secondary = 1),
				(this.max = 1),
				(this.min = 1);
		}
		update(e, i, s) {
			const n = { x: e, y: i };
			(this.elementSize = n), (this.panAreaSize = s);
			const r = s.x / n.x,
				a = s.y / n.y;
			(this.fit = Math.min(1, r < a ? r : a)),
				(this.fill = Math.min(1, r > a ? r : a)),
				(this.vFill = Math.min(1, a)),
				(this.initial = this._getInitial()),
				(this.secondary = this._getSecondary()),
				(this.max = Math.max(this.initial, this.secondary, this._getMax())),
				(this.min = Math.min(this.fit, this.initial, this.secondary)),
				this.pswp &&
					this.pswp.dispatch('zoomLevelsUpdate', { zoomLevels: this, slideData: this.itemData });
		}
		_parseZoomLevelOption(e) {
			const i = e + 'ZoomLevel',
				s = this.options[i];
			if (s)
				return typeof s == 'function'
					? s(this)
					: s === 'fill'
						? this.fill
						: s === 'fit'
							? this.fit
							: Number(s);
		}
		_getSecondary() {
			let e = this._parseZoomLevelOption('secondary');
			return (
				e ||
				((e = Math.min(1, this.fit * 3)),
				this.elementSize && e * this.elementSize.x > si && (e = si / this.elementSize.x),
				e)
			);
		}
		_getInitial() {
			return this._parseZoomLevelOption('initial') || this.fit;
		}
		_getMax() {
			return this._parseZoomLevelOption('max') || Math.max(1, this.fit * 4);
		}
	}
	class No {
		constructor(e, i, s) {
			(this.data = e),
				(this.index = i),
				(this.pswp = s),
				(this.isActive = i === s.currIndex),
				(this.currentResolution = 0),
				(this.panAreaSize = { x: 0, y: 0 }),
				(this.pan = { x: 0, y: 0 }),
				(this.isFirstSlide = this.isActive && !s.opener.isOpen),
				(this.zoomLevels = new as(s.options, e, i, s)),
				this.pswp.dispatch('gettingData', { slide: this, data: this.data, index: i }),
				(this.content = this.pswp.contentLoader.getContentBySlide(this)),
				(this.container = E('pswp__zoom-wrap', 'div')),
				(this.holderElement = null),
				(this.currZoomLevel = 1),
				(this.width = this.content.width),
				(this.height = this.content.height),
				(this.heavyAppended = !1),
				(this.bounds = new Fo(this)),
				(this.prevDisplayedWidth = -1),
				(this.prevDisplayedHeight = -1),
				this.pswp.dispatch('slideInit', { slide: this });
		}
		setIsActive(e) {
			e && !this.isActive ? this.activate() : !e && this.isActive && this.deactivate();
		}
		append(e) {
			(this.holderElement = e),
				(this.container.style.transformOrigin = '0 0'),
				this.data &&
					(this.calculateSize(),
					this.load(),
					this.updateContentSize(),
					this.appendHeavy(),
					this.holderElement.appendChild(this.container),
					this.zoomAndPanToInitial(),
					this.pswp.dispatch('firstZoomPan', { slide: this }),
					this.applyCurrentZoomPan(),
					this.pswp.dispatch('afterSetContent', { slide: this }),
					this.isActive && this.activate());
		}
		load() {
			this.content.load(!1), this.pswp.dispatch('slideLoad', { slide: this });
		}
		appendHeavy() {
			const { pswp: e } = this,
				i = !0;
			this.heavyAppended ||
				!e.opener.isOpen ||
				e.mainScroll.isShifted() ||
				(!this.isActive && !i) ||
				this.pswp.dispatch('appendHeavy', { slide: this }).defaultPrevented ||
				((this.heavyAppended = !0),
				this.content.append(),
				this.pswp.dispatch('appendHeavyContent', { slide: this }));
		}
		activate() {
			(this.isActive = !0),
				this.appendHeavy(),
				this.content.activate(),
				this.pswp.dispatch('slideActivate', { slide: this });
		}
		deactivate() {
			(this.isActive = !1),
				this.content.deactivate(),
				this.currZoomLevel !== this.zoomLevels.initial && this.calculateSize(),
				(this.currentResolution = 0),
				this.zoomAndPanToInitial(),
				this.applyCurrentZoomPan(),
				this.updateContentSize(),
				this.pswp.dispatch('slideDeactivate', { slide: this });
		}
		destroy() {
			(this.content.hasSlide = !1),
				this.content.remove(),
				this.container.remove(),
				this.pswp.dispatch('slideDestroy', { slide: this });
		}
		resize() {
			this.currZoomLevel === this.zoomLevels.initial || !this.isActive
				? (this.calculateSize(),
					(this.currentResolution = 0),
					this.zoomAndPanToInitial(),
					this.applyCurrentZoomPan(),
					this.updateContentSize())
				: (this.calculateSize(),
					this.bounds.update(this.currZoomLevel),
					this.panTo(this.pan.x, this.pan.y));
		}
		updateContentSize(e) {
			const i = this.currentResolution || this.zoomLevels.initial;
			if (!i) return;
			const s = Math.round(this.width * i) || this.pswp.viewportSize.x,
				n = Math.round(this.height * i) || this.pswp.viewportSize.y;
			(!this.sizeChanged(s, n) && !e) || this.content.setDisplayedSize(s, n);
		}
		sizeChanged(e, i) {
			return e !== this.prevDisplayedWidth || i !== this.prevDisplayedHeight
				? ((this.prevDisplayedWidth = e), (this.prevDisplayedHeight = i), !0)
				: !1;
		}
		getPlaceholderElement() {
			var e;
			return (e = this.content.placeholder) == null ? void 0 : e.element;
		}
		zoomTo(e, i, s, n) {
			const { pswp: r } = this;
			if (!this.isZoomable() || r.mainScroll.isShifted()) return;
			r.dispatch('beforeZoomTo', { destZoomLevel: e, centerPoint: i, transitionDuration: s }),
				r.animations.stopAllPan();
			const a = this.currZoomLevel;
			n || (e = Ne(e, this.zoomLevels.min, this.zoomLevels.max)),
				this.setZoomLevel(e),
				(this.pan.x = this.calculateZoomToPanOffset('x', i, a)),
				(this.pan.y = this.calculateZoomToPanOffset('y', i, a)),
				ts(this.pan);
			const o = () => {
				this._setResolution(e), this.applyCurrentZoomPan();
			};
			s
				? r.animations.startTransition({
						isPan: !0,
						name: 'zoomTo',
						target: this.container,
						transform: this.getCurrentTransform(),
						onComplete: o,
						duration: s,
						easing: r.options.easing
					})
				: o();
		}
		toggleZoom(e) {
			this.zoomTo(
				this.currZoomLevel === this.zoomLevels.initial
					? this.zoomLevels.secondary
					: this.zoomLevels.initial,
				e,
				this.pswp.options.zoomAnimationDuration
			);
		}
		setZoomLevel(e) {
			(this.currZoomLevel = e), this.bounds.update(this.currZoomLevel);
		}
		calculateZoomToPanOffset(e, i, s) {
			if (this.bounds.max[e] - this.bounds.min[e] === 0) return this.bounds.center[e];
			i || (i = this.pswp.getViewportCenterPoint()), s || (s = this.zoomLevels.initial);
			const r = this.currZoomLevel / s;
			return this.bounds.correctPan(e, (this.pan[e] - i[e]) * r + i[e]);
		}
		panTo(e, i) {
			(this.pan.x = this.bounds.correctPan('x', e)),
				(this.pan.y = this.bounds.correctPan('y', i)),
				this.applyCurrentZoomPan();
		}
		isPannable() {
			return !!this.width && this.currZoomLevel > this.zoomLevels.fit;
		}
		isZoomable() {
			return !!this.width && this.content.isZoomable();
		}
		applyCurrentZoomPan() {
			this._applyZoomTransform(this.pan.x, this.pan.y, this.currZoomLevel),
				this === this.pswp.currSlide && this.pswp.dispatch('zoomPanUpdate', { slide: this });
		}
		zoomAndPanToInitial() {
			(this.currZoomLevel = this.zoomLevels.initial),
				this.bounds.update(this.currZoomLevel),
				x(this.pan, this.bounds.center),
				this.pswp.dispatch('initialZoomPan', { slide: this });
		}
		_applyZoomTransform(e, i, s) {
			(s /= this.currentResolution || this.zoomLevels.initial), ce(this.container, e, i, s);
		}
		calculateSize() {
			const { pswp: e } = this;
			x(this.panAreaSize, rs(e.options, e.viewportSize, this.data, this.index)),
				this.zoomLevels.update(this.width, this.height, this.panAreaSize),
				e.dispatch('calcSlideSize', { slide: this });
		}
		getCurrentTransform() {
			const e = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
			return Ee(this.pan.x, this.pan.y, e);
		}
		_setResolution(e) {
			e !== this.currentResolution &&
				((this.currentResolution = e),
				this.updateContentSize(),
				this.pswp.dispatch('resolutionChanged'));
		}
	}
	const Wo = 0.35,
		Zo = 0.6,
		ni = 0.4,
		ri = 0.5;
	function Ho(t, e) {
		return (t * e) / (1 - e);
	}
	class Uo {
		constructor(e) {
			(this.gestures = e), (this.pswp = e.pswp), (this.startPan = { x: 0, y: 0 });
		}
		start() {
			this.pswp.currSlide && x(this.startPan, this.pswp.currSlide.pan),
				this.pswp.animations.stopAll();
		}
		change() {
			const { p1: e, prevP1: i, dragAxis: s } = this.gestures,
				{ currSlide: n } = this.pswp;
			if (
				s === 'y' &&
				this.pswp.options.closeOnVerticalDrag &&
				n &&
				n.currZoomLevel <= n.zoomLevels.fit &&
				!this.gestures.isMultitouch
			) {
				const r = n.pan.y + (e.y - i.y);
				if (!this.pswp.dispatch('verticalDrag', { panY: r }).defaultPrevented) {
					this._setPanWithFriction('y', r, Zo);
					const a = 1 - Math.abs(this._getVerticalDragRatio(n.pan.y));
					this.pswp.applyBgOpacity(a), n.applyCurrentZoomPan();
				}
			} else
				this._panOrMoveMainScroll('x') ||
					(this._panOrMoveMainScroll('y'), n && (ts(n.pan), n.applyCurrentZoomPan()));
		}
		end() {
			const { velocity: e } = this.gestures,
				{ mainScroll: i, currSlide: s } = this.pswp;
			let n = 0;
			if ((this.pswp.animations.stopAll(), i.isShifted())) {
				const a = (i.x - i.getCurrSlideX()) / this.pswp.viewportSize.x;
				(e.x < -ri && a < 0) || (e.x < 0.1 && a < -0.5)
					? ((n = 1), (e.x = Math.min(e.x, 0)))
					: ((e.x > ri && a > 0) || (e.x > -0.1 && a > 0.5)) &&
						((n = -1), (e.x = Math.max(e.x, 0))),
					i.moveIndexBy(n, !0, e.x);
			}
			(s && s.currZoomLevel > s.zoomLevels.max) || this.gestures.isMultitouch
				? this.gestures.zoomLevels.correctZoomPan(!0)
				: (this._finishPanGestureForAxis('x'), this._finishPanGestureForAxis('y'));
		}
		_finishPanGestureForAxis(e) {
			const { velocity: i } = this.gestures,
				{ currSlide: s } = this.pswp;
			if (!s) return;
			const { pan: n, bounds: r } = s,
				a = n[e],
				o = this.pswp.bgOpacity < 1 && e === 'y',
				l = 0.995,
				h = a + Ho(i[e], l);
			if (o) {
				const ne = this._getVerticalDragRatio(a),
					pe = this._getVerticalDragRatio(h);
				if ((ne < 0 && pe < -ni) || (ne > 0 && pe > ni)) {
					this.pswp.close();
					return;
				}
			}
			const f = r.correctPan(e, h);
			if (a === f) return;
			const y = f === h ? 1 : 0.82,
				S = this.pswp.bgOpacity,
				B = f - a;
			this.pswp.animations.startSpring({
				name: 'panGesture' + e,
				isPan: !0,
				start: a,
				end: f,
				velocity: i[e],
				dampingRatio: y,
				onUpdate: (ne) => {
					if (o && this.pswp.bgOpacity < 1) {
						const pe = 1 - (f - ne) / B;
						this.pswp.applyBgOpacity(Ne(S + (1 - S) * pe, 0, 1));
					}
					(n[e] = Math.floor(ne)), s.applyCurrentZoomPan();
				}
			});
		}
		_panOrMoveMainScroll(e) {
			const { p1: i, dragAxis: s, prevP1: n, isMultitouch: r } = this.gestures,
				{ currSlide: a, mainScroll: o } = this.pswp,
				l = i[e] - n[e],
				h = o.x + l;
			if (!l || !a) return !1;
			if (e === 'x' && !a.isPannable() && !r) return o.moveTo(h, !0), !0;
			const { bounds: f } = a,
				y = a.pan[e] + l;
			if (this.pswp.options.allowPanToNext && s === 'x' && e === 'x' && !r) {
				const S = o.getCurrSlideX(),
					B = o.x - S,
					ne = l > 0,
					pe = !ne;
				if (y > f.min[e] && ne) {
					if (f.min[e] <= this.startPan[e]) return o.moveTo(h, !0), !0;
					this._setPanWithFriction(e, y);
				} else if (y < f.max[e] && pe) {
					if (this.startPan[e] <= f.max[e]) return o.moveTo(h, !0), !0;
					this._setPanWithFriction(e, y);
				} else if (B !== 0) {
					if (B > 0) return o.moveTo(Math.max(h, S), !0), !0;
					if (B < 0) return o.moveTo(Math.min(h, S), !0), !0;
				} else this._setPanWithFriction(e, y);
			} else
				e === 'y'
					? !o.isShifted() && f.min.y !== f.max.y && this._setPanWithFriction(e, y)
					: this._setPanWithFriction(e, y);
			return !1;
		}
		_getVerticalDragRatio(e) {
			var i;
			return (
				(e - (((i = this.pswp.currSlide) == null ? void 0 : i.bounds.center.y) ?? 0)) /
				(this.pswp.viewportSize.y / 3)
			);
		}
		_setPanWithFriction(e, i, s) {
			const { currSlide: n } = this.pswp;
			if (!n) return;
			const { pan: r, bounds: a } = n;
			if (a.correctPan(e, i) !== i || s) {
				const l = Math.round(i - r[e]);
				r[e] += l * (s || Wo);
			} else r[e] = i;
		}
	}
	const Vo = 0.05,
		Bo = 0.15;
	function ai(t, e, i) {
		return (t.x = (e.x + i.x) / 2), (t.y = (e.y + i.y) / 2), t;
	}
	class Go {
		constructor(e) {
			(this.gestures = e),
				(this._startPan = { x: 0, y: 0 }),
				(this._startZoomPoint = { x: 0, y: 0 }),
				(this._zoomPoint = { x: 0, y: 0 }),
				(this._wasOverFitZoomLevel = !1),
				(this._startZoomLevel = 1);
		}
		start() {
			const { currSlide: e } = this.gestures.pswp;
			e && ((this._startZoomLevel = e.currZoomLevel), x(this._startPan, e.pan)),
				this.gestures.pswp.animations.stopAllPan(),
				(this._wasOverFitZoomLevel = !1);
		}
		change() {
			const { p1: e, startP1: i, p2: s, startP2: n, pswp: r } = this.gestures,
				{ currSlide: a } = r;
			if (!a) return;
			const o = a.zoomLevels.min,
				l = a.zoomLevels.max;
			if (!a.isZoomable() || r.mainScroll.isShifted()) return;
			ai(this._startZoomPoint, i, n), ai(this._zoomPoint, e, s);
			let h = (1 / Ot(i, n)) * Ot(e, s) * this._startZoomLevel;
			if (
				(h > a.zoomLevels.initial + a.zoomLevels.initial / 15 && (this._wasOverFitZoomLevel = !0),
				h < o)
			)
				if (
					r.options.pinchToClose &&
					!this._wasOverFitZoomLevel &&
					this._startZoomLevel <= a.zoomLevels.initial
				) {
					const f = 1 - (o - h) / (o / 1.2);
					r.dispatch('pinchClose', { bgOpacity: f }).defaultPrevented || r.applyBgOpacity(f);
				} else h = o - (o - h) * Bo;
			else h > l && (h = l + (h - l) * Vo);
			(a.pan.x = this._calculatePanForZoomLevel('x', h)),
				(a.pan.y = this._calculatePanForZoomLevel('y', h)),
				a.setZoomLevel(h),
				a.applyCurrentZoomPan();
		}
		end() {
			const { pswp: e } = this.gestures,
				{ currSlide: i } = e;
			(!i || i.currZoomLevel < i.zoomLevels.initial) &&
			!this._wasOverFitZoomLevel &&
			e.options.pinchToClose
				? e.close()
				: this.correctZoomPan();
		}
		_calculatePanForZoomLevel(e, i) {
			const s = i / this._startZoomLevel;
			return this._zoomPoint[e] - (this._startZoomPoint[e] - this._startPan[e]) * s;
		}
		correctZoomPan(e) {
			const { pswp: i } = this.gestures,
				{ currSlide: s } = i;
			if (!(s != null && s.isZoomable())) return;
			this._zoomPoint.x === 0 && (e = !0);
			const n = s.currZoomLevel;
			let r,
				a = !0;
			n < s.zoomLevels.initial
				? (r = s.zoomLevels.initial)
				: n > s.zoomLevels.max
					? (r = s.zoomLevels.max)
					: ((a = !1), (r = n));
			const o = i.bgOpacity,
				l = i.bgOpacity < 1,
				h = x({ x: 0, y: 0 }, s.pan);
			let f = x({ x: 0, y: 0 }, h);
			e &&
				((this._zoomPoint.x = 0),
				(this._zoomPoint.y = 0),
				(this._startZoomPoint.x = 0),
				(this._startZoomPoint.y = 0),
				(this._startZoomLevel = n),
				x(this._startPan, h)),
				a &&
					(f = {
						x: this._calculatePanForZoomLevel('x', r),
						y: this._calculatePanForZoomLevel('y', r)
					}),
				s.setZoomLevel(r),
				(f = { x: s.bounds.correctPan('x', f.x), y: s.bounds.correctPan('y', f.y) }),
				s.setZoomLevel(n);
			const y = !Le(f, h);
			if (!y && !a && !l) {
				s._setResolution(r), s.applyCurrentZoomPan();
				return;
			}
			i.animations.stopAllPan(),
				i.animations.startSpring({
					isPan: !0,
					start: 0,
					end: 1e3,
					velocity: 0,
					dampingRatio: 1,
					naturalFrequency: 40,
					onUpdate: (S) => {
						if (((S /= 1e3), y || a)) {
							if (
								(y && ((s.pan.x = h.x + (f.x - h.x) * S), (s.pan.y = h.y + (f.y - h.y) * S)), a)
							) {
								const B = n + (r - n) * S;
								s.setZoomLevel(B);
							}
							s.applyCurrentZoomPan();
						}
						l && i.bgOpacity < 1 && i.applyBgOpacity(Ne(o + (1 - o) * S, 0, 1));
					},
					onComplete: () => {
						s._setResolution(r), s.applyCurrentZoomPan();
					}
				});
		}
	}
	function oi(t) {
		return !!t.target.closest('.pswp__container');
	}
	class jo {
		constructor(e) {
			this.gestures = e;
		}
		click(e, i) {
			const s = i.target.classList,
				n = s.contains('pswp__img'),
				r = s.contains('pswp__item') || s.contains('pswp__zoom-wrap');
			n
				? this._doClickOrTapAction('imageClick', e, i)
				: r && this._doClickOrTapAction('bgClick', e, i);
		}
		tap(e, i) {
			oi(i) && this._doClickOrTapAction('tap', e, i);
		}
		doubleTap(e, i) {
			oi(i) && this._doClickOrTapAction('doubleTap', e, i);
		}
		_doClickOrTapAction(e, i, s) {
			var l;
			const { pswp: n } = this.gestures,
				{ currSlide: r } = n,
				a = e + 'Action',
				o = n.options[a];
			if (!n.dispatch(a, { point: i, originalEvent: s }).defaultPrevented) {
				if (typeof o == 'function') {
					o.call(n, i, s);
					return;
				}
				switch (o) {
					case 'close':
					case 'next':
						n[o]();
						break;
					case 'zoom':
						r == null || r.toggleZoom(i);
						break;
					case 'zoom-or-close':
						r != null && r.isZoomable() && r.zoomLevels.secondary !== r.zoomLevels.initial
							? r.toggleZoom(i)
							: n.options.clickToCloseNonZoomable && n.close();
						break;
					case 'toggle-controls':
						(l = this.gestures.pswp.element) == null || l.classList.toggle('pswp--ui-visible');
						break;
				}
			}
		}
	}
	const $o = 10,
		qo = 300,
		Ko = 25;
	class Xo {
		constructor(e) {
			(this.pswp = e),
				(this.dragAxis = null),
				(this.p1 = { x: 0, y: 0 }),
				(this.p2 = { x: 0, y: 0 }),
				(this.prevP1 = { x: 0, y: 0 }),
				(this.prevP2 = { x: 0, y: 0 }),
				(this.startP1 = { x: 0, y: 0 }),
				(this.startP2 = { x: 0, y: 0 }),
				(this.velocity = { x: 0, y: 0 }),
				(this._lastStartP1 = { x: 0, y: 0 }),
				(this._intervalP1 = { x: 0, y: 0 }),
				(this._numActivePoints = 0),
				(this._ongoingPointers = []),
				(this._touchEventEnabled = 'ontouchstart' in window),
				(this._pointerEventEnabled = !!window.PointerEvent),
				(this.supportsTouch =
					this._touchEventEnabled || (this._pointerEventEnabled && navigator.maxTouchPoints > 1)),
				(this._numActivePoints = 0),
				(this._intervalTime = 0),
				(this._velocityCalculated = !1),
				(this.isMultitouch = !1),
				(this.isDragging = !1),
				(this.isZooming = !1),
				(this.raf = null),
				(this._tapTimer = null),
				this.supportsTouch || (e.options.allowPanToNext = !1),
				(this.drag = new Uo(this)),
				(this.zoomLevels = new Go(this)),
				(this.tapHandler = new jo(this)),
				e.on('bindEvents', () => {
					e.events.add(e.scrollWrap, 'click', this._onClick.bind(this)),
						this._pointerEventEnabled
							? this._bindEvents('pointer', 'down', 'up', 'cancel')
							: this._touchEventEnabled
								? (this._bindEvents('touch', 'start', 'end', 'cancel'),
									e.scrollWrap &&
										((e.scrollWrap.ontouchmove = () => {}), (e.scrollWrap.ontouchend = () => {})))
								: this._bindEvents('mouse', 'down', 'up');
				});
		}
		_bindEvents(e, i, s, n) {
			const { pswp: r } = this,
				{ events: a } = r,
				o = n ? e + n : '';
			a.add(r.scrollWrap, e + i, this.onPointerDown.bind(this)),
				a.add(window, e + 'move', this.onPointerMove.bind(this)),
				a.add(window, e + s, this.onPointerUp.bind(this)),
				o && a.add(r.scrollWrap, o, this.onPointerUp.bind(this));
		}
		onPointerDown(e) {
			const i = e.type === 'mousedown' || e.pointerType === 'mouse';
			if (i && e.button > 0) return;
			const { pswp: s } = this;
			if (!s.opener.isOpen) {
				e.preventDefault();
				return;
			}
			s.dispatch('pointerDown', { originalEvent: e }).defaultPrevented ||
				(i && (s.mouseDetected(), this._preventPointerEventBehaviour(e)),
				s.animations.stopAll(),
				this._updatePoints(e, 'down'),
				this._numActivePoints === 1 && ((this.dragAxis = null), x(this.startP1, this.p1)),
				this._numActivePoints > 1
					? (this._clearTapTimer(), (this.isMultitouch = !0))
					: (this.isMultitouch = !1));
		}
		onPointerMove(e) {
			e.preventDefault(),
				this._numActivePoints &&
					(this._updatePoints(e, 'move'),
					!this.pswp.dispatch('pointerMove', { originalEvent: e }).defaultPrevented &&
						(this._numActivePoints === 1 && !this.isDragging
							? (this.dragAxis || this._calculateDragDirection(),
								this.dragAxis &&
									!this.isDragging &&
									(this.isZooming && ((this.isZooming = !1), this.zoomLevels.end()),
									(this.isDragging = !0),
									this._clearTapTimer(),
									this._updateStartPoints(),
									(this._intervalTime = Date.now()),
									(this._velocityCalculated = !1),
									x(this._intervalP1, this.p1),
									(this.velocity.x = 0),
									(this.velocity.y = 0),
									this.drag.start(),
									this._rafStopLoop(),
									this._rafRenderLoop()))
							: this._numActivePoints > 1 &&
								!this.isZooming &&
								(this._finishDrag(),
								(this.isZooming = !0),
								this._updateStartPoints(),
								this.zoomLevels.start(),
								this._rafStopLoop(),
								this._rafRenderLoop())));
		}
		_finishDrag() {
			this.isDragging &&
				((this.isDragging = !1),
				this._velocityCalculated || this._updateVelocity(!0),
				this.drag.end(),
				(this.dragAxis = null));
		}
		onPointerUp(e) {
			this._numActivePoints &&
				(this._updatePoints(e, 'up'),
				!this.pswp.dispatch('pointerUp', { originalEvent: e }).defaultPrevented &&
					(this._numActivePoints === 0 &&
						(this._rafStopLoop(),
						this.isDragging
							? this._finishDrag()
							: !this.isZooming && !this.isMultitouch && this._finishTap(e)),
					this._numActivePoints < 2 &&
						this.isZooming &&
						((this.isZooming = !1),
						this.zoomLevels.end(),
						this._numActivePoints === 1 && ((this.dragAxis = null), this._updateStartPoints()))));
		}
		_rafRenderLoop() {
			(this.isDragging || this.isZooming) &&
				(this._updateVelocity(),
				this.isDragging
					? Le(this.p1, this.prevP1) || this.drag.change()
					: (!Le(this.p1, this.prevP1) || !Le(this.p2, this.prevP2)) && this.zoomLevels.change(),
				this._updatePrevPoints(),
				(this.raf = requestAnimationFrame(this._rafRenderLoop.bind(this))));
		}
		_updateVelocity(e) {
			const i = Date.now(),
				s = i - this._intervalTime;
			(s < 50 && !e) ||
				((this.velocity.x = this._getVelocity('x', s)),
				(this.velocity.y = this._getVelocity('y', s)),
				(this._intervalTime = i),
				x(this._intervalP1, this.p1),
				(this._velocityCalculated = !0));
		}
		_finishTap(e) {
			const { mainScroll: i } = this.pswp;
			if (i.isShifted()) {
				i.moveIndexBy(0, !0);
				return;
			}
			if (e.type.indexOf('cancel') > 0) return;
			if (e.type === 'mouseup' || e.pointerType === 'mouse') {
				this.tapHandler.click(this.startP1, e);
				return;
			}
			const s = this.pswp.options.doubleTapAction ? qo : 0;
			this._tapTimer
				? (this._clearTapTimer(),
					Ot(this._lastStartP1, this.startP1) < Ko && this.tapHandler.doubleTap(this.startP1, e))
				: (x(this._lastStartP1, this.startP1),
					(this._tapTimer = setTimeout(() => {
						this.tapHandler.tap(this.startP1, e), this._clearTapTimer();
					}, s)));
		}
		_clearTapTimer() {
			this._tapTimer && (clearTimeout(this._tapTimer), (this._tapTimer = null));
		}
		_getVelocity(e, i) {
			const s = this.p1[e] - this._intervalP1[e];
			return Math.abs(s) > 1 && i > 5 ? s / i : 0;
		}
		_rafStopLoop() {
			this.raf && (cancelAnimationFrame(this.raf), (this.raf = null));
		}
		_preventPointerEventBehaviour(e) {
			e.preventDefault();
		}
		_updatePoints(e, i) {
			if (this._pointerEventEnabled) {
				const s = e,
					n = this._ongoingPointers.findIndex((r) => r.id === s.pointerId);
				i === 'up' && n > -1
					? this._ongoingPointers.splice(n, 1)
					: i === 'down' && n === -1
						? this._ongoingPointers.push(this._convertEventPosToPoint(s, { x: 0, y: 0 }))
						: n > -1 && this._convertEventPosToPoint(s, this._ongoingPointers[n]),
					(this._numActivePoints = this._ongoingPointers.length),
					this._numActivePoints > 0 && x(this.p1, this._ongoingPointers[0]),
					this._numActivePoints > 1 && x(this.p2, this._ongoingPointers[1]);
			} else {
				const s = e;
				(this._numActivePoints = 0),
					s.type.indexOf('touch') > -1
						? s.touches &&
							s.touches.length > 0 &&
							(this._convertEventPosToPoint(s.touches[0], this.p1),
							this._numActivePoints++,
							s.touches.length > 1 &&
								(this._convertEventPosToPoint(s.touches[1], this.p2), this._numActivePoints++))
						: (this._convertEventPosToPoint(e, this.p1),
							i === 'up' ? (this._numActivePoints = 0) : this._numActivePoints++);
			}
		}
		_updatePrevPoints() {
			x(this.prevP1, this.p1), x(this.prevP2, this.p2);
		}
		_updateStartPoints() {
			x(this.startP1, this.p1), x(this.startP2, this.p2), this._updatePrevPoints();
		}
		_calculateDragDirection() {
			if (this.pswp.mainScroll.isShifted()) this.dragAxis = 'x';
			else {
				const e = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
				if (e !== 0) {
					const i = e > 0 ? 'x' : 'y';
					Math.abs(this.p1[i] - this.startP1[i]) >= $o && (this.dragAxis = i);
				}
			}
		}
		_convertEventPosToPoint(e, i) {
			return (
				(i.x = e.pageX - this.pswp.offset.x),
				(i.y = e.pageY - this.pswp.offset.y),
				'pointerId' in e ? (i.id = e.pointerId) : e.identifier !== void 0 && (i.id = e.identifier),
				i
			);
		}
		_onClick(e) {
			this.pswp.mainScroll.isShifted() && (e.preventDefault(), e.stopPropagation());
		}
	}
	const Jo = 0.35;
	class Qo {
		constructor(e) {
			(this.pswp = e),
				(this.x = 0),
				(this.slideWidth = 0),
				(this._currPositionIndex = 0),
				(this._prevPositionIndex = 0),
				(this._containerShiftIndex = -1),
				(this.itemHolders = []);
		}
		resize(e) {
			const { pswp: i } = this,
				s = Math.round(i.viewportSize.x + i.viewportSize.x * i.options.spacing),
				n = s !== this.slideWidth;
			n && ((this.slideWidth = s), this.moveTo(this.getCurrSlideX())),
				this.itemHolders.forEach((r, a) => {
					n && ce(r.el, (a + this._containerShiftIndex) * this.slideWidth),
						e && r.slide && r.slide.resize();
				});
		}
		resetPosition() {
			(this._currPositionIndex = 0),
				(this._prevPositionIndex = 0),
				(this.slideWidth = 0),
				(this._containerShiftIndex = -1);
		}
		appendHolders() {
			this.itemHolders = [];
			for (let e = 0; e < 3; e++) {
				const i = E('pswp__item', 'div', this.pswp.container);
				i.setAttribute('role', 'group'),
					i.setAttribute('aria-roledescription', 'slide'),
					i.setAttribute('aria-hidden', 'true'),
					(i.style.display = e === 1 ? 'block' : 'none'),
					this.itemHolders.push({ el: i });
			}
		}
		canBeSwiped() {
			return this.pswp.getNumItems() > 1;
		}
		moveIndexBy(e, i, s) {
			const { pswp: n } = this;
			let r = n.potentialIndex + e;
			const a = n.getNumItems();
			if (n.canLoop()) {
				r = n.getLoopedIndex(r);
				const l = (e + a) % a;
				l <= a / 2 ? (e = l) : (e = l - a);
			} else r < 0 ? (r = 0) : r >= a && (r = a - 1), (e = r - n.potentialIndex);
			(n.potentialIndex = r), (this._currPositionIndex -= e), n.animations.stopMainScroll();
			const o = this.getCurrSlideX();
			if (!i) this.moveTo(o), this.updateCurrItem();
			else {
				n.animations.startSpring({
					isMainScroll: !0,
					start: this.x,
					end: o,
					velocity: s || 0,
					naturalFrequency: 30,
					dampingRatio: 1,
					onUpdate: (h) => {
						this.moveTo(h);
					},
					onComplete: () => {
						this.updateCurrItem(), n.appendHeavy();
					}
				});
				let l = n.potentialIndex - n.currIndex;
				if (n.canLoop()) {
					const h = (l + a) % a;
					h <= a / 2 ? (l = h) : (l = h - a);
				}
				Math.abs(l) > 1 && this.updateCurrItem();
			}
			return !!e;
		}
		getCurrSlideX() {
			return this.slideWidth * this._currPositionIndex;
		}
		isShifted() {
			return this.x !== this.getCurrSlideX();
		}
		updateCurrItem() {
			var r;
			const { pswp: e } = this,
				i = this._prevPositionIndex - this._currPositionIndex;
			if (!i) return;
			(this._prevPositionIndex = this._currPositionIndex), (e.currIndex = e.potentialIndex);
			let s = Math.abs(i),
				n;
			s >= 3 && ((this._containerShiftIndex += i + (i > 0 ? -3 : 3)), (s = 3));
			for (let a = 0; a < s; a++)
				i > 0
					? ((n = this.itemHolders.shift()),
						n &&
							((this.itemHolders[2] = n),
							this._containerShiftIndex++,
							ce(n.el, (this._containerShiftIndex + 2) * this.slideWidth),
							e.setContent(n, e.currIndex - s + a + 2)))
					: ((n = this.itemHolders.pop()),
						n &&
							(this.itemHolders.unshift(n),
							this._containerShiftIndex--,
							ce(n.el, this._containerShiftIndex * this.slideWidth),
							e.setContent(n, e.currIndex + s - a - 2)));
			Math.abs(this._containerShiftIndex) > 50 &&
				!this.isShifted() &&
				(this.resetPosition(), this.resize()),
				e.animations.stopAllPan(),
				this.itemHolders.forEach((a, o) => {
					a.slide && a.slide.setIsActive(o === 1);
				}),
				(e.currSlide = (r = this.itemHolders[1]) == null ? void 0 : r.slide),
				e.contentLoader.updateLazy(i),
				e.currSlide && e.currSlide.applyCurrentZoomPan(),
				e.dispatch('change');
		}
		moveTo(e, i) {
			if (!this.pswp.canLoop() && i) {
				let s = (this.slideWidth * this._currPositionIndex - e) / this.slideWidth;
				s += this.pswp.currIndex;
				const n = Math.round(e - this.x);
				((s < 0 && n > 0) || (s >= this.pswp.getNumItems() - 1 && n < 0)) && (e = this.x + n * Jo);
			}
			(this.x = e),
				this.pswp.container && ce(this.pswp.container, e),
				this.pswp.dispatch('moveMainScroll', { x: e, dragging: i ?? !1 });
		}
	}
	const el = {
			Escape: 27,
			z: 90,
			ArrowLeft: 37,
			ArrowUp: 38,
			ArrowRight: 39,
			ArrowDown: 40,
			Tab: 9
		},
		he = (t, e) => (e ? t : el[t]);
	class tl {
		constructor(e) {
			(this.pswp = e),
				(this._wasFocused = !1),
				e.on('bindEvents', () => {
					e.options.initialPointerPos || this._focusRoot(),
						e.events.add(document, 'focusin', this._onFocusIn.bind(this)),
						e.events.add(document, 'keydown', this._onKeyDown.bind(this));
				});
			const i = document.activeElement;
			e.on('destroy', () => {
				e.options.returnFocus && i && this._wasFocused && i.focus();
			});
		}
		_focusRoot() {
			!this._wasFocused &&
				this.pswp.element &&
				(this.pswp.element.focus(), (this._wasFocused = !0));
		}
		_onKeyDown(e) {
			const { pswp: i } = this;
			if (i.dispatch('keydown', { originalEvent: e }).defaultPrevented || Yo(e)) return;
			let s,
				n,
				r = !1;
			const a = 'key' in e;
			switch (a ? e.key : e.keyCode) {
				case he('Escape', a):
					i.options.escKey && (s = 'close');
					break;
				case he('z', a):
					s = 'toggleZoom';
					break;
				case he('ArrowLeft', a):
					n = 'x';
					break;
				case he('ArrowUp', a):
					n = 'y';
					break;
				case he('ArrowRight', a):
					(n = 'x'), (r = !0);
					break;
				case he('ArrowDown', a):
					(r = !0), (n = 'y');
					break;
				case he('Tab', a):
					this._focusRoot();
					break;
			}
			if (n) {
				e.preventDefault();
				const { currSlide: o } = i;
				i.options.arrowKeys && n === 'x' && i.getNumItems() > 1
					? (s = r ? 'next' : 'prev')
					: o &&
						o.currZoomLevel > o.zoomLevels.fit &&
						((o.pan[n] += r ? -80 : 80), o.panTo(o.pan.x, o.pan.y));
			}
			s && (e.preventDefault(), i[s]());
		}
		_onFocusIn(e) {
			const { template: i } = this.pswp;
			i && document !== e.target && i !== e.target && !i.contains(e.target) && i.focus();
		}
	}
	const il = 'cubic-bezier(.4,0,.22,1)';
	class sl {
		constructor(e) {
			this.props = e;
			const {
				target: i,
				onComplete: s,
				transform: n,
				onFinish: r = () => {},
				duration: a = 333,
				easing: o = il
			} = e;
			this.onFinish = r;
			const l = n ? 'transform' : 'opacity',
				h = e[l] ?? '';
			(this._target = i),
				(this._onComplete = s),
				(this._finished = !1),
				(this._onTransitionEnd = this._onTransitionEnd.bind(this)),
				(this._helperTimeout = setTimeout(() => {
					is(i, l, a, o),
						(this._helperTimeout = setTimeout(() => {
							i.addEventListener('transitionend', this._onTransitionEnd, !1),
								i.addEventListener('transitioncancel', this._onTransitionEnd, !1),
								(this._helperTimeout = setTimeout(() => {
									this._finalizeAnimation();
								}, a + 500)),
								(i.style[l] = h);
						}, 30));
				}, 0));
		}
		_onTransitionEnd(e) {
			e.target === this._target && this._finalizeAnimation();
		}
		_finalizeAnimation() {
			this._finished ||
				((this._finished = !0), this.onFinish(), this._onComplete && this._onComplete());
		}
		destroy() {
			this._helperTimeout && clearTimeout(this._helperTimeout),
				Ao(this._target),
				this._target.removeEventListener('transitionend', this._onTransitionEnd, !1),
				this._target.removeEventListener('transitioncancel', this._onTransitionEnd, !1),
				this._finished || this._finalizeAnimation();
		}
	}
	const nl = 12,
		rl = 0.75;
	class al {
		constructor(e, i, s) {
			(this.velocity = e * 1e3),
				(this._dampingRatio = i || rl),
				(this._naturalFrequency = s || nl),
				(this._dampedFrequency = this._naturalFrequency),
				this._dampingRatio < 1 &&
					(this._dampedFrequency *= Math.sqrt(1 - this._dampingRatio * this._dampingRatio));
		}
		easeFrame(e, i) {
			let s = 0,
				n;
			i /= 1e3;
			const r = Math.E ** (-this._dampingRatio * this._naturalFrequency * i);
			if (this._dampingRatio === 1)
				(n = this.velocity + this._naturalFrequency * e),
					(s = (e + n * i) * r),
					(this.velocity = s * -this._naturalFrequency + n * r);
			else if (this._dampingRatio < 1) {
				n =
					(1 / this._dampedFrequency) *
					(this._dampingRatio * this._naturalFrequency * e + this.velocity);
				const a = Math.cos(this._dampedFrequency * i),
					o = Math.sin(this._dampedFrequency * i);
				(s = r * (e * a + n * o)),
					(this.velocity =
						s * -this._naturalFrequency * this._dampingRatio +
						r * (-this._dampedFrequency * e * o + this._dampedFrequency * n * a));
			}
			return s;
		}
	}
	class ol {
		constructor(e) {
			(this.props = e), (this._raf = 0);
			const {
				start: i,
				end: s,
				velocity: n,
				onUpdate: r,
				onComplete: a,
				onFinish: o = () => {},
				dampingRatio: l,
				naturalFrequency: h
			} = e;
			this.onFinish = o;
			const f = new al(n, l, h);
			let y = Date.now(),
				S = i - s;
			const B = () => {
				this._raf &&
					((S = f.easeFrame(S, Date.now() - y)),
					Math.abs(S) < 1 && Math.abs(f.velocity) < 50
						? (r(s), a && a(), this.onFinish())
						: ((y = Date.now()), r(S + s), (this._raf = requestAnimationFrame(B))));
			};
			this._raf = requestAnimationFrame(B);
		}
		destroy() {
			this._raf >= 0 && cancelAnimationFrame(this._raf), (this._raf = 0);
		}
	}
	class ll {
		constructor() {
			this.activeAnimations = [];
		}
		startSpring(e) {
			this._start(e, !0);
		}
		startTransition(e) {
			this._start(e);
		}
		_start(e, i) {
			const s = i ? new ol(e) : new sl(e);
			return this.activeAnimations.push(s), (s.onFinish = () => this.stop(s)), s;
		}
		stop(e) {
			e.destroy();
			const i = this.activeAnimations.indexOf(e);
			i > -1 && this.activeAnimations.splice(i, 1);
		}
		stopAll() {
			this.activeAnimations.forEach((e) => {
				e.destroy();
			}),
				(this.activeAnimations = []);
		}
		stopAllPan() {
			this.activeAnimations = this.activeAnimations.filter((e) =>
				e.props.isPan ? (e.destroy(), !1) : !0
			);
		}
		stopMainScroll() {
			this.activeAnimations = this.activeAnimations.filter((e) =>
				e.props.isMainScroll ? (e.destroy(), !1) : !0
			);
		}
		isPanRunning() {
			return this.activeAnimations.some((e) => e.props.isPan);
		}
	}
	class hl {
		constructor(e) {
			(this.pswp = e), e.events.add(e.element, 'wheel', this._onWheel.bind(this));
		}
		_onWheel(e) {
			e.preventDefault();
			const { currSlide: i } = this.pswp;
			let { deltaX: s, deltaY: n } = e;
			if (i && !this.pswp.dispatch('wheel', { originalEvent: e }).defaultPrevented)
				if (e.ctrlKey || this.pswp.options.wheelToZoom) {
					if (i.isZoomable()) {
						let r = -n;
						e.deltaMode === 1 ? (r *= 0.05) : (r *= e.deltaMode ? 1 : 0.002), (r = 2 ** r);
						const a = i.currZoomLevel * r;
						i.zoomTo(a, { x: e.clientX, y: e.clientY });
					}
				} else
					i.isPannable() &&
						(e.deltaMode === 1 && ((s *= 18), (n *= 18)), i.panTo(i.pan.x - s, i.pan.y - n));
		}
	}
	function dl(t) {
		if (typeof t == 'string') return t;
		if (!t || !t.isCustomSVG) return '';
		const e = t;
		let i = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
		return (
			(i = i.split('%d').join(e.size || 32)),
			e.outlineID && (i += '<use class="pswp__icn-shadow" xlink:href="#' + e.outlineID + '"/>'),
			(i += e.inner),
			(i += '</svg>'),
			i
		);
	}
	class cl {
		constructor(e, i) {
			const s = i.name || i.className;
			let n = i.html;
			if (e.options[s] === !1) return;
			typeof e.options[s + 'SVG'] == 'string' && (n = e.options[s + 'SVG']),
				e.dispatch('uiElementCreate', { data: i });
			let r = '';
			i.isButton
				? ((r += 'pswp__button '), (r += i.className || `pswp__button--${i.name}`))
				: (r += i.className || `pswp__${i.name}`);
			let a = i.isButton ? i.tagName || 'button' : i.tagName || 'div';
			a = a.toLowerCase();
			const o = E(r, a);
			if (i.isButton) {
				a === 'button' && (o.type = 'button');
				let { title: f } = i;
				const { ariaLabel: y } = i;
				typeof e.options[s + 'Title'] == 'string' && (f = e.options[s + 'Title']),
					f && (o.title = f);
				const S = y || f;
				S && o.setAttribute('aria-label', S);
			}
			(o.innerHTML = dl(n)),
				i.onInit && i.onInit(o, e),
				i.onClick &&
					(o.onclick = (f) => {
						typeof i.onClick == 'string'
							? e[i.onClick]()
							: typeof i.onClick == 'function' && i.onClick(f, o, e);
					});
			const l = i.appendTo || 'bar';
			let h = e.element;
			l === 'bar'
				? (e.topBar || (e.topBar = E('pswp__top-bar pswp__hide-on-close', 'div', e.scrollWrap)),
					(h = e.topBar))
				: (o.classList.add('pswp__hide-on-close'), l === 'wrapper' && (h = e.scrollWrap)),
				h == null || h.appendChild(e.applyFilters('uiElement', o, i));
		}
	}
	function os(t, e, i) {
		t.classList.add('pswp__button--arrow'),
			t.setAttribute('aria-controls', 'pswp__items'),
			e.on('change', () => {
				e.options.loop ||
					(i
						? (t.disabled = !(e.currIndex < e.getNumItems() - 1))
						: (t.disabled = !(e.currIndex > 0)));
			});
	}
	const ul = {
			name: 'arrowPrev',
			className: 'pswp__button--arrow--prev',
			title: 'Previous',
			order: 10,
			isButton: !0,
			appendTo: 'wrapper',
			html: {
				isCustomSVG: !0,
				size: 60,
				inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
				outlineID: 'pswp__icn-arrow'
			},
			onClick: 'prev',
			onInit: os
		},
		fl = {
			name: 'arrowNext',
			className: 'pswp__button--arrow--next',
			title: 'Next',
			order: 11,
			isButton: !0,
			appendTo: 'wrapper',
			html: {
				isCustomSVG: !0,
				size: 60,
				inner: '<use xlink:href="#pswp__icn-arrow"/>',
				outlineID: 'pswp__icn-arrow'
			},
			onClick: 'next',
			onInit: (t, e) => {
				os(t, e, !0);
			}
		},
		pl = {
			name: 'close',
			title: 'Close',
			order: 20,
			isButton: !0,
			html: {
				isCustomSVG: !0,
				inner:
					'<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
				outlineID: 'pswp__icn-close'
			},
			onClick: 'close'
		},
		ml = {
			name: 'zoom',
			title: 'Zoom',
			order: 10,
			isButton: !0,
			html: {
				isCustomSVG: !0,
				inner:
					'<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
				outlineID: 'pswp__icn-zoom'
			},
			onClick: 'toggleZoom'
		},
		_l = {
			name: 'preloader',
			appendTo: 'bar',
			order: 7,
			html: {
				isCustomSVG: !0,
				inner:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>',
				outlineID: 'pswp__icn-loading'
			},
			onInit: (t, e) => {
				let i,
					s = null;
				const n = (o, l) => {
						t.classList.toggle('pswp__preloader--' + o, l);
					},
					r = (o) => {
						i !== o && ((i = o), n('active', o));
					},
					a = () => {
						var o;
						if (!((o = e.currSlide) != null && o.content.isLoading())) {
							r(!1), s && (clearTimeout(s), (s = null));
							return;
						}
						s ||
							(s = setTimeout(() => {
								var l;
								r(!!((l = e.currSlide) != null && l.content.isLoading())), (s = null);
							}, e.options.preloaderDelay));
					};
				e.on('change', a),
					e.on('loadComplete', (o) => {
						e.currSlide === o.slide && a();
					}),
					e.ui && (e.ui.updatePreloaderVisibility = a);
			}
		},
		yl = {
			name: 'counter',
			order: 5,
			onInit: (t, e) => {
				e.on('change', () => {
					t.innerText = e.currIndex + 1 + e.options.indexIndicatorSep + e.getNumItems();
				});
			}
		};
	function li(t, e) {
		t.classList.toggle('pswp--zoomed-in', e);
	}
	class gl {
		constructor(e) {
			(this.pswp = e),
				(this.isRegistered = !1),
				(this.uiElementsData = []),
				(this.items = []),
				(this.updatePreloaderVisibility = () => {}),
				(this._lastUpdatedZoomLevel = void 0);
		}
		init() {
			const { pswp: e } = this;
			(this.isRegistered = !1),
				(this.uiElementsData = [pl, ul, fl, ml, _l, yl]),
				e.dispatch('uiRegister'),
				this.uiElementsData.sort((i, s) => (i.order || 0) - (s.order || 0)),
				(this.items = []),
				(this.isRegistered = !0),
				this.uiElementsData.forEach((i) => {
					this.registerElement(i);
				}),
				e.on('change', () => {
					var i;
					(i = e.element) == null || i.classList.toggle('pswp--one-slide', e.getNumItems() === 1);
				}),
				e.on('zoomPanUpdate', () => this._onZoomPanUpdate());
		}
		registerElement(e) {
			this.isRegistered ? this.items.push(new cl(this.pswp, e)) : this.uiElementsData.push(e);
		}
		_onZoomPanUpdate() {
			const { template: e, currSlide: i, options: s } = this.pswp;
			if (this.pswp.opener.isClosing || !e || !i) return;
			let { currZoomLevel: n } = i;
			if ((this.pswp.opener.isOpen || (n = i.zoomLevels.initial), n === this._lastUpdatedZoomLevel))
				return;
			this._lastUpdatedZoomLevel = n;
			const r = i.zoomLevels.initial - i.zoomLevels.secondary;
			if (Math.abs(r) < 0.01 || !i.isZoomable()) {
				li(e, !1), e.classList.remove('pswp--zoom-allowed');
				return;
			}
			e.classList.add('pswp--zoom-allowed');
			const a = n === i.zoomLevels.initial ? i.zoomLevels.secondary : i.zoomLevels.initial;
			li(e, a <= n),
				(s.imageClickAction === 'zoom' || s.imageClickAction === 'zoom-or-close') &&
					e.classList.add('pswp--click-to-zoom');
		}
	}
	function vl(t) {
		const e = t.getBoundingClientRect();
		return { x: e.left, y: e.top, w: e.width };
	}
	function wl(t, e, i) {
		const s = t.getBoundingClientRect(),
			n = s.width / e,
			r = s.height / i,
			a = n > r ? n : r,
			o = (s.width - e * a) / 2,
			l = (s.height - i * a) / 2,
			h = { x: s.left + o, y: s.top + l, w: e * a };
		return (h.innerRect = { w: s.width, h: s.height, x: o, y: l }), h;
	}
	function Sl(t, e, i) {
		const s = i.dispatch('thumbBounds', { index: t, itemData: e, instance: i });
		if (s.thumbBounds) return s.thumbBounds;
		const { element: n } = e;
		let r, a;
		if (n && i.options.thumbSelector !== !1) {
			const o = i.options.thumbSelector || 'img';
			a = n.matches(o) ? n : n.querySelector(o);
		}
		return (
			(a = i.applyFilters('thumbEl', a, e, t)),
			a && (e.thumbCropped ? (r = wl(a, e.width || e.w || 0, e.height || e.h || 0)) : (r = vl(a))),
			i.applyFilters('thumbBounds', r, e, t)
		);
	}
	class Dl {
		constructor(e, i) {
			(this.type = e), (this.defaultPrevented = !1), i && Object.assign(this, i);
		}
		preventDefault() {
			this.defaultPrevented = !0;
		}
	}
	class Pl {
		constructor() {
			(this._listeners = {}), (this._filters = {}), (this.pswp = void 0), (this.options = void 0);
		}
		addFilter(e, i, s = 100) {
			var n, r, a;
			this._filters[e] || (this._filters[e] = []),
				(n = this._filters[e]) == null || n.push({ fn: i, priority: s }),
				(r = this._filters[e]) == null || r.sort((o, l) => o.priority - l.priority),
				(a = this.pswp) == null || a.addFilter(e, i, s);
		}
		removeFilter(e, i) {
			this._filters[e] && (this._filters[e] = this._filters[e].filter((s) => s.fn !== i)),
				this.pswp && this.pswp.removeFilter(e, i);
		}
		applyFilters(e, ...i) {
			var s;
			return (
				(s = this._filters[e]) == null ||
					s.forEach((n) => {
						i[0] = n.fn.apply(this, i);
					}),
				i[0]
			);
		}
		on(e, i) {
			var s, n;
			this._listeners[e] || (this._listeners[e] = []),
				(s = this._listeners[e]) == null || s.push(i),
				(n = this.pswp) == null || n.on(e, i);
		}
		off(e, i) {
			var s;
			this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((n) => i !== n)),
				(s = this.pswp) == null || s.off(e, i);
		}
		dispatch(e, i) {
			var n;
			if (this.pswp) return this.pswp.dispatch(e, i);
			const s = new Dl(e, i);
			return (
				(n = this._listeners[e]) == null ||
					n.forEach((r) => {
						r.call(this, s);
					}),
				s
			);
		}
	}
	class Ml {
		constructor(e, i) {
			if (((this.element = E('pswp__img pswp__img--placeholder', e ? 'img' : 'div', i)), e)) {
				const s = this.element;
				(s.decoding = 'async'), (s.alt = ''), (s.src = e), s.setAttribute('role', 'presentation');
			}
			this.element.setAttribute('aria-hidden', 'true');
		}
		setDisplayedSize(e, i) {
			this.element &&
				(this.element.tagName === 'IMG'
					? (bt(this.element, 250, 'auto'),
						(this.element.style.transformOrigin = '0 0'),
						(this.element.style.transform = Ee(0, 0, e / 250)))
					: bt(this.element, e, i));
		}
		destroy() {
			var e;
			(e = this.element) != null && e.parentNode && this.element.remove(), (this.element = null);
		}
	}
	class Ol {
		constructor(e, i, s) {
			(this.instance = i),
				(this.data = e),
				(this.index = s),
				(this.element = void 0),
				(this.placeholder = void 0),
				(this.slide = void 0),
				(this.displayedImageWidth = 0),
				(this.displayedImageHeight = 0),
				(this.width = Number(this.data.w) || Number(this.data.width) || 0),
				(this.height = Number(this.data.h) || Number(this.data.height) || 0),
				(this.isAttached = !1),
				(this.hasSlide = !1),
				(this.isDecoding = !1),
				(this.state = z.IDLE),
				this.data.type
					? (this.type = this.data.type)
					: this.data.src
						? (this.type = 'image')
						: (this.type = 'html'),
				this.instance.dispatch('contentInit', { content: this });
		}
		removePlaceholder() {
			this.placeholder &&
				!this.keepPlaceholder() &&
				setTimeout(() => {
					this.placeholder && (this.placeholder.destroy(), (this.placeholder = void 0));
				}, 1e3);
		}
		load(e, i) {
			if (this.slide && this.usePlaceholder())
				if (this.placeholder) {
					const s = this.placeholder.element;
					s && !s.parentElement && this.slide.container.prepend(s);
				} else {
					const s = this.instance.applyFilters(
						'placeholderSrc',
						this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
						this
					);
					this.placeholder = new Ml(s, this.slide.container);
				}
			(this.element && !i) ||
				this.instance.dispatch('contentLoad', { content: this, isLazy: e }).defaultPrevented ||
				(this.isImageContent()
					? ((this.element = E('pswp__img', 'img')), this.displayedImageWidth && this.loadImage(e))
					: ((this.element = E('pswp__content', 'div')),
						(this.element.innerHTML = this.data.html || '')),
				i && this.slide && this.slide.updateContentSize(!0));
		}
		loadImage(e) {
			if (
				!this.isImageContent() ||
				!this.element ||
				this.instance.dispatch('contentLoadImage', { content: this, isLazy: e }).defaultPrevented
			)
				return;
			const i = this.element;
			this.updateSrcsetSizes(),
				this.data.srcset && (i.srcset = this.data.srcset),
				(i.src = this.data.src ?? ''),
				(i.alt = this.data.alt ?? ''),
				(this.state = z.LOADING),
				i.complete
					? this.onLoaded()
					: ((i.onload = () => {
							this.onLoaded();
						}),
						(i.onerror = () => {
							this.onError();
						}));
		}
		setSlide(e) {
			(this.slide = e), (this.hasSlide = !0), (this.instance = e.pswp);
		}
		onLoaded() {
			(this.state = z.LOADED),
				this.slide &&
					this.element &&
					(this.instance.dispatch('loadComplete', { slide: this.slide, content: this }),
					this.slide.isActive &&
						this.slide.heavyAppended &&
						!this.element.parentNode &&
						(this.append(), this.slide.updateContentSize(!0)),
					(this.state === z.LOADED || this.state === z.ERROR) && this.removePlaceholder());
		}
		onError() {
			(this.state = z.ERROR),
				this.slide &&
					(this.displayError(),
					this.instance.dispatch('loadComplete', { slide: this.slide, isError: !0, content: this }),
					this.instance.dispatch('loadError', { slide: this.slide, content: this }));
		}
		isLoading() {
			return this.instance.applyFilters('isContentLoading', this.state === z.LOADING, this);
		}
		isError() {
			return this.state === z.ERROR;
		}
		isImageContent() {
			return this.type === 'image';
		}
		setDisplayedSize(e, i) {
			if (
				this.element &&
				(this.placeholder && this.placeholder.setDisplayedSize(e, i),
				!this.instance.dispatch('contentResize', { content: this, width: e, height: i })
					.defaultPrevented && (bt(this.element, e, i), this.isImageContent() && !this.isError()))
			) {
				const s = !this.displayedImageWidth && e;
				(this.displayedImageWidth = e),
					(this.displayedImageHeight = i),
					s ? this.loadImage(!1) : this.updateSrcsetSizes(),
					this.slide &&
						this.instance.dispatch('imageSizeChange', {
							slide: this.slide,
							width: e,
							height: i,
							content: this
						});
			}
		}
		isZoomable() {
			return this.instance.applyFilters(
				'isContentZoomable',
				this.isImageContent() && this.state !== z.ERROR,
				this
			);
		}
		updateSrcsetSizes() {
			if (!this.isImageContent() || !this.element || !this.data.srcset) return;
			const e = this.element,
				i = this.instance.applyFilters('srcsetSizesWidth', this.displayedImageWidth, this);
			(!e.dataset.largestUsedSize || i > parseInt(e.dataset.largestUsedSize, 10)) &&
				((e.sizes = i + 'px'), (e.dataset.largestUsedSize = String(i)));
		}
		usePlaceholder() {
			return this.instance.applyFilters('useContentPlaceholder', this.isImageContent(), this);
		}
		lazyLoad() {
			this.instance.dispatch('contentLazyLoad', { content: this }).defaultPrevented ||
				this.load(!0);
		}
		keepPlaceholder() {
			return this.instance.applyFilters('isKeepingPlaceholder', this.isLoading(), this);
		}
		destroy() {
			(this.hasSlide = !1),
				(this.slide = void 0),
				!this.instance.dispatch('contentDestroy', { content: this }).defaultPrevented &&
					(this.remove(),
					this.placeholder && (this.placeholder.destroy(), (this.placeholder = void 0)),
					this.isImageContent() &&
						this.element &&
						((this.element.onload = null), (this.element.onerror = null), (this.element = void 0)));
		}
		displayError() {
			var e;
			if (this.slide) {
				let i = E('pswp__error-msg', 'div');
				(i.innerText = ((e = this.instance.options) == null ? void 0 : e.errorMsg) ?? ''),
					(i = this.instance.applyFilters('contentErrorElement', i, this)),
					(this.element = E('pswp__content pswp__error-msg-container', 'div')),
					this.element.appendChild(i),
					(this.slide.container.innerText = ''),
					this.slide.container.appendChild(this.element),
					this.slide.updateContentSize(!0),
					this.removePlaceholder();
			}
		}
		append() {
			if (this.isAttached || !this.element) return;
			if (((this.isAttached = !0), this.state === z.ERROR)) {
				this.displayError();
				return;
			}
			if (this.instance.dispatch('contentAppend', { content: this }).defaultPrevented) return;
			const e = 'decode' in this.element;
			this.isImageContent()
				? e && this.slide && (!this.slide.isActive || ii())
					? ((this.isDecoding = !0),
						this.element
							.decode()
							.catch(() => {})
							.finally(() => {
								(this.isDecoding = !1), this.appendImage();
							}))
					: this.appendImage()
				: this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
		}
		activate() {
			this.instance.dispatch('contentActivate', { content: this }).defaultPrevented ||
				!this.slide ||
				(this.isImageContent() && this.isDecoding && !ii()
					? this.appendImage()
					: this.isError() && this.load(!1, !0),
				this.slide.holderElement && this.slide.holderElement.setAttribute('aria-hidden', 'false'));
		}
		deactivate() {
			this.instance.dispatch('contentDeactivate', { content: this }),
				this.slide &&
					this.slide.holderElement &&
					this.slide.holderElement.setAttribute('aria-hidden', 'true');
		}
		remove() {
			(this.isAttached = !1),
				!this.instance.dispatch('contentRemove', { content: this }).defaultPrevented &&
					(this.element && this.element.parentNode && this.element.remove(),
					this.placeholder && this.placeholder.element && this.placeholder.element.remove());
		}
		appendImage() {
			this.isAttached &&
				(this.instance.dispatch('contentAppendImage', { content: this }).defaultPrevented ||
					(this.slide &&
						this.element &&
						!this.element.parentNode &&
						this.slide.container.appendChild(this.element),
					(this.state === z.LOADED || this.state === z.ERROR) && this.removePlaceholder()));
		}
	}
	const bl = 5;
	function ls(t, e, i) {
		const s = e.createContentFromData(t, i);
		let n;
		const { options: r } = e;
		if (r) {
			n = new as(r, t, -1);
			let a;
			e.pswp ? (a = e.pswp.viewportSize) : (a = ns(r, e));
			const o = rs(r, a, t, i);
			n.update(s.width, s.height, o);
		}
		return (
			s.lazyLoad(),
			n && s.setDisplayedSize(Math.ceil(s.width * n.initial), Math.ceil(s.height * n.initial)),
			s
		);
	}
	function xl(t, e) {
		const i = e.getItemData(t);
		if (!e.dispatch('lazyLoadSlide', { index: t, itemData: i }).defaultPrevented)
			return ls(i, e, t);
	}
	class Tl {
		constructor(e) {
			(this.pswp = e),
				(this.limit = Math.max(e.options.preload[0] + e.options.preload[1] + 1, bl)),
				(this._cachedItems = []);
		}
		updateLazy(e) {
			const { pswp: i } = this;
			if (i.dispatch('lazyLoad').defaultPrevented) return;
			const { preload: s } = i.options,
				n = e === void 0 ? !0 : e >= 0;
			let r;
			for (r = 0; r <= s[1]; r++) this.loadSlideByIndex(i.currIndex + (n ? r : -r));
			for (r = 1; r <= s[0]; r++) this.loadSlideByIndex(i.currIndex + (n ? -r : r));
		}
		loadSlideByIndex(e) {
			const i = this.pswp.getLoopedIndex(e);
			let s = this.getContentByIndex(i);
			s || ((s = xl(i, this.pswp)), s && this.addToCache(s));
		}
		getContentBySlide(e) {
			let i = this.getContentByIndex(e.index);
			return (
				i || ((i = this.pswp.createContentFromData(e.data, e.index)), this.addToCache(i)),
				i.setSlide(e),
				i
			);
		}
		addToCache(e) {
			if (
				(this.removeByIndex(e.index),
				this._cachedItems.push(e),
				this._cachedItems.length > this.limit)
			) {
				const i = this._cachedItems.findIndex((s) => !s.isAttached && !s.hasSlide);
				i !== -1 && this._cachedItems.splice(i, 1)[0].destroy();
			}
		}
		removeByIndex(e) {
			const i = this._cachedItems.findIndex((s) => s.index === e);
			i !== -1 && this._cachedItems.splice(i, 1);
		}
		getContentByIndex(e) {
			return this._cachedItems.find((i) => i.index === e);
		}
		destroy() {
			this._cachedItems.forEach((e) => e.destroy()), (this._cachedItems = []);
		}
	}
	class kl extends Pl {
		getNumItems() {
			var n;
			let e = 0;
			const i = (n = this.options) == null ? void 0 : n.dataSource;
			i && 'length' in i
				? (e = i.length)
				: i &&
					'gallery' in i &&
					(i.items || (i.items = this._getGalleryDOMElements(i.gallery)),
					i.items && (e = i.items.length));
			const s = this.dispatch('numItems', { dataSource: i, numItems: e });
			return this.applyFilters('numItems', s.numItems, i);
		}
		createContentFromData(e, i) {
			return new Ol(e, this, i);
		}
		getItemData(e) {
			var a;
			const i = (a = this.options) == null ? void 0 : a.dataSource;
			let s = {};
			Array.isArray(i)
				? (s = i[e])
				: i &&
					'gallery' in i &&
					(i.items || (i.items = this._getGalleryDOMElements(i.gallery)), (s = i.items[e]));
			let n = s;
			n instanceof Element && (n = this._domElementToItemData(n));
			const r = this.dispatch('itemData', { itemData: n || {}, index: e });
			return this.applyFilters('itemData', r.itemData, e);
		}
		_getGalleryDOMElements(e) {
			var i, s;
			return ((i = this.options) != null && i.children) ||
				((s = this.options) != null && s.childSelector)
				? Ro(this.options.children, this.options.childSelector, e) || []
				: [e];
		}
		_domElementToItemData(e) {
			const i = { element: e },
				s = e.tagName === 'A' ? e : e.querySelector('a');
			if (s) {
				(i.src = s.dataset.pswpSrc || s.href),
					s.dataset.pswpSrcset && (i.srcset = s.dataset.pswpSrcset),
					(i.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0),
					(i.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0),
					(i.w = i.width),
					(i.h = i.height),
					s.dataset.pswpType && (i.type = s.dataset.pswpType);
				const n = e.querySelector('img');
				n && ((i.msrc = n.currentSrc || n.src), (i.alt = n.getAttribute('alt') ?? '')),
					(s.dataset.pswpCropped || s.dataset.cropped) && (i.thumbCropped = !0);
			}
			return this.applyFilters('domItemData', i, e, s);
		}
		lazyLoadData(e, i) {
			return ls(e, this, i);
		}
	}
	const Oe = 0.003;
	class Ll {
		constructor(e) {
			(this.pswp = e),
				(this.isClosed = !0),
				(this.isOpen = !1),
				(this.isClosing = !1),
				(this.isOpening = !1),
				(this._duration = void 0),
				(this._useAnimation = !1),
				(this._croppedZoom = !1),
				(this._animateRootOpacity = !1),
				(this._animateBgOpacity = !1),
				(this._placeholder = void 0),
				(this._opacityElement = void 0),
				(this._cropContainer1 = void 0),
				(this._cropContainer2 = void 0),
				(this._thumbBounds = void 0),
				(this._prepareOpen = this._prepareOpen.bind(this)),
				e.on('firstZoomPan', this._prepareOpen);
		}
		open() {
			this._prepareOpen(), this._start();
		}
		close() {
			if (this.isClosed || this.isClosing || this.isOpening) return;
			const e = this.pswp.currSlide;
			(this.isOpen = !1),
				(this.isOpening = !1),
				(this.isClosing = !0),
				(this._duration = this.pswp.options.hideAnimationDuration),
				e &&
					e.currZoomLevel * e.width >= this.pswp.options.maxWidthToAnimate &&
					(this._duration = 0),
				this._applyStartProps(),
				setTimeout(
					() => {
						this._start();
					},
					this._croppedZoom ? 30 : 0
				);
		}
		_prepareOpen() {
			if ((this.pswp.off('firstZoomPan', this._prepareOpen), !this.isOpening)) {
				const e = this.pswp.currSlide;
				(this.isOpening = !0),
					(this.isClosing = !1),
					(this._duration = this.pswp.options.showAnimationDuration),
					e &&
						e.zoomLevels.initial * e.width >= this.pswp.options.maxWidthToAnimate &&
						(this._duration = 0),
					this._applyStartProps();
			}
		}
		_applyStartProps() {
			var n;
			const { pswp: e } = this,
				i = this.pswp.currSlide,
				{ options: s } = e;
			if (
				(s.showHideAnimationType === 'fade'
					? ((s.showHideOpacity = !0), (this._thumbBounds = void 0))
					: s.showHideAnimationType === 'none'
						? ((s.showHideOpacity = !1), (this._duration = 0), (this._thumbBounds = void 0))
						: this.isOpening && e._initialThumbBounds
							? (this._thumbBounds = e._initialThumbBounds)
							: (this._thumbBounds = this.pswp.getThumbBounds()),
				(this._placeholder = i == null ? void 0 : i.getPlaceholderElement()),
				e.animations.stopAll(),
				(this._useAnimation = !!(this._duration && this._duration > 50)),
				(this._animateZoom =
					!!this._thumbBounds &&
					(i == null ? void 0 : i.content.usePlaceholder()) &&
					(!this.isClosing || !e.mainScroll.isShifted())),
				this._animateZoom
					? (this._animateRootOpacity = s.showHideOpacity ?? !1)
					: ((this._animateRootOpacity = !0),
						this.isOpening && i && (i.zoomAndPanToInitial(), i.applyCurrentZoomPan())),
				(this._animateBgOpacity = !this._animateRootOpacity && this.pswp.options.bgOpacity > Oe),
				(this._opacityElement = this._animateRootOpacity ? e.element : e.bg),
				!this._useAnimation)
			) {
				(this._duration = 0),
					(this._animateZoom = !1),
					(this._animateBgOpacity = !1),
					(this._animateRootOpacity = !0),
					this.isOpening &&
						(e.element && (e.element.style.opacity = String(Oe)), e.applyBgOpacity(1));
				return;
			}
			this._animateZoom && this._thumbBounds && this._thumbBounds.innerRect
				? ((this._croppedZoom = !0),
					(this._cropContainer1 = this.pswp.container),
					(this._cropContainer2 = (n = this.pswp.currSlide) == null ? void 0 : n.holderElement),
					e.container &&
						((e.container.style.overflow = 'hidden'),
						(e.container.style.width = e.viewportSize.x + 'px')))
				: (this._croppedZoom = !1),
				this.isOpening
					? (this._animateRootOpacity
							? (e.element && (e.element.style.opacity = String(Oe)), e.applyBgOpacity(1))
							: (this._animateBgOpacity && e.bg && (e.bg.style.opacity = String(Oe)),
								e.element && (e.element.style.opacity = '1')),
						this._animateZoom &&
							(this._setClosedStateZoomPan(),
							this._placeholder &&
								((this._placeholder.style.willChange = 'transform'),
								(this._placeholder.style.opacity = String(Oe)))))
					: this.isClosing &&
						(e.mainScroll.itemHolders[0] && (e.mainScroll.itemHolders[0].el.style.display = 'none'),
						e.mainScroll.itemHolders[2] && (e.mainScroll.itemHolders[2].el.style.display = 'none'),
						this._croppedZoom &&
							e.mainScroll.x !== 0 &&
							(e.mainScroll.resetPosition(), e.mainScroll.resize()));
		}
		_start() {
			this.isOpening &&
			this._useAnimation &&
			this._placeholder &&
			this._placeholder.tagName === 'IMG'
				? new Promise((e) => {
						let i = !1,
							s = !0;
						Eo(this._placeholder).finally(() => {
							(i = !0), s || e(!0);
						}),
							setTimeout(() => {
								(s = !1), i && e(!0);
							}, 50),
							setTimeout(e, 250);
					}).finally(() => this._initiate())
				: this._initiate();
		}
		_initiate() {
			var e, i;
			(e = this.pswp.element) == null ||
				e.style.setProperty('--pswp-transition-duration', this._duration + 'ms'),
				this.pswp.dispatch(this.isOpening ? 'openingAnimationStart' : 'closingAnimationStart'),
				this.pswp.dispatch('initialZoom' + (this.isOpening ? 'In' : 'Out')),
				(i = this.pswp.element) == null || i.classList.toggle('pswp--ui-visible', this.isOpening),
				this.isOpening
					? (this._placeholder && (this._placeholder.style.opacity = '1'),
						this._animateToOpenState())
					: this.isClosing && this._animateToClosedState(),
				this._useAnimation || this._onAnimationComplete();
		}
		_onAnimationComplete() {
			var i;
			const { pswp: e } = this;
			(this.isOpen = this.isOpening),
				(this.isClosed = this.isClosing),
				(this.isOpening = !1),
				(this.isClosing = !1),
				e.dispatch(this.isOpen ? 'openingAnimationEnd' : 'closingAnimationEnd'),
				e.dispatch('initialZoom' + (this.isOpen ? 'InEnd' : 'OutEnd')),
				this.isClosed
					? e.destroy()
					: this.isOpen &&
						(this._animateZoom &&
							e.container &&
							((e.container.style.overflow = 'visible'), (e.container.style.width = '100%')),
						(i = e.currSlide) == null || i.applyCurrentZoomPan());
		}
		_animateToOpenState() {
			const { pswp: e } = this;
			this._animateZoom &&
				(this._croppedZoom &&
					this._cropContainer1 &&
					this._cropContainer2 &&
					(this._animateTo(this._cropContainer1, 'transform', 'translate3d(0,0,0)'),
					this._animateTo(this._cropContainer2, 'transform', 'none')),
				e.currSlide &&
					(e.currSlide.zoomAndPanToInitial(),
					this._animateTo(e.currSlide.container, 'transform', e.currSlide.getCurrentTransform()))),
				this._animateBgOpacity &&
					e.bg &&
					this._animateTo(e.bg, 'opacity', String(e.options.bgOpacity)),
				this._animateRootOpacity && e.element && this._animateTo(e.element, 'opacity', '1');
		}
		_animateToClosedState() {
			const { pswp: e } = this;
			this._animateZoom && this._setClosedStateZoomPan(!0),
				this._animateBgOpacity &&
					e.bgOpacity > 0.01 &&
					e.bg &&
					this._animateTo(e.bg, 'opacity', '0'),
				this._animateRootOpacity && e.element && this._animateTo(e.element, 'opacity', '0');
		}
		_setClosedStateZoomPan(e) {
			if (!this._thumbBounds) return;
			const { pswp: i } = this,
				{ innerRect: s } = this._thumbBounds,
				{ currSlide: n, viewportSize: r } = i;
			if (this._croppedZoom && s && this._cropContainer1 && this._cropContainer2) {
				const a = -r.x + (this._thumbBounds.x - s.x) + s.w,
					o = -r.y + (this._thumbBounds.y - s.y) + s.h,
					l = r.x - s.w,
					h = r.y - s.h;
				e
					? (this._animateTo(this._cropContainer1, 'transform', Ee(a, o)),
						this._animateTo(this._cropContainer2, 'transform', Ee(l, h)))
					: (ce(this._cropContainer1, a, o), ce(this._cropContainer2, l, h));
			}
			n &&
				(x(n.pan, s || this._thumbBounds),
				(n.currZoomLevel = this._thumbBounds.w / n.width),
				e
					? this._animateTo(n.container, 'transform', n.getCurrentTransform())
					: n.applyCurrentZoomPan());
		}
		_animateTo(e, i, s) {
			if (!this._duration) {
				e.style[i] = s;
				return;
			}
			const { animations: n } = this.pswp,
				r = {
					duration: this._duration,
					easing: this.pswp.options.easing,
					onComplete: () => {
						n.activeAnimations.length || this._onAnimationComplete();
					},
					target: e
				};
			(r[i] = s), n.startTransition(r);
		}
	}
	const Il = {
		allowPanToNext: !0,
		spacing: 0.1,
		loop: !0,
		pinchToClose: !0,
		closeOnVerticalDrag: !0,
		hideAnimationDuration: 333,
		showAnimationDuration: 333,
		zoomAnimationDuration: 333,
		escKey: !0,
		arrowKeys: !0,
		returnFocus: !0,
		maxWidthToAnimate: 4e3,
		clickToCloseNonZoomable: !0,
		imageClickAction: 'zoom-or-close',
		bgClickAction: 'close',
		tapAction: 'toggle-controls',
		doubleTapAction: 'zoom',
		indexIndicatorSep: ' / ',
		preloaderDelay: 2e3,
		bgOpacity: 0.8,
		index: 0,
		errorMsg: 'The image cannot be loaded',
		preload: [1, 2],
		easing: 'cubic-bezier(.4,0,.22,1)'
	};
	class Cl extends kl {
		constructor(e) {
			super(),
				(this.options = this._prepareOptions(e || {})),
				(this.offset = { x: 0, y: 0 }),
				(this._prevViewportSize = { x: 0, y: 0 }),
				(this.viewportSize = { x: 0, y: 0 }),
				(this.bgOpacity = 1),
				(this.currIndex = 0),
				(this.potentialIndex = 0),
				(this.isOpen = !1),
				(this.isDestroying = !1),
				(this.hasMouse = !1),
				(this._initialItemData = {}),
				(this._initialThumbBounds = void 0),
				(this.topBar = void 0),
				(this.element = void 0),
				(this.template = void 0),
				(this.container = void 0),
				(this.scrollWrap = void 0),
				(this.currSlide = void 0),
				(this.events = new zo()),
				(this.animations = new ll()),
				(this.mainScroll = new Qo(this)),
				(this.gestures = new Xo(this)),
				(this.opener = new Ll(this)),
				(this.keyboard = new tl(this)),
				(this.contentLoader = new Tl(this));
		}
		init() {
			if (this.isOpen || this.isDestroying) return !1;
			(this.isOpen = !0),
				this.dispatch('init'),
				this.dispatch('beforeOpen'),
				this._createMainStructure();
			let e = 'pswp--open';
			return (
				this.gestures.supportsTouch && (e += ' pswp--touch'),
				this.options.mainClass && (e += ' ' + this.options.mainClass),
				this.element && (this.element.className += ' ' + e),
				(this.currIndex = this.options.index || 0),
				(this.potentialIndex = this.currIndex),
				this.dispatch('firstUpdate'),
				(this.scrollWheel = new hl(this)),
				(Number.isNaN(this.currIndex) ||
					this.currIndex < 0 ||
					this.currIndex >= this.getNumItems()) &&
					(this.currIndex = 0),
				this.gestures.supportsTouch || this.mouseDetected(),
				this.updateSize(),
				(this.offset.y = window.pageYOffset),
				(this._initialItemData = this.getItemData(this.currIndex)),
				this.dispatch('gettingData', {
					index: this.currIndex,
					data: this._initialItemData,
					slide: void 0
				}),
				(this._initialThumbBounds = this.getThumbBounds()),
				this.dispatch('initialLayout'),
				this.on('openingAnimationEnd', () => {
					const { itemHolders: i } = this.mainScroll;
					i[0] && ((i[0].el.style.display = 'block'), this.setContent(i[0], this.currIndex - 1)),
						i[2] && ((i[2].el.style.display = 'block'), this.setContent(i[2], this.currIndex + 1)),
						this.appendHeavy(),
						this.contentLoader.updateLazy(),
						this.events.add(window, 'resize', this._handlePageResize.bind(this)),
						this.events.add(window, 'scroll', this._updatePageScrollOffset.bind(this)),
						this.dispatch('bindEvents');
				}),
				this.mainScroll.itemHolders[1] &&
					this.setContent(this.mainScroll.itemHolders[1], this.currIndex),
				this.dispatch('change'),
				this.opener.open(),
				this.dispatch('afterInit'),
				!0
			);
		}
		getLoopedIndex(e) {
			const i = this.getNumItems();
			return this.options.loop && (e > i - 1 && (e -= i), e < 0 && (e += i)), Ne(e, 0, i - 1);
		}
		appendHeavy() {
			this.mainScroll.itemHolders.forEach((e) => {
				var i;
				(i = e.slide) == null || i.appendHeavy();
			});
		}
		goTo(e) {
			this.mainScroll.moveIndexBy(this.getLoopedIndex(e) - this.potentialIndex);
		}
		next() {
			this.goTo(this.potentialIndex + 1);
		}
		prev() {
			this.goTo(this.potentialIndex - 1);
		}
		zoomTo(...e) {
			var i;
			(i = this.currSlide) == null || i.zoomTo(...e);
		}
		toggleZoom() {
			var e;
			(e = this.currSlide) == null || e.toggleZoom();
		}
		close() {
			!this.opener.isOpen ||
				this.isDestroying ||
				((this.isDestroying = !0),
				this.dispatch('close'),
				this.events.removeAll(),
				this.opener.close());
		}
		destroy() {
			var e;
			if (!this.isDestroying) {
				(this.options.showHideAnimationType = 'none'), this.close();
				return;
			}
			this.dispatch('destroy'),
				(this._listeners = {}),
				this.scrollWrap &&
					((this.scrollWrap.ontouchmove = null), (this.scrollWrap.ontouchend = null)),
				(e = this.element) == null || e.remove(),
				this.mainScroll.itemHolders.forEach((i) => {
					var s;
					(s = i.slide) == null || s.destroy();
				}),
				this.contentLoader.destroy(),
				this.events.removeAll();
		}
		refreshSlideContent(e) {
			this.contentLoader.removeByIndex(e),
				this.mainScroll.itemHolders.forEach((i, s) => {
					var r, a;
					let n = (((r = this.currSlide) == null ? void 0 : r.index) ?? 0) - 1 + s;
					this.canLoop() && (n = this.getLoopedIndex(n)),
						n === e &&
							(this.setContent(i, e, !0),
							s === 1 && ((this.currSlide = i.slide), (a = i.slide) == null || a.setIsActive(!0)));
				}),
				this.dispatch('change');
		}
		setContent(e, i, s) {
			if ((this.canLoop() && (i = this.getLoopedIndex(i)), e.slide)) {
				if (e.slide.index === i && !s) return;
				e.slide.destroy(), (e.slide = void 0);
			}
			if (!this.canLoop() && (i < 0 || i >= this.getNumItems())) return;
			const n = this.getItemData(i);
			(e.slide = new No(n, i, this)),
				i === this.currIndex && (this.currSlide = e.slide),
				e.slide.append(e.el);
		}
		getViewportCenterPoint() {
			return { x: this.viewportSize.x / 2, y: this.viewportSize.y / 2 };
		}
		updateSize(e) {
			if (this.isDestroying) return;
			const i = ns(this.options, this);
			(!e && Le(i, this._prevViewportSize)) ||
				(x(this._prevViewportSize, i),
				this.dispatch('beforeResize'),
				x(this.viewportSize, this._prevViewportSize),
				this._updatePageScrollOffset(),
				this.dispatch('viewportSize'),
				this.mainScroll.resize(this.opener.isOpen),
				!this.hasMouse && window.matchMedia('(any-hover: hover)').matches && this.mouseDetected(),
				this.dispatch('resize'));
		}
		applyBgOpacity(e) {
			(this.bgOpacity = Math.max(e, 0)),
				this.bg && (this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity));
		}
		mouseDetected() {
			var e;
			this.hasMouse ||
				((this.hasMouse = !0), (e = this.element) == null || e.classList.add('pswp--has_mouse'));
		}
		_handlePageResize() {
			this.updateSize(),
				/iPhone|iPad|iPod/i.test(window.navigator.userAgent) &&
					setTimeout(() => {
						this.updateSize();
					}, 500);
		}
		_updatePageScrollOffset() {
			this.setScrollOffset(0, window.pageYOffset);
		}
		setScrollOffset(e, i) {
			(this.offset.x = e), (this.offset.y = i), this.dispatch('updateScrollOffset');
		}
		_createMainStructure() {
			(this.element = E('pswp', 'div')),
				this.element.setAttribute('tabindex', '-1'),
				this.element.setAttribute('role', 'dialog'),
				(this.template = this.element),
				(this.bg = E('pswp__bg', 'div', this.element)),
				(this.scrollWrap = E('pswp__scroll-wrap', 'section', this.element)),
				(this.container = E('pswp__container', 'div', this.scrollWrap)),
				this.scrollWrap.setAttribute('aria-roledescription', 'carousel'),
				this.container.setAttribute('aria-live', 'off'),
				this.container.setAttribute('id', 'pswp__items'),
				this.mainScroll.appendHolders(),
				(this.ui = new gl(this)),
				this.ui.init(),
				(this.options.appendToEl || document.body).appendChild(this.element);
		}
		getThumbBounds() {
			return Sl(this.currIndex, this.currSlide ? this.currSlide.data : this._initialItemData, this);
		}
		canLoop() {
			return this.options.loop && this.getNumItems() > 2;
		}
		_prepareOptions(e) {
			return (
				window.matchMedia('(prefers-reduced-motion), (update: slow)').matches &&
					((e.showHideAnimationType = 'none'), (e.zoomAnimationDuration = 0)),
				{ ...Il, ...e }
			);
		}
	}
	function Al() {
		go(() => Promise.resolve({}), ['examples/webperf/photoswipe-74fe18cc.css']),
			new Io({ gallery: '.article-grid', children: '.photoswipe-image', pswpModule: Cl }).init();
	}
	document.addEventListener('DOMContentLoaded', () => {
		mo(), Al();
	});
});
export default El();
