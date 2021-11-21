function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '207c5a36445144deb01d8b95f4fc1a3c';
    let AppKey = 'sA8n5MZTY6_V-uHoJYi27BlbJyk';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}
function cityResponse() {
    let city = document.getElementById('text').value;
    console.log(city);
    
}
cityResponse();
function mapResponse() {
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taichung?$top=100&$format=JSON',

        {
            headers: getAuthorizationHeader()
        }
    )
        .then((response) => {
            var map = L.map('map');

            // 設定經緯度座標
            map.setView(new L.LatLng(23.5, 121), 10);

            // 設定圖資來源

            var osmUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
            var osm = new L.TileLayer(
                osmUrl,
                {
                    minZoom: 8,
                    maxZoom: 18
                });
            map.addLayer(osm);

            const customIcon = L.icon({
                iconUrl: './img/bike-icon.png',
                iconSize: [50, 60],
            });
            response.data.forEach(function (data, ID) {
                const marker = L.marker([response.data[ID].StationPosition.PositionLat, response.data[ID].StationPosition.PositionLon], {
                    icon: customIcon,
                    // title: '跟 <a> 的 title 一樣', // 跟 <a> 的 title 一樣
                    opacity: 1.0
                }).addTo(map);
            });

        })
        .catch((error) => console.log(error))
}
mapResponse();
// function mapRender() {
//     var map = L.map('map');

//     // 設定經緯度座標
//     map.setView(new L.LatLng(23.5, 121), 1);

//     // 設定圖資來源

//     var osmUrl = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
//     var osm = new L.TileLayer(
//         osmUrl,
//         {
//             minZoom: 8,
//             maxZoom: 18
//         });
//     map.addLayer(osm);

//     const customIcon = L.icon({
//         iconUrl: './img/bike-icon.png',
//         iconSize: [50, 60],
//     });
//     const marker = L.marker([23, 120], {
//         icon: customIcon,
//         title: '跟 <a> 的 title 一樣', // 跟 <a> 的 title 一樣
//         opacity: 1.0
//     }).addTo(map);
// }
// mapRender()