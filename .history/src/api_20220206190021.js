const url = 'https://api.coincap.io/v2'

let generalHeaders = new Headers();
generalHeaders.append('Accept', '*/*')
generalHeaders.append('Accept-Language', '*')
generalHeaders.append('Content-Language', '*')
generalHeaders.append('Content-Type', 'text/plain')
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: generalHeaders
  }
  
function getAssets() {
    return fetch(`${url}/assets?limit=20`, requestOptions)
    .then((res) => {
        console.log('RES:', res)
        res.json()
    })
    .then((res) => res.data)
    .catch(e => console.log('Error: ', e))
}

function getAsset(coin) {
    return fetch(`${url}/assets/${coin}`, requestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getAssetHistory(coin) {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`, requestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getMarkets(coin){

    const markerRequestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
        headers: generalHeaders
      }

    return fetch(`${url}/assets/${coin}/markets?limit=5`, markerRequestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getExchange(id){
    return fetch(`${url}/exchanges/${id}`, requestOptions)
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
