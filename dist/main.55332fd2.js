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
var $searchForm = $('.searchForm');
var $input = $('#input');
var input = document.getElementById('input');
var searchForm = document.getElementsByClassName('searchForm');
var seoBox = document.getElementsByClassName('seoBox');
var seoLogo = document.getElementsByClassName('seoLogo');
var $seoLogo = $('.seoLogo');
var $seoBox = $('.seoBox');
var tagString = localStorage.getItem('tagString');
var tagObject = JSON.parse(tagString);
var tagStringSeo = localStorage.getItem('tagStringSeo');
var tagObjectSeo = JSON.parse(tagStringSeo);

$(document).ready(function () {
  if (seoLogo[0].innerHTML.indexOf('Baidu') > 0) {
    $searchForm.attr({
      action: 'https://www.baidu.com/s'
    });
    $input.attr({
      name: 'wd'
    });
  } else if (seoLogo[0].innerHTML.indexOf('Google') > 0) {
    $searchForm.attr({
      action: 'https://www.google.com/search'
    });
    $input.attr({
      name: 'q'
    });
  } else if (seoLogo[0].innerHTML.indexOf('Bing') > 0) {
    $searchForm.attr({
      action: 'https://www.bing.com/search'
    });
    $input.attr({
      name: 'q'
    });
  }
});

var hashmapSeo = tagObjectSeo || [{
  icon: '<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>'
}, {
  icon: '<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>'
}, {
  icon: '<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>'
}];

var hashMapBd = [{
  icon: '<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>'
}, {
  icon: '<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>'
}, {
  icon: '<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>'
}];

var hashMapGg = [{
  icon: '<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>'
}, {
  icon: '<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>'
}, {
  icon: '<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>'
}];
var hashMapBi = [{
  icon: '<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>'
}, {
  icon: '<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>'
}, {
  icon: '<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>'
}];

var renderSeo = function renderSeo() {
  hashmapSeo.forEach(function (node) {
    $('<div class="seoLogo" style="display: none">' + node.icon + '</div>').appendTo($seoBox);
  });
  seoLogo[0].style.display = 'block';
};

renderSeo();

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
      //???????????????html??????
      var temp = seoLogo[0].innerHTML;
      seoLogo[0].innerHTML = this.innerHTML;
      this.innerHTML = temp;
      for (var j = 1; j < length; j++) {
        seoLogo[j].style.display = 'none';
      }

      if (seoLogo[0].innerHTML.indexOf('Baidu') > 0) {
        console.log(seoLogo[0].innerHTML);
        $searchForm.attr({
          action: 'https://www.baidu.com/s'
        });
        $input.attr({
          name: 'wd'
        });
        console.log($searchForm.attr('action'));
        hashmapSeo = hashMapBd;
        renderSeo();
      } else if (seoLogo[0].innerHTML.indexOf('Google') > 0) {
        console.log(seoLogo[0].innerHTML);
        $searchForm.attr({
          action: 'https://www.google.com/search'
        });
        $input.attr({
          name: 'q'
        });
        console.log($searchForm.attr('action'));
        hashmapSeo = hashMapGg;
        renderSeo();
      } else if (seoLogo[0].innerHTML.indexOf('Bing') > 0) {
        console.log(seoLogo[0].innerHTML);
        $searchForm.attr({
          action: 'https://www.bing.com/search'
        });
        $input.attr({
          name: 'q'
        });
        console.log($searchForm.attr('action'));
        hashmapSeo = hashMapBi;
        renderSeo();
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
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace('.com', '').replace('.cn', '').replace('.org', '').replace('.mozilla', '').replace(/\/.*/, ''); //??????/???????????????
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $('\n        <li>\n        <a href="' + node.url + '">\n            <div class="site">\n                <div class="logo">' + node.logo + '</div>\n                <div class="link">' + urlTrim(node.url).toUpperCase() + '</div>\n                <div class="delete"><svg class="icon">\n                <use xlink:href="#icon-close1"></use>\n            </svg></div>\n            </div>\n        </a>\n        </li>').insertBefore($lastLi);
    $li.on('click', '.delete', function (e) {
      e.preventDefault();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$('.titleText').on('touchstart', function () {
  window.alert('\n    tips:\n        1.\u70B9\u51FB\u56FE\u6807\u53EF\u4EE5\u5207\u6362\u5BF9\u5E94\u641C\u7D22\u5F15\u64CE\u3002\n        2.\u70B9\u51FB\'\u65B0\u589E\u7F51\u7AD9\' \u8F93\u5165url,\u5373\u53EF\u4FDD\u5B58\u3002\n        3.\u4F7F\u7528pc\u7AEF\u6D4F\u89C8\u5668\u83B7\u5F97\u66F4\u597D\u4F53\u9A8C\u3002\n        4.\u67E5\u770B\u672C\u7AD9\u6E90\u7801\u8BF7\u70B9\u51FB\'\xA9 2021 WE5T3\'\u3002\n        5.\u67E5\u770B\u672C\u7AD9\u66F4\u65B0\u65E5\u5FD7\u8BF7\u70B9\u51FB\'\u5173\u4E8E\'\u3002\n        ');
});

$('.addButton').on('click', function () {
  var url = window.prompt('???????????????????????????');
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
  var string1 = JSON.stringify(hashmapSeo);
  localStorage.setItem('tagStringSeo', string1);
};

$(document).on('keypress', function (e) {
  var isFocused = document.activeElement === input;
  if (isFocused === false) {
    var key = Number(e.key);
    for (var _i3 = 0; _i3 < hashMap.length + 1; _i3++) {
      if (_i3 === key) {
        window.location.href = hashMap[_i3 - 1].url;
      }
    }
  }
});

window.onload = function () {
  //???????????????????????????fnDate()
  setInterval(function () {
    fnDate();
  }, 1000);
};

function fnDate() {
  var timeDiv1 = document.getElementById('time1');
  var timeDiv2 = document.getElementById('time2');
  var date = new Date();
  var year = date.getFullYear(); //????????????
  var month = date.getMonth(); //????????????
  var data = date.getDate(); //???
  var hours = date.getHours(); //??????
  var minute = date.getMinutes(); //???
  var second = date.getSeconds(); //???
  var simpleTime = fnW(hours) + ':' + fnW(minute);
  var detailTime = year + '-' + fnW(month + 1) + '-' + fnW(data) + ' ' + fnW(hours) + ':' + fnW(minute) + ':' + fnW(second);
  timeDiv1.innerHTML = simpleTime;
  timeDiv2.innerHTML = detailTime;
}

function fnW(str) {
  var num = void 0;
  str >= 10 ? num = str : num = '0' + str;
  return num;
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.55332fd2.map