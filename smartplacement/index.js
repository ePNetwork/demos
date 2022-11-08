const queryParams = new URLSearchParams(window.location.search)

const envUrlMapping = {
    prod: 'https://epnt.ebay.com/static/epn-smart-tools.js',
    pp: 'https://www.explorer.pp.stratus.ebay.com/static/epn-smart-tools.js',
    preprod: 'https://www.explorer.pp.stratus.ebay.com/static/epn-smart-tools.js',
    staging: 'https://explorer.vip.qa.ebay.com/static/epn-smart-tools.js',
    qa: 'https://explorer.vip.qa.ebay.com/static/epn-smart-tools.js',
    local: 'http://localhost:3000/epn-smart-tools.js',
    localhost: 'http://localhost:3000/epn-smart-tools.js'
}

const scriptContent = {
    preprod: 'window._epn = { campaign: 5338031630 } window._epnInternalConfig = { baseURL: "https://www.explorer.pp.stratus.ebay.com" }',
    pp: 'window._epn = { campaign: 5338031630 } window._epnInternalConfig = { baseURL: "https://www.explorer.pp.stratus.ebay.com" }',
    qa: 'window._epnInternalConfig = { baseURL: "https://epnt.qa.ebay.com" }',
    staging: 'window._epnInternalConfig = { baseURL: "https://epnt.qa.ebay.com" }',

}

const setBaseUrl = (env) => {
    if (scriptContent[env]) {
        const head = document.getElementsByTagName('head')[0]
        const script= document.createElement('script')
        script.type = "text/javascript"
        script.text = scriptContent[env]
        head.appendChild(script)
    }
}

const setScript = () => {
    const head= document.getElementsByTagName('head')[0]
    const script= document.createElement('script')
    const env = queryParams.get('env') || 'prod'
    setBaseUrl(env)
    script.src= envUrlMapping[env]
    head.appendChild(script)
}

const getIns = () => {
    const ins = document.querySelectorAll('ins')
    return ins[0]
}

const changeSrc = () => {
    const insEl = getIns()
    const configId = queryParams.get('configId') || queryParams.get('configid')
    if (insEl && configId) {
        insEl.setAttribute("data-config-id", configId)
    }
    setScript()
}

(function(){
    setTimeout(() => {
        changeSrc()
    }, 500)
})()