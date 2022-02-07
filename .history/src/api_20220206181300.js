const url = 'https://api.coincap.io/v2'

const myHeaders = new Headers();

const myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };


function getAssets() {
    const assets = new Request(`${url}/assets?limit=20`, myInit)
    return fetch(assets)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAsset(coin) {
    const asset = new Request(`${url}/assets/${coin}`, myInit)
    return fetch(asset)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAssetHistory(coin) {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    const assetHistory = new Request(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`, myInit)
    return fetch(assetHistory)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getMarkets(coin){
    const markets = new Request(`${url}/assets/${coin}/markets?limit=5`, myInit)
    return fetch(markets)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getExchange(id){
    const exchange = new Request(`${url}/exchanges/${id}`, myInit);
    return fetch(exchange)
    .then((res) => res.json())
    .then((res) => res.data)
}

export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchange
}
