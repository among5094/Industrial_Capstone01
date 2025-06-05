import React, { useEffect } from 'react';

const KakaoMap = ({ markers, path }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=7bcfc703b545f3dd4ce2f137bc111675&autoload=false&libraries=services`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(36.3226, 127.3678),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(container, options);

                if (markers?.start) {
                    new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(markers.start.lat, markers.start.lng),
                        map: map,
                        title: '출발지',
                    });
                }

                if (markers?.end) {
                    new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(markers.end.lat, markers.end.lng),
                        map: map,
                        title: '도착지',
                    });
                }

                if (path && path.length > 1) {
                    console.log("📍 경로 좌표:", path);
                    const linePath = path.map(coord => new window.kakao.maps.LatLng(coord[0], coord[1]));
                    const polyline = new window.kakao.maps.Polyline({
                        path: linePath,
                        strokeWeight: 5,
                        strokeColor: '#FF5733',
                        strokeOpacity: 0.8,
                        strokeStyle: 'solid'
                    });
                    polyline.setMap(map);
                }
            });
        };
    }, [markers, path]);

    return <div id="map" style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>;
};

export default KakaoMap;
