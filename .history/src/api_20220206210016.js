import data from "@/dummies/assets";
import exchange from "@/dummies/exchange";

const url = 'https://api.coincap.io/v2'

let generalHeaders = new Headers();
generalHeaders.append('Access-Control-Allow-Origin', '*')
generalHeaders.append('Accept-Encoding', 'deflate')
generalHeaders.append('Accept', '*/*')
generalHeaders.append('Accept-Language', '*')
generalHeaders.append('Content-Language', '*')
generalHeaders.append('Content-Type', '*/*')
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: generalHeaders
  }
  
function getAssets() {
    return fetch(`${url}/assets?limit=20`, requestOptions)
    .then((res) => {
        //console.log('RES:', res)
        res.json()
    })
    .then((res) => res.data)
    .catch(e => {
        console.log('Error: ', e)
        console.log('Data: ', data)
        return data.data
    })
}

function getAsset(coin) {
    /* return fetch(`${url}/assets/${coin}`, requestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(e => {
        console.log('Error: ', e)
        console.log('Bitcoin: ', bitcoin.data)
        return bitcoin.data
    }) */
    console.log(coin)
    return new Promise((resolve, reject) => {
        if(!coin){
            return reject('No hay datos')
        }
        return resolve('bitcoin.data')
    })
}

function getAssetHistory(coin) {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()
    console.log('AssetHistory: ', `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`, requestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getMarkets(coin){

    const raw = ""
    const markerRequestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow',
        headers: generalHeaders
      }
    console.log('Markets: ', `${url}/assets/${coin}/markets?limit=5`)
    return fetch(`${url}/assets/${coin}/markets?limit=5`, markerRequestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
}

function getExchange(id){
    console.log('Exchange: ', `${url}/exchanges/${id}`)
    return fetch(`${url}/exchanges/${id}`, requestOptions)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(e => {
        console.log('Error: ', e)
    })
}

export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchange
}
