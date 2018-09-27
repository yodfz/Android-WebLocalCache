/* PrismJS 1.13.0
http://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+csharp+css-extras+http+hpkp+hsts+java+json+less+nginx+sql+powershell+jsx+typescript+sass+scss+stylus+tsx&plugins=jsonp-highlight+command-line */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
  , Prism = function() {
    var e = /\blang(?:uage)?-(\w+)\b/i
      , t = 0
      , n = _self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
            encode: function(e) {
                return e instanceof r ? new r(e.type,n.util.encode(e.content),e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(e) {
                return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
            },
            objId: function(e) {
                return e.__id || Object.defineProperty(e, "__id", {
                    value: ++t
                }),
                e.__id
            },
            clone: function(e, t) {
                var r = n.util.type(e);
                switch (t = t || {},
                r) {
                case "Object":
                    if (t[n.util.objId(e)])
                        return t[n.util.objId(e)];
                    var a = {};
                    t[n.util.objId(e)] = a;
                    for (var l in e)
                        e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
                    return a;
                case "Array":
                    if (t[n.util.objId(e)])
                        return t[n.util.objId(e)];
                    var a = [];
                    return t[n.util.objId(e)] = a,
                    e.forEach(function(e, r) {
                        a[r] = n.util.clone(e, t)
                    }),
                    a
                }
                return e
            }
        },
        languages: {
            extend: function(e, t) {
                var r = n.util.clone(n.languages[e]);
                for (var a in t)
                    r[a] = t[a];
                return r
            },
            insertBefore: function(e, t, r, a) {
                a = a || n.languages;
                var l = a[e];
                if (2 == arguments.length) {
                    r = arguments[1];
                    for (var i in r)
                        r.hasOwnProperty(i) && (l[i] = r[i]);
                    return l
                }
                var o = {};
                for (var s in l)
                    if (l.hasOwnProperty(s)) {
                        if (s == t)
                            for (var i in r)
                                r.hasOwnProperty(i) && (o[i] = r[i]);
                        o[s] = l[s]
                    }
                return n.languages.DFS(n.languages, function(t, n) {
                    n === a[e] && t != e && (this[t] = o)
                }),
                a[e] = o
            },
            DFS: function(e, t, r, a) {
                a = a || {};
                for (var l in e)
                    e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l),
                    "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0,
                    n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0,
                    n.languages.DFS(e[l], t, null, a)))
            }
        },
        plugins: {},
        highlightAll: function(e, t) {
            n.highlightAllUnder(document, e, t)
        },
        highlightAllUnder: function(e, t, r) {
            var a = {
                callback: r,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            n.hooks.run("before-highlightall", a);
            for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++]; )
                n.highlightElement(l, t === !0, a.callback)
        },
        highlightElement: function(t, r, a) {
            for (var l, i, o = t; o && !e.test(o.className); )
                o = o.parentNode;
            o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(),
            i = n.languages[l]),
            t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l,
            t.parentNode && (o = t.parentNode,
            /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
            var s = t.textContent
              , u = {
                element: t,
                language: l,
                grammar: i,
                code: s
            };
            if (n.hooks.run("before-sanity-check", u),
            !u.code || !u.grammar)
                return u.code && (n.hooks.run("before-highlight", u),
                u.element.textContent = u.code,
                n.hooks.run("after-highlight", u)),
                n.hooks.run("complete", u),
                void 0;
            if (n.hooks.run("before-highlight", u),
            r && _self.Worker) {
                var g = new Worker(n.filename);
                g.onmessage = function(e) {
                    u.highlightedCode = e.data,
                    n.hooks.run("before-insert", u),
                    u.element.innerHTML = u.highlightedCode,
                    a && a.call(u.element),
                    n.hooks.run("after-highlight", u),
                    n.hooks.run("complete", u)
                }
                ,
                g.postMessage(JSON.stringify({
                    language: u.language,
                    code: u.code,
                    immediateClose: !0
                }))
            } else
                u.highlightedCode = n.highlight(u.code, u.grammar, u.language),
                n.hooks.run("before-insert", u),
                u.element.innerHTML = u.highlightedCode,
                a && a.call(t),
                n.hooks.run("after-highlight", u),
                n.hooks.run("complete", u)
        },
        highlight: function(e, t, a) {
            var l = {
                code: e,
                grammar: t,
                language: a
            };
            return n.hooks.run("before-tokenize", l),
            l.tokens = n.tokenize(l.code, l.grammar),
            n.hooks.run("after-tokenize", l),
            r.stringify(n.util.encode(l.tokens), l.language)
        },
        matchGrammar: function(e, t, r, a, l, i, o) {
            var s = n.Token;
            for (var u in r)
                if (r.hasOwnProperty(u) && r[u]) {
                    if (u == o)
                        return;
                    var g = r[u];
                    g = "Array" === n.util.type(g) ? g : [g];
                    for (var c = 0; c < g.length; ++c) {
                        var h = g[c]
                          , f = h.inside
                          , d = !!h.lookbehind
                          , m = !!h.greedy
                          , p = 0
                          , y = h.alias;
                        if (m && !h.pattern.global) {
                            var v = h.pattern.toString().match(/[imuy]*$/)[0];
                            h.pattern = RegExp(h.pattern.source, v + "g")
                        }
                        h = h.pattern || h;
                        for (var b = a, k = l; b < t.length; k += t[b].length,
                        ++b) {
                            var w = t[b];
                            if (t.length > e.length)
                                return;
                            if (!(w instanceof s)) {
                                if (m && b != t.length - 1) {
                                    h.lastIndex = k;
                                    var _ = h.exec(e);
                                    if (!_)
                                        break;
                                    for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A)
                                        x += t[A].length,
                                        j >= x && (++b,
                                        k = x);
                                    if (t[b]instanceof s)
                                        continue;
                                    I = A - b,
                                    w = e.slice(k, x),
                                    _.index -= k
                                } else {
                                    h.lastIndex = 0;
                                    var _ = h.exec(w)
                                      , I = 1
                                }
                                if (_) {
                                    d && (p = _[1] ? _[1].length : 0);
                                    var j = _.index + p
                                      , _ = _[0].slice(p)
                                      , P = j + _.length
                                      , N = w.slice(0, j)
                                      , S = w.slice(P)
                                      , C = [b, I];
                                    N && (++b,
                                    k += N.length,
                                    C.push(N));
                                    var E = new s(u,f ? n.tokenize(_, f) : _,y,_,m);
                                    if (C.push(E),
                                    S && C.push(S),
                                    Array.prototype.splice.apply(t, C),
                                    1 != I && n.matchGrammar(e, t, r, b, k, !0, u),
                                    i)
                                        break
                                } else if (i)
                                    break
                            }
                        }
                    }
                }
        },
        tokenize: function(e, t) {
            var r = [e]
              , a = t.rest;
            if (a) {
                for (var l in a)
                    t[l] = a[l];
                delete t.rest
            }
            return n.matchGrammar(e, r, t, 0, 0, !1),
            r
        },
        hooks: {
            all: {},
            add: function(e, t) {
                var r = n.hooks.all;
                r[e] = r[e] || [],
                r[e].push(t)
            },
            run: function(e, t) {
                var r = n.hooks.all[e];
                if (r && r.length)
                    for (var a, l = 0; a = r[l++]; )
                        a(t)
            }
        }
    }
      , r = n.Token = function(e, t, n, r, a) {
        this.type = e,
        this.content = t,
        this.alias = n,
        this.length = 0 | (r || "").length,
        this.greedy = !!a
    }
    ;
    if (r.stringify = function(e, t, a) {
        if ("string" == typeof e)
            return e;
        if ("Array" === n.util.type(e))
            return e.map(function(n) {
                return r.stringify(n, t, e)
            }).join("");
        var l = {
            type: e.type,
            content: r.stringify(e.content, t, a),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
            parent: a
        };
        if (e.alias) {
            var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
            Array.prototype.push.apply(l.classes, i)
        }
        n.hooks.run("wrap", l);
        var o = Object.keys(l.attributes).map(function(e) {
            return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
        }).join(" ");
        return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
    }
    ,
    !_self.document)
        return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function(e) {
            var t = JSON.parse(e.data)
              , r = t.language
              , a = t.code
              , l = t.immediateClose;
            _self.postMessage(n.highlight(a, n.languages[r], r)),
            l && _self.close()
        }, !1),
        _self.Prism) : _self.Prism;
    var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return a && (n.filename = a.src,
    n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))),
    _self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                inside: {
                    punctuation: [/^=/, {
                        pattern: /(^|[^\\])["']/,
                        lookbehind: !0
                    }]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
},
Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity,
Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}),
Prism.languages.xml = Prism.languages.markup,
Prism.languages.html = Prism.languages.markup,
Prism.languages.mathml = Prism.languages.markup,
Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^{}\s][^{};]*?(?=\s*\{)/,
    string: {
        pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
},
Prism.languages.css.atrule.inside.rest = Prism.languages.css,
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0
    }
}),
Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(?:true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    "function": /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
}),
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
        alias: "function"
    },
    constant: /\b[A-Z][A-Z\d_]*\b/
}),
Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}),
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0
    }
}),
Prism.languages.js = Prism.languages.javascript;
Prism.languages.csharp = Prism.languages.extend("clike", {
    keyword: /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
    string: [{
        pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: !0
    }, {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
        greedy: !0
    }],
    "class-name": [{
        pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
        inside: {
            punctuation: /\./
        }
    }, {
        pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: !0,
        inside: {
            punctuation: /\./
        }
    }, {
        pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: !0,
        inside: {
            punctuation: /\./
        }
    }, {
        pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: !0,
        inside: {
            punctuation: /\./
        }
    }],
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i
}),
Prism.languages.insertBefore("csharp", "class-name", {
    "generic-method": {
        pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
        inside: {
            "function": /^\w+/,
            "class-name": {
                pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
                inside: {
                    punctuation: /\./
                }
            },
            keyword: Prism.languages.csharp.keyword,
            punctuation: /[<>(),.:]/
        }
    },
    preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: "property",
        inside: {
            directive: {
                pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    }
}),
Prism.languages.dotnet = Prism.languages.csharp;
Prism.languages.css.selector = {
    pattern: /[^{}\s][^{}]*(?=\s*\{)/,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+(?:\(.*\))?/,
        "class": /\.[-:.\w]+/,
        id: /#[-:.\w]+/,
        attribute: /\[[^\]]+\]/
    }
},
Prism.languages.insertBefore("css", "function", {
    hexcode: /#[\da-f]{3,8}/i,
    entity: /\\[\da-f]{1,8}/i,
    number: /[\d%.]+/
});
Prism.languages.http = {
    "request-line": {
        pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
        inside: {
            property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
            "attr-name": /:\w+/
        }
    },
    "response-status": {
        pattern: /^HTTP\/1.[01] \d+.*/m,
        inside: {
            property: {
                pattern: /(^HTTP\/1.[01] )\d+.*/i,
                lookbehind: !0
            }
        }
    },
    "header-name": {
        pattern: /^[\w-]+:(?=.)/m,
        alias: "keyword"
    }
};
var httpLanguages = {
    "application/json": Prism.languages.javascript,
    "application/xml": Prism.languages.markup,
    "text/xml": Prism.languages.markup,
    "text/html": Prism.languages.markup
};
for (var contentType in httpLanguages)
    if (httpLanguages[contentType]) {
        var options = {};
        options[contentType] = {
            pattern: new RegExp("(content-type:\\s*" + contentType + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*","i"),
            lookbehind: !0,
            inside: {
                rest: httpLanguages[contentType]
            }
        },
        Prism.languages.insertBefore("http", "header-name", options)
    }
;Prism.languages.hpkp = {
    directive: {
        pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=\/]+"|(?:max-age|report-uri)=|report-to )/,
        alias: "keyword"
    },
    safe: {
        pattern: /\d{7,}/,
        alias: "selector"
    },
    unsafe: {
        pattern: /\d{0,6}/,
        alias: "function"
    }
};
Prism.languages.hsts = {
    directive: {
        pattern: /\b(?:max-age=|includeSubDomains|preload)/,
        alias: "keyword"
    },
    safe: {
        pattern: /\d{8,}/,
        alias: "selector"
    },
    unsafe: {
        pattern: /\d{0,7}/,
        alias: "function"
    }
};
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
    operator: {
        pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
        lookbehind: !0
    }
}),
Prism.languages.insertBefore("java", "function", {
    annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0
    }
}),
Prism.languages.insertBefore("java", "class-name", {
    generics: {
        pattern: /<\s*\w+(?:\.\w+)?(?:\s*,\s*\w+(?:\.\w+)?)*>/i,
        alias: "function",
        inside: {
            keyword: Prism.languages.java.keyword,
            punctuation: /[<>(),.:]/
        }
    }
});
Prism.languages.json = {
    property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
    string: {
        pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        greedy: !0
    },
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    punctuation: /[{}[\]);,]/,
    operator: /:/g,
    "boolean": /\b(?:true|false)\b/i,
    "null": /\bnull\b/i
},
Prism.languages.jsonp = Prism.languages.json;
Prism.languages.less = Prism.languages.extend("css", {
    comment: [/\/\*[\s\S]*?\*\//, {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: !0
    }],
    atrule: {
        pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
        inside: {
            punctuation: /[:()]/
        }
    },
    selector: {
        pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
        inside: {
            variable: /@+[\w-]+/
        }
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    punctuation: /[{}();:,]/,
    operator: /[+\-*\/]/
}),
Prism.languages.insertBefore("less", "punctuation", {
    "function": Prism.languages.less.function
}),
Prism.languages.insertBefore("less", "property", {
    variable: [{
        pattern: /@[\w-]+\s*:/,
        inside: {
            punctuation: /:/
        }
    }, /@@?[\w-]+/],
    "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
        lookbehind: !0,
        alias: "function"
    }
});
Prism.languages.nginx = Prism.languages.extend("clike", {
    comment: {
        pattern: /(^|[^"{\\])#.*/,
        lookbehind: !0
    },
    keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types)\b/i
}),
Prism.languages.insertBefore("nginx", "keyword", {
    variable: /\$[a-z_]+/i
});
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0
    },
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\])*\2/,
        greedy: !0,
        lookbehind: !0
    },
    variable: /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
    "function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLACE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
Prism.languages.powershell = {
    comment: [{
        pattern: /(^|[^`])<#[\s\S]*?#>/,
        lookbehind: !0
    }, {
        pattern: /(^|[^`])#.*/,
        lookbehind: !0
    }],
    string: [{
        pattern: /"(?:`[\s\S]|[^`"])*"/,
        greedy: !0,
        inside: {
            "function": {
                pattern: /(^|[^`])\$\(.*?\)/,
                lookbehind: !0,
                inside: {}
            }
        }
    }, {
        pattern: /'(?:[^']|'')*'/,
        greedy: !0
    }],
    namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
    "boolean": /\$(?:true|false)\b/i,
    variable: /\$\w+\b/i,
    "function": [/\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i, /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i],
    keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
    operator: {
        pattern: /(\W?)(?:!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
        lookbehind: !0
    },
    punctuation: /[|{}[\];(),.]/
},
Prism.languages.powershell.string[0].inside.boolean = Prism.languages.powershell.boolean,
Prism.languages.powershell.string[0].inside.variable = Prism.languages.powershell.variable,
Prism.languages.powershell.string[0].inside.function.inside = Prism.languages.powershell;
!function(t) {
    var n = t.util.clone(t.languages.javascript);
    t.languages.jsx = t.languages.extend("markup", n),
    t.languages.jsx.tag.pattern = /<\/?[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{[^}]*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?>/i,
    t.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i,
    t.languages.insertBefore("inside", "attr-name", {
        spread: {
            pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
            inside: {
                punctuation: /\.{3}|[{}.]/,
                "attr-value": /\w+/
            }
        }
    }, t.languages.jsx.tag),
    t.languages.insertBefore("inside", "attr-value", {
        script: {
            pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
            inside: {
                "script-punctuation": {
                    pattern: /^=(?={)/,
                    alias: "punctuation"
                },
                rest: t.languages.jsx
            },
            alias: "language-javascript"
        }
    }, t.languages.jsx.tag);
    var e = function(t) {
        return "string" == typeof t ? t : "string" == typeof t.content ? t.content : t.content.map(e).join("")
    }
      , a = function(n) {
        for (var s = [], g = 0; g < n.length; g++) {
            var o = n[g]
              , i = !1;
            if ("string" != typeof o && ("tag" === o.type && o.content[0] && "tag" === o.content[0].type ? "</" === o.content[0].content[0].content ? s.length > 0 && s[s.length - 1].tagName === e(o.content[0].content[1]) && s.pop() : "/>" === o.content[o.content.length - 1].content || s.push({
                tagName: e(o.content[0].content[1]),
                openedBraces: 0
            }) : s.length > 0 && "punctuation" === o.type && "{" === o.content ? s[s.length - 1].openedBraces++ : s.length > 0 && s[s.length - 1].openedBraces > 0 && "punctuation" === o.type && "}" === o.content ? s[s.length - 1].openedBraces-- : i = !0),
            (i || "string" == typeof o) && s.length > 0 && 0 === s[s.length - 1].openedBraces) {
                var p = e(o);
                g < n.length - 1 && ("string" == typeof n[g + 1] || "plain-text" === n[g + 1].type) && (p += e(n[g + 1]),
                n.splice(g + 1, 1)),
                g > 0 && ("string" == typeof n[g - 1] || "plain-text" === n[g - 1].type) && (p = e(n[g - 1]) + p,
                n.splice(g - 1, 1),
                g--),
                n[g] = new t.Token("plain-text",p,null,p)
            }
            o.content && "string" != typeof o.content && a(o.content)
        }
    };
    t.hooks.add("after-tokenize", function(t) {
        ("jsx" === t.language || "tsx" === t.language) && a(t.tokens)
    })
}(Prism);
Prism.languages.typescript = Prism.languages.extend("javascript", {
    keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|module|declare|constructor|namespace|abstract|require|type)\b/,
    builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/
}),
Prism.languages.ts = Prism.languages.typescript;
!function(e) {
    e.languages.sass = e.languages.extend("css", {
        comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
            lookbehind: !0
        }
    }),
    e.languages.insertBefore("sass", "atrule", {
        "atrule-line": {
            pattern: /^(?:[ \t]*)[@+=].+/m,
            inside: {
                atrule: /(?:@[\w-]+|[+=])/m
            }
        }
    }),
    delete e.languages.sass.atrule;
    var a = /\$[-\w]+|#\{\$[-\w]+\}/
      , t = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
        pattern: /(\s+)-(?=\s)/,
        lookbehind: !0
    }];
    e.languages.insertBefore("sass", "property", {
        "variable-line": {
            pattern: /^[ \t]*\$.+/m,
            inside: {
                punctuation: /:/,
                variable: a,
                operator: t
            }
        },
        "property-line": {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
            inside: {
                property: [/[^:\s]+(?=\s*:)/, {
                    pattern: /(:)[^:\s]+/,
                    lookbehind: !0
                }],
                punctuation: /:/,
                variable: a,
                operator: t,
                important: e.languages.sass.important
            }
        }
    }),
    delete e.languages.sass.property,
    delete e.languages.sass.important,
    delete e.languages.sass.selector,
    e.languages.insertBefore("sass", "punctuation", {
        selector: {
            pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
            lookbehind: !0
        }
    })
}(Prism);
Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0
    },
    atrule: {
        pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /(?:[-a-z]+-)*url(?=\()/i,
    selector: {
        pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
        inside: {
            parent: {
                pattern: /&/,
                alias: "important"
            },
            placeholder: /%[-\w]+/,
            variable: /\$[-\w]+|#\{\$[-\w]+\}/
        }
    }
}),
Prism.languages.insertBefore("scss", "atrule", {
    keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
        pattern: /( +)(?:from|through)(?= )/,
        lookbehind: !0
    }]
}),
Prism.languages.scss.property = {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
    inside: {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/
    }
},
Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/
}),
Prism.languages.insertBefore("scss", "function", {
    placeholder: {
        pattern: /%[-\w]+/,
        alias: "selector"
    },
    statement: {
        pattern: /\B!(?:default|optional)\b/i,
        alias: "keyword"
    },
    "boolean": /\b(?:true|false)\b/,
    "null": /\bnull\b/,
    operator: {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
        lookbehind: !0
    }
}),
Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
!function(n) {
    var t = {
        url: /url\((["']?).*?\1\)/i,
        string: {
            pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
            greedy: !0
        },
        interpolation: null,
        func: null,
        important: /\B!(?:important|optional)\b/i,
        keyword: {
            pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
            lookbehind: !0
        },
        hexcode: /#[\da-f]{3,6}/i,
        number: /\b\d+(?:\.\d+)?%?/,
        "boolean": /\b(?:true|false)\b/,
        operator: [/~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/],
        punctuation: /[{}()\[\];:,]/
    };
    t.interpolation = {
        pattern: /\{[^\r\n}:]+\}/,
        alias: "variable",
        inside: {
            delimiter: {
                pattern: /^{|}$/,
                alias: "punctuation"
            },
            rest: t
        }
    },
    t.func = {
        pattern: /[\w-]+\([^)]*\).*/,
        inside: {
            "function": /^[^(]+/,
            rest: t
        }
    },
    n.languages.stylus = {
        comment: {
            pattern: /(^|[^\\])(\/\*[\s\S]*?\*\/|\/\/.*)/,
            lookbehind: !0
        },
        "atrule-declaration": {
            pattern: /(^\s*)@.+/m,
            lookbehind: !0,
            inside: {
                atrule: /^@[\w-]+/,
                rest: t
            }
        },
        "variable-declaration": {
            pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
            lookbehind: !0,
            inside: {
                variable: /^\S+/,
                rest: t
            }
        },
        statement: {
            pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
            lookbehind: !0,
            inside: {
                keyword: /^\S+/,
                rest: t
            }
        },
        "property-declaration": {
            pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(\r?\n|\r)(?:\{|\2[ \t]+)))/m,
            lookbehind: !0,
            inside: {
                property: {
                    pattern: /^[^\s:]+/,
                    inside: {
                        interpolation: t.interpolation
                    }
                },
                rest: t
            }
        },
        selector: {
            pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
            lookbehind: !0,
            inside: {
                interpolation: t.interpolation,
                punctuation: /[{},]/
            }
        },
        func: t.func,
        string: t.string,
        interpolation: t.interpolation,
        punctuation: /[{}()\[\];:.]/
    }
}(Prism);
var typescript = Prism.util.clone(Prism.languages.typescript);
Prism.languages.tsx = Prism.languages.extend("jsx", typescript);
!function() {
    function t(t) {
        "function" != typeof t || e(t) || r.push(t)
    }
    function e(t) {
        return "function" == typeof t ? r.filter(function(e) {
            return e.valueOf() === t.valueOf()
        })[0] : "string" == typeof t && t.length > 0 ? r.filter(function(e) {
            return e.name === t
        })[0] : null
    }
    function n(t) {
        if ("string" == typeof t && (t = e(t)),
        "function" == typeof t) {
            var n = r.indexOf(t);
            n >= 0 && r.splice(n, 1)
        }
    }
    function a() {
        Array.prototype.slice.call(document.querySelectorAll("pre[data-jsonp]")).forEach(function(t) {
            t.textContent = "";
            var e = document.createElement("code");
            e.textContent = i,
            t.appendChild(e);
            var n = t.getAttribute("data-adapter")
              , a = null;
            if (n) {
                if ("function" != typeof window[n])
                    return e.textContent = "JSONP adapter function '" + n + "' doesn't exist",
                    void 0;
                a = window[n]
            }
            var u = "prismjsonp" + o++
              , f = document.createElement("a")
              , l = f.href = t.getAttribute("data-jsonp");
            f.href += (f.search ? "&" : "?") + (t.getAttribute("data-callback") || "callback") + "=" + u;
            var s = setTimeout(function() {
                e.textContent === i && (e.textContent = "Timeout loading '" + l + "'")
            }, 5e3)
              , d = document.createElement("script");
            d.src = f.href,
            window[u] = function(n) {
                document.head.removeChild(d),
                clearTimeout(s),
                delete window[u];
                var o = "";
                if (a)
                    o = a(n, t);
                else
                    for (var i in r)
                        if (o = r[i](n, t),
                        null !== o)
                            break;
                null === o ? e.textContent = "Cannot parse response (perhaps you need an adapter function?)" : (e.textContent = o,
                Prism.highlightElement(e))
            }
            ,
            document.head.appendChild(d)
        })
    }
    if (self.Prism && self.document && document.querySelectorAll && [].filter) {
        var r = [];
        Prism.plugins.jsonphighlight = {
            registerAdapter: t,
            removeAdapter: n,
            highlight: a
        },
        t(function(t) {
            if (t && t.meta && t.data) {
                if (t.meta.status && t.meta.status >= 400)
                    return "Error: " + (t.data.message || t.meta.status);
                if ("string" == typeof t.data.content)
                    return "function" == typeof atob ? atob(t.data.content.replace(/\s/g, "")) : "Your browser cannot decode base64"
            }
            return null
        }),
        t(function(t, e) {
            if (t && t.meta && t.data && t.data.files) {
                if (t.meta.status && t.meta.status >= 400)
                    return "Error: " + (t.data.message || t.meta.status);
                var n = e.getAttribute("data-filename");
                if (null == n)
                    for (var a in t.data.files)
                        if (t.data.files.hasOwnProperty(a)) {
                            n = a;
                            break
                        }
                return void 0 !== t.data.files[n] ? t.data.files[n].content : "Error: unknown or missing gist file " + n
            }
            return null
        }),
        t(function(t) {
            return t && t.node && "string" == typeof t.data ? t.data : null
        });
        var o = 0
          , i = "Loading¡­";
        a()
    }
}();
!function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var e = /\s*\bcommand-line\b\s*/;
        Prism.hooks.add("before-highlight", function(a) {
            if (a.vars = a.vars || {},
            a.vars["command-line"] = a.vars["command-line"] || {},
            a.vars["command-line"].complete || !a.code)
                return a.vars["command-line"].complete = !0,
                void 0;
            var n = a.element.parentNode;
            if (!n || !/pre/i.test(n.nodeName) || !e.test(n.className) && !e.test(a.element.className))
                return a.vars["command-line"].complete = !0,
                void 0;
            if (a.element.querySelector(".command-line-prompt"))
                return a.vars["command-line"].complete = !0,
                void 0;
            var t = a.code.split("\n");
            a.vars["command-line"].numberOfLines = t.length,
            a.vars["command-line"].outputLines = [];
            var r = n.getAttribute("data-output")
              , s = n.getAttribute("data-filter-output");
            if (r || "" === r) {
                r = r.split(",");
                for (var o = 0; o < r.length; o++) {
                    var m = r[o].split("-")
                      , i = parseInt(m[0], 10)
                      , l = 2 === m.length ? parseInt(m[1], 10) : i;
                    if (!isNaN(i) && !isNaN(l)) {
                        1 > i && (i = 1),
                        l > t.length && (l = t.length),
                        i--,
                        l--;
                        for (var d = i; l >= d; d++)
                            a.vars["command-line"].outputLines[d] = t[d],
                            t[d] = ""
                    }
                }
            } else if (s)
                for (var o = 0; o < t.length; o++)
                    0 === t[o].indexOf(s) && (a.vars["command-line"].outputLines[o] = t[o].slice(s.length),
                    t[o] = "");
            a.code = t.join("\n")
        }),
        Prism.hooks.add("before-insert", function(e) {
            if (e.vars = e.vars || {},
            e.vars["command-line"] = e.vars["command-line"] || {},
            !e.vars["command-line"].complete) {
                for (var a = e.highlightedCode.split("\n"), n = 0; n < e.vars["command-line"].outputLines.length; n++)
                    e.vars["command-line"].outputLines.hasOwnProperty(n) && (a[n] = e.vars["command-line"].outputLines[n]);
                e.highlightedCode = a.join("\n")
            }
        }),
        Prism.hooks.add("complete", function(a) {
            if (a.vars = a.vars || {},
            a.vars["command-line"] = a.vars["command-line"] || {},
            !a.vars["command-line"].complete) {
                var n = a.element.parentNode;
                e.test(a.element.className) && (a.element.className = a.element.className.replace(e, " ")),
                e.test(n.className) || (n.className += " command-line");
                var t = function(e, a) {
                    return (n.getAttribute(e) || a).replace(/"/g, "&quot")
                }
                  , r = new Array(a.vars["command-line"].numberOfLines + 1)
                  , s = t("data-prompt", "");
                if ("" !== s)
                    r = r.join('<span data-prompt="' + s + '"></span>');
                else {
                    var o = t("data-user", "user")
                      , m = t("data-host", "localhost");
                    r = r.join('<span data-user="' + o + '" data-host="' + m + '"></span>')
                }
                var i = document.createElement("span");
                i.className = "command-line-prompt",
                i.innerHTML = r;
                for (var l = 0; l < a.vars["command-line"].outputLines.length; l++)
                    if (a.vars["command-line"].outputLines.hasOwnProperty(l)) {
                        var d = i.children[l];
                        d.removeAttribute("data-user"),
                        d.removeAttribute("data-host"),
                        d.removeAttribute("data-prompt")
                    }
                a.element.insertBefore(i, a.element.firstChild),
                a.vars["command-line"].complete = !0
            }
        })
    }
}();
