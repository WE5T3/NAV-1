// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var tagString = localStorage.getItem('tagString');
var tagObject = JSON.parse(tagString);

var $searchForm = $('.searchForm');
var $input = $('#input');

var searchForm = document.getElementsByClassName('searchForm');
var seoBox = document.getElementsByClassName('seoBox');
// var forms = formbox.getElementsByTagName('form')
var seoLogo = document.getElementsByClassName('seoLogo');
var length = seoLogo.length;

seoLogo[0].onclick = function () {
    if (seoLogo[1].style.display === 'block') {
        for (var i = 1; i < length; i++) {
            seoLogo[i].style.display = 'none';
        }
    } else {
        for (var _i = 1; _i < length; _i++) {
            seoLogo[_i].style.display = 'block';
        }
    }
    $(document).click(function (event) {
        var withdraw = $('.seoLogo');
        if (!withdraw.is(event.target) && withdraw.has(event.target).length === 0) {
            for (var _i2 = 1; _i2 < length; _i2++) {
                seoLogo[_i2].style.display = 'none';
            }
        }
    });
};

for (var i = 1; i < length; i++) {
    seoLogo[i].onclick = function () {
        return function () {
            //交换显示的html内容
            console.log(seoLogo[0]);
            var temp = seoLogo[0].innerHTML;
            seoLogo[0].innerHTML = this.innerHTML;
            this.innerHTML = temp;
            for (var j = 1; j < length; j++) {
                seoLogo[j].style.display = 'none';
            }
            if (seoLogo[0].innerHTML.indexOf('Baidu') > 0) {
                $searchForm.attr({
                    action: 'https://www.baidu.com/s'
                });
                $input.attr({
                    name: 'wd'
                });
                console.log('baidu');
            } else if (seoLogo[0].innerHTML.indexOf('Google') > 0) {
                $searchForm.attr({
                    action: 'http://www.google.com/search'
                });
                $input.attr({
                    name: 'q'
                });
                console.log('google');
            } else if (seoLogo[0].innerHTML.indexOf('Bing') > 0) {
                $searchForm.attr({
                    action: 'http://www.bing.com/search'
                });
                $input.attr({
                    name: 'q'
                });
                console.log('bing');
            }
        };
    }(i);
}

var hashMap = tagObject || [{
    logo: '\n            <svg class="icon">\n                <use xlink:href="#icon-mdn"></use>\n            </svg>',
    logoType: 'svg',
    url: 'https://developer.mozilla.org/zh-CN'
}, {
    logo: '\n            <svg class="icon">\n                <use xlink:href="#icon-GitHub"></use>\n            </svg>',
    logoType: 'svg',
    url: 'https://github.com'
}, {
    logo: '\n            <svg class="icon">\n                <use xlink:href="#icon-stackoverflow"></use>\n            </svg>',
    logoType: 'svg',
    url: 'https://stackoverflow.com'
}];

var urlTrim = function urlTrim(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('.com', '').replace('.cn', '').replace('.org', '').replace(/\/.*/, ''); //删除/开头的内容
};

var render = function render() {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach(function (node, index) {
        var $li = $('\n        <li>\n        <a href="' + node.url + '">\n            <div class="site">\n                <div class="logo">' + node.logo + '</div>\n                <div class="link">' + urlTrim(node.url) + '</div>\n                <div class="delete"><svg class="icon">\n                <use xlink:href="#icon-close"></use>\n            </svg></div>\n            </div>\n        </a>\n        </li>').insertBefore($lastLi);

        $li.on('click', '.delete', function (e) {
            e.preventDefault();
            // e.stopPropagation()
            hashMap.splice(index, 1);
            render();
        });
    });
};

render();

$('.addButton').on('click', function () {
    var url = window.prompt('输入要添加的网址');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    // console.log(url)

    hashMap.push({
        logo: urlTrim(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    // console.log(url)

    render();
});
window.onbeforeunload = function () {
    var string = JSON.stringify(hashMap);
    localStorage.setItem('tagString', string);
};

$(document).ready(function () {
    $('#input').focus();
});

$('#input').blur(function () {
    $(document).on('keyup', function (e) {
        var key = Number(e.key);
        for (var _i3 = 0; _i3 < hashMap.length + 1; _i3++) {
            if (_i3 === key) {
                window.location.href = hashMap[_i3 - 1].url;
            }
        }
    });
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.0e4f2629.map