// 函式名稱必須跟 HTML 裡 callback= 後面的名字一樣
function initStreetView() {
  // 設定板橋文化路的經緯度座標 (例如板橋車站或文化路一段附近)
  const wenhuaRoad = { lat: 25.0134, lng: 121.4623 };

  // 直接建立「街景」物件，綁定到 HTML 的 div 上
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("map"), // 確保 HTML 裡有一個 id="map" 的 div
    {
      position: wenhuaRoad,
      pov: { heading: 165, pitch: 0 }, // 視角設定 (面向哪個方向)
      zoom: 1,
      addressControl: true, // 顯示左上角地址
      linksControl: true, // 顯示前進箭頭（讓你可以點擊移動！）
    },
  );
}
