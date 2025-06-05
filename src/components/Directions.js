const Directions = (map, path) => {
    if (path && path.length > 0) {
        const linePath = path.map((node) => new window.kakao.maps.LatLng(node.lat, node.lng));

        new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: "#FFAE00",
            strokeOpacity: 0.8,
            strokeStyle: "solid",
            map: map,
        });
    }
};

export default Directions;
