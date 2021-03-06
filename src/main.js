const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const $searchForm = $('.searchForm')
const $input = $('#input')
const input = document.getElementById('input')
const searchForm = document.getElementsByClassName('searchForm')
const seoBox = document.getElementsByClassName('seoBox')
const seoLogo = document.getElementsByClassName('seoLogo')
const $seoLogo = $('.seoLogo')
const $seoBox = $('.seoBox')
const tagString = localStorage.getItem('tagString')
const tagObject = JSON.parse(tagString)
const tagStringSeo = localStorage.getItem('tagStringSeo')
const tagObjectSeo = JSON.parse(tagStringSeo)

$(document).ready(function () {
  if (seoLogo[0].innerHTML.indexOf('Baidu') > 0) {
    $searchForm.attr({
      action: 'https://www.baidu.com/s',
    })
    $input.attr({
      name: 'wd',
    })
  } else if (seoLogo[0].innerHTML.indexOf('Google') > 0) {
    $searchForm.attr({
      action: 'https://www.google.com/search',
    })
    $input.attr({
      name: 'q',
    })
  } else if (seoLogo[0].innerHTML.indexOf('Bing') > 0) {
    $searchForm.attr({
      action: 'https://www.bing.com/search',
    })
    $input.attr({
      name: 'q',
    })
  }
})

let hashmapSeo = tagObjectSeo || [
  {
    icon: `<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>`,
  },
]

const hashMapBd = [
  {
    icon: `<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>`,
  },
]

const hashMapGg = [
  {
    icon: `<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>`,
  },
]
const hashMapBi = [
  {
    icon: `<svg class="icon" id="sBing"><use xlink:href="#icon-bing"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sBaidu"><use xlink:href="#icon-baidu"></use></svg>`,
  },
  {
    icon: `<svg class="icon" id="sGoogle"><use xlink:href="#icon-google"></use></svg>`,
  },
]

const renderSeo = () => {
  hashmapSeo.forEach((node) => {
    $(`<div class="seoLogo" style="display: none">${node.icon}</div>`
    ).appendTo($seoBox)
  })
  seoLogo[0].style.display = 'block'
}

renderSeo()

const length = seoLogo.length

seoLogo[0].onclick = function () {
  if (seoLogo[1].style.display === 'block') {
    for (let i = 1; i < length; i++) {
      seoLogo[i].style.display = 'none'
    }
  } else {
    for (let i = 1; i < length; i++) {
      seoLogo[i].style.display = 'block'
    }
  }
  $(document).click(function (event) {
    const withdraw = $('.seoLogo')
    if (
        !withdraw.is(event.target) &&
        withdraw.has(event.target).length === 0
    ) {
      for (let i = 1; i < length; i++) {
        seoLogo[i].style.display = 'none'
      }
    }
  })
}

for (let i = 1; i < length; i++) {
  seoLogo[i].onclick = (function () {
    return function () {
      //???????????????html??????
      let temp = seoLogo[0].innerHTML
      seoLogo[0].innerHTML = this.innerHTML
      this.innerHTML = temp
      for (let j = 1; j < length; j++) {
        seoLogo[j].style.display = 'none'
      }
      
      
      if (seoLogo[0].innerHTML.indexOf('Baidu') > 0) {
        console.log(seoLogo[0].innerHTML)
        $searchForm.attr({
          action: 'https://www.baidu.com/s',
        })
        $input.attr({
          name: 'wd',
        })
        console.log($searchForm.attr('action'))
        hashmapSeo = hashMapBd
        renderSeo()
      } else if (seoLogo[0].innerHTML.indexOf('Google') > 0) {
        console.log(seoLogo[0].innerHTML)
        $searchForm.attr({
          action: 'https://www.google.com/search',
        })
        $input.attr({
          name: 'q',
        })
        console.log($searchForm.attr('action'))
        hashmapSeo = hashMapGg
        renderSeo()
      } else if (seoLogo[0].innerHTML.indexOf('Bing') > 0) {
        console.log(seoLogo[0].innerHTML)
        $searchForm.attr({
          action: 'https://www.bing.com/search',
        })
        $input.attr({
          name: 'q',
        })
        console.log($searchForm.attr('action'))
        hashmapSeo = hashMapBi
        renderSeo()
      }
    }
  })(i)
}

const hashMap = tagObject || [
  {
    logo: `
            <svg class="icon">
                <use xlink:href="#icon-mdn"></use>
            </svg>`,
    logoType: 'svg',
    url: 'https://developer.mozilla.org/zh-CN',
  },
  {
    logo: `
            <svg class="icon">
                <use xlink:href="#icon-GitHub"></use>
            </svg>`,
    logoType: 'svg',
    url: 'https://github.com',
  },
  {
    logo: `
            <svg class="icon">
                <use xlink:href="#icon-stackoverflow"></use>
            </svg>`,
    logoType: 'svg',
    url: 'https://stackoverflow.com',
  },
]

const urlTrim = (url) => {
  return url
  .replace('https://', '')
  .replace('http://', '')
  .replace('www.', '')
  .replace('.com', '')
  .replace('.cn', '')
  .replace('.org', '')
  .replace('.mozilla', '')
  .replace(/\/.*/, '') //??????/???????????????
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${urlTrim(node.url).toUpperCase()}</div>
                <div class="delete"><svg class="icon">
                <use xlink:href="#icon-close1"></use>
            </svg></div>
            </div>
        </a>
        </li>`).insertBefore($lastLi)
    $li.on('click', '.delete', (e) => {
      e.preventDefault()
      hashMap.splice(index, 1)
      render()
    })
  })
}

render()

$('.titleText').on('touchstart', () => {
  window.alert(`
    tips:
        1.?????????????????????????????????????????????
        2.??????'????????????' ??????url,???????????????
        3.??????pc?????????????????????????????????
        4.???????????????????????????'?? 2021 WE5T3'???
        5.?????????????????????????????????'??????'???
        `)
})

$('.addButton').on('click', () => {
  let url = window.prompt('???????????????????????????')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  // console.log(url)
  hashMap.push({
    logo: urlTrim(url)[0].toUpperCase(),
    logoType: 'text',
    url: url,
  })
  // console.log(url)
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('tagString', string)
  const string1 = JSON.stringify(hashmapSeo)
  localStorage.setItem('tagStringSeo', string1)
}

$(document).on('keypress', (e) => {
  const isFocused = document.activeElement === input
  if (isFocused === false) {
    const key = Number(e.key)
    for (let i = 0; i < hashMap.length + 1; i++) {
      if (i === key) {
        window.location.href = hashMap[i - 1].url
      }
    }
  }
})

window.onload = function () {
  //???????????????????????????fnDate()
  setInterval(function () {
    fnDate()
  }, 1000)
}

function fnDate() {
  let timeDiv1 = document.getElementById('time1')
  let timeDiv2 = document.getElementById('time2')
  let date = new Date()
  let year = date.getFullYear() //????????????
  let month = date.getMonth() //????????????
  let data = date.getDate() //???
  let hours = date.getHours() //??????
  let minute = date.getMinutes() //???
  let second = date.getSeconds() //???
  let simpleTime = fnW(hours) + ':' + fnW(minute)
  let detailTime =
      year +
      '-' +
      fnW(month + 1) +
      '-' +
      fnW(data) +
      ' ' +
      fnW(hours) +
      ':' +
      fnW(minute) +
      ':' +
      fnW(second)
  timeDiv1.innerHTML = simpleTime
  timeDiv2.innerHTML = detailTime
}

function fnW(str) {
  let num
  str >= 10 ? (num = str) : (num = '0' + str)
  return num
}
