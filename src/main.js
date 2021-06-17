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
        $(
            `<div class="seoLogo" style="display: none">${node.icon}</div>`
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
            //交换显示的html内容
            let temp = seoLogo[0].innerHTML
            seoLogo[0].innerHTML = this.innerHTML
            this.innerHTML = temp
            for (let j = 1; j < length; j++) {
                seoLogo[j].style.display = 'none'
            }

            if (seoLogo[0].innerHTML.indexOf('Baidu') > 0) {
                $searchForm.attr({
                    action: 'https://www.baidu.com/s',
                })
                $input.attr({
                    name: 'wd',
                })
                hashmapSeo = hashMapBd
                renderSeo()
            } else if (seoLogo[0].innerHTML.indexOf('Google') > 0) {
                $searchForm.attr({
                    action: 'http://www.google.com/search',
                })
                $input.attr({
                    name: 'q',
                })
                hashmapSeo = hashMapGg
                renderSeo()
            } else if (seoLogo[0].innerHTML.indexOf('Bing') > 0) {
                $searchForm.attr({
                    action: 'http://www.bing.com/search',
                })
                $input.attr({
                    name: 'q',
                })
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
        .replace(/\/.*/, '') //删除/开头的内容
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
        1.点击图标可以切换对应搜索引擎。
        2.点击'新增网站' 输入url,即可保存。
        3.使用pc端浏览器获得更好体验。
        4.查看本站源码请点击'© 2021 WE5T3'。
        5.查看本站更新日志请点击'关于'。
        `)
})

$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加的网址')
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
    //定时器每秒调用一次fnDate()
    setInterval(function () {
        fnDate()
    }, 1000)
}

function fnDate() {
    let timeDiv1 = document.getElementById('time1')
    let timeDiv2 = document.getElementById('time2')
    let date = new Date()
    let year = date.getFullYear() //当前年份
    let month = date.getMonth() //当前月份
    let data = date.getDate() //天
    let hours = date.getHours() //小时
    let minute = date.getMinutes() //分
    let second = date.getSeconds() //秒
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
