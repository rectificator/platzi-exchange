const url = 'https://api.coincap.io/v2'

const myHeaders = new Headers();

const myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

const assets = new Request(`${url}/assets?limit=20`, myInit);
const asset = new Request('flowers.jpg', myInit);
const assetHistory = new Request('flowers.jpg', myInit);
const markets = new Request('flowers.jpg', myInit);
const exchange = new Request('flowers.jpg', myInit);

function getAssets() {
    return fetch(assets)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAsset(coin) {
    return fetch(`${url}/assets/${coin}`,
    {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
    })
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAssetHistory(coin) {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`,
    {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
    })
    .then((res) => res.json())
    .then((res) => res.data)
}

function getMarkets(coin){
    return fetch(`${url}/assets/${coin}/markets?limit=5`,
    {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
    })
    .then((res) => res.json())
    .then((res) => res.data)
}

function getExchange(id){
    return fetch(`${url}/exchanges/${id}`,
    {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json'}),
        mode: 'no-cors'
    })
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
