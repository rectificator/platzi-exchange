const url = 'https://api.coincap.io/v2'

function getAssets() {
    fetch(`${url}/assets?limit=20`)
    .then(res => {
        return res.json
    })
}