const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
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
                <div class="link">${urlTrim(node.url)}</div>
                <div class="delete"><svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg></div>
            </div>
        </a>
        </li>`).insertBefore($lastLi)

        $li.on('click', '.delete', (e) => {
            e.preventDefault()
            // e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('输入要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)

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
    localStorage.setItem('x', string)
}

$(window).on('keypress', (e) => {
    // const { key } = e  为 const key = e.key 的简写形式 
    const key = Number(e.key) 
    for (let i = 0; i < hashMap.length; i++) {
        if (i === key) {
            window.open(hashMap[i-1].url)          
        }
    }
})
